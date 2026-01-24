/**
 * Project Registration Page
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section } from '@/components/ui';
import { saveProject, Project } from '@/lib/storage';
import { ProjectForm, ProjectFormData } from '@/components/ProjectForm';

export default function RegisterProject() {
  const { t } = useLanguage();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (formData: ProjectFormData) => {
    setError('');
    setSaving(true);

    // Create project object
    const project: Project = {
      id: `proj_${Date.now()}`,
      municipality: formData.municipality,
      region: formData.region,
      title: formData.title,
      description: formData.description,
      sector: formData.sector,
      requiredTechnologies: formData.requiredTechnologies.split(',').map(t => t.trim()),
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
      priority: formData.priority,
      status: 'pending',
      deadline: formData.deadline || undefined,
      createdAt: new Date().toISOString(),
    };

    // Save to local storage and redirect after 2 seconds
    setTimeout(() => {
      saveProject(project);

      setSaving(false);
      setSuccess(true);
      
      router.push('/projects');
    }, 1000);
  };

  return (
    <Section>
      <Container>
        <ProjectForm
          onSubmit={handleSubmit}
          saving={saving}
          success={success}
          error={error}
          onSuccessClose={() => setSuccess(false)}
          onErrorClose={() => setError('')}
          title={t('projectReg.title.register')}
          subtitle={t('projectReg.subtitle.register')}
          onCancel={() => router.back()}
        />
      </Container>
    </Section>
  );
}
