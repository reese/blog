+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
description = ''
slug = '{{ .File.ContentBaseName }}'
type = 'book-review'
draft = true
+++
