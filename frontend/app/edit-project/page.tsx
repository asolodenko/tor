/**
 * Project Edit Page
 */
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Alert } from '@/components/ui';
import { getProjects, saveProject, Project } from '@/lib/storage';
import { ProjectForm, ProjectFormData } from '@/components/ProjectForm';

function EditProjectContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useSearchParams();
  const projectId = params.get('projectId') || '';

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<ProjectFormData | undefined>();

  // Load project data on mount
  useEffect(() => {
    const projects = getProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    setInitialData({
      municipality: project.municipality,
      region: project.region,
      title: project.title,
      description: project.description,
      sector: project.sector,
      requiredTechnologies: project.requiredTechnologies.join(', '),
      budget: project.budget?.toString() || '',
      priority: project.priority,
      deadline: project.deadline || '',
    });
    setIsLoading(false);
  }, [projectId]);

  const handleSubmit = (formData: ProjectFormData) => {
    setError('');
    setSaving(true);

    // Create updated project object
    const updatedProject: Project = {
      id: projectId,
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
      saveProject(updatedProject);

      setSaving(false);
      setSuccess(true);
      
      router.push('/projects');
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
              {t('projectReg.form.notFound') || 'Project not found'}
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
          <ProjectForm
            initialData={initialData}
            onSubmit={handleSubmit}
            saving={saving}
            success={success}
            error={error}
            onSuccessClose={() => setSuccess(false)}
            onErrorClose={() => setError('')}
            title={t('projectReg.title.edit')}
            subtitle={t('projectReg.subtitle.edit')}
            submitButtonLabel={t('projectReg.form.submitEdit')}
            onCancel={() => router.back()}
          />
        )}
      </Container>
    </Section>
  );
}

export default function EditProject() {
  const { t } = useLanguage();
  
  return (
    <Suspense
      fallback={
        <Section>
          <Container>
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 text-center">
                <p className="text-gray-600">{t('common.loading')}</p>
              </Card>
            </div>
          </Container>
        </Section>
      }
    >
      <EditProjectContent />
    </Suspense>
  );
}
