(() => {
  const grid = document.getElementById("sensorGrid");
  if (grid) {
    const cols = 24;
    const rows = 16;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement("span");
      const x = i % cols;
      const y = Math.floor(i / cols);
      const cx = (cols - 1) / 2;
      const cy = (rows - 1) / 2;
      const dist = Math.hypot(x - cx, y - cy);
      const v = Math.max(0.12, 1 - dist / 14) * (0.55 + Math.random() * 0.45);
      cell.style.setProperty("--v", v.toFixed(3));
      cell.style.setProperty("--d", `${(dist * 0.08 + Math.random() * 0.6).toFixed(2)}s`);
      frag.appendChild(cell);
    }
    grid.appendChild(frag);
  }

  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  menuBtn?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuBtn?.setAttribute("aria-expanded", "false");
    });
  });

  const langToggle = document.getElementById("langToggle");
  const applyLang = (en) => {
    document.body.classList.toggle("en-mode", en);
    document.documentElement.lang = en ? "en" : "zh-CN";
    if (langToggle) langToggle.textContent = en ? "中文" : "EN";
    localStorage.setItem("percept-lab-lang", en ? "en" : "zh");
  };
  applyLang(localStorage.getItem("percept-lab-lang") === "en");
  langToggle?.addEventListener("click", () => {
    applyLang(!document.body.classList.contains("en-mode"));
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }
})();
