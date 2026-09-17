---
layout: default
title: "Beranda"
description: "Analisis politik Indonesia berbasis data dan sumber primer."
---

<div class="hero">
  <h1>Catatan Aditiya — Analisis Politik Terkini</h1>
  <p>Membaca kebijakan, pemilu, dan parlemen dengan jernih: memisahkan <strong>fakta</strong>, <strong>analisis</strong>, dan <strong>opini</strong>.</p>
  <p>
    <a href="{{ '/kategori/' | relative_url }}">Jelajahi kategori</a> •
    <a href="{{ '/tentang/' | relative_url }}">Tentang penulis</a> •
    <a href="{{ '/feed.xml' | relative_url }}">RSS</a>
  </p>
</div>

<input id="search" class="search-box" type="search" placeholder="Cari artikel (misal: pemilu, DPR, MK)..." oninput="filterPosts()" />

<h2>Terbaru</h2>
<div class="post-list">
{% for post in site.posts limit: 10 %}
  <article class="card" data-search="{{ post.title }} {{ post.categories | join: ' ' }} {{ post.tags | join: ' ' }}">
    <p class="post-meta">{{ post.date | date: "%d %B %Y" }}{% if post.categories %} • {{ post.categories | join: ", " }}{% endif %}</p>
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    {% if post.description %}<p class="muted">{{ post.description }}</p>{% endif %}
    {% if post.label %}<p><span class="badge">{{ post.label }}</span></p>{% endif %}
  </article>
{% endfor %}
</div>

<p class="muted">Baru di sini? Mulai dari <a href="{{ '/kebijakan-redaksi/' | relative_url }}">Kebijakan Redaksi</a> untuk memahami standar verifikasi blog ini.</p>
