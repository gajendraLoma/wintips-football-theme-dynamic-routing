// apis/services/tips.ts
import { TipsResponse } from '@/types/tips';
const winTipBaseUrl = process.env.WINTIPS_DOMAIN;
export async function fetchTipsData(page: number = 1, limit: number = 60): Promise<TipsResponse | { data: null; error: string }> {
  try {
    const res = await fetch(`${winTipBaseUrl}/api/tips/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}: ${res.statusText}`);
    }
    const data: TipsResponse = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Detailed error in fetchTipsData:', error);
    return { data: null, error: (error instanceof Error ? error.message : 'Unknown error occurred') };
  }
}