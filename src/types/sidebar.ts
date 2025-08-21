// lib/types/sidebar.ts

export interface SidebarData {
  banner: string;
  banner_url: string;
  bookmakers: Bookmaker[];
  post: Post[];
  betting_tool: BettingTool[];
}

export interface Bookmaker {
  name: string;
  bonus: string;
  slug: string;
  image: string;
  play_now: string;
}

export interface Post {
  title: string;
  slug: string;
  image: string;
}

export interface BettingTool {
  icon: string;
  name: string;
  url: string;
}