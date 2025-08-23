import Image from "next/image";
import Link from "next/link";
import { Post } from "../../types/postByCat";
import { getFullImageUrl } from "@/lib/utils";

export default function GridViewSection({ gridMatches }: { gridMatches: Post[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {gridMatches.map((match, i) => (
        <div
          key={i}
          className="bg-white rounded-md grid gap-2 items-start group cursor-pointer relative"
        >
          {/* Image + Title Link */}
          <Link href={`/${match.slug || ""}`} className="contents">
            {/* Image wrapper */}
            <div className="relative shrink-0 overflow-hidden rounded-md h-48">
              <Image
                src={getFullImageUrl(match.featured_image)}
                alt={match.title || "Default Image"}
                width={400}
                height={250}
                className="w-full h-full object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Category Tag Link inside image wrapper */}
              {/* <span
                className="absolute bottom-2 left-2 inline-block bg-[#00000080] hover:bg-[#4CA5FF] p-1 rounded px-3 text-[12px] text-white transition-transform duration-300 hover:scale-110"
              >
                Category Tag
              </span> */}
            </div>
            {/* Title text */}
            <h3 className="text-sm sm:text-base font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#60a5fa]">
              {match.title},
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}