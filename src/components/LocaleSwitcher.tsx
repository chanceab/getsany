'use client';

import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { usePathname, useRouter } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = AppConfig.localesMap[locale];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });

    // router.refresh(); // Ensure the page takes the new locale into account related to the issue #395
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="选择语言"
      >
        <span className="text-sm font-medium">{currentLocale}</span>
        <svg
          className={`size-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 min-w-[160px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {Object.entries(AppConfig.localesMap).map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600 focus:outline-none ${key === locale
                ? 'bg-indigo-100 font-medium text-indigo-600'
                : 'text-gray-700'
              }`}
              onClick={() => handleChange(key)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
