---
date: '{{ .Date }}'
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
type: exhibition
layout: page
params:
  class:
    html: full_height
    body: full_body
    main: full_main
  scripts:
    - oneExhib.js
  isModule: true  
  data:
    exhibname: 
    artistname:
      - firstname: 
        lastname: 
    namepath: 
      - .svg
    date: 'start — end'
    images: 0
    captions:
      - |
        "caption"
      - |
        "caption"
---
