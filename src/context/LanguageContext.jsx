import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('findandgo-lang');
      if (saved === 'en' || saved === 'vi') return saved;
      return 'en'; // English by default per requirements
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('findandgo-lang', lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'vi' : 'en'));

  const t = (key) => {
    const keys = key.split('.');
    let current = translations[lang];
    for (const k of keys) {
      if (!current || current[k] === undefined) {
        // Fallback to English
        let fallback = translations.en;
        for (const fk of keys) {
          if (!fallback || fallback[fk] === undefined) return key;
          fallback = fallback[fk];
        }
        return fallback;
      }
      current = current[k];
    }
    return current;
  };

  const strings = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, strings }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
