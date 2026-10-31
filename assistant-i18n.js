// =========================================================
// "Ask about George" assistant — French, Portuguese, Arabic, Chinese
// English and Kiswahili answers are in assistant.js.
// Each topic has extra keywords (words visitors might type) and answers.
// =========================================================
(function () {
  const MAIL = '<a href="mailto:georgeobed999@gmail.com">georgeobed999@gmail.com</a>';
  const LI = '<a href="https://www.linkedin.com/in/george-obed-32145a1a6" target="_blank" rel="noopener">LinkedIn</a>';
  const OR = '<a href="https://orcid.org/0009-0000-3671-7220" target="_blank" rel="noopener">0009-0000-3671-7220</a>';
  const CV = (t) => '<a href="assets/cv.pdf" target="_blank" rel="noopener">' + t + '</a>';

  window.ASSIST_I18N = {
    // Extra keywords per topic (all languages mixed; accents are ignored when matching)
    kw: {
      greet: ["bonjour", "salut", "bonsoir", "ola", "bom dia", "boa tarde", "مرحبا", "السلام عليكم", "اهلا", "أهلا", "你好", "您好", "嗨"],
      who: ["qui est", "qui es", "presentez", "biographie", "quem e", "quem", "apresente", "biografia", "من هو", "من جورج", "نبذة", "تعريف", "是谁", "介绍", "简介", "背景"],
      research: ["recherche", "recherches", "projet", "projets", "travaille", "investigacao", "pesquisa", "projeto", "projetos", "trabalha", "بحث", "ابحاث", "أبحاث", "مشروع", "مشاريع", "يعمل", "研究", "项目", "课题", "做什么"],
      crow: ["corbeau", "corbeaux", "oiseau", "oiseaux", "memoire", "master", "zoonotique", "gralha", "gralhas", "corvo", "corvos", "aves", "dissertacao", "mestrado", "zoonotica", "غراب", "غربان", "الغربان", "طيور", "ماجستير", "رسالة", "乌鸦", "家鸦", "鸟", "硕士", "论文研究", "人畜共患"],
      amr: ["resistance", "antimicrobien", "antimicrobiens", "antibiotique", "une seule sante", "pathogene", "resistencia", "antimicrobiano", "antibiotico", "uma so saude", "patogenico", "مقاومة", "مضادات", "المضادات الحيوية", "الصحة الواحدة", "ممرضات", "耐药", "抗生素", "抗微生物", "同一健康", "病原体"],
      soil: ["sol", "sols", "azote", "legumineuse", "legumineuses", "nodosite", "niebe", "agroforesterie", "solo", "solos", "azoto", "nitrogenio", "leguminosas", "nodulos", "feijao", "agrofloresta", "تربة", "التربة", "نيتروجين", "بقوليات", "عقد جذرية", "زراعة", "土壤", "固氮", "根瘤", "豆科", "豇豆", "农业"],
      moringa: ["moringa", "plante", "plantes", "extrait", "bioprospection", "medecine", "planta", "plantas", "extrato", "bioprospecao", "مورينغا", "المورينغا", "نبات", "نباتات", "مستخلص", "التنقيب الحيوي", "辣木", "植物", "提取物", "生物勘探"],
      fly: ["mouche", "mouches", "phoride", "insecte", "insectes", "mosca", "moscas", "forideas", "inseto", "insetos", "ذباب", "ذبابة", "حشرات", "الفوريد", "苍蝇", "蚤蝇", "昆虫"],
      pubs: ["publication", "publications", "article", "articles", "rapport", "conference", "poster", "communication", "publicacao", "publicacoes", "artigo", "relatorio", "conferencia", "منشورات", "منشور", "مقال", "تقرير", "مؤتمر", "ملصق", "عرض", "论文", "发表", "报告", "会议", "成果", "墙报"],
      teach: ["enseigner", "enseignement", "etudiants", "agriculteurs", "benevole", "vulgarisation", "apiculture", "ensino", "ensinar", "estudantes", "agricultores", "voluntario", "extensao", "تدريس", "طلاب", "مزارعين", "المزارعين", "متطوع", "توعية", "إرشاد", "教学", "教", "学生", "农民", "志愿", "推广"],
      edu: ["etudes", "diplome", "universite", "licence", "education", "educacao", "licenciatura", "universidade", "curso", "تعليم", "جامعة", "بكالوريوس", "شهادة", "دراسة", "教育", "大学", "学位", "学士", "学历"],
      member: ["membre", "societe", "affiliation", "membro", "sociedade", "afiliacao", "عضو", "عضوية", "جمعية", "会员", "学会", "协会"],
      award: ["bourse", "financement", "prix", "bolsa", "financiamento", "premio", "منحة", "تمويل", "جائزة", "奖学金", "资助", "奖"],
      interests: ["interets", "interesse", "domaines", "interesses", "areas", "اهتمامات", "اهتمام", "مجالات", "兴趣", "方向", "领域"],
      where: ["ou est", "ou vit", "habite", "base", "onde", "vive", "mora", "أين", "يعيش", "يقيم", "مكان", "哪里", "在哪", "住"],
      contact: ["contact", "contacter", "courriel", "e-mail", "joindre", "contacto", "contato", "email", "contactar", "تواصل", "التواصل", "بريد", "ايميل", "إيميل", "联系", "邮箱", "邮件", "领英"],
      cv: ["cv", "curriculum", "telecharger", "descarregar", "السيرة", "سيرة", "简历", "下载"],
      training: ["formation", "formations", "stage pratique", "atelier", "genomique", "sequencage", "ethique", "formacao", "formacoes", "genomica", "sequenciacao", "etica", "تدريب", "دورة", "دورات", "جينوم", "أخلاقيات", "培训", "基因组", "测序", "伦理"],
      intern: ["stage", "stagiaire", "semences", "arbres", "estagio", "estagiario", "sementes", "arvores", "تدريب عملي", "بذور", "أشجار", "实习", "种子", "树"],
      thanks: ["merci", "obrigado", "obrigada", "شكرا", "شكرًا", "谢谢", "感谢"]
    },

    answers: {
      fr: {
        greet: "Bonjour ! 👋 Je peux vous renseigner sur les recherches de George, ses publications, ses activités d'enseignement et de vulgarisation, sa formation ou la manière de le contacter. Que souhaitez-vous savoir ?",
        who: "George Jameson Obed est écologue microbien et biologiste des ressources naturelles. Il est étudiant en master Gestion des ressources naturelles – Biologie à la NTNU (Norvège), grâce à une bourse NORSTIP, et titulaire d'une licence en biologie de l'Université de Dodoma (Tanzanie). La plupart de ses recherches ont été menées dans les paysages semi-arides du centre de la Tanzanie.",
        research: "George travaille sur quatre projets principaux : (1) les bactéries zoonotiques et résistantes aux antimicrobiens chez des corbeaux invasifs à Dodoma (master) ; (2) la santé des sols et les microbes fixateurs d'azote des nodosités racinaires dans la région semi-aride de Nghumbi (MKARUN) ; (3) l'activité antimicrobienne d'extraits de <i>Moringa oleifera</i> (bioprospection) ; (4) les marqueurs bactériens chez des mouches phorides sauvages. <a href=\"#research\">Voir la section Recherche</a>.",
        crow: "Pour son master, George étudie les facteurs écologiques et humains associés aux bactéries zoonotiques et résistantes aux antimicrobiens chez le corbeau familier invasif (<i>Corvus splendens</i>) à Dodoma. Il a capturé 53 corbeaux, isolé des bactéries intestinales et testé leur résistance aux antibiotiques par la méthode de Kirby–Bauer. Encadrement : Prof. Augustine Arukwe, Prof. Eivin Røskaft, Dr Peter Ranke et Dr Ignas Safari.",
        amr: "La résistance aux antimicrobiens est un fil conducteur des travaux de George : de l'évaluation d'extraits de plantes (Moringa) contre des agents pathogènes à l'étude des bactéries résistantes portées par des corbeaux invasifs — un enjeu « Une seule santé » qui relie la faune sauvage, les humains et l'environnement.",
        soil: "Depuis 2023, George est assistant de recherche au sein du projet MKARUN (Penn State, Université de Dodoma et CDEO) dans la région semi-aride de Nghumbi. Il a prélevé des nodosités racinaires de légumineuses tolérantes à la sécheresse, extrait l'ADN pour le séquençage 16S et nifH et constitué une collection de cultures de bactéries fixatrices d'azote. Il est coauteur de deux contributions à des conférences en 2026 sur ces travaux, présentées par K. C. Mercurio au Canada et aux États-Unis.",
        moringa: "Pour son projet de licence (2022), George a testé des extraits de graines et de feuilles de <i>Moringa oleifera</i> contre <i>E. coli</i>, <i>Salmonella</i> Typhi et <i>Candida albicans</i> — un exemple de bioprospection, l'un de ses domaines d'intérêt.",
        fly: "George prépare un manuscrit dans lequel il utilise l'analyse discriminante sous R pour déterminer si des endosymbiotes et d'autres bactéries peuvent servir de marqueurs du sexe, de l'espèce, du site et de la saison chez des mouches phorides sauvages (Diptera : Phoridae).",
        pubs: "Les travaux de George comprennent un rapport de recherche de la NTNU (2025) sur la mise en œuvre des AMCE dans la municipalité de Trondheim (DOI : 10.21400/wy6k-5y88), deux contributions à des conférences en 2026 en tant que coauteur (présentées par K. C. Mercurio à Kingston, au Canada, et à Penn State, aux États-Unis) et deux manuscrits en préparation. <a href=\"#publications\">Voir tous les travaux</a>.",
        teach: "George forme de petits exploitants agricoles à la santé des sols, anime les décisions collectives pour des essais de cultures de couverture et a co-conçu des outils de suivi des ravageurs pour les agriculteurs, traduits en swahili (MKARUN, depuis 2023). De 2022 à 2025, il a été bénévole à l'Université de Dodoma, où il a enseigné et encadré des travaux pratiques de microbiologie et de parasitologie. <a href=\"#outreach\">Voir Enseignement et vulgarisation</a>.",
        edu: "George termine un master en gestion des ressources naturelles – biologie à la NTNU, à Trondheim (2025–2027), et est titulaire d'une licence en biologie de l'Université de Dodoma, en Tanzanie (2019–2022).",
        member: "George est membre de la British Ecological Society (depuis novembre 2025) et de l'American Ornithological Society (depuis janvier 2026).",
        award: "Le master de George est financé par la bourse NORSTIP de la Direction norvégienne de l'enseignement supérieur et des compétences (2025–2027).",
        interests: "Les domaines d'intérêt de George sont l'écologie microbienne, la microbiologie des sols, les milieux extrêmes et les zones arides, la résistance aux antimicrobiens, l'approche « Une seule santé », les maladies de la faune sauvage, la fixation de l'azote, la bioprospection et les politiques des ressources naturelles.",
        where: "George vit à Trondheim, en Norvège, où il étudie à la NTNU, et mène ses travaux de terrain à Dodoma, dans le centre de la Tanzanie. <a href=\"#globe-section\">Faites tourner le globe</a> pour voir tous ses lieux de recherche et de présentation.",
        contact: "Vous pouvez écrire à George à l'adresse " + MAIL + ", le contacter sur " + LI + " ou utiliser le <a href=\"#contact\">formulaire de contact</a>. Son identifiant ORCID est " + OR + ".",
        cv: "Vous pouvez " + CV("télécharger le CV de George ici") + " (en anglais).",
        training: "George a suivi deux formations : une formation pratique en génomique et métagénomique des agents pathogènes selon l'approche « Une seule santé », avec le SACIDS, le gouvernement tanzanien et l'Université d'agriculture de Sokoine (2023) — extraction d'ADN, électrophorèse sur gel, Qubit/NanoDrop, séquençage Oxford Nanopore et BLAST —, ainsi que la CIRTification en protection des participants humains de l'Université de l'Illinois à Chicago (2024). <a href=\"#experience\">Voir Expérience et formation</a>.",
        intern: "En 2021, George a effectué un stage en agroforesterie, production et multiplication de semences au Tanzania Agricultural Research Institute (TARI), centre de Tumbi, à Tabora, où il a multiplié des essences indigènes et fruitières comme le Vitex, le marula, l'anacardier, les agrumes et le manguier.",
        thanks: "Avec plaisir ! 😊 Souhaitez-vous savoir autre chose sur les travaux de George ?"
      },

      pt: {
        greet: "Olá! 👋 Posso falar-lhe sobre a investigação do George, as suas publicações, o ensino e a extensão, a formação académica ou a forma de o contactar. O que gostaria de saber?",
        who: "George Jameson Obed é ecólogo microbiano e biólogo de recursos naturais. É estudante de mestrado em Gestão de Recursos Naturais – Biologia na NTNU (Noruega), com uma bolsa NORSTIP, e licenciado em Biologia pela Universidade de Dodoma (Tanzânia). A maior parte da sua investigação foi realizada nas paisagens semiáridas do centro da Tanzânia.",
        research: "O George trabalha em quatro projetos principais: (1) bactérias zoonóticas e resistentes aos antimicrobianos em gralhas-indianas invasoras em Dodoma (mestrado); (2) saúde do solo e micróbios fixadores de azoto dos nódulos radiculares na região semiárida de Nghumbi (MKARUN); (3) atividade antimicrobiana de extratos de <i>Moringa oleifera</i> (bioprospeção); e (4) marcadores bacterianos em moscas forídeas selvagens. <a href=\"#research\">Ver a secção Investigação</a>.",
        crow: "No mestrado, o George estuda os fatores ecológicos e humanos associados a bactérias zoonóticas e resistentes aos antimicrobianos na gralha-indiana invasora (<i>Corvus splendens</i>) em Dodoma. Capturou 53 aves, isolou bactérias intestinais e testou a sua resistência aos antibióticos pelo método de Kirby–Bauer. Orientadores: Prof. Augustine Arukwe, Prof. Eivin Røskaft, Dr. Peter Ranke e Dr. Ignas Safari.",
        amr: "A resistência aos antimicrobianos é um fio condutor do trabalho do George: desde testar extratos de plantas (Moringa) contra agentes patogénicos até estudar bactérias resistentes transportadas por gralhas invasoras — uma questão de «Uma Só Saúde» que liga a vida selvagem, as pessoas e o ambiente.",
        soil: "Desde 2023, o George é assistente de investigação no projeto MKARUN (Penn State, Universidade de Dodoma e CDEO), na região semiárida de Nghumbi. Recolheu nódulos radiculares de leguminosas tolerantes à seca, extraiu ADN para sequenciação 16S e nifH e criou uma coleção de culturas de bactérias fixadoras de azoto. É coautor de duas contribuições em conferências de 2026 sobre este trabalho, apresentadas por K. C. Mercurio no Canadá e nos EUA.",
        moringa: "No projeto de licenciatura (2022), o George testou extratos de sementes e folhas de <i>Moringa oleifera</i> contra <i>E. coli</i>, <i>Salmonella</i> Typhi e <i>Candida albicans</i> — um exemplo de bioprospeção, uma das suas áreas de interesse.",
        fly: "O George está a preparar um manuscrito que utiliza a análise discriminante em R para testar se endossimbiontes e outras bactérias podem servir como marcadores do sexo, da espécie, do local e da estação do ano em moscas forídeas selvagens (Diptera: Phoridae).",
        pubs: "Os trabalhos do George incluem um relatório de investigação da NTNU (2025) sobre a implementação de OECM no Município de Trondheim (DOI: 10.21400/wy6k-5y88), duas contribuições em conferências de 2026 como coautor (apresentadas por K. C. Mercurio em Kingston, no Canadá, e na Penn State, nos EUA) e dois manuscritos em preparação. <a href=\"#publications\">Ver todos os trabalhos</a>.",
        teach: "O George forma pequenos agricultores em saúde do solo, facilita decisões em grupo em ensaios de culturas de cobertura e participou no desenvolvimento de ferramentas de monitorização de pragas para agricultores, traduzidas para suaíli (MKARUN, desde 2023). De 2022 a 2025, foi voluntário na Universidade de Dodoma, onde lecionou e acompanhou aulas práticas de microbiologia e parasitologia. <a href=\"#outreach\">Ver Ensino e extensão</a>.",
        edu: "O George está a concluir um mestrado em Gestão de Recursos Naturais – Biologia na NTNU, em Trondheim (2025–2027), e é licenciado em Biologia pela Universidade de Dodoma, na Tanzânia (2019–2022).",
        member: "O George é membro da British Ecological Society (desde novembro de 2025) e da American Ornithological Society (desde janeiro de 2026).",
        award: "O mestrado do George é financiado pela bolsa NORSTIP da Direção Norueguesa do Ensino Superior e Competências (2025–2027).",
        interests: "Os interesses do George incluem ecologia microbiana, microbiologia do solo, ambientes extremos e zonas áridas, resistência aos antimicrobianos, «Uma Só Saúde», doenças da vida selvagem, fixação de azoto, bioprospeção e políticas de recursos naturais.",
        where: "O George vive em Trondheim, na Noruega, onde estuda na NTNU, e realiza o trabalho de campo em Dodoma, no centro da Tanzânia. <a href=\"#globe-section\">Rode o globo</a> para ver todos os locais de investigação e de apresentação.",
        contact: "Pode enviar um e-mail ao George para " + MAIL + ", contactá-lo no " + LI + " ou utilizar o <a href=\"#contact\">formulário de contacto</a>. O seu ORCID iD é " + OR + ".",
        cv: "Pode " + CV("descarregar o CV do George aqui") + " (em inglês).",
        training: "O George concluiu duas formações: uma formação prática em genómica e metagenómica de agentes patogénicos na perspetiva «Uma Só Saúde», com o SACIDS, o Governo da Tanzânia e a Universidade de Agricultura de Sokoine (2023) — extração de ADN, eletroforese em gel, Qubit/NanoDrop, sequenciação Oxford Nanopore e BLAST —, e a CIRTification em proteção de participantes humanos, da Universidade do Illinois em Chicago (2024). <a href=\"#experience\">Ver Experiência e formação</a>.",
        intern: "Em 2021, o George fez um estágio em agrofloresta e em desenvolvimento e multiplicação de sementes no Tanzania Agricultural Research Institute (TARI), Centro de Tumbi, em Tabora, onde propagou árvores autóctones e de fruto, como Vitex, marula, cajueiro, citrinos e mangueira.",
        thanks: "De nada! 😊 Gostaria de saber mais alguma coisa sobre o trabalho do George?"
      },

      ar: {
        greet: "مرحبًا! 👋 يمكنني أن أخبرك عن أبحاث جورج ومنشوراته وأنشطته في التدريس والتوعية وتعليمه، أو عن طريقة التواصل معه. ماذا تودّ أن تعرف؟",
        who: "جورج جيمسون أوبيد عالم بيئة ميكروبية وعالم أحياء في مجال الموارد الطبيعية. وهو طالب ماجستير في إدارة الموارد الطبيعية – علم الأحياء بجامعة NTNU في النرويج بمنحة NORSTIP، وحاصل على بكالوريوس علم الأحياء من جامعة دودوما في تنزانيا. وقد أُجريت معظم أبحاثه في المناطق شبه الجافة بوسط تنزانيا.",
        research: "يعمل جورج على أربعة مشاريع رئيسية: (1) البكتيريا الحيوانية المنشأ والمقاومة لمضادات الميكروبات لدى الغربان الغازية في دودوما (الماجستير)؛ (2) صحة التربة والميكروبات المثبِّتة للنيتروجين في العُقد الجذرية بمنطقة نغومبي شبه الجافة (MKARUN)؛ (3) النشاط المضاد للميكروبات لمستخلصات المورينغا (التنقيب الحيوي)؛ (4) المؤشرات البكتيرية لدى ذباب الفوريد البري. <a href=\"#research\">اطّلع على قسم الأبحاث</a>.",
        crow: "في إطار رسالة الماجستير، يدرس جورج العوامل البيئية والبشرية المرتبطة بالبكتيريا الحيوانية المنشأ والمقاومة لمضادات الميكروبات لدى الغراب الهندي الغازي <bdi>(<i>Corvus splendens</i>)</bdi> في دودوما. وقد اصطاد 53 غرابًا، وعزل البكتيريا المعوية، واختبر مقاومتها للمضادات الحيوية بطريقة كيربي–باور. يشرف على البحث: Prof. Augustine Arukwe وProf. Eivin Røskaft وDr Peter Ranke وDr Ignas Safari.",
        amr: "تُعدّ مقاومة مضادات الميكروبات محورًا أساسيًا في عمل جورج: من اختبار المستخلصات النباتية (المورينغا) ضد المُمرِضات، إلى دراسة البكتيريا المقاومة التي تحملها الغربان الغازية — وهي قضية تندرج ضمن نهج «الصحة الواحدة» الذي يربط بين الحياة البرية والإنسان والبيئة.",
        soil: "منذ عام 2023، يعمل جورج مساعد باحث في مشروع MKARUN (جامعة ولاية بنسلفانيا وجامعة دودوما ومنظمة CDEO) في منطقة نغومبي شبه الجافة. وقد جمع عينات من العُقد الجذرية للبقوليات المقاومة للجفاف، واستخلص الحمض النووي لتحديد تسلسل جينَي 16S وnifH، وأنشأ مجموعة مستنبتات من البكتيريا المثبِّتة للنيتروجين. كما شارك في تأليف مساهمتين في مؤتمرين عام 2026 حول هذا العمل، قدّمتهما K. C. Mercurio في كندا والولايات المتحدة.",
        moringa: "في مشروع البكالوريوس (2022)، اختبر جورج مستخلصات بذور وأوراق المورينغا <bdi>(<i>Moringa oleifera</i>)</bdi> ضد <i>E. coli</i> و<i>Salmonella</i> Typhi و<i>Candida albicans</i> — وهو مثال على التنقيب الحيوي، أحد مجالات اهتمامه البحثية.",
        fly: "يُعدّ جورج مخطوطة يستخدم فيها التحليل التمييزي في برنامج R لاختبار ما إذا كانت البكتيريا التكافلية الداخلية وغيرها من البكتيريا يمكن أن تكون مؤشرات على الجنس والنوع والموقع والموسم لدى ذباب الفوريد البري <bdi>(Diptera: Phoridae)</bdi>.",
        pubs: "تشمل أعمال جورج تقريرًا بحثيًا صادرًا عن جامعة NTNU عام 2025 حول تطبيق تدابير OECM في بلدية تروندهايم (DOI: 10.21400/wy6k-5y88)، ومساهمتين في مؤتمرين عام 2026 بصفته مؤلفًا مشاركًا (قدّمتهما K. C. Mercurio في كينغستون بكندا وفي جامعة ولاية بنسلفانيا بالولايات المتحدة)، ومخطوطتين قيد الإعداد. <a href=\"#publications\">اطّلع على جميع الأعمال</a>.",
        teach: "يدرّب جورج صغار المزارعين على صحة التربة، وييسّر اتخاذ القرارات الجماعية في تجارب محاصيل التغطية، وشارك في تطوير أدوات لرصد الآفات مخصّصة للمزارعين تُرجمت إلى السواحيلية (مشروع MKARUN، منذ عام 2023). ومن عام 2022 إلى عام 2025، تطوّع في جامعة دودوما، حيث درّس الدروس العملية في علم الأحياء الدقيقة وعلم الطفيليات وأشرف عليها. <a href=\"#outreach\">اطّلع على قسم التدريس والتوعية</a>.",
        edu: "يُكمل جورج دراسة الماجستير في إدارة الموارد الطبيعية – علم الأحياء بجامعة NTNU في تروندهايم (2025–2027)، وهو حاصل على بكالوريوس علم الأحياء من جامعة دودوما في تنزانيا (2019–2022).",
        member: "جورج عضو في الجمعية البيئية البريطانية (British Ecological Society) منذ نوفمبر 2025، وفي الجمعية الأمريكية لعلم الطيور (American Ornithological Society) منذ يناير 2026.",
        award: "تُموَّل دراسة جورج للماجستير بمنحة NORSTIP المقدَّمة من المديرية النرويجية للتعليم العالي والمهارات (2025–2027).",
        interests: "تشمل اهتمامات جورج علم البيئة الميكروبية، وعلم الأحياء الدقيقة للتربة، والبيئات القاسية والأراضي الجافة، ومقاومة مضادات الميكروبات، ونهج «الصحة الواحدة»، وأمراض الحياة البرية، وتثبيت النيتروجين، والتنقيب الحيوي، وسياسات الموارد الطبيعية.",
        where: "يقيم جورج في تروندهايم بالنرويج، حيث يدرس في جامعة NTNU، ويُجري عمله الميداني في دودوما بوسط تنزانيا. <a href=\"#globe-section\">أدِر الكرة الأرضية</a> لرؤية جميع مواقع أبحاثه والعروض التي شارك فيها.",
        contact: "يمكنك مراسلة جورج عبر البريد الإلكتروني " + MAIL + "، أو التواصل معه عبر " + LI + "، أو استخدام <a href=\"#contact\">نموذج التواصل</a>. ومعرّفه في ORCID هو " + OR + ".",
        cv: "يمكنك " + CV("تنزيل السيرة الذاتية لجورج من هنا") + " (باللغة الإنجليزية).",
        training: "أتمّ جورج دورتين تدريبيتين: تدريبًا عمليًا على علم جينوم المُمرِضات والميتاجينوم وفق نهج «الصحة الواحدة» مع SACIDS وحكومة تنزانيا وجامعة سوكويني للزراعة (2023)، شمل استخلاص الحمض النووي والترحيل الكهربائي على الهلام وجهازَي Qubit وNanoDrop وتحديد التسلسل بتقنية Oxford Nanopore وأداة BLAST؛ وشهادة CIRTification في حماية المشاركين من البشر من جامعة إلينوي في شيكاغو (2024). <a href=\"#experience\">اطّلع على قسم الخبرات والتدريب</a>.",
        intern: "في عام 2021، أنهى جورج تدريبًا عمليًا في الحراجة الزراعية وتطوير البذور وإكثارها في معهد البحوث الزراعية التنزاني (TARI)، مركز تومبي في تابورا، حيث أكثر أشجارًا محلية وأشجار فاكهة مثل الفيتكس والمارولا والكاجو والحمضيات والمانجو.",
        thanks: "على الرحب والسعة! 😊 هل تودّ معرفة أي شيء آخر عن عمل جورج؟"
      },

      zh: {
        greet: "您好！👋 我可以为您介绍 George 的研究、成果、教学与推广活动、教育背景，或如何与他联系。您想了解什么？",
        who: "George Jameson Obed 是一名微生物生态学家和自然资源生物学家。他目前在挪威科技大学（NTNU）攻读自然资源管理（生物学方向）硕士学位，获 NORSTIP 奖学金资助，并拥有坦桑尼亚多多马大学生物学学士学位。他的大部分研究在坦桑尼亚中部的半干旱地区完成。",
        research: "George 主要开展四个项目：（1）多多马入侵家鸦携带的人畜共患细菌与耐药细菌（硕士研究）；（2）Nghumbi 半干旱地区的土壤健康与根瘤固氮微生物（MKARUN）；（3）辣木（<i>Moringa oleifera</i>）提取物的抗菌活性（生物勘探）；（4）野生蚤蝇体内的细菌标志物。<a href=\"#research\">查看研究部分</a>。",
        crow: "George 的硕士研究关注多多马入侵家鸦（<i>Corvus splendens</i>）携带的人畜共患细菌与抗微生物药物耐药细菌，以及相关的生态与人为因素。他捕获了 53 只家鸦，分离了肠道细菌，并采用 Kirby–Bauer 法检测其抗生素耐药性。导师：Augustine Arukwe 教授、Eivin Røskaft 教授、Peter Ranke 博士和 Ignas Safari 博士。",
        amr: "抗微生物药物耐药性是 George 研究工作的一条主线：从测试植物提取物（辣木）对病原体的作用，到研究入侵家鸦携带的耐药细菌——这是一个连接野生动物、人类与环境的“同一健康”问题。",
        soil: "自 2023 年起，George 在 Nghumbi 半干旱地区担任 MKARUN 项目（宾夕法尼亚州立大学、多多马大学和 CDEO）的研究助理。他采集了耐旱豆科植物的根瘤样本，提取 DNA 进行 16S 和 nifH 测序，并建立了固氮细菌菌种保藏库。他还合著了基于这项工作的两项 2026 年会议成果，由 K. C. Mercurio 在加拿大和美国报告。",
        moringa: "在本科研究项目（2022 年）中，George 测试了辣木（<i>Moringa oleifera</i>）种子和叶片提取物对 <i>E. coli</i>、<i>Salmonella</i> Typhi 和 <i>Candida albicans</i> 的作用——这是生物勘探的一个实例，也是他的研究兴趣之一。",
        fly: "George 正在撰写一篇论文，在 R 中运用判别分析，检验内共生菌及其他细菌能否作为野生蚤蝇（双翅目：蚤蝇科）性别、物种、地点和季节的标志物。",
        pubs: "George 的成果包括：一份 NTNU 研究报告（2025 年），内容为在特隆赫姆市实施 OECM（DOI：10.21400/wy6k-5y88）；两项 2026 年合著会议成果（由 K. C. Mercurio 分别在加拿大金斯顿和美国宾夕法尼亚州立大学报告）；以及两篇撰写中的论文。<a href=\"#publications\">查看全部成果</a>。",
        teach: "George 为小农户提供土壤健康培训，为覆盖作物试验组织集体决策，并参与开发了面向农民的害虫监测工具，且已译成斯瓦希里语（MKARUN，2023 年至今）。2022 年至 2025 年，他在多多马大学担任志愿者，讲授并指导微生物学和寄生虫学实验课。<a href=\"#outreach\">查看教学与推广</a>。",
        edu: "George 正在特隆赫姆的 NTNU 攻读自然资源管理（生物学方向）硕士学位（2025–2027 年），并拥有坦桑尼亚多多马大学生物学学士学位（2019–2022 年）。",
        member: "George 是英国生态学会（British Ecological Society，2025 年 11 月起）和美国鸟类学会（American Ornithological Society，2026 年 1 月起）的会员。",
        award: "George 的硕士学业由挪威高等教育与技能局的 NORSTIP 奖学金资助（2025–2027 年）。",
        interests: "George 的研究兴趣包括微生物生态学、土壤微生物学、极端环境与旱地、抗微生物药物耐药性、“同一健康”、野生动物疾病、生物固氮、生物勘探以及自然资源政策。",
        where: "George 现居挪威特隆赫姆，在 NTNU 学习，并在坦桑尼亚中部的多多马开展野外工作。<a href=\"#globe-section\">旋转地球仪</a>，即可查看他的所有研究地点和学术展示地点。",
        contact: "您可以发送邮件至 " + MAIL + "，在 " + LI + " 上与 George 联系，或使用<a href=\"#contact\">联系表单</a>。他的 ORCID iD 为 " + OR + "。",
        cv: "您可以" + CV("在此下载 George 的简历") + "（英文版）。",
        training: "George 完成了两项培训：与 SACIDS、坦桑尼亚政府和索科伊内农业大学合作开展的“同一健康”病原体基因组学与宏基因组学实操培训（2023 年），内容涵盖 DNA 提取、凝胶电泳、Qubit/NanoDrop、Oxford Nanopore 测序和 BLAST；以及伊利诺伊大学芝加哥分校的人类研究参与者保护 CIRTification 认证（2024 年）。<a href=\"#experience\">查看经历与培训</a>。",
        intern: "2021 年，George 在塔波拉的坦桑尼亚农业研究所（TARI）Tumbi 中心完成了农林复合经营、种子培育与繁殖方面的实习，繁育了牡荆属（Vitex）植物、马鲁拉树、腰果、柑橘和芒果等本土树种和果树。",
        thanks: "不客气！😊 您还想了解 George 工作的其他方面吗？"
      }
    },

    fallback: {
      fr: "Je ne suis pas sûr de pouvoir répondre à cette question. Je peux vous renseigner sur les recherches de George, ses publications, ses activités d'enseignement et de vulgarisation, sa formation, ses affiliations ou la manière de le contacter. Pour toute autre question, écrivez à " + MAIL + ".",
      pt: "Não tenho a certeza sobre isso. Posso responder a perguntas sobre a investigação do George, as suas publicações, o ensino e a extensão, a formação académica, as afiliações ou a forma de o contactar. Para outros assuntos, envie um e-mail para " + MAIL + ".",
      ar: "لست متأكدًا من ذلك. يمكنني الإجابة عن أسئلة حول أبحاث جورج ومنشوراته وأنشطته في التدريس والتوعية وتعليمه وعضوياته، أو عن طريقة التواصل معه. ولأي استفسار آخر، يُرجى المراسلة عبر " + MAIL + ".",
      zh: "这个问题我不太确定。我可以回答有关 George 的研究、成果、教学与推广、教育背景、学会会员身份或联系方式的问题。如有其他问题，请发送邮件至 " + MAIL + "。"
    },

    suggest: {
      fr: [["Qui est George ?", "who"], ["Recherche", "research"], ["Projet sur les corbeaux", "crow"], ["Publications", "pubs"], ["Enseignement", "teach"], ["Contact", "contact"]],
      pt: [["Quem é o George?", "who"], ["Investigação", "research"], ["Projeto das gralhas", "crow"], ["Publicações", "pubs"], ["Ensino e extensão", "teach"], ["Contacto", "contact"]],
      ar: [["من هو جورج؟", "who"], ["الأبحاث", "research"], ["مشروع الغربان", "crow"], ["المنشورات", "pubs"], ["التدريس والتوعية", "teach"], ["التواصل", "contact"]],
      zh: [["George 是谁？", "who"], ["研究", "research"], ["家鸦项目", "crow"], ["成果", "pubs"], ["教学与推广", "teach"], ["联系方式", "contact"]]
    },

    placeholder: { fr: "Posez votre question…", pt: "Escreva uma pergunta…", ar: "اكتب سؤالك…", zh: "请输入您的问题…" }
  };
})();
