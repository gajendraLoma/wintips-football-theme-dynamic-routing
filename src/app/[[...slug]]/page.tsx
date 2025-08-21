// app/[[...slug]]/page.tsx
import {notFound} from 'next/navigation';
import {Metadata} from 'next';
import {
  fetchPageData,
  fetchSlugType,
  fetchPostBySlug,
  fetchPostByCat
} from '@/apis';
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
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: paramsPromise
}: {
  params: Promise<{slug?: string[]}>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const path = params.slug ? params.slug.join('/') : '';
  const slugType = await fetchSlugType(path);
  if ('error' in slugType || !slugType.type) return {title: 'Not Found'};

  let pageData: any;
  if (['page', 'category', 'league'].includes(slugType.type)) {
    pageData = await fetchPageData(path);
  } else {
    pageData = await fetchPostBySlug(slugType.type, path);
  }

  if ('error' in pageData || !pageData) return {title: 'Not Found'};
  return {
    title: pageData.seo_title || pageData.title || 'Football Theme',
    description: pageData.seo_description || 'Football betting and predictions'
  };
}

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
    // Handle category slugs manually if type is null
    if (path.startsWith('category/')) {
      const categorySlug = path.replace('category/', '');
      const categoryData = await fetchPostByCat(
        'post',
        categorySlug,
        'post',
        16,
        1
      );
      if ('error' in categoryData || !categoryData) {
        console.log('Category Data Error:', categoryData);
        notFound();
      }
      return <CategoryPage data={categoryData} slug={categorySlug} />;
    }
    console.log('Not Found due to slug type:', slugType);
    notFound();
  }

  const type = slugType.type;
  let pageData: any = null;

  switch (type) {
    case 'page':
    case 'league':
      pageData = await fetchPageData(path);
      break;
    case 'category':
      pageData = await fetchPageData(path); // Meta data, fetch posts in component
      break;
    case 'post':
    case 'match':
    case 'predict':
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
        <CategoryPage data={pageData} slug={path.replace('category/', '')} />
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
    case 'default':
      console.log('Falling back to BlogPage for unhandled type:', finalType);
      return <BlogPage data={pageData} />;
    default:
      console.log('Unhandled render type:', finalType);
      notFound();
  }
}
