import type { Mini, MiniNode, MiniX } from ".";

type TagNames = keyof MiniX.IntrinsicElements;
type Fn = ((props: any) => any);

export function jsx<T extends TagNames | Fn>(
    key: T,
    props: T extends TagNames ? MiniX.IntrinsicElements[T] : T extends Fn ? Parameters<T>[0] : never
): Mini.Element;

export function jsxs<T extends TagNames | Fn>(
    key: T,
    props: T extends TagNames ? MiniX.IntrinsicElements[T] : T extends Fn ? Parameters<T>[0] : never
): Mini.Element;

export function jsxDEV<T extends TagNames | Fn>(
    key: T,
    props: T extends TagNames ? MiniX.IntrinsicElements[T] : T extends Fn ? Parameters<T>[0] : never
): Mini.Element;

export function Fragment(
    props: Partial<Mini.Element> & { children?: MiniNode[] }
): Mini.Element;

export declare namespace JSX {
    interface IntrinsicElements extends MiniX.IntrinsicElements { }
    interface Element extends Mini.Element { }
    interface ElementChildrenAttribute {
        children: any;
    }
}
