"use client";

import { useState, useEffect } from "react";
import { fetchPostByCat } from "@/apis";
import { PostByCatResponse } from "@/types/interface/getPostByCatTypo";
import BigImageSection from "@/components/predection/BigImageSection";
import PredectionList from "@/components/predection/PredectionList";
import { TaxonomyItem } from "@/apis/services/getDataByLeague";
import { useTranslations } from "next-intl";
interface LeagueFilterProps {
  leagues: TaxonomyItem[];     
  initialMatches: PostByCatResponse;
}

export default function LeagueFilter({ leagues, initialMatches }: LeagueFilterProps) {
  const [activeLeague, setActiveLeague] = useState<string>("");
  const [matchData, setMatchData] = useState<PostByCatResponse>(initialMatches);
 const t =  useTranslations()
  useEffect(() => {
    if (activeLeague === "") {
      setMatchData(initialMatches); 
      return;
    }

    const getMatches = async () => {
      try {
        const matches = await fetchPostByCat("league", activeLeague, "match_predict", 16, 1);
        setMatchData(matches);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        console.log("error")
      }
    };
    getMatches();
  }, [activeLeague, initialMatches]);

  if (!matchData || !matchData.posts) {
    return <></>;
  }
  const mainMatch = matchData.posts[0];
  const sidebarMatches = matchData.posts.slice(1, 6);
  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* All option */}
        <span
          onClick={() => setActiveLeague("")}
          className={`px-3 py-1 text-sm rounded-full border cursor-pointer ${
            activeLeague === ""
              ? "bg-blue-600 text-white border-blue-600"
              : "text-gray-600 border-gray-300 hover:bg-blue-100"
          }`}
        >
        {t("all")}
        </span>
        {/* Dynamic leagues */}
        {leagues.map((league) => (
          <span
            key={league.slug}
            onClick={() => setActiveLeague(league.slug)}
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

      {/* Matches */}
        <BigImageSection mainMatch={mainMatch} sidebarMatches={sidebarMatches} />
          <div className="border-b my-4 hidden sm:block" />
        <PredectionList posts={matchData.posts.slice(6)} />
    </div>
  );
}
