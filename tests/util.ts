import { JSDOM } from 'jsdom';
import { State } from '../index';

declare var global: any;
declare var process: any;

global.window = (new JSDOM('<!DOCTYPE html><body></body>')).window;
global.document = window.document;

let failed = 0;

export function assert(expectedHtml: string) {
    const HTML = document.body.innerHTML;

    if (HTML !== expectedHtml)
        ++failed && console.log(
            '\ntest failed',
            '\n  expected -> ', expectedHtml,
            '\n  got -> ', HTML,
            '\n'
        );
}

export function subs<S extends { [key: string]: State<any> }>(states: S, subs: { [K in keyof S]: number }) {
    for (let id in subs)
        // @ts-ignore
        if (subs[id] !== states[id]._s.length)
            ++failed && console.log(
                '\ntest failed',
                '\n  expected ', id, 'subs -> ', subs[id],
                // @ts-ignore
                '\n  got -> ', states[id]._s.length,
                '\n'
            );
}

export function use(node: Node) {
    document.body.replaceChildren(node);
}

export function done() {
    if (failed) {
        console.log('\n' + failed, 'tests have failed\n');
        process.exit(1);
    }
}
