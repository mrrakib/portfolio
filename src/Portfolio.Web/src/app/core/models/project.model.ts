export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  is_featured: boolean;
  technologies: string[];
}

export interface ProjectDetail {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  is_featured: boolean;
  technologies: string[];
}
