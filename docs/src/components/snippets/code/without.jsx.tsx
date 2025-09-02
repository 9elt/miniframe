const miniElement = {
    tagName: "div",
    children: {
        tagName: "p",
        chilren: "Hello, World!",
    },
};

const htmlElement = createNode(miniElement);

htmlElement.outerHTML // <div><p>Hello, W...
