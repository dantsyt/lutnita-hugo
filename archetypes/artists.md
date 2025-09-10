---
date: '{{ .Date }}'
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
type: artist
layout: page
params:
  class:
    html: full_height
    body: full_body
    main: full_main
  scripts:
    - oneArtist.js
  isModule: true  
  data:
    firstname: 
    lastname: 
    fullname: 
    namepath: .svg
    images: 0
    captions:
      - |
        "caption"
      - |
        "caption"
---
