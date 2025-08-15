export function createNode(D_props) {
    const tree = stateTree();
    const node = _createNode(D_props, tree);
    node.clear = () => clearStateTree(tree, 0);
    // NOTE: We expose the tree for debug purposes
    node._stateTree = tree;
    return node;
}

// NOTE: Every property of the createNode props can be a state,
// also, states can contain other states, for example:
//
// const color = new State("red");
// const style = new State({ color: color });
// createNode({ tagName: "div", style: style });
//
// createNode will subscribe callbacks to modify the DOM when a
// state changes. However these need to be unsubscribed when
// the parent state is modified:
//
// style.value = { backgroundColor: color };
//
// In this case the callback for style.color property needs to
// be removed, and a new one for the style.backgroundColor
// property subscribed.
//
// In order to do so we have to keep track of states and their
// relations in a state tree:
//
// Node {
//     parent: Node;
//     state: State;
//     subs: F[];
//     children: Node[];
// }
function clearStateTree(tree, root) {
    if (root !== undefined && tree.state) {
        tree.subs.forEach((sub) => tree.state.unsub(sub));
        tree.subs = [];
    }
    tree.children.forEach(clearStateTree);
    tree.children = [];
}

function stateTree(state, parent) {
    return {
        parent,
        state,
        subs: [],
        children: [],
    };
}

function _createNode(D_props, tree) {
    let node;
    // NOTE: Common pattern to access and handle state inline:
    // let leaf;
    // const x = D_x instanceof State
    //           ^^^ D_ stands for Dynamic
    //     ? tree.children.push(leaf = stateTree(D_x, tree))
    //                     ^^^^^^^^^^^
    //                     Only create and add leaf for states
    //     && leaf.subs.push(
    //             ^^^^^^^^^ Connect below subscriber
    //          D_x._sub((curr) => {...})
    //                              ^^^ Handle D_x change
    //     )
    //     && D_x.value
    //            ^^^^^ Access the static value
    //     : D_x
    //       ^^^ D_x was already static
    let leaf;
    const props = D_props instanceof State
        ? tree.children.push(leaf = stateTree(D_props, tree))
        && leaf.subs.push(
            D_props._sub((curr) => {
                clearStateTree(leaf);
                node.replaceWith(node = _createNode(curr, leaf));
            })
        )
        && D_props.value
        : D_props;
    return (node = (
        typeof props === "string" || typeof props === "number"
            ? window.document.createTextNode(props)
            : !props
                ? window.document.createTextNode("")
                : props instanceof window.Node
                    ? props
                    : copyObject(
                        window.document.createElementNS(
                            props.namespaceURI || "http://www.w3.org/1999/xhtml",
                            props.tagName
                        ),
                        props,
                        leaf || tree
                    )
    ));
}

function copyObject(on, D_from, tree) {
    let leaf;
    const from = D_from instanceof State
        ? tree.children.push(leaf = stateTree(D_from, tree))
        && leaf.subs.push(
            D_from._sub((curr, prev) => {
                clearStateTree(leaf);
                for (const key in prev) {
                    setPrimitive(on, key, null);
                }
                copyObject(on, curr, leaf);
            })
        )
        && D_from.value
        : D_from;
    for (const key in from) {
        if (key === "namespaceURI" || key === "tagName") {
            continue;
        }
        else if (key === "children") {
            setChildren(on, from[key], leaf || tree);
        }
        else if (
            typeof (
                from[key] instanceof State ? from[key].value : from[key]
            ) === "object"
        ) {
            copyObject(on[key], from[key], leaf || tree);
        }
        else {
            setPrimitive(on, key, from, leaf || tree);
        }
    }
    return on;
}

function setChildren(parent, D_children, tree) {
    let leaf;
    const children = D_children instanceof State
        ? (tree.children.push(leaf = stateTree(D_children, tree)))
        && leaf.subs.push(
            D_children._sub((curr) => {
                clearStateTree(leaf);
                replaceNodes(
                    Array.from(parent.childNodes),
                    createNodeList(curr, leaf)
                );
            })
        )
        && D_children.value
        : D_children;
    appendNodeList(parent, createNodeList(children, leaf || tree));
}

// NOTE: To make state handling easier (possible?) we don't
// flatten children lists. However, this means that everything
// needs to be done using recursion

function createNodeList(children, tree) {
    if (children !== undefined && !Array.isArray(children)) {
        children = [children];
    }
    const list = new Array(children && children.length || 0);
    // NOTE: If there are no children we push an invisible text
    // node, so we can assume lists are never empty and there's
    // always at least one node to replace.
    if (list.length === 0) {
        list.push(null);
    }
    for (let i = 0; i < list.length; i++) {
        const D_child = children[i];

        let leaf;
        const child = D_child instanceof State
            ? tree.children.push(leaf = stateTree(D_child, tree))
            && leaf.subs.push(
                D_child._sub((curr) => {
                    clearStateTree(leaf);
                    list[i] = replaceNodes(
                        list[i],
                        Array.isArray(curr)
                            // NOTE: Recursion
                            ? createNodeList(curr, leaf)
                            : _createNode(curr, leaf)
                    );
                })
            )
            && D_child.value
            : D_child;

        list[i] = Array.isArray(child)
            // NOTE: Recursion
            ? createNodeList(child, leaf || tree)
            : _createNode(child, leaf || tree);
    }
    return list;
}

function appendNodeList(parent, nodeList) {
    for (const child of nodeList) {
        Array.isArray(child)
            // NOTE: Recursion
            ? appendNodeList(parent, child)
            : parent.appendChild(child);
    }
}

function replaceNodes(prev, update) {
    if (!Array.isArray(prev) && !Array.isArray(update)) {
        prev.replaceWith(update);
        return update;
    }
    if (!Array.isArray(prev)) {
        prev = [prev];
    }
    else if (!Array.isArray(update)) {
        update = [update];
    }
    const min = prev.length < update.length ? prev : update;
    const max = min === prev ? update : prev;
    for (let i = 0; i < min.length; i++) {
        // NOTE: Recursion
        replaceNodes(prev[i], update[i]);
    }
    for (let i = min.length; i < max.length; i++) {
        max === prev
            ? removeNode(prev[i])
            : appendNodeAfter(update[i - 1], update[i]);
    }
    return update;
}

function removeNode(prev) {
    // NOTE:              Recursion
    Array.isArray(prev) ? prev.forEach(removeNode) : prev.remove();
}

function appendNodeAfter(sibiling, node) {
    if (Array.isArray(sibiling)) {
        // NOTE: Recursion
        appendNodeAfter(sibiling.at(-1), node);
    }
    else if (Array.isArray(node)) {
        let last = sibiling;
        for (const _node of node) {
            // NOTE: Recursion
            appendNodeAfter(last, last = _node);
        }
    }
    else {
        sibiling.after(node);
    }
}

function setPrimitive(on, key, from, tree) {
    let D_value = from && from[key];
    let leaf;
    const value = D_value instanceof State
        ? tree.children.push(leaf = stateTree(D_value, tree))
        && leaf.subs.push(
            D_value._sub((curr) => setPrimitive(on, key, { [key]: curr }))
        )
        && D_value.value
        : D_value;
    try {
        // NOTE: SVGs are weird...
        on.namespaceURI === "http://www.w3.org/2000/svg"
            ? typeof on[key] === "object" && "baseVal" in on[key]
                ? on[key].baseVal = value
                : !value && value !== 0
                    ? on.removeAttribute(key)
                    : on.setAttribute(key, value)
            // NOTE: Assignment for HTML and MathMl elements
            : on[key] = value;
    }
    catch (err) {
        console.warn(`Failed ${on}.${key} = ${D_value}`, err);
    }
}

export class State {
    static _ChildrenStack = [];
    _value;
    _subs;
    constructor(value) {
        this._value = value;
        this._subs = [];
    }
    static merge(...states) {
        const as = typeof states.at(-1) === "function" && states.pop();
        const sync = new State(new Array(states.length));
        for (let i = 0; i < states.length; i++) {
            sync.value[i] = states[i].value;
            // TODO: We may need to copy the array
            states[i].sub((curr) => {
                sync.value[i] = curr;
                sync.value = sync.value;
            });
        }
        return as ? sync.as((states) => as(...states)) : sync;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        for (let i = 0; i < this._subs.length; i++) {
            try {
                this._subs[i](value, this._value);
            }
            catch (err) {
                console.error(
                    "Subscriber error:", err,
                    "on:", this,
                    "calling:", this._subs[i],
                    "setting:", value,
                    "over:", this._value
                );
            }
        }
        this._value = value;
    }
    _clearChildren() {
        while (this._children.length) {
            const ref = this._children.pop();
            if (ref.state._children) {
                ref.state._clearChildren();
            }
            ref.state.unsub(ref.f);
        }
    }
    _collectChildren(ref) {
        if (State._ChildrenStack.at(-1) !== ref) {
            let pop;
            while ((pop = State._ChildrenStack.pop()) !== ref) {
                this._children.push(pop);
            }
        } else if (State._ChildrenStack.length === 1) {
            State._ChildrenStack.pop();
        }
    }
    // NOTE: When State.as is called, a reference (ref) is
    // pushed onto a global stack and the (f) callback is
    // exectuted, then all references that are present in the
    // stack after the initial reference (ref) are collected as
    // children. Children are then cleared and recollected
    // every time the state changes.
    //
    // WARNING: This approach does not support nesting inside
    // async callbacks:
    //
    // const derived = state.as(async () => {
    //    const collectedChild = state.as(...);
    //
    //    await something();
    //    ^^^^^ Children collection ends here
    //
    //    const strayChild = state.as(...);
    //          ^ There is no way to know about this child
    //
    //    return state.as(...);
    //           ^^^^^^^^ There is no way to know if State.as
    //           was actually called here, or previously
    //           assigned to a variable outside the scope.
    //           However we can always log a warning, to let
    //           the user know he's not following best
    //           practices, this should cover almost all cases,
    //           except when the user creates a derived state
    //           without ever using it as above.
    // });
    as(f) {
        this._children = [];
        const ref = { state: this, f: null };

        State._ChildrenStack.push(ref);
        const value = f(this._value);
        this._collectChildren(ref);
        if (value instanceof Promise) {
            value.then(warning);
        }

        const child = new State(value);
        child._parent = this;

        ref.f = this._sub((curr) => {
            this._clearChildren();
            State._ChildrenStack.push(ref);
            const value = f(curr);
            this._collectChildren(ref);
            child.value = value;
            if (value instanceof Promise) {
                value.then(warning);
            }
        });

        return child;
    }
    // NOTE: Loading is not a necessary state, the
    // previous value can be kept until the new value
    // is available. To check if it wasn't provided we
    // use a random private pointer, so the user can
    // use any value, including undefined
    await(init, loading = State._ChildrenStack) {
        const child = new State(init);

        Promise.resolve(this._value)
            .then((value) => child.value = value)
            .catch(console.error);

        this.sub((curr) => {
            if (loading !== State._ChildrenStack) {
                child.value = loading;
            }
            Promise.resolve(curr)
                .then((value) => child.value = value)
                .catch(console.error);
        });

        return child;
    }
    _sub(f) {
        this._subs.push(f);
        return f;
    }
    // NOTE: Safe (and public) version of State._sub
    sub(f) {
        this._subs.push(f);
        if (State._ChildrenStack.length > 0) {
            State._ChildrenStack.push({ state: this, f });
        }
        return f;
    }
    unsub(f) {
        let length = 0;
        for (let i = 0; i < this._subs.length; i++) {
            if (this._subs[i] !== f) {
                this._subs[length++] = this._subs[i];
            }
        }
        this._subs.length = length;
    }
}

function warning(value, seen = new WeakSet()) {
    value instanceof State
        ? !seen.has(value) && (seen.add(value) && value._parent
            ? !seen.has(warning) && seen.add(warning) && console.error(
                "Derived state detected, please never nest State.as inside async State.as, " +
                "see: https://github.com/9elt/miniframe?tab=readme-ov-file#async-state-limitations"
            )
            : warning(value.value, seen))
        : value && typeof value === "object" ? !seen.has(value) && seen.add(value) &&
            Object.values(value).forEach((v) => warning(v, seen)) : 0;
}
