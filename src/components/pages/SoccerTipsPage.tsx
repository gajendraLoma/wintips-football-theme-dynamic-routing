import Sidebar from '@/components/layout/Sidebar';
import Link from 'next/link';
import {fetchTipsData} from '@/apis';
import TipsComp from '../tips/TipsComp';
import { getTranslations } from 'next-intl/server';
export default async function SoccerTipsPage({data}: {data: any}) {
  const response = await fetchTipsData(1, 60);
  const initialTips = 'error' in response ? null : response;
  const t = await getTranslations();
  console.log('SoccerTipsPage data:', data);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
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

              <TipsComp initialTips={initialTips} />
            </div>
            {/* Content */}
            <p
              className="content page text-[#323232]"
              dangerouslySetInnerHTML={{__html: data.content}}
            />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
