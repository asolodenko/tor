/**
 * Project Registration/Edit Form Component
 */
'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, Input, Textarea, Select, Button, Alert } from '@/components/ui';

export const SECTORS = [
  'Water Infrastructure',
  'Energy',
  'Transportation',
  'Digital Infrastructure',
  'Public Buildings',
  'Healthcare Facilities',
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
    <div className="max-w-3xl mx-auto">
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

      <Card className="p-8 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <Textarea
            label={t('projectReg.form.description')}
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the project objectives, scope, and expected outcomes..."
          />

          <Select
            label={t('projectReg.form.sector')}
            required
            options={SECTORS.map(s => ({ value: s, label: s }))}
            value={formData.sector}
            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('projectReg.form.technologies')} <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={formData.requiredTechnologies}
              onChange={(e) => setFormData({ ...formData, requiredTechnologies: e.target.value })}
              placeholder="e.g., Water Treatment, Filtration Systems (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-1">Separate multiple technologies with commas</p>
          </div>

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

          <div className="flex gap-4 pt-4">
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
      </Card>
    </div>
  );
}
