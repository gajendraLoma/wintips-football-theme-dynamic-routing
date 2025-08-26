// Updated components/pages/PostDetailsPage.tsx (dynamic breadcrumb based on data structure, no hardcoded paths)
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import {getFullImageUrl} from '@/lib/utils';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import RelatedPosts from '../blog/RelatedPosts';
import {PostDetails} from '../../types/postByCat';

interface Props {
  data: PostDetails;
  type?: string;
}

export default async function PostDetailsPage({data, type}: Props) {
  const t = await getTranslations();

  // Determine breadcrumb based on type
  const isMatchPredict = type === 'match_predict';
  const breadcrumbName = isMatchPredict 
    ? data?.breadcrumb?.name 
    : data?.categories?.[0]?.name;
  
  const breadcrumbSlug = isMatchPredict 
    ? data?.breadcrumb?.slug 
    : data?.categories?.[0]?.slug;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
              {/* Dynamic Breadcrumb */}
              <nav className="flex text-sm text-gray-500 mb-2 flex-wrap items-center">
                <Link
                  href="/"
                  className="text-blue-600 hover:underline transition-colors"
                >
                  {t("home")}
                </Link>

                {/* Show breadcrumb only if available */}
                {breadcrumbName && breadcrumbSlug && (
                  <>
                    <ChevronIcon />
                    <Link
                      href={`/${breadcrumbSlug.replace(/^\//, '')}`}
                      className="text-blue-600 hover:underline transition-colors"
                    >
                      {breadcrumbName}
                    </Link>
                  </>
                )}

                <ChevronIcon />
                <span className="text-gray-600">{data.title}</span>
              </nav>

              {/* Post Title */}
              <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

              {/* Featured Image - handles post_image for both types */}
              {data.post_image && (
                <div className="mb-6">
                  <Image
                    src={getFullImageUrl(data.post_image)}
                    alt={data.title || 'Post Image'}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover rounded-md"
                    priority
                  />
                </div>
              )}

              {/* Post Content */}
              <div
                className="content page text-[#323232]"
                dangerouslySetInnerHTML={{__html: data.content}}
              />

              {/* Published Date */}
              <p className="text-gray-600 font-bold mt-4">
                {t('publish_date')}: {data.published_date}
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

// Helper component for chevron icon
function ChevronIcon() {
  return (
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
  );
}