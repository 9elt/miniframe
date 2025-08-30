import { JSDOM } from 'jsdom';
import { State } from "../index";

// @ts-ignore
global.window = (new JSDOM("<!DOCTYPE html>")).window;
global.document = window.document;

export function subs(state: State<unknown>) {
    // @ts-ignore
    return state._subs.length;
}

export function dependents(state: State<unknown>) {
    // @ts-ignore
    return state._dependents?.length ?? 0;
}

export function StateStack() {
    // @ts-ignore
    return State._Stack.length;
}

export function StateHeader() {
    // @ts-ignore
    return State._Header;
}

type Wait = (<T>(data: T, ms?: number) => Promise<T>) & {
    last?: Promise<void>
};

export const wait: Wait = async <T>(data: T, ms = 100) => {
    const promise: Promise<T> = new Promise(resolve =>
        setTimeout(() => resolve(data), ms)
    );
    wait.last = new Promise(resolve =>
        setTimeout(resolve, ms + 1)
    );
    return promise;
}
