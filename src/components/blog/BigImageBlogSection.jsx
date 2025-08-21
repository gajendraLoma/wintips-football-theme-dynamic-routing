"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BigImageBlogSection({ mainMatch, sidebarMatches }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* Left Content */}
      <div className="space-y-6">
        {/* Main Match Card */}
        <div className="block bg-white rounded-md overflow-hidden shadow group cursor-pointer">
          <div className="relative overflow-hidden">
            {/* Main image Link */}
            <Link
              href={`/matches/${mainMatch.slug || ""}`}
              className="block w-full h-full"
            >
              <Image
                src="/images/volume-betting-tips-blog.webp"
                alt={mainMatch.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </Link>

            {/* Category Tag Link */}
            <Link
              href={`/category/${mainMatch.categorySlug || "default-category"}`}
              className="absolute bottom-2 left-2 inline-block bg-[#00000080] hover:bg-[#4CA5FF] p-1 rounded px-3 text-[12px] text-white transition-transform duration-300 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              Category Tag
            </Link>
          </div>

          {/* Title Link */}
          <Link
            href={`/matches/${mainMatch.slug || ""}`}
            className="block px-4 py-3 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#60a5fa]"
          >
           <h3> {mainMatch.title}</h3>
          </Link>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex flex-col gap-3">
        <div className="block bg-white rounded-md overflow-hidden group cursor-pointer pb-3">
          <div className="relative overflow-hidden">
            {/* Sidebar image Link */}
            <Link
              href={`/matches/${sidebarMatches.slug || ""}`}
              className="block w-full h-full"
            >
              <Image
                src="/images/volume-betting-tips-blog-card.webp"
                alt={sidebarMatches.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </Link>

            {/* Category Tag Link */}
            <Link
              href={`/category/${
                sidebarMatches.categorySlug || "default-category"
              }`}
              className="absolute bottom-2 left-2 inline-block bg-[#00000080] hover:bg-[#4CA5FF] p-1 rounded px-3 text-[12px] text-white transition-transform duration-300 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              Category Tag
            </Link>
          </div>

          {/* Title + Desc Link */}
          <Link
            href={`/matches/${sidebarMatches.slug || ""}`}
            className="block my-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#60a5fa]"
          >
         <h3>   {sidebarMatches.title}</h3>
          </Link>
          <Link
            href={`/matches/${sidebarMatches.slug || ""}`}
            className="block my-2 max-md:line-clamp-4 text-base line-clamp-5"
          >
            {sidebarMatches.desc}
          </Link>
        </div>
      </div>
    </div>
  );
}
