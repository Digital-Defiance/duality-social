#!/bin/bash
OPWD=$(pwd)

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${SCRIPT_DIR}"
echo ""
echo "Building duality-social-lib"
nx build duality-social-lib
if [ $? -ne 0 ]; then
    echo "Failed to build duality-social-lib"
    exit 1
fi

echo ""
echo "Building duality-social-angular"
nx build duality-social-angular
if [ $? -ne 0 ]; then
    echo "Failed to build duality-social-angular"
    exit 1
fi

echo ""
echo "Building duality-social-node"
nx build duality-social-node
if [ $? -ne 0 ]; then
    echo "Failed to build duality-social-node"
    exit 1
fi

echo ""
echo "Building duality-social-docs"
nx build duality-social-docs
if [ $? -ne 0 ]; then
    echo "Failed to build duality-social-docs"
    exit 1
fi

cd "${OPWD}"

echo "Done building duality-social"