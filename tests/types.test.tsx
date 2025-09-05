import { State, createNode, type MiniNode } from "../index";
import "./util";

const jsx0 = <p>Hello</p>;

const jsx1: MiniNode = <p>Hello</p>;

const p0 = createNode(
    <p>Hello</p>
);

const p1 = createNode<HTMLParagraphElement>(
    <p>Hello</p>
);

const p2: HTMLParagraphElement = createNode(
    new State(<p>Hello</p>)
);

const p3 = createNode(
    <>
        <p>Hello</p>
    </>
);

const p4 = document.createElement("p");

function P0() {
    return (<p></p>);
}

function Div0({ children }: { children: MiniNode }) {
    return (<p>{children}</p>);
}

function Div1({ children }: { children: MiniNode[] }) {
    return (<p>{children}</p>);
}

function Div2() {
    return new State(<p></p>);
}

const div1 = createNode(
    <div>
        <p></p>
        {p4}
        <P0 />
        {/* @ts-expect-error */}
        <Div0></Div0>
        <Div0>
            <p></p>
        </Div0>
        {/* @ts-expect-error */}
        <Div1>
            <p></p>
        </Div1>
        <Div1>
            <p></p>
            <p></p>
        </Div1>
        <Div2></Div2>
        {new State(<p></p>)}
        {new State(p4)}
        {new State(<P0 />)}
        {new State(
            // @ts-expect-error
            <Div0></Div0>
        )}
        {new State(
            <Div0>
                <p></p>
            </Div0>
        )}
        {new State(
            // @ts-expect-error
            <Div1>
                <p></p>
            </Div1>
        )}
        {new State(
            <Div1>
                <p></p>
                <p></p>
            </Div1>
        )}
        {new State(<Div2></Div2>)}
    </div>
);
