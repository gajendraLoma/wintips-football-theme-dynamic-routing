import BookmakersTable from '../bookmakers/BookmakersTable';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { BookmakersPageData } from '../../types/interface/getBookmakerTypo';
import { getTranslations } from 'next-intl/server';
export default async function BookmakersPage({ data }: { data: BookmakersPageData }) {
  console.log('BookmakersPage data:', data);
  const t = await getTranslations();
  return (
    <div className="flex-1 bg-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-2">
          <Link href="/" className="text-blue-600 hover:underline">
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
          <span>{data.title}</span>
        </nav>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>

        {/* Table Header */}
        <BookmakersTable bookmakers={data.bookmakers} />

        <div className="">
          <div className="max-w-8xl mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <p className="content page text-[#323232]" dangerouslySetInnerHTML={{ __html: data.content }} />
              </div>

              {/* Sidebar (Right Column) */}
              <div className="hidden col-span-1 lg:block lg:col-span-1">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}