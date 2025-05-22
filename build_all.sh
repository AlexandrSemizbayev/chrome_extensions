#!/bin/bash

if [ ! -d "./builds" ]; then
  (mkdir builds && chmod -R u+r ./builds)
else
  (rm -r ./builds/*)
fi

for dir in */ ; do
  if [ -d "$dir" ] && [ -f "$dir/build.sh" ]; then
    echo "Running script in $dir"
    (cd "$dir" && npm i && sh ./build.sh && cp -r ./dist ../builds/"${dir%/}")
  fi
done