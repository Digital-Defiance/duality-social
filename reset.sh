#!/bin/bash

SKIP_INSTALL=0
if [ "$1" == "--skip-install" ]; then
  SKIP_INSTALL=1
fi

# change directories into the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"
echo "Resetting the NX project"
npx nx reset
echo "Removing dist and node_modules directories"
rm -rf dist node_modules ./libs/duality-social-lib/node_modules ./apps/duality-social-*/node_modules
rm -rf yarn.lock ./libs/duality-social-lib/yarn.lock ./apps/duality-social-*/yarn.lock

echo "Doing yarn cache clean"
./do-yarn.sh cache clean

if [ $SKIP_INSTALL -eq 0 ]; then
  echo "Doing yarn install"
  ./do-yarn.sh install
else
  echo "Skipping yarn install"
fi