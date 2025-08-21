// const API_BASE = process.env.API_DOMAIN;
// export async function fetchPostBySlug(type: string, slug: string): Promise<any> {
//   const params = new URLSearchParams({ type, slug });
//   try {
//     const res = await fetch(`${API_BASE}/wp-json/get/postBySlug?${params}`, { cache: 'no-store' });
//     return await res.json();
//   } catch (error) {
//     throw new Error('Failed to fetch post by slug');
//   }
// }