// src/types/prediction.ts
export interface MatchPrediction {
  title: string;
  featured_image: string;
  slug: string;
  published_date: string;
  vn_date: string;
}

export interface PredictionsData {
  total_posts: number;
  posts: MatchPrediction[];
  title: string;
  description: string;
  seo_title: string;
  seo_desc: string;
}