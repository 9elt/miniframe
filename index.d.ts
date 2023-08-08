/**
 * Create an html element
 */
export function render<T extends TagNames>(props: Element<T>): TagNamesMap[T];
/**
 * dynamic element object
 */
export type Element<T extends TagNames = TagNames> = SpreadDynamic<CreateElement<T>>;
/**
 * dynamic children array
 */
export type Children = CreateElement<TagNames>[];
/**
 * Can be a state
 */
export type Dynamic<T> = T | State<T>;
/**
 * value that cannot be a state
 */
export type Static<T> = T extends State<infer U> ? U : T;
/**
 * All html/xml tagnames
 */
export type TagNames = keyof TagNamesMap;
/**
 * Check if a value is a state
 */
export function isState(value: any): boolean;
/**
 * Get the inner value of a dynamic value
 */
export function valueOf<T>(value: T): Static<T>;
/**
 * Get the inner typeof of a dynamic value
 */
export function typeOf(value: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
/**
 * The miniframe state
 */
export class State<T> {
    constructor(value: T);
    set value(arg: T);
    get value(): T;
    /**
     * Create a state
     * ### example
     * ```
     * State.from(32);
     * State.from("foo");
     * State.from(true);
     * State.from({ foo: "bar" });
     * ```
     */
    static from<T>(value: T): State<T>;
    /**
     * Group states into an object state
     * ### example
     * ```
     * const n1 = State.from(2);
     * const n2 = State.from(2);
     * 
     * const m = State.use({ n1, n2 }).as(({ n1, n2 }) => n1 * n2);
     * 
     * m.value; // 4
     * ```
     */
    static use<T extends StatesGroup>(states: T): State<SpreadStatic<T>>;
    /**
     * Convert an object containing states,
     * into an object state of static values
     * 
     * `flatten` is very similar to the `use` method,
     * however, it is a much more **expensive operation**,
     * meant for objects that you don't control
     */
    static flatten<T extends object>(from: T): State<SpreadStatic<T>>;
    /**
     * Set the state value in function of its current value
     * ### example
     * ```
     * const s = State.from({ foo: "bar" });
     * s.set(c => ({ ...c, bar: "foo" }));
     * 
     * s.value; // { foo: "bar", bar: "foo" }
     * ```
     */
    set(f: (current: T) => T): void;
    /**
     * Create a children state
     * ### example
     * ```
     * const num = State.from(3);
     * const str = num.as(v => v + "%");
     * 
     * str.value; // "3%"
     * ```
     */
    as<C>(f: (value: T) => C): State<C>;
    /**
     * Subscribe to a state
     * ### example
     * ```
     * const s = State.from(3);
     * s.sub((curr, prev) => {
     *     console.log("state changed, delta: " + (curr - prev))
     * });
     * 
     * s.value *= 3;
     * // > state changed, delta: 6
     * ```
     */
    sub(f: (current: T, previous: T) => void): void;
    #private;
}
/* 
 * private types
 */
type TagNamesMap = HTMLElementTagNameMap & SVGElementTagNameMap & MathMLElementTagNameMap;
type CreateElement<T extends TagNames> = {
    tagName: T;
} & {
    children?: Children;
} & ElementProps<T>;
type ElementProps<T extends TagNames> = {
    [P in ElementKeys<T>]?: Valid<TagNamesMap[T][P]>;
};
type Valid<V> = IsObject<V> extends true
    ? V extends CSSStyleDeclaration ? Partial<V>
    : { [key: string]: string | number } | string 
    : V extends Function ? undefined : V;
type ElementKeys<T extends TagNames> = Exclude<keyof TagNamesMap[T], InvalidProps>;
type InvalidProps = "children" | "tagName" | `set${string}` | `add${string}` | `remove${string}`;
type StatesGroup = {
    [key: string]: State<any>
};
type SpreadDynamic<T> = T extends object
    ? Dynamic<{ [K in keyof T]: SpreadDynamic<T[K]> }>
    : Dynamic<T>;
type SpreadStatic<T> = IsObject<Static<T>> extends true
    ? { [K in (keyof Static<T>)]: SpreadStatic<Static<T>[K]> }
    : Static<T>;
type IsObject<T> = T extends Function ? false
    : T extends Array<any> ? false
    : T extends object ? true : false;
