"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function PredectionList() {
  const pathname = usePathname();

  const gridMatches = [
    "Rapid Wien vs Dundee United",
    "Rakow Czestochowa vs Maccabi Haifa",
    "Hajduk Split vs KS Dinamo Tirana",
    "Partizan Belgrade vs Hibernian",
  ];

  // Show pagination if route contains "/soccer-predictions"
  const isSoccerPredictionsPage = pathname?.includes("/soccer-predictions");

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 cursor-pointer ">
        {gridMatches.map((title, i) => (
          <div
            key={i}
            className="bg-white rounded-md shadow hover:shadow-md p-3 flex gap-4 items-start "
          >
            <div className="w-[117px] h-[60px] sm:w-[180px] sm:h-[90px] relative shrink-0">
              <img
                src="https://static.wintips.com/images/wintips-page/5-24-2025/atalanta-vs-parma-prediction.webp"
                alt={title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-800 hover:text-[#60a5fa]">
              {title}, Prediction & Betting Tips
            </h3>
          </div>
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
