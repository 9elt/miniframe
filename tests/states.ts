import { Mini, State, createNode } from '../index';
import { expect, done, use } from './util';


const id: State<'0' | '1'> = new State('0');

const color: State<'#000' | '#fff'> = new State('#000');

const style: State<{ color: State<'#000' | '#fff'> } | { background: 'none' }> = new State({ color });

const textNode: State<'B' | 'A'> = new State('B');

const element: State<Mini.Element> = new State({ tagName: 'span', children: '0' });

const children: State<(State<string> | State<Mini.Element>)[]> = new State([textNode, element]);

const states = { id, color, style, textNode, element, children };

const root = createNode({ tagName: 'div' as const, id, style, children });


use(root);

expect.html('<div id="0" style="color: rgb(0, 0, 0);">B<span>0</span></div>');

expect.subs(states, {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


id.value = '1';


expect.html('<div id="1" style="color: rgb(0, 0, 0);">B<span>0</span></div>');

expect.subs(states, {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


color.value = '#fff';


expect.html('<div id="1" style="color: rgb(255, 255, 255);">B<span>0</span></div>');

expect.subs(states, {
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


expect.html('<div id="1" style="background: none;">B<span>0</span></div>');

expect.subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


color.value = '#fff';


expect.html('<div id="1" style="background: none;">B<span>0</span></div>');

expect.subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


textNode.value = 'A';


expect.html('<div id="1" style="background: none;">A<span>0</span></div>');

expect.subs(states, {
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


expect.html('<div id="1" style="background: none;">A<b>1</b></div>');

expect.subs(states, {
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

children.value = [
    element,
    textNode,
];

children.value = [
    element,
    textNode,
];

children.value = [
    element,
    textNode,
];

expect.html('<div id="1" style="background: none;"><b>1</b>A</div>');

expect.subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


textNode.value = 'A';

element.value = {
    tagName: 'b',
    children: ['1']
};


expect.html('<div id="1" style="background: none;"><b>1</b>A</div>');

expect.subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

root.clearStateTree();
root.remove();

expect.subs(states, {
    id: 0,
    color: 0,
    style: 0,
    textNode: 0,
    element: 0,
    children: 0,
});

done();
