// export * from './services/homepage';
// export * from './services/soccer-tips';
// export * from './services/menu';
// export * from './services/sidebar';
// export * from './services/pageData';
// export * from './services/postByCat';
// export * from './services/postBySlug';
// export * from './services/slugType';



// apis/index.ts (combine all your fetch functions here for simplicity)

const API_BASE = process.env.API_DOMAIN;

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

export async function fetchPageData(slug: string): Promise<any | { error: string }> {
  try {
    // Handle empty slug for home (no ?slug= param)
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

export async function fetchPostByCat(type: string, slug: string, post_type = 'post', per_page = 16, paged = 1): Promise<any | { error: string }> {
  try {
    const params = new URLSearchParams({
      type,
      slug,
      post_type,
      per_page: per_page.toString(),
      paged: paged.toString(),
    });
    const res = await fetch(`${API_BASE}/wp-json/get/postByCat?${params.toString()}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) return { error: `Failed with status ${res.status}` };
    return await res.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// Your fetchMenuData and fetchAllFooterData are fine, no changes needed unless you have issues.