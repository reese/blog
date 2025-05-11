+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
description = ''
slug = '{{ .File.ContentBaseName }}'
tags = ['essays']
draft = true
+++
