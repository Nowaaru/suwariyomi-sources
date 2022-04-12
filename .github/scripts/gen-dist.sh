#! /bin/bash
echo "starting"
set -e # prevent errors

mkdir -p dist/zip
SOURCES=(./src/*)
for SOURCE in ${SOURCES[@]}; do
    echo "Compressing $SOURCE"
    zip -r dist/zip/$(basename $SOURCE).zip $SOURCE
done

ls dist/zip
