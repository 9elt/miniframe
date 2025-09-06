const name = new State("World");

const div = createNode(
    <div>
        <p>Hello, {name}!</p>
    </div>
);

div.outerHTML; // "<div><p>Hello, World!</p></div>"

name.value = "Miniframe";

div.outerHTML; // "<div><p>Hello, Miniframe!</p></div>"
