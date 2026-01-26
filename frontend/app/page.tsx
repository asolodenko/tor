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
      <Section>
        <Container>
          <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>
            <div className="max-w-3xl relative z-10 p-12 md:p-16 lg:p-20">
              {/* <div className="inline-flex items-center gap-2 bg-[#3b82f6] text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                {t('landing.hero.badge')}
              </div> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
                {t('landing.hero.title')}
              </h1>
              <p className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl leading-relaxed">
                {t('landing.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects">
                  <Button size="lg" className="w-full sm:w-auto bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-lg hover:shadow-xl">
                    {t('landing.hero.ctaPrimary')}
                  </Button>
                </Link>
                <Link href="/register-project">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                    {t('landing.hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section className="py-12">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 border-t-4 border-t-[#3b82f6]" hover>
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-semibold text-[#64748b] uppercase tracking-wide">
                  {t('landing.stats.totalFunded.label')}
                </p>
                <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-black text-[#0f172a] mb-2">
                {t('landing.stats.totalFunded.value')}
              </div>
              <div className="h-1 w-20 bg-[#3b82f6] rounded-full"></div>
              <p className="text-sm text-[#64748b] mt-3">
                {t('landing.stats.totalFunded.change')}
              </p>
            </Card>

            <Card className="p-8 border-t-4 border-t-[#3b82f6]" hover>
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-semibold text-[#64748b] uppercase tracking-wide">
                  {t('landing.stats.activeProjects.label')}
                </p>
                <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="text-4xl font-black text-[#0f172a] mb-2">
                {t('landing.stats.activeProjects.value')}
              </div>
              <div className="h-1 w-20 bg-[#3b82f6] rounded-full"></div>
              <p className="text-sm text-[#64748b] mt-3">
                {t('landing.stats.activeProjects.change')}
              </p>
            </Card>

            <Card className="p-8 border-t-4 border-t-[#3b82f6]" hover>
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-semibold text-[#64748b] uppercase tracking-wide">
                  {t('landing.stats.strategicPartners.label')}
                </p>
                <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-4xl font-black text-[#0f172a] mb-2">
                {t('landing.stats.strategicPartners.value')}
              </div>
              <div className="h-1 w-20 bg-[#3b82f6] rounded-full"></div>
              <p className="text-sm text-[#64748b] mt-3">
                {t('landing.stats.strategicPartners.change')}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Structural Process Section */}
      <Section className="bg-[#f8fafc]">
        <Container>
          <div className="mb-8">
            <p className="text-sm font-bold text-[#3b82f6] uppercase tracking-wide mb-4">
              {t('landing.structural.badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 max-w-2xl">
              {t('landing.structural.title')}
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl leading-relaxed">
              {t('landing.structural.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* For Municipalities */}
            <Card className="p-8 bg-white border-2 border-gray-100" hover>
              <div className="w-12 h-12 bg-[#3b82f6]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-[#0f172a] mb-4">
                {t('landing.structural.municipalities.title')}
              </h3>
              <p className="text-[#64748b] mb-6 leading-relaxed">
                {t('landing.structural.municipalities.description')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#0f172a] text-sm">
                    {t('landing.structural.municipalities.feature1')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#0f172a] text-sm">
                    {t('landing.structural.municipalities.feature2')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#0f172a] text-sm">
                    {t('landing.structural.municipalities.feature3')}
                  </span>
                </li>
              </ul>
              <Link href="/register-project">
                <Button className="w-full sm:w-auto bg-[#3b82f6] text-white hover:bg-[#2563eb]">
                  {t('landing.structural.municipalities.cta')} →
                </Button>
              </Link>
            </Card>

            {/* For Private Sector & Donors */}
            <Card className="p-8 bg-white border-2 border-gray-100" hover>
              <div className="w-12 h-12 bg-[#3b82f6]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-[#0f172a] mb-4">
                {t('landing.structural.donors.title')}
              </h3>
              <p className="text-[#64748b] mb-6 leading-relaxed">
                {t('landing.structural.donors.description')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#0f172a] text-sm">
                    {t('landing.structural.donors.feature1')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#0f172a] text-sm">
                    {t('landing.structural.donors.feature2')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#0f172a] text-sm">
                    {t('landing.structural.donors.feature3')}
                  </span>
                </li>
              </ul>
              <Link href="/register-company">
                <Button className="w-full sm:w-auto bg-[#3b82f6] text-white hover:bg-[#2563eb]">
                  {t('landing.structural.donors.cta')} →
                </Button>
              </Link>
            </Card>
          </div>
        </Container>
      </Section>

      {/* AI Matchmaking Section */}
      <Section>
        <Container>
          <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white relative overflow-hidden rounded-3xl p-12 md:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQyIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAgMCBMIDAgMCAwIDEwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQyKSIvPjwvc3ZnPg==')] opacity-60"></div>
            <div className="relative z-10 max-w-6xl">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm font-bold uppercase tracking-wide">
                  {t('landing.ai.badge')}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    {t('landing.ai.title')}
                  </h2>
                  <p className="text-white/90 leading-relaxed mb-8">
                    {t('landing.ai.description')}
                  </p>
                  <Link href="/projects">
                    <Button size="lg" className="bg-white text-[#3b82f6] hover:bg-white/90">
                      {t('landing.ai.cta')} ⚡
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-6 md:gap-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-5xl font-black mb-2">
                      {t('landing.ai.stat1.value')}
                    </div>
                    <p className="text-sm text-white/80 uppercase tracking-wide font-semibold">
                      {t('landing.ai.stat1.label')}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-5xl font-black mb-2">
                      {t('landing.ai.stat2.value')}
                    </div>
                    <p className="text-sm text-white/80 uppercase tracking-wide font-semibold">
                      {t('landing.ai.stat2.label')}
                    </p>
                  </div>
                  <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center gap-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <p className="font-bold text-sm mb-1">
                        {t('landing.ai.feature.title')}
                      </p>
                      <p className="text-xs text-white/70">
                        {t('landing.ai.feature.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
