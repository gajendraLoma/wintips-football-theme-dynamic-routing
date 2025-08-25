"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Post } from "../../types/postByCat";
import Image from "next/image";
import { getFullImageUrl } from "@/lib/utils";
import Link from "next/link";
export default function PredectionList({ posts }: { posts: Post[] }) {
  const pathname = usePathname();

  // Show pagination if route contains "/soccer-predictions"
  const isSoccerPredictionsPage = pathname?.includes("/soccer-predictions");

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 cursor-pointer">
        {posts.map((post, i) => (
          <Link 
            href={post.slug}
            key={i}
            className="bg-white rounded-md shadow hover:shadow-md p-3 flex gap-4 items-start"
          >
            <div className="w-[117px] h-[60px] sm:w-[180px] sm:h-[90px] relative shrink-0">
              <Image
                src={getFullImageUrl(post.featured_image)}
                alt={post.title}
                width={180}
                height={90}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-800 hover:text-[#60a5fa] line-clamp-2">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>

      {isSoccerPredictionsPage && (
        <div className="flex justify-end items-center gap-2 mt-4 flex-wrap">
          <button className="px-3 py-1 rounded-full border text-gray-500 hover:text-[#fff] hover:bg-[#4CA5FF]">
            &laquo;
          </button>
          {[1, 2].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded-full border font-medium ${
                page === 2
                  ? "bg-[#4CA5FF] text-white border-[#4CA5FF]"
                  : "text-gray-700 hover:bg-[#4CA5FF] hover:text-[#fff]"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-2">...</span>
          {[4].map((page) => (
            <button
              key={page}
              className="px-3 py-1 rounded-full border text-gray-700 hover:text-[#fff] hover:bg-[#4CA5FF]"
            >
              {page}
            </button>
          ))}

          <button className="px-3 py-1 rounded-full border text-gray-700 hover:text-[#fff] hover:bg-[#4CA5FF]">
            9
          </button>
          <button className="px-3 py-1 rounded-full border text-gray-500 hover:text-[#fff] hover:bg-[#4CA5FF]">
            &raquo;
          </button>
        </div>
      )}
    </>
  );
}