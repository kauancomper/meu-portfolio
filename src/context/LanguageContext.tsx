import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { portfolioContent } from '../data/content';
import type { Language } from '../data/content';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof portfolioContent.pt;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Inicializa o idioma a partir do localStorage ou detecta o idioma do navegador
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved && (saved === 'pt' || saved === 'en' || saved === 'es')) return saved as Language;
    
    // Fallback para navegador
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') return 'es';
    if (browserLang === 'en') return 'en';
    return 'pt';
  });

  // Atualiza o localStorage e o atributo lang do HTML sempre que o idioma mudar
  useEffect(() => {
    localStorage.setItem('portfolio-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: portfolioContent[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
