#!/bin/sh

envsubst '${BACKEND_PORT}' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

exec "$@"
