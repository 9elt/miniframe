#!/bin/sh

if [ -d dist ]; then
	rm -rf dist/*
fi

tsc -p tsconfig.cjs.json
cp index.d.ts dist/cjs
cp jsx-runtime.d.ts dist/cjs

tsc -p tsconfig.esm.json
cp index.d.ts dist/esm
cp jsx-runtime.d.ts dist/esm
echo '{ "type" : "module" }' >dist/esm/package.json
