import { expect, mock, test } from "bun:test";
import { State } from "../lib";
import { StateHeader, StateStack, dependents, subs } from "./util";

test("State.sub clears dependencies at every update", () => {
    const state = new State(0);
    const inner = new State(0);

    const sub3 = mock((v) => {
        if (v % 3 === 0) {
            inner.as(() => {
                inner.sub(() => { });
            });
        }
    });

    const sub5 = mock((v) => {
        if (v % 5 === 0) {
            inner.as(() => { });
            inner.as(async () => { }).await(null);
            inner.sub(() => { });
            State.merge(inner);
        }
    });

    state.sub(sub3)(state.value);
    expect(StateHeader()).toEqual(null);
    expect(StateStack()).toEqual(0);

    inner.sub(() => { });
    expect(StateHeader()).toEqual(null);
    expect(StateStack()).toEqual(0);

    state.sub(sub5)(state.value);
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

    expect(sub3).toHaveBeenCalledTimes(5);
    expect(sub5).toHaveBeenCalledTimes(5);
});
