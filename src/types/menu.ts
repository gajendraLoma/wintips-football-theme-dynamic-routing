// lib/types/menu.ts

export interface LangItem {
  [key: string]: string; 
}

export interface MenuItem {
  url: string;
  lang: LangItem[];
  submenu?: MenuItem[];
}

export interface MenuData {
  status: number;
  result: MenuItem[];
  title?: LangItem[];
}