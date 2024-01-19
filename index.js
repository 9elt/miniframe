let TMP;

export function createNode(D_props) {
    const node = __createNode(D_props);

    // parent connection is used to handle state subscribers
    // the node is temporarily appended to an element
    // to prevent subs being removed before the user appends
    // the node himself
    (TMP || (TMP = window.document.createElement('div'))).append(node);

    return node;
}

function __createNode(D_props) {
    let node;

    // this is a common pattern
    // const y = x instanceof State ? x.sub(curr_x => ...) && x.value : x;
    const props = D_props instanceof State ? D_props.sub(curr => {
        check__pref__tref(node);

        if (node instanceof window.Text
            && (typeof curr === 'string' || typeof curr === 'number'))
            return node.textContent = curr;

        const update = __createNode(curr);
        node.replaceWith(update);
        node = update;

    }) && D_props.value : D_props;

    if (typeof props === 'string' || typeof props === 'number')
        return node = window.document.createTextNode(props);

    if (!props)
        return node = window.document.createTextNode('');

    if (props instanceof window.Node)
        return node = props;

    node = window.document.createElementNS(props.namespaceURI || 'http://www.w3.org/1999/xhtml', props.tagName);
    setElement(node, props);

    return node;
}

function setElement(on, from) {
    for (const key in from)
        if (key === 'namespaceURI' || key === 'tagName')
            continue;

        else if (key === 'children')
            setNodeList(on, from[key]);

        else if (typeof (from[key] instanceof State ? from[key].value : from[key]) === 'object') {

            // the parent reference (__pref) is used to check the
            // parent connection during state updates
            on[key].__pref = on;

            setObject(on[key], from[key]);
        }
        else
            setPrimitive(on, key, from);
}

function setObject(on, D_from) {
    const props = D_from instanceof State ? D_from.sub((curr, prev) => {
        for (const key in prev)
            setPrimitive(on, key, null);

        check__pref__tref(on);

        // the target reference (__tref) is used to check
        // if the target remains the same during state updates
        on.__tref = curr;

        setObject(on, curr);

    }) && (on.__tref = D_from.value) : D_from;

    for (const key in props)
        setPrimitive(on, key, props);
}

function setNodeList(parent, D_children) {
    parent.append(...createNodeList(
        D_children instanceof State ? D_children.sub(current => {
            check__pref__tref(parent);
            parent.replaceChildren(...createNodeList(current));

        }) && D_children.value : D_children
    ));
}

function createNodeList(props) {
    const list = new Array(props && props.length || 0);

    for (let i = 0; i < list.length; i++)
        list[i] = __createNode(props[i]);

    return list;
}

function setPrimitive(on, key, from) {
    const D_value = from && from[key];

    const value = D_value instanceof State ? D_value.sub(curr => {
        check__pref__tref(on, from);
        setPrimitive(on, key, { [key]: curr });

    }) && D_value.value : D_value;

    try {
        // SVG and MathML elements require properties
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
        console.warn(`failed ${on}.${key} = ${D_value}`, err);
    }
}

function check__pref__tref(on, from) {
    if (('__pref' in on ? !on.__pref.isConnected : !on.isConnected)
        || (typeof from !== 'undefined' && '__tref' in on && on.__tref !== from))

        // state subs are unsubscribed when they throw an exception
        throw 1;
}

export class State {
    _v;
    _s;
    constructor(value) {
        this._v = value;
        this._s = [];
    }
    static use(states) {
        const w = new State({});
        for (const key in states) {
            w.value[key] = states[key].value;
            states[key].sub(current => w.value = Object.assign(w.value, { [key]: current }));
        }
        return w;
    }
    get value() {
        return this._v;
    }
    set value(value) {
        this._d(value, this._v);
        this._v = value;
    }
    set(f) {
        this.value = f(this._v);
    }
    as(f) {
        const _ = new State(f(this._v));
        this.sub(curr => _.value = f(curr));
        return _;
    }
    sub(f) {
        this._s.push(f);
        return f;
    }
    unsub(f) {
        this._s = this._s.filter(s => s !== f);
    }
    _d(curr, prev) {
        const s = new Array(this._s.length);

        let len = 0;
        for (let i = 0; i < this._s.length; i++)
            try {
                this._s[i](curr, prev);
                s[len++] = this._s[i];
            }
            catch { }

        s.length = len;
        this._s = s;
    }
}
