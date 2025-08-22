import { expect, mock, test } from "bun:test";
import { State } from "../index";
import { StateHeader, StateStack, dependents, subs, wait } from "./util";

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

    const as3 = mock((v) => {
        if (v % 3 === 0) {
            inner.as(() => {
                inner.sub(() => { });
            });
        }
    });

    const as5 = mock((v) => {
        if (v % 5 === 0) {
            inner.as(() => { });
            inner.as(async () => { }).await(null);
            inner.sub(() => { });
            State.merge(inner);
        }
    });

    state.as(as3);
    expect(StateHeader()).toEqual(null);
    expect(StateStack()).toEqual(0);

    inner.sub(() => { });
    expect(StateHeader()).toEqual(null);
    expect(StateStack()).toEqual(0);

    state.as(as5);
    expect(StateHeader()).toEqual(null);
    expect(StateStack()).toEqual(0);

    expect(subs(inner)).toEqual(7);
    expect(dependents(inner)).toEqual(1);
    expect(subs(state)).toEqual(2);
    expect(dependents(state)).toEqual(6);

    state.value = 1;
    expect(subs(inner)).toEqual(1);
    expect(dependents(inner)).toEqual(0);
    expect(subs(state)).toEqual(2);
    expect(dependents(state)).toEqual(0);

    state.value = 3;
    expect(subs(inner)).toEqual(3);
    expect(dependents(inner)).toEqual(1);
    expect(subs(state)).toEqual(2);
    expect(dependents(state)).toEqual(1);

    state.value = 5;
    expect(subs(inner)).toEqual(5);
    expect(dependents(inner)).toEqual(0);
    expect(subs(state)).toEqual(2);
    expect(dependents(state)).toEqual(5);

    state.value = 15;
    expect(subs(inner)).toEqual(7);
    expect(dependents(inner)).toEqual(1);
    expect(subs(state)).toEqual(2);
    expect(dependents(state)).toEqual(6);

    expect(as3).toHaveBeenCalledTimes(5);
    expect(as5).toHaveBeenCalledTimes(5);
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
