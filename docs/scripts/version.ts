const _package = JSON.parse(
    await Bun.file("../package.json").text()
);

if (!_package.version) {
    throw new Error("Miniframe version not found");
}

await Bun.write(
    "./src/version.ts",
    `// npm run generate:version
export const VERSION = "${_package.version}";`
);
