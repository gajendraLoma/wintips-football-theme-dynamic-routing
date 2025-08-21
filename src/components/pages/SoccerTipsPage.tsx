// components/pages/SoccerTipsPage.tsx
import Sidebar from '@/components/layout/Sidebar';
import Link from 'next/link';
import Image from 'next/image';
export default function SoccerTipsPage({ data }: { data: any }) {
console.log('SoccerTipsPage data:', data);  
  const mockTips = [
    {
      site: 'Bestsoccertips.com',
      date: '12/08 18:00',
      league: 'UEFA CL',
      home: {name: 'Benfica', logo: '/images/away-team-logo.png'},
      away: {name: 'Nice', logo: '/images/home-team-logo.png'},
      score: null,
      extra: 'Over 3.5',
      isLive: true
    },
    {
      site: 'KingSoccerTips.com',
      date: '12/08 17:15',
      league: 'UEFA CL',
      home: {name: 'Slovan Bratislava', logo: '/images/away-team-logo.png'},
      away: {name: 'Kairat', logo: '/images/home-team-logo.png'},
      score: null,
      extra: 'Over 2.5',
      isLive: true
    },
    {
      site: 'WinsDelivery.com',
      date: '12/08 16:00',
      league: 'UEFA CL',
      home: {name: 'Fenerbahce', logo: '/images/away-team-logo.png'},
      away: {name: 'Feyenoord', logo: '/images/home-team-logo.png'},
      score: null,
      extra: 'Over 2.5',
      isLive: true
    },
    {
      site: 'PredictionsNow.com',
      date: '12/08 16:00',
      league: 'UEFA CL',
      home: {name: 'AEP Paphos', logo: '/images/away-team-logo.png'},
      away: {name: 'Dynamo Kyiv', logo: '/images/home-team-logo.png'},
      score: null,
      extra: 'Over 2.5',
      isLive: true
    },
    {
      site: 'Premiumsoccertips.net',
      date: '12/08 15:00',
      league: 'UEFA CL',
      home: {name: 'Qarabag', logo: '/images/away-team-logo.png'},
      away: {name: 'Shkendija', logo: '/images/home-team-logo.png'},
      score: null,
      extra: 'Over 2.5',
      isLive: true
    },
    {
      site: 'KingSoccerTips.com',
      date: '11/08 18:45',
      league: 'POR D1',
      home: {name: 'Porto', logo: '/images/away-team-logo.png'},
      away: {name: 'Vitoria', logo: '/images/home-team-logo.png'},
      score: '3 : 0',
      extra: 'Porto -1',
      isLive: false
    },
    {
      site: 'Bestsoccertips.com',
      date: '11/08 17:45',
      league: 'FRA D2',
      home: {name: 'Amiens', logo: '/images/away-team-logo.png'},
      away: {name: 'Reims', logo: '/images/home-team-logo.png'},
      score: '2 : 2',
      extra: 'Over 2.5',
      isLive: false
    },
    {
      site: 'PredictionsNow.com',
      date: '11/08 17:30',
      league: 'ROM D1',
      home: {name: 'Otelul', logo: '/images/away-team-logo.png'},
      away: {name: 'Rapid', logo: '/images/home-team-logo.png'},
      score: '1 : 1',
      extra: 'Over 2.5',
      isLive: false
    },
    {
      site: 'WinsDelivery.com',
      date: '11/08 16:00',
      league: 'POL PR',
      home: {name: 'Lechia Gdansk', logo: '/images/away-team-logo.png'},
      away: {name: 'Motor Lublin', logo: '/images/home-team-logo.png'},
      score: '3 : 3',
      extra: 'Over 2.5',
      isLive: false
    }
  ];

  return (

    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex text-sm text-gray-500 mb-2">
                <Link href="/" className="text-blue-600 hover:underline">
                  Wintips
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
              <h1 className="text-2xl font-bold mb-2">
                {data.title}
              </h1>
              <h3 className="text-gray-700 mb-6">
                <Link
                  href="https://www.wintips.com"
                  className="text-blue-600 hover:underline"
                >
                  Soccer Tips
                </Link>{' '}
                (or Football Tips, Football Betting tips) are expert
                predictions, advice, or recommendations provided about upcoming
                soccer matches. They are designed to assist bettors in making
                informed decisions by offering insights into potential outcomes,
                betting markets, and strategies. Soccer tips often include match
                result predictions, scoreline forecasts, goal statistics (e.g.,
                over/under goals), player performance expectations, and analysis
                of factors like team form, head-to-head records, injuries, or
                tactical approaches. These tips can be free or part of premium
                services provided by analysts, statisticians, or betting
                experts.
              </h3>

              {/* Premium Soccer Tips */}
              <h3 className="text-lg font-semibold mb-4">
                Premium Soccer Tips
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="border rounded p-4 flex flex-col gap-3 hover:shadow-sm transition"
                  >
                    {/* Site name */}
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          tip.isLive ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      ></div>
                      <div className="text-[#227ad3]">{tip.site}</div>
                    </div>
                    <hr />
                    {/* Match info */}
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>{tip.date}</span>
                      <span>{tip.league}</span>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-between">
                      {/* Home */}
                      <div className="grid items-center gap-2 w-1/2">
                        <div className="flex items-center justify-center">
                          <Image
                            src={tip.home.logo}
                            alt={tip.home.name}
                            width={26}
                            height={26}
                            className="object-contain"
                          />
                        </div>
                        <div className="truncate text-sm flex items-center justify-center">
                          {tip.home.name}
                        </div>
                      </div>

                      {/* Score or vs */}
                      <div className="text-sm font-semibold text-gray-700">
                        {tip.score ?? '-:-'}
                      </div>

                      {/* Away */}

                      <div className="grid items-center gap-2 w-1/2">
                        <div className="flex items-center justify-center">
                          <Image
                            src={tip.away.logo}
                            alt={tip.away.name}
                            width={26}
                            height={26}
                            className="object-contain"
                          />
                        </div>
                        <div className="truncate text-sm flex items-center justify-center">
                          {tip.away.name}
                        </div>
                      </div>
                    </div>

                    {/* Extra info or Sign in */}
                    <div className="rounded-2xl border border-solid border-[#bab9b9] px-2 py-[2px] text-sm font-semibold text-[#227ad3] w-fit">
                      {tip.extra}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>


  )
} 