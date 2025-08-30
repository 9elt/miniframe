#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const TEMPLATES = ["bun"];

const VERSION = "0.1.0";

const HELP = `npx @9elt/miniframe [template] [options]
templates:
    ${TEMPLATES.join(", ")}
options:
    --version, -V    print version
    --help, -h       print help
    --ts             use typescript
    --name           name for the project
    --git            initialize git\
`;

/** @type {string} */
let template = "bun";

/** @type {string} */
let name;

let git = false;

let ts = false;

for (const arg of process.argv.slice(2)) {
    if (name === true) {
        name = arg.trim();
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
    else if (arg === "--ts") {
        ts = true;
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

if (!template) {
    console.error("Please provide a template");
    console.log(HELP);
    process.exit(1);
}

if (!name) {
    name = (
        await ask("Enter a name for the project: ")
    ).trim();
}

if (!name) {
    console.error("Please provide a name for the project");
    console.log(HELP);
    process.exit(1);
}

if (existsSync(name)) {
    console.error(name + " already exists");
    process.exit(1);
}

if (!ts) {
    ts = !/n/i.test(
        await ask("Do you want to use typescript? [Y/n]: ")
    );
}

if (!git) {
    git = !/n/i.test(
        await ask("Do you want to use git? [Y/n]: ")
    );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ext = ts ? "tsx" : "jsx";

const package_json = {
    "name": name.toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, ""),
    "scripts": {
        "build": `NODE_ENV=production bun build ./src/index.${ext} --outdir dist`,
        "build:dev": `NODE_ENV=production bun build ./src/index.${ext} --outdir dist --watch`,
        "serve:dev": "bun --port 3000 ./dist/index.html",
        "dev": "run-p build:dev serve:dev",
    },
};

const tsconfig_json = {
    "include": [
        "./src/**/*",
    ],
    "compilerOptions": {
        "target": "esnext",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "strictNullChecks": true,
        "noErrorTruncation": true,
        "allowJs": ts ? undefined : true,
        "noEmit": true,
        "jsx": "react-jsx",
        "jsxImportSource": "@9elt/miniframe",
    },
};

mkdirSync(name + "/dist", { recursive: true });

mkdirSync(name + "/src", { recursive: true });

writeFileSync(
    name + "/tsconfig.json",
    JSON.stringify(tsconfig_json, null, 4)
);

writeFileSync(
    name + "/package.json",
    JSON.stringify(package_json, null, 4)
);

cpSync(
    __dirname + "/index.html",
    name + "/dist/index.html",
);

cpSync(
    __dirname + "/index." + ext,
    name + "/src/index." + ext,
);

if (git) {
    writeFileSync(
        name + "/.gitignore",
        "dist\nnode_modules\npackage-lock.json"
    );
}

const cwd = { cwd: name };

if (template.includes("bun")) {
    const bun_version = spawnSync("bun", ["--version"]);

    if (bun_version.error) {
        console.log("Bun not found, installing...");

        const npm_i_bun = spawnSync("npm", ["i", "bun"], cwd);

        if (npm_i_bun.error) {
            console.error(
                "Please install bun, see: " +
                "https://bun.com/docs/installation"
            );
            process.exit(1);
        }

        console.log(
            "Bun installed locally, please consider installing it globally: " +
            "https://bun.com/docs/installation"
        );
    }
}

console.log("Installing miniframe...");

const npm_i_miniframe = spawnSync("npm", ["i", "@9elt/miniframe"], cwd);

if (npm_i_miniframe.error) {
    console.error(npm_i_miniframe.error);
    process.exit(1);
}

console.log("Installing dev dependencies...");

const npm_i_dev = spawnSync(
    "npm",
    ["i", "-D", "npm-run-all", ts && "typescript"].filter(Boolean),
    cwd
);

if (npm_i_dev.error) {
    console.error(npm_i_dev.error);
    process.exit(1);
}

console.log("Building...");

const npm_run_build = spawnSync("npm", ["run", "build"], cwd);

if (npm_run_build.error) {
    console.error(npm_run_build.error);
    process.exit(1);
}

if (git) {
    console.log("Initializing git...");

    const git_init = spawnSync("git", ["init", "-b", "main"], cwd);

    if (git_init.error) {
        console.error(git_init.error);
        process.exit(1);
    }
}

console.log("Template created at", name);

async function ask(question) {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return await new Promise((resolve) =>
        readline.question(question, (answer) => {
            readline.close();
            resolve(answer);
        })
    );
}
