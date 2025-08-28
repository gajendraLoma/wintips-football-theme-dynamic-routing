import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import BigImageBlogSection from '@/components/blog/BigImageBlogSection';
import GridViewSection from '@/components/blog/GridViewSection';
import ListViewSection from '@/components/blog/ListViewSection';
import {fetchPostByCat} from '@/apis';
import {Post, PostByCatResponse} from '../../types/interface/getPostByCatTypo';
import {getTranslations} from 'next-intl/server';
export default async function BlogPage({data}: {data: any}) {
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok',
    hour12: false
  });
  const blogData: PostByCatResponse = await fetchPostByCat(
    'category',
    '',
    'post',
    20,
    1
  );
  const t = await getTranslations();
  if (!blogData || !blogData.posts || blogData.total_posts === 0) {
    console.warn(`No posts found at ${currentDateTime}.`);
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <p>No posts available.</p>
        </div>
      </main>
    );
  }

  const mainMatch: Post =
    blogData.posts.length > 0
      ? {...blogData.posts[0]}
      : {
          title: 'No Data',
          featured_image: '',
          slug: '',
          published_date: '',
          vn_date: ''
        };

  const sidebarMatches: Post =
    blogData.posts.length > 1
      ? {...blogData.posts[1]}
      : {
          title: 'No Data',
          featured_image: '',
          slug: '',
          published_date: '',
          vn_date: ''
        };

  const gridMatches: Post[] =
    blogData.posts.length > 2 ? blogData.posts.slice(2, 5) : [];

  const listMatches: Post[] =
    blogData.posts.length > 2 ? blogData.posts.slice(2) : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-4 max-w-[1280px] mx-auto">
              <nav className="flex text-sm text-gray-500 mb-2">
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
                  className="tabler-icon tabler-icon-chevron-right mx-1 relative bottom-[-3px]"
                >
                  <path d="M9 6l6 6l-6 6"></path>
                </svg>
                <span>{blogData.title || 'Blog'}</span>
              </nav>
              <h1 className="text-2xl font-bold mb-2">
                {blogData.title || 'Blog'}
              </h1>

              <BigImageBlogSection
                mainMatch={mainMatch}
                sidebarMatches={sidebarMatches}
              />
              <div className="my-4" />
              <GridViewSection gridMatches={gridMatches} />
              <ListViewSection listMatches={listMatches} />
            </div>
            content:{' '}
            <p
              className="content page text-[#323232]"
              dangerouslySetInnerHTML={{__html: data.content}}
            />
          </section>
          <aside className="hidden col-span-1 lg:block lg:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
