type StateGroup = Record<string, State<any>>;

type StaticGroup<T extends StateGroup> = State<{
    [K in keyof T]: T[K] extends State<infer U> ? U : never;
}>;

export type Sub<T> = (current: T, previous: T) => void | Promise<void>;

export type Collector = Sub<any>[];

export class State<T> {
    constructor(value: T);
    value: T;
    static use<T extends StateGroup>(states: T): StaticGroup<T>;
    set(f: (current: T) => T): void;
    as<C>(f: (value: T) => C, collector?: Collector): State<C>;
    sub<F extends Sub<T>>(f: F, collector?: Collector): F;
    unsub<F extends Sub<T>>(f: F): void;
}

export function createNode<P>(props: P): DOMNode<P>;

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
    P extends string | number | false | null ? Text :
    Node;

export type MiniChildren = MiniNode[] | State<MiniNode[]>;

export type MiniNode =
    | Mini.Element
    | Node
    | string | number | false | null | undefined
    | State<
        | Mini.Element
        | Node
        | string | number | false | null | undefined
    >;

export type MiniDataset = {
    [key: string]: string | number | false | null | undefined | State<string | number | false | null | undefined>;
} | State<{
    [key: string]: string | number | false | null | undefined | State<string | number | false | null | undefined>;
}>;

export declare namespace Mini {
    interface HTMLAnchorElement extends HTMLElement, HTMLHyperlinkElementUtils {
        tagName: "a";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLElement extends Element, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
        tagName: "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "search" | "section" | "select" | "slot" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLOrSVGElement {
        autofocus?: boolean | State<boolean>;
        nonce?: string | State<string>;
        tabIndex?: number | State<number>;
    }

    interface HTMLAreaElement extends HTMLElement, HTMLHyperlinkElementUtils {
        tagName: "area";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLAudioElement extends HTMLMediaElement {
        tagName: "audio";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
    }

    interface HTMLMediaElement extends HTMLElement {
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

    interface HTMLBaseElement extends HTMLElement {
        tagName: "base";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        href?: string | State<string>;
        target?: string | State<string>;
    }

    interface HTMLQuoteElement extends HTMLElement {
        tagName: "blockquote" | "q";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        cite?: string | State<string>;
    }

    interface HTMLBodyElement extends HTMLElement, WindowEventHandlers {
        tagName: "body";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        aLink?: string | State<string>;
        background?: string | State<string>;
        bgColor?: string | State<string>;
        link?: string | State<string>;
        text?: string | State<string>;
        vLink?: string | State<string>;
    }

    interface HTMLBRElement extends HTMLElement {
        tagName: "br";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        clear?: string | State<string>;
    }

    interface HTMLButtonElement extends HTMLElement, PopoverInvokerElement {
        tagName: "button";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLCanvasElement extends HTMLElement {
        tagName: "canvas";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        height?: number | State<number>;
        width?: number | State<number>;
    }

    interface HTMLTableCaptionElement extends HTMLElement {
        tagName: "caption";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
    }

    interface HTMLTableColElement extends HTMLElement {
        tagName: "col" | "colgroup";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
        ch?: string | State<string>;
        chOff?: string | State<string>;
        span?: number | State<number>;
        vAlign?: string | State<string>;
        width?: string | State<string>;
    }

    interface HTMLDataElement extends HTMLElement {
        tagName: "data";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        value?: string | State<string>;
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
        cite?: string | State<string>;
        dateTime?: string | State<string>;
    }

    interface HTMLDetailsElement extends HTMLElement {
        tagName: "details";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        name?: string | State<string>;
        open?: boolean | State<boolean>;
    }

    interface HTMLDialogElement extends HTMLElement {
        tagName: "dialog";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        open?: boolean | State<boolean>;
        returnValue?: string | State<string>;
    }

    interface HTMLDivElement extends HTMLElement {
        tagName: "div";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
    }

    interface HTMLDListElement extends HTMLElement {
        tagName: "dl";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        compact?: boolean | State<boolean>;
    }

    interface HTMLEmbedElement extends HTMLElement {
        tagName: "embed";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
        height?: string | State<string>;
        name?: string | State<string>;
        src?: string | State<string>;
        type?: string | State<string>;
        width?: string | State<string>;
    }

    interface HTMLFieldSetElement extends HTMLElement {
        tagName: "fieldset";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disabled?: boolean | State<boolean>;
        name?: string | State<string>;
    }

    interface HTMLFormElement extends HTMLElement {
        tagName: "form";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLHeadingElement extends HTMLElement {
        tagName: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
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
        align?: string | State<string>;
        color?: string | State<string>;
        noShade?: boolean | State<boolean>;
        size?: string | State<string>;
        width?: string | State<string>;
    }

    interface HTMLHtmlElement extends HTMLElement {
        tagName: "html";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        version?: string | State<string>;
    }

    interface HTMLIFrameElement extends HTMLElement {
        tagName: "iframe";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLImageElement extends HTMLElement {
        tagName: "img";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLInputElement extends HTMLElement, PopoverInvokerElement {
        tagName: "input";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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
        files?: FileList | null | State<FileList | null>;
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

    interface HTMLLabelElement extends HTMLElement {
        tagName: "label";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        htmlFor?: string | State<string>;
    }

    interface HTMLLegendElement extends HTMLElement {
        tagName: "legend";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
    }

    interface HTMLLIElement extends HTMLElement {
        tagName: "li";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        type?: string | State<string>;
        value?: number | State<number>;
    }

    interface HTMLLinkElement extends HTMLElement, LinkStyle {
        tagName: "link";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLMapElement extends HTMLElement {
        tagName: "map";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        name?: string | State<string>;
    }

    interface HTMLMenuElement extends HTMLElement {
        tagName: "menu";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        compact?: boolean | State<boolean>;
    }

    interface HTMLMetaElement extends HTMLElement {
        tagName: "meta";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        content?: string | State<string>;
        httpEquiv?: string | State<string>;
        media?: string | State<string>;
        name?: string | State<string>;
        scheme?: string | State<string>;
    }

    interface HTMLMeterElement extends HTMLElement {
        tagName: "meter";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        high?: number | State<number>;
        low?: number | State<number>;
        max?: number | State<number>;
        min?: number | State<number>;
        optimum?: number | State<number>;
        value?: number | State<number>;
    }

    interface HTMLObjectElement extends HTMLElement {
        tagName: "object";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLOListElement extends HTMLElement {
        tagName: "ol";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        compact?: boolean | State<boolean>;
        reversed?: boolean | State<boolean>;
        start?: number | State<number>;
        type?: string | State<string>;
    }

    interface HTMLOptGroupElement extends HTMLElement {
        tagName: "optgroup";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disabled?: boolean | State<boolean>;
        label?: string | State<string>;
    }

    interface HTMLOptionElement extends HTMLElement {
        tagName: "option";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        defaultSelected?: boolean | State<boolean>;
        disabled?: boolean | State<boolean>;
        label?: string | State<string>;
        selected?: boolean | State<boolean>;
        text?: string | State<string>;
        value?: string | State<string>;
    }

    interface HTMLOutputElement extends HTMLElement {
        tagName: "output";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        defaultValue?: string | State<string>;
        name?: string | State<string>;
        value?: string | State<string>;
    }

    interface HTMLParagraphElement extends HTMLElement {
        tagName: "p";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
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
        width?: number | State<number>;
    }

    interface HTMLProgressElement extends HTMLElement {
        tagName: "progress";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        max?: number | State<number>;
        value?: number | State<number>;
    }

    interface HTMLScriptElement extends HTMLElement {
        tagName: "script";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLSelectElement extends HTMLElement {
        tagName: "select";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLSlotElement extends HTMLElement {
        tagName: "slot";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        name?: string | State<string>;
    }

    interface HTMLSourceElement extends HTMLElement {
        tagName: "source";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        height?: number | State<number>;
        media?: string | State<string>;
        sizes?: string | State<string>;
        src?: string | State<string>;
        srcset?: string | State<string>;
        type?: string | State<string>;
        width?: number | State<number>;
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
        disabled?: boolean | State<boolean>;
        media?: string | State<string>;
        type?: string | State<string>;
    }

    interface HTMLTableElement extends HTMLElement {
        tagName: "table";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
        bgColor?: string | State<string>;
        border?: string | State<string>;
        caption?: HTMLTableCaptionElement | null | State<HTMLTableCaptionElement | null>;
        cellPadding?: string | State<string>;
        cellSpacing?: string | State<string>;
        frame?: string | State<string>;
        rules?: string | State<string>;
        summary?: string | State<string>;
        tFoot?: HTMLTableSectionElement | null | State<HTMLTableSectionElement | null>;
        tHead?: HTMLTableSectionElement | null | State<HTMLTableSectionElement | null>;
        width?: string | State<string>;
    }

    interface HTMLTableSectionElement extends HTMLElement {
        tagName: "tbody" | "tfoot" | "thead";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
        ch?: string | State<string>;
        chOff?: string | State<string>;
        vAlign?: string | State<string>;
    }

    interface HTMLTableCellElement extends HTMLElement {
        tagName: "td" | "th";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLTemplateElement extends HTMLElement {
        tagName: "template";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        shadowRootMode?: string | State<string>;
    }

    interface HTMLTextAreaElement extends HTMLElement {
        tagName: "textarea";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
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

    interface HTMLTimeElement extends HTMLElement {
        tagName: "time";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        dateTime?: string | State<string>;
    }

    interface HTMLTitleElement extends HTMLElement {
        tagName: "title";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        text?: string | State<string>;
    }

    interface HTMLTableRowElement extends HTMLElement {
        tagName: "tr";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        align?: string | State<string>;
        bgColor?: string | State<string>;
        ch?: string | State<string>;
        chOff?: string | State<string>;
        vAlign?: string | State<string>;
    }

    interface HTMLTrackElement extends HTMLElement {
        tagName: "track";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        default?: boolean | State<boolean>;
        kind?: string | State<string>;
        label?: string | State<string>;
        src?: string | State<string>;
        srclang?: string | State<string>;
    }

    interface HTMLUListElement extends HTMLElement {
        tagName: "ul";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        compact?: boolean | State<boolean>;
        type?: string | State<string>;
    }

    interface HTMLVideoElement extends HTMLMediaElement {
        tagName: "video";
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniChildren;
        dataset?: MiniDataset;
        disablePictureInPicture?: boolean | State<boolean>;
        height?: number | State<number>;
        onenterpictureinpicture?: ((this: HTMLVideoElement, ev: Event) => any) | null | State<((this: HTMLVideoElement, ev: Event) => any) | null>;
        onleavepictureinpicture?: ((this: HTMLVideoElement, ev: Event) => any) | null | State<((this: HTMLVideoElement, ev: Event) => any) | null>;
        playsInline?: boolean | State<boolean>;
        poster?: string | State<string>;
        width?: number | State<number>;
    }

    interface SVGAElement extends SVGGraphicsElement, SVGURIReference {
        tagName: "a";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
        rel?: string | State<string>;
    }

    interface SVGGraphicsElement extends SVGElement, SVGTests { }

    interface SVGElement extends Element, ElementCSSInlineStyle, GlobalEventHandlers, HTMLOrSVGElement {
        tagName: "a" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "script" | "set" | "stop" | "style" | "svg" | "switch" | "symbol" | "text" | "textPath" | "title" | "tspan" | "use" | "view";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
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
        crossOrigin?: string | null | State<string | null>;
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
        type?: string | State<string>;
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
        disabled?: boolean | State<boolean>;
        media?: string | State<string>;
        title?: string | State<string>;
        type?: string | State<string>;
    }

    interface SVGSVGElement extends SVGGraphicsElement, SVGFitToViewBox, WindowEventHandlers {
        tagName: "svg";
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniChildren;
        dataset?: MiniDataset;
        currentScale?: number | State<number>;
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
        className?: string | State<string>;
        id?: string | State<string>;
        onfullscreenchange?: ((this: Element, ev: Event) => any) | null | State<((this: Element, ev: Event) => any) | null>;
        onfullscreenerror?: ((this: Element, ev: Event) => any) | null | State<((this: Element, ev: Event) => any) | null>;
        outerHTML?: string | State<string>;
        scrollLeft?: number | State<number>;
        scrollTop?: number | State<number>;
        slot?: string | State<string>;
    }

    interface Node extends EventTarget {
        nodeValue?: string | null | State<string | null>;
        textContent?: string | null | State<string | null>;
    }

    interface EventTarget { }

    interface ARIAMixin {
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

    interface Animatable { }

    interface ChildNode extends Node { }

    interface InnerHTML {
        innerHTML?: string | State<string>;
    }

    interface NonDocumentTypeChildNode { }

    interface ParentNode extends Node { }

    interface Slottable { }

    interface ElementCSSInlineStyle {
        style?: CSSStyleDeclaration | State<CSSStyleDeclaration>;
    }

    interface CSSStyleDeclaration {
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

    interface ElementContentEditable {
        contentEditable?: string | State<string>;
        enterKeyHint?: string | State<string>;
        inputMode?: string | State<string>;
    }

    interface GlobalEventHandlers {
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

    interface HTMLHyperlinkElementUtils {
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

    interface WindowEventHandlers {
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

    interface PopoverInvokerElement {
        popoverTargetAction?: string | State<string>;
        popoverTargetElement?: Element | null | State<Element | null>;
    }

    interface FileList { }

    interface LinkStyle { }

    interface SVGTests { }

    interface SVGURIReference { }

    interface SVGFilterPrimitiveStandardAttributes { }

    interface SVGFitToViewBox { }

    interface SVGAnimatedPoints { }
}

export declare namespace MiniX {
    export interface IntrinsicElements {
        "a": HTMLAnchorElement | SVGAElement;
        "abbr": HTMLElement;
        "address": HTMLElement;
        "article": HTMLElement;
        "aside": HTMLElement;
        "b": HTMLElement;
        "bdi": HTMLElement;
        "bdo": HTMLElement;
        "cite": HTMLElement;
        "code": HTMLElement;
        "dd": HTMLElement;
        "dfn": HTMLElement;
        "dt": HTMLElement;
        "em": HTMLElement;
        "figcaption": HTMLElement;
        "figure": HTMLElement;
        "footer": HTMLElement;
        "header": HTMLElement;
        "hgroup": HTMLElement;
        "i": HTMLElement;
        "kbd": HTMLElement;
        "main": HTMLElement;
        "mark": HTMLElement;
        "nav": HTMLElement;
        "noscript": HTMLElement;
        "rp": HTMLElement;
        "rt": HTMLElement;
        "ruby": HTMLElement;
        "s": HTMLElement;
        "samp": HTMLElement;
        "search": HTMLElement;
        "section": HTMLElement;
        "small": HTMLElement;
        "strong": HTMLElement;
        "sub": HTMLElement;
        "summary": HTMLElement;
        "sup": HTMLElement;
        "u": HTMLElement;
        "var": HTMLElement;
        "wbr": HTMLElement;
        "area": HTMLAreaElement;
        "audio": HTMLAudioElement;
        "base": HTMLBaseElement;
        "blockquote": HTMLQuoteElement;
        "q": HTMLQuoteElement;
        "body": HTMLBodyElement;
        "br": HTMLBRElement;
        "button": HTMLButtonElement;
        "canvas": HTMLCanvasElement;
        "caption": HTMLTableCaptionElement;
        "col": HTMLTableColElement;
        "colgroup": HTMLTableColElement;
        "data": HTMLDataElement;
        "datalist": HTMLDataListElement;
        "del": HTMLModElement;
        "ins": HTMLModElement;
        "details": HTMLDetailsElement;
        "dialog": HTMLDialogElement;
        "div": HTMLDivElement;
        "dl": HTMLDListElement;
        "embed": HTMLEmbedElement;
        "fieldset": HTMLFieldSetElement;
        "form": HTMLFormElement;
        "h1": HTMLHeadingElement;
        "h2": HTMLHeadingElement;
        "h3": HTMLHeadingElement;
        "h4": HTMLHeadingElement;
        "h5": HTMLHeadingElement;
        "h6": HTMLHeadingElement;
        "head": HTMLHeadElement;
        "hr": HTMLHRElement;
        "html": HTMLHtmlElement;
        "iframe": HTMLIFrameElement;
        "img": HTMLImageElement;
        "input": HTMLInputElement;
        "label": HTMLLabelElement;
        "legend": HTMLLegendElement;
        "li": HTMLLIElement;
        "link": HTMLLinkElement;
        "map": HTMLMapElement;
        "menu": HTMLMenuElement;
        "meta": HTMLMetaElement;
        "meter": HTMLMeterElement;
        "object": HTMLObjectElement;
        "ol": HTMLOListElement;
        "optgroup": HTMLOptGroupElement;
        "option": HTMLOptionElement;
        "output": HTMLOutputElement;
        "p": HTMLParagraphElement;
        "picture": HTMLPictureElement;
        "pre": HTMLPreElement;
        "progress": HTMLProgressElement;
        "script": HTMLScriptElement | SVGScriptElement;
        "select": HTMLSelectElement;
        "slot": HTMLSlotElement;
        "source": HTMLSourceElement;
        "span": HTMLSpanElement;
        "style": HTMLStyleElement | SVGStyleElement;
        "table": HTMLTableElement;
        "tbody": HTMLTableSectionElement;
        "tfoot": HTMLTableSectionElement;
        "thead": HTMLTableSectionElement;
        "td": HTMLTableCellElement;
        "th": HTMLTableCellElement;
        "template": HTMLTemplateElement;
        "textarea": HTMLTextAreaElement;
        "time": HTMLTimeElement;
        "title": HTMLTitleElement | SVGTitleElement;
        "tr": HTMLTableRowElement;
        "track": HTMLTrackElement;
        "ul": HTMLUListElement;
        "video": HTMLVideoElement;
        "animate": SVGAnimateElement;
        "animateMotion": SVGAnimateMotionElement;
        "animateTransform": SVGAnimateTransformElement;
        "circle": SVGCircleElement;
        "clipPath": SVGClipPathElement;
        "defs": SVGDefsElement;
        "desc": SVGDescElement;
        "ellipse": SVGEllipseElement;
        "feBlend": SVGFEBlendElement;
        "feColorMatrix": SVGFEColorMatrixElement;
        "feComponentTransfer": SVGFEComponentTransferElement;
        "feComposite": SVGFECompositeElement;
        "feConvolveMatrix": SVGFEConvolveMatrixElement;
        "feDiffuseLighting": SVGFEDiffuseLightingElement;
        "feDisplacementMap": SVGFEDisplacementMapElement;
        "feDistantLight": SVGFEDistantLightElement;
        "feDropShadow": SVGFEDropShadowElement;
        "feFlood": SVGFEFloodElement;
        "feFuncA": SVGFEFuncAElement;
        "feFuncB": SVGFEFuncBElement;
        "feFuncG": SVGFEFuncGElement;
        "feFuncR": SVGFEFuncRElement;
        "feGaussianBlur": SVGFEGaussianBlurElement;
        "feImage": SVGFEImageElement;
        "feMerge": SVGFEMergeElement;
        "feMergeNode": SVGFEMergeNodeElement;
        "feMorphology": SVGFEMorphologyElement;
        "feOffset": SVGFEOffsetElement;
        "fePointLight": SVGFEPointLightElement;
        "feSpecularLighting": SVGFESpecularLightingElement;
        "feSpotLight": SVGFESpotLightElement;
        "feTile": SVGFETileElement;
        "feTurbulence": SVGFETurbulenceElement;
        "filter": SVGFilterElement;
        "foreignObject": SVGForeignObjectElement;
        "g": SVGGElement;
        "image": SVGImageElement;
        "line": SVGLineElement;
        "linearGradient": SVGLinearGradientElement;
        "marker": SVGMarkerElement;
        "mask": SVGMaskElement;
        "metadata": SVGMetadataElement;
        "mpath": SVGMPathElement;
        "path": SVGPathElement;
        "pattern": SVGPatternElement;
        "polygon": SVGPolygonElement;
        "polyline": SVGPolylineElement;
        "radialGradient": SVGRadialGradientElement;
        "rect": SVGRectElement;
        "set": SVGSetElement;
        "stop": SVGStopElement;
        "svg": SVGSVGElement;
        "switch": SVGSwitchElement;
        "symbol": SVGSymbolElement;
        "text": SVGTextElement;
        "textPath": SVGTextPathElement;
        "tspan": SVGTSpanElement;
        "use": SVGUseElement;
        "view": SVGViewElement;
        "annotation": MathMLElement;
        "annotation-xml": MathMLElement;
        "maction": MathMLElement;
        "math": MathMLElement;
        "merror": MathMLElement;
        "mfrac": MathMLElement;
        "mi": MathMLElement;
        "mmultiscripts": MathMLElement;
        "mn": MathMLElement;
        "mo": MathMLElement;
        "mover": MathMLElement;
        "mpadded": MathMLElement;
        "mphantom": MathMLElement;
        "mprescripts": MathMLElement;
        "mroot": MathMLElement;
        "mrow": MathMLElement;
        "ms": MathMLElement;
        "mspace": MathMLElement;
        "msqrt": MathMLElement;
        "mstyle": MathMLElement;
        "msub": MathMLElement;
        "msubsup": MathMLElement;
        "msup": MathMLElement;
        "mtable": MathMLElement;
        "mtd": MathMLElement;
        "mtext": MathMLElement;
        "mtr": MathMLElement;
        "munder": MathMLElement;
        "munderover": MathMLElement;
        "semantics": MathMLElement;
    }

    interface HTMLAnchorElement extends HTMLElement, HTMLHyperlinkElementUtils {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLElement extends Element, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLOrSVGElement {
        autofocus?: boolean | State<boolean>;
        nonce?: string | State<string>;
        tabIndex?: number | State<number>;
        [key: string]: any;
    }

    interface HTMLAreaElement extends HTMLElement, HTMLHyperlinkElementUtils {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLAudioElement extends HTMLMediaElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
    }

    interface HTMLMediaElement extends HTMLElement {
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

    interface HTMLBaseElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        href?: string | State<string>;
        target?: string | State<string>;
    }

    interface HTMLQuoteElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        cite?: string | State<string>;
    }

    interface HTMLBodyElement extends HTMLElement, WindowEventHandlers {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        aLink?: string | State<string>;
        background?: string | State<string>;
        bgColor?: string | State<string>;
        link?: string | State<string>;
        text?: string | State<string>;
        vLink?: string | State<string>;
    }

    interface HTMLBRElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        clear?: string | State<string>;
    }

    interface HTMLButtonElement extends HTMLElement, PopoverInvokerElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLCanvasElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        height?: number | State<number>;
        width?: number | State<number>;
    }

    interface HTMLTableCaptionElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
    }

    interface HTMLTableColElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
        ch?: string | State<string>;
        chOff?: string | State<string>;
        span?: number | State<number>;
        vAlign?: string | State<string>;
        width?: string | State<string>;
    }

    interface HTMLDataElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        value?: string | State<string>;
    }

    interface HTMLDataListElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
    }

    interface HTMLModElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        cite?: string | State<string>;
        dateTime?: string | State<string>;
    }

    interface HTMLDetailsElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        name?: string | State<string>;
        open?: boolean | State<boolean>;
    }

    interface HTMLDialogElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        open?: boolean | State<boolean>;
        returnValue?: string | State<string>;
    }

    interface HTMLDivElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
    }

    interface HTMLDListElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        compact?: boolean | State<boolean>;
    }

    interface HTMLEmbedElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
        height?: string | State<string>;
        name?: string | State<string>;
        src?: string | State<string>;
        type?: string | State<string>;
        width?: string | State<string>;
    }

    interface HTMLFieldSetElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        disabled?: boolean | State<boolean>;
        name?: string | State<string>;
    }

    interface HTMLFormElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLHeadingElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
    }

    interface HTMLHeadElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
    }

    interface HTMLHRElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
        color?: string | State<string>;
        noShade?: boolean | State<boolean>;
        size?: string | State<string>;
        width?: string | State<string>;
    }

    interface HTMLHtmlElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        version?: string | State<string>;
    }

    interface HTMLIFrameElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLImageElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLInputElement extends HTMLElement, PopoverInvokerElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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
        files?: FileList | null | State<FileList | null>;
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

    interface HTMLLabelElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        htmlFor?: string | State<string>;
    }

    interface HTMLLegendElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
    }

    interface HTMLLIElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        type?: string | State<string>;
        value?: number | State<number>;
    }

    interface HTMLLinkElement extends HTMLElement, LinkStyle {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLMapElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        name?: string | State<string>;
    }

    interface HTMLMenuElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        compact?: boolean | State<boolean>;
    }

    interface HTMLMetaElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        content?: string | State<string>;
        httpEquiv?: string | State<string>;
        media?: string | State<string>;
        name?: string | State<string>;
        scheme?: string | State<string>;
    }

    interface HTMLMeterElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        high?: number | State<number>;
        low?: number | State<number>;
        max?: number | State<number>;
        min?: number | State<number>;
        optimum?: number | State<number>;
        value?: number | State<number>;
    }

    interface HTMLObjectElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLOListElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        compact?: boolean | State<boolean>;
        reversed?: boolean | State<boolean>;
        start?: number | State<number>;
        type?: string | State<string>;
    }

    interface HTMLOptGroupElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        disabled?: boolean | State<boolean>;
        label?: string | State<string>;
    }

    interface HTMLOptionElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        defaultSelected?: boolean | State<boolean>;
        disabled?: boolean | State<boolean>;
        label?: string | State<string>;
        selected?: boolean | State<boolean>;
        text?: string | State<string>;
        value?: string | State<string>;
    }

    interface HTMLOutputElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        defaultValue?: string | State<string>;
        name?: string | State<string>;
        value?: string | State<string>;
    }

    interface HTMLParagraphElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
    }

    interface HTMLPictureElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
    }

    interface HTMLPreElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        width?: number | State<number>;
    }

    interface HTMLProgressElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        max?: number | State<number>;
        value?: number | State<number>;
    }

    interface HTMLScriptElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLSelectElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLSlotElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        name?: string | State<string>;
    }

    interface HTMLSourceElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        height?: number | State<number>;
        media?: string | State<string>;
        sizes?: string | State<string>;
        src?: string | State<string>;
        srcset?: string | State<string>;
        type?: string | State<string>;
        width?: number | State<number>;
    }

    interface HTMLSpanElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
    }

    interface HTMLStyleElement extends HTMLElement, LinkStyle {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        disabled?: boolean | State<boolean>;
        media?: string | State<string>;
        type?: string | State<string>;
    }

    interface HTMLTableElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
        bgColor?: string | State<string>;
        border?: string | State<string>;
        caption?: HTMLTableCaptionElement | null | State<HTMLTableCaptionElement | null>;
        cellPadding?: string | State<string>;
        cellSpacing?: string | State<string>;
        frame?: string | State<string>;
        rules?: string | State<string>;
        summary?: string | State<string>;
        tFoot?: HTMLTableSectionElement | null | State<HTMLTableSectionElement | null>;
        tHead?: HTMLTableSectionElement | null | State<HTMLTableSectionElement | null>;
        width?: string | State<string>;
    }

    interface HTMLTableSectionElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
        ch?: string | State<string>;
        chOff?: string | State<string>;
        vAlign?: string | State<string>;
    }

    interface HTMLTableCellElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLTemplateElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        shadowRootMode?: string | State<string>;
    }

    interface HTMLTextAreaElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
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

    interface HTMLTimeElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        dateTime?: string | State<string>;
    }

    interface HTMLTitleElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        text?: string | State<string>;
    }

    interface HTMLTableRowElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        align?: string | State<string>;
        bgColor?: string | State<string>;
        ch?: string | State<string>;
        chOff?: string | State<string>;
        vAlign?: string | State<string>;
    }

    interface HTMLTrackElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        default?: boolean | State<boolean>;
        kind?: string | State<string>;
        label?: string | State<string>;
        src?: string | State<string>;
        srclang?: string | State<string>;
    }

    interface HTMLUListElement extends HTMLElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        compact?: boolean | State<boolean>;
        type?: string | State<string>;
    }

    interface HTMLVideoElement extends HTMLMediaElement {
        namespaceURI?: "http://www.w3.org/1999/xhtml";
        children?: MiniNode | MiniChildren;
        disablePictureInPicture?: boolean | State<boolean>;
        height?: number | State<number>;
        onenterpictureinpicture?: ((this: HTMLVideoElement, ev: Event) => any) | null | State<((this: HTMLVideoElement, ev: Event) => any) | null>;
        onleavepictureinpicture?: ((this: HTMLVideoElement, ev: Event) => any) | null | State<((this: HTMLVideoElement, ev: Event) => any) | null>;
        playsInline?: boolean | State<boolean>;
        poster?: string | State<string>;
        width?: number | State<number>;
    }

    interface SVGAElement extends SVGGraphicsElement, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        rel?: string | State<string>;
        [key: string]: any;
    }

    interface SVGGraphicsElement extends SVGElement, SVGTests {
        [key: string]: any;
    }

    interface SVGElement extends Element, ElementCSSInlineStyle, GlobalEventHandlers, HTMLOrSVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGAnimateElement extends SVGAnimationElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGAnimationElement extends SVGElement, SVGTests {
        [key: string]: any;
    }

    interface SVGAnimateMotionElement extends SVGAnimationElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGAnimateTransformElement extends SVGAnimationElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGCircleElement extends SVGGeometryElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGGeometryElement extends SVGGraphicsElement {
        [key: string]: any;
    }

    interface SVGClipPathElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGDefsElement extends SVGGraphicsElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGDescElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGEllipseElement extends SVGGeometryElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEBlendElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEColorMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEComponentTransferElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFECompositeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEConvolveMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEDiffuseLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEDisplacementMapElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEDistantLightElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEDropShadowElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEFloodElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEFuncAElement extends SVGComponentTransferFunctionElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGComponentTransferFunctionElement extends SVGElement {
        [key: string]: any;
    }

    interface SVGFEFuncBElement extends SVGComponentTransferFunctionElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEFuncGElement extends SVGComponentTransferFunctionElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEFuncRElement extends SVGComponentTransferFunctionElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEGaussianBlurElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEImageElement extends SVGElement, SVGFilterPrimitiveStandardAttributes, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEMergeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEMergeNodeElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEMorphologyElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEOffsetElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFEPointLightElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFESpecularLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFESpotLightElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFETileElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFETurbulenceElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGFilterElement extends SVGElement, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGForeignObjectElement extends SVGGraphicsElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGGElement extends SVGGraphicsElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGImageElement extends SVGGraphicsElement, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        crossOrigin?: string | null | State<string | null>;
        [key: string]: any;
    }

    interface SVGLineElement extends SVGGeometryElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGLinearGradientElement extends SVGGradientElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGGradientElement extends SVGElement, SVGURIReference {
        [key: string]: any;
    }

    interface SVGMarkerElement extends SVGElement, SVGFitToViewBox {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGMaskElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGMetadataElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGMPathElement extends SVGElement, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGPathElement extends SVGGeometryElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGPatternElement extends SVGElement, SVGFitToViewBox, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGPolygonElement extends SVGGeometryElement, SVGAnimatedPoints {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGPolylineElement extends SVGGeometryElement, SVGAnimatedPoints {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGRadialGradientElement extends SVGGradientElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGRectElement extends SVGGeometryElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGScriptElement extends SVGElement, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        type?: string | State<string>;
        [key: string]: any;
    }

    interface SVGSetElement extends SVGAnimationElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGStopElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGStyleElement extends SVGElement, LinkStyle {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        disabled?: boolean | State<boolean>;
        media?: string | State<string>;
        title?: string | State<string>;
        type?: string | State<string>;
        [key: string]: any;
    }

    interface SVGSVGElement extends SVGGraphicsElement, SVGFitToViewBox, WindowEventHandlers {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        currentScale?: number | State<number>;
        [key: string]: any;
    }

    interface SVGSwitchElement extends SVGGraphicsElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGSymbolElement extends SVGElement, SVGFitToViewBox {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGTextElement extends SVGTextPositioningElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGTextPositioningElement extends SVGTextContentElement {
        [key: string]: any;
    }

    interface SVGTextContentElement extends SVGGraphicsElement {
        [key: string]: any;
    }

    interface SVGTextPathElement extends SVGTextContentElement, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGTitleElement extends SVGElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGTSpanElement extends SVGTextPositioningElement {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGUseElement extends SVGGraphicsElement, SVGURIReference {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface SVGViewElement extends SVGElement, SVGFitToViewBox {
        namespaceURI: "http://www.w3.org/2000/svg";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface MathMLElement extends Element, ElementCSSInlineStyle, GlobalEventHandlers, HTMLOrSVGElement {
        namespaceURI: "http://www.w3.org/1998/Math/MathML";
        children?: MiniNode | MiniChildren;
        [key: string]: any;
    }

    interface Element extends Node, ARIAMixin, Animatable, ChildNode, InnerHTML, NonDocumentTypeChildNode, ParentNode, Slottable {
        namespaceURI?: "http://www.w3.org/1999/xhtml" | "http://www.w3.org/2000/svg" | "http://www.w3.org/1998/Math/MathML";
        children?: MiniNode | MiniChildren;
        className?: string | State<string>;
        id?: string | State<string>;
        onfullscreenchange?: ((this: Element, ev: Event) => any) | null | State<((this: Element, ev: Event) => any) | null>;
        onfullscreenerror?: ((this: Element, ev: Event) => any) | null | State<((this: Element, ev: Event) => any) | null>;
        outerHTML?: string | State<string>;
        scrollLeft?: number | State<number>;
        scrollTop?: number | State<number>;
        slot?: string | State<string>;
    }

    interface Node extends EventTarget {
        nodeValue?: string | null | State<string | null>;
        textContent?: string | null | State<string | null>;
    }

    interface EventTarget { }

    interface ARIAMixin {
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

    interface Animatable { }

    interface ChildNode extends Node { }

    interface InnerHTML {
        innerHTML?: string | State<string>;
    }

    interface NonDocumentTypeChildNode { }

    interface ParentNode extends Node { }

    interface Slottable { }

    interface ElementCSSInlineStyle {
        style?: CSSStyleDeclaration | State<CSSStyleDeclaration>;
    }

    interface CSSStyleDeclaration {
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

    interface ElementContentEditable {
        contentEditable?: string | State<string>;
        enterKeyHint?: string | State<string>;
        inputMode?: string | State<string>;
    }

    interface GlobalEventHandlers {
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

    interface HTMLHyperlinkElementUtils {
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

    interface WindowEventHandlers {
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

    interface PopoverInvokerElement {
        popoverTargetAction?: string | State<string>;
        popoverTargetElement?: Element | null | State<Element | null>;
    }

    interface FileList { }

    interface LinkStyle { }

    interface SVGTests {
        [key: string]: any;
    }

    interface SVGURIReference {
        [key: string]: any;
    }

    interface SVGFilterPrimitiveStandardAttributes {
        [key: string]: any;
    }

    interface SVGFitToViewBox {
        [key: string]: any;
    }

    interface SVGAnimatedPoints {
        [key: string]: any;
    }
}
