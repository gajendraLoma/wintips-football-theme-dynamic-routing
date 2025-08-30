import Image from 'next/image';
import Link from 'next/link';
import {Post} from '../../types/interface/getPostByCatTypo';
import {getFullImageUrl} from '@/lib/utils';

export default function ListViewSection({listMatches}: {listMatches: Post[]}) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full">
          <div className="space-y-6">
            {listMatches?.slice(0, 9).map((match, i) => (
              <div
                key={i}
                className="flex items-start gap-3 group"
              >
                <div className="relative w-[6rem] h-[4rem] lg:w-[10rem] lg:h-[6rem] flex-shrink-0 rounded overflow-hidden">
                  <Link
                    href={`${match?.slug || ''}`}
                    className="block w-full h-full"
                  >
                    <Image
                      src={getFullImageUrl(match?.featured_image)}
                      alt={match?.title || 'Default Image'}
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
                    href={`${match?.slug || ''}`}
                    className="pb-0 text-sm lg:text-lg font-bold text-gray-900 transition-colors duration-300 hover:text-[#60a5fa] line-clamp-2"
                  >
                    <h3>{match?.title}</h3>
                  </Link>
                  <p className="lg:text-sm text-xs font-medium text-gray-800 transition-colors duration-300 line-clamp-1 lg:line-clamp-3">
                    {match?.des}
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
