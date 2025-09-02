const miniElement = (
    <div>
        <p>Hello, World!</p>
    </div>
);

miniElement.tagName; // "div"
miniElement.children; // { tagName: "p" ... }

const htmlElement = createNode(miniElement);

htmlElement.outerHTML // <div><p>Hello, W...
