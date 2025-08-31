// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function AsyncLimitationsSafeSubSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"state\n    <span class=\"token punctuation\">.</span><span class=\"token function\">as</span><span class=\"token punctuation\">(</span>getData<span class=\"token punctuation\">)</span>\n    <span class=\"token punctuation\">.</span><span class=\"token function\">await</span><span class=\"token punctuation\">(</span>init<span class=\"token punctuation\">)</span>\n    <span class=\"token punctuation\">.</span><span class=\"token function\">sub</span><span class=\"token punctuation\">(</span>data <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n        state<span class=\"token punctuation\">.</span><span class=\"token function\">sub</span><span class=\"token punctuation\">(</span><span class=\"token operator\">...</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n"}
            {...props}
        />
    );
}