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

// types/Details.ts

export interface InfoDet {
  website: string;
  head_office: string;
  year_established: string;
  owner: string;
  licences: string;
  partners: string;
}

export interface BookmakerDet {
  short_description: string;
  score: string;
  play_now: string;
  why_choice: string;
  info: InfoDet;
}

export interface BreadcrumbDet {
  name: string;
  slug: string;
}

export interface BookPostDetails {
  status: number;
  post_image: string;
  title: string;
  content: string;
  published_date: string;
  seo_title: string;
  seo_description: string;
  categories: any[];
  breadcrumb: BreadcrumbDet;
  related_posts: any[]; 
  bookmaker: BookmakerDet;
}