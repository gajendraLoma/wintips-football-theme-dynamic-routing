"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface MenuItem {
  url: string;
  label: string;
  hasSubmenu: boolean;
  submenu: { url: string; label: string; parentUrl: string }[];
}

export default function MobileNavigation({ menuItems }: { menuItems: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeNav = () => {
    setIsOpen(false);
    setOpenMenu(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false); 
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        className="xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={clsx(
          "xl:hidden fixed inset-0 bg-[#1a222d] z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between p-3">
          <Link href="/" className="flex items-center" onClick={closeNav}>
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
                          openMenu === `mobile-${index}` ? "rotate-180" : ""
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
    </>
  );
}