export const site = {
  name: 'Zaydo Tech',
  tagline: 'Software. Automation. Digital Systems.',
  email: 'hello@zaydotech.com',
  location: 'Working with businesses globally · Remote-first delivery',
  socials: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', handle: '/zaydotech' },
    { name: 'X', href: 'https://x.com/', handle: '@zaydotech' },
    { name: 'Instagram', href: 'https://instagram.com/', handle: '@zaydotech' },
  ],
};

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', hasMenu: true },
  // Hidden from the header for now — uncomment to bring it back. The /solutions
  // route and page are still in place, so the URL keeps working meanwhile.
  // { name: 'Solutions', path: '/solutions' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

/**
 * The engineering stack we actually ship with. Kept honest — nothing here is
 * listed for decoration.
 */
export const techStack = [
  { group: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST', 'GraphQL'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
  { group: 'Cloud & Ops', items: ['Docker', 'AWS Lambda', 'Vercel', 'CI/CD'] },
  { group: 'Automation', items: ['Webhooks', 'Cron workers', 'Queues', 'API integration'] },
  { group: 'AI', items: ['Claude API', 'OpenAI API', 'Vector search', 'RAG pipelines'] },
];

export const techMarquee = [
  'React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'Tailwind CSS',
  'GraphQL', 'Redis', 'AWS Lambda', 'MongoDB', 'Vite', 'REST APIs',
  'Prisma', 'Vercel', 'Webhooks', 'Vector Search',
];
