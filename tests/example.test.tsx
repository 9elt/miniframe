import { expect, test } from "bun:test";
import { State, createNode } from "../lib";
import "./util";

test("Example counter works and stops at 10", () => {
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

    const root = createNode<HTMLDivElement>(
        <Counter />
    );

    expect(root.outerHTML).toEqual(`\
<div class="counter" style="text-align: center;">\
<p>Current count: <span style="color: green;">0</span></p>\
<button>Increment</button>\
</div>`);

    const button = root.querySelector("button")!;

    expect(button).not.toBeNull();

    button.click();

    expect(root.outerHTML).toEqual(`\
<div class="counter" style="text-align: center;">\
<p>Current count: <span style="color: green;">1</span></p>\
<button>Increment</button>\
</div>`);

    for (let i = 0; i < 9; i++) {
        button.click();
    }

    expect(root.outerHTML).toEqual(`\
<div class="counter" style="text-align: center;">\
<p>Current count: <span style="color: red;">10</span></p>\
<button disabled="">Increment</button>\
</div>`);
});
