import { MiniframeElement, State, createNode } from "./index";
import { JSDOM } from 'jsdom';

declare var global: any;
declare var process: any;

global.window = (new JSDOM('<!DOCTYPE html><body></body>')).window;
global.document = window.document;

/*

types

*/

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

/*

functionality

*/

let failed = 0;

function test(expected: string, subs: any) {
    const HTML = window.document.body.innerHTML;
    if (HTML !== expected)
        ++failed && console.log(
            '\ntest failed',
            '\n  expected -> ', expected,
            '\n  got -> ', HTML,
            '\n'
        );
    const states = { id, color, style, textNode, element, children };
    for (let id in subs)
        if (subs[id] !== states[id]._s.length)
            ++failed && console.log(
                '\ntest failed',
                '\n  expected ', id, 'subs -> ', subs[id],
                '\n  got -> ', states[id]._s.length,
                '\n'
            );
}

/*

states

*/

const id = new State('0');

const color = new State('#000');

const style = new State({ color });

const textNode = new State('0');

const element = new State({
    tagName: 'span',
    children: ['0']
});

const children = new State([
    textNode,
    element
]);

/*

createNode

*/

window.document.body.append(
    createNode({ tagName: 'div', id, style, children })
);

/*

tests

*/

test('<div id="0" style="color: rgb(0, 0, 0);">0<span>0</span></div>', {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

id.value = '1';

test('<div id="1" style="color: rgb(0, 0, 0);">0<span>0</span></div>', {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

color.value = '#fff';

test('<div id="1" style="color: rgb(255, 255, 255);">0<span>0</span></div>', {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

style.value = { color };
style.value = { color };
style.value = { color };

style.value = { background: 'none' };

test('<div id="1" style="background: none;">0<span>0</span></div>', {
    id: 1,
    color: 4,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

color.value = '#fff';

test('<div id="1" style="background: none;">0<span>0</span></div>', {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

textNode.value = '1';

test('<div id="1" style="background: none;">1<span>0</span></div>', {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

element.value = {
    tagName: 'b',
    children: ['1']
};

test('<div id="1" style="background: none;">1<b>1</b></div>', {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

children.value = [
    element,
    textNode,
];

test('<div id="1" style="background: none;"><b>1</b>1</div>', {
    id: 1,
    color: 0,
    style: 1,
    textNode: 2,
    element: 2,
    children: 1,
});

textNode.value = '1';

element.value = {
    tagName: 'b',
    children: ['1']
};

test('<div id="1" style="background: none;"><b>1</b>1</div>', {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

/*

result

*/

if (failed) {
    console.log('\n' + failed, 'tests have failed\n');
    process.exit(1);
}
