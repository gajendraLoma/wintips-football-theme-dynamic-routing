"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../types/interface/getPostByCatTypo";
import { getFullImageUrl } from "@/lib/utils";
export default function BigImageSection({ mainMatch, sidebarMatches }: { mainMatch: Post; sidebarMatches: Post[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* Left Content */}
      <div className="space-y-6">
        {/* Main Match Card */}
        <Link
          href={`/${mainMatch.slug || ""}`}
          className="block bg-white rounded-md overflow-hidden shadow border group cursor-pointer"
        >
          <div className="relative overflow-hidden">
            {/* Main image */}
            <Image
              src={getFullImageUrl(mainMatch.featured_image) || "/images/video-football-highlights.webp"}
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
          <h3 className="px-4 py-3 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#60a5fa]">
            {mainMatch.title}
          </h3>
        </Link>
      </div>

      {/* Right Sidebar */}
      <div className="flex flex-col gap-3">
        {sidebarMatches.map((match, i) => (
          <Link
            key={i}
            href={`/${match.slug || ""}`}
            className="bg-white rounded-md shadow p-2 flex gap-3 items-center group cursor-pointer"
          >
            {/* Thumbnail wrapper */}
            <div className="relative w-[117px] h-[57px] shrink-0 overflow-hidden rounded-md">
              <Image
                src={getFullImageUrl(match.featured_image) || "/images/video-football-highlights.webp"}
                alt={match.title}
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
            <h3 className="text-sm font-medium text-gray-900 leading-tight transition-colors duration-300 group-hover:text-[#60a5fa]">
              {match.title}, Prediction & Betting Tips
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}