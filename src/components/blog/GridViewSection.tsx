import Image from 'next/image';
import Link from 'next/link';
import {Post} from '../../types/interface/getPostByCatTypo';
import {getFullImageUrl} from '@/lib/utils';

export default function GridViewSection({gridMatches}: {gridMatches: Post[]}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {gridMatches?.map((match, i) => (
        <div
          key={i}
          className="bg-white rounded-md grid gap-2 items-start group relative"
        >
          <Link href={`${match?.slug || ''}`} className="contents">
            <div className="relative shrink-0 overflow-hidden rounded-md h-48">
              <Image
                src={getFullImageUrl(match?.featured_image)}
                alt={match?.title || 'Default Image'}
                width={400}
                height={250}
                className="w-full h-full object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <h3 className="pb-0 text-lg font-bold text-gray-900 transition-colors duration-300 hover:text-[#60a5fa] line-clamp-2">
              {match?.title}
            </h3>
            
          </Link>
          <p className="text-sm font-medium text-gray-800 transition-colors duration-300 line-clamp-2">
              {match?.des}
          </p>
        </div>
      ))}
    </div>
  );
}
