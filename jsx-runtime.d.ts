import type { Mini, MiniNode } from ".";

type TagName = keyof Mini.Elements;
type Intrinsic<T> = Omit<T, "tagName">;

export function jsx(key: string | Function, props: Object): MiniNode;

export function jsxs(key: string | Function, props: Object): MiniNode;

export function jsxDEV(key: string | Function, props: Object): MiniNode;

export function Fragment(props: Object): MiniNode;

export declare namespace JSX {
    type IntrinsicElements = {
        [T in TagName]: Intrinsic<Mini.Elements[T]>;
    };
    type Element = MiniNode;
    type ElementChildrenAttribute = {
        children: any;
    };
}
