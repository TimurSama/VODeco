import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Globe, 
  Users, 
  Building2, 
  Lightbulb, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Play,
  ChevronRight,
  MonitorSpeaker,
  DollarSign,
  CreditCard,
  FileText,
  BarChart3
} from "lucide-react";
import EarthGlobe from "@/components/globo/EarthGlobe";
import unSdgLogo from "@assets/image_1749468311324.png";
import unicapLogo from "@assets/image_1749468323756.png";
import vodLogo from "@assets/image_1749468457591.png";

type ScreenType = 'intro' | 'global-crisis' | 'ecosystem' | 'platform' | 'mechanisms' | 'sdg-goals' | 'roadmap' | 'cta';

const hexagonData = [
  {
    id: 'dao',
    title: 'DAO',
    icon: <Shield className="w-full h-full" />,
    color: 'from-cyan-500 to-blue-600',
    description: 'Ядро управления: система, где нет диктатуры одного мнения, правила создаются коллективно',
    details: {
      philosophy: 'Справедливое Управление',
      explanation: 'Централизованный контроль порождает коррупцию и неэффективность. VODeco передает власть в руки всех участников через Децентрализованную Автономную Организацию.',
      mechanisms: [
        'Создание предложений участниками с застейканными VOD',
        'Категории: Финансирование, Технологии, Экономика, Управление',
        'Открытое голосование в блокчейне с весом по токенам',
        'Делегирование голосов экспертам и лидерам мнений'
      ],
      benefits: ['Эволюция и устойчивость на десятилетия', 'Коллективный разум вместо неэффективности', 'Прозрачность всех решений']
    }
  },
  {
    id: 'society',
    title: 'Общество',
    icon: <Users className="w-full h-full" />,
    color: 'from-green-500 to-emerald-600',
    description: 'Активные участники защиты экологии, гражданские ученые и бенефициары "зеленой" экономики',
    details: {
      philosophy: 'Социальные и Игровые Механики',
      explanation: 'Вы больше не пассивный наблюдатель. Вы — активный участник защиты экологии. Ваш вклад имеет значение и вознаграждается.',
      mechanisms: [
        'VOD Check: анализ воды с получением токенов VOD',
        'Система достижений и бейджей за активность',
        'Ежедневные задания: проверка качества воды, образование',
        'Лидерборды эко-агентов по городам и странам',
        'Уровни прогресса с увеличением веса голоса'
      ],
      benefits: ['Токены VOD за валидные данные', 'Социальный и экологический рейтинг', 'Влияние на локальные инициативы']
    }
  },
  {
    id: 'governments',
    title: 'Государства',
    icon: <Building2 className="w-full h-full" />,
    color: 'from-purple-500 to-indigo-600',
    description: 'Модернизация инфраструктуры без нагрузки на бюджет, цифровое управление и национальная безопасность',
    details: {
      philosophy: 'Механика ГЧП и Цифрового Управления',
      explanation: 'Государство получает модернизированную инфраструктуру без затрат бюджета через долгосрочные контракты на 15-25 лет с четкими KPI.',
      mechanisms: [
        'Профессиональный кабинет "Банк Воды"',
        'Цифровой двойник страны с водными артериями в реальном времени',
        'Национальный водный баланс по секторам и регионам',
        'Система раннего оповещения о засухах и паводках',
        'Трансграничный мониторинг на блокчейне'
      ],
      benefits: ['Полная прозрачность финансов', 'Достижение ЦУР ООН', 'Стратегическое планирование и безопасность']
    }
  },
  {
    id: 'business',
    title: 'Бизнес',
    icon: <TrendingUp className="w-full h-full" />,
    color: 'from-orange-500 to-red-600',
    description: 'Радикальное снижение издержек, автоматическое ESG-соответствие и новые рынки',
    details: {
      philosophy: 'Механика Оптимизации и ESG',
      explanation: 'Профессиональный кабинет предприятия обеспечивает полную автоматизацию водопользования и соответствие экостандартам.',
      mechanisms: [
        'Аудит водопользования в реальном времени по этапам производства',
        'Предиктивное обслуживание: прогноз поломок насосов и фильтров',
        'Биржа технологий с проверенными поставщиками',
        'Автоматическая ESG-отчетность для инвесторов',
        'Рынок водных кредитов W-Cert за сверхнормативную экономию'
      ],
      benefits: ['Снижение издержек на водопользование', 'Повышение инвестиционной привлекательности', 'Открытие новых ESG-рынков']
    }
  },
  {
    id: 'science',
    title: 'Наука',
    icon: <Lightbulb className="w-full h-full" />,
    color: 'from-yellow-500 to-amber-600',
    description: 'Доступ к крупнейшему массиву данных о водных ресурсах планеты для прорывных открытий',
    details: {
      philosophy: 'Механика Открытых Данных и Грантов',
      explanation: 'Профессиональный кабинет исследователя предоставляет структурированный и постоянно обновляемый массив реальных данных.',
      mechanisms: [
        'Data Sandbox: безопасная среда с анонимизированными данными',
        'Тестирование климатических моделей и алгоритмов загрязнений',
        'DAO-гранты: финансирование исследований голосованием сообщества',
        'Открытая публикация результатов для всей экосистемы',
        'Изучение влияния промышленных циклов на экосистемы'
      ],
      benefits: ['Крупнейший в истории массив водных данных', 'Финансирование через DAO', 'Совершение прорывных открытий']
    }
  },
  {
    id: 'infrastructure',
    title: 'Объекты',
    icon: <Globe className="w-full h-full" />,
    color: 'from-teal-500 to-cyan-600',
    description: 'Тотальная оцифровка: создание цифрового двойника мировых водных ресурсов',
    details: {
      philosophy: 'Анализ (Тотальная Оцифровка)',
      explanation: 'Мы не можем управлять тем, что не можем измерить. Основа VODeco — создание цифрового двойника мировых водных ресурсов.',
      mechanisms: [
        'IoT-датчики для мониторинга в реальном времени',
        'Спутниковый мониторинг и Big Data обработка',
        'ИИ для анализа и предиктивной аналитики',
        'Цифровые двойники сетей с предиктивным анализом утечек',
        'Автоматизированное управление водными системами'
      ],
      benefits: ['Сохранение миллиардов кубометров воды', 'Снижение эксплуатационных затрат', 'Беспрецедентная точность управления']
    }
  },
  {
    id: 'investors',
    title: 'Инвесторы',
    icon: <TrendingUp className="w-full h-full" />,
    color: 'from-pink-500 to-rose-600',
    description: 'Инвестиции в реальную инфраструктуру с государственной поддержкой и прогнозируемым доходом',
    details: {
      philosophy: 'Механика Капитализации и Доходности',
      explanation: 'Профессиональный кабинет инвестора обеспечивает полную прозрачность инвестиционного цикла от выбора до получения дохода.',
      mechanisms: [
        'Биржа проектов с документацией, бизнес-планами и IRR',
        'Токенизация активов: P-VOD для проектов, W-Bond облигации',
        'Мониторинг прогресса в реальном времени через датчики',
        'Автоматическое распределение доходов через смарт-контракты',
        'Торговля проектными токенами на вторичном рынке'
      ],
      benefits: ['Государственные гарантии и поддержка', 'Прогнозируемая доходность с IRR', 'ESG-соответствие портфеля']
    }
  }
];

export default function PreviewPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('intro');
  const [selectedHexagon, setSelectedHexagon] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('manage');
  const [activeSDGTab, setActiveSDGTab] = useState('sdg6');

  // Функции для определения цветов гексагонов
  const getHexagonColors = (index: number) => {
    const colors = [
      'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(8, 145, 178, 0.2))', // Cyan
      'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.2))', // Green
      'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))', // Emerald
      'linear-gradient(135deg, rgba(20, 184, 166, 0.3), rgba(13, 148, 136, 0.2))', // Teal
      'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.2))', // Blue
      'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(124, 58, 237, 0.2))', // Purple
      'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 197, 94, 0.2))', // Cyan-Green mix
    ];
    return colors[index % colors.length];
  };

  const getHexagonBorder = (index: number) => {
    const borders = [
      'rgba(6, 182, 212, 0.8)', // Cyan
      'rgba(34, 197, 94, 0.8)', // Green
      'rgba(16, 185, 129, 0.8)', // Emerald
      'rgba(20, 184, 166, 0.8)', // Teal
      'rgba(59, 130, 246, 0.8)', // Blue
      'rgba(139, 92, 246, 0.8)', // Purple
      'rgba(6, 182, 212, 0.8)', // Cyan
    ];
    return borders[index % borders.length];
  };

  const getHexagonGlow = (index: number) => {
    const glows = [
      'rgba(6, 182, 212, 0.6)', // Cyan
      'rgba(34, 197, 94, 0.6)', // Green
      'rgba(16, 185, 129, 0.6)', // Emerald
      'rgba(20, 184, 166, 0.6)', // Teal
      'rgba(59, 130, 246, 0.6)', // Blue
      'rgba(139, 92, 246, 0.6)', // Purple
      'rgba(6, 182, 212, 0.6)', // Cyan
    ];
    return glows[index % glows.length];
  };

  // Автоматическое переключение отключено
  // useEffect(() => {
  //   if (currentScreen === 'intro') {
  //     const timer = setTimeout(() => {
  //       setCurrentScreen('global-crisis');
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [currentScreen]);

  const nextScreen = () => {
    const screens: ScreenType[] = ['intro', 'global-crisis', 'ecosystem', 'platform', 'mechanisms', 'sdg-goals', 'roadmap', 'cta'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1]);
    }
  };

  const prevScreen = () => {
    const screens: ScreenType[] = ['intro', 'global-crisis', 'ecosystem', 'platform', 'mechanisms', 'sdg-goals', 'roadmap', 'cta'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(screens[currentIndex - 1]);
    }
  };

  const selectedHexagonData = hexagonData.find(h => h.id === selectedHexagon);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Кнопка возврата в верхнем левом углу */}
      {currentScreen !== 'intro' && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={prevScreen}
          className="fixed top-20 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 197, 94, 0.2))',
            border: '2px solid rgba(6, 182, 212, 0.8)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6 text-white rotate-180" />
        </motion.button>
      )}

      {/* Анимированный фон с гексагонами */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-cyan-500/10 rotate-45"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 25}s`
            }}
            animate={{
              y: [-100, -1000],
              rotate: [0, 720],
              opacity: [1, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Экран 0: Интро */}
        {currentScreen === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ paddingTop: '5rem', paddingBottom: '1rem', height: 'calc(100vh - 5rem)' }}
          >
            {/* Логотипы в правом верхнем углу */}
            <div 
              className="fixed top-20 right-4 flex space-x-3 sm:space-x-4"
              style={{ zIndex: 99999 }}
            >
              <motion.a
                href="https://www.un.org"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className="w-16 h-18 sm:w-18 sm:h-20 lg:w-20 lg:h-24 rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    border: '3px solid rgba(6, 182, 212, 0.7)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.4)',
                    zIndex: 99999,
                    padding: '6px'
                  }}
                >
                  <img 
                    src={unSdgLogo}
                    alt="UN SDG Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.a>

              <motion.a
                href="https://unicapinvest.org"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className="w-16 h-18 sm:w-18 sm:h-20 lg:w-20 lg:h-24 rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    border: '3px solid rgba(6, 182, 212, 0.7)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.4)',
                    zIndex: 99999,
                    padding: '6px'
                  }}
                >
                  <img 
                    src={unicapLogo}
                    alt="UNICAP Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.a>
            </div>

            <div className="text-center text-white max-w-4xl px-4 sm:px-6">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center mb-3 sm:mb-4"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
                    style={{
                      textShadow: '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.6)',
                      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.9))'
                    }}>
                  DAO
                </h1>
                <div className="mx-4 sm:mx-6 md:mx-8">
                  <img 
                    src={vodLogo}
                    alt="VOD Logo"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 1)) drop-shadow(0 12px 20px rgba(0, 0, 0, 0.9))'
                    }}
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
                    style={{
                      textShadow: '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.6)',
                      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.9))'
                    }}>
                  ECO
                </h1>
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-4 sm:mb-6"
              >
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 font-medium inline-block"
                   style={{
                     textShadow: '0 0 20px rgba(156, 163, 175, 0.9), 0 4px 12px rgba(0, 0, 0, 0.8)',
                     padding: '12px 24px sm:16px 32px',
                     border: '2px solid rgba(6, 182, 212, 0.5)',
                     borderRadius: '16px',
                     background: 'rgba(0, 0, 0, 0.7)',
                     backdropFilter: 'blur(16px)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 24px rgba(6, 182, 212, 0.3)'
                   }}>
                  Цифровая экосистема для управления будущим водных ресурсов планеты
                </p>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="relative z-50"
              >
                <Button
                  onClick={nextScreen}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full relative z-50 cursor-pointer"
                  style={{
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                    boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.3)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    position: 'relative',
                    zIndex: 9999
                  }}
                >
                  НАЧАТЬ ПРЕЗЕНТАЦИЮ <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Экран 1: Глобальный кризис */}
        {currentScreen === 'global-crisis' && (
          <motion.div
            key="global-crisis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ paddingTop: '5rem', paddingBottom: '1rem', height: 'calc(100vh - 5rem)' }}
          >
            <div className="max-w-5xl w-full px-4 sm:px-6 flex flex-col justify-center">
              {/* Анимация капли и глобуса */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                  className="inline-block mb-1"
                >
                  <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mx-auto mb-1" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-2"
                >
                  <p className="text-base sm:text-lg text-cyan-200 inline-block"
                     style={{
                       textShadow: '0 0 20px rgba(103, 232, 249, 0.9), 0 4px 12px rgba(0, 0, 0, 0.8)',
                       padding: '8px 16px',
                       border: '2px solid rgba(103, 232, 249, 0.5)',
                       borderRadius: '12px',
                       background: 'rgba(0, 0, 0, 0.7)',
                       backdropFilter: 'blur(12px)',
                       boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(103, 232, 249, 0.3)'
                     }}>
                    H₂O. Вода — первичный признак и главный фактор жизни.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto" />
                </motion.div>
              </div>

              {/* Интерактивные блоки с негативными факторами */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
                {/* Блок 1: Водные ресурсы */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 text-center"
                           style={{
                             clipPath: 'polygon(0 0, 90% 0, 100% 100%, 10% 100%)',
                             background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.3), rgba(220, 20, 60, 0.2))',
                             border: '2px solid rgba(255, 0, 80, 0.8)',
                             backdropFilter: 'blur(16px)',
                             boxShadow: '0 0 30px rgba(255, 0, 80, 0.6), 0 8px 32px rgba(128, 0, 32, 0.4)',
                             padding: '12px 8px'
                           }}>
                        <h3 className="text-pink-200 font-semibold mb-1 text-xs">Ресурсы Планеты</h3>
                        <p className="text-red-300 text-lg sm:text-xl font-bold mb-1">0.007%</p>
                        <p className="text-pink-100 text-xs">доступной воды</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-slate-900 border-red-800">
                      <DialogHeader>
                        <DialogTitle className="text-red-400 text-xl">Водные ресурсы Земли</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-gray-200">
                        <div className="bg-red-950/50 p-4 rounded-lg border border-red-800/50">
                          <h4 className="text-red-300 font-semibold mb-2">Критические показатели:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• 71% поверхности Земли покрыто водой</li>
                            <li>• 1,386 млрд км³ - общий объем воды на планете</li>
                            <li>• Только 2,5% - пресная вода</li>
                            <li>• Лишь 0,007% - доступная пресная вода</li>
                          </ul>
                        </div>
                        <div className="bg-orange-950/50 p-4 rounded-lg border border-orange-800/50">
                          <h4 className="text-orange-300 font-semibold mb-2">Негативные факторы:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Загрязнение промышленными отходами и пластиком</li>
                            <li>• Истощение подземных водоносных слоев</li>
                            <li>• Изменение климата и засухи</li>
                            <li>• Неконтролируемое использование в сельском хозяйстве</li>
                            <li>• Отсутствие системы переработки сточных вод</li>
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* Блок 2: Экономика и коррупция */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 text-center"
                           style={{
                             clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
                             background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.3), rgba(220, 20, 60, 0.2))',
                             border: '2px solid rgba(255, 0, 80, 0.8)',
                             backdropFilter: 'blur(16px)',
                             boxShadow: '0 0 30px rgba(255, 0, 80, 0.6), 0 8px 32px rgba(128, 0, 32, 0.4)',
                             padding: '12px 8px'
                           }}>
                        <h3 className="text-pink-200 font-semibold mb-1 text-xs">Коррупция</h3>
                        <p className="text-red-300 text-lg sm:text-xl font-bold mb-1">35%</p>
                        <p className="text-pink-100 text-xs">потери средств</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-slate-900 border-red-800">
                      <DialogHeader>
                        <DialogTitle className="text-red-400 text-xl">Экономика и коррупция</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-gray-200">
                        <div className="bg-red-950/50 p-4 rounded-lg border border-red-800/50">
                          <h4 className="text-red-300 font-semibold mb-2">Экономические показатели:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• 4,600 км³ - ежегодное потребление воды</li>
                            <li>• $900 млрд - ежегодный оборот средств</li>
                            <li>• 6% - ежегодный рост рынка</li>
                          </ul>
                        </div>
                        <div className="bg-orange-950/50 p-4 rounded-lg border border-orange-800/50">
                          <h4 className="text-orange-300 font-semibold mb-2">Коррупционные схемы:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• 20-35% потери из-за коррупции и фальсификации данных</li>
                            <li>• Завышенные цены на оборудование (откаты до 40%)</li>
                            <li>• Фиктивные тендеры и подставные компании</li>
                            <li>• Неэффективное распределение субсидий</li>
                            <li>• Монополизация рынка через лоббирование</li>
                            <li>• Отсутствие прозрачности в государственных закупках</li>
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* Блок 3: Устаревшее оборудование */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 text-center"
                           style={{
                             clipPath: 'polygon(0 0, 90% 0, 100% 100%, 10% 100%)',
                             background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.3), rgba(220, 20, 60, 0.2))',
                             border: '2px solid rgba(255, 0, 80, 0.8)',
                             backdropFilter: 'blur(16px)',
                             boxShadow: '0 0 30px rgba(255, 0, 80, 0.6), 0 8px 32px rgba(128, 0, 32, 0.4)',
                             padding: '12px 8px'
                           }}>
                        <h3 className="text-pink-200 font-semibold mb-1 text-xs">Устаревание</h3>
                        <p className="text-red-300 text-lg sm:text-xl font-bold mb-1">50%</p>
                        <p className="text-pink-100 text-xs">потери воды</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-slate-900 border-red-800">
                      <DialogHeader>
                        <DialogTitle className="text-red-400 text-xl">Устаревшее оборудование</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-gray-200">
                        <div className="bg-red-950/50 p-4 rounded-lg border border-red-800/50">
                          <h4 className="text-red-300 font-semibold mb-2">Критическое состояние:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• 30-50% потери воды из-за устаревшего оборудования</li>
                            <li>• $1 трлн - ежегодный дефицит инвестиций в инфраструктуру</li>
                            <li>• 40% населения в условиях водного стресса</li>
                          </ul>
                        </div>
                        <div className="bg-orange-950/50 p-4 rounded-lg border border-orange-800/50">
                          <h4 className="text-orange-300 font-semibold mb-2">Проблемы инфраструктуры:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Водопроводные системы возрастом 50-100 лет</li>
                            <li>• Изношенные очистные сооружения и фильтры</li>
                            <li>• Устаревшие системы транспортировки воды</li>
                            <li>• Отсутствие цифрового мониторинга потребления</li>
                            <li>• Неэффективные насосные станции</li>
                            <li>• Коррозия трубопроводов и утечки</li>
                            <li>• Недостаток современных технологий очистки</li>
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* Блок 4: Прогнозы катастрофы */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 text-center"
                           style={{
                             clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
                             background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.3), rgba(220, 20, 60, 0.2))',
                             border: '2px solid rgba(255, 0, 80, 0.8)',
                             backdropFilter: 'blur(16px)',
                             boxShadow: '0 0 30px rgba(255, 0, 80, 0.6), 0 8px 32px rgba(128, 0, 32, 0.4)',
                             padding: '12px 8px'
                           }}>
                        <h3 className="text-pink-200 font-semibold mb-1 text-xs">Прогноз 2050</h3>
                        <p className="text-red-300 text-lg sm:text-xl font-bold mb-1">5 млрд</p>
                        <p className="text-pink-100 text-xs">без воды</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-slate-900 border-red-800">
                      <DialogHeader>
                        <DialogTitle className="text-red-400 text-xl">Катастрофические прогнозы</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-gray-200">
                        <div className="bg-red-950/50 p-4 rounded-lg border border-red-800/50">
                          <h4 className="text-red-300 font-semibold mb-2">Временные рамки катастрофы:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• К 2030: 40% рост невозвратного загрязнения</li>
                            <li>• К 2040: 700 млн климатических мигрантов</li>
                            <li>• К 2050: 52% населения в водно-дефицитных регионах</li>
                          </ul>
                        </div>
                        <div className="bg-orange-950/50 p-4 rounded-lg border border-orange-800/50">
                          <h4 className="text-orange-300 font-semibold mb-2">Негативные факторы:</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Неконтролируемое потребление сельским хозяйством (70% всей воды)</li>
                            <li>• Расточительное использование в быту развитых стран</li>
                            <li>• Отсутствие глобальной системы мониторинга</li>
                            <li>• Политическая нестабильность в водно-дефицитных регионах</li>
                            <li>• Недостаток международного сотрудничества</li>
                            <li>• Игнорирование экологических последствий</li>
                            <li>• Отсутствие прозрачного контроля и менеджмента</li>
                            <li>• Недостаток инновационных технологий переработки</li>
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="text-center"
              >
                <Button
                  onClick={nextScreen}
                  size="lg"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-full"
                >
                  УЗНАТЬ РЕШЕНИЕ <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Экран 2: Экосистема с гексагонами */}
        {currentScreen === 'ecosystem' && (
          <motion.div
            key="ecosystem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center z-10"
            style={{ paddingTop: '4rem', paddingBottom: '2rem', height: 'calc(100vh - 4rem)' }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 text-center"
              style={{
                textShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6)',
                padding: '6px 12px',
                border: '2px solid rgba(6, 182, 212, 0.4)',
                borderRadius: '8px',
                background: 'rgba(6, 182, 212, 0.1)',
                backdropFilter: 'blur(8px)'
              }}
            >
              Экосистема VODeco: Синергия для Будущего
            </motion.h2>

            <div className="relative w-full max-w-4xl h-[280px] sm:h-[320px] lg:h-[360px]">
              {/* Центральный элемент экосистемы */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 z-20"
              >
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(34, 197, 94, 0.3))',
                    border: '3px solid rgba(16, 185, 129, 0.8)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 0 40px rgba(16, 185, 129, 0.8), 0 0 80px rgba(6, 182, 212, 0.4)',
                  }}
                >
                  <div className="text-center">
                    <div className="text-emerald-300 text-xs font-semibold mb-1">VODeco</div>
                    <div className="text-cyan-200 text-xs">CORE</div>
                  </div>
                  
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{
                      boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)'
                    }}
                  />
                </div>
              </motion.div>

              {/* Гексагоны вокруг центрального элемента */}
              {hexagonData.map((hexagon, index) => {
                const angle = (index * 360) / hexagonData.length;
                const radius = window.innerWidth < 640 ? 140 : window.innerWidth < 1024 ? 170 : 190;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={hexagon.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedHexagon(hexagon.id)}
                    whileHover={{ scale: 1.15, rotateY: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* 3D Hexagon Container - Glass Neon Style */}
                    <div className="relative perspective-1000">
                      <div 
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 transform-gpu transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-500/50"
                        style={{ 
                          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                          background: index % 7 === 0 ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(8, 145, 178, 0.2))' :
                                     index % 7 === 1 ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.2))' :
                                     index % 7 === 2 ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))' :
                                     index % 7 === 3 ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.3), rgba(13, 148, 136, 0.2))' :
                                     index % 7 === 4 ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.2))' :
                                     index % 7 === 5 ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(124, 58, 237, 0.2))' :
                                     'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 197, 94, 0.2))',
                          border: `2px solid ${index % 7 === 0 ? 'rgba(6, 182, 212, 0.8)' :
                                               index % 7 === 1 ? 'rgba(34, 197, 94, 0.8)' :
                                               index % 7 === 2 ? 'rgba(16, 185, 129, 0.8)' :
                                               index % 7 === 3 ? 'rgba(20, 184, 166, 0.8)' :
                                               index % 7 === 4 ? 'rgba(59, 130, 246, 0.8)' :
                                               index % 7 === 5 ? 'rgba(139, 92, 246, 0.8)' :
                                               'rgba(6, 182, 212, 0.8)'}`,
                          backdropFilter: 'blur(16px)',
                          boxShadow: `0 0 30px ${index % 7 === 0 ? 'rgba(6, 182, 212, 0.6)' :
                                                 index % 7 === 1 ? 'rgba(34, 197, 94, 0.6)' :
                                                 index % 7 === 2 ? 'rgba(16, 185, 129, 0.6)' :
                                                 index % 7 === 3 ? 'rgba(20, 184, 166, 0.6)' :
                                                 index % 7 === 4 ? 'rgba(59, 130, 246, 0.6)' :
                                                 index % 7 === 5 ? 'rgba(139, 92, 246, 0.6)' :
                                                 'rgba(6, 182, 212, 0.6)'}, 0 8px 32px rgba(6, 182, 212, 0.2)`,
                          filter: `drop-shadow(0 0 15px ${index % 7 === 0 ? 'rgba(6, 182, 212, 0.6)' :
                                                          index % 7 === 1 ? 'rgba(34, 197, 94, 0.6)' :
                                                          index % 7 === 2 ? 'rgba(16, 185, 129, 0.6)' :
                                                          index % 7 === 3 ? 'rgba(20, 184, 166, 0.6)' :
                                                          index % 7 === 4 ? 'rgba(59, 130, 246, 0.6)' :
                                                          index % 7 === 5 ? 'rgba(139, 92, 246, 0.6)' :
                                                          'rgba(6, 182, 212, 0.6)'})`
                        }}
                      >
                        {/* Icon and Title inside hexagon */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 drop-shadow-lg mb-1">
                            {hexagon.icon}
                          </div>
                          <div className="text-center">
                            <div className="text-xs sm:text-sm lg:text-base font-semibold leading-tight">
                              {hexagon.title}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="mt-8"
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-2xl"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.3)',
                  border: '1px solid rgba(6, 182, 212, 0.3)'
                }}
              >
                УЗНАТЬ О ПЛАТФОРМЕ <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>


          </motion.div>
        )}

        {/* Экран 3: Технологическая платформа */}
        {currentScreen === 'platform' && (
          <motion.div
            key="platform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 sm:p-6 lg:p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 text-center leading-tight"
            >
              Платформа DAO VODeco
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-cyan-300 mb-8 lg:mb-12 text-center max-w-4xl leading-relaxed"
            >
              Многоуровневая операционная система с профессиональными кабинетами и мультитокенной экономикой
            </motion.p>

            {/* Интерактивные плитки профессиональных кабинетов */}
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 max-w-5xl w-full mb-6">
              {/* Кабинет Граждан */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 p-3 text-center"
                         style={{
                           background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.2))',
                           border: '2px solid rgba(34, 197, 94, 0.8)',
                           borderRadius: '12px',
                           backdropFilter: 'blur(16px)',
                           boxShadow: '0 0 20px rgba(34, 197, 94, 0.6), 0 4px 16px rgba(34, 197, 94, 0.2)',
                         }}>
                      <Users className="w-8 h-8 text-green-300 mx-auto mb-2" />
                      <h3 className="text-white font-semibold text-sm mb-1">Граждане</h3>
                      <p className="text-green-100 text-xs">VOD Check</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-slate-900 border-green-800">
                    <DialogHeader>
                      <DialogTitle className="text-green-400 text-xl flex items-center">
                        <Users className="w-6 h-6 mr-2" />
                        Кабинет Граждан
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-gray-200">
                      <div className="bg-green-950/50 p-4 rounded-lg border border-green-800/50">
                        <h4 className="text-green-300 font-semibold mb-2">VOD Check - Персональный Аудит:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Мониторинг личного водопотребления в реальном времени</li>
                          <li>• Сравнение с соседями и экологическими нормами</li>
                          <li>• Персональные рекомендации по экономии воды</li>
                          <li>• История потребления с аналитикой и прогнозами</li>
                        </ul>
                      </div>
                      <div className="bg-emerald-950/50 p-4 rounded-lg border border-emerald-800/50">
                        <h4 className="text-emerald-300 font-semibold mb-2">Геймификация и Достижения:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Система уровней за экономию воды</li>
                          <li>• VOD-токены за достижение экологических целей</li>
                          <li>• Соревнования между районами и городами</li>
                          <li>• Значки и сертификаты за экологическую активность</li>
                          <li>• Marketplace для обмена экологических достижений</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>

              {/* Кабинет Государств */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 p-3 text-center"
                         style={{
                           background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(124, 58, 237, 0.2))',
                           border: '2px solid rgba(139, 92, 246, 0.8)',
                           borderRadius: '12px',
                           backdropFilter: 'blur(16px)',
                           boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 4px 16px rgba(139, 92, 246, 0.2)',
                         }}>
                      <Building2 className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                      <h3 className="text-white font-semibold text-sm mb-1">Государства</h3>
                      <p className="text-purple-100 text-xs">Банк Воды</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-slate-900 border-purple-800">
                    <DialogHeader>
                      <DialogTitle className="text-purple-400 text-xl flex items-center">
                        <Building2 className="w-6 h-6 mr-2" />
                        Кабинет Государств
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-gray-200">
                      <div className="bg-purple-950/50 p-4 rounded-lg border border-purple-800/50">
                        <h4 className="text-purple-300 font-semibold mb-2">Банк Воды - Государственное Управление:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Централизованный мониторинг водных ресурсов страны</li>
                          <li>• Автоматизированное распределение водных квот</li>
                          <li>• Система раннего предупреждения о засухах и наводнениях</li>
                          <li>• Межрегиональная торговля водными ресурсами</li>
                        </ul>
                      </div>
                      <div className="bg-violet-950/50 p-4 rounded-lg border border-violet-800/50">
                        <h4 className="text-violet-300 font-semibold mb-2">Цифровой Двойник Страны:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• 3D-модель всей водной инфраструктуры</li>
                          <li>• Симуляция климатических сценариев</li>
                          <li>• Оптимизация инвестиций в водную инфраструктуру</li>
                          <li>• Международная отчетность по UN SDG 6</li>
                          <li>• Прогнозирование потребности в водных ресурсах</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>

              {/* Кабинет Бизнеса */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 p-3 text-center"
                         style={{
                           background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.2))',
                           border: '2px solid rgba(59, 130, 246, 0.8)',
                           borderRadius: '12px',
                           backdropFilter: 'blur(16px)',
                           boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 4px 16px rgba(59, 130, 246, 0.2)',
                         }}>
                      <TrendingUp className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                      <h3 className="text-white font-semibold text-sm mb-1">Бизнес</h3>
                      <p className="text-blue-100 text-xs">ESG-Аудит</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-slate-900 border-blue-800">
                    <DialogHeader>
                      <DialogTitle className="text-blue-400 text-xl flex items-center">
                        <TrendingUp className="w-6 h-6 mr-2" />
                        Кабинет Бизнеса
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-gray-200">
                      <div className="bg-blue-950/50 p-4 rounded-lg border border-blue-800/50">
                        <h4 className="text-blue-300 font-semibold mb-2">Аудит Водопользования:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Мониторинг водопотребления по этапам производства</li>
                          <li>• Анализ эффективности водных циклов</li>
                          <li>• Выявление потерь и оптимизация процессов</li>
                          <li>• Сравнение с отраслевыми бенчмарками</li>
                        </ul>
                      </div>
                      <div className="bg-indigo-950/50 p-4 rounded-lg border border-indigo-800/50">
                        <h4 className="text-indigo-300 font-semibold mb-2">ESG-Отчетность и Преимущества:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Автоматическая генерация ESG-отчетов</li>
                          <li>• Получение водных кредитов W-Cert</li>
                          <li>• Доступ к зеленому финансированию</li>
                          <li>• Повышение инвестиционной привлекательности</li>
                          <li>• Биржа экологических технологий</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>

              {/* Кабинет Инвесторов */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 p-3 text-center"
                         style={{
                           background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(8, 145, 178, 0.2))',
                           border: '2px solid rgba(6, 182, 212, 0.8)',
                           borderRadius: '12px',
                           backdropFilter: 'blur(16px)',
                           boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), 0 4px 16px rgba(6, 182, 212, 0.2)',
                         }}>
                      <DollarSign className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
                      <h3 className="text-white font-semibold text-sm mb-1">Инвесторы</h3>
                      <p className="text-cyan-100 text-xs">Биржа Проектов</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-slate-900 border-cyan-800">
                    <DialogHeader>
                      <DialogTitle className="text-cyan-400 text-xl flex items-center">
                        <DollarSign className="w-6 h-6 mr-2" />
                        Кабинет Инвесторов
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-gray-200">
                      <div className="bg-cyan-950/50 p-4 rounded-lg border border-cyan-800/50">
                        <h4 className="text-cyan-300 font-semibold mb-2">Биржа Водных Проектов:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Каталог инвестиционных проектов с рейтингами</li>
                          <li>• Автоматический дью-дилидженс через ИИ</li>
                          <li>• Торговля P-VOD токенами проектов</li>
                          <li>• Диверсификация портфеля по регионам</li>
                        </ul>
                      </div>
                      <div className="bg-teal-950/50 p-4 rounded-lg border border-teal-800/50">
                        <h4 className="text-teal-300 font-semibold mb-2">Мониторинг и Доходность:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Отслеживание проектов в реальном времени</li>
                          <li>• Прогнозируемая IRR с учетом рисков</li>
                          <li>• Автоматические выплаты через смарт-контракты</li>
                          <li>• ESG-метрики и импакт-анализ</li>
                          <li>• Страхование инвестиций через блокчейн</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>

              {/* Кабинет Науки */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 p-3 text-center"
                         style={{
                           background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.3), rgba(13, 148, 136, 0.2))',
                           border: '2px solid rgba(20, 184, 166, 0.8)',
                           borderRadius: '12px',
                           backdropFilter: 'blur(16px)',
                           boxShadow: '0 0 20px rgba(20, 184, 166, 0.6), 0 4px 16px rgba(20, 184, 166, 0.2)',
                         }}>
                      <Lightbulb className="w-8 h-8 text-teal-300 mx-auto mb-2" />
                      <h3 className="text-white font-semibold text-sm mb-1">Наука</h3>
                      <p className="text-teal-100 text-xs">Data Sandbox</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-slate-900 border-teal-800">
                    <DialogHeader>
                      <DialogTitle className="text-teal-400 text-xl flex items-center">
                        <Lightbulb className="w-6 h-6 mr-2" />
                        Кабинет Науки
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-gray-200">
                      <div className="bg-teal-950/50 p-4 rounded-lg border border-teal-800/50">
                        <h4 className="text-teal-300 font-semibold mb-2">Data Sandbox - Исследовательская Среда:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Доступ к крупнейшему массиву водных данных планеты</li>
                          <li>• Безопасная среда с анонимизированными данными</li>
                          <li>• Инструменты машинного обучения и ИИ</li>
                          <li>• Тестирование климатических моделей</li>
                        </ul>
                      </div>
                      <div className="bg-emerald-950/50 p-4 rounded-lg border border-emerald-800/50">
                        <h4 className="text-emerald-300 font-semibold mb-2">DAO-Гранты и Сотрудничество:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Децентрализованное финансирование исследований</li>
                          <li>• Голосование сообщества за приоритетные проекты</li>
                          <li>• Открытая публикация результатов</li>
                          <li>• Международная коллаборация ученых</li>
                          <li>• Система peer-review через блокчейн</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>

              {/* Мультитокенная Модель */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer transform hover:scale-105 transition-all duration-300 p-3 text-center"
                         style={{
                           background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))',
                           border: '2px solid rgba(16, 185, 129, 0.8)',
                           borderRadius: '12px',
                           backdropFilter: 'blur(16px)',
                           boxShadow: '0 0 20px rgba(16, 185, 129, 0.6), 0 4px 16px rgba(16, 185, 129, 0.2)',
                         }}>
                      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">V</span>
                      </div>
                      <h3 className="text-white font-semibold text-sm mb-1">Токены</h3>
                      <p className="text-emerald-100 text-xs">VOD Экономика</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-slate-900 border-emerald-800">
                    <DialogHeader>
                      <DialogTitle className="text-emerald-400 text-xl flex items-center">
                        <div className="w-6 h-6 mr-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">V</span>
                        </div>
                        Мультитокенная Модель
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-cyan-950/50 p-4 rounded-lg border border-cyan-800/50">
                          <h4 className="text-cyan-300 font-semibold mb-2 flex items-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mr-2"></div>
                            VOD (Global)
                          </h4>
                          <ul className="space-y-1 text-xs">
                            <li>• Основное средство расчетов</li>
                            <li>• Стейкинг и DAO-голосования</li>
                            <li>• Межрегиональные транзакции</li>
                          </ul>
                        </div>
                        <div className="bg-green-950/50 p-4 rounded-lg border border-green-800/50">
                          <h4 className="text-green-300 font-semibold mb-2 flex items-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-2"></div>
                            R-VOD (Regional)
                          </h4>
                          <ul className="space-y-1 text-xs">
                            <li>• Региональное управление</li>
                            <li>• Экологический коэффициент</li>
                            <li>• Местные инициативы</li>
                          </ul>
                        </div>
                        <div className="bg-pink-950/50 p-4 rounded-lg border border-pink-800/50">
                          <h4 className="text-pink-300 font-semibold mb-2 flex items-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mr-2"></div>
                            P-VOD (Project)
                          </h4>
                          <ul className="space-y-1 text-xs">
                            <li>• Токен конкретного проекта</li>
                            <li>• Инвестиционные доли</li>
                            <li>• Прибыль от реализации</li>
                          </ul>
                        </div>
                        <div className="bg-orange-950/50 p-4 rounded-lg border border-orange-800/50">
                          <h4 className="text-orange-300 font-semibold mb-2 flex items-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-2"></div>
                            O-VOD (Operational)
                          </h4>
                          <ul className="space-y-1 text-xs">
                            <li>• Операционная эффективность</li>
                            <li>• Награды за экономию</li>
                            <li>• Поощрения пользователей</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </div>

            {/* Navigation Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-8"
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-2xl"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.3)',
                  border: '1px solid rgba(6, 182, 212, 0.3)'
                }}
              >
                Далее <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Экран 4: Механизмы трансформации */}
        {currentScreen === 'mechanisms' && (
          <motion.div
            key="mechanisms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 sm:p-6 lg:p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 text-center"
            >
              Механизмы Трансформации
            </motion.h2>

            {/* Табы */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
              {[
                { id: 'manage', title: 'Управление' },
                { id: 'consume', title: 'Потребление' },
                { id: 'invest', title: 'Инвестиции' },
                { id: 'ecology', title: 'Экология' }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base ${
                    activeTab === tab.id 
                      ? 'bg-cyan-600 text-white' 
                      : 'border-cyan-500 text-cyan-300 hover:bg-cyan-600/20'
                  }`}
                >
                  {tab.title}
                </Button>
              ))}
            </div>

            {/* Контент табов */}
            <div className="max-w-4xl w-full bg-slate-800/80 rounded-lg p-4 sm:p-6 lg:p-8 border border-cyan-500/20 max-h-[50vh] lg:max-h-[55vh]">
              <AnimatePresence mode="wait">
                {activeTab === 'manage' && (
                  <motion.div
                    key="manage"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3 sm:space-y-4 lg:space-y-6"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Проблема:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Централизация, непрозрачность, конфликт интересов в управлении водными ресурсами создают коррупцию и неэффективность.</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Решение:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">DAO-управление через токены VOD, прозрачное голосование в блокчейне, делегирование полномочий экспертам, коллективное принятие стратегических решений.</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Выгода:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Справедливое распределение ресурсов, учет интересов всех сторон, полная прозрачность процессов и исключение коррупции.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'consume' && (
                  <motion.div
                    key="consume"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3 sm:space-y-4 lg:space-y-6"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Проблема:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Нерациональное использование воды, непрозрачные тарифы, низкое качество услуг и отсутствие контроля со стороны потребителей.</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Решение:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Платформа VOD для мониторинга качества и расхода, экономические стимулы для водосбережения, общественный контроль через приложение VOD Check.</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Выгода:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Экономия для потребителей, повышение качества услуг, активное участие граждан в защите водных ресурсов.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'invest' && (
                  <motion.div
                    key="invest"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3 sm:space-y-4 lg:space-y-6"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Проблема:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Высокие барьеры входа в водный сектор, низкая ликвидность инвестиций, сложность оценки рисков и доходности.</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Решение:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Токенизация активов (P-VOD, W-Bond), стейкинг токенов VOD, ликвидные пулы на DEX, прозрачная отчетность в реальном времени.</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Выгода:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Глобальный доступ к инвестициям в водную инфраструктуру, прогнозируемая доходность, ESG-соответствие портфеля.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ecology' && (
                  <motion.div
                    key="ecology"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3 sm:space-y-4 lg:space-y-6"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Проблема:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Загрязнение водных ресурсов, истощение запасов, климатические изменения и отсутствие экономических стимулов для экологических проектов.</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Решение:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Токенизация эко-проектов через W-Cert, глобальный мониторинг через IoT-датчики, вознаграждения за экологический вклад, углеродные кредиты.</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mb-2 lg:mb-3">Выгода:</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Целевое финансирование восстановления экосистем, устойчивое развитие, создание новой "зеленой" экономики.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 sm:mt-6 lg:mt-8"
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-full"
              >
                ГЛОБАЛЬНЫЕ ЦЕЛИ <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Экран 4: ЦУР ООН */}
        {currentScreen === 'sdg-goals' && (
          <motion.div
            key="sdg-goals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 sm:p-6 lg:p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 text-center leading-tight"
            >
              Вклад в Цели Устойчивого Развития ООН
            </motion.h2>

            {/* Табы ЦУР */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
              {[
                { id: 'sdg6', title: 'Вода (ЦУР 6)' },
                { id: 'sdg12', title: 'Эффективность (ЦУР 12)' },
                { id: 'sdg17', title: 'Сотрудничество (ЦУР 17)' },
                { id: 'sdg9', title: 'Финансирование (ЦУР 9)' }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveSDGTab(tab.id)}
                  variant={activeSDGTab === tab.id ? "default" : "outline"}
                  className={`px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm ${
                    activeSDGTab === tab.id 
                      ? 'bg-cyan-600 text-white' 
                      : 'border-cyan-500 text-cyan-300 hover:bg-cyan-600/20'
                  }`}
                >
                  {tab.title}
                </Button>
              ))}
            </div>

            {/* Контент ЦУР */}
            <div className="max-w-4xl w-full bg-slate-800/80 rounded-lg p-4 sm:p-6 lg:p-8 border border-cyan-500/20 max-h-[50vh] lg:max-h-[55vh]">
              <AnimatePresence mode="wait">
                {activeSDGTab === 'sdg6' && (
                  <motion.div
                    key="sdg6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Проблема:</h3>
                      <p className="text-gray-300">2.2 миллиарда людей до сих пор не имеют доступа к безопасной питьевой воде, 3.6 миллиарда — к услугам санитарии.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Решение:</h3>
                      <p className="text-gray-300">Токенизированное финансирование водной инфраструктуры через P-VOD и W-Bond, прозрачное управление ресурсами через DAO, мониторинг качества воды в реальном времени.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Выгода:</h3>
                      <p className="text-gray-300">Ускорение строительства и модернизации систем водоснабжения, снижение заболеваемости, обеспечение всеобщего доступа к чистой воде.</p>
                    </div>
                  </motion.div>
                )}

                {activeSDGTab === 'sdg12' && (
                  <motion.div
                    key="sdg12"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Проблема:</h3>
                      <p className="text-gray-300">Потери до 50% воды в распределительных системах, нерациональное потребление, отсутствие стимулов для экономии.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Решение:</h3>
                      <p className="text-gray-300">Цифровые двойники водных сетей, предиктивный анализ утечек через ИИ, экономические стимулы для водосбережения, геймификация экологического поведения.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Выгода:</h3>
                      <p className="text-gray-300">Сохранение миллиардов кубометров воды ежегодно, снижение эксплуатационных затрат, повышение эффективности использования ресурсов.</p>
                    </div>
                  </motion.div>
                )}

                {activeSDGTab === 'sdg17' && (
                  <motion.div
                    key="sdg17"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Проблема:</h3>
                      <p className="text-gray-300">Трансграничные конфликты из-за общих водных ресурсов, отсутствие доверия между странами, неэффективная координация усилий.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Решение:</h3>
                      <p className="text-gray-300">Единая блокчейн-платформа для прозрачного обмена данными, смарт-контракты для автоматического исполнения международных соглашений, DAO для коллективного управления.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Выгода:</h3>
                      <p className="text-gray-300">Снижение геополитической напряженности, предотвращение водных конфликтов, укрепление международного сотрудничества и доверия.</p>
                    </div>
                  </motion.div>
                )}

                {activeSDGTab === 'sdg9' && (
                  <motion.div
                    key="sdg9"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Проблема:</h3>
                      <p className="text-gray-300">Дефицит инвестиций в водную инфраструктуру составляет $1 трлн ежегодно, традиционные механизмы финансирования неэффективны.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Решение:</h3>
                      <p className="text-gray-300">Токенизация реальных PFI-контрактов, привлечение глобального капитала через DeFi, создание ликвидного рынка водных активов.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Выгода:</h3>
                      <p className="text-gray-300">Новый, ликвидный и надежный механизм финансирования инфраструктуры, демократизация инвестиций, ускорение развития.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-full"
              >
                ПОКАЗАТЬ ДОРОЖНУЮ КАРТУ <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Экран 5: Дорожная карта */}
        {currentScreen === 'roadmap' && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 sm:p-6 lg:p-8 overflow-hidden"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 text-center"
            >
              Дорожная Карта VODeco
            </motion.h2>

            {/* Космический маршрут */}
            <div className="relative max-w-6xl w-full h-96 mb-6">
              {/* Пунктирная траектория */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 300">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="25%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="75%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 80 250 Q 220 120 380 200 Q 540 280 680 140"
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))'
                  }}
                />
              </svg>

              {/* Планеты-годы */}
              {[
                { 
                  year: '2024', 
                  title: 'Запуск MVP', 
                  desc: 'Токеномика', 
                  x: 80, 
                  y: 250, 
                  color: 'from-cyan-500 to-blue-500', 
                  glow: 'rgba(6, 182, 212, 0.8)',
                  bgColor: 'rgba(6, 182, 212, 0.2)',
                  borderColor: 'rgba(6, 182, 212, 0.6)',
                  details: {
                    title: 'Запуск MVP 2024',
                    content: [
                      'Базовая токеномика VOD и создание первых токенов',
                      'Запуск платформы VOD Check для мониторинга',
                      'Пилотные проекты в Узбекистане',
                      'Формирование сообщества ранних участников',
                      'Интеграция IoT-датчиков для сбора данных'
                    ]
                  }
                },
                { 
                  year: '2025', 
                  title: 'Расширение', 
                  desc: 'Региональные партнерства', 
                  x: 300, 
                  y: 160, 
                  color: 'from-blue-500 to-purple-500', 
                  glow: 'rgba(59, 130, 246, 0.8)',
                  bgColor: 'rgba(59, 130, 246, 0.2)',
                  borderColor: 'rgba(59, 130, 246, 0.6)',
                  details: {
                    title: 'Региональное расширение 2025',
                    content: [
                      'Партнерства с государствами Центральной Азии',
                      'Листинг VOD токена на крипто-биржах',
                      'Расширение сети IoT-мониторинга',
                      'Запуск профессиональных кабинетов',
                      'Первые межгосударственные водные проекты'
                    ]
                  }
                },
                { 
                  year: '2027', 
                  title: 'Интеграция', 
                  desc: 'Развитие экосистемы', 
                  x: 520, 
                  y: 240, 
                  color: 'from-purple-500 to-pink-500', 
                  glow: 'rgba(139, 92, 246, 0.8)',
                  bgColor: 'rgba(139, 92, 246, 0.2)',
                  borderColor: 'rgba(139, 92, 246, 0.6)',
                  details: {
                    title: 'Развитие экосистемы 2027',
                    content: [
                      'Формирование полноценного "Банка Воды"',
                      'Интеграция с международными стандартами ESG',
                      'Запуск DAO-управления экосистемой',
                      'Расширение на новые географические регионы',
                      'Создание мультитокенной экономики (R-VOD, P-VOD)'
                    ]
                  }
                },
                { 
                  year: '2030', 
                  title: 'Глобализация', 
                  desc: 'Мировая экосистема', 
                  x: 680, 
                  y: 140, 
                  color: 'from-pink-500 to-orange-500', 
                  glow: 'rgba(236, 72, 153, 0.8)',
                  bgColor: 'rgba(236, 72, 153, 0.2)',
                  borderColor: 'rgba(236, 72, 153, 0.6)',
                  details: {
                    title: 'Глобальная экосистема 2030',
                    content: [
                      'Мировой стандарт управления водными ресурсами',
                      'Интеграция с системами ООН и международными организациями',
                      'Подключение 75% мировых водных объектов',
                      'Расширение на углеродные кредиты и экосистемы',
                      'Полная автономия через DAO-управление'
                    ]
                  }
                }
              ].map((planet, index) => (
                <Dialog key={planet.year}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.3, type: "spring", stiffness: 300 }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${(planet.x / 800) * 100}%`, top: `${(planet.y / 300) * 100}%` }}
                  >
                    <DialogTrigger asChild>
                      {/* Планета */}
                      <div 
                        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${planet.color} rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm relative cursor-pointer transition-all duration-300 hover:scale-110`}
                        style={{
                          boxShadow: `0 0 30px ${planet.glow}, 0 0 60px ${planet.glow}, inset 0 0 20px rgba(255,255,255,0.2)`,
                          border: '2px solid rgba(255,255,255,0.3)'
                        }}
                      >
                        {planet.year}
                        
                        {/* Орбитальные кольца */}
                        <div 
                          className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin"
                          style={{ 
                            width: '120%', 
                            height: '120%',
                            left: '-10%',
                            top: '-10%',
                            animationDuration: `${4 + index}s`
                          }}
                        />
                        <div 
                          className="absolute inset-0 rounded-full border border-white/10 animate-spin"
                          style={{ 
                            width: '140%', 
                            height: '140%',
                            left: '-20%',
                            top: '-20%',
                            animationDuration: `${6 + index}s`,
                            animationDirection: 'reverse'
                          }}
                        />
                      </div>
                    </DialogTrigger>
                    
                    {/* Информационная карточка */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.3 }}
                      className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 text-center min-w-max"
                    >
                      <div 
                        className="backdrop-blur-md rounded-lg p-2 border"
                        style={{
                          background: `linear-gradient(135deg, ${planet.bgColor}, rgba(255,255,255,0.05))`,
                          borderColor: planet.borderColor,
                          boxShadow: `0 8px 32px ${planet.glow}`
                        }}
                      >
                        <h3 className="text-white font-semibold text-xs mb-1">{planet.title}</h3>
                        <p className="text-gray-300 text-xs">{planet.desc}</p>
                      </div>
                    </motion.div>

                    {/* Popup Dialog */}
                    <DialogContent 
                      className="max-w-2xl border-2"
                      style={{
                        background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${planet.bgColor})`,
                        borderColor: planet.borderColor,
                        boxShadow: `0 20px 60px ${planet.glow}`
                      }}
                    >
                      <DialogHeader>
                        <DialogTitle 
                          className="text-2xl font-bold text-white mb-4"
                          style={{ textShadow: `0 0 20px ${planet.glow}` }}
                        >
                          {planet.details.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {planet.details.content.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <div 
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: planet.glow.replace('0.8', '1') }}
                            />
                            <p className="text-gray-300 leading-relaxed">{item}</p>
                          </motion.div>
                        ))}
                      </div>
                    </DialogContent>
                  </motion.div>
                </Dialog>
              ))}
            </div>

            {/* Navigation Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="mt-6"
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-full shadow-2xl"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.3)',
                  border: '1px solid rgba(6, 182, 212, 0.3)'
                }}
              >
                Далее <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Экран 6: Призыв к действию */}
        {currentScreen === 'cta' && (
          <motion.div
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 sm:p-6 lg:p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 lg:mb-8 text-center leading-tight"
            >
              Будущее воды. Будущее планеты.<br />
              <span className="text-cyan-400">Оно создается сегодня. Вместе с вами.</span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl w-full mb-6 lg:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/80 rounded-lg p-4 sm:p-6 lg:p-8 border border-cyan-500/20 text-center cursor-pointer hover:bg-slate-700/80 transition-colors"
                onClick={() => setLocation('/auth')}
              >
                <Users className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-cyan-400 mx-auto mb-4 lg:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">СТАТЬ ЧАСТЬЮ ЭКОСИСТЕМЫ</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Зарегистрируйтесь, чтобы получить доступ к аналитике и стать полноправным участником VODeco.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800/80 rounded-lg p-4 sm:p-6 lg:p-8 border border-cyan-500/20 text-center cursor-pointer hover:bg-slate-700/80 transition-colors"
                onClick={() => setLocation('/wallet')}
              >
                <TrendingUp className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-cyan-400 mx-auto mb-4 lg:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">ИНВЕСТИРОВАТЬ В БУДУЩЕЕ</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Примите участие в Pre-Sale токена VOD. Ваши инвестиции — это чистая вода для миллионов и стабильный доход для вас.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-800/80 rounded-lg p-4 sm:p-6 lg:p-8 border border-cyan-500/20 text-center cursor-pointer hover:bg-slate-700/80 transition-colors"
                onClick={() => setLocation('/contact')}
              >
                <Building2 className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-cyan-400 mx-auto mb-4 lg:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">СТАТЬ ПАРТНЕРОМ</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Приглашаем к сотрудничеству правительства, корпорации и фонды для реализации этого исторического проекта.</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={() => setLocation('/dashboard')}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 text-base sm:text-lg lg:text-xl font-bold rounded-full shadow-2xl"
              >
                ВОЙТИ В ПЛАТФОРМУ <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно для гексагонов */}
      <AnimatePresence>
        {selectedHexagon && selectedHexagonData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedHexagon(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">{selectedHexagonData.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedHexagon(null)}
                  className="text-white hover:bg-slate-700"
                >
                  ✕
                </Button>
              </div>

              <p className="text-cyan-200 mb-6">{selectedHexagonData.description}</p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-3">{selectedHexagonData.details.philosophy}:</h3>
                  <p className="text-white leading-relaxed">{selectedHexagonData.details.explanation}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-3">Механизмы реализации:</h3>
                  <ul className="space-y-2">
                    {selectedHexagonData.details.mechanisms.map((mechanism, i) => (
                      <li key={i} className="text-white flex items-start">
                        <span className="text-cyan-400 mr-2 mt-1">•</span>
                        <span>{mechanism}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-3">Ключевые выгоды:</h3>
                  <ul className="space-y-2">
                    {selectedHexagonData.details.benefits.map((benefit, i) => (
                      <li key={i} className="text-white flex items-start">
                        <span className="text-green-400 mr-2 mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}