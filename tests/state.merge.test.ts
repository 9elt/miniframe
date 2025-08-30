import { expect, test } from "bun:test";
import { State } from "../lib";
import { subs } from "./util";

test("State.merge", () => {
    const stateA = new State(2);
    const stateB = new State("3");

    const stateMerge: State<[number, string]> = State.merge(stateA, stateB);

    expect(subs(stateA)).toEqual(1);
    expect(subs(stateB)).toEqual(1);

    expect(stateMerge.value.length).toEqual(2);

    expect(stateMerge.value[0]).toEqual(2);
    expect(stateMerge.value[1]).toEqual("3");
});

test("State.merge as", () => {
    const stateA = new State(2);
    const stateB = new State("3");

    const stateMergeAs: State<number> = State.merge(stateA, stateB, (a, b) => a + Number(b));

    expect(subs(stateA)).toEqual(1);
    expect(subs(stateB)).toEqual(1);

    expect(stateMergeAs.value).toEqual(5);
});
