#! /bin/bash
echo "Beginning compression."
set -e # prevent errors

mkdir -p dist/zip
ROOTDIR=$(realpath ./)
SOURCES=(./src/*)
for SOURCE in ${SOURCES[@]}; do
    echo "Compressing $SOURCE"
    cd $SOURCE
    zip -r $ROOTDIR/dist/zip/$(basename $SOURCE).zip ./
done

echo "Compressed files:"
ls $ROOTDIR/dist/zip
