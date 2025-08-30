// apis/services/getSidebar.ts
import { SSidebarData } from '@/types/interface/getSidebarTypo';

const apiBaseUrl = process.env.API_DOMAIN;

export async function fetchSidebarData(): Promise<SSidebarData | { error: string }> {
  try {
    const res = await fetch(`${apiBaseUrl}/wp-json/get/siderbar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 30 }
    });
    if (!res.ok) {
      return { error: `API request failed with status ${res.status}` };
    }

    const data: SSidebarData = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Error fetching sidebar data:', error);
    return { error: (error instanceof Error ? error.message : 'Unknown error occurred') };
  }
}