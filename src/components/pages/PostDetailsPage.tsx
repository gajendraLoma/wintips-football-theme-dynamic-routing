import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { getFullImageUrl } from "@/lib/utils";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import RelatedPosts from "../blog/RelatedPosts";
import { PostDetails } from "../../types/postByCat";

export default async function PostDetailsPage({ data }: { data: PostDetails }) {
  console.log('Post Details Data:', data);

  const t = await getTranslations();
  // Extract category slug from breadcrumb or categories
  const categorySlug = data.breadcrumb?.slug || (data.categories && data.categories.length > 0 ? data.categories[0].slug : "/blogs");

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex text-sm text-gray-500 mb-2">
                <Link href="/" className="text-blue-600 hover:underline transition-colors">
                  Home
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
                <Link href="/blogs" className="text-blue-600 hover:underline transition-colors">
                  Blog
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
                <Link href={categorySlug} className="text-blue-600 hover:underline transition-colors">
                  {data.breadcrumb?.name || (data.categories && data.categories.length > 0 ? data.categories[0].name : "Category")}
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
                <span>{data.title}</span>
              </nav>

              {/* Post Title */}
              <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

              {/* Featured Image */}
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
              <div className="text-gray-800 prose prose-lg" dangerouslySetInnerHTML={{ __html: data.content || "No content available" }} />

              {/* Published Date */}
              <p className="text-gray-600 font-bold">
                {t("publish_date")}: {data.published_date}
              </p>

              {/* Related Posts in Swiper */}
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