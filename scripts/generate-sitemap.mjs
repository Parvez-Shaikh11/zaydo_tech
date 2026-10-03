import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://zaydotech.com';
const TODAY = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/services', priority: '0.9', changefreq: 'weekly' },
  { url: '/solutions', priority: '0.8', changefreq: 'weekly' },
  { url: '/work', priority: '0.8', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
];

const serviceSlugs = [
  'custom-software',
  'web-applications',
  'automation',
  'ai-systems',
  'digital-platforms'
];

const workSlugs = [
  'operations-management-system',
  'ecommerce-platform',
  'document-automation',
  'ai-knowledge-search',
  'website-design'
];

function generateSitemapXml() {
  const urls = [];

  // Static routes
  for (const route of staticRoutes) {
    urls.push(`  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
  }

  // Service details
  for (const slug of serviceSlugs) {
    urls.push(`  <url>
    <loc>${BASE_URL}/services/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // Work details
  for (const slug of workSlugs) {
    urls.push(`  <url>
    <loc>${BASE_URL}/work/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

const sitemapContent = generateSitemapXml();
const outputPath = path.join(rootDir, 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemapContent, 'utf-8');
console.log(`Successfully generated sitemap at ${outputPath}`);
