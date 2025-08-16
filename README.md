# Miniframe

A better version of `document.createElement` with support for JSX and minimal state
management in 300 LOC.

```
npm i @9elt/miniframe
```

Try it now:

```
npx @9elt/miniframe-template jsx-bun --name my-miniframe-project
```

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

State can be transformed:

```tsx
const name = new State("World");

const nameUpperCase = name.as(n => n.toUpperCase());
nameUpperCase.value; // "WORLD"

name.value = "9elt";
nameUpperCase.value; // "9ELT"
```

Components and global states come for free!

```tsx
const name = new State("World");

function Greeting() {
    return (<p>Hello, {name}!</p>);
}

const p = createNode(<Greeting />);
```

Finally, `Promise` states can be awaited:

```tsx
const promise = fetch("https://example.com");

const response = new State(promise).await(null); // State<Response | null>

response.value; // null

await promise;

response.value; // Response { ... }
```

## Example

A simple counter that stops at 10:

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
            Increment
        </button>
    );
}

document.body.appendChild(
    createNode(
        <Counter />
    )
);
```

## Async state limitations

During async code execution it is impossible to track all state dependencies,
meaning some may not be cleaned up when needed.

To avoid this, it is very important that `State.as`, when called with an `async`
callback, never contains `State.as`, `State.merge` or `State.sub` calls.

<table>
<tr><td>✗ Unsafe</td><td>✓ Best practice</td></tr>
<tr></tr>

<tr>
<td>

Do NOT use components and states inside `State.as async`

</td>
<td>

Have your logic in `State.as async`, then your components and states
synchronously

</td>
</tr>

<tr>
<td>

```tsx
state
    .as(async v => {
        const data = await getData(v);

        // WARNING: This state can't
        // be tracked at all
        const stray = state.as(...);

        // WARNING: Component could be
        // calling State.as internally
        return (
            <Component data={data} />
        );
    })
    .await(init);
```

</td>
<td>

```tsx
state
    .as(getData)
    .await(init)
    .as(data => {
        const tracked = state.as(...);

        return (
            <Component data={data} />
        );
    });
```

</td>
</tr>
</table>
