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
