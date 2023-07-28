# Miniframe

A small library to create state aware html elements using JavaScript objects.

> this is a beta, don't use it in production

Miniframe is meant to be used with vanilla JavaScript, on **small projects** that don't need a framework. In under 200 loc, it provides a **simple and flexible** way to create and manage UIs.

## example

**A simple counter that stops at 10**

```js
import { state, render } from "@9elt/miniframe";

const counter = state(0);
const message = state("keep going!");
const color = state("green");

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
      style: { color: color },
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

**Setting a state**

```js
const counter = state(0);

counter.value = counter.value + 1;
counter.value++;
counter.set(value => value + 1);

counter.value // 3
```

Under the hood, the `value` setter and the `set` method are the same, but the latter makes for cleaner syntax with objects.

**Setting an object state**

```js
const object = state({ foo: "bar", bar: "foo" });

object.value = { ...object.value, bar: "changed" }; // works
object.set(c => ({ ...c, bar: "changed" })); // works

object.value.bar = "changed": // DOES NOT work
```

Directly changing an object state property value will not trigger updates.

**Manipulating a state**

```js
const counter = state(0);
const label = counter.as(v => "current count: " + v);

label.value // "current count: 0"

const object = state({ foo: "bar" });
const foo = object.as(v => v.foo);

foo.value // "bar"
```

The `as` method creates a child state subscribed to its parent updates. The parent won't be affected by its children updates.
