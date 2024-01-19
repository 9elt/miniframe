import { createNode, State } from '.';
import { JSDOM } from 'jsdom';

global.window = (new JSDOM('<!DOCTYPE html><body></body>')).window;

let failed = 0;

function test(expected, subs) {
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
