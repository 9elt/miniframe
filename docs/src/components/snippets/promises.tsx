// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function PromisesSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token keyword\">const</span> promise <span class=\"token operator\">=</span> <span class=\"token function\">fetch</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"https://example.com\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> response <span class=\"token operator\">=</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">State</span><span class=\"token punctuation\">(</span>promise<span class=\"token punctuation\">)</span><span class=\"token punctuation\">.</span><span class=\"token function\">await</span><span class=\"token punctuation\">(</span><span class=\"token keyword\">null</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span> <span class=\"token comment\">// State&lt;Response | null></span>\n\nresponse<span class=\"token punctuation\">.</span>value<span class=\"token punctuation\">;</span> <span class=\"token comment\">// null</span>\n\n<span class=\"token keyword\">await</span> promise<span class=\"token punctuation\">;</span>\n\nresponse<span class=\"token punctuation\">.</span>value<span class=\"token punctuation\">;</span> <span class=\"token comment\">// Response { ... }</span>\n"}
            {...props}
        />
    );
}