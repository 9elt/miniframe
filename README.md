# Miniframe

Miniframe is a better version of `document.createElement` with support for JSX and minimal state
management in 500 lines of code. It was created for people that like vanilla JS
and enjoy rolling out their own code, but don't like how convoluted and inconvenient
it is to create and manage html elements.

It provides a `createNode` function

```tsx
const div = createNode(
    <div>
        <p>Hello, World!</p>
    </div>
);
```

And a `State` class to easily control the nodes

```tsx
const name = new State("World");

const div = createNode(
    <div>
        <p>Hello, {name}!</p>
    </div>
);

div.outerHTML; // "<div><p>Hello, World!</p></div>"

name.value = "Miniframe";

div.outerHTML; // "<div><p>Hello, Miniframe!</p></div>"
```

## Quick start

Quickly start a project with

```
npx @9elt/miniframe
```

## Documentation

Detailed documentation and examples are available [here](https://9elt.github.io/miniframe)
