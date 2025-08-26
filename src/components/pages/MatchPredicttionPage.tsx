import Sidebar from '@/components/layout/Sidebar';
import BigImageSection from '../../components/predection/BigImageSection';
import PredectionList from '../../components/predection/PredectionList';
import Link from 'next/link';
import {fetchPostByCat} from '@/apis/services/postByCat'; // Adjust import path as per your project
import {PostByCatResponse, Post} from '../../types/postByCat';
import { getTranslations } from 'next-intl/server';
export default async function MatchPredicttionPage({data}: {data: any}) {
  // Fetch data with league and match_predict post_type
    const t = await getTranslations();
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok',
    hour12: false
  });
  const matchData: PostByCatResponse = await fetchPostByCat(
    'league',
    '',
    'match_predict',
    16,
    1
  );
 
  if (
    !matchData ||
    !matchData.posts ||
    matchData.total_posts === 0 ||
    'error' in matchData
  ) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p>No match predictions available for this league.</p>
        </div>
      </div>
    );
  }

  // Use the first post as mainMatch if available
  const mainMatch: Post =
    matchData.posts.length > 0
      ? {...matchData.posts[0]}
      : {
          title: 'No Data',
          featured_image: '',
          slug: '',
          published_date: '',
          vn_date: ''
        };

  // Use remaining posts for sidebarMatches (up to 5 items)
  const sidebarMatches: Post[] =
    matchData.posts.length > 1 ? matchData.posts.slice(1, 6) : [];

  // Hardcoded filters as requested
  const leagues = [
    'All',
    'english-premier-league',
    'uefa-champions-league',
    'uefa-europa-league',
    'spanish-la-liga',
    'german-bundesliga',
    'italian-serie-a',
    'france-ligue-1',
    'liga-portugal-1',
    'afc-champions-league',
    'uefa-nations-league'
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
              <h1 className="text-2xl font-bold mb-2">
                {data.title}
              </h1>
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {leagues.map((league, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      league === 'All'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'text-gray-600 border-gray-300'
                    } cursor-pointer hover:bg-blue-100 hover:text-black`}
                  >
                    {league}
                  </span>
                ))}
              </div>
              {/* Main Content Grid */}
              <BigImageSection
                mainMatch={mainMatch}
                sidebarMatches={sidebarMatches}
              />
              <div className="border-b my-4 hidden sm:block" />
              {/* Match Cards Grid */}
              <PredectionList posts={matchData.posts.slice(6)} />{' '}
              {/* Remaining posts after main and sidebar */}
            </div>
            <p
              className="content page text-[#323232]"
              dangerouslySetInnerHTML={{__html: data.content || ''}}
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
