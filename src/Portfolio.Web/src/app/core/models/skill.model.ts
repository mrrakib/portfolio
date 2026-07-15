export interface Skill {
  id: number;
  name: string;
  proficiency_level: number;
  icon: string | null;
}

export interface SkillCategory {
  id: number;
  name: string;
  icon: string | null;
  skills: Skill[];
}
