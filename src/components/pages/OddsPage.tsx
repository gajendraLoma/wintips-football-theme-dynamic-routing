// components/pages/OddsPage.tsx

'use client';
import moment from 'moment';
import 'moment/locale/vi';
import 'moment-timezone';
import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Link from 'next/link';

// Define interfaces for type safety
interface OddValue {
  value: string;
  odd: string;
  handicap?: string;
  main?: boolean;
  suspended: boolean;
}

interface Odd {
  id: number;
  name: string;
  values: OddValue[];
}

interface Match {
  status: {long: string; elapsed?: number};
  status_short: string;
  goals_home?: number;
  goals_away?: number;
  home_name: string;
  away_name: string;
  match_id: string;
  timestamp?: number;
  odds?: Odd[];
  asian_handicap?: {value: string; odd: string}[];
  goal_ou?: {value: string; odd: string}[];
  full_1x2?: {value: string; odd: string}[];
  asian_handicap_1st?: {value: string; odd: string}[];
  goal_ou_1st?: {value: string; odd: string}[];
  half_1x2?: {value: string; odd: string}[];
}

interface League {
  league_name: string;
  fixtures: Match[];
}

interface OddsData {
  total: number;
  result: League[];
}

export default function OddsPage({data}: {data: any}) {
  const [oddsPreMatch, setOddsPreMatch] = useState<OddsData | null>(null);
  const [oddsLive, setOddsLive] = useState<OddsData | null>(null);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loadingLive, setLoadingLive] = useState(true);
  const [reset, setReset] = useState(false);
  const t = useTranslations();
  const [txtPlaceholder, setTxtPlaceholder] = useState(
    t('searchTeamPlaceholder')
  );

  const [showReset, setShowReset] = useState(false);
  const dateSelected = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeAccordions, setActiveAccordions] = useState<string[]>([
    '0',
    '1'
  ]);

  const domain = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  const Backend_url = process.env.NEXT_PUBLIC_API_BASE_URL; 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(max-width: 768px)');
      setIsMobile(media.matches);

      const handler = () => setIsMobile(media.matches);
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    setReset(false);
    setLoadingFirst(true);
    setLoadingLive(true);
    fetchData().then((oddsPreMatch) => {
      setOddsPreMatch(oddsPreMatch);
      setLoadingFirst(false);
    });

    fetchDataLive().then((oddsLive) => {
      setOddsLive(oddsLive);
      setLoadingLive(false);
    });
  }, [reset]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `https://api2023.5goal.com/wp-json/football/odds_live`,
          {
            method: 'POST'
          }
        );
        if (res.ok) {
          const oddsLive: OddsData = await res.json();
          setOddsLive(oddsLive);
        } else {
          console.error('Failed to fetch live odds:', res.status);
        }
      } catch (error) {
        console.error('Error fetching live odds in interval:', error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function fetchData(): Promise<OddsData | null> {
    try {
      const res = await fetch(`https://api2.5goall.com/odds-pre-match`, {
        method: 'GET'
      });
      if (!res.ok) {
        console.error('Failed to fetch pre-match odds:', res.status);
        return null;
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching pre-match odds:', error);
      return null;
    }
  }

  async function fetchDataLive(): Promise<OddsData | null> {
    try {
      const res = await fetch(
        `https://api2023.5goal.com/wp-json/football/odds_live`,
        {
          method: 'POST'
        }
      );
      if (!res.ok) {
        console.error('Failed to fetch live odds:', res.status);
        return null;
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching live odds:', error);
      return null;
    }
  }

  async function handleReset() {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setReset(true);
    setShowReset(false);
    setTxtPlaceholder(t('searchTeamPlaceholder'));
  }

  async function handleSearchClick() {
    const value = searchInputRef.current?.value || '';

    if (!value) {
      setTxtPlaceholder(t('enterSearchKeyword'));
      return;
    }

    setShowReset(true);
    setLoadingFirst(true);

    try {
      const queryParams = new URLSearchParams();
      queryParams.append('date', dateSelected);
      queryParams.append('keyword', value);

      const url = new URL(`https://api2.5goall.com/oddSearch`);
      url.search = queryParams.toString();

      const res = await fetch(url.toString(), {
        method: 'GET'
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const oddsPreMatch: OddsData = await res.json();
      setOddsPreMatch(oddsPreMatch);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoadingFirst(false);
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  }

  const toggleAccordion = (eventKey: string) => {
    setActiveAccordions((prev) =>
      prev.includes(eventKey)
        ? prev.filter((key) => key !== eventKey)
        : [...prev, eventKey]
    );
  };

  useEffect(() => {
    setTxtPlaceholder(t('searchTeamPlaceholder'));
  }, [t]);

  // Helper function to safely parse float values
  const safeParseFloat = (value: string | undefined): string => {
    if (!value) return '0.00';
    const parsed = parseFloat(value);
    return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
  };

  // Helper function to safely extract handicap value
  const getHandicapValue = (value: string | undefined): string => {
    if (!value) return '0';
    const match = value.match(/[-.\d]+/g);
    return match ? match[0] : '0';
  };

  return (
    <div className="flex-1 bg-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-2">
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
            className="tabler-icon tabler-icon-chevron-right mx-1 relative"
          >
            <path d="M9 6l6 6l-6 6"></path>
          </svg>
          <span>{data.title}</span>
        </nav>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      
        {/* Odd data */}
        {isMobile ? (
          <>
            {/* Mobile View */}
            <div className="MOB block md:hidden main-wrap p-0 container mx-auto w-full">
              <div className="main-wrap container">
                <div className="row">
                  <div className="home main-content-mobile col-12">
                    <div className="football-result row mx-0 px-0">
                      <div className="home-odds-table-mobile pt-3">
                        <div className="search-box-new searchInput flex items-center relative justify-center mb-2">
                          <Image
                            src="/images/Search_page_ranking.webp"
                            className="Search_page_ranking_icon"
                            width={24}
                            height={24}
                            alt="Search_page_ranking"
                          />
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder={txtPlaceholder}
                            id="txt-search"
                            className="form-control border-0 w-full px-3 py-2 rounded-md"
                            onKeyPress={handleKeyPress}
                            ref={searchInputRef}
                          />
                          {!showReset && (
                            <button
                              className="btn Arrow_right_rankings_icon"
                              type="button"
                              onClick={handleSearchClick}
                            >
                              <Image
                                src="/images/Arrow_right_rankings.webp"
                                width={25}
                                height={24}
                                alt="arrow"
                              />
                            </button>
                          )}
                          {showReset && (
                            <div
                              className="btn-reset ms-3 px-3 inline-flex items-center justify-center cursor-pointer"
                              onClick={handleReset}
                            >
                              X
                            </div>
                          )}
                        </div>

                        {!loadingLive && (
                          <div className="live-odds pt-3">
                            <div
                              className="px-2 py-1"
                              style={{
                                background:
                                  'linear-gradient(to right, rgba(39, 95, 226, .64) 0%, rgba(26, 34, 45, 0) 100%)',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: '600',
                                borderRadius: '8px 8px 0 0'
                              }}
                            >
                              {t('onlineBookmakerOdds')}
                            </div>
                            <div
                              className="bg-white rounded-b-lg overflow-hidden"
                              style={{borderRadius: '0 0 8px 8px'}}
                            >
                              <div className="flex bg-gray-100 text-sm font-semibold border-b border-gray-200 clipBg">
                                <div
                                  className="px-2 py-1 text-center"
                                  style={{width: '50px'}}
                                >
                                  {t('time')}
                                </div>
                                <div className="px-2 py-1 flex-1">
                                  {t('match')}
                                </div>
                                <div
                                  className="px-2 py-1 text-center"
                                  style={{width: '85px'}}
                                >
                                  {t('handicap')}
                                </div>
                                <div
                                  className="px-2 py-1 text-center"
                                  style={{width: '88px'}}
                                >
                                  {t('overUnder')}
                                </div>
                                <div
                                  className="px-2 py-1 text-center"
                                  style={{width: '55px'}}
                                >
                                  {t('oneXTwo')}
                                </div>
                              </div>
                              <div>
                                {loadingLive ? (
                                  <div className="p-4">
                                    <div className="animate-pulse bg-gray-300 rounded h-24 w-full"></div>
                                  </div>
                                ) : oddsLive && oddsLive.total > 0 ? (
                                  oddsLive.result.map((league) =>
                                    league.fixtures.map((match, i) =>
                                      match.status.long !== 'Match Finished' &&
                                      match.status_short !== 'FT' ? (
                                        <div
                                          key={i}
                                          className={`border-b border-gray-200 ${
                                            i % 2 === 0
                                              ? 'even bg-gray-50'
                                              : 'bg-white'
                                          }`}
                                        >
                                          {/* Full Match Row */}
                                          <div className="flex items-center">
                                            <div
                                              className="date text-center px-2 py-1"
                                              style={{width: '50px'}}
                                            >
                                              <div>
                                                <span
                                                  style={{fontSize: '12px'}}
                                                >
                                                  {(match.goals_home ?? 0) +
                                                    '-' +
                                                    (match.goals_away ?? 0)}
                                                </span>
                                                <span
                                                  style={{
                                                    color: '#c00',
                                                    fontWeight: 'normal',
                                                    fontSize: '13px'
                                                  }}
                                                >
                                                  {match.status_short ===
                                                    '1H' ||
                                                  match.status_short === '2H'
                                                    ? `${match.status.elapsed ?? ''}'`
                                                    : match.status_short ===
                                                          'NS' &&
                                                        match.status.elapsed !=
                                                          null
                                                      ? `${match.status.elapsed}'`
                                                      : match.status_short}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="club px-2 py-1 flex-1">
                                              <div className="flex flex-col">
                                                <span>{match.home_name}</span>
                                                <span>{match.away_name}</span>
                                                <span>{t('draw')}</span>
                                              </div>
                                            </div>
                                            <div
                                              className="full-handicap px-2 py-1 text-right"
                                              style={{width: '85px'}}
                                            >
                                              {match.odds?.find(
                                                (odd) => odd.id === 33
                                              ) ? (
                                                match.odds
                                                  .find((odd) => odd.id === 33)
                                                  ?.values.find(
                                                    (value) =>
                                                      value.main === true &&
                                                      value.value === 'Home'
                                                  )?.handicap ? (
                                                  <div>
                                                    <div className="mb-1">
                                                      <span>
                                                        {safeParseFloat(
                                                          match.odds
                                                            .find(
                                                              (odd) =>
                                                                odd.id === 33
                                                            )
                                                            ?.values.find(
                                                              (value) =>
                                                                value.main ===
                                                                  true &&
                                                                value.value ===
                                                                  'Home'
                                                            )?.handicap
                                                        )}
                                                      </span>
                                                      <span className="border-dotted">
                                                        {safeParseFloat(
                                                          match.odds
                                                            .find(
                                                              (odd) =>
                                                                odd.id === 33
                                                            )
                                                            ?.values.find(
                                                              (value) =>
                                                                value.main ===
                                                                  true &&
                                                                value.value ===
                                                                  'Home'
                                                            )?.odd
                                                        )}
                                                      </span>
                                                    </div>
                                                    <div>
                                                      <span className="border-dotted">
                                                        {safeParseFloat(
                                                          match.odds
                                                            .find(
                                                              (odd) =>
                                                                odd.id === 33
                                                            )
                                                            ?.values.find(
                                                              (value) =>
                                                                value.main ===
                                                                  true &&
                                                                value.value ===
                                                                  'Away'
                                                            )?.odd
                                                        )}
                                                      </span>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div>
                                                    <div className="mb-1">
                                                      <span>
                                                        {safeParseFloat(
                                                          match.odds.find(
                                                            (odd) =>
                                                              odd.id === 33
                                                          )?.values[0]?.handicap
                                                        )}
                                                      </span>
                                                      <span className="border-dotted">
                                                        {safeParseFloat(
                                                          match.odds.find(
                                                            (odd) =>
                                                              odd.id === 33
                                                          )?.values[0]?.odd
                                                        )}
                                                      </span>
                                                    </div>
                                                    <div>
                                                      <span className="border-dotted">
                                                        {safeParseFloat(
                                                          match.odds.find(
                                                            (odd) =>
                                                              odd.id === 33
                                                          )?.values[1]?.odd
                                                        )}
                                                      </span>
                                                    </div>
                                                  </div>
                                                )
                                              ) : null}
                                            </div>
                                            <div
                                              className="full-ou px-2 py-1 text-right"
                                              style={{width: '88px'}}
                                            >
                                              {match.odds?.find(
                                                (odd) => odd.id === 25
                                              ) && (
                                                <div>
                                                  <div className="mb-1">
                                                    <span>
                                                      {safeParseFloat(
                                                        match.odds.find(
                                                          (odd) => odd.id === 25
                                                        )?.values[0]?.handicap
                                                      )}
                                                    </span>
                                                    <span className="lblOver">
                                                      o
                                                    </span>
                                                    <span className="border-dotted">
                                                      {safeParseFloat(
                                                        match.odds.find(
                                                          (odd) => odd.id === 25
                                                        )?.values[0]?.odd
                                                      )}
                                                    </span>
                                                  </div>
                                                  <div>
                                                    <span className="lblUnder">
                                                      u
                                                    </span>
                                                    <span className="border-dotted">
                                                      {safeParseFloat(
                                                        match.odds.find(
                                                          (odd) => odd.id === 25
                                                        )?.values[1]?.odd
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            <div
                                              className="full-1x2 px-2 py-1 text-center"
                                              style={{width: '55px'}}
                                            >
                                              {match.odds?.find(
                                                (odd) => odd.id === 59
                                              ) && (
                                                <div className="flex flex-col">
                                                  <span className="bg-full mb-2">
                                                    {safeParseFloat(
                                                      match.odds.find(
                                                        (odd) => odd.id === 59
                                                      )?.values[0]?.odd
                                                    )}
                                                  </span>
                                                  <span className="bg-full mb-2">
                                                    {safeParseFloat(
                                                      match.odds.find(
                                                        (odd) => odd.id === 59
                                                      )?.values[2]?.odd
                                                    )}
                                                  </span>
                                                  <span className="bg-full">
                                                    {safeParseFloat(
                                                      match.odds.find(
                                                        (odd) => odd.id === 59
                                                      )?.values[1]?.odd
                                                    )}
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          {/* First Half Label */}
                                          <div
                                            className="odds-label text-center text-sm border-t border-gray-200 py-1"
                                            style={{fontSize: '12px'}}
                                          >
                                            {t('firstHalf')}
                                          </div>
                                          {/* First Half Row */}
                                          <div className="flex items-center">
                                            <div className="club px-2 py-1 flex-1">
                                              <div className="flex flex-col">
                                                <span className="mb-1">
                                                  {match.home_name}
                                                </span>
                                                <span className="mb-1">
                                                  {match.away_name}
                                                </span>
                                                <span>{t('draw')}</span>
                                              </div>
                                            </div>
                                            <div
                                              className="half-handicap px-2 py-1 text-right"
                                              style={{width: '85px'}}
                                            >
                                              {match.odds?.find(
                                                (odd) => odd.id === 17
                                              ) ? (
                                                match.odds
                                                  .find((odd) => odd.id === 17)
                                                  ?.values.find(
                                                    (value) =>
                                                      value.main === true &&
                                                      value.value === 'Home'
                                                  )?.handicap ? (
                                                  <div>
                                                    <div className="mb-1">
                                                      <span>
                                                        {safeParseFloat(
                                                          match.odds
                                                            .find(
                                                              (odd) =>
                                                                odd.id === 17
                                                            )
                                                            ?.values.find(
                                                              (value) =>
                                                                value.main ===
                                                                  true &&
                                                                value.value ===
                                                                  'Home'
                                                            )?.handicap
                                                        )}
                                                      </span>
                                                      <span className="border-dotted">
                                                        {safeParseFloat(
                                                          match.odds
                                                            .find(
                                                              (odd) =>
                                                                odd.id === 17
                                                            )
                                                            ?.values.find(
                                                              (value) =>
                                                                value.main ===
                                                                  true &&
                                                                value.value ===
                                                                  'Home'
                                                            )?.odd
                                                        )}
                                                      </span>
                                                    </div>
                                                    <div>
                                                      <span className="border-dotted">
                                                        {safeParseFloat(
                                                          match.odds
                                                            .find(
                                                              (odd) =>
                                                                odd.id === 17
                                                            )
                                                            ?.values.find(
                                                              (value) =>
                                                                value.main ===
                                                                  true &&
                                                                value.value ===
                                                                  'Away'
                                                            )?.odd
                                                        )}
                                                      </span>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div>
                                                    <div className="mb-1">
                                                      <span>
                                                        {safeParseFloat(
                                                          match.odds.find(
                                                            (odd) =>
                                                              odd.id === 17
                                                          )?.values[0]?.handicap
                                                        )}
                                                      </span>
                                                      <span className="border-dotted">
                                                        {safeParseFloat(
                                                          match.odds.find(
                                                            (odd) =>
                                                              odd.id === 17
                                                          )?.values[0]?.odd
                                                        )}
                                                      </span>
                                                    </div>
                                                    <div>
                                                      <span className="border-dotted">
                                                        {safeParseFloat(
                                                          match.odds.find(
                                                            (odd) =>
                                                              odd.id === 17
                                                          )?.values[1]?.odd
                                                        )}
                                                      </span>
                                                    </div>
                                                  </div>
                                                )
                                              ) : null}
                                            </div>
                                            <div
                                              className="half-ou px-2 py-1 text-right"
                                              style={{width: '88px'}}
                                            >
                                              {match.odds?.find(
                                                (odd) => odd.id === 49
                                              ) && (
                                                <div>
                                                  <div className="mb-1">
                                                    <span>
                                                      {safeParseFloat(
                                                        match.odds.find(
                                                          (odd) => odd.id === 49
                                                        )?.values[0]?.handicap
                                                      )}
                                                    </span>
                                                    <span className="lblOver">
                                                      o
                                                    </span>
                                                    <span className="border-dotted">
                                                      {safeParseFloat(
                                                        match.odds.find(
                                                          (odd) => odd.id === 49
                                                        )?.values[0]?.odd
                                                      )}
                                                    </span>
                                                  </div>
                                                  <div>
                                                    <span className="lblUnder">
                                                      u
                                                    </span>
                                                    <span className="border-dotted">
                                                      {safeParseFloat(
                                                        match.odds.find(
                                                          (odd) => odd.id === 49
                                                        )?.values[1]?.odd
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            <div
                                              className="half-1x2 px-2 py-1 text-center"
                                              style={{width: '55px'}}
                                            >
                                              {match.odds?.find(
                                                (odd) => odd.id === 19
                                              ) && (
                                                <div className="flex flex-col">
                                                  <span className="bg-full mb-2">
                                                    {safeParseFloat(
                                                      match.odds.find(
                                                        (odd) => odd.id === 19
                                                      )?.values[0]?.odd
                                                    )}
                                                  </span>
                                                  <span className="bg-full mb-2">
                                                    {safeParseFloat(
                                                      match.odds.find(
                                                        (odd) => odd.id === 19
                                                      )?.values[2]?.odd
                                                    )}
                                                  </span>
                                                  <span className="bg-full">
                                                    {safeParseFloat(
                                                      match.odds.find(
                                                        (odd) => odd.id === 19
                                                      )?.values[1]?.odd
                                                    )}
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ) : null
                                    )
                                  )
                                ) : (
                                  <div className="text-center txt-dark p-4">
                                    {t('noMatchesOngoing')}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div
                          className="px-2 py-1"
                          style={{
                            background:
                              'linear-gradient(to right, rgba(39, 95, 226, .64) 0%, rgba(26, 34, 45, 0) 100%)',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '600',
                            borderRadius: '8px 8px 0 0'
                          }}
                        >
                          {t('todayBookmakerOdds')}
                        </div>
                        <div
                          className="bg-white rounded-b-lg overflow-hidden"
                          style={{borderRadius: '0 0 8px 8px'}}
                        >
                          <div className="flex bg-gray-100 text-sm font-semibold border-b border-gray-200 clipBg">
                            <div
                              className="px-2 py-1 text-center"
                              style={{width: '50px'}}
                            >
                              {t('time')}
                            </div>
                            <div className="px-2 py-1 flex-1">{t('match')}</div>
                            <div
                              className="px-2 py-1 text-center"
                              style={{width: '85px'}}
                            >
                              {t('handicap')}
                            </div>
                            <div
                              className="px-2 py-1 text-center"
                              style={{width: '85px'}}
                            >
                              {t('overUnder')}
                            </div>
                            <div
                              className="px-2 py-1 text-center"
                              style={{width: '55px'}}
                            >
                              {t('oneXTwo')}
                            </div>
                          </div>
                          <div>
                            {loadingFirst ? (
                              <div className="p-4">
                                <div className="animate-pulse bg-gray-300 rounded h-24 w-full"></div>
                              </div>
                            ) : oddsPreMatch && oddsPreMatch?.total > 0 ? (
                              oddsPreMatch.result.map((league, l) => (
                                <div key={`league-key-${l}`}>
                                  <div className="league-name-tr border-b border-gray-200">
                                    <div className="league-name px-2 py-2">
                                      <span>{league.league_name}</span>
                                    </div>
                                  </div>
                                  {league.fixtures.map((match, i) => (
                                    <div
                                      key={i}
                                      className={`border-b border-gray-200 ${
                                        i % 2 === 0
                                          ? 'even bg-gray-50'
                                          : 'bg-white'
                                      }`}
                                    >
                                      {/* Full Match Row */}
                                      <div className="flex items-center">
                                        <div
                                          className="date text-center px-2 py-1"
                                          style={{width: '50px'}}
                                        >
                                          <div>
                                            <span>
                                              {match.timestamp
                                                ? moment(match.timestamp * 1000)
                                                    .tz('Asia/Ho_Chi_Minh')
                                                    .format('DD/MM')
                                                : ''}
                                            </span>
                                            <span style={{color: '#ff0008'}}>
                                              {match.timestamp
                                                ? moment(match.timestamp * 1000)
                                                    .tz('Asia/Ho_Chi_Minh')
                                                    .format('HH:mm')
                                                : ''}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="club px-2 py-1 flex-1">
                                          <div className="flex flex-col">
                                            <span>{match.home_name}</span>
                                            <span>{match.away_name}</span>
                                            <span>{t('draw')}</span>
                                          </div>
                                        </div>
                                        <div
                                          className="full-handicap px-2 py-1 text-right"
                                          style={{width: '85px'}}
                                        >
                                          {match.asian_handicap && (
                                            <div>
                                              <div className="mb-1">
                                                <span>
                                                  {safeParseFloat(
                                                    getHandicapValue(
                                                      match.asian_handicap
                                                        .filter((item) =>
                                                          item.value.startsWith(
                                                            'Home'
                                                          )
                                                        )
                                                        .map(
                                                          (item) => item.value
                                                        )
                                                        .pop()
                                                    )
                                                  )}
                                                </span>
                                                <span className="border-dotted">
                                                  {safeParseFloat(
                                                    match.asian_handicap
                                                      .filter((item) =>
                                                        item.value.startsWith(
                                                          'Home'
                                                        )
                                                      )
                                                      .map((item) => item.odd)
                                                      .pop()
                                                  )}
                                                </span>
                                              </div>
                                              <div>
                                                <span className="border-dotted">
                                                  {safeParseFloat(
                                                    match.asian_handicap
                                                      .filter((item) =>
                                                        item.value.startsWith(
                                                          'Away'
                                                        )
                                                      )
                                                      .map((item) => item.odd)
                                                      .pop()
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div
                                          className="full-ou px-2 py-1 text-right"
                                          style={{width: '85px'}}
                                        >
                                          {match.goal_ou && (
                                            <div>
                                              <div className="mb-1">
                                                <span>
                                                  {match.goal_ou[0]?.value.match(
                                                    /[-+.\d]+/g
                                                  ) ?? '0'}
                                                </span>
                                                <span className="lblOver">
                                                  o
                                                </span>
                                                <span className="border-dotted">
                                                  {safeParseFloat(
                                                    match.goal_ou[0]?.odd
                                                  )}
                                                </span>
                                              </div>
                                              <div>
                                                <span className="lblUnder">
                                                  u
                                                </span>
                                                <span className="border-dotted">
                                                  {safeParseFloat(
                                                    match.goal_ou[1]?.odd
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div
                                          className="full-1x2 px-2 py-1 text-center"
                                          style={{width: '55px'}}
                                        >
                                          {match.full_1x2 && (
                                            <div className="flex flex-col">
                                              <span className="bg-full mb-2">
                                                {safeParseFloat(
                                                  match.full_1x2[0]?.odd
                                                )}
                                              </span>
                                              <span className="bg-full mb-2">
                                                {safeParseFloat(
                                                  match.full_1x2[2]?.odd
                                                )}
                                              </span>
                                              <span className="bg-full">
                                                {safeParseFloat(
                                                  match.full_1x2[1]?.odd
                                                )}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      {/* First Half Label */}
                                      <div
                                        className="odds-label text-center text-sm border-t border-gray-200 py-1"
                                        style={{fontSize: '12px'}}
                                      >
                                        {t('firstHalf')}
                                      </div>
                                      {/* First Half Row */}
                                      <div className="flex items-center">
                                        <div className="club px-2 py-1 flex-1">
                                          <div className="flex flex-col">
                                            <span className="mb-1">
                                              {match.home_name}
                                            </span>
                                            <span className="mb-1">
                                              {match.away_name}
                                            </span>
                                            <span>{t('draw')}</span>
                                          </div>
                                        </div>
                                        <div
                                          className="half-handicap px-2 py-1 text-right"
                                          style={{width: '85px'}}
                                        >
                                          {match.asian_handicap_1st && (
                                            <div>
                                              <div className="mb-1">
                                                <span>
                                                  {safeParseFloat(
                                                    getHandicapValue(
                                                      match.asian_handicap_1st
                                                        .filter((item) =>
                                                          item.value.startsWith(
                                                            'Home'
                                                          )
                                                        )
                                                        .map(
                                                          (item) => item.value
                                                        )
                                                        .pop()
                                                    )
                                                  )}
                                                </span>
                                                <span className="border-dotted">
                                                  {safeParseFloat(
                                                    match.asian_handicap_1st
                                                      .filter((item) =>
                                                        item.value.startsWith(
                                                          'Home'
                                                        )
                                                      )
                                                      .map((item) => item.odd)
                                                      .pop()
                                                  )}
                                                </span>
                                              </div>
                                              <div>
                                                <span className="border-dotted">
                                                  {safeParseFloat(
                                                    match.asian_handicap_1st
                                                      .filter((item) =>
                                                        item.value.startsWith(
                                                          'Away'
                                                        )
                                                      )
                                                      .map((item) => item.odd)
                                                      .pop()
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div
                                          className="half-ou px-2 py-1 text-right"
                                          style={{width: '85px'}}
                                        >
                                          {match.goal_ou_1st && (
                                            <div>
                                              <div className="mb-1">
                                                <span>
                                                  {match.goal_ou_1st[0]?.value.match(
                                                    /[-+.\d]+/g
                                                  ) ?? '0'}
                                                </span>
                                                <span className="lblOver">
                                                  o
                                                </span>
                                                <span className="border-dotted">
                                                  {safeParseFloat(
                                                    match.goal_ou_1st[0]?.odd
                                                  )}
                                                </span>
                                              </div>
                                              <div>
                                                <span className="lblUnder">
                                                  u
                                                </span>
                                                <span className="border-dotted">
                                                  {safeParseFloat(
                                                    match.goal_ou_1st[1]?.odd
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div
                                          className="half-1x2 px-2 py-1 text-center"
                                          style={{width: '55px'}}
                                        >
                                          {match.half_1x2 && (
                                            <div className="flex flex-col">
                                              <span className="bg-full mb-1">
                                                {safeParseFloat(
                                                  match.half_1x2[0]?.odd
                                                )}
                                              </span>
                                              <span className="bg-full mb-1">
                                                {safeParseFloat(
                                                  match.half_1x2[2]?.odd
                                                )}
                                              </span>
                                              <span className="bg-full">
                                                {safeParseFloat(
                                                  match.half_1x2[1]?.odd
                                                )}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))
                            ) : (
                              <div className="text-center txt-dark p-4">
                                {t('noMatchesOngoing')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* PC View */}
            <div className="PC hidden md:block main-wrap p-0 container mx-auto w-full oddsSection">
              <div className="flex flex-wrap -mx-4">
                <div className="home main-content w-full">
                  <div className="football-result -mx-4 mx-0 px-0">
                    <div className="football-result-wrap">
                      <div className="home-odds-table home-highlight HomeOddsTable">
                        <h1 className="text-center">{t('liveScore')}</h1>

                        <div className="search-box-new searchInput flex items-center relative justify-center mb-2">
                          <Image
                            src="/images/Search_page_ranking.webp"
                            className="Search_page_ranking_icon"
                            width={24}
                            height={24}
                            alt="Search_page_ranking"
                          />
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder={txtPlaceholder}
                            id="txt-search"
                            className="form-control border-0 w-full px-3 py-2 rounded-md"
                            onKeyPress={handleKeyPress}
                            ref={searchInputRef}
                          />

                          {!showReset && (
                            <button
                              className="btn Arrow_right_rankings_icon"
                              type="button"
                              onClick={handleSearchClick}
                            >
                              <Image
                                src="/images/Arrow_right_rankings.webp"
                                width={25}
                                height={24}
                                alt="arrow"
                              />
                            </button>
                          )}

                          {showReset && (
                            <div
                              className="btn-reset ms-3 px-3 inline-flex items-center justify-center cursor-pointer"
                              onClick={handleReset}
                            >
                              X
                            </div>
                          )}
                        </div>

                        <div className="page-highlight mt-2">
                          <div className="divide-y divide-gray-200">
                            {/* Live Odds Accordion */}
                            <div className="aaa pb-2">
                              <button
                                className="w-full flex justify-between items-center p-4 text-left bg-gray-100 headerBg"
                                onClick={() => toggleAccordion('0')}
                              >
                                <span className="font-semibold">
                                  {t('onlineBookmakerOdds')}
                                </span>
                                <span className="text-[28px] leading-[0] font-bold cursor-pointer">
                                  {activeAccordions.includes('0') ? '−' : '+'}
                                </span>
                              </button>
                              {activeAccordions.includes('0') && (
                                <div className="p-4 bg-white">
                                  <div className="data-odds">
                                    <div className="data-odds-sub-header flex justify-between items-center bg-gray-100 p-2">
                                      <div
                                        className="flex justify-start items-center gap-5"
                                        style={{
                                          width: '35%',
                                          paddingLeft: '25px'
                                        }}
                                      >
                                        <div className="xa">{t('time')}</div>
                                        <div className="xb px-3">
                                          {t('match')}
                                        </div>
                                      </div>
                                      <div
                                        className="flex justify-evenly items-center gap-4"
                                        style={{width: '65%'}}
                                      >
                                        <div
                                          className="flex justify-between items-center"
                                          style={{gap: '80px'}}
                                        >
                                          <div className="y1a">
                                            {t('handicap')}
                                          </div>
                                          <div className="y1b">
                                            {t('overUnder')}
                                          </div>
                                          <div className="y1c">
                                            {t('oneXTwo')}
                                          </div>
                                        </div>
                                        <div
                                          className="flex justify-between items-center"
                                          style={{gap: '80px'}}
                                        >
                                          <div className="y2a">
                                            {t('handicap')}
                                          </div>
                                          <div className="y2b">
                                            {t('overUnder')}
                                          </div>
                                          <div className="y2c">
                                            {t('oneXTwo')}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="live-data-odds-body">
                                      <div className="live-odds">
                                        {loadingLive ? (
                                          <div className="flex flex-wrap -mx-4">
                                            <div className="w-full">
                                              <div className="my-3">
                                                <div className="animate-pulse bg-gray-300 rounded h-24 w-full"></div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : oddsLive && oddsLive?.total > 0 ? (
                                          oddsLive.result.map((league) =>
                                            league.fixtures.map(
                                              (match, i) =>
                                                match.status.long !==
                                                  'Match Finished' &&
                                                match.status_short !== 'FT' && (
                                                  <div
                                                    className="flex flex-wrap -mx-4 row-list relative"
                                                    key={i}
                                                  >
                                                    <div className="flex justify-between items-center mb-2 w-full">
                                                      <div
                                                        className="div1"
                                                        style={{width: '39%'}}
                                                      ></div>
                                                      <div
                                                        className="div2"
                                                        style={{width: '28%'}}
                                                      >
                                                        {t('fullMatch')}
                                                      </div>
                                                      <div
                                                        className="div3"
                                                        style={{width: '33%'}}
                                                      >
                                                        {t('firstHalf')}
                                                      </div>
                                                    </div>

                                                    <div className="ttt flex flex-wrap -mx-4 w-full">
                                                      <div className="flex-1 px-4 date text-center p-0 makeAlingLeft">
                                                        <span
                                                          style={{
                                                            fontSize: '12px'
                                                          }}
                                                        >
                                                          {(match.goals_home ??
                                                            0) +
                                                            '-' +
                                                            (match.goals_away ??
                                                              0)}
                                                        </span>
                                                        <span
                                                          style={{
                                                            color: '#FFCF9D',
                                                            fontWeight:
                                                              'normal',
                                                            fontSize: '13px'
                                                          }}
                                                        >
                                                          {match.status_short ===
                                                            '1H' ||
                                                          match.status_short ===
                                                            '2H'
                                                            ? `${match.status.elapsed ?? ''}'`
                                                            : match.status_short ===
                                                                  'NS' &&
                                                                match.status
                                                                  .elapsed !=
                                                                  null
                                                              ? `${match.status.elapsed}'`
                                                              : match.status_short}
                                                        </span>
                                                      </div>
                                                      <div
                                                        className="flex-1 px-4 club"
                                                        style={{
                                                          paddingRight: '150px',
                                                          paddingLeft: '100px'
                                                        }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: '14px',
                                                            fontWeight: '500'
                                                          }}
                                                        >
                                                          {match.home_name}
                                                        </span>
                                                        <span
                                                          style={{
                                                            fontSize: '14px',
                                                            fontWeight: '500'
                                                          }}
                                                        >
                                                          {match.away_name}
                                                        </span>
                                                        <span
                                                          style={{
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                            paddingTop: '16px'
                                                          }}
                                                          className="mb-2"
                                                        >
                                                          {t('draw')}
                                                        </span>
                                                      </div>
                                                      <div className="flex-1 px-4 full-handicap p-0">
                                                        {match.odds?.find(
                                                          (odd) => odd.id === 33
                                                        ) ? (
                                                          match.odds
                                                            .find(
                                                              (odd) =>
                                                                odd.id === 33
                                                            )
                                                            ?.values.find(
                                                              (value) =>
                                                                value.main ===
                                                                  true &&
                                                                value.value ===
                                                                  'Home'
                                                            )?.handicap ? (
                                                            <>
                                                              <div className="text-right mb-1">
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds
                                                                      .find(
                                                                        (odd) =>
                                                                          odd.id ===
                                                                          33
                                                                      )
                                                                      ?.values.find(
                                                                        (
                                                                          value
                                                                        ) =>
                                                                          value.main ===
                                                                            true &&
                                                                          value.value ===
                                                                            'Home'
                                                                      )
                                                                      ?.handicap
                                                                  )}
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '500'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds
                                                                      .find(
                                                                        (odd) =>
                                                                          odd.id ===
                                                                          33
                                                                      )
                                                                      ?.values.find(
                                                                        (
                                                                          value
                                                                        ) =>
                                                                          value.main ===
                                                                            true &&
                                                                          value.value ===
                                                                            'Home'
                                                                      )?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                              <div className="text-right">
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '500'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds
                                                                      .find(
                                                                        (odd) =>
                                                                          odd.id ===
                                                                          33
                                                                      )
                                                                      ?.values.find(
                                                                        (
                                                                          value
                                                                        ) =>
                                                                          value.main ===
                                                                            true &&
                                                                          value.value ===
                                                                            'Away'
                                                                      )?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                            </>
                                                          ) : (
                                                            <>
                                                              <div className="text-right mb-1">
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds.find(
                                                                      (odd) =>
                                                                        odd.id ===
                                                                        33
                                                                    )?.values[0]
                                                                      ?.handicap
                                                                  )}
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '500'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds.find(
                                                                      (odd) =>
                                                                        odd.id ===
                                                                        33
                                                                    )?.values[0]
                                                                      ?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                              <div className="text-right">
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '500'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds.find(
                                                                      (odd) =>
                                                                        odd.id ===
                                                                        33
                                                                    )?.values[1]
                                                                      ?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                            </>
                                                          )
                                                        ) : null}
                                                      </div>
                                                      <div className="flex-1 px-4 full-ou p-0">
                                                        {match.odds?.find(
                                                          (odd) => odd.id === 25
                                                        ) && (
                                                          <>
                                                            <div className="text-right mb-1">
                                                              <span
                                                                style={{
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '400'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match.odds.find(
                                                                    (odd) =>
                                                                      odd.id ===
                                                                      25
                                                                  )?.values[0]
                                                                    ?.handicap
                                                                )}
                                                              </span>
                                                              <span className="lblOver">
                                                                o
                                                              </span>
                                                              <span
                                                                className="border-dotted"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match.odds.find(
                                                                    (odd) =>
                                                                      odd.id ===
                                                                      25
                                                                  )?.values[0]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                            </div>
                                                            <div className="text-right">
                                                              <span className="lblUnder">
                                                                u
                                                              </span>
                                                              <span
                                                                className="border-dotted"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match.odds.find(
                                                                    (odd) =>
                                                                      odd.id ===
                                                                      25
                                                                  )?.values[1]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                            </div>
                                                          </>
                                                        )}
                                                      </div>
                                                      <div className="flex-1 px-4 full-1x2 p-0">
                                                        {match.odds?.find(
                                                          (odd) => odd.id === 59
                                                        ) && (
                                                          <>
                                                            <span
                                                              className="bg-full mb-2"
                                                              style={{
                                                                color:
                                                                  '#FFCF9D',
                                                                fontSize:
                                                                  '14px',
                                                                fontWeight:
                                                                  '500'
                                                              }}
                                                            >
                                                              {safeParseFloat(
                                                                match.odds.find(
                                                                  (odd) =>
                                                                    odd.id ===
                                                                    59
                                                                )?.values[0]
                                                                  ?.odd
                                                              )}
                                                            </span>
                                                            <span
                                                              className="bg-full mb-2"
                                                              style={{
                                                                color:
                                                                  '#FFCF9D',
                                                                fontSize:
                                                                  '14px',
                                                                fontWeight:
                                                                  '500'
                                                              }}
                                                            >
                                                              {safeParseFloat(
                                                                match.odds.find(
                                                                  (odd) =>
                                                                    odd.id ===
                                                                    59
                                                                )?.values[2]
                                                                  ?.odd
                                                              )}
                                                            </span>
                                                            <span
                                                              className="bg-full mb-2"
                                                              style={{
                                                                color:
                                                                  '#FFCF9D',
                                                                fontSize:
                                                                  '14px',
                                                                fontWeight:
                                                                  '500'
                                                              }}
                                                            >
                                                              {safeParseFloat(
                                                                match.odds.find(
                                                                  (odd) =>
                                                                    odd.id ===
                                                                    59
                                                                )?.values[1]
                                                                  ?.odd
                                                              )}
                                                            </span>
                                                          </>
                                                        )}
                                                      </div>
                                                      <div className="flex-1 px-4 half-handicap p-0">
                                                        {match.odds?.find(
                                                          (odd) => odd.id === 17
                                                        ) ? (
                                                          match.odds
                                                            .find(
                                                              (odd) =>
                                                                odd.id === 17
                                                            )
                                                            ?.values.find(
                                                              (value) =>
                                                                value.main ===
                                                                  true &&
                                                                value.value ===
                                                                  'Home'
                                                            )?.handicap ? (
                                                            <>
                                                              <div className="text-right mb-1">
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds
                                                                      .find(
                                                                        (odd) =>
                                                                          odd.id ===
                                                                          17
                                                                      )
                                                                      ?.values.find(
                                                                        (
                                                                          value
                                                                        ) =>
                                                                          value.main ===
                                                                            true &&
                                                                          value.value ===
                                                                            'Home'
                                                                      )
                                                                      ?.handicap
                                                                  )}
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '500'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds
                                                                      .find(
                                                                        (odd) =>
                                                                          odd.id ===
                                                                          17
                                                                      )
                                                                      ?.values.find(
                                                                        (
                                                                          value
                                                                        ) =>
                                                                          value.main ===
                                                                            true &&
                                                                          value.value ===
                                                                            'Home'
                                                                      )?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                              <div className="text-right">
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '500'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds
                                                                      .find(
                                                                        (odd) =>
                                                                          odd.id ===
                                                                          17
                                                                      )
                                                                      ?.values.find(
                                                                        (
                                                                          value
                                                                        ) =>
                                                                          value.main ===
                                                                            true &&
                                                                          value.value ===
                                                                            'Away'
                                                                      )?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                            </>
                                                          ) : (
                                                            <>
                                                              <div className="text-right mb-1">
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds.find(
                                                                      (odd) =>
                                                                        odd.id ===
                                                                        17
                                                                    )?.values[0]
                                                                      ?.handicap
                                                                  )}
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '500'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds.find(
                                                                      (odd) =>
                                                                        odd.id ===
                                                                        17
                                                                    )?.values[0]
                                                                      ?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                              <div className="text-right">
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '500'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.odds.find(
                                                                      (odd) =>
                                                                        odd.id ===
                                                                        17
                                                                    )?.values[1]
                                                                      ?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                            </>
                                                          )
                                                        ) : null}
                                                      </div>
                                                      <div className="flex-1 px-4 half-ou p-0">
                                                        {match.odds?.find(
                                                          (odd) => odd.id === 49
                                                        ) && (
                                                          <>
                                                            <div className="text-right mb-1">
                                                              <span
                                                                style={{
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '400'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match.odds.find(
                                                                    (odd) =>
                                                                      odd.id ===
                                                                      49
                                                                  )?.values[0]
                                                                    ?.handicap
                                                                )}
                                                              </span>
                                                              <span className="lblOver">
                                                                o
                                                              </span>
                                                              <span
                                                                className="border-dotted"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match.odds.find(
                                                                    (odd) =>
                                                                      odd.id ===
                                                                      49
                                                                  )?.values[0]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                            </div>
                                                            <div className="text-right">
                                                              <span className="lblUnder">
                                                                u
                                                              </span>
                                                              <span
                                                                className="border-dotted"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match.odds.find(
                                                                    (odd) =>
                                                                      odd.id ===
                                                                      49
                                                                  )?.values[1]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                            </div>
                                                          </>
                                                        )}
                                                      </div>
                                                      <div className="flex-1 px-4 half-1x2 p-0">
                                                        {match.odds?.find(
                                                          (odd) => odd.id === 19
                                                        ) && (
                                                          <>
                                                            <span
                                                              className="bg-full mb-2"
                                                              style={{
                                                                color:
                                                                  '#FFCF9D',
                                                                fontSize:
                                                                  '14px',
                                                                fontWeight:
                                                                  '500'
                                                              }}
                                                            >
                                                              {safeParseFloat(
                                                                match.odds.find(
                                                                  (odd) =>
                                                                    odd.id ===
                                                                    19
                                                                )?.values[0]
                                                                  ?.odd
                                                              )}
                                                            </span>
                                                            <span
                                                              className="bg-full mb-2"
                                                              style={{
                                                                color:
                                                                  '#FFCF9D',
                                                                fontSize:
                                                                  '14px',
                                                                fontWeight:
                                                                  '500'
                                                              }}
                                                            >
                                                              {safeParseFloat(
                                                                match.odds.find(
                                                                  (odd) =>
                                                                    odd.id ===
                                                                    19
                                                                )?.values[2]
                                                                  ?.odd
                                                              )}
                                                            </span>
                                                            <span
                                                              className="bg-full mb-2"
                                                              style={{
                                                                color:
                                                                  '#FFCF9D',
                                                                fontSize:
                                                                  '14px',
                                                                fontWeight:
                                                                  '500'
                                                              }}
                                                            >
                                                              {safeParseFloat(
                                                                match.odds.find(
                                                                  (odd) =>
                                                                    odd.id ===
                                                                    19
                                                                )?.values[1]
                                                                  ?.odd
                                                              )}
                                                            </span>
                                                          </>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                            )
                                          )
                                        ) : (
                                          <div className="flex flex-wrap -mx-4 justify-center">
                                            <div className="w-full">
                                              <div className="text-center txt-dark pt-4">
                                                {t('noMatchesOngoing')}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Today's Odds Accordion */}
                            <div className="bbbb">
                              <button
                                className="w-full flex justify-between items-center p-4 text-left bg-gray-100 headerBg"
                                onClick={() => toggleAccordion('1')}
                              >
                                <span className="font-semibold">
                                  {t('todayBookmakerOdds')}
                                </span>
                                <span className="text-[28px] leading-[0] font-bold cursor-pointer">
                                  {activeAccordions.includes('1') ? '−' : '+'}
                                </span>
                              </button>
                              {activeAccordions.includes('1') && (
                                <div className="p-4 bg-white">
                                  <div className="data-odds">
                                    <div className="data-odds-sub-header flex justify-between items-center bg-gray-100 p-2">
                                      <div
                                        className="flex justify-start items-center gap-5"
                                        style={{
                                          width: '35%',
                                          paddingLeft: '25px'
                                        }}
                                      >
                                        <div className="xa">{t('time')}</div>
                                        <div className="xb px-3">
                                          {t('match')}
                                        </div>
                                      </div>
                                      <div
                                        className="flex justify-evenly items-center gap-4"
                                        style={{width: '65%'}}
                                      >
                                        <div
                                          className="flex justify-between items-center"
                                          style={{gap: '80px'}}
                                        >
                                          <div className="y1a">
                                            {t('handicap')}
                                          </div>
                                          <div className="y1b">
                                            {t('overUnder')}
                                          </div>
                                          <div className="y1c">
                                            {t('oneXTwo')}
                                          </div>
                                        </div>
                                        <div
                                          className="flex justify-between items-center"
                                          style={{gap: '80px'}}
                                        >
                                          <div className="y2a">
                                            {t('handicap')}
                                          </div>
                                          <div className="y2b">
                                            {t('overUnder')}
                                          </div>
                                          <div className="y2c">
                                            {t('oneXTwo')}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="todays-data-odds-body">
                                      <div className="football-result-wrap">
                                        {loadingFirst ? (
                                          <div className="flex flex-wrap -mx-4">
                                            <div className="w-full">
                                              <div className="my-3">
                                                <div className="animate-pulse bg-gray-300 rounded h-24 w-full"></div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : oddsPreMatch &&
                                          oddsPreMatch?.total > 0 ? (
                                          oddsPreMatch.result.map(
                                            (league, l) => (
                                              <div key={l}>
                                                <div className="flex flex-wrap -mx-4 league-name-tr">
                                                  <div className="w-full px-0 py-2">
                                                    <div className="league-name p-2">
                                                      <span className="font-bold">
                                                        {league.league_name}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>

                                                {league.fixtures.map(
                                                  (match, i) => (
                                                    <div
                                                      className="flex flex-wrap -mx-4 row-list relative"
                                                      key={i}
                                                    >
                                                      <div className="flex justify-between items-center mb-2 w-full">
                                                        <div
                                                          className="div1"
                                                          style={{width: '39%'}}
                                                        ></div>
                                                        <div
                                                          className="div2"
                                                          style={{width: '28%'}}
                                                        >
                                                          {t('fullMatch')}
                                                        </div>
                                                        <div
                                                          className="div3"
                                                          style={{width: '33%'}}
                                                        >
                                                          {t('firstHalf')}
                                                        </div>
                                                      </div>

                                                      <div className="ttt flex flex-wrap -mx-4 w-full">
                                                        <div className="flex-1 px-4 date p-0 makeAlingLeft">
                                                          <span
                                                            style={{
                                                              fontSize: '14px',
                                                              fontWeight: '500'
                                                            }}
                                                          >
                                                            {match.timestamp
                                                              ? moment(
                                                                  match.timestamp *
                                                                    1000
                                                                )
                                                                  .tz(
                                                                    'Asia/Ho_Chi_Minh'
                                                                  )
                                                                  .format(
                                                                    'DD/MM'
                                                                  )
                                                              : ''}
                                                          </span>
                                                          <span
                                                            style={{
                                                              color: '#FFCF9D',
                                                              fontSize: '14px',
                                                              fontWeight: '500'
                                                            }}
                                                          >
                                                            {match.timestamp
                                                              ? moment(
                                                                  match.timestamp *
                                                                    1000
                                                                )
                                                                  .tz(
                                                                    'Asia/Ho_Chi_Minh'
                                                                  )
                                                                  .format(
                                                                    'HH:mm'
                                                                  )
                                                              : ''}
                                                          </span>
                                                        </div>
                                                        <div
                                                          className="flex-1 px-4 club"
                                                          style={{
                                                            paddingRight:
                                                              '150px',
                                                            paddingLeft: '100px'
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: '14px',
                                                              fontWeight: '500'
                                                            }}
                                                          >
                                                            {match.home_name}
                                                          </span>
                                                          <span
                                                            style={{
                                                              fontSize: '14px',
                                                              fontWeight: '500'
                                                            }}
                                                          >
                                                            {match.away_name}
                                                          </span>
                                                          <span
                                                            style={{
                                                              fontSize: '14px',
                                                              fontWeight: '500',
                                                              paddingTop: '16px'
                                                            }}
                                                            className="mb-2"
                                                          >
                                                            {t('draw')}
                                                          </span>
                                                        </div>
                                                        <div className="flex-1 px-4 full-handicap p-0">
                                                          {match.asian_handicap && (
                                                            <>
                                                              <div className="text-right mb-1">
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    getHandicapValue(
                                                                      match.asian_handicap
                                                                        .filter(
                                                                          (
                                                                            item
                                                                          ) =>
                                                                            item.value.startsWith(
                                                                              'Home'
                                                                            )
                                                                        )
                                                                        .map(
                                                                          (
                                                                            item
                                                                          ) =>
                                                                            item.value
                                                                        )
                                                                        .pop()
                                                                    )
                                                                  )}
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.asian_handicap
                                                                      .filter(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.value.startsWith(
                                                                            'Home'
                                                                          )
                                                                      )
                                                                      .map(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.odd
                                                                      )
                                                                      .pop()
                                                                  )}
                                                                </span>
                                                              </div>
                                                              <div className="text-right">
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.asian_handicap
                                                                      .filter(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.value.startsWith(
                                                                            'Away'
                                                                          )
                                                                      )
                                                                      .map(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.odd
                                                                      )
                                                                      .pop()
                                                                  )}
                                                                </span>
                                                              </div>
                                                            </>
                                                          )}
                                                        </div>
                                                        <div className="flex-1 px-4 full-ou p-0">
                                                          {match.goal_ou && (
                                                            <>
                                                              <div className="text-right mb-1">
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {match.goal_ou[0]?.value.match(
                                                                    /[-+.\d]+/g
                                                                  ) ?? '0'}
                                                                </span>
                                                                <span className="lblOver">
                                                                  o
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match
                                                                      .goal_ou[0]
                                                                      ?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                              <div className="text-right">
                                                                <span className="lblUnder">
                                                                  u
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match
                                                                      .goal_ou[1]
                                                                      ?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                            </>
                                                          )}
                                                        </div>
                                                        <div className="flex-1 px-4 full-1x2 p-0">
                                                          {match.full_1x2 && (
                                                            <>
                                                              <span
                                                                className="bg-full mb-2"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match
                                                                    .full_1x2[0]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                              <span
                                                                className="bg-full mb-2"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match
                                                                    .full_1x2[2]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                              <span
                                                                className="bg-full mb-2"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match
                                                                    .full_1x2[1]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                            </>
                                                          )}
                                                        </div>
                                                        <div className="flex-1 px-4 half-handicap p-0">
                                                          {match.asian_handicap_1st && (
                                                            <>
                                                              <div className="text-right mb-1">
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    getHandicapValue(
                                                                      match.asian_handicap_1st
                                                                        .filter(
                                                                          (
                                                                            item
                                                                          ) =>
                                                                            item.value.startsWith(
                                                                              'Home'
                                                                            )
                                                                        )
                                                                        .map(
                                                                          (
                                                                            item
                                                                          ) =>
                                                                            item.value
                                                                        )
                                                                        .pop()
                                                                    )
                                                                  )}
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.asian_handicap_1st
                                                                      .filter(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.value.startsWith(
                                                                            'Home'
                                                                          )
                                                                      )
                                                                      .map(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.odd
                                                                      )
                                                                      .pop()
                                                                  )}
                                                                </span>
                                                              </div>
                                                              <div className="text-right">
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match.asian_handicap_1st
                                                                      .filter(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.value.startsWith(
                                                                            'Away'
                                                                          )
                                                                      )
                                                                      .map(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.odd
                                                                      )
                                                                      .pop()
                                                                  )}
                                                                </span>
                                                              </div>
                                                            </>
                                                          )}
                                                        </div>
                                                        <div className="flex-1 px-4 half-ou p-0">
                                                          {match.goal_ou_1st && (
                                                            <>
                                                              <div className="text-right mb-1">
                                                                <span
                                                                  style={{
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {match.goal_ou_1st[0]?.value.match(
                                                                    /[-+.\d]+/g
                                                                  ) ?? '0'}
                                                                </span>
                                                                <span className="lblOver">
                                                                  o
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match
                                                                      .goal_ou_1st[0]
                                                                      ?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                              <div className="text-right">
                                                                <span className="lblUnder">
                                                                  u
                                                                </span>
                                                                <span
                                                                  className="border-dotted"
                                                                  style={{
                                                                    color:
                                                                      '#FFCF9D',
                                                                    fontSize:
                                                                      '14px',
                                                                    fontWeight:
                                                                      '400'
                                                                  }}
                                                                >
                                                                  {safeParseFloat(
                                                                    match
                                                                      .goal_ou_1st[1]
                                                                      ?.odd
                                                                  )}
                                                                </span>
                                                              </div>
                                                            </>
                                                          )}
                                                        </div>
                                                        <div className="flex-1 px-4 half-1x2 p-0">
                                                          {match.half_1x2 && (
                                                            <>
                                                              <span
                                                                className="bg-full mb-2"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match
                                                                    .half_1x2[0]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                              <span
                                                                className="bg-full mb-2"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match
                                                                    .half_1x2[2]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                              <span
                                                                className="bg-full mb-2"
                                                                style={{
                                                                  color:
                                                                    '#FFCF9D',
                                                                  fontSize:
                                                                    '14px',
                                                                  fontWeight:
                                                                    '500'
                                                                }}
                                                              >
                                                                {safeParseFloat(
                                                                  match
                                                                    .half_1x2[1]
                                                                    ?.odd
                                                                )}
                                                              </span>
                                                            </>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )
                                          )
                                        ) : (
                                          <div className="flex flex-wrap -mx-4 justify-center">
                                            <div className="w-full">
                                              <div className="text-center txt-dark pt-4">
                                                {t('noMatchesOngoing')}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Content */}
            
         {data.content && (
          <div className="content page text-[#323232]" dangerouslySetInnerHTML={{__html: data.content?.replace(new RegExp(Backend_url || '', 'g'), domain)}}/>
            )}


      </div>
    </div>
  );
}
