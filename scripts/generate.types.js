const dataLines = (await Bun.file("lib.dom.d.ts").text()).split("\n");

let i = 0;
let target = null;

const map = {};

for (const line of dataLines) {
    if (line.startsWith("interface")) {
        const [_, name, extend, ...data] = line.split(" ");

        let other = [];

        if (extend === "extends") {
            data.pop();
            other = data.map(x => x.replace(",", ""));
        }

        target = name;
        map[target] = {
            extends: other,
            value: {},
        };

        if (other && other.lenght > 0 && i++ === 100) {
            break;
        }
    }
    else if (target && line.startsWith("}")) {
        target = null;
    }
    else if (target && line.startsWith("    ") && !line.includes("*")) {
        let escape = 0;
        let name_value = ["", ""];
        let t = 0;
        for (const char of line) {
            if (char === "(" || char === "[") {
                escape++;
                name_value[t] += char;
            }
            else if (char === ")" || char === "]") {
                escape--;
                name_value[t] += char;
            }
            else if (escape === 0 && char === ":") {
                t = 1;
            }
            else {
                name_value[t] += char;
            }
        }

        let [name, value] = name_value;

        name = name.replace("?", "").trim();
        value = value.replace(";", "").trim();

        if (name
            && (name.startsWith("on") || !name.endsWith(")"))
            && !name.startsWith("(")
            && !name.startsWith("new ")
            && !name.startsWith("[")
            && (name === "readonly style" || !name.startsWith("readonly "))
        ) {
            const raw = value;
            const _value = [];

            let escape = 0;
            let collect = "";
            for (const char of raw) {
                if (char === "(") {
                    escape++;
                    collect += char;
                }
                else if (char === ")") {
                    escape--;
                    collect += char;
                }
                else if (escape === 0 && char === "|") {
                    _value.push(collect.trim());
                    collect = "";
                }
                else {
                    collect += char;
                }
            }
            _value.push(collect.trim());
            map[target].value[name] = _value;
        }
    }
}

let use = [];

function collect(key) {
    !use.includes(key) && use.push(key);

    const sub = map[key];

    if (!sub) {
        console.log(">>>", key, "<<<", sub);
        throw -1;
    }

    for (const key in sub.value) {
        const value = sub.value[key];

        for (const i of value) {
            if (map[i] && !use.includes(i)) {
                collect(i);
            }
        }
    }

    for (const key of sub.extends) {
        collect(key);
    }
}

for (const key in map.HTMLElementTagNameMap.value) {
    const elemInterf = map.HTMLElementTagNameMap.value[key];
    collect(elemInterf[0]);
}

for (const key in map.SVGElementTagNameMap.value) {
    const elemInterf = map.SVGElementTagNameMap.value[key];
    collect(elemInterf[0]);
}

for (const key in map.MathMLElementTagNameMap.value) {
    const elemInterf = map.MathMLElementTagNameMap.value[key];
    collect(elemInterf[0]);
}

function rename(i) {
    // return i.startsWith("HTML") ? i.replace("HTML", "Mini") :
    //     "Mini" + i;
    return map[i] ? ("Mini." + i) : i;
}

function unrename(i) {
    return i.replace("Mini.", "");
}

function available(i) {
    return !!map[i];
}

const basenode = `string | number | false | null`;

let result = "";
let resultJSX = "";

let anyElement = "type Mini.Element =";
let tagNameMap = {};

use.sort((a, b) => {
    const _a = /^HTML.*Element$/.test(a) ? 3 :
        /^SVG.*Element$/.test(a) ? 2 :
            /^MathML.*Element$/.test(a) ? 1 : 0;
    const b_ = /^HTML.*Element$/.test(b) ? 3 :
        /^SVG.*Element$/.test(b) ? 2 :
            /^MathML.*Element$/.test(b) ? 1 : 0;
    return b_ - _a;
})

for (const i of use) {
    const interf = map[i];

    if (typeof i !== "string") {
        console.log("-->", i, "<--", typeof i, interf);
        throw -1;
    }

    let mi = rename(i);

    let body = interf.extends.length
        // ? `interface ${mi} extends ${interf.extends.filter(available).map(rename).join(", ")} {`
        // : `interface ${mi} {`;
        ? `    interface ${i} extends ${interf.extends.filter(available).join(", ")} {`
        : `    interface ${i} {`;

    let bodyJSX = body;

    const tagNames = [];
    let namespaceURI = "";

    for (const tagName in map.HTMLElementTagNameMap.value) {
        const elemInterf = map.HTMLElementTagNameMap.value[tagName][0];
        if (i === elemInterf) {
            tagNames.push(tagName);
        }
    }

    for (const tagName in map.SVGElementTagNameMap.value) {
        const elemInterf = map.SVGElementTagNameMap.value[tagName][0];
        if (i === elemInterf) {
            tagNames.push(tagName);
            namespaceURI = "http://www.w3.org/2000/svg";
        }
    }

    for (const tagName in map.MathMLElementTagNameMap.value) {
        const elemInterf = map.MathMLElementTagNameMap.value[tagName][0];
        if (i === elemInterf) {
            tagNames.push(tagName);
            namespaceURI = "http://www.w3.org/1998/Math/MathML";
        }
    }

    if (tagNames.length > 0
        || i === "HTMLElement"
        || i === "SVGElement"
        || i === "MathMLElement"
    ) {
        anyElement += `\n    | ${mi}`;
        if (i === "HTMLElement") {
            const allTagNames = Object.keys(map.HTMLElementTagNameMap.value);
            body += `\n    tagName: ${allTagNames.join(" | ")};`;
        }
        else if (i === "SVGElement") {
            const allTagNames = Object.keys(map.SVGElementTagNameMap.value);
            body += `\n    tagName: ${allTagNames.join(" | ")};`;
        }
        else if (i === "MathMLElement") {
            const allTagNames = Object.keys(map.MathMLElementTagNameMap.value);
            body += `\n    tagName: ${allTagNames.join(" | ")};`;
        }
        else {
            body += `\n    tagName: ${tagNames.join(" | ")};`;
        }
        if (namespaceURI) {
            body += `\n    namespaceURI: "${namespaceURI}";`;
            bodyJSX += `\n    namespaceURI: "${namespaceURI}";`;
        }
        body += `\n    children?: MiniChildren;`;
        body += `\n    dataset?: MiniDataset;`;

        bodyJSX += `\n    children?: MiniNode | MiniChildren;`;

        for (const tagName of tagNames) {
            if (tagNameMap[tagName]) {
                tagNameMap[tagName].push(mi);
            }
            else {
                tagNameMap[tagName] = [mi];
            }
        }
    }

    for (const key in interf.value) {
        const _value = interf.value[key];
        const ___value = _value.map(rename).join(" | ");
        const value =
            ___value + ` | State<${___value}>`;

        body += `\n    ${key}?: ${value};`;
        bodyJSX += `\n    ${key}?: ${value};`;
    }

    if (body.charAt(body.length - 1) !== "{") {
        body += "\n";
    }
    body += "}\n";

    if (bodyJSX.charAt(bodyJSX.length - 1) !== "{") {
        body += "\n";
    }
    bodyJSX += "}\n";

    result += "\n" + body;
    resultJSX += "\n" + bodyJSX;
}
anyElement += ";";

let _resultMap = `export type DOMNode<P> =
    P extends State<infer U> ? DOMNode<U> :
    P extends Node ? P :`;

function rename2(i) {
    return i.replace("Mini.", "MiniX.");
}

let _tagNameMap = "export interface IntrinsicElements {";
for (const tagName in tagNameMap) {
    const values = tagNameMap[tagName];
    _tagNameMap += `\n    ${tagName}: ${values.map(unrename).join(" | ")};`;
    for (const value of values) {
        if (value !== rename("HTMLElement") && value !== rename("SVGElement") && value !== rename("MathMLElement")) {
            const line = `\n    P extends ${value} ? ${unrename(value)} :`;
            if (!_resultMap.includes(line)) {
                _resultMap += line;
            }
        }
    }
}
_tagNameMap += "\n}";

_resultMap += `
    P extends Mini.HTMLElement ? HTMLElement :
    P extends Mini.SVGElement ? SVGElement :
    P extends Mini.MathMLElement ? MathMLElement :
    P extends Mini.Element ? Element :
    P extends string | number | false | null ? Text :
    Node;`;

console.log(`\
type StateGroup = Record<string, State<any>>;

type StaticGroup<T extends StateGroup> = State<{
    [K in keyof T]: T[K] extends State<infer U> ? U : never;
}>;

export type Sub<T> = (current: T, previous: T) => void;
export type AsyncSub<T> = (current: T, previous: T) => Promise<void>;
export type AnySub<T> = Sub<T> | AsyncSub<T>;

export class State<T> {
    constructor(value: T);
    value: T;
    static use<T extends StateGroup>(states: T): StaticGroup<T>;
    set(f: (current: T) => T): void;
    as<C>(f: (value: T) => C, collector?: AnySub<any>[]): State<C>;
    sub(f: Sub<T>, collector?: AnySub<any>[]): Sub<T>;
    sub(f: AsyncSub<T>, collector?: AnySub<any>[]): AsyncSub<T>;
    unsub(f: Sub<T>): void;
}

export function createNode<P>(props: P): DOMNode<P>;
`);
console.log(_resultMap);
// console.log(_resultMap);
// console.log("\n" + anyElement);
//
const miniNode = `
| Mini.HTMLElement
| Mini.SVGElement
| Mini.MathMLElement
| Node
| ${basenode}
`
console.log(`
export type MiniChildren = MiniNode[] | State<MiniNode[]>;

export type MiniNode = ${miniNode} | State<${miniNode}>;

export type MiniDataset = {
    [key: string]: ${basenode} | State<${basenode}>;
} | State<{
    [key: string]: ${basenode} | State<${basenode}>;
}>;
`);
console.log(`export declare namespace Mini {
${result.trim()}
}

export declare namespace MiniX {
${_tagNameMap}

${resultJSX.trim()}
}
`);

// console.log(use.join("\n"));

// console.log(map.CSSStyleDeclaration);
