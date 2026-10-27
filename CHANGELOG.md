# Changelog

Semua perubahan penting pada proyek portofolio Aditiya Saputra akan dicatat pada berkas ini.

Format berkas ini mengacu pada [Keep a Changelog](https://keepachangelog.com/id-ID/1.0.0/).

## [0.1.0] - 2026-10-27

### Ditambahkan
- Standar web umum: `favicon.svg`, `robots.txt`, `.nojekyll`, dan `404.html` mandiri (CSS inline agar tidak rusak pada URL berkedalaman bebas).
- Metadata `<head>`: `theme-color`, `color-scheme`, `robots`, Open Graph (`og:*`), Twitter Card, serta JSON-LD `Person`.
- Aksesibilitas: tautan lompat-ke-konten (`.skip-link`), `<main id="main">`, cincin fokus `:focus-visible` untuk tautan dan tombol, dan `@media (prefers-reduced-motion: reduce)`.
- Atribut `width`/`height` (132×132) pada avatar untuk mencegah pergeseran tata letak, plus `decoding="async"`, `fetchpriority="high"`, dan `referrerpolicy="no-referrer"`.
- `preconnect` ke `avatars.githubusercontent.com` dan `api.github.com`.
- Struktur awal antarmuka web semantik HTML5 di `index.html`.
- Desain *Monochrome Document* berbasis CSS variabel, grid, dan flexbox di `css/style.css`.
- Integrasi JavaScript asinkron untuk menarik repositori publik dan data pengguna langsung dari GitHub REST API v3 di `js/main.js`.
- Mekanisme kurasi fallback proyek dan bahasa jika API mencapai limit atau metadata bernilai kosong.
- Sanitasi teks `escapeHtml` untuk memitigasi celah injeksi XSS dari payload API.
- Navigasi responsif dengan hamburger toggle dan animasi silang pada perangkat bergerak (mobile).
- Integrasi vektor SVG (Simple Icons) untuk platform dan ekosistem (HTML5, JavaScript, Python, Node.js, Discord, PyTorch, GNU Bash, Git, GitHub, Figma, Blender, DaVinci Resolve, Chrome, Gmail) secara inline monochrome putih tanpa dependensi CDN runtime. 
- Dokumentasi instalasi, struktur, dan panduan penerapan di `README.md`.

### Diperbaiki
- Judul seksi tertutup header sticky saat menavigasi lewat tautan jangkar; ditambahkan `scroll-padding-top: 5.5rem` pada `html`.
- Mengganti sisa ikon gambar tangan dengan path resmi Simple Icons pada seksi Keahlian: HTML5, JavaScript, Python, Node.js, Discord, dan PyTorch (sebelumnya masih memakai aproksimasi manual).
- Koreksi klaim ikon: `Visual Studio Code` dan `OpenAI` **bukan** ikon Simple Icons rilis terkini. Keduanya dihapus dari Simple Icons sejak v13.0.0 (PR #10019, 2024-06-30) sehingga path yang dipakai berasal dari arsip v12.1.0. Komentar `index.html` dan `CHANGELOG.md` dikoreksi agar tidak menyesatkan; catatan lisensi: logo tetap milik pemegang merek, bukan domain publik.
- Koreksi palet status badge di Hero yang sebelumnya memuat warna hijau `#38a169` menjadi monokrom murni (`--accent-white`).
- Deteksi akurat antara repositori orisinal dan fork (`LLMs-from-scratch`, `low-chromium`) dengan badge khusus `Fork`.
- Koreksi teknologi dan URL repositori utama `mirai-bot`: diperbaiki menjadi **Python** (bukan JavaScript/Node.js) dan difokuskan ke repositori organisasi resmi `https://github.com/helix-dcid/mirai-bot`.
- Eliminasi bahasa klise AI (merujuk pada pedoman Wikipedia *Signs of AI writing* / WP:AISIGNS): menghapus hiperbola puitis (*puffery*) dan daftar kata kunci bertumpuk pada Hero lead dan seksi Tentang Saya agar ringkas, natural, dan santai.
- Penanganan cerdas metadata bahasa repo bernilai `null` dari GitHub API (`kanna`, `dibawah-layar`).
- Sinkronisasi dinamis avatar pengguna dan jumlah repositori publik dari endpoint GitHub user profile.
