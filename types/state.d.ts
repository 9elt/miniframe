export type Sub<T> = (current: T, previous: T) => void | Promise<void>;

type Merge<S> = {
    [K in keyof S]: S[K] extends State<infer U> ? U : never;
};

export class State<T> {
    constructor(value: T);
    value: T;
    static merge<const S extends State<unknown>[]>(...states: [
        ...S
    ]): State<Merge<S>>;
    static merge<const S extends State<unknown>[], C>(...states: [
        ...S,
        (...values: Merge<S>) => C
    ]): State<C>;
    as<C>(f: (value: T) => C): State<C>;
    await<I>(init: I): State<I | Awaited<T>>;
    await<I, L>(init: I, loading: L): State<I | L | Awaited<T>>;
    sub<F extends Sub<T>>(f: F): F;
    unsub<F extends Sub<T>>(f: F): void;
}
