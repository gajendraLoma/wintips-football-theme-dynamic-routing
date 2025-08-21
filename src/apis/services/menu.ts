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

export async function fetchAllFooterData(): Promise<{ [key: string]: MenuData | { error: string } }> {
  const locations = ['footer-1', 'footer-2', 'footer-3', 'footer-4', 'footer-5', 'footer-6', 'footer-7', 'footer-8'];
  const dataPromises = locations.map(async (loc) => {
    const data = await fetchMenuData(loc);
    return { [loc]: data };
  });
  const results = await Promise.all(dataPromises); // Parallel fetching
  return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}