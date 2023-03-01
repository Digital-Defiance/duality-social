#!/bin/bash
_CMD="build"
if [ "$1" == "--othercmd" ]; then
    _CMD="$2"
    shift
    shift
fi

OPWD=$(pwd)

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${SCRIPT_DIR}"
echo ""
echo "Building duality-social-lib"
nx $_CMD duality-social-lib $@
if [ $? -ne 0 ]; then
    echo "Failed to build duality-social-lib"
    exit 1
fi

echo ""
echo "Building duality-social-angular"
nx $_CMD duality-social-angular $@
if [ $? -ne 0 ]; then
    echo "Failed to build duality-social-angular"
    exit 1
fi

echo ""
echo "Building duality-social-node"
nx $_CMD duality-social-node $@
if [ $? -ne 0 ]; then
    echo "Failed to build duality-social-node"
    exit 1
fi

# if we're not skipping documentation via SKIP_DOCS being set
if [ -z "${SKIP_DOCS}" ]; then
    echo ""
    echo "Building duality-social-docs"
    nx $_CMD duality-social-docs
    if [ $? -ne 0 ]; then
        echo "Failed to build duality-social-docs"
        exit 1
    fi
fi

cd "${OPWD}"

echo "Done building duality-social"