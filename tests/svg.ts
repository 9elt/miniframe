import { State, createNode, type MiniElement, type MiniSVGElement } from '../index';
import { assert, done, use } from './util';


const miniframeSvg: MiniElement<'svg'> = {
    // `tagName` and `namespaceURI` need to be costant
    // and cannot just have type of `string`
    tagName: 'svg' as const,
    // `namespaceURI` needs to be explicit
    // for SVG and MathML elements
    namespaceURI: 'http://www.w3.org/2000/svg' as const,
    className: new State('0'),
    children: [
        {
            tagName: 'path' as const,
            namespaceURI: 'http://www.w3.org/2000/svg' as const,
            d: 'M0,0Z',
        },
        {
            tagName: 'rect' as const,
            namespaceURI: 'http://www.w3.org/2000/svg' as const,
            x: '0',
            y: '0',
            width: '64',
            height: '64',
        },
    ],
};

const htmlSvg: SVGSVGElement = createNode(miniframeSvg);


const miniframeSvg1: MiniElement = preventInference<MiniElement>(miniframeSvg);

const htmlSvg1: Element = createNode(miniframeSvg1);


const miniframeSvg2: MiniElement<'svg'> = miniframeSvg;

const htmlSvg2: SVGSVGElement = createNode(miniframeSvg2);


const miniframeSvg3: MiniSVGElement<'svg'> = miniframeSvg;

const htmlSvg3: SVGSVGElement = createNode(miniframeSvg3);


use(htmlSvg);

assert('<svg class="0"><path d="M0,0Z"></path><rect x="0" y="0" width="64" height="64"></rect></svg>');

done();


function preventInference<T>(v: T) { return v; }
