import fs from 'fs';
import path from 'path';

const baseUrl = 'https://dailybrew.app';
const currentDate = new Date().toISOString().split('T')[0];

// Define your routes here
const routes = [
  {
    url: '/',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '1.0'
  }
  // Add more routes as you create them:
  // {
  //   url: '/about',
  //   lastmod: currentDate,
  //   changefreq: 'monthly',
  //   priority: '0.8'
  // }
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `  
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
  
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
};

generateSitemap();