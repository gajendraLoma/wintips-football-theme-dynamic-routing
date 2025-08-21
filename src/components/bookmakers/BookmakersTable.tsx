'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl'; // Assuming next-intl for translation

export default function BookmakersTable() {
  const [filter, setFilter] = useState('mostPopular');
  const t = useTranslations(); // Translation hook

  const data = [
    {
      rank: 1,
      name: 'W88',
      bonus: 'Get 20%',
      bonusDetail: 'Up to $200 in Saba Sports',
      star: '4',
      reviews: ['Fast withdrawal', 'Enthusiastic support', 'High Odds'],
      rating: 9.8,
      votes: 984323,
      bonusValue: 20,
      playerChoice: true
    },
    {
      rank: 2,
      name: 'Fun88',
      bonus: 'Get 100%',
      bonusDetail: 'Up to $230 welcome bonus',
      star: '3',
      reviews: ['Fast deposits', 'High odds', 'Many promotions'],
      rating: 9.7,
      votes: 974783,
      bonusValue: 100,
      playerChoice: false
    },
    {
      rank: 3,
      name: 'Bet365',
      bonus: 'Get 50%',
      bonusDetail: 'Up to $300 welcome bonus',
      star: '5',
      reviews: ['Best odds', 'Quick payouts', 'Live streaming'],
      rating: 9.9,
      votes: 1023483,
      bonusValue: 50,
      playerChoice: true
    },
    {
      rank: 4,
      name: '1xBet',
      bonus: 'Get 120%',
      bonusDetail: 'Up to $150 first deposit bonus',
      star: '4',
      reviews: ['Many markets', 'Mobile friendly', 'Fast payouts'],
      rating: 9.5,
      votes: 843223,
      bonusValue: 120,
      playerChoice: false
    },
    {
      rank: 5,
      name: 'Parimatch',
      bonus: 'Get 30%',
      bonusDetail: 'Up to $250 bonus',
      star: '1',
      reviews: ['Great UX', 'Fast withdrawals', 'Big markets'],
      rating: 9.4,
      votes: 923432,
      bonusValue: 30,
      playerChoice: false
    }
  ];

  const sortedData = () => {
    switch (filter) {
      case 'mostPopular':
        return [...data].sort((a, b) => b.votes - a.votes);
      case 'bonus':
        return [...data].sort((a, b) => b.bonusValue - a.bonusValue);
      case 'mostRated':
        return [...data].sort((a, b) => b.rating - a.rating);
      case 'playerChoose':
        return data.filter((item) => item.playerChoice);
      default:
        return data;
    }
  };

  return (
    <>
      <section className="rounded-lg overflow-hidden">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 p-4 border-b pl-0">
          {['mostPopular', 'bonus', 'mostRated', 'playerChoose'].map(
            (btn) => (
              <button
                key={btn}
                onClick={() => setFilter(btn)}
                className={`flex items-center gap-2 px-4 py-[6px] rounded-full border text-sm font-medium ${
                  filter === btn
                    ? 'bg-blue-600 text-white border-blue-600'
                    : ' text-gray-800 border-gray-300 hover:bg-blue-600 hover:text-[#fff]'
                }`}
              >
                {t(btn)}
              </button>
            )
          )}
        </div>
        <div className="bg-white">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 border-b">
                  <th className="p-3 w-[60px]">{t('top')}</th>
                  <th className="p-3">{t('bookmaker')}</th>
                  <th className="p-3">{t('bonus')}</th>
                  <th className="p-3">{t('reviews')}</th>
                  <th className="p-3">{t('rating')}</th>
                  <th className="p-3">{t('links')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedData().map((item, index) => (
                  <tr key={item.rank} className="border-b hover:bg-gray-50">
                    {/* Rank Image */}
                    <td className="p-3 text-center">
                      {item.rank <= 3 ? (
                        <Image
                          src={`/images/top${item.rank}.png`}
                          alt={`Top ${item.rank}`}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <span className="font-semibold">{item.rank}</span>
                      )}
                    </td>

                    {/* Bookmaker Logo */}
                    <td className="p-3">
                      <div
                        key={index}
                        className="flex space-x-3 group items-center"
                      >
                        <div className="relative flex-shrink-0">
                          <Image
                            src={`/images/bookmaker${item.rank}.png`}
                            alt={'sdassa'}
                            width={100}
                            height={30}
                            className="w-16 h-10 object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm line-clamp-2 font-bold text-[#0066cc]">
                            {item.name}
                          </h3>
                          <div className="flex items-center text-[#227ad3] text-sm ml-1">
                            {[...Array(item.star)].map((_, starIdx) => (
                              <span key={starIdx}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Bonus */}
                    <td className="p-3 text-sm">
                      <div className="font-semibold">{item.bonus}</div>

                      <div className="flex gap-1 text-[#0066cc]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                          className="tabler-icon tabler-icon-gift-filled "
                        >
                          <path d="M11 14v8h-4a3 3 0 0 1 -3 -3v-4a1 1 0 0 1 1 -1h6zm8 0a1 1 0 0 1 1 1v4a3 3 0 0 1 -3 3h-4v-8h6zm-2.5 -12a3.5 3.5 0 0 1 3.163 5h.337a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-7v-5h-2v5h-7a2 2 0 0 1 -2 -2v-1a2 2 0 0 1 2 -2h.337a3.486 3.486 0 0 1 -.337 -1.5c0 -1.933 1.567 -3.5 3.483 -3.5c1.755 -.03 3.312 1.092 4.381 2.934l.136 .243c1.033 -1.914 2.56 -3.114 4.291 -3.175l.209 -.002zm-9 2a1.5 1.5 0 0 0 0 3h3.143c-.741 -1.905 -1.949 -3.02 -3.143 -3zm8.983 0c-1.18 -.02 -2.385 1.096 -3.126 3h3.143a1.5 1.5 0 1 0 -.017 -3z"></path>
                        </svg>
                        <span className="text-sm font-bold">
                          {item.bonusDetail}
                        </span>
                      </div>
                    </td>

                    {/* Reviews */}
                    <td className="p-3 text-sm">
                      <ul className="space-y-1">
                        {item.reviews.map((rev, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="">✔</span>
                            <span>{rev}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Rating */}
                    <td className="p-3">
                      <div className="flex w-full flex-col items-center gap-1">
                        {/* Rating Number */}
                        <div className="font-semibold">
                          <span className="text-xl md:text-[22px] font-bold">
                            {item.rating}
                          </span>
                          <span className="text-[#7f7f7f] md:text-base">
                            /10
                          </span>
                        </div>

                        {/* Rating Bars */}
                        <div className="flex gap-1 relative">
                          <div className="h-1 w-[17.5px] rounded-full bg-[#ccc] relative">
                            <div
                              style={{
                                width: '100%',
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: 'rgb(113, 166, 93)',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1
                              }}
                            />
                          </div>

                          <div className="h-1 w-[17.5px] rounded-full bg-[#ccc] relative">
                            <div
                              style={{
                                width: '100%',
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: 'rgb(180, 211, 43)',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1
                              }}
                            />
                          </div>

                          <div className="h-1 w-[17.5px] rounded-full bg-[#ccc] relative">
                            <div
                              style={{
                                width: '100%',
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: 'rgb(255, 214, 39)',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1
                              }}
                            />
                          </div>

                          <div className="h-1 w-[17.5px] rounded-full bg-[#ccc] relative">
                            <div
                              style={{
                                width: '100%',
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: 'rgb(255, 173, 42)',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1
                              }}
                            />
                          </div>

                          <div className="h-1 w-[17.5px] rounded-full bg-[#ccc] relative">
                            <div
                              style={{
                                width: '90%',
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: 'rgb(254, 135, 82)',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1
                              }}
                            />
                          </div>
                        </div>

                        {/* Votes */}
                        <div>
                          <span className="mr-1 text-sm font-bold">
                            {item.votes.toLocaleString()}
                          </span>
                          votes
                        </div>
                      </div>
                    </td>

                    {/* Links */}
                    <td className="p-3 text-center">
                      <a
                        href="#"
                        className="flex items-center text-sm justify-center rounded-full bg-[#eaf4ff] max-md:px-[10px] max-md:py-[5px] max-xl:px-[10px] max-lg:w-max py-[5px] text-[#1877f2] transition-all duration-300 hover:bg-[#1877f2] hover:text-white"
                      >
                        {t('visitSite')}
                      </a>
                      <a
                        href="#"
                        className="transition-all text-sm duration-300 text-[#222222] hover:text-[#1877f2] no-underline"
                      >
                        {t('review')}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View More */}
          <div className="px-6 py-4 bg-gray-50 text-center">
            <Link
              href={'/free-soccer-tips'}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {t('viewMore')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}