import { api } from "../lib/api";
import {
  Profile,
  Project,
  Skill,
  Education,
  Experience,
  Certificate,
  Accolade,
  ContactForm,
  ExperienceYearCount,
} from "../types";

export const portfolioService = {
  getProfile: () => api.get<Profile>("/profile/"),
  getProjects: () => api.get<Project[]>("/projects/"),
  getSkills: () => api.get<Skill[]>("/skills/"),
  getEducation: () => api.get<Education[]>("/education/"),
  getExperience: () => api.get<Experience[]>("/experience/"),
  getCertificates: () => api.get<Certificate[]>("/certificates/"),
  getAccolades: () => api.get<Accolade[]>("/accolades/"),
  sendContact: (data: ContactForm) => api.post("/contact/", data),
  getExperienceYearCounts: () =>
    api.get<ExperienceYearCount[]>("/experience-year-counts/"),
  getHeroTexts: () =>
    api.get<{ id: number; text: string; order: number }[]>("/hero-texts/"),
};
