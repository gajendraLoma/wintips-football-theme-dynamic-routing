// apis/servicesmenu.ts
import { MenuData } from '@/types/menu';

const apiBaseUrl = process.env.API_DOMAIN;

export async function fetchMenuData(location: string = 'menu-1'): Promise<MenuData | { error: string }> {
  try {
    const res = await fetch(`${apiBaseUrl}/wp-json/getdata/menu?location=${location}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 30 }, // Cache for 30s
    });
    if (!res.ok) {
      return { error: `API request failed with status ${res.status}` };
    }
    const data: MenuData = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Error fetching menu data:', error);
    return { error: (error instanceof Error ? error.message : 'Unknown error occurred') };
  }
}

export async function fetchFooterByLocation(location: string) {
  try {
    const res = await fetch(
      `${apiBaseUrl}/wp-json/getdata/menu?location=${location}`,
      { next: { revalidate: 3600 } } // SSR + ISR
    );

    if (!res.ok) throw new Error(`Failed to fetch footer menu: ${location}`);

    return await res.json();
  } catch (error) {
    console.error("Error fetching footer:", location, error);
    return { error: true, result: [], title: [] };
  }
}

export async function fetchAllFooters() {
  const locations = Array.from({ length: 8 }, (_, i) => `footer-${i + 1}`);
  const results = await Promise.all(locations.map((loc) => fetchFooterByLocation(loc)));
  return results.reduce((acc, data, i) => {
    acc[`footer-${i + 1}`] = data;
    return acc;
  }, {} as Record<string, any>);
}