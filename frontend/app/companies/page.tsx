/**
 * Companies Listing Page
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Badge, Input, Button } from '@/components/ui';
import { getCompanies, Company } from '@/lib/storage';

export default function CompaniesPage() {
  const { t, language } = useLanguage();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('all');

  useEffect(() => {
    setCompanies(getCompanies());
  }, []);

  const sectors = Array.from(new Set(companies.flatMap(c => c.sector)));

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = filterSector === 'all' || company.sector.includes(filterSector);
    
    return matchesSearch && matchesSector;
  });

  return (
    <Section>
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Registered Companies' : 'Зареєстровані компанії'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'en' 
              ? 'Browse companies ready to support Ukraine\'s infrastructure reconstruction'
              : 'Переглядайте компанії, готові підтримати відновлення інфраструктури України'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-96"
          />
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">{t('dashboard.filters.sector')}: All</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          <Link href="/register-company" className="ml-auto">
            <Button>{t('nav.registerCompany')}</Button>
          </Link>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              {language === 'en' ? 'No companies found' : 'Компанії не знайдено'}
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCompanies.map(company => (
              <Card key={company.id} className="p-6" hover>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <span>📍</span> {company.country}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.sector.map(s => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{company.description}</p>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Technologies:' : 'Технології:'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.technologies.slice(0, 5).map(tech => (
                      <Badge key={tech} variant="success">{tech}</Badge>
                    ))}
                    {company.technologies.length > 5 && (
                      <Badge variant="default">+{company.technologies.length - 5}</Badge>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <span>👤</span> {company.contactPerson}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📧</span> {company.email}
                  </p>
                  {company.website && (
                    <p className="flex items-center gap-2">
                      <span>🌐</span> 
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Website
                      </a>
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
