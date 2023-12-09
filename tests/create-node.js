import { JSDOM } from 'jsdom';
import { createNode, State } from '../index.js';

global.window = (new JSDOM('<!DOCTYPE html><body></body>')).window;
global.document = window.document;

const id = State.from('initial-id');

const color = State.from('#f00');
const style = State.from({ color });

const textChild = State.from('initial-text-child');
const elementChild = State.from({ tagName: 'span', children: ['initial-element-child'] });

const children = State.from([textChild, elementChild]);

function log() {
    console.log(document.body.innerHTML
        .replace(/</g, '\n<')
        .replace(/>/g, '>\n'));
    console.log('id subs', id._s.length);
    console.log('color subs', color._s.length);
    console.log('style subs', style._s.length);
    console.log('textChild subs', textChild._s.length);
    console.log('elementChild subs', elementChild._s.length);
    console.log('children subs', children._s.length);
}

const root = createNode({
    tagName: 'div',
    id,
    style,
    children
});

document.body.append(root);

log();

id.value = 'ID-CHANGED';

log();

color.value = 'magenta';
color.value = 'magenta';
color.value = 'magenta';
color.value = 'magenta';

log();

style.value = { backgroundColor: 'blue' };
color.value = 'magenta';

log();

style.value = { color };
style.value = { color };
style.value = { color };
style.value = { color };
style.value = { color };
style.value = { color };
style.value = { color };

log();

style.value = { backgroundColor: 'blue' };
color.value = 'magenta';

log();

textChild.value = 'CHANGED-text-child';
elementChild.value = { tagName: 'div', children: ['CHANGED-element-child'] };

log();

children.value = [elementChild, textChild];

log();
