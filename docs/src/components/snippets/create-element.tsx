// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function CreateElementSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token keyword\">const</span> p <span class=\"token operator\">=</span> document<span class=\"token punctuation\">.</span><span class=\"token function\">createElement</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"p\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\np<span class=\"token punctuation\">.</span><span class=\"token function\">append</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Hello, World!\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">const</span> div <span class=\"token operator\">=</span> document<span class=\"token punctuation\">.</span><span class=\"token function\">createElement</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"div\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\ndiv<span class=\"token punctuation\">.</span><span class=\"token function\">append</span><span class=\"token punctuation\">(</span>p<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n"}
            {...props}
        />
    );
}