# Miniframe

Everything you need to create UIs with states, in 200 loc

> this is a beta, don't use it in production

## example

A simple counter that stops at 10

```js
import { State, createNode } from "@9elt/miniframe";

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

document.body.prepend(root);
```
