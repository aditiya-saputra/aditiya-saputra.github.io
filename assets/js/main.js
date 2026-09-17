// Tema gelap/terang + search sederhana (tanpa dependensi)
(function () {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

function toggleTheme() {
  const el = document.documentElement;
  const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
  el.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

function filterPosts() {
  const q = (document.getElementById("search")?.value || "").toLowerCase();
  document.querySelectorAll("[data-search]").forEach((card) => {
    const text = card.getAttribute("data-search").toLowerCase();
    card.style.display = text.includes(q) ? "" : "none";
  });
}
