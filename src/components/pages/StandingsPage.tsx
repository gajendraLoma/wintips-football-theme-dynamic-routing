// components/pages/StandingsPage.tsx
import Image from "next/image";
import {getTranslations} from 'next-intl/server';
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import { fetchMatchStandings, fetchMatchStandingsByLeague } from "@/apis";
import { TSStandingTableRow ,TSLeagueRankingPromotion } from "@/types/interface/getStandingsTypo";
interface StandingsPageProps {
  data: {
    title: string;
    content: string;
    league_id?: string;
  };
}

const imageBaseUrl = "https://5goal.vip";
export default async function StandingsPage({ data }: StandingsPageProps) {
  const t = await getTranslations();

  // Fetch data based on league_id or default standings
  let standingsData;
  if (data.league_id) {
    standingsData = await fetchMatchStandingsByLeague(data.league_id);
  } else {
    standingsData = await fetchMatchStandings();
  }

  // Handle error or no data
  if (!standingsData || "error" in standingsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold">{t("not_found")}</h1>
      </div>
    );
  }

  // Derive leagues and standingsByLeagues based on API response
  const leagues = Array.isArray(standingsData?.data) ? standingsData.data : [];
  const standingsByLeagues = data.league_id ? standingsData : null;

  const standingTables = standingsByLeagues?.result?.[0]?.standing?.tables?.[0]?.rows || [];
  const promotions = standingsByLeagues?.result?.[0]?.standing?.promotions || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex text-sm text-gray-500 mb-2">
                <Link href="/" className="text-blue-600 hover:underline">
                {t('home')}
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

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-800 mb-6">{data.title}</h1>

              {/* Content Area */}
           
                <div className="space-y-6">
                  {/* Render leagues data (standings-based) */}
                  {/* {leagues.length > 0 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {leagues.slice(0, 18).map((league: TLeague, index: number) => (
                          <div key={index} className="bg-gray-50 rounded p-4 shadow-sm border-gray-200">
                            <div className="flex items-center space-x-3 mb-3">
                              {league.logo && (
                                <div className="relative w-10 h-10">
                                  <Image
                                    src={getFullImageUrl(league.logo)}
                                    alt="League logo"
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              <h3 className="font-medium text-gray-800">{league.name}</h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}

                  {/* Render standingsByLeagues data (league-based with matches) */}
                  {standingsByLeagues && (
                    <div className="w-full bg-white rounded-2xl py-2">
                      <div className="w-full py-2">
                        <table className="w-full text-[#454745]">
                          <thead>
                            <tr>
                              <th className="w-[5%]"></th>
                              <th className="w-[50%] text-sm font-bold text-[#A2A3A2] text-left">Team</th>
                              <th className="w-[5%] text-sm font-bold text-[#A2A3A2]">MP</th>
                              <th className="w-[5%] text-sm font-bold text-[#A2A3A2]">W</th>
                              <th className="w-[5%] text-sm font-bold text-[#A2A3A2]">D</th>
                              <th className="w-[5%] text-sm font-bold text-[#A2A3A2]">L</th>
                              <th className="w-[5%] text-sm font-bold text-[#A2A3A2]">G</th>
                              <th className="w-[5%] text-sm font-bold text-[#A2A3A2]">PTS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center py-2"></td>
                            </tr>
                            {standingTables.length > 0 ? (
                              standingTables.map((row: TSStandingTableRow, index: number) => {
                                const promotion = promotions.find((promotion: TSLeagueRankingPromotion) => promotion.id === row.promotion_id);

                                return (
                                  <tr key={index} className="border-b last:border-b-0 text-[11px] sm:text-sm border-[#ECEFF3] hover:bg-[#275fe2a3] transition ease-linear">
                                    <td className="text-center py-2">
                                      <div className="w-full flex items-center justify-center">
                                        <div
                                          className={`min-h-5 min-w-5 max-h-6 max-w-6 rounded-full aspect-square ${promotion ? "text-white" : ""}`}
                                          style={promotion ? { backgroundColor: promotion.color } : {}}
                                        >
                                          {row.position}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-2">
                                      <div className="flex gap-2 items-center">
                                        <Image
                                          src={`${imageBaseUrl}${row.logo}`}
                                          alt="home logo"
                                          height={20}
                                          width={20}
                                          objectFit="contain"
                                        />
                                        <p>{row.team_name}</p>
                                      </div>
                                    </td>
                                    <td className="text-center py-2">{row.total}</td>
                                    <td className="text-center py-2">{row.won}</td>
                                    <td className="text-center py-2">{row.draw}</td>
                                    <td className="text-center py-2">{row.loss}</td>
                                    <td className="text-center py-2">{row.goals}:{row.goals_against}</td>
                                    <td className="text-center py-2">{row.points}</td>
                                  </tr>
                                );
                              })
                            ) : (
                              <p className="text-center py-4">Data not found!</p>
                            )}
                          </tbody>
                        </table>
                        <div className="flex flex-wrap py-2 gap-2">
                          {promotions.length > 0 ? (
                            promotions.map((promotion: TSLeagueRankingPromotion, index: number) => (
                              <div key={index} className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: promotion.color }}
                                ></div>
                                <p className="text-[12px] text-[#A2A3A2]">{promotion.name}</p>
                              </div>
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {leagues.length === 0 && !standingsByLeagues && (
                    <div className="py-8 text-center">
                      <div className="text-xl font-semibold text-gray-600 mb-2">
                        {t("no_data_found")}
                      </div>
                    </div>
                  )}
                </div>
             
            </div>
            {/* Content */}
           content: <p
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