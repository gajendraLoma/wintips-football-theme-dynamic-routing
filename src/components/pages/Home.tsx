// components/pages/Home.tsx
import Link from 'next/link';
import Hero from '@/components/home/Hero';
import HomeFreeTips from '@/components/home/HomeFreeTips';
import Sidebar from '@/components/layout/Sidebar';
import Aids from '@/components/common/Aids';
import PredectionList from '@/components/predection/PredectionList';
import BettingGENSection from '@/components/home/BettingGENSection';
import {getTranslations} from 'next-intl/server';
import {fetchTipsData, fetchPostByCat} from '@/apis';
import {TipsResponse} from '@/types/interface/getTipsTypo';
import {PostByCatResponse} from '../../types/interface/getPostByCatTypo';
const SectionHeader = ({title, t, href}: {title: string;  t: (key: string) => string;  href: string}) => (
  
  <div className="flex items-center justify-between">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-hover transition-all">
      {title}
    </h2>
    <Link
      href={href}
      className="text-sm text-[#666] hover:text-blue-hover flex items-center"
    >
      <span>{t("viewAll")}</span>
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
        className="ml-1"
      >
        <path d="M9 6l6 6l-6 6" />
      </svg>
    </Link>
  </div>
);

export default async function Home({data}: {data: any}) {
  const t = await getTranslations();
  const homeData = data;
  const matchData: PostByCatResponse = await fetchPostByCat('league','','match_predict',8,1);

  if (
    !matchData ||
    !matchData.posts ||
    matchData.total_posts === 0 ||
    'error' in matchData
  ) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <p>No match predictions available for this league.</p>
        </div>
      </div>
    );
  }

  const tipsResponse = await fetchTipsData(1, 10);

  // Handle the response and align with TipsResponse | null
  const tips: TipsResponse | null =
    'data' in tipsResponse && tipsResponse.data === null
      ? null
      : (tipsResponse as TipsResponse);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 space-y-4 lg:col-span-3">
            <Hero data={homeData} />
             <SectionHeader
              title={t('freeTipsTitle')}
              href="/soccer-tips"
              t={t}
            />
            <HomeFreeTips tips={tips} />
            <Aids data={homeData} />
            <SectionHeader
              title={t('predictionsTitle')}
              href="/match-predictions"
               t={t}
            />
           <PredectionList posts={matchData.posts} />
            <BettingGENSection data={homeData} />
             <p
              className="content page text-[#323232]"
              dangerouslySetInnerHTML={{__html: data.content || ''}}
            />
          </div>
          <div className="hidden col-span-1 lg:block lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}