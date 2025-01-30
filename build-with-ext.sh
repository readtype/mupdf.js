#!/bin/bash

# patch package.json
# Define variables
NEW_NAME="@readtype/mupdf"
NEW_REPO="git+https://github.com/readtype/mupdf.js.git"

EMSDK_DIR=${EMSDK_DIR:-/opt/emsdk}

# Use jq to update package.json and create a backup
cp package.json package.json.bak
jq \
  --arg name "$NEW_NAME" \
  --arg repo "$NEW_REPO" \
  '.name = $name | .repository.url = $repo' \
  package.json.bak > package.json

echo "Updating ts files"
# replace self import to match updated module
find ./src -type f \( -name "*.ts" \) -exec sed -i.bak \
  -e 's/from "mupdf"/from "@readtype\/mupdf"/g' \
  {} +


cp build.sh build.sh.bak

chmod +x build.sh

if [[ "$OSTYPE" == "darwin"* ]]; then
  SED_PARAMS="-i ''"
else
  SED_PARAMS="-i"
fi

echo "Updating build.sh files"
sed $SED_PARAMS \
 -e "s|^EMSDK_DIR=.*|EMSDK_DIR=${EMSDK_DIR}|" \
 -e 's/^MUPDF_OPTS=.*/MUPDF_OPTS="-Os -DTOFU -DTOFU_CJK_EXT -DFZ_ENABLE_XPS=0 -DFZ_ENABLE_SVG=0 -DFZ_ENABLE_CBZ=0 -DFZ_ENABLE_IMG=0 -DFZ_ENABLE_HTML=1 -DFZ_ENABLE_EPUB=1 -DFZ_ENABLE_JS=0 -DFZ_ENABLE_OCR_OUTPUT=0 -DFZ_ENABLE_DOCX_OUTPUT=0 -DFZ_ENABLE_ODT_OUTPUT=0"/' \
build.sh

# ./build.sh "$@"

npm install
npm publish

# revert the changes
git restore ./src package-lock.json package.json

# restore the original files
find ./src -type f -name "*.bak" -exec sh -c 'mv "$1" "${1%.bak}"' _ {} \;
rm package.json.bak
mv build.sh.bak build.sh