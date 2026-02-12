import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import marketingEn from './locales/en/marketing.json';
import marketingZh from './locales/zh/marketing.json';
import superadminEn from './locales/en/superadmin.json';
import superadminZh from './locales/zh/superadmin.json';

const savedLanguage = localStorage.getItem('oaim-language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      marketing: marketingEn,
      superadmin: superadminEn,
    },
    zh: {
      marketing: marketingZh,
      superadmin: superadminZh,
    },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  ns: ['marketing', 'superadmin'],
  defaultNS: 'marketing',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
