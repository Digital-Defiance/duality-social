#!/bin/bash
# _CMD="upgrade"
# if [ "$1" == "--upgrade" ]; then
#     _CMD="upgrade"
#     shift
# fi

OPWD=`pwd`
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${SCRIPT_DIR}"
PACKAGES=`find . -not -path "*/node_modules/*" -not -path "./dist/*" -name package.json -type f`
for package in ${PACKAGES}; do
    echo ""
    echo "package: $package"
    PACKAGE_PATH=$(dirname $package)
    echo "Installing dependencies for $PACKAGE_PATH"
    cd "${SCRIPT_DIR}/${PACKAGE_PATH}"
    if [ $? -ne 0 ]; then
        echo "Failed to cd to $PACKAGE_PATH"
        exit 1
    fi
    npm update && yarn
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies for $PACKAGE_PATH"
        exit 1
    fi
done
rm -f "${SCRIPT_DIR}/package-lock.json" "${SCRIPT_DIR}/packages/*/package-lock.json"
cd "${OPWD}"