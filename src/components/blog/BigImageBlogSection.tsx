import Image from 'next/image';
import Link from 'next/link';
import {Post} from '../../types/interface/getPostByCatTypo';
import {getFullImageUrl} from '@/lib/utils';
import {getTranslations} from 'next-intl/server';
export default async function BigImageBlogSection({
  mainMatch,
  sidebarMatches
}: {
  mainMatch: Post;
  sidebarMatches: Post;
}) {
  const t = await getTranslations();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      <div className="space-y-6">
        <div className="block bg-white rounded-md overflow-hidden shadow group cursor-pointer">
          <div className="relative overflow-hidden">
            <Link
              href={`/${mainMatch.slug || ''}`}
              className="block w-full h-full"
            >
              <Image
                src={getFullImageUrl(mainMatch.featured_image)}
                alt={mainMatch.title || 'Default Image'}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          </div>

          <Link
            href={`/${mainMatch.slug || ''}`}
            className="block px-4 py-3 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#60a5fa]"
          >
            <h3>{mainMatch.title || 'No Data'}</h3>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="block bg-white rounded-md overflow-hidden group cursor-pointer pb-3">
          <div className="relative overflow-hidden">
            <Link
              href={`/${sidebarMatches.slug || ''}`}
              className="block w-full h-64"
            >
              <Image
                src={getFullImageUrl(sidebarMatches.featured_image)}
                alt={sidebarMatches.title || 'Default Image'}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          </div>

          <Link
            href={`/${sidebarMatches.slug || ''}`}
            className="block my-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#60a5fa]"
          >
            <h3>{sidebarMatches.title || 'No Data'}</h3>
          </Link>
          <Link
            href={`/${sidebarMatches.slug || ''}`}
            className="block my-2 max-md:line-clamp-4 text-base line-clamp-5"
          >
            {t('publish_date')} {sidebarMatches.vn_date}
          </Link>
        </div>
      </div>
    </div>
  );
}
