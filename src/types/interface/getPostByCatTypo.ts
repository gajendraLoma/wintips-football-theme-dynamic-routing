// lib/types/postByCat.ts
export interface Post {
  title: string;
  featured_image: string;
  slug: string;
  published_date: string;
  vn_date: string;
  des:string
 
}

export interface PostByCatResponse {
  total_posts: number;
  posts: Post[];
  title: string | null;
  description: string | null;
  content: string;
  seo_title: string | null;
  seo_desc: string | null;
}


export interface PCategory {
  name: string;
  slug: string;
}

export interface Breadcrumb {
  name: string;
  slug: string;
}

export interface RelatedPost {
  title: string;
  featured_image: string;
  slug: string;
}
export interface MatchDetails {
  home_name: string;
  home_logo: string;
  away_name: string;
  away_logo: string;
  score_predict: string;
  underover: string;
  handicap: string;
  match_time: string; // ISO string or "YYYY-MM-DD HH:mm:ss"
}

export interface PostDetails {
  status: number;
  post_image: string;
  title: string;
  content: string;
  published_date: string;
  seo_title: string;
  seo_description: string;
  categories: PCategory[];
  breadcrumb: Breadcrumb;
  related_posts: RelatedPost[];
  match: MatchDetails; 
}

