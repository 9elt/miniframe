import { expect, test } from "bun:test";
import { State, createNode } from "../index";
import { subs } from "./util";

test("HTML elements are created", () => {
    const p = createNode<HTMLParagraphElement>(<p>Hello, World!</p>);
    expect(p.outerHTML).toEqual("<p>Hello, World!</p>");
});

test("HTML elements support states", () => {
    const className = new State<string | undefined>("className");
    const color = new State("red");
    const style = new State<Record<string, State<string>>>({ color });
    const key = new State("foo");
    const dataset = new State<Record<string, State<string>>>({ foo: key });
    const child = new State(<span>foo</span>);
    const textNode = new State("bar");
    const children = new State(<>{child}{textNode}</>);

    const div = createNode<HTMLDivElement>(
        <div
            className={className}
            style={style}
            dataset={dataset}
        >
            {children}
        </div>
    );

    expect(div.outerHTML).toEqual(`\
<div class="className" style="color: red;" data-foo="foo">\
<span>foo</span>bar\
</div>`);

    expect(subs(className)).toEqual(1);
    expect(subs(color)).toEqual(1);
    expect(subs(style)).toEqual(1);
    expect(subs(key)).toEqual(1);
    expect(subs(dataset)).toEqual(1);
    expect(subs(child)).toEqual(1);
    expect(subs(textNode)).toEqual(1);
    expect(subs(children)).toEqual(1);

    className.value = "changed";
    className.value = "changed";
    color.value = "blue";
    color.value = "blue";
    key.value = "bar";
    key.value = "bar";
    child.value = (<b>bar</b>);
    child.value = (<b>bar</b>);
    textNode.value = "foo";
    textNode.value = "foo";

    expect(div.outerHTML).toEqual(`\
<div class="changed" style="color: blue;" data-foo="bar">\
<b>bar</b>foo\
</div>`);

    expect(subs(className)).toEqual(1);
    expect(subs(color)).toEqual(1);
    expect(subs(style)).toEqual(1);
    expect(subs(key)).toEqual(1);
    expect(subs(dataset)).toEqual(1);
    expect(subs(child)).toEqual(1);
    expect(subs(textNode)).toEqual(1);
    expect(subs(children)).toEqual(1);

    dataset.value = { bar: key };
    dataset.value = { bar: key };
    style.value = { background: color };
    style.value = { background: color };
    children.value = (<>{textNode}{child}</>);
    children.value = (<>{textNode}{child}</>);

    expect(div.outerHTML).toEqual(`\
<div class="changed" style="background: blue;" data-bar="bar">\
foo<b>bar</b>\
</div>`);

    expect(subs(className)).toEqual(1);
    expect(subs(color)).toEqual(1);
    expect(subs(style)).toEqual(1);
    expect(subs(key)).toEqual(1);
    expect(subs(dataset)).toEqual(1);
    expect(subs(child)).toEqual(1);
    expect(subs(textNode)).toEqual(1);
    expect(subs(children)).toEqual(1);
});

test("HTML elements support element children", () => {
    const p = new State<HTMLElement>(document.createElement("p"));

    const div = createNode<HTMLDivElement>(
        <div>
            {document.createElement("p")}
            {p}
        </div>
    );

    expect(div.outerHTML).toEqual("<div><p></p><p></p></div>");

    p.value = document.createElement("b");

    expect(div.outerHTML).toEqual("<div><p></p><b></b></div>");
});

test("HTML elements repeated element children are removed", () => {
    const p = document.createElement("p");

    const children = new State(<>0{p}1{p}</>);

    const div = createNode<HTMLDivElement>(
        <div>
            {children}
        </div>
    );

    expect(div.innerHTML).toEqual("01<p></p>");

    children.value = (<>0<a />1<b /></>);

    expect(div.innerHTML).toEqual("0<a></a>1<b></b>");

    children.value = (<>0{p}1{p}</>);

    expect(div.innerHTML).toEqual("01<p></p>");

    children.value = (<>0</>);

    expect(div.innerHTML).toEqual("0");

    children.value = (<>0{p}1{p}</>);

    expect(div.innerHTML).toEqual("01<p></p>");

    children.value = (<>0<a />1<b />2<p /></>);

    expect(div.innerHTML).toEqual("0<a></a>1<b></b>2<p></p>");

    children.value = (<>0{p}1{p}2{p}3{p}4{p}5{p}</>);

    expect(div.innerHTML).toEqual("012345<p></p>");

    children.value = (<>0{p}1{p}2{p}3{p}4{p}</>);

    expect(div.innerHTML).toEqual("01234<p></p>");

    children.value = (<>0{p}1{p}</>);

    expect(div.innerHTML).toEqual("01<p></p>");

    const main = createNode<HTMLElement>(
        <main>
            {children}
        </main>
    );

    expect(main.innerHTML).toEqual("01<p></p>");
    expect(div.innerHTML).toEqual("01");
});

test("HTML elements support empty nodes", () => {
    const _0 = new State<0 | 1>(0);
    const _null = new State<null | 2>(null);
    const _false = new State<false | 3>(false);
    const _undefined = new State<undefined | 4>(undefined);

    const div = createNode<HTMLDivElement>(
        <div>
            {0}
            {_0}

            {null}
            {_null}

            {false as false}
            {_false}

            {undefined}
            {_undefined}
        </div>
    );

    expect(div.outerHTML).toEqual("<div>00</div>");

    _0.value = 1;
    _null.value = 2;
    _false.value = 3;
    _undefined.value = 4;

    expect(div.outerHTML).toEqual("<div>01234</div>");
});

test("HTML elements support empty node", () => {
    const _undefined = new State<undefined | 1>(undefined);

    const div = createNode<HTMLDivElement>(
        <div>
            {_undefined}
        </div>
    );

    expect(div.outerHTML).toEqual("<div></div>");

    _undefined.value = 1;

    expect(div.outerHTML).toEqual("<div>1</div>");
});

test("createNode creates div wrapper around State and Array", () => {
    const state = createNode<HTMLDivElement>(new State(<a />));

    expect(state.outerHTML).toEqual(`<div><a></a></div>`);

    const array = createNode<HTMLDivElement>(<><a /><b /></>);

    expect(array.outerHTML).toEqual(`<div><a></a><b></b></div>`);
});
