# Miniframe

Miniframe is a better version of `document.createElement` with support for JSX and minimal state
management in 500 lines of code. It was created for people that like vanilla JS
and enjoy rolling out their own code, but don't like how convoluted and inconvenient
it is to create and manage html elements.

It provides a `createNode` function

```tsx
const p = createNode(<p>Hello, World!</p>);
```

And a `State` class to easily control the nodes

```tsx
const name = new State("World");

const p = createNode(<p>Hello, {name}!</p>);

p.innerHTML; // "Hello, World!"

name.value = "9elt";

p.innerHTML; // "Hello, 9elt!"
```

## Quick start

Quickly start a project with

```
npx @9elt/miniframe
```

## Documentation

Detailed documentation and examples are available [here](https://9elt.github.io/miniframe)
