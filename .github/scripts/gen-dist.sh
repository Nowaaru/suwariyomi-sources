#! /bin/bash
set -e # prevent errors

SOURCES=(./src/*)
mkdir -p dist/zip

ls $PWD
ls ../
for SOURCE in ${SOURCES[@]}; do
    echo "Compressing $SOURCE"
    zip -r dist/zip/$(basename $SOURCE).zip $SOURCE
done


