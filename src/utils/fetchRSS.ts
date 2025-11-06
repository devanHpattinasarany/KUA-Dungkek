import Parser from "rss-parser";
import { externalLinks } from "./externalLinks";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid?: string;
}

export async function fetchKemenagNews(limit = 5): Promise<NewsItem[]> {
  try {
    const parser = new Parser({
      customFields: {
        item: ['guid']
      }
    });

    const feed = await parser.parseURL(externalLinks.rss);

    return feed.items.slice(0, limit).map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || new Date().toISOString(),
      description: item.contentSnippet || item.content || '',
      guid: item.guid || ''
    }));
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}