/**
 * Project Registration/Edit Form Component
 */
'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, Input, Textarea, Select, Button, Alert } from '@/components/ui';

export const SECTORS = [
  { id: 'energy', label: 'Energy Grid', icon: '⚡' },
  { id: 'water', label: 'Water Supply', icon: '💧' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { id: 'transport', label: 'Transport', icon: '🚦' },
  { id: 'housing', label: 'Housing', icon: '🏘️' },
];

export interface ProjectFormData {
  municipality: string;
  region: string;
  title: string;
  description: string;
  sector: string;
  requiredTechnologies: string;
  budget: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
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

const defaultFormData: ProjectFormData = {
  municipality: '',
  region: '',
  title: '',
  description: '',
  sector: '',
  requiredTechnologies: '',
  budget: '',
  priority: 'medium',
  deadline: '',
};

export function ProjectForm({
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
}: ProjectFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ProjectFormData>(initialData || defaultFormData);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!formData.municipality || !formData.region || !formData.title || 
        !formData.description || !formData.sector || !formData.requiredTechnologies) {
      setValidationError(t('projectReg.form.error'));
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
          {t('projectReg.form.success')}
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
        {/* Section: Project Information */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Project Information
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">
              Basic details about your reconstruction project and location.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label={t('projectReg.form.municipality')}
                required
                value={formData.municipality}
                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                placeholder="e.g., Kyiv"
              />

              <Input
                label={t('projectReg.form.region')}
                required
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="e.g., Kyiv Oblast"
              />
            </div>

            <Input
              label={t('projectReg.form.projectTitle')}
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Water Treatment Plant Modernization"
            />
          </div>
        </Card>

        {/* Section: Project Description */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Project Description
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">
              Provide detailed information about objectives, scope, and expected outcomes.
            </p>
          </div>

          <Textarea
            label={t('projectReg.form.description')}
            required
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the project objectives, scope, and expected outcomes..."
          />

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('projectReg.form.technologies')} <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={formData.requiredTechnologies}
              onChange={(e) => setFormData({ ...formData, requiredTechnologies: e.target.value })}
              placeholder="e.g., Water Treatment, Filtration Systems, Renewable Energy (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-1">Separate multiple technologies with commas</p>
          </div>
        </Card>

        {/* Section: Infrastructure Category */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Infrastructure Category
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">
              Select the primary infrastructure category for your project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {SECTORS.map((sector) => (
              <button
                key={sector.id}
                type="button"
                onClick={() => setFormData({ ...formData, sector: sector.label })}
                className={`p-6 rounded-xl border-2 transition-all text-center ${
                  formData.sector === sector.label
                    ? 'border-[#3b82f6] bg-[#eff6ff] shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="text-4xl mb-3">{sector.icon}</div>
                <div className={`font-semibold ${
                  formData.sector === sector.label ? 'text-[#3b82f6]' : 'text-[#0f172a]'
                }`}>
                  {sector.label}
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
                  Our AI uses the category and required technologies to match your project with qualified international companies. Be specific for better results.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section: Budget & Timeline */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Budget & Timeline
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">
              Provide budget and timeline information for planning purposes.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label={t('projectReg.form.budget')}
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="5000000"
              />

              <Select
                label={t('projectReg.form.priority')}
                required
                options={[
                  { value: 'high', label: t('projectReg.form.priorities.high') },
                  { value: 'medium', label: t('projectReg.form.priorities.medium') },
                  { value: 'low', label: t('projectReg.form.priorities.low') },
                ]}
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
              />
            </div>

            <Input
              label={t('projectReg.form.deadline')}
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button type="submit" disabled={saving} className="flex-1">
            {saving ? t('common.loading') : (submitButtonLabel || t('projectReg.form.submit'))}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
            className="flex-1"
          >
            {t('projectReg.form.cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
}
