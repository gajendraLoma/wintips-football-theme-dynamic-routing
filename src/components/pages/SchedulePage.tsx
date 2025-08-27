// components/pages/SchedulePage.tsx
import MatchScheduleScore from '../schedule/MatchScheduleScore';
import LeagueScheduleMatch from '../schedule/LeagueScheduleMatch';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import Sidebar from '@/components/layout/Sidebar';
import Link from 'next/link';
import {getFullImageUrl} from '@/lib/utils';
import {  
  TFLeague,
  TFMatch,
  TFCompetition,
  TFMatchCompetition } from "@/types/interface/getScheduleTypo";
// import {
//   TFLeague,
//   TFMatch,
//   TFCompetition,
//   TFMatchCompetition
// } from '../../types/interface/getScheduleTypo';
import {
  fetchMatchSchedule,
  fetchMatchScheduleByLeague
} from '@/apis';
interface SchedulePageProps {
  data: {
    title: string;
    content: string;
    league_id?: string;
  };
}

export default async function SchedulePage({data}: SchedulePageProps) {
  const t = await getTranslations();

  // Fetch data based on league_id or date
  let scheduleData;
  if (data.league_id) {
    scheduleData = await fetchMatchScheduleByLeague(data.league_id);
  } else {
    const activeDay = new Date().toISOString().split('T')[0];
    scheduleData = await fetchMatchSchedule(activeDay);
  }

  // Handle error or no data
  if (!scheduleData || 'error' in scheduleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold">{t('not_found')}</h1>
      </div>
    );
  }

  // Derive leagues and scheduleByLeagues based on API response
  const leagues = Array.isArray(scheduleData.result) ? scheduleData.result : [];
  const scheduleByLeagues = data.league_id
    ? Array.isArray(scheduleData)
      ? scheduleData
      : [scheduleData]
    : [];

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

              {/* Title & Description */}
              <h1 className="text-2xl font-bold mb-2">{data.title}</h1>

              <div className="bg-white rounded-2xl">
                <>
                  {/* Render leagues data (date-based) */}
                  {leagues.length > 0 && (
                    <div className="w-full py-2">
                      {leagues.map((league: TFLeague, index: number) => (
                        <div key={index} className="w-full">
                          <div className="group headerBg text-[#07302C] flex justify-between items-center py-2 px-4">
                            <div className="px-0 flex gap-4 items-center">
                              {league.league_logo && (
                                <div className="w-6 h-6 relative">
                                  <Image
                                    src={getFullImageUrl(league.league_logo)}
                                    alt="league logo"
                                    height={24}
                                    width={24}
                                  />
                                </div>
                              )}
                              <p className="text-sm font-bold">
                                {league.league_name}{' '}
                                {Number(league.league_round) > 0 && (
                                  <span>
                                    : {t('round')} {league.league_round}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="w-full px-0 sm:px-8">
                            <ul className="flex flex-col">
                              {league.fixtures?.length > 0 ? (
                                league.fixtures.map(
                                  (match: TFMatch, index: number) => (
                                    <MatchScheduleScore
                                      key={index}
                                      match={match}
                                    />
                                  )
                                )
                              ) : (
                                <li className="py-2 text-center">
                                  {t('no_matches_available')}
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render scheduleByLeagues data (league-based) */}
                  {scheduleByLeagues.length > 0 && (
                    <div className="w-full py-2">
                      {scheduleByLeagues.map(
                        (competition: TFCompetition, index: number) => (
                          <div key={index} className="w-full">
                            <div className="group headerBg text-[#07302C] flex justify-between items-center py-2 px-4">
                              <div className="px-0 flex gap-4 items-center">
                                {competition.competition_logo && (
                                  <div className="w-6 h-6 relative">
                                    <Image
                                      src={getFullImageUrl(
                                        competition.competition_logo
                                      )}
                                      alt="league logo"
                                      height={24}
                                      width={24}
                                    />
                                  </div>
                                )}
                                <p className="text-sm font-bold">
                                  {competition.competition_name}{' '}
                                  {Number(competition.round_num) > 0 && (
                                    <span>
                                      : {t('round')} {competition.round_num}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="w-full px-0 sm:px-8">
                              <ul className="flex flex-col">
                                {competition.matches?.length > 0 ? (
                                  competition.matches.map(
                                    (
                                      match: TFMatchCompetition,
                                      index: number
                                    ) => (
                                      <LeagueScheduleMatch
                                        key={index}
                                        match={match}
                                      />
                                    )
                                  )
                                ) : (
                                  <li className="py-2 text-center">
                                    {t('no_matches_available')}
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Show message when no data is available */}
                  {leagues.length === 0 && scheduleByLeagues.length === 0 && (
                    <div className="w-full py-4">
                      <div className="text-center text-xl font-bold">
                        {t('no_data_found')}
                      </div>
                    </div>
                  )}
                </>
              </div>
            </div>
            {/* Content */}
            content:{' '}
            <p
              className="content page text-[#323232]"
              dangerouslySetInnerHTML={{__html: data.content}}
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
