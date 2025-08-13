export type Sub<T> = (current: T, previous: T) => void | Promise<void>;

export class State<T> {
    constructor(value: T);
    value: T;
    static use<T extends { [key: string]: State<any> }>(states: T): State<{
        [K in keyof T]: T[K] extends State<infer U> ? U : never;
    }>;
    persist(): State<T>;
    set(f: (current: T) => T): void;
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

export function createNode<P>(props: P): DOMNode<P> & {
    clearStateTree: () => void;
};

export type DOMNode<P> =
    P extends State<infer U> ? DOMNode<U> :
    P extends Node ? P :
    P extends Mini.HTMLAnchorElement ? HTMLAnchorElement :
    P extends Mini.SVGAElement ? SVGAElement :
    P extends Mini.HTMLAreaElement ? HTMLAreaElement :
    P extends Mini.HTMLAudioElement ? HTMLAudioElement :
    P extends Mini.HTMLBaseElement ? HTMLBaseElement :
    P extends Mini.HTMLQuoteElement ? HTMLQuoteElement :
    P extends Mini.HTMLBodyElement ? HTMLBodyElement :
    P extends Mini.HTMLBRElement ? HTMLBRElement :
    P extends Mini.HTMLButtonElement ? HTMLButtonElement :
    P extends Mini.HTMLCanvasElement ? HTMLCanvasElement :
    P extends Mini.HTMLTableCaptionElement ? HTMLTableCaptionElement :
    P extends Mini.HTMLTableColElement ? HTMLTableColElement :
    P extends Mini.HTMLDataElement ? HTMLDataElement :
    P extends Mini.HTMLDataListElement ? HTMLDataListElement :
    P extends Mini.HTMLModElement ? HTMLModElement :
    P extends Mini.HTMLDetailsElement ? HTMLDetailsElement :
    P extends Mini.HTMLDialogElement ? HTMLDialogElement :
    P extends Mini.HTMLDivElement ? HTMLDivElement :
    P extends Mini.HTMLDListElement ? HTMLDListElement :
    P extends Mini.HTMLEmbedElement ? HTMLEmbedElement :
    P extends Mini.HTMLFieldSetElement ? HTMLFieldSetElement :
    P extends Mini.HTMLFormElement ? HTMLFormElement :
    P extends Mini.HTMLHeadingElement ? HTMLHeadingElement :
    P extends Mini.HTMLHeadElement ? HTMLHeadElement :
    P extends Mini.HTMLHRElement ? HTMLHRElement :
    P extends Mini.HTMLHtmlElement ? HTMLHtmlElement :
    P extends Mini.HTMLIFrameElement ? HTMLIFrameElement :
    P extends Mini.HTMLImageElement ? HTMLImageElement :
    P extends Mini.HTMLInputElement ? HTMLInputElement :
    P extends Mini.HTMLLabelElement ? HTMLLabelElement :
    P extends Mini.HTMLLegendElement ? HTMLLegendElement :
    P extends Mini.HTMLLIElement ? HTMLLIElement :
    P extends Mini.HTMLLinkElement ? HTMLLinkElement :
    P extends Mini.HTMLMapElement ? HTMLMapElement :
    P extends Mini.HTMLMenuElement ? HTMLMenuElement :
    P extends Mini.HTMLMetaElement ? HTMLMetaElement :
    P extends Mini.HTMLMeterElement ? HTMLMeterElement :
    P extends Mini.HTMLObjectElement ? HTMLObjectElement :
    P extends Mini.HTMLOListElement ? HTMLOListElement :
    P extends Mini.HTMLOptGroupElement ? HTMLOptGroupElement :
    P extends Mini.HTMLOptionElement ? HTMLOptionElement :
    P extends Mini.HTMLOutputElement ? HTMLOutputElement :
    P extends Mini.HTMLParagraphElement ? HTMLParagraphElement :
    P extends Mini.HTMLPictureElement ? HTMLPictureElement :
    P extends Mini.HTMLPreElement ? HTMLPreElement :
    P extends Mini.HTMLProgressElement ? HTMLProgressElement :
    P extends Mini.HTMLScriptElement ? HTMLScriptElement :
    P extends Mini.SVGScriptElement ? SVGScriptElement :
    P extends Mini.HTMLSelectElement ? HTMLSelectElement :
    P extends Mini.HTMLSlotElement ? HTMLSlotElement :
    P extends Mini.HTMLSourceElement ? HTMLSourceElement :
    P extends Mini.HTMLSpanElement ? HTMLSpanElement :
    P extends Mini.HTMLStyleElement ? HTMLStyleElement :
    P extends Mini.SVGStyleElement ? SVGStyleElement :
    P extends Mini.HTMLTableElement ? HTMLTableElement :
    P extends Mini.HTMLTableSectionElement ? HTMLTableSectionElement :
    P extends Mini.HTMLTableCellElement ? HTMLTableCellElement :
    P extends Mini.HTMLTemplateElement ? HTMLTemplateElement :
    P extends Mini.HTMLTextAreaElement ? HTMLTextAreaElement :
    P extends Mini.HTMLTimeElement ? HTMLTimeElement :
    P extends Mini.HTMLTitleElement ? HTMLTitleElement :
    P extends Mini.SVGTitleElement ? SVGTitleElement :
    P extends Mini.HTMLTableRowElement ? HTMLTableRowElement :
    P extends Mini.HTMLTrackElement ? HTMLTrackElement :
    P extends Mini.HTMLUListElement ? HTMLUListElement :
    P extends Mini.HTMLVideoElement ? HTMLVideoElement :
    P extends Mini.SVGAnimateElement ? SVGAnimateElement :
    P extends Mini.SVGAnimateMotionElement ? SVGAnimateMotionElement :
    P extends Mini.SVGAnimateTransformElement ? SVGAnimateTransformElement :
    P extends Mini.SVGCircleElement ? SVGCircleElement :
    P extends Mini.SVGClipPathElement ? SVGClipPathElement :
    P extends Mini.SVGDefsElement ? SVGDefsElement :
    P extends Mini.SVGDescElement ? SVGDescElement :
    P extends Mini.SVGEllipseElement ? SVGEllipseElement :
    P extends Mini.SVGFEBlendElement ? SVGFEBlendElement :
    P extends Mini.SVGFEColorMatrixElement ? SVGFEColorMatrixElement :
    P extends Mini.SVGFEComponentTransferElement ? SVGFEComponentTransferElement :
    P extends Mini.SVGFECompositeElement ? SVGFECompositeElement :
    P extends Mini.SVGFEConvolveMatrixElement ? SVGFEConvolveMatrixElement :
    P extends Mini.SVGFEDiffuseLightingElement ? SVGFEDiffuseLightingElement :
    P extends Mini.SVGFEDisplacementMapElement ? SVGFEDisplacementMapElement :
    P extends Mini.SVGFEDistantLightElement ? SVGFEDistantLightElement :
    P extends Mini.SVGFEDropShadowElement ? SVGFEDropShadowElement :
    P extends Mini.SVGFEFloodElement ? SVGFEFloodElement :
    P extends Mini.SVGFEFuncAElement ? SVGFEFuncAElement :
    P extends Mini.SVGFEFuncBElement ? SVGFEFuncBElement :
    P extends Mini.SVGFEFuncGElement ? SVGFEFuncGElement :
    P extends Mini.SVGFEFuncRElement ? SVGFEFuncRElement :
    P extends Mini.SVGFEGaussianBlurElement ? SVGFEGaussianBlurElement :
    P extends Mini.SVGFEImageElement ? SVGFEImageElement :
    P extends Mini.SVGFEMergeElement ? SVGFEMergeElement :
    P extends Mini.SVGFEMergeNodeElement ? SVGFEMergeNodeElement :
    P extends Mini.SVGFEMorphologyElement ? SVGFEMorphologyElement :
    P extends Mini.SVGFEOffsetElement ? SVGFEOffsetElement :
    P extends Mini.SVGFEPointLightElement ? SVGFEPointLightElement :
    P extends Mini.SVGFESpecularLightingElement ? SVGFESpecularLightingElement :
    P extends Mini.SVGFESpotLightElement ? SVGFESpotLightElement :
    P extends Mini.SVGFETileElement ? SVGFETileElement :
    P extends Mini.SVGFETurbulenceElement ? SVGFETurbulenceElement :
    P extends Mini.SVGFilterElement ? SVGFilterElement :
    P extends Mini.SVGForeignObjectElement ? SVGForeignObjectElement :
    P extends Mini.SVGGElement ? SVGGElement :
    P extends Mini.SVGImageElement ? SVGImageElement :
    P extends Mini.SVGLineElement ? SVGLineElement :
    P extends Mini.SVGLinearGradientElement ? SVGLinearGradientElement :
    P extends Mini.SVGMarkerElement ? SVGMarkerElement :
    P extends Mini.SVGMaskElement ? SVGMaskElement :
    P extends Mini.SVGMetadataElement ? SVGMetadataElement :
    P extends Mini.SVGMPathElement ? SVGMPathElement :
    P extends Mini.SVGPathElement ? SVGPathElement :
    P extends Mini.SVGPatternElement ? SVGPatternElement :
    P extends Mini.SVGPolygonElement ? SVGPolygonElement :
    P extends Mini.SVGPolylineElement ? SVGPolylineElement :
    P extends Mini.SVGRadialGradientElement ? SVGRadialGradientElement :
    P extends Mini.SVGRectElement ? SVGRectElement :
    P extends Mini.SVGSetElement ? SVGSetElement :
    P extends Mini.SVGStopElement ? SVGStopElement :
    P extends Mini.SVGSVGElement ? SVGSVGElement :
    P extends Mini.SVGSwitchElement ? SVGSwitchElement :
    P extends Mini.SVGSymbolElement ? SVGSymbolElement :
    P extends Mini.SVGTextElement ? SVGTextElement :
    P extends Mini.SVGTextPathElement ? SVGTextPathElement :
    P extends Mini.SVGTSpanElement ? SVGTSpanElement :
    P extends Mini.SVGUseElement ? SVGUseElement :
    P extends Mini.SVGViewElement ? SVGViewElement :
    P extends Mini.HTMLElement ? HTMLElement :
    P extends Mini.SVGElement ? SVGElement :
    P extends Mini.MathMLElement ? MathMLElement :
    P extends Mini.Element ? Element :
    P extends string | number | false | null | undefined ? Text :
    Node;

export type MiniChildren = MiniNode | State<MiniNode> | MiniNode[] | State<MiniNode[]>;

export type MiniNode =
    | Mini.Element
    | Mini.Element[]
    | Node
    | string | number | false | null | undefined
    | State<
        | Mini.Element
        | Mini.Element[]
        | Node
        | string | number | false | null | undefined
    >;

export type MiniDataset = {
    [key: string]: string | number | undefined | State<string | number | undefined>;
} | State<{
    [key: string]: string | number | undefined | State<string | number | undefined>;
}>;

export declare namespace Mini {
    type IntrinsicElement<T> = T extends SVGElement
        ? Omit<T, "tagName"> & { [key: string]: any; }
        : Omit<T, "tagName">;

    export interface IntrinsicElements {
        "a": IntrinsicElement<HTMLAnchorElement> | IntrinsicElement<SVGAElement>;
        "abbr": IntrinsicElement<HTMLElement>;
        "address": IntrinsicElement<HTMLElement>;
        "article": IntrinsicElement<HTMLElement>;
        "aside": IntrinsicElement<HTMLElement>;
        "b": IntrinsicElement<HTMLElement>;
        "bdi": IntrinsicElement<HTMLElement>;
        "bdo": IntrinsicElement<HTMLElement>;
        "cite": IntrinsicElement<HTMLElement>;
        "code": IntrinsicElement<HTMLElement>;
        "dd": IntrinsicElement<HTMLElement>;
        "dfn": IntrinsicElement<HTMLElement>;
        "dt": IntrinsicElement<HTMLElement>;
        "em": IntrinsicElement<HTMLElement>;
        "figcaption": IntrinsicElement<HTMLElement>;
        "figure": IntrinsicElement<HTMLElement>;
        "footer": IntrinsicElement<HTMLElement>;
        "header": IntrinsicElement<HTMLElement>;
        "hgroup": IntrinsicElement<HTMLElement>;
        "i": IntrinsicElement<HTMLElement>;
        "kbd": IntrinsicElement<HTMLElement>;
        "main": IntrinsicElement<HTMLElement>;
        "mark": IntrinsicElement<HTMLElement>;
        "nav": IntrinsicElement<HTMLElement>;
        "noscript": IntrinsicElement<HTMLElement>;
        "rp": IntrinsicElement<HTMLElement>;
        "rt": IntrinsicElement<HTMLElement>;
        "ruby": IntrinsicElement<HTMLElement>;
        "s": IntrinsicElement<HTMLElement>;
        "samp": IntrinsicElement<HTMLElement>;
        "search": IntrinsicElement<HTMLElement>;
        "section": IntrinsicElement<HTMLElement>;
        "small": IntrinsicElement<HTMLElement>;
        "strong": IntrinsicElement<HTMLElement>;
        "sub": IntrinsicElement<HTMLElement>;
        "summary": IntrinsicElement<HTMLElement>;
        "sup": IntrinsicElement<HTMLElement>;
        "u": IntrinsicElement<HTMLElement>;
        "var": IntrinsicElement<HTMLElement>;
        "wbr": IntrinsicElement<HTMLElement>;
        "area": IntrinsicElement<HTMLAreaElement>;
        "audio": IntrinsicElement<HTMLAudioElement>;
        "base": IntrinsicElement<HTMLBaseElement>;
        "blockquote": IntrinsicElement<HTMLQuoteElement>;
        "q": IntrinsicElement<HTMLQuoteElement>;
        "body": IntrinsicElement<HTMLBodyElement>;
        "br": IntrinsicElement<HTMLBRElement>;
        "button": IntrinsicElement<HTMLButtonElement>;
        "canvas": IntrinsicElement<HTMLCanvasElement>;
        "caption": IntrinsicElement<HTMLTableCaptionElement>;
        "col": IntrinsicElement<HTMLTableColElement>;
        "colgroup": IntrinsicElement<HTMLTableColElement>;
        "data": IntrinsicElement<HTMLDataElement>;
        "datalist": IntrinsicElement<HTMLDataListElement>;
        "del": IntrinsicElement<HTMLModElement>;
        "ins": IntrinsicElement<HTMLModElement>;
        "details": IntrinsicElement<HTMLDetailsElement>;
        "dialog": IntrinsicElement<HTMLDialogElement>;
        "div": IntrinsicElement<HTMLDivElement>;
        "dl": IntrinsicElement<HTMLDListElement>;
        "embed": IntrinsicElement<HTMLEmbedElement>;
        "fieldset": IntrinsicElement<HTMLFieldSetElement>;
        "form": IntrinsicElement<HTMLFormElement>;
        "h1": IntrinsicElement<HTMLHeadingElement>;
        "h2": IntrinsicElement<HTMLHeadingElement>;
        "h3": IntrinsicElement<HTMLHeadingElement>;
        "h4": IntrinsicElement<HTMLHeadingElement>;
        "h5": IntrinsicElement<HTMLHeadingElement>;
        "h6": IntrinsicElement<HTMLHeadingElement>;
        "head": IntrinsicElement<HTMLHeadElement>;
        "hr": IntrinsicElement<HTMLHRElement>;
        "html": IntrinsicElement<HTMLHtmlElement>;
        "iframe": IntrinsicElement<HTMLIFrameElement>;
        "img": IntrinsicElement<HTMLImageElement>;
        "input": IntrinsicElement<HTMLInputElement>;
        "label": IntrinsicElement<HTMLLabelElement>;
        "legend": IntrinsicElement<HTMLLegendElement>;
        "li": IntrinsicElement<HTMLLIElement>;
        "link": IntrinsicElement<HTMLLinkElement>;
        "map": IntrinsicElement<HTMLMapElement>;
        "menu": IntrinsicElement<HTMLMenuElement>;
        "meta": IntrinsicElement<HTMLMetaElement>;
        "meter": IntrinsicElement<HTMLMeterElement>;
        "object": IntrinsicElement<HTMLObjectElement>;
        "ol": IntrinsicElement<HTMLOListElement>;
        "optgroup": IntrinsicElement<HTMLOptGroupElement>;
        "option": IntrinsicElement<HTMLOptionElement>;
        "output": IntrinsicElement<HTMLOutputElement>;
        "p": IntrinsicElement<HTMLParagraphElement>;
        "picture": IntrinsicElement<HTMLPictureElement>;
        "pre": IntrinsicElement<HTMLPreElement>;
        "progress": IntrinsicElement<HTMLProgressElement>;
        "script": IntrinsicElement<HTMLScriptElement> | IntrinsicElement<SVGScriptElement>;
        "select": IntrinsicElement<HTMLSelectElement>;
        "slot": IntrinsicElement<HTMLSlotElement>;
        "source": IntrinsicElement<HTMLSourceElement>;
        "span": IntrinsicElement<HTMLSpanElement>;
        "style": IntrinsicElement<HTMLStyleElement> | IntrinsicElement<SVGStyleElement>;
        "table": IntrinsicElement<HTMLTableElement>;
        "tbody": IntrinsicElement<HTMLTableSectionElement>;
        "tfoot": IntrinsicElement<HTMLTableSectionElement>;
        "thead": IntrinsicElement<HTMLTableSectionElement>;
        "td": IntrinsicElement<HTMLTableCellElement>;
        "th": IntrinsicElement<HTMLTableCellElement>;
        "template": IntrinsicElement<HTMLTemplateElement>;
        "textarea": IntrinsicElement<HTMLTextAreaElement>;
        "time": IntrinsicElement<HTMLTimeElement>;
        "title": IntrinsicElement<HTMLTitleElement> | IntrinsicElement<SVGTitleElement>;
        "tr": IntrinsicElement<HTMLTableRowElement>;
        "track": IntrinsicElement<HTMLTrackElement>;
        "ul": IntrinsicElement<HTMLUListElement>;
        "video": IntrinsicElement<HTMLVideoElement>;
        "animate": IntrinsicElement<SVGAnimateElement>;
        "animateMotion": IntrinsicElement<SVGAnimateMotionElement>;
        "animateTransform": IntrinsicElement<SVGAnimateTransformElement>;
        "circle": IntrinsicElement<SVGCircleElement>;
        "clipPath": IntrinsicElement<SVGClipPathElement>;
        "defs": IntrinsicElement<SVGDefsElement>;
        "desc": IntrinsicElement<SVGDescElement>;
        "ellipse": IntrinsicElement<SVGEllipseElement>;
        "feBlend": IntrinsicElement<SVGFEBlendElement>;
        "feColorMatrix": IntrinsicElement<SVGFEColorMatrixElement>;
        "feComponentTransfer": IntrinsicElement<SVGFEComponentTransferElement>;
        "feComposite": IntrinsicElement<SVGFECompositeElement>;
        "feConvolveMatrix": IntrinsicElement<SVGFEConvolveMatrixElement>;
        "feDiffuseLighting": IntrinsicElement<SVGFEDiffuseLightingElement>;
        "feDisplacementMap": IntrinsicElement<SVGFEDisplacementMapElement>;
        "feDistantLight": IntrinsicElement<SVGFEDistantLightElement>;
        "feDropShadow": IntrinsicElement<SVGFEDropShadowElement>;
        "feFlood": IntrinsicElement<SVGFEFloodElement>;
        "feFuncA": IntrinsicElement<SVGFEFuncAElement>;
        "feFuncB": IntrinsicElement<SVGFEFuncBElement>;
        "feFuncG": IntrinsicElement<SVGFEFuncGElement>;
        "feFuncR": IntrinsicElement<SVGFEFuncRElement>;
        "feGaussianBlur": IntrinsicElement<SVGFEGaussianBlurElement>;
        "feImage": IntrinsicElement<SVGFEImageElement>;
        "feMerge": IntrinsicElement<SVGFEMergeElement>;
        "feMergeNode": IntrinsicElement<SVGFEMergeNodeElement>;
        "feMorphology": IntrinsicElement<SVGFEMorphologyElement>;
        "feOffset": IntrinsicElement<SVGFEOffsetElement>;
        "fePointLight": IntrinsicElement<SVGFEPointLightElement>;
        "feSpecularLighting": IntrinsicElement<SVGFESpecularLightingElement>;
        "feSpotLight": IntrinsicElement<SVGFESpotLightElement>;
        "feTile": IntrinsicElement<SVGFETileElement>;
        "feTurbulence": IntrinsicElement<SVGFETurbulenceElement>;
        "filter": IntrinsicElement<SVGFilterElement>;
        "foreignObject": IntrinsicElement<SVGForeignObjectElement>;
        "g": IntrinsicElement<SVGGElement>;
        "image": IntrinsicElement<SVGImageElement>;
        "line": IntrinsicElement<SVGLineElement>;
        "linearGradient": IntrinsicElement<SVGLinearGradientElement>;
        "marker": IntrinsicElement<SVGMarkerElement>;
        "mask": IntrinsicElement<SVGMaskElement>;
        "metadata": IntrinsicElement<SVGMetadataElement>;
        "mpath": IntrinsicElement<SVGMPathElement>;
        "path": IntrinsicElement<SVGPathElement>;
        "pattern": IntrinsicElement<SVGPatternElement>;
        "polygon": IntrinsicElement<SVGPolygonElement>;
        "polyline": IntrinsicElement<SVGPolylineElement>;
        "radialGradient": IntrinsicElement<SVGRadialGradientElement>;
        "rect": IntrinsicElement<SVGRectElement>;
        "set": IntrinsicElement<SVGSetElement>;
        "stop": IntrinsicElement<SVGStopElement>;
        "svg": IntrinsicElement<SVGSVGElement>;
        "switch": IntrinsicElement<SVGSwitchElement>;
        "symbol": IntrinsicElement<SVGSymbolElement>;
        "text": IntrinsicElement<SVGTextElement>;
        "textPath": IntrinsicElement<SVGTextPathElement>;
        "tspan": IntrinsicElement<SVGTSpanElement>;
        "use": IntrinsicElement<SVGUseElement>;
        "view": IntrinsicElement<SVGViewElement>;
        "annotation": IntrinsicElement<MathMLElement>;
        "annotation-xml": IntrinsicElement<MathMLElement>;
        "maction": IntrinsicElement<MathMLElement>;
        "math": IntrinsicElement<MathMLElement>;
        "merror": IntrinsicElement<MathMLElement>;
        "mfrac": IntrinsicElement<MathMLElement>;
        "mi": IntrinsicElement<MathMLElement>;
        "mmultiscripts": IntrinsicElement<MathMLElement>;
        "mn": IntrinsicElement<MathMLElement>;
        "mo": IntrinsicElement<MathMLElement>;
        "mover": IntrinsicElement<MathMLElement>;
        "mpadded": IntrinsicElement<MathMLElement>;
        "mphantom": IntrinsicElement<MathMLElement>;
        "mprescripts": IntrinsicElement<MathMLElement>;
        "mroot": IntrinsicElement<MathMLElement>;
        "mrow": IntrinsicElement<MathMLElement>;
        "ms": IntrinsicElement<MathMLElement>;
        "mspace": IntrinsicElement<MathMLElement>;
        "msqrt": IntrinsicElement<MathMLElement>;
        "mstyle": IntrinsicElement<MathMLElement>;
        "msub": IntrinsicElement<MathMLElement>;
        "msubsup": IntrinsicElement<MathMLElement>;
        "msup": IntrinsicElement<MathMLElement>;
        "mtable": IntrinsicElement<MathMLElement>;
        "mtd": IntrinsicElement<MathMLElement>;
        "mtext": IntrinsicElement<MathMLElement>;
        "mtr": IntrinsicElement<MathMLElement>;
        "munder": IntrinsicElement<MathMLElement>;
        "munderover": IntrinsicElement<MathMLElement>;
        "semantics": IntrinsicElement<MathMLElement>;
    }

    interface HTMLAnchorElement extends HTMLElement, HTMLHyperlinkElementUtils {
        tagName: "a";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        charset?: string | undefined | State<string | undefined>;
        coords?: string | undefined | State<string | undefined>;
        download?: string | undefined | State<string | undefined>;
        hreflang?: string | undefined | State<string | undefined>;
        name?: string | undefined | State<string | undefined>;
        ping?: string | undefined | State<string | undefined>;
        referrerPolicy?: string | undefined | State<string | undefined>;
        rel?: string | undefined | State<string | undefined>;
        rev?: string | undefined | State<string | undefined>;
        shape?: string | undefined | State<string | undefined>;
        target?: string | undefined | State<string | undefined>;
        text?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
    }

    interface HTMLElement extends Element, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
        tagName: "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "search" | "section" | "select" | "slot" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        accessKey?: string | undefined | State<string | undefined>;
        autocapitalize?: string | undefined | State<string | undefined>;
        dir?: string | undefined | State<string | undefined>;
        draggable?: boolean | undefined | State<boolean | undefined>;
        hidden?: boolean | undefined | State<boolean | undefined>;
        inert?: boolean | undefined | State<boolean | undefined>;
        innerText?: string | undefined | State<string | undefined>;
        lang?: string | undefined | State<string | undefined>;
        outerText?: string | undefined | State<string | undefined>;
        popover?: string | null | undefined | State<string | null | undefined>;
        spellcheck?: boolean | undefined | State<boolean | undefined>;
        title?: string | undefined | State<string | undefined>;
        translate?: boolean | undefined | State<boolean | undefined>;
    }

    interface HTMLOrSVGElement {
        autofocus?: boolean | undefined | State<boolean | undefined>;
        nonce?: string | undefined | State<string | undefined>;
        tabIndex?: number | undefined | State<number | undefined>;
    }

    interface HTMLAreaElement extends HTMLElement, HTMLHyperlinkElementUtils {
        tagName: "area";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        alt?: string | undefined | State<string | undefined>;
        coords?: string | undefined | State<string | undefined>;
        download?: string | undefined | State<string | undefined>;
        noHref?: boolean | undefined | State<boolean | undefined>;
        ping?: string | undefined | State<string | undefined>;
        referrerPolicy?: string | undefined | State<string | undefined>;
        rel?: string | undefined | State<string | undefined>;
        shape?: string | undefined | State<string | undefined>;
        target?: string | undefined | State<string | undefined>;
    }

    interface HTMLAudioElement extends HTMLMediaElement {
        tagName: "audio";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface HTMLMediaElement extends HTMLElement {
        autoplay?: boolean | undefined | State<boolean | undefined>;
        controls?: boolean | undefined | State<boolean | undefined>;
        crossOrigin?: string | null | undefined | State<string | null | undefined>;
        currentTime?: number | undefined | State<number | undefined>;
        defaultMuted?: boolean | undefined | State<boolean | undefined>;
        defaultPlaybackRate?: number | undefined | State<number | undefined>;
        disableRemotePlayback?: boolean | undefined | State<boolean | undefined>;
        loop?: boolean | undefined | State<boolean | undefined>;
        muted?: boolean | undefined | State<boolean | undefined>;
        onencrypted?: ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null | undefined | State<((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null | undefined>;
        onwaitingforkey?: ((this: HTMLMediaElement, ev: Event) => any) | null | undefined | State<((this: HTMLMediaElement, ev: Event) => any) | null | undefined>;
        playbackRate?: number | undefined | State<number | undefined>;
        preload?: "none" | "metadata" | "auto" | "" | undefined | State<"none" | "metadata" | "auto" | "" | undefined>;
        preservesPitch?: boolean | undefined | State<boolean | undefined>;
        src?: string | undefined | State<string | undefined>;
        srcObject?: MediaProvider | null | undefined | State<MediaProvider | null | undefined>;
        volume?: number | undefined | State<number | undefined>;
    }

    interface HTMLBaseElement extends HTMLElement {
        tagName: "base";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        href?: string | undefined | State<string | undefined>;
        target?: string | undefined | State<string | undefined>;
    }

    interface HTMLQuoteElement extends HTMLElement {
        tagName: "blockquote" | "q";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        cite?: string | undefined | State<string | undefined>;
    }

    interface HTMLBodyElement extends HTMLElement, WindowEventHandlers {
        tagName: "body";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        aLink?: string | undefined | State<string | undefined>;
        background?: string | undefined | State<string | undefined>;
        bgColor?: string | undefined | State<string | undefined>;
        link?: string | undefined | State<string | undefined>;
        text?: string | undefined | State<string | undefined>;
        vLink?: string | undefined | State<string | undefined>;
    }

    interface HTMLBRElement extends HTMLElement {
        tagName: "br";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        clear?: string | undefined | State<string | undefined>;
    }

    interface HTMLButtonElement extends HTMLElement, PopoverInvokerElement {
        tagName: "button";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disabled?: boolean | undefined | State<boolean | undefined>;
        formAction?: string | undefined | State<string | undefined>;
        formEnctype?: string | undefined | State<string | undefined>;
        formMethod?: string | undefined | State<string | undefined>;
        formNoValidate?: boolean | undefined | State<boolean | undefined>;
        formTarget?: string | undefined | State<string | undefined>;
        name?: string | undefined | State<string | undefined>;
        type?: "submit" | "reset" | "button" | undefined | State<"submit" | "reset" | "button" | undefined>;
        value?: string | undefined | State<string | undefined>;
    }

    interface HTMLCanvasElement extends HTMLElement {
        tagName: "canvas";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        height?: number | undefined | State<number | undefined>;
        width?: number | undefined | State<number | undefined>;
    }

    interface HTMLTableCaptionElement extends HTMLElement {
        tagName: "caption";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
    }

    interface HTMLTableColElement extends HTMLElement {
        tagName: "col" | "colgroup";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        ch?: string | undefined | State<string | undefined>;
        chOff?: string | undefined | State<string | undefined>;
        span?: number | undefined | State<number | undefined>;
        vAlign?: string | undefined | State<string | undefined>;
        width?: string | undefined | State<string | undefined>;
    }

    interface HTMLDataElement extends HTMLElement {
        tagName: "data";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        value?: string | undefined | State<string | undefined>;
    }

    interface HTMLDataListElement extends HTMLElement {
        tagName: "datalist";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface HTMLModElement extends HTMLElement {
        tagName: "del" | "ins";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        cite?: string | undefined | State<string | undefined>;
        dateTime?: string | undefined | State<string | undefined>;
    }

    interface HTMLDetailsElement extends HTMLElement {
        tagName: "details";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        name?: string | undefined | State<string | undefined>;
        open?: boolean | undefined | State<boolean | undefined>;
    }

    interface HTMLDialogElement extends HTMLElement {
        tagName: "dialog";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        open?: boolean | undefined | State<boolean | undefined>;
        returnValue?: string | undefined | State<string | undefined>;
    }

    interface HTMLDivElement extends HTMLElement {
        tagName: "div";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
    }

    interface HTMLDListElement extends HTMLElement {
        tagName: "dl";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        compact?: boolean | undefined | State<boolean | undefined>;
    }

    interface HTMLEmbedElement extends HTMLElement {
        tagName: "embed";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        height?: string | undefined | State<string | undefined>;
        name?: string | undefined | State<string | undefined>;
        src?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
        width?: string | undefined | State<string | undefined>;
    }

    interface HTMLFieldSetElement extends HTMLElement {
        tagName: "fieldset";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disabled?: boolean | undefined | State<boolean | undefined>;
        name?: string | undefined | State<string | undefined>;
    }

    interface HTMLFormElement extends HTMLElement {
        tagName: "form";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        acceptCharset?: string | undefined | State<string | undefined>;
        action?: string | undefined | State<string | undefined>;
        autocomplete?: AutoFillBase | undefined | State<AutoFillBase | undefined>;
        encoding?: string | undefined | State<string | undefined>;
        enctype?: string | undefined | State<string | undefined>;
        method?: string | undefined | State<string | undefined>;
        name?: string | undefined | State<string | undefined>;
        noValidate?: boolean | undefined | State<boolean | undefined>;
        rel?: string | undefined | State<string | undefined>;
        target?: string | undefined | State<string | undefined>;
    }

    interface HTMLHeadingElement extends HTMLElement {
        tagName: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
    }

    interface HTMLHeadElement extends HTMLElement {
        tagName: "head";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface HTMLHRElement extends HTMLElement {
        tagName: "hr";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        color?: string | undefined | State<string | undefined>;
        noShade?: boolean | undefined | State<boolean | undefined>;
        size?: string | undefined | State<string | undefined>;
        width?: string | undefined | State<string | undefined>;
    }

    interface HTMLHtmlElement extends HTMLElement {
        tagName: "html";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        version?: string | undefined | State<string | undefined>;
    }

    interface HTMLIFrameElement extends HTMLElement {
        tagName: "iframe";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        allow?: string | undefined | State<string | undefined>;
        allowFullscreen?: boolean | undefined | State<boolean | undefined>;
        frameBorder?: string | undefined | State<string | undefined>;
        height?: string | undefined | State<string | undefined>;
        loading?: string | undefined | State<string | undefined>;
        longDesc?: string | undefined | State<string | undefined>;
        marginHeight?: string | undefined | State<string | undefined>;
        marginWidth?: string | undefined | State<string | undefined>;
        name?: string | undefined | State<string | undefined>;
        referrerPolicy?: ReferrerPolicy | undefined | State<ReferrerPolicy | undefined>;
        scrolling?: string | undefined | State<string | undefined>;
        src?: string | undefined | State<string | undefined>;
        srcdoc?: string | undefined | State<string | undefined>;
        width?: string | undefined | State<string | undefined>;
    }

    interface HTMLImageElement extends HTMLElement {
        tagName: "img";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        alt?: string | undefined | State<string | undefined>;
        border?: string | undefined | State<string | undefined>;
        crossOrigin?: string | null | undefined | State<string | null | undefined>;
        decoding?: "async" | "sync" | "auto" | undefined | State<"async" | "sync" | "auto" | undefined>;
        fetchPriority?: string | undefined | State<string | undefined>;
        height?: number | undefined | State<number | undefined>;
        hspace?: number | undefined | State<number | undefined>;
        isMap?: boolean | undefined | State<boolean | undefined>;
        loading?: "eager" | "lazy" | undefined | State<"eager" | "lazy" | undefined>;
        longDesc?: string | undefined | State<string | undefined>;
        lowsrc?: string | undefined | State<string | undefined>;
        name?: string | undefined | State<string | undefined>;
        referrerPolicy?: string | undefined | State<string | undefined>;
        sizes?: string | undefined | State<string | undefined>;
        src?: string | undefined | State<string | undefined>;
        srcset?: string | undefined | State<string | undefined>;
        useMap?: string | undefined | State<string | undefined>;
        vspace?: number | undefined | State<number | undefined>;
        width?: number | undefined | State<number | undefined>;
    }

    interface HTMLInputElement extends HTMLElement, PopoverInvokerElement {
        tagName: "input";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        accept?: string | undefined | State<string | undefined>;
        align?: string | undefined | State<string | undefined>;
        alt?: string | undefined | State<string | undefined>;
        autocomplete?: AutoFill | undefined | State<AutoFill | undefined>;
        capture?: string | undefined | State<string | undefined>;
        checked?: boolean | undefined | State<boolean | undefined>;
        defaultChecked?: boolean | undefined | State<boolean | undefined>;
        defaultValue?: string | undefined | State<string | undefined>;
        dirName?: string | undefined | State<string | undefined>;
        disabled?: boolean | undefined | State<boolean | undefined>;
        files?: FileList | null | undefined | State<FileList | null | undefined>;
        formAction?: string | undefined | State<string | undefined>;
        formEnctype?: string | undefined | State<string | undefined>;
        formMethod?: string | undefined | State<string | undefined>;
        formNoValidate?: boolean | undefined | State<boolean | undefined>;
        formTarget?: string | undefined | State<string | undefined>;
        height?: number | undefined | State<number | undefined>;
        indeterminate?: boolean | undefined | State<boolean | undefined>;
        max?: string | undefined | State<string | undefined>;
        maxLength?: number | undefined | State<number | undefined>;
        min?: string | undefined | State<string | undefined>;
        minLength?: number | undefined | State<number | undefined>;
        multiple?: boolean | undefined | State<boolean | undefined>;
        name?: string | undefined | State<string | undefined>;
        pattern?: string | undefined | State<string | undefined>;
        placeholder?: string | undefined | State<string | undefined>;
        readOnly?: boolean | undefined | State<boolean | undefined>;
        required?: boolean | undefined | State<boolean | undefined>;
        selectionDirection?: "forward" | "backward" | "none" | null | undefined | State<"forward" | "backward" | "none" | null | undefined>;
        selectionEnd?: number | null | undefined | State<number | null | undefined>;
        selectionStart?: number | null | undefined | State<number | null | undefined>;
        size?: number | undefined | State<number | undefined>;
        src?: string | undefined | State<string | undefined>;
        step?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
        useMap?: string | undefined | State<string | undefined>;
        value?: string | undefined | State<string | undefined>;
        valueAsDate?: Date | null | undefined | State<Date | null | undefined>;
        valueAsNumber?: number | undefined | State<number | undefined>;
        webkitdirectory?: boolean | undefined | State<boolean | undefined>;
        width?: number | undefined | State<number | undefined>;
    }

    interface HTMLLabelElement extends HTMLElement {
        tagName: "label";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        htmlFor?: string | undefined | State<string | undefined>;
    }

    interface HTMLLegendElement extends HTMLElement {
        tagName: "legend";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
    }

    interface HTMLLIElement extends HTMLElement {
        tagName: "li";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        type?: string | undefined | State<string | undefined>;
        value?: number | undefined | State<number | undefined>;
    }

    interface HTMLLinkElement extends HTMLElement, LinkStyle {
        tagName: "link";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        as?: string | undefined | State<string | undefined>;
        charset?: string | undefined | State<string | undefined>;
        crossOrigin?: string | null | undefined | State<string | null | undefined>;
        disabled?: boolean | undefined | State<boolean | undefined>;
        fetchPriority?: string | undefined | State<string | undefined>;
        href?: string | undefined | State<string | undefined>;
        hreflang?: string | undefined | State<string | undefined>;
        imageSizes?: string | undefined | State<string | undefined>;
        imageSrcset?: string | undefined | State<string | undefined>;
        integrity?: string | undefined | State<string | undefined>;
        media?: string | undefined | State<string | undefined>;
        referrerPolicy?: string | undefined | State<string | undefined>;
        rel?: string | undefined | State<string | undefined>;
        rev?: string | undefined | State<string | undefined>;
        target?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
    }

    interface HTMLMapElement extends HTMLElement {
        tagName: "map";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        name?: string | undefined | State<string | undefined>;
    }

    interface HTMLMenuElement extends HTMLElement {
        tagName: "menu";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        compact?: boolean | undefined | State<boolean | undefined>;
    }

    interface HTMLMetaElement extends HTMLElement {
        tagName: "meta";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        content?: string | undefined | State<string | undefined>;
        httpEquiv?: string | undefined | State<string | undefined>;
        media?: string | undefined | State<string | undefined>;
        name?: string | undefined | State<string | undefined>;
        scheme?: string | undefined | State<string | undefined>;
    }

    interface HTMLMeterElement extends HTMLElement {
        tagName: "meter";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        high?: number | undefined | State<number | undefined>;
        low?: number | undefined | State<number | undefined>;
        max?: number | undefined | State<number | undefined>;
        min?: number | undefined | State<number | undefined>;
        optimum?: number | undefined | State<number | undefined>;
        value?: number | undefined | State<number | undefined>;
    }

    interface HTMLObjectElement extends HTMLElement {
        tagName: "object";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        archive?: string | undefined | State<string | undefined>;
        border?: string | undefined | State<string | undefined>;
        code?: string | undefined | State<string | undefined>;
        codeBase?: string | undefined | State<string | undefined>;
        codeType?: string | undefined | State<string | undefined>;
        data?: string | undefined | State<string | undefined>;
        declare?: boolean | undefined | State<boolean | undefined>;
        height?: string | undefined | State<string | undefined>;
        hspace?: number | undefined | State<number | undefined>;
        name?: string | undefined | State<string | undefined>;
        standby?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
        useMap?: string | undefined | State<string | undefined>;
        vspace?: number | undefined | State<number | undefined>;
        width?: string | undefined | State<string | undefined>;
    }

    interface HTMLOListElement extends HTMLElement {
        tagName: "ol";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        compact?: boolean | undefined | State<boolean | undefined>;
        reversed?: boolean | undefined | State<boolean | undefined>;
        start?: number | undefined | State<number | undefined>;
        type?: string | undefined | State<string | undefined>;
    }

    interface HTMLOptGroupElement extends HTMLElement {
        tagName: "optgroup";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disabled?: boolean | undefined | State<boolean | undefined>;
        label?: string | undefined | State<string | undefined>;
    }

    interface HTMLOptionElement extends HTMLElement {
        tagName: "option";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        defaultSelected?: boolean | undefined | State<boolean | undefined>;
        disabled?: boolean | undefined | State<boolean | undefined>;
        label?: string | undefined | State<string | undefined>;
        selected?: boolean | undefined | State<boolean | undefined>;
        text?: string | undefined | State<string | undefined>;
        value?: string | undefined | State<string | undefined>;
    }

    interface HTMLOutputElement extends HTMLElement {
        tagName: "output";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        defaultValue?: string | undefined | State<string | undefined>;
        name?: string | undefined | State<string | undefined>;
        value?: string | undefined | State<string | undefined>;
    }

    interface HTMLParagraphElement extends HTMLElement {
        tagName: "p";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
    }

    interface HTMLPictureElement extends HTMLElement {
        tagName: "picture";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface HTMLPreElement extends HTMLElement {
        tagName: "pre";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        width?: number | undefined | State<number | undefined>;
    }

    interface HTMLProgressElement extends HTMLElement {
        tagName: "progress";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        max?: number | undefined | State<number | undefined>;
        value?: number | undefined | State<number | undefined>;
    }

    interface HTMLScriptElement extends HTMLElement {
        tagName: "script";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        async?: boolean | undefined | State<boolean | undefined>;
        charset?: string | undefined | State<string | undefined>;
        crossOrigin?: string | null | undefined | State<string | null | undefined>;
        defer?: boolean | undefined | State<boolean | undefined>;
        event?: string | undefined | State<string | undefined>;
        fetchPriority?: string | undefined | State<string | undefined>;
        htmlFor?: string | undefined | State<string | undefined>;
        integrity?: string | undefined | State<string | undefined>;
        noModule?: boolean | undefined | State<boolean | undefined>;
        referrerPolicy?: string | undefined | State<string | undefined>;
        src?: string | undefined | State<string | undefined>;
        text?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
    }

    interface HTMLSelectElement extends HTMLElement {
        tagName: "select";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        autocomplete?: AutoFill | undefined | State<AutoFill | undefined>;
        disabled?: boolean | undefined | State<boolean | undefined>;
        length?: number | undefined | State<number | undefined>;
        multiple?: boolean | undefined | State<boolean | undefined>;
        name?: string | undefined | State<string | undefined>;
        required?: boolean | undefined | State<boolean | undefined>;
        selectedIndex?: number | undefined | State<number | undefined>;
        size?: number | undefined | State<number | undefined>;
        value?: string | undefined | State<string | undefined>;
    }

    interface HTMLSlotElement extends HTMLElement {
        tagName: "slot";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        name?: string | undefined | State<string | undefined>;
    }

    interface HTMLSourceElement extends HTMLElement {
        tagName: "source";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        height?: number | undefined | State<number | undefined>;
        media?: string | undefined | State<string | undefined>;
        sizes?: string | undefined | State<string | undefined>;
        src?: string | undefined | State<string | undefined>;
        srcset?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
        width?: number | undefined | State<number | undefined>;
    }

    interface HTMLSpanElement extends HTMLElement {
        tagName: "span";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface HTMLStyleElement extends HTMLElement, LinkStyle {
        tagName: "style";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disabled?: boolean | undefined | State<boolean | undefined>;
        media?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
    }

    interface HTMLTableElement extends HTMLElement {
        tagName: "table";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        bgColor?: string | undefined | State<string | undefined>;
        border?: string | undefined | State<string | undefined>;
        caption?: HTMLTableCaptionElement | null | undefined | State<HTMLTableCaptionElement | null | undefined>;
        cellPadding?: string | undefined | State<string | undefined>;
        cellSpacing?: string | undefined | State<string | undefined>;
        frame?: string | undefined | State<string | undefined>;
        rules?: string | undefined | State<string | undefined>;
        summary?: string | undefined | State<string | undefined>;
        tFoot?: HTMLTableSectionElement | null | undefined | State<HTMLTableSectionElement | null | undefined>;
        tHead?: HTMLTableSectionElement | null | undefined | State<HTMLTableSectionElement | null | undefined>;
        width?: string | undefined | State<string | undefined>;
    }

    interface HTMLTableSectionElement extends HTMLElement {
        tagName: "tbody" | "tfoot" | "thead";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        ch?: string | undefined | State<string | undefined>;
        chOff?: string | undefined | State<string | undefined>;
        vAlign?: string | undefined | State<string | undefined>;
    }

    interface HTMLTableCellElement extends HTMLElement {
        tagName: "td" | "th";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        abbr?: string | undefined | State<string | undefined>;
        align?: string | undefined | State<string | undefined>;
        axis?: string | undefined | State<string | undefined>;
        bgColor?: string | undefined | State<string | undefined>;
        ch?: string | undefined | State<string | undefined>;
        chOff?: string | undefined | State<string | undefined>;
        colSpan?: number | undefined | State<number | undefined>;
        headers?: string | undefined | State<string | undefined>;
        height?: string | undefined | State<string | undefined>;
        noWrap?: boolean | undefined | State<boolean | undefined>;
        rowSpan?: number | undefined | State<number | undefined>;
        scope?: string | undefined | State<string | undefined>;
        vAlign?: string | undefined | State<string | undefined>;
        width?: string | undefined | State<string | undefined>;
    }

    interface HTMLTemplateElement extends HTMLElement {
        tagName: "template";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        shadowRootMode?: string | undefined | State<string | undefined>;
    }

    interface HTMLTextAreaElement extends HTMLElement {
        tagName: "textarea";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        autocomplete?: AutoFill | undefined | State<AutoFill | undefined>;
        cols?: number | undefined | State<number | undefined>;
        defaultValue?: string | undefined | State<string | undefined>;
        dirName?: string | undefined | State<string | undefined>;
        disabled?: boolean | undefined | State<boolean | undefined>;
        maxLength?: number | undefined | State<number | undefined>;
        minLength?: number | undefined | State<number | undefined>;
        name?: string | undefined | State<string | undefined>;
        placeholder?: string | undefined | State<string | undefined>;
        readOnly?: boolean | undefined | State<boolean | undefined>;
        required?: boolean | undefined | State<boolean | undefined>;
        rows?: number | undefined | State<number | undefined>;
        selectionDirection?: "forward" | "backward" | "none" | undefined | State<"forward" | "backward" | "none" | undefined>;
        selectionEnd?: number | undefined | State<number | undefined>;
        selectionStart?: number | undefined | State<number | undefined>;
        value?: string | undefined | State<string | undefined>;
        wrap?: string | undefined | State<string | undefined>;
    }

    interface HTMLTimeElement extends HTMLElement {
        tagName: "time";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        dateTime?: string | undefined | State<string | undefined>;
    }

    interface HTMLTitleElement extends HTMLElement {
        tagName: "title";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        text?: string | undefined | State<string | undefined>;
    }

    interface HTMLTableRowElement extends HTMLElement {
        tagName: "tr";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | undefined | State<string | undefined>;
        bgColor?: string | undefined | State<string | undefined>;
        ch?: string | undefined | State<string | undefined>;
        chOff?: string | undefined | State<string | undefined>;
        vAlign?: string | undefined | State<string | undefined>;
    }

    interface HTMLTrackElement extends HTMLElement {
        tagName: "track";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        default?: boolean | undefined | State<boolean | undefined>;
        kind?: string | undefined | State<string | undefined>;
        label?: string | undefined | State<string | undefined>;
        src?: string | undefined | State<string | undefined>;
        srclang?: string | undefined | State<string | undefined>;
    }

    interface HTMLUListElement extends HTMLElement {
        tagName: "ul";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        compact?: boolean | undefined | State<boolean | undefined>;
        type?: string | undefined | State<string | undefined>;
    }

    interface HTMLVideoElement extends HTMLMediaElement {
        tagName: "video";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disablePictureInPicture?: boolean | undefined | State<boolean | undefined>;
        height?: number | undefined | State<number | undefined>;
        onenterpictureinpicture?: ((this: HTMLVideoElement, ev: Event) => any) | null | undefined | State<((this: HTMLVideoElement, ev: Event) => any) | null | undefined>;
        onleavepictureinpicture?: ((this: HTMLVideoElement, ev: Event) => any) | null | undefined | State<((this: HTMLVideoElement, ev: Event) => any) | null | undefined>;
        playsInline?: boolean | undefined | State<boolean | undefined>;
        poster?: string | undefined | State<string | undefined>;
        width?: number | undefined | State<number | undefined>;
    }

    interface SVGAElement extends SVGGraphicsElement, SVGURIReference {
        tagName: "a";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
        rel?: string | undefined | State<string | undefined>;
    }

    interface SVGGraphicsElement extends SVGElement, SVGTests { }

    interface SVGElement extends Element, ElementCSSInlineStyle, GlobalEventHandlers, HTMLOrSVGElement {
        tagName: "a" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "script" | "set" | "stop" | "style" | "svg" | "switch" | "symbol" | "text" | "textPath" | "title" | "tspan" | "use" | "view";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
        [key: string]: any;
    }

    interface SVGAnimateElement extends SVGAnimationElement {
        tagName: "animate";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGAnimationElement extends SVGElement, SVGTests { }

    interface SVGAnimateMotionElement extends SVGAnimationElement {
        tagName: "animateMotion";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGAnimateTransformElement extends SVGAnimationElement {
        tagName: "animateTransform";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGCircleElement extends SVGGeometryElement {
        tagName: "circle";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGGeometryElement extends SVGGraphicsElement { }

    interface SVGClipPathElement extends SVGElement {
        tagName: "clipPath";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGDefsElement extends SVGGraphicsElement {
        tagName: "defs";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGDescElement extends SVGElement {
        tagName: "desc";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGEllipseElement extends SVGGeometryElement {
        tagName: "ellipse";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEBlendElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feBlend";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEColorMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feColorMatrix";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEComponentTransferElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feComponentTransfer";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFECompositeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feComposite";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEConvolveMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feConvolveMatrix";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEDiffuseLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feDiffuseLighting";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEDisplacementMapElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feDisplacementMap";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEDistantLightElement extends SVGElement {
        tagName: "feDistantLight";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEDropShadowElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feDropShadow";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEFloodElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feFlood";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEFuncAElement extends SVGComponentTransferFunctionElement {
        tagName: "feFuncA";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGComponentTransferFunctionElement extends SVGElement { }

    interface SVGFEFuncBElement extends SVGComponentTransferFunctionElement {
        tagName: "feFuncB";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEFuncGElement extends SVGComponentTransferFunctionElement {
        tagName: "feFuncG";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEFuncRElement extends SVGComponentTransferFunctionElement {
        tagName: "feFuncR";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEGaussianBlurElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feGaussianBlur";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEImageElement extends SVGElement, SVGFilterPrimitiveStandardAttributes, SVGURIReference {
        tagName: "feImage";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEMergeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feMerge";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEMergeNodeElement extends SVGElement {
        tagName: "feMergeNode";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEMorphologyElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feMorphology";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEOffsetElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feOffset";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFEPointLightElement extends SVGElement {
        tagName: "fePointLight";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFESpecularLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feSpecularLighting";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFESpotLightElement extends SVGElement {
        tagName: "feSpotLight";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFETileElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feTile";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFETurbulenceElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        tagName: "feTurbulence";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGFilterElement extends SVGElement, SVGURIReference {
        tagName: "filter";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGForeignObjectElement extends SVGGraphicsElement {
        tagName: "foreignObject";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGGElement extends SVGGraphicsElement {
        tagName: "g";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGImageElement extends SVGGraphicsElement, SVGURIReference {
        tagName: "image";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
        crossOrigin?: string | null | undefined | State<string | null | undefined>;
    }

    interface SVGLineElement extends SVGGeometryElement {
        tagName: "line";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGLinearGradientElement extends SVGGradientElement {
        tagName: "linearGradient";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGGradientElement extends SVGElement, SVGURIReference { }

    interface SVGMarkerElement extends SVGElement, SVGFitToViewBox {
        tagName: "marker";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGMaskElement extends SVGElement {
        tagName: "mask";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGMetadataElement extends SVGElement {
        tagName: "metadata";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGMPathElement extends SVGElement, SVGURIReference {
        tagName: "mpath";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGPathElement extends SVGGeometryElement {
        tagName: "path";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGPatternElement extends SVGElement, SVGFitToViewBox, SVGURIReference {
        tagName: "pattern";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGPolygonElement extends SVGGeometryElement, SVGAnimatedPoints {
        tagName: "polygon";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGPolylineElement extends SVGGeometryElement, SVGAnimatedPoints {
        tagName: "polyline";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGRadialGradientElement extends SVGGradientElement {
        tagName: "radialGradient";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGRectElement extends SVGGeometryElement {
        tagName: "rect";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGScriptElement extends SVGElement, SVGURIReference {
        tagName: "script";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
        type?: string | undefined | State<string | undefined>;
    }

    interface SVGSetElement extends SVGAnimationElement {
        tagName: "set";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGStopElement extends SVGElement {
        tagName: "stop";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGStyleElement extends SVGElement, LinkStyle {
        tagName: "style";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disabled?: boolean | undefined | State<boolean | undefined>;
        media?: string | undefined | State<string | undefined>;
        title?: string | undefined | State<string | undefined>;
        type?: string | undefined | State<string | undefined>;
    }

    interface SVGSVGElement extends SVGGraphicsElement, SVGFitToViewBox, WindowEventHandlers {
        tagName: "svg";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
        currentScale?: number | undefined | State<number | undefined>;
    }

    interface SVGSwitchElement extends SVGGraphicsElement {
        tagName: "switch";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGSymbolElement extends SVGElement, SVGFitToViewBox {
        tagName: "symbol";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGTextElement extends SVGTextPositioningElement {
        tagName: "text";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGTextPositioningElement extends SVGTextContentElement { }

    interface SVGTextContentElement extends SVGGraphicsElement { }

    interface SVGTextPathElement extends SVGTextContentElement, SVGURIReference {
        tagName: "textPath";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGTitleElement extends SVGElement {
        tagName: "title";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGTSpanElement extends SVGTextPositioningElement {
        tagName: "tspan";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGUseElement extends SVGGraphicsElement, SVGURIReference {
        tagName: "use";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface SVGViewElement extends SVGElement, SVGFitToViewBox {
        tagName: "view";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface MathMLElement extends Element, ElementCSSInlineStyle, GlobalEventHandlers, HTMLOrSVGElement {
        tagName: "annotation" | "annotation-xml" | "maction" | "math" | "merror" | "mfrac" | "mi" | "mmultiscripts" | "mn" | "mo" | "mover" | "mpadded" | "mphantom" | "mprescripts" | "mroot" | "mrow" | "ms" | "mspace" | "msqrt" | "mstyle" | "msub" | "msubsup" | "msup" | "mtable" | "mtd" | "mtext" | "mtr" | "munder" | "munderover" | "semantics";
        namespaceURI: "http://www.w3.org/1998/Math/MathML";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface Element extends Node, ARIAMixin, Animatable, ChildNode, InnerHTML, NonDocumentTypeChildNode, ParentNode, Slottable {
        tagName: "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "search" | "section" | "select" | "slot" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "set" | "stop" | "svg" | "switch" | "symbol" | "text" | "textPath" | "tspan" | "use" | "view" | "annotation" | "annotation-xml" | "maction" | "math" | "merror" | "mfrac" | "mi" | "mmultiscripts" | "mn" | "mo" | "mover" | "mpadded" | "mphantom" | "mprescripts" | "mroot" | "mrow" | "ms" | "mspace" | "msqrt" | "mstyle" | "msub" | "msubsup" | "msup" | "mtable" | "mtd" | "mtext" | "mtr" | "munder" | "munderover" | "semantics";
        namespaceURI?: "http://www.w3.org/1999/xhtml" | "http://www.w3.org/2000/svg" | "http://www.w3.org/1998/Math/MathML";
        children?: MiniChildren;
        dataset?: MiniDataset;
        className?: string | undefined | State<string | undefined>;
        id?: string | undefined | State<string | undefined>;
        onfullscreenchange?: ((this: Element, ev: Event) => any) | null | undefined | State<((this: Element, ev: Event) => any) | null | undefined>;
        onfullscreenerror?: ((this: Element, ev: Event) => any) | null | undefined | State<((this: Element, ev: Event) => any) | null | undefined>;
        outerHTML?: string | undefined | State<string | undefined>;
        scrollLeft?: number | undefined | State<number | undefined>;
        scrollTop?: number | undefined | State<number | undefined>;
        slot?: string | undefined | State<string | undefined>;
    }

    interface Node extends EventTarget {
        nodeValue?: string | null | undefined | State<string | null | undefined>;
        textContent?: string | null | undefined | State<string | null | undefined>;
    }

    interface EventTarget { }

    interface ARIAMixin {
        ariaAtomic?: string | null | undefined | State<string | null | undefined>;
        ariaAutoComplete?: string | null | undefined | State<string | null | undefined>;
        ariaBusy?: string | null | undefined | State<string | null | undefined>;
        ariaChecked?: string | null | undefined | State<string | null | undefined>;
        ariaColCount?: string | null | undefined | State<string | null | undefined>;
        ariaColIndex?: string | null | undefined | State<string | null | undefined>;
        ariaColSpan?: string | null | undefined | State<string | null | undefined>;
        ariaCurrent?: string | null | undefined | State<string | null | undefined>;
        ariaDescription?: string | null | undefined | State<string | null | undefined>;
        ariaDisabled?: string | null | undefined | State<string | null | undefined>;
        ariaExpanded?: string | null | undefined | State<string | null | undefined>;
        ariaHasPopup?: string | null | undefined | State<string | null | undefined>;
        ariaHidden?: string | null | undefined | State<string | null | undefined>;
        ariaInvalid?: string | null | undefined | State<string | null | undefined>;
        ariaKeyShortcuts?: string | null | undefined | State<string | null | undefined>;
        ariaLabel?: string | null | undefined | State<string | null | undefined>;
        ariaLevel?: string | null | undefined | State<string | null | undefined>;
        ariaLive?: string | null | undefined | State<string | null | undefined>;
        ariaModal?: string | null | undefined | State<string | null | undefined>;
        ariaMultiLine?: string | null | undefined | State<string | null | undefined>;
        ariaMultiSelectable?: string | null | undefined | State<string | null | undefined>;
        ariaOrientation?: string | null | undefined | State<string | null | undefined>;
        ariaPlaceholder?: string | null | undefined | State<string | null | undefined>;
        ariaPosInSet?: string | null | undefined | State<string | null | undefined>;
        ariaPressed?: string | null | undefined | State<string | null | undefined>;
        ariaReadOnly?: string | null | undefined | State<string | null | undefined>;
        ariaRequired?: string | null | undefined | State<string | null | undefined>;
        ariaRoleDescription?: string | null | undefined | State<string | null | undefined>;
        ariaRowCount?: string | null | undefined | State<string | null | undefined>;
        ariaRowIndex?: string | null | undefined | State<string | null | undefined>;
        ariaRowSpan?: string | null | undefined | State<string | null | undefined>;
        ariaSelected?: string | null | undefined | State<string | null | undefined>;
        ariaSetSize?: string | null | undefined | State<string | null | undefined>;
        ariaSort?: string | null | undefined | State<string | null | undefined>;
        ariaValueMax?: string | null | undefined | State<string | null | undefined>;
        ariaValueMin?: string | null | undefined | State<string | null | undefined>;
        ariaValueNow?: string | null | undefined | State<string | null | undefined>;
        ariaValueText?: string | null | undefined | State<string | null | undefined>;
        role?: string | null | undefined | State<string | null | undefined>;
    }

    interface Animatable { }

    interface ChildNode extends Node { }

    interface InnerHTML {
        innerHTML?: string | undefined | State<string | undefined>;
    }

    interface NonDocumentTypeChildNode { }

    interface ParentNode extends Node { }

    interface Slottable { }

    interface ElementCSSInlineStyle {
        style?: CSSStyleDeclaration | undefined | State<CSSStyleDeclaration | undefined>;
    }

    interface CSSStyleDeclaration {
        accentColor?: string | undefined | State<string | undefined>;
        alignContent?: string | undefined | State<string | undefined>;
        alignItems?: string | undefined | State<string | undefined>;
        alignSelf?: string | undefined | State<string | undefined>;
        alignmentBaseline?: string | undefined | State<string | undefined>;
        all?: string | undefined | State<string | undefined>;
        animation?: string | undefined | State<string | undefined>;
        animationComposition?: string | undefined | State<string | undefined>;
        animationDelay?: string | undefined | State<string | undefined>;
        animationDirection?: string | undefined | State<string | undefined>;
        animationDuration?: string | undefined | State<string | undefined>;
        animationFillMode?: string | undefined | State<string | undefined>;
        animationIterationCount?: string | undefined | State<string | undefined>;
        animationName?: string | undefined | State<string | undefined>;
        animationPlayState?: string | undefined | State<string | undefined>;
        animationTimingFunction?: string | undefined | State<string | undefined>;
        appearance?: string | undefined | State<string | undefined>;
        aspectRatio?: string | undefined | State<string | undefined>;
        backdropFilter?: string | undefined | State<string | undefined>;
        backfaceVisibility?: string | undefined | State<string | undefined>;
        background?: string | undefined | State<string | undefined>;
        backgroundAttachment?: string | undefined | State<string | undefined>;
        backgroundBlendMode?: string | undefined | State<string | undefined>;
        backgroundClip?: string | undefined | State<string | undefined>;
        backgroundColor?: string | undefined | State<string | undefined>;
        backgroundImage?: string | undefined | State<string | undefined>;
        backgroundOrigin?: string | undefined | State<string | undefined>;
        backgroundPosition?: string | undefined | State<string | undefined>;
        backgroundPositionX?: string | undefined | State<string | undefined>;
        backgroundPositionY?: string | undefined | State<string | undefined>;
        backgroundRepeat?: string | undefined | State<string | undefined>;
        backgroundSize?: string | undefined | State<string | undefined>;
        baselineShift?: string | undefined | State<string | undefined>;
        baselineSource?: string | undefined | State<string | undefined>;
        blockSize?: string | undefined | State<string | undefined>;
        border?: string | undefined | State<string | undefined>;
        borderBlock?: string | undefined | State<string | undefined>;
        borderBlockColor?: string | undefined | State<string | undefined>;
        borderBlockEnd?: string | undefined | State<string | undefined>;
        borderBlockEndColor?: string | undefined | State<string | undefined>;
        borderBlockEndStyle?: string | undefined | State<string | undefined>;
        borderBlockEndWidth?: string | undefined | State<string | undefined>;
        borderBlockStart?: string | undefined | State<string | undefined>;
        borderBlockStartColor?: string | undefined | State<string | undefined>;
        borderBlockStartStyle?: string | undefined | State<string | undefined>;
        borderBlockStartWidth?: string | undefined | State<string | undefined>;
        borderBlockStyle?: string | undefined | State<string | undefined>;
        borderBlockWidth?: string | undefined | State<string | undefined>;
        borderBottom?: string | undefined | State<string | undefined>;
        borderBottomColor?: string | undefined | State<string | undefined>;
        borderBottomLeftRadius?: string | undefined | State<string | undefined>;
        borderBottomRightRadius?: string | undefined | State<string | undefined>;
        borderBottomStyle?: string | undefined | State<string | undefined>;
        borderBottomWidth?: string | undefined | State<string | undefined>;
        borderCollapse?: string | undefined | State<string | undefined>;
        borderColor?: string | undefined | State<string | undefined>;
        borderEndEndRadius?: string | undefined | State<string | undefined>;
        borderEndStartRadius?: string | undefined | State<string | undefined>;
        borderImage?: string | undefined | State<string | undefined>;
        borderImageOutset?: string | undefined | State<string | undefined>;
        borderImageRepeat?: string | undefined | State<string | undefined>;
        borderImageSlice?: string | undefined | State<string | undefined>;
        borderImageSource?: string | undefined | State<string | undefined>;
        borderImageWidth?: string | undefined | State<string | undefined>;
        borderInline?: string | undefined | State<string | undefined>;
        borderInlineColor?: string | undefined | State<string | undefined>;
        borderInlineEnd?: string | undefined | State<string | undefined>;
        borderInlineEndColor?: string | undefined | State<string | undefined>;
        borderInlineEndStyle?: string | undefined | State<string | undefined>;
        borderInlineEndWidth?: string | undefined | State<string | undefined>;
        borderInlineStart?: string | undefined | State<string | undefined>;
        borderInlineStartColor?: string | undefined | State<string | undefined>;
        borderInlineStartStyle?: string | undefined | State<string | undefined>;
        borderInlineStartWidth?: string | undefined | State<string | undefined>;
        borderInlineStyle?: string | undefined | State<string | undefined>;
        borderInlineWidth?: string | undefined | State<string | undefined>;
        borderLeft?: string | undefined | State<string | undefined>;
        borderLeftColor?: string | undefined | State<string | undefined>;
        borderLeftStyle?: string | undefined | State<string | undefined>;
        borderLeftWidth?: string | undefined | State<string | undefined>;
        borderRadius?: string | undefined | State<string | undefined>;
        borderRight?: string | undefined | State<string | undefined>;
        borderRightColor?: string | undefined | State<string | undefined>;
        borderRightStyle?: string | undefined | State<string | undefined>;
        borderRightWidth?: string | undefined | State<string | undefined>;
        borderSpacing?: string | undefined | State<string | undefined>;
        borderStartEndRadius?: string | undefined | State<string | undefined>;
        borderStartStartRadius?: string | undefined | State<string | undefined>;
        borderStyle?: string | undefined | State<string | undefined>;
        borderTop?: string | undefined | State<string | undefined>;
        borderTopColor?: string | undefined | State<string | undefined>;
        borderTopLeftRadius?: string | undefined | State<string | undefined>;
        borderTopRightRadius?: string | undefined | State<string | undefined>;
        borderTopStyle?: string | undefined | State<string | undefined>;
        borderTopWidth?: string | undefined | State<string | undefined>;
        borderWidth?: string | undefined | State<string | undefined>;
        bottom?: string | undefined | State<string | undefined>;
        boxShadow?: string | undefined | State<string | undefined>;
        boxSizing?: string | undefined | State<string | undefined>;
        breakAfter?: string | undefined | State<string | undefined>;
        breakBefore?: string | undefined | State<string | undefined>;
        breakInside?: string | undefined | State<string | undefined>;
        captionSide?: string | undefined | State<string | undefined>;
        caretColor?: string | undefined | State<string | undefined>;
        clear?: string | undefined | State<string | undefined>;
        clip?: string | undefined | State<string | undefined>;
        clipPath?: string | undefined | State<string | undefined>;
        clipRule?: string | undefined | State<string | undefined>;
        color?: string | undefined | State<string | undefined>;
        colorInterpolation?: string | undefined | State<string | undefined>;
        colorInterpolationFilters?: string | undefined | State<string | undefined>;
        colorScheme?: string | undefined | State<string | undefined>;
        columnCount?: string | undefined | State<string | undefined>;
        columnFill?: string | undefined | State<string | undefined>;
        columnGap?: string | undefined | State<string | undefined>;
        columnRule?: string | undefined | State<string | undefined>;
        columnRuleColor?: string | undefined | State<string | undefined>;
        columnRuleStyle?: string | undefined | State<string | undefined>;
        columnRuleWidth?: string | undefined | State<string | undefined>;
        columnSpan?: string | undefined | State<string | undefined>;
        columnWidth?: string | undefined | State<string | undefined>;
        columns?: string | undefined | State<string | undefined>;
        contain?: string | undefined | State<string | undefined>;
        containIntrinsicBlockSize?: string | undefined | State<string | undefined>;
        containIntrinsicHeight?: string | undefined | State<string | undefined>;
        containIntrinsicInlineSize?: string | undefined | State<string | undefined>;
        containIntrinsicSize?: string | undefined | State<string | undefined>;
        containIntrinsicWidth?: string | undefined | State<string | undefined>;
        container?: string | undefined | State<string | undefined>;
        containerName?: string | undefined | State<string | undefined>;
        containerType?: string | undefined | State<string | undefined>;
        content?: string | undefined | State<string | undefined>;
        counterIncrement?: string | undefined | State<string | undefined>;
        counterReset?: string | undefined | State<string | undefined>;
        counterSet?: string | undefined | State<string | undefined>;
        cssFloat?: string | undefined | State<string | undefined>;
        cssText?: string | undefined | State<string | undefined>;
        cursor?: string | undefined | State<string | undefined>;
        cx?: string | undefined | State<string | undefined>;
        cy?: string | undefined | State<string | undefined>;
        d?: string | undefined | State<string | undefined>;
        direction?: string | undefined | State<string | undefined>;
        display?: string | undefined | State<string | undefined>;
        dominantBaseline?: string | undefined | State<string | undefined>;
        emptyCells?: string | undefined | State<string | undefined>;
        fill?: string | undefined | State<string | undefined>;
        fillOpacity?: string | undefined | State<string | undefined>;
        fillRule?: string | undefined | State<string | undefined>;
        filter?: string | undefined | State<string | undefined>;
        flex?: string | undefined | State<string | undefined>;
        flexBasis?: string | undefined | State<string | undefined>;
        flexDirection?: string | undefined | State<string | undefined>;
        flexFlow?: string | undefined | State<string | undefined>;
        flexGrow?: string | undefined | State<string | undefined>;
        flexShrink?: string | undefined | State<string | undefined>;
        flexWrap?: string | undefined | State<string | undefined>;
        float?: string | undefined | State<string | undefined>;
        floodColor?: string | undefined | State<string | undefined>;
        floodOpacity?: string | undefined | State<string | undefined>;
        font?: string | undefined | State<string | undefined>;
        fontFamily?: string | undefined | State<string | undefined>;
        fontFeatureSettings?: string | undefined | State<string | undefined>;
        fontKerning?: string | undefined | State<string | undefined>;
        fontOpticalSizing?: string | undefined | State<string | undefined>;
        fontPalette?: string | undefined | State<string | undefined>;
        fontSize?: string | undefined | State<string | undefined>;
        fontSizeAdjust?: string | undefined | State<string | undefined>;
        fontStretch?: string | undefined | State<string | undefined>;
        fontStyle?: string | undefined | State<string | undefined>;
        fontSynthesis?: string | undefined | State<string | undefined>;
        fontSynthesisSmallCaps?: string | undefined | State<string | undefined>;
        fontSynthesisStyle?: string | undefined | State<string | undefined>;
        fontSynthesisWeight?: string | undefined | State<string | undefined>;
        fontVariant?: string | undefined | State<string | undefined>;
        fontVariantAlternates?: string | undefined | State<string | undefined>;
        fontVariantCaps?: string | undefined | State<string | undefined>;
        fontVariantEastAsian?: string | undefined | State<string | undefined>;
        fontVariantLigatures?: string | undefined | State<string | undefined>;
        fontVariantNumeric?: string | undefined | State<string | undefined>;
        fontVariantPosition?: string | undefined | State<string | undefined>;
        fontVariationSettings?: string | undefined | State<string | undefined>;
        fontWeight?: string | undefined | State<string | undefined>;
        forcedColorAdjust?: string | undefined | State<string | undefined>;
        gap?: string | undefined | State<string | undefined>;
        grid?: string | undefined | State<string | undefined>;
        gridArea?: string | undefined | State<string | undefined>;
        gridAutoColumns?: string | undefined | State<string | undefined>;
        gridAutoFlow?: string | undefined | State<string | undefined>;
        gridAutoRows?: string | undefined | State<string | undefined>;
        gridColumn?: string | undefined | State<string | undefined>;
        gridColumnEnd?: string | undefined | State<string | undefined>;
        gridColumnGap?: string | undefined | State<string | undefined>;
        gridColumnStart?: string | undefined | State<string | undefined>;
        gridGap?: string | undefined | State<string | undefined>;
        gridRow?: string | undefined | State<string | undefined>;
        gridRowEnd?: string | undefined | State<string | undefined>;
        gridRowGap?: string | undefined | State<string | undefined>;
        gridRowStart?: string | undefined | State<string | undefined>;
        gridTemplate?: string | undefined | State<string | undefined>;
        gridTemplateAreas?: string | undefined | State<string | undefined>;
        gridTemplateColumns?: string | undefined | State<string | undefined>;
        gridTemplateRows?: string | undefined | State<string | undefined>;
        height?: string | undefined | State<string | undefined>;
        hyphenateCharacter?: string | undefined | State<string | undefined>;
        hyphens?: string | undefined | State<string | undefined>;
        imageOrientation?: string | undefined | State<string | undefined>;
        imageRendering?: string | undefined | State<string | undefined>;
        inlineSize?: string | undefined | State<string | undefined>;
        inset?: string | undefined | State<string | undefined>;
        insetBlock?: string | undefined | State<string | undefined>;
        insetBlockEnd?: string | undefined | State<string | undefined>;
        insetBlockStart?: string | undefined | State<string | undefined>;
        insetInline?: string | undefined | State<string | undefined>;
        insetInlineEnd?: string | undefined | State<string | undefined>;
        insetInlineStart?: string | undefined | State<string | undefined>;
        isolation?: string | undefined | State<string | undefined>;
        justifyContent?: string | undefined | State<string | undefined>;
        justifyItems?: string | undefined | State<string | undefined>;
        justifySelf?: string | undefined | State<string | undefined>;
        left?: string | undefined | State<string | undefined>;
        letterSpacing?: string | undefined | State<string | undefined>;
        lightingColor?: string | undefined | State<string | undefined>;
        lineBreak?: string | undefined | State<string | undefined>;
        lineHeight?: string | undefined | State<string | undefined>;
        listStyle?: string | undefined | State<string | undefined>;
        listStyleImage?: string | undefined | State<string | undefined>;
        listStylePosition?: string | undefined | State<string | undefined>;
        listStyleType?: string | undefined | State<string | undefined>;
        margin?: string | undefined | State<string | undefined>;
        marginBlock?: string | undefined | State<string | undefined>;
        marginBlockEnd?: string | undefined | State<string | undefined>;
        marginBlockStart?: string | undefined | State<string | undefined>;
        marginBottom?: string | undefined | State<string | undefined>;
        marginInline?: string | undefined | State<string | undefined>;
        marginInlineEnd?: string | undefined | State<string | undefined>;
        marginInlineStart?: string | undefined | State<string | undefined>;
        marginLeft?: string | undefined | State<string | undefined>;
        marginRight?: string | undefined | State<string | undefined>;
        marginTop?: string | undefined | State<string | undefined>;
        marker?: string | undefined | State<string | undefined>;
        markerEnd?: string | undefined | State<string | undefined>;
        markerMid?: string | undefined | State<string | undefined>;
        markerStart?: string | undefined | State<string | undefined>;
        mask?: string | undefined | State<string | undefined>;
        maskClip?: string | undefined | State<string | undefined>;
        maskComposite?: string | undefined | State<string | undefined>;
        maskImage?: string | undefined | State<string | undefined>;
        maskMode?: string | undefined | State<string | undefined>;
        maskOrigin?: string | undefined | State<string | undefined>;
        maskPosition?: string | undefined | State<string | undefined>;
        maskRepeat?: string | undefined | State<string | undefined>;
        maskSize?: string | undefined | State<string | undefined>;
        maskType?: string | undefined | State<string | undefined>;
        mathDepth?: string | undefined | State<string | undefined>;
        mathStyle?: string | undefined | State<string | undefined>;
        maxBlockSize?: string | undefined | State<string | undefined>;
        maxHeight?: string | undefined | State<string | undefined>;
        maxInlineSize?: string | undefined | State<string | undefined>;
        maxWidth?: string | undefined | State<string | undefined>;
        minBlockSize?: string | undefined | State<string | undefined>;
        minHeight?: string | undefined | State<string | undefined>;
        minInlineSize?: string | undefined | State<string | undefined>;
        minWidth?: string | undefined | State<string | undefined>;
        mixBlendMode?: string | undefined | State<string | undefined>;
        objectFit?: string | undefined | State<string | undefined>;
        objectPosition?: string | undefined | State<string | undefined>;
        offset?: string | undefined | State<string | undefined>;
        offsetAnchor?: string | undefined | State<string | undefined>;
        offsetDistance?: string | undefined | State<string | undefined>;
        offsetPath?: string | undefined | State<string | undefined>;
        offsetPosition?: string | undefined | State<string | undefined>;
        offsetRotate?: string | undefined | State<string | undefined>;
        opacity?: string | undefined | State<string | undefined>;
        order?: string | undefined | State<string | undefined>;
        orphans?: string | undefined | State<string | undefined>;
        outline?: string | undefined | State<string | undefined>;
        outlineColor?: string | undefined | State<string | undefined>;
        outlineOffset?: string | undefined | State<string | undefined>;
        outlineStyle?: string | undefined | State<string | undefined>;
        outlineWidth?: string | undefined | State<string | undefined>;
        overflow?: string | undefined | State<string | undefined>;
        overflowAnchor?: string | undefined | State<string | undefined>;
        overflowClipMargin?: string | undefined | State<string | undefined>;
        overflowWrap?: string | undefined | State<string | undefined>;
        overflowX?: string | undefined | State<string | undefined>;
        overflowY?: string | undefined | State<string | undefined>;
        overscrollBehavior?: string | undefined | State<string | undefined>;
        overscrollBehaviorBlock?: string | undefined | State<string | undefined>;
        overscrollBehaviorInline?: string | undefined | State<string | undefined>;
        overscrollBehaviorX?: string | undefined | State<string | undefined>;
        overscrollBehaviorY?: string | undefined | State<string | undefined>;
        padding?: string | undefined | State<string | undefined>;
        paddingBlock?: string | undefined | State<string | undefined>;
        paddingBlockEnd?: string | undefined | State<string | undefined>;
        paddingBlockStart?: string | undefined | State<string | undefined>;
        paddingBottom?: string | undefined | State<string | undefined>;
        paddingInline?: string | undefined | State<string | undefined>;
        paddingInlineEnd?: string | undefined | State<string | undefined>;
        paddingInlineStart?: string | undefined | State<string | undefined>;
        paddingLeft?: string | undefined | State<string | undefined>;
        paddingRight?: string | undefined | State<string | undefined>;
        paddingTop?: string | undefined | State<string | undefined>;
        page?: string | undefined | State<string | undefined>;
        pageBreakAfter?: string | undefined | State<string | undefined>;
        pageBreakBefore?: string | undefined | State<string | undefined>;
        pageBreakInside?: string | undefined | State<string | undefined>;
        paintOrder?: string | undefined | State<string | undefined>;
        perspective?: string | undefined | State<string | undefined>;
        perspectiveOrigin?: string | undefined | State<string | undefined>;
        placeContent?: string | undefined | State<string | undefined>;
        placeItems?: string | undefined | State<string | undefined>;
        placeSelf?: string | undefined | State<string | undefined>;
        pointerEvents?: string | undefined | State<string | undefined>;
        position?: string | undefined | State<string | undefined>;
        printColorAdjust?: string | undefined | State<string | undefined>;
        quotes?: string | undefined | State<string | undefined>;
        r?: string | undefined | State<string | undefined>;
        resize?: string | undefined | State<string | undefined>;
        right?: string | undefined | State<string | undefined>;
        rotate?: string | undefined | State<string | undefined>;
        rowGap?: string | undefined | State<string | undefined>;
        rubyPosition?: string | undefined | State<string | undefined>;
        rx?: string | undefined | State<string | undefined>;
        ry?: string | undefined | State<string | undefined>;
        scale?: string | undefined | State<string | undefined>;
        scrollBehavior?: string | undefined | State<string | undefined>;
        scrollMargin?: string | undefined | State<string | undefined>;
        scrollMarginBlock?: string | undefined | State<string | undefined>;
        scrollMarginBlockEnd?: string | undefined | State<string | undefined>;
        scrollMarginBlockStart?: string | undefined | State<string | undefined>;
        scrollMarginBottom?: string | undefined | State<string | undefined>;
        scrollMarginInline?: string | undefined | State<string | undefined>;
        scrollMarginInlineEnd?: string | undefined | State<string | undefined>;
        scrollMarginInlineStart?: string | undefined | State<string | undefined>;
        scrollMarginLeft?: string | undefined | State<string | undefined>;
        scrollMarginRight?: string | undefined | State<string | undefined>;
        scrollMarginTop?: string | undefined | State<string | undefined>;
        scrollPadding?: string | undefined | State<string | undefined>;
        scrollPaddingBlock?: string | undefined | State<string | undefined>;
        scrollPaddingBlockEnd?: string | undefined | State<string | undefined>;
        scrollPaddingBlockStart?: string | undefined | State<string | undefined>;
        scrollPaddingBottom?: string | undefined | State<string | undefined>;
        scrollPaddingInline?: string | undefined | State<string | undefined>;
        scrollPaddingInlineEnd?: string | undefined | State<string | undefined>;
        scrollPaddingInlineStart?: string | undefined | State<string | undefined>;
        scrollPaddingLeft?: string | undefined | State<string | undefined>;
        scrollPaddingRight?: string | undefined | State<string | undefined>;
        scrollPaddingTop?: string | undefined | State<string | undefined>;
        scrollSnapAlign?: string | undefined | State<string | undefined>;
        scrollSnapStop?: string | undefined | State<string | undefined>;
        scrollSnapType?: string | undefined | State<string | undefined>;
        scrollbarColor?: string | undefined | State<string | undefined>;
        scrollbarGutter?: string | undefined | State<string | undefined>;
        scrollbarWidth?: string | undefined | State<string | undefined>;
        shapeImageThreshold?: string | undefined | State<string | undefined>;
        shapeMargin?: string | undefined | State<string | undefined>;
        shapeOutside?: string | undefined | State<string | undefined>;
        shapeRendering?: string | undefined | State<string | undefined>;
        stopColor?: string | undefined | State<string | undefined>;
        stopOpacity?: string | undefined | State<string | undefined>;
        stroke?: string | undefined | State<string | undefined>;
        strokeDasharray?: string | undefined | State<string | undefined>;
        strokeDashoffset?: string | undefined | State<string | undefined>;
        strokeLinecap?: string | undefined | State<string | undefined>;
        strokeLinejoin?: string | undefined | State<string | undefined>;
        strokeMiterlimit?: string | undefined | State<string | undefined>;
        strokeOpacity?: string | undefined | State<string | undefined>;
        strokeWidth?: string | undefined | State<string | undefined>;
        tabSize?: string | undefined | State<string | undefined>;
        tableLayout?: string | undefined | State<string | undefined>;
        textAlign?: string | undefined | State<string | undefined>;
        textAlignLast?: string | undefined | State<string | undefined>;
        textAnchor?: string | undefined | State<string | undefined>;
        textCombineUpright?: string | undefined | State<string | undefined>;
        textDecoration?: string | undefined | State<string | undefined>;
        textDecorationColor?: string | undefined | State<string | undefined>;
        textDecorationLine?: string | undefined | State<string | undefined>;
        textDecorationSkipInk?: string | undefined | State<string | undefined>;
        textDecorationStyle?: string | undefined | State<string | undefined>;
        textDecorationThickness?: string | undefined | State<string | undefined>;
        textEmphasis?: string | undefined | State<string | undefined>;
        textEmphasisColor?: string | undefined | State<string | undefined>;
        textEmphasisPosition?: string | undefined | State<string | undefined>;
        textEmphasisStyle?: string | undefined | State<string | undefined>;
        textIndent?: string | undefined | State<string | undefined>;
        textOrientation?: string | undefined | State<string | undefined>;
        textOverflow?: string | undefined | State<string | undefined>;
        textRendering?: string | undefined | State<string | undefined>;
        textShadow?: string | undefined | State<string | undefined>;
        textTransform?: string | undefined | State<string | undefined>;
        textUnderlineOffset?: string | undefined | State<string | undefined>;
        textUnderlinePosition?: string | undefined | State<string | undefined>;
        textWrap?: string | undefined | State<string | undefined>;
        top?: string | undefined | State<string | undefined>;
        touchAction?: string | undefined | State<string | undefined>;
        transform?: string | undefined | State<string | undefined>;
        transformBox?: string | undefined | State<string | undefined>;
        transformOrigin?: string | undefined | State<string | undefined>;
        transformStyle?: string | undefined | State<string | undefined>;
        transition?: string | undefined | State<string | undefined>;
        transitionDelay?: string | undefined | State<string | undefined>;
        transitionDuration?: string | undefined | State<string | undefined>;
        transitionProperty?: string | undefined | State<string | undefined>;
        transitionTimingFunction?: string | undefined | State<string | undefined>;
        translate?: string | undefined | State<string | undefined>;
        unicodeBidi?: string | undefined | State<string | undefined>;
        userSelect?: string | undefined | State<string | undefined>;
        vectorEffect?: string | undefined | State<string | undefined>;
        verticalAlign?: string | undefined | State<string | undefined>;
        visibility?: string | undefined | State<string | undefined>;
        webkitAlignContent?: string | undefined | State<string | undefined>;
        webkitAlignItems?: string | undefined | State<string | undefined>;
        webkitAlignSelf?: string | undefined | State<string | undefined>;
        webkitAnimation?: string | undefined | State<string | undefined>;
        webkitAnimationDelay?: string | undefined | State<string | undefined>;
        webkitAnimationDirection?: string | undefined | State<string | undefined>;
        webkitAnimationDuration?: string | undefined | State<string | undefined>;
        webkitAnimationFillMode?: string | undefined | State<string | undefined>;
        webkitAnimationIterationCount?: string | undefined | State<string | undefined>;
        webkitAnimationName?: string | undefined | State<string | undefined>;
        webkitAnimationPlayState?: string | undefined | State<string | undefined>;
        webkitAnimationTimingFunction?: string | undefined | State<string | undefined>;
        webkitAppearance?: string | undefined | State<string | undefined>;
        webkitBackfaceVisibility?: string | undefined | State<string | undefined>;
        webkitBackgroundClip?: string | undefined | State<string | undefined>;
        webkitBackgroundOrigin?: string | undefined | State<string | undefined>;
        webkitBackgroundSize?: string | undefined | State<string | undefined>;
        webkitBorderBottomLeftRadius?: string | undefined | State<string | undefined>;
        webkitBorderBottomRightRadius?: string | undefined | State<string | undefined>;
        webkitBorderRadius?: string | undefined | State<string | undefined>;
        webkitBorderTopLeftRadius?: string | undefined | State<string | undefined>;
        webkitBorderTopRightRadius?: string | undefined | State<string | undefined>;
        webkitBoxAlign?: string | undefined | State<string | undefined>;
        webkitBoxFlex?: string | undefined | State<string | undefined>;
        webkitBoxOrdinalGroup?: string | undefined | State<string | undefined>;
        webkitBoxOrient?: string | undefined | State<string | undefined>;
        webkitBoxPack?: string | undefined | State<string | undefined>;
        webkitBoxShadow?: string | undefined | State<string | undefined>;
        webkitBoxSizing?: string | undefined | State<string | undefined>;
        webkitFilter?: string | undefined | State<string | undefined>;
        webkitFlex?: string | undefined | State<string | undefined>;
        webkitFlexBasis?: string | undefined | State<string | undefined>;
        webkitFlexDirection?: string | undefined | State<string | undefined>;
        webkitFlexFlow?: string | undefined | State<string | undefined>;
        webkitFlexGrow?: string | undefined | State<string | undefined>;
        webkitFlexShrink?: string | undefined | State<string | undefined>;
        webkitFlexWrap?: string | undefined | State<string | undefined>;
        webkitJustifyContent?: string | undefined | State<string | undefined>;
        webkitLineClamp?: string | undefined | State<string | undefined>;
        webkitMask?: string | undefined | State<string | undefined>;
        webkitMaskBoxImage?: string | undefined | State<string | undefined>;
        webkitMaskBoxImageOutset?: string | undefined | State<string | undefined>;
        webkitMaskBoxImageRepeat?: string | undefined | State<string | undefined>;
        webkitMaskBoxImageSlice?: string | undefined | State<string | undefined>;
        webkitMaskBoxImageSource?: string | undefined | State<string | undefined>;
        webkitMaskBoxImageWidth?: string | undefined | State<string | undefined>;
        webkitMaskClip?: string | undefined | State<string | undefined>;
        webkitMaskComposite?: string | undefined | State<string | undefined>;
        webkitMaskImage?: string | undefined | State<string | undefined>;
        webkitMaskOrigin?: string | undefined | State<string | undefined>;
        webkitMaskPosition?: string | undefined | State<string | undefined>;
        webkitMaskRepeat?: string | undefined | State<string | undefined>;
        webkitMaskSize?: string | undefined | State<string | undefined>;
        webkitOrder?: string | undefined | State<string | undefined>;
        webkitPerspective?: string | undefined | State<string | undefined>;
        webkitPerspectiveOrigin?: string | undefined | State<string | undefined>;
        webkitTextFillColor?: string | undefined | State<string | undefined>;
        webkitTextSizeAdjust?: string | undefined | State<string | undefined>;
        webkitTextStroke?: string | undefined | State<string | undefined>;
        webkitTextStrokeColor?: string | undefined | State<string | undefined>;
        webkitTextStrokeWidth?: string | undefined | State<string | undefined>;
        webkitTransform?: string | undefined | State<string | undefined>;
        webkitTransformOrigin?: string | undefined | State<string | undefined>;
        webkitTransformStyle?: string | undefined | State<string | undefined>;
        webkitTransition?: string | undefined | State<string | undefined>;
        webkitTransitionDelay?: string | undefined | State<string | undefined>;
        webkitTransitionDuration?: string | undefined | State<string | undefined>;
        webkitTransitionProperty?: string | undefined | State<string | undefined>;
        webkitTransitionTimingFunction?: string | undefined | State<string | undefined>;
        webkitUserSelect?: string | undefined | State<string | undefined>;
        whiteSpace?: string | undefined | State<string | undefined>;
        widows?: string | undefined | State<string | undefined>;
        width?: string | undefined | State<string | undefined>;
        willChange?: string | undefined | State<string | undefined>;
        wordBreak?: string | undefined | State<string | undefined>;
        wordSpacing?: string | undefined | State<string | undefined>;
        wordWrap?: string | undefined | State<string | undefined>;
        writingMode?: string | undefined | State<string | undefined>;
        x?: string | undefined | State<string | undefined>;
        y?: string | undefined | State<string | undefined>;
        zIndex?: string | undefined | State<string | undefined>;
    }

    interface ElementContentEditable {
        contentEditable?: string | undefined | State<string | undefined>;
        enterKeyHint?: string | undefined | State<string | undefined>;
        inputMode?: string | undefined | State<string | undefined>;
    }

    interface GlobalEventHandlers {
        onabort?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined>;
        onanimationcancel?: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined>;
        onanimationend?: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined>;
        onanimationiteration?: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined>;
        onanimationstart?: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null | undefined>;
        onauxclick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onbeforeinput?: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: InputEvent) => any) | null | undefined>;
        onbeforetoggle?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onblur?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined>;
        oncancel?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        oncanplay?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        oncanplaythrough?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onchange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onclick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onclose?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        oncontextmenu?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        oncopy?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined>;
        oncuechange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        oncut?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined>;
        ondblclick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        ondrag?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined>;
        ondragend?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined>;
        ondragenter?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined>;
        ondragleave?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined>;
        ondragover?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined>;
        ondragstart?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined>;
        ondrop?: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: DragEvent) => any) | null | undefined>;
        ondurationchange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onemptied?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onended?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onerror?: OnErrorEventHandler | undefined | State<OnErrorEventHandler | undefined>;
        onfocus?: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: FocusEvent) => any) | null | undefined>;
        onformdata?: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null | undefined>;
        ongotpointercapture?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        oninput?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        oninvalid?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onkeydown?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined>;
        onkeypress?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined>;
        onkeyup?: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null | undefined>;
        onload?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onloadeddata?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onloadedmetadata?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onloadstart?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onlostpointercapture?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onmousedown?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onmouseenter?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onmouseleave?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onmousemove?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onmouseout?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onmouseover?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onmouseup?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined>;
        onpaste?: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null | undefined>;
        onpause?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onplay?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onplaying?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onpointercancel?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onpointerdown?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onpointerenter?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onpointerleave?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onpointermove?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onpointerout?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onpointerover?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onpointerup?: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: PointerEvent) => any) | null | undefined>;
        onprogress?: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null | undefined>;
        onratechange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onreset?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onresize?: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: UIEvent) => any) | null | undefined>;
        onscroll?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onscrollend?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onsecuritypolicyviolation?: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null | undefined>;
        onseeked?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onseeking?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onselect?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onselectionchange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onselectstart?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onslotchange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onstalled?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onsubmit?: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null | undefined>;
        onsuspend?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        ontimeupdate?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        ontoggle?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined>;
        ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined>;
        ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined>;
        ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined>;
        ontransitioncancel?: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined>;
        ontransitionend?: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined>;
        ontransitionrun?: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined>;
        ontransitionstart?: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null | undefined>;
        onvolumechange?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onwaiting?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onwebkitanimationend?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onwebkitanimationiteration?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onwebkitanimationstart?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onwebkittransitionend?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: Event) => any) | null | undefined>;
        onwheel?: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined | State<((this: GlobalEventHandlers, ev: WheelEvent) => any) | null | undefined>;
    }

    interface HTMLHyperlinkElementUtils {
        hash?: string | undefined | State<string | undefined>;
        host?: string | undefined | State<string | undefined>;
        hostname?: string | undefined | State<string | undefined>;
        href?: string | undefined | State<string | undefined>;
        password?: string | undefined | State<string | undefined>;
        pathname?: string | undefined | State<string | undefined>;
        port?: string | undefined | State<string | undefined>;
        protocol?: string | undefined | State<string | undefined>;
        search?: string | undefined | State<string | undefined>;
        username?: string | undefined | State<string | undefined>;
    }

    interface WindowEventHandlers {
        onafterprint?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined | State<((this: WindowEventHandlers, ev: Event) => any) | null | undefined>;
        onbeforeprint?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined | State<((this: WindowEventHandlers, ev: Event) => any) | null | undefined>;
        onbeforeunload?: ((this: WindowEventHandlers, ev: BeforeUnloadEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: BeforeUnloadEvent) => any) | null | undefined>;
        ongamepadconnected?: ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | undefined>;
        ongamepaddisconnected?: ((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: GamepadEvent) => any) | null | undefined>;
        onhashchange?: ((this: WindowEventHandlers, ev: HashChangeEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: HashChangeEvent) => any) | null | undefined>;
        onlanguagechange?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined | State<((this: WindowEventHandlers, ev: Event) => any) | null | undefined>;
        onmessage?: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: MessageEvent) => any) | null | undefined>;
        onmessageerror?: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: MessageEvent) => any) | null | undefined>;
        onoffline?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined | State<((this: WindowEventHandlers, ev: Event) => any) | null | undefined>;
        ononline?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined | State<((this: WindowEventHandlers, ev: Event) => any) | null | undefined>;
        onpagehide?: ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | undefined>;
        onpageshow?: ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null | undefined>;
        onpopstate?: ((this: WindowEventHandlers, ev: PopStateEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: PopStateEvent) => any) | null | undefined>;
        onrejectionhandled?: ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | undefined>;
        onstorage?: ((this: WindowEventHandlers, ev: StorageEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: StorageEvent) => any) | null | undefined>;
        onunhandledrejection?: ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | undefined | State<((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null | undefined>;
        onunload?: ((this: WindowEventHandlers, ev: Event) => any) | null | undefined | State<((this: WindowEventHandlers, ev: Event) => any) | null | undefined>;
    }

    interface PopoverInvokerElement {
        popoverTargetAction?: string | undefined | State<string | undefined>;
        popoverTargetElement?: Element | null | undefined | State<Element | null | undefined>;
    }

    interface FileList { }

    interface LinkStyle { }

    interface SVGTests { }

    interface SVGURIReference { }

    interface SVGFilterPrimitiveStandardAttributes { }

    interface SVGFitToViewBox { }

    interface SVGAnimatedPoints { }
}
