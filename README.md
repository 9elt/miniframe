# Miniframe

Everything you need to create nodes with states, in 200 LOC

> [!WARNING]  
> This is a beta, do not use in production!

## usage

In your `tsconfig.json` add:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@9elt/miniframe"
  }
}
```

## example

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
