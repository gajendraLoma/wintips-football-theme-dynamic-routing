'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {getFullImageUrl} from '@/lib/utils';

interface AidsProps {
  data?: {
    banner_middle?: {
      left_url: string;
      left_image: string;
      right_url: string;
      right_image: string;
    };
  };
}

export default function Aids({data}: AidsProps) {
  const t = useTranslations();

  if (
    !data?.banner_middle ||
    !data.banner_middle.left_url ||
    !data.banner_middle.left_image ||
    !data.banner_middle.right_url ||
    !data.banner_middle.right_image
  ) {
    return null;
  }

  const {left_url, left_image, right_url, right_image} = data?.banner_middle;

  // Normalize the image URLs
  const fullLeftImage = getFullImageUrl(left_image);
  const fullRightImage = getFullImageUrl(right_image);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <Link
        href={left_url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-[50px] sm:h-[80px] overflow-hidden rounded-md"
      >
        <Image
          src={fullLeftImage}
          alt="Left Advertisement Banner"
          fill
          className="object-cover"
          priority
        />
      </Link>
      <Link
        href={right_url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-[50px] sm:h-[80px] overflow-hidden rounded-md"
      >
        <Image
          src={fullRightImage}
          alt="Right Advertisement Banner"
          fill
          className="object-cover"
          priority
        />
      </Link>
    </div>
  );
}
