export function jsx(key, props) {
    if (typeof key === "function") {
        return key(props);
    }
    (props || (props = {})).tagName = key;
    return props;
}

export function Fragment(props) {
    return props.children;
}

export { jsx as jsxDEV, jsx as jsxs };
