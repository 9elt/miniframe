export function createNode<
    NS extends NamespaceURI = "http://www.w3.org/1999/xhtml",
    TN extends TagNamesNS<NS> = TagNamesNS<NS>
>(
    props: MiniframeElement<NS, TN>
): NamespaceMap[NS][TN];

export type MiniframeElement<
    NS extends NamespaceURI = "http://www.w3.org/1999/xhtml",
    TN extends TagNamesNS<NS> = TagNamesNS<NS>
> = {
    tagName: TN;
    namespaceURI?: NS;
    children?: Dynamic<
        Dynamic<Node | MiniframeElement | StringLike | Nullable>[]
    >;
} &
    ElementProps<NamespaceMap[NS][TN]>;

export type Dynamic<T> = T | State<T>;

export type Static<T> = T extends State<infer U> ? U : T;

export class State<T> {
    constructor(value: T);
    set value(value: T);
    get value(): T;
    static use<T extends StatesGroup>(states: T): State<SpreadStatic<T>>;
    set(f: (current: T) => T): void;
    as<C>(f: (value: T) => C): State<C>;
    sub(f: Sub<T>): Sub<T>;
    unsub(f: Sub<T>): void;
    #private;
}

type Sub<T> = (current: T, previous: T) => void;

type TagNamesNS<NS extends NamespaceURI> = keyof NamespaceMap[NS];

type NamespaceURI = keyof NamespaceMap;

type NamespaceMap = {
    "http://www.w3.org/1999/xhtml": HTMLElementTagNameMap;
    "http://www.w3.org/2000/svg": SVGElementTagNameMap;
    "http://www.w3.org/1998/Math/MathML": MathMLElementTagNameMap;
};

type ElementProps<E> = E extends Element
    ? { [P in ExtractKeys<E>]?: Valid<P, E[P]>; }
    : {};

type Valid<Name, V> = IsObject<V> extends true
    ? V extends CSSStyleDeclaration
    ? Partial<SpreadDynamic<V>>
    : { [key: string]: string | number } | string
    : V extends Function
    ? Name extends `on${string}`
    ? Dynamic<V>
    : never
    : Dynamic<V>;

type ExtractKeys<E extends Element> = Exclude<keyof E, Mask>;

type Mask =
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
    | `dispatch${string}`;

type StatesGroup = { [key: string]: State<any> };

type SpreadDynamic<T> = T extends object
    ? Dynamic<{ [K in keyof T]: SpreadDynamic<T[K]> }>
    : Dynamic<T>;

type SpreadStatic<T> = IsObject<Static<T>> extends true
    ? { [K in (keyof Static<T>)]: SpreadStatic<Static<T>[K]> }
    : Static<T>;

type IsObject<T> = T extends Function ? false
    : T extends Array<any> ? false
    : T extends object ? true
    : false;

type StringLike = string | number;

type Nullable = null | undefined;
