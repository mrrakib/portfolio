export const API_ENDPOINTS = {
  PROFILE: '/profile',
  PROJECTS: '/projects',
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
  EXPERIENCE: '/experience',
  SKILLS: '/skills',
  EDUCATION: '/education',
  CERTIFICATIONS: '/certifications',
  GITHUB_STATS: '/github/stats',
  CONTACT: '/contact',
  RESUME: '/resume',
  SOCIAL_LINKS: '/social-links',
  META: (page: string) => `/meta/${page}`,
} as const;
