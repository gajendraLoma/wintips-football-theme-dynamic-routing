// apis/services/getSlugType.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function fetchSlugType(slug: string): Promise<{ type: string | null } | { error: string }> {
  try {
    const url = `${API_BASE}/wp-json/get/slugtype?slug=${slug}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return { error: `API failed with status ${res.status}` };
    return await res.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}
