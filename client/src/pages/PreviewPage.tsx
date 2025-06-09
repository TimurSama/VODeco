import { useState, useEffect } from "react";
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

  const selectedHexagonData = hexagonData.find(h => h.id === selectedHexagon);

  return (
    <div className="w-full h-screen relative overflow-hidden">
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
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden"
                  style={{
                    background: 'rgba(6, 182, 212, 0.3)',
                    border: '2px solid rgba(6, 182, 212, 0.5)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 16px rgba(6, 182, 212, 0.4)',
                    zIndex: 99999
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
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden"
                  style={{
                    background: 'rgba(6, 182, 212, 0.3)',
                    border: '2px solid rgba(6, 182, 212, 0.5)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 16px rgba(6, 182, 212, 0.4)',
                    zIndex: 99999
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
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.6)',
                  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.9))',
                  padding: '8px sm:12px',
                  borderRadius: '12px'
                }}
              >
                VODeco
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-gray-300"
                style={{
                  textShadow: '0 0 15px rgba(156, 163, 175, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6)',
                  padding: '8px 16px sm:10px 20px',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Цифровая экосистема для управления будущим водных ресурсов планеты
              </motion.p>
              
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
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base sm:text-lg text-cyan-200 mb-2"
                >
                  H₂O. Вода — первичный признак и главный фактор жизни.
                </motion.p>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto" />
                </motion.div>
              </div>

              {/* Статистика кризиса */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-slate-800/80 rounded-lg p-2 sm:p-3 text-center border border-cyan-500/20"
                >
                  <h3 className="text-cyan-300 font-semibold mb-1 text-xs">Ресурс Планеты</h3>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">&lt;1%</p>
                  <p className="text-gray-300 text-xs">пресной воды доступны</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                  className="bg-slate-800/80 rounded-lg p-2 sm:p-3 text-center border border-cyan-500/20"
                >
                  <h3 className="text-cyan-300 font-semibold mb-1 text-xs">Экономика Воды</h3>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">$1 трлн</p>
                  <p className="text-gray-300 text-xs">дефицит инвестиций</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 }}
                  className="bg-slate-800/80 rounded-lg p-2 sm:p-3 text-center border border-cyan-500/20"
                >
                  <h3 className="text-cyan-300 font-semibold mb-1 text-xs">Гуманитарный Кризис</h3>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">2.2 млрд</p>
                  <p className="text-gray-300 text-xs">без доступа к воде</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 }}
                  className="bg-slate-800/80 rounded-lg p-2 sm:p-3 text-center border border-cyan-500/20"
                >
                  <h3 className="text-cyan-300 font-semibold mb-1 text-xs">Прогноз Угрозы</h3>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">5+ млрд</p>
                  <p className="text-gray-300 text-xs">нехватка к 2030 г.</p>
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
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ paddingTop: '5rem', paddingBottom: '1rem', height: 'calc(100vh - 5rem)' }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 text-center"
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

            <div className="relative w-full max-w-3xl h-[250px] sm:h-[300px] lg:h-[350px]">
              {/* Центральный глобус */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 z-20"
              >
                <div 
                  className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center relative"
                  style={{
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
                  }}
                >
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 text-white drop-shadow-lg" />
                  
                  {/* Rotating glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-300/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)'
                    }}
                  />
                </div>
              </motion.div>

              {/* Гексагоны вокруг глобуса */}
              {hexagonData.map((hexagon, index) => {
                const angle = (index * 360) / hexagonData.length;
                const radius = window.innerWidth < 640 ? 120 : window.innerWidth < 1024 ? 140 : 160;
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
                    {/* 3D Hexagon Container */}
                    <div className="relative perspective-1000">
                      <div 
                        className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${hexagon.color} transform-gpu transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/50`}
                        style={{ 
                          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))'
                        }}
                      >
                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-lg">
                            {hexagon.icon}
                          </div>
                        </div>
                        
                        {/* Glow effect */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br ${hexagon.color} opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-300`}
                          style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                        />
                      </div>
                      
                      {/* Floating Label */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      >
                        <div 
                          className="px-2 py-1 bg-slate-800/90 text-white text-xs sm:text-sm rounded-md border border-cyan-500/30"
                          style={{
                            textShadow: '0 0 8px rgba(6, 182, 212, 0.6)',
                            backdropFilter: 'blur(8px)'
                          }}
                        >
                          {hexagon.title}
                        </div>
                      </motion.div>
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-6 lg:mt-8"
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-full"
              >
                СМОТРЕТЬ РЕШЕНИЯ В ДЕЙСТВИИ <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
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
              Цифровая Платформа VODeco
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-cyan-300 mb-8 lg:mb-12 text-center max-w-4xl leading-relaxed"
            >
              Многоуровневая операционная система с профессиональными кабинетами и мультитокенной экономикой
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl w-full mb-8">
              {/* Профессиональные кабинеты */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800/80 rounded-lg p-4 sm:p-6 lg:p-8 border border-cyan-500/20"
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex items-center">
                  <MonitorSpeaker className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400 mr-3" />
                  Профессиональные Кабинеты
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">Граждане:</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">VOD Check, геймификация, достижения</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">Государства:</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">"Банк Воды", цифровой двойник страны</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">Бизнес:</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Аудит водопользования, ESG-отчетность</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">Инвесторы:</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Биржа проектов, мониторинг в реальном времени</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">Наука:</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Data Sandbox, DAO-гранты</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Мультитокенная модель */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-800/80 rounded-lg p-4 sm:p-6 lg:p-8 border border-cyan-500/20"
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400 mr-3" />
                  Мультитокенная Модель
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">VOD (Global Token):</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Стейкинг, DAO-голосования, основное средство расчетов</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">R-VOD (Regional Token):</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Региональное управление с экологическим коэффициентом</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">P-VOD (Project Token):</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Токен конкретного инвестиционного проекта</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">O-VOD (Operational Token):</p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Вознаграждение за операционную эффективность</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Финансовые инструменты */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-slate-800/80 rounded-lg p-4 sm:p-6 lg:p-8 border border-cyan-500/20 max-w-7xl w-full"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex items-center justify-center">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400 mr-3" />
                Финансовые Инструменты на Блокчейне
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="text-center">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-400 mx-auto mb-2 lg:mb-3" />
                  <p className="text-white font-semibold text-sm sm:text-base">W-Cert</p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Водный сертификат</p>
                </div>
                <div className="text-center">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-400 mx-auto mb-2 lg:mb-3" />
                  <p className="text-white font-semibold text-sm sm:text-base">W-Bond</p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Водная облигация</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-400 mx-auto mb-2 lg:mb-3" />
                  <p className="text-white font-semibold text-sm sm:text-base">W-Future</p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Водный фьючерс</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-400 mx-auto mb-2 lg:mb-3" />
                  <p className="text-white font-semibold text-sm sm:text-base">W-Option</p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">Водный опцион</p>
                </div>
              </div>
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
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 sm:p-6 lg:p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 lg:mb-8 text-center"
            >
              Дорожная Карта
            </motion.h2>

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
              {[
                {
                  year: '2024',
                  title: 'Pre-Sale & Запуск',
                  description: 'Раунды финансирования. Пилоты в Узбекистане. Платформа VOD и VOD Check.',
                  delay: 0
                },
                {
                  year: '2025-2027',
                  title: 'Масштабирование',
                  description: 'Листинг VOD. Расширение в Центральную Азию. Формирование "Банка Воды".',
                  delay: 0.2
                },
                {
                  year: '2028-2030',
                  title: 'Глобальная экспансия',
                  description: 'Выход на мировые рынки. Интеграция с ООН. Подключение 75% объектов.',
                  delay: 0.4
                },
                {
                  year: '2030+',
                  title: 'Экосистема Управления',
                  description: 'Глобальный стандарт. Расширение на воздух, почву, углеродные кредиты.',
                  delay: 0.6
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item.delay }}
                  className="bg-slate-800/80 rounded-lg p-4 sm:p-6 border border-cyan-500/20 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base mb-4">
                    {item.year}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-full"
              >
                ПРИСОЕДИНИТЬСЯ К БУДУЩЕМУ <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
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