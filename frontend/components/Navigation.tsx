/**
 * Main Navigation Component
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Container } from './ui';

export function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/companies', label: t('nav.companies') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/dashboard', label: t('nav.dashboard') },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95">
      <Container>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1d4ed8] to-[#2563eb] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow transition-all">
              <span className="text-white font-bold text-xl">🇺🇦</span>
            </div>
            <span className="text-xl font-bold text-[#0f172a] hidden sm:block">
              Ukraine Rebuild
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-[#eff6ff] text-[#1d4ed8]'
                    : 'text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA and Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/register-company"
              className="px-4 py-2 bg-[#1d4ed8] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-all shadow-sm hover:shadow"
            >
              {t('nav.registerCompany')}
            </Link>
            <Link
              href="/register-project"
              className="px-4 py-2 border-2 border-[#1d4ed8] text-[#1d4ed8] rounded-lg font-semibold hover:bg-[#eff6ff] transition-all"
            >
              {t('nav.registerProject')}
            </Link>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'uk')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">EN</option>
              <option value="uk">УК</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/register-company"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700"
              >
                {t('nav.registerCompany')}
              </Link>
              <Link
                href="/register-project"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium text-center hover:bg-blue-50"
              >
                {t('nav.registerProject')}
              </Link>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'uk')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
              >
                <option value="en">English</option>
                <option value="uk">Українська</option>
              </select>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
