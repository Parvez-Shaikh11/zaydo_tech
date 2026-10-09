import { artwork } from './images';

/**
 * Case studies.
 *
 * `title` says what the thing IS, in plain words. These used to be invented
 * product brands — AeroOps, MedFlow, InsightDesk — which read as a client list
 * we do not have and told a visitor nothing about the work. A name has to be
 * understood at a glance from the card alone.
 *
 * `serviceId` links each project back to `servicesData`, which powers the Work
 * page filter and the "related work" block on every service page.
 *
 * `status` is stated plainly on every card. Concept and internal builds are
 * labelled as such — we do not present them as client engagements, and no
 * metric appears here that was not actually observed.
 *
 * `grade` is deliberately empty on all five: the branded scene artwork is
 * purpose-made and on-brand already, so it gets no filter and no accent tint.
 * Set it back to a `brand-grade*` class only if a stock image is used again.
 */
export const projects = [
  {
    slug: 'operations-management-system',
    title: 'Operations Management System',
    tagline: 'Scheduling, assets and maintenance in one place',
    serviceId: 'custom-software',
    category: 'Custom Software',
    status: 'Production System',
    statusTone: 'live',
    year: '2025',
    featured: true,
    role: 'Core Software Architecture & Backend Engineering',
    image: artwork.customSoftware,
    grade: '',
    accent: '#0059FD',
    description:
      'A resilient operations suite that schedules resources, monitors asset telemetry in real time, and runs predictive maintenance logging from a single database.',
    challenge:
      'Operations ran across disconnected spreadsheets and message threads. Scheduling changes had to be phoned through, maintenance history lived in three places, and nobody could answer "what is the current state of this asset?" without asking two people.',
    approach:
      'We spent the discovery phase with the people doing the work — supervisors, field engineers, operations managers — and mapped every manual handover. That produced a single relational schema covering assets, schedules and maintenance events, exposed through an event-driven API so every screen reads from the same truth.',
    architecture: {
      frontend: 'React, Tailwind CSS, WebSocket live updates',
      backend: 'Node.js (Express), Redis caching layer',
      database: 'PostgreSQL with connection pooling',
      cloud: 'Dockerised deployment on a secured internal network',
      automation: 'Scheduled background workers for compliance checks',
    },
    features: [
      'Drag-and-drop scheduling grid with conflict detection',
      'Live telemetry hub showing per-asset operational status',
      'Threshold-triggered incident reports over SMS and email',
      'Automated compliance tracking against regulatory requirements',
    ],
    signals: [
      'Single source of truth replacing parallel spreadsheets',
      'Scheduling conflicts caught at entry instead of on site',
      'Compliance documentation generated rather than assembled',
    ],
    outcome:
      'The system became the operational source of truth. Scheduling conflicts are now caught at the point of entry, and compliance documentation that was previously assembled by hand is generated from the same records the team already maintains.',
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    tagline: 'Headless storefront with live inventory',
    serviceId: 'web-applications',
    category: 'Web Applications',
    status: 'Production System',
    statusTone: 'live',
    year: '2025',
    featured: true,
    role: 'Frontend Engineering & Third-Party Integration',
    image: artwork.webApplications,
    grade: '',
    accent: '#0077FD',
    description:
      'A decoupled commerce interface with global inventory sync, edge-cached catalogue queries and a merchant dashboard built for daily operational use.',
    challenge:
      'The legacy storefront took over five seconds to become usable on a mobile connection, checkout was abandoned at a high rate, and warehouse stock levels drifted out of sync with what the site displayed.',
    approach:
      'We separated the storefront from the monolith. A React front-end now reads from a GraphQL gateway with edge caching, while inventory is reconciled through webhooks from the warehouse system instead of a nightly batch job.',
    architecture: {
      frontend: 'React, Tailwind CSS, route-level code splitting',
      backend: 'GraphQL API gateway, serverless edge handlers',
      database: 'PostgreSQL, Redis session cache',
      cloud: 'Global CDN with edge rendering',
      automation: 'Inventory webhooks synced to warehouse logistics',
    },
    features: [
      'Sub-second catalogue navigation on mobile viewports',
      'Headless checkout supporting multiple payment gateways',
      'Live multi-warehouse stock availability',
      'Merchant analytics interface for daily operations',
    ],
    signals: [
      'Storefront decoupled from the legacy monolith',
      'Inventory reconciled by webhook, not nightly batch',
      'Catalogue served from the edge, close to the user',
    ],
    outcome:
      'Page loads are effectively immediate, the storefront can be changed without touching the backend, and stock levels shown to customers now reflect warehouse state within seconds rather than the following morning.',
  },
  {
    slug: 'document-automation',
    title: 'Document Automation',
    tagline: 'Intake and validation without re-keying',
    serviceId: 'automation',
    category: 'Automation',
    status: 'Operational Concept / Internal Project',
    statusTone: 'concept',
    year: '2025',
    featured: false,
    role: 'Automation Architecture & API Integration',
    image: artwork.automation,
    grade: '',
    accent: '#0086FD',
    description:
      'An automation pipeline that ingests inbound documentation, validates field data against reference rules, and syncs structured records into a legacy management system.',
    challenge:
      'Staff were manually re-keying details from web forms and PDF documents into an offline database. It consumed hours every day and introduced transcription errors that were only discovered downstream.',
    approach:
      'We built an ingestion queue that captures every submission, runs extraction, applies validation rules, and pushes a structured payload through an API wrapper around the legacy system. Anything that fails validation surfaces in an exception panel rather than failing silently.',
    architecture: {
      frontend: 'React exception-monitoring dashboard',
      backend: 'Node.js microservices',
      database: 'MongoDB intake queue',
      cloud: 'Serverless functions (AWS Lambda)',
      automation: 'Cron scheduler, retry with backoff, integration wrappers',
    },
    features: [
      'Asynchronous ingestion queue that absorbs submission spikes',
      'Optical character extraction on uploaded intake forms',
      'Rule-driven field validation before anything is written',
      'Conflict-resolution panel resolving an invalid record in three clicks',
    ],
    signals: [
      'Manual re-keying removed from the standard intake path',
      'Validation runs before write, not after',
      'Failures land in a queue a human can actually act on',
    ],
    outcome:
      'Standard registrations no longer require manual data entry. Because validation runs before the write rather than after, the error class that previously surfaced downstream is caught at ingestion.',
  },
  {
    slug: 'ai-knowledge-search',
    title: 'AI Knowledge Search',
    tagline: 'Every answer cites the source it came from',
    serviceId: 'ai-systems',
    category: 'AI Systems',
    status: 'Internal R&D Project',
    statusTone: 'rnd',
    year: '2026',
    featured: false,
    role: 'Retrieval Architecture & Evaluation',
    image: artwork.aiSystems,
    grade: '',
    accent: '#00C9FD',
    description:
      'An internal retrieval system that answers questions from a company document set and cites the exact source passage behind every answer.',
    challenge:
      'Operational knowledge — procedures, specifications, past decisions — sat across hundreds of documents. Keyword search returned filenames, not answers, so the fastest route to an answer was still asking the one person who remembered.',
    approach:
      'We built this as an internal project to prove out a retrieval pattern we could stand behind before offering it. Documents are chunked with structural awareness, embedded, and retrieved by hybrid search. Every generated answer must cite its source passages, and answers below a confidence threshold return the passages without a generated summary.',
    architecture: {
      frontend: 'React search interface with inline source citation',
      backend: 'Node.js retrieval service',
      database: 'Vector store alongside PostgreSQL metadata',
      cloud: 'Serverless embedding and query functions',
      automation: 'Scheduled re-indexing as documents change',
    },
    features: [
      'Structure-aware chunking that keeps tables and sections intact',
      'Hybrid keyword and semantic retrieval',
      'Every answer cites the passages it was drawn from',
      'Low-confidence queries return sources instead of a generated answer',
    ],
    signals: [
      'Built and evaluated internally before being offered as a service',
      'Citation-first: no answer without a traceable source',
      'Evaluated against a fixed question set, not vibes',
    ],
    outcome:
      'An internal build we evaluate against a fixed question set on our own documents. Its purpose is to make the retrieval pattern verifiable — we can show where an answer came from — before proposing it to a client.',
  },
  {
    slug: 'website-design',
    title: 'Website Design & Build',
    tagline: 'A corporate site that qualifies the enquiry',
    serviceId: 'digital-platforms',
    category: 'Digital Platforms',
    status: 'Concept Project',
    statusTone: 'concept',
    year: '2026',
    featured: false,
    role: 'Content Architecture, Design & Frontend Engineering',
    image: artwork.digitalPlatforms,
    grade: '',
    accent: '#5CA5FF',
    description:
      'A concept build exploring how a professional services firm should present itself online and how enquiries should be structured before they reach a human.',
    challenge:
      'Most firms in this category run a brochure site: a services list, a phone number, and a contact form producing one-line messages with no context. The sales team then spends the first call collecting information the form should have gathered.',
    approach:
      'We treated the site as a qualification instrument rather than a brochure. The narrative moves a visitor from problem recognition to capability to proof, and the intake flow is staged so each answer determines the next question — which means an enquiry arrives with enough context to prepare for the first call.',
    architecture: {
      frontend: 'React, Vite, Tailwind CSS, Framer Motion',
      backend: 'Serverless form handler with schema validation',
      database: 'Structured enquiry records',
      cloud: 'Static edge deployment with global CDN',
      automation: 'Routing and acknowledgement on submission',
    },
    features: [
      'Narrative page structure built around the buyer\'s question order',
      'Multi-step intake where each answer shapes the next question',
      'Motion used to direct attention, never as decoration',
      'Accessible, keyboard-navigable and fast on mobile connections',
    ],
    signals: [
      'Intake designed to qualify, not just to collect',
      'Every section answers one question in the buyer\'s sequence',
      'Concept build — presented as a design and engineering study',
    ],
    outcome:
      'A concept study, presented as such. It documents how we structure a corporate site and a staged intake flow, and it is the pattern behind the enquiry experience on this site.',
  },
  {
    slug: 'mindcrafters-academy',
    title: 'MindCrafters Academy Platform',
    tagline: 'Personalised 1:1 Tutoring & Board Exam Portal',
    serviceId: 'digital-platforms',
    category: 'Digital Platforms',
    status: 'Production System',
    statusTone: 'live',
    liveUrl: 'https://mindcrafters.zaydotech.com/',
    year: '2025',
    featured: true,
    role: 'Full-Stack Digital Platform Architecture & Content Engine',
    image: artwork.mindcrafters,
    grade: '',
    accent: '#0059FD',
    description:
      'A high-converting live tutoring platform for MindCrafters Academy in Thane & online. Features board-specific syllabus mapping (CBSE, ICSE, IB, IGCSE), 1:1 live diagnostic booking, fee estimator, and direct WhatsApp lead conversion.',
    challenge:
      'Parents searching for personalized board exam tutoring struggled to evaluate subject coverage across different boards (CBSE, ICSE, IB, IGCSE, SSC), find transparent fee structures, or easily book diagnostic demo classes without long phone tag.',
    approach:
      'We designed and engineered a conversion-oriented digital platform. We mapped out board-specific course modules, created a live interactive fee estimator, built verified Saturday mock-test tracking showcases, and routed parent enquiries directly into WhatsApp for instantaneous demo scheduling.',
    architecture: {
      frontend: 'React Digital Platform, Tailwind CSS, Smooth Micro-Animations',
      backend: 'Serverless Lead Ingestion & WhatsApp Webhook API',
      database: 'Curriculum Schema & Dynamic Board Syllabus Mapping',
      cloud: 'Edge Global CDN with Sub-Second Asset Delivery',
      automation: 'Instant Parent Inquiry Routing & Weekly Report Triggers',
    },
    features: [
      '1:1 Live diagnostic demo booking with hand-picked tutor matching',
      'Comprehensive syllabus mapping for CBSE, ICSE, IB, IGCSE & SSC',
      'Interactive monthly tuition fee estimator and transparent tier options',
      'Verified Saturday mock-test score progress showcase & parent reviews',
      'Direct 1-click WhatsApp integration for instant parent-coordinator chat',
    ],
    signals: [
      'Live client production platform operating in Thane & Online',
      'Zero-friction parent onboarding with instant demo scheduling',
      'Sub-second page loading speed across desktop and mobile viewports',
    ],
    outcome:
      'Streamlined parent inquiries and significantly raised demo booking conversion rates by giving parents immediate clarity on board coverage, transparent fees, and direct tutor matching.',
  },
  {
    slug: 'clonmel-childrens-dental-clinic',
    title: 'Clonmel Children\'s Dental Clinic',
    tagline: 'Child-Focused Specialist Dental Practice Portal',
    serviceId: 'web-applications',
    category: 'Web Applications',
    status: 'Production System',
    statusTone: 'live',
    liveUrl: 'https://clonmel-childrens-dental-clinic.zaydotech.com/',
    year: '2025',
    featured: true,
    role: 'Full-Stack Web Engineering, UX Design & Interactive Guides',
    image: artwork.clonmelDental,
    grade: '',
    accent: '#FF4D8D',
    description:
      'A specialized digital practice portal for Dr. Eimear Norton (Trinity Clinical Doctorate Specialist) in Clonmel, Ireland. Built with interactive 3D flip treatment cards, dark/light theme switching, video hero showcase, and parent advice guides.',
    challenge:
      'Dental anxiety is common among young children and parents seeking specialized paediatric care. The clinic needed an inviting, child-friendly digital portal that educates parents on fear-free treatment (like Happy Gas sedation) and makes appointment triage effortless.',
    approach:
      'We built a warm, accessible web application featuring interactive 3D flip cards for treatments, anti-FOUC instant light/dark theme toggles, video walkthroughs of the first visit experience, and dedicated parent advice guides on teething, decay prevention, and sports mouthguards.',
    architecture: {
      frontend: 'Modern HTML5/CSS3 Component Architecture, Dark/Light Theme Engine',
      backend: 'Fast Static & Edge Rendering Framework',
      database: 'Structured Parent Advice Knowledge Base & Treatment Registry',
      cloud: 'Global CDN with Zero-FOUC Font & Theme Preloading',
      automation: 'Interactive Modal Triage & Instant Phone Pill Call Handler',
    },
    features: [
      'Interactive 3D flip cards for specialized paediatric treatments',
      'Instant anti-FOUC Light / Dark mode switcher with saved preference',
      'Multi-panel hero slideshow with Ken Burns zoom & embedded video preview',
      'Parent advice library covering teething, diet, brushing, and sports trauma',
      'Specialist credentials spotlight for Dr. Eimear Norton (Trinity & RCSEd)',
    ],
    signals: [
      'Live client clinic application active in Tipperary, Ireland',
      'Anxiety-reducing UX designed to reassure parents and delight children',
      'Fully responsive, accessible, keyboard-navigable interface',
    ],
    outcome:
      'Delivered a reassuring, high-trust online presence that positions the clinic as Clonmel\'s leading paediatric practice and helps parents book first-visit appointments with ease.',
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const projectsByService = (serviceId) =>
  projects.filter((p) => p.serviceId === serviceId);
