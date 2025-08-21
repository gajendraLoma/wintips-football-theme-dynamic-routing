"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function GridViewSection({ gridMatches }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {gridMatches.map((match, i) => (
        <div
          key={i}
          className="bg-white rounded-md grid gap-2 items-start group cursor-pointer relative"
        >
          {/* Image + Title Link */}
          <Link href={`/matches/${match.slug || ""}`} className="contents">
            {/* Image wrapper */}
            <div className="relative shrink-0 overflow-hidden rounded-md">
              <Image
                src="/images/volume-betting-tips-blog-card-grid.webp"
                alt={match.title || match}
                width={400}
                height={250}
                className="w-full h-full object-cover rounded-md"
                priority
              />

              {/* Category Tag Link inside image wrapper */}
              <Link
                href={`/category/${match.categorySlug || "default-category"}`}
                className="absolute bottom-2 left-2 inline-block bg-[#00000080] hover:bg-[#4CA5FF] p-1 rounded px-3 text-[12px] text-white transition-transform duration-300 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                Category Tag
              </Link>
            </div>

            {/* Title text */}
            <h3 className="text-sm sm:text-base font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#60a5fa]">
              {match.title || match}, Prediction & Betting Tips
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
