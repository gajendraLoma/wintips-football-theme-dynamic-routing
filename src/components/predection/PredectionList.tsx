'use client';

import React from 'react';
import {Post} from '../../types/interface/getPostByCatTypo';
import Image from 'next/image';
import {getFullImageUrl} from '@/lib/utils';
import Link from 'next/link';
export default function PredectionList({posts}: {posts: Post[]}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 mb-6 cursor-pointer pt-3 lg:pt-0">
        {posts.map((post, i) => (
          <Link
            href={post.slug}
            key={i}
            className="bg-white rounded border p-3 flex gap-4 items-start"
          >
            <div className="w-[117px] h-[60px] sm:w-[180px] sm:h-[90px] relative shrink-0">
              <Image
                src={getFullImageUrl(post.featured_image)}
                alt={post.title}
                width={180}
                height={90}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 hover:text-[#60a5fa] line-clamp-1 lg:line-clamp-2 mb-2">
                {post.title}
              </h3>
              <p className="text-xs font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#60a5fa] line-clamp-2">
                {post.des}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
