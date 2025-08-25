// Updated components/pages/PostDetailsPage.tsx (dynamic breadcrumb based on data structure, no hardcoded paths)
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { getFullImageUrl } from "@/lib/utils";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import RelatedPosts from "../blog/RelatedPosts";
import { PostDetails } from "../../types/postByCat"; // Assume this type works for both; extend if needed

interface Props {
  data: PostDetails;
  type?: string; // 'post' or 'match_predict' passed from page.tsx for dynamic handling
}

export default async function PostDetailsPage({ data, type = 'post' }: Props) {
  console.log('Post Details Data:', data);
  console.log('Details Type:', type);

  const t = await getTranslations();
  
  // Dynamic breadcrumb construction based on data
  const breadcrumb = data.breadcrumb;
  const categories = data.categories;
  const hasCategories = categories && categories.length > 0;
  
  if (!hasCategories) {
    console.warn('No categories found in data for breadcrumb');
  }

  // Prepare paths dynamically
  const breadcrumbPath = breadcrumb?.slug?.replace(/^\//, '') || ''; // Remove leading / for clean slug
  const categorySlug = hasCategories ? categories[0].slug : '';
  const categoryName = hasCategories ? categories[0].name : '';
  
  // Determine if breadcrumb is the category itself (for posts) or a top-level section (for predictions)
  const isBreadcrumbCategory = breadcrumbPath === categorySlug;
  
  // Full path for category/league link
  const categoryPath = isBreadcrumbCategory 
    ? breadcrumbPath // Just the category if it matches
    : `${breadcrumbPath}/${categorySlug}`; // Section + category/league if different
// 3333333333333333333333333333
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
              {/* Dynamic Breadcrumb: Home > [Section if applicable] > [Category/League] > Title */}
              <nav className="flex text-sm text-gray-500 mb-2">
                <Link href="/" className="text-blue-600 hover:underline transition-colors">
                  Home
                </Link>
                
                {/* Always add breadcrumb section if present and not the category itself */}
                {!isBreadcrumbCategory && breadcrumbPath && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="tabler-icon tabler-icon-chevron-right mx-1 relative bottom-[-3px]"
                    >
                      <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                    <Link 
                      href={`/${breadcrumbPath}`} 
                      className="text-blue-600 hover:underline transition-colors"
                    >
                      {breadcrumb?.name || ''}
                    </Link>
                  </>
                )}
                
                {/* Add category/league link if present */}
                {hasCategories && categoryPath && (
                  <>
                    {isBreadcrumbCategory ? (
                      // If breadcrumb is the category, start with it after Home
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="tabler-icon tabler-icon-chevron-right mx-1 relative bottom-[-3px]"
                      >
                        <path d="M9 6l6 6l-6 6"></path>
                      </svg>
                    ) : (
                      // Otherwise, add another chevron after section
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="tabler-icon tabler-icon-chevron-right mx-1 relative bottom-[-3px]"
                      >
                        <path d="M9 6l6 6l-6 6"></path>
                      </svg>
                    )}
                    <Link 
                      href={`/${categoryPath}`} 
                      className="text-blue-600 hover:underline transition-colors"
                    >
                      {categoryName}
                    </Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="tabler-icon tabler-icon-chevron-right mx-1 relative bottom-[-3px]"
                    >
                      <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                  </>
                )}
                
                <span>{data.title}</span>
              </nav>

              {/* Post Title */}
              <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

              {/* Featured Image - handles post_image for both types */}
              {data.post_image && (
                <div className="mb-6">
                  <Image
                    src={getFullImageUrl(data.post_image)}
                    alt={data.title || "Post Image"}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover rounded-md"
                    priority
                  />
                </div>
              )}

              {/* Post Content */}
            content:  <div className="content page text-[#323232]" dangerouslySetInnerHTML={{ __html: data.content }} />

              {/* Published Date */}
              <p className="text-gray-600 font-bold">
                {t("publish_date")}: {data.published_date}
              </p>

              {/* Related Posts in Swiper - works for both, empty array if none */}
              <RelatedPosts RelatedPostData={data.related_posts || []} />
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}