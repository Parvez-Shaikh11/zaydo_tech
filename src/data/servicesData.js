import { Code2, LayoutDashboard, Workflow, BrainCircuit, Globe2 } from 'lucide-react';

/**
 * The five capabilities. Each entry is the single source of truth for:
 *   - the Home "What We Build" grid
 *   - the /services overview
 *   - the /services/:slug detail page
 *   - the Work page's service filter (via `projects[].serviceId`)
 */
export const servicesData = [
  {
    id: 'custom-software',
    number: '01',
    title: 'Custom Software Development',
    short: 'Custom Software',
    icon: Code2,
    accent: '#1B72F5',
    image: '/photos/hero_3d.png',
    grade: 'brand-grade',
    tagline: 'Software shaped around how your business actually runs.',
    description:
      'Off-the-shelf software forces your team to work the way the vendor imagined. We do the opposite: we study your real workflow, then engineer a system around it — one database, one source of truth, one place where operations live.',
    problemsSolved: [
      'Critical business data scattered across spreadsheets, WhatsApp threads and email.',
      'No central system, so every status update needs a phone call.',
      'Legacy software that nobody wants to touch and nobody can extend.',
      'Manual compliance and reporting work that consumes entire days each month.',
    ],
    whatWeBuild: [
      'Business management platforms and internal operations software',
      'Resource, job and scheduling systems',
      'Asset tracking and telemetry suites',
      'Role-based admin panels with full audit trails',
    ],
    deliverables: [
      { label: 'System architecture document', note: 'Data model, module map, integration points' },
      { label: 'Production application', note: 'Deployed, documented and handed over' },
      { label: 'Admin & role management', note: 'Permissions modelled on your org structure' },
      { label: 'Maintenance runbook', note: 'Backups, monitoring, escalation path' },
    ],
    whoFor:
      'Established businesses whose operations have outgrown spreadsheets and generic tools, and who want to own the system rather than rent it.',
    workflow: [
      'Operational discovery',
      'Data & schema design',
      'Architecture review',
      'Iterative build',
      'Migration & training',
      'Production launch',
    ],
    techStack: ['Node.js', 'PostgreSQL', 'React', 'Docker', 'Redis', 'Prisma'],
    engagement: 'Typically a multi-phase engagement, delivered in reviewable milestones.',
    faqs: [
      {
        q: 'Do we own the source code?',
        a: 'Yes. On final delivery the repository, database schema and deployment configuration are transferred to you. There is no vendor lock-in and no per-seat licence.',
      },
      {
        q: 'Can it work with the software we already use?',
        a: 'In most cases, yes. If your existing tools expose an API or a database we can read, we integrate rather than replace — that keeps migration risk low.',
      },
      {
        q: 'What happens after launch?',
        a: 'We hand over a runbook and remain available for maintenance. Custom systems need periodic care: dependency updates, backup verification and schema changes as the business shifts.',
      },
    ],
  },
  {
    id: 'web-applications',
    number: '02',
    title: 'Web Application Development',
    short: 'Web Applications',
    icon: LayoutDashboard,
    accent: '#0891B2',
    image: '/photos/software_3d.png',
    grade: 'brand-grade',
    tagline: 'Dashboards, portals and SaaS interfaces built to stay fast under load.',
    description:
      'A web application is judged in the first two seconds. We build decoupled front-ends against clean APIs, cache aggressively at the edge, and design the interface so a new user can complete the core task without being trained.',
    problemsSolved: [
      'Slow, heavy interfaces that lose users before the first meaningful screen.',
      'No self-service portal, so support handles requests a customer could handle alone.',
      'Reporting that requires exporting to a spreadsheet before it becomes useful.',
      'Front-ends tightly coupled to a monolith, making every change expensive.',
    ],
    whatWeBuild: [
      'SaaS product front-ends and multi-tenant dashboards',
      'Customer portals, partner hubs and account areas',
      'Interactive reporting and analytics interfaces',
      'Design systems and reusable component libraries',
    ],
    deliverables: [
      { label: 'Component library', note: 'Consistent, documented, reusable' },
      { label: 'API contract', note: 'Typed, versioned, documented endpoints' },
      { label: 'Responsive application', note: 'Mobile, tablet and desktop parity' },
      { label: 'Performance budget', note: 'Measured load targets, enforced in CI' },
    ],
    whoFor:
      'Product teams and growing companies whose customers or staff spend real working hours inside the interface.',
    workflow: [
      'UX flow mapping',
      'Interface design',
      'API contract',
      'Component build',
      'Integration & QA',
      'Edge deployment',
    ],
    techStack: ['React', 'Tailwind CSS', 'GraphQL', 'Vite', 'Vercel', 'TypeScript'],
    engagement: 'Delivered sprint by sprint with a reviewable build after each cycle.',
    faqs: [
      {
        q: 'Do you design as well as build?',
        a: 'Yes. Interface design and engineering happen in the same team, which removes the usual hand-off gap between a static mockup and a working product.',
      },
      {
        q: 'Can you take over an existing codebase?',
        a: 'Often, yes. We start with a short audit of the repository and dependencies, then give you an honest assessment: continue, refactor in place, or rebuild the front-end against the existing API.',
      },
      {
        q: 'How do you handle performance?',
        a: 'We set a load-time budget at the start and treat it as a requirement, not an optimisation phase. Bundle size, image weight and query counts are checked before release.',
      },
    ],
  },
  {
    id: 'automation',
    number: '03',
    title: 'Workflow Automation',
    short: 'Automation',
    icon: Workflow,
    accent: '#3B9CFF',
    image: '/photos/automation_3d.png',
    grade: 'brand-grade-warm',
    tagline: 'Remove the repetitive work between your systems.',
    description:
      'Most operational drag is not one broken tool — it is the manual bridge between two working tools. We map where data is being re-keyed, then build the pipeline that moves it: validated, logged, retried on failure and visible when something needs a human.',
    problemsSolved: [
      'Staff re-keying the same record into two or three different systems.',
      'Reports assembled by hand every week from multiple exports.',
      'Business-critical alerts that arrive hours after the event.',
      'Silent failures — nobody notices an integration stopped working.',
    ],
    whatWeBuild: [
      'API integration layers between disconnected systems',
      'Document, form and PDF processing pipelines',
      'Scheduled data syncs and reconciliation jobs',
      'Event-driven notification and escalation flows',
    ],
    deliverables: [
      { label: 'Process audit', note: 'Every manual step, timed and mapped' },
      { label: 'Integration pipeline', note: 'Validated, idempotent, retry-safe' },
      { label: 'Exception dashboard', note: 'Humans see only what needs a decision' },
      { label: 'Monitoring & alerts', note: 'Failures surface immediately, not weekly' },
    ],
    whoFor:
      'Operations-heavy teams where the same information is entered more than once, or where a person is acting as the integration between two systems.',
    workflow: [
      'Process audit',
      'Field & schema mapping',
      'Pipeline build',
      'Exception handling',
      'Parallel-run validation',
      'Cutover',
    ],
    techStack: ['Node.js', 'Webhooks', 'Cron workers', 'AWS Lambda', 'Queues', 'REST APIs'],
    engagement: 'Usually scoped per workflow, so value arrives before the full programme ends.',
    faqs: [
      {
        q: 'How do you know an automation is safe to switch on?',
        a: 'We run it in parallel with the manual process first. Both produce output, we compare them, and only cut over once the results match consistently.',
      },
      {
        q: 'What if the automation fails at 2am?',
        a: 'Failures are expected and designed for. Jobs retry with backoff, unresolvable cases land in an exception queue, and the responsible person is alerted immediately.',
      },
      {
        q: 'Do you replace our staff?',
        a: 'No. Automation removes the re-keying, not the judgement. The exception dashboard exists precisely because some cases should reach a person.',
      },
    ],
  },
  {
    id: 'ai-systems',
    number: '04',
    title: 'Practical AI Integration',
    short: 'AI Systems',
    icon: BrainCircuit,
    accent: '#22D3EE',
    image: '/photos/ai_3d.png',
    grade: 'brand-grade-green',
    tagline: 'AI applied where it measurably helps — and nowhere else.',
    description:
      'We treat AI as one component in a system, not as the product. If a rule engine solves the problem more reliably, we say so. Where language models genuinely fit — unstructured documents, search over internal knowledge, classification at volume — we build them into the workflow with grounding, validation and a human review path.',
    problemsSolved: [
      'Company knowledge locked inside documents nobody can search effectively.',
      'Large volumes of unstructured text, email or PDFs needing structured output.',
      'Repetitive first-line questions consuming skilled staff time.',
      'Inbound files that must be read and categorised before anything can happen.',
    ],
    whatWeBuild: [
      'Retrieval pipelines over internal knowledge bases',
      'Document extraction and classification systems',
      'Assisted intake and triage workflows',
      'Internal AI search with source citations',
    ],
    deliverables: [
      { label: 'Feasibility assessment', note: 'An honest yes or no, before you spend' },
      { label: 'Retrieval architecture', note: 'Chunking, embedding, grounding strategy' },
      { label: 'Evaluation set', note: 'Measured accuracy on your own data' },
      { label: 'Human review interface', note: 'Low-confidence output reaches a person' },
    ],
    whoFor:
      'Organisations sitting on a large amount of internal text who want a measurable result rather than an AI announcement.',
    workflow: [
      'Feasibility check',
      'Data preparation',
      'Retrieval architecture',
      'Evaluation & tuning',
      'Guardrails & review path',
      'Rollout',
    ],
    techStack: ['Claude API', 'OpenAI API', 'Vector databases', 'Node.js', 'RAG pipelines'],
    engagement: 'Starts with a short feasibility phase — we would rather stop early than oversell.',
    faqs: [
      {
        q: 'Where does our data go?',
        a: 'That is decided in the first phase, in writing: which provider, what is sent, what is retained, and what stays inside your own infrastructure. Nothing is sent anywhere you have not approved.',
      },
      {
        q: 'What about wrong answers?',
        a: 'Every retrieval answer is grounded in your source documents and cites them, so a reviewer can verify it. Low-confidence responses are routed to a person instead of being returned.',
      },
      {
        q: 'Will you tell us if AI is the wrong tool?',
        a: 'Yes — that is the point of the feasibility phase. A deterministic rule or a database query is often cheaper, faster and more reliable, and we will recommend it when it is.',
      },
    ],
  },
  {
    id: 'digital-platforms',
    number: '05',
    title: 'Websites & Digital Platforms',
    short: 'Digital Platforms',
    icon: Globe2,
    accent: '#7CBEFF',
    image: '/photos/software_3d.png',
    grade: 'brand-grade',
    imagePosition: 'object-right',
    tagline: 'The digital front door serious clients judge you by.',
    description:
      'For most businesses the website is the first and sometimes only impression a prospective client forms. We engineer sites that load instantly, read credibly, and are structured so that the enquiry a visitor sends actually contains enough information to act on.',
    problemsSolved: [
      'A site that looks dated next to competitors, undermining credibility.',
      'Visitors arriving and leaving without a clear next step.',
      'Enquiries that arrive with too little detail to qualify.',
      'Heavy pages that collapse on a mobile connection.',
    ],
    whatWeBuild: [
      'Corporate and company websites',
      'Service, product and campaign landing pages',
      'Structured project-intake and enquiry flows',
      'Brand portals and investor-facing microsites',
    ],
    deliverables: [
      { label: 'Content architecture', note: 'Page-by-page narrative and structure' },
      { label: 'Engineered site', note: 'Semantic, accessible, fast on mobile' },
      { label: 'Qualified intake flow', note: 'Enquiries arrive ready to act on' },
      { label: 'SEO & analytics setup', note: 'Metadata, sitemap, event tracking' },
    ],
    whoFor:
      'Companies presenting to clients, partners or investors who need the digital presence to match the quality of the business behind it.',
    workflow: [
      'Positioning & narrative',
      'Content architecture',
      'Visual design',
      'Semantic build',
      'Speed & SEO pass',
      'Launch',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Static optimisation'],
    engagement: 'A defined-scope project with a fixed page count and a clear launch date.',
    faqs: [
      {
        q: 'Can we update the content ourselves?',
        a: 'Yes. Where you expect frequent changes we connect a headless CMS so your team edits content without touching code or waiting on us.',
      },
      {
        q: 'Do you write the copy?',
        a: 'We write the structural copy — the narrative, headlines and section logic — working from your input. Specialist or regulated wording stays with you or your writer.',
      },
      {
        q: 'How fast is fast?',
        a: 'We target a sub-2-second first meaningful paint on a mid-range phone over 4G, and we measure it before launch rather than assuming it.',
      },
    ],
  },
];

export const getService = (id) => servicesData.find((s) => s.id === id);
