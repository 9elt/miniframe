import { expect, test } from "bun:test";
import { State, createNode } from "../index";
import { subs } from "./util";

test("Nodes support nested states /children", () => {
    const a = new State("a");
    const b = new State("b");
    const c = new State<typeof a | string>(a);

    const text = new State<typeof c | string>(c);

    const div = createNode<HTMLDivElement>(<div>{text}</div>);

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("a");

    a.value = "A";

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("A");

    c.value = b;

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(1);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("b");

    b.value = "B";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(1);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("B");

    c.value = "C";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("C");

    c.value = a;

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("A");

    text.value = "T"

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(0);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("T");
});

test("Nodes support nested states /child", () => {
    const a = new State("a");
    const b = new State("b");
    const c = new State<typeof a | string>(a);

    const text = new State<typeof c | string>(c);

    const div = createNode<HTMLDivElement>(<div>!{text}</div>);

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("!a");

    a.value = "A";

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("!A");

    c.value = b;

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(1);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("!b");

    b.value = "B";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(1);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("!B");

    c.value = "C";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("!C");

    c.value = a;

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("!A");

    text.value = "T"

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(0);
    expect(subs(text)).toEqual(1);

    expect(div.textContent).toEqual("!T");
});

test("Nodes support nested states /property", () => {
    const a = new State("a");
    const b = new State("b");
    const c = new State<typeof a | string>(a);

    const className = new State<typeof c | string>(c);

    const div = createNode<HTMLDivElement>(
        // @ts-expect-error Type 'State<State<State<string>>>' is not ...
        <div className={className} />
    );

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(className)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div class="a"></div>`);

    a.value = "A";

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(className)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div class="A"></div>`);

    c.value = b;

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(1);
    expect(subs(c)).toEqual(1);
    expect(subs(className)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div class="b"></div>`);

    b.value = "B";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(1);
    expect(subs(c)).toEqual(1);
    expect(subs(className)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div class="B"></div>`);

    c.value = "C";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(className)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div class="C"></div>`);

    c.value = a;

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(className)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div class="A"></div>`);

    className.value = "T";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(0);
    expect(subs(className)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div class="T"></div>`);
});

test("Nodes support nested states /nested/property", () => {
    const a = new State("azure");
    const b = new State("blue");
    const c = new State<typeof a | string>(a);

    const style: State<{ color: typeof c | string }> = new State({
        color: c,
    });

    const div = createNode<HTMLDivElement>(
        // @ts-expect-error Type 'State<State<State<string>>>' is not ...
        <div style={style} />
    );

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(style)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div style="color: azure;"></div>`);

    a.value = "aquamarine";

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(style)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div style="color: aquamarine;"></div>`);

    c.value = b;

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(1);
    expect(subs(c)).toEqual(1);
    expect(subs(style)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div style="color: blue;"></div>`);

    b.value = "brown";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(1);
    expect(subs(c)).toEqual(1);
    expect(subs(style)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div style="color: brown;"></div>`);

    c.value = "cyan";

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(style)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div style="color: cyan;"></div>`);

    c.value = a;

    expect(subs(a)).toEqual(1);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(1);
    expect(subs(style)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div style="color: aquamarine;"></div>`);

    style.value = { color: "black" };

    expect(subs(a)).toEqual(0);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(0);
    expect(subs(style)).toEqual(1);

    expect(div.outerHTML).toEqual(`<div style="color: black;"></div>`);
});
