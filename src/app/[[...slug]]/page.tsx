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
import PostDetailsPage from '@/components/pages/PostDetailsPage';
import BookmakerDetailsPage from '@/components/pages/BookmakerDetailsPage';
export const dynamic = 'force-dynamic';
import {getFullImageUrl} from '@/lib/utils';

// ---------------- Helper to fetch list data ----------------
async function fetchListData(
  type: 'category' | 'league',
  slug: string,
  options?: {perPage?: number; paged?: number}
) {
  const perPage = options?.perPage ?? 16;
  const paged = options?.paged ?? 1;
  return fetchPostByCat(
    type,
    slug,
    type === 'league' ? 'match_predict' : 'post',
    perPage,
    paged
  );
}

// ---------------- Main Resolver ----------------
async function resolveDataBySlug(
  slug: string,
  options?: {perPage?: number; paged?: number}
): Promise<{ok: true; type: string; data: any} | {ok: false; reason: string}> {
  // 1. Home Page
  if (!slug) {
    const pageData = await fetchPageData('');
    if (!pageData || 'error' in pageData)
      return {ok: false, reason: 'home not found'};
    return {
      ok: true,
      type: (pageData.type || 'home').toLowerCase(),
      data: pageData
    };
  }

  // 2. Slug Type API
  const slugType = await fetchSlugType(slug);

  if (!('error' in slugType) && slugType.type) {
    const type = slugType.type;

    if (type === 'page') {
      const pageData = await fetchPageData(slug);
      return pageData && !('error' in pageData)
        ? {
            ok: true,
            type: (pageData.type || 'default').toLowerCase(),
            data: pageData
          }
        : {ok: false, reason: 'page fetch failed'};
    }

    if (type === 'category' || type === 'league') {
      const listData = await fetchListData(type, slug, options);
      return listData && !('error' in listData)
        ? {ok: true, type, data: listData}
        : {ok: false, reason: `${type} fetch failed`};
    }

    if (['post', 'match_predict', 'bookmaker'].includes(type)) {
      const postData = await fetchPostBySlug(type as any, slug);
      return postData && !('error' in postData)
        ? {ok: true, type, data: postData}
        : {ok: false, reason: 'post fetch failed'};
    }

    return {ok: false, reason: `unhandled slugtype: ${type}`};
  }

  // 3. Fallback Probes
  const pageProbe = await fetchPageData(slug);
  if (pageProbe && !('error' in pageProbe) && pageProbe.title) {
    return {
      ok: true,
      type: (pageProbe.type || 'default').toLowerCase(),
      data: pageProbe
    };
  }

  for (const type of ['category', 'league'] as const) {
    const listProbe = await fetchListData(type, slug, options);
    if (
      listProbe &&
      !('error' in listProbe) &&
      Array.isArray(listProbe.posts)
    ) {
      return {ok: true, type, data: listProbe};
    }
  }

  for (const detailType of ['post', 'match_predict', 'bookmaker'] as const) {
    const detailProbe = await fetchPostBySlug(detailType, slug);
    if (detailProbe && !('error' in detailProbe) && detailProbe.title) {
      return {ok: true, type: detailType, data: detailProbe};
    }
  }

  return {ok: false, reason: 'no API resolved this slug'};
}

// ---------------- SEO Builder ----------------
function buildSeo(metaSource: any, fallbackPath: string) {
  const domain = process.env.NEXT_PUBLIC_API_BASE_URL;
  const SITENAME = process.env.SITE_NAME;
  const seoTitle = metaSource?.seo_title || metaSource?.title;
  const seoDescription = metaSource?.seo_description;
  const imageUrl = getFullImageUrl(metaSource?.image || metaSource?.post_image);
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {canonical: `${domain}/${fallbackPath}`},
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${domain}/${fallbackPath}`,
      images: [{width: 800, height: 600, url: imageUrl}],
      siteName: SITENAME
    }
  } satisfies Metadata;
}

// ---------------- Metadata ----------------
export async function generateMetadata({
  params: paramsPromise
}: {
  params: Promise<{slug?: string[]}>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const path = params.slug ? params.slug.join('/') : '';

  const resolved = await resolveDataBySlug(path, {perPage: 1, paged: 1});
  if (!resolved.ok) return {title: 'Not Found'};

  if (resolved.type === 'category' || resolved.type === 'league') {
    const list = resolved.data;
  
    return buildSeo( list, path);
  }

  return buildSeo(resolved.data, path || '');
}

// ---------------- Page ----------------
export default async function DynamicPage({
  params: paramsPromise,
  searchParams: searchParamsPromise
}: {
  params: Promise<{slug?: string[]}>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await paramsPromise;
  const searchParams = (await searchParamsPromise) || {};
  const path = params.slug ? params.slug.join('/') : '';
  const perPageParam =
    Number(
      Array.isArray(searchParams.per_page)
        ? searchParams.per_page[0]
        : searchParams.per_page
    ) || 16;
  const pagedParam =
    Number(
      Array.isArray(searchParams.paged)
        ? searchParams.paged[0]
        : searchParams.paged
    ) || 1;

  const resolved = await resolveDataBySlug(path, {
    perPage: perPageParam,
    paged: pagedParam
  });
  if (!resolved.ok) notFound();

  const {type, data} = resolved as {ok: true; type: string; data: any};
  const finalType = (data.type || type || '').toLowerCase();
  switch (finalType) {
    case 'home':
      return <Home data={data} />;
    case 'predicts':
      return <MatchPredicttionPage data={data} />;
    case 'blogs':
      return <BlogPage data={data} />;
    case 'bookmakers':
      return <BookmakersPage data={data} />;
    case 'category':
      return <CategoryPage data={data} slug={path} />;
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
