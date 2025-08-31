// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function StateTransformSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token keyword\">const</span> name <span class=\"token operator\">=</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">State</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"World\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> nameUpperCase <span class=\"token operator\">=</span> name<span class=\"token punctuation\">.</span><span class=\"token function\">as</span><span class=\"token punctuation\">(</span>n <span class=\"token operator\">=></span> n<span class=\"token punctuation\">.</span><span class=\"token function\">toUpperCase</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\nnameUpperCase<span class=\"token punctuation\">.</span>value<span class=\"token punctuation\">;</span> <span class=\"token comment\">// \"WORLD\"</span>\n\nname<span class=\"token punctuation\">.</span>value <span class=\"token operator\">=</span> <span class=\"token string\">\"Miniframe\"</span><span class=\"token punctuation\">;</span>\nnameUpperCase<span class=\"token punctuation\">.</span>value<span class=\"token punctuation\">;</span> <span class=\"token comment\">// \"MINIFRAME\"</span>\n"}
            {...props}
        />
    );
}