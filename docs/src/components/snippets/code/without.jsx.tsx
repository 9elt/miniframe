const miniElement = {
    tagName: "div",
    children: {
        tagName: "p",
        chilren: "Hello, World!",
    },
};

miniElement.tagName; // "div"
miniElement.children; // { tagName: "p" ... }

const htmlElement = createNode(miniElement);

htmlElement.outerHTML // <div><p>Hello, W...
