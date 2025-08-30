// app/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchPageData } from '@/apis';
import Home from '@/components/pages/Home';
import { getFullImageUrl } from '@/lib/utils';
export const dynamic = 'auto';
export const revalidate = 60;
function buildSeo(metaSource: any) {
  const domain = process.env.NEXT_PUBLIC_API_BASE_URL;
  const SITENAME = process.env.SITE_NAME;
  const seoTitle = metaSource?.seo_title || metaSource?.title;
  const seoDescription = metaSource?.seo_description;
  const imageUrl = getFullImageUrl(metaSource?.image || metaSource?.post_image || "/images/series-soccer-tips-default.webp");
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `${domain}/` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${domain}/`,
      images: [{ width: 800, height: 600, url: imageUrl }],
      siteName: SITENAME
    }
  } satisfies Metadata;
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('');
  if (!pageData || 'error' in pageData) return { title: 'Not Found' };
  return buildSeo(pageData);
}

export default async function HomePage() {
  const pageData = await fetchPageData('');
  if (!pageData || 'error' in pageData) notFound();
  return <Home data={pageData} />;
}