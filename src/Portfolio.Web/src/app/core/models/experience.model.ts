export interface Experience {
  id: number;
  company_name: string;
  position: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  company_url: string | null;
  company_logo_url: string | null;
  location: string | null;
}
