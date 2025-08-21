// lib/types/bookmaker.ts
export interface Bookmaker {
  title: string;
  name: string;
  score: string; 
  bonus: string; 
  slug: string;
  image: string; 
  play_now: string; 
}

export interface BookmakersPageData {
  title: string;
  seo_title?: string; 
  seo_description?: string; 
  post_date: string; 
  image: string; 
  content: string; 
  type: string; 
  bookmakers: Bookmaker[];
}

export interface BookmakersResponse {
  items: BookmakersPageData[]; 
  meta?: {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
  };
}