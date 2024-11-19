const data = await Bun.file("lib.dom.d.ts").text();

const lines = data.split("\n");

let i = 0;
let target = null;

const map = {};

for (const line of lines) {
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

const use = [];

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
    return map[i] ? ("Mini_" + i) : i;
}

function available(i) {
    return !!map[i];
}

const basenode = `string | number | false | null`;

let result = "";

let anyElement = "type MiniElement =";
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
        ? `interface ${mi} extends ${interf.extends.filter(available).map(rename).join(", ")} {`
        : `interface ${mi} {`;

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

    if (tagNames.length > 0) {
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
        }
        body += `\n    children?: MiniNode[];`;
        body += `\n    dataset?: MiniDataset;`;

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
    }

    if (body.charAt(body.length - 1) !== "{") {
        body += "\n";
    }
    body += "}\n";

    result += "\n" + body;
}
anyElement += ";";

let _resultMap = "export type MiniResult<T extends TagNames> =";
let _tagNameMap = "export type MiniProps = {";
for (const tagName in tagNameMap) {
    const values = tagNameMap[tagName];
    _tagNameMap += `\n    ${tagName}: ${values.join(" | ")};`;
    for (const value of values) {
        const line = `\n    MiniProps[T] extends ${value} ? ${value.replace("Mini_", "")} :`;
        if (!_resultMap.includes(line)) {
            _resultMap += line;
        }
    }
}
_tagNameMap += "\n}";
_resultMap += "\n    never;";

console.log(`\
type StateGroup = Record<string, State<any>>;

type StaticGroup<T extends StateGroup> = State<{
    [K in keyof T]: T[K] extends State<infer U> ? U : never;
}>;

export type Sub<T> = (current: T, previous: T) => void | Promise<void>;

export class State<T> {
    constructor(value: T);
    value: T;
    static use<T extends StateGroup>(states: T): StaticGroup<T>;
    as<C>(f: (value: T) => C, collector?: Sub<any>[]): State<C>;
    set(f: (current: T) => T): void;
    sub(f: Sub<T>, collector?: Sub<any>[]): Sub<T>;
    unsub(f: Sub<T>): void;
}

export function createNode<T extends TagNames>(props: MiniProps[T]): MiniResult<T>;

export function createNode(props: ${basenode} | State<${basenode}>): Text;

export type TagNames = keyof MiniProps;
`)
console.log(_tagNameMap);
console.log("\n" + _resultMap);
console.log("\n" + anyElement);
console.log(`
export type MiniChildren = MiniNode[] | State<MiniNode[]>;

export type MiniNode = MiniElement | Node | ${basenode} | State<MiniElement | Node | ${basenode}>;

export type MiniDataset = {
    [key: string]: ${basenode} | State<${basenode}>;
} | State<{
    [key: string]: ${basenode} | State<${basenode}>;
}>;
`);
console.log(result.trim());

// console.log(use.join("\n"));

// console.log(map.CSSStyleDeclaration);
