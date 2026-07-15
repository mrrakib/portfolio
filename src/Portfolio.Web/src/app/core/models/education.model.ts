export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
  logo_url: string | null;
}
