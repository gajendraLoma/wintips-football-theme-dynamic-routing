import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import BigImageBlogSection from "@/components/blog/BigImageBlogSection";
import GridViewSection from "@/components/blog/GridViewSection";
import ListViewSection from "@/components/blog/ListViewSection";
import Pagination from "@/components/videos/Pagination";
import { fetchPostByCat } from "@/apis/services/postByCat"; // Adjusted import path
import { Post, PostByCatResponse } from "../../types/postByCat";

export default async function CategoryPage({ data: initialData, slug }: { data: any; slug: string }) {

  // Fetch data using fetchPostByCat with category slug
  const currentDateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok", hour12: false });
  const blogData: PostByCatResponse = await fetchPostByCat("category", slug, "post", 16, 1);

  // Check if data is valid or contains an error
  if (!blogData || !blogData.posts || blogData.total_posts === 0 || 'error' in blogData) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p>No posts available for this category.</p>
        </div>
      </main>
    );
  }

  // Use the first post as mainMatch if available
  const mainMatch: Post = blogData.posts.length > 0
    ? { ...blogData.posts[0] }
    : { title: "No Data", featured_image: "", slug: "", published_date: "", vn_date: "" };

  // Use the second post as sidebarMatches if available
  const sidebarMatches: Post = blogData.posts.length > 1
    ? { ...blogData.posts[1] }
    : { title: "No Data", featured_image: "", slug: "", published_date: "", vn_date: "" };

  // Use remaining posts for gridMatches (starting from index 2, up to 3 items)
  const gridMatches: Post[] = blogData.posts.length > 2
    ? blogData.posts.slice(2, 5)
    : [];

  // Use remaining posts for listMatches
  const listMatches: Post[] = blogData.posts.length > 2
    ? blogData.posts.slice(2)
    : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-8">
            <div className="bg-white px-4 md:px-8 py-6 max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex text-sm text-gray-500 mb-2">
                <Link href="/" className="text-blue-600 hover:underline transition-colors">
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
                <Link href="/blogs" className="text-blue-600 hover:underline transition-colors">
                  Blog
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
              <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        

              {/* Big Image Section */}
              <BigImageBlogSection mainMatch={mainMatch} sidebarMatches={sidebarMatches} />
              <div className="my-4" />
              <GridViewSection gridMatches={gridMatches} />
              <ListViewSection listMatches={listMatches} />
              {/* Pagination */}
              {/* <Pagination /> */}
            </div>
            content: <p className="content page text-[#323232]" dangerouslySetInnerHTML={{ __html: initialData.content || "" }} />
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