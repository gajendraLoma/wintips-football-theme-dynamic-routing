// components/pages/PostDetailsPage.tsx
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import {getFullImageUrl} from '@/lib/utils';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import RelatedPosts from '../blog/RelatedPosts';
import {PostDetails} from '../../types/interface/getPostByCatTypo';
import {ISOformatDate} from '../../lib/date-helper';

interface Props {
  data: PostDetails;
  type?: string;
}

export default async function PostDetailsPage({data, type}: Props) {
  const t = await getTranslations();

  const isMatchPredict = type === 'match_predict';
  const breadcrumbName = isMatchPredict
    ? data?.breadcrumb?.name
    : data?.categories?.[0]?.name;

  const breadcrumbSlug = isMatchPredict
    ? data?.breadcrumb?.slug
    : data?.categories?.[0]?.slug;

  const W88_URL = process.env.WINTIPS_BOOKMAKER_W88;
  console.log('W88_URL', W88_URL);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-4 max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm text-gray-500 mb-2">
                <Link
                  href="/"
                  className="text-blue-600 hover:underline transition-colors"
                >
                  {t('home')}
                </Link>
                {breadcrumbName && breadcrumbSlug && (
                  <>
                    <ChevronIcon />
                    <Link
                      href={`/${breadcrumbSlug.replace(/^\//, '')}`}
                      className="text-blue-600 hover:underline transition-colors"
                    >
                      {breadcrumbName}
                    </Link>
                  </>
                )}
                <ChevronIcon />
                <span className="text-gray-600">{data.title}</span>
              </nav>

              {/* Title */}
              <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

              {isMatchPredict && (
                <>
                  {data.match && (
                    <div className="mb-8 rounded-md bg-gray-100 md:p-7 py-2 max-sm:p-[5px] bg-[url('/images/backgroud-top-predictions.jpg')] bg-no-repeat bg-cover">
                      <div className="flex justify-between gap-1 items-center">
                        <div className="flex sm:flex-1 flex-1 flex-col items-center">
                          <div className="flex sm:h-32 sm:w-32 w-[65px] h-[65px] items-center justify-center rounded-full bg-white shadow-sm">
                            <img
                              alt={data.match.home_name}
                              loading="lazy"
                              width={75}
                              height={75}
                              className="max-sm:w-11 max-sm:h-11"
                              src={getFullImageUrl(data.match.home_logo)}
                            />
                          </div>
                          <span className="mt-4 font-bold text-center max-sm:text-[15px] text-lg">
                            {data.match.home_name}
                          </span>
                        </div>

                        <span className="flex sm:flex-[1] flex-1 h-full flex-col items-center">
                          <p className="text-center max-sm:m-0 p2-5 font-bold text-[15px]">
                            {data?.categories[0]?.name}
                          </p>
                          <p className="m-0 max-sm:text-xs">
                            {ISOformatDate(data.match.match_time)}
                          </p>
                        </span>

                        <div className="flex sm:flex-1 flex-1 flex-col items-center">
                          <div className="flex sm:h-32 sm:w-32 w-[65px] h-[65px] items-center justify-center rounded-full bg-white shadow-sm">
                            <img
                              alt={data.match.away_name}
                              loading="lazy"
                              width={75}
                              height={75}
                              className="max-sm:w-11 max-sm:h-11"
                              src={getFullImageUrl(data.match.away_logo)}
                            />
                          </div>
                          <span className="mt-4 font-bold text-center max-sm:text-[15px] text-lg">
                            {data.match.away_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <h2 className="text-xl font-bold pb-2">
                    {t('prediction_result')} {data.match?.home_name} Vs{' '}
                    {data.match?.away_name}
                  </h2>

                  <div className="mb-6 rounded-md bg-[url('/images/bgkeond.png')] bg-cover bg-center bg-no-repeat p-5 flex flex-wrap justify-between gap-5 max-sm:justify-center">
                    <div className="relative w-full overflow-hidden rounded-md border-2 border-dashed border-blue-500 bg-white py-4 pl-11 max-md:pl-8 pr-4 sm:w-[54%]">
                      <div className="left-0 top-0 h-10 w-10 rounded-b-full PredictionResultCard">
                        Tips
                      </div>

                      <p className="flex items-center pb-1 text-sm">
                        <img
                          alt="handicap"
                          loading="lazy"
                          width={20}
                          height={22}
                          className="mr-2"
                          src="/images/light.png"
                        />
                        <span className="mr-1 text-base font-bold max-xl:text-[15px] max-lg:text-sm">
                          {t('asian_handicap')}:
                        </span>
                        <span className="flex gap-1 text-base font-bold text-blue-600 max-xl:text-[15px] max-lg:text-sm">
                          {data.match?.handicap || 'N/A'}
                        </span>
                      </p>

                      <p className="flex items-center pb-1 text-sm">
                        <img
                          alt="score"
                          loading="lazy"
                          width={20}
                          height={22}
                          className="mr-2"
                          src="/images/ball.png"
                        />
                        <span className="mr-1 text-base font-bold max-xl:text-[15px] max-lg:text-sm">
                          {t('score')}:
                        </span>
                        <span className="text-base font-bold text-blue-600 max-xl:text-[15px] max-lg:text-sm">
                          {data.match?.score_predict || 'N/A'}
                        </span>
                      </p>

                      <p className="flex items-center text-sm">
                        <img
                          alt="overunder"
                          loading="lazy"
                          width={20}
                          height={22}
                          className="mr-2"
                          src="/images/ou.png"
                        />
                        <span className="mr-1 text-base font-bold max-xl:text-[15px] max-lg:text-sm">
                          {t('over_under')}:
                        </span>
                        <span className="text-base font-bold text-blue-600 max-xl:text-[15px] max-lg:text-sm">
                          {data.match?.underover || 'N/A'}
                        </span>
                      </p>
                    </div>

                    {/* Promotion / Bet Now */}
                    <div className="flex flex-col items-center justify-around gap-3 sm:w-auto w-full">
                      <span className="text-center text-sm font-bold pb-2">
                        {t('promotion_from')} &nbsp;
                        <a
                          className="text-blue-600"
                          target="_blank"
                          href={W88_URL}
                        >
                          W88
                        </a>
                      </span>

                      <div className="relative rounded-full p-1 w-[305px] bg-gradient-to-r from-blue-400 to-indigo-700">
                        {/* Hand Icon */}
                        <div className="absolute top-1/2 left-[-18px] transform -translate-y-1/2 flex items-center justify-center rounded-full border-4 border-gray-200 bg-white w-[70px] h-[70px]">
                          <img
                            alt="hand"
                            loading="lazy"
                            width={36}
                            height={24}
                            src="/images/hand.png"
                          />
                        </div>

                        {/* Bet Now Button */}
                        <div className="rounded-full border border-dashed border-white py-3 text-center group hover:opacity-80">
                          <a
                            target="_blank"
                            className="text-md font-bold uppercase text-white no-underline hover:text-red-600"
                            href={W88_URL}
                          >
                            {t('bet_now')}
                          </a>
                        </div>

                        {/* Right Chevron */}
                        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center justify-center rounded-full bg-white w-10 h-10 text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 6l6 6l-6 6"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Post Image */}
              {data.post_image && (
                <div className="mb-6">
                  <Image
                    src={getFullImageUrl(data.post_image)}
                    alt={data.title || 'Post Image'}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover rounded-md"
                    priority
                  />
                </div>
              )}

              {/* Post Content */}
              {data.content && (
                <div
                  className="content page text-[#323232]"
                  dangerouslySetInnerHTML={{__html: data.content}}
                />
              )}

              {/* Publish Date */}
              <p className="text-gray-600 font-bold">
                {t('publish_date')}: {ISOformatDate(data?.published_date)}
              </p>

              {/* Related Posts */}
              <RelatedPosts RelatedPostData={data.related_posts || []} />
            </div>
          </section>

          <aside className="hidden col-span-1 lg:block lg:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}

function ChevronIcon() {
  return (
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
      className="tabler-icon tabler-icon-chevron-right mx-1 relative"
    >
      <path d="M9 6l6 6l-6 6"></path>
    </svg>
  );
}
