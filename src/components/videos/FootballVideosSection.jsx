"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FootballVideosSection({ gridMatches }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {gridMatches.map((title, i) => (
        <Link
          key={i}
          href={`/matches/${title.slug || ""}`}
          className="bg-white rounded-md grid gap-2 items-start group cursor-pointer"
        >
          {/* Image wrapper */}
          <div className="relative shrink-0 overflow-hidden rounded-md">
            <Image
              src="/images/video-football.webp"
              alt={title}
              width={400}
              height={250}
              className="w-full h-full object-cover rounded-md"
            />

            {/* Player icon wrapper */}
            <div className="absolute bottom-2 left-2 inline-block transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/playerIcon.png"
                alt="Player"
                width={48}
                height={48}
                className="w-10 sm:w-12"
              />
            </div>
          </div>

          {/* Title text */}
          <p className="text-sm sm:text-base font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#60a5fa]">
            {title}, Prediction & Betting Tips
          </p>
        </Link>
      ))}
    </div>
  );
}
