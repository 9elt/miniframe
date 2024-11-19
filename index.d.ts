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

export function createNode(props: string | number | false | null | State<string | number | false | null>): Text;

export type TagNames = keyof MiniProps;

export type MiniProps = {
    "a": Mini_HTMLAnchorElement | Mini_SVGAElement;
    "abbr": Mini_HTMLElement;
    "address": Mini_HTMLElement;
    "article": Mini_HTMLElement;
    "aside": Mini_HTMLElement;
    "b": Mini_HTMLElement;
    "bdi": Mini_HTMLElement;
    "bdo": Mini_HTMLElement;
    "cite": Mini_HTMLElement;
    "code": Mini_HTMLElement;
    "dd": Mini_HTMLElement;
    "dfn": Mini_HTMLElement;
    "dt": Mini_HTMLElement;
    "em": Mini_HTMLElement;
    "figcaption": Mini_HTMLElement;
    "figure": Mini_HTMLElement;
    "footer": Mini_HTMLElement;
    "header": Mini_HTMLElement;
    "hgroup": Mini_HTMLElement;
    "i": Mini_HTMLElement;
    "kbd": Mini_HTMLElement;
    "main": Mini_HTMLElement;
    "mark": Mini_HTMLElement;
    "nav": Mini_HTMLElement;
    "noscript": Mini_HTMLElement;
    "rp": Mini_HTMLElement;
    "rt": Mini_HTMLElement;
    "ruby": Mini_HTMLElement;
    "s": Mini_HTMLElement;
    "samp": Mini_HTMLElement;
    "search": Mini_HTMLElement;
    "section": Mini_HTMLElement;
    "small": Mini_HTMLElement;
    "strong": Mini_HTMLElement;
    "sub": Mini_HTMLElement;
    "summary": Mini_HTMLElement;
    "sup": Mini_HTMLElement;
    "u": Mini_HTMLElement;
    "var": Mini_HTMLElement;
    "wbr": Mini_HTMLElement;
    "area": Mini_HTMLAreaElement;
    "audio": Mini_HTMLAudioElement;
    "base": Mini_HTMLBaseElement;
    "blockquote": Mini_HTMLQuoteElement;
    "q": Mini_HTMLQuoteElement;
    "body": Mini_HTMLBodyElement;
    "br": Mini_HTMLBRElement;
    "button": Mini_HTMLButtonElement;
    "canvas": Mini_HTMLCanvasElement;
    "caption": Mini_HTMLTableCaptionElement;
    "col": Mini_HTMLTableColElement;
    "colgroup": Mini_HTMLTableColElement;
    "data": Mini_HTMLDataElement;
    "datalist": Mini_HTMLDataListElement;
    "del": Mini_HTMLModElement;
    "ins": Mini_HTMLModElement;
    "details": Mini_HTMLDetailsElement;
    "dialog": Mini_HTMLDialogElement;
    "div": Mini_HTMLDivElement;
    "dl": Mini_HTMLDListElement;
    "embed": Mini_HTMLEmbedElement;
    "fieldset": Mini_HTMLFieldSetElement;
    "form": Mini_HTMLFormElement;
    "h1": Mini_HTMLHeadingElement;
    "h2": Mini_HTMLHeadingElement;
    "h3": Mini_HTMLHeadingElement;
    "h4": Mini_HTMLHeadingElement;
    "h5": Mini_HTMLHeadingElement;
    "h6": Mini_HTMLHeadingElement;
    "head": Mini_HTMLHeadElement;
    "hr": Mini_HTMLHRElement;
    "html": Mini_HTMLHtmlElement;
    "iframe": Mini_HTMLIFrameElement;
    "img": Mini_HTMLImageElement;
    "input": Mini_HTMLInputElement;
    "label": Mini_HTMLLabelElement;
    "legend": Mini_HTMLLegendElement;
    "li": Mini_HTMLLIElement;
    "link": Mini_HTMLLinkElement;
    "map": Mini_HTMLMapElement;
    "menu": Mini_HTMLMenuElement;
    "meta": Mini_HTMLMetaElement;
    "meter": Mini_HTMLMeterElement;
    "object": Mini_HTMLObjectElement;
    "ol": Mini_HTMLOListElement;
    "optgroup": Mini_HTMLOptGroupElement;
    "option": Mini_HTMLOptionElement;
    "output": Mini_HTMLOutputElement;
    "p": Mini_HTMLParagraphElement;
    "picture": Mini_HTMLPictureElement;
    "pre": Mini_HTMLPreElement;
    "progress": Mini_HTMLProgressElement;
    "script": Mini_HTMLScriptElement | Mini_SVGScriptElement;
    "select": Mini_HTMLSelectElement;
    "slot": Mini_HTMLSlotElement;
    "source": Mini_HTMLSourceElement;
    "span": Mini_HTMLSpanElement;
    "style": Mini_HTMLStyleElement | Mini_SVGStyleElement;
    "table": Mini_HTMLTableElement;
    "tbody": Mini_HTMLTableSectionElement;
    "tfoot": Mini_HTMLTableSectionElement;
    "thead": Mini_HTMLTableSectionElement;
    "td": Mini_HTMLTableCellElement;
    "th": Mini_HTMLTableCellElement;
    "template": Mini_HTMLTemplateElement;
    "textarea": Mini_HTMLTextAreaElement;
    "time": Mini_HTMLTimeElement;
    "title": Mini_HTMLTitleElement | Mini_SVGTitleElement;
    "tr": Mini_HTMLTableRowElement;
    "track": Mini_HTMLTrackElement;
    "ul": Mini_HTMLUListElement;
    "video": Mini_HTMLVideoElement;
    "animate": Mini_SVGAnimateElement;
    "animateMotion": Mini_SVGAnimateMotionElement;
    "animateTransform": Mini_SVGAnimateTransformElement;
    "circle": Mini_SVGCircleElement;
    "clipPath": Mini_SVGClipPathElement;
    "defs": Mini_SVGDefsElement;
    "desc": Mini_SVGDescElement;
    "ellipse": Mini_SVGEllipseElement;
    "feBlend": Mini_SVGFEBlendElement;
    "feColorMatrix": Mini_SVGFEColorMatrixElement;
    "feComponentTransfer": Mini_SVGFEComponentTransferElement;
    "feComposite": Mini_SVGFECompositeElement;
    "feConvolveMatrix": Mini_SVGFEConvolveMatrixElement;
    "feDiffuseLighting": Mini_SVGFEDiffuseLightingElement;
    "feDisplacementMap": Mini_SVGFEDisplacementMapElement;
    "feDistantLight": Mini_SVGFEDistantLightElement;
    "feDropShadow": Mini_SVGFEDropShadowElement;
    "feFlood": Mini_SVGFEFloodElement;
    "feFuncA": Mini_SVGFEFuncAElement;
    "feFuncB": Mini_SVGFEFuncBElement;
    "feFuncG": Mini_SVGFEFuncGElement;
    "feFuncR": Mini_SVGFEFuncRElement;
    "feGaussianBlur": Mini_SVGFEGaussianBlurElement;
    "feImage": Mini_SVGFEImageElement;
    "feMerge": Mini_SVGFEMergeElement;
    "feMergeNode": Mini_SVGFEMergeNodeElement;
    "feMorphology": Mini_SVGFEMorphologyElement;
    "feOffset": Mini_SVGFEOffsetElement;
    "fePointLight": Mini_SVGFEPointLightElement;
    "feSpecularLighting": Mini_SVGFESpecularLightingElement;
    "feSpotLight": Mini_SVGFESpotLightElement;
    "feTile": Mini_SVGFETileElement;
    "feTurbulence": Mini_SVGFETurbulenceElement;
    "filter": Mini_SVGFilterElement;
    "foreignObject": Mini_SVGForeignObjectElement;
    "g": Mini_SVGGElement;
    "image": Mini_SVGImageElement;
    "line": Mini_SVGLineElement;
    "linearGradient": Mini_SVGLinearGradientElement;
    "marker": Mini_SVGMarkerElement;
    "mask": Mini_SVGMaskElement;
    "metadata": Mini_SVGMetadataElement;
    "mpath": Mini_SVGMPathElement;
    "path": Mini_SVGPathElement;
    "pattern": Mini_SVGPatternElement;
    "polygon": Mini_SVGPolygonElement;
    "polyline": Mini_SVGPolylineElement;
    "radialGradient": Mini_SVGRadialGradientElement;
    "rect": Mini_SVGRectElement;
    "set": Mini_SVGSetElement;
    "stop": Mini_SVGStopElement;
    "svg": Mini_SVGSVGElement;
    "switch": Mini_SVGSwitchElement;
    "symbol": Mini_SVGSymbolElement;
    "text": Mini_SVGTextElement;
    "textPath": Mini_SVGTextPathElement;
    "tspan": Mini_SVGTSpanElement;
    "use": Mini_SVGUseElement;
    "view": Mini_SVGViewElement;
    "annotation": Mini_MathMLElement;
    "annotation-xml": Mini_MathMLElement;
    "maction": Mini_MathMLElement;
    "math": Mini_MathMLElement;
    "merror": Mini_MathMLElement;
    "mfrac": Mini_MathMLElement;
    "mi": Mini_MathMLElement;
    "mmultiscripts": Mini_MathMLElement;
    "mn": Mini_MathMLElement;
    "mo": Mini_MathMLElement;
    "mover": Mini_MathMLElement;
    "mpadded": Mini_MathMLElement;
    "mphantom": Mini_MathMLElement;
    "mprescripts": Mini_MathMLElement;
    "mroot": Mini_MathMLElement;
    "mrow": Mini_MathMLElement;
    "ms": Mini_MathMLElement;
    "mspace": Mini_MathMLElement;
    "msqrt": Mini_MathMLElement;
    "mstyle": Mini_MathMLElement;
    "msub": Mini_MathMLElement;
    "msubsup": Mini_MathMLElement;
    "msup": Mini_MathMLElement;
    "mtable": Mini_MathMLElement;
    "mtd": Mini_MathMLElement;
    "mtext": Mini_MathMLElement;
    "mtr": Mini_MathMLElement;
    "munder": Mini_MathMLElement;
    "munderover": Mini_MathMLElement;
    "semantics": Mini_MathMLElement;
}

export type MiniResult<T extends TagNames> =
    MiniProps[T] extends Mini_HTMLAnchorElement ? HTMLAnchorElement :
    MiniProps[T] extends Mini_SVGAElement ? SVGAElement :
    MiniProps[T] extends Mini_HTMLElement ? HTMLElement :
    MiniProps[T] extends Mini_HTMLAreaElement ? HTMLAreaElement :
    MiniProps[T] extends Mini_HTMLAudioElement ? HTMLAudioElement :
    MiniProps[T] extends Mini_HTMLBaseElement ? HTMLBaseElement :
    MiniProps[T] extends Mini_HTMLQuoteElement ? HTMLQuoteElement :
    MiniProps[T] extends Mini_HTMLBodyElement ? HTMLBodyElement :
    MiniProps[T] extends Mini_HTMLBRElement ? HTMLBRElement :
    MiniProps[T] extends Mini_HTMLButtonElement ? HTMLButtonElement :
    MiniProps[T] extends Mini_HTMLCanvasElement ? HTMLCanvasElement :
    MiniProps[T] extends Mini_HTMLTableCaptionElement ? HTMLTableCaptionElement :
    MiniProps[T] extends Mini_HTMLTableColElement ? HTMLTableColElement :
    MiniProps[T] extends Mini_HTMLDataElement ? HTMLDataElement :
    MiniProps[T] extends Mini_HTMLDataListElement ? HTMLDataListElement :
    MiniProps[T] extends Mini_HTMLModElement ? HTMLModElement :
    MiniProps[T] extends Mini_HTMLDetailsElement ? HTMLDetailsElement :
    MiniProps[T] extends Mini_HTMLDialogElement ? HTMLDialogElement :
    MiniProps[T] extends Mini_HTMLDivElement ? HTMLDivElement :
    MiniProps[T] extends Mini_HTMLDListElement ? HTMLDListElement :
    MiniProps[T] extends Mini_HTMLEmbedElement ? HTMLEmbedElement :
    MiniProps[T] extends Mini_HTMLFieldSetElement ? HTMLFieldSetElement :
    MiniProps[T] extends Mini_HTMLFormElement ? HTMLFormElement :
    MiniProps[T] extends Mini_HTMLHeadingElement ? HTMLHeadingElement :
    MiniProps[T] extends Mini_HTMLHeadElement ? HTMLHeadElement :
    MiniProps[T] extends Mini_HTMLHRElement ? HTMLHRElement :
    MiniProps[T] extends Mini_HTMLHtmlElement ? HTMLHtmlElement :
    MiniProps[T] extends Mini_HTMLIFrameElement ? HTMLIFrameElement :
    MiniProps[T] extends Mini_HTMLImageElement ? HTMLImageElement :
    MiniProps[T] extends Mini_HTMLInputElement ? HTMLInputElement :
    MiniProps[T] extends Mini_HTMLLabelElement ? HTMLLabelElement :
    MiniProps[T] extends Mini_HTMLLegendElement ? HTMLLegendElement :
    MiniProps[T] extends Mini_HTMLLIElement ? HTMLLIElement :
    MiniProps[T] extends Mini_HTMLLinkElement ? HTMLLinkElement :
    MiniProps[T] extends Mini_HTMLMapElement ? HTMLMapElement :
    MiniProps[T] extends Mini_HTMLMenuElement ? HTMLMenuElement :
    MiniProps[T] extends Mini_HTMLMetaElement ? HTMLMetaElement :
    MiniProps[T] extends Mini_HTMLMeterElement ? HTMLMeterElement :
    MiniProps[T] extends Mini_HTMLObjectElement ? HTMLObjectElement :
    MiniProps[T] extends Mini_HTMLOListElement ? HTMLOListElement :
    MiniProps[T] extends Mini_HTMLOptGroupElement ? HTMLOptGroupElement :
    MiniProps[T] extends Mini_HTMLOptionElement ? HTMLOptionElement :
    MiniProps[T] extends Mini_HTMLOutputElement ? HTMLOutputElement :
    MiniProps[T] extends Mini_HTMLParagraphElement ? HTMLParagraphElement :
    MiniProps[T] extends Mini_HTMLPictureElement ? HTMLPictureElement :
    MiniProps[T] extends Mini_HTMLPreElement ? HTMLPreElement :
    MiniProps[T] extends Mini_HTMLProgressElement ? HTMLProgressElement :
    MiniProps[T] extends Mini_HTMLScriptElement ? HTMLScriptElement :
    MiniProps[T] extends Mini_SVGScriptElement ? SVGScriptElement :
    MiniProps[T] extends Mini_HTMLSelectElement ? HTMLSelectElement :
    MiniProps[T] extends Mini_HTMLSlotElement ? HTMLSlotElement :
    MiniProps[T] extends Mini_HTMLSourceElement ? HTMLSourceElement :
    MiniProps[T] extends Mini_HTMLSpanElement ? HTMLSpanElement :
    MiniProps[T] extends Mini_HTMLStyleElement ? HTMLStyleElement :
    MiniProps[T] extends Mini_SVGStyleElement ? SVGStyleElement :
    MiniProps[T] extends Mini_HTMLTableElement ? HTMLTableElement :
    MiniProps[T] extends Mini_HTMLTableSectionElement ? HTMLTableSectionElement :
    MiniProps[T] extends Mini_HTMLTableCellElement ? HTMLTableCellElement :
    MiniProps[T] extends Mini_HTMLTemplateElement ? HTMLTemplateElement :
    MiniProps[T] extends Mini_HTMLTextAreaElement ? HTMLTextAreaElement :
    MiniProps[T] extends Mini_HTMLTimeElement ? HTMLTimeElement :
    MiniProps[T] extends Mini_HTMLTitleElement ? HTMLTitleElement :
    MiniProps[T] extends Mini_SVGTitleElement ? SVGTitleElement :
    MiniProps[T] extends Mini_HTMLTableRowElement ? HTMLTableRowElement :
    MiniProps[T] extends Mini_HTMLTrackElement ? HTMLTrackElement :
    MiniProps[T] extends Mini_HTMLUListElement ? HTMLUListElement :
    MiniProps[T] extends Mini_HTMLVideoElement ? HTMLVideoElement :
    MiniProps[T] extends Mini_SVGAnimateElement ? SVGAnimateElement :
    MiniProps[T] extends Mini_SVGAnimateMotionElement ? SVGAnimateMotionElement :
    MiniProps[T] extends Mini_SVGAnimateTransformElement ? SVGAnimateTransformElement :
    MiniProps[T] extends Mini_SVGCircleElement ? SVGCircleElement :
    MiniProps[T] extends Mini_SVGClipPathElement ? SVGClipPathElement :
    MiniProps[T] extends Mini_SVGDefsElement ? SVGDefsElement :
    MiniProps[T] extends Mini_SVGDescElement ? SVGDescElement :
    MiniProps[T] extends Mini_SVGEllipseElement ? SVGEllipseElement :
    MiniProps[T] extends Mini_SVGFEBlendElement ? SVGFEBlendElement :
    MiniProps[T] extends Mini_SVGFEColorMatrixElement ? SVGFEColorMatrixElement :
    MiniProps[T] extends Mini_SVGFEComponentTransferElement ? SVGFEComponentTransferElement :
    MiniProps[T] extends Mini_SVGFECompositeElement ? SVGFECompositeElement :
    MiniProps[T] extends Mini_SVGFEConvolveMatrixElement ? SVGFEConvolveMatrixElement :
    MiniProps[T] extends Mini_SVGFEDiffuseLightingElement ? SVGFEDiffuseLightingElement :
    MiniProps[T] extends Mini_SVGFEDisplacementMapElement ? SVGFEDisplacementMapElement :
    MiniProps[T] extends Mini_SVGFEDistantLightElement ? SVGFEDistantLightElement :
    MiniProps[T] extends Mini_SVGFEDropShadowElement ? SVGFEDropShadowElement :
    MiniProps[T] extends Mini_SVGFEFloodElement ? SVGFEFloodElement :
    MiniProps[T] extends Mini_SVGFEFuncAElement ? SVGFEFuncAElement :
    MiniProps[T] extends Mini_SVGFEFuncBElement ? SVGFEFuncBElement :
    MiniProps[T] extends Mini_SVGFEFuncGElement ? SVGFEFuncGElement :
    MiniProps[T] extends Mini_SVGFEFuncRElement ? SVGFEFuncRElement :
    MiniProps[T] extends Mini_SVGFEGaussianBlurElement ? SVGFEGaussianBlurElement :
    MiniProps[T] extends Mini_SVGFEImageElement ? SVGFEImageElement :
    MiniProps[T] extends Mini_SVGFEMergeElement ? SVGFEMergeElement :
    MiniProps[T] extends Mini_SVGFEMergeNodeElement ? SVGFEMergeNodeElement :
    MiniProps[T] extends Mini_SVGFEMorphologyElement ? SVGFEMorphologyElement :
    MiniProps[T] extends Mini_SVGFEOffsetElement ? SVGFEOffsetElement :
    MiniProps[T] extends Mini_SVGFEPointLightElement ? SVGFEPointLightElement :
    MiniProps[T] extends Mini_SVGFESpecularLightingElement ? SVGFESpecularLightingElement :
    MiniProps[T] extends Mini_SVGFESpotLightElement ? SVGFESpotLightElement :
    MiniProps[T] extends Mini_SVGFETileElement ? SVGFETileElement :
    MiniProps[T] extends Mini_SVGFETurbulenceElement ? SVGFETurbulenceElement :
    MiniProps[T] extends Mini_SVGFilterElement ? SVGFilterElement :
    MiniProps[T] extends Mini_SVGForeignObjectElement ? SVGForeignObjectElement :
    MiniProps[T] extends Mini_SVGGElement ? SVGGElement :
    MiniProps[T] extends Mini_SVGImageElement ? SVGImageElement :
    MiniProps[T] extends Mini_SVGLineElement ? SVGLineElement :
    MiniProps[T] extends Mini_SVGLinearGradientElement ? SVGLinearGradientElement :
    MiniProps[T] extends Mini_SVGMarkerElement ? SVGMarkerElement :
    MiniProps[T] extends Mini_SVGMaskElement ? SVGMaskElement :
    MiniProps[T] extends Mini_SVGMetadataElement ? SVGMetadataElement :
    MiniProps[T] extends Mini_SVGMPathElement ? SVGMPathElement :
    MiniProps[T] extends Mini_SVGPathElement ? SVGPathElement :
    MiniProps[T] extends Mini_SVGPatternElement ? SVGPatternElement :
    MiniProps[T] extends Mini_SVGPolygonElement ? SVGPolygonElement :
    MiniProps[T] extends Mini_SVGPolylineElement ? SVGPolylineElement :
    MiniProps[T] extends Mini_SVGRadialGradientElement ? SVGRadialGradientElement :
    MiniProps[T] extends Mini_SVGRectElement ? SVGRectElement :
    MiniProps[T] extends Mini_SVGSetElement ? SVGSetElement :
    MiniProps[T] extends Mini_SVGStopElement ? SVGStopElement :
    MiniProps[T] extends Mini_SVGSVGElement ? SVGSVGElement :
    MiniProps[T] extends Mini_SVGSwitchElement ? SVGSwitchElement :
    MiniProps[T] extends Mini_SVGSymbolElement ? SVGSymbolElement :
    MiniProps[T] extends Mini_SVGTextElement ? SVGTextElement :
    MiniProps[T] extends Mini_SVGTextPathElement ? SVGTextPathElement :
    MiniProps[T] extends Mini_SVGTSpanElement ? SVGTSpanElement :
    MiniProps[T] extends Mini_SVGUseElement ? SVGUseElement :
    MiniProps[T] extends Mini_SVGViewElement ? SVGViewElement :
    MiniProps[T] extends Mini_MathMLElement ? MathMLElement :
    never;

type MiniElement =
    | Mini_HTMLAnchorElement
    | Mini_HTMLElement
    | Mini_HTMLAreaElement
    | Mini_HTMLAudioElement
    | Mini_HTMLBaseElement
    | Mini_HTMLQuoteElement
    | Mini_HTMLBodyElement
    | Mini_HTMLBRElement
    | Mini_HTMLButtonElement
    | Mini_HTMLCanvasElement
    | Mini_HTMLTableCaptionElement
    | Mini_HTMLTableColElement
    | Mini_HTMLDataElement
    | Mini_HTMLDataListElement
    | Mini_HTMLModElement
    | Mini_HTMLDetailsElement
    | Mini_HTMLDialogElement
    | Mini_HTMLDivElement
    | Mini_HTMLDListElement
    | Mini_HTMLEmbedElement
    | Mini_HTMLFieldSetElement
    | Mini_HTMLFormElement
    | Mini_HTMLHeadingElement
    | Mini_HTMLHeadElement
    | Mini_HTMLHRElement
    | Mini_HTMLHtmlElement
    | Mini_HTMLIFrameElement
    | Mini_HTMLImageElement
    | Mini_HTMLInputElement
    | Mini_HTMLLabelElement
    | Mini_HTMLLegendElement
    | Mini_HTMLLIElement
    | Mini_HTMLLinkElement
    | Mini_HTMLMapElement
    | Mini_HTMLMenuElement
    | Mini_HTMLMetaElement
    | Mini_HTMLMeterElement
    | Mini_HTMLObjectElement
    | Mini_HTMLOListElement
    | Mini_HTMLOptGroupElement
    | Mini_HTMLOptionElement
    | Mini_HTMLOutputElement
    | Mini_HTMLParagraphElement
    | Mini_HTMLPictureElement
    | Mini_HTMLPreElement
    | Mini_HTMLProgressElement
    | Mini_HTMLScriptElement
    | Mini_HTMLSelectElement
    | Mini_HTMLSlotElement
    | Mini_HTMLSourceElement
    | Mini_HTMLSpanElement
    | Mini_HTMLStyleElement
    | Mini_HTMLTableElement
    | Mini_HTMLTableSectionElement
    | Mini_HTMLTableCellElement
    | Mini_HTMLTemplateElement
    | Mini_HTMLTextAreaElement
    | Mini_HTMLTimeElement
    | Mini_HTMLTitleElement
    | Mini_HTMLTableRowElement
    | Mini_HTMLTrackElement
    | Mini_HTMLUListElement
    | Mini_HTMLVideoElement
    | Mini_SVGAElement
    | Mini_SVGAnimateElement
    | Mini_SVGAnimateMotionElement
    | Mini_SVGAnimateTransformElement
    | Mini_SVGCircleElement
    | Mini_SVGClipPathElement
    | Mini_SVGDefsElement
    | Mini_SVGDescElement
    | Mini_SVGEllipseElement
    | Mini_SVGFEBlendElement
    | Mini_SVGFEColorMatrixElement
    | Mini_SVGFEComponentTransferElement
    | Mini_SVGFECompositeElement
    | Mini_SVGFEConvolveMatrixElement
    | Mini_SVGFEDiffuseLightingElement
    | Mini_SVGFEDisplacementMapElement
    | Mini_SVGFEDistantLightElement
    | Mini_SVGFEDropShadowElement
    | Mini_SVGFEFloodElement
    | Mini_SVGFEFuncAElement
    | Mini_SVGFEFuncBElement
    | Mini_SVGFEFuncGElement
    | Mini_SVGFEFuncRElement
    | Mini_SVGFEGaussianBlurElement
    | Mini_SVGFEImageElement
    | Mini_SVGFEMergeElement
    | Mini_SVGFEMergeNodeElement
    | Mini_SVGFEMorphologyElement
    | Mini_SVGFEOffsetElement
    | Mini_SVGFEPointLightElement
    | Mini_SVGFESpecularLightingElement
    | Mini_SVGFESpotLightElement
    | Mini_SVGFETileElement
    | Mini_SVGFETurbulenceElement
    | Mini_SVGFilterElement
    | Mini_SVGForeignObjectElement
    | Mini_SVGGElement
    | Mini_SVGImageElement
    | Mini_SVGLineElement
    | Mini_SVGLinearGradientElement
    | Mini_SVGMarkerElement
    | Mini_SVGMaskElement
    | Mini_SVGMetadataElement
    | Mini_SVGMPathElement
    | Mini_SVGPathElement
    | Mini_SVGPatternElement
    | Mini_SVGPolygonElement
    | Mini_SVGPolylineElement
    | Mini_SVGRadialGradientElement
    | Mini_SVGRectElement
    | Mini_SVGScriptElement
    | Mini_SVGSetElement
    | Mini_SVGStopElement
    | Mini_SVGStyleElement
    | Mini_SVGSVGElement
    | Mini_SVGSwitchElement
    | Mini_SVGSymbolElement
    | Mini_SVGTextElement
    | Mini_SVGTextPathElement
    | Mini_SVGTitleElement
    | Mini_SVGTSpanElement
    | Mini_SVGUseElement
    | Mini_SVGViewElement
    | Mini_MathMLElement;

export type MiniChildren = MiniNode[] | State<MiniNode[]>;

export type MiniNode = MiniElement | Node | string | number | false | null | State<MiniElement | Node | string | number | false | null>;

export type MiniDataset = {
    [key: string]: string | number | false | null | State<string | number | false | null>;
} | State<{
    [key: string]: string | number | false | null | State<string | number | false | null>;
}>;

interface Mini_HTMLAnchorElement extends Mini_HTMLElement, Mini_HTMLHyperlinkElementUtils {
    tagName: "a";
    children?: MiniNode[];
    dataset?: MiniDataset;
    charset?: string | State<string>;
    coords?: string | State<string>;
    download?: string | State<string>;
    hreflang?: string | State<string>;
    name?: string | State<string>;
    ping?: string | State<string>;
    referrerPolicy?: string | State<string>;
    rel?: string | State<string>;
    rev?: string | State<string>;
    shape?: string | State<string>;
    target?: string | State<string>;
    text?: string | State<string>;
    type?: string | State<string>;
}

interface Mini_HTMLElement extends Mini_Element, Mini_ElementCSSInlineStyle, Mini_ElementContentEditable, Mini_GlobalEventHandlers, Mini_HTMLOrSVGElement {
    tagName: "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "search" | "section" | "select" | "slot" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr";
    children?: MiniNode[];
    dataset?: MiniDataset;
    accessKey?: string | State<string>;
    autocapitalize?: string | State<string>;
    dir?: string | State<string>;
    draggable?: boolean | State<boolean>;
    hidden?: boolean | State<boolean>;
    inert?: boolean | State<boolean>;
    innerText?: string | State<string>;
    lang?: string | State<string>;
    outerText?: string | State<string>;
    popover?: string | null | State<string | null>;
    spellcheck?: boolean | State<boolean>;
    title?: string | State<string>;
    translate?: boolean | State<boolean>;
}

interface Mini_HTMLOrSVGElement {
    autofocus?: boolean | State<boolean>;
    nonce?: string | State<string>;
    tabIndex?: number | State<number>;
}

interface Mini_HTMLAreaElement extends Mini_HTMLElement, Mini_HTMLHyperlinkElementUtils {
    tagName: "area";
    children?: MiniNode[];
    dataset?: MiniDataset;
    alt?: string | State<string>;
    coords?: string | State<string>;
    download?: string | State<string>;
    noHref?: boolean | State<boolean>;
    ping?: string | State<string>;
    referrerPolicy?: string | State<string>;
    rel?: string | State<string>;
    shape?: string | State<string>;
    target?: string | State<string>;
}

interface Mini_HTMLAudioElement extends Mini_HTMLMediaElement {
    tagName: "audio";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_HTMLMediaElement extends Mini_HTMLElement {
    autoplay?: boolean | State<boolean>;
    controls?: boolean | State<boolean>;
    crossOrigin?: string | null | State<string | null>;
    currentTime?: number | State<number>;
    defaultMuted?: boolean | State<boolean>;
    defaultPlaybackRate?: number | State<number>;
    disableRemotePlayback?: boolean | State<boolean>;
    loop?: boolean | State<boolean>;
    muted?: boolean | State<boolean>;
    onencrypted?: ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null | State<((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null>;
    onwaitingforkey?: ((this: HTMLMediaElement, ev: Event) => any) | null | State<((this: HTMLMediaElement, ev: Event) => any) | null>;
    playbackRate?: number | State<number>;
    preload?: "none" | "metadata" | "auto" | "" | State<"none" | "metadata" | "auto" | "">;
    preservesPitch?: boolean | State<boolean>;
    src?: string | State<string>;
    srcObject?: MediaProvider | null | State<MediaProvider | null>;
    volume?: number | State<number>;
}

interface Mini_HTMLBaseElement extends Mini_HTMLElement {
    tagName: "base";
    children?: MiniNode[];
    dataset?: MiniDataset;
    href?: string | State<string>;
    target?: string | State<string>;
}

interface Mini_HTMLQuoteElement extends Mini_HTMLElement {
    tagName: "blockquote" | "q";
    children?: MiniNode[];
    dataset?: MiniDataset;
    cite?: string | State<string>;
}

interface Mini_HTMLBodyElement extends Mini_HTMLElement, Mini_WindowEventHandlers {
    tagName: "body";
    children?: MiniNode[];
    dataset?: MiniDataset;
    aLink?: string | State<string>;
    background?: string | State<string>;
    bgColor?: string | State<string>;
    link?: string | State<string>;
    text?: string | State<string>;
    vLink?: string | State<string>;
}

interface Mini_HTMLBRElement extends Mini_HTMLElement {
    tagName: "br";
    children?: MiniNode[];
    dataset?: MiniDataset;
    clear?: string | State<string>;
}

interface Mini_HTMLButtonElement extends Mini_HTMLElement, Mini_PopoverInvokerElement {
    tagName: "button";
    children?: MiniNode[];
    dataset?: MiniDataset;
    disabled?: boolean | State<boolean>;
    formAction?: string | State<string>;
    formEnctype?: string | State<string>;
    formMethod?: string | State<string>;
    formNoValidate?: boolean | State<boolean>;
    formTarget?: string | State<string>;
    name?: string | State<string>;
    type?: "submit" | "reset" | "button" | State<"submit" | "reset" | "button">;
    value?: string | State<string>;
}

interface Mini_HTMLCanvasElement extends Mini_HTMLElement {
    tagName: "canvas";
    children?: MiniNode[];
    dataset?: MiniDataset;
    height?: number | State<number>;
    width?: number | State<number>;
}

interface Mini_HTMLTableCaptionElement extends Mini_HTMLElement {
    tagName: "caption";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
}

interface Mini_HTMLTableColElement extends Mini_HTMLElement {
    tagName: "col" | "colgroup";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    ch?: string | State<string>;
    chOff?: string | State<string>;
    span?: number | State<number>;
    vAlign?: string | State<string>;
    width?: string | State<string>;
}

interface Mini_HTMLDataElement extends Mini_HTMLElement {
    tagName: "data";
    children?: MiniNode[];
    dataset?: MiniDataset;
    value?: string | State<string>;
}

interface Mini_HTMLDataListElement extends Mini_HTMLElement {
    tagName: "datalist";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_HTMLModElement extends Mini_HTMLElement {
    tagName: "del" | "ins";
    children?: MiniNode[];
    dataset?: MiniDataset;
    cite?: string | State<string>;
    dateTime?: string | State<string>;
}

interface Mini_HTMLDetailsElement extends Mini_HTMLElement {
    tagName: "details";
    children?: MiniNode[];
    dataset?: MiniDataset;
    name?: string | State<string>;
    open?: boolean | State<boolean>;
}

interface Mini_HTMLDialogElement extends Mini_HTMLElement {
    tagName: "dialog";
    children?: MiniNode[];
    dataset?: MiniDataset;
    open?: boolean | State<boolean>;
    returnValue?: string | State<string>;
}

interface Mini_HTMLDivElement extends Mini_HTMLElement {
    tagName: "div";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
}

interface Mini_HTMLDListElement extends Mini_HTMLElement {
    tagName: "dl";
    children?: MiniNode[];
    dataset?: MiniDataset;
    compact?: boolean | State<boolean>;
}

interface Mini_HTMLEmbedElement extends Mini_HTMLElement {
    tagName: "embed";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    height?: string | State<string>;
    name?: string | State<string>;
    src?: string | State<string>;
    type?: string | State<string>;
    width?: string | State<string>;
}

interface Mini_HTMLFieldSetElement extends Mini_HTMLElement {
    tagName: "fieldset";
    children?: MiniNode[];
    dataset?: MiniDataset;
    disabled?: boolean | State<boolean>;
    name?: string | State<string>;
}

interface Mini_HTMLFormElement extends Mini_HTMLElement {
    tagName: "form";
    children?: MiniNode[];
    dataset?: MiniDataset;
    acceptCharset?: string | State<string>;
    action?: string | State<string>;
    autocomplete?: AutoFillBase | State<AutoFillBase>;
    encoding?: string | State<string>;
    enctype?: string | State<string>;
    method?: string | State<string>;
    name?: string | State<string>;
    noValidate?: boolean | State<boolean>;
    rel?: string | State<string>;
    target?: string | State<string>;
}

interface Mini_HTMLHeadingElement extends Mini_HTMLElement {
    tagName: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
}

interface Mini_HTMLHeadElement extends Mini_HTMLElement {
    tagName: "head";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_HTMLHRElement extends Mini_HTMLElement {
    tagName: "hr";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    color?: string | State<string>;
    noShade?: boolean | State<boolean>;
    size?: string | State<string>;
    width?: string | State<string>;
}

interface Mini_HTMLHtmlElement extends Mini_HTMLElement {
    tagName: "html";
    children?: MiniNode[];
    dataset?: MiniDataset;
    version?: string | State<string>;
}

interface Mini_HTMLIFrameElement extends Mini_HTMLElement {
    tagName: "iframe";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    allow?: string | State<string>;
    allowFullscreen?: boolean | State<boolean>;
    frameBorder?: string | State<string>;
    height?: string | State<string>;
    loading?: string | State<string>;
    longDesc?: string | State<string>;
    marginHeight?: string | State<string>;
    marginWidth?: string | State<string>;
    name?: string | State<string>;
    referrerPolicy?: ReferrerPolicy | State<ReferrerPolicy>;
    scrolling?: string | State<string>;
    src?: string | State<string>;
    srcdoc?: string | State<string>;
    width?: string | State<string>;
}

interface Mini_HTMLImageElement extends Mini_HTMLElement {
    tagName: "img";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    alt?: string | State<string>;
    border?: string | State<string>;
    crossOrigin?: string | null | State<string | null>;
    decoding?: "async" | "sync" | "auto" | State<"async" | "sync" | "auto">;
    fetchPriority?: string | State<string>;
    height?: number | State<number>;
    hspace?: number | State<number>;
    isMap?: boolean | State<boolean>;
    loading?: "eager" | "lazy" | State<"eager" | "lazy">;
    longDesc?: string | State<string>;
    lowsrc?: string | State<string>;
    name?: string | State<string>;
    referrerPolicy?: string | State<string>;
    sizes?: string | State<string>;
    src?: string | State<string>;
    srcset?: string | State<string>;
    useMap?: string | State<string>;
    vspace?: number | State<number>;
    width?: number | State<number>;
}

interface Mini_HTMLInputElement extends Mini_HTMLElement, Mini_PopoverInvokerElement {
    tagName: "input";
    children?: MiniNode[];
    dataset?: MiniDataset;
    accept?: string | State<string>;
    align?: string | State<string>;
    alt?: string | State<string>;
    autocomplete?: AutoFill | State<AutoFill>;
    capture?: string | State<string>;
    checked?: boolean | State<boolean>;
    defaultChecked?: boolean | State<boolean>;
    defaultValue?: string | State<string>;
    dirName?: string | State<string>;
    disabled?: boolean | State<boolean>;
    files?: Mini_FileList | null | State<Mini_FileList | null>;
    formAction?: string | State<string>;
    formEnctype?: string | State<string>;
    formMethod?: string | State<string>;
    formNoValidate?: boolean | State<boolean>;
    formTarget?: string | State<string>;
    height?: number | State<number>;
    indeterminate?: boolean | State<boolean>;
    max?: string | State<string>;
    maxLength?: number | State<number>;
    min?: string | State<string>;
    minLength?: number | State<number>;
    multiple?: boolean | State<boolean>;
    name?: string | State<string>;
    pattern?: string | State<string>;
    placeholder?: string | State<string>;
    readOnly?: boolean | State<boolean>;
    required?: boolean | State<boolean>;
    selectionDirection?: "forward" | "backward" | "none" | null | State<"forward" | "backward" | "none" | null>;
    selectionEnd?: number | null | State<number | null>;
    selectionStart?: number | null | State<number | null>;
    size?: number | State<number>;
    src?: string | State<string>;
    step?: string | State<string>;
    type?: string | State<string>;
    useMap?: string | State<string>;
    value?: string | State<string>;
    valueAsDate?: Date | null | State<Date | null>;
    valueAsNumber?: number | State<number>;
    webkitdirectory?: boolean | State<boolean>;
    width?: number | State<number>;
}

interface Mini_HTMLLabelElement extends Mini_HTMLElement {
    tagName: "label";
    children?: MiniNode[];
    dataset?: MiniDataset;
    htmlFor?: string | State<string>;
}

interface Mini_HTMLLegendElement extends Mini_HTMLElement {
    tagName: "legend";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
}

interface Mini_HTMLLIElement extends Mini_HTMLElement {
    tagName: "li";
    children?: MiniNode[];
    dataset?: MiniDataset;
    type?: string | State<string>;
    value?: number | State<number>;
}

interface Mini_HTMLLinkElement extends Mini_HTMLElement, Mini_LinkStyle {
    tagName: "link";
    children?: MiniNode[];
    dataset?: MiniDataset;
    as?: string | State<string>;
    charset?: string | State<string>;
    crossOrigin?: string | null | State<string | null>;
    disabled?: boolean | State<boolean>;
    fetchPriority?: string | State<string>;
    href?: string | State<string>;
    hreflang?: string | State<string>;
    imageSizes?: string | State<string>;
    imageSrcset?: string | State<string>;
    integrity?: string | State<string>;
    media?: string | State<string>;
    referrerPolicy?: string | State<string>;
    rel?: string | State<string>;
    rev?: string | State<string>;
    target?: string | State<string>;
    type?: string | State<string>;
}

interface Mini_HTMLMapElement extends Mini_HTMLElement {
    tagName: "map";
    children?: MiniNode[];
    dataset?: MiniDataset;
    name?: string | State<string>;
}

interface Mini_HTMLMenuElement extends Mini_HTMLElement {
    tagName: "menu";
    children?: MiniNode[];
    dataset?: MiniDataset;
    compact?: boolean | State<boolean>;
}

interface Mini_HTMLMetaElement extends Mini_HTMLElement {
    tagName: "meta";
    children?: MiniNode[];
    dataset?: MiniDataset;
    content?: string | State<string>;
    httpEquiv?: string | State<string>;
    media?: string | State<string>;
    name?: string | State<string>;
    scheme?: string | State<string>;
}

interface Mini_HTMLMeterElement extends Mini_HTMLElement {
    tagName: "meter";
    children?: MiniNode[];
    dataset?: MiniDataset;
    high?: number | State<number>;
    low?: number | State<number>;
    max?: number | State<number>;
    min?: number | State<number>;
    optimum?: number | State<number>;
    value?: number | State<number>;
}

interface Mini_HTMLObjectElement extends Mini_HTMLElement {
    tagName: "object";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    archive?: string | State<string>;
    border?: string | State<string>;
    code?: string | State<string>;
    codeBase?: string | State<string>;
    codeType?: string | State<string>;
    data?: string | State<string>;
    declare?: boolean | State<boolean>;
    height?: string | State<string>;
    hspace?: number | State<number>;
    name?: string | State<string>;
    standby?: string | State<string>;
    type?: string | State<string>;
    useMap?: string | State<string>;
    vspace?: number | State<number>;
    width?: string | State<string>;
}

interface Mini_HTMLOListElement extends Mini_HTMLElement {
    tagName: "ol";
    children?: MiniNode[];
    dataset?: MiniDataset;
    compact?: boolean | State<boolean>;
    reversed?: boolean | State<boolean>;
    start?: number | State<number>;
    type?: string | State<string>;
}

interface Mini_HTMLOptGroupElement extends Mini_HTMLElement {
    tagName: "optgroup";
    children?: MiniNode[];
    dataset?: MiniDataset;
    disabled?: boolean | State<boolean>;
    label?: string | State<string>;
}

interface Mini_HTMLOptionElement extends Mini_HTMLElement {
    tagName: "option";
    children?: MiniNode[];
    dataset?: MiniDataset;
    defaultSelected?: boolean | State<boolean>;
    disabled?: boolean | State<boolean>;
    label?: string | State<string>;
    selected?: boolean | State<boolean>;
    text?: string | State<string>;
    value?: string | State<string>;
}

interface Mini_HTMLOutputElement extends Mini_HTMLElement {
    tagName: "output";
    children?: MiniNode[];
    dataset?: MiniDataset;
    defaultValue?: string | State<string>;
    name?: string | State<string>;
    value?: string | State<string>;
}

interface Mini_HTMLParagraphElement extends Mini_HTMLElement {
    tagName: "p";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
}

interface Mini_HTMLPictureElement extends Mini_HTMLElement {
    tagName: "picture";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_HTMLPreElement extends Mini_HTMLElement {
    tagName: "pre";
    children?: MiniNode[];
    dataset?: MiniDataset;
    width?: number | State<number>;
}

interface Mini_HTMLProgressElement extends Mini_HTMLElement {
    tagName: "progress";
    children?: MiniNode[];
    dataset?: MiniDataset;
    max?: number | State<number>;
    value?: number | State<number>;
}

interface Mini_HTMLScriptElement extends Mini_HTMLElement {
    tagName: "script";
    children?: MiniNode[];
    dataset?: MiniDataset;
    async?: boolean | State<boolean>;
    charset?: string | State<string>;
    crossOrigin?: string | null | State<string | null>;
    defer?: boolean | State<boolean>;
    event?: string | State<string>;
    fetchPriority?: string | State<string>;
    htmlFor?: string | State<string>;
    integrity?: string | State<string>;
    noModule?: boolean | State<boolean>;
    referrerPolicy?: string | State<string>;
    src?: string | State<string>;
    text?: string | State<string>;
    type?: string | State<string>;
}

interface Mini_HTMLSelectElement extends Mini_HTMLElement {
    tagName: "select";
    children?: MiniNode[];
    dataset?: MiniDataset;
    autocomplete?: AutoFill | State<AutoFill>;
    disabled?: boolean | State<boolean>;
    length?: number | State<number>;
    multiple?: boolean | State<boolean>;
    name?: string | State<string>;
    required?: boolean | State<boolean>;
    selectedIndex?: number | State<number>;
    size?: number | State<number>;
    value?: string | State<string>;
}

interface Mini_HTMLSlotElement extends Mini_HTMLElement {
    tagName: "slot";
    children?: MiniNode[];
    dataset?: MiniDataset;
    name?: string | State<string>;
}

interface Mini_HTMLSourceElement extends Mini_HTMLElement {
    tagName: "source";
    children?: MiniNode[];
    dataset?: MiniDataset;
    height?: number | State<number>;
    media?: string | State<string>;
    sizes?: string | State<string>;
    src?: string | State<string>;
    srcset?: string | State<string>;
    type?: string | State<string>;
    width?: number | State<number>;
}

interface Mini_HTMLSpanElement extends Mini_HTMLElement {
    tagName: "span";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_HTMLStyleElement extends Mini_HTMLElement, Mini_LinkStyle {
    tagName: "style";
    children?: MiniNode[];
    dataset?: MiniDataset;
    disabled?: boolean | State<boolean>;
    media?: string | State<string>;
    type?: string | State<string>;
}

interface Mini_HTMLTableElement extends Mini_HTMLElement {
    tagName: "table";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    bgColor?: string | State<string>;
    border?: string | State<string>;
    caption?: Mini_HTMLTableCaptionElement | null | State<Mini_HTMLTableCaptionElement | null>;
    cellPadding?: string | State<string>;
    cellSpacing?: string | State<string>;
    frame?: string | State<string>;
    rules?: string | State<string>;
    summary?: string | State<string>;
    tFoot?: Mini_HTMLTableSectionElement | null | State<Mini_HTMLTableSectionElement | null>;
    tHead?: Mini_HTMLTableSectionElement | null | State<Mini_HTMLTableSectionElement | null>;
    width?: string | State<string>;
}

interface Mini_HTMLTableSectionElement extends Mini_HTMLElement {
    tagName: "tbody" | "tfoot" | "thead";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    ch?: string | State<string>;
    chOff?: string | State<string>;
    vAlign?: string | State<string>;
}

interface Mini_HTMLTableCellElement extends Mini_HTMLElement {
    tagName: "td" | "th";
    children?: MiniNode[];
    dataset?: MiniDataset;
    abbr?: string | State<string>;
    align?: string | State<string>;
    axis?: string | State<string>;
    bgColor?: string | State<string>;
    ch?: string | State<string>;
    chOff?: string | State<string>;
    colSpan?: number | State<number>;
    headers?: string | State<string>;
    height?: string | State<string>;
    noWrap?: boolean | State<boolean>;
    rowSpan?: number | State<number>;
    scope?: string | State<string>;
    vAlign?: string | State<string>;
    width?: string | State<string>;
}

interface Mini_HTMLTemplateElement extends Mini_HTMLElement {
    tagName: "template";
    children?: MiniNode[];
    dataset?: MiniDataset;
    shadowRootMode?: string | State<string>;
}

interface Mini_HTMLTextAreaElement extends Mini_HTMLElement {
    tagName: "textarea";
    children?: MiniNode[];
    dataset?: MiniDataset;
    autocomplete?: AutoFill | State<AutoFill>;
    cols?: number | State<number>;
    defaultValue?: string | State<string>;
    dirName?: string | State<string>;
    disabled?: boolean | State<boolean>;
    maxLength?: number | State<number>;
    minLength?: number | State<number>;
    name?: string | State<string>;
    placeholder?: string | State<string>;
    readOnly?: boolean | State<boolean>;
    required?: boolean | State<boolean>;
    rows?: number | State<number>;
    selectionDirection?: "forward" | "backward" | "none" | State<"forward" | "backward" | "none">;
    selectionEnd?: number | State<number>;
    selectionStart?: number | State<number>;
    value?: string | State<string>;
    wrap?: string | State<string>;
}

interface Mini_HTMLTimeElement extends Mini_HTMLElement {
    tagName: "time";
    children?: MiniNode[];
    dataset?: MiniDataset;
    dateTime?: string | State<string>;
}

interface Mini_HTMLTitleElement extends Mini_HTMLElement {
    tagName: "title";
    children?: MiniNode[];
    dataset?: MiniDataset;
    text?: string | State<string>;
}

interface Mini_HTMLTableRowElement extends Mini_HTMLElement {
    tagName: "tr";
    children?: MiniNode[];
    dataset?: MiniDataset;
    align?: string | State<string>;
    bgColor?: string | State<string>;
    ch?: string | State<string>;
    chOff?: string | State<string>;
    vAlign?: string | State<string>;
}

interface Mini_HTMLTrackElement extends Mini_HTMLElement {
    tagName: "track";
    children?: MiniNode[];
    dataset?: MiniDataset;
    default?: boolean | State<boolean>;
    kind?: string | State<string>;
    label?: string | State<string>;
    src?: string | State<string>;
    srclang?: string | State<string>;
}

interface Mini_HTMLUListElement extends Mini_HTMLElement {
    tagName: "ul";
    children?: MiniNode[];
    dataset?: MiniDataset;
    compact?: boolean | State<boolean>;
    type?: string | State<string>;
}

interface Mini_HTMLVideoElement extends Mini_HTMLMediaElement {
    tagName: "video";
    children?: MiniNode[];
    dataset?: MiniDataset;
    disablePictureInPicture?: boolean | State<boolean>;
    height?: number | State<number>;
    onenterpictureinpicture?: ((this: HTMLVideoElement, ev: Event) => any) | null | State<((this: HTMLVideoElement, ev: Event) => any) | null>;
    onleavepictureinpicture?: ((this: HTMLVideoElement, ev: Event) => any) | null | State<((this: HTMLVideoElement, ev: Event) => any) | null>;
    playsInline?: boolean | State<boolean>;
    poster?: string | State<string>;
    width?: number | State<number>;
}

interface Mini_SVGAElement extends Mini_SVGGraphicsElement, Mini_SVGURIReference {
    tagName: "a";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
    rel?: string | State<string>;
}

interface Mini_SVGGraphicsElement extends Mini_SVGElement, Mini_SVGTests { }

interface Mini_SVGElement extends Mini_Element, Mini_ElementCSSInlineStyle, Mini_GlobalEventHandlers, Mini_HTMLOrSVGElement { }

interface Mini_SVGAnimateElement extends Mini_SVGAnimationElement {
    tagName: "animate";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGAnimationElement extends Mini_SVGElement, Mini_SVGTests { }

interface Mini_SVGAnimateMotionElement extends Mini_SVGAnimationElement {
    tagName: "animateMotion";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGAnimateTransformElement extends Mini_SVGAnimationElement {
    tagName: "animateTransform";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGCircleElement extends Mini_SVGGeometryElement {
    tagName: "circle";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGGeometryElement extends Mini_SVGGraphicsElement { }

interface Mini_SVGClipPathElement extends Mini_SVGElement {
    tagName: "clipPath";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGDefsElement extends Mini_SVGGraphicsElement {
    tagName: "defs";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGDescElement extends Mini_SVGElement {
    tagName: "desc";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGEllipseElement extends Mini_SVGGeometryElement {
    tagName: "ellipse";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEBlendElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feBlend";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEColorMatrixElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feColorMatrix";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEComponentTransferElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feComponentTransfer";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFECompositeElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feComposite";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEConvolveMatrixElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feConvolveMatrix";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEDiffuseLightingElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feDiffuseLighting";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEDisplacementMapElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feDisplacementMap";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEDistantLightElement extends Mini_SVGElement {
    tagName: "feDistantLight";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEDropShadowElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feDropShadow";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEFloodElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feFlood";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEFuncAElement extends Mini_SVGComponentTransferFunctionElement {
    tagName: "feFuncA";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGComponentTransferFunctionElement extends Mini_SVGElement { }

interface Mini_SVGFEFuncBElement extends Mini_SVGComponentTransferFunctionElement {
    tagName: "feFuncB";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEFuncGElement extends Mini_SVGComponentTransferFunctionElement {
    tagName: "feFuncG";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEFuncRElement extends Mini_SVGComponentTransferFunctionElement {
    tagName: "feFuncR";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEGaussianBlurElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feGaussianBlur";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEImageElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes, Mini_SVGURIReference {
    tagName: "feImage";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEMergeElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feMerge";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEMergeNodeElement extends Mini_SVGElement {
    tagName: "feMergeNode";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEMorphologyElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feMorphology";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEOffsetElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feOffset";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFEPointLightElement extends Mini_SVGElement {
    tagName: "fePointLight";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFESpecularLightingElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feSpecularLighting";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFESpotLightElement extends Mini_SVGElement {
    tagName: "feSpotLight";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFETileElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feTile";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFETurbulenceElement extends Mini_SVGElement, Mini_SVGFilterPrimitiveStandardAttributes {
    tagName: "feTurbulence";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGFilterElement extends Mini_SVGElement, Mini_SVGURIReference {
    tagName: "filter";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGForeignObjectElement extends Mini_SVGGraphicsElement {
    tagName: "foreignObject";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGGElement extends Mini_SVGGraphicsElement {
    tagName: "g";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGImageElement extends Mini_SVGGraphicsElement, Mini_SVGURIReference {
    tagName: "image";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
    crossOrigin?: string | null | State<string | null>;
}

interface Mini_SVGLineElement extends Mini_SVGGeometryElement {
    tagName: "line";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGLinearGradientElement extends Mini_SVGGradientElement {
    tagName: "linearGradient";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGGradientElement extends Mini_SVGElement, Mini_SVGURIReference { }

interface Mini_SVGMarkerElement extends Mini_SVGElement, Mini_SVGFitToViewBox {
    tagName: "marker";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGMaskElement extends Mini_SVGElement {
    tagName: "mask";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGMetadataElement extends Mini_SVGElement {
    tagName: "metadata";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGMPathElement extends Mini_SVGElement, Mini_SVGURIReference {
    tagName: "mpath";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGPathElement extends Mini_SVGGeometryElement {
    tagName: "path";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGPatternElement extends Mini_SVGElement, Mini_SVGFitToViewBox, Mini_SVGURIReference {
    tagName: "pattern";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGPolygonElement extends Mini_SVGGeometryElement, Mini_SVGAnimatedPoints {
    tagName: "polygon";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGPolylineElement extends Mini_SVGGeometryElement, Mini_SVGAnimatedPoints {
    tagName: "polyline";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGRadialGradientElement extends Mini_SVGGradientElement {
    tagName: "radialGradient";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGRectElement extends Mini_SVGGeometryElement {
    tagName: "rect";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGScriptElement extends Mini_SVGElement, Mini_SVGURIReference {
    tagName: "script";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
    type?: string | State<string>;
}

interface Mini_SVGSetElement extends Mini_SVGAnimationElement {
    tagName: "set";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGStopElement extends Mini_SVGElement {
    tagName: "stop";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGStyleElement extends Mini_SVGElement, Mini_LinkStyle {
    tagName: "style";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
    disabled?: boolean | State<boolean>;
    media?: string | State<string>;
    title?: string | State<string>;
    type?: string | State<string>;
}

interface Mini_SVGSVGElement extends Mini_SVGGraphicsElement, Mini_SVGFitToViewBox, Mini_WindowEventHandlers {
    tagName: "svg";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
    currentScale?: number | State<number>;
}

interface Mini_SVGSwitchElement extends Mini_SVGGraphicsElement {
    tagName: "switch";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGSymbolElement extends Mini_SVGElement, Mini_SVGFitToViewBox {
    tagName: "symbol";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGTextElement extends Mini_SVGTextPositioningElement {
    tagName: "text";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGTextPositioningElement extends Mini_SVGTextContentElement { }

interface Mini_SVGTextContentElement extends Mini_SVGGraphicsElement { }

interface Mini_SVGTextPathElement extends Mini_SVGTextContentElement, Mini_SVGURIReference {
    tagName: "textPath";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGTitleElement extends Mini_SVGElement {
    tagName: "title";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGTSpanElement extends Mini_SVGTextPositioningElement {
    tagName: "tspan";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGUseElement extends Mini_SVGGraphicsElement, Mini_SVGURIReference {
    tagName: "use";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_SVGViewElement extends Mini_SVGElement, Mini_SVGFitToViewBox {
    tagName: "view";
    namespaceURI: "http://www.w3.org/2000/svg";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_MathMLElement extends Mini_Element, Mini_ElementCSSInlineStyle, Mini_GlobalEventHandlers, Mini_HTMLOrSVGElement {
    tagName: "annotation" | "annotation-xml" | "maction" | "math" | "merror" | "mfrac" | "mi" | "mmultiscripts" | "mn" | "mo" | "mover" | "mpadded" | "mphantom" | "mprescripts" | "mroot" | "mrow" | "ms" | "mspace" | "msqrt" | "mstyle" | "msub" | "msubsup" | "msup" | "mtable" | "mtd" | "mtext" | "mtr" | "munder" | "munderover" | "semantics";
    namespaceURI: "http://www.w3.org/1998/Math/MathML";
    children?: MiniNode[];
    dataset?: MiniDataset;
}

interface Mini_Element extends Mini_Node, Mini_ARIAMixin, Mini_Animatable, Mini_ChildNode, Mini_InnerHTML, Mini_NonDocumentTypeChildNode, Mini_ParentNode, Mini_Slottable {
    className?: string | State<string>;
    id?: string | State<string>;
    onfullscreenchange?: ((this: Element, ev: Event) => any) | null | State<((this: Element, ev: Event) => any) | null>;
    onfullscreenerror?: ((this: Element, ev: Event) => any) | null | State<((this: Element, ev: Event) => any) | null>;
    outerHTML?: string | State<string>;
    scrollLeft?: number | State<number>;
    scrollTop?: number | State<number>;
    slot?: string | State<string>;
}

interface Mini_Node extends Mini_EventTarget {
    nodeValue?: string | null | State<string | null>;
    textContent?: string | null | State<string | null>;
}

interface Mini_EventTarget { }

interface Mini_ARIAMixin {
    ariaAtomic?: string | null | State<string | null>;
    ariaAutoComplete?: string | null | State<string | null>;
    ariaBusy?: string | null | State<string | null>;
    ariaChecked?: string | null | State<string | null>;
    ariaColCount?: string | null | State<string | null>;
    ariaColIndex?: string | null | State<string | null>;
    ariaColSpan?: string | null | State<string | null>;
    ariaCurrent?: string | null | State<string | null>;
    ariaDescription?: string | null | State<string | null>;
    ariaDisabled?: string | null | State<string | null>;
    ariaExpanded?: string | null | State<string | null>;
    ariaHasPopup?: string | null | State<string | null>;
    ariaHidden?: string | null | State<string | null>;
    ariaInvalid?: string | null | State<string | null>;
    ariaKeyShortcuts?: string | null | State<string | null>;
    ariaLabel?: string | null | State<string | null>;
    ariaLevel?: string | null | State<string | null>;
    ariaLive?: string | null | State<string | null>;
    ariaModal?: string | null | State<string | null>;
    ariaMultiLine?: string | null | State<string | null>;
    ariaMultiSelectable?: string | null | State<string | null>;
    ariaOrientation?: string | null | State<string | null>;
    ariaPlaceholder?: string | null | State<string | null>;
    ariaPosInSet?: string | null | State<string | null>;
    ariaPressed?: string | null | State<string | null>;
    ariaReadOnly?: string | null | State<string | null>;
    ariaRequired?: string | null | State<string | null>;
    ariaRoleDescription?: string | null | State<string | null>;
    ariaRowCount?: string | null | State<string | null>;
    ariaRowIndex?: string | null | State<string | null>;
    ariaRowSpan?: string | null | State<string | null>;
    ariaSelected?: string | null | State<string | null>;
    ariaSetSize?: string | null | State<string | null>;
    ariaSort?: string | null | State<string | null>;
    ariaValueMax?: string | null | State<string | null>;
    ariaValueMin?: string | null | State<string | null>;
    ariaValueNow?: string | null | State<string | null>;
    ariaValueText?: string | null | State<string | null>;
    role?: string | null | State<string | null>;
}

interface Mini_Animatable { }

interface Mini_ChildNode extends Mini_Node { }

interface Mini_InnerHTML {
    innerHTML?: string | State<string>;
}

interface Mini_NonDocumentTypeChildNode { }

interface Mini_ParentNode extends Mini_Node { }

interface Mini_Slottable { }

interface Mini_ElementCSSInlineStyle {
    readonly style?: Mini_CSSStyleDeclaration | State<Mini_CSSStyleDeclaration>;
}

interface Mini_CSSStyleDeclaration {
    accentColor?: string | State<string>;
    alignContent?: string | State<string>;
    alignItems?: string | State<string>;
    alignSelf?: string | State<string>;
    alignmentBaseline?: string | State<string>;
    all?: string | State<string>;
    animation?: string | State<string>;
    animationComposition?: string | State<string>;
    animationDelay?: string | State<string>;
    animationDirection?: string | State<string>;
    animationDuration?: string | State<string>;
    animationFillMode?: string | State<string>;
    animationIterationCount?: string | State<string>;
    animationName?: string | State<string>;
    animationPlayState?: string | State<string>;
    animationTimingFunction?: string | State<string>;
    appearance?: string | State<string>;
    aspectRatio?: string | State<string>;
    backdropFilter?: string | State<string>;
    backfaceVisibility?: string | State<string>;
    background?: string | State<string>;
    backgroundAttachment?: string | State<string>;
    backgroundBlendMode?: string | State<string>;
    backgroundClip?: string | State<string>;
    backgroundColor?: string | State<string>;
    backgroundImage?: string | State<string>;
    backgroundOrigin?: string | State<string>;
    backgroundPosition?: string | State<string>;
    backgroundPositionX?: string | State<string>;
    backgroundPositionY?: string | State<string>;
    backgroundRepeat?: string | State<string>;
    backgroundSize?: string | State<string>;
    baselineShift?: string | State<string>;
    baselineSource?: string | State<string>;
    blockSize?: string | State<string>;
    border?: string | State<string>;
    borderBlock?: string | State<string>;
    borderBlockColor?: string | State<string>;
    borderBlockEnd?: string | State<string>;
    borderBlockEndColor?: string | State<string>;
    borderBlockEndStyle?: string | State<string>;
    borderBlockEndWidth?: string | State<string>;
    borderBlockStart?: string | State<string>;
    borderBlockStartColor?: string | State<string>;
    borderBlockStartStyle?: string | State<string>;
    borderBlockStartWidth?: string | State<string>;
    borderBlockStyle?: string | State<string>;
    borderBlockWidth?: string | State<string>;
    borderBottom?: string | State<string>;
    borderBottomColor?: string | State<string>;
    borderBottomLeftRadius?: string | State<string>;
    borderBottomRightRadius?: string | State<string>;
    borderBottomStyle?: string | State<string>;
    borderBottomWidth?: string | State<string>;
    borderCollapse?: string | State<string>;
    borderColor?: string | State<string>;
    borderEndEndRadius?: string | State<string>;
    borderEndStartRadius?: string | State<string>;
    borderImage?: string | State<string>;
    borderImageOutset?: string | State<string>;
    borderImageRepeat?: string | State<string>;
    borderImageSlice?: string | State<string>;
    borderImageSource?: string | State<string>;
    borderImageWidth?: string | State<string>;
    borderInline?: string | State<string>;
    borderInlineColor?: string | State<string>;
    borderInlineEnd?: string | State<string>;
    borderInlineEndColor?: string | State<string>;
    borderInlineEndStyle?: string | State<string>;
    borderInlineEndWidth?: string | State<string>;
    borderInlineStart?: string | State<string>;
    borderInlineStartColor?: string | State<string>;
    borderInlineStartStyle?: string | State<string>;
    borderInlineStartWidth?: string | State<string>;
    borderInlineStyle?: string | State<string>;
    borderInlineWidth?: string | State<string>;
    borderLeft?: string | State<string>;
    borderLeftColor?: string | State<string>;
    borderLeftStyle?: string | State<string>;
    borderLeftWidth?: string | State<string>;
    borderRadius?: string | State<string>;
    borderRight?: string | State<string>;
    borderRightColor?: string | State<string>;
    borderRightStyle?: string | State<string>;
    borderRightWidth?: string | State<string>;
    borderSpacing?: string | State<string>;
    borderStartEndRadius?: string | State<string>;
    borderStartStartRadius?: string | State<string>;
    borderStyle?: string | State<string>;
    borderTop?: string | State<string>;
    borderTopColor?: string | State<string>;
    borderTopLeftRadius?: string | State<string>;
    borderTopRightRadius?: string | State<string>;
    borderTopStyle?: string | State<string>;
    borderTopWidth?: string | State<string>;
    borderWidth?: string | State<string>;
    bottom?: string | State<string>;
    boxShadow?: string | State<string>;
    boxSizing?: string | State<string>;
    breakAfter?: string | State<string>;
    breakBefore?: string | State<string>;
    breakInside?: string | State<string>;
    captionSide?: string | State<string>;
    caretColor?: string | State<string>;
    clear?: string | State<string>;
    clip?: string | State<string>;
    clipPath?: string | State<string>;
    clipRule?: string | State<string>;
    color?: string | State<string>;
    colorInterpolation?: string | State<string>;
    colorInterpolationFilters?: string | State<string>;
    colorScheme?: string | State<string>;
    columnCount?: string | State<string>;
    columnFill?: string | State<string>;
    columnGap?: string | State<string>;
    columnRule?: string | State<string>;
    columnRuleColor?: string | State<string>;
    columnRuleStyle?: string | State<string>;
    columnRuleWidth?: string | State<string>;
    columnSpan?: string | State<string>;
    columnWidth?: string | State<string>;
    columns?: string | State<string>;
    contain?: string | State<string>;
    containIntrinsicBlockSize?: string | State<string>;
    containIntrinsicHeight?: string | State<string>;
    containIntrinsicInlineSize?: string | State<string>;
    containIntrinsicSize?: string | State<string>;
    containIntrinsicWidth?: string | State<string>;
    container?: string | State<string>;
    containerName?: string | State<string>;
    containerType?: string | State<string>;
    content?: string | State<string>;
    counterIncrement?: string | State<string>;
    counterReset?: string | State<string>;
    counterSet?: string | State<string>;
    cssFloat?: string | State<string>;
    cssText?: string | State<string>;
    cursor?: string | State<string>;
    cx?: string | State<string>;
    cy?: string | State<string>;
    d?: string | State<string>;
    direction?: string | State<string>;
    display?: string | State<string>;
    dominantBaseline?: string | State<string>;
    emptyCells?: string | State<string>;
    fill?: string | State<string>;
    fillOpacity?: string | State<string>;
    fillRule?: string | State<string>;
    filter?: string | State<string>;
    flex?: string | State<string>;
    flexBasis?: string | State<string>;
    flexDirection?: string | State<string>;
    flexFlow?: string | State<string>;
    flexGrow?: string | State<string>;
    flexShrink?: string | State<string>;
    flexWrap?: string | State<string>;
    float?: string | State<string>;
    floodColor?: string | State<string>;
    floodOpacity?: string | State<string>;
    font?: string | State<string>;
    fontFamily?: string | State<string>;
    fontFeatureSettings?: string | State<string>;
    fontKerning?: string | State<string>;
    fontOpticalSizing?: string | State<string>;
    fontPalette?: string | State<string>;
    fontSize?: string | State<string>;
    fontSizeAdjust?: string | State<string>;
    fontStretch?: string | State<string>;
    fontStyle?: string | State<string>;
    fontSynthesis?: string | State<string>;
    fontSynthesisSmallCaps?: string | State<string>;
    fontSynthesisStyle?: string | State<string>;
    fontSynthesisWeight?: string | State<string>;
    fontVariant?: string | State<string>;
    fontVariantAlternates?: string | State<string>;
    fontVariantCaps?: string | State<string>;
    fontVariantEastAsian?: string | State<string>;
    fontVariantLigatures?: string | State<string>;
    fontVariantNumeric?: string | State<string>;
    fontVariantPosition?: string | State<string>;
    fontVariationSettings?: string | State<string>;
    fontWeight?: string | State<string>;
    forcedColorAdjust?: string | State<string>;
    gap?: string | State<string>;
    grid?: string | State<string>;
    gridArea?: string | State<string>;
    gridAutoColumns?: string | State<string>;
    gridAutoFlow?: string | State<string>;
    gridAutoRows?: string | State<string>;
    gridColumn?: string | State<string>;
    gridColumnEnd?: string | State<string>;
    gridColumnGap?: string | State<string>;
    gridColumnStart?: string | State<string>;
    gridGap?: string | State<string>;
    gridRow?: string | State<string>;
    gridRowEnd?: string | State<string>;
    gridRowGap?: string | State<string>;
    gridRowStart?: string | State<string>;
    gridTemplate?: string | State<string>;
    gridTemplateAreas?: string | State<string>;
    gridTemplateColumns?: string | State<string>;
    gridTemplateRows?: string | State<string>;
    height?: string | State<string>;
    hyphenateCharacter?: string | State<string>;
    hyphens?: string | State<string>;
    imageOrientation?: string | State<string>;
    imageRendering?: string | State<string>;
    inlineSize?: string | State<string>;
    inset?: string | State<string>;
    insetBlock?: string | State<string>;
    insetBlockEnd?: string | State<string>;
    insetBlockStart?: string | State<string>;
    insetInline?: string | State<string>;
    insetInlineEnd?: string | State<string>;
    insetInlineStart?: string | State<string>;
    isolation?: string | State<string>;
    justifyContent?: string | State<string>;
    justifyItems?: string | State<string>;
    justifySelf?: string | State<string>;
    left?: string | State<string>;
    letterSpacing?: string | State<string>;
    lightingColor?: string | State<string>;
    lineBreak?: string | State<string>;
    lineHeight?: string | State<string>;
    listStyle?: string | State<string>;
    listStyleImage?: string | State<string>;
    listStylePosition?: string | State<string>;
    listStyleType?: string | State<string>;
    margin?: string | State<string>;
    marginBlock?: string | State<string>;
    marginBlockEnd?: string | State<string>;
    marginBlockStart?: string | State<string>;
    marginBottom?: string | State<string>;
    marginInline?: string | State<string>;
    marginInlineEnd?: string | State<string>;
    marginInlineStart?: string | State<string>;
    marginLeft?: string | State<string>;
    marginRight?: string | State<string>;
    marginTop?: string | State<string>;
    marker?: string | State<string>;
    markerEnd?: string | State<string>;
    markerMid?: string | State<string>;
    markerStart?: string | State<string>;
    mask?: string | State<string>;
    maskClip?: string | State<string>;
    maskComposite?: string | State<string>;
    maskImage?: string | State<string>;
    maskMode?: string | State<string>;
    maskOrigin?: string | State<string>;
    maskPosition?: string | State<string>;
    maskRepeat?: string | State<string>;
    maskSize?: string | State<string>;
    maskType?: string | State<string>;
    mathDepth?: string | State<string>;
    mathStyle?: string | State<string>;
    maxBlockSize?: string | State<string>;
    maxHeight?: string | State<string>;
    maxInlineSize?: string | State<string>;
    maxWidth?: string | State<string>;
    minBlockSize?: string | State<string>;
    minHeight?: string | State<string>;
    minInlineSize?: string | State<string>;
    minWidth?: string | State<string>;
    mixBlendMode?: string | State<string>;
    objectFit?: string | State<string>;
    objectPosition?: string | State<string>;
    offset?: string | State<string>;
    offsetAnchor?: string | State<string>;
    offsetDistance?: string | State<string>;
    offsetPath?: string | State<string>;
    offsetPosition?: string | State<string>;
    offsetRotate?: string | State<string>;
    opacity?: string | State<string>;
    order?: string | State<string>;
    orphans?: string | State<string>;
    outline?: string | State<string>;
    outlineColor?: string | State<string>;
    outlineOffset?: string | State<string>;
    outlineStyle?: string | State<string>;
    outlineWidth?: string | State<string>;
    overflow?: string | State<string>;
    overflowAnchor?: string | State<string>;
    overflowClipMargin?: string | State<string>;
    overflowWrap?: string | State<string>;
    overflowX?: string | State<string>;
    overflowY?: string | State<string>;
    overscrollBehavior?: string | State<string>;
    overscrollBehaviorBlock?: string | State<string>;
    overscrollBehaviorInline?: string | State<string>;
    overscrollBehaviorX?: string | State<string>;
    overscrollBehaviorY?: string | State<string>;
    padding?: string | State<string>;
    paddingBlock?: string | State<string>;
    paddingBlockEnd?: string | State<string>;
    paddingBlockStart?: string | State<string>;
    paddingBottom?: string | State<string>;
    paddingInline?: string | State<string>;
    paddingInlineEnd?: string | State<string>;
    paddingInlineStart?: string | State<string>;
    paddingLeft?: string | State<string>;
    paddingRight?: string | State<string>;
    paddingTop?: string | State<string>;
    page?: string | State<string>;
    pageBreakAfter?: string | State<string>;
    pageBreakBefore?: string | State<string>;
    pageBreakInside?: string | State<string>;
    paintOrder?: string | State<string>;
    perspective?: string | State<string>;
    perspectiveOrigin?: string | State<string>;
    placeContent?: string | State<string>;
    placeItems?: string | State<string>;
    placeSelf?: string | State<string>;
    pointerEvents?: string | State<string>;
    position?: string | State<string>;
    printColorAdjust?: string | State<string>;
    quotes?: string | State<string>;
    r?: string | State<string>;
    resize?: string | State<string>;
    right?: string | State<string>;
    rotate?: string | State<string>;
    rowGap?: string | State<string>;
    rubyPosition?: string | State<string>;
    rx?: string | State<string>;
    ry?: string | State<string>;
    scale?: string | State<string>;
    scrollBehavior?: string | State<string>;
    scrollMargin?: string | State<string>;
    scrollMarginBlock?: string | State<string>;
    scrollMarginBlockEnd?: string | State<string>;
    scrollMarginBlockStart?: string | State<string>;
    scrollMarginBottom?: string | State<string>;
    scrollMarginInline?: string | State<string>;
    scrollMarginInlineEnd?: string | State<string>;
    scrollMarginInlineStart?: string | State<string>;
    scrollMarginLeft?: string | State<string>;
    scrollMarginRight?: string | State<string>;
    scrollMarginTop?: string | State<string>;
    scrollPadding?: string | State<string>;
    scrollPaddingBlock?: string | State<string>;
    scrollPaddingBlockEnd?: string | State<string>;
    scrollPaddingBlockStart?: string | State<string>;
    scrollPaddingBottom?: string | State<string>;
    scrollPaddingInline?: string | State<string>;
    scrollPaddingInlineEnd?: string | State<string>;
    scrollPaddingInlineStart?: string | State<string>;
    scrollPaddingLeft?: string | State<string>;
    scrollPaddingRight?: string | State<string>;
    scrollPaddingTop?: string | State<string>;
    scrollSnapAlign?: string | State<string>;
    scrollSnapStop?: string | State<string>;
    scrollSnapType?: string | State<string>;
    scrollbarColor?: string | State<string>;
    scrollbarGutter?: string | State<string>;
    scrollbarWidth?: string | State<string>;
    shapeImageThreshold?: string | State<string>;
    shapeMargin?: string | State<string>;
    shapeOutside?: string | State<string>;
    shapeRendering?: string | State<string>;
    stopColor?: string | State<string>;
    stopOpacity?: string | State<string>;
    stroke?: string | State<string>;
    strokeDasharray?: string | State<string>;
    strokeDashoffset?: string | State<string>;
    strokeLinecap?: string | State<string>;
    strokeLinejoin?: string | State<string>;
    strokeMiterlimit?: string | State<string>;
    strokeOpacity?: string | State<string>;
    strokeWidth?: string | State<string>;
    tabSize?: string | State<string>;
    tableLayout?: string | State<string>;
    textAlign?: string | State<string>;
    textAlignLast?: string | State<string>;
    textAnchor?: string | State<string>;
    textCombineUpright?: string | State<string>;
    textDecoration?: string | State<string>;
    textDecorationColor?: string | State<string>;
    textDecorationLine?: string | State<string>;
    textDecorationSkipInk?: string | State<string>;
    textDecorationStyle?: string | State<string>;
    textDecorationThickness?: string | State<string>;
    textEmphasis?: string | State<string>;
    textEmphasisColor?: string | State<string>;
    textEmphasisPosition?: string | State<string>;
    textEmphasisStyle?: string | State<string>;
    textIndent?: string | State<string>;
    textOrientation?: string | State<string>;
    textOverflow?: string | State<string>;
    textRendering?: string | State<string>;
    textShadow?: string | State<string>;
    textTransform?: string | State<string>;
    textUnderlineOffset?: string | State<string>;
    textUnderlinePosition?: string | State<string>;
    textWrap?: string | State<string>;
    top?: string | State<string>;
    touchAction?: string | State<string>;
    transform?: string | State<string>;
    transformBox?: string | State<string>;
    transformOrigin?: string | State<string>;
    transformStyle?: string | State<string>;
    transition?: string | State<string>;
    transitionDelay?: string | State<string>;
    transitionDuration?: string | State<string>;
    transitionProperty?: string | State<string>;
    transitionTimingFunction?: string | State<string>;
    translate?: string | State<string>;
    unicodeBidi?: string | State<string>;
    userSelect?: string | State<string>;
    vectorEffect?: string | State<string>;
    verticalAlign?: string | State<string>;
    visibility?: string | State<string>;
    webkitAlignContent?: string | State<string>;
    webkitAlignItems?: string | State<string>;
    webkitAlignSelf?: string | State<string>;
    webkitAnimation?: string | State<string>;
    webkitAnimationDelay?: string | State<string>;
    webkitAnimationDirection?: string | State<string>;
    webkitAnimationDuration?: string | State<string>;
    webkitAnimationFillMode?: string | State<string>;
    webkitAnimationIterationCount?: string | State<string>;
    webkitAnimationName?: string | State<string>;
    webkitAnimationPlayState?: string | State<string>;
    webkitAnimationTimingFunction?: string | State<string>;
    webkitAppearance?: string | State<string>;
    webkitBackfaceVisibility?: string | State<string>;
    webkitBackgroundClip?: string | State<string>;
    webkitBackgroundOrigin?: string | State<string>;
    webkitBackgroundSize?: string | State<string>;
    webkitBorderBottomLeftRadius?: string | State<string>;
    webkitBorderBottomRightRadius?: string | State<string>;
    webkitBorderRadius?: string | State<string>;
    webkitBorderTopLeftRadius?: string | State<string>;
    webkitBorderTopRightRadius?: string | State<string>;
    webkitBoxAlign?: string | State<string>;
    webkitBoxFlex?: string | State<string>;
    webkitBoxOrdinalGroup?: string | State<string>;
    webkitBoxOrient?: string | State<string>;
    webkitBoxPack?: string | State<string>;
    webkitBoxShadow?: string | State<string>;
    webkitBoxSizing?: string | State<string>;
    webkitFilter?: string | State<string>;
    webkitFlex?: string | State<string>;
    webkitFlexBasis?: string | State<string>;
    webkitFlexDirection?: string | State<string>;
    webkitFlexFlow?: string | State<string>;
    webkitFlexGrow?: string | State<string>;
    webkitFlexShrink?: string | State<string>;
    webkitFlexWrap?: string | State<string>;
    webkitJustifyContent?: string | State<string>;
    webkitLineClamp?: string | State<string>;
    webkitMask?: string | State<string>;
    webkitMaskBoxImage?: string | State<string>;
    webkitMaskBoxImageOutset?: string | State<string>;
    webkitMaskBoxImageRepeat?: string | State<string>;
    webkitMaskBoxImageSlice?: string | State<string>;
    webkitMaskBoxImageSource?: string | State<string>;
    webkitMaskBoxImageWidth?: string | State<string>;
    webkitMaskClip?: string | State<string>;
    webkitMaskComposite?: string | State<string>;
    webkitMaskImage?: string | State<string>;
    webkitMaskOrigin?: string | State<string>;
    webkitMaskPosition?: string | State<string>;
    webkitMaskRepeat?: string | State<string>;
    webkitMaskSize?: string | State<string>;
    webkitOrder?: string | State<string>;
    webkitPerspective?: string | State<string>;
    webkitPerspectiveOrigin?: string | State<string>;
    webkitTextFillColor?: string | State<string>;
    webkitTextSizeAdjust?: string | State<string>;
    webkitTextStroke?: string | State<string>;
    webkitTextStrokeColor?: string | State<string>;
    webkitTextStrokeWidth?: string | State<string>;
    webkitTransform?: string | State<string>;
    webkitTransformOrigin?: string | State<string>;
    webkitTransformStyle?: string | State<string>;
    webkitTransition?: string | State<string>;
    webkitTransitionDelay?: string | State<string>;
    webkitTransitionDuration?: string | State<string>;
    webkitTransitionProperty?: string | State<string>;
    webkitTransitionTimingFunction?: string | State<string>;
    webkitUserSelect?: string | State<string>;
    whiteSpace?: string | State<string>;
    widows?: string | State<string>;
    width?: string | State<string>;
    willChange?: string | State<string>;
    wordBreak?: string | State<string>;
    wordSpacing?: string | State<string>;
    wordWrap?: string | State<string>;
    writingMode?: string | State<string>;
    x?: string | State<string>;
    y?: string | State<string>;
    zIndex?: string | State<string>;
}

interface Mini_ElementContentEditable {
    contentEditable?: string | State<string>;
    enterKeyHint?: string | State<string>;
    inputMode?: string | State<string>;
}

interface Mini_GlobalEventHandlers {
    onabort?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | State<((this: GlobalEventHandlers, ev: UIEvent) => any) | null>;
    onanimationcancel?: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | State<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null>;
    onanimationend?: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | State<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null>;
    onanimationiteration?: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | State<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null>;
    onanimationstart?: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | State<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null>;
    onauxclick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onbeforeinput?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | State<((this: GlobalEventHandlers, ev: InputEvent) => any) | null>;
    onbeforetoggle?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onblur?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | State<((this: GlobalEventHandlers, ev: FocusEvent) => any) | null>;
    oncancel?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    oncanplay?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    oncanplaythrough?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onchange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onclick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onclose?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    oncontextmenu?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    oncopy?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | State<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null>;
    oncuechange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    oncut?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | State<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null>;
    ondblclick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    ondrag?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null>;
    ondragend?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null>;
    ondragenter?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null>;
    ondragleave?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null>;
    ondragover?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null>;
    ondragstart?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null>;
    ondrop?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null>;
    ondurationchange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onemptied?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onended?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onerror?: OnErrorEventHandler | State<OnErrorEventHandler>;
    onfocus?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | State<((this: GlobalEventHandlers, ev: FocusEvent) => any) | null>;
    onformdata?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | State<((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null>;
    ongotpointercapture?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    oninput?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    oninvalid?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onkeydown?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | State<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null>;
    onkeypress?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | State<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null>;
    onkeyup?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | State<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null>;
    onload?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onloadeddata?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onloadedmetadata?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onloadstart?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onlostpointercapture?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onmousedown?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onmouseenter?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onmouseleave?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onmousemove?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onmouseout?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onmouseover?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onmouseup?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null>;
    onpaste?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | State<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null>;
    onpause?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onplay?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onplaying?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onpointercancel?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onpointerdown?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onpointerenter?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onpointerleave?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onpointermove?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onpointerout?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onpointerover?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onpointerup?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null>;
    onprogress?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | State<((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null>;
    onratechange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onreset?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onresize?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | State<((this: GlobalEventHandlers, ev: UIEvent) => any) | null>;
    onscroll?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onscrollend?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onsecuritypolicyviolation?: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | State<((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null>;
    onseeked?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onseeking?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onselect?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onselectionchange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onselectstart?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onslotchange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onstalled?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onsubmit?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | State<((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null>;
    onsuspend?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    ontimeupdate?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    ontoggle?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined>;
    ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined>;
    ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined>;
    ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined>;
    ontransitioncancel?: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | State<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null>;
    ontransitionend?: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | State<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null>;
    ontransitionrun?: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | State<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null>;
    ontransitionstart?: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | State<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null>;
    onvolumechange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onwaiting?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onwebkitanimationend?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onwebkitanimationiteration?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onwebkitanimationstart?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onwebkittransitionend?: ((this: GlobalEventHandlers, ev: Event) => any) | null | State<((this: GlobalEventHandlers, ev: Event) => any) | null>;
    onwheel?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | State<((this: GlobalEventHandlers, ev: WheelEvent) => any) | null>;
}

interface Mini_HTMLHyperlinkElementUtils {
    hash?: string | State<string>;
    host?: string | State<string>;
    hostname?: string | State<string>;
    href?: string | State<string>;
    password?: string | State<string>;
    pathname?: string | State<string>;
    port?: string | State<string>;
    protocol?: string | State<string>;
    search?: string | State<string>;
    username?: string | State<string>;
}

interface Mini_WindowEventHandlers {
    onafterprint?: ((this: WindowEventHandlers, ev: Event) => any) | null | State<((this: WindowEventHandlers, ev: Event) => any) | null>;
    onbeforeprint?: ((this: WindowEventHandlers, ev: Event) => any) | null | State<((this: WindowEventHandlers, ev: Event) => any) | null>;
    onbeforeunload?: ((this: WindowEventHandlers, ev: BeforeUnloadEvent) => any) | null | State<((this: WindowEventHandlers, ev: BeforeUnloadEvent) => any) | null>;
    ongamepadconnected?: ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | State<((this: WindowEventHandlers, ev: GamepadEvent) => any) | null>;
    ongamepaddisconnected?: ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | State<((this: WindowEventHandlers, ev: GamepadEvent) => any) | null>;
    onhashchange?: ((this: WindowEventHandlers, ev: HashChangeEvent) => any) | null | State<((this: WindowEventHandlers, ev: HashChangeEvent) => any) | null>;
    onlanguagechange?: ((this: WindowEventHandlers, ev: Event) => any) | null | State<((this: WindowEventHandlers, ev: Event) => any) | null>;
    onmessage?: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null | State<((this: WindowEventHandlers, ev: MessageEvent) => any) | null>;
    onmessageerror?: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null | State<((this: WindowEventHandlers, ev: MessageEvent) => any) | null>;
    onoffline?: ((this: WindowEventHandlers, ev: Event) => any) | null | State<((this: WindowEventHandlers, ev: Event) => any) | null>;
    ononline?: ((this: WindowEventHandlers, ev: Event) => any) | null | State<((this: WindowEventHandlers, ev: Event) => any) | null>;
    onpagehide?: ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | State<((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null>;
    onpageshow?: ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | State<((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null>;
    onpopstate?: ((this: WindowEventHandlers, ev: PopStateEvent) => any) | null | State<((this: WindowEventHandlers, ev: PopStateEvent) => any) | null>;
    onrejectionhandled?: ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | State<((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null>;
    onstorage?: ((this: WindowEventHandlers, ev: StorageEvent) => any) | null | State<((this: WindowEventHandlers, ev: StorageEvent) => any) | null>;
    onunhandledrejection?: ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | State<((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null>;
    onunload?: ((this: WindowEventHandlers, ev: Event) => any) | null | State<((this: WindowEventHandlers, ev: Event) => any) | null>;
}

interface Mini_PopoverInvokerElement {
    popoverTargetAction?: string | State<string>;
    popoverTargetElement?: Mini_Element | null | State<Mini_Element | null>;
}

interface Mini_FileList { }

interface Mini_LinkStyle { }

interface Mini_SVGTests { }

interface Mini_SVGURIReference { }

interface Mini_SVGFilterPrimitiveStandardAttributes { }

interface Mini_SVGFitToViewBox { }

interface Mini_SVGAnimatedPoints { }
