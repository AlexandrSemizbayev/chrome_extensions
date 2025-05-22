#!/bin/bash
npm run build

echo 'Project was built successfully'

cp ./manifest.json ./dist/manifest.json
cp -r ./icons ./dist/icons

DIRECTORY=$dirname pwd

echo "$DIRECTORY is ready to be moved to builds folder"