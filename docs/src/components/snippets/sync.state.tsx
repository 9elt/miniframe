// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function SyncStateSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token keyword\">const</span> a <span class=\"token operator\">=</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">State</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"a\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">const</span> b <span class=\"token operator\">=</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">State</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"b\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">const</span> c <span class=\"token operator\">=</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">State</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"c\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> abc <span class=\"token operator\">=</span> State<span class=\"token punctuation\">.</span><span class=\"token function\">merge</span><span class=\"token punctuation\">(</span>a<span class=\"token punctuation\">,</span> b<span class=\"token punctuation\">,</span> c<span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span>a<span class=\"token punctuation\">,</span> b<span class=\"token punctuation\">,</span> c<span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> a <span class=\"token operator\">+</span> b <span class=\"token operator\">+</span> c<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\nabc<span class=\"token punctuation\">.</span>value<span class=\"token punctuation\">;</span> <span class=\"token comment\">// \"abc\"</span>\n"}
            {...props}
        />
    );
}