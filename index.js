export { createElement as render, state, isState, valueOf, typeOf };


function createElement(props) {
    let element = document.createElement(valueOf(valueOf(props).tagName));
    setProps(element, valueOf(props));
    if (isState(props)) {
        props.sub(value => {
            let update = createElement(value);
            element.replaceWith(update);
            element = update;
        });
    }
    else if (isState(props.tagName)) {
        props.tagName.sub(value => {
            let update = document.createElement(value);
            setProps(update, props);
            element.replaceWith(update);
            element = update;
        });
    }
    return element;
}

function createTextNode(text) {
    let element = document.createTextNode(valueOf(text));
    if (isState(text)) {
        text.sub(value => {
            let update = document.createTextNode(value);
            element.replaceWith(update);
            element = update;
        });
    }
    return element;
}

function createNode(props) {
    return typeOf(props) === "object" ? createElement(props) : createTextNode(props);
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
            nodes.forEach(el => el?.remove());
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

function unsetProps(target, props) {
    for (let k in props) {
        if (k === "children" || k === "tagName") {
            continue;
        }
        else if (typeOf(props[k]) === "object") {
            unsetProps(target[k], valueOf(props[k]));
        }
        else {
            setStaticProp(target, k, undefined);
        }
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
        target[k] = prop;
    }
    catch (error) {
        console.warn("failed property assignment: " + k, error);
    }
}

function state(value) {
    return new State(value);
}

class State {
    #value;
    #subs;
    constructor(value) {
        this.#value = value;
        this.#subs = [];
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
