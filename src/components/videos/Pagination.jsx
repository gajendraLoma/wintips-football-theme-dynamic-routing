"use client";

export default function Pagination() {
  return (
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
  );
}
