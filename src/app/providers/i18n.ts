import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        appName: 'Frontend Project Setup',
        admin: 'Admin',
        user: 'User',
        dashboard: 'Dashboard',
        settings: 'Settings',
        login: 'Login',
        logout: 'Logout',
        notFound: 'Not found',
      },
    },
  },
  th: {
    translation: {
      common: {
        appName: 'Frontend Project Setup',
        admin: 'แอดมิน',
        user: 'ผู้ใช้',
        dashboard: 'แดชบอร์ด',
        settings: 'ตั้งค่า',
        login: 'เข้าสู่ระบบ',
        logout: 'ออกจากระบบ',
        notFound: 'ไม่พบหน้า',
      },
    },
  },
} as const;

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

export { i18n };
