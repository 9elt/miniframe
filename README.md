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

Components and global states are free!

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

## Handling async state

States with `Promise` values can be awaited:

```tsx
async function get(url) { ... }

const url = new State("https://example.com");

const data = url
    .as(async url => await get(url))
    .await("Loading...");

data.value // "Loading..."

await sleep(1000);

data.value // <!DOCTYPE html><html...
```

### Async state limitations

It is very important that when called with an
`async` callback `State.as` never contains nested
`State.as` calls:

<table>
<tr><td>Unsafe</td><td>Best practice</td></tr>
<tr>
<td>

```tsx
state.as(async value => {
    const data = await getData(value);

    // WARNING: This is unsafe,
    // Component could be calling
    // State.as internally
    return (
        <Component data={data} />
    );
}).await(init);
```

</td>
<td>

```tsx
state
    .as(async value => 
        await getData(value)
    )
    .await(init)
    .as(data => (
        <Component data={data} />
    ));
```

</td>
</tr>
</table>
