function jsx(key, props) {
    props ||= {};

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
