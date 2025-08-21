// components/pages/Home.tsx
import Link from 'next/link';
import Hero from '@/components/Hero';
import HomeFreeTips from '@/components/HomeFreeTips';
import Sidebar from '@/components/layout/Sidebar';
import Aids from '@/components/common/Aids';
import PredectionList from '@/components/predection/PredectionList';
import BettingGENSection from '@/components/BettingGENSection';
import {getTranslations} from 'next-intl/server';
import {fetchTipsData} from '@/apis/services/soccer-tips';
import { TipsResponse } from "@/types/tips";

const SectionHeader = ({title, href}: {title: string; href: string}) => (
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-hover transition-all">
      {title}
    </h2>
    <Link
      href={href}
      className="text-sm text-[#666] hover:text-blue-hover flex items-center"
    >
      <span>View All</span>
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

const tipsResponse = await fetchTipsData(1, 10);
  console.log('Home Data111:', tipsResponse);

  // Handle the response and align with TipsResponse | null
  const tips: TipsResponse | null = 'data' in tipsResponse && tipsResponse.data === null
    ? null
    : tipsResponse as TipsResponse;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Hero data={homeData} />
            <h2 className="text-2xl font-bold text-gray-900">
              {t('freeTipsTitle')}
            </h2>
            <HomeFreeTips tips={tips} />
            <Aids data={homeData} />
            <SectionHeader
              title={t('predictionsTitle')}
              href="/soccer-predictions/"
            />
            <PredectionList />
            <BettingGENSection data={homeData} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
