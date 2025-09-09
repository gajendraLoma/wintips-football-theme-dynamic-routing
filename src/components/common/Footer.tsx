// components/common/Footer.tsx
import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {fetchAllFooters} from '@/apis';
import ScrollToTopButton from './ScrollToTopButton';
import he from "he";
export default async function Footer({locale}: {locale: string}) {
  const t = await getTranslations();
  const footerData = await fetchAllFooters();

  const getLabel = (
    langs: Array<Record<string, string>>,
    currentLocale: string
  ) => {
    const match = langs.find((item) => item[currentLocale]);
    return match
      ? match[currentLocale]
      : langs[0]?.[Object.values(langs[0])[0]] || '';
  };

  const renderFooterSection = (location: string) => {
    const data = footerData[location];
    if (!data || data.error) return null;
    return (
      <div>
        <h3 className="sm:text-lg font-semibold mb-2 sm:mb-4">
          {data.title ? getLabel(data.title, locale) : ''}
        </h3>
        <ul className="space-y-2 text-sm text-gray-400">
          {data.result?.map((item: any, index: number) => (
            <li key={index}>
              <Link
                href={item.url}
                className="hover:text-white transition-colors"
              >
                {he.decode(getLabel(item.lang, locale) || '')}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="py-6 sm:py-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 xl:grid-cols-4 gap-4 sm:gap-8 pb-4 sm:pb-8">
            {renderFooterSection('footer-1')}
            {renderFooterSection('footer-2')}
            {renderFooterSection('footer-3')}
            {renderFooterSection('footer-4')}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 xl:grid-cols-4 gap-4 sm:gap-8 pb-4 sm:pb-8">
            {renderFooterSection('footer-5')}
            {renderFooterSection('footer-6')}
            {renderFooterSection('footer-7')}
            {renderFooterSection('footer-8')}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              {`© ${new Date().getFullYear()} ${process.env.SITE_NAME}. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </footer>
  );
}
