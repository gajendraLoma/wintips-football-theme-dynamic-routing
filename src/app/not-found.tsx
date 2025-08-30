import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
export default async function NotFound() {
  const t = await getTranslations();
  return (
    <main className="min-h-[38vh] bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('notFoundtitle')}
          </h1>
          <p className="text-gray-600">
            {t('notFounddescription')}{' '}
            <Link href="/" className="text-[#0066cc] hover:underline">
              {t('notFoundhomepageLink')}
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
