// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function AsyncLimitationsUnsafeSubSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"state<span class=\"token punctuation\">.</span><span class=\"token function\">sub</span><span class=\"token punctuation\">(</span><span class=\"token keyword\">async</span> v <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token keyword\">const</span> data <span class=\"token operator\">=</span> <span class=\"token keyword\">await</span> <span class=\"token function\">getData</span><span class=\"token punctuation\">(</span>v<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n    <span class=\"token comment\">// WARNING: This dependent can't</span>\n    <span class=\"token comment\">// be tracked</span>\n    state<span class=\"token punctuation\">.</span><span class=\"token function\">sub</span><span class=\"token punctuation\">(</span><span class=\"token operator\">...</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n"}
            {...props}
        />
    );
}