const name = new State("World");

const nameUpperCase = name.as(n => n.toUpperCase());
nameUpperCase.value; // "WORLD"

name.value = "Miniframe";
nameUpperCase.value; // "MINIFRAME"
