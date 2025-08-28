import Image from 'next/image';
import Link from 'next/link';
import {Post} from '../../types/interface/getPostByCatTypo';
import {getFullImageUrl} from '@/lib/utils';
import {getTranslations} from 'next-intl/server';

export default async function ListViewSection({
  listMatches
}: {
  listMatches: Post[];
}) {
  const t = await getTranslations();
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full">
          <div className="space-y-6">
            {listMatches.slice(0, 9).map((match, i) => (
              <div
                key={i}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="relative w-[10rem] h-[6rem] flex-shrink-0 rounded overflow-hidden">
                  <Link
                    href={`/${match.slug || ''}`}
                    className="block w-full h-full"
                  >
                    <Image
                      src={getFullImageUrl(match.featured_image)}
                      alt={match.title || 'Default Image'}
                      width={128}
                      height={80}
                      className="object-cover w-full h-full rounded"
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, 10rem"
                    />
                  </Link>
                </div>

                <div className="flex flex-col justify-center">
                  <Link
                    href={`/${match.slug || ''}`}
                    className="line-clamp-2 text-sm sm:text-[16px] font-bold text-gray-800 transition-colors duration-300 group-hover:text-[#60a5fa]"
                  >
                    <h3>{match.title}</h3>
                  </Link>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 mt-1 line-clamp-2">
                    {t('publish_date')} {match.vn_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
