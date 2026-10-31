// =========================================================
// "Ask about George" — website assistant
// Runs entirely in the visitor's browser: no server, no API key,
// no cost, and no visitor data is sent anywhere.
// It matches questions to the topics below. To teach it something
// new, add a topic: keywords and answers (English + Kiswahili here;
// French, Portuguese, Arabic and Chinese are in assistant-i18n.js).
// =========================================================
(function () {
  const lang = () => (window.siteLang ? window.siteLang() : "en");

  const TOPICS = [
    { id: "greet", kw: ["hello", "hi", "hey", "good morning", "good evening", "habari", "mambo", "hujambo", "jambo", "salama", "shikamoo", "salaam"],
      en: "Hello! 👋 I can tell you about George's research, publications, teaching and outreach, education, or how to contact him. What would you like to know?",
      sw: "Habari! 👋 Ninaweza kukueleza kuhusu utafiti wa George, machapisho, ufundishaji na ugani, elimu yake, au jinsi ya kuwasiliana naye. Ungependa kujua nini?" },

    { id: "who", kw: ["who", "about george", "introduce", "background", "biography", "ni nani", "nani", "wasifu wake", "mweleze", "historia"],
      en: "George Jameson Obed is a microbial ecologist and natural resources biologist. He is an MSc student in Natural Resources Management – Biology at NTNU (Norway), supported by a NORSTIP scholarship, with a BSc in Biology from the University of Dodoma (Tanzania). Most of his research has been carried out in the semi-arid landscapes of central Tanzania.",
      sw: "George Jameson Obed ni mtaalamu wa ikolojia ya vijidudu na mwanabiolojia wa maliasili. Ni mwanafunzi wa Shahada ya Uzamili katika Usimamizi wa Maliasili – Biolojia NTNU (Norwei) kwa udhamini wa NORSTIP, na ana Shahada ya Kwanza ya Biolojia kutoka Chuo Kikuu cha Dodoma (Tanzania). Sehemu kubwa ya utafiti wake imefanyika katika maeneo kame ya kati ya Tanzania." },

    { id: "research", kw: ["research", "work on", "working on", "projects", "project", "study", "studies", "focus", "utafiti", "anafanya kazi", "mradi", "miradi", "chunguza", "tafiti"],
      en: "George works on four main projects: (1) zoonotic and antimicrobial-resistant bacteria in invasive house crows in Dodoma (MSc); (2) soil health and nitrogen-fixing root-nodule microbes in semi-arid Nghumbi (MKARUN); (3) antimicrobial activity of <i>Moringa oleifera</i> extracts (bioprospecting); and (4) bacterial markers in wild scuttle flies. <a href=\"#research\">See the Research section</a>.",
      sw: "George anafanya kazi kwenye miradi minne mikuu: (1) bakteria wa zoonotiki na walio sugu kwa dawa kwa kunguru vamizi Dodoma (Uzamili); (2) afya ya udongo na vijidudu vinavyofunga naitrojeni Nghumbi (MKARUN); (3) uwezo wa dondoo za mlonge (<i>Moringa oleifera</i>) kuua vimelea; na (4) viashiria vya bakteria kwa nzi wa porini. <a href=\"#research\">Tazama sehemu ya Utafiti</a>." },

    { id: "crow", kw: ["crow", "crows", "corvus", "bird", "birds", "thesis", "master", "msc research", "zoonotic", "zoonoses", "kunguru", "ndege", "tasnifu", "uzamili", "zoonotiki"],
      en: "For his MSc, George studies the ecological and human-related factors linked to zoonotic and antimicrobial-resistant bacteria in invasive Indian House Crows (<i>Corvus splendens</i>) in Dodoma Urban. He captured 53 crows, isolated gut bacteria, and tested their antibiotic resistance with the Kirby–Bauer method. Supervisors: Prof. Augustine Arukwe, Prof. Eivin Røskaft, Dr Peter Ranke and Dr Ignas Safari.",
      sw: "Katika Uzamili wake, George anachunguza mambo ya kiikolojia na ya kibinadamu yanayohusiana na bakteria wa zoonotiki na walio sugu kwa dawa kwa Kunguru wa Kihindi vamizi (<i>Corvus splendens</i>) katika Jiji la Dodoma. Alikamata kunguru 53, akatenga bakteria wa utumbo, na kupima usugu wao dhidi ya dawa kwa njia ya Kirby–Bauer. Wasimamizi: Prof. Augustine Arukwe, Prof. Eivin Røskaft, Dr Peter Ranke na Dr Ignas Safari." },

    { id: "amr", kw: ["antimicrobial", "resistance", "antibiotic", "amr", "one health", "pathogen", "usugu", "dawa", "afya moja", "vimelea"],
      en: "Antimicrobial resistance is a key thread in George's work: from testing plant extracts (Moringa) against pathogens, to studying resistant bacteria carried by invasive crows — a One Health issue linking wildlife, people and the environment.",
      sw: "Usugu wa vimelea dhidi ya dawa ni kiini muhimu cha kazi ya George: kuanzia kupima dondoo za mimea (mlonge) dhidi ya vimelea, hadi kuchunguza bakteria sugu wanaobebwa na kunguru vamizi — suala la Afya Moja linalounganisha wanyamapori, binadamu na mazingira." },

    { id: "soil", kw: ["soil", "mkarun", "nitrogen", "legume", "nodule", "nodules", "cowpea", "cover crop", "nghumbi", "agroforestry", "udongo", "naitrojeni", "mikunde", "vinundu", "kunde", "kilimo"],
      en: "Since 2023, George has been a Research Assistant on MKARUN (Penn State, University of Dodoma and CDEO) in semi-arid Nghumbi. He sampled root nodules of drought-tolerant legumes, extracted DNA for 16S and nifH sequencing, and built a culture collection of nitrogen-fixing bacteria. George co-authored two 2026 conference contributions on this work, presented by K. C. Mercurio in Canada and the USA.",
      sw: "Tangu 2023, George ni Msaidizi wa Utafiti katika mradi wa MKARUN (Penn State, Chuo Kikuu cha Dodoma na CDEO) huko Nghumbi. Alikusanya vinundu vya mizizi ya mikunde inayostahimili ukame, akachimba DNA kwa mfuatano wa 16S na nifH, na kujenga mkusanyiko wa bakteria wanaofunga naitrojeni. George ni mwandishi mwenza wa michango miwili ya mikutano ya 2026 kuhusu kazi hii, iliyowasilishwa na K. C. Mercurio nchini Kanada na Marekani." },

    { id: "moringa", kw: ["moringa", "bioprospect", "bioprospecting", "plant", "plants", "extract", "drug discovery", "medicine", "traditional", "mlonge", "mmea", "mimea", "dondoo", "dawa za asili"],
      en: "For his BSc project (2022), George tested <i>Moringa oleifera</i> seed and leaf extracts against <i>E. coli</i>, <i>Salmonella</i> Typhi and <i>Candida albicans</i> — an example of bioprospecting, one of his research interests.",
      sw: "Katika mradi wake wa Shahada ya Kwanza (2022), George alipima dondoo za mbegu na majani ya mlonge (<i>Moringa oleifera</i>) dhidi ya <i>E. coli</i>, <i>Salmonella</i> Typhi na <i>Candida albicans</i> — mfano wa utafutaji wa rasilimali za kibiolojia (bioprospecting), mojawapo ya maeneo anayoyapenda." },

    { id: "fly", kw: ["fly", "flies", "scuttle", "insect", "insects", "discriminant", "phoridae", "nzi", "wadudu"],
      en: "George is preparing a manuscript using discriminant analysis in R to test whether endosymbionts and other bacteria can act as markers of sex, species, site and season in wild scuttle flies (Diptera: Phoridae).",
      sw: "George anaandaa makala inayotumia uchambuzi wa kibaguzi katika R kupima kama bakteria wa ndani na bakteria wengine wanaweza kuwa viashiria vya jinsia, spishi, eneo na msimu kwa nzi wa porini (Diptera: Phoridae)." },

    { id: "pubs", kw: ["publication", "publications", "paper", "papers", "publish", "published", "report", "presentation", "presentations", "conference", "poster", "talk", "oecm", "article", "machapisho", "chapisho", "ripoti", "mkutano", "wasilisho", "mawasilisho", "makala", "bango"],
      en: "George's outputs include a 2025 NTNU research report on implementing OECMs in Trondheim Municipality (DOI: 10.21400/wy6k-5y88), two co-authored 2026 conference contributions (presented by K. C. Mercurio in Kingston, Canada and at Penn State, USA), and two manuscripts in preparation. <a href=\"#publications\">See all outputs</a>.",
      sw: "Kazi za George ni pamoja na ripoti ya utafiti ya NTNU (2025) kuhusu utekelezaji wa OECMs katika Manispaa ya Trondheim (DOI: 10.21400/wy6k-5y88), michango miwili ya mikutano ya 2026 aliyoiandika pamoja na wenzake (iliyowasilishwa na K. C. Mercurio huko Kingston, Kanada na Penn State, Marekani), na makala mbili zinazoandaliwa. <a href=\"#publications\">Tazama kazi zote</a>." },

    { id: "teach", kw: ["teach", "teaching", "students", "student", "outreach", "extension", "farmer", "farmers", "community", "volunteer", "apiary", "bees", "kufundisha", "ufundishaji", "wanafunzi", "wakulima", "mafunzo", "jamii", "ugani", "kujitolea", "nyuki", "fundisha", "fundishaji", "mkulima"],
      en: "George trains smallholder farmers in soil health, facilitates group decisions for cover crop trials, and co-developed farmer pest-monitoring tools translated into Swahili (MKARUN, 2023–present). From 2022 to 2025 he volunteered at the University of Dodoma, teaching and supervising microbiology and parasitology practicals. <a href=\"#outreach\">See Teaching & Outreach</a>.",
      sw: "George huwafundisha wakulima wadogo kuhusu afya ya udongo, huwezesha maamuzi ya pamoja kwa majaribio ya mazao funika, na alishiriki kuandaa zana za wakulima za kufuatilia visumbufu zilizotafsiriwa kwa Kiswahili (MKARUN, 2023 – sasa). Kuanzia 2022 hadi 2025 alijitolea Chuo Kikuu cha Dodoma, akifundisha na kusimamia mazoezi ya maabara ya mikrobiolojia na parasitolojia. <a href=\"#outreach\">Tazama Ufundishaji na Ugani</a>." },

    { id: "edu", kw: ["education", "degree", "university", "bsc", "msc degree", "ntnu", "udom", "studied", "graduate", "elimu", "shahada", "chuo", "alisoma", "anasoma", "somea"],
      en: "George is completing an MSc in Natural Resources Management – Biology at NTNU, Trondheim (2025–2027), and holds a BSc in Biology from the University of Dodoma, Tanzania (2019–2022).",
      sw: "George anamalizia Shahada ya Uzamili katika Usimamizi wa Maliasili – Biolojia NTNU, Trondheim (2025–2027), na ana Shahada ya Kwanza ya Biolojia kutoka Chuo Kikuu cha Dodoma, Tanzania (2019–2022)." },

    { id: "member", kw: ["member", "membership", "society", "affiliation", "affiliations", "bes", "aos", "ornithological", "ecological society", "mwanachama", "uanachama", "chama"],
      en: "George is a member of the British Ecological Society (since Nov 2025) and the American Ornithological Society (since Jan 2026).",
      sw: "George ni mwanachama wa British Ecological Society (tangu Nov 2025) na American Ornithological Society (tangu Jan 2026)." },

    { id: "award", kw: ["scholarship", "norstip", "funding", "funded", "award", "awards", "grant", "udhamini", "ufadhili", "tuzo"],
      en: "George's MSc is funded by the NORSTIP Scholarship from the Norwegian Directorate for Higher Education and Skills (2025–2027).",
      sw: "Shahada ya Uzamili ya George inafadhiliwa na Udhamini wa NORSTIP kutoka Kurugenzi ya Elimu ya Juu na Ujuzi ya Norwei (2025–2027)." },

    { id: "interests", kw: ["interest", "interests", "interested", "passion", "policy", "drylands", "extreme", "maslahi", "anapenda", "sera", "anavutiwa"],
      en: "George's interests include microbial ecology, soil microbiology, extreme environments and drylands, antimicrobial resistance, One Health, wildlife diseases, nitrogen fixation, bioprospecting and natural resources policy.",
      sw: "Maeneo anayoyapenda George ni ikolojia ya vijidudu, mikrobiolojia ya udongo, mazingira magumu na maeneo kame, usugu wa vimelea dhidi ya dawa, Afya Moja, magonjwa ya wanyamapori, ufungaji wa naitrojeni, utafutaji wa rasilimali za kibiolojia na sera za maliasili." },

    { id: "where", kw: ["where", "based", "live", "lives", "location", "country", "located", "wapi", "anaishi", "nchi", "yuko"],
      en: "George is based in Trondheim, Norway, where he studies at NTNU, and carries out his fieldwork in Dodoma, central Tanzania. <a href=\"#globe-section\">Spin the globe</a> to see all his research and presentation sites.",
      sw: "George yuko Trondheim, Norwei, anakosomea NTNU, na hufanya kazi zake za shambani Dodoma, katikati ya Tanzania. <a href=\"#globe-section\">Zungusha dunia</a> kuona maeneo yote ya utafiti na mawasilisho yake." },

    { id: "contact", kw: ["contact", "email", "e-mail", "orcid", "reach", "linkedin", "collaborate", "collaboration", "connect", "message", "mawasiliano", "wasiliana", "barua pepe", "shirikiana", "ushirikiano", "ujumbe", "wasiliana", "mpata"],
      en: "You can email George at <a href=\"mailto:georgeobed999@gmail.com\">georgeobed999@gmail.com</a>, connect on <a href=\"https://www.linkedin.com/in/george-obed-32145a1a6\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>, or use the <a href=\"#contact\">contact form</a>. His ORCID iD is <a href=\"https://orcid.org/0009-0000-3671-7220\" target=\"_blank\" rel=\"noopener\">0009-0000-3671-7220</a>.",
      sw: "Unaweza kumtumia George barua pepe kupitia <a href=\"mailto:georgeobed999@gmail.com\">georgeobed999@gmail.com</a>, kuungana naye <a href=\"https://www.linkedin.com/in/george-obed-32145a1a6\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>, au kutumia <a href=\"#contact\">fomu ya mawasiliano</a>. Namba yake ya ORCID ni <a href=\"https://orcid.org/0009-0000-3671-7220\" target=\"_blank\" rel=\"noopener\">0009-0000-3671-7220</a>." },

    { id: "cv", kw: ["cv", "resume", "curriculum", "download"],
      en: "You can <a href=\"assets/cv.pdf\" target=\"_blank\" rel=\"noopener\">download George's CV here</a>.",
      sw: "Unaweza <a href=\"assets/cv.pdf\" target=\"_blank\" rel=\"noopener\">kupakua CV ya George hapa</a> (kwa Kiingereza)." },

    { id: "training", kw: ["training", "trainings", "course", "courses", "workshop", "sacids", "genomics", "metagenomics", "nanopore", "sequencing", "blast", "cirtification", "ethics", "mafunzo", "kozi", "warsha", "maadili"],
      en: "George has completed two trainings: One Health Pathogen Genomics and Metagenomics hands-on training with SACIDS, the Government of Tanzania and Sokoine University of Agriculture (2023) — covering DNA extraction, gel electrophoresis, Qubit/NanoDrop, Oxford Nanopore sequencing and BLAST — and CIRTification in human research protections from the University of Illinois Chicago (2024). <a href=\"#experience\">See Experience &amp; training</a>.",
      sw: "George amekamilisha mafunzo mawili: mafunzo kwa vitendo ya Jenomiki ya Vimelea na Metagenomiki kwa mtazamo wa Afya Moja pamoja na SACIDS, Serikali ya Tanzania na Chuo Kikuu cha Kilimo cha Sokoine (2023) — yakihusu uchimbaji wa DNA, gel electrophoresis, Qubit/NanoDrop, mfuatano wa Oxford Nanopore na BLAST — na CIRTification kuhusu ulinzi wa washiriki wa utafiti kutoka University of Illinois Chicago (2024). <a href=\"#experience\">Tazama Uzoefu na mafunzo</a>." },

    { id: "intern", kw: ["internship", "intern", "tari", "tumbi", "tabora", "seed", "seeds", "trees", "tree", "mafunzo kwa vitendo", "mbegu", "miti"],
      en: "In 2021, George completed an internship in agroforestry and seed development and multiplication at the Tanzania Agricultural Research Institute (TARI), Tumbi Centre, Tabora, propagating indigenous and fruit trees such as Vitex, marula, cashew, citrus and mango.",
      sw: "Mwaka 2021, George alifanya mafunzo kwa vitendo kuhusu kilimo mseto na uendelezaji na uzalishaji wa mbegu katika Taasisi ya Utafiti wa Kilimo Tanzania (TARI), Kituo cha Tumbi, Tabora, akikuza miti ya asili na ya matunda kama Vitex, mng'ongo, mikorosho, michungwa na miembe." },

    { id: "thanks", kw: ["thank", "thanks", "great", "nice", "asante", "shukrani", "safi", "poa"],
      en: "You're welcome! 😊 Anything else you'd like to know about George's work?",
      sw: "Karibu sana! 😊 Kuna jambo lingine ungependa kujua kuhusu kazi ya George?" }
  ];

  const FALLBACK = {
    en: "I'm not sure about that one. I can answer questions about George's research, publications, teaching and outreach, education, memberships, or how to contact him. For anything else, please email <a href=\"mailto:georgeobed999@gmail.com\">georgeobed999@gmail.com</a>.",
    sw: "Sina uhakika na hilo. Ninaweza kujibu maswali kuhusu utafiti wa George, machapisho, ufundishaji na ugani, elimu, uanachama, au jinsi ya kuwasiliana naye. Kwa mengine, tafadhali tuma barua pepe kwa <a href=\"mailto:georgeobed999@gmail.com\">georgeobed999@gmail.com</a>."
  };
  const SUGGEST = {
    en: [["Who is George?", "who"], ["Research", "research"], ["House crow project", "crow"], ["Publications", "pubs"], ["Teaching & outreach", "teach"], ["Contact", "contact"]],
    sw: [["George ni nani?", "who"], ["Utafiti", "research"], ["Mradi wa kunguru", "crow"], ["Machapisho", "pubs"], ["Ufundishaji na ugani", "teach"], ["Mawasiliano", "contact"]]
  };
  const PLACEHOLDER = { en: "Type a question…", sw: "Andika swali…" };

  const X = window.ASSIST_I18N || { kw: {}, answers: {}, fallback: {}, suggest: {}, placeholder: {} };
  // add the extra-language keywords to each topic
  TOPICS.forEach(t => { t.kw = t.kw.concat(X.kw[t.id] || []); });
  const answerFor = t => t[lang()] || (X.answers[lang()] || {})[t.id] || t.en;

  // Normalise text: lower case, remove accents and Arabic vowel marks, unify Arabic letter forms
  const norm = s => " " + s.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f\u064B-\u0652\u0670]/g, "")
    .replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ") + " ";
  const noSpaces = /[\u0600-\u06FF\u4E00-\u9FFF]/;   // Arabic & Chinese: match inside words too

  function findAnswer(text) {
    const q = norm(text);
    let best = null, bestScore = 0;
    TOPICS.forEach(t => {
      let score = 0;
      t.kw.forEach(k => {
        const key = norm(k).trim();
        if (!key) return;
        if (q.includes(" " + key + " ")) score += 2 + key.split(" ").length;      // whole word / phrase
        else if (noSpaces.test(key) && q.includes(key)) score += 2 + (key.length > 2 ? 1 : 0); // Arabic / Chinese
        else if (key.length > 4 && q.includes(key)) score += 1;                     // part of a word
      });
      if (t.id === "greet" || t.id === "thanks") score *= 0.6;                     // prefer real topics
      if (score > bestScore) { bestScore = score; best = t; }
    });
    return best ? answerFor(best) : (FALLBACK[lang()] || X.fallback[lang()] || FALLBACK.en);
  }

  // ---- interface ----
  const fab = document.getElementById("chatFab");
  const panel = document.getElementById("chatPanel");
  const log = document.getElementById("chatLog");
  const suggest = document.getElementById("chatSuggest");
  const formEl = document.getElementById("chatForm");
  const input = document.getElementById("chatText");
  if (!fab || !panel) return;
  let greeted = false;

  function add(html, who) {
    const div = document.createElement("div");
    div.className = "msg " + who;
    if (who === "user") div.textContent = html; else div.innerHTML = html;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }
  function reply(html) {
    const typing = add("<span></span><span></span><span></span>", "bot typing");
    setTimeout(() => { typing.remove(); add(html, "bot"); }, 450 + Math.random() * 400);
  }
  function renderSuggest() {
    suggest.innerHTML = "";
    (SUGGEST[lang()] || X.suggest[lang()] || SUGGEST.en).forEach(([label, id]) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = label;
      b.addEventListener("click", () => { add(label, "user"); reply(answerFor(TOPICS.find(t => t.id === id))); });
      suggest.appendChild(b);
    });
    input.placeholder = PLACEHOLDER[lang()] || X.placeholder[lang()] || PLACEHOLDER.en;
    panel.dir = lang() === "ar" ? "rtl" : "ltr";
  }
  function open() {
    panel.hidden = false; fab.setAttribute("aria-expanded", "true");
    if (!greeted) { greeted = true; reply(answerFor(TOPICS[0])); }
    renderSuggest(); input.focus();
  }
  function close() { panel.hidden = true; fab.setAttribute("aria-expanded", "false"); fab.focus(); }

  fab.addEventListener("click", open);
  document.getElementById("chatClose").addEventListener("click", close);
  panel.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  log.addEventListener("click", e => { const a = e.target.closest('a[href^="#"]'); if (a) close(); });
  formEl.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    add(text, "user"); input.value = "";
    reply(findAnswer(text));
  });
  if (window.onLangChange) window.onLangChange(() => { if (!panel.hidden) renderSuggest(); });
})();
