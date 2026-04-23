#!/bin/sh
set -eu

SITE_PORT="${VITE_SITE_PORT:-3005}"
SITE_HMR_PORT="${VITE_SITE_HMR_PORT:-$SITE_PORT}"
ADMIN_PORT="${VITE_ADMIN_PORT:-3006}"
ADMIN_HMR_PORT="${VITE_ADMIN_HMR_PORT:-$ADMIN_PORT}"

VITE_SITE_PORT="$SITE_PORT" \
VITE_SITE_HMR_PORT="$SITE_HMR_PORT" \
vite --config vite.site.config.ts --mode development &
SITE_PID=$!

VITE_ADMIN_PORT="$ADMIN_PORT" \
VITE_ADMIN_HMR_PORT="$ADMIN_HMR_PORT" \
vite --config vite.admin.config.ts --mode development &
ADMIN_PID=$!

cleanup() {
  kill "$SITE_PID" "$ADMIN_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT
wait
