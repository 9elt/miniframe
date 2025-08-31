import { expect, test } from "bun:test";
import { State, createNode } from "../index";
import { subs } from "./util";

test("SVG elements are created", () => {
    const svg = createNode<SVGSVGElement>(
        <svg
            namespaceURI="http://www.w3.org/2000/svg"
            class="class"
            viewBox="0 0 64 64"
            stroke="blue"
            stroke-width={1}
            style={{ width: "100%" }}
        >
            <path namespaceURI="http://www.w3.org/2000/svg" d="M0,0 64,64Z" />
        </svg>
    );

    expect(svg.outerHTML).toEqual(`\
<svg class="class" viewBox="0 0 64 64" stroke="blue" stroke-width="1" style="width: 100%;">\
<path d="M0,0 64,64Z"></path>\
</svg>`);
});

test("SVG elements support states", () => {
    const className = new State("class");
    const viewBox = new State("0 0 64 64");
    const stroke = new State("blue");
    const strokeWidth = new State(1);
    const width = new State("100%");
    const height = new State("auto");
    const style = new State<Record<string, State<string>>>({ width });
    const d = new State("M0,0 64,64Z");
    const child = new State(
        <path namespaceURI="http://www.w3.org/2000/svg" d={d} />
    );

    const svg = createNode<SVGSVGElement>(
        <svg
            namespaceURI="http://www.w3.org/2000/svg"
            class={className}
            viewBox={viewBox}
            stroke={stroke}
            stroke-width={strokeWidth}
            style={style}
        >
            {child}
        </svg>
    );

    expect(svg.outerHTML).toEqual(`\
<svg class="class" viewBox="0 0 64 64" stroke="blue" stroke-width="1" style="width: 100%;">\
<path d="M0,0 64,64Z"></path>\
</svg>`);

    expect(subs(className)).toEqual(1);
    expect(subs(viewBox)).toEqual(1);
    expect(subs(stroke)).toEqual(1);
    expect(subs(strokeWidth)).toEqual(1);
    expect(subs(width)).toEqual(1);
    expect(subs(height)).toEqual(0);
    expect(subs(style)).toEqual(1);
    expect(subs(d)).toEqual(1);
    expect(subs(child)).toEqual(1);

    className.value = "changed";
    className.value = "changed";
    viewBox.value = "0 0 80 80";
    viewBox.value = "0 0 80 80";
    stroke.value = "red";
    stroke.value = "red";
    strokeWidth.value = 0.5;
    strokeWidth.value = 0.5;
    width.value = "50%";
    width.value = "50%";
    d.value = "M0,0 80,80Z";
    d.value = "M0,0 80,80Z";

    expect(svg.outerHTML).toEqual(`\
<svg class="changed" viewBox="0 0 80 80" stroke="red" stroke-width="0.5" style="width: 50%;">\
<path d="M0,0 80,80Z"></path>\
</svg>`);

    expect(subs(className)).toEqual(1);
    expect(subs(viewBox)).toEqual(1);
    expect(subs(stroke)).toEqual(1);
    expect(subs(strokeWidth)).toEqual(1);
    expect(subs(width)).toEqual(1);
    expect(subs(height)).toEqual(0);
    expect(subs(style)).toEqual(1);
    expect(subs(d)).toEqual(1);
    expect(subs(child)).toEqual(1);

    style.value = { height };
    style.value = { height };
    child.value = (
        <rect namespaceURI="http://www.w3.org/2000/svg" x={0} y={0} width={80} height={80} />
    );
    child.value = (
        <rect namespaceURI="http://www.w3.org/2000/svg" x={0} y={0} width={80} height={80} />
    );

    expect(svg.outerHTML).toEqual(`\
<svg class="changed" viewBox="0 0 80 80" stroke="red" stroke-width="0.5" style="height: auto;">\
<rect x="0" y="0" width="80" height="80"></rect>\
</svg>`);

    expect(subs(className)).toEqual(1);
    expect(subs(viewBox)).toEqual(1);
    expect(subs(stroke)).toEqual(1);
    expect(subs(strokeWidth)).toEqual(1);
    expect(subs(width)).toEqual(0);
    expect(subs(height)).toEqual(1);
    expect(subs(style)).toEqual(1);
    expect(subs(d)).toEqual(0);
    expect(subs(child)).toEqual(1);
});

test("SVG elements support element children", () => {
    const rect = new State<SVGElement>(
        document.createElementNS("http://www.w3.org/2000/svg", "rect")
    );

    const svg = createNode<SVGSVGElement>(
        <svg namespaceURI="http://www.w3.org/2000/svg">
            {document.createElementNS("http://www.w3.org/2000/svg", "rect")}
            {rect}
        </svg>
    );

    expect(svg.outerHTML).toEqual("<svg><rect></rect><rect></rect></svg>");

    rect.value = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    expect(svg.outerHTML).toEqual("<svg><rect></rect><circle></circle></svg>");
});

test("SVG elements support empty nodes", () => {
    const _0 = new State<0 | 1>(0);
    const _null = new State<null | 2>(null);
    const _false = new State<false | 3>(false);
    const _undefined = new State<undefined | 4>(undefined);

    const svg = createNode<SVGSVGElement>(
        <svg namespaceURI="http://www.w3.org/2000/svg">
            {0}
            {_0}

            {null}
            {_null}

            {false as false}
            {_false}

            {undefined}
            {_undefined}
        </svg>
    );

    expect(svg.outerHTML).toEqual("<svg>00</svg>");

    _0.value = 1;
    _null.value = 2;
    _false.value = 3;
    _undefined.value = 4;

    expect(svg.outerHTML).toEqual("<svg>01234</svg>");
});

test("SVG elements support empty node", () => {
    const _undefined = new State<undefined | 1>(undefined);

    const svg = createNode<SVGSVGElement>(
        <svg namespaceURI="http://www.w3.org/2000/svg">
            {_undefined}
        </svg>
    );

    expect(svg.outerHTML).toEqual("<svg></svg>");

    _undefined.value = 1;

    expect(svg.outerHTML).toEqual("<svg>1</svg>");
});

test("SVG elements require namespaceURI = http://www.w3.org/2000/svg", () => {
    // @ts-expect-error Property 'namespaceURI' is missing in type '{}'
    // but required in type 'Intrinsic<SVGSVGElement>'. [2741]
    (<svg />);
    // @ts-expect-error Type '"http://www.w3.org/1999/xhtml"' is not
    // assignable to type '"http://www.w3.org/2000/svg"'. [2322]
    (<svg namespaceURI="http://www.w3.org/1999/xhtml" />);
});
