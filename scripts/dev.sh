#!/bin/bash
# Dev environment setup script
# Ensures dependencies are installed and dev server is running

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

PORT=5173

echo "=== Proto Shadcn Dev Setup ==="

# 1. Pull latest changes
echo "Pulling latest changes..."
git pull --ff-only 2>/dev/null && echo "Updated to latest." || echo "Already up to date (or not on a tracking branch)."

# 2. Install dependencies if needed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules/.package-lock.json" ]; then
  echo "Installing dependencies..."
  npm install
  echo "Dependencies installed."
else
  echo "Dependencies up to date."
fi

# 3. Check if dev server is already running
if curl -s "http://localhost:$PORT" > /dev/null 2>&1; then
  echo "Dev server already running at http://localhost:$PORT"
else
  echo "Starting dev server..."
  npm start > /tmp/proto-shadcn-dev.log 2>&1 &
  DEV_PID=$!

  # Wait for server to be ready (max 15 seconds)
  for i in $(seq 1 30); do
    if curl -s "http://localhost:$PORT" > /dev/null 2>&1; then
      echo "Dev server started (PID: $DEV_PID)"
      break
    fi
    sleep 0.5
  done

  if ! curl -s "http://localhost:$PORT" > /dev/null 2>&1; then
    echo "WARNING: Server may still be starting. Check /tmp/proto-shadcn-dev.log"
  fi
fi

echo ""
echo "=== Ready ==="
echo "App running at: http://localhost:$PORT/"
