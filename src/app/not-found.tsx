import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations();
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {t('notFoundtitle')}
      </h1>
      <p className="text-gray-600">
        {t('notFounddescription')}{" "}
        <Link href="/" className="text-[#0066cc] hover:underline">
          {t('notFoundhomepageLink')}
        </Link>
        .
      </p>
    </div>
  );
}