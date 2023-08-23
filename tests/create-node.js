const hash = require("@9elt/hash").default;
const { State, createNode } = require("@9elt/miniframe");
const { JSDOM } = require("jsdom");
const document = (new JSDOM('<!DOCTYPE html><body></body>')).window.document;
const body = document.body;

/*

states

*/

const tagName = State.from("p");
const id = State.from("initial-id");

const color = State.from("#f00");
const style = State.from({ color });

const textChild = State.from("initial-text-child");
const elementChild = State.from({ tagName: "span", children: ["initial-element-child"] });

const children = State.from([textChild, elementChild]);

/*

tests

*/

let tests = [0, 0];

function testF(v, e) {
    tests[v !== e ? 1 : 0]++;
}

const root = createNode({ tagName, id, style, children }, document);
body.append(root);

// console.log("Initial", body.innerHTML, hash(body.innerHTML));
testF(hash(body.innerHTML), 3608670906);

tagName.value = "h1";
// console.log("tagName changed", body.innerHTML, hash(body.innerHTML));
testF(hash(body.innerHTML), 275446042);

id.value = "CHANGED-id";
// console.log("Id changed", body.innerHTML, hash(body.innerHTML));
testF(hash(body.innerHTML), 348439206);

color.value = "magenta";
// console.log("color changed", body.innerHTML, hash(body.innerHTML));
testF(hash(body.innerHTML), 1063250999);

style.value = { background: "#333" };
// console.log("style changed", body.innerHTML, hash(body.innerHTML));
testF(hash(body.innerHTML), 3660803459);

textChild.value = "CHANGED-text-child";
// console.log("text child changed", body.innerHTML, hash(body.innerHTML));
testF(hash(body.innerHTML), 2840267263);

elementChild.value = { tagName: "strong", children: ["CHANGED-element-child"] };
// console.log("element child changed", body.innerHTML, hash(body.innerHTML));
testF(hash(body.innerHTML), 922321347);

children.value = [elementChild, textChild];
// console.log("children changed", body.innerHTML, hash(body.innerHTML));
testF(hash(body.innerHTML), 467220698);

if (tests[1]){
    console.error(tests[1], "tests failed");
    process.exit(1);
}

/*

benchmarks

*/

const element = { tagName, id, style, children };

// @jsbm { createNode }

createNode(element, document);

/*

quick results:

once
createNode | 159μs (std. 30μs o. 4%)

10 times
createNode | 616μs (std. 68μs o. 17%)

100 times
createNode | 7.37ms (std. 2.18ms o. 2%)

*/
