const HTML_NAMESPACE_URI = "http://www.w3.org/1999/xhtml";
const SVG_NAME_SPACE_URI = "http://www.w3.org/2000/svg";
const MATH_ML_NAMESPACE_URI = "http://www.w3.org/1998/Math/MathML";
const TAB1 = "\n    ";
const TAB2 = "\n        ";

// @ts-ignore
const lib_dom_d_ts: string = await Bun.file("types/lib.dom.d.ts").text();

// @ts-ignore
const state_d_ts: string = await Bun.file("types/state.d.ts").text();

// @ts-ignore
const svg_d_ts: string = await Bun.file("types/svg.d.ts").text();

// @ts-ignore
const mini_d_ts: string = await Bun.file("types/mini.d.ts").text();

{
    const { interfaces, interfaceNames, HTMLTags, SVGTags, MathMLTags, tagNames } = parse_lib_dom_d_ts();

    let ns_Mini = parse_mini_d_ts();

    for (const [tagName, values] of Object.entries(tagNames)) {
        ns_Mini += TAB2 + Prop(tagName, values.join(" | "));
    }
    ns_Mini += TAB1 + "}";

    for (const interfaceName of interfaceNames) {
        const _interface = interfaces[interfaceName];

        // NOTE: Remove unresolved extends
        _interface.extends = _interface.extends.filter((i) => interfaces[i] !== undefined);

        let tagName: string | undefined;
        let namespaceURI: string | undefined;

        if (interfaceName === "Element") {
            tagName = Prop("tagName", Array.from(new Set([
                ...HTMLTags,
                ...SVGTags,
                ...MathMLTags,
            ])).join(" | "));
            namespaceURI = Prop("namespaceURI?", [
                JSON.stringify(HTML_NAMESPACE_URI),
                JSON.stringify(SVG_NAME_SPACE_URI),
                JSON.stringify(MATH_ML_NAMESPACE_URI),
            ].join(" | "));
        }
        else if (interfaceName === "HTMLElement") {
            tagName = Prop("tagName", HTMLTags.join(" | "));
            namespaceURI = Prop("namespaceURI?", JSON.stringify(HTML_NAMESPACE_URI));
        }
        else if (interfaceName === "SVGElement") {
            tagName = Prop("tagName", SVGTags.join(" | "));
            namespaceURI = Prop("namespaceURI", JSON.stringify(SVG_NAME_SPACE_URI));
        }
        else if (interfaceName === "MathMLElement") {
            tagName = Prop("tagName", MathMLTags.join(" | "));
            namespaceURI = Prop("namespaceURI", JSON.stringify(MATH_ML_NAMESPACE_URI));
        }
        else if (_interface.tagNames.length) {
            tagName = Prop("tagName", _interface.tagNames.join(" | "));
            namespaceURI = _interface.namespaceURI === HTML_NAMESPACE_URI
                ? Prop("namespaceURI?", JSON.stringify(_interface.namespaceURI))
                : Prop("namespaceURI", JSON.stringify(_interface.namespaceURI!));
        }

        ns_Mini += "\n" + TAB1;
        ns_Mini += _interface.extends.length > 0
            ? `interface ${interfaceName} extends ${_interface.extends.join(", ")} {`
            : `interface ${interfaceName} {`;

        if (tagName && namespaceURI) {
            ns_Mini += TAB2 + tagName;
            ns_Mini += TAB2 + namespaceURI;
            ns_Mini += TAB2 + "children?: MiniNode;";
            ns_Mini += TAB2 + "dataset?: MiniDataset;";
        }

        for (const [prop, values] of Object.entries(_interface.props)) {
            values.includes("undefined") || values.push("undefined");

            const value = values.join(" | ");

            ns_Mini += TAB2 + Prop(prop + "?", `${value} | State<${value}>`);
        }

        if (interfaceName === "SVGElement") {
            // NOTE: lib.dom does not contain svg properties, for simplicity
            // we expose them to all svg elements
            ns_Mini += parse_svg_d_ts();
        }

        ns_Mini += ns_Mini.at(-1) === "{" ? " }" :
            TAB1 + "}";
    }
    ns_Mini += "\n}";

    const index_d_ts = "// npm run generate:types"
        + "\n\n"
        + state_d_ts
        + ns_Mini
        + "\n";

    // @ts-ignore
    await Bun.write("index.d.ts", index_d_ts);
}

function parse_svg_d_ts() {
    let lines: string[] = [];
    let collect = false;
    for (const line of svg_d_ts.split("\n")) {
        if (line === "") { }
        else if (line === "*/") {
            collect = true;
        }
        else if (!collect) { }
        else if (line.startsWith("import")) { }
        else if (line.startsWith("interface SVGElement {")) { }
        else if (line.startsWith("}")) { }
        else {
            lines.push(TAB1 + line);
        }
    }
    return lines.join("");
}

function parse_mini_d_ts() {
    let lines: string[] = [];
    for (const line of mini_d_ts.split("\n")) {
        // NOTE: Skip import lines
        if (line.startsWith("import")) { }
        // NOTE: Stop at namespace  declaration
        else if (line.startsWith("    export interface Elements {")) {
            lines.push(line);
            break;
        }
        else {
            lines.push(line);
        }
    }
    return lines.join("\n");
}

function parse_lib_dom_d_ts() {
    const interfaces: {
        [name: string]: {
            extends: string[];
            props: {
                [name: string]: string[];
            };
            tagNames: string[];
            namespaceURI?: string;
        }
    } = {};

    // NOTE: Split escaping provided chars
    function split(str: string, separator: string, escFrom: string, escTo: string, limit = -1) {
        const parts: string[] = [];
        let current = "";
        let esc = 0;
        for (const char of str) {
            if (escFrom.includes(char)) {
                esc++;
                current += char;
            }
            else if (escTo.includes(char)) {
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

    let _interface: string | null = null;
    for (const line of lib_dom_d_ts.split("\n")) {
        if (line.startsWith("interface")) {
            const [_, name, keyword, ...data] = line.split(" ");

            const _extends = keyword === "extends" && data
                .slice(0, -1)
                .map(x => remove(x, ","));

            _interface = name;

            interfaces[_interface] = {
                extends: _extends || [],
                props: {},
                tagNames: [],
            };
        }
        else if (_interface && line.startsWith("}")) {
            _interface = null;
        }
        else if (_interface
            && line.startsWith("    ")
            // NOTE: Not a comment
            && !line.includes("*")) {

            let [name, value] = split(line, ":", "([", "])", 2);

            if (!name || !value) {
                continue;
            }

            name = remove(name, "?").trim();

            if (name
                // NOTE: Allow event handlers
                && (name.startsWith("on") || !name.endsWith(")"))
                // NOTE: Ignore constructors
                && !name.startsWith("new ")
                && !name.startsWith("(")
                && !name.startsWith("[")
                // NOTE: No readonly properties except for style and className
                && (!name.startsWith("readonly ")
                    || name === "readonly style")) {

                name = remove(name, "readonly ").trim();
                value = remove(value, ";").trim();

                interfaces[_interface].props[name] = split(value, "|", "(", ")");
            }
        }
    }

    const HTMLTags: string[] = [];
    const SVGTags: string[] = [];
    const MathMLTags: string[] = [];

    const interfaceNames: string[] = [];

    function resolveAllNames(interfaceName: string) {
        const _interface = interfaces[interfaceName];

        if (!_interface || interfaceNames.includes(interfaceName)) {
            return;
        }

        interfaceNames.push(interfaceName);

        for (const values of Object.values(_interface.props)) {
            values.forEach(resolveAllNames);
        }

        _interface.extends.forEach(resolveAllNames);
    }

    const tagNames: { [tag: string]: string[] } = {};

    for (const tag in interfaces.HTMLElementTagNameMap.props) {
        HTMLTags.includes(tag) || HTMLTags.push(tag);

        const [elementInterfaceName] = interfaces.HTMLElementTagNameMap.props[tag];

        const _interface = interfaces[elementInterfaceName];

        if (_interface) {
            _interface.tagNames.push(tag);
            _interface.namespaceURI = HTML_NAMESPACE_URI;

            tagNames[tag] ||= [];
            tagNames[tag].push(elementInterfaceName);

            resolveAllNames(elementInterfaceName);
        }
    }

    for (const tag in interfaces.SVGElementTagNameMap.props) {
        SVGTags.includes(tag) || SVGTags.push(tag);

        const [elementInterfaceName] = interfaces.SVGElementTagNameMap.props[tag];

        const _interface = interfaces[elementInterfaceName];

        if (_interface) {
            _interface.tagNames.push(tag);
            _interface.namespaceURI = SVG_NAME_SPACE_URI;

            tagNames[tag] ||= [];
            tagNames[tag].push(elementInterfaceName);

            resolveAllNames(elementInterfaceName);
        }
    }

    for (const tag in interfaces.MathMLElementTagNameMap.props) {
        MathMLTags.includes(tag) || MathMLTags.push(tag);

        const [elementInterfaceName] = interfaces.MathMLElementTagNameMap.props[tag];

        const _interface = interfaces[elementInterfaceName];

        if (_interface) {
            _interface.tagNames.push(tag);
            _interface.namespaceURI = MATH_ML_NAMESPACE_URI;

            tagNames[tag] ||= [];
            tagNames[tag].push(elementInterfaceName);

            resolveAllNames(elementInterfaceName);
        }
    }

    function priority(interfaceName: string) {
        return /^HTML.*Element$/.test(interfaceName) ? 3 :
            /^SVG.*Element$/.test(interfaceName) ? 2 :
                /^MathML.*Element$/.test(interfaceName) ? 1 :
                    0;
    }

    interfaceNames.sort((a, b) => priority(b) - priority(a));

    return {
        interfaces,
        interfaceNames,
        HTMLTags,
        SVGTags,
        MathMLTags,
        tagNames,
    };
}

function Prop(name: string, value: string) {
    return name + ": " + value + ";";
}

function remove(string: string, ...chars: string[]) {
    for (const char of chars) {
        string = string.replace(char, "");
    }
    return string;
}
