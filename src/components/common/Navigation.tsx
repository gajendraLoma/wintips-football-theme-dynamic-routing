// components/common/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useTranslations, useLocale } from 'next-intl';
import LocaleSwitcherMob from '../LocaleSwitcherMob';
import LocaleSwitcher from '../LocaleSwitcher';
import { MenuData, MenuItem } from '@/types/menu';
import { fetchMenuData } from '@/apis/services/menu';

export default function Navigation({ initialMenuData }: { initialMenuData: MenuData | { error: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuData, setMenuData] = useState<MenuData | null>(initialMenuData && !('error' in initialMenuData) ? initialMenuData : null);
  const [error, setError] = useState<string | null>('error' in initialMenuData ? initialMenuData.error : null);
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    if (!menuData && !error) {
      const loadMenuData = async () => {
        const data = await fetchMenuData();
        if ('error' in data) {
          setError(data.error);
        } else {
          setMenuData(data);
        }
      };
      loadMenuData();
    }
  }, [menuData, error]);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeNav = () => {
    setIsOpen(false);
    setOpenMenu(null);
  };

  if (error) {
    console.error(error);
    return null; // Or show a fallback UI
  }

  if (!menuData) {
    return <div>Loading navigation...</div>; // Loading state
  }

  const getLabel = (lang: MenuItem['lang'], currentLocale: string) => {
    const langItem = lang.find((l) => l[currentLocale]);
    return langItem ? langItem[currentLocale] : lang[0]?.[Object.keys(lang[0])[0]] || '';
  };

  const menuItems = menuData.result.map((item: MenuItem) => ({
    url: item.url,
    label: getLabel(item.lang, locale),
    hasSubmenu: !!item.submenu && item.submenu.length > 0,
    submenu: item.submenu?.map((sub: MenuItem) => ({
      url: sub.url,
      label: getLabel(sub.lang, locale),
      parentUrl: item.url,
    })) || [],
  }));

  return (
    <header className="bg-[#0065cb] text-white px-4 md:shadow-[0px_4px_30px_0px_#00000040] sticky top-0 left-0 right-0 z-50">
      <nav className="max-w-8xl mx-auto h-full flex justify-between items-center lg:px-8">
        {/* Logo */}
        <div className="py-1 md:py-2">
          <Link href="/" onClick={closeNav} className="flex items-center">
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

        {/* Desktop Menu */}
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
                            onClick={closeNav}
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
                  onClick={closeNav}
                  className="transition-colors inline-block w-full addhereActiveclass text-sm hover:text-[#60a5fa]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="h-full py-4">
            <LocaleSwitcher />
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex gap-1 items-center md:hidden">
          <LocaleSwitcherMob />
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            'md:hidden fixed inset-0 bg-[#1a222d] z-50 transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex justify-between p-3">
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
            <button onClick={closeNav} aria-label="Close mobile menu">
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-3 p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.hasSubmenu ? (
                  <>
                    <div className="flex justify-between items-center">
                      <Link
                        href={item.url}
                        className="flex justify-between text-sm hover:text-[#7BF179] transition-colors"
                        onClick={closeNav}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => toggleMenu(`mobile-${index}`)}
                        className="flex justify-between text-sm hover:text-[#7BF179] transition-colors pl-4"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transform transition-transform ${
                            openMenu === `mobile-${index}` ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                    {openMenu === `mobile-${index}` && (
                      <ul className="flex flex-col mt-1">
                        {item.submenu.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={sub.url}
                              onClick={closeNav}
                              className="text-sm block hover:text-[#7BF179] transition-colors"
                              data-parent-url={sub.parentUrl}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url}
                    onClick={closeNav}
                    className="text-sm block hover:text-[#7BF179] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}