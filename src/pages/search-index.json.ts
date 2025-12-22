import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import yaml from 'js-yaml';
import { cleanSlug, getPermalink, POST_PERMALINK_PATTERN, trimSlash } from '~/utils/permalinks';

type SearchItemType = 'blog' | 'guide' | 'tool' | 'page';

type SearchIndexItem = {
  title: string;
  description?: string;
  url: string;
  type: SearchItemType;
  keywords?: string[];
  text?: string;
};

const EXCLUDED_URLS = new Set([
  '/cookie-policy',
  '/disclaimer',
  '/legal-notice',
  '/privacy-policy',
  '/terms-of-service',
  '/privacy',
  '/terms',
  '/404',
]);

const filePathToUrl = (relativePath: string): string => {
  // relativePath examples: "./guide/foo.md", "./tools/brutto-netto-rechner.astro", "./index.astro"
  const withoutPrefix = relativePath.replace(/^\.(\/|\\)/, '');
  const normalized = withoutPrefix.replace(/\\/g, '/');

  const withoutExt = normalized.replace(/\.(md|astro)$/i, '');
  const withoutIndex = withoutExt.endsWith('/index') ? withoutExt.slice(0, -'/index'.length) : withoutExt;

  if (!withoutIndex) return '/';
  return '/' + withoutIndex;
};

const titleFromUrl = (url: string): string => {
  if (url === '/') return 'Home';
  const segment = url.split('/').filter(Boolean).slice(-1)[0] ?? url;
  return segment
    .split('-')
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ');
};

const stripMarkdown = (input: string): string => {
  return input
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*[-*_]{3,}\s*$/gm, ' ')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const getString = (obj: Record<string, unknown>, key: string): string | undefined => {
  const value = obj[key];
  return typeof value === 'string' ? value : undefined;
};

const getStringArray = (obj: Record<string, unknown>, key: string): string[] | undefined => {
  const value = obj[key];
  if (!Array.isArray(value)) return undefined;
  return value.every((v) => typeof v === 'string') ? value : undefined;
};

const getBoolean = (obj: Record<string, unknown>, key: string): boolean | undefined => {
  const value = obj[key];
  return typeof value === 'boolean' ? value : undefined;
};

const getDate = (obj: Record<string, unknown>, key: string): Date | undefined => {
  const value = obj[key];
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }
  return undefined;
};

const parseFrontmatterAndBody = (raw: string): { data: Record<string, unknown>; body: string } => {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw };
  }

  const [, frontmatterText, body] = match;
  let data: Record<string, unknown> = {};
  try {
    const parsed = yaml.load(frontmatterText);
    if (parsed && typeof parsed === 'object') data = parsed as Record<string, unknown>;
  } catch {
    data = {};
  }

  return { data, body: body ?? '' };
};

const extractMetadataFromAstro = (raw: string): { title?: string; description?: string } => {
  // Best-effort extraction for pages that define `const metadata = { title: '...', description: '...' }`
  const titleMatch = raw.match(/\btitle\s*:\s*(['"`])([\s\S]*?)\1/);
  const descriptionMatch = raw.match(/\bdescription\s*:\s*(['"`])([\s\S]*?)\1/);

  const title = titleMatch?.[2]?.trim();
  const description = descriptionMatch?.[2]?.trim();

  return {
    title: title || undefined,
    description: description || undefined,
  };
};

const inferTypeFromUrl = (url: string): SearchItemType => {
  if (url.startsWith('/tools')) return 'tool';
  if (url.startsWith('/guide')) return 'guide';
  return 'page';
};

const truncate = (text: string, maxChars: number): string => (text.length > maxChars ? text.slice(0, maxChars) : text);

const generatePostPermalink = ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}): string => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const buildBlogIndex = async (): Promise<SearchIndexItem[]> => {
  const posts = await getCollection('post');

  const items: SearchIndexItem[] = [];
  for (const post of posts) {
    const { id, body, data } = post;
    const meta = data as Record<string, unknown>;
    if (getBoolean(meta, 'draft')) continue;

    const slug = cleanSlug(id);
    const publishDate = getDate(meta, 'publishDate') ?? new Date();

    const rawCategory = getString(meta, 'category');
    const categorySlug = rawCategory ? cleanSlug(rawCategory) : undefined;

    const rawTags = getStringArray(meta, 'tags') ?? [];
    const keywords = [rawCategory, ...rawTags].filter(Boolean) as string[];

    const permalink = generatePostPermalink({ id, slug, publishDate, category: categorySlug });
    const url = getPermalink(permalink, 'post');

    if (EXCLUDED_URLS.has(url)) continue;

    const title = getString(meta, 'title') ?? titleFromUrl(url);
    const description = getString(meta, 'excerpt');

    const text = stripMarkdown(body ?? '');

    items.push({
      type: 'blog',
      url,
      title,
      description,
      keywords,
      text: truncate(text, 80_000),
    });
  }

  return items;
};

const buildMarkdownPagesIndex = async (): Promise<SearchIndexItem[]> => {
  const mdFiles = import.meta.glob('./**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<
    string,
    string
  >;

  const items: SearchIndexItem[] = [];

  for (const [path, raw] of Object.entries(mdFiles)) {
    const url = filePathToUrl(path);

    if (url.includes('[')) continue;
    if (EXCLUDED_URLS.has(url)) continue;

    const { data, body } = parseFrontmatterAndBody(raw);

    const title = typeof data.title === 'string' ? data.title : titleFromUrl(url);

    const descriptionCandidate =
      getString(data, 'description') ||
      getString(data, 'excerpt') ||
      getString(data, 'seoDescription') ||
      getString(data, 'ogDescription') ||
      undefined;

    const text = stripMarkdown(body);

    items.push({
      type: inferTypeFromUrl(url),
      url,
      title,
      description: descriptionCandidate || (text ? truncate(text, 180) : undefined),
      text: truncate(text, 80_000),
    });
  }

  return items;
};

const buildAstroPagesIndex = async (): Promise<SearchIndexItem[]> => {
  const astroFiles = import.meta.glob('./**/*.astro', { eager: true, query: '?raw', import: 'default' }) as Record<
    string,
    string
  >;

  const items: SearchIndexItem[] = [];

  for (const [path, raw] of Object.entries(astroFiles)) {
    const url = filePathToUrl(path);

    if (url.includes('[')) continue;
    if (EXCLUDED_URLS.has(url)) continue;

    // Skip non-searchable utility pages
    if (url === '/rss.xml') continue;

    const { title, description } = extractMetadataFromAstro(raw);

    items.push({
      type: inferTypeFromUrl(url),
      url,
      title: title || titleFromUrl(url),
      description,
      text: '',
    });
  }

  return items;
};

export const GET: APIRoute = async () => {
  const [blog, mdPages, astroPages] = await Promise.all([
    buildBlogIndex(),
    buildMarkdownPagesIndex(),
    buildAstroPagesIndex(),
  ]);

  const byUrl = new Map<string, SearchIndexItem>();

  // Prefer markdown pages over astro pages if a URL collides
  for (const item of [...astroPages, ...mdPages, ...blog]) {
    if (EXCLUDED_URLS.has(item.url)) continue;
    if (!item.url.startsWith('/')) continue;

    if (!byUrl.has(item.url)) {
      byUrl.set(item.url, item);
      continue;
    }

    const existing = byUrl.get(item.url)!;
    if (existing.type === 'page' && item.type !== 'page') {
      byUrl.set(item.url, item);
    }
  }

  const index = Array.from(byUrl.values()).sort((a, b) => a.title.localeCompare(b.title));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // cacheable on CDN, but safe to revalidate
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
};
