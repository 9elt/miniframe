#!/bin/sh

rm -rf dist

tsc -p tsconfig.cjs.json
cp index.d.ts dist/

tsc -p tsconfig.esm.json
cp index.d.ts dist/esm
echo '{\"type\":\"module\"}' >dist/esm/package.json

cp jsx-runtime.js dist/
cp jsx-runtime.d.ts dist/
cp jsx-runtime.js dist/jsx-dev-runtime.js
cp jsx-runtime.d.ts dist/jsx-dev-runtime.d.ts

# cp jsx-runtime.js dist/esm
# cp jsx-runtime.d.ts dist/esm
# cp jsx-runtime.js dist/esm/jsx-dev-runtime.js
# cp jsx-runtime.d.ts dist/esm/jsx-dev-runtime.d.ts
