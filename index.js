export function createNode(D_props) {
    const tree = stateTree();
    const node = _createNode(D_props, tree);
    // NOTE: The State tree root is exposed to the user
    node.tree = tree;
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
export function clearStateTree(tree, root) {
    if (root !== undefined && tree.state) {
        tree.subs.forEach((sub) => tree.state.unsub(sub));
        tree.subs = [];
    }
    tree.children.forEach(clearStateTree);
    tree.children = [];
}

function stateTree(state, parent) {
    return {
        state,
        subs: [],
        parent,
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
    //          D_x.sub((curr) => {...})
    //                             ^^^ Handle D_x change
    //     )
    //     && D_x.value
    //            ^^^^^ Access the static value
    //     : D_x
    //       ^^^ D_x was already static
    let leaf;
    const props = D_props instanceof State
        ? tree.children.push(leaf = stateTree(D_props, tree))
        && leaf.subs.push(
            D_props.sub(curr => {
                if (node instanceof window.Text
                    && (typeof curr === 'string' || typeof curr === 'number')) {
                    return node.textContent = curr;
                }
                clearStateTree(leaf);
                node.replaceWith(node = _createNode(curr, leaf));
            })
        )
        && D_props.value
        : D_props;
    return (node = (
        typeof props === 'string' || typeof props === 'number'
            ? window.document.createTextNode(props)
            : !props
                ? window.document.createTextNode('')
                : props instanceof window.Node
                    ? props
                    : copyObject(node = window.document.createElementNS(
                        props.namespaceURI || 'http://www.w3.org/1999/xhtml',
                        props.tagName
                    ), props, leaf || tree)
    ));
}

function copyObject(on, D_from, tree) {
    let leaf;
    const from = D_from instanceof State
        ? tree.children.push(leaf = stateTree(D_from, tree))
        && leaf.subs.push(
            D_from.sub((curr, prev) => {
                for (const key in prev) {
                    setPrimitive(on, key, null);
                }
                clearStateTree(leaf);
                copyObject(on, curr, leaf);
            })
        )
        && D_from.value
        : D_from;
    for (const key in from) {
        if (key === 'namespaceURI' || key === 'tagName') {
            continue;
        }
        else if (key === 'children') {
            setNodeList(on, from[key], leaf || tree);
        }
        else if (
            typeof (
                from[key] instanceof State ? from[key].value : from[key]
            ) === 'object'
        ) {
            copyObject(on[key], from[key], leaf || tree);
        }
        else {
            setPrimitive(on, key, from, leaf || tree);
        }
    }
    return on;
}

function setNodeList(parent, D_children, tree) {
    let leaf;
    parent.append(
        ...createNodeList(
            D_children instanceof State
                ? (tree.children.push(leaf = stateTree(D_children, tree)))
                && leaf.subs.push(
                    D_children.sub(current => {
                        clearStateTree(leaf);
                        parent.replaceChildren(...createNodeList(current, leaf));
                    })
                )
                && D_children.value
                : D_children,
            leaf || tree
        )
    );
}

function createNodeList(props, tree) {
    if (props !== undefined && !Array.isArray(props)) {
        props = [props];
    }
    const list = new Array(props && props.length || 0);
    for (let i = 0; i < list.length; i++) {
        list[i] = _createNode(props[i], tree);
    }
    return list;
}

function setPrimitive(on, key, from, tree) {
    let D_value = from && from[key];
    let leaf;
    const value = D_value instanceof State
        ? tree.children.push(leaf = stateTree(D_value, tree))
        && leaf.subs.push(
            D_value.sub(curr => { setPrimitive(on, key, { [key]: curr }) })
        )
        && D_value.value
        : D_value;
    try {
        // NOTE: SVG and MathML elements require properties to
        // be set via the setAttribute api
        on instanceof window.Node
            && on.namespaceURI !== 'http://www.w3.org/1999/xhtml'
            && (typeof value === 'string'
                || typeof value === 'number'
                || typeof value === 'undefined')
            ? !value && value !== 0
                ? on.removeAttribute(key === 'className' ? 'class' : key)
                : on.setAttribute(key === 'className' ? 'class' : key, value)

            // NOTE: Assignment for html elements
            : on[key] = value;
    }
    catch (err) {
        console.warn(`Failed ${on}.${key} = ${D_value}`, err);
    }
}

export class State {
    static AsStack = [];
    static NoLoading = {};
    _value;
    _subs;
    constructor(value) {
        this._value = value;
        this._subs = [];
    }
    static use(states) {
        const group = new State({});

        for (const key in states) {
            const state = states[key];

            group.value[key] = state.value;

            const f = state.sub(current =>
                group.value = Object.assign(group.value, { [key]: current })
            );

            if (State.AsStack.length > 0) {
                State.AsStack.push({ state, f });
            }
        }

        return group;
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
                    'Subscriber error:', err,
                    'on:', this,
                    'calling:', this._subs[i],
                    'setting:', value,
                    'over:', this._value
                );
            }
        }
        this._value = value;
    }
    set(f) {
        this.value = f(this._value);
    }
    clearChildren() {
        while (this._children.length) {
            const _as = this._children.pop();
            if (_as.state._children) {
                _as.state.clearChildren();
            }
            _as.state.unsub(_as.f);
        }
    }
    collectChildren(_as) {
        if (State.AsStack.at(-1) !== _as) {
            let pop;
            while ((pop = State.AsStack.pop()) !== _as) {
                this._children.push(pop);
            }
        } else if (State.AsStack.length === 1) {
            State.AsStack.pop();
        }
    }
    // NOTE: When called a reference is pushed into a global
    // stack and it is only removed when the callback (f)
    // produced the derived value. All the refs that were
    // added during the callback (f) execution are collected as
    // children and unsubscribed when the state changes
    as(f) {
        this._children = [];
        const _as = { state: this, f: null };

        State.AsStack.push(_as);
        const value = f(this._value);
        this.collectChildren(_as);

        const child = new State(value);

        _as.f = this.sub(curr => {
            this.clearChildren();
            State.AsStack.push(_as);
            const value = f(curr);
            this.collectChildren(_as);
            child.value = value;
        });

        return child;
    }
    asyncAs(init, loading = State.NoLoading, f) {
        const child = new State(init);

        f(this._value).then((value) => child.value = value);

        const sub = this.sub(curr => {
            // NOTE: Loading is not a necessary state, the
            // previous value can be kept until the new value
            // is available
            if (loading !== State.NoLoading) {
                child.value = loading;
            }
            f(curr).then((value) => child.value = value);
        });

        if (State.AsStack.length > 0) {
            State.AsStack.push({ state: this, f: sub });
        }

        return child;
    }
    sub(f) {
        this._subs.push(f);
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
