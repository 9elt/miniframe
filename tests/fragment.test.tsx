import { expect, test } from "bun:test";
import { State, createNode } from "../lib";
import "./util";

test("Fragments can be nested indefinitely", () => {
    const div = createNode<HTMLDivElement>(
        <div>
            <>
                We don't have a limit
                <>
                    {" "}<span>to</span>
                    {" "}how many<>{" "}fragments can be</>
                    {" "}nested
                </>
            </>
        </div>
    );

    expect(div.outerHTML).toEqual(`\
<div>\
We don't have a limit <span>to</span> \
how many fragments can be nested\
</div>`);
});

test("Fragments support states", () => {
    const stateA = new State("a");
    const stateB = new State("b");
    const stateC = new State("c");
    const stateD = new State("d");
    const stateE = new State("e");
    const stateF = new State("f");

    const div = createNode<HTMLDivElement>(
        <div>
            {stateA.as((a) => <>
                StateA = {a}
                {stateB.as((b) => <>
                    StateB = {b}
                    {stateC.as((c) => <>
                        StateC = {c}
                    </>)}
                </>)}
                {stateD.as((d) => <>
                    {d === "d"
                        ? "StateD = " + d
                        : <>StateD = {d}</>
                    }
                </>)}
                {stateE.as((e) => <>
                    {e === "e"
                        ? <>StateE = {e}</>
                        : <>StateE = {e}!</>
                    }
                </>)}
                {stateF.as((f) => <>
                    {f === "f"
                        ? <>StateF = {f}!</>
                        : <>StateF = {f}</>
                    }
                </>)}
            </>)}
        </div>
    );

    expect(div.outerHTML).toEqual(`\
<div>\
StateA = a\
StateB = b\
StateC = c\
StateD = d\
StateE = e\
StateF = f!\
</div>`);

    stateC.value = "C";

    expect(div.outerHTML).toEqual(`\
<div>\
StateA = a\
StateB = b\
StateC = C\
StateD = d\
StateE = e\
StateF = f!\
</div>`);

    stateB.value = "B";

    expect(div.outerHTML).toEqual(`\
<div>\
StateA = a\
StateB = B\
StateC = C\
StateD = d\
StateE = e\
StateF = f!\
</div>`);

    stateA.value = "A";

    expect(div.outerHTML).toEqual(`\
<div>\
StateA = A\
StateB = B\
StateC = C\
StateD = d\
StateE = e\
StateF = f!\
</div>`);

    stateD.value = "D";

    expect(div.outerHTML).toEqual(`\
<div>\
StateA = A\
StateB = B\
StateC = C\
StateD = D\
StateE = e\
StateF = f!\
</div>`);

    stateE.value = "E";

    expect(div.outerHTML).toEqual(`\
<div>\
StateA = A\
StateB = B\
StateC = C\
StateD = D\
StateE = E!\
StateF = f!\
</div>`);

    stateF.value = "F";

    expect(div.outerHTML).toEqual(`\
<div>\
StateA = A\
StateB = B\
StateC = C\
StateD = D\
StateE = E!\
StateF = F\
</div>`);
});
