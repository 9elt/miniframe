const name = new State("World");

const p = createNode(<p>Hello, {name}!</p>);

p.innerHTML; // "Hello, World!"

name.value = "Miniframe";

p.innerHTML; // "Hello, Miniframe!"
