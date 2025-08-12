// @ts-ignore
const raw = (await Bun.file("lib.dom.d.ts").text()).split("\n");

const map: {
    [key: string]: {
        extends: string[];
        value: {
            [key: string]: string[];
        };
    };
} = {};

let interfaceName: string | null = null;

function splitBy(target: string, separator: string, escapeFrom: string, escapeTo: string, limit = -1) {
    const parts: string[] = [];

    let current = "";
    let esc = 0;

    for (const char of target) {
        if (escapeFrom.includes(char)) {
            esc++;
            current += char;
        }
        else if (escapeTo.includes(char)) {
            esc--;
            current += char;
        }
        else if (
            esc === 0
            && char === separator
            && parts.length !== limit
        ) {
            parts.push(current.trim());
            current = "";
        }
        else {
            current += char;
        }
    }

    parts.push(current.trim());

    return parts;
}

for (const line of raw) {
    if (line.startsWith("interface")) {
        const [_, name, keyword, ...data] = line.split(" ");

        let interfaceExtends: string[] = [];

        if (keyword === "extends") {
            data.pop();
            interfaceExtends = data.map(x => x.replace(",", ""));
        }

        interfaceName = name;

        map[name] = {
            extends: interfaceExtends,
            value: {},
        };
    }
    else if (interfaceName && line.startsWith("}")) {
        interfaceName = null;
    }
    else if (
        interfaceName
        && line.startsWith("    ")
        // NOTE: not a comment
        && !line.includes("*")
    ) {
        let [name, value] = splitBy(line, ":", "([", "])", 2);

        if (!name || !value) {
            continue;
        }

        name = name.replace("?", "").trim();
        value = value.replace(";", "").trim();

        if (name
            // NOTE: allow only event handlers
            && (name.startsWith("on") || !name.endsWith(")"))
            // NOTE: ignore constructors
            && !name.startsWith("new ")
            && !name.startsWith("(")
            && !name.startsWith("[")
            && (
                // NOTE: no readonly properties but style
                name === "readonly style"
                || !name.startsWith("readonly ")
            )
        ) {
            name = name.replace("readonly ", "").trim();

            map[interfaceName].value[name] = splitBy(value, "|", "(", ")");
        }
    }
}

let allInterfaces: string[] = [];

function collect(iName: string) {
    !allInterfaces.includes(iName) && allInterfaces.push(iName);

    const sub = map[iName];

    for (const key in sub.value) {
        const value = sub.value[key];

        for (const iName of value) {
            if (map[iName] && !allInterfaces.includes(iName)) {
                collect(iName);
            }
        }
    }

    for (const iName of sub.extends) {
        collect(iName);
    }
}

const htmlNamespaceURI = "http://www.w3.org/1999/xhtml";
const svgNamespaceURI = "http://www.w3.org/2000/svg";
const mathMLNamespaceURI = "http://www.w3.org/1998/Math/MathML";

const allTagNames: string[] = [];
const htmlTagNames: string[] = [];
const svgTagNames: string[] = [];
const mathTagNames: string[] = [];

for (const tagName in map.HTMLElementTagNameMap.value) {
    !allTagNames.includes(tagName) && allTagNames.push(tagName);
    !htmlTagNames.includes(tagName) && htmlTagNames.push(tagName);

    const elementInterface = map.HTMLElementTagNameMap.value[tagName][0];
    collect(elementInterface);
}

for (const tagName in map.SVGElementTagNameMap.value) {
    !allTagNames.includes(tagName) && allTagNames.push(tagName);
    !svgTagNames.includes(tagName) && svgTagNames.push(tagName);

    const elementInterface = map.SVGElementTagNameMap.value[tagName][0];
    collect(elementInterface);
}

for (const tagName in map.MathMLElementTagNameMap.value) {
    !allTagNames.includes(tagName) && allTagNames.push(tagName);
    !mathTagNames.includes(tagName) && mathTagNames.push(tagName);

    const elementInterface = map.MathMLElementTagNameMap.value[tagName][0];
    collect(elementInterface);
}

function rename(iName: string) {
    return map[iName] ? ("Mini." + iName) : iName;
}

let ns_Mini = "";
let ns_MiniX = "";

const tagNameMap = {};

function value(iName: string) {
    return /^HTML.*Element$/.test(iName)
        ? 3 :
        /^SVG.*Element$/.test(iName)
            ? 2 :
            /^MathML.*Element$/.test(iName)
                ? 1 :
                0;
}

allInterfaces.sort((a, b) => value(b) - value(a));

for (const iName of allInterfaces) {
    const interf = map[iName];

    const interfaceExtends = interf.extends.filter((iName) => !!map[iName]);
    const startOfLine = interfaceExtends.length > 0
        ? `\n    interface ${iName} extends ${interfaceExtends.join(", ")} {`
        : `\n    interface ${iName} {`;

    ns_Mini += startOfLine;
    ns_MiniX += startOfLine;

    let namespaceURI = "";
    const tagNames: string[] = [];

    for (const tagName in map.HTMLElementTagNameMap.value) {
        const elementInterface = map.HTMLElementTagNameMap.value[tagName][0];

        if (iName === elementInterface) {
            tagNames.push(tagName);
            namespaceURI = htmlNamespaceURI;
        }
    }

    for (const tagName in map.SVGElementTagNameMap.value) {
        const elementInterface = map.SVGElementTagNameMap.value[tagName][0];

        if (iName === elementInterface) {
            tagNames.push(tagName);
            namespaceURI = svgNamespaceURI;
        }
    }

    for (const tagName in map.MathMLElementTagNameMap.value) {
        const elementInterface = map.MathMLElementTagNameMap.value[tagName][0];

        if (iName === elementInterface) {
            tagNames.push(tagName);
            namespaceURI = mathMLNamespaceURI;
        }
    }

    for (const tagName of tagNames) {
        if (tagNameMap[tagName]) {
            tagNameMap[tagName].push(iName);
        }
        else {
            tagNameMap[tagName] = [iName];
        }
    }

    let isElement = false;
    let _tagName: string = "";
    let _namespaceURI: string = "";

    if (iName === "Element") {
        _tagName = `\n    tagName: ${allTagNames.join(" | ")};`;
        _namespaceURI = `\n    namespaceURI?: "${htmlNamespaceURI}" | "${svgNamespaceURI}" | "${mathMLNamespaceURI}";`;
        isElement = true;
    }
    else if (iName === "HTMLElement") {
        _tagName = `\n    tagName: ${htmlTagNames.join(" | ")};`;
        _namespaceURI = `\n    namespaceURI?: "${htmlNamespaceURI}";`;
        isElement = true;
    }
    else if (iName === "SVGElement") {
        _tagName = `\n    tagName: ${svgTagNames.join(" | ")};`;
        _namespaceURI = `\n    namespaceURI: "${svgNamespaceURI}";`;
        isElement = true;
    }
    else if (iName === "MathMLElement") {
        _tagName = `\n    tagName: ${mathTagNames.join(" | ")};`;
        _namespaceURI = `\n    namespaceURI: "${mathMLNamespaceURI}";`;
        isElement = true;
    }
    else if (tagNames.length > 0) {
        _tagName = `\n    tagName: ${tagNames.join(" | ")};`;

        if (namespaceURI) {
            _namespaceURI = namespaceURI === htmlNamespaceURI
                ? `\n    namespaceURI?: "${namespaceURI}";`
                : `\n    namespaceURI: "${namespaceURI}";`;
        }

        isElement = true;
    }

    if (isElement) {
        ns_Mini += _tagName;
        if (_namespaceURI) {
            ns_Mini += _namespaceURI;
        }
        ns_Mini += `\n    children?: MiniChildren;`;
        ns_Mini += `\n    dataset?: MiniDataset;`;

        if (_namespaceURI) {
            ns_MiniX += _namespaceURI;
        }
        ns_MiniX += `\n    children?: MiniNode | MiniChildren;`;
    }

    for (const key in interf.value) {
        !interf.value[key].includes("undefined") &&
            interf.value[key].push("undefined");

        const value = interf.value[key].join(" | ");

        const _line = `\n    ${key}?: ${value} | State<${value}>;`;
        ns_Mini += _line;
        ns_MiniX += _line;
    }

    if (
        iName.includes("SVG")
        || iName.includes("MathML")
    ) {
        // NOTE: fix for SVG and MathML
        ns_MiniX += `\n    [key: string]: any;`;
    }

    ns_Mini += ns_Mini.charAt(ns_Mini.length - 1) === "{"
        ? " }\n" : "\n    }\n";

    ns_MiniX += ns_MiniX.charAt(ns_MiniX.length - 1) === "{"
        ? " }\n" : "\n    }\n";
}

const baseNode = `string | number | false | null | undefined`;

const miniNode = `
| Mini.Element
| Mini.Element[]
| Node
| ${baseNode}
`;

let DOMNode = `export type DOMNode<P> =
    P extends State<infer U> ? DOMNode<U> :
    P extends Node ? P :`;

let IntrinsicElements = "export interface IntrinsicElements {";

for (const tagName in tagNameMap) {
    const values = tagNameMap[tagName];

    IntrinsicElements += `\n    ${tagName}: ${values.join(" | ")};`;

    for (const value of values) {
        if (
            // NOTE: These go at the end
            value === "HTMLElement"
            || value === "SVGElement"
            || value === "MathMLElement"
        ) {
            continue;
        }

        const _extends = map[value] ? ("Mini." + value) : value;
        const _line = `\n    P extends ${_extends} ? ${value} :`;

        if (!DOMNode.includes(_line)) {
            DOMNode += _line;
        }
    }
}

DOMNode += `
    P extends Mini.HTMLElement ? HTMLElement :
    P extends Mini.SVGElement ? SVGElement :
    P extends Mini.MathMLElement ? MathMLElement :
    P extends Mini.Element ? Element :
    P extends ${baseNode} ? Text :
    Node;`;

IntrinsicElements += "\n}";

console.log(`\
type StateGroup = Record<string, State<any>>;

type StaticGroup<T extends StateGroup> = State<{
    [K in keyof T]: T[K] extends State<infer U> ? U : never;
}>;

export type Sub<T> = (current: T, previous: T) => void | Promise<void>;

export class State<T> {
    static NoLoading: { NOT_PROVIDED: 0 }
    constructor(value: T);
    value: T;
    static use<T extends StateGroup>(states: T): StaticGroup<T>;
    persist(): State<T>;
    set(f: (current: T) => T): void;
    as<C>(f: (value: T) => C): State<C>;
    asyncAs<C, I, L = typeof State.NoLoading>(
        init: I,
        loading: L,
        f: ((value: T) => Promise<C>)
    ): (L extends typeof State.NoLoading ? State<I | C> : State<C | I | L>);
    sub<F extends Sub<T>>(f: F): F;
    unsub<F extends Sub<T>>(f: F): void;
}

export function createNode<P>(props: P): DOMNode<P> & { clearStateTree: () => void };

${DOMNode}

export type MiniChildren = MiniNode | State<MiniNode> | MiniNode[] | State<MiniNode[]>;

export type MiniNode = ${miniNode} | State<${miniNode}>;

export type MiniDataset = {
    [key: string]: string | number | undefined | State<string | number | undefined>;
} | State<{
    [key: string]: string | number | undefined | State<string | number | undefined>;
}>;

export declare namespace Mini {
${ns_Mini.trim()}
}

export declare namespace MiniX {
${IntrinsicElements}

${ns_MiniX.trim()}
}`);
