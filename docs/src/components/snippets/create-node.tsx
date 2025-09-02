// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function CreateNodeSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token keyword\">const</span> div <span class=\"token operator\">=</span> <span class=\"token function\">createNode</span><span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>div</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n        </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>p</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">Hello, World!</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>p</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>div</span><span class=\"token punctuation\">></span></span>\n<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n"}
            {...props}
        />
    );
}