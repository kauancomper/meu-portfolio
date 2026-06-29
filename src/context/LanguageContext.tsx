import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { portfolioContent } from '../data/content';
import type { Language } from '../data/content';
import { loadSiteData } from '../services/projectsData';
import type { ContentOverrides } from '../services/projectsData';

type Content = typeof portfolioContent.pt;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function deepMerge<T>(base: T, override: unknown): T {
  if (!override || typeof override !== 'object' || Array.isArray(override)) {
    return (override !== undefined ? override : base) as T;
  }
  const result = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(override as object)) {
    const ov = (override as Record<string, unknown>)[key];
    const bv = (base as Record<string, unknown>)[key];
    if (ov !== undefined && ov !== null) {
      result[key] = (typeof ov === 'object' && !Array.isArray(ov))
        ? deepMerge(bv, ov)
        : ov;
    }
  }
  return result as T;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved === 'pt' || saved === 'en' || saved === 'es') return saved;
    const browser = navigator.language.split('-')[0];
    if (browser === 'es') return 'es';
    if (browser === 'en') return 'en';
    return 'pt';
  });

  const [overrides, setOverrides] = useState<ContentOverrides>({});

  useEffect(() => {
    loadSiteData().then(data => {
      if (data.overrides) setOverrides(data.overrides);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const base = portfolioContent[language];
  const t: Content = overrides[language]
    ? deepMerge(base, overrides[language])
    : base;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
