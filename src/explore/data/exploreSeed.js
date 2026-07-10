// ── ShikshaCom · Explore — sample content ──────────────────────────────
// User-side data for the Explore module (Scribd-inspired document hub).

export const CATEGORIES = [
  { key: 'research',   name: 'Research Papers',  icon: '\uD83D\uDCC4', color: '#125027', count: 1284, blurb: 'Peer-reviewed studies & journals' },
  { key: 'books',      name: 'Books',            icon: '\uD83D\uDCDA', color: '#004a33', count: 642,  blurb: 'Textbooks & reference reads' },
  { key: 'articles',   name: 'Articles',         icon: '\uD83D\uDCF0', color: '#0f8f7e', count: 918,  blurb: 'Explainers & short reads' },
  { key: 'notes',      name: 'Notes',            icon: '\uD83D\uDCDD', color: '#2f6bd8', count: 2130, blurb: 'Handwritten & typed notes' },
  { key: 'study',      name: 'Study Materials',  icon: '\uD83D\uDCD8', color: '#1b9c85', count: 1476, blurb: 'Guides, summaries & kits' },
  { key: 'ppt',        name: 'Presentations',    icon: '\uD83D\uDCCA', color: '#ff8f01', count: 534,  blurb: 'Slide decks & seminars' },
  { key: 'assignment', name: 'Assignments',      icon: '\u270D\uFE0F', color: '#6b58d3', count: 803,  blurb: 'Solved & sample submissions' },
  { key: 'question',   name: 'Question Papers',  icon: '\u2753',       color: '#c2410c', count: 1189, blurb: 'Previous years & mock tests' },
];

export const SUBJECTS = ['Computer Science','Electronics','Mathematics','Physics','Chemistry','Biology','Mechanical Engineering','Civil Engineering','Economics','Management','Education','Healthcare'];
export const LEVELS = ['School (9-12)','Undergraduate','Postgraduate','Doctoral','Competitive Exams'];
export const LANGUAGES = ['English','Hindi','Bengali','Tamil','Marathi'];
export const FILETYPES = ['PDF','DOCX','PPT'];
export const SORTS = ['Latest','Trending','Most Viewed','Most Downloaded'];
export const DATE_RANGES = ['Any time','Past 24 hours','Past week','Past month','Past year'];

export const AUTHORS = [
  { id:'a1', name:'Dr. Rahul Sharma', initials:'RS', color:'#125027', title:'Professor, Computer Science', institution:'IIT Delhi',
    bio:'Researcher in artificial intelligence and adaptive learning systems. Published 40+ papers on AI in education and intelligent tutoring.',
    followers:'12.4k', docsCount:38, downloads:'182k', views:'640k' },
  { id:'a2', name:'Prof. Ananya Das', initials:'AD', color:'#2f6bd8', title:'Associate Professor, Electronics', institution:'Jadavpur University',
    bio:'Works on wireless communication, 5G/6G networks and IoT for smart cities. Passionate about open-access engineering education.',
    followers:'8.1k', docsCount:26, downloads:'96k', views:'310k' },
  { id:'a3', name:'Dr. Meera Singh', initials:'MS', color:'#0f8f7e', title:'Scientist, Biomedical Engineering', institution:'AIIMS Research Wing',
    bio:'Deep-learning approaches to early disease detection and medical imaging. Mentor to graduate researchers in healthcare AI.',
    followers:'15.9k', docsCount:31, downloads:'240k', views:'812k' },
  { id:'a4', name:'Neha Gupta', initials:'NG', color:'#6b58d3', title:'Research Scholar, Computer Engineering', institution:'NIT Trichy',
    bio:'PhD scholar exploring blockchain, security and verifiable credentials. Shares detailed notes and project reports for students.',
    followers:'4.6k', docsCount:19, downloads:'54k', views:'171k' },
  { id:'a5', name:'Arjun Menon', initials:'AM', color:'#ff8f01', title:'Faculty, Mathematics', institution:'Delhi University',
    bio:'Teaches calculus, linear algebra and discrete mathematics. Author of well-loved exam-prep notes and solved question banks.',
    followers:'9.7k', docsCount:44, downloads:'210k', views:'588k' },
  { id:'a6', name:'Dr. Kavya Iyer', initials:'KI', color:'#c2410c', title:'Assistant Professor, Economics', institution:'JNU',
    bio:'Development economics, public policy and behavioural economics. Curates reading lists and lecture decks for postgraduates.',
    followers:'6.3k', docsCount:22, downloads:'71k', views:'205k' },
];

export const DOCUMENTS = [
  { id:'d1', title:'Artificial Intelligence for Smart Education Systems', type:'research', authorId:'a1',
    subject:'Computer Science', level:'Postgraduate', language:'English', institution:'IIT Delhi', filetype:'PDF',
    date:'2026-05-18', dateLabel:'May 2026', views:'24.1k', downloads:'1.8k', rating:4.9, pages:42,
    tags:['AI','Education','Machine Learning','Adaptive Learning'],
    desc:'How AI is transforming classrooms through adaptive learning and intelligent tutoring systems.',
    full:'This paper presents a comprehensive framework for integrating artificial intelligence into modern educational environments. We examine adaptive learning pathways, intelligent tutoring systems, and automated assessment, evaluating their impact on learning outcomes across 12 institutions. Results indicate measurable gains in retention and engagement when AI-driven personalization is applied responsibly.',
    featured:true, trending:true, recent:false },

  { id:'d2', title:'5G & Beyond: Wireless Communication for Smart Cities', type:'research', authorId:'a2',
    subject:'Electronics', level:'Postgraduate', language:'English', institution:'Jadavpur University', filetype:'PDF',
    date:'2026-04-30', dateLabel:'Apr 2026', views:'18.6k', downloads:'920', rating:4.7, pages:36,
    tags:['5G','IoT','Wireless','Smart City'],
    desc:'A study of next-generation wireless infrastructure powering smart-city applications.',
    full:'We analyse 5G and emerging 6G communication infrastructure as the backbone of smart-city services — from intelligent transport to distributed sensing. The paper models latency, throughput and energy trade-offs, and proposes an architecture for scalable, low-power IoT deployments in dense urban environments.',
    featured:true, trending:true, recent:false },

  { id:'d3', title:'Deep Learning for Early Disease Detection', type:'research', authorId:'a3',
    subject:'Healthcare', level:'Doctoral', language:'English', institution:'AIIMS Research Wing', filetype:'PDF',
    date:'2026-06-02', dateLabel:'Jun 2026', views:'31.7k', downloads:'2.4k', rating:5.0, pages:54,
    tags:['Healthcare','CNN','Medical Imaging','Diagnostics'],
    desc:'An AI diagnostic framework using deep learning for early disease prediction.',
    full:'This work introduces a convolutional diagnostic framework trained on multi-modal medical imaging for the early detection of chronic conditions. We report sensitivity and specificity across three clinical datasets and discuss deployment considerations, interpretability, and ethical safeguards for clinical decision support.',
    featured:true, trending:true, recent:true },

  { id:'d4', title:'Blockchain-Based Academic Certificate Verification', type:'assignment', authorId:'a4',
    subject:'Computer Science', level:'Undergraduate', language:'English', institution:'NIT Trichy', filetype:'DOCX',
    date:'2026-06-10', dateLabel:'Jun 2026', views:'7.2k', downloads:'610', rating:4.5, pages:28,
    tags:['Blockchain','Security','Credentials'],
    desc:'A project report on secure certificate verification using blockchain.',
    full:'A student project report detailing a decentralized system for issuing and verifying academic certificates on a permissioned blockchain. Covers smart-contract design, tamper-evident records, and a verification portal, with a working prototype and evaluation of gas costs and verification latency.',
    featured:false, trending:false, recent:true },

  { id:'d5', title:'Complete Notes: Linear Algebra for Engineers', type:'notes', authorId:'a5',
    subject:'Mathematics', level:'Undergraduate', language:'English', institution:'Delhi University', filetype:'PDF',
    date:'2026-06-14', dateLabel:'Jun 2026', views:'42.3k', downloads:'6.1k', rating:4.8, pages:96,
    tags:['Linear Algebra','Vectors','Matrices','Exam Prep'],
    desc:'Hand-crafted, exam-ready notes covering the full linear algebra syllabus.',
    full:'These notes cover vector spaces, linear transformations, eigenvalues, diagonalization and applications, with worked examples and quick-revision summaries at the end of every chapter. Written for first- and second-year engineering students preparing for semester examinations.',
    featured:true, trending:true, recent:true },

  { id:'d6', title:'Organic Chemistry: Reaction Mechanisms Study Guide', type:'study', authorId:'a3',
    subject:'Chemistry', level:'School (9-12)', language:'English', institution:'AIIMS Research Wing', filetype:'PDF',
    date:'2026-05-22', dateLabel:'May 2026', views:'28.9k', downloads:'3.3k', rating:4.6, pages:64,
    tags:['Organic Chemistry','Reactions','NEET','Study Guide'],
    desc:'A structured guide to named reactions and mechanisms for board & NEET prep.',
    full:'A concise study guide mapping the most important organic reaction mechanisms, arrow-pushing conventions and named reactions. Includes practice problems with fully worked solutions, aligned to Class 11-12 boards and competitive medical entrance syllabi.',
    featured:false, trending:true, recent:false },

  { id:'d7', title:'Data Structures & Algorithms — Lecture Slides', type:'ppt', authorId:'a1',
    subject:'Computer Science', level:'Undergraduate', language:'English', institution:'IIT Delhi', filetype:'PPT',
    date:'2026-06-05', dateLabel:'Jun 2026', views:'19.4k', downloads:'2.0k', rating:4.7, pages:120,
    tags:['DSA','Algorithms','Trees','Graphs'],
    desc:'A full slide deck covering core data structures and algorithm analysis.',
    full:'Lecture slides spanning arrays, linked lists, stacks, queues, trees, graphs, hashing and complexity analysis. Each topic includes visual diagrams, pseudo-code and complexity tables, with practice questions at the end of each module.',
    featured:false, trending:false, recent:true },

  { id:'d8', title:'Previous Year Question Papers — GATE CS (2019-2025)', type:'question', authorId:'a5',
    subject:'Computer Science', level:'Competitive Exams', language:'English', institution:'Delhi University', filetype:'PDF',
    date:'2026-04-11', dateLabel:'Apr 2026', views:'55.2k', downloads:'9.8k', rating:4.9, pages:210,
    tags:['GATE','Question Bank','Solved','Practice'],
    desc:'Seven years of GATE Computer Science papers with detailed solutions.',
    full:'A compiled question bank of GATE Computer Science papers from 2019 to 2025, each with step-by-step solutions and topic tags. Ideal for aspirants tracking their preparation across subjects and identifying high-yield areas.',
    featured:true, trending:true, recent:false },

  { id:'d9', title:'Introduction to Development Economics', type:'books', authorId:'a6',
    subject:'Economics', level:'Postgraduate', language:'English', institution:'JNU', filetype:'PDF',
    date:'2026-03-28', dateLabel:'Mar 2026', views:'12.1k', downloads:'1.1k', rating:4.4, pages:180,
    tags:['Economics','Development','Policy'],
    desc:'An open-access textbook introducing core themes in development economics.',
    full:'This textbook introduces growth theory, poverty and inequality, human development, and the role of institutions and policy. Written for postgraduate students, it balances formal models with real-world case studies from developing economies.',
    featured:false, trending:false, recent:false },

  { id:'d10', title:'Thermodynamics: Concepts & Solved Problems', type:'notes', authorId:'a2',
    subject:'Mechanical Engineering', level:'Undergraduate', language:'English', institution:'Jadavpur University', filetype:'PDF',
    date:'2026-05-30', dateLabel:'May 2026', views:'16.8k', downloads:'2.7k', rating:4.6, pages:72,
    tags:['Thermodynamics','Mechanical','Solved Problems'],
    desc:'Clear notes on the laws of thermodynamics with plenty of solved examples.',
    full:'Covers the zeroth through third laws of thermodynamics, entropy, cycles and applications, with a large bank of solved numerical problems. Designed to build intuition alongside exam readiness for mechanical engineering students.',
    featured:false, trending:false, recent:true },

  { id:'d11', title:'Machine Learning: A Practical Article Series', type:'articles', authorId:'a4',
    subject:'Computer Science', level:'Undergraduate', language:'English', institution:'NIT Trichy', filetype:'PDF',
    date:'2026-06-12', dateLabel:'Jun 2026', views:'21.5k', downloads:'1.4k', rating:4.5, pages:34,
    tags:['Machine Learning','Tutorial','Hands-on'],
    desc:'A beginner-friendly article series taking you from regression to neural nets.',
    full:'A five-part article series that walks through the machine-learning workflow: data preparation, linear and logistic regression, decision trees, ensembles and a gentle introduction to neural networks — each with runnable examples and intuition-first explanations.',
    featured:false, trending:true, recent:true },

  { id:'d12', title:'Public Policy Analysis — Seminar Deck', type:'ppt', authorId:'a6',
    subject:'Economics', level:'Postgraduate', language:'English', institution:'JNU', filetype:'PPT',
    date:'2026-05-08', dateLabel:'May 2026', views:'8.9k', downloads:'740', rating:4.3, pages:58,
    tags:['Policy','Economics','Seminar'],
    desc:'Slides framing the policy cycle, evaluation methods and case studies.',
    full:'A seminar deck presenting the policy cycle, cost-benefit and impact evaluation methods, and three case studies in Indian public policy. Includes discussion prompts and a curated reading list for further study.',
    featured:false, trending:false, recent:false },
];

export const COLLECTIONS = [
  { id:'c1', title:'GATE CS — Complete Prep Kit', curatorId:'a5', color:'#125027', visibility:'Public',
    desc:'Everything you need for GATE Computer Science: notes, solved papers and slide decks.',
    docIds:['d8','d7','d5','d1'] },
  { id:'c2', title:'AI & Machine Learning Essentials', curatorId:'a1', color:'#2f6bd8', visibility:'Public',
    desc:'A curated path from ML basics to applied AI research.',
    docIds:['d11','d1','d3'] },
  { id:'c3', title:'NEET Science Foundation', curatorId:'a3', color:'#0f8f7e', visibility:'Public',
    desc:'Chemistry, biology and physics study guides for medical aspirants.',
    docIds:['d6','d3'] },
  { id:'c4', title:'Engineering Maths Toolkit', curatorId:'a5', color:'#ff8f01', visibility:'Public',
    desc:'Linear algebra, calculus and problem sets for first-year engineers.',
    docIds:['d5','d10'] },
  { id:'c5', title:'Economics & Policy Reading List', curatorId:'a6', color:'#6b58d3', visibility:'Public',
    desc:'Core texts and decks for postgraduate development economics.',
    docIds:['d9','d12'] },
  { id:'c6', title:'Core CS Fundamentals', curatorId:'a1', color:'#c2410c', visibility:'Public',
    desc:'Data structures, algorithms and the building blocks of computer science.',
    docIds:['d7','d1','d11'] },
];

// Document "type" meta lookup (icon + colour), mirrors CATEGORIES.
export const TYPE_META = CATEGORIES.reduce((m, c) => { m[c.key] = c; return m; }, {});

export const DOC_TYPES_UPLOAD = [
  'Research Paper','Book','Article','Notes','Study Material','Presentation',
  'Assignment','Question Paper','Project Report','Thesis','Other Educational Document'
];
