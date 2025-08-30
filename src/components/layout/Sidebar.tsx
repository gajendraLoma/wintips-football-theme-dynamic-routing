// components/layout/Sidebar.tsx
import Image from 'next/image';
import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {fetchSidebarData} from '@/apis';
import {
  SSidebarData,
  SBookmaker,
  SPost,
  SBettingTool
} from '@/types/interface/getSidebarTypo';
import {getFullImageUrl} from '@/lib/utils';

export default async function Sidebar() {
  const t = await getTranslations();
  const data = await fetchSidebarData();
  if ('error' in data) {
    console.error(data.error);
    return null;
  }

  const sidebarData = data as SSidebarData;
  const isLoading = false;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden bookMakersSidebar">
        <div className="bg-white py-2 border-b">
          <h3 className="font-bold text-gray-900 flex items-center">
            <Image
              src="/svg/ChevronRight.svg"
              alt="Chevron"
              className="mr-1"
              width={20}
              height={20}
            />
            {t('topBookmakers')}
          </h3>
        </div>
        <div className="p-2 space-y-3">
          {isLoading
            ? Array.from({length: 5}).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#eaf4ff] rounded-lg pr-1 animate-pulse"
                >
                  <div className="flex items-center space-x-3 rounded-[5px]">
                    <div className="inline-block h-[80px] w-[80px] shrink-0 bg-gray-300 rounded" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-24" />
                      <div className="h-6 bg-gray-300 rounded w-16" />
                    </div>
                  </div>
                  <div className="h-7 w-[80px] bg-gray-300 rounded-[14px]" />
                </div>
              ))
            : sidebarData?.bookmakers.map(
                (bookmaker: SBookmaker, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#eaf4ff] rounded-lg pr-1"
                  >
                    <div className="flex items-center space-x-3 rounded-[5px]">
                      <div className="inline-block h-[75px] w-[75px] shrink-0 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        <Image
                          src={getFullImageUrl(bookmaker.image)}
                          alt={bookmaker.name}
                          width={75}
                          height={75}
                          className="rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                       
                        <div
                          className="line-clamp-2 overflow-hidden animate-zoom-pulse contentDiv"
                          dangerouslySetInnerHTML={{__html: bookmaker.bonus}}
                        />
                      </div>
                    </div>
                    <Link
                      href={bookmaker.play_now}
                      className="h-7 w-[90px] rounded-[14px] bg-white p-0 text-[9px] text-blue-500 hover:bg-white flex items-center justify-center gap-x-1 animate-btn-swing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex items-center">
                        <span className="text-blue-500 text-[10px]">{t('playNow')}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="tabler-icon text-blue-500"
                        >
                          <path d="M9 6l6 6l-6 6" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                )
              )}
        </div>
      </div>

      <div className="grid grid-cols-1 w-full py-1">
        {isLoading ? (
          <div className="relative w-full overflow-hidden rounded-md aspect-[4/3] sm:aspect-[16/19] bg-gray-300 animate-pulse" />
        ) : (
          sidebarData && (
            <Link
              href={sidebarData.banner_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full overflow-hidden rounded-md aspect-[4/3] sm:aspect-[16/19]"
            >
              <Image
                src={getFullImageUrl(sidebarData.banner)}
                alt="Join Now Banner"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </Link>
          )
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-white py-2 border-b">
          <h3 className="font-bold text-gray-900 flex items-center">
            <Image
              src="/svg/ChevronRight.svg"
              alt="Chevron"
              className="mr-1"
              width={20}
              height={20}
            />
            {t('sportsNews')}
          </h3>
        </div>
        <div className="p-2 space-y-4">
          {isLoading
            ? Array.from({length: 4}).map((_, index) => (
                <div key={index} className="flex space-x-3 animate-pulse">
                  <div className="relative flex-shrink-0 w-16 h-16 bg-gray-300 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                  </div>
                </div>
              ))
            : sidebarData?.post.map((post: SPost, index: number) => (
                <Link
                  href={post?.slug}
                  key={index}
                  className="flex space-x-3 group hover:bg-[#f2f9ff] items-center rounded"
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={getFullImageUrl(post.image)}
                      alt={post.title}
                      width={100}
                      height={60}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-white py-2 border-b">
          <h3 className="font-bold text-gray-900 flex items-center">
            <Image
              src="/svg/ChevronRight.svg"
              alt="Chevron"
              className="mr-1"
              width={20}
              height={20}
            />
            {t('bettingTool')}
          </h3>
        </div>
        <div className="p-2 space-y-2">
          {isLoading
            ? Array.from({length: 3}).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-[5px] bg-[#f5f5f5] px-2 py-[10px] text-[15px] animate-pulse"
                >
                  <div className="m-0 flex h-[38px] w-[38px] items-center justify-center bg-gray-300 rounded" />
                  <div className="h-6 bg-gray-300 rounded w-1/3 ml-2" />
                </div>
              ))
            : sidebarData?.betting_tool.map(
                (tool: SBettingTool, index: number) => (
                  <Link
                    key={index}
                    href={tool.url}
                    className="reset-link flex items-center rounded-[5px] bg-[#f5f5f5] px-2 py-[10px] text-[15px] hover:bg-[#f2f9ff]"
                  >
                    <p className="m-0 flex h-[38px] w-[38px] items-center justify-center">
                      <Image
                        src={getFullImageUrl(tool.icon)}
                        alt={`${tool.name} icon`}
                        width={36}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </p>
                    <h3>{tool.name}</h3>
                  </Link>
                )
              )}
        </div>
      </div>
    </div>
  );
}
