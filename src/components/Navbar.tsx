'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavbarProps = {
  showLocaleSwitcher?: boolean;
  LocaleSwitcher?: React.ComponentType;
};

export const Navbar = ({ showLocaleSwitcher = false, LocaleSwitcher }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/x', label: 'X下载', icon: '📱' },
    { href: '/youtube', label: 'YouTube下载', icon: '📺' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 transition-colors hover:text-indigo-700"
          >
            GetsAny
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-2 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 font-medium transition-all ${isActive(link.href)
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* Language Switcher for Desktop */}
            {showLocaleSwitcher && LocaleSwitcher && (
              <div className="ml-4 border-l border-gray-200 pl-4">
                <LocaleSwitcher />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Language Switcher for Mobile */}
            {showLocaleSwitcher && LocaleSwitcher && (
              <div className="mr-2">
                <LocaleSwitcher />
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg
                className={`size-6 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen
                  ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    )
                  : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-4 space-y-2 border-t border-gray-100 pb-2 pt-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center rounded-lg px-4 py-3 font-medium transition-all ${isActive(link.href)
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <span className="mr-3 text-lg">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
