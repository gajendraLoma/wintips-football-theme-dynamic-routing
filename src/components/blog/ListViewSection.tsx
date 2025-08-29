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
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
