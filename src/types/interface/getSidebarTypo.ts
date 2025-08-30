// lib/types/sidebar.ts

export interface SSidebarData {
  banner: string;
  banner_url: string;
  bookmakers: SBookmaker[];
  post: SPost[];
  betting_tool: SBettingTool[];
}

export interface SBookmaker {
  name: string;
  bonus: string;
  slug: string;
  image: string;
  play_now: string;
}

export interface SPost {
  title: string;
  slug: string;
  image: string;
}

export interface SBettingTool {
  icon: string;
  name: string;
  url: string;
}