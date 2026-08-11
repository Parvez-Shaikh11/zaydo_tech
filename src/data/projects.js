/**
 * Case studies.
 *
 * `serviceId` links each project back to `servicesData`, which powers the Work
 * page filter and the "related work" block on every service page.
 *
 * `status` is stated plainly on every card. Concept and internal builds are
 * labelled as such — we do not present them as client engagements, and no
 * metric appears here that was not actually observed.
 */
export const projects = [
  {
    slug: 'aeroops',
    title: 'AeroOps',
    tagline: 'Enterprise Operations & Asset Management System',
    serviceId: 'custom-software',
    category: 'Custom Software',
    status: 'Production System',
    statusTone: 'live',
    year: '2025',
    featured: true,
    role: 'Core Software Architecture & Backend Engineering',
    image: '/photos/hero_3d.png',
    grade: 'brand-grade',
    accent: '#1B72F5',
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
    slug: 'optimaretail',
    title: 'OptimaRetail',
    tagline: 'High-Performance Headless Commerce Platform',
    serviceId: 'web-applications',
    category: 'Web Applications',
    status: 'Production System',
    statusTone: 'live',
    year: '2025',
    featured: true,
    role: 'Frontend Engineering & Third-Party Integration',
    image: '/photos/software_3d.png',
    grade: 'brand-grade',
    accent: '#0891B2',
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
    slug: 'medflow',
    title: 'MedFlow',
    tagline: 'Intelligent Intake & Process Automation Engine',
    serviceId: 'automation',
    category: 'Automation',
    status: 'Operational Concept / Internal Project',
    statusTone: 'concept',
    year: '2025',
    featured: false,
    role: 'Automation Architecture & API Integration',
    image: '/photos/automation_3d.png',
    grade: 'brand-grade-warm',
    accent: '#3B9CFF',
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
    slug: 'insightdesk',
    title: 'InsightDesk',
    tagline: 'Grounded Internal Knowledge Retrieval',
    serviceId: 'ai-systems',
    category: 'AI Systems',
    status: 'Internal R&D Project',
    statusTone: 'rnd',
    year: '2026',
    featured: false,
    role: 'Retrieval Architecture & Evaluation',
    image: '/photos/ai_3d.png',
    grade: 'brand-grade-green',
    accent: '#22D3EE',
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
    slug: 'northpoint',
    title: 'NorthPoint',
    tagline: 'Corporate Digital Presence & Project Intake',
    serviceId: 'digital-platforms',
    category: 'Digital Platforms',
    status: 'Concept Project',
    statusTone: 'concept',
    year: '2026',
    featured: false,
    role: 'Content Architecture, Design & Frontend Engineering',
    image: '/photos/software_3d.png',
    grade: 'brand-grade',
    imagePosition: 'object-right',
    accent: '#7CBEFF',
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
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const projectsByService = (serviceId) =>
  projects.filter((p) => p.serviceId === serviceId);
