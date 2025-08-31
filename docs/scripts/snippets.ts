import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

const dir = "./src/components/snippets";
const examples = "./src/components/";

const paths = [
    ...new Bun.Glob(dir + "/code/*").scanSync(),
    ...new Bun.Glob(examples + "/example.*.tsx").scanSync(),
];

for (const path of paths) {
    const file = Bun.file(path);
    const name = path.split("/").pop()!;
    const ext = name.split(".").pop()!;

    let code = await file.text();

    if (/example\..*\.tsx/.test(path)) {
        let Name: string | undefined;
        code = code
            .split("\n")
            .map((line) => {
                const EXPORT_FUNCTION = /export function (.*)\(.*\) {/;

                if (EXPORT_FUNCTION.test(line)) {
                    const [, fname] = line.match(EXPORT_FUNCTION) || [];
                    Name = fname;

                    line = line.replace(/export /, "");
                }

                return line
            })
            .join("\n") + `
document.body.appendChild(
    createNode(<${Name} />)
);`;

    }

    let innerHTML: string | undefined;

    if (ext === "tsx") {
        innerHTML = highlight(
            code,
            languages.tsx,
            "tsx"
        );
    }

    if (ext === "json") {
        innerHTML = highlight(
            code,
            languages.json,
            "json"
        );
    }

    if (innerHTML) {
        const Name = name
            .replace("." + ext, "")
            .replace(/(^\w|\.\w|\-\w|_\w)/g, s => s.replace(/\.|\-|_/, "").toUpperCase());

        await Bun.write(
            dir + "/" + name.replace(ext, "tsx"),
            `// npm run generate:snippets
import type { Mini } from "@9elt/miniframe";

export function ${Name}Snippet(props?: Partial<Mini.HTMLPreElement>) {
    return (
        <pre
            className="snippet"
            innerHTML={${JSON.stringify(innerHTML)}}
            {...props}
        />
    );
}`
        );
    }
}
