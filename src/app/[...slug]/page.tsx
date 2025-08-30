// app/[[...slug]]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchPageData, fetchSlugType, fetchPostBySlug, fetchPostByCat } from '@/apis';
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
import { getFullImageUrl } from '@/lib/utils';

export const dynamic = 'auto';
export const revalidate = 60;
async function resolveDataBySlug(slug: string): Promise<{ ok: true; type: string; data: any } | { ok: false; reason: string }> {
  const slugTypeResponse = await fetchSlugType(slug);
  if ('error' in slugTypeResponse || !slugTypeResponse.type) {
    return { ok: false, reason: 'slug not found' };
  }

  const type = slugTypeResponse.type;
  switch (type) {
    case 'page': {
      const pageData = await fetchPageData(slug);
      return pageData && !('error' in pageData)
        ? { ok: true, type: (pageData.type || 'default').toLowerCase(), data: pageData }
        : { ok: false, reason: 'page fetch failed' };
    }
    case 'category':
    case 'league': {
      const listData = await fetchPostByCat(type, slug, type === 'league' ? 'match_predict' : 'post', 16, 1);
      return listData && !('error' in listData) && Array.isArray(listData.posts) && listData.posts.length > 0
        ? { ok: true, type, data: listData }
        : { ok: false, reason: `${type} fetch failed` };
    }
    case 'post':
    case 'match_predict':
    case 'bookmaker': {
      const postData = await fetchPostBySlug(type, slug);
      return postData && !('error' in postData)
        ? { ok: true, type, data: postData }
        : { ok: false, reason: 'post fetch failed' };
    }
    default:
      return { ok: false, reason: `unhandled type: ${type}` };
  }
}

function buildSeo(metaSource: any, fallbackPath: string) {
  const domain = process.env.NEXT_PUBLIC_API_BASE_URL;
  const SITENAME = process.env.SITE_NAME;
  const seoTitle = metaSource?.seo_title || metaSource?.title;
  const seoDescription = metaSource?.seo_description;
  const imageUrl = getFullImageUrl(metaSource?.image || metaSource?.post_image || "/images/series-soccer-tips-default.webp");
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `${domain}/${fallbackPath}` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${domain}/${fallbackPath}`,
      images: [{ width: 800, height: 600, url: imageUrl }],
      siteName: SITENAME
    }
  } satisfies Metadata;
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await paramsPromise;
  const path = params.slug ? params.slug.join('/') : '';
  const resolved = await resolveDataBySlug(path);
  if (!resolved.ok) return { title: 'Not Found' };
  return buildSeo(resolved.type === 'category' || resolved.type === 'league' ? resolved.data : resolved.data, path);
}

export default async function DynamicPage({ params: paramsPromise }: { params: Promise<{ slug?: string[] }> }) {
  const params = await paramsPromise;
  const path = params.slug ? params.slug.join('/') : '';
  const resolved = await resolveDataBySlug(path);
  if (!resolved.ok) notFound();

  const { type, data } = resolved;
  const finalType = type.toLowerCase();

  switch (finalType) {
    case 'predicts':
      return <MatchPredicttionPage data={data} />;
    case 'blogs':
      return <BlogPage data={data} />;
    case 'bookmakers':
      return <BookmakersPage data={data} />;
    case 'category':
    case 'league':
      return <CategoryPage data={data} slug={path} />;
    case 'odds':
      return <OddsPage data={data} />;
    case 'results':
      return <ResultPage data={data} />;
    case 'fixture':
      return <SchedulePage data={data} />;
    case 'standings':
      return <StandingsPage data={data} />;
    case 'tips':
      return <SoccerTipsPage data={data} />;
    case 'post':
      return <PostDetailsPage data={data} type="post" />;
    case 'match_predict':
      return <PostDetailsPage data={data} type="match_predict" />;
    case 'bookmaker':
      return <BookmakerDetailsPage data={data} type="bookmaker" />;
    default:
      return <BlogPage data={data} />;
  }
}