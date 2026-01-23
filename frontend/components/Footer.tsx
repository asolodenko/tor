/**
 * Footer Component
 */
'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Container } from './ui';

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-[#cbd5e1] mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Ukraine Rebuild</h3>
            <p className="text-sm">
              {language === 'en' 
                ? 'Digital platform connecting municipalities, companies, and donors for infrastructure reconstruction in Ukraine.'
                : 'Цифрова платформа, що об\'єднує муніципалітети, компанії та донорів для відновлення інфраструктури в Україні.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              {language === 'en' ? 'Navigation' : 'Навігація'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-white transition-colors">
                  {t('nav.companies')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              {language === 'en' ? 'Get Involved' : 'Долучитися'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register-company" className="hover:text-white transition-colors">
                  {t('nav.registerCompany')}
                </Link>
              </li>
              <li>
                <Link href="/register-project" className="hover:text-white transition-colors">
                  {t('nav.registerProject')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              {language === 'en' ? 'Contact' : 'Контакти'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>info@ukrainerebuild.org</li>
              <li>+41 XX XXX XX XX</li>
              <li>Switzerland</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 text-sm text-center">
          <p>
            © {currentYear} Ukraine Rebuild Platform. {language === 'en' ? 'All rights reserved.' : 'Всі права захищено.'}
          </p>
        </div>
      </Container>
    </footer>
  );
}

