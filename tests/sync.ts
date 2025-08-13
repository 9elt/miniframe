import { State } from '../index';
import { done, expect, describe } from './util';

const state0 = new State(1);
const state1 = new State("1");

const stateSync1: State<[number, string]> = State.sync(state0, state1);
const stateSync2: State<number> = State.sync(state0, state1, (state0, state1) => state0 + Number(state1));

expect.subs({ state0, state1 }, {
    state0: 2,
    state1: 2
});

describe("base state sync length");
expect.eq(stateSync1.value.length, 2);

describe("base state sync");
expect.eq(stateSync1.value[0], 1);
expect.eq(stateSync1.value[1], "1");

describe("state sync transformed");
expect.eq(stateSync2.value, 2);

done();
