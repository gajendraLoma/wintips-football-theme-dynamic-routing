export interface CategoryItem {
  title: string;
  featured_image: string;
  slug: string;
  published_date: string;
}

export interface HomepageData {
  title: string;
  seo_title: string;
  description: string;
  image: string;
  post_date: string;
  content: string;
  type: string;
  banner_top: {
    title: string;
    link: string;
    description: string;
    image: string;
  };
  banner_middle: {
    left_url: string;
    left_image: string;
    right_url: string;
    right_image: string;
  };
  category_left: { name: string; post: CategoryItem[] };
  category_middle: { name: string; post: CategoryItem[] }; 
  category_right: { name: string; post: CategoryItem[] };
}