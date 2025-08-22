'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { useTranslations } from 'next-intl';
import { getFullImageUrl } from '@/lib/utils';

interface CategoryItem {
  title: string;
  featured_image: string;
  slug: string;
  published_date: string;
}

interface Category {
  name: string;
  post: CategoryItem[];
}

interface BettingThreeInOneSectionProps {
  data?: {
    category_left?: Category;
    category_middle?: Category;
    category_right?: Category;
  };
}

export default function BettingThreeInOneSection({ data }: BettingThreeInOneSectionProps) {
  // const t = useTranslations();

  // Validate category data
  const hasValidData = (category?: Category): category is Category =>
    !!category &&
    Array.isArray(category.post) &&
    category.post.length > 0 &&
    category.post.every(
      (item) => item.title && item.featured_image && item.slug && item.published_date
    );

  // Define sections with category name and posts
  const sections = [
    {
      title: data?.category_left?.name,
      items: hasValidData(data?.category_left) ? data.category_left.post : null,
    },
    {
      title: data?.category_middle?.name,
      items: hasValidData(data?.category_middle) ? data.category_middle.post : null,
    },
    {
      title: data?.category_right?.name,
      items: hasValidData(data?.category_right) ? data.category_right.post : null,
    },
  ].filter((section): section is { title: string; items: CategoryItem[] } => {
    if (section.items === null) {
      console.warn(`Section "${section.title}" has invalid or missing data`);
      return false;
    }
    return true;
  });

  // If no valid sections, return null
  if (sections.length === 0) {
    console.warn('No valid sections to render in Betting Section');
    return null;
  }

  return (
    <div className="py-8">
      <div className="grid gap-10 md:grid-cols-3">
        {sections.map((section, index) => {
          const featuredImage = getFullImageUrl(section.items[0].featured_image);
          return (            
          <div key={index} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              <div className="relative h-48 w-full transition-transform duration-300 hover:scale-[1.03]">
                <Image
                  src={featuredImage}
                  alt={section.items[0].title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <Link
                href={`/${section.items[0].slug}`}
                className="font-semibold text-black hover:text-[#60a5fa] block"
              >
                <h3>{section.items[0].title}</h3>
              </Link>
              <hr />
              <ul className="text-sm space-y-1 text-gray-700">
                {section.items.slice(1).map((item, subIndex) => {
                  
                return(
                   <li key={subIndex} className="py-2">
                    <Link href={`/${item.slug}`} className="flex hover:text-[#60a5fa]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1 shrink-0"
                      >
                        <path d="M9 6l6 6l-6 6" />
                      </svg>
                      <h3 className="ml-2">{item.title}</h3>
                    </Link>
                  </li>
                )
              }
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}