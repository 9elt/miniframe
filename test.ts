import { MiniframeElement, createNode } from "./index";

const divTest: MiniframeElement = {
    tagName: 'div',
    className: 'class',
    children: [{
        tagName: 'p',
        children: [
            '0',
            0,
            null,
            false,
            undefined,
            document.createElement('span'),
        ],
    }],
};

createNode(divTest);

const svgTest: MiniframeElement<"http://www.w3.org/2000/svg", "svg"> = {
    tagName: 'svg',
    namespaceURI: "http://www.w3.org/2000/svg",
    style: {},
    viewBox: '0 0 64 64',
    children: [{
        tagName: "path",
        namespaceURI: "http://www.w3.org/2000/svg",
        d: "M0,0 64,0 64,64 0,64z",
    }]
};

createNode(svgTest);
