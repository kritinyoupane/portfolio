export const profile = {
  handle: 'kritinyoupane',
  name: 'Kriti Nyoupane',
  roles: 'Project manager · Systems analyst · Software developer',
  bio: 'I turn data-heavy ideas into software that ships, and lead the people who build it.',
  from: 'Originally from Gulmi, based in Kathmandu.',
  email: 'kritineupane544@gmail.com',
  github: 'https://github.com/kritinyoupane',
  linkedin: 'https://linkedin.com/in/kriti-nyoupane-3b89811b4',
};

export const mailto = (subject, body = '') =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export const waypoints = [
  {
    id: 'plus2', short: '+2', glyph: 'book', t: 2015, alt: 12, kicker: 'Base camp',
    period: '2015 – 2017', title: 'Higher Secondary (+2)', place: 'The Times International College, Kathmandu',
    points: ['Scored 81.3%.', 'Mahatma Gandhi Scholarship from the Embassy of India, Kathmandu.'],
  },
  {
    id: 'be', short: 'BE', glyph: 'cap', t: 2018.9, alt: 34, kicker: 'First climb',
    period: 'Nov 2018 – Apr 2023', title: 'BE, Computer Engineering', place: 'IOE Pulchowk Campus, Tribhuvan University',
    points: [
      'Ranked in the top 500 of about 16,000 candidates in the 2018 IOE entrance exam; graduated with 72.3%.',
      'Major project: 3D reconstruction for a virtual tour using Neural Radiance Fields (NeRF).',
      'Minor project: transformer-based text similarity search with BERT Sentence Transformers.',
    ],
  },
  {
    id: 'saathi', short: 'Saathi', glyph: 'sprout', t: 2021.3, alt: 30, kicker: 'Into the fields',
    period: 'Apr – Sep 2021', title: 'Research ML Engineer', place: 'Impacters (Project Saathi), Nepal',
    points: [
      'Built a crop recommendation system for Nepali farms, combining sensor readings with soil types classified from images.',
      'Defined the soil classification scheme with agricultural experts.',
      'Benchmarked CNN, MobileNet and U-Net against classical models, and co-authored an applied article.',
    ],
  },
  {
    id: 'iit', short: 'IIT Roorkee', glyph: 'shield', t: 2022.3, alt: 48, kicker: 'Across the border',
    period: 'Apr – May 2022', title: 'Research Intern', place: 'IIT Roorkee, India (SPARK programme)',
    points: [
      'Android malware classification with deep image learning (DIDroid) across 14 malware categories.',
      'Extracted code features with Apktool and ran ablations on a 1D CNN.',
    ],
  },
  {
    id: 'v23', short: 'Venture23', glyph: 'laptop', t: 2023.5, alt: 66, kicker: 'Shipping',
    period: 'Jun 2023 – Apr 2026', title: 'Software Engineer & Project Manager', place: 'Venture23, Kathmandu',
    points: [
      'Software development first: built RAG systems and knowledge graphs, and developed myOS, an agentic AI system for personal development.',
      'Then project management: led an AI-driven teledermatology platform for SkinHappy, an overseas client, covering requirements, milestones, acceptance criteria and releases.',
      'The link between the client and the dev team, reporting progress, risks and open issues to both.',
    ],
  },
  {
    id: 'msc', short: 'MSc', glyph: 'bars', t: 2024.4, alt: 80, kicker: 'The thesis ridge',
    period: 'May 2024 – May 2026', title: 'MSc, Computer Engineering (Data Science & Analytics)', place: 'IOE Pulchowk Campus, Tribhuvan University',
    points: [
      'Aggregate 86.53%, on an IOE merit scholarship.',
      'Thesis: multi-output machine learning for site-specific fertilizer recommendation in Nepal.',
    ],
  },
  {
    id: 'japan', short: 'Japan', glyph: 'summit', t: 2026.85, alt: 100, kicker: 'Summit (so far)',
    period: '24 – 27 Nov 2026', title: 'Presenting at CANDARW 2026', place: 'Ishigaki, Japan',
    points: ['The fertilizer paper is in press with IEEE Computer Society proceedings (GPU Computing and AI workshop).'],
  },
];

export const stories = [{ id: 'hi', short: 'Hello' }, ...waypoints];

export const projects = [
  {
    id: 'derm', art: 'derm', kind: 'Delivery', title: 'AI teledermatology platform', place: 'Venture23, Kathmandu', when: 'As project manager',
    text: 'Managed development of an AI-driven teledermatology platform for SkinHappy, an overseas client, from requirements to client releases.',
    tags: ['ProjectManagement', 'HealthTech', 'ClientDelivery'],
    details: [
      'Gathered and clarified requirements, agreed priorities and acceptance criteria, and recorded decisions and changes in scope.',
      'Planned milestones, allocated work across the team, and tracked development, testing and defect resolution.',
      'Reported progress, risks and open issues to the client and management, and coordinated releases with the client.',
    ],
  },
  {
    id: 'myos', art: 'myos', kind: 'Agentic AI', title: 'myOS', place: 'Venture23, Kathmandu', when: 'As software engineer',
    text: 'A self-improvement app: an agentic AI system for personal development, built at Venture23.',
    tags: ['AgenticAI', 'LLM', 'PersonalDevelopment'],
  },
  {
    id: 'nerf', art: 'nerf', kind: 'Computer vision', title: 'NeRF virtual tour', place: 'IOE Pulchowk Campus', when: 'BE major project',
    text: 'My BE major project: 3D reconstruction for a virtual tour using Neural Radiance Fields, synthesising novel views by querying 5D coordinates along camera rays.',
    tags: ['NeRF', 'ComputerVision', '3D'],
  },
  {
    id: 'rag', art: 'rag', kind: 'LLM apps', title: 'RAG & knowledge graphs', place: 'Venture23, Kathmandu', when: 'As software engineer',
    text: 'Retrieval-augmented generation systems on top of knowledge graphs that model the entities and relationships the apps rely on.',
    tags: ['RAG', 'KnowledgeGraphs', 'LLM'],
  },
  {
    id: 'saathi', art: 'saathi', kind: 'AgriTech', title: 'Project Saathi', place: 'Impacters, Nepal', when: '2021',
    text: 'Crop recommendations for Nepali farms, combining sensor readings (temperature, humidity, moisture) with soil types classified from images.',
    tags: ['AgriTech', 'ComputerVision', 'CropRecommendation'],
    details: [
      'Defined the soil classification scheme with agricultural experts and merged sensor and image features into a single dataset.',
      'Benchmarked CNN, MobileNet and U-Net against classical machine learning models.',
      'Co-authored an applied article on the work.',
    ],
  },
  {
    id: 'text', art: 'text', kind: 'NLP', title: 'Text similarity search', place: 'IOE Pulchowk Campus', when: 'BE minor project',
    text: 'My BE minor project: transformer-based search that returns semantically similar sentences, using BERT Sentence Transformers.',
    tags: ['NLP', 'BERT', 'SemanticSearch'],
  },
];

export const disciplines = [
  {
    id: 'ai', name: 'AI / ML', color: '#1c1b22',
    line: 'Where I started: models, retrieval and data.',
    text: 'Built RAG systems, knowledge graphs and an agentic AI app (myOS) at Venture23. Before that, ML research on crop recommendation, Android malware classification, and the soil-to-fertilizer models in my MSc thesis.',
    chips: ['RAG', 'Knowledge graphs', 'Agentic AI', 'Random Forest · XGBoost · LightGBM', 'CNN · U-Net · BERT · NeRF', 'GPU training', 'GeoTIFF rasters'],
  },
  {
    id: 'se', name: 'Software Engineering', color: '#5f5d66',
    line: 'How ideas become working systems.',
    text: 'Worked as a software engineer at Venture23, building AI-driven systems, and built data pipelines on live APIs and the data models behind applications. I know what a build costs because I have shipped one.',
    chips: ['Python', 'C / C++', 'Front-end', 'Git & GitHub', 'API analysis & integration', 'Data pipelines', 'ER models', 'UML & data flow diagrams', 'Technical documentation'],
  },
  {
    id: 'pm', name: 'Project Management', color: '#6b2d5c',
    line: 'Where I am headed: leading the people and the plan.',
    text: 'Led development of an AI-driven teledermatology platform for SkinHappy, an overseas client. I turn client needs into requirements, milestones and acceptance criteria, keep the team moving, and report progress, risks and open issues to both sides.',
    chips: ['Planning & scheduling', 'Scope, milestones & estimates', 'Risk & dependency management', 'Resource planning', 'Stakeholder coordination', 'Requirements & SRS', 'Acceptance criteria', 'UAT, deployment & handover', 'Status reporting'],
  },
];

export const papers = [
  { tag: 'IEEE CS · In press', title: "A multi-output machine learning framework for site-specific fertilizer quantity recommendation reflecting Nepal's diverse agricultural landscape", venue: 'CANDARW 2026, 11th International Workshop on GPU Computing and AI (GCA). Ishigaki, Japan, 24–27 Nov 2026.', authors: 'Nyoupane, Giri, Ito, Parajuli, Purbey, Thapa & Chaulagain' },
  { tag: 'Presented', title: 'Predicting fertilizer quantity using geo-spatial and physicochemical properties of soil', venue: '8th KEC Conference on Engineering and Technology, Lalitpur. 7 May 2026.', authors: 'Nyoupane, Giri & Purbey' },
  { tag: 'Applied article', title: 'Discerning soil properties using a convolutional neural network', venue: 'Impacters, 2021.', authors: 'Pokharel & Nyoupane' },
];

export const awards = [
  ['2024', 'Merit scholarship for MSc, IOE'],
  ['2022', 'AI & Deep Learning Fellowship, Fusemachines'],
  ['2022', 'SPARK Research Internship Scholarship, IIT Roorkee'],
  ['2022', 'Third Runner-Up, Datarush ML competition, LOCUS'],
  ['2021', 'Scholar, Annual Nepal AI School (ANAIS), NAAMII'],
];

export const community = [
  'President, IOE Pulchowk Girls (women in STEM)',
  'Founding Member, IT Club, Pulchowk Campus',
  'Community Builder, NxtGen (startup), 2020–21',
  'Volunteer, Team Nepo (youth empowerment & nature conservation)',
];

export const offTrail = [
  'Off the trail: meeting people, dancing, reading novels, travelling.',
  'Languages: Nepali (native), English (professional), Hindi (proficient).',
];
