import type { Mini, MiniElement, MiniJSXElement, TagName } from ".";

type Intrinsic<T> = Omit<T, "tagName">;

export function jsx(key: string | Function, props: Object): MiniElement;

export function jsxs(key: string | Function, props: Object): MiniElement;

export function jsxDEV(key: string | Function, props: Object): MiniElement;

export function Fragment(props: Object): MiniElement;

export declare namespace JSX {
    type IntrinsicElements = {
        [T in TagName]: Intrinsic<Mini.Elements[T]>;
    };
    type Element = MiniJSXElement;
    type ElementChildrenAttribute = {
        children: any;
    };
}
