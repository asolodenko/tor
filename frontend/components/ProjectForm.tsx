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
        {/* Section 1: Project Main Information */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
              1. Project Information
            </h2>
            <p className="text-sm text-[#64748b] flex items-start gap-2">
              <svg className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              This information helps our AI engine understand your project better and improve matching accuracy
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

        {/* Section 2: Description */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
              2. Project Description
            </h2>
            <p className="text-sm text-[#64748b] flex items-start gap-2">
              <svg className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Provide detailed information about objectives, scope, and expected outcomes for better AI matching
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

        {/* Section 3: Infrastructure Category */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
              3. Infrastructure Category
            </h2>
            <p className="text-sm text-[#64748b] flex items-start gap-2">
              <svg className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Select the primary infrastructure category for your project
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        </Card>

        {/* Section 4: Budget & Timeline */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
              4. Budget & Timeline
            </h2>
            <p className="text-sm text-[#64748b]">
              Provide budget and timeline information for planning purposes
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
