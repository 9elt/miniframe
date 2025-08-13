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

let Mini = "";

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

    Mini += startOfLine;

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
        Mini += _tagName;
        if (_namespaceURI) {
            Mini += _namespaceURI;
        }
        Mini += `\n    children?: MiniChildren;`;
        Mini += `\n    dataset?: MiniDataset;`;
    }

    for (const key in interf.value) {
        !interf.value[key].includes("undefined") &&
            interf.value[key].push("undefined");

        const value = interf.value[key].join(" | ");

        const _line = `\n    ${key}?: ${value} | State<${value}>;`;
        Mini += _line;
    }

    if (iName === "SVGElement") {
        // NOTE: lib.dom does not contain svg properties, for simplicity
        // we expose them to all svg elements
        Mini += `
        accumulate?: string | number | undefined | State<string | number | undefined>;
        additive?: string | number | undefined | State<string | number | undefined>;
        alignmentBaseline?: string | number | undefined | State<string | number | undefined>;
        alphabetic?: string | number | undefined | State<string | number | undefined>;
        amplitude?: string | number | undefined | State<string | number | undefined>;
        arabicForm?: string | number | undefined | State<string | number | undefined>;
        ascent?: string | number | undefined | State<string | number | undefined>;
        attributeName?: string | number | undefined | State<string | number | undefined>;
        attributeType?: string | number | undefined | State<string | number | undefined>;
        autoReverse?: string | number | undefined | State<string | number | undefined>;
        azimuth?: string | number | undefined | State<string | number | undefined>;
        baseFrequency?: string | number | undefined | State<string | number | undefined>;
        baselineShift?: string | number | undefined | State<string | number | undefined>;
        baseProfile?: string | number | undefined | State<string | number | undefined>;
        bbox?: string | number | undefined | State<string | number | undefined>;
        begin?: string | number | undefined | State<string | number | undefined>;
        bias?: string | number | undefined | State<string | number | undefined>;
        by?: string | number | undefined | State<string | number | undefined>;
        calcMode?: string | number | undefined | State<string | number | undefined>;
        capHeight?: string | number | undefined | State<string | number | undefined>;
        class?: string | number | undefined | State<string | number | undefined>;
        clip?: string | number | undefined | State<string | number | undefined>;
        clipPath?: string | number | undefined | State<string | number | undefined>;
        clipPathUnits?: string | number | undefined | State<string | number | undefined>;
        clipRule?: string | number | undefined | State<string | number | undefined>;
        color?: string | number | undefined | State<string | number | undefined>;
        colorInterpolation?: string | number | undefined | State<string | number | undefined>;
        colorInterpolationFilters?: string | number | undefined | State<string | number | undefined>;
        colorProfile?: string | number | undefined | State<string | number | undefined>;
        colorRendering?: string | number | undefined | State<string | number | undefined>;
        contentScriptType?: string | number | undefined | State<string | number | undefined>;
        contentStyleType?: string | number | undefined | State<string | number | undefined>;
        cursor?: string | number | undefined | State<string | number | undefined>;
        cx?: string | number | undefined | State<string | number | undefined>;
        cy?: string | number | undefined | State<string | number | undefined>;
        d?: string | number | undefined | State<string | number | undefined>;
        decelerate?: string | number | undefined | State<string | number | undefined>;
        descent?: string | number | undefined | State<string | number | undefined>;
        diffuseConstant?: string | number | undefined | State<string | number | undefined>;
        direction?: string | number | undefined | State<string | number | undefined>;
        display?: string | number | undefined | State<string | number | undefined>;
        divisor?: string | number | undefined | State<string | number | undefined>;
        dominantBaseline?: string | number | undefined | State<string | number | undefined>;
        dur?: string | number | undefined | State<string | number | undefined>;
        dx?: string | number | undefined | State<string | number | undefined>;
        dy?: string | number | undefined | State<string | number | undefined>;
        edgeMode?: string | number | undefined | State<string | number | undefined>;
        elevation?: string | number | undefined | State<string | number | undefined>;
        enableBackground?: string | number | undefined | State<string | number | undefined>;
        end?: string | number | undefined | State<string | number | undefined>;
        exponent?: string | number | undefined | State<string | number | undefined>;
        externalResourcesRequired?: string | number | undefined | State<string | number | undefined>;
        fill?: string | number | undefined | State<string | number | undefined>;
        fillOpacity?: string | number | undefined | State<string | number | undefined>;
        fillRule?: string | number | undefined | State<string | number | undefined>;
        filter?: string | number | undefined | State<string | number | undefined>;
        filterRes?: string | number | undefined | State<string | number | undefined>;
        filterUnits?: string | number | undefined | State<string | number | undefined>;
        floodColor?: string | number | undefined | State<string | number | undefined>;
        floodOpacity?: string | number | undefined | State<string | number | undefined>;
        fontFamily?: string | number | undefined | State<string | number | undefined>;
        fontSize?: string | number | undefined | State<string | number | undefined>;
        fontSizeAdjust?: string | number | undefined | State<string | number | undefined>;
        fontStretch?: string | number | undefined | State<string | number | undefined>;
        fontStyle?: string | number | undefined | State<string | number | undefined>;
        fontVariant?: string | number | undefined | State<string | number | undefined>;
        fontWeight?: string | number | undefined | State<string | number | undefined>;
        format?: string | number | undefined | State<string | number | undefined>;
        from?: string | number | undefined | State<string | number | undefined>;
        fr?: string | number | undefined | State<string | number | undefined>;
        fx?: string | number | undefined | State<string | number | undefined>;
        fy?: string | number | undefined | State<string | number | undefined>;
        g1?: string | number | undefined | State<string | number | undefined>;
        g2?: string | number | undefined | State<string | number | undefined>;
        glyphName?: string | number | undefined | State<string | number | undefined>;
        glyphOrientationHorizontal?: string | number | undefined | State<string | number | undefined>;
        glyphOrientationVertical?: string | number | undefined | State<string | number | undefined>;
        glyphRef?: string | number | undefined | State<string | number | undefined>;
        gradientTransform?: string | number | undefined | State<string | number | undefined>;
        gradientUnits?: string | number | undefined | State<string | number | undefined>;
        hanging?: string | number | undefined | State<string | number | undefined>;
        height?: string | number | undefined | State<string | number | undefined>;
        href?: string | number | undefined | State<string | number | undefined>;
        hreflang?: string | number | undefined | State<string | number | undefined>;
        horizAdvX?: string | number | undefined | State<string | number | undefined>;
        horizOriginX?: string | number | undefined | State<string | number | undefined>;
        horizOriginY?: string | number | undefined | State<string | number | undefined>;
        ideographic?: string | number | undefined | State<string | number | undefined>;
        imageRendering?: string | number | undefined | State<string | number | undefined>;
        in?: string | number | undefined | State<string | number | undefined>;
        in2?: string | number | undefined | State<string | number | undefined>;
        intercept?: string | number | undefined | State<string | number | undefined>;
        k?: string | number | undefined | State<string | number | undefined>;
        k1?: string | number | undefined | State<string | number | undefined>;
        k2?: string | number | undefined | State<string | number | undefined>;
        k3?: string | number | undefined | State<string | number | undefined>;
        k4?: string | number | undefined | State<string | number | undefined>;
        kernelMatrix?: string | number | undefined | State<string | number | undefined>;
        kernelUnitLength?: string | number | undefined | State<string | number | undefined>;
        kerning?: string | number | undefined | State<string | number | undefined>;
        keyPoints?: string | number | undefined | State<string | number | undefined>;
        keySplines?: string | number | undefined | State<string | number | undefined>;
        keyTimes?: string | number | undefined | State<string | number | undefined>;
        lang?: string | number | undefined | State<string | number | undefined>;
        lengthAdjust?: string | number | undefined | State<string | number | undefined>;
        letterSpacing?: string | number | undefined | State<string | number | undefined>;
        lightingColor?: string | number | undefined | State<string | number | undefined>;
        limitingConeAngle?: string | number | undefined | State<string | number | undefined>;
        local?: string | number | undefined | State<string | number | undefined>;
        markerEnd?: string | number | undefined | State<string | number | undefined>;
        markerHeight?: string | number | undefined | State<string | number | undefined>;
        markerMid?: string | number | undefined | State<string | number | undefined>;
        markerStart?: string | number | undefined | State<string | number | undefined>;
        markerUnits?: string | number | undefined | State<string | number | undefined>;
        markerWidth?: string | number | undefined | State<string | number | undefined>;
        mask?: string | number | undefined | State<string | number | undefined>;
        maskContentUnits?: string | number | undefined | State<string | number | undefined>;
        maskUnits?: string | number | undefined | State<string | number | undefined>;
        mathematical?: string | number | undefined | State<string | number | undefined>;
        max?: string | number | undefined | State<string | number | undefined>;
        media?: string | number | undefined | State<string | number | undefined>;
        method?: string | number | undefined | State<string | number | undefined>;
        min?: string | number | undefined | State<string | number | undefined>;
        mode?: string | number | undefined | State<string | number | undefined>;
        name?: string | number | undefined | State<string | number | undefined>;
        numOctaves?: string | number | undefined | State<string | number | undefined>;
        offset?: string | number | undefined | State<string | number | undefined>;
        opacity?: string | number | undefined | State<string | number | undefined>;
        operator?: string | number | undefined | State<string | number | undefined>;
        order?: string | number | undefined | State<string | number | undefined>;
        orient?: string | number | undefined | State<string | number | undefined>;
        orientation?: string | number | undefined | State<string | number | undefined>;
        origin?: string | number | undefined | State<string | number | undefined>;
        overflow?: string | number | undefined | State<string | number | undefined>;
        overlinePosition?: string | number | undefined | State<string | number | undefined>;
        overlineThickness?: string | number | undefined | State<string | number | undefined>;
        paintOrder?: string | number | undefined | State<string | number | undefined>;
        panose1?: string | number | undefined | State<string | number | undefined>;
        path?: string | number | undefined | State<string | number | undefined>;
        pathLength?: string | number | undefined | State<string | number | undefined>;
        patternContentUnits?: string | number | undefined | State<string | number | undefined>;
        patternTransform?: string | number | undefined | State<string | number | undefined>;
        patternUnits?: string | number | undefined | State<string | number | undefined>;
        pointerEvents?: string | number | undefined | State<string | number | undefined>;
        points?: string | number | undefined | State<string | number | undefined>;
        pointsAtX?: string | number | undefined | State<string | number | undefined>;
        pointsAtY?: string | number | undefined | State<string | number | undefined>;
        pointsAtZ?: string | number | undefined | State<string | number | undefined>;
        preserveAlpha?: string | number | undefined | State<string | number | undefined>;
        preserveAspectRatio?: string | number | undefined | State<string | number | undefined>;
        primitiveUnits?: string | number | undefined | State<string | number | undefined>;
        r?: string | number | undefined | State<string | number | undefined>;
        radius?: string | number | undefined | State<string | number | undefined>;
        refX?: string | number | undefined | State<string | number | undefined>;
        refY?: string | number | undefined | State<string | number | undefined>;
        renderingIntent?: string | number | undefined | State<string | number | undefined>;
        repeatCount?: string | number | undefined | State<string | number | undefined>;
        repeatDur?: string | number | undefined | State<string | number | undefined>;
        requiredExtensions?: string | number | undefined | State<string | number | undefined>;
        requiredFeatures?: string | number | undefined | State<string | number | undefined>;
        restart?: string | number | undefined | State<string | number | undefined>;
        result?: string | number | undefined | State<string | number | undefined>;
        rotate?: string | number | undefined | State<string | number | undefined>;
        rx?: string | number | undefined | State<string | number | undefined>;
        ry?: string | number | undefined | State<string | number | undefined>;
        scale?: string | number | undefined | State<string | number | undefined>;
        seed?: string | number | undefined | State<string | number | undefined>;
        shapeRendering?: string | number | undefined | State<string | number | undefined>;
        slope?: string | number | undefined | State<string | number | undefined>;
        spacing?: string | number | undefined | State<string | number | undefined>;
        specularConstant?: string | number | undefined | State<string | number | undefined>;
        specularExponent?: string | number | undefined | State<string | number | undefined>;
        speed?: string | number | undefined | State<string | number | undefined>;
        spreadMethod?: string | number | undefined | State<string | number | undefined>;
        startOffset?: string | number | undefined | State<string | number | undefined>;
        stdDeviation?: string | number | undefined | State<string | number | undefined>;
        stemh?: string | number | undefined | State<string | number | undefined>;
        stemv?: string | number | undefined | State<string | number | undefined>;
        stitchTiles?: string | number | undefined | State<string | number | undefined>;
        stopColor?: string | number | undefined | State<string | number | undefined>;
        stopOpacity?: string | number | undefined | State<string | number | undefined>;
        strikethroughPosition?: string | number | undefined | State<string | number | undefined>;
        strikethroughThickness?: string | number | undefined | State<string | number | undefined>;
        string?: string | number | undefined | State<string | number | undefined>;
        stroke?: string | number | undefined | State<string | number | undefined>;
        strokeDasharray?: string | number | undefined | State<string | number | undefined>;
        strokeDashoffset?: string | number | undefined | State<string | number | undefined>;
        strokeLinecap?: string | number | undefined | State<string | number | undefined>;
        strokeLinejoin?: string | number | undefined | State<string | number | undefined>;
        strokeMiterlimit?: string | number | undefined | State<string | number | undefined>;
        strokeOpacity?: string | number | undefined | State<string | number | undefined>;
        strokeWidth?: string | number | undefined | State<string | number | undefined>;
        surfaceScale?: string | number | undefined | State<string | number | undefined>;
        systemLanguage?: string | number | undefined | State<string | number | undefined>;
        tableValues?: string | number | undefined | State<string | number | undefined>;
        target?: string | number | undefined | State<string | number | undefined>;
        targetX?: string | number | undefined | State<string | number | undefined>;
        targetY?: string | number | undefined | State<string | number | undefined>;
        textAnchor?: string | number | undefined | State<string | number | undefined>;
        textDecoration?: string | number | undefined | State<string | number | undefined>;
        textLength?: string | number | undefined | State<string | number | undefined>;
        textRendering?: string | number | undefined | State<string | number | undefined>;
        to?: string | number | undefined | State<string | number | undefined>;
        transform?: string | number | undefined | State<string | number | undefined>;
        type?: string | number | undefined | State<string | number | undefined>;
        u1?: string | number | undefined | State<string | number | undefined>;
        u2?: string | number | undefined | State<string | number | undefined>;
        underlinePosition?: string | number | undefined | State<string | number | undefined>;
        underlineThickness?: string | number | undefined | State<string | number | undefined>;
        unicode?: string | number | undefined | State<string | number | undefined>;
        unicodeBidi?: string | number | undefined | State<string | number | undefined>;
        unicodeRange?: string | number | undefined | State<string | number | undefined>;
        unitsPerEm?: string | number | undefined | State<string | number | undefined>;
        vAlphabetic?: string | number | undefined | State<string | number | undefined>;
        vHanging?: string | number | undefined | State<string | number | undefined>;
        vIdeographic?: string | number | undefined | State<string | number | undefined>;
        vMathematical?: string | number | undefined | State<string | number | undefined>;
        values?: string | number | undefined | State<string | number | undefined>;
        vectorEffect?: string | number | undefined | State<string | number | undefined>;
        version?: string | number | undefined | State<string | number | undefined>;
        vertAdvY?: string | number | undefined | State<string | number | undefined>;
        vertOriginX?: string | number | undefined | State<string | number | undefined>;
        vertOriginY?: string | number | undefined | State<string | number | undefined>;
        viewBox?: string | number | undefined | State<string | number | undefined>;
        viewTarget?: string | number | undefined | State<string | number | undefined>;
        visibility?: string | number | undefined | State<string | number | undefined>;
        width?: string | number | undefined | State<string | number | undefined>;
        widths?: string | number | undefined | State<string | number | undefined>;
        wordSpacing?: string | number | undefined | State<string | number | undefined>;
        writingMode?: string | number | undefined | State<string | number | undefined>;
        x?: string | number | undefined | State<string | number | undefined>;
        x1?: string | number | undefined | State<string | number | undefined>;
        x2?: string | number | undefined | State<string | number | undefined>;
        xChannelSelector?: string | number | undefined | State<string | number | undefined>;
        xHeight?: string | number | undefined | State<string | number | undefined>;
        y?: string | number | undefined | State<string | number | undefined>;
        y1?: string | number | undefined | State<string | number | undefined>;
        y2?: string | number | undefined | State<string | number | undefined>;
        yChannelSelector?: string | number | undefined | State<string | number | undefined>;
        z?: string | number | undefined | State<string | number | undefined>;
        zoomAndPan?: string | number | undefined | State<string | number | undefined>;`;
    }

    Mini += Mini.charAt(Mini.length - 1) === "{"
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

    IntrinsicElements += `\n    ${tagName}: ${values.map((T: string) => `IntrinsicElement<${T}>`).join(" | ")};`;

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
export type Sub<T> = (current: T, previous: T) => void | Promise<void>;

type Sync<S> = {
    [K in keyof S]: S[K] extends State<infer U> ? U : never;
};

export class State<T> {
    constructor(value: T);
    value: T;
    static sync<const S extends State<unknown>[]>(...states: [
        ...S
    ]): State<Sync<S>>;
    static sync<const S extends State<unknown>[], C>(...states: [
        ...S,
        (...values: Sync<S>) => C
    ]): State<C>;
    as<C>(f: (value: T) => C): State<C>;
    asyncAs<I, C>(
        init: I,
        f: ((value: T) => Promise<C>)
    ): State<I | C>;
    asyncAs<I, L, C>(
        init: I,
        loading: L,
        f: ((value: T) => Promise<C>)
    ): State<I | L | C>;
    sub<F extends Sub<T>>(f: F): F;
    unsub<F extends Sub<T>>(f: F): void;
}

export type ClearNode = { clear: () => void; };

export function createNode<P>(props: P): DOMNode<P> & ClearNode;

export type CreateNodeProps = Node | Mini.Element | string | number | false | null | undefined;

export function createNode<N extends Node = Node>(
    props: CreateNodeProps | State<CreateNodeProps>
): N & ClearNode;

${DOMNode}

export type MiniChildren = MiniNode | State<MiniNode> | MiniNode[] | State<MiniNode[]>;

export type MiniNode = ${miniNode} | State<${miniNode}>;

export type MiniDataset = {
    [key: string]: string | number | undefined | State<string | number | undefined>;
} | State<{
    [key: string]: string | number | undefined | State<string | number | undefined>;
}>;

export declare namespace Mini {
    type IntrinsicElement<T> = Omit<T, "tagName">;

${IntrinsicElements}

${Mini.trim()}
}`);
