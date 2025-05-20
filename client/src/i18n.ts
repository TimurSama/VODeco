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
  auth: {
    welcome: "Добро пожаловать в VODeco",
    loginTitle: "Вход в систему",
    registerTitle: "Регистрация",
    email: "Электронная почта",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    username: "Имя пользователя",
    firstName: "Имя",
    lastName: "Фамилия",
    rememberMe: "Запомнить меня",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет аккаунта?",
    createAccount: "Создать аккаунт",
    alreadyAccount: "Уже есть аккаунт?",
    loginWithGoogle: "Войти через Google",
    loginWithTelegram: "Войти через Telegram",
    termsAgree: "Регистрируясь, вы соглашаетесь с нашими Условиями и Политикой конфиденциальности"
  },
  missions: {
    title: "Миссии",
    level: "Уровень",
    xp: "XP",
    tabs: {
      missions: "Миссии",
      devices: "Устройства",
      rewards: "Награды",
      feedback: "Обратная связь"
    },
    mission: {
      start: "Начать",
      completed: "Выполнено",
      deadline: "До",
      reward: "VOD"
    },
    feed: {
      title: "Лента активности",
      subtitle: "Что делают другие участники DAO",
      from: "из"
    },
    devices: {
      expeditionKit: "Набор экспедитора",
      kitDescription: "Запросите специальное оборудование для участия в программе мониторинга",
      address: "Адрес доставки",
      addressPlaceholder: "Ваш полный адрес для доставки",
      motivation: "Мотивация",
      motivationPlaceholder: "Опишите, почему вы хотите получить набор и как планируете его использовать",
      experience: "Предыдущий опыт",
      experiencePlaceholder: "Опишите ваш опыт в экологических проектах (если есть)",
      requestKit: "Запросить набор",
      sync: "Синхронизация устройства",
      syncDescription: "Подключите ваше устройство для отправки данных в DAO",
      bluetoothConnection: "Bluetooth-соединение",
      connect: "Подключить",
      connected: "Подключено",
      receivedData: "Полученные данные",
      sendToDAO: "Отправить в DAO",
      ph: "pH воды",
      turbidity: "Мутность (NTU)",
      temperature: "Температура (°C)"
    },
    rewards: {
      title: "Airdrop & Награды",
      description: "Получайте VOD токены за активное участие в развитии экосистемы",
      progress: "Прогресс до следующей награды",
      missions: "миссий",
      moreToComplete: "Выполните еще {count} миссий для получения 100 VOD токенов",
      conditions: "Условия начисления",
      completedMissions: "Выполненные миссии",
      votingParticipation: "Участие в голосованиях",
      reputation: "Репутация в DAO",
      getVOD: "Получить VOD",
      availableAfter: "Доступно после выполнения всех миссий",
      rewardReady: "Награда готова к получению!",
      history: "История наград",
      historyDescription: "Ваши полученные награды в системе"
    }
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
  auth: {
    welcome: "Welcome to VODeco",
    loginTitle: "Login to your account",
    registerTitle: "Create a new account",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    username: "Username",
    firstName: "First Name",
    lastName: "Last Name",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    createAccount: "Create account",
    alreadyAccount: "Already have an account?",
    loginWithGoogle: "Login with Google",
    loginWithTelegram: "Login with Telegram",
    termsAgree: "By registering, you agree to our Terms and Privacy Policy"
  },
  missions: {
    title: "Missions",
    level: "Level",
    xp: "XP",
    tabs: {
      missions: "Missions",
      devices: "Devices",
      rewards: "Rewards",
      feedback: "Feedback"
    },
    mission: {
      start: "Start",
      completed: "Completed",
      deadline: "Until",
      reward: "VOD"
    },
    feed: {
      title: "Activity Feed",
      subtitle: "What other DAO participants are doing",
      from: "from"
    },
    devices: {
      expeditionKit: "Expedition Kit",
      kitDescription: "Request special equipment to participate in the monitoring program",
      address: "Delivery Address",
      addressPlaceholder: "Your full address for delivery",
      motivation: "Motivation",
      motivationPlaceholder: "Describe why you want to receive the kit and how you plan to use it",
      experience: "Previous Experience",
      experiencePlaceholder: "Describe your experience in environmental projects (if any)",
      requestKit: "Request Kit",
      sync: "Device Synchronization",
      syncDescription: "Connect your device to send data to the DAO",
      bluetoothConnection: "Bluetooth Connection",
      connect: "Connect",
      connected: "Connected",
      receivedData: "Received Data",
      sendToDAO: "Send to DAO",
      ph: "Water pH",
      turbidity: "Turbidity (NTU)",
      temperature: "Temperature (°C)"
    },
    rewards: {
      title: "Airdrop & Rewards",
      description: "Receive VOD tokens for active participation in ecosystem development",
      progress: "Progress to next reward",
      missions: "missions",
      moreToComplete: "Complete {count} more missions to receive 100 VOD tokens",
      conditions: "Reward Conditions",
      completedMissions: "Completed Missions",
      votingParticipation: "Voting Participation",
      reputation: "DAO Reputation",
      getVOD: "Get VOD",
      availableAfter: "Available after completing all missions",
      rewardReady: "Reward ready to receive!",
      history: "Reward History",
      historyDescription: "Your received rewards in the system"
    }
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