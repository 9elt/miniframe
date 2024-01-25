import { State, createNode } from '../index';
import { assert, done, use } from './util';

const counter = new State(0);

const root = createNode({
    tagName: "div",
    id: "root",
    style: { textAlign: "center" },
    children: [
        {
            tagName: "p",
            children: ["current count: ", counter]
        },
        {
            tagName: "p",
            style: {
                color: counter.as(c => c < 10 ? 'green' : 'red')
            },
            children: [counter.as(c => c < 10 ? 'keep going' : 'stop!')]
        },
        {
            tagName: "button",
            onclick: () => counter.value++,
            disabled: counter.as(c => c === 10),
            children: ["increment"],
        }
    ]
});


use(root);

const button = document.querySelector('button');


assert(`<div id="root" style="text-align: center;">\
<p>current count: 0</p>\
<p style="color: green;">keep going</p>\
<button>increment</button>\
</div>`);


button.click();


assert(`<div id="root" style="text-align: center;">\
<p>current count: 1</p>\
<p style="color: green;">keep going</p>\
<button>increment</button>\
</div>`);


for (let i = 0; i < 9; i++)
    button.click();


assert(`<div id="root" style="text-align: center;">\
<p>current count: 10</p>\
<p style="color: red;">stop!</p>\
<button disabled="">increment</button>\
</div>`);

done();
