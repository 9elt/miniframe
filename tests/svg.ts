import { createNode, type MiniframeElement } from '../index';
import { assert, done, use } from './util';


const svgTest: MiniframeElement<'http://www.w3.org/2000/svg', 'svg'> = {
    tagName: 'svg',
    namespaceURI: 'http://www.w3.org/2000/svg',
    style: { fill: '#fff' },
    viewBox: '0 0 64 64',
    children: [{
        tagName: 'path',
        namespaceURI: 'http://www.w3.org/2000/svg',
        d: 'M0,0 0,64z',
    }]
};


use(createNode(svgTest));


assert('<svg style="fill: #fff;" viewBox="0 0 64 64"><path d="M0,0 0,64z"></path></svg>');


const inferCorrectNamespaceTagNameType: MiniframeElement = {
    tagName: 'path',
    namespaceURI: 'http://www.w3.org/2000/svg',
};

const inferCorrectTagNameType: MiniframeElement<'http://www.w3.org/2000/svg'> = {
    tagName: 'path',
    namespaceURI: 'http://www.w3.org/2000/svg',
};

const pathDAddtribute: MiniframeElement<'http://www.w3.org/2000/svg', 'path'> = {
    tagName: 'path',
    namespaceURI: 'http://www.w3.org/2000/svg',
    d: 'M0,0 0,64z',
};


done();
