'use client';

import Image from 'next/image';
import Link from 'next/link';
import {RelatedPost} from '../../types/interface/getPostByCatTypo';
import {getFullImageUrl} from '@/lib/utils';
import 'swiper/css';
import 'swiper/css/navigation';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import {useTranslations} from 'next-intl';

export default function RelatedPosts({RelatedPostData}: {RelatedPostData: RelatedPost[];}) {
  const t = useTranslations();

  if (!RelatedPostData || RelatedPostData.length === 0) return null;
  return (
    <div className="mt-5 relatedPostSwiper">
      <h2 className="text-3xl font-semibold mb-4 capitalize">{t('related_posts')}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{clickable: true}}
        breakpoints={{
          640: {slidesPerView: 2},
          1024: {slidesPerView: 3}
        }}
        className="related-posts-swiper"
      >
        {RelatedPostData.map((post: RelatedPost, index: number) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-md grid gap-2 items-start group cursor-pointer relative">
              <Link href={`/${post.slug || ''}`} className="contents">
                <div className="relative shrink-0 overflow-hidden rounded-md h-48">
                  <Image
                    src={getFullImageUrl(post.featured_image)}
                    alt={post.title || 'Default Image'}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover rounded-[10px]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#60a5fa] line-clamp-2">
                  {post.title},
                </h3>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
