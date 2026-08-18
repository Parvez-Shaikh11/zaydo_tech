export const site = {
  name: 'Zaydo Tech',
  tagline: 'Software. Automation. Digital Systems.',
  email: 'zaydotech.official@gmail.com',
  location: 'Working with businesses globally · Remote-first delivery',
  /**
   * Real accounts only. Every href is the live profile URL — nothing points at
   * a network's homepage as a placeholder, because a link that goes nowhere
   * costs more trust than a missing icon. Add a network here once the account
   * exists; the footer and the contact page pick it up automatically.
   */
  socials: [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/zaydotech',
      handle: '@zaydotech',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCwouefMhxdHF0PvNm67-dzw',
      handle: 'Zaydo Tech',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/zaydotech',
      handle: '/zaydotech',
    },
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
