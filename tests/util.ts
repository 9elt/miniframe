import { JSDOM } from 'jsdom';
import { State } from '../index';

declare var global: any;
declare var process: any;

global.window = (new JSDOM('<!DOCTYPE html><body></body>')).window;
global.document = window.document;

let failed = 0;
let tree: any;

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
        if (subs[id] !== states[id]._subs.length) {
            ++failed;
            console.log(
                '\ntest failed',
                '\n  expected ', id, 'subs -> ', subs[id],
                // @ts-ignore
                '\n  got -> ', states[id]._subs.length,
                '\n'
            );
            // @ts-ignore
            // printDebug(document.body.children[0].tree);
        }
}

export function use(node: Node) {
    document.body.replaceChildren(node);
    // @ts-ignore
    tree = node.tree;
}

export function done() {
    if (failed) {
        console.log('\n' + failed, 'tests have failed\n');
        // @ts-ignore
        printDebug(tree);
        process.exit(1);
    }
}

function printDebug(tree: any, depth = 0) {
    if (tree.state) {
        tree.state.toJSON = () => {
            return `State<${JSON.stringify(tree.state._value)}${tree.state._DEBUG_ || ""}>`;
        };
    }

    console.log(" ".repeat(depth * 4) + (tree.state ? `${JSON.stringify(tree.state)} (${tree.subs.length} subs; over ${tree.state._subs.length})` : `None`));

    if (false && tree.state) {
        console.log("");
        console.log(tree.state?._subs.toString());
        console.log("");
    }

    for (const child of tree.children) {
        printDebug(child, depth + 1);
    }
}
