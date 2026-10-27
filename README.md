# Aditiya Saputra — Portfolio Website

Website landing page portofolio personal resmi Aditiya Saputra dengan gaya visual **Dokumen Monokrom** (*Monochrome Document Style*). Dirancang dengan pendekatan *zero dependency*, performa tinggi, dan ramah terhadap perangkat berspesifikasi rendah.

## Fitur Utama

- **Monochrome Document Aesthetic**: Nuansa industrial, dokumen teknis, tipografi kontras tinggi yang nyaman di mata.
- **Zero Framework / Zero Dependency**: Dibangun murni menggunakan HTML5, CSS3, dan Vanilla JavaScript tanpa build-step tambahan.
- **GitHub API Integration**: Otomatis menarik daftar repositori publik terbaru dari akun [`aditiya-saputra`](https://github.com/aditiya-saputra).
- **Graceful Fallback**: Tetap menampilkan kurasi proyek jika jaringan offline atau API rate limit tercapai.
- **Responsive & Mobile-First**: Tampilan optimal di ponsel, tablet, hingga layar desktop lebar.
- **XSS Protection**: Sanitasi otomatis pada semua data yang ditarik dari API eksternal.
- **Standar Web Umum**: Metadata Open Graph, favicon SVG, JSON-LD `Person`, `robots.txt`, halaman `404.html`, tautan lompat-ke-konten, serta dukungan `prefers-reduced-motion`.

## Struktur Direktori

```text
website-aditiya/
├── index.html        # Struktur markup semantik utama
├── 404.html          # Halaman galat mandiri (CSS inline, tanpa dependensi path)
├── favicon.svg       # Ikon situs monokrom
├── robots.txt        # Arahan perayap mesin pencari
├── .nojekyll         # Menonaktifkan pemrosesan Jekyll di GitHub Pages
├── css/
│   └── style.css     # Styling monokrom dan sistem responsif
├── js/
│   └── main.js       # Integrasi GitHub API, fallback, dan navigasi
├── README.md         # Dokumentasi proyek
└── CHANGELOG.md      # Catatan riwayat versi proyek
```

## Menjalankan Secara Lokal

Karena proyek ini tidak membutuhkan dependensi npm atau kompilator build, Anda dapat menjalankannya langsung:

1. **Buka Langsung di Peramban**:
   Klik dua kali berkas `index.html` atau buka melalui peramban pilihan Anda.

2. **Menggunakan Local Server (Opsional)**:
   ```bash
   # Menggunakan Python 3:
   python -m http.server 8000
   
   # Atau menggunakan Node.js npx:
   npx serve .
   ```
   Buka `http://localhost:8000` di peramban.

## Penerapan (Deployment)

Proyek ini siap langsung dipublikasikan ke **GitHub Pages**:
1. Buat repositori baru di GitHub atau gunakan `aditiya-saputra.github.io`.
2. Lakukan `git push` ke branch `main`.
3. Masuk ke tab **Settings** > **Pages** di GitHub.
4. Pilih sumber build dari **Deploy from a branch** > branch `main` > root `/`.
5. Situs Anda akan live di `https://aditiya-saputra.github.io`.

### Catatan URL Deploy

Tautan beranda di `404.html` dan nilai `image` pada JSON-LD memakai asumsi repositori proyek:
`https://aditiya-saputra.github.io/website-aditiya/`. Jika situs dipasang sebagai *user site*
(`aditiya-saputra.github.io`), ubah tautan tersebut dan tambahkan `canonical`/`og:url` yang sesuai.
`canonical` sengaja belum dipasang karena URL final belum ditetapkan.

## Lisensi

Didistribusikan di bawah lisensi MIT.
