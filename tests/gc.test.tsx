import { expect, test } from "bun:test";
import { State, createNode } from "../lib";
import { dependents, subs } from "./util";

test("GC clears unused nodes and states", async () => {
    const a = new State("a");
    const b = new State("b");
    const c = new State("c");
    const d = new State("d");
    const e = new State("e");
    const f = new State("f");

    for (let i = 0; i < 1000; i++) {
        a.sub(() => { });

        createNode(
            a.as(() =>
                <div
                    className={b}
                    style={c.as(() => ({
                        color: d,
                    }))}
                >
                    !
                    {e.as(() => (
                        <div>
                            {f.as(() => <div />)}
                        </div>
                    ))}
                </div>
            )
        );
    }

    // NOTE: 1st cycle clears state trees
    Bun.gc(true);
    await Bun.sleep(100);

    // NOTE: 2nd cycle clears states
    Bun.gc(true);
    await Bun.sleep(100);

    expect(subs(a)).toEqual(1000);
    expect(subs(b)).toEqual(0);
    expect(subs(c)).toEqual(0);
    expect(subs(d)).toEqual(0);
    expect(subs(e)).toEqual(0);
    expect(subs(f)).toEqual(0);

    expect(dependents(a)).toEqual(0);
    expect(dependents(b)).toEqual(0);
    expect(dependents(c)).toEqual(0);
    expect(dependents(d)).toEqual(0);
    expect(dependents(e)).toEqual(0);
    expect(dependents(f)).toEqual(0);
});

test("GC does not clear used nodes and states", async () => {
    const a = new State("a");
    const b = new State("b");
    const c = new State("c");
    const d = new State("d");
    const e = new State("e");
    const f = new State("f");

    for (let i = 0; i < 1000; i++) {
        a.sub(() => { });

        const node = createNode(
            a.as(() =>
                <div
                    className={b}
                    style={c.as(() => ({
                        color: d,
                    }))}
                >
                    !
                    {e.as(() => (
                        <div>
                            {f.as(() => <div />)}
                        </div>
                    ))}
                </div>
            )
        );

        window.document.body.append(node);
    }

    Bun.gc(true);
    await Bun.sleep(100);

    Bun.gc(true);
    await Bun.sleep(100);

    expect(subs(a)).toEqual(2000);
    expect(subs(b)).toEqual(1000);
    expect(subs(c)).toEqual(1000);
    expect(subs(d)).toEqual(1000);
    expect(subs(e)).toEqual(1000);
    expect(subs(f)).toEqual(1000);

    expect(dependents(a)).toEqual(2000);
    expect(dependents(b)).toEqual(0);
    expect(dependents(c)).toEqual(0);
    expect(dependents(d)).toEqual(0);
    expect(dependents(e)).toEqual(1000);
    expect(dependents(f)).toEqual(0);
});
