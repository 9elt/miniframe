import { JSDOM } from 'jsdom';
import { State, createNode } from '../index';

// @ts-ignore
State.prototype.toString = function () {
    return `State<${this.name || this.value}, subs: ${this._subs.length}>`;
};

// @ts-ignore
State.prototype.toJSON = function () {
    return this.toString();
};

declare var global: any;
declare var process: any;

global.window = (new JSDOM('<!DOCTYPE html><body></body>')).window;
global.document = window.document;

let failed = 0;

export const expect = { html, subs, eq };

let description = "";
export function describe(label: string) {
    description = label;
}


function html(expectedHtml: string) {
    const HTML = document.body.innerHTML;

    if (HTML !== expectedHtml)
        ++failed && console.log(
            '\ntest failed', description,
            '\n  expected -> ', expectedHtml,
            '\n  got -> ', HTML,
            '\n'
        );
}

function subs<S extends { [key: string]: State<any> }>(states: S, subs: { [K in keyof S]: number }) {
    for (let id in subs) {
        // @ts-ignore
        if (subs[id] !== states[id]._subs.length) {
            ++failed;
            console.log(
                '\ntest failed', description,
                '\n  expected ', id, 'subs -> ', subs[id],
                // @ts-ignore
                '\n  got -> ', states[id]._subs.length,
                '\n'
            );
        }
    }
}

function eq<T>(actual: T, expected: T) {
    if (actual !== expected) {
        ++failed;
        console.log(
            '\ntest failed', description,
            '\n  expected -> ', expected,
            '\n  got -> ', actual,
            '\n'
        );
    }
}

export function use(node: Node) {
    document.body.replaceChildren(node);
}

export function done() {
    if (failed) {
        console.log('\n' + failed, 'tests have failed\n');
        // @ts-ignore
        process.exit(1);
    }
}
