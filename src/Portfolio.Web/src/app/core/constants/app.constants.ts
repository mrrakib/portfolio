export const APP_CONSTANTS = {
  APP_NAME: 'Rakibul Islam',
  APP_TITLE: 'Senior Full-Stack Developer',
  THEME_STORAGE_KEY: 'portfolio-theme',
  SCROLL_OFFSET: 80,
  ANIMATION_DURATION: 600,
  STAGGER_DELAY: 100,
  INTERSECTION_THRESHOLD: 0.2,
  DEBOUNCE_TIME: 150,
} as const;

export const BREAKPOINTS = {
  XS: 0,
  SM: 480,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;
