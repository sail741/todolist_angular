#!/bin/bash

if [ -z "$1" ]
  then
  	echo "Need parameter to backup."
    exit 1
fi

folder="/data/backup/"
filename="$1"

echo '{' > $folder$filename
echo '"lists": [' >> $folder$filename
curl https://api.todo.sail.ovh/lists/ >> $folder$filename
echo '' >> $folder$filename
echo '}' >> $folder$filename
