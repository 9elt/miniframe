# Miniframe

A small library to create state aware html elements using JavaScript objects.

> this is a beta, don't use it in production

Miniframe is meant to be used with vanilla JavaScript, on **small projects** that don't need a framework. In about 200 LOC, it provides a **simple and flexible** way to create and manage UI elements.

## example

A simple counter that stops at 10

```js
import { State, createNode } from "@9elt/miniframe";

const counter = State.from(0);
const message = State.from("keep going!");
const color = State.from("green");

const handleClick = () => {
  if (counter.value < 10 && ++counter.value === 10) {
    message.value = "stop!";
    color.value = "red";
  }
}

const rootElement = createNode({
  tagName: "div",
  id: "root",
  style: { textAlign: "center" },
  children: [
    {
      tagName: "p",
      children: [counter.as(c => "current count: " + c)]
    },
    {
      tagName: "p",
      style: { color },
      children: [message]
    },
    {
      tagName: "button",
      children: ["increment"],
      onclick: handleClick,
    }
  ]
});

document.body.prepend(rootElement);
```

## node.js

In node.js, provide a `Document` to the `createNode` function

```js
const { createNode } = require("@9elt/miniframe");
const { JSDOM } = require("jsdom");

const document = (new JSDOM('<!DOCTYPE html><body></body>')).window.document;

const rootElement = createNode({ tagName: "p" }, document);

document.body.prepend(rootElement);
```

## states

The `State` class interface

|name|description|
|-|-|
|*static* **`from`**|create a state|
|*static* **`use`**|combine multiple states into a single object state|
|*get* **`value`**|get the state current value|
|*set* **`value`**|set the state current value|
|**`set`**|set the state value in function of its current value|
|**`as`**|create a child state|
|**`sub`**|subscribe a callback to state updates|

#### A note on object states

Directly setting an object state property will modify the state value, but won't dispatch updates.

```js
state.value = { ...state.value, foo: "bar" }; // OK
```

```js
state.set(curr => ({ ...curr, foo: "bar" })); // OK
```

```js
state.value.foo = "bar"; // no updates
```
