// app/[[...slug]]/page.tsx
import {notFound} from 'next/navigation';
import {Metadata} from 'next';
import {fetchPageData, fetchSlugType, fetchPostBySlug, fetchPostByCat} from '@/apis';
import Home from '@/components/pages/Home';
import BlogPage from '@/components/pages/BlogPage';
import BookmakersPage from '@/components/pages/BookmakersPage';
import CategoryPage from '@/components/pages/CategoryPage';
import OddsPage from '@/components/pages/OddsPage';
import ResultPage from '@/components/pages/ResultPage';
import SchedulePage from '@/components/pages/SchedulePage';
import StandingsPage from '@/components/pages/StandingsPage';
import SoccerTipsPage from '@/components/pages/SoccerTipsPage';
import MatchPredicttionPage from '@/components/pages/MatchPredicttionPage';
import PostDetailsPage from '@/components/pages/PostDetailsPage';
import BookmakerDetailsPage from '@/components/pages/BookmakerDetailsPage';
export const dynamic = 'force-dynamic';
import { getFullImageUrl } from "@/lib/utils";
  export async function generateMetadata({
    params: paramsPromise,
  }: {
    params: Promise<{ slug?: string[] }>;
  }): Promise<Metadata> {
    const params = await paramsPromise;
    const path = params.slug ? params.slug.join("/") : "";
    const domain = process.env.NEXT_PUBLIC_API_BASE_URL;
    const SITENAME = process.env.SITE_NAME;
    const slugType = await fetchSlugType(path);

    if ("error" in slugType || !slugType.type) return { title: "Not Found" };

    let pageData: any;
    if (["page", "category", "league"].includes(slugType.type)) {
    // For category and league lists, we might need postByCat, but for metadata, try pageData first
    // If it's a list, adjust based on type
    if (slugType.type === 'category') {
      pageData = await fetchPostByCat('category', path, 'post', 1, 1); // Fetch first post for SEO
      if ('error' in pageData || !pageData || !pageData.posts || pageData.posts.length === 0) {
        pageData = await fetchPageData(path); // Fallback
      } else {
        pageData = pageData.posts[0]; // Use first post for title/desc
      }
    } else if (slugType.type === 'league') {
      pageData = await fetchPostByCat('league', path, 'match_predict', 1, 1); // For league predictions
      if ('error' in pageData || !pageData || !pageData.posts || pageData.posts.length === 0) {
        pageData = await fetchPageData(path); // Fallback
      } else {
        pageData = pageData.posts[0];
      }
    } else {
      pageData = await fetchPageData(path);
    }
    } else {
      pageData = await fetchPostBySlug(slugType.type, path);
    }

    if ("error" in pageData || !pageData) return { title: "Not Found" };

    const seoTitle = pageData.seo_title || pageData.title;
    const seoDescription = pageData.seo_description;
    const imageUrl = getFullImageUrl(pageData.image || pageData.post_image);

    return {
      title: seoTitle,
      description: seoDescription,
      alternates: {
        canonical: `${domain}/${path}`,
      },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: `${domain}/${path}`,
        images: [
          {
            width: 800,
            height: 600,
            url: imageUrl,
          },
        ],
        siteName: SITENAME,
      },
    };
  };

export default async function DynamicPage({
  params: paramsPromise
}: {
  params: Promise<{slug?: string[]}>;
}) {
  const params = await paramsPromise;
  const path = params.slug ? params.slug.join('/') : '';
  console.log('Path:', path);
  const slugType = await fetchSlugType(path);
  console.log('Slug Type:', slugType);

  if ('error' in slugType || !slugType.type) {
    // Handle category slugs manually if type is null (flat for posts)
    if (path.startsWith('category/')) {
      const categorySlug = path.replace('category/', '');
      const categoryData = await fetchPostByCat(
        'category',
        categorySlug,
        'post',
        16,
        1
      );
      if ('error' in categoryData || !categoryData) {
        console.log('Category Data Error:', categoryData);
        notFound();
      }
      return <CategoryPage data={categoryData} slug={categorySlug} sectionType="post" topLevelPath="/blogs" />;
    }
    // Handle prediction/league slugs manually if type is null (nested for predictions: match-predictions/league-slug)
    if (path.startsWith('match-predictions/')) {
      const leagueSlug = path.replace('match-predictions/', '');
      const leagueData = await fetchPostByCat(
        'league',
        leagueSlug,
        'match_predict',
        16,
        1
      );
      if ('error' in leagueData || !leagueData) {
        console.log('League/Prediction Data Error:', leagueData);
        notFound();
      }
      return <CategoryPage data={leagueData} slug={leagueSlug} sectionType="match_predict" topLevelPath="/match-predictions" />;
    }
    // Fallback for flat league if needed (e.g., if some leagues are flat)
    if (path.startsWith('league/')) {
      const leagueSlug = path.replace('league/', '');
      const leagueData = await fetchPostByCat(
        'league',
        leagueSlug,
        'match_predict',
        16,
        1
      );
      if ('error' in leagueData || !leagueData) {
        console.log('League Data Error:', leagueData);
        notFound();
      }
      return <CategoryPage data={leagueData} slug={leagueSlug} sectionType="match_predict" topLevelPath="/match-predictions" />;
    }
    console.log('Not Found due to slug type:', slugType);
    notFound();
  }

  const type = slugType.type;
  let pageData: any = null;

  switch (type) {
    case 'page':
      pageData = await fetchPageData(path);
      break;
    case 'league':
      // Updated: For league, fetch postByCat for predictions list per your description
      // But since nested handling is above, this is for flat leagues if slugType returns 'league'
      pageData = await fetchPostByCat('league', path, 'match_predict', 16, 1);
      break;
    case 'category':
      // Fixed: Use fetchPostByCat for category lists per docs
      pageData = await fetchPostByCat('category', path, 'post', 16, 1);
      break;
    case 'post':
    case 'match_predict': // Fixed: Added/updated to match docs 'match_predict' for predictions
    case 'bookmaker':
      pageData = await fetchPostBySlug(type, path);
      break;
    default:
      console.log('Unhandled fetch type:', type);
      notFound();
  }

  if (!pageData || 'error' in pageData) {
    console.log('Page Data Error:', pageData);
    notFound();
  }

  console.log('Page Data:', pageData);

  const finalType = (pageData.type || type || '').toLowerCase();
  console.log('Rendering component for type:', finalType);

  switch (finalType) {
    case 'home':
      return <Home data={pageData} />;
    case 'predicts':
      return <MatchPredicttionPage data={pageData} />;
    case 'blogs':
      return <BlogPage data={pageData} />;
    case 'bookmakers':
      return <BookmakersPage data={pageData} />;
    case 'category':
      return (
        <CategoryPage data={pageData} slug={path} sectionType="post" topLevelPath="/blogs" />
      );
    case 'league':
      return (
        <CategoryPage data={pageData} slug={path} sectionType="match_predict" topLevelPath="/match-predictions" />
      );
    case 'odds':
      return <OddsPage data={pageData} />;
    case 'results':
      return <ResultPage data={pageData} />;
    case 'fixture':
      return <SchedulePage data={pageData} />;
    case 'standings':
      return <StandingsPage data={pageData} />;
    case 'tips':
      return <SoccerTipsPage data={pageData} />;
    case 'post':
      return <PostDetailsPage data={pageData} type="post" />;
    case 'match_predict': 
      return <PostDetailsPage data={pageData} type="match_predict" />;
      case 'bookmaker':
      return <BookmakerDetailsPage data={pageData} type="bookmaker" />;
    case 'default':
      console.log('Falling back to BlogPage for unhandled type:', finalType);
      return <BlogPage data={pageData} />;
    default:
      console.log('Unhandled render type:', finalType);
      notFound();
  }
}