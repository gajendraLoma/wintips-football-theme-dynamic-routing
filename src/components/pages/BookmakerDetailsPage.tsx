// components/pages/BookmakerDetailsPage.tsx
import Image from 'next/image';
import Link from 'next/link';
import {getFullImageUrl} from '@/lib/utils';
import {BookPostDetails} from '../../types/interface/getBookmakerTypo';
import Sidebar from '../layout/Sidebar';
import {getTranslations} from 'next-intl/server';

interface Props {
  data: BookPostDetails;
  type?: string;
}

export default async function BookmakerDetailsPage({data}: Props) {
  const bookmaker = data.bookmaker;
  const t = await getTranslations();
  const domain = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  const Backend_url = process.env.NEXT_PUBLIC_API_BASE_URL; 


  
  return (
    <>
      {/* 🔹 Banner Section */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative hidden lg:block"
        style={{backgroundImage: "url('/images/banner-top-bookmaker.jpeg')"}}
      >
        <div className="max-w-8xl mx-auto lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-500 mb-2">
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
              className="tabler-icon tabler-icon-chevron-right mx-1 relative"
            >
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
            <Link
              href={data.breadcrumb.slug}
              className="text-blue-600 hover:underline"
            >
              {data.breadcrumb.name}
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
              className="tabler-icon tabler-icon-chevron-right mx-1 relative"
            >
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
            <span>{data.title}</span>
          </nav>
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 pt-2">
            <div className="w-[30%] flex flex-col items-center justify-center">
              <Image
                src={getFullImageUrl(data.post_image)}
                alt={data.title}
                width={300}
                height={220}
                className="object-contain rounded w-full"
              />
            </div>

            <div className="w-[70%]">
              <div className="heading">
                <h3 className="text-lg font-semibold">{data.title}</h3>
                <p>{bookmaker.short_description}</p>
              </div>
              <button
                className="mt-4 rounded-3xl bg-[#1877f2] px-12 py-3"
                style={{
                  backgroundImage:
                    'linear-gradient(81deg, rgb(23, 167, 241) 0%, rgb(0, 101, 203) 100%)'
                }}
              >
                <Link
                  href={bookmaker.play_now}
                  target="_blank"
                  className="flex items-center gap-1 no-underline"
                >
                  <span className="text-lg font-bold text-white">
                    {t('play_now')} &nbsp;
                  </span>
                  <img
                    alt="icon"
                    loading="lazy"
                    width="28"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    src="https://static.wintips.com/images/wintips-page/poi.png"
                  />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-4 max-w-[1280px] mx-auto">
              <div className="block lg:hidden">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-gray-500 mb-2">
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
                    className="tabler-icon tabler-icon-chevron-right mx-1 relative"
                  >
                    <path d="M9 6l6 6l-6 6"></path>
                  </svg>
                  <Link
                    href={data.breadcrumb.slug}
                    className="text-blue-600 hover:underline"
                  >
                    {data.breadcrumb.name}
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
                    className="tabler-icon tabler-icon-chevron-right mx-1 relative"
                  >
                    <path d="M9 6l6 6l-6 6"></path>
                  </svg>
                  <span>{data.title}</span>
                </nav>
                <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-3 pt-2">
                  <div className=" flex flex-col items-center justify-center">
                    <img
                      src={getFullImageUrl(data.post_image)}
                      alt={data.title}
                      className="object-contain rounded w-full"
                    />
                  </div>

                  <div className="">
                    <div className="heading">
                      <h3 className="text-lg font-semibold">{data.title}</h3>
                      <p>{bookmaker.short_description}</p>
                    </div>
                    <button
                      className="mt-4 mb-4 rounded-3xl bg-[#1877f2] px-8 py-2"
                      style={{
                        backgroundImage:
                          'linear-gradient(81deg, rgb(23, 167, 241) 0%, rgb(0, 101, 203) 100%)'
                      }}
                    >
                      <Link
                        href={bookmaker.play_now}
                        target="_blank"
                        className="flex items-center gap-1 no-underline"
                      >
                        <span className="text-sm font-bold text-white">
                          {t('play_now')} &nbsp;
                        </span>
                        <img
                          alt="icon"
                          loading="lazy"
                          width="20"
                          height="12"
                          decoding="async"
                          data-nimg="1"
                          src="https://static.wintips.com/images/wintips-page/poi.png"
                        />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                {/* Left Section: Profiles */}
                <div className="flex-1 flex flex-col">
                  <div className="">
                    <h2 className="flex items-center text-xl font-bold mb-4">
                      <img
                        alt="chevron alt"
                        loading="lazy"
                        width="20"
                        height="20"
                        className="mr-1"
                        src="/svg/ChevronRight.svg"
                      />{' '}
                      {t('profiles_of')} {data.title}
                    </h2>
                  </div>

                  <div className="flex  gap-4 justify-between pl-4">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 md:w-1/2">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold">
                          {t('website')}
                        </span>
                        <Link
                          href={bookmaker.info.website}
                          rel="nofollow"
                          className="text-sm text-blue-600 no-underline hover:underline"
                        >
                          {bookmaker.info.website}
                        </Link>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold">{t('owner')}</span>
                        <span className="text-sm text-gray-700">
                          {bookmaker.info.owner}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold">
                          {t('head_office')}
                        </span>
                        <span className="text-sm text-gray-700">
                          {bookmaker.info.head_office}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold">
                          {t('year_established')}
                        </span>
                        <span className="text-sm text-gray-700">
                          {bookmaker.info.year_established}
                        </span>
                      </div>
                    </div>
                    {/* Right Column */}
                    <div className="flex flex-col gap-4 md:w-1/2">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold">
                          {t('licences')}
                        </span>
                        <span className="text-sm text-gray-700">
                          {bookmaker.info.licences}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold">
                          {t('partners_and_sponsors')}
                        </span>
                        <div className="flex flex-col text-sm text-gray-700">
                          {bookmaker.info.partners}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section: Why Choose */}
                <div
                  className="flex-1 flex flex-col bg-cover bg-no-repeat rounded-md sm:mx-0 mx-[-10px] p-2"
                  style={{
                    backgroundImage: `url('https://static.wintips.com/images/wintips-page/why-choose.png')`
                  }}
                >
                  <h2 className="text-xl font-bold mb-4 sm:ml-2 ml-0 sm:pl-0 pl-2">
                    {t('why_choose')}
                  </h2>
                  <div className="flex flex-col gap-3 pl-2">
                    <div
                      className="content page text-[#323232]"
                      dangerouslySetInnerHTML={{__html: bookmaker.why_choice}}
                    />
                  </div>
                  <div className="mt-4 mb-4 pl-2">
                    <button className="rounded-full bg-[#1877f2] px-8 py-2.5 focus:outline-none"  style={{
                        backgroundImage:
                          'linear-gradient(81deg, rgb(23, 167, 241) 0%, rgb(0, 101, 203) 100%)'
                      }}>
                      <Link
                      href={bookmaker.play_now}
                      className="flex items-center gap-1 no-underline text-white text-sm" 
                      >
                        <span>{t('register_now')}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 6l6 6l-6 6" />
                        </svg>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h2 className="flex items-center text-xl font-bold mb-4">
                  <img
                    alt="chevron alt"
                    loading="lazy"
                    width="20"
                    height="20"
                    className="mr-1"
                    src="/svg/ChevronRight.svg"
                  />{' '}
                  {t('review')} {data.title}
                </h2>
              </div> 
              {data.content && (
                <div className="content page text-[#323232]" dangerouslySetInnerHTML={{__html: data.content?.replace(new RegExp(Backend_url || '', 'g'), domain || '')}}/>
              )}
            </div>
          </div>
          {/* Sidebar (Right Column) */}
          <div className="hidden col-span-1 xl:block xl:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
