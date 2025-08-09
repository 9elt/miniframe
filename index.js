const NOT_PROVIDED = {};

export function createNode(D_props) {
    const tree = stateTree();
    const node = _createNode(D_props, tree);
    // NOTE: The entire State tree is exposed to the user
    node.tree = tree;
    return node;
}

// NOTE: Every property of the createNode props can be a State,
// also states can contain other states, for example:
//
// const color = new State("red");
//
// const style = new State({ color: color });
//
// createNode({ tagName: "div", style: style });
//
// createNode will use State subscribers to modify the DOM when
// a State changes. However these need to be unsubscribed when
// the parent State changes:
//
// style.value = { backgroundColor: color, color: "black" };
//
// In this case color subscriber modifying the style.color property
// needs to be removed, and a new subscriber for the style.backgroundColor
// property created.
//
// In order to do so we need to keep track of States and their relations
// in a State tree:
//
//                   state;subs
//                    children
//                       ^
//                       |
//      parent: The state on which it depends
//
//              state: The node State
//
//      subs: The subscribers that need to be
//           removed when parent changes
//
//           children: dependant States
//                       |
//                      ...

/**
 * @param {Leaf} tree
 * @param {number | undefined} root
 */
export function clearStateTree(tree, root) {
    if (root !== undefined && tree.state) {
        tree.subs.forEach((sub) => tree.state.unsub(sub));
        tree.subs = [];
        // NOTE: Special cases for derived States (see State.use and State.as)
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

            // NOTE: Assignment for html elements
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
    // NOTE: State.use it is used to group States together, it is
    // useful when a block needs to receive updates from multiple State
    //
    // {
    //     tagName: "div",
    //     children: State.use({ page, user }).as(({ page, user }) => [
    //         ...
    //     ]),
    // }
    //
    // See State.as for issues and limitations
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
    // NOTE: State.as creates a child State with its value mutated by f,
    // it is used to format State values:
    //
    // const ms = new State(3000);
    // const seconds = ms.as((ms) => ms / 1000);
    //
    // seconds.value // 3
    //
    // ms.value = 5000;
    // seconds.value // 5
    //
    // When this is used inside a nested State can create some issues:
    // (the same issues and solutions apply for State.use as well)
    //
    // const state1 = new State();
    // const state2 = new State();
    //
    // createNode({
    //     tagName: "div",
    //     children: state1.as(() => {
    //         const state2Copy = state2.as(...);
    //         return [state2Copy];
    //     }),
    // });
    //
    // Every time state1 changes a new copy of state2 is produced, the
    // previous one is not reachable anymore, but it's still kept updated
    // by the subscriber.
    //
    // To prevent this we keep track of the parent State and the
    // subscriberd function, and unsubscribe it when the parent
    // State changes (see: clearStateTree)
    //
    // However this spawns a new problem, as we have no way of telling apart
    // States that are created nested or only used nested:
    //
    // const state1 = new State();
    // const state2 = new State();
    // const state2Copy = state2.as(...);
    //
    // createNode({
    //     tagName: "div",
    //     children: state1.as(() => {
    //         return [state2Copy];
    //     }),
    // });
    //
    // In the above example, state2Copy will be unsubscribed, but never
    // re-instantiated.
    // To circumvent this we can use:
    //
    // const state2Copy = state2.as(...).persist();
    //
    // Which will remove the parent and subscriber tracking information,
    // effectively making the State persistent.
    //
    // Hopefully we can find a better way in the future, as state.persistent
    // is quite dangerous, an error by the user could cause a State to unsubscribe
    // or worse, an infinite list of unreachable States
    //
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
