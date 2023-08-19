# Miniframe

A small library to create state aware html elements using JavaScript objects.

> this is a beta, don't use it in production

Miniframe is meant to be used with vanilla JavaScript, on **small projects** that don't need a framework. In about 300 LOC, it provides a **simple and flexible** way to create and manage UI elements.

## example

### A simple counter that stops at 10

```js
import { State, render } from "@9elt/miniframe";

const counter = State.from(0);
const message = State.from("keep going!");
const color = State.from("green");

const handleClick = () => {
  if (counter.value < 10 && ++counter.value === 10) {
    message.value = "stop!";
    color.value = "red";
  }
}

const rootElement = render({
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

## states

### create a state

```js
const state = State.from(0);
```

### set the state value

```js
state.value = state.value + 1;
```

```js
state.value++;
```

The `set` method sets the state value in function of the current one
```js
state.set(curr => curr + 1);
```

### access the state value

```js
state.value; // 3
```

### object states

```js
const state = State.from({ mini: "frame", foo: "bar" });
```

```js
state.value = { ...state.value, foo: "foo" };
```

```js
state.set(curr => ({ ...curr, foo: "foo" }));
```

Directly setting an object state property will modify the state value WITHOUT triggering updates
```js
state.value.foo = "foo"; // no updates
```

### manipulate a state

The `as` method creates a child state
```js
const n = State.from(3);
const str = n.as(v => v + "%");

str.value; // "3%"
```

The `use` method combines multiple states into a single object state
```js
const n1 = State.from(2);
const n2 = State.from(3);

const group = State.use({ n1, n2 });

group.value; // { n1: 2, n2: 3 }
```

### subscribe to a state

```js
const state = State.from(3);

state.sub((curr, prev) => {
  console.log("state changed, delta:", curr - prev);
});

state.value *= 3;
// > state changed, delta: 6
```
