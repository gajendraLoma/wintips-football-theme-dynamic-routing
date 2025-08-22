// components/pages/CategoryPage.tsx
import { fetchPostByCat } from '@/apis';
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import BigImageBlogSection from "@/components/blog/BigImageBlogSection";
import GridViewSection from "@/components/blog/GridViewSection";
import ListViewSection from "@/components/blog/ListViewSection";

import Pagination from "@/components/videos/Pagination";
export default async function CategoryPage({ data, slug }: { data: any; slug: string }) {
  const posts = await fetchPostByCat('post', slug, 'post', 16, 1); 


  if ('error' in posts) {
    return <div>Error loading category posts</div>;
  }

   const mainMatch = {
    title: "Atalanta vs Parma, Prediction & Betting Tips",
    banner:
      "https://static.wintips.com/images/wintips-page/5-24-2025/atalanta-vs-parma-prediction.webp",
  };

  const sidebarMatches = {
    title: "How to play series soccer tips - How to make $100 per day",
    desc: "Series Soccer Tips is a betting strategy based on a progressive staking system (similar to the Martingale method), aimed at...",
    banner:
      "https://static.wintips.com/images/wintips-page/5-24-2025/atalanta-vs-parma-prediction.webp",
  };

  const gridMatches = [
    "Rapid Wien vs Dundee United",
    "Rakow Czestochowa vs Maccabi Haifa",
    "Hajduk Split vs KS Dinamo Tirana",
  ];

  const listMatches = [
    {
      title: "Essential live betting strategy tips for higher payouts",
      desc: "Live betting, also known as in-play or in-game betting, has transformed the world of sports wagering. Instead of placing all...",
      cover: "/images/volume-betting-tips-blog-card-list.webp",
    },
    {
      title: "Essential live betting strategy tips for higher payouts",
      desc: "Live betting, also known as in-play or in-game betting, has transformed the world of sports wagering. Instead of placing all...",
      cover: "/images/volume-betting-tips-blog-card-list.webp",
    },
    {
      title: "Essential live betting strategy tips for higher payouts",
      desc: "Live betting, also known as in-play or in-game betting, has transformed the world of sports wagering. Instead of placing all...",
      cover: "/images/volume-betting-tips-blog-card-list.webp",
    },
    {
      title: "Essential live betting strategy tips for higher payouts",
      desc: "Live betting, also known as in-play or in-game betting, has transformed the world of sports wagering. Instead of placing all...",
      cover: "/images/volume-betting-tips-blog-card-list.webp",
    },
  ];

console.log('Category Data:', slug);
  return (
 <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex text-sm text-gray-500 mb-2">
                <Link
                  href="/"
                  className="text-blue-600 hover:underline transition-colors"
                >
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
                <Link
                  href="/blog"
                  className="text-blue-600 hover:underline transition-colors"
                >
                  {slug}
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
                <span>{slug}</span>
              </nav>

              {/* Title & Description */}
              <h1 className="text-2xl font-bold mb-2">Betting News</h1>
              <p className="text-gray-700 mb-6">
                Betting News is the go-to section for anyone who wants to stay up-to-date on the latest news and developments in the world of betting. 
                From breaking news stories to in-depth analysis, 
                Betting News covers all the latest happenings in the world of sports betting, casino games, and other forms of gambling.
              </p>

              {/* Big Image Section */}
              <BigImageBlogSection
                mainMatch={mainMatch}
                sidebarMatches={sidebarMatches}
              />
              <div className="my-4" />
              <GridViewSection gridMatches={gridMatches} />

              <ListViewSection listMatches={listMatches} />

              {/* Pagination */}
              <Pagination />
            </div>
         
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>



  );
}