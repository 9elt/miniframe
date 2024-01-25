export function createNode<T extends Tags>(props: MiniElement<T>): InferElement<T>;

export function createNode(props: MiniElement): Element;

export type MiniElement<T extends Tags | 1 = 1> =
    T extends Tags ? NamedMiniElement<T> :
    AnyMiniElement;

export type InferElement<T extends Tags> =
    T extends HTMLTags ? HTMLMap[T] :
    T extends SVGTags ? SVGMap[T] :
    T extends MathMLTags ? MathMLMap[T] :
    never;

export type MiniHTMLElement<T extends HTMLTags | 1 = 1> =
    T extends HTMLTags ? NamedMiniHTMLElement<T> :
    AnyMiniHTMLElement;

export type HTMLChild = Node | AnyMiniElement | Stringish | Falsish;

export type MiniSVGElement<T extends SVGTags | 1 = 1> =
    T extends SVGTags ? NamedMiniSVGElement<T> :
    AnyMiniSVGElement;

export type SVGChild = Node | AnyMiniSVGElement | Stringish | Falsish;

export type MiniMathMLElement<T extends MathMLTags | 1 = 1> =
    T extends MathMLTags ? NamedMiniMathMLElement<T> :
    AnyMiniMathMLElement;

export type MathMLChild = Node | AnyMiniMathMLElement | Stringish | Falsish;

export class State<T> {
    constructor(value: T);
    set value(value: T);
    get value(): T;
    static use<T extends StateGroup>(states: T): State<SpreadStatic<T>>;
    set(f: (current: T) => T): void;
    as<C>(f: (value: T) => C): State<C>;
    sub(f: Sub<T>): Sub<T>;
    unsub(f: Sub<T>): void;
}

export type Dynamic<T> = T | State<T>;

export type SpreadDynamic<T> = T extends object
    ? Dynamic<{ [K in keyof T]: SpreadDynamic<T[K]> }>
    : Dynamic<T>;

export type Static<T> = T extends State<infer U> ? U : T;

export type SpreadStatic<T> = Static<T> extends object
    ? { [K in keyof Static<T>]: SpreadStatic<Static<T>[K]> }
    : Static<T>;

export type Sub<T> = (current: T, previous: T) => void;

type AnyMiniElement = AnyMiniHTMLElement | AnyMiniSVGElement | AnyMiniMathMLElement;

type AnyMiniHTMLElement = { [T in HTMLTags]: NamedMiniHTMLElement<T>; }[HTMLTags];

type AnyMiniSVGElement = { [T in SVGTags]: NamedMiniSVGElement<T>; }[SVGTags];

type AnyMiniMathMLElement = { [T in MathMLTags]: NamedMiniMathMLElement<T>; }[MathMLTags];

type NamedMiniElement<T extends Tags> =
    T extends HTMLTags ? NamedMiniHTMLElement<T> :
    T extends SVGTags ? NamedMiniSVGElement<T> :
    T extends MathMLTags ? NamedMiniMathMLElement<T> :
    never;

type NamedMiniHTMLElement<T extends HTMLTags> = {
    tagName: T;
    namespaceURI?: "http://www.w3.org/1999/xhtml";
    children?: Dynamic<Dynamic<HTMLChild>[]>;
} & ElementProps<HTMLMap[T]>;

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
    V extends CSSStyleDeclaration ? SpreadDynamic<Partial<V>> :
    Dynamic<V>;

type StateGroup = { [key: string]: State<any> };

type Stringish = string | number;

type Falsish = null | undefined | false;
