'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  data?: {
    title?: string;
    content?: string;
    image?: string;
    banner_top?: {
      title: string;
      description: string;
      image: string;
      link: string;
    };
  };
}

export default function Hero({data}: HeroProps) {
  const t = useTranslations();

  if (
    !data?.banner_top ||
    !data.banner_top.title ||
    !data.banner_top.description ||
    !data.banner_top.image ||
    !data.banner_top.link
  ) {
    return null;
  }

  const {title, description, image, link} = data.banner_top;

  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full overflow-hidden rounded-[5px] h-[280px] md:p-[35px] md:h-[280px]">
        <Image src={image} alt={title} fill />
        <div className="absolute md:relative top-0 z-20 max-w-[550px] p-[10px] md:p-0 text-white">
          <h1 className="text-[19px] font-semibold uppercase leading-[25px]">
            {title}
          </h1>
          <div className="text-justify text-sm mt-2">
            <p>{description}</p>
          </div>

          <div>
            <Link
              href={link}
              target="_blank"
              className="group relative inline-flex items-center gap-5 mb-10 mt-5 h-[35px] w-[190px] justify-center rounded-full font-bold text-base shadow-lg text-white transition-all duration-200 overflow-hidden"
              style={{
                background:
                  'linear-gradient(rgb(0, 102, 204) 0%, rgb(0, 82, 163) 50%, rgb(0, 61, 122) 100%)',
                border: '2px solid rgb(77, 148, 255)'
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 rounded-full pointer-events-none"
                style={{
                  height: '50%',
                  background:
                    'linear-gradient(rgba(255, 255, 255, 0.3) 0%, transparent 100%)'
                }}
              ></div>
              <div className="flex items-center justify-center relative z-10 pb-[3px]">
                <div
                  className="w-6 h-6 rounded-full shadow-sm flex items-center justify-center transition-transform duration-1000 group-hover:scale-125 animate-pulse"
                  style={{
                    backgroundColor: 'rgb(37, 99, 235)',
                    border: '1px solid rgb(96, 165, 250)'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white"
                  >
                    <path d="M7.904 17.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047 -1.047a1.067 1.067 0 0 0 0 -1.509l-4.907 -4.907l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-13.582 -3.904l3.904 13.563z"></path>
                  </svg>
                </div>
                <span
                  className="ml-3 pt-[2px]"
                  style={{
                    textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px'
                  }}
                >
                  {t('joinNow')}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
