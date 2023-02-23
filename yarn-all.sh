#!/bin/bash
OPWD=`pwd`
PACKAGES=`find . -not -path "*/node_modules/*" -not -path "./dist/*" -name package.json -type f`
for package in ${PACKAGES}; do
    echo ""
    echo "package: $package"
    PACKAGE_PATH=$(dirname $package)
    echo "Installing dependencies for $PACKAGE_PATH"
    cd "${PACKAGE_PATH}"
    if [ $? -ne 0 ]; then
        echo "Failed to cd to $PACKAGE_PATH"
        exit 1
    fi
    yarn install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies for $PACKAGE_PATH"
        exit 1
    fi
    cd "${OPWD}"
    if [ $? -ne 0 ]; then
        echo "Failed to cd to $OPWD"
        exit 1
    fi
done



