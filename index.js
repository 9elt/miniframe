let TMP;

const HTML_NS = 'http://www.w3.org/1999/xhtml';
const SVG_NS = 'http://www.w3.org/2000/svg';
const MATHML_NS = 'http://www.w3.org/1998/Math/MathML';

const IS_SVG = /^(ani|cir|cli|def|des|el|f(e[A-Z]|il|ore)|ima|line|m(a(rke|sk)|pat|etad)|pat|pol|rad|re|s(to|v|w|y)|tex(?!(ta))|vie|ts|us|g$|set$)/;
const IS_MATHML = /^(ann|sem|m(?!(ai|ap|pat|ar|as|enu|et|ul)))/;

export function createNode(d_props) {
    const node = __createNode(d_props);
    (TMP || (TMP = window.document.createElement('div'))).append(node);
    return node;
}

function __createNode(d_props) {
    let node = routeNode(vof(d_props));
    d_props instanceof State && d_props.sub(curr => {
        connectionOk(node);
        if (node instanceof window.Text
            && (typeof curr === 'string' || typeof curr === 'number'))
            return node.textContent = curr;
        const update = __createNode(curr);
        node.replaceWith(update);
        node = update;
    });
    return node;
}

function routeNode(props) {
    if (!props)
        return window.document.createTextNode('');
    if (props instanceof window.Node)
        return props;
    switch (typeof props) {
        case 'object':
            const element = window.document
                .createElementNS(namespace(props.tagName), props.tagName);
            setElementProps(element, props);
            return element;
        case 'string': return window.document.createTextNode(props);
        case 'number': return window.document.createTextNode(props);
    }
}

function namespace(tagName) {
    return IS_SVG.test(tagName) ? SVG_NS
        : IS_MATHML.test(tagName) ? MATHML_NS
            : HTML_NS;
}

function setElementProps(target, props) {
    for (let key in props)
        if (key === 'tagName')
            continue;
        else if (key === 'children')
            appendChildren(target, props[key]);
        else if (typeof vof(props[key]) === 'object') {
            target[key].__pref = target;
            setObjectProps(target[key], props[key]);
        }
        else
            setPrimitiveProp(target, key, props);
}

function setObjectProps(target, d_props) {
    const props = vof(d_props);
    d_props instanceof State && (target.__tref = props);
    for (let key in props)
        setPrimitiveProp(target, key, props);
    d_props instanceof State && d_props.sub((curr, prev) => {
        for (let key in prev)
            setPrimitiveProp(target, key, null);
        connectionOk(target);
        target.__tref = curr;
        setObjectProps(target, curr);
    });
}

function appendChildren(parent, d_children) {
    parent.append(...createNodesList(vof(d_children)));
    d_children instanceof State && d_children.sub(current => {
        parent.innerHTML = '';
        connectionOk(parent);
        parent.append(...createNodesList(current));
    });
}

function createNodesList(props) {
    if (isnull(props))
        return [];
    const list = new Array(props.length);
    for (let i = 0; i < props.length; i++)
        list[i] = __createNode(props[i]);
    return list;
}

function setPrimitiveProp(target, key, props) {
    const d_value = props && props[key];
    const value = vof(d_value);
    try {
        isattr(target, value)
            ? isnull(value)
                ? target.removeAttribute(attributeName(key))
                : target.setAttribute(attributeName(key), value)
            : target[key] = value;
    }
    catch (err) {
        console.warn(`failed ${target}.${key} = ${d_value}`, err);
    }
    d_value instanceof State && d_value.sub(curr => {
        connectionOk(target);
        targetOk(target, props);
        setPrimitiveProp(target, key, { [key]: curr });
    });
}

function isattr(target, value) {
    return target instanceof window.Node
        && target.namespaceURI !== HTML_NS
        && (typeof value === 'string'
            || typeof value === 'number'
            || typeof value === 'undefined');
}

function attributeName(key) {
    return key === 'className' ? 'class' : key;
}

export class State {
    constructor(value) {
        this.__value = value;
        this.__subs = [];
    }
    static from(value) {
        return new State(value);
    }
    static use(states) {
        const state = new State({});
        for (const key in states) {
            state.value[key] = states[key].value;
            states[key].sub(current => state.value = Object
                .assign(state.value, { [key]: current }));
        }
        return state;
    }
    get value() {
        return this.__value;
    }
    set value(value) {
        this.__dispatch(value, this.__value);
        this.__value = value;
    }
    set(f) {
        this.value = f(this.__value);
    }
    as(f) {
        const child = new State(f(this.__value));
        this.sub(curr => child.value = f(curr));
        return child;
    }
    asyncAs(f) {
        return new Promise(resolve => f(this.__value).then(value => {
            const child = new State(value);
            this.sub(curr => f(curr).then(v => child.value = v));
            resolve(child);
        }));
    }
    sub(f) {
        return this.__subs.push(f);
    }
    __dispatch(curr, prev) {
        let max = this.__subs.length;
        if (max === 0)
            return;
        const subs = new Array(max);
        let length = 0;
        for (let i = 0; i < max; i++)
            try {
                this.__subs[i](curr, prev);
                subs[length++] = this.__subs[i];
            }
            catch { }
        subs.length = length;
        this.__subs = subs;
    }
    toJSON() {
        return JSON.stringify(this.value);
    }
}

function vof(value) {
    return value instanceof State ? value.value : value;
}

function isnull(value) {
    return !value && value !== 0;
}

function connectionOk(target) {
    if (!('__pref' in target ? target.__pref : target).isConnected)
        throw -1;
}

function targetOk(target, props) {
    if ('__tref' in target && target.__tref !== props)
        throw -2;
}
