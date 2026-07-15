export interface ContactRequest {
  name: string;
  email: string;
  subject: string | null;
  message: string;
  honeypot: string | null;
}
