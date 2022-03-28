#! /bin/bash
set -e # prevent errors

git clone https://github.com/Nowaaru/suwariyomi-sources.git --depth 1 --branch dist
# check if the "zip" folder exists in the "dist" folder - if it does, then clear it out
if [ -d "dist/zip" ]; then
  rm -rf dist/zip
fi

git config --global user.email "github-actions[bot]@users.noreply.github.com"
git config --global user.name "github-actions[bot]"
git status

cd .. # go back to the root directory

SOURCES=(./src/*)
for SOURCE in ${SOURCES[@]}; do
    echo "Compressing $SOURCE"
    zip -r dist/zip/$(basename $SOURCE).zip $SOURCE
done

cd dist
git add .
git commit -m "Update"
git push origin dist
