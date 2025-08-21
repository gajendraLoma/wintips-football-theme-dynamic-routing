// lib/types/tips.ts
export interface Source {
  id: number;
  title: string;
  content: string;
  slug: string;
  linkedPostId: number;
  createdAt: string;
  modifiedAt: string;
  createdBy: number | null;
  modifiedBy: number | null;
  isPremium: boolean;
}

export interface Tip {
  id: number;
  matchId: number;
  matchTime: string;
  league: string;
  home: string;
  away: string;
  homeLogo: string;
  awayLogo: string;
  tipType: string;
  tipValue: string;
  odd: number;
  fixedOdd: number;
  sourceId: number;
  rate: number;
  isFree: boolean;
  isPremium: boolean;
  isFeatured: boolean;
  result: string | null;
  result_half_time: string | null;
  status: string | null;
  createdAt: string;
  modifiedAt: string;
  createdBy: number;
  modifiedBy: number;
  pageType: string;
  source: Source;
}

export interface TipsResponse {
  items: Tip[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}