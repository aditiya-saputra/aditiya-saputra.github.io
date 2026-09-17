---
layout: page
title: Kategori
description: Jelajahi artikel dalam & luar negeri berdasarkan topik.
permalink: /kategori/
---

**Jalur cepat:** Dalam negeri → `Kebijakan`, `Pemilu & Parlemen`, `Hukum`, `Ekonomi-Politik`, `Opini`. Luar negeri → `Politik Global`. Semua artikel berbasis [data terbuka](/sumber-data/).

{% assign cats = site.categories | sort %}
{% for cat in cats %}
## {{ cat[0] }} ({{ cat[1].size }})
{% for post in cat[1] %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%d %b %Y" }}
{% endfor %}
{% endfor %}
