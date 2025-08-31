// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function StateSnippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={"<span class=\"token keyword\">const</span> name <span class=\"token operator\">=</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">State</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"World\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> p <span class=\"token operator\">=</span> <span class=\"token function\">createNode</span><span class=\"token punctuation\">(</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>p</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">Hello, </span><span class=\"token punctuation\">{</span>name<span class=\"token punctuation\">}</span><span class=\"token plain-text\">!</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>p</span><span class=\"token punctuation\">></span></span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\np<span class=\"token punctuation\">.</span>textContent<span class=\"token punctuation\">;</span> <span class=\"token comment\">// \"Hello, World!\"</span>\n\nname<span class=\"token punctuation\">.</span>value <span class=\"token operator\">=</span> <span class=\"token string\">\"Miniframe\"</span><span class=\"token punctuation\">;</span>\n\np<span class=\"token punctuation\">.</span>textContent<span class=\"token punctuation\">;</span> <span class=\"token comment\">// \"Hello, Miniframe!\"</span>\n"}
            {...props}
        />
    );
}