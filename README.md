# Miniframe

A better version of `document.createElement` with support for JSX and minimal state
management in 300 LOC

## JSX Support

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

Miniframe was created for people that like vanilla JS and enjoy rolling out their own code,
but don't like how convoluted and inconvenient it is to create and manage html elements. It
provides a `createNode` function with a simple API:

```tsx
const p = createNode(<p>Hello, World!</p>);
```

It is virtually equivalent to:

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

Components and global state are free!

```tsx
const name = new State("World");

function Greeting() {
    return (<p>Hello, {name}!</p>);
}

const p = createNode(<Greeting />);
```

## A simple counter

A simple counter that stops at 10

```tsx
import { createNode, State } from "@9elt/miniframe";

function Counter() {
    const counter = new State(0);
    const color = counter.as(c => c < 10 ? "green" : "red");

    return (
        <div className="counter" style={{ textAlign: "center" }}>
            <p>
                Current count: <span style={{ color }}>{counter}</span>
            </p>
            <Button counter={counter} />
        </div>
    );
}

function Button({ counter }: { counter: State<number> }) {
    return (
        <button
            onclick={() => counter.value++}
            disabled={counter.as(c => c === 10)}
        >
            INCREMENT
        </button>
    );
}

document.body.appendChild(
    createNode(
        <Counter />
    )
);
```
