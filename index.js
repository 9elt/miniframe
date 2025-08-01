// NOTE: throwing this will unsubscribe a sub from a state
export const UNSUBSCRIBE = {};

let TMP;
export function createNode(D_props) {
    const node = __createNode(D_props);

    // NOTE: parent connection is used to handle state subscribers
    // the node is temporarily appended to an element
    // to prevent subs being removed before the user appends
    // the node himself
    (TMP || (TMP = window.document.createElement('div'))).append(node);

    return node;
}

function __createNode(D_props) {
    let node;

    // NOTE: this is a common pattern
    // const x = D_x instanceof State ? D_x.sub(curr => ...) && D_x.value : D_x;
    const props = D_props instanceof State ? D_props.sub(curr => {
        checkParentRefTargetRef(node);

        if (node instanceof window.Text
            && (typeof curr === 'string' || typeof curr === 'number')) {
            return node.textContent = curr;
        }

        node.replaceWith(node = __createNode(curr));
    }) && D_props.value : D_props;

    if (typeof props === 'string' || typeof props === 'number') {
        return node = window.document.createTextNode(props);
    }

    if (!props) {
        return node = window.document.createTextNode('');
    }

    if (props instanceof window.Node) {
        return node = props;
    }

    node = window.document.createElementNS(props.namespaceURI || 'http://www.w3.org/1999/xhtml', props.tagName);
    copyObject(node, props);

    return node;
}

function copyObject(on, D_from) {
    // NOTE: D_from can be state only on recursive calls
    const from = D_from instanceof State ? D_from.sub((curr, prev) => {
        for (const key in prev) {
            setPrimitive(on, key, null);
        }

        checkParentRefTargetRef(on);

        // NOTE: the target reference (targetRef) is used to check
        // if the target remains the same during state updates
        copyObject(on, on.targetRef = curr);
    }) && (on.targetRef = D_from.value) : D_from;

    for (const key in from) {
        if (key === 'namespaceURI' || key === 'tagName') {
            continue;
        }
        else if (key === 'children') {
            setNodeList(on, from[key]);
        }
        else if (typeof (from[key] instanceof State ? from[key].value : from[key]) === 'object'
            && !on.parentRef) {

            // NOTE: the parent reference (parentRef) is used to check the
            // parent connection during state updates
            on[key].parentRef = on;

            copyObject(on[key], from[key]);
        }
        else {
            setPrimitive(on, key, from);
        }
    }
}

function setNodeList(parent, D_children) {
    parent.append(...createNodeList(
        D_children instanceof State ? D_children.sub(current => {
            checkParentRefTargetRef(parent);
            parent.replaceChildren(...createNodeList(current));

        }) && D_children.value : D_children
    ));
}

function createNodeList(props) {
    if (props !== undefined && !Array.isArray(props)) {
        props = [props];
    }

    const list = new Array(props && props.length || 0);

    for (let i = 0; i < list.length; i++) {
        list[i] = __createNode(props[i]);
    }

    return list;
}

function setPrimitive(on, key, from) {
    const D_value = from && from[key];

    const value = D_value instanceof State ? D_value.sub(curr => {
        checkParentRefTargetRef(on, from);
        setPrimitive(on, key, { [key]: curr });
    }) && D_value.value : D_value;

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

function checkParentRefTargetRef(on, from) {
    if (('parentRef' in on ? !on.parentRef.isConnected : !on.isConnected)
        || (from !== undefined && 'targetRef' in on && on.targetRef !== from)) {

        throw UNSUBSCRIBE;
    }
}

export class State {
    _;
    $;
    constructor(value) {
        this._ = value;
        this.$ = [];
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
        return this._;
    }
    set value(value) {
        let length = 0;
        for (let i = 0; i < this.$.length; i++) {
            try {
                this.$[i](value, this._);
                this.$[length++] = this.$[i];
            }
            catch (err) {
                if (err !== UNSUBSCRIBE) {
                    console.error(
                        'Subscriber error:', err, 'on:', this, 'calling:',
                        this.$[i], 'setting:', value, 'over:', this._
                    );
                    this.$[length++] = this.$[i];
                }
            }
        }
        this.$.length = length;
        this._ = value;
    }
    set(f) {
        this.value = f(this._);
    }
    as(f, collector) {
        const child = new State(f(this._));
        this.sub(curr => { child.value = f(curr) }, collector);
        return child;
    }
    sub(f, collector) {
        this.$.push(f);
        collector && collector.push(f);
        return f;
    }
    unsub(f) {
        let length = 0;
        for (let i = 0; i < this.$.length; i++) {
            if (this.$[i] !== f) {
                this.$[length++] = this.$[i];
            }
        }
        this.$.length = length;
    }
}
