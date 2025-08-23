// lib/types/postByCat.ts
export interface Post {
  title: string;
  featured_image: string;
  slug: string;
  published_date: string;
  vn_date: string;
 
}

export interface PostByCatResponse {
  total_posts: number;
  posts: Post[];
  title: string | null;
  description: string | null;
  seo_title: string | null;
  seo_desc: string | null;
}

