// app/components/pages/BlogPage.tsx
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import {fetchPostByCat} from '@/apis';
import {PostByCatResponse} from '../../types/interface/getPostByCatTypo';
import {getTranslations} from 'next-intl/server';
import ClientBlog from '../blog/ClientBlog';

export default async function BlogPage({data}: {data: any}) {
  const perPage = 16;
  const initialData: PostByCatResponse = await fetchPostByCat('category', '', 'post', perPage, 1);
  const t = await getTranslations();
    const domain = process.env.NEXT_PUBLIC_DOMAIN_NAME;
    const Backend_url = process.env.NEXT_PUBLIC_API_BASE_URL; 

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <section className="xl:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-4 max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm text-gray-500 mb-2">
                <Link href="/" className="text-blue-600 hover:underline transition-colors">
                  {t('home')}
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
                  className="mx-1 relative"
                >
                  <path d="M9 6l6 6l-6 6"></path>
                </svg>
                <span>{data.title}</span>
              </nav>
              <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
              <ClientBlog initialData={initialData} perPage={perPage} />
              {data.content && (
                <div className="content page text-[#323232]" dangerouslySetInnerHTML={{__html: data.content?.replace(new RegExp(Backend_url || '', 'g'), domain)}}/>
              )}
            </div>
          </section>
          <aside className="hidden col-span-1 xl:block xl:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
