"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ListViewSection({ listMatches }) {
  const blogData = [
    {
      text: "How to play series soccer tips - How to make $100 a day",
      slug: "how-to-play-series-soccer-tips",
    },
    {
      text: "Top 7 best betting sites for 18 year olds & Gambling sites for 18+",
      slug: "top-7-best-betting-sites-for-18-year-olds",
    },
    {
      text: "The best number 17 soccer players in the world",
      slug: "best-number-17-soccer-players",
    },
    {
      text: "Who is the shortest goalkeeper in Premier League 2023/24 season?",
      slug: "shortest-goalkeeper-premier-league-2023-24",
    },
    {
      text: "The best Dropping Odds strategy - Tips and predictions",
      slug: "best-dropping-odds-strategy",
    },
    {
      text: "Top 3 Best Dropping Odds sites in 2025",
      slug: "top-3-dropping-odds-sites-2025",
    },
    {
      text: "A Guide to Depositing at 188Bet in just a few simple steps",
      slug: "guide-to-depositing-at-188bet",
    },
    {
      text: "Simple and fast W88 withdrawal guide",
      slug: "w88-withdrawal-guide",
    },
    {
      text: "How to withdraw F88B for the first time?",
      slug: "how-to-withdraw-f88b",
    },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left List Section */}
          {/* <div className="w-full lg:w-2/3"></div> */}
        <div className="w-full">
          <div className="space-y-6">
            {listMatches.slice(0, 9).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 group cursor-pointer"
              >
                {/* Image wrapper with category tag */}
                <div className="relative w-[10rem] h-[6rem] flex-shrink-0 rounded overflow-hidden">
                  <Link
                    href={`/matches/${item.slug || ""}`}
                    className="block w-full h-full"
                  >
                    <Image
                      src={item.cover}
                      alt={item.title}
                      width={128}
                      height={80}
                      className="object-cover w-full h-full rounded"
                      priority={i === 0} // priority for first image to optimize loading
                    />
                  </Link>

                  <Link
                    href={`/category/${
                      item.categorySlug || "default-category"
                    }`}
                    className="absolute bottom-2 left-2 inline-block bg-[#00000080] hover:bg-[#4CA5FF] p-1 rounded px-2 text-[10px] text-white transition-transform duration-300 hover:scale-110 z-10"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Category: ${
                      item.categorySlug || "default-category"
                    }`}
                  >
                    Category Tag
                  </Link>
                </div>

                {/* Title + description (clickable) */}
                <div className="flex flex-col justify-center">
                  <Link
                    href={`/matches/${item.slug || ""}`}
                    className="line-clamp-2 text-[16px] font-bold text-gray-800 transition-colors duration-300 group-hover:text-[#60a5fa]"
                    aria-label={`Go to details for ${item.title}`}
                  >
                <h3>{item.title}</h3>
                  </Link>
                  <p className="text-[15px] font-medium text-gray-800 mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Most Popular Section */}
        {/* <div className="w-full lg:w-1/3">
          <div className="space-y-2">
            <h3 className="text-lg text-[#4480d4] font-bold mb-3">
              Most popular
            </h3>
            <ul className="list-inside text-sm text-gray-700 space-y-1">
              {blogData.map(({ text, slug }, index) => (
                <li
                  key={slug}
                  className="border-b border-gray-300 last:border-b-0"
                >
                  <Link
                    href={`/matches/${slug}`}
                    className="flex items-center gap-2 transition-colors duration-300 group py-2"
                    aria-label={`Go to article: ${text}`}
                  >
                    <span className="p-3 text-3xl font-bold tabular-nums select-none text-gray-400 group-hover:text-[#60a5fa]">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 group-hover:text-[#60a5fa]">
                      {text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}
