/**
 * main.js — Logika Portofolio Aditiya Saputra
 * - Ambil data profil & repositori publik via GitHub REST API v3
 * - Kurasi deskripsi dan bahasa untuk repo yang tidak memiliki metadata di API
 * - Penanda akurat untuk repo original vs fork
 * - Navigasi mobile toggle & smooth scroll link handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavHighlight();
  loadGitHubData('aditiya-saputra');
});

/**
 * Inisialisasi Mobile Navigation Hamburger Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (!toggleBtn || !siteNav) return;

  toggleBtn.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    toggleBtn.classList.toggle('open');
  });

  // Tutup menu saat salah satu link diklik
  const navLinks = siteNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      toggleBtn.classList.remove('open');
    });
  });
}

/**
 * Highlight nav link berdasarkan posisi scroll pengguna
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * Mengambil profil & repositori dari GitHub API
 * @param {string} username - Nama pengguna GitHub
 */
async function loadGitHubData(username) {
  // Jalankan fetch profil dan repositori secara paralel
  await Promise.allSettled([
    fetchUserProfile(username),
    fetchGitHubRepos(username)
  ]);
}

/**
 * Mengambil informasi user profile untuk memperbarui avatar & metadata
 */
async function fetchUserProfile(username) {
  const userEndpoint = `https://api.github.com/users/${username}`;
  try {
    const res = await fetch(userEndpoint, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!res.ok) return;

    const data = await res.json();
    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl && data.avatar_url) {
      avatarEl.src = data.avatar_url;
    }

    const repoCountEl = document.getElementById('repoCountBadge');
    if (repoCountEl && typeof data.public_repos === 'number') {
      repoCountEl.textContent = `${data.public_repos}`;
    }
  } catch (err) {
    console.warn('Gagal memuat profil GitHub user:', err.message);
  }
}

/**
 * Mengambil daftar repositori dari GitHub API
 * @param {string} username - Nama pengguna GitHub
 */
async function fetchGitHubRepos(username) {
  const statusEl = document.getElementById('repoStatus');
  const container = document.getElementById('projectsContainer');

  if (!container) return;

  const endpoint = `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API merespons dengan status ${response.status}`);
    }

    const repos = await response.json();

    // Saring repo: sembunyikan file khusus profil readme
    const validRepos = repos.filter(repo => {
      return repo.name.toLowerCase() !== username.toLowerCase();
    });

    if (validRepos.length === 0) {
      if (statusEl) statusEl.textContent = 'Menampilkan kurasi arsip proyek';
      return;
    }

    // Render kartu proyek secara dinamis
    renderProjects(validRepos, container);
    if (statusEl) {
      statusEl.textContent = `Sinkronisasi live (${validRepos.length} repositori terhubung)`;
    }
  } catch (error) {
    console.warn('Gagal memuat repositori dari GitHub API:', error.message);
    if (statusEl) {
      statusEl.textContent = 'Menampilkan arsip kurasi lokal (API offline / limit)';
    }
  }
}

/**
 * Render elemen kartu proyek ke DOM
 * @param {Array} repos - Daftar objek repositori
 * @param {HTMLElement} container - Kontainer target
 */
function renderProjects(repos, container) {
  // Deskripsi kurasi cadangan untuk repository tanpa deskripsi di GitHub
  const curatedDescriptions = {
    'Brantas-Judol': 'Instrumen otomasi deteksi dan proteksi siber berbasis script Python.',
    'mirai-bot': 'Medical Information and Response Artificial Intelligence — Discord health assistant bot untuk komunitas H.E.L.I.X.',
    'low-chromium': 'Modifikasi Chromium untuk kinerja optimal pada perangkat berspesifikasi rendah.',
    'kanna': 'Skill AI agent fact-verifying tsundere coder dengan protokol gerbang ketat.',
    'nova': 'Eksperimen script automasi cerdas berbasis Python.',
    'builder-server-skill': 'Skill integrasi server dan otomasi build.',
    'LLMs-from-scratch': 'Eksperimen arsitektur model bahasa tingkat rendah menggunakan PyTorch.',
    'dibawah-layar': 'Dokumentasi riset antara keamanan, teknologi, dan hak atas privasi.',
    'RVC-Inference': 'Inferensi model Retrieval-based Voice Conversion secara modular.',
    'aditiya-saputra.github.io': 'Repositori sumber website landing page portofolio resmi.'
  };

  // Bahasa/teknologi kurasi untuk repository yang language-nya null di GitHub
  const curatedLanguages = {
    'mirai-bot': 'Python',
    'kanna': 'AI Skill / Markdown',
    'low-chromium': 'C++ / Patch',
    'LLMs-from-scratch': 'Python / PyTorch',
    'dibawah-layar': 'Dokumentasi / Riset',
    'builder-server-skill': 'Python / Automation'
  };

  container.innerHTML = '';

  repos.forEach(repo => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const lang = repo.language || curatedLanguages[repo.name] || 'Dokumen / Kode';
    const desc = repo.description || curatedDescriptions[repo.name] || 'Repositori proyek pengembangan Aditiya Saputra.';
    
    // Khusus mirai-bot, arahkan ke repo upstream organisasi resmi helix-dcid
    const targetUrl = repo.name === 'mirai-bot' ? 'https://github.com/helix-dcid/mirai-bot' : repo.html_url;
    const displayName = repo.name === 'mirai-bot' ? 'mirai-bot (Mirai Helix)' : repo.name;

    // Status tipe repo (Original vs Fork vs Stars)
    let typeTag = 'Original';
    if (repo.fork) {
      typeTag = 'Fork';
    } else if (repo.stargazers_count > 0) {
      typeTag = `★ ${repo.stargazers_count}`;
    }

    const githubIconSvg = `<svg class="platform-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`;

    card.innerHTML = `
      <div class="card-header">
        <span class="card-type ${repo.fork ? 'card-fork' : ''}">${escapeHtml(typeTag)}</span>
        <span class="card-lang">${escapeHtml(lang)}</span>
      </div>
      <h3 class="card-title">
        <a href="${targetUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayName)}</a>
      </h3>
      <p class="card-desc">${escapeHtml(desc)}</p>
      <div class="card-footer">
        <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="card-link">${githubIconSvg} Lihat di GitHub ${repo.name === 'mirai-bot' ? '(helix-dcid)' : ''} →</a>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Mencegah XSS dari data inputan API
 * @param {string} str - Teks mentah
 * @returns {string} Teks tersanitasi
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
