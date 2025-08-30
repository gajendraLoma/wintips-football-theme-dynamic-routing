// apis/services/getSitemap.ts

interface SitemapItem {
  title: string;
  slug: string;
  date?: string; 
}
export async function fetchSitemapData(type: string): Promise<{
  leagues: SitemapItem[];
  pages: SitemapItem[];
  posts: SitemapItem[];
  predicts: SitemapItem[];
  bookmakers: SitemapItem[];
}> {
  const apiBase = process.env.API_DOMAIN;
  const safeFetch = async (url: string): Promise<any[]> => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Fetch failed for ${url}: Status ${res.status}`);
        return [];
      }
      return await res.json();
    } catch (error) {
      console.error(`Error fetching ${url}: ${(error as Error).message}`);
      return [];
    }
  };

  // Fetch leagues
  const params = new URLSearchParams({ type });
  const leagues = (await safeFetch(`${apiBase}/wp-json/get/taxonomy?${params}`)) as SitemapItem[];

  // General fetcher for allpost types
  const fetchAllPost = async (type: string): Promise<SitemapItem[]> => {
    return (await safeFetch(`${apiBase}/wp-json/get/allpost?type=${type}`)) as SitemapItem[];
  };

  const pages = await fetchAllPost('page');
  const posts = await fetchAllPost('post');
  const predicts = await fetchAllPost('match_predict');
  const bookmakers = await fetchAllPost('bookmaker');

  return { leagues, pages, posts, predicts, bookmakers };
}