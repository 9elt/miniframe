const cleanupMap = new WeakMap();

const cleanup = new FinalizationRegistry(
    (cleanupItem) => cleanupItem.forEach((f) => f())
);

function onGC(target, f, id) {
    const cleanupItem = cleanupMap.get(target) || [];
    cleanupItem.push(f);
    cleanupMap.set(target, cleanupItem);
    cleanup.register(target, cleanupItem, id);
}

export function createNode(D_props) {
    const tree = { children: [] };
    const node = _createNode(D_props, tree);
    // NOTE: We expose the tree for debug purposes
    node._tree = tree;
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
//     state: State;
//     sub: F;
//     children: Node[];
// }
function clearStateTree(tree, root = -1) {
    if (root !== -1) {
        tree.state._unsubR(tree.sub);
        cleanup.unregister(tree.sub);
    }
    tree.children.forEach(clearStateTree);
    tree.children = [];
}

function stateTree(parent, state, ref, f) {
    const leaf = {
        state,
        sub: state._subR(f),
        children: [],
    };

    parent.children.push(leaf);

    onGC(ref.deref(), () => clearStateTree(leaf, 0), leaf.sub);

    return leaf;
}

function _createNode(D_props, tree) {
    const node = { $: null };

    let ref, leaf, sub;
    const props = D_props instanceof State
        ? unwrap((leaf = stateTree(tree, D_props, ref = new WeakRef(node), sub = (curr, prev) => {
            if (prev instanceof State) {
                prev._unsubR(sub);
            }
            if (curr instanceof State) {
                return curr._sub(sub)(curr._value);
            }
            clearStateTree(leaf);
            const node = ref.deref();
            if (node) {
                node.$.replaceWith(node.$ = _createNode(curr, leaf));
                node.$._keepalive = node;
            }
        })).state)
        : D_props;

    node.$ = (
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
    );

    node.$._keepalive = node;

    return node.$;
}

function copyObject(on, D_from, tree) {
    let ref, leaf, sub;
    const from = D_from instanceof State
        ? unwrap((leaf = stateTree(tree, D_from, ref = new WeakRef(on), sub = (curr, prev) => {
            if (prev instanceof State) {
                prev._unsubR(sub);
            }
            if (curr instanceof State) {
                return curr._sub(sub)(
                    curr instanceof State ? curr._value : curr,
                    prev instanceof State ? prev._value : prev
                );
            }
            clearStateTree(leaf);
            const on = ref.deref();
            if (on) {
                for (const key in unwrap(prev)) {
                    setPrimitive(on, key, null);
                }
                copyObject(on, curr, leaf);
            }
        })).state)
        : D_from;

    for (const key in from) {
        if (key === "namespaceURI" || key === "tagName") {
            continue;
        }
        else if (key === "children") {
            setChildren(on, from[key], leaf || tree);
        }
        else if (typeof unwrap(from[key]) === "object") {
            copyObject(on[key], from[key], leaf || tree);
        }
        else {
            setPrimitive(on, key, from, leaf || tree);
        }
    }

    return on;
}

function setChildren(parent, D_children, tree) {
    const ref = new WeakRef(parent);
    let leaf, sub;
    const children = D_children instanceof State
        ? unwrap((leaf = stateTree(tree, D_children, ref, sub = (curr, prev) => {
            if (prev instanceof State) {
                prev._unsubR(sub);
            }
            if (curr instanceof State) {
                return curr._sub(sub)(curr._value);
            }
            clearStateTree(leaf);
            const parent = ref.deref();
            if (parent) {
                replaceNodes(
                    Array.from(parent.childNodes),
                    createNodeList(curr, leaf, ref)
                );
            }
        })).state)
        : D_children;

    appendNodeList(parent, createNodeList(children, leaf || tree, ref));
}

// NOTE: To make state handling easier (possible?) we don't
// flatten children lists. However, this means that everything
// needs to be done using recursion

function createNodeList(children, tree, ref) {
    if (children === undefined) {
        children = [];
    }
    else if (!Array.isArray(children)) {
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

        let leaf, sub;
        const child = D_child instanceof State
            ? unwrap((leaf = stateTree(tree, D_child, ref, sub = (curr, prev) => {
                if (prev instanceof State) {
                    prev._unsubR(sub);
                }
                if (curr instanceof State) {
                    return curr._sub(sub)(curr._value);
                }
                clearStateTree(leaf);
                if (ref.deref()) {
                    list[i] = replaceNodes(
                        list[i],
                        Array.isArray(curr)
                            // NOTE: Recursion
                            ? createNodeList(curr, leaf, ref)
                            : weaken(list, i, _createNode(curr, leaf))
                    );
                }
            })).state)
            : D_child;

        list[i] = Array.isArray(child)
            // NOTE: Recursion
            ? createNodeList(child, leaf || tree, ref)
            : weaken(list, i, _createNode(child, leaf || tree));
    }

    return list;
}

function weaken(list, i, node) {
    node._weaken = () => list[i] = new WeakRef(node);
    return node;
}

function appendNodeList(parent, nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
        const child = nodeList[i];
        Array.isArray(child)
            // NOTE: Recursion
            ? appendNodeList(parent, child)
            : (parent.appendChild(child), child._weaken());
    }
}

function replaceNodes(prev, update) {
    prev = (prev instanceof WeakRef ? prev.deref() : prev);

    if (!Array.isArray(prev) && !Array.isArray(update)) {
        prev.replaceWith(update);
        update._weaken();
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
    prev = (prev instanceof WeakRef ? prev.deref() : prev);
    // NOTE:                           Recursion
    Array.isArray(prev) ? prev.forEach(removeNode) : prev.remove();
}

function appendNodeAfter(sibiling, node) {
    sibiling = (sibiling instanceof WeakRef ? sibiling.deref() : sibiling);

    if (Array.isArray(sibiling)) {
        // NOTE: Recursion
        appendNodeAfter(sibiling[sibiling.length - 1], node);
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
        node._weaken();
    }
}

function setPrimitive(on, key, from, tree) {
    let D_value = from && from[key];

    let ref, leaf, sub;
    const value = D_value instanceof State
        ? unwrap((leaf = stateTree(tree, D_value, ref = new WeakRef(on), sub = (curr, prev) => {
            if (prev instanceof State) {
                prev._unsubR(sub);
            }
            if (curr instanceof State) {
                return curr._sub(sub)(curr._value);
            }
            const on = ref.deref();
            if (on) {
                setPrimitive(on, key, { [key]: curr });
            }
        })).state)
        : D_value;

    try {
        // NOTE: SVG elements require the setAttribute API
        on.namespaceURI === "http://www.w3.org/2000/svg"
            ? !value && value !== 0
                ? on.removeAttribute(key)
                : on.setAttribute(key, value)

            // NOTE: Assignment for HTML and MathMl elements
            : (on[key] = value) || (value === 0 || delete on[key])
    }
    catch (err) {
        console.warn("Error", key, "=", D_value, err);
    }
}

function unwrap(arg) {
    return arg instanceof State ? unwrap(arg._value) : arg;
}

export class State {
    static _Stack = [];
    static _Header = null;
    _value;
    _subs;
    constructor(value) {
        this._value = value;
        this._subs = [];
    }
    static merge(...states) {
        const as = typeof states[states.length - 1] === "function" && states.pop();

        const merged = new State(new Array(states.length));
        const mergedRef = new WeakRef(merged);

        for (let i = 0; i < states.length; i++) {
            const state = states[i];

            merged._value[i] = state._value;

            // TODO: We may need to copy the array
            const f = state._sub((curr) => {
                const merged = mergedRef.deref();
                if (merged) {
                    merged._value[i] = curr;
                    merged.value = merged._value;
                }
            });

            onGC(merged, () => state.unsub(f));

            if (State._Header) {
                State._Stack.push({ state, f });
            }
        }

        return as ? merged.as((states) => as(...states)) : merged;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const prev = this._value;

        this._value = value;

        for (const sub of this._subs) {
            try {
                sub(value, prev);
            }
            catch (err) {
                console.error(
                    "Error", err, "on", this, "calling", sub,
                    "setting", value, "over", prev
                );
            }
        }
    }
    // NOTE: When State.as and State.sub are called, a
    // reference (ref) is pushed onto a global stack and the
    // (f) callback is exectuted, then all references that are
    // present in the stack after the initial reference (ref)
    // are collected as dependents. Dependents are then cleared
    // and recollected every time the state changes.
    // WARNING: This approach does not support nesting inside
    // async callbacks:
    //
    // const derived = state.as(async () => {
    //    state.as(...);
    //    state.sub(...);
    //    State.merge(...);
    //    ^ These can be tracked
    //
    //    await something();
    //    ^^^^^ Dependents collection ends here
    //
    //    state.as(...);
    //    state.sub(...);
    //    State.merge(...);
    //    ^ These can't be tracked
    //
    //    return ...;
    //           ^^^ We can check the return value for states
    //           and, in case, log a warning to let the user
    //           know he's not following best practices.
    // });
    _track(ref, f, curr, prev = warning/*random pointer*/) {
        this._dependents ||= [];
        this._clear(ref.id);

        State._Header ||= ref;
        State._Stack.push(ref);

        const value = prev === warning/*random pointer*/
            ? f(curr) : f(curr, prev);

        while (State._Stack[State._Stack.length - 1] !== ref) {
            const child = State._Stack.pop();
            child.parent = ref.id;
            this._dependents.push(child);
        }

        if (State._Header === ref) {
            State._Stack.pop();
            State._Header = null;
        }

        if (value instanceof Promise) {
            value.then(warning);
        }

        return value;
    }
    _clear(id) {
        let length = 0;
        for (const ref of this._dependents) {
            if (ref.parent === id) {
                if (ref.state._dependents) {
                    ref.state._clear(ref.id);
                }
                ref.state.unsub(ref.f);
            }
            else {
                this._dependents[length++] = ref;
            }
        }
        this._dependents.length = length;
    }
    as(f) {
        const ref = { id: f, state: this, f: null };

        const child = new State(this._track(ref, f, this._value));
        const childRef = new WeakRef(child);

        ref.f = this._sub(
            (curr) => {
                const child = childRef.deref();
                if (child) {
                    child.value = this._track(ref, f, curr);
                }
            }
        );

        onGC(child, () => {
            this.unsub(ref.f);
            this._clear(ref.id);
        });

        return child;
    }
    // NOTE: Loading is not a necessary state, the
    // previous value can be kept until the new value
    // is available. To check if it wasn't provided we
    // use a random private pointer, so the user can
    // use any value, including undefined
    await(init, loading = weaken/*random pointer*/) {
        const child = new State(init);

        Promise.resolve(this._value)
            .then((value) => child.value = value)
            .catch(console.error);

        const childRef = new WeakRef(child);

        const f = this._sub((curr) => {
            const child = childRef.deref();
            if (child) {
                if (loading !== weaken/*random pointer*/) {
                    child.value = loading;
                }
                Promise.resolve(curr)
                    .then((value) => child.value = value)
                    .catch(console.error);
            }
        });

        onGC(child, () => this.unsub(f));

        if (State._Header) {
            State._Stack.push({ state: this, f });
        }

        return child;
    }
    _sub(f) {
        this._subs.push(f);
        return f;
    }
    _subR(f) {
        this._sub(f);
        if (this._value instanceof State) {
            this._value._subR(f);
        }
        return f;
    }
    sub(f) {
        const ref = { id: f, state: this, f: null };

        if (State._Header) {
            State._Stack.push(ref);
        }

        return ref.f = this._sub(
            (curr, prev) => this._track(ref, f, curr, prev)
        );
    }
    unsub(f) {
        let length = 0;
        for (const sub of this._subs) {
            if (sub !== f) {
                this._subs[length++] = sub;
            }
        }
        this._subs.length = length;
    }
    _unsubR(f) {
        this.unsub(f);
        if (this._value instanceof State) {
            this._value._unsubR(f);
        }
    }
}

function warning(value, seen = new WeakSet()) {
    !seen.has(warning) && (value instanceof State
        ? seen.add(warning) && console.error(
            "Never use states inside async State.as/sub, see: " +
            "https://github.com/9elt/miniframe?tab=readme-ov-file#async-state-limitations")
        : value && typeof value === "object" &&
        !seen.has(value) && seen.add(value) &&
        Object.values(value).forEach((v) => warning(v, seen))
    );
}
