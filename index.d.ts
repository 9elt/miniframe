export function createNode<T extends TagNames>(
    props: MiniframeElement<T>
): TagNamesMap[T];

type MiniframeElement<TagName extends TagNames = TagNames> = {
    tagName: TagName;
    children?: Dynamic<
        Dynamic<Node | MiniframeElement | StringLike | Nullable>[]
    >;
} &
    ElementProps<TagName>;

export type TagNames = keyof TagNamesMap;

export type Dynamic<T> = T | State<T>;

export type Static<T> = T extends State<infer U> ? U : T;

export class State<T> {
    set value(arg: T);
    get value(): T;
    static from<T>(value: T): State<T>;
    static use<T extends StatesGroup>(states: T): State<SpreadStatic<T>>;
    set(f: (current: T) => T): void;
    as<C>(f: (value: T) => C): State<C>;
    asyncAs<C>(f: (value: T) => Promise<C>): Promise<State<C>>;
    sub(f: (current: T, previous: T) => void): number;
    #private;
}

// private
type TagNamesMap = HTMLElementTagNameMap & SVGElementTagNameMap & MathMLElementTagNameMap;
type ElementProps<T extends TagNames> = { [P in ElementKeys<T>]?: Valid<P, TagNamesMap[T][P]>; };
type Valid<Name, V> = IsObject<V> extends true ? V extends CSSStyleDeclaration ? Partial<SpreadDynamic<V>> : { [key: string]: string | number } | string : V extends Function ? Name extends `on${string}` ? Dynamic<V> : never : Dynamic<V>;
type ElementKeys<T extends TagNames> = Exclude<keyof TagNamesMap[T], InvalidProps>;
type InvalidProps = 'attributes' | 'tagName' | `child${string}` | `set${string}` | `add${string}` | `remove${string}`;
type StatesGroup = { [key: string]: State<any> };
type SpreadDynamic<T> = T extends object ? Dynamic<{ [K in keyof T]: SpreadDynamic<T[K]> }> : Dynamic<T>;
type SpreadStatic<T> = IsObject<Static<T>> extends true ? { [K in (keyof Static<T>)]: SpreadStatic<Static<T>[K]> } : Static<T>;
type IsObject<T> = T extends Function ? false : T extends Array<any> ? false : T extends object ? true : false;
type StringLike = string | number;
type Nullable = null | undefined;
