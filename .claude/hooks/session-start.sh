#!/bin/bash
set -euo pipefail

# Only run in Claude Code remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Ensure pnpm is available
if ! command -v pnpm &> /dev/null; then
  echo "pnpm not found, installing via corepack..."
  corepack enable
  corepack prepare pnpm@latest --activate
fi

# Install dependencies for the Next.js project
cd "${CLAUDE_PROJECT_DIR}/omniscale-landing-page"
echo "Installing dependencies with pnpm..."
pnpm install

echo "Session start hook completed successfully."
