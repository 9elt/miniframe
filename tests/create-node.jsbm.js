/*
auto-generated using jsbm CLI
https://github.com/9elt/jsbm

samples: 1000
iterations: 100
*/
const _jsbm_snd = (samples) => {
samples.sort((a, b) => a - b);
let fq = samples.length / 4;
let t = Math.ceil(fq * 3);
let b = Math.floor(fq);
let mqr = (samples[t] - samples[b]) * 1.5;
let arr = [];
samples.forEach((v) => {
if (v <= samples[t] + mqr && v >= samples[b] - mqr) {
arr.push(v);
};});
let mean = 0;
arr.forEach(v => { mean += v });
mean = mean / arr.length;
let std = 0;
arr.forEach(v => { std += (v - mean) ** 2 });
return {
mean: Math.round(mean * 1000),
std: Math.round(Math.sqrt(std / arr.length) * 1000),
outliers: Math.round(100 - (arr.length * 100 / samples.length)),
};};
const _jsbm_ansi = (text, color) => {
switch(color) {
case 'red': return `\x1b[38;5;204;1m${text}\x1b[0m`;
case 'blue': return `\x1b[38;5;39;1m${text}\x1b[0m`;
default: return `\x1b[1m${text}\x1b[0m`;
}}
const _jsbm_unit = (micros) => {
if (micros < 1_000) {
return micros.toFixed(0) + 'μs';
} else if (micros < 1_000_000) {
return (micros/1_000).toFixed(2) + 'ms';
} else {
return (micros/1_000_000).toFixed(2) + 's';
}};
const _jsbm_fmt_res = (res) => {
return _jsbm_ansi(_jsbm_unit(res.mean)) +
` (std. ${_jsbm_unit(res.std)} o. ${res.outliers}%)`
}
const _jsbm_log = (name, res) => {
if ('std' in res) {
console.log(_jsbm_ansi(name, 'blue') + ' | ' + _jsbm_fmt_res(res))
} else {
console.log(_jsbm_ansi(name, 'red') + ' |\n', res)
}};
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
try {
const _results = Array(1000);
for (let _sample = 0; _sample < 1000; _sample++) {
let _iteration = 100;
const _start = performance.now();
while (_iteration--) {
createNode(element, document);

/*

quick results:

once
createNode | 159μs (std. 30μs o. 4%)

10 times
createNode | 616μs (std. 68μs o. 17%)

100 times x 201 tagNames (20,1000 total)
lookup | 832μs (std. 221μs o. 0%)
regex | 945μs (std. 2μs o. 16%)

1000 times x 201 tagNames (201,000 total)
lookup | 6.29ms (std. 17μs o. 11%)
regex | 9.45ms (std. 15μs o. 5%)

*/
};
_results[_sample] = performance.now() - _start;
}
_jsbm_log('createNode', _jsbm_snd(_results));
} catch (error) {
_jsbm_log('createNode', error);
};