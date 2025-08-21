// components/bookmakers/BookmakersTable.tsx
'use client';
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {Bookmaker} from '../../types/bookmaker';
import {getFullImageUrl} from '@/lib/utils';
interface BookmakersTableProps {
  bookmakers: Bookmaker[];
}

export default function BookmakersTable({bookmakers}: BookmakersTableProps) {
  const [filter, setFilter] = useState('mostPopular');
  const t = useTranslations();

  const mappedData = bookmakers.map((bookmaker, index) => ({
    rank: index + 1,
    name: bookmaker.name,
    bonus: bookmaker.bonus,
    star: bookmaker.score.replace('9.', ''),
    reviews: ['Fast service', 'Good odds'],
    rating: parseFloat(bookmaker.score) || 0,
    votes: 1000,
    bonusValue: parseInt(bookmaker.bonus.match(/\d+/)?.[0] || '0'),
    playerChoice: index === 0,
    image: getFullImageUrl(bookmaker.image) || '/images/default.png',
    play_now: bookmaker.play_now
  }));

  const sortedData = () => {
    switch (filter) {
      case 'mostPopular':
        return [...mappedData].sort((a, b) => b.votes - a.votes);
      case 'bonus':
        return [...mappedData].sort((a, b) => b.bonusValue - a.bonusValue);
      case 'mostRated':
        return [...mappedData].sort((a, b) => b.rating - a.rating);
      case 'playerChoose':
        return mappedData.filter((item) => item.playerChoice);
      default:
        return mappedData;
    }
  };
  console.log('Sorted Data:', sortedData());

  return (
    <>
      <section className="rounded-lg overflow-hidden">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 p-4 border-b pl-0">
          {['mostPopular', 'bonus', 'mostRated', 'playerChoose'].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`flex items-center gap-2 px-4 py-[6px] rounded-full border text-sm font-medium ${
                filter === btn
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-800 border-gray-300 hover:bg-blue-600 hover:text-[#fff]'
              }`}
            >
              {t(btn)}
            </button>
          ))}
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
                {sortedData().map((item) => (
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
                        <span className="flex aspect-square w-[40px] items-center justify-center rounded-full bg-[#e5e5e5] text-2xl font-semibold text-[#8b8b8b] m-auto">{item.rank}</span>
                      )}
                    </td>

                    {/* Bookmaker Logo */}
                    <td className="p-3">
                      <div className="flex space-x-3 group items-center">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name} // Corrected from 'sdassa'
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
                            {[...Array(parseInt(item.star) || 4)].map(
                              (_, starIdx) => (
                                <span key={starIdx}>★</span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Bonus */}
                    <td className="p-3 text-sm">
                      <div className="font-semibold">
                        <p
                          className="text-[#323232]"
                          dangerouslySetInnerHTML={{__html: item.bonus}}
                        />
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
                          {Array(5)
                            .fill(0)
                            .map((_, i) => {
                              const barValue = (i + 1) * 2;
                              let color = 'rgb(254, 135, 82)'; // Red
                              if (item.rating >= 8)
                                color = 'rgb(113, 166, 93)'; // Green
                              else if (item.rating >= 6)
                                color = 'rgb(255, 214, 39)'; // Yellow
                              return (
                                <div
                                  key={i}
                                  className="h-1 w-[17.5px] rounded-full bg-[#ccc] relative"
                                >
                                  <div
                                    style={{
                                      width:
                                        item.rating >= barValue ? '100%' : '0%',
                                      height: '4px',
                                      borderRadius: '2px',
                                      backgroundColor: color,
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      zIndex: 1
                                    }}
                                  />
                                </div>
                              );
                            })}
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
                        href={item.play_now || '#'} // Fallback to '#' if play_now is empty
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
              href={`/bookmakers/${bookmakers[0]?.slug || 'bookmakers'}`} // Use first slug or default
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
