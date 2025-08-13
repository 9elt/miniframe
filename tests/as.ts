import { State } from '../index';
import { done, expect, describe } from './util';

const state0 = new State(0);
const state1 = new State(1);
const state1Group = State.merge(state1);

{
    let ran = 0;

    state0.as((c) => {
        const state1Copy = state1.as((v) => v);
        const state1Group = State.merge(state1, (v) => v);
        const state1AsyncCopy = state1.as(async (v) => asyncData(v)).await(0, 0);
        ran++;
    });

    state0.value = 1;
    state0.value = 2;
    state0.value = 3;
    state0.value = 4;
    state0.value = 5;

    describe("State as ran times");
    expect.eq(ran, 6);

    describe("State subscribers");
    expect.subs({ state0, state1 }, {
        state0: 1,
        state1: 4,
    });
}
{
    const data: State<"INIT" | number> = state0
        .as(async (v) => asyncData(v, 100))
        .await("INIT");

    describe("Async initial value");
    expect.eq(data.value, "INIT");

    // @ts-ignore
    await Bun.sleep(100);

    describe("Async value");
    expect.eq(data.value, 5);

    state0.value = 1;

    describe("Async value on change no loading");
    expect.eq(data.value, 5);

    // @ts-ignore
    await Bun.sleep(100);

    describe("Async value");
    expect.eq(data.value, 1);
}
{
    const data: State<"INIT" | "LOADING" | number> = state0
        .as(async (v) => asyncData(v, 100))
        .await("INIT", "LOADING");

    // @ts-ignore
    await Bun.sleep(100);

    state0.value = 1;

    describe("Async value on change loading");
    expect.eq(data.value, "LOADING");

    // @ts-ignore
    await Bun.sleep(100);

    describe("Async value");
    expect.eq(data.value, 1);
}

done();

async function asyncData<T>(data: T, ms = 1) {
    // @ts-ignore
    await Bun.sleep(ms);
    return data;
}
