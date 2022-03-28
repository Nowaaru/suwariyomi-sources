#! /bin/bash
echo "starting"
set -e # prevent errors

# check if the "zip" folder exists in the "dist" folder - if it does, then clear it out
if [ -d "dist/zip" ]; then
  rm -rf dist/zip
fi

mkdir -p dist/zip
SOURCES=(./src/*)
for SOURCE in ${SOURCES[@]}; do
    echo "Compressing $SOURCE"
    zip -r dist/zip/$(basename $SOURCE).zip $SOURCE
done

