#!/bin/bash
set -xe
: "${REST_API_URL_REPLACE?Need an api url}"

# Replace the prod API url
sed -i "s|REST_API_URL_REPLACE|$REST_API_URL_REPLACE|g" /usr/share/nginx/html/main*.js

# Regenerate hash to be able to use pwa offline
for filename in /usr/share/nginx/html/main*.js; do
    hashed_file=$(sha1sum $filename | sed 's/ .*//')
    base_filename=$(basename $filename)
    sed -rie "s|(\s*\"/$base_filename\"\s*:\s*)\"\w+\"(,?)|\1\"$hashed_file\"\2|g" /usr/share/nginx/html/ngsw.json
done

# Replace the prod API url in the cached url for pwa offline
#sed -i "s|REST_API_URL_REPLACE|$REST_API_URL_REPLACE|g" /usr/share/nginx/html/ngsw.json

exec "$@"
