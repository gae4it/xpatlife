import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Guide',
      links: [
        {
          text: 'Introduction',
          href: getPermalink('/guide/introduction'),
        },
        {
          text: 'Planning Your Move',
          href: getPermalink('/guide/planning-your-move'),
        },
        {
          text: 'Arrival and First Steps',
          href: getPermalink('/guide/arrival-and-first-steps'),
        },
        {
          text: 'Healthcare & Insurance',
          href: getPermalink('/guide/healthcare-insurance'),
        },
        {
          text: 'Housing & Accommodation',
          href: getPermalink('/guide/housing-accommodation'),
        },
        {
          text: 'Employment & Career',
          href: getPermalink('/guide/employment-career'),
        },
        {
          text: 'Education & Language',
          href: getPermalink('/guide/education-language'),
        },
        {
          text: 'Transportation & Mobility',
          href: getPermalink('/guide/transportation-mobility'),
        },
        {
          text: 'Daily Life & Integration',
          href: getPermalink('/guide/daily-life-integration'),
        },
        {
          text: 'Financial & Legal Matters',
          href: getPermalink('/guide/financial-legal-matters'),
        },
        {
          text: 'Tax Declaration',
          href: getPermalink('/guide/tax-declaration'),
        },
        {
          text: 'Practical Resources',
          href: getPermalink('/guide/practical-resources'),
        },
        {
          text: 'Conclusion',
          href: getPermalink('/guide/conclusion'),
        },
        {
          text: 'Appendices',
          href: getPermalink('/guide/appendices'),
        },
      ],
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Tools',
      links: [
        {
          text: 'Introduction',
          href: getPermalink('/tools'),
        },
        {
          text: 'Brutto-Netto-Rechner',
          href: getPermalink('/tools/brutto-netto-rechner'),
        },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
  ],
  actions: [{ text: 'Read the Guide', href: getPermalink('/guide'), icon: 'tabler:book' }],
};

export const footerData = {
  links: [
    {
      title: 'Guide',
      links: [
        { text: 'Introduction', href: getPermalink('/guide/introduction') },
        { text: 'Planning Your Move', href: getPermalink('/guide/planning-your-move') },
        { text: 'Arrival & First Steps', href: getPermalink('/guide/arrival-and-first-steps') },
        { text: 'Healthcare & Insurance', href: getPermalink('/guide/healthcare-insurance') },
        { text: 'Housing', href: getPermalink('/guide/housing-accommodation') },
        { text: 'Employment', href: getPermalink('/guide/employment-career') },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Tools', href: getPermalink('/tools') },
        { text: 'Practical Resources', href: getPermalink('/guide/practical-resources') },
        { text: 'Tax Declaration Guide', href: getPermalink('/guide/tax-declaration') },
        { text: 'Appendices', href: getPermalink('/guide/appendices') },
        { text: 'About xPatLife', href: getPermalink('/about') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Disclaimer', href: getPermalink('/disclaimer') },
        { text: 'Privacy Policy', href: getPermalink('/privacy-policy') },
        { text: 'Cookie Policy', href: getPermalink('/cookie-policy') },
        { text: 'Terms of Service', href: getPermalink('/terms-of-service') },
        { text: 'Legal Notice', href: getPermalink('/legal-notice') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Disclaimer', href: getPermalink('/disclaimer') },
    { text: 'Terms', href: getPermalink('/terms-of-service') },
    { text: 'Privacy Policy', href: getPermalink('/privacy-policy') },
  ],
  socialLinks: [],
  footNote: `
    ⚠️ <strong>Educational Project:</strong> This website is for learning purposes only. Information may be inaccurate or outdated. <a href="/disclaimer" class="underline">Read full disclaimer</a> <br> Made with ❤️ for expats in Germany · xPatLife ${new Date().getFullYear()} · All rights reserved.
  `,
};
