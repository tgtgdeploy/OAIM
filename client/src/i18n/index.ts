import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import marketingEn from './locales/en/marketing.json';
import marketingZh from './locales/zh/marketing.json';
import superadminEn from './locales/en/superadmin.json';
import superadminZh from './locales/zh/superadmin.json';
import authEn from './locales/en/auth.json';
import authZh from './locales/zh/auth.json';
import appEn from './locales/en/app.json';
import appZh from './locales/zh/app.json';
import memberEn from './locales/en/member.json';
import memberZh from './locales/zh/member.json';
import storefrontEn from './locales/en/storefront.json';
import storefrontZh from './locales/zh/storefront.json';

const savedLanguage = localStorage.getItem('oaim-language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      marketing: marketingEn,
      superadmin: superadminEn,
      auth: authEn,
      app: appEn,
      member: memberEn,
      storefront: storefrontEn,
    },
    zh: {
      marketing: marketingZh,
      superadmin: superadminZh,
      auth: authZh,
      app: appZh,
      member: memberZh,
      storefront: storefrontZh,
    },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  ns: ['marketing', 'superadmin', 'auth', 'app', 'member', 'storefront'],
  defaultNS: 'marketing',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
