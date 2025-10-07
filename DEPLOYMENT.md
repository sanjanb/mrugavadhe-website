# Deployment Configuration for Sri Mallikarjuna Temple Website

## Quick Deployment Guide

### 1. Pre-deployment Checklist

- [ ] Run `npm run build` to create production files
- [ ] Run `npm run test` to ensure all tests pass
- [ ] Check `dist/` folder for optimized files
- [ ] Verify all images are optimized
- [ ] Test website performance with Lighthouse
- [ ] Validate HTML, CSS, and JavaScript
- [ ] Check mobile responsiveness
- [ ] Test offline functionality (PWA)

### 2. Static Hosting Deployment

#### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables if needed
5. Configure custom domain and SSL

#### Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in project directory
3. Follow prompts to configure deployment
4. Set build output directory to `dist`

#### GitHub Pages

1. Build the project: `npm run build`
2. Copy `dist/` contents to `gh-pages` branch
3. Enable GitHub Pages in repository settings
4. Select `gh-pages` branch as source

### 3. Traditional Web Server Deployment

#### Apache Configuration

1. Copy production files to web root
2. Use provided `.htaccess` file for security headers
3. Enable mod_rewrite and mod_deflate modules
4. Configure SSL certificate
5. Test security headers

#### Nginx Configuration

1. Copy production files to web root
2. Use provided `nginx.conf` configuration
3. Enable gzip compression
4. Configure SSL certificate
5. Restart Nginx service

### 4. Performance Optimization

#### Image Optimization

```bash
npm run optimize-images
```

#### CSS/JS Minification

```bash
npm run minify-css
npm run minify-js
```

#### Gzip Compression

- Enable in web server configuration
- Reduces file sizes by 60-80%

#### Browser Caching

- Set appropriate cache headers
- Static assets: 1 year
- HTML files: 1 hour

### 5. Security Configuration

#### Required Security Headers

- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Strict-Transport-Security (HTTPS only)
- Referrer-Policy

#### SSL/TLS Configuration

- Use Let's Encrypt for free SSL certificates
- Configure HTTPS redirects
- Enable HSTS headers
- Test SSL configuration with SSL Labs

### 6. Monitoring and Analytics

#### Google Analytics Setup

1. Create Google Analytics property
2. Add tracking code to all pages
3. Configure goals and conversions
4. Set up Google Search Console

#### Performance Monitoring

- Monitor Core Web Vitals
- Set up uptime monitoring
- Track page load times
- Monitor mobile performance

### 7. SEO Configuration

#### Search Console Setup

1. Verify website ownership
2. Submit XML sitemap
3. Monitor search performance
4. Fix any crawl errors

#### Local SEO

- Set up Google My Business
- Add structured data for local business
- Optimize for local search terms

### 8. Content Delivery Network (CDN)

#### Cloudflare Setup

1. Sign up for Cloudflare account
2. Add website to Cloudflare
3. Update nameservers
4. Configure caching rules
5. Enable security features

### 9. Backup Strategy

#### Automated Backups

- Set up daily backups of website files
- Backup configuration files
- Store backups in multiple locations
- Test restore procedures

### 10. Post-Deployment Testing

#### Functionality Testing

- [ ] All navigation links work
- [ ] Contact forms submit correctly
- [ ] Images load properly
- [ ] PWA features work offline
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

#### Performance Testing

- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] Mobile page speed score > 85
- [ ] Core Web Vitals pass

#### Security Testing

- [ ] SSL certificate valid
- [ ] Security headers present
- [ ] No mixed content warnings
- [ ] HTTPS redirects work

## Domain Configuration

### DNS Settings

```
A Record: @ -> Server IP
CNAME: www -> @
```

### SSL Certificate

```bash
# Let's Encrypt with Certbot
certbot --apache -d mrugavadhe-temple.com -d www.mrugavadhe-temple.com
```

## Environment Variables

### Production Environment

```env
NODE_ENV=production
SITE_URL=https://mrugavadhe-temple.com
GA_TRACKING_ID=GA_MEASUREMENT_ID
```

## Rollback Procedure

1. Keep previous version in `backup/` directory
2. Test new deployment thoroughly
3. If issues occur, restore from backup
4. Investigate and fix issues before re-deploying

## Support and Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Monitor performance metrics
- [ ] Check for broken links
- [ ] Update content as needed
- [ ] Review security headers
- [ ] Renew SSL certificates

### Emergency Contacts

- Technical Support: tech@mallikarjunatemple.org
- Content Updates: content@mallikarjunatemple.org
- Emergency: +91 XXXXX XXXXX

---

For technical support, contact the development team or refer to the main README.md file.
