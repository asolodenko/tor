/**
 * Company Registration Page
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Input, Textarea, MultiSelect, Button, Alert } from '@/components/ui';
import { saveCompany, Company } from '@/lib/storage';

const SECTORS = [
  'Water Infrastructure',
  'Energy',
  'Transportation',
  'Digital Infrastructure',
  'Public Buildings',
  'Healthcare Facilities',
];

export default function RegisterCompany() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    sector: [] as string[],
    technologies: '',
    description: '',
    email: '',
    website: '',
    contactPerson: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.country || formData.sector.length === 0 || 
        !formData.technologies || !formData.description || !formData.email || 
        !formData.contactPerson || !formData.phone) {
      setError(t('companyReg.form.error'));
      return;
    }

    setLoading(true);

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

        setLoading(false);
        setSuccess(true);
        
        router.push('/companies');
    }, 2000);
  };

  return (
    <Section>
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {t('companyReg.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('companyReg.subtitle')}
            </p>
          </div>

          {success && (
            <Alert type="success" onClose={() => setSuccess(false)}>
              {t('companyReg.form.success')}
            </Alert>
          )}

          {error && (
            <Alert type="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Card className="p-8 mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label={t('companyReg.form.companyName')}
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Swiss Engineering AG"
              />

              <Input
                label={t('companyReg.form.country')}
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g., Switzerland"
              />

              <MultiSelect
                label={t('companyReg.form.sector')}
                options={SECTORS}
                selected={formData.sector}
                onChange={(selected) => setFormData({ ...formData, sector: selected })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('companyReg.form.technologies')} <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="e.g., Water Treatment, Solar Power, Smart Grids (comma-separated)"
                />
                <p className="text-sm text-gray-500 mt-1">Separate multiple technologies with commas</p>
              </div>

              <Textarea
                label={t('companyReg.form.description')}
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your company's expertise and experience..."
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label={t('companyReg.form.email')}
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com"
                />

                <Input
                  label={t('companyReg.form.website')}
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://company.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label={t('companyReg.form.contactPerson')}
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="John Doe"
                />

                <Input
                  label={t('companyReg.form.phone')}
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+41 XX XXX XX XX"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? t('common.loading') : t('companyReg.form.submit')}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  {t('companyReg.form.cancel')}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
