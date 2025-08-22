// components/pages/ResultPage.tsx
"use client";

import { useEffect, useState } from "react";
import {  TLeague, TMatch } from "../../types/results";
import { TMatchCompetition } from "../../types/results"; 
import {
  fetchMatchResult,
  fetchMatchResultByLeague,
} from "@/apis/services/results";
import Spinner from "../common/Loader";
import MatchResultScore from "../result/MatchResultScore"; 
import LeagueMatch from "../result/LeagueMatch";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import { getFullImageUrl } from "@/lib/utils";

// Define proper types for the component props
interface ResultPageProps {
  data: {
    title: string;
    content: string;
    league_id?: string;
  };
}
const imageBaseUrl = 'https://5goal.vip';

export default function ResultPage({ data }: ResultPageProps) {
  const t = useTranslations();
  const [activeDay, setActiveDay] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [leagues, setLeagues] = useState<TLeague[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [resultByLeagues, setResultByLeagues] = useState<TLeague[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      
      try {
        if (data.league_id) {
          // Fetch by league
          const resultsData = await fetchMatchResultByLeague(data.league_id);
          if (resultsData) {
            setResultByLeagues(resultsData);
            setLeagues([]); 
          }
        } else {
          // Fetch by date
          const resultsData = await fetchMatchResult(activeDay);
          if (resultsData?.result) {
            setLeagues(resultsData.result);
            setResultByLeagues([]);
          }
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        setLeagues([]);
        setResultByLeagues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [data.league_id, activeDay]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex text-sm text-gray-500 mb-2">
                <Link href="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="tabler-icon tabler-icon-chevron-right mx-1 relative bottom-[-3px]"
                >
                  <path d="M9 6l6 6l-6 6"></path>
                </svg>
                <span>{data.title}</span>
              </nav>

              {/* Title & Description */}
              <h1 className="text-2xl font-bold mb-2">{data.title}</h1>

              <div className="bg-white rounded-2xl">
                {loading ? (
                  <div className="w-full py-8 flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {/* Render leagues data (date-based) */}
                    {leagues.length > 0 && (
                      <div className="w-full py-2">
                        {leagues.map((league: TLeague, index: number) => (
                          <div key={index} className="w-full mb-6">
                            <div className="group headerBg text-[#07302C] flex justify-between items-center py-2 px-4">
                              <div className="px-0 flex gap-4 items-center">
                                {league.league_logo && (
                                  <div className="w-6 h-6 relative">
                                    <Image
                                        src={getFullImageUrl(league.league_logo)}
                                      alt="league logo"
                                      height={24}
                                      width={24}
                                   
                                      objectFit="contain"
                                    />
                                  </div>
                                )}
                                <p className="text-sm font-bold">
                                  {league.league_name}{" "}
                                  {Number(league.league_round) > 0 && (
                                    <span>
                                      : {t("round")} {league.league_round}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="w-full px-0 sm:px-8">
                              <ul className="flex flex-col">
                                {league.fixtures?.length > 0 ? (
                                  league.fixtures.map(
                                    (match: TMatch, index: number) => (
                                      <MatchResultScore key={index} match={match} />
                                    )
                                  )
                                ) : (
                                  <li className="py-2 text-center">
                                    {t("no_matches_available")}
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render resultByLeagues data (league-based) */}
                    {resultByLeagues.length > 0 && (
                      <div className="w-full py-2">
                        {resultByLeagues.map((league: any, index: number) => (
                          <div key={index} className="w-full mb-6">
                            <div className="group headerBg text-[#07302C] flex justify-between items-center py-2 px-4">
                              <div className="px-0 flex gap-4 items-center">
                                {league.competition_logo && (
                                  <div className="w-6 h-6 relative">
                                    <Image
                                      src={`${imageBaseUrl}${league.competition_logo}`} 
                                      alt="league logo"
                                      height={24}
                                      width={24}
                            
                                      objectFit="contain"
                                    />
                                  </div>
                                )}
                                <p className="text-sm font-bold">
                                  {league?.competition_name}{" "}
                                 
                                </p>
                              </div>
                            </div>
                            <div className="w-full px-0 sm:px-8">
                              <ul className="flex flex-col">
                                {league?.matches?.length > 0 ? (
                                  league.matches.map(
                                    (match: TMatchCompetition, index: number) => (
                                      <LeagueMatch key={index} match={match} />
                                    )
                                  )
                                ) : (
                                  <li className="py-2 text-center">
                                    {t("no_matches_available")}
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Show message when no data is available */}
                    {leagues.length === 0 && resultByLeagues.length === 0 && !loading && (
                      <div className="w-full py-4">
                        <div className="text-center text-xl font-bold">
                          {t("no_data_found")}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

             
            </div>
             {/* Content */}
      
               content : <p
                  className="content page text-[#323232]"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
           
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}