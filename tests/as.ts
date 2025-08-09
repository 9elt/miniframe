// // @ts-ignore
// import { State } from '../index';
// // @ts-ignore
// // import { STATE_AS_STACK } from '../index';
//
// // @ts-ignore
// State.prototype.toString = function () {
//     return `State<${this.name || this.value}, subs: ${this._subs.length}>`;
// };
// // @ts-ignore
// State.prototype.toJSON = function () {
//     return this.toString();
// };
//
// const state1 = new State(1);
// // @ts-ignore
// state1.name = "S-1";
//
// const state2 = new State(2);
// // @ts-ignore
// state2.name = "S-2";
//
// state1.as(() => {
//     const state2Copy = state2.as((v) => v);
//     const state2Group = State.use({ state2 });
// });
//
// state1.value = 3;
// state1.value = 4;
// state1.value = 5;
// state1.value = 1;
//
// console.log(state1.toString(), state2.toString());
//
// const page = new State(1);
//
// const data = page.asyncAs(0, State.NoLoading, async () => {
//     const res = await fetch("https://example.com/not-existent-page?page=" + page);
//     if (res.ok) {
//         return res.text();
//     }
//     return res.statusText;
// });
//
// console.log(page.toString(), data.toString());
//
// // @ts-ignore
// await Bun.sleep(1000);
//
// console.log(page.toString(), data.toString());
