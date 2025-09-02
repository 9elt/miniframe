// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function WithJsxSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token keyword\">const</span> miniElement <span class=\"token operator\">=</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>div</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n        </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>p</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">Hello, World!</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>p</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>div</span><span class=\"token punctuation\">></span></span>\n<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\nminiElement<span class=\"token punctuation\">.</span>tagName<span class=\"token punctuation\">;</span> <span class=\"token comment\">// \"div\"</span>\nminiElement<span class=\"token punctuation\">.</span>children<span class=\"token punctuation\">;</span> <span class=\"token comment\">// { tagName: \"p\" ... }</span>\n\n<span class=\"token keyword\">const</span> htmlElement <span class=\"token operator\">=</span> <span class=\"token function\">createNode</span><span class=\"token punctuation\">(</span>miniElement<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\nhtmlElement<span class=\"token punctuation\">.</span>outerHTML <span class=\"token comment\">// &lt;div>&lt;p>Hello, W...</span>\n"}
            {...props}
        />
    );
}