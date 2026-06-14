import { useState, useEffect } from "react";
import { portfolioService } from "../services/portfolio";

import {
  Profile,
  Project,
  Skill,
  Education,
  Experience,
  Certificate,
  Accolade,
  MessageDisplay,
  Slogan,
} from "../types";
import { api } from "../lib/api";

// Generic hook to fetch any data
function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Individual hooks for each section
export const useProfile = () => useFetch<Profile>(portfolioService.getProfile);
export const useSlogan = () => useFetch<Slogan>(portfolioService.getSelection);
export const useProjects = () =>
  useFetch<Project[]>(portfolioService.getProjects);

export const useSkills = () => useFetch<Skill[]>(portfolioService.getSkills);

export const useEducation = () =>
  useFetch<Education[]>(portfolioService.getEducation);

export const useExperience = () =>
  useFetch<Experience[]>(portfolioService.getExperience);

export const useCertificates = () =>
  useFetch<Certificate[]>(portfolioService.getCertificates);

export const useAccolades = () =>
  useFetch<Accolade[]>(portfolioService.getAccolades);

export const useHeroTypingText = () =>
  useFetch<{ id: number; text: string; order: number }[]>(() =>
    portfolioService.getHeroTexts(),
  );

export const useMessageDisplay = () =>
  useFetch<MessageDisplay>(portfolioService.getMessageDisplay);
