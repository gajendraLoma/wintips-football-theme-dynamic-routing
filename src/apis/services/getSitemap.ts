// apis/services/getSitemap.ts
interface SitemapItem {
  title: string;
  slug: string;
  date?: string;
}

async function fetchTaxonomies(type: 'league' | 'category'): Promise<SitemapItem[]> {
  const apiBase = process.env.API_DOMAIN;
  const url = `${apiBase}/wp-json/get/taxonomy?type=${type}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Fetch failed for ${url}: Status ${res.status}`);
      return [];
    }
    return (await res.json()) as SitemapItem[];
  } catch (error) {
    console.error(`Error fetching ${url}: ${(error as Error).message}`);
    return [];
  }
}

async function fetchAllPosts(type: 'post' | 'page' | 'match_predict' | 'bookmaker'): Promise<SitemapItem[]> {
  const apiBase = process.env.API_DOMAIN;
  const url = `${apiBase}/wp-json/get/allpost?type=${type}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Fetch failed for ${url}: Status ${res.status}`);
      return [];
    }
    return (await res.json()) as SitemapItem[];
  } catch (error) {
    console.error(`Error fetching ${url}: ${(error as Error).message}`);
    return [];
  }
}

export async function fetchSitemapData(): Promise<{
  leagues: SitemapItem[];
  categories: SitemapItem[];
  pages: SitemapItem[];
  posts: SitemapItem[];
  predicts: SitemapItem[];
  bookmakers: SitemapItem[];
}> {
  const leagues = await fetchTaxonomies('league');
  const categories = await fetchTaxonomies('category');
  const pages = await fetchAllPosts('page');
  const posts = await fetchAllPosts('post');
  const predicts = await fetchAllPosts('match_predict');
  const bookmakers = await fetchAllPosts('bookmaker');

  return { leagues, categories, pages, posts, predicts, bookmakers };
}