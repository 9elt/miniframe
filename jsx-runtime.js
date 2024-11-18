import { State } from ".";

function jsx(tagName, props) {
    props ||= {};

    if (props.children) {
        props.children =
            props.children instanceof State
                ? props.children
                : Array.isArray(props.children)
                    ? props.children.flat()
                    : [props.children];
    }

    if (typeof tagName === "function") {
        return tagName(props);
    }

    props.tagName = tagName;

    return props;
}

function Fragment(props) {
    return props.children;
}

export { Fragment, jsx, jsx as jsxDEV, jsx as jsxs };

