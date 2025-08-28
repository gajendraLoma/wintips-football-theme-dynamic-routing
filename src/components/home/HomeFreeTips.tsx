'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {TipsResponse} from '@/types/interface/getTipsTypo';
interface FreeTipsProps {
  tips: TipsResponse | null;
}
export default function HomeFreeTips({tips}: FreeTipsProps) {
  const t = useTranslations();
  if (!tips || !tips.items || tips.items.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t('timeLeague')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t('match')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t('tips')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t('odds')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t('premiumSite')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  {t('result')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.from({length: 5}).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-300 rounded w-20" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-32" />
                      <div className="h-4 bg-gray-300 rounded w-32" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-300 rounded w-24" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-300 rounded w-12" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-300 rounded w-28" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-[30px] w-[30px] bg-gray-300 rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 text-center">
          <div className="h-4 bg-gray-300 rounded w-20 mx-auto" />
        </div>
      </section>
    );
  }

  const formatMatchTime = (matchTime: string) => {
    const date = new Date(matchTime);
    return `${date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'})} ${date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})}`;
  };

  const getTipDisplay = (
    tipType: string,
    tipValue: string,
    fixedOdd: number
  ) => {
    if (tipType === 'OverUnder') {
      return `${tipValue} ${fixedOdd}`;
    }
    return `${tipValue} ${fixedOdd >= 0 ? `+${fixedOdd}` : fixedOdd}`;
  };

  const displayedItems = tips.items;

  return (
    <section className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {t('timeLeague')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {t('match')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {t('tips')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {t('odds')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {t('premiumSite')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {t('result')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedItems.map((tip: any) => (
              <tr key={tip.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {formatMatchTime(tip.matchTime)}
                  </div>
                  <div className="text-sm text-gray-500">{tip.league}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    {tip.homeLogo && (
                      <Image
                        src={tip.homeLogo}
                        alt={`${tip.home} logo`}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}

                    <span className="text-sm font-medium">{tip.home}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {tip.awayLogo && (
                      <Image
                        src={tip.awayLogo}
                        alt={`${tip.away} logo`}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium">{tip.away}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-[#227ad3]">
                    {getTipDisplay(tip.tipType, tip.tipValue, tip.fixedOdd)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {tip.odd}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="md:text-sm font-semibold text-[#227ad3] max-md:text-[12px]">
                    {tip.source.title}
                  </span>
                  <div className="flex items-center text-[#227ad3] text-sm ml-1">
                    {[...Array(tip.rate)].map((_, starIdx) => (
                      <span key={starIdx}>★</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="relative mx-auto flex h-[30px] w-[30px] max-md:w-[25px] max-md:h-[25px] items-center justify-center rounded-full border border-solid border-[#ddd]">
                    <Image
                      alt="loading"
                      loading="lazy"
                      width={19}
                      height={18}
                      src="/images/loading-icon-new.gif"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
