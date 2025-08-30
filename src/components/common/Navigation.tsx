import {ChevronDown} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {MenuItem, MenuData} from '@/types/interface/getMenuTypo';
import {fetchMenuData} from '@/apis';
import MobileNavigation from './MobileNavigation';
import LocaleSwitcherPc from './LocaleSwitcherPc';
import LocaleSwitcherMob from './LocaleSwitcherMob';

export default async function Navigation({locale}: {locale: string}) {
  const data = await fetchMenuData();
  const menuData = 'error' in data ? null : (data as MenuData);

  if (!menuData) {
    return <></>;
  }

  const getLabel = (lang: MenuItem['lang'], currentLocale: string): string => {
    const langItem = lang.find((l) => l[currentLocale]);
    return langItem
      ? langItem[currentLocale]
      : lang[0]?.[Object.keys(lang[0])[0]] || '';
  };

  const menuItems: {
    url: string;
    label: string;
    hasSubmenu: boolean;
    submenu: {url: string; label: string; parentUrl: string}[];
  }[] = menuData.result.map((item: MenuItem) => ({
    url: item.url,
    label: getLabel(item.lang, locale),
    hasSubmenu: !!item.submenu && item.submenu.length > 0,
    submenu:
      item.submenu?.map((sub: MenuItem) => ({
        url: sub.url,
        label: getLabel(sub.lang, locale),
        parentUrl: item.url
      })) || []
  }));

  return (
    <header className="bg-[#0065cb] text-white px-4 md:shadow-[0px_4px_30px_0px_#00000040] sticky top-0 left-0 right-0 z-50">
      <nav className="max-w-8xl mx-auto h-full flex justify-between items-center lg:px-8">
        <div className="py-1 md:py-2">
          <Link href="/" className="flex items-center">
            <Image
              alt="Wintips logo"
              loading="lazy"
              src="/images/logo-wintips.webp"
              width={190}
              height={36}
              className="mr-2 h-[50px] object-contain"
            />
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 m-0 h-full">
          {menuItems.map((item, index) => (
            <li key={index} className="h-full py-4 relative group">
              {item.hasSubmenu ? (
                <div>
                  <Link
                    href={item.url}
                    className="transition-colors flex items-center addhereActiveclass text-sm hover:text-[#60a5fa]"
                  >
                    {item.label}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </Link>
                  <div className="absolute rounded top-[45px] hidden group-hover:block min-w-48 bg-[#ffffff] shadow border-[1px solid #cecccc] z-10">
                    <ul className="px-4 py-2 flex flex-col gap-2">
                      {item.submenu.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={sub.url}
                            className="transition-colors text-sm text-gray-700 hover:text-[#60a5fa]"
                            data-parent-url={sub.parentUrl}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.url}
                  className="transition-colors inline-block w-full addhereActiveclass text-sm hover:text-[#60a5fa]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="h-full py-4">
            <LocaleSwitcherPc />
          </li>
        </ul>

        <div className="flex gap-1 items-center md:hidden">
          <LocaleSwitcherMob />
          <MobileNavigation menuItems={menuItems} />
        </div>
      </nav>
    </header>
  );
}
