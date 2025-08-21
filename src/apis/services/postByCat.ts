// const API_BASE = process.env.API_DOMAIN;
// export async function fetchPostByCat(type: string, slug: string, post_type = 'post', per_page = 16, paged = 1): Promise<any> {
//   const params = new URLSearchParams({ type, slug, post_type, per_page: per_page.toString(), paged: paged.toString() });
//   try {
//     const res = await fetch(`${API_BASE}/wp-json/get/postByCat?${params}`, { cache: 'no-store' });
//     return await res.json();
//   } catch (error) {
//     throw new Error('Failed to fetch post by category');
//   }
// }