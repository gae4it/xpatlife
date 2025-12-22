# 🌍 xPatLife

## 🆕 Recent Updates (2025-12-22)

- **Dynamic homepage search bar**: Added a typeahead search bar to the homepage hero section. It suggests the best-matching pages, blog posts, guides, and tools across the site (excluding legal/disclaimer pages). Results are limited to 5, with visual pill labels for content type.
- **Search index endpoint**: New `/search-index.json` API route indexes all content for instant client-side search.
- **Tooling scripts**: Added `npm run check` (runs ESLint, Prettier check, and TypeScript `tsc --noEmit`) and `npm run fix` (auto-fixes lint and formatting). All lint and formatting errors fixed.
- **TypeScript compatibility**: Added ambient `declare module '*.astro'` to support `.astro` imports in dependencies. Updated `tsconfig.json` for stricter includes and compatibility.
- **Dependency updates**: All npm dependencies updated to latest stable. Tailwind CSS pinned to v3.4.x for compatibility with `@astrojs/tailwind@6`.

**xPatLife: Living and Working in Germany** - A comprehensive, SEO-optimized guide for expats built with **[Astro 5.0](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/)**.

This website transforms a 170-page book into an accessible, modern web experience, providing practical and legal guidance for expats navigating life in Germany.

## ✨ Features

- ✅ **Comprehensive Guide Structure** - Organized content covering all aspects of expat life in Germany
- ✅ **SEO-First Approach** - Rich frontmatter, Open Graph, Twitter Cards, JSON-LD structured data
- ✅ **Modern Navigation** - Two-level dropdown menu with intuitive topic organization
- ✅ **GDPR Compliant** - Cookie consent, privacy policy, and all required EU legal pages
- ✅ **Performance Optimized** - Fast loading, image optimization, and excellent Core Web Vitals
- ✅ **Accessibility** - Semantic HTML, ARIA roles, keyboard navigation, screen reader friendly
- ✅ **Theme Toggle** - Dark/light mode support
- ✅ **Blog Integration** - Dynamic blog with RSS feed for updates and articles
- ✅ **Sitemap & RSS** - Automatic generation for search engines and feed readers
- ✅ **Mobile Responsive** - Optimized for all devices

<br>

## 📚 Content Structure

The website is organized into the following main sections:

### Guide (Main Content)

- **Introduction** - About the book, target audience, expat journey overview
- **Planning Your Move** - Immigration requirements, visas, financial preparation
- **Arrival and First Steps** - Registration, tax ID, essential services
- **Healthcare & Insurance** - Health insurance, medical situations, insurance types
- **Housing & Accommodation** - Finding homes, rental laws, tenant rights
- **Employment & Career** - Job searching, working in Germany, entrepreneurship
- **Education & Language** - German education system, language learning
- **Transportation & Mobility** - Public transport, driving, car ownership
- **Daily Life & Integration** - Cultural integration, family life, leisure activities
- **Financial & Legal Matters** - Taxes, legal rights, long-term planning
- **Practical Resources** - Emergency situations, document management, directory
- **Conclusion** - Long-term perspective and final tips
- **Appendices** - Bureaucratic terms, checklists, regional differences
- **Tax Declaration** - Complete guide to Steuererklärung

### Additional Pages

- **Blog** - Articles, updates, and expat stories
- **Tools** - Calculators and interactive resources (planned)
- **About** - About xPatLife and the team

### Legal & Compliance

- Privacy Policy
- Cookie Policy
- Terms of Service
- Legal Notice/Imprint

<br>

## 🚀 Getting Started

### Installation

```shell
npm install
```

### Development

Start the local development server:

```shell
npm run dev
```

Your site will be available at `http://localhost:4321`

### Build for Production

Create an optimized production build:

```shell
npm run build
```

### Preview Production Build

Preview the production build locally:

```shell
npm run preview
```

<br>

## 📁 Project Structure

```
/
├── public/
│   ├── _headers
│   ├── robots.txt
│   └── images/
├── src/
│   ├── assets/
│   │   ├── favicons/
│   │   ├── images/
│   │   └── styles/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── blog/
│   │   ├── common/
│   │   ├── navigation/
│   │   │   └── NavigationMenu.astro
│   │   ├── ui/
│   │   └── widgets/
│   ├── content/
│   │   └── config.ts
│   ├── data/
│   │   └── post/
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── MarkdownLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── guide/
│   │   │   ├── introduction/
│   │   │   ├── planning-your-move/
│   │   │   ├── arrival-and-first-steps/
│   │   │   ├── healthcare-insurance/
│   │   │   ├── housing-accommodation/
│   │   │   ├── employment-career/
│   │   │   ├── education-language/
│   │   │   ├── transportation-mobility/
│   │   │   ├── daily-life-integration/
│   │   │   ├── financial-legal-matters/
│   │   │   ├── practical-resources/
│   │   │   ├── conclusion/
│   │   │   ├── appendices/
│   │   │   └── tax-declaration/
│   │   ├── blog/
│   │   │   └── [...slug].astro
│   │   ├── tools.astro
│   │   ├── about.astro
│   │   ├── privacy-policy.md
│   │   ├── cookie-policy.md
│   │   ├── terms-of-service.md
│   │   └── legal-notice.md
│   ├── utils/
│   ├── config.yaml
│   └── navigation.ts
├── PLAN.md
├── CHANGES.md
├── table-of-contents.md
├── astro.config.ts
├── package.json
└── tailwind.config.js
```

<br>

## 🔧 SEO Features

### Frontmatter Template

Each markdown file includes comprehensive SEO metadata:

```yaml
---
title: 'Page Title'
seoTitle: 'SEO Optimized Title | xPatLife'
description: 'Concise description for search engines and social media'
keywords: ['keyword1', 'keyword2', 'keyword3']
ogTitle: 'Open Graph Title'
ogDescription: 'Description for social sharing'
ogImage: '/images/og/image.jpg'
ogType: 'article'
twitterTitle: 'Twitter Card Title'
twitterDescription: 'Description for Twitter sharing'
twitterImage: '/images/twitter/image.jpg'
twitterCard: 'summary_large_image'
canonicalUrl: 'https://xpatlife.netlify.app/page-url'
datePublished: '2025-11-15'
dateModified: '2025-11-15'
author: 'xPatLife Team'
---
```

### Integrations

- **@astrojs/sitemap** - Automatic sitemap generation
- **@astrojs/rss** - RSS feed for blog posts
- **Cookie Consent** - GDPR-compliant cookie banner
- **JSON-LD** - Structured data for search engines

<br>

## 🚀 Deployment

### Deploy to Netlify

1. **Connect Repository**
   - Sign in to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select the `xpatlife` repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

3. **Deploy**
   - Trigger deployment
   - Set up automatic deployments on push to `main` branch

### Make Your Site Visible on Google

1. **Google Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console/)
   - Verify site ownership
   - Submit sitemap: `https://yoursite.com/sitemap.xml`
   - Monitor indexing status and search performance

2. **Bing Webmaster Tools**
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
   - Verify site ownership
   - Submit sitemap
   - Monitor indexing

3. **Validate SEO**
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results) for structured data
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) for Open Graph
   - Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) audit

4. **Optional Analytics**
   - Set up Google Analytics 4 for traffic monitoring
   - Enable Core Web Vitals tracking

<br>

## 📝 Content Guidelines

### Adding New Guide Pages

1. Create a markdown file in the appropriate topic folder under `/src/pages/guide/`
2. Add complete SEO frontmatter (use template above)
3. Write clear, helpful content for expats
4. Include relevant images with descriptive alt text
5. Update navigation if adding a new main topic

### Writing Blog Posts

1. Create markdown files in `/src/pages/blog/` or `/src/data/post/`
2. Include frontmatter with title, description, publish date, and tags
3. Keep posts focused and actionable
4. Link to relevant guide pages

<br>

## 🛠️ Commands Reference

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`         |
| `npm run preview` | Preview production build locally           |
| `npm run check`   | Check project for errors                   |
| `npm run fix`     | Run ESLint --fix and Prettier --write      |
| `npm run check:tsc` | Run TypeScript type-check only (no emit) |

<br>

## License

---

**Search Bar Usage:**

- The homepage features a dynamic search bar in the hero section. Start typing to see instant suggestions from all guides, blog posts, and tools. Legal/disclaimer pages are excluded. Use arrow keys or mouse to navigate results. Only the top 5 matches are shown, with a pill label for content type.

---

See [LICENSE](./LICENSE.md) for details.

---

**xPatLife** - Helping expats navigate life in Germany with confidence.

For detailed implementation plans and change history, see [PLAN.md](./PLAN.md) and [CHANGES.md](./CHANGES.md).
