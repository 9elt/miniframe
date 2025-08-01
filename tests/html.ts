import { Mini, State, createNode } from '../index';
import { assert, done, use } from './util';

type Assert<A, B extends A> = true;

const miniframeDiv: Mini.HTMLDivElement = {
    // `tagName` and `namespaceURI` need to be costant
    // and cannot just have type of `string`
    tagName: 'div',
    className: new State('0'),
    style: new State({
        color: new State('#fff'),
    }),
    dataset: new State({
        test: new State("0"),
    }),
    children: [{
        tagName: 'div',
        children: [
            '0',
            new State('0'),

            0,
            new State(0),

            document.createElement('span'),
            new State(document.createElement('span')),

            document.createTextNode('0'),
            new State(document.createTextNode('0')),

            // the following children are all allowed and
            // result in an empty text node

            null,
            new State(null),

            false,
            new State(false),

            undefined,
            new State(undefined),
        ],
    }],
};


const test1 = createNode(miniframeDiv);
type test1_ = Assert<HTMLDivElement, typeof test1>;


const test2 = createNode(new State(miniframeDiv));
type test2_ = Assert<HTMLDivElement, typeof test2>;


const test3 = createNode({
    tagName: "path",
    namespaceURI: "http://www.w3.org/2000/svg",
});
type test3_ = Assert<Node, typeof test3>;


const test4 = createNode({
    tagName: "path",
    namespaceURI: "http://www.w3.org/2000/svg",
} as const);
type test4_ = Assert<SVGPathElement, typeof test4>;


const test5 = createNode(document.createElementNS("http://www.w3.org/2000/svg", "path"))
type test5_ = Assert<SVGPathElement, typeof test5>;


const pre6: Mini.Element = preventInference<Mini.Element>(miniframeDiv);
const test6 = createNode(pre6);
type test6_ = Assert<Element, typeof test6>;


use(test1);

assert(`<div \
class="0" \
style="color: rgb(255, 255, 255);" \
data-parent-ref="[object HTMLDivElement]" \
data-target-ref="[object Object]" \
data-test="0">\
<div>0000</div>\
</div>`);

done();


function preventInference<T>(v: T) { return v; }
