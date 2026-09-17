# Catatan Aditiya — aditiya-saputra.github.io

Blog analisis politik Indonesia. Dibangun dengan **Jekyll 4 + GitHub Pages Actions**. Semua artikel ditulis dalam **Markdown** di `_posts/`.

Live: https://aditiya-saputra.github.io

## Cara nulis artikel baru

Buat file `_posts/YYYY-MM-DD-judul.md`:

```md
---
title: "Judul"
date: 2026-09-18 09:00:00 +0700
categories: [Kebijakan]
tags: [DPR]
description: "Ringkasan 150 karakter"
label: Analisis
---

Isi markdown...
```

Label wajib salah satu: `Fakta` / `Analisis` / `Opini`.

## Deploy ke GitHub

Repo: `aditiya-saputra/aditiya-saputra.github.io`, branch `main`.

```bash
git init
git branch -M main
git remote add origin https://github.com/aditiya-saputra/aditiya-saputra.github.io.git
git add .
git commit -m "Launch blog politik Jekyll"
git push -u origin main
# Jika pakai token sementara:
# git remote set-url origin https://aditiya-saputra:TOKEN@github.com/aditiya-saputra/aditiya-saputra.github.io.git
```

Lalu di GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Workflow di `.github/workflows/jekyll.yml` akan build otomatis.

Jangan commit token ke file. Setelah push berhasil, hapus credential lokal:

```bash
git remote set-url origin https://github.com/aditiya-saputra/aditiya-saputra.github.io.git
```

## Aktifkan komentar (opsional)

1. Aktifkan Discussions di repo
2. Setup di https://giscus.app
3. Isi `giscus:` di `_config.yml`, uncomment script sudah disiapkan di `_includes/comments.html`
