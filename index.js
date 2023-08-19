const DOM = { document: typeof document !== "undefined" ? document : null };

function useDOM(document) {
    DOM.document = document;
}

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
        ? DOM.document.createElementNS(namespaceMap[tagName], tagName)
        : DOM.document.createElement(tagName);
}

function createTextNode(text) {
    const element = DOM.document.createTextNode(valueOf(text));
    if (isState(text)) {
        text.sub(value => element.textContent = value);
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

function setStaticProp(target, key, value) {
    try {
        isAttr(target, key, value)
            ? target.setAttribute(attrName(key), value)
            : target[key] = value;
    }
    catch (error) {
        console.warn("failed property assignment: " + key, error);
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

function unsetStaticProp(target, key) {
    try {
        isAttr(target, key)
            ? target.removeAttribute(attrName(key))
            : target[key] = null;
    }
    catch (error) {
        console.warn("failed property unassignment: " + key, error);
    }
}

function isAttr(target, key, value) {
    return target.hasAttribute
        && (target.hasAttribute(attrName(key))
            || ((target.namespaceURI === SVG || target.namespaceURI === MATHML)
                && typeof value === "string"));
}

function attrName(key) {
    return key === "className" ? "class" : key;
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
const MATHML = "http://www.w3.org/1998/Math/MathML";

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

export { render, useDOM, State };
