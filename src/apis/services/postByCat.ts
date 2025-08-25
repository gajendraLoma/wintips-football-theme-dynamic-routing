
// apis/postByCat.ts
import { PostByCatResponse } from '../../types/postByCat';

const API_BASE = process.env.API_DOMAIN;

export async function fetchPostByCat(
  type: string,
  slug: string,
  post_type: string,
  per_page: number = 16,
  paged: number = 1
): Promise<PostByCatResponse> {
  const params = new URLSearchParams({
    type,
    slug,
    post_type,
    per_page: per_page.toString(),
    paged: paged.toString(),
  });

  try {
    const res = await fetch(`${API_BASE}/wp-json/get/postByCat?${params}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("data post",data)
    return data;
  } catch (error) {
    console.error('Failed to fetch post by category:', error);
    throw new Error('Failed to fetch post by category');
  }
}