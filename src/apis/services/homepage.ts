// import { HomepageData } from '@/types/homepage';
// import { PostData } from '@/types/singlePost';

// const apiBaseUrl = process.env.API_DOMAIN;


// export async function fetchHomeData(): Promise<HomepageData | { error: string }> {

//   try {
//     const res = await fetch(`${apiBaseUrl}/wp-json/get/page`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       next: { revalidate: 30 }
//     });
//     if (!res.ok) {
//       return { error: `API request failed with status ${res.status}` };
//     }

//     const data = await res.json();

//     return data;
//   } catch (error: unknown) {
//     console.error('Error fetching homepage data:', error);
//     return { error: (error instanceof Error ? error.message : 'Unknown error occurred') };;
//   }
// }

// export async function fetchHomePostData(slug: string): Promise<PostData | { error: string }> {
//   try {
//     const res = await fetch(`${apiBaseUrl}/wp-json/get/postBySlug?type=post&slug=${slug}`, {  
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//       next: { revalidate: 30 }
//     });
//     if (!res.ok) return { error: `API request failed with status ${res.status}` };
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return { error: (error as Error).message };
//   }
// }
