/**
 * Company Registration Page
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section } from '@/components/ui';
import { saveCompany, Company } from '@/lib/storage';
import { CompanyForm, CompanyFormData } from '@/components/CompanyForm';

export default function RegisterCompany() {
  const { t } = useLanguage();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (formData: CompanyFormData) => {
    setError('');
    setSaving(true);

    // Create company object
    const company: Company = {
      id: `comp_${Date.now()}`,
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
      saveCompany(company);

      setSaving(false);
      setSuccess(true);
      
      router.push('/companies');
    }, 1000);
  };

  return (
    <Section>
      <Container>
        <CompanyForm
          onSubmit={handleSubmit}
          saving={saving}
          success={success}
          error={error}
          onSuccessClose={() => setSuccess(false)}
          onErrorClose={() => setError('')}
          title={t('companyReg.title.register')}
          subtitle={t('companyReg.subtitle.register')}
          onCancel={() => router.back()}
        />
      </Container>
    </Section>
  );
}
