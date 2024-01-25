import { State, createNode, type MiniElement } from '../index';
import { assert, done, subs, use } from './util';


const id: State<'0' | '1'> = new State('0');

const color: State<'#000' | '#fff'> = new State('#000');

const style: State<{ color: State<'#000' | '#fff'> } | { background: 'none' }> = new State({ color });

const textNode: State<'0' | '1'> = new State('0');

const element: State<MiniElement> = new State({ tagName: 'span', children: ['0'] });

const children: State<(State<string> | State<MiniElement>)[]> = new State([textNode, element]);

const states = { id, color, style, textNode, element, children };

const root = createNode({ tagName: 'div', id, style, children });


use(root);

assert('<div id="0" style="color: rgb(0, 0, 0);">0<span>0</span></div>');

subs(states, {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


id.value = '1';


assert('<div id="1" style="color: rgb(0, 0, 0);">0<span>0</span></div>');

subs(states, {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


color.value = '#fff';


assert('<div id="1" style="color: rgb(255, 255, 255);">0<span>0</span></div>');

subs(states, {
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


assert('<div id="1" style="background: none;">0<span>0</span></div>');

subs(states, {
    id: 1,
    color: 4,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


color.value = '#fff';


assert('<div id="1" style="background: none;">0<span>0</span></div>');

subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


textNode.value = '1';


assert('<div id="1" style="background: none;">1<span>0</span></div>');

subs(states, {
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


assert('<div id="1" style="background: none;">1<b>1</b></div>');

subs(states, {
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


assert('<div id="1" style="background: none;"><b>1</b>1</div>');

subs(states, {
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


assert('<div id="1" style="background: none;"><b>1</b>1</div>');

subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


done();
