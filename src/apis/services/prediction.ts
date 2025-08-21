// src/app/apis/services/prediction.ts
export async function getPredictions(page = 1, limit = 50) {
  const res = await fetch(`https://wintips.com/api/predictions/?page=${page}&limit=${limit}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch predictions');
  }
  
  return res.json();
}