import { State, createNode } from '../index';
import { done, expect, use } from './util';

{
    const root = createNode({
        tagName: "div",
        children: [
            "We don't have any limit",
            [
                " ",
                { tagName: "span", children: ["to"], },
                " ",
                ["how many", [" ", "arrays can be"], " "],
                "nested",
            ]
        ]
    });

    use(root);

    expect.html("<div>We don't have any limit <span>to</span> how many arrays can be nested</div>");
}
{
    const state0 = new State<string | number>(0);
    const state1 = new State<string | number>(1);
    const state2 = new State<string | number>(2);
    const state3 = new State<string | number>(3);
    const state4 = new State<string | number>(4);
    const state5 = new State<string | number>(5);

    const root = createNode({
        tagName: "div",
        children: state0.as((_0) => [
            "State-0 is: ", _0, "; ",
            // NOTE: Nesting
            state1.as((_1) => [
                "State-1 is: ", _1, "; ",
                // NOTE: Triple nesting
                state2.as((_2) => [
                    "State-2 is: ", _2, "; ",
                ]),
            ]),
            state3.as((_3) =>
                typeof _3 === "number"
                    ? "State-3 is: " + _3 + "; "
                    // NOTE: Single child to children array
                    : ["State-3 is: ", _3, "; "]
            ),
            state4.as((_4) =>
                typeof _4 === "number"
                    ? ["State-4 is: ", _4, "; "]
                    // NOTE: Add children on state change
                    : ["State-4 is: ", _4, "!", "!", "!", "; "]
            ),
            state5.as((_5) =>
                typeof _5 === "number"
                    ? ["State-5 is: ", _5, "!", "!", "!", ";"]
                    // NOTE: Remove children on state change
                    : ["State-5 is: ", _5, ";"]
            ),
        ]),
    });

    use(root);

    expect.html("<div>State-0 is: 0; State-1 is: 1; State-2 is: 2; State-3 is: 3; State-4 is: 4; State-5 is: 5!!!;</div>");

    state2.value = "TWO";
    expect.html("<div>State-0 is: 0; State-1 is: 1; State-2 is: TWO; State-3 is: 3; State-4 is: 4; State-5 is: 5!!!;</div>");

    state1.value = "ONE";
    expect.html("<div>State-0 is: 0; State-1 is: ONE; State-2 is: TWO; State-3 is: 3; State-4 is: 4; State-5 is: 5!!!;</div>");

    state0.value = "ZERO";
    expect.html("<div>State-0 is: ZERO; State-1 is: ONE; State-2 is: TWO; State-3 is: 3; State-4 is: 4; State-5 is: 5!!!;</div>");

    state3.value = "THREE";
    expect.html("<div>State-0 is: ZERO; State-1 is: ONE; State-2 is: TWO; State-3 is: THREE; State-4 is: 4; State-5 is: 5!!!;</div>");

    state4.value = "FOUR";
    expect.html("<div>State-0 is: ZERO; State-1 is: ONE; State-2 is: TWO; State-3 is: THREE; State-4 is: FOUR!!!; State-5 is: 5!!!;</div>");

    state5.value = "FIVE";
    expect.html("<div>State-0 is: ZERO; State-1 is: ONE; State-2 is: TWO; State-3 is: THREE; State-4 is: FOUR!!!; State-5 is: FIVE;</div>");
}

done();
