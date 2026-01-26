/**
 * Company Registration/Edit Form Component
 */
'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, Input, Textarea, Button, Alert } from '@/components/ui';

export const SECTORS = [
  { id: 'energy', label: 'Energy', description: 'Grids, renewables, substations', icon: '⚡' },
  { id: 'water', label: 'Water', description: 'Sanitation, supply, irrigation', icon: '💧' },
  { id: 'transport', label: 'Transport', description: 'Roads, bridges, railways', icon: '🚊' },
  { id: 'digital', label: 'Digital Infrastructure', description: 'Networks, data centers', icon: '📡' },
  { id: 'buildings', label: 'Public Buildings', description: 'Schools, offices, facilities', icon: '🏛️' },
  { id: 'healthcare', label: 'Healthcare', description: 'Hospitals, clinics, equipment', icon: '🏥' },
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
  registrationNumber?: string;
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
  registrationNumber: '',
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

  const toggleSector = (sectorLabel: string) => {
    const newSectors = formData.sector.includes(sectorLabel)
      ? formData.sector.filter(s => s !== sectorLabel)
      : [...formData.sector, sectorLabel];
    setFormData({ ...formData, sector: newSectors });
  };

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
    <div className="max-w-4xl mx-auto">
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Company Profile */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Company Profile
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">
              Essential legal and contact information for verification.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Official Company Name (EN)"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., European Grid Solutions Ltd."
              />

              <Input
                label="UDRPOU / Registration Number"
                value={formData.registrationNumber || ''}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                placeholder="8-digit code"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Headquarters Location"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g., Kyiv, Ukraine"
              />

              <Input
                label="Contact Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@company.com"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Sector Expertise */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Sector Expertise
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">
              Select sectors where your company has proven project experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {SECTORS.map((sector) => (
              <button
                key={sector.id}
                type="button"
                onClick={() => toggleSector(sector.label)}
                className={`p-6 rounded-xl border-2 transition-all text-left relative ${
                  formData.sector.includes(sector.label)
                    ? 'border-[#3b82f6] bg-[#eff6ff]'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {formData.sector.includes(sector.label) && (
                  <div className="absolute top-3 right-3">
                    <svg className="w-6 h-6 text-[#3b82f6]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="text-3xl mb-3">{sector.icon}</div>
                <div className={`font-bold text-lg mb-1 ${
                  formData.sector.includes(sector.label) ? 'text-[#3b82f6]' : 'text-[#0f172a]'
                }`}>
                  {sector.label}
                </div>
                <div className="text-sm text-[#64748b]">
                  {sector.description}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#0f172a] mb-1">AI Matching Optimization</p>
                <p className="text-sm text-[#64748b]">
                  Our AI uses these sectors to prioritize your company for upcoming municipal reconstruction tenders. Be specific for better results.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section 3: Technology Portfolio */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Technology Portfolio
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">
              Specialized machinery or innovative reconstruction techniques.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Technologies & Expertise <span className="text-red-500">*</span>
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
              label="Description of Specialized Capabilities"
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your technical advantages, proprietary software, or specialized heavy equipment..."
            />
          </div>
        </Card>

        {/* Section 4: Contact Information */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Contact Information
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">
              Primary contact details for communication and coordination.
            </p>
          </div>

          <div className="space-y-6">
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
                placeholder="+380 XX XXX XX XX"
              />
            </div>

            <Input
              label={t('companyReg.form.website')}
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://company.com"
            />
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4">
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
    </div>
  );
}
