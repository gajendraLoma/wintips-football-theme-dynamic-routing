// apis/services/getPageBySlug.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function fetchPageData(slug: string): Promise<any | { error: string }> {
  try {
    const url = slug ? `${API_BASE}/wp-json/get/page?slug=${slug}` : `${API_BASE}/wp-json/get/page`;
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) return { error: `Failed with status ${res.status}` };
    return await res.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}