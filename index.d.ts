/**
 * creates state aware html elements from objects
 */
export function render<T extends TagNames>(props: Element<T>): InferElement<T>;
/**
 * `Dynamic` element object
 */
export type Element<T extends TagNames = TagNames> = Dynamic<CreateElement<T>>;
/**
 * `Dynamic` children array
 */
export type Children = Dynamic<(Dynamic<Element> | Dynamic<string>)[]>;
/**
 * value that can be a state
 */
export type Dynamic<T> = T | State<T>;
/**
 * value that cannot be a state
 */
export type Static<T> = T extends State<infer U> ? U : T;
/**
 * all html/xml tagnames
 */
export type TagNames = HTMLtagNames | SVGtagNames | MathMLtagNames;
/**
 * create a state
 */
export function state<T>(value: T): State<T>;
/**
 * checks wheather a value is a `State` or not
 */
export function isState(value: any): boolean;
/**
 * unwraps values of `Dynamic` types
 */
export function valueOf<T>(value: Dynamic<T>): T;
/**
 * gets the typeof of a `Dynamic` types
 */
export function typeOf(value: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
/**
 * state
 */
export class State<T> {
    constructor(value: T);
    set value(arg: T);
    get value(): T;
    static from<T>(value: T): State<T>;
    static use<T extends { [key: string]: State<any> }>(states: T): State<SpreadStatic<T>>;
    set(f: (current: T) => T): void;
    as<C>(f: (value: T) => C): State<C>;
    sub(f: (current: T, previous: T) => void): void;
    #private;
}
/* 
 * private types
 */
type HTMLtagNames = keyof HTMLElementTagNameMap;
type SVGtagNames = keyof SVGElementTagNameMap;
type MathMLtagNames = keyof MathMLElementTagNameMap;
type SpreadDynamic<T> = T extends object ? Dynamic<{ [K in keyof T]: Dynamic<T[K]> }> : Dynamic<T>;
type SpreadStatic<T> = T extends object ? Static<{ [K in keyof T]: Static<T[K]> }> : Static<T>;
type InferElement<T extends TagNames> = T extends HTMLtagNames ? HTMLElementTagNameMap[T] : T extends SVGtagNames ? SVGElementTagNameMap[T] : T extends MathMLtagNames ? MathMLElementTagNameMap[T] : any;
type CreateElement<T extends TagNames> = { tagName: Dynamic<T>; } & { children?: Children; } & { [Prop in ElementProps<T>]?: SpreadDynamic<Partial<InferElement<T>[Prop]>>; };
type ElementProps<T extends TagNames> = Exclude<keyof InferElement<T>, "children">;
