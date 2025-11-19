import en from './translations/en.json';
import es from './translations/es.json';
import { useLanguage } from './context/LanguageContext';

type TranslationKeys = typeof en;

const translations: Record<string, TranslationKeys> = {
  en,
  es,
};

export const useTranslation = (): TranslationKeys => {
  const { userLanguage } = useLanguage();
  return translations[userLanguage] || en;
};
