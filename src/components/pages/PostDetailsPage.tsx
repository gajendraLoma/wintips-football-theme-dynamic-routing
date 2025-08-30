// components/pages/PostDetailsPage.tsx
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import {getFullImageUrl} from '@/lib/utils';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import RelatedPosts from '../blog/RelatedPosts';
import {PostDetails} from '../../types/interface/getPostByCatTypo';
import { ISOformatDate } from "../../lib/date-helper";
interface Props {
  data: PostDetails;
  type?: string;
}

export default async function PostDetailsPage({data, type}: Props) {
  const t = await getTranslations();

  const isMatchPredict = type === 'match_predict';
  const breadcrumbName = isMatchPredict
    ? data?.breadcrumb?.name
    : data?.categories?.[0]?.name;

  const breadcrumbSlug = isMatchPredict
    ? data?.breadcrumb?.slug
    : data?.categories?.[0]?.slug;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-4 max-w-[1280px] mx-auto">
              <nav className="flex items-center text-sm text-gray-500 mb-2">
                <Link
                  href="/"
                  className="text-blue-600 hover:underline transition-colors"
                >
                  {t('home')}
                </Link>
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
              <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
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

              <div
                className="content page text-[#323232]"
                dangerouslySetInnerHTML={{__html: data.content}}
              />
              <p className="text-gray-600 font-bold">
               
                {t('publish_date')}:  {ISOformatDate(data?.published_date)}  
              </p>
              <RelatedPosts RelatedPostData={data.related_posts || []} />
            </div>
          </section>
          <aside className="hidden col-span-1 lg:block lg:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}

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
      className="tabler-icon tabler-icon-chevron-right mx-1 relative"
    >
      <path d="M9 6l6 6l-6 6"></path>
    </svg>
  );
}
