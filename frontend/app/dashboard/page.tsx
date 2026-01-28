/**
 * Administrative Dashboard
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Badge, Button, Alert } from '@/components/ui';
import { 
  getMatches, getProjects, getCompanies, 
  saveMatch, generateMatches, 
  Match, Project, Company 
} from '@/lib/storage';

export default function Dashboard() {
  const { t } = useLanguage();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filterSector, setFilterSector] = useState<string>('all');
  const [filterMunicipality, setFilterMunicipality] = useState<string>('all');
  const [filterTechnology, setFilterTechnology] = useState<string>('all');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedMatches, setSelectedMatches] = useState<Set<string>>(new Set());

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
    setAlert({ type: 'success', message: `${newMatches.length} ${t('dashboard.matchesGenerated')}` });
  };

  const handleUpdateMatchStatus = (matchId: string, status: Match['status'], e?: React.MouseEvent) => {
    e?.stopPropagation();
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
      setAlert({ type: 'success', message: t('dashboard.matchValidated') });
    }
  };

  const handleBatchValidate = () => {
    let count = 0;
    selectedMatches.forEach(matchId => {
      const match = matches.find(m => m.id === matchId);
      if (match && match.status === 'pending') {
        handleUpdateMatchStatus(matchId, 'validated');
        count++;
      }
    });
    setSelectedMatches(new Set());
    setAlert({ type: 'success', message: `${count} ${t('dashboard.matchesValidated')}` });
  };

  const handleRowClick = (matchId: string) => {
    router.push(`/potential-match?matchId=${matchId}`);
  };

  const handleDeleteMatch = (matchId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedMatches = matches.filter(m => m.id !== matchId);
    localStorage.setItem('matches', JSON.stringify(updatedMatches));
    loadData();
    setAlert({ type: 'success', message: t('dashboard.matchDeleted') });
  };

  const toggleMatchSelection = (matchId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newSelection = new Set(selectedMatches);
    if (newSelection.has(matchId)) {
      newSelection.delete(matchId);
    } else {
      newSelection.add(matchId);
    }
    setSelectedMatches(newSelection);
  };

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  };

  const getCompanyById = (id: string): Company | undefined => {
    return companies.find(c => c.id === id);
  };

  const filteredMatches = matches.filter(match => {
    const project = getProjectById(match.projectId);
    if (!project) return false;
    
    if (filterSector !== 'all' && project.sector !== filterSector) return false;
    if (filterMunicipality !== 'all' && project.municipality !== filterMunicipality) return false;
    if (filterTechnology !== 'all') {
      const hasMatchedTech = match.matchedTechnologies.some(tech => 
        tech.toLowerCase().includes(filterTechnology.toLowerCase())
      );
      if (!hasMatchedTech) return false;
    }
    
    return match.status === 'pending';
  }).sort((a, b) => b.relevanceScore - a.relevanceScore);

  const totalMatches = matches.length;
  const pendingMatches = matches.filter(m => m.status === 'pending').length;
  const validatedMatches = matches.filter(m => m.status === 'validated' || m.status === 'published').length;
  const validationRate = totalMatches > 0 ? ((validatedMatches / totalMatches) * 100).toFixed(1) : 0;

  const stats = {
    totalMatches,
    pendingMatches,
    validationRate,
  };

  const sectors = Array.from(new Set(projects.map(p => p.sector)));
  const municipalities = Array.from(new Set(projects.map(p => p.municipality)));
  const technologies = Array.from(new Set(
    matches.flatMap(m => m.matchedTechnologies)
  ));

  const resetFilters = () => {
    setFilterSector('all');
    setFilterMunicipality('all');
    setFilterTechnology('all');
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-2">{t('dashboard.stats.totalMatches')}</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold text-gray-900">{stats.totalMatches.toLocaleString()}</div>
                  <div className="text-sm text-green-600 font-medium">+12%</div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                ❄️
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-2">{t('dashboard.stats.pendingMatches')}</div>
                <div className="text-4xl font-bold text-gray-900">{stats.pendingMatches}</div>
                <div className="text-sm text-gray-500 mt-1">{t('dashboard.stats.actionRequired')}</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-xl">
                📋
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-2">{t('dashboard.stats.validationRate')}</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold text-gray-900">{stats.validationRate}%</div>
                  <div className="text-sm text-green-600 font-medium">+2.1%</div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-xl">
                🛡️
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">{t('common.filter')}:</span>
            </div>
            
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">{t('dashboard.filters.sector')}: {t('dashboard.filters.all')}</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>

            <select
              value={filterMunicipality}
              onChange={(e) => setFilterMunicipality(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">{t('dashboard.filters.municipality')}: {t('dashboard.filters.all')}</option>
              {municipalities.map(municipality => (
                <option key={municipality} value={municipality}>{municipality}</option>
              ))}
            </select>

            <select
              value={filterTechnology}
              onChange={(e) => setFilterTechnology(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">{t('dashboard.filters.technology')}: {t('dashboard.filters.all')}</option>
              {technologies.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('dashboard.filters.resetAll')}
            </button>

            <Button 
              onClick={handleGenerateMatches}
              className="md:ml-auto whitespace-nowrap"
            >
              🤖 {t('dashboard.runAiScan')}
            </Button>
          </div>
        </Card>

        {/* Matchmaking Queue Table */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.table.matchmakingQueue')}</h2>
            <Button 
              onClick={handleBatchValidate}
              disabled={selectedMatches.size === 0}
              size="sm"
            >
              {t('dashboard.table.batchValidate')} ({selectedMatches.size})
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-4 py-3"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.table.municipalProject')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.table.matchedPartner')}
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.table.score')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.table.sector')}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMatches.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                      {t('dashboard.table.noPendingMatches')}
                    </td>
                  </tr>
                ) : (
                  filteredMatches.map(match => {
                    const project = getProjectById(match.projectId);
                    const company = getCompanyById(match.companyId);
                    if (!project || !company) return null;

                    return (
                      <tr 
                        key={match.id} 
                        onClick={() => handleRowClick(match.id)}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedMatches.has(match.id)}
                            onChange={(e) => toggleMatchSelection(match.id, e)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-semibold text-gray-900">{project.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <span>📍</span> {project.municipality}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
                              {getSectorIcon(project.sector)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{company.name}</div>
                              <div className="text-sm text-gray-500">{company.country}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center">
                            <div className="relative w-14 h-14">
                              <svg className="w-14 h-14 transform -rotate-90">
                                <circle
                                  cx="28"
                                  cy="28"
                                  r="24"
                                  stroke="#e5e7eb"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <circle
                                  cx="28"
                                  cy="28"
                                  r="24"
                                  stroke="#3b82f6"
                                  strokeWidth="4"
                                  fill="none"
                                  strokeDasharray={`${(match.relevanceScore / 100) * 150.8} 150.8`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
                                {match.relevanceScore}%
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge>{project.sector}</Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(match.id);
                              }}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title={t('dashboard.table.viewDetails')}
                            >
                              ⚙️
                            </button>
                            <button
                              onClick={(e) => handleDeleteMatch(match.id, e)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title={t('dashboard.table.deleteMatch')}
                            >
                              🗑️
                            </button>
                            <Button
                              size="sm"
                              onClick={(e) => handleUpdateMatchStatus(match.id, 'validated', e)}
                            >
                              {t('dashboard.table.validate')}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filteredMatches.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
              <div>{t('dashboard.table.showing')} 1-{filteredMatches.length} {t('dashboard.table.of')} {stats.pendingMatches} {t('dashboard.table.pendingMatchesText')}</div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50" disabled>
                  ←
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50" disabled>
                  →
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* AI Score Info */}
        <Card className="mt-6 p-4 bg-blue-50 border border-blue-200">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                i
              </div>
            </div>
            <div>
              <div className="font-semibold text-blue-900 mb-1">{t('dashboard.aiScore.title')}</div>
              <div className="text-sm text-blue-800">
                {t('dashboard.aiScore.description')}
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
