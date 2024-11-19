import { State } from ".";

function jsx(key, props) {
    props ||= {};

    if (props.children) {
        props.children =
            props.children instanceof State
                ? props.children
                : Array.isArray(props.children)
                    ? props.children.flat()
                    : [props.children];
    }

    if (typeof key === "function") {
        return key(props);
    }

    props.tagName = key;
    return props;
}

function Fragment(props) {
    return props.children;
}

export { Fragment, jsx, jsx as jsxDEV, jsx as jsxs };
