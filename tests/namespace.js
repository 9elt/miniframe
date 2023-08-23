const HTML = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "search", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
const HTMLdeprecated = ["acronym", "applet", "basefont", "bgsound", "big", "blink", "center", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "menuitem", "multicol", "nextid", "nobr", "noembed", "noframes", "param", "plaintext", "rb", "rtc", "spacer", "strike", "tt", "xmp",];
const SVG = ["animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use", "view",];
const MATHML = ["annotation", "annotation-xml", "maction", "math", "merror", "mfrac", "mi", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mprescripts", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msubsup", "msup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "semantics"];

const HTMLnamespace = "http://www.w3.org/1999/xhtml";
const SVGnamespace = "http://www.w3.org/2000/svg";
const MATHMLnamespace = "http://www.w3.org/1998/Math/MathML";

/*

mapped
minified size ~1165 bytes

*/

const namespaceMap = { "animate": SVGnamespace, "animateMotion": SVGnamespace, "animateTransform": SVGnamespace, "circle": SVGnamespace, "clipPath": SVGnamespace, "defs": SVGnamespace, "desc": SVGnamespace, "ellipse": SVGnamespace, "feBlend": SVGnamespace, "feColorMatrix": SVGnamespace, "feComponentTransfer": SVGnamespace, "feComposite": SVGnamespace, "feConvolveMatrix": SVGnamespace, "feDiffuseLighting": SVGnamespace, "feDisplacementMap": SVGnamespace, "feDistantLight": SVGnamespace, "feDropShadow": SVGnamespace, "feFlood": SVGnamespace, "feFuncA": SVGnamespace, "feFuncB": SVGnamespace, "feFuncG": SVGnamespace, "feFuncR": SVGnamespace, "feGaussianBlur": SVGnamespace, "feImage": SVGnamespace, "feMerge": SVGnamespace, "feMergeNode": SVGnamespace, "feMorphology": SVGnamespace, "feOffset": SVGnamespace, "fePointLight": SVGnamespace, "feSpecularLighting": SVGnamespace, "feSpotLight": SVGnamespace, "feTile": SVGnamespace, "feTurbulence": SVGnamespace, "filter": SVGnamespace, "foreignObject": SVGnamespace, "g": SVGnamespace, "image": SVGnamespace, "line": SVGnamespace, "linearGradient": SVGnamespace, "marker": SVGnamespace, "mask": SVGnamespace, "metadata": SVGnamespace, "mpath": SVGnamespace, "path": SVGnamespace, "pattern": SVGnamespace, "polygon": SVGnamespace, "polyline": SVGnamespace, "radialGradient": SVGnamespace, "rect": SVGnamespace, "set": SVGnamespace, "stop": SVGnamespace, "svg": SVGnamespace, "switch": SVGnamespace, "symbol": SVGnamespace, "text": SVGnamespace, "textPath": SVGnamespace, "tspan": SVGnamespace, "use": SVGnamespace, "view": SVGnamespace, "annotation": MATHMLnamespace, "annotation-xml": MATHMLnamespace, "maction": MATHMLnamespace, "math": MATHMLnamespace, "merror": MATHMLnamespace, "mfrac": MATHMLnamespace, "mi": MATHMLnamespace, "mmultiscripts": MATHMLnamespace, "mn": MATHMLnamespace, "mo": MATHMLnamespace, "mover": MATHMLnamespace, "mpadded": MATHMLnamespace, "mphantom": MATHMLnamespace, "mprescripts": MATHMLnamespace, "mroot": MATHMLnamespace, "mrow": MATHMLnamespace, "ms": MATHMLnamespace, "mspace": MATHMLnamespace, "msqrt": MATHMLnamespace, "mstyle": MATHMLnamespace, "msub": MATHMLnamespace, "msubsup": MATHMLnamespace, "msup": MATHMLnamespace, "mtable": MATHMLnamespace, "mtd": MATHMLnamespace, "mtext": MATHMLnamespace, "mtr": MATHMLnamespace, "munder": MATHMLnamespace, "munderover": MATHMLnamespace, "semantics": MATHMLnamespace };

function getNamespaceLU(tagName) {
    return namespaceMap[tagName] || HTMLnamespace
}

/*

regex
minified size ~220 bytes

*/

const SVGRegex = /^(ani|cir|cli|def|des|el|f(e[A-Z]|il|ore)|ima|line|m(a(rke|sk)|pat|etad)|pat|pol|rad|re|s(to|v|w|y)|tex(?!(ta))|vie|ts|us|g$|set$)/;
const MATHMLRegex = /^(ann|sem|m(?!(ai|ap|pat|ar|as|enu|et|ul)))/;

function getNamespace(tagName) {
    return SVGRegex.test(tagName) ? SVGnamespace
    : MATHMLRegex.test(tagName) ? MATHMLnamespace
    : HTMLnamespace;
}

/*

tests 

*/

let tests = [0, 0];

function testF(p, r, f) {
    f(p) !== r ? (tests[1]++ && console.warn(p, "(" + r + ")", "returned", f(p))) : tests[0]++;
}

HTML.forEach(t => { testF(t, HTMLnamespace, getNamespace) });
HTMLdeprecated.forEach(t => { testF(t, HTMLnamespace, getNamespace) });
SVG.forEach(t => { testF(t, SVGnamespace, getNamespace) });
MATHML.forEach(t => { testF(t, MATHMLnamespace, getNamespace) });

HTML.forEach(t => { testF(t, HTMLnamespace, getNamespaceLU) });
HTMLdeprecated.forEach(t => { testF(t, HTMLnamespace, getNamespaceLU) });
SVG.forEach(t => { testF(t, SVGnamespace, getNamespaceLU) });
MATHML.forEach(t => { testF(t, MATHMLnamespace, getNamespaceLU) });

if (tests[1]){
    console.error(tests[1], "tagnames failed");
    process.exit(1);
}

/*

benchmarks 

*/

const tagNames = [...HTML, ...SVG, ...MATHML];

// @jsbm { lookup }
tagNames.forEach(tagName => getNamespaceLU(tagName));

// @jsbm { regex }
tagNames.forEach(tagName => getNamespace(tagName));

/*

quick results:

once x 201 tagNames (201 total)
lookup | 12μs (std. 0μs o. 18%)
regex | 12μs (std. 0μs o. 17%)

10 times x 201 tagNames (2100 total)
lookup (x10) | 116μs (std. 1μs o. 7%)
regex (x10) | 121μs (std. 0μs o. 12%)

100 times x 201 tagNames (20,1000 total)
lookup | 832μs (std. 221μs o. 0%)
regex | 945μs (std. 2μs o. 16%)

1000 times x 201 tagNames (201,000 total)
lookup | 6.29ms (std. 17μs o. 11%)
regex | 9.45ms (std. 15μs o. 5%)

*/
