import type { Mini, MiniNode, State } from ".";

type TagName = keyof Mini.IntrinsicElements;

type Fn = (props: unknown) => unknown;

type Props<K> = K extends TagName ? Mini.IntrinsicElements[K] :
    K extends Fn ? Parameters<K>[0] :
    never;

export function jsx<K extends TagName | Fn>(key: K, props: Props<K>): Mini.Element;

export function jsxs<K extends TagName | Fn>(key: K, props: Props<K>): Mini.Element;

export function jsxDEV<K extends TagName | Fn>(key: K, props: Props<K>): Mini.Element;

export function Fragment(props: { children: MiniNode }): Mini.Element;

export declare namespace JSX {
    type IntrinsicElements = Mini.IntrinsicElements;
    type Element = State<Element extends Mini.Element ? Mini.Element : never> | Mini.Element;
    type ElementChildrenAttribute = {
        children: any;
    }
}
