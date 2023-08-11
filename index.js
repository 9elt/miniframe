function render(props) {
    let element = createElement(valueOf(valueOf(props).tagName));
    setProps(element, valueOf(props));
    if (isState(props)) {
        props.sub(value => {
            const update = render(value);
            element.replaceWith(update);
            element = update;
        });
    }
    else if (isState(props.tagName)) {
        props.tagName.sub(value => {
            const update = createElement(value);
            setProps(update, props);
            element.replaceWith(update);
            element = update;
        });
    }
    return element;
}

function createElement(tagName) {
    return namespaceMap[tagName]
        ? document.createElementNS(namespaceMap[tagName], tagName)
        : document.createElement(tagName);
}

function createTextNode(text) {
    let element = document.createTextNode(valueOf(text));
    if (isState(text)) {
        text.sub(value => {
            const update = document.createTextNode(value);
            element.replaceWith(update);
            element = update;
        });
    }
    return element;
}

function createNode(props) {
    return typeOf(props) === "object" ? render(props) : createTextNode(props);
}

function createChildrenNodes(children) {
    return children.map(child => createNode(child));
}

function setProps(target, props) {
    for (let k in props) {
        if (k === "tagName") {
            continue;
        }
        else if (k === "children") {
            setChildrenProps(target, props);
        }
        else if (typeOf(props[k]) === "object") {
            setObjectProps(target, props, k);
        }
        else {
            setPrimitiveProp(target, props, k);
        }
    }
}

function setChildrenProps(target, { children }) {
    let nodes = createChildrenNodes(valueOf(children));
    target.append(...nodes);
    if (isState(children)) {
        children.sub(value => {
            nodes.forEach(el => el.remove());
            nodes = createChildrenNodes(value);
            target.append(...nodes);
        });
    }
}

function setObjectProps(target, props, k) {
    setProps(target[k], valueOf(props[k]));
    if (isState(props[k])) {
        props[k].sub((value, prev) => {
            unsetProps(target[k], prev);
            setProps(target[k], value);
        });
    }
}

function setPrimitiveProp(target, prop, k) {
    setStaticProp(target, k, valueOf(prop[k]));
    if (isState(prop[k])) {
        prop[k].sub(value => setStaticProp(target, k, value));
    }
}

function setStaticProp(target, k, prop) {
    try {
        isAttr(target, prop) ? target.setAttribute(attrName(k), prop) : target[k] = prop;
    }
    catch (error) {
        console.warn("failed property assignment: " + k, error);
    }
}

function unsetProps(target, props) {
    for (let k in props) {
        if (k === "children" || k === "tagName") {
            continue;
        }
        else if (typeOf(props[k]) === "object") {
            unsetProps(target[k], valueOf(props[k]));
        }
        else {
            unsetStaticProp(target, k);
        }
    }
}

function unsetStaticProp(target, k) {
    try {
        isAttr(target) ? target.removeAttribute(attrName(k)) : target[k] = null;
    }
    catch (error) {
        console.warn("failed property unassignment: " + k, error);
    }
}

function isAttr(target, prop) {
    return target.namespaceURI
        && (target.namespaceURI === SVG || target.namespaceURI === MATHML)
        && (typeof prop === "string" || typeof prop === "undefined");
}

function attrName(name) {
    return name === "className" ? "class" : name;
}

class State {
    #value;
    #subs;
    constructor(value) {
        this.#value = value;
        this.#subs = [];
    }
    static from(value) {
        return new State(value);
    }
    static use(states) {
        const state = new State({});
        for (let k in states) {
            state.value[k] = states[k].value;
            states[k].sub(parent => state.set(
                curr => Object.assign(curr, { [k]: parent })
            ));
        }
        return state;
    }
    get value() {
        return this.#value;
    }
    set value(value) {
        this.#dispatch(value, this.#value);
        this.#value = value;
    }
    set(f) {
        this.value = f(this.#value);
    }
    as(f) {
        let childState = new State(f(this.#value));
        this.sub(v => childState.value = f(v));
        return childState;
    }
    sub(f) {
        this.#subs.push(f);
    }
    #dispatch(curr, prev) {
        this.#subs = this.#subs.filter(f => {
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

function isState(v) {
    return v instanceof State;
}

function valueOf(v) {
    return isState(v) ? v.value : v;
}

function typeOf(v) {
    return typeof valueOf(v);
}

const SVG = "http://www.w3.org/2000/svg";
const MATHML = "http://www.w3.org/2000/svg";

const namespaceMap = {
    "animate": SVG,
    "animateMotion": SVG,
    "animateTransform": SVG,
    "circle": SVG,
    "clipPath": SVG,
    "defs": SVG,
    "desc": SVG,
    "ellipse": SVG,
    "feBlend": SVG,
    "feColorMatrix": SVG,
    "feComponentTransfer": SVG,
    "feComposite": SVG,
    "feConvolveMatrix": SVG,
    "feDiffuseLighting": SVG,
    "feDisplacementMap": SVG,
    "feDistantLight": SVG,
    "feDropShadow": SVG,
    "feFlood": SVG,
    "feFuncA": SVG,
    "feFuncB": SVG,
    "feFuncG": SVG,
    "feFuncR": SVG,
    "feGaussianBlur": SVG,
    "feImage": SVG,
    "feMerge": SVG,
    "feMergeNode": SVG,
    "feMorphology": SVG,
    "feOffset": SVG,
    "fePointLight": SVG,
    "feSpecularLighting": SVG,
    "feSpotLight": SVG,
    "feTile": SVG,
    "feTurbulence": SVG,
    "filter": SVG,
    "foreignObject": SVG,
    "g": SVG,
    "image": SVG,
    "line": SVG,
    "linearGradient": SVG,
    "marker": SVG,
    "mask": SVG,
    "metadata": SVG,
    "mpath": SVG,
    "path": SVG,
    "pattern": SVG,
    "polygon": SVG,
    "polyline": SVG,
    "radialGradient": SVG,
    "rect": SVG,
    "set": SVG,
    "stop": SVG,
    "svg": SVG,
    "switch": SVG,
    "symbol": SVG,
    "text": SVG,
    "textPath": SVG,
    "tspan": SVG,
    "use": SVG,
    "view": SVG,
    "annotation": MATHML,
    "annotation-xml": MATHML,
    "maction": MATHML,
    "math": MATHML,
    "merror": MATHML,
    "mfrac": MATHML,
    "mi": MATHML,
    "mmultiscripts": MATHML,
    "mn": MATHML,
    "mo": MATHML,
    "mover": MATHML,
    "mpadded": MATHML,
    "mphantom": MATHML,
    "mprescripts": MATHML,
    "mroot": MATHML,
    "mrow": MATHML,
    "ms": MATHML,
    "mspace": MATHML,
    "msqrt": MATHML,
    "mstyle": MATHML,
    "msub": MATHML,
    "msubsup": MATHML,
    "msup": MATHML,
    "mtable": MATHML,
    "mtd": MATHML,
    "mtext": MATHML,
    "mtr": MATHML,
    "munder": MATHML,
    "munderover": MATHML,
    "semantics": MATHML
};

export { render, State };
