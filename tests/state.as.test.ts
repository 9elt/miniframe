import { expect, mock, test } from "bun:test";
import { State } from "../index";
import { subs, wait } from "./util";

test("State.as transforms the state value", () => {
    const state = new State(1);

    const child = state.as((value) => value * 2);

    expect(child.value).toEqual(2);

    state.value = 2;

    expect(child.value).toEqual(4);
});

test("State.as clears dependencies at every update", () => {
    const state = new State(0);
    const inner = new State(0);

    const as = mock(() => {
        inner.sub(() => { })
        inner.as(() => { });
        inner.as(async () => { }).await(null);
        State.merge(inner);
    });

    state.as(as);

    state.value = 1;
    state.value = 2;
    state.value = 3;

    expect(as).toHaveBeenCalledTimes(4);

    expect(subs(state)).toEqual(1);

    expect(subs(inner)).toEqual(4);
});

test("State.as await without loading", async () => {
    const state = new State(0);

    const data: State<"INIT" | number> = state
        .as(async (v) => wait(v))
        .await("INIT");

    expect(data.value).toEqual("INIT");

    await wait.last;

    expect(data.value).toEqual(0);

    state.value = 1;

    expect(data.value).toEqual(0);

    await wait.last;

    expect(data.value).toEqual(1);
});

test("State.as await with loading", async () => {
    const state = new State(0);

    const data: State<"INIT" | "LOADING" | number> = state
        .as(async (v) => wait(v))
        .await("INIT", "LOADING");

    expect(data.value).toEqual("INIT");

    await wait.last;

    expect(data.value).toEqual(0);

    state.value = 1;

    expect(data.value).toEqual("LOADING");

    await wait.last;

    expect(data.value).toEqual(1);
});
