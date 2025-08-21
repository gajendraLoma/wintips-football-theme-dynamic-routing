// components/pages/MatchPredicttionPage.tsx
import Sidebar from "@/components/layout/Sidebar";
import BigImageSection from "../../components/predection/BigImageSection";
import PredectionList from "../../components/predection/PredectionList";
import Link from "next/link";
export default async function MatchPredicttionPage({ data }: { data: any }) {
  
  console.log('MatchPredicttionPage data:', data);
  const filters = [
    "All",
    "English Premier League",
    "UEFA Champions League",
    "UEFA Europa League",
    "Spanish La Liga",
    "German Bundesliga",
    "Italian Serie A",
    "France Ligue 1",
    "Liga Portugal 1",
    "AFC Champions League",
    "UEFA Nations League",
  ];

  const mainMatch = {
    title: "Atalanta vs Parma, Prediction & Betting Tips",
    banner:
      "https://static.wintips.com/images/wintips-page/5-24-2025/atalanta-vs-parma-prediction.webp",
  };

  const sidebarMatches = [
    "Empoli vs Verona",
    "Torino vs AS Roma",
    "Venezia vs Juventus",
    "Lazio vs Lecce",
    "Udinese vs Fiorentina",
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
                  Soccer Predictions
                </Link>{" "}
                (or Football Predictions) – Stay updated with the latest match
                analysis, bookmaker reviews, and precise head-to-head
                predictions for today and tomorrow! Curated by experts at
                Wintips, we provide in-depth insights on national and
                international tournaments, helping you track trends and make
                smarter betting decisions. Explore high-quality football
                predictions, optimize your betting strategy, and boost your
                chances of winning today!
              </h3>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      tag === "Italian Serie A"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-600 border-gray-300"
                    } cursor-pointer hover:bg-blue-100`}
                  >
                    {tag}
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
              <PredectionList />
            </div>
         <p className="content page text-[#323232]" dangerouslySetInnerHTML={{__html: data.content}} />
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

