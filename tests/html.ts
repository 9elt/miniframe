import { State, createNode, type MiniframeElement } from '../index';
import { assert, done, use } from './util';


const htmlDivTest: MiniframeElement = {
    tagName: 'div',
    className: '0',
    children: [{
        tagName: 'p',
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


use(createNode(htmlDivTest));


assert('<div class="0"><p>0000<span></span><span></span>00</p></div>');


const htmlDivTypeCastTest: MiniframeElement<'http://www.w3.org/1999/xhtml', 'div'> = htmlDivTest;

const htmlLinkTest: MiniframeElement = {
    tagName: 'a',
    href: '/',
    children: ['...'],
};

const htmlLinkTypeCastTest: MiniframeElement<'http://www.w3.org/1999/xhtml', 'a'> = htmlLinkTest;

const htmlFormTest: MiniframeElement = {
    tagName: 'form',
    onsubmit: () => { },
    children: [{
        tagName: 'input',
        oninput: () => { },
    }]
};

const htmlFromTypeCastTest: MiniframeElement<'http://www.w3.org/1999/xhtml', 'form'> = htmlFormTest;


done();
