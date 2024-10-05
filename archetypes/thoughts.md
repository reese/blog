+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
description = ''
slug = '{{ .File.ContentBaseName }}'
type = 'thought'
draft = true
+++
