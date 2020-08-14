#!/bin/bash

rm -r lib/
npx babel src/ --out-dir lib/
rm -r lib/dev
mkdir lib/style
cp -r ./src/style/* lib/style
