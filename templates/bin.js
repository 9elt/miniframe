#!/usr/bin/env node

import { spawnSync } from "child_process";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const TEMPLATES = [
    "jsx-bun",
    "tsx-bun",
];

const VERSION = "0.1.0";

const HELP = `npx @9elt/miniframe-template [template] [options]
templates:
    ${TEMPLATES.join(", ")}
options:
    --version, -V    print version
    --help, -h       print help
    --name           name for the project
    --git            initialize git
`;

/** @type {string} */
let template;

/** @type {string} */
let name;

let git = false;

for (const arg of process.argv.slice(2)) {
    if (name === true) {
        name = arg;
    }
    else if (TEMPLATES.includes(arg)) {
        template = arg;
    }
    else if (arg === "--name") {
        name = true;
    }
    else if (arg === "--git") {
        git = true;
    }
    else if (arg === "--help" || arg === "-h") {
        console.log(HELP);
        process.exit(0);
    }
    else if (arg === "--version" || arg === "-V") {
        console.log(VERSION);
        process.exit(0);
    }
    else {
        console.error("Unknown argument", arg);
        process.exit(1);
    }
}

if (!name) {
    console.error("Please provide a name for the project");
    console.log(HELP);
    process.exit(1);
}

if (!template) {
    console.error("Please provide a template");
    console.log(HELP);
    process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fs.cpSync(
    __dirname + "/" + template,
    name,
    { recursive: true }
);

if (template.includes("bun")) {
    const bun_version = spawnSync("bun", ["--version"]);

    if (bun_version.error) {
        console.error(
            "Please install bun, see: " +
            "https://bun.com/docs/installation"
        );
        process.exit(1);
    }
}

const cwd = { cwd: name };

const npm_i = spawnSync("npm", ["i", "@9elt/miniframe"], cwd);

if (npm_i.error) {
    console.error(npm_i.error);
    process.exit(1);
}

const npm_run_build = spawnSync("npm", ["run", "build"], cwd);

if (npm_run_build.error) {
    console.error(npm_run_build.error);
    process.exit(1);
}

if (git) {
    const git_init = spawnSync("git", ["init", "-b", "main"], cwd);

    if (git_init.error) {
        console.error(git_init.error);
        process.exit(1);
    }

    fs.writeFileSync(cwd.cwd + "/.gitignore", `\
dist
node_modules
package-lock.json
`);
}
