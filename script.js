// =========================================================
// George Jameson Obed — website interactions
// Each numbered part below is one feature of the site.
// =========================================================

const root = document.documentElement;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
};

// ---------------------------------------------------------
// 1. LANGUAGES
//    English text lives in index.html. All other languages live in
//    translations.js. The menu below switches between them.
// ---------------------------------------------------------
const LANGS = [
  { code: "en", label: "English",   short: "EN", flag: "gb", html: "en" },
  { code: "sw", label: "Kiswahili", short: "SW", flag: "tz", html: "sw" },
  { code: "ar", label: "العربية",    short: "AR", flag: "sa", html: "ar", rtl: true },
  { code: "fr", label: "Français",  short: "FR", flag: "fr", html: "fr" },
  { code: "zh", label: "中文",       short: "中文", flag: "cn", html: "zh-CN" },
  { code: "pt", label: "Português", short: "PT", flag: "pt", html: "pt-PT" }
];
const I18N = window.I18N || {};
const MSGS = window.I18N_MSG || {};
const MSG = new Proxy({}, { get: (_, l) => MSGS[l] || MSGS.en });

const savedLang = store.get("lang");
let lang = LANGS.some(l => l.code === savedLang) ? savedLang : "en";
window.siteLang = () => lang;
const i18nEls = document.querySelectorAll("[data-i18n]");
const english = new Map();
i18nEls.forEach(el => english.set(el, el.innerHTML));
const langListeners = [];
window.onLangChange = fn => langListeners.push(fn);

// ---- Month names in dates such as "Jan – May 2022" ----
const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTHS = {
  sw: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Des"],
  fr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],
  pt: ["jan.","fev.","mar.","abr.","maio","jun.","jul.","ago.","set.","out.","nov.","dez."],
  ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]
};
const M = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
function localizeDate(text, l) {
  if (l === "en") return text;
  const idx = m => MONTHS_EN.indexOf(m);
  if (l === "zh") {
    let t = text.replace(new RegExp("^" + M + " – " + M + " (\\d{4})$"), (_, a, b, y) => `${y}年${idx(a) + 1}月–${idx(b) + 1}月`);
    return t.replace(new RegExp(M + " (\\d{4})", "g"), (_, a, y) => `${y}年${idx(a) + 1}月`);
  }
  return text.replace(new RegExp("\\b" + M + "\\b", "g"), m => MONTHS[l][idx(m)]);
}
const dateEls = [...document.querySelectorAll(".card-tag, .t-date, .j-year, .news-item time")]
  .filter(el => !el.hasAttribute("data-i18n") && new RegExp(M).test(el.textContent));
dateEls.forEach(el => { el.dataset.en = el.textContent; });

// ---- Language menu ----
const langBtn = document.getElementById("langBtn");
const langList = document.getElementById("langList");
const langFlag = document.getElementById("langFlag");
const langCode = document.getElementById("langCode");
LANGS.forEach(l => {
  const li = document.createElement("li");
  li.innerHTML = `<button type="button" role="menuitemradio" lang="${l.html}" data-lang="${l.code}"><img src="assets/flags/${l.flag}.svg" alt="" width="24" height="18"><span>${l.label}</span></button>`;
  langList.appendChild(li);
});
function closeLangMenu() { langList.hidden = true; langBtn.setAttribute("aria-expanded", "false"); }
langBtn.addEventListener("click", e => {
  e.stopPropagation();
  const open = langList.hidden;
  langList.hidden = !open;
  langBtn.setAttribute("aria-expanded", String(open));
  if (open) langList.querySelector(`[data-lang="${lang}"]`).focus();
});
langList.addEventListener("click", e => {
  const b = e.target.closest("button[data-lang]");
  if (!b) return;
  lang = b.dataset.lang;
  store.set("lang", lang);
  applyLang();
  closeLangMenu();
  langBtn.focus();
});
langList.addEventListener("keydown", e => {
  const items = [...langList.querySelectorAll("button")];
  const i = items.indexOf(document.activeElement);
  if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
  if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  if (e.key === "Escape") { closeLangMenu(); langBtn.focus(); }
});
document.addEventListener("click", e => { if (!langList.hidden && !e.target.closest(".lang")) closeLangMenu(); });

function applyLang() {
  const info = LANGS.find(l => l.code === lang);
  const dict = I18N[lang] || {};
  i18nEls.forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = (lang !== "en" && dict[key]) ? dict[key] : english.get(el);
  });
  dateEls.forEach(el => { el.textContent = localizeDate(el.dataset.en, lang); });
  root.lang = info.html;
  root.dir = info.rtl ? "rtl" : "ltr";
  langFlag.src = `assets/flags/${info.flag}.svg`;
  langCode.textContent = info.short;
  langList.querySelectorAll("button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.lang === lang)));
  langListeners.forEach(fn => fn(lang));
}

// ---------------------------------------------------------
// 2. LIGHT / DARK MODE
// ---------------------------------------------------------
const savedTheme = store.get("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);
else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");

document.getElementById("themeToggle").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  store.set("theme", next);
});

// ---------------------------------------------------------
// 3. MOBILE MENU + NAV BAR + ACTIVE LINK
// ---------------------------------------------------------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 30), { passive: true });

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.querySelectorAll("a").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => sectionObserver.observe(s));

// ---------------------------------------------------------
// 4. FADE-IN ON SCROLL + COUNTING NUMBERS
// ---------------------------------------------------------
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target, target = Number(el.dataset.count), t0 = performance.now(), dur = 1400;
    (function tick(now) {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

// ---------------------------------------------------------
// 5. SMALL POP-UP MESSAGE ("toast")
// ---------------------------------------------------------
const toast = document.getElementById("toast");
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// ---------------------------------------------------------
// 6. PUBLICATIONS: filter buttons + "copy citation"
// ---------------------------------------------------------
const filters = document.querySelectorAll(".filter");
const pubs = document.querySelectorAll(".pub");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.toggle("active", b === btn));
  const f = btn.dataset.filter;
  pubs.forEach(p => { p.hidden = !(f === "all" || p.dataset.type === f); });
}));

document.addEventListener("click", async e => {
  const mail = e.target.closest(".copy-email");
  if (mail) {
    try { await navigator.clipboard.writeText(mail.dataset.email); showToast(MSG[lang].emailCopied); }
    catch (err) { showToast(MSG[lang].copyFail); }
    return;
  }
  const btn = e.target.closest(".cite-btn");
  if (!btn) return;
  try {
    await navigator.clipboard.writeText(btn.dataset.cite);
    showToast(MSG[lang].copied);
  } catch (err) {
    showToast(MSG[lang].copyFail);
  }
});

// ---------------------------------------------------------
// 7. ROTATING 3D GLOBE
//    Add or move a place by editing this list.
//    Coordinates are [longitude, latitude] — note: longitude FIRST.
//    type: "field" (teal pin) or "talk" (ochre pin)
// ---------------------------------------------------------
const SITES = [
  { lonlat: [35.7516, -6.1630], type: "field",
    en: { name: "Dodoma Urban, Tanzania", text: "MSc fieldwork: zoonotic and antimicrobial-resistant bacteria in invasive Indian House Crows." },
    sw: { name: "Jiji la Dodoma, Tanzania", text: "Kazi ya shambani ya Uzamili: bakteria wa zoonotiki na walio sugu kwa dawa kwa Kunguru wa Kihindi vamizi." } },
  { lonlat: [35.8094, -6.2117], type: "field",
    en: { name: "University of Dodoma", text: "BSc Biology (2019–2022), Moringa bioprospecting project, and volunteer teaching in microbiology and parasitology." },
    sw: { name: "Chuo Kikuu cha Dodoma", text: "Shahada ya Kwanza ya Biolojia (2019–2022), mradi wa mlonge, na ufundishaji wa kujitolea wa mikrobiolojia na parasitolojia." } },
  // NOTE: check these Nghumbi coordinates and correct them if needed
  { lonlat: [35.9500, -6.0500], type: "field",
    en: { name: "Nghumbi, semi-arid central Tanzania", text: "MKARUN: root-nodule microbiomes, soil health and farmer training." },
    sw: { name: "Nghumbi, eneo kame la kati Tanzania", text: "MKARUN: vijidudu vya vinundu vya mizizi, afya ya udongo na mafunzo kwa wakulima." } },
  { lonlat: [32.7500, -5.0500], type: "field",
    en: { name: "TARI Tumbi, Tabora", text: "Internship in agroforestry, seed development and multiplication (2021)." },
    sw: { name: "TARI Tumbi, Tabora", text: "Mafunzo kwa vitendo kuhusu kilimo mseto, uendelezaji na uzalishaji wa mbegu (2021)." } },
  { lonlat: [37.6597, -6.8486], type: "field",
    en: { name: "Sokoine University of Agriculture, Morogoro", text: "One Health pathogen genomics and metagenomics hands-on training with SACIDS (2023)." },
    sw: { name: "Chuo Kikuu cha Kilimo cha Sokoine, Morogoro", text: "Mafunzo kwa vitendo ya jenomiki ya vimelea na metagenomiki pamoja na SACIDS (2023)." } },
  { lonlat: [10.4022, 63.4195], type: "field",
    en: { name: "NTNU, Trondheim, Norway", text: "MSc in Natural Resources Management – Biology (2025–2027) and OECM research report." },
    sw: { name: "NTNU, Trondheim, Norwei", text: "Shahada ya Uzamili katika Usimamizi wa Maliasili – Biolojia (2025–2027) na ripoti ya utafiti wa OECM." } },
  { lonlat: [-76.4951, 44.2253], type: "talk",
    en: { name: "Kingston, Canada", text: "27th North American Symbiotic Nitrogen Fixation Conference, June 2026 — co-authored oral and poster presentations, presented by K. C. Mercurio." },
    sw: { name: "Kingston, Kanada", text: "Mkutano wa 27 wa Amerika Kaskazini kuhusu Ufungaji wa Naitrojeni, Juni 2026 — wasilisho na bango nilioandika pamoja, viliwasilishwa na K. C. Mercurio." } },
  { lonlat: [-77.8599, 40.7982], type: "talk",
    en: { name: "Penn State, USA", text: "Penn State Water Conference, March 2026 — co-authored flash talk and poster, presented by K. C. Mercurio." },
    sw: { name: "Penn State, Marekani", text: "Mkutano wa Maji wa Penn State, Machi 2026 — wasilisho fupi na bango nilioandika pamoja, viliwasilishwa na K. C. Mercurio." } }
];

const siteT = (i, l) => SITES[i][l] || ((window.SITE_TEXT || {})[l] || [])[i] || SITES[i].en;

(function globe() {
  const canvas = document.getElementById("globe");
  if (!canvas || !window.d3 || !window.topojson || !window.WORLD_TOPO) return;
  const ctx = canvas.getContext("2d");
  const card = document.getElementById("globeCard");
  const legend = document.getElementById("mapLegend");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const world = window.WORLD_TOPO;
  const land = topojson.feature(world, world.objects.land);
  const countries = topojson.feature(world, world.objects.countries).features;
  const highlight = countries.filter(c => c.id === "834" || c.id === "578");   // Tanzania, Norway
  const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
  const graticule = d3.geoGraticule10();
  const sphere = { type: "Sphere" };

  const projection = d3.geoOrthographic().clipAngle(90).precision(0.6);
  const path = d3.geoPath(projection, ctx);
  let size = 0, base = 0, zoom = 1;
  let rotation = [-20, -10, 0];          // start centred near East Africa / Europe
  let selected = -1, anim = null, dragging = false, visible = true, idleTimer = null;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    size = canvas.clientWidth;
    canvas.width = size * ratio; canvas.height = size * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    base = size / 2 - 10;
  }

  function css(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  const dark = () => root.getAttribute("data-theme") === "dark";

  function draw(t) {
    const primary = css("--primary"), accent = css("--accent");
    projection.translate([size / 2, size / 2]).scale(base * zoom).rotate(rotation);
    ctx.clearRect(0, 0, size, size);

    // soft glow behind the globe
    const r = base * zoom, cx = size / 2, cy = size / 2;
    const glow = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.08);
    glow.addColorStop(0, dark() ? "rgba(60,196,168,.25)" : "rgba(15,107,92,.18)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, r * 1.08, 0, Math.PI * 2); ctx.fill();

    // ocean
    const ocean = ctx.createRadialGradient(cx - r * .35, cy - r * .35, r * .1, cx, cy, r);
    if (dark()) { ocean.addColorStop(0, "#1b4a41"); ocean.addColorStop(1, "#0b201c"); }
    else { ocean.addColorStop(0, "#e4f2ee"); ocean.addColorStop(1, "#a9d1c7"); }
    ctx.beginPath(); path(sphere); ctx.fillStyle = ocean; ctx.fill();

    // grid lines
    ctx.beginPath(); path(graticule);
    ctx.strokeStyle = dark() ? "rgba(255,255,255,.07)" : "rgba(15,107,92,.12)"; ctx.lineWidth = .7; ctx.stroke();

    // land
    ctx.beginPath(); path(land);
    ctx.fillStyle = dark() ? "#2b3d37" : "#f6f0e4"; ctx.fill();
    ctx.strokeStyle = dark() ? "rgba(255,255,255,.18)" : "rgba(31,42,40,.25)"; ctx.lineWidth = .6; ctx.stroke();

    // Tanzania & Norway highlighted
    highlight.forEach(f => {
      ctx.beginPath(); path(f);
      ctx.fillStyle = f.id === "834" ? primary : accent; ctx.globalAlpha = .75; ctx.fill(); ctx.globalAlpha = 1;
    });

    // country borders
    ctx.beginPath(); path(borders);
    ctx.strokeStyle = dark() ? "rgba(255,255,255,.12)" : "rgba(31,42,40,.15)"; ctx.lineWidth = .5; ctx.stroke();

    // pins
    const center = [-rotation[0], -rotation[1]];
    SITES.forEach((s, i) => {
      s.visible = d3.geoDistance(s.lonlat, center) < Math.PI / 2 - 0.05;
      if (!s.visible) return;
      const [x, y] = projection(s.lonlat);
      s.xy = [x, y];
      const col = s.type === "talk" ? accent : primary;
      if (!reduce) {
        const pulse = ((t / 1600 + i * .2) % 1);
        ctx.beginPath(); ctx.arc(x, y, 5 + pulse * 14, 0, Math.PI * 2);
        ctx.strokeStyle = col; ctx.globalAlpha = 1 - pulse; ctx.lineWidth = 2; ctx.stroke(); ctx.globalAlpha = 1;
      }
      ctx.beginPath(); ctx.arc(x, y, i === selected ? 7.5 : 5.5, 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = "#fff"; ctx.stroke();
    });

    // rim
    ctx.beginPath(); path(sphere);
    ctx.strokeStyle = dark() ? "rgba(255,255,255,.15)" : "rgba(15,107,92,.35)"; ctx.lineWidth = 1.2; ctx.stroke();
  }

  function loop(t) {
    if (visible) {
      if (!dragging && !anim && selected < 0 && !reduce) rotation[0] += 0.12;
      if (anim) {
        const k = Math.min(1, (t - anim.start) / anim.dur);
        const e = d3.easeCubicInOut(k);
        rotation = anim.rot(e); zoom = anim.zoom(e);
        if (k === 1) anim = null;
      }
      draw(t);
    }
    requestAnimationFrame(loop);
  }

  function animateTo(rot, z) {
    anim = { start: performance.now(), dur: 1300, rot: d3.interpolate(rotation.slice(), rot), zoom: d3.interpolate(zoom, z) };
  }

  const esc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function select(i) {
    selected = i;
    const s = SITES[i], t = siteT(i, window.siteLang());
    animateTo([-s.lonlat[0], -s.lonlat[1], 0], s.lonlat[1] < 10 && s.lonlat[0] > 30 ? 1.6 : 1.3);
    card.innerHTML = `<strong>${esc(t.name)}</strong><p>${esc(t.text)}</p>`;
    card.hidden = false;
    legend.querySelectorAll("button").forEach((b, j) => b.classList.toggle("active", j === i));
    clearTimeout(idleTimer);
    idleTimer = setTimeout(deselect, 9000);
  }
  function deselect() {
    if (selected < 0) return;
    selected = -1; card.hidden = true;
    legend.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    animateTo([rotation[0], -10, 0], 1);
  }

  function buildLegend() {
    const l = window.siteLang();
    legend.innerHTML = "";
    SITES.forEach((s, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<button type="button"><span class="dot ${s.type === "talk" ? "talk" : ""}"></span><span><strong>${esc(siteT(i, l).name)}</strong><small>${esc(siteT(i, l).text)}</small></span></button>`;
      li.querySelector("button").addEventListener("click", () => select(i));
      legend.appendChild(li);
    });
    if (selected >= 0) { const t = siteT(selected, l); card.innerHTML = `<strong>${esc(t.name)}</strong><p>${esc(t.text)}</p>`; legend.querySelectorAll("button")[selected].classList.add("active"); }
  }

  // drag to rotate, click a pin to select
  let start = null;
  canvas.addEventListener("pointerdown", e => {
    start = { x: e.clientX, y: e.clientY, rot: rotation.slice(), moved: false };
    dragging = true; anim = null; canvas.classList.add("dragging");
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", e => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) start.moved = true;
    const k = 75 / (base * zoom);
    rotation = [start.rot[0] + dx * k, Math.max(-75, Math.min(75, start.rot[1] - dy * k)), 0];
  });
  canvas.addEventListener("pointerup", e => {
    dragging = false; canvas.classList.remove("dragging");
    if (start && !start.moved) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      let best = -1, bestD = 16;
      SITES.forEach((s, i) => { if (s.visible && s.xy) { const d = Math.hypot(s.xy[0] - x, s.xy[1] - y); if (d < bestD) { bestD = d; best = i; } } });
      if (best >= 0) select(best); else deselect();
    } else if (selected >= 0) { clearTimeout(idleTimer); idleTimer = setTimeout(deselect, 9000); }
    start = null;
  });

  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(canvas);
  window.addEventListener("resize", resize);
  window.onLangChange(buildLegend);
  resize(); buildLegend(); draw(0); requestAnimationFrame(loop);
})();

// ---------------------------------------------------------
// 8. PHOTO GALLERY: full-screen viewer (lightbox)
// ---------------------------------------------------------
const gItems = [...document.querySelectorAll(".g-item")];
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let lbIndex = 0, lastFocus = null;

function openLightbox(i) {
  lbIndex = (i + gItems.length) % gItems.length;
  const img = gItems[lbIndex].querySelector("img");
  lbImg.src = img.dataset.full || img.currentSrc || img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = gItems[lbIndex].querySelector("figcaption").textContent;
  if (lb.hidden) { lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = "hidden"; }
  document.getElementById("lbClose").focus();
}
function closeLightbox() {
  lb.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
gItems.forEach((item, i) => item.querySelector("button").addEventListener("click", () => openLightbox(i)));
document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => openLightbox(lbIndex - 1));
document.getElementById("lbNext").addEventListener("click", () => openLightbox(lbIndex + 1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
  if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
});

// ---------------------------------------------------------
// 9. CONTACT FORM (sent through Formspree, free)
// ---------------------------------------------------------
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
form.addEventListener("submit", async e => {
  e.preventDefault();
  if (form.action.includes("YOUR_FORM_ID")) { formStatus.textContent = MSG[lang].notReady; return; }
  formStatus.textContent = MSG[lang].sending;
  try {
    const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    formStatus.textContent = MSG[lang].sent;
  } catch (err) {
    formStatus.textContent = MSG[lang].failed;
  }
});

// ---------------------------------------------------------
// 10. FOOTER YEAR
// ---------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------
// 11. ANIMATED "MICROBES" IN THE HERO BACKGROUND
// ---------------------------------------------------------
const canvas = document.getElementById("microbes");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let microbes = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
function makeMicrobes() {
  const count = Math.min(28, Math.floor(canvas.offsetWidth / 45));
  microbes = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight,
    len: 10 + Math.random() * 22, w: 5 + Math.random() * 5,
    angle: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.004,
    vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    round: Math.random() < 0.35,
    hue: Math.random() < 0.6 ? "primary" : "accent"
  }));
}
function draw() {
  const styles = getComputedStyle(root);
  const colors = { primary: styles.getPropertyValue("--primary").trim(), accent: styles.getPropertyValue("--accent").trim() };
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  ctx.clearRect(0, 0, W, H);
  microbes.forEach(m => {
    m.x += m.vx; m.y += m.vy; m.angle += m.spin;
    if (m.x < -40) m.x = W + 40; if (m.x > W + 40) m.x = -40;
    if (m.y < -40) m.y = H + 40; if (m.y > H + 40) m.y = -40;
    ctx.save();
    ctx.translate(m.x, m.y); ctx.rotate(m.angle);
    ctx.strokeStyle = colors[m.hue]; ctx.fillStyle = colors[m.hue]; ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (m.round) ctx.arc(0, 0, m.w, 0, Math.PI * 2);
    else if (ctx.roundRect) ctx.roundRect(-m.len / 2, -m.w / 2, m.len, m.w, m.w / 2);
    else ctx.rect(-m.len / 2, -m.w / 2, m.len, m.w);
    ctx.globalAlpha = 0.12; ctx.fill();
    ctx.globalAlpha = 0.4; ctx.stroke();
    ctx.restore();
  });
  if (!reduceMotion) requestAnimationFrame(draw);
}
resizeCanvas(); makeMicrobes(); draw();
window.addEventListener("resize", () => { resizeCanvas(); makeMicrobes(); if (reduceMotion) draw(); });


// ---------------------------------------------------------
// 12. READING PROGRESS BAR + BACK-TO-TOP BUTTON
// ---------------------------------------------------------
const progress = document.getElementById("progress");
const topBtn = document.getElementById("topBtn");
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
  topBtn.classList.toggle("show", window.scrollY > 900);
}
window.addEventListener("scroll", onScroll, { passive: true });
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
onScroll();

// ---------------------------------------------------------
// 13. SOFT SPOTLIGHT THAT FOLLOWS THE MOUSE ON CARDS
// ---------------------------------------------------------
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".card, .outreach, .pub, .gl-tile, .connect").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
    el.addEventListener("pointerleave", () => { el.style.removeProperty("--mx"); el.style.removeProperty("--my"); });
  });
}

// ---------------------------------------------------------
// 14. JOURNEY TIMELINE ARROWS
// ---------------------------------------------------------
const track = document.getElementById("journeyTrack");
const jPrev = document.getElementById("jPrev"), jNext = document.getElementById("jNext");
if (track) {
  const step = () => track.querySelector(".j-item").offsetWidth + 22;
  const update = () => {
    jPrev.disabled = track.scrollLeft < 10;
    jNext.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 10;
  };
  jPrev.addEventListener("click", () => track.scrollBy({ left: -step() * 2 }));
  jNext.addEventListener("click", () => track.scrollBy({ left: step() * 2 }));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

// Apply the saved language last (after everything is built)
applyLang();
