const a = new State("a");
const b = new State("b");
const c = new State("c");

const abc = State.merge(a, b, c, (a, b, c) => a + b + c);

abc.value; // "abc"
