/* =========================================================
   Harshit Buwade — Portfolio
   script.js
   ========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader && loader.classList.add("hidden"), 600);
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();



  /* ---------- Certifications data ---------- */
  const certifications = [
    "NEC'25 IITB — AIR 119",
    "NEC'24 IITB Finalist — AIR 52",
    "RDBMS PostgreSQL Training",
    "CA eDC IIT Delhi",
    "LoR from eDC IIT Delhi",
    "CA IIT Bombay Merit Certificate",
    "Infosys Springboard 2025",
    "AWS Academy Graduate — Cloud Operations",
    "GenAI Powered Data Analytics Job Simulation",
    "Data Analytics Essential — CISCO",
    "R Training Certification",
    "IEEE Volunteer",
  ];
  const certsGrid = document.getElementById("certs-grid");
  if (certsGrid) {
    certifications.forEach((name) => {
      const initials = name
        .replace(/[^A-Za-z0-9 ]/g, " ")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
      const card = document.createElement("div");
      card.className = "cert reveal";
      card.innerHTML = `<span class="cert__icon">${initials}</span><span class="cert__name">${name}</span>`;
      certsGrid.appendChild(card);
    });
  }

  /* ---------- Typing effect ---------- */
  const typedEl = document.getElementById("typed");
  if (typedEl) {
    const phrases = [
      "intelligent ML models.",
      "data-driven solutions.",
      "full-stack web apps.",
      "clean, modern UIs.",
      "AI that solves problems.",
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const current = phrases[pi];
      typedEl.textContent = deleting
        ? current.substring(0, ci--)
        : current.substring(0, ci++);

      let delay = deleting ? 45 : 85;
      if (!deleting && ci === current.length + 1) {
        deleting = true;
        delay = 1600;
      } else if (deleting && ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        delay = 350;
      }
      setTimeout(type, delay);
    }
    type();
  }

  /* ---------- Navbar scroll + active section ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = navLinks
    .map((l) => {
      const href = l.getAttribute("href");
      return href && href.startsWith("#") ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  function onScroll() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);

    // Scroll progress
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    const bar = document.getElementById("scroll-progress");
    if (bar) bar.style.width = pct + "%";

    // Back to top
    const btt = document.getElementById("back-to-top");
    if (btt) btt.classList.toggle("show", window.scrollY > 500);

    // Active section
    let current = "";
    const offset = window.scrollY + 140;
    sections.forEach((sec) => {
      if (sec.offsetTop <= offset) current = "#" + sec.id;
    });
    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === current));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById("nav-toggle");
  const linksWrap = document.getElementById("nav-links");
  if (toggle && linksWrap) {
    const closeMenu = () => {
      toggle.classList.remove("open");
      linksWrap.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = linksWrap.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    linksWrap.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---------- Back to top click ---------- */
  const bttBtn = document.getElementById("back-to-top");
  if (bttBtn) bttBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Scroll reveal + skill bars + counters ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          setTimeout(() => el.classList.add("in"), idx * 70);

          // Skill bars inside this element
          el.querySelectorAll(".bar").forEach((bar) => {
            const fill = bar.querySelector(".bar__fill");
            const level = bar.getAttribute("data-level");
            if (fill && level) fill.style.width = level + "%";
          });

          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // Re-observe dynamically added certs
  document.querySelectorAll(".cert.reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10) || 0;
        const duration = 1500;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------- Cursor glow ---------- */
  const glow = document.getElementById("cursor-glow");
  if (glow && !prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy;
    window.addEventListener("mousemove", (e) => { gx = e.clientX; gy = e.clientY; });
    (function render() {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    })();
  } else if (glow) {
    glow.style.display = "none";
  }

  /* ---------- Magnetic buttons ---------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });

    /* ---------- Card tilt + glow tracking ---------- */
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * -8;
        const ry = (px - 0.5) * 8;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- Smooth anchor scrolling (with offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id === "#" || !id) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });



  /* ---------- Particle background ---------- */
  const canvas = document.getElementById("particles");
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext("2d");
    let w, h, particles;
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4"];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(70, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.55;
        ctx.fill();

        // connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.c;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
  }
})();
