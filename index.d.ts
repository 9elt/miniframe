export function createNode<T extends HTMLTags>(props: Dynamic<MiniHTMLElement<T>>): HTMLMap[T];

export function createNode<T extends SVGTags>(props: Dynamic<MiniSVGElement<T>>): SVGMap[T];

export function createNode<T extends MathMLTags>(props: Dynamic<MiniMathMLElement<T>>): MathMLMap[T];

export function createNode(props: Dynamic<MiniElement>): Element;

export function createNode(props: Dynamic<Stringish | Falsish>): Text;

export type MiniElement<T extends Tags | 1 = 1> =
    T extends Tags ? NamedMiniElement<T> :
    AnyMiniElement;

export type MiniHTMLElement<T extends HTMLTags | 1 = 1> =
    T extends HTMLTags ? NamedMiniHTMLElement<T> :
    AnyMiniHTMLElement;

export type MiniSVGElement<T extends SVGTags | 1 = 1> =
    T extends SVGTags ? NamedMiniSVGElement<T> :
    AnyMiniSVGElement;

export type MiniMathMLElement<T extends MathMLTags | 1 = 1> =
    T extends MathMLTags ? NamedMiniMathMLElement<T> :
    AnyMiniMathMLElement;

export type SVGChild = Node | AnyMiniSVGElement | Stringish | Falsish;

export type HTMLChild = Node | AnyMiniElement | Stringish | Falsish;

export type MathMLChild = Node | AnyMiniMathMLElement | Stringish | Falsish;

export class State<T> {
    constructor(value: T);
    set value(value: T);
    get value(): T;
    static use<T extends StateGroup>(states: T): State<SpreadStatic<T>>;
    set(f: (current: T) => T): void;
    as<C>(f: (value: T) => C): State<C>;
    sub(f: Sub<T>): Sub<T>;
    sub(f: AsyncSub<T>): AsyncSub<T>;
    unsub(f: Sub<T> | AsyncSub<T>): void;
}

export type Dynamic<T> = T | State<T>;

export type SpreadDynamic<T> =
    T extends object ? Dynamic<{ [K in keyof T]: SpreadDynamic<T[K]> }> :
    Dynamic<T>;

export type Static<T> = T extends State<infer U> ? U : T;

export type SpreadStatic<T> =
    Static<T> extends object ? { [K in keyof Static<T>]: SpreadStatic<Static<T>[K]> } :
    Static<T>;

export type Sub<T> = (current: T, previous: T) => void;

export type AsyncSub<T> = (current: T, previous: T) => Promise<void>;

type AnyMiniElement = AnyMiniHTMLElement | AnyMiniSVGElement | AnyMiniMathMLElement;

type AnyMiniHTMLElement = { [T in HTMLTags]: NamedMiniHTMLElement<T>; }[HTMLTags];

type AnyMiniSVGElement = { [T in SVGTags]: NamedMiniSVGElement<T>; }[SVGTags];

type AnyMiniMathMLElement = { [T in MathMLTags]: NamedMiniMathMLElement<T>; }[MathMLTags];

type NamedMiniElement<T extends Tags> =
    T extends HTMLTags ? NamedMiniHTMLElement<T> :
    T extends SVGTags ? NamedMiniSVGElement<T> :
    T extends MathMLTags ? NamedMiniMathMLElement<T> :
    never;

type NamedMiniHTMLElement<T extends HTMLTags> = ElementProps<HTMLMap[T]> & {
    tagName: T;
    namespaceURI?: "http://www.w3.org/1999/xhtml";
    children?: Dynamic<Dynamic<HTMLChild>[]>;
};

type NamedMiniSVGElement<T extends SVGTags> = Record<string, any> & {
    tagName: T;
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: Dynamic<Dynamic<SVGChild>[]>;
};

type NamedMiniMathMLElement<T extends MathMLTags> = Record<string, any> & {
    tagName: T;
    namespaceURI: "http://www.w3.org/1998/Math/MathML";
    children?: Dynamic<Dynamic<MathMLChild>[]>;
};

type Tags = HTMLTags | SVGTags | MathMLTags;

type HTMLTags = keyof HTMLMap;

type SVGTags = keyof SVGMap;

type MathMLTags = keyof MathMLMap;

type HTMLMap = HTMLElementTagNameMap;

type SVGMap = SVGElementTagNameMap;

type MathMLMap = MathMLElementTagNameMap;

type ElementProps<E extends Element> = { [P in ValidKeys<E>]?: Value<E[P]>; };

type ValidKeys<E extends Element> = Exclude<keyof E, RemovePropsMask>;

type RemovePropsMask =
    | `tagName`
    | `classList`
    | `baseUri`
    | `focus`
    | `${string}ttribute${string}`
    | `${string}DOCUMENT${string}`
    | `${string}NODE${string}`
    | `${string}hild${string}`
    | `${string}pend${string}`
    | `offset${string}`
    | `client${string}`
    | `is${string}`
    | `get${string}`
    | `set${string}`
    | `add${string}`
    | `has${string}`
    | `toggle${string}`
    | `insert${string}`
    | `remove${string}`
    | `scroll${string}`
    | `check${string}`
    | `request${string}`
    | `lookup${string}`
    | `compare${string}`
    | `dispatch${string}`
    | `replace${string}`;

type Value<V> =
    IsCurlyObject<V> extends true ? SpreadDynamic<Partial<V>> :
    Dynamic<V>;

type IsCurlyObject<T> =
    T extends Function ? false :
    T extends Array<any> ? false :
    T extends object ? true :
    false;

type StateGroup = { [key: string]: State<any> };

type Stringish = string | number;

type Falsish = null | undefined | false;
