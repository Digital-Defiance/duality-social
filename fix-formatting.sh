#!/bin/bash

# Fix formatting for all TypeScript files in the project
# This script runs ESLint fix followed by Prettier to ensure consistent formatting

echo "🔧 Fixing formatting issues across the project..."

# First, run ESLint with auto-fix
echo "Running ESLint fix..."
npx eslint --fix "apps/**/*.ts" "libs/**/*.ts"

# Then run Prettier to ensure consistent formatting
echo "Running Prettier formatting..."
npx prettier --write "apps/**/*.ts" "libs/**/*.ts"

echo "✅ Formatting complete!"
echo "Any remaining formatting issues in your editor should now be resolved."
echo "If you still see issues when editing files, try closing and reopening the file."
