#!/bin/sh

if [ -d dist ]; then
	rm -rf dist/*
fi

tsc -p tsconfig.cjs.json
cp index.d.ts dist/

tsc -p tsconfig.esm.json
cp index.d.ts dist/esm

echo '{ "type" : "module" }' >dist/esm/package.json

# cp jsx-runtime.js dist/
cp jsx-runtime.d.ts dist/

# cp jsx-runtime.js dist/esm
cp jsx-runtime.d.ts dist/esm
