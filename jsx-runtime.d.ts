import type { MiniElement } from ".";

type Tags =
    | keyof HTMLElementTagNameMap
    | keyof SVGElementTagNameMap
    | keyof MathMLElementTagNameMap;

type Child =
    | MiniElement
    | HTMLElement
    | SVGElement
    | MathMLElement
    | string
    | null
    | false;

export function jsx(
    tagName: Tags | Function,
    props: Partial<MiniElement> & { children?: Child[] }
): MiniElement;

export function jsxDEV(
    tagName: Tags | Function,
    props: Partial<MiniElement> & { children?: Child[] }
): MiniElement;

export function jsxs(
    tagName: Tags | Function,
    props: Partial<MiniElement> & { children?: Child[] }
): MiniElement;

export function Fragment(
    props: Partial<MiniElement> & { children?: Child[] }
): MiniElement;

export declare namespace JSX {
    interface IntrinsicElements {
        [element: string]: any;
    }
    interface ElementChildrenAttribute {
        children: any;
    }
}
