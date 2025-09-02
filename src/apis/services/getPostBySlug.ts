// apis/services/getPostBySlug.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function fetchPostBySlug(type: string, slug: string): Promise<any | { error: string }> {
  try {
    const params = new URLSearchParams({ type, slug });
    const res = await fetch(`${API_BASE}/wp-json/get/postBySlug?${params.toString()}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) return { error: `Failed with status ${res.status}` };
    return await res.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}

