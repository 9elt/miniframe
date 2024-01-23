import { MiniframeElement, State, createNode } from "./index";

const divTest: MiniframeElement = {
    tagName: 'div',
    className: 'class',
    children: [{
        tagName: 'p',
        children: [

            '0',
            new State('0'),

            0,
            new State(0),

            document.createElement('span'),
            new State(document.createElement('span')),

            document.createTextNode('0'),
            new State(document.createTextNode('0')),

            // the following children are all allowed and
            // result in an empty text node

            null,
            new State(null),

            false,
            new State(false),

            undefined,
            new State(undefined),
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
