export interface CategoryItem {
  title: string;
  featured_image: string;
  slug: string;
  published_date: string;
}

export interface Category {
  name: string;
  post: CategoryItem[];
}

export interface BettingThreeInOneSectionProps {
  data?: {
    category_left: Category;
    category_middle: Category;
    category_right: Category;
  };
}

export interface HomepageData {
  title: string;
  seo_title: string;
  seo_description: string;
  post_date: string;
  image: string;
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
  category_left: Category;
  category_middle: Category;
  category_right: Category;
}