import { MiniframeElement, createNode } from "./index";

let a: MiniframeElement<"http://www.w3.org/2000/svg", "svg"> = {
    tagName: 'svg',
    namespaceURI: "http://www.w3.org/2000/svg",
    style: {},
    viewBox: '0 0 64 64',
    children: []
};

createNode(a);

