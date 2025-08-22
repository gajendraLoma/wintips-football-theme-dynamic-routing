// components/pages/StandingsPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { TLeague } from '../../types/standings';
import { TMatchCompetition } from '../../types/standings';
import {
  fetchMatchStandings,
  fetchMatchStandingsByLeague
} from '@/apis/services/standings';
import Spinner from '../common/Loader';
import LeagueStandingsMatch from '../standings/LeagueStandingsMatch';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Sidebar from '@/components/layout/Sidebar';
import Link from 'next/link';
import { getFullImageUrl } from '@/lib/utils';

interface StandingsPageProps {
  data: {
    title: string;
    content: string;
    league_id?: string;
  };
}

export default function StandingsPage({ data }: StandingsPageProps) {
  const t = useTranslations();
  const [leagues, setLeagues] = useState<TLeague[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [standingsByLeagues, setStandingsByLeagues] = useState<TLeague[]>([]);


console.log("standingsByLeagues",standingsByLeagues)

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);

      try {
        if (data.league_id) {
          // Fetch by league
          const standingsData = await fetchMatchStandingsByLeague(data.league_id);
          if (standingsData) {
            setStandingsByLeagues(standingsData);
            setLeagues([]);
          }
        } else {
          // Fetch standings data
          const standingsData = await fetchMatchStandings();
          if (standingsData?.data) {
            setLeagues(standingsData.data);
            setStandingsByLeagues([]);
          } else {
            setLeagues([]);
          }
        }
      } catch (error) {
        console.error('Error fetching Standings:', error);
        setLeagues([]);
        setStandingsByLeagues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [data.league_id]);

  // Handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/images/placeholder-team-logo.png';
    target.onerror = null;
  };

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

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-800 mb-6">{data.title}</h1>

              {/* Content Area */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Render leagues data (standings-based) */}
                  {leagues.length > 0 && (
                    <div className="space-y-6">
                     
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {leagues.slice(0, 60).map((league: TLeague, index: number) => (
                          <div key={index} className="bg-gray-50 rounded p-4 shadow-sm  border-gray-200">
                            <div className="flex items-center space-x-3 mb-3">
                              {league.logo && (
                                <div className="relative w-10 h-10">
                                  <Image
                                    src={getFullImageUrl(league.logo)}
                                    alt={league.name || 'League logo'}
                                    fill
                                    className="object-contain"
                                    onError={handleImageError}
                                  />
                                </div>
                              )}
                              <h3 className="font-medium text-gray-800">{league.name}</h3>
                            </div>
                            {/* Add more league details here as needed */}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Render standingsByLeagues data (league-based with matches) */}
                  {standingsByLeagues.length > 0 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-700">{t('matches')}</h2>
                      {standingsByLeagues.map((league: any, index: number) => (
                        <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          {/* League Header */}
                          <div className="bg-green-100 px-4 py-3 flex items-center space-x-3">
                            {league.competition_logo && (
                              <div className="relative w-6 h-6">
                                <Image
                                  src={getFullImageUrl(league.competition_logo)}
                                  alt={league.competition_name || 'Competition logo'}
                                  fill
                                  className="object-contain"
                                  onError={handleImageError}
                                />
                              </div>
                            )}
                            <div className="font-semibold text-gray-800">
                              {league.competition_name}
                              {Number(league.round_num) > 0 && (
                                <span className="text-sm font-normal ml-2">
                                  {t('round')} {league.round_num}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Matches List */}
                          <div className="divide-y divide-gray-100">
                            {league.matches?.length > 0 ? (
                              league.matches.map((match: TMatchCompetition, matchIndex: number) => (
                                <LeagueStandingsMatch key={matchIndex} match={match} />
                              ))
                            ) : (
                              <div className="py-4 text-center text-gray-500">
                                {t('no_matches_available')}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Empty state */}
                  {leagues.length === 0 && standingsByLeagues.length === 0 && !loading && (
                    <div className="py-8 text-center">
                      <div className="text-xl font-semibold text-gray-600 mb-2">
                        {t('no_data_found')}
                      </div>
                      <p className="text-gray-500">{t('try_again_later')}</p>
                    </div>
                  )}
                </div>
              )}

          {/* Content */}
            <p
              className="content page text-[#323232]"
              dangerouslySetInnerHTML={{__html: data.content}}
            />
            </div>
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