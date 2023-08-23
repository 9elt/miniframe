/*
auto-generated using jsbm CLI
https://github.com/9elt/jsbm

samples: 1000
iterations: 1000
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
try {
const _results = Array(1000);
for (let _sample = 0; _sample < 1000; _sample++) {
let _iteration = 1000;
const _start = performance.now();
while (_iteration--) {
tagNames.forEach(tagName => getNamespaceLU(tagName));
};
_results[_sample] = performance.now() - _start;
}
_jsbm_log('lookup', _jsbm_snd(_results));
} catch (error) {
_jsbm_log('lookup', error);
};
try {
const _results = Array(1000);
for (let _sample = 0; _sample < 1000; _sample++) {
let _iteration = 1000;
const _start = performance.now();
while (_iteration--) {
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
};
_results[_sample] = performance.now() - _start;
}
_jsbm_log('regex', _jsbm_snd(_results));
} catch (error) {
_jsbm_log('regex', error);
};