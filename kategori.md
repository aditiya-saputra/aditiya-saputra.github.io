---
layout: page
title: Kategori
description: Jelajahi artikel berdasarkan topik.
permalink: /kategori/
---

{% assign cats = site.categories | sort %}
{% for cat in cats %}
## {{ cat[0] }} ({{ cat[1].size }})
{% for post in cat[1] %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%d %b %Y" }}
{% endfor %}
{% endfor %}
