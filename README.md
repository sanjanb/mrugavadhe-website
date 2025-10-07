# Sri Mallikarjuna Temple Website

Official website for Sri Mallikarjuna Temple, Mrugavadhe - an ancient Shiva temple with mythological significance from the Ramayana.

## Features

- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Loading** - Optimized for performance
- 🔒 **Secure** - Implements security best practices
- 🎯 **SEO Optimized** - Search engine friendly
- 🌐 **PWA Ready** - Progressive Web App capabilities
- ♿ **Accessible** - WCAG compliant accessibility features

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build Tools**: Node.js, npm scripts
- **Optimization**: Image compression, CSS/JS minification
- **PWA**: Service Worker, Web App Manifest
- **SEO**: Structured data, sitemap, meta tags

## Quick Start

### Prerequisites
- Node.js 16+ and npm 8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sanjanb/mrugavadhe-website.git
cd mrugavadhe-website
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run watch        # Watch for file changes

# Building
npm run build        # Build for production
npm run minify-css   # Minify CSS files
npm run minify-js    # Minify JavaScript files
npm run optimize-images # Optimize images

# Testing & Quality
npm run test         # Run all tests
npm run lint-css     # Lint CSS files
npm run lint-js      # Lint JavaScript files
npm run validate-html # Validate HTML

# Deployment
npm run deploy       # Build and test for deployment
npm run serve        # Serve production build
```

### Project Structure

```
mrugavadhe-website/
├── assets/
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   └── images/        # Images and icons
├── pages/             # HTML pages
├── scripts/           # Build scripts
├── dist/              # Production build
├── index.html         # Home page
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
├── sitemap.xml       # SEO sitemap
└── robots.txt        # Search engine directives
```

## Performance Metrics

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari 12+, Chrome Mobile 70+)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run test`
5. Commit changes: `git commit -am 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## Deployment

### Static Hosting (Recommended)
- Netlify, Vercel, GitHub Pages, or similar
- Run `npm run build` to create production files
- Upload `dist/` folder contents

### Traditional Hosting
- Any web server (Apache, Nginx)
- Copy production files to web root
- Configure security headers (see `.htaccess` or `nginx.conf`)

## Contact

**Sri Mallikarjuna Temple Trust**
- Website: https://mrugavadhe-temple.com
- Email: info@mallikarjunatemple.org
- Location: Mrugavadhe Village, Thirthahalli, Karnataka, India

## License

This project is licensed under the MIT License.

---

Made with 🙏 for Sri Mallikarjuna Temple, Mrugavadhe
A temple website, for my hometown
