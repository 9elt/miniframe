import { State, createNode, type Mini } from '../index';
import { assert, done, use } from './util';


const miniframeSvg = {
    // `tagName` and `namespaceURI` need to be costant
    // and cannot just have type of `string`
    tagName: 'svg' as const,
    // `namespaceURI` needs to be explicit
    // for SVG and MathML elements
    namespaceURI: 'http://www.w3.org/2000/svg' as const,
    className: new State("0"),
    viewBox: "0 0 64 64",
    children: [
        {
            tagName: 'path' as const,
            namespaceURI: 'http://www.w3.org/2000/svg' as const,
            d: 'M0,0Z',
        },
        new State({
            tagName: 'rect' as const,
            namespaceURI: 'http://www.w3.org/2000/svg' as const,
            x: '0',
            y: '0',
            width: '64',
            height: '64',
        }),
    ],
};

const htmlSvg: SVGSVGElement = createNode(miniframeSvg);

const miniframeSvg1: Mini.Element = preventInference<Mini.Element>(miniframeSvg);

const htmlSvg1: Element = createNode(miniframeSvg1);

const miniframeSvg2: Mini.SVGSVGElement = miniframeSvg;

const htmlSvg2: SVGSVGElement = createNode(miniframeSvg2);

const miniframeSvg3: Mini.SVGSVGElement = miniframeSvg;

const htmlSvg3: SVGSVGElement = createNode(miniframeSvg3);


use(htmlSvg);

assert(`<svg class="0" viewBox="0 0 64 64">\
<path d="M0,0Z"></path>\
<rect x="0" y="0" width="64" height="64"></rect>\
</svg>`);

done();


function preventInference<T>(v: T) { return v; }
