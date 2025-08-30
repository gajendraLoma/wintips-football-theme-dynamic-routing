import Image from 'next/image';
import Link from 'next/link';
import {Post} from '../../types/interface/getPostByCatTypo';
import {getFullImageUrl} from '@/lib/utils';

export default function BigImageBlogSection({
  mainMatch,
  sidebarMatches
}: {
  mainMatch: Post;
  sidebarMatches: Post;
}) {
  if (!mainMatch && !sidebarMatches) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      <div className="space-y-6">
        <div className="block bg-white rounded overflow-hidden border group pb-4">
          <div className="relative max-md:h-[230px] h-[330px] max-sm:h-48 cursor-pointer overflow-hidden rounded-md">
            <Link href={`${mainMatch?.slug}`} className="block w-full h-full">
              <Image
                src={getFullImageUrl(mainMatch?.featured_image)}
                alt={mainMatch?.title || 'featured image'}
                width={800}
                height={350}
                className="w-full h-full object-cover"
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          </div>

          <Link
            href={`${mainMatch?.slug}`}
            className="block px-4 py-3 pb-0 text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-[#60a5fa]"
          >
            <h3>{mainMatch?.title}</h3>
          </Link>
          <p className="px-4 text-sm  font-medium text-gray-800 transition-colors duration-300 line-clamp-2">
            {sidebarMatches?.des}
          </p>
        </div>
      </div>
      {sidebarMatches && (
        <div className="flex flex-col gap-3">
          <div className="block bg-white rounded-md overflow-hidden group pb-3">
            <div className="relative overflow-hidden">
              <Link
                href={`${sidebarMatches?.slug}`}
                className="block w-full h-64"
              >
                <Image
                  src={getFullImageUrl(sidebarMatches?.featured_image)}
                  alt={sidebarMatches?.title || 'featured image'}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
            </div>

            <Link
              href={`${sidebarMatches?.slug}`}
              className="block py-3 pb-0 text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-[#60a5fa] line-clamp-2"
            >
              <h3>{sidebarMatches?.title}</h3>
            </Link>
            <p className="text-sm  font-medium text-gray-800 transition-colors duration-300 line-clamp-4">
              {sidebarMatches?.des}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
