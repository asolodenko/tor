/**
 * Company Registration/Edit Form Component
 */
'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, Input, Textarea, MultiSelect, Button, Alert } from '@/components/ui';

export const SECTORS = [
  'Water Infrastructure',
  'Energy',
  'Transportation',
  'Digital Infrastructure',
  'Public Buildings',
  'Healthcare Facilities',
];

export interface CompanyFormData {
  name: string;
  country: string;
  sector: string[];
  technologies: string;
  description: string;
  email: string;
  website: string;
  contactPerson: string;
  phone: string;
}

interface CompanyFormProps {
  initialData?: CompanyFormData;
  onSubmit: (data: CompanyFormData) => void;
  saving?: boolean;
  success?: boolean;
  error?: string;
  onSuccessClose?: () => void;
  onErrorClose?: () => void;
  title?: string;
  subtitle?: string;
  submitButtonLabel?: string;
  onCancel: () => void;
}

const defaultFormData: CompanyFormData = {
  name: '',
  country: '',
  sector: [],
  technologies: '',
  description: '',
  email: '',
  website: '',
  contactPerson: '',
  phone: '',
};

export function CompanyForm({
  initialData,
  onSubmit,
  saving = false,
  success = false,
  error = '',
  onSuccessClose,
  onErrorClose,
  title,
  subtitle,
  submitButtonLabel,
  onCancel,
}: CompanyFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CompanyFormData>(initialData || defaultFormData);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!formData.name || !formData.country || formData.sector.length === 0 || 
        !formData.technologies || !formData.description || !formData.email || 
        !formData.contactPerson || !formData.phone) {
      setValidationError(t('companyReg.form.error'));
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {title && (
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
      )}

      {success && (
        <Alert type="success" onClose={onSuccessClose}>
          {t('companyReg.form.success')}
        </Alert>
      )}

      {error && (
        <Alert type="error" onClose={onErrorClose}>
          {error}
        </Alert>
      )}

      {validationError && (
        <Alert type="error" onClose={() => setValidationError('')}>
          {validationError}
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
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? t('common.loading') : (submitButtonLabel || t('companyReg.form.submit'))}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onCancel}
              className="flex-1"
            >
              {t('companyReg.form.cancel')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
