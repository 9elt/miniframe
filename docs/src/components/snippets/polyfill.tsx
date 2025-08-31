// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function PolyfillSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token keyword\">import</span> <span class=\"token string\">\"@9elt/miniframe/polyfill\"</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> createNode<span class=\"token punctuation\">,</span> State <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">\"@9elt/miniframe\"</span><span class=\"token punctuation\">;</span>\n"}
            {...props}
        />
    );
}