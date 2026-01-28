/**
 * Potential Match Detail Page
 */
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Badge, Button, Alert } from '@/components/ui';
import { getMatches, getProjects, getCompanies, saveMatch, Match, Project, Company } from '@/lib/storage';

function PotentialMatchContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const matchId = searchParams.get('matchId');

  const [match, setMatch] = useState<Match | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!matchId) {
      router.push('/dashboard');
      return;
    }

    const loadMatchData = () => {
      const matches = getMatches();
      const foundMatch = matches.find(m => m.id === matchId);
      
      if (!foundMatch) {
        router.push('/dashboard');
        return;
      }

      const projects = getProjects();
      const companies = getCompanies();
      
      const foundProject = projects.find(p => p.id === foundMatch.projectId);
      const foundCompany = companies.find(c => c.id === foundMatch.companyId);

      setMatch(foundMatch);
      setProject(foundProject || null);
      setCompany(foundCompany || null);
      setNotes(foundMatch.notes || '');
    };

    loadMatchData();
  }, [matchId, router]);

  const handleUpdateStatus = (status: Match['status']) => {
    if (!match) return;

    const updatedMatch = {
      ...match,
      status,
      validatedAt: status === 'validated' || status === 'published' ? new Date().toISOString() : match.validatedAt,
      validatedBy: status === 'validated' || status === 'published' ? 'Admin' : match.validatedBy,
    };

    saveMatch(updatedMatch);
    setMatch(updatedMatch);
    const statusMessages: { [key in Match['status']]: string } = {
      pending: '',
      validated: t('potentialMatch.successValidated'),
      rejected: t('potentialMatch.successRejected'),
      published: t('potentialMatch.successPublished'),
    };
    setAlert({ type: 'success', message: statusMessages[status] || `Match ${status} successfully!` });

    if (status === 'validated' || status === 'published') {
      setTimeout(() => router.push('/dashboard'), 1500);
    }
  };

  const handleSaveNotes = () => {
    if (!match) return;

    const updatedMatch = { ...match, notes };
    saveMatch(updatedMatch);
    setMatch(updatedMatch);
    setAlert({ type: 'success', message: t('potentialMatch.notesSaved') });
  };

  if (!match || !project || !company) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        </Container>
      </Section>
    );
  }

  const getStatusBadge = (status: Match['status']) => {
    const variants: { [key in Match['status']]: 'default' | 'warning' | 'success' | 'info' } = {
      pending: 'warning',
      validated: 'success',
      rejected: 'default',
      published: 'info',
    };
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const getSectorIcon = (sector: string) => {
    const icons: { [key: string]: string } = {
      'Water Infrastructure': '💧',
      'Energy Systems': '⚡',
      'Housing & Shelter': '🏠',
      'Transportation': '🚗',
      'Healthcare Facilities': '🏥',
      'Educational Buildings': '🎓',
    };
    return icons[sector] || '🏗️';
  };

  return (
    <Section>
      <Container>
        {alert && (
          <Alert type={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            ← {t('potentialMatch.backToDashboard')}
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('potentialMatch.title')}</h1>
              <p className="text-lg text-gray-600">{t('potentialMatch.subtitle')}</p>
            </div>
            {getStatusBadge(match.status)}
          </div>
        </div>

        {/* Match Score */}
        <Card className="p-8 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-2">{t('potentialMatch.aiMatchScore')}</div>
              <div className="text-6xl font-bold text-blue-600 mb-2">{match.relevanceScore}%</div>
              <div className="text-sm text-gray-700">
                {t('potentialMatch.scoreDescription')}
              </div>
            </div>
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(match.relevanceScore / 100) * 351.86} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900">
                {match.relevanceScore}%
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Project Details */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                🏗️
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('potentialMatch.municipalProject')}</div>
                <div className="text-xl font-bold text-gray-900">{project.title}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">{t('potentialMatch.location')}</div>
                <div className="text-gray-900 flex items-center gap-2">
                  <span>📍</span> {project.municipality}, {project.region}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">{t('potentialMatch.sector')}</div>
                <div className="flex gap-2">
                  <Badge>{project.sector}</Badge>
                  <Badge variant={
                    project.priority === 'high' ? 'danger' : 
                    project.priority === 'medium' ? 'warning' : 
                    'default'
                  }>
                    {project.priority.toUpperCase()} {t('potentialMatch.priority')}
                  </Badge>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">{t('potentialMatch.description')}</div>
                <div className="text-gray-900">{project.description}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">{t('potentialMatch.requiredTechnologies')}</div>
                <div className="flex flex-wrap gap-2">
                  {project.requiredTechnologies.map(tech => (
                    <Badge key={tech} variant="info">{tech}</Badge>
                  ))}
                </div>
              </div>

              {project.budget && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">{t('potentialMatch.budget')}</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${project.budget.toLocaleString()}
                  </div>
                </div>
              )}

              {project.deadline && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">{t('potentialMatch.deadline')}</div>
                  <div className="text-gray-900">
                    {new Date(project.deadline).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Company Details */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
                {getSectorIcon(project.sector)}
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('potentialMatch.privatePartner')}</div>
                <div className="text-xl font-bold text-gray-900">{company.name}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">{t('potentialMatch.location')}</div>
                <div className="text-gray-900 flex items-center gap-2">
                  <span>🌍</span> {company.country}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">{t('potentialMatch.expertiseSectors')}</div>
                <div className="flex flex-wrap gap-2">
                  {company.sector.map(s => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">{t('potentialMatch.companyOverview')}</div>
                <div className="text-gray-900">{company.description}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">{t('potentialMatch.availableTechnologies')}</div>
                <div className="flex flex-wrap gap-2">
                  {company.technologies.map(tech => (
                    <Badge key={tech} variant="success">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-2">{t('potentialMatch.contactInformation')}</div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span className="text-gray-900">{company.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">
                      {company.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span className="text-gray-900">{company.phone}</span>
                  </div>
                  {company.website && (
                    <div className="flex items-center gap-2">
                      <span>🌐</span>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Analysis */}
        {match.aiNote && (
          <Card className="p-6 mb-6 bg-blue-50 border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🤖</div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-blue-900 mb-2">{t('potentialMatch.aiAnalysis')}</div>
                <div className="text-blue-900 leading-relaxed whitespace-pre-line">
                  {match.aiNote}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Matched Technologies Breakdown */}
        <Card className="p-6 mb-6">
          <div className="text-lg font-semibold text-gray-900 mb-4">
            {t('potentialMatch.technologyAlignment')} ({match.matchedTechnologies.length} {t('potentialMatch.matches')})
          </div>
          <div className="flex flex-wrap gap-2">
            {match.matchedTechnologies.map(tech => (
              <Badge key={tech} variant="info" className="text-base py-2 px-4">
                ✓ {tech}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Validation Notes */}
        <Card className="p-6 mb-6">
          <div className="text-lg font-semibold text-gray-900 mb-4">{t('potentialMatch.validationNotes')}</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('potentialMatch.notesPlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          />
          <Button onClick={handleSaveNotes} className="mt-3">
            {t('potentialMatch.saveNotes')}
          </Button>
        </Card>

        {/* Actions */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-sm text-gray-600">
              {match.validatedAt && (
                <div>
                  {t('potentialMatch.validatedBy')} {match.validatedBy} {t('potentialMatch.on')}{' '}
                  {new Date(match.validatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              {match.status === 'pending' && (
                <>
                  <Button
                    variant="danger"
                    onClick={() => handleUpdateStatus('rejected')}
                  >
                    {t('potentialMatch.rejectMatch')}
                  </Button>
                  <Button onClick={() => handleUpdateStatus('validated')}>
                    {t('potentialMatch.validateMatch')}
                  </Button>
                </>
              )}
              
              {match.status === 'validated' && (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => handleUpdateStatus('pending')}
                  >
                    {t('potentialMatch.moveToPending')}
                  </Button>
                  <Button onClick={() => handleUpdateStatus('published')}>
                    {t('potentialMatch.publishMatch')}
                  </Button>
                </>
              )}

              {match.status === 'rejected' && (
                <Button onClick={() => handleUpdateStatus('pending')}>
                  {t('potentialMatch.moveToPending')}
                </Button>
              )}

              {match.status === 'published' && (
                <div className="text-green-600 font-medium flex items-center gap-2">
                  ✓ {t('potentialMatch.matchPublished')}
                </div>
              )}
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}

export default function PotentialMatchPage() {
  const { t } = useLanguage();
  
  return (
    <Suspense fallback={
      <Section>
        <Container>
          <div className="text-center py-12">
            <p className="text-gray-500">{t('common.loading')}</p>
          </div>
        </Container>
      </Section>
    }>
      <PotentialMatchContent />
    </Suspense>
  );
}
