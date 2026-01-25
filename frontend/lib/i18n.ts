/**
 * Internationalization utilities
 * Supports English and Ukrainian
 */

export type Language = 'en' | 'uk';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      companies: 'Companies',
      projects: 'Projects',
      dashboard: 'Dashboard',
      registerCompany: 'Register Company',
      registerProject: 'Register Project',
      language: 'Language',
    },
    // Landing Page
    landing: {
      hero: {
        title: 'Rebuilding Ukraine Together',
        subtitle: 'Digital Platform for Infrastructure Reconstruction',
        description: 'Connecting municipalities, companies, and donors for efficient infrastructure development across Ukraine',
        ctaPrimary: 'Register Your Company',
        ctaSecondary: 'Submit a Project',
      },
      features: {
        title: 'How It Works',
        matching: {
          title: 'AI-Powered Matching',
          description: 'Advanced algorithms match companies with relevant infrastructure projects based on expertise and technology',
        },
        transparent: {
          title: 'Transparent Process',
          description: 'Track project progress, view matches, and maintain clear communication between all stakeholders',
        },
        efficient: {
          title: 'Efficient Collaboration',
          description: 'Streamlined registration and validation processes ensure quick deployment of reconstruction efforts',
        },
      },
      sectors: {
        title: 'Focus Sectors',
        water: 'Water Infrastructure',
        energy: 'Energy & Utilities',
        transport: 'Transportation',
        digital: 'Digital Infrastructure',
        buildings: 'Public Buildings',
        healthcare: 'Healthcare Facilities',
      },
      cta: {
        title: 'Ready to Make an Impact?',
        description: 'Join the platform and contribute to Ukraine\'s reconstruction',
        button: 'Get Started',
      },
    },
    // Company Registration
    companyReg: {
      title: {
        register: 'Register Your Company',
        edit: 'Edit Company',
      },
      subtitle: {
        register: 'Join the reconstruction effort by sharing your expertise',
        edit: 'Update company information',
      },
      form: {
        companyName: 'Company Name',
        country: 'Country',
        sector: 'Sectors (Select all that apply)',
        technologies: 'Technologies & Expertise',
        description: 'Company Description',
        email: 'Email Address',
        website: 'Website',
        contactPerson: 'Contact Person',
        phone: 'Phone Number',
        submit: 'Submit Registration',
        submitEdit: 'Update Company',
        cancel: 'Cancel',
        success: 'Company registered successfully!',
        successEdit: 'Company updated successfully!',
        error: 'Please fill in all required fields',
        notFound: 'Company not found',
      },
    },
    // Project Registration
    projectReg: {
      title: {
        register: 'Register Infrastructure Project',
        edit: 'Edit Infrastructure Project',
      },
      subtitle: {
        register: 'Submit your municipality\'s infrastructure needs',
        edit: 'Update project information',
      },
      form: {
        municipality: 'Municipality',
        region: 'Region',
        projectTitle: 'Project Title',
        description: 'Project Description',
        sector: 'Sector',
        technologies: 'Required Technologies',
        budget: 'Estimated Budget (USD)',
        priority: 'Priority Level',
        deadline: 'Target Deadline',
        submit: 'Submit Project',
        submitEdit: 'Update Project',
        cancel: 'Cancel',
        success: 'Project registered successfully!',
        successEdit: 'Project updated successfully!',
        error: 'Please fill in all required fields',
        notFound: 'Project not found',
        priorities: {
          high: 'High',
          medium: 'Medium',
          low: 'Low',
        },
      },
    },
    // Dashboard
    dashboard: {
      title: 'Administrative Dashboard',
      subtitle: 'Manage matches between projects and companies',
      tabs: {
        matches: 'Matches',
        projects: 'Projects',
        companies: 'Companies',
      },
      filters: {
        all: 'All',
        pending: 'Pending',
        validated: 'Validated',
        rejected: 'Rejected',
        published: 'Published',
        sector: 'Sector',
        municipality: 'Municipality',
        relevance: 'Relevance Score',
      },
      match: {
        score: 'Relevance',
        project: 'Project',
        company: 'Company',
        technologies: 'Matched Technologies',
        status: 'Status',
        actions: 'Actions',
        validate: 'Validate',
        reject: 'Reject',
        publish: 'Publish',
        notes: 'Notes',
        saveNotes: 'Save Notes',
      },
      stats: {
        totalProjects: 'Total Projects',
        totalCompanies: 'Total Companies',
        pendingMatches: 'Pending Matches',
        validatedMatches: 'Validated Matches',
      },
      generate: 'Generate New Matches',
      noMatches: 'No matches found',
    },
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      required: 'Required',
      optional: 'Optional',
    },
  },
  uk: {
    // Navigation
    nav: {
      home: 'Головна',
      about: 'Про нас',
      companies: 'Компанії',
      projects: 'Проєкти',
      dashboard: 'Панель управління',
      registerCompany: 'Реєстрація компанії',
      registerProject: 'Реєстрація проєкту',
      language: 'Мова',
    },
    // Landing Page
    landing: {
      hero: {
        title: 'Відбудовуємо Україну Разом',
        subtitle: 'Цифрова платформа для відновлення інфраструктури',
        description: 'Об\'єднуємо муніципалітети, компанії та донорів для ефективного розвитку інфраструктури по всій Україні',
        ctaPrimary: 'Зареєструвати компанію',
        ctaSecondary: 'Подати проєкт',
      },
      features: {
        title: 'Як це працює',
        matching: {
          title: 'ШІ-підбір партнерів',
          description: 'Передові алгоритми підбирають компанії до проєктів на основі експертизи та технологій',
        },
        transparent: {
          title: 'Прозорий процес',
          description: 'Відстежуйте прогрес проєктів, переглядайте збіги та підтримуйте чітку комунікацію між усіма учасниками',
        },
        efficient: {
          title: 'Ефективна співпраця',
          description: 'Спрощені процеси реєстрації та валідації забезпечують швидке впровадження робіт з відбудови',
        },
      },
      sectors: {
        title: 'Ключові сектори',
        water: 'Водна інфраструктура',
        energy: 'Енергетика та комунальні послуги',
        transport: 'Транспорт',
        digital: 'Цифрова інфраструктура',
        buildings: 'Громадські будівлі',
        healthcare: 'Медичні заклади',
      },
      cta: {
        title: 'Готові зробити внесок?',
        description: 'Приєднуйтесь до платформи та долучайтесь до відбудови України',
        button: 'Розпочати',
      },
    },
    // Company Registration
    companyReg: {
      title: {
        register: 'Реєстрація компанії',
        edit: 'Редагування компанії',
      },
      subtitle: {
        register: 'Долучайтесь до відбудови, поділившись своєю експертизою',
        edit: 'Оновіть інформацію про компанію',
      },
      form: {
        companyName: 'Назва компанії',
        country: 'Країна',
        sector: 'Сектори (Оберіть усі відповідні)',
        technologies: 'Технології та експертиза',
        description: 'Опис компанії',
        email: 'Email адреса',
        website: 'Веб-сайт',
        contactPerson: 'Контактна особа',
        phone: 'Номер телефону',
        submit: 'Подати реєстрацію',
        submitEdit: 'Оновити компанію',
        cancel: 'Скасувати',
        success: 'Компанію успішно зареєстровано!',
        successEdit: 'Компанію успішно оновлено!',
        error: 'Будь ласка, заповніть всі обов\'язкові поля',
        notFound: 'Компанію не знайдено',
      },
    },
    // Project Registration
    projectReg: {
      title: {
        register: 'Реєстрація інфраструктурного проєкту',
        edit: 'Редагування інфраструктурного проєкту',
      },
      subtitle: {
        register: 'Подайте інфраструктурні потреби вашого муніципалітету',
        edit: 'Оновіть інформацію про проєкт',
      },
      form: {
        municipality: 'Муніципалітет',
        region: 'Регіон',
        projectTitle: 'Назва проєкту',
        description: 'Опис проєкту',
        sector: 'Сектор',
        technologies: 'Необхідні технології',
        budget: 'Орієнтовний бюджет (USD)',
        priority: 'Рівень пріоритету',
        deadline: 'Цільовий термін',
        submit: 'Подати проєкт',
        submitEdit: 'Оновити проєкт',
        cancel: 'Скасувати',
        success: 'Проєкт успішно зареєстровано!',
        successEdit: 'Проєкт успішно оновлено!',
        error: 'Будь ласка, заповніть всі обов\'язкові поля',
        notFound: 'Проєкт не знайдено',
        priorities: {
          high: 'Високий',
          medium: 'Середній',
          low: 'Низький',
        },
      },
    },
    // Dashboard
    dashboard: {
      title: 'Адміністративна панель',
      subtitle: 'Керування збігами між проєктами та компаніями',
      tabs: {
        matches: 'Збіги',
        projects: 'Проєкти',
        companies: 'Компанії',
      },
      filters: {
        all: 'Всі',
        pending: 'Очікують',
        validated: 'Валідовано',
        rejected: 'Відхилено',
        published: 'Опубліковано',
        sector: 'Сектор',
        municipality: 'Муніципалітет',
        relevance: 'Оцінка релевантності',
      },
      match: {
        score: 'Релевантність',
        project: 'Проєкт',
        company: 'Компанія',
        technologies: 'Співпадаючі технології',
        status: 'Статус',
        actions: 'Дії',
        validate: 'Валідувати',
        reject: 'Відхилити',
        publish: 'Опублікувати',
        notes: 'Примітки',
        saveNotes: 'Зберегти примітки',
      },
      stats: {
        totalProjects: 'Всього проєктів',
        totalCompanies: 'Всього компаній',
        pendingMatches: 'Очікують збіги',
        validatedMatches: 'Валідовані збіги',
      },
      generate: 'Згенерувати нові збіги',
      noMatches: 'Збігів не знайдено',
    },
    common: {
      loading: 'Завантаження...',
      save: 'Зберегти',
      cancel: 'Скасувати',
      delete: 'Видалити',
      edit: 'Редагувати',
      view: 'Переглянути',
      back: 'Назад',
      next: 'Далі',
      previous: 'Попередній',
      search: 'Пошук',
      filter: 'Фільтр',
      sort: 'Сортувати',
      required: 'Обов\'язково',
      optional: 'Необов\'язково',
    },
  },
};

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
