import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://mrugavadhe-temple.com';
const PAGES_DIR = './pages';
const OUTPUT_FILE = './sitemap.xml';
const IMAGES_OUTPUT_FILE = './sitemap-images.xml';

// Static pages to include in sitemap
const staticPages = [
  {
    url: '',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: 'pages/history.html',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: 'pages/deities.html',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: 'pages/darshan-timings.html',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: 'pages/puja-seva.html',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: 'pages/festivals.html',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: 'pages/gallery.html',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: 'pages/contact.html',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
  }
];

export function generateStaticSitemap() {
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  staticPages.forEach(page => {
    sitemapContent += `
  <url>
    <loc>${BASE_URL}/${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  sitemapContent += '\n</urlset>';

  fs.writeFileSync(OUTPUT_FILE, sitemapContent);
  console.log(`Sitemap generated successfully: ${OUTPUT_FILE}`);
}

export function generateImageSitemap() {
  let imageSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Example image entries
  const imagePages = [
    {
      url: '',
      images: [
        {
          loc: `${BASE_URL}/assets/images/temple-main.jpg`,
          title: 'Sri Mallikarjuna Temple Main View',
          caption: 'Ancient temple with mythological significance'
        }
      ]
    }
  ];

  imagePages.forEach(page => {
    imageSitemapContent += `
  <url>
    <loc>${BASE_URL}/${page.url}</loc>`;
    
    page.images.forEach(image => {
      imageSitemapContent += `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
    </image:image>`;
    });
    
    imageSitemapContent += `
  </url>`;
  });

  imageSitemapContent += '\n</urlset>';

  fs.writeFileSync(IMAGES_OUTPUT_FILE, imageSitemapContent);
  console.log(`Image sitemap generated successfully: ${IMAGES_OUTPUT_FILE}`);
}