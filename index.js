const NOT_PROVIDED = {};

export function createNode(D_props) {
    const tree = stateTree();
    const node = _createNode(D_props, tree);
    node.tree = tree;
    return node;
}

/**
 * @param {Leaf} tree
 * @param {number | undefined} root
 */
export function clearStateTree(tree, root) {
    if (root !== undefined && tree.state) {
        tree.subs.forEach((sub) => tree.state.unsub(sub));
        tree.subs = [];
        if (tree.state._parent) {
            tree.state._parent.unsub(tree.state._parentF);
        }
        if (tree.state._cleanUp) {
            tree.state._cleanUp.forEach(f => f());
        }
    }
    tree.children.forEach(clearStateTree);
    tree.children = [];
}

/**
 * @typedef {{
 *     state: State;
 *     subs: Function[];
 *     parent: Leaf;
 *     children: Leaf[];
 * }} Leaf
 * @param {State} state
 * @param {Leaf} parent
 * @returns {Leaf}
 */
function stateTree(state, parent) {
    return {
        state,
        subs: [],
        parent,
        children: [],
    };
}

/**
 * @param {State} state
 * @param {Leaf} tree
 * @returns {State}
 */
function cloneAsNeeded(state, tree) {
    // NOTE: Derived states, the ones created from State.to, need to be unsubscribed
    // when the upper state changes. However they may also be used at higher levels than
    // the above one. The solution is to clone instances that appear in lower levels
    // e.g.
    // {
    //    state: SomeState1,
    //    children: [
    //        { state: DerivedStateOriginal },
    //                 ^^^^^^^^^^^^ Original, first and higher level occurrence of the
    //                              derived state
    //        { state: DerivedStateOriginal },
    //                 ^^^^^^^^^^^^ The original can be re-used on the same level
    //        {
    //            state: SomeState2,
    //            children: [
    //                { state: DerivedStateClone1 },
    //                         ^^^^^^^^^^^^ The derived state is cloned, only the clone
    //                                      is unsubscribed when SomeState2 changes
    //                { state: DerivedStateClone1 },
    //                         ^^^^^^^^^^^^ The same clone can be re-used on the same level
    //            ]
    //        },
    //    ]
    // }
    if (!state._parent) {
        return state;
    }
    for (let i = 0; i < tree.children.length; i++) {
        const sib = tree.children[i].state;
        // NOTE: Derived State already cloned previously for the current level
        if (sib._parent === state._parent && sib._parentT === state._parentT) {
            return sib;
        }
    }
    let leaf = tree;
    while ((leaf = leaf.parent)) {
        for (let i = 0; i < leaf.children.length; i++) {
            const sib = leaf.children[i];
            // NOTE: Clone derived state from upper level
            if (sib !== tree && sib.state === state) {
                return state._parent.as(state._parentT);
            }
        }
    }
    return state;
}

/**
 * @param {Leaf} tree
 * @returns {Node}
 */
function _createNode(D_props, tree) {
    let node;
    // NOTE: Common pattern for accessing and handling state inline:
    // let leaf;
    // const x = D_x instanceof State
    //           ^^^ D_ stands for Dynamic
    //     ? tree.children.push(leaf = stateTree(D_x = cloneAsNeeded(D_x, tree), tree))
    //                     ^^^^^^^^^^^           ^^^^^ D_x is replaced with a clone if needed
    //                     Only create and add leaf to the tree if D_x is a State
    //     && leaf.subs.push(
    //             ^^^^ Connect below subscriber
    //          D_x.sub((curr) => { /* handle D_x change */ })
    //              ^^^ Add subscriber to handle D_x change
    //     )
    //     && D_x.value
    //            ^^^^^ Access the static value
    //     : D_x
    //       ^^^ D_x was already static
    let leaf;
    const props = D_props instanceof State
        ? tree.children.push(leaf = stateTree(D_props = cloneAsNeeded(D_props, tree), tree))
        && leaf.subs.push(
            D_props.sub(curr => {
                clearStateTree(leaf);
                if (node instanceof window.Text
                    && (typeof curr === 'string' || typeof curr === 'number')) {
                    return node.textContent = curr;
                }
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

/**
 * @param {Leaf} tree
 */
function copyObject(on, D_from, tree) {
    let leaf;
    const from = D_from instanceof State
        ? tree.children.push(leaf = stateTree(D_from = cloneAsNeeded(D_from, tree), tree))
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

/**
 * @param {Leaf} tree
 */
function setNodeList(parent, D_children, tree) {
    let leaf;
    parent.append(
        ...createNodeList(
            D_children instanceof State
                ? (tree.children.push(leaf = stateTree(D_children = cloneAsNeeded(D_children, tree), tree)))
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

/**
 * @param {Leaf} tree
 */
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

/**
 * @param {Leaf} tree
 */
function setPrimitive(on, key, from, tree) {
    let D_value = from && from[key];
    let leaf;
    const value = D_value instanceof State
        ? tree.children.push(leaf = stateTree(D_value = cloneAsNeeded(D_value, tree), tree))
        && leaf.subs.push(
            D_value.sub(curr => { setPrimitive(on, key, { [key]: curr }) })
        )
        && D_value.value
        : D_value;
    try {
        // NOTE: SVG and MathML elements require properties
        // to be set via the setAttribute api
        on instanceof window.Node
            && on.namespaceURI !== 'http://www.w3.org/1999/xhtml'
            && (typeof value === 'string'
                || typeof value === 'number'
                || typeof value === 'undefined')
            ? !value && value !== 0
                ? on.removeAttribute(key === 'className' ? 'class' : key)
                : on.setAttribute(key === 'className' ? 'class' : key, value)

            // assignment for html elements
            : on[key] = value;
    }
    catch (err) {
        console.warn(`Failed ${on}.${key} = ${D_value}`, err);
    }
}

export class State {
    _value;
    _subs;
    constructor(value) {
        this._value = value;
        this._subs = [];
    }
    static use(states) {
        const group = new State({});
        group._cleanUp = [];
        for (const key in states) {
            group.value[key] = states[key].value;
            const f = states[key].sub(current =>
                group.value = Object.assign(group.value, { [key]: current })
            );
            group._cleanUp.push(() => states[key].unsub(f));
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
    as(f) {
        const child = new State(f(this._value));
        child._parent = this;
        child._parentT = f;
        child._parentF = this.sub(curr => { child.value = f(curr) });
        child._cleanUp = this._cleanUp;
        return child;
    }
    asyncAs(f, init, loading = NOT_PROVIDED) {
        const child = new State(init);
        f(this._value).then((value) => child.value = value);
        child._parent = this;
        child._parentT = f;
        child._parentF = this.sub(curr => {
            // NOTE: Loading is not a necessary state, if not provided
            // the previous value is kept until the new value is available
            if (loading !== NOT_PROVIDED) {
                child.value = loading;
            }
            f(curr).then((value) => child.value = value);
        });
        child._cleanUp = this._cleanUp;
        return child;
    }
    persist() {
        delete this._parent;
        delete this._parentT;
        delete this._parentF;
        delete this._cleanUp;
        return this;
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
