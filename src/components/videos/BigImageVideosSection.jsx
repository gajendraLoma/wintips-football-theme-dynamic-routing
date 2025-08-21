"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BigImageVideosSection({ mainMatch, sidebarMatches }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* Left Content */}
      <div className="space-y-6">
        {/* Main Match Card */}
        <Link
          href={`/matches/${mainMatch.slug || ""}`}
          className="block bg-white rounded-md overflow-hidden shadow border group cursor-pointer"
        >
          <div className="relative overflow-hidden">
            {/* Main image  */}
            <Image
              src="/images/video-football-highlights.webp"
              alt={mainMatch.title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
              priority
            />

            {/* Player icon wrapper (hover zoom) */}
            <div className="absolute bottom-2 left-2 inline-block transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/playerIcon.png"
                alt="Player"
                width={56}
                height={56}
                className="w-12 sm:w-14"
              />
            </div>
          </div>

          {/* Title */}
          <div className="px-4 py-3 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#60a5fa]">
            {mainMatch.title}
          </div>
        </Link>
      </div>

      {/* Right Sidebar */}
      <div className="flex flex-col gap-3">
        {sidebarMatches.map((title, i) => (
          <Link
            key={i}
            href={`/matches/${title.slug || ""}`}
            className="bg-white rounded-md shadow p-2 flex gap-3 items-center group cursor-pointer"
          >
            {/* Thumbnail wrapper */}
            <div className="relative w-[117px] h-[57px] shrink-0 overflow-hidden rounded-md">
              <Image
                src="/images/video-football-highlights.webp"
                alt={title}
                width={117}
                height={60}
                className="w-full h-full object-cover rounded-md"
              />

              {/* Player icon wrapper (hover zoom) */}
              <div className="absolute bottom-1 left-1 inline-block transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/playerIcon.png"
                  alt="Player"
                  width={40}
                  height={40}
                  className="w-4"
                />
              </div>
            </div>

            {/* Text */}
            <p className="text-sm font-medium text-gray-900 leading-tight transition-colors duration-300 group-hover:text-[#60a5fa]">
              {title}, Prediction & Betting Tips
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
