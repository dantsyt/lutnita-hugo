#!/bin/bash

grep -r "$1" ./* \
| awk -F: '{ print $1 }' \
| while read -r file; do 
echo "Filename: $file"
sed -i 's/'"$1"'/'"$2"'/g' "$file"
done 
