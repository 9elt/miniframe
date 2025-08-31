const name = new State("World");

function Component() {
    // WARNING: On old browsers p will never be cleaned up,
    // avoid using createNode with global state when nodes
    // may not be persistent
    const p = createNode(<p>Hello, {name}!</p>);

    return (
        <div>{p}</div>
    );
}

for (let i = 0; i < 1000; i++) {
    // WARNING: 1000 nodes have been created, and will 
    // presist on old browsers
    <Component />
}
