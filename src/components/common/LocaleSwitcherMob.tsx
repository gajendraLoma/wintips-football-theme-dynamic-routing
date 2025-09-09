"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition, useState, useEffect, useRef } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";

export default function LocaleSwitcherMob() {
  const t = useTranslations();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const flagMap: Record<string, string> = {
    en: "/svg/eenFlag.svg",
    vi: "/svg/vviFlag.svg",
  };

  const languages = [
    { code: "en", name: t("en") },
    { code: "vi", name: t("vi") },
  ];

  const handleLocaleChange = (value: string) => {
    startTransition(() => {
      setUserLocale(value as Locale).then(() => {
      }).catch((err) => {
        console.error("Locale update failed:", err); // Catch errors
      });
    });
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center" ref={dropdownRef}>
      <div
        className="dropdown-mob"
        onClick={handleToggle}
        onBlur={() => {
          setIsOpen(false);
        }}
      >
        <img
          src={flagMap[locale]}
          alt={`${locale} flag`}
          className="object-cover"
        />
      </div>
      <div className="dropdown-options-mob">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className="dropdown-option-mob"
            style={{ backgroundImage: `url(${flagMap[lang.code]})` }}
            onClick={() => handleLocaleChange(lang.code)}
          >
            {lang.name}
          </div>
        ))}
      </div>

      <style>{`
        .dropdown-mob {
          position: relative;
          width: 28px;
          height: 28px;
          border: 1px solid #5595d5;
          border-radius: 50px;
          background: #5595d5;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.2s ease;
        }
        .dropdown-mob img {
          width: 18px;
          height: 18px;
          position: absolute;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 100px;
          object-fit: cover;
        }
        .dropdown-options-mob {
          position: absolute;
          top: 32px;
          right: -28px;
          width: 120px;
          background: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 6px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          display: ${isOpen ? "block" : "none"};
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.2s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dropdown-option-mob {
          padding: 8px 10px 8px 35px;
          color: #000;
          background-repeat: no-repeat;
          background-position: 5px center;
          background-size: 20px 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background-color 0.2s ease;
        }
        .dropdown-option-mob img {
          margin-right: 8px;
        }
        @media (min-width: 1279px) {
          .dropdown-mob,
          .dropdown-options-mob,
          .dropdown-option-mob {
            display: none; 
          }
        }
      `}</style>
    </div>
  );
}