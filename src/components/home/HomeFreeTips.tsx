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
              <th className="hidden lg:block px-4 py-3 text-left text-sm font-semibold text-gray-700">
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
                  <div className="text-xs sm:text-sm font-medium text-gray-900">
                    {formatMatchTime(tip.matchTime)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {tip.league}
                  </div>
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

                    <span className="text-xs sm:text-sm font-medium">
                      {tip.home}
                    </span>
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
                    <span className="text-xs sm:text-sm font-medium">
                      {tip.away}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <span className="text-xs sm:text-sm font-medium text-[#227ad3]">
                    {getTipDisplay(tip.tipType, tip.tipValue, tip.fixedOdd)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">
                    {tip.odd}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs sm:text-sm font-semibold text-[#227ad3] max-md:text-[12px]">
                    {tip.source.title}
                  </span>
                  <div className="flex items-center text-[#227ad3] text-sm ml-1">
                    {[...Array(tip.rate)].map((_, starIdx) => (
                      <svg
                        key={`filled-${starIdx}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                        className="fill-[#227ad3] text-[#227ad3] mr-0.5"
                      >
                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
                      </svg>
                    ))}

                    {[...Array(5 - tip.rate)].map((_, starIdx) => (
                      <svg
                        key={`empty-${starIdx}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                        className="fill-[#ddd] text-[#ddd] mr-0.5"
                      >
                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
                      </svg>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-4">
                  {tip.result ? (
                    <div className="flex flex-col items-center text-xs font-medium text-gray-700 leading-tight gap-2">
                      {tip.result.split('-').map((score, i) => (
                        <span key={i}>{score.trim()}</span>
                      ))}
                    </div>
                  ) : (
                    <div className="relative mx-auto flex h-[30px] w-[30px] max-md:w-[25px] max-md:h-[25px] items-center justify-center rounded-full border border-solid border-[#ddd]">
                      <Image
                        alt="loading"
                        loading="lazy"
                        width={19}
                        height={18}
                        src="/images/loading-icon-new.gif"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
