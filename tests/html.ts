import { State, createNode, type MiniElement, type MiniHTMLElement } from '../index';
import { assert, done, use } from './util';


const miniframeDiv: MiniElement<'div'> = {
    // `tagName` and `namespaceURI` need to be costant
    // and cannot just have type of `string`
    tagName: 'div' as const,
    className: new State('0'),
    style: new State({
        color: new State('#fff'),
    }),
    dataset: new State({
        test: new State("0"),
    }),
    children: [{
        tagName: 'div' as const,
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

            // `false` is allowed, but not `true`
            false as const,
            new State(false as const),

            undefined,
            new State(undefined),
        ],
    }],
};

const htmlDiv: HTMLDivElement = createNode(miniframeDiv);


const miniframeDiv1: MiniElement = preventInference<MiniElement>(miniframeDiv);

const htmlDiv1: Element = createNode(miniframeDiv1);


const miniframeDiv2: MiniElement<'div'> = miniframeDiv;

const htmlDiv2: HTMLDivElement = createNode(miniframeDiv2);


const miniframeDiv3: MiniHTMLElement<'div'> = miniframeDiv;

const htmlDiv3: HTMLDivElement = createNode(miniframeDiv3);


use(htmlDiv);

assert('<div class="0" style="color: rgb(255, 255, 255);" data-__pref="[object HTMLDivElement]" data-__tref="[object Object]" data-test="0"><div>0000</div></div>');

done();


function preventInference<T>(v: T) { return v; }
