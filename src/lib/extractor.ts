import TurndownService from 'turndown';
import { Readability } from '@mozilla/readability';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});

// Remove unnecessary image bloat, tracking pixels, scripts, and navigation links
turndownService.addRule('removeElements', {
  filter: (node) => ['script', 'style', 'noscript', 'iframe', 'svg', 'canvas'].includes(node.nodeName.toLowerCase()),
  replacement: () => ''
});

/**
 * Strips known noise from raw HTML strings before readability/markdown conversion
 */
export function cleanHtmlString(rawHtml: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');

    // Remove noise elements
    const elementsToRemove = doc.querySelectorAll(
      'script, style, noscript, nav, footer, header, aside, iframe, .ad, .ads, [id*="cookie"], [class*="cookie"], [id*="banner"], [class*="banner"]'
    );
    elementsToRemove.forEach(el => el.remove());

    // Try Readability
    const reader = new Readability(doc);
    const article = reader.parse();

    if (article && article.content) {
      return turndownService.turndown(article.content);
    }

    // Fallback: convert body directly
    return turndownService.turndown(doc.body.innerHTML);
  } catch (error) {
    console.warn('HTML Parsing failed, falling back to direct text cleaning', error);
    return rawHtml.replace(/<[^>]*>?/gm, '');
  }
}

/**
 * Normalizes and removes repetitive whitespace, excessive linebreaks, and blank links
 */
export function normalizeMarkdown(md: string): string {
  return md
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\[\s*\]\([^)]*\)/g, '') // remove empty markdown links
    .trim();
}

/**
 * Fetches content from a URL using client-side reader APIs with fallbacks
 */
export async function fetchUrlContent(targetUrl: string): Promise<{ title: string; content: string }> {
  let url = targetUrl.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  // Strategy 1: Jina Reader API (free, returns pre-cleaned markdown)
  try {
    const jinaUrl = `https://r.jina.ai/${url}`;
    const response = await fetch(jinaUrl, {
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (response.ok) {
      const text = await response.text();
      const firstLine = text.split('\n')[0].replace(/^#\s*/, '').trim();
      const title = firstLine.length > 0 && firstLine.length < 120 ? firstLine : url;
      return {
        title,
        content: normalizeMarkdown(text),
      };
    }
  } catch (jinaError) {
    console.warn('Jina Reader failed, trying CORS proxy fallback...', jinaError);
  }

  // Strategy 2: AllOrigins proxy fallback for raw HTML
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const html = await response.text();
    const cleaned = cleanHtmlString(html);
    
    // Extract title from html if possible
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = match ? match[1].trim() : url;

    return {
      title,
      content: normalizeMarkdown(cleaned),
    };
  } catch (proxyError) {
    throw new Error(`Could not fetch the URL. Please copy and paste the page's HTML or text directly.`);
  }
}
