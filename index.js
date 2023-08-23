let DOM = typeof document === "undefined" ? undefined : document;

const HTMLnamespace = "http://www.w3.org/1999/xhtml";
const SVGnamespace = "http://www.w3.org/2000/svg";
const MATHMLnamespace = "http://www.w3.org/1998/Math/MathML";

const SVGRegex = /^(ani|cir|cli|def|des|el|f(e[A-Z]|il|ore)|ima|line|m(a(rke|sk)|pat|etad)|pat|pol|rad|re|s(to|v|w|y)|tex(?!(ta))|vie|ts|us|g$|set$)/;
const MATHMLRegex = /^(ann|sem|m(?!(ai|ap|pat|ar|as|enu|et|ul)))/;

export function createNode(props, dom) {
    dom && (DOM = dom);
    return tof(props) === "object"
    ? createElement(props)
    : createTextNode(props);
}

function getNamespace(tagName) {
    return SVGRegex.test(tagName) ? SVGnamespace
    : MATHMLRegex.test(tagName) ? MATHMLnamespace
    : HTMLnamespace;
}

function createElementNS(tagName) {
    return DOM.createElementNS(getNamespace(tagName), tagName);
}

function createTextNode(text) {
    const element = DOM.createTextNode(vof(text));
    iss(text) && text.sub(value => element.textContent = value);
    return element;
}

function createElement(props) {
    let element = createElementNS(vof(vof(props).tagName));
    setObjectProps(element, props);
    if (iss(props))
        props.sub(value => {
            const update = createElement(value);
            element.replaceWith(update);
            element = update;
        });
    else if (iss(props.tagName))
        props.tagName.sub(value => {
            const update = createElementNS(value);
            setObjectProps(update, props);
            element.replaceWith(update);
            element = update;
        });
    return element;
}

function appendNodesList(parent, children) {
    let nodes = createNodesList(vof(children));
    parent.append(...nodes);
    iss(children) && children.sub(value => {
        let i = nodes.length;
        while (i--) nodes[i].remove();
        nodes = createNodesList(value);
        parent.append(...nodes);
    });
}

function createNodesList(props) {
    let i = props.length;
    const list = new Array(i);
    while (i--) list[i] = createNode(props[i]);
    return list;
}

function setObjectProps(target, props) {
    const propsStatic = vof(props);
    for (let key in propsStatic) {
        if (key === "tagName")
            continue;
        else if (key === "children")
            appendNodesList(target, propsStatic.children);
        else if (tof(propsStatic[key]) === "object")
            setObjectProps(target[key], propsStatic[key]);
        else
            setPrimitiveProp(target, key, propsStatic[key]);
    }
    iss(props) && props.sub((curr, prev) => {
        unsetObjectProps(target, prev);
        setObjectProps(target, curr);
    });
}

function unsetObjectProps(target, props) {
    for (let key in props) {
        if (key === "tagName" || key === "children")
            continue;
        else if (tof(props[key]) === "object")
            unsetObjectProps(target[key], vof(props[key]));
        else
            unsetPrimitiveProp(target, key);
    }
}

function setPrimitiveProp(target, key, value) {
    try {
        isAttribute(target, key, vof(value))
        ? target.setAttribute(attributeName(key), vof(value))
        : target[key] = vof(value);
    }
    catch (error) {
        console.warn("failed property assignment: " + key, error);
    }
    iss(value) && value.sub(value => setPrimitiveProp(target, key, value));
}

function unsetPrimitiveProp(target, key) {
    try {
        isAttribute(target, key)
        ? target.removeAttribute(attributeName(key))
        : target[key] = null;
    }
    catch (error) {
        console.warn("failed property unassignment: " + key, error);
    }
}

function isAttribute(target, key, value) {
    return target.hasAttribute
        && (target.hasAttribute(attributeName(key))
        || (target.namespaceURI !== HTMLnamespace && typeof value === "string"));
}

function attributeName(key) {
    return key === "className" ? "class" : key;
}

export class State {
    __value;
    __subs;
    constructor(value) {
        this.__value = value;
        this.__subs = [];
    }
    static from(value) {
        return new State(value);
    }
    static use(states) {
        const state = new State({});
        for (let key in states) {
            state.value[key] = states[key].value;
            states[key].sub(parent => state.set(
                curr => Object.assign(curr, { [key]: parent })
            ));
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
        let childState = new State(f(this.__value));
        this.sub(v => childState.value = f(v));
        return childState;
    }
    sub(f) {
        this.__subs.push(f);
        return 1;
    }
    __dispatch(curr, prev) {
        this.__subs = this.__subs.filter(f => {
            try {
                f(curr, prev);
                return true;
            }
            catch {
                return false;
            }
        });
    }
    toJSON() {
        return JSON.stringify(this.value);
    }
}

function iss(v) {
    return v instanceof State;
}

function vof(v) {
    return v instanceof State ? v.value : v;
}

function tof(v) {
    return typeof vof(v);
}
