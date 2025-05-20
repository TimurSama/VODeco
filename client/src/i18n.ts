import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импортируем файлы переводов
const translationRU = {
  common: {
    dashboard: "Панель управления",
    account: "Аккаунт",
    wallet: "Кошелек",
    messages: "Сообщения",
    contacts: "Контакты",
    groups: "Группы",
    profile: "Профиль",
    preview: "Превью",
    dao: "DAO",
    missions: "Миссии",
    tokenHub: "Токены",
    globo: "Глобо",
    bank: "Банк",
    cabinets: "Системы",
    settings: "Настройки",
    support: "Поддержка",
    docs: "Документы",
    admin: "Администрирование",
    menu: "Меню",
    close: "Закрыть",
    search: "Поиск",
    notifications: "Уведомления",
    login: "Войти",
    logout: "Выйти",
    register: "Регистрация"
  },
  language: {
    ru: "Русский",
    en: "English",
    changeLanguage: "Сменить язык"
  }
};

const translationEN = {
  common: {
    dashboard: "Dashboard",
    account: "Account",
    wallet: "Wallet",
    messages: "Messages",
    contacts: "Contacts",
    groups: "Groups",
    profile: "Profile",
    preview: "Preview",
    dao: "DAO",
    missions: "Missions",
    tokenHub: "Token Hub",
    globo: "Globo",
    bank: "Bank",
    cabinets: "Cabinets",
    settings: "Settings",
    support: "Support",
    docs: "Docs",
    admin: "Admin Panel",
    menu: "Menu",
    close: "Close",
    search: "Search",
    notifications: "Notifications",
    login: "Login",
    logout: "Logout",
    register: "Register"
  },
  language: {
    ru: "Русский",
    en: "English",
    changeLanguage: "Change Language"
  }
};

// Ресурсы с переводами
const resources = {
  ru: {
    translation: translationRU
  },
  en: {
    translation: translationEN
  }
};

// Обнаружение языка в localStorage или установка русского по умолчанию
const storedLanguage = localStorage.getItem('language') || 'ru';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLanguage,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false // не экранировать HTML
    }
  });

export default i18n;