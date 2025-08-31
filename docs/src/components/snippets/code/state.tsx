const name = new State("World");

const p = createNode(<p>Hello, {name}!</p>);

p.textContent; // "Hello, World!"

name.value = "Miniframe";

p.textContent; // "Hello, Miniframe!"
