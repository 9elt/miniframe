/**
 * Create a state aware html element
 *
 * ### example
 * ```
 * const text = State.from("hello world");
 * 
 * const element = createNode({
 *     tagName: "p",
 *     id: "paragraph",
 *     children: [text]
 * });
 * ```
 */
export function createNode<T extends TagNames, C extends Children>(props: ElementObject<T, C>, document?: Document): TagNamesMap[T];

export type ElementObject<T extends TagNames = TagNames, C extends Children = Children> = SpreadDynamic<CreateElement<T, C>>;

export type TagNames = keyof TagNamesMap;

export type Dynamic<T> = T | State<T>;

export type Static<T> = T extends State<infer U> ? U : T;

export class State<T> {
    /**
     * Get and set the state current value
     * 
     * ### example
     * ```
     * const state = State.from(3);
     * 
     * state.value = 6;
     * state.value++;
     * state.value; // 7
     * ```
     */
    set value(arg: T);
    get value(): T;
    /**
     * Create a state
     * 
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
     * Combine multiple states into a single object state
     * 
     * ### example
     * ```
     * const n1 = State.from(2);
     * const n2 = State.from(3);
     * 
     * const group = State.use({ n1, n2 });
     * 
     * group.value; // { n1: 2, n2: 3 }
     * ```
     */
    static use<T extends StatesGroup>(states: T): State<SpreadStatic<T>>;
    /**
     * Set the state value in function of its current value
     * 
     * ### example
     * ```
     * const state = State.from({ foo: "bar" });
     * state.set(c => ({ ...c, bar: "foo" }));
     * 
     * state.value; // { foo: "bar", bar: "foo" }
     * ```
     */
    set(f: (current: T) => T): void;
    /**
     * Create a child state
     * 
     * ### example
     * ```
     * const n = State.from(3);
     * const str = n.as(v => v + "%");
     * 
     * str.value; // "3%"
     * ```
     */
    as<C>(f: (value: T) => C): State<C>;
    /**
     * Subscribe a callback to state updates
     * 
     * ### example
     * ```
     * const state = State.from(3);
     * 
     * state.sub((curr, prev) => {
     *     console.log("state changed, delta:", curr - prev);
     * });
     * 
     * state.value *= 3;
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
type CreateElement<T extends TagNames, C extends Children = Children> = {
    tagName: T;
} & {
    children?: C;
} & ElementProps<T>;
type ElementProps<T extends TagNames> = {
    [P in ElementKeys<T>]?: Valid<TagNamesMap[T][P]>;
};
type Children = (CreateElement<TagNames> | string)[];
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
