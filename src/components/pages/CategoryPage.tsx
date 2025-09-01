// components/pages/CategoryPage.tsx
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import {PostByCatResponse} from '../../types/interface/getPostByCatTypo';
import {getTranslations} from 'next-intl/server';
import ClientCategoryBlog from '../blog/ClientCategoryBlog';
interface CategoryPageProps {
  data: PostByCatResponse;
  slug: string;
}

export default async function CategoryPage({data, slug}: CategoryPageProps) {
  const t = await getTranslations();
  const perPage = 16; 

  if (!data || !data.posts || data.total_posts === 0 || 'error' in data) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <section className="lg:col-span-3 space-y-8">
              <div className="bg-white px-4 md:px-8 py-4 max-w-[1280px] mx-auto">
                <p>No posts available for this category</p>
              </div>
            </section>
            <aside className="hidden lg:block lg:col-span-1">
              <Sidebar />
            </aside>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-4 max-w-[1280px] mx-auto">
              <nav className="flex items-center text-sm text-gray-500 mb-2">
                <Link
                  href="/"
                  className="text-blue-600 hover:underline transition-colors"
                >
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
                  className="tabler-icon tabler-icon-chevron-right mx-1 relative"
                >
                  <path d="M9 6l6 6l-6 6"></path>
                </svg>
                <span>{data.title}</span>
              </nav>
              <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
                <ClientCategoryBlog initialData={data} perPage={perPage} slug={slug} />
                

            <div className="">
                    
                      {data.content ? (
                        <div
                          className="content page text-[#323232]"
                          dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                      ) : data.description ? (
                        <div className="content page text-[#323232]">
                          {data.description}
                        </div>
                      ) : null}
          </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="hidden col-span-1 lg:block lg:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
