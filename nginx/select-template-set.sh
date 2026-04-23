#!/bin/sh
set -eu

PROFILE="${NGINX_PROFILE:-demo}"
SOURCE_DIR="/etc/nginx/template-sets/${PROFILE}"
TARGET_DIR="/etc/nginx/templates"

if [ ! -d "${SOURCE_DIR}" ]; then
  echo "[nginx-template] unknown NGINX_PROFILE='${PROFILE}'. Available: demo, prod" >&2
  exit 1
fi

mkdir -p "${TARGET_DIR}"
rm -f "${TARGET_DIR}"/*.template
cp -f "${SOURCE_DIR}"/*.template "${TARGET_DIR}/"

echo "[nginx-template] using profile '${PROFILE}'"
