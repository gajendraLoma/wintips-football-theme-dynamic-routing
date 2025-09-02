// apis/services/getDataByLeague.ts 
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface TaxonomyItem {
  title: string;
  slug: string;
}

export async function fetchTaxonomy(type: string): Promise<TaxonomyItem[]> {
  const params = new URLSearchParams({ type });
  try {
    const res = await fetch(`${API_BASE}/wp-json/get/taxonomy?${params}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch taxonomy:', error);
    throw new Error('Failed to fetch taxonomy');
  }
}