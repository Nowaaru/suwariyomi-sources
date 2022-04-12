#! /bin/bash
echo "Beginning compression."
set -e # prevent errors

mkdir -p dist/zip
SOURCES=(./src/*)
for SOURCE in ${SOURCES[@]}; do
    echo "Compressing $SOURCE"
    zip -r -j dist/zip/$(basename $SOURCE).zip $SOURCE
done

echo "Compressed files:"
ls dist/zip
