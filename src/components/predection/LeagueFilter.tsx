"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchPostByCat } from "@/apis";
import { PostByCatResponse } from "@/types/interface/getPostByCatTypo";
import BigImageSection from "@/components/predection/BigImageSection";
import PredectionList from "@/components/predection/PredectionList";
import { TaxonomyItem } from "@/apis/services/getDataByLeague";
import { useTranslations } from "next-intl";
import Pagination from "@/components/common/Pagination";
interface LeagueFilterProps {
  leagues: TaxonomyItem[];
  initialMatches: PostByCatResponse;
}
const PER_PAGE = 16;
export default function LeagueFilter({
  leagues,
  initialMatches,
}: LeagueFilterProps) {
  const t = useTranslations();

  const [activeLeague, setActiveLeague] = useState<string>("");
  const [matchData, setMatchData] = useState<PostByCatResponse>(initialMatches);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPage = useMemo(
    () => Math.ceil((matchData?.total_posts || 0) / PER_PAGE),
    [matchData?.total_posts]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchPostByCat(
          "league",
          activeLeague, // "" means all
          "match_predict",
          PER_PAGE,
          currentPage
        );
        setMatchData(res);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
     console.log("finally")
      }
    };
    load();
  }, [activeLeague, currentPage]);

  // Handlers
  const handleLeagueClick = (slug: string) => {
    setActiveLeague(slug);
    setCurrentPage(1);
  };

  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  // Safe-guards
  if (!matchData || !Array.isArray(matchData.posts)) return null;
  const posts = matchData.posts;
  const mainMatch = posts[0];
  const sidebarMatches = posts?.slice(1, 6);
  const rest = posts?.slice(6);

  return (
    <div>
      {/* League Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span
          onClick={() => handleLeagueClick("")}
          className={`px-3 py-1 text-sm rounded-full border cursor-pointer ${
            activeLeague === ""
              ? "bg-blue-600 text-white border-blue-600"
              : "text-gray-600 border-gray-300 hover:bg-blue-100"
          }`}
        >
          {t("all")}
        </span>

        {leagues.map((league) => (
          <span
            key={league.slug}
            onClick={() => handleLeagueClick(league.slug)}
            className={`px-3 py-1 text-sm rounded-full border cursor-pointer ${
              activeLeague === league.slug
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {league.title}
          </span>
        ))}
      </div>

      {/* Data blocks */}
      <BigImageSection
            mainMatch={mainMatch}
            sidebarMatches={sidebarMatches}
          />
          <div className="border-b my-4 hidden sm:block" />
          <PredectionList posts={rest} />

          {totalPage > 1 && (
            <div className="mt-6">
              <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
    </div>
  );
}
