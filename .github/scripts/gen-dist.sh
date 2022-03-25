#! /bin/bash
set -e # prevent errors

SOURCES = (main/src/*)
mkdir -p dist/zip

for SOURCE in ${SOURCES[@]}; do
    echo "Compressing $SOURCE"
    # zip -r dist/zip/$(basename $SOURCE).zip $SOURCE
done


