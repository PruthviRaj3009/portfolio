export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  profile_image: string | null;
  email: string;
  phone: string;
  location: string;
  resume_url?: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  whatsapp_number: string;
  leetcode_url: string;
}

export interface Project {
  id: number;
  title: string;
  short_description: string;
  full_description: string;
  tech_stack: string[];
  image: string | null;
  github_url: string;
  live_url: string;
  demo_video_url: string;
  is_featured: boolean;
  order: number;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: "language" | "framework" | "database" | "tool" | "other";
  icon_url: string;
  order: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  start_year: string;
  end_year: string;
  grade: string;
  description: string;
  order: number;
}

export interface ExperiencePoint {
  id: number;
  point: string;
  order: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  points: ExperiencePoint[];
  order: number;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issued_date: string;
  certificate_url: string;
  image: string | null;
  order: number;
}

export interface Accolade {
  id: number;
  title: string;
  issuer: string;
  category: string;
  date: string;
  description: string;
  certificate_url: string;
  image: string | null;
  order: number;
}
export interface Slogan {
  id: number;
  text: string;
  order: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface MessageDisplay {
  available: string;
  experience: string;
  notice_period: string;
}
