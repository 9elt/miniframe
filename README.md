# Miniframe

Everything you need to create nodes with states, in 300 LOC

> This is a beta, do not use in production!

## Usage

In your `tsconfig.json` add:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@9elt/miniframe"
  }
}
```

## Introduction

Miniframe provides a simple API to create nodes, for example:

```tsx
const p = createNode(<p>Hello, World!</p>);
```

Is virtually equivalent to:

```tsx
const p = document.createElement("p");
p.append("Hello, World!");
```

But `createNode` can do more!

```tsx
const name = new State("World");

const p = createNode(<p>Hello, {name}!</p>);

p.textContent; // "Hello, World!"

name.value = "9elt";

p.textContent; // "Hello, 9elt!"
```

Also, there are components and global state is free!

```tsx
const name = new State("World");

function Greeting() {
    return (<p>Hello, {name}!</p>);
}

const p = createNode(<Greeting />);
```

## A simple counter

A simple counter that stops at 10

```js
import { createNode, State } from "@9elt/miniframe";

const counter = new State(0);

const div = createNode(
    <div id="root" style={{ textAlign: "center" }}>
        <p>current count: {counter}</p>
        <p
            style={{
                color: counter.as((c) => (c < 10 ? "green" : "red")),
            }}
        >
            {counter.as((c) => (c < 10 ? "keep going" : "stop!"))}
        </p>
        <button
            onclick={() => counter.value++}
            disabled={counter.as((c) => c === 10)}
        >
            increment
        </button>
    </div>
);

document.body.append(div);
```
