const name = new State("World");

function Component() {
    return (
        <div>
            <p>Hello, {name}!</p>
        </div>
    );
}

for (let i = 0; i < 1000; i++) {
    // NOTE: Ok, no nodes have been created
    <Component />
}
