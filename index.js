export function createNode(D_props) {
    const tree = stateTree();
    const node = _createNode(D_props, tree);
    node.tree = tree;
    return node;
}

function clearStateTree(tree, root) {
    if (root !== undefined && tree.state) {
        tree.subs.forEach((sub) => tree.state.unsub(sub));
        tree.subs = [];
        if (tree.state._parent) {
            tree.state._parent.unsub(tree.state._parentF);
        }
    }
    tree.children.forEach(clearStateTree);
    tree.children = [];
}

function stateTree(state) {
    return {
        state,
        subs: [],
        children: [],
    };
}

function _createNode(D_props, tree) {
    let node;
    // NOTE: Common pattern for accessing and handling state inline:
    // let leaf;
    // const x = D_x instanceof State
    //           ^^^ D_ stands for Dynamic
    //     ? tree.children.push(leaf = stateTree(D_x)) && leaf.subs.push(
    //                     ^^^^^^^^^                           ^^^^ Connect below subscriber
    //                     Only create and add leaf to the tree if D_x is a State
    //          D_x.sub((curr) => { /* handle D_x change */ })
    //              ^^^ Add subscriber to handle D_x change
    //     ) && D_x.value
    //              ^^^^^ Access the static value
    //     : D_x
    //       ^^^ D_x was already static
    let leaf;
    const props = D_props instanceof State
        ? tree.children.push(leaf = stateTree(D_props)) && leaf.subs.push(
            D_props.sub(curr => {
                clearStateTree(leaf);
                if (node instanceof window.Text
                    && (typeof curr === 'string' || typeof curr === 'number')) {
                    return node.textContent = curr;
                }
                node.replaceWith(node = _createNode(curr, leaf));
            })
        ) && D_props.value
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
        ? tree.children.push(leaf = stateTree(D_from)) && leaf.subs.push(
            D_from.sub((curr, prev) => {
                for (const key in prev) {
                    setPrimitive(on, key, null);
                }
                clearStateTree(leaf);
                copyObject(on, curr, leaf);
            })
        ) && D_from.value
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
                ? (tree.children.push(leaf = stateTree(D_children))) && leaf.subs.push(
                    D_children.sub(current => {
                        clearStateTree(leaf);
                        parent.replaceChildren(...createNodeList(current, leaf));
                    })
                ) && D_children.value
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
    const D_value = from && from[key];

    let leaf;
    const value = D_value instanceof State
        ? tree.children.push(leaf = stateTree(D_value)) && leaf.subs.push(
            D_value.sub(curr => { setPrimitive(on, key, { [key]: curr }) })
        ) && D_value.value
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
        for (const key in states) {
            group.value[key] = states[key].value;
            states[key].sub(current =>
                group.value = Object.assign(group.value, { [key]: current })
            );
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
        this.sub(curr => { child.value = f(curr) });
        return child;
    }
    to(f) {
        const child = new State(f(this._value));
        child._parent = this;
        child._parentF = this.sub(curr => { child.value = f(curr) });
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
