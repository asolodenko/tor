/**
 * Local Storage utilities for Ukraine Infrastructure Platform
 */

export interface Company {
  id: string;
  name: string;
  country: string;
  sector: string[];
  technologies: string[];
  description: string;
  email: string;
  website?: string;
  contactPerson: string;
  phone: string;
  createdAt: string;
}

export interface Project {
  id: string;
  municipality: string;
  region: string;
  title: string;
  description: string;
  sector: string;
  requiredTechnologies: string[];
  budget?: number;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'active' | 'completed';
  deadline?: string;
  createdAt: string;
}

export interface Match {
  id: string;
  projectId: string;
  companyId: string;
  relevanceScore: number;
  matchedTechnologies: string[];
  status: 'pending' | 'validated' | 'rejected' | 'published';
  aiNote?: string; // AI-generated explanation of the match
  notes?: string; // Manual notes from validators
  validatedAt?: string;
  validatedBy?: string;
}

// Storage keys
const COMPANIES_KEY = 'ukraine_platform_companies';
const PROJECTS_KEY = 'ukraine_platform_projects';
const MATCHES_KEY = 'ukraine_platform_matches';

// Company operations
export const saveCompany = (company: Company): void => {
  const companies = getCompanies();
  const existingIndex = companies.findIndex(c => c.id === company.id);
  
  if (existingIndex >= 0) {
    companies[existingIndex] = company;
  } else {
    companies.push(company);
  }
  
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
};

export const getCompanies = (): Company[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(COMPANIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const getCompanyById = (id: string): Company | undefined => {
  return getCompanies().find(c => c.id === id);
};

export const deleteCompany = (id: string): void => {
  const companies = getCompanies().filter(c => c.id !== id);
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
};

// Project operations
export const saveProject = (project: Project): void => {
  const projects = getProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }
  
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getProjectById = (id: string): Project | undefined => {
  return getProjects().find(p => p.id === id);
};

export const deleteProject = (id: string): void => {
  const projects = getProjects().filter(p => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

// Match operations
export const saveMatch = (match: Match): void => {
  const matches = getMatches();
  const existingIndex = matches.findIndex(m => m.id === match.id);
  
  if (existingIndex >= 0) {
    matches[existingIndex] = match;
  } else {
    matches.push(match);
  }
  
  localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
};

export const getMatches = (): Match[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(MATCHES_KEY);
  return data ? JSON.parse(data) : [];
};

export const getMatchById = (id: string): Match | undefined => {
  return getMatches().find(m => m.id === id);
};

export const deleteMatch = (id: string): void => {
  const matches = getMatches().filter(m => m.id !== id);
  localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
};

// AI Matching Algorithm (simplified)
export const generateMatches = (): Match[] => {
  const companies = getCompanies();
  const projects = getProjects();
  const newMatches: Match[] = [];

  projects.forEach(project => {
    companies.forEach(company => {
      // Calculate relevance score based on sector and technology match
      const sectorMatch = company.sector.includes(project.sector) ? 0.4 : 0;
      
      const techMatchCount = project.requiredTechnologies.filter(tech =>
        company.technologies.some(ct => 
          ct.toLowerCase().includes(tech.toLowerCase()) ||
          tech.toLowerCase().includes(ct.toLowerCase())
        )
      ).length;
      
      const techScore = project.requiredTechnologies.length > 0
        ? (techMatchCount / project.requiredTechnologies.length) * 0.6
        : 0;
      
      // Add slight variation to ensure diverse scores (±5%)
      const variation = (Math.random() - 0.5) * 0.1; // -5% to +5%
      const baseScore = sectorMatch + techScore + variation;
      const relevanceScore = Math.max(0, Math.min(100, Math.round(baseScore * 100)));

      // Only create matches with relevance score > 30%
      if (relevanceScore > 30) {
        const matchedTechs = project.requiredTechnologies.filter(tech =>
          company.technologies.some(ct => 
            ct.toLowerCase().includes(tech.toLowerCase()) ||
            tech.toLowerCase().includes(ct.toLowerCase())
          )
        );

        // Generate AI note explaining the match
        const aiNote = generateMatchNote(
          project,
          company,
          sectorMatch > 0,
          techMatchCount,
          project.requiredTechnologies.length,
          relevanceScore
        );

        newMatches.push({
          id: `match_${project.id}_${company.id}_${Date.now()}`,
          projectId: project.id,
          companyId: company.id,
          relevanceScore,
          matchedTechnologies: matchedTechs,
          status: 'pending',
          aiNote,
          notes: '',
        });
      }
    });
  });

  return newMatches;
};

// Generate descriptive note for each match
function generateMatchNote(
  project: Project,
  company: Company,
  sectorMatches: boolean,
  techMatchCount: number,
  totalTechRequired: number,
  score: number
): string {
  const notes: string[] = [];

  // Sector match note
  if (sectorMatches) {
    notes.push(`✓ Strong sector alignment: ${company.name} specializes in ${project.sector}`);
  } else {
    notes.push(`⚠ Cross-sector match: Company expertise in ${company.sector.join(', ')} may transfer to ${project.sector}`);
  }

  // Technology match note
  const techPercent = Math.round((techMatchCount / totalTechRequired) * 100);
  if (techPercent >= 80) {
    notes.push(`✓ Excellent technology match: ${techMatchCount}/${totalTechRequired} required technologies (${techPercent}%)`);
  } else if (techPercent >= 50) {
    notes.push(`✓ Good technology coverage: ${techMatchCount}/${totalTechRequired} required technologies (${techPercent}%)`);
  } else if (techMatchCount > 0) {
    notes.push(`⚠ Partial technology match: ${techMatchCount}/${totalTechRequired} technologies (${techPercent}%)`);
  } else {
    notes.push(`⚠ Limited direct technology overlap - potential for capability expansion`);
  }

  // Score interpretation
  if (score >= 70) {
    notes.push(`💡 Recommendation: High-priority match - strong fit for project requirements`);
  } else if (score >= 50) {
    notes.push(`💡 Recommendation: Solid candidate - worth detailed evaluation`);
  } else {
    notes.push(`💡 Recommendation: Consider for review - may require additional capability assessment`);
  }

  // Geographic/priority consideration
  if (project.priority === 'high') {
    notes.push(`🚨 Note: High-priority project requiring immediate attention`);
  }

  return notes.join(' | ');
}

// Initialize sample data
export const initializeSampleData = (): void => {
  const existingCompanies = getCompanies();
  const existingProjects = getProjects();

  if (existingCompanies.length === 0) {
    const sampleCompanies: Company[] = [
      {
        id: 'comp_1',
        name: 'Swiss Engineering AG',
        country: 'Switzerland',
        sector: ['Water Infrastructure', 'Energy'],
        technologies: ['Water Treatment', 'Solar Power', 'Smart Grids'],
        description: 'Leading Swiss engineering firm specializing in sustainable infrastructure solutions',
        email: 'contact@swisseng.ch',
        website: 'https://swisseng.ch',
        contactPerson: 'Hans Mueller',
        phone: '+41 44 123 4567',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'comp_2',
        name: 'EcoTech Solutions',
        country: 'Germany',
        sector: ['Transportation', 'Digital Infrastructure'],
        technologies: ['Electric Mobility', 'IoT', '5G Networks'],
        description: 'Innovation in sustainable transportation and digital connectivity',
        email: 'info@ecotech.de',
        website: 'https://ecotech.de',
        contactPerson: 'Maria Schmidt',
        phone: '+49 30 987 6543',
        createdAt: new Date().toISOString(),
      },
    ];

    sampleCompanies.forEach(saveCompany);
  }

  if (existingProjects.length === 0) {
    const sampleProjects: Project[] = [
      {
        id: 'proj_1',
        municipality: 'Kyiv',
        region: 'Kyiv Oblast',
        title: 'Water Treatment Plant Modernization',
        description: 'Modernization of the central water treatment facility to improve capacity and quality',
        sector: 'Water Infrastructure',
        requiredTechnologies: ['Water Treatment', 'Filtration Systems'],
        budget: 5000000,
        priority: 'high',
        status: 'pending',
        deadline: '2026-12-31',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'proj_2',
        municipality: 'Lviv',
        region: 'Lviv Oblast',
        title: 'Public Transport Electrification',
        description: 'Transition of city bus fleet to electric vehicles',
        sector: 'Transportation',
        requiredTechnologies: ['Electric Mobility', 'Charging Infrastructure'],
        budget: 3000000,
        priority: 'medium',
        status: 'pending',
        deadline: '2027-06-30',
        createdAt: new Date().toISOString(),
      },
    ];

    sampleProjects.forEach(saveProject);
  }
};
