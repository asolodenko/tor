/**
 * Company Edit Page
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Alert } from '@/components/ui';
import { getCompanies, saveCompany, Company } from '@/lib/storage';
import { CompanyForm, CompanyFormData } from '@/components/CompanyForm';

export default function EditCompany() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const companyId = params.companyId as string;

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<CompanyFormData | undefined>();

  // Load company data on mount
  useEffect(() => {
    const companies = getCompanies();
    const company = companies.find(c => c.id === companyId);
    
    if (!company) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    setInitialData({
      name: company.name,
      country: company.country,
      sector: company.sector,
      technologies: company.technologies.join(', '),
      description: company.description,
      email: company.email,
      website: company.website || '',
      contactPerson: company.contactPerson,
      phone: company.phone,
    });
    setIsLoading(false);
  }, [companyId]);

  const handleSubmit = (formData: CompanyFormData) => {
    setError('');
    setSaving(true);

    // Create updated company object
    const updatedCompany: Company = {
      id: companyId,
      name: formData.name,
      country: formData.country,
      sector: formData.sector,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      description: formData.description,
      email: formData.email,
      website: formData.website,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      createdAt: new Date().toISOString(),
    };

    // Save to local storage and redirect after 2 seconds
    setTimeout(() => {
      saveCompany(updatedCompany);

      setSaving(false);
      setSuccess(true);
      
      router.push('/companies');
    }, 1000);
  };

  if (isLoading) {
    return (
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 text-center">
              <p className="text-gray-600">{t('common.loading')}</p>
            </Card>
          </div>
        </Container>
      </Section>
    );
  }

  if (notFound) {
    return (
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <Alert type="error">
              {t('companyReg.form.notFound') || 'Company not found'}
            </Alert>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        {initialData && (
          <CompanyForm
            initialData={initialData}
            onSubmit={handleSubmit}
            saving={saving}
            success={success}
            error={error}
            onSuccessClose={() => setSuccess(false)}
            onErrorClose={() => setError('')}
            title={t('companyReg.title.edit')}
            subtitle={t('companyReg.subtitle.edit')}
            submitButtonLabel={t('companyReg.form.submitEdit')}
            onCancel={() => router.back()}
          />
        )}
      </Container>
    </Section>
  );
}
