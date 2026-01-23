/**
 * Landing Page for Ukraine Infrastructure Platform
 */
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Button } from '@/components/ui';
import { initializeSampleData } from '@/lib/storage';

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-[#2563eb] to-[#3b82f6] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        <Container>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-sm">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90 font-medium">
              {t('landing.hero.subtitle')}
            </p>
            <p className="text-lg mb-8 text-white/80">
              {t('landing.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register-company">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#2563eb] hover:bg-[#f8fafc] shadow-lg hover:shadow-xl">
                  {t('landing.hero.ctaPrimary')}
                </Button>
              </Link>
              <Link href="/register-project">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm">
                  {t('landing.hero.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section>
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t('landing.features.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0f172a]">
                {t('landing.features.matching.title')}
              </h3>
              <p className="text-[#475569]">
                {t('landing.features.matching.description')}
              </p>
            </Card>

            <Card className="p-8 text-center" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0f172a]">
                {t('landing.features.transparent.title')}
              </h3>
              <p className="text-[#475569]">
                {t('landing.features.transparent.description')}
              </p>
            </Card>

            <Card className="p-8 text-center" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0f172a]">
                {t('landing.features.efficient.title')}
              </h3>
              <p className="text-[#475569]">
                {t('landing.features.efficient.description')}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Sectors Section */}
      <Section className="bg-[#f8fafc]">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0f172a]">
            {t('landing.sectors.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { key: 'water', icon: '💧' },
              { key: 'energy', icon: '⚡' },
              { key: 'transport', icon: '🚊' },
              { key: 'digital', icon: '📡' },
              { key: 'buildings', icon: '🏛️' },
              { key: 'healthcare', icon: '🏥' },
            ].map(sector => (
              <Card key={sector.key} className="p-6 text-center" hover>
                <div className="text-4xl mb-2">{sector.icon}</div>
                <p className="font-semibold text-[#0f172a]">
                  {t(`landing.sectors.${sector.key}`)}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        <Container>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white drop-shadow-sm">
              {t('landing.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('landing.cta.description')}
            </p>
            <Link href="/register-company">
              <Button size="lg" className="bg-white text-[#2563eb] hover:bg-[#f8fafc] shadow-lg hover:shadow-xl">
                {t('landing.cta.button')}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
