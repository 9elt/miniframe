import type { Mini, MiniNode } from ".";

type TagNames = keyof Mini.IntrinsicElements;
type Fn = ((props: any) => any);

export function jsx<T extends TagNames | Fn>(
    key: T,
    props: T extends TagNames ? Mini.IntrinsicElements[T] : T extends Fn ? Parameters<T>[0] : never
): Mini.Element;

export function jsxs<T extends TagNames | Fn>(
    key: T,
    props: T extends TagNames ? Mini.IntrinsicElements[T] : T extends Fn ? Parameters<T>[0] : never
): Mini.Element;

export function jsxDEV<T extends TagNames | Fn>(
    key: T,
    props: T extends TagNames ? Mini.IntrinsicElements[T] : T extends Fn ? Parameters<T>[0] : never
): Mini.Element;

export function Fragment(
    props: Partial<Mini.Element> & { children?: MiniNode[] }
): Mini.Element;

export declare namespace JSX {
    interface IntrinsicElements extends Mini.IntrinsicElements { }
    interface Element extends Mini.Element { }
    interface ElementChildrenAttribute {
        children: any;
    }
}
