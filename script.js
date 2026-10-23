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
// 1. SWAHILI TRANSLATIONS
//    English text lives in index.html. Kiswahili lives here.
//    To fix or improve a translation, just edit the text.
// ---------------------------------------------------------
const SW = {
  "skip": "Ruka hadi maudhui makuu",
  "nav.about": "Kuhusu", "nav.research": "Utafiti", "nav.outreach": "Ugani", "nav.pubs": "Machapisho",
  "nav.gallery": "Picha", "nav.news": "Habari", "nav.contact": "Mawasiliano",

  "hero.eyebrow": "Mwanabiolojia · Mtaalamu wa Ikolojia ya Vijidudu · Msimamizi wa Maliasili",
  "hero.role": "Mtaalamu wa Ikolojia ya Vijidudu na Mwanabiolojia wa Maliasili",
  "hero.lead": "Ninachunguza jinsi viumbe vidogo vinavyoathiri udongo, wanyamapori na afya ya binadamu — kuanzia bakteria wanaofunga naitrojeni katika maeneo kame ya Tanzania hadi bakteria sugu kwa dawa wanaobebwa na ndege vamizi — na jinsi maarifa haya yanavyoweza kuongoza usimamizi endelevu wa maliasili.",
  "hero.btn1": "Gundua utafiti wangu", "hero.cv": "Pakua CV",
  "badge1": "Ikolojia ya vijidudu", "badge2": "Maliasili", "badge3": "Tanzania · Norwei",

  "about.label": "01 — Kuhusu", "about.title": "Shauku ya maisha katika mazingira magumu",
  "about.p1": "Mimi ni <strong>mwanabiolojia</strong> na mwanafunzi wa Shahada ya Uzamili katika <strong>Usimamizi wa Maliasili – Biolojia</strong> katika Chuo Kikuu cha Sayansi na Teknolojia cha Norwei (NTNU), nikifadhiliwa na udhamini wa NORSTIP. Uzoefu wangu unajumuisha mikrobiolojia, ikolojia ya vijidudu, biolojia ya molekuli na utafiti wa mazingira — sehemu kubwa ukiwa umefanyika katika maeneo kame ya kati ya Tanzania.",
  "about.p2": "Ninavutiwa hasa na jinsi <strong>bioanuai na kazi za vijidudu</strong> zinavyohusiana na hali ya mazingira, sifa za udongo na michakato ya mifumo ikolojia, hasa katika <strong>maeneo kame na mazingira mengine magumu</strong>. Mbali na utafiti, ninashirikiana kwa karibu na jamii — kuwafundisha wakulima wadogo kuhusu afya ya udongo na kufundisha mikrobiolojia kwa wanafunzi wa shahada ya kwanza.",
  "stat1": "miaka katika utafiti", "stat2": "miradi ya utafiti", "stat3": "michango ya mikutano niliyoandika pamoja",

  "res.label": "02 — Utafiti", "res.title": "Ninachofanyia kazi",
  "res.c1.tag": "Utafiti wa Uzamili · NTNU",
  "res.c1.title": "Bakteria wa zoonotiki na sugu kwa dawa kwa kunguru vamizi",
  "res.c1.text": "Kuchunguza mambo ya kiikolojia na ya kibinadamu yanayohusiana na bakteria wa zoonotiki na walio sugu kwa dawa kwa Kunguru wa Kihindi vamizi (<i>Corvus splendens</i>) katika Jiji la Dodoma, Tanzania — swali la Afya Moja (One Health) linalogusa wanyamapori, binadamu na mazingira.",
  "res.sup": "Wasimamizi:",
  "res.c2.title": "Afya ya udongo na vijidudu vinavyofunga naitrojeni katika maeneo kame ya Tanzania",
  "res.c2.text": "Kuchunguza vijidudu vya vinundu vya mizizi ya mikunde inayostahimili ukame katika mashamba ya wakulima wadogo Nghumbi kwa kutumia mfuatano wa jeni za 16S na nifH, na kujenga mkusanyiko wa bakteria wanaofunga naitrojeni na vijidudu vingine vya ndani ya mimea.",
  "res.c2.meta": "Msaidizi wa Utafiti na Mwanachama wa Timu ya Mradi · 2023 – sasa",
  "res.c3.tag": "Utafutaji wa rasilimali za kibiolojia · UDOM",
  "res.c3.title": "Uwezo wa <i>Moringa oleifera</i> (mlonge) kuua vimelea",
  "res.c3.text": "Kupima dondoo ghafi za mbegu na majani ya <i>Moringa oleifera</i> dhidi ya <i>Escherichia coli</i>, <i>Salmonella</i> Typhi na <i>Candida albicans</i> — kuchunguza mimea kama chanzo cha dawa mpya za kuua vimelea.",
  "res.c3.meta": "Mradi wa utafiti wa Shahada ya Kwanza · 2022",
  "res.c4.tag": "Uchambuzi wa data · NTNU",
  "res.c4.title": "Viashiria vya vijidudu kwa nzi wa porini (scuttle flies)",
  "res.c4.text": "Kutumia uchambuzi wa kibaguzi (discriminant analysis) katika R kupima kama bakteria wa ndani (endosymbionts) na bakteria wengine wanaweza kuwa viashiria vya jinsia, spishi, eneo na msimu kwa nzi wa porini (Diptera: Phoridae).",
  "res.c4.meta": "Makala inaandaliwa",
  "res.interests": "Maeneo ya utafiti",
  "chip1": "Ikolojia ya vijidudu", "chip2": "Mikrobiolojia ya udongo", "chip3": "Mazingira magumu na maeneo kame",
  "chip4": "Usugu wa vimelea dhidi ya dawa", "chip5": "Magonjwa ya wanyamapori", "chip6": "Ufungaji wa naitrojeni",
  "chip7": "Utafutaji wa rasilimali za kibiolojia (bioprospecting)", "chip8": "Sera za maliasili",

  "exp.label": "03 — Uzoefu", "exp.title": "Uzoefu na mafunzo",
  "exp.d1": "Jul 2026 – sasa", "exp.t1": "Mtafiti wa Uzamili",
  "exp.p1": "Nilikamata Kunguru wa Kihindi 53 kwa kutumia mitego ya ngazi yenye chambo na kukusanya maudhui ya utumbo wao kwa ajili ya kutenga bakteria. Kisha nilitenga na kutambua bakteria wa utumbo kwa uoteshaji na vipimo vya kibiokemia, na kupima usugu wao dhidi ya dawa kwa njia ya Kirby–Bauer. Sambamba na kazi za maabara, nilikusanya data za mazingira na za shughuli za binadamu, ambazo sasa ninazichambua ili kuelewa jinsi maeneo ya sampuli na shughuli za binadamu zinavyohusiana na ubebaji wa bakteria na mifumo ya usugu.",
  "exp.d2": "Jul 2023 – sasa", "exp.t2": "Msaidizi wa Utafiti na Mwanachama wa Timu ya Mradi — MKARUN",
  "exp.p2": "Nilikusanya sampuli za vinundu vya mizizi kutoka mikunde inayostahimili ukame katika mashamba ya wakulima wadogo kwa misimu miwili, nikachimba DNA kwa ajili ya mfuatano wa 16S na nifH, na kujenga mkusanyiko wa bakteria wanaofunga naitrojeni na vijidudu vingine vya ndani ya mimea kwa kutumia virutubisho teule na visivyo teule. Pia ninatoa ushauri wa usanifu na mbinu za utafiti kuhusu kilimo mseto cha Gliricidia na tafiti za mazao funika na vijidudu.",
  "exp.t3": "Mradi wa Utafiti wa Shahada ya Kwanza",
  "exp.p3": "Niliandaa dondoo ghafi za majani na mbegu za <i>Moringa oleifera</i> (mlonge) kwa njia ya kuloweka, na kupima uwezo wa viwango tofauti kuua <i>Escherichia coli</i>, <i>Salmonella</i> Typhi na <i>Candida albicans</i> kwa njia ya agar well diffusion. Kisha nilichambua matokeo na kuandika ripoti ya utafiti kama sehemu ya Shahada yangu ya Kwanza ya Biolojia.",
  "exp.sup3": "Msimamizi:",
  "exp.t4": "Kilimo Mseto, Uendelezaji na Uzalishaji wa Mbegu",
  "exp.p4": "Nilikuza na kutunza miti ya asili na ya matunda kupitia uendelezaji na uzalishaji wa mbegu kwa vitendo, ikiwemo <i>Vitex mombasae</i>, <i>Vitex doniana</i>, <i>Strychnos cocculoides</i>, mng'ongo (<i>Sclerocarya birrea</i>), mikorosho (<i>Anacardium occidentale</i>), michungwa na miembe.",
  "train.head": "Mafunzo niliyohudhuria",
  "exp.t5": "CIRTification: Mafunzo ya Ushirikishaji wa Jamii katika Utafiti — Ulinzi wa Washiriki wa Utafiti",
  "exp.p5": "Mafunzo yalihusu maadili ya utafiti, vigezo na upatikanaji wa washiriki, ridhaa ya washiriki, Bodi za Maadili (IRB), ukusanyaji na ulinzi wa data, na utafiti wa shambani wenye maadili.",

  "out.label": "04 — Ufundishaji, ugani na ushirikishaji jamii",
  "out.title": "Kushirikisha sayansi na wakulima na wanafunzi",
  "out.d1": "Jul 2023 – sasa", "out.t1": "Mafunzo kwa wakulima na utafiti shirikishi",
  "out.p1": "Ninawafundisha wakulima wadogo dhana za afya ya udongo katika mazingira kame na kuwezesha maamuzi ya pamoja kwa jaribio la mazao funika linalohusisha mashamba mengi. Pamoja na timu ya mradi, nilishiriki kuandaa zana za wakulima za udhibiti husishi wa visumbufu — utambuzi wa wadudu wa eneo hilo na njia rahisi za kuchukua sampuli — na kuzitafsiri kutoka Kiingereza kwenda Kiswahili.",
  "out.t2": "Mwanasayansi wa Maabara wa Kujitolea — Biolojia",
  "out.p2": "Niliwafundisha wanafunzi wa shahada ya kwanza nadharia ya mikrobiolojia na parasitolojia kabla ya vipindi vya maabara na kuwasimamia wakati wa mazoezi. Pia nilisaidia kusimamia na kutunza mradi wa ufugaji nyuki wa Idara ya Biolojia.",

  "pub.label": "05 — Machapisho, ripoti na mawasilisho", "pub.title": "Uandishi na mawasilisho",
  "pub.f.all": "Zote", "pub.f.report": "Ripoti", "pub.f.talk": "Michango ya mikutano", "pub.f.prep": "Makala zinazoandaliwa",
  "pub.s.talk": "Mchango wa mkutano niliouandika pamoja · wasilisho na bango", "pub.s.flash": "Mchango wa mkutano niliouandika pamoja · wasilisho fupi na bango",
  "pub.by1": "Iliwasilishwa na K. C. Mercurio; nilichangia kama mwandishi mwenza katika utafiti na uandaaji wa mawasilisho.",
  "pub.by2": "Iliwasilishwa na K. C. Mercurio; nilichangia kama mwandishi mwenza katika utafiti na uandaaji wa mawasilisho.", "pub.s.report": "Ripoti ya utafiti",
  "pub.s.prep": "Makala inaandaliwa", "pub.s.prep2": "Makala inaandaliwa",
  "pub.inprep": "Inaandaliwa", "pub.inprep2": "Inaandaliwa",
  "pub.cite": "Nakili rejea",

  "map.label": "07 — Kazi yangu inapofanyika", "map.title": "Kutoka maeneo kame ya Tanzania hadi duniani",
  "map.intro": "Buruta dunia kuizungusha, au chagua eneo kwenye orodha.",
  "map.k1": "Utafiti na masomo", "map.k2": "Michango ya mikutano niliyoandika pamoja",

  "edu.label": "08 — Elimu", "edu.title": "Safari ya kitaaluma",
  "edu.thesis": "Tasnifu:", "edu.project": "Mradi wa utafiti:",
  "aw.head": "Udhamini na tuzo", "aw1.t": "Udhamini wa NORSTIP",
  "aw1.p": "Kurugenzi ya Elimu ya Juu na Ujuzi ya Norwei · 2025 – 2027",
  "af.head": "Uanachama wa kitaaluma", "af1.p": "Mwanachama · tangu Nov 2025", "af2.p": "Mwanachama · tangu Jan 2026",

  "gal.label": "09 — Picha", "gal.title": "Shambani na maabara", "gal.intro": "Bofya picha yoyote kuiona kwa skrini nzima.",
  "gal.c1": "Mandhari kame yanayotazama Jiji la Dodoma", "gal.c2": "Kunguru wa Kihindi wakitafuta chakula kwenye dampo, Jiji la Dodoma", "gal.c3": "Kuandaa sahani za virutubisho vya kuoteshea bakteria maabara",
  "gal.c4": "Jiji la Dodoma wakati wa kiangazi", "gal.c5": "Makundi ya bakteria kwenye sahani ya kuoteshea", "gal.c6": "Jengo kuu la NTNU, Gløshaugen, Trondheim",

  "news.label": "10 — Habari", "news.title": "Habari mpya",
  "n1.t": "Kazi ya shambani ya Uzamili, Dodoma", "n1.p": "Nilikamata Kunguru wa Kihindi 53 na kukamilisha uoteshaji wa bakteria na upimaji wa usugu dhidi ya dawa kutoka kwenye maudhui ya utumbo wao.",
  "n2.t": "Utafiti wa MKARUN wawasilishwa Kanada", "n2.p": "Kazi ya timu yetu kuhusu mazao funika ya kunde na vijidudu vya vinundu vya mizizi, ambayo niliiandika pamoja na wenzangu, iliwasilishwa na K. C. Mercurio katika Mkutano wa 27 wa Amerika Kaskazini kuhusu Ufungaji wa Naitrojeni.",
  "n3.t": "Utafiti wa MKARUN wawasilishwa Penn State", "n3.p": "Wasilisho fupi na bango kuhusu kilimo endelevu kinachoongozwa na jamii, nililoandika pamoja na wenzangu, viliwasilishwa na K. C. Mercurio katika Mkutano wa Maji wa Penn State, Marekani.",
  "n4.t": "Ripoti imechapishwa", "n4.p": "Nilishiriki kuandika ripoti ya utafiti kuhusu utekelezaji wa OECMs (hatua nyingine madhubuti za uhifadhi wa maeneo) katika Manispaa ya Trondheim.",
  "n5.t": "Nimeanza Uzamili NTNU", "n5.p": "Nilianza Shahada ya Uzamili katika Usimamizi wa Maliasili – Biolojia, Trondheim, kwa udhamini wa NORSTIP.",

  "ct.label": "11 — Mawasiliano", "ct.title": "Tuwasiliane",
  "ct.p": "Ninafurahi kila wakati kuzungumza kuhusu ikolojia ya vijidudu, Afya Moja (One Health), usimamizi wa maliasili na utafiti shirikishi na jamii.",
  "f.name": "Jina lako", "f.email": "Barua pepe yako", "f.msg": "Ujumbe", "f.send": "Tuma ujumbe",
  "totop": "Rudi juu ↑",
  "nav.journey": "Safari",
  "hero.status": "Kwa sasa ninachambua data za kazi yangu ya shambani kuhusu kunguru, Dodoma",
  "gl1": "kunguru waliochukuliwa sampuli za bakteria",
  "gl2": "miradi ya utafiti",
  "gl3": "michango ya mikutano niliyoandika pamoja",
  "gl4": "ripoti ya utafiti iliyochapishwa",
  "gl5": "makala zinazoandaliwa",
  "gl6": "nchi ambazo kazi yangu imefika",
  "cn.title": "Jinsi utafiti wangu unavyoungana",
  "cn.p": "Miradi yangu iko mahali ambapo udongo na mimea, wanyamapori na binadamu hukutana. Ikolojia ya vijidudu ndiyo uzi unaoiunganisha — kuanzia bakteria wanaofunga naitrojeni wanaosaidia mazao ya wakulima hadi bakteria sugu wanaosafiri kati ya ndege, binadamu na mazingira.",
  "cn.a": "Udongo na mimea",
  "cn.b": "Wanyamapori",
  "cn.c": "Binadamu na sera",
  "cn.core1": "Ikolojia ya", "cn.core2": "vijidudu",
  "cn.t1": "vijidudu vya udongo",
  "cn.t2": "Nzi wa porini",
  "cn.t2s": "viashiria vya bakteria",
  "cn.t3": "Mlonge",
  "cn.t3s": "dawa kutoka mimea",
  "cn.t4": "Kunguru",
  "cn.t4s": "Afya Moja",
  "cn.t5": "Ripoti ya OECM",
  "cn.t5s": "sera za uhifadhi",
  "exp.sub1": "Uzoefu wa utafiti",
  "exp.r1": "Utafiti wa Uzamili",
  "exp.o1": "Chuo Kikuu cha Sayansi na Teknolojia cha Norwei (NTNU) · Kazi ya shambani Dodoma, Tanzania",
  "exp.h2": "Mradi wa Kuboresha Afya na Rutuba ya Udongo Nghumbi (MKARUN)",
  "exp.r2": "Msaidizi wa Utafiti na Mwanachama wa Timu ya Mradi",
  "exp.pi": "Mtafiti Mkuu:",
  "exp.r3": "Mradi wa utafiti wa Shahada ya Kwanza",
  "exp.t6": "Jenomiki ya Vimelea na Metagenomiki kwa Mtazamo wa Afya Moja — Mafunzo kwa Vitendo",
  "exp.p6": "Nilipata mafunzo kwa vitendo kuhusu uchimbaji wa DNA, agarose gel electrophoresis, na upimaji wa ubora na kiwango cha DNA kwa kutumia Qubit na NanoDrop. Pia nilipata uzoefu wa vitendo wa mfuatano wa vinasaba kwa teknolojia ya Oxford Nanopore na uchakataji wa data za mfuatano, na kufanya uchambuzi wa ulinganifu na utambuzi wa mfuatano kwa kutumia BLAST.",
  "int.head": "Uzoefu wa mafunzo kwa vitendo",
  "exp.r4": "Mwanafunzi wa mafunzo kwa vitendo",
  "jr.label": "06 — Safari",
  "jr.title": "Safari yangu hadi sasa",
  "jr.intro": "Telezesha au tumia mishale kufuatilia hatua muhimu.",
  "j1": "Nilianza Shahada ya Biolojia",
  "j1p": "Nilianza masomo ya shahada ya kwanza katika Chuo Kikuu cha Dodoma, Tanzania.",
  "j2": "Mafunzo kwa vitendo TARI Tumbi",
  "j2p": "Nilipata uzoefu wa vitendo katika kilimo mseto, uendelezaji na uzalishaji wa mbegu.",
  "j3": "Utafiti wa shahada na kuhitimu",
  "j3p": "Nilipima dondoo za mlonge dhidi ya vimelea na kuhitimu Shahada ya Kwanza mwezi Desemba.",
  "j4": "Mwanasayansi wa maabara wa kujitolea",
  "j4p": "Nilianza kufundisha na kusimamia mazoezi ya mikrobiolojia na parasitolojia UDOM.",
  "j5": "Nilijiunga na MKARUN · mafunzo ya SACIDS",
  "j5p": "Nilianza utafiti wa vijidudu vya udongo pamoja na wakulima wa Nghumbi na kupata mafunzo ya jenomiki ya vimelea.",
  "j6": "Mafunzo ya maadili ya utafiti",
  "j6p": "Nilikamilisha CIRTification kuhusu ulinzi wa washiriki wa utafiti.",
  "j7": "Uzamili NTNU · ripoti ya kwanza",
  "j7p": "Nilihamia Trondheim kwa udhamini wa NORSTIP na kushiriki kuandika ripoti kuhusu OECMs.",
  "j8": "Mikutano na kazi ya shambani",
  "j8p": "Nilishiriki kuandika michango miwili ya mikutano na kufanya kazi ya shambani ya Uzamili Dodoma.",
  "j9": "Kuhitimu Uzamili (inatarajiwa)",
  "j9p": "Ninakamilisha tasnifu yangu kuhusu bakteria wa zoonotiki na walio sugu kwa dawa kwa kunguru.",
  "ct.copy": "Nakili barua pepe",
  "ft.role": "Mtaalamu wa Ikolojia ya Vijidudu na Mwanabiolojia wa Maliasili",
  "ft.updated": "Imesasishwa: Oktoba 2026",
  "chat.fab": "Niulize", "chat.title": "Uliza kuhusu George", "chat.sub": "Msaidizi · majibu kutoka wasifu wa George"
};

// Short messages created by the code (not in the HTML)
const MSG = {
  en: { copied: "Citation copied", copyFail: "Could not copy — please select the text manually", emailCopied: "Email address copied",
        sending: "Sending…", sent: "Thank you! Your message has been sent.",
        failed: "Sorry, something went wrong. Please try again later.",
        notReady: "The form is not connected yet — please email georgeob@ntnu.stud.no for now." },
  sw: { copied: "Rejea imenakiliwa", copyFail: "Imeshindikana kunakili — tafadhali chagua maandishi mwenyewe", emailCopied: "Barua pepe imenakiliwa",
        sending: "Inatuma…", sent: "Asante! Ujumbe wako umetumwa.",
        failed: "Samahani, kuna tatizo. Tafadhali jaribu tena baadaye.",
        notReady: "Fomu bado haijaunganishwa — tafadhali tuma barua pepe kwa georgeob@ntnu.stud.no kwa sasa." }
};

let lang = store.get("lang") === "sw" ? "sw" : "en";
window.siteLang = () => lang;
const i18nEls = document.querySelectorAll("[data-i18n]");
const english = new Map();
i18nEls.forEach(el => english.set(el, el.innerHTML));
const langListeners = [];
window.onLangChange = fn => langListeners.push(fn);

const langBtn = document.getElementById("langToggle");
function applyLang() {
  i18nEls.forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = (lang === "sw" && SW[key]) ? SW[key] : english.get(el);
  });
  root.lang = lang;
  langBtn.textContent = lang === "sw" ? "EN" : "SW";
  langBtn.setAttribute("aria-label", lang === "sw" ? "Switch to English" : "Badilisha lugha kuwa Kiswahili");
  langListeners.forEach(fn => fn(lang));
}
langBtn.addEventListener("click", () => {
  lang = lang === "sw" ? "en" : "sw";
  store.set("lang", lang);
  applyLang();
});

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
    const s = SITES[i], t = s[window.siteLang()];
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
      li.innerHTML = `<button type="button"><span class="dot ${s.type === "talk" ? "talk" : ""}"></span><span><strong>${esc(s[l].name)}</strong><small>${esc(s[l].text)}</small></span></button>`;
      li.querySelector("button").addEventListener("click", () => select(i));
      legend.appendChild(li);
    });
    if (selected >= 0) { const t = SITES[selected][l]; card.innerHTML = `<strong>${esc(t.name)}</strong><p>${esc(t.text)}</p>`; legend.querySelectorAll("button")[selected].classList.add("active"); }
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
