// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function TsconfigExampleSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token punctuation\">{</span>\n    <span class=\"token property\">\"compilerOptions\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token property\">\"jsx\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"react-jsx\"</span><span class=\"token punctuation\">,</span>\n        <span class=\"token property\">\"jsxImportSource\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"@9elt/miniframe\"</span>\n    <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span>\n"}
            {...props}
        />
    );
}