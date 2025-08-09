// @ts-ignore
import { Mini, State, createNode, clearStateTree } from '../index';
import { assert, done, subs, use } from './util';


const id: State<'0' | '1'> = new State('0');

const color: State<'#000' | '#fff'> = new State('#000');

const style: State<{ color: State<'#000' | '#fff'> } | { background: 'none' }> = new State({ color });

const textNode: State<'B' | 'A'> = new State('B');
// @ts-ignore
textNode.debug = true;

const element: State<Mini.Element> = new State({ tagName: 'span', children: '0' });

const children: State<(State<string> | State<Mini.Element>)[]> = new State([textNode, element]);
// @ts-ignore
children.debug = true;

const states = { id, color, style, textNode, element, children };

const root = createNode({ tagName: 'div', id, style, children });


use(root);

assert('<div id="0" style="color: rgb(0, 0, 0);">B<span>0</span></div>');

subs(states, {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


id.value = '1';


assert('<div id="1" style="color: rgb(0, 0, 0);">B<span>0</span></div>');

subs(states, {
    id: 1,
    color: 1,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


color.value = '#fff';


assert('<div id="1" style="color: rgb(255, 255, 255);">B<span>0</span></div>');

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


assert('<div id="1" style="background: none;">B<span>0</span></div>');

subs(states, {
    id: 1,
    color: 4,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


color.value = '#fff';


assert('<div id="1" style="background: none;">B<span>0</span></div>');

subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});


textNode.value = 'A';


assert('<div id="1" style="background: none;">A<span>0</span></div>');

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


assert('<div id="1" style="background: none;">A<b>1</b></div>');

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

assert('<div id="1" style="background: none;"><b>1</b>A</div>');

subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 2,
    element: 2,
    children: 1,
});


textNode.value = 'A';

element.value = {
    tagName: 'b',
    children: ['1']
};


assert('<div id="1" style="background: none;"><b>1</b>A</div>');

subs(states, {
    id: 1,
    color: 0,
    style: 1,
    textNode: 1,
    element: 1,
    children: 1,
});

// @ts-ignore
clearStateTree(document.body.children[0].tree);
document.body.children[0].remove();

subs(states, {
    id: 0,
    color: 0,
    style: 0,
    textNode: 0,
    element: 0,
    children: 0,
});

const glob = new State(0);
const glob2 = new State(0);

const state = new State(32);

const gstate = new State(50);

const group = State.use({ gstate });

const main = createNode(
    {
        tagName: "div",
        children: glob.as(() => {
            const state2 = state.as((state) => state * 2);
            // @ts-ignore
            state2.DEBUG = true;

            return (
                {
                    tagName: "div",
                    children: [
                        state,
                        " and ",
                        state2,
                        state2,
                        group,
                        State.use({ gstate })
                            .as(({ gstate }) => gstate)
                            .as((gstate) => gstate),
                        glob2.as(() => (
                            {
                                tagName: "div",
                                children: [
                                    state2,
                                    state2,
                                ],
                            }
                        ))
                    ]
                }
            );
        }),
    }
);

use(main);

subs({ glob, state, gstate }, {
    glob: 1,
    state: 2,
    gstate: 2,
});

glob.value = 1;
glob.value = 1;
glob.value = 1;
glob.value = 1;
glob.value = 1;
glob.value = 1;

glob2.value = 1;

subs({ glob, state, gstate }, {
    glob: 1,
    state: 2,
    gstate: 2,
});
//
// const page = new State(3);
//
// const data = page.asyncAs(
//     async (page) => {
//         await new Promise((r) => setTimeout(r, 100));
//         return { page };
//     },
//     undefined
// );
//
// // @ts-ignore
// console.log(state, state._subs.toString());
//
// done();
