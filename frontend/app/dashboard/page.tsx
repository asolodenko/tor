/**
 * Administrative Dashboard
 */
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Badge, Button, Alert, Input } from '@/components/ui';
import { 
  getMatches, getProjects, getCompanies, 
  saveMatch, generateMatches, 
  Match, Project, Company 
} from '@/lib/storage';

export default function Dashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'matches' | 'projects' | 'companies'>('matches');
  const [matches, setMatches] = useState<Match[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});

  const loadData = () => {
    setMatches(getMatches());
    setProjects(getProjects());
    setCompanies(getCompanies());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerateMatches = () => {
    const newMatches = generateMatches();
    newMatches.forEach(match => saveMatch(match));
    loadData();
    setAlert({ type: 'success', message: `Generated ${newMatches.length} new matches!` });
  };

  const handleUpdateMatchStatus = (matchId: string, status: Match['status']) => {
    const match = matches.find(m => m.id === matchId);
    if (match) {
      const updatedMatch = { 
        ...match, 
        status,
        validatedAt: status === 'validated' || status === 'published' ? new Date().toISOString() : match.validatedAt,
        validatedBy: status === 'validated' || status === 'published' ? 'Admin' : match.validatedBy,
      };
      saveMatch(updatedMatch);
      loadData();
      setAlert({ type: 'success', message: `Match ${status}!` });
    }
  };

  const handleSaveNotes = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    if (match) {
      const updatedMatch = { ...match, notes: editingNotes[matchId] || '' };
      saveMatch(updatedMatch);
      loadData();
      setEditingNotes(prev => ({ ...prev, [matchId]: '' }));
      setAlert({ type: 'success', message: 'Notes saved!' });
    }
  };

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  };

  const getCompanyById = (id: string): Company | undefined => {
    return companies.find(c => c.id === id);
  };

  const filteredMatches = matches.filter(match => {
    if (filterStatus !== 'all' && match.status !== filterStatus) return false;
    if (filterSector !== 'all') {
      const project = getProjectById(match.projectId);
      if (project?.sector !== filterSector) return false;
    }
    return true;
  }).sort((a, b) => b.relevanceScore - a.relevanceScore);

  const stats = {
    totalProjects: projects.length,
    totalCompanies: companies.length,
    pendingMatches: matches.filter(m => m.status === 'pending').length,
    validatedMatches: matches.filter(m => m.status === 'validated').length,
  };

  const getStatusBadge = (status: Match['status']) => {
    const variants: { [key in Match['status']]: 'default' | 'warning' | 'success' | 'info' } = {
      pending: 'warning',
      validated: 'success',
      rejected: 'default',
      published: 'info',
    };
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const getPriorityBadge = (priority: Project['priority']) => {
    const variants = {
      high: 'danger' as const,
      medium: 'warning' as const,
      low: 'default' as const,
    };
    return <Badge variant={variants[priority]}>{priority.toUpperCase()}</Badge>;
  };

  const sectors = Array.from(new Set(projects.map(p => p.sector)));

  return (
    <Section>
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {alert && (
          <Alert type={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalProjects}</div>
            <div className="text-sm text-gray-600">{t('dashboard.stats.totalProjects')}</div>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalCompanies}</div>
            <div className="text-sm text-gray-600">{t('dashboard.stats.totalCompanies')}</div>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingMatches}</div>
            <div className="text-sm text-gray-600">{t('dashboard.stats.pendingMatches')}</div>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.validatedMatches}</div>
            <div className="text-sm text-gray-600">{t('dashboard.stats.validatedMatches')}</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {(['matches', 'projects', 'companies'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t(`dashboard.tabs.${tab}`)}
            </button>
          ))}
        </div>

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Button onClick={handleGenerateMatches}>
                {t('dashboard.generate')}
              </Button>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">{t('dashboard.filters.all')}</option>
                <option value="pending">{t('dashboard.filters.pending')}</option>
                <option value="validated">{t('dashboard.filters.validated')}</option>
                <option value="rejected">{t('dashboard.filters.rejected')}</option>
                <option value="published">{t('dashboard.filters.published')}</option>
              </select>
              <select
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">{t('dashboard.filters.sector')}: All</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredMatches.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-gray-500 text-lg">{t('dashboard.noMatches')}</p>
                </Card>
              ) : (
                filteredMatches.map(match => {
                  const project = getProjectById(match.projectId);
                  const company = getCompanyById(match.companyId);
                  if (!project || !company) return null;

                  return (
                    <Card key={match.id} className="p-6">
                      <div className="grid md:grid-cols-12 gap-6">
                        {/* Relevance Score */}
                        <div className="md:col-span-2 flex flex-col items-center justify-center">
                          <div className="text-4xl font-bold text-blue-600">
                            {match.relevanceScore}%
                          </div>
                          <div className="text-sm text-gray-600">{t('dashboard.match.score')}</div>
                        </div>

                        {/* Match Details */}
                        <div className="md:col-span-7 space-y-3">
                          <div>
                            <div className="text-sm text-gray-600">{t('dashboard.match.project')}</div>
                            <div className="font-semibold text-gray-900">{project.title}</div>
                            <div className="text-sm text-gray-600">{project.municipality}, {project.region}</div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-600">{t('dashboard.match.company')}</div>
                            <div className="font-semibold text-gray-900">{company.name}</div>
                            <div className="text-sm text-gray-600">{company.country}</div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-600 mb-1">{t('dashboard.match.technologies')}</div>
                            <div className="flex flex-wrap gap-2">
                              {match.matchedTechnologies.map(tech => (
                                <Badge key={tech} variant="info">{tech}</Badge>
                              ))}
                            </div>
                          </div>

                          {/* AI-Generated Match Analysis */}
                          {match.aiNote && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="text-xs font-medium text-blue-700 mb-1">🤖 AI Match Analysis</div>
                              <div className="text-sm text-blue-900 leading-relaxed">
                                {match.aiNote}
                              </div>
                            </div>
                          )}

                          {/* Manual Notes */}
                          <div>
                            <label className="text-sm text-gray-600 mb-1 block">{t('dashboard.match.notes')}</label>
                            <Input
                              placeholder="Add your validation notes..."
                              value={editingNotes[match.id] ?? match.notes ?? ''}
                              onChange={(e) => setEditingNotes({ ...editingNotes, [match.id]: e.target.value })}
                            />
                            {editingNotes[match.id] !== undefined && (
                              <Button size="sm" onClick={() => handleSaveNotes(match.id)} className="mt-2">
                                {t('dashboard.match.saveNotes')}
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-3 flex flex-col gap-2">
                          <div className="mb-2">{getStatusBadge(match.status)}</div>
                          
                          {match.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleUpdateMatchStatus(match.id, 'validated')}
                              >
                                {t('dashboard.match.validate')}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="danger"
                                onClick={() => handleUpdateMatchStatus(match.id, 'rejected')}
                              >
                                {t('dashboard.match.reject')}
                              </Button>
                            </>
                          )}
                          
                          {match.status === 'validated' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleUpdateMatchStatus(match.id, 'published')}
                            >
                              {t('dashboard.match.publish')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {projects.map(project => (
              <Card key={project.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600">{project.municipality}, {project.region}</p>
                  </div>
                  <div className="flex gap-2">
                    {getPriorityBadge(project.priority)}
                    <Badge>{project.sector}</Badge>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.requiredTechnologies.map(tech => (
                    <Badge key={tech} variant="info">{tech}</Badge>
                  ))}
                </div>
                {project.budget && (
                  <div className="mt-4 text-sm text-gray-600">
                    Budget: ${project.budget.toLocaleString()}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="space-y-4">
            {companies.map(company => (
              <Card key={company.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
                    <p className="text-gray-600">{company.country}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.sector.map(s => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{company.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.technologies.map(tech => (
                    <Badge key={tech} variant="success">{tech}</Badge>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Contact: {company.contactPerson}</p>
                  <p>Email: {company.email}</p>
                  <p>Phone: {company.phone}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
