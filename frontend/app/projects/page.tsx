/**
 * Projects Listing Page
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Container, Section, Card, Badge, Input, Button } from '@/components/ui';
import { getProjects, Project } from '@/lib/storage';

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const sectors = Array.from(new Set(projects.map(p => p.sector)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = filterSector === 'all' || project.sector === filterSector;
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;
    
    return matchesSearch && matchesSector && matchesPriority;
  });

  const getPriorityBadge = (priority: Project['priority']) => {
    const variants = {
      high: 'danger' as const,
      medium: 'warning' as const,
      low: 'default' as const,
    };
    return <Badge variant={variants[priority]}>{priority.toUpperCase()}</Badge>;
  };

  return (
    <Section>
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Infrastructure Projects' : 'Інфраструктурні проєкти'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'en' 
              ? 'Discover reconstruction projects across Ukraine seeking expertise and support'
              : 'Відкрийте для себе проєкти відбудови по всій Україні, що шукають експертизу та підтримку'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-96"
          />
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
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">Priority: All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <Link href="/register-project" className="ml-auto">
            <Button>{t('nav.registerProject')}</Button>
          </Link>
        </div>

        {/* Projects List */}
        {filteredProjects.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              {language === 'en' ? 'No projects found' : 'Проєкти не знайдено'}
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map(project => (
              <Card key={project.id} className="p-6" hover>
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                      <Link href={`/edit-project?projectId=${project.id}`} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="Edit project">
                        ✏️
                      </Link>
                    </div>
                    <p className="text-gray-600 flex items-center gap-2 mb-2">
                      <span>📍</span> {project.municipality}, {project.region}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    {getPriorityBadge(project.priority)}
                    <Badge>{project.sector}</Badge>
                    <Badge variant="info">{project.status.toUpperCase()}</Badge>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{project.description}</p>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Required Technologies:' : 'Необхідні технології:'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.requiredTechnologies.map(tech => (
                      <Badge key={tech} variant="info">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  {project.budget && (
                    <div>
                      <span className="font-medium">Budget:</span> ${project.budget.toLocaleString()}
                    </div>
                  )}
                  {project.deadline && (
                    <div>
                      <span className="font-medium">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Added:</span> {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
