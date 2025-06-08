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
  ChevronRight
} from "lucide-react";
import EarthGlobe from "@/components/globo/EarthGlobe";

type ScreenType = 'intro' | 'global-crisis' | 'ecosystem' | 'mechanisms' | 'sdg-goals' | 'roadmap' | 'cta';

const hexagonData = [
  {
    id: 'dao',
    title: 'DAO',
    icon: <Shield className="w-full h-full" />,
    color: 'from-cyan-500 to-blue-600',
    description: 'Децентрализованная автономная организация для прозрачного управления водными ресурсами',
    details: {
      problem: 'Централизация, непрозрачность, конфликт интересов в управлении водными ресурсами',
      solution: 'DAO-управление через токены VOD, прозрачное голосование в блокчейне, коллективное принятие решений',
      benefits: ['Справедливое распределение ресурсов', 'Учет интересов всех сторон', 'Полная прозрачность процессов']
    }
  },
  {
    id: 'society',
    title: 'Общество',
    icon: <Users className="w-full h-full" />,
    color: 'from-green-500 to-emerald-600',
    description: 'Вовлечение граждан в мониторинг и защиту водных ресурсов',
    details: {
      problem: 'Пассивность граждан, отсутствие контроля над качеством воды, низкая экологическая осведомленность',
      solution: 'Народный мониторинг VOD Check, игровые механики, система достижений и вознаграждений',
      benefits: ['Активное участие в защите экологии', 'Получение токенов за вклад', 'Повышение экологической культуры']
    }
  },
  {
    id: 'governments',
    title: 'Государства',
    icon: <Building2 className="w-full h-full" />,
    color: 'from-purple-500 to-indigo-600',
    description: 'Государственно-частное партнерство для модернизации инфраструктуры',
    details: {
      problem: 'Недостаток бюджетных средств для модернизации водной инфраструктуры',
      solution: 'Модель ГЧП (PFI), привлечение частных инвестиций, цифровые двойники национальных водных систем',
      benefits: ['Модернизация без нагрузки на бюджет', 'Полная прозрачность финансовых потоков', 'Достижение ЦУР ООН']
    }
  },
  {
    id: 'business',
    title: 'Бизнес',
    icon: <TrendingUp className="w-full h-full" />,
    color: 'from-orange-500 to-red-600',
    description: 'Оптимизация водопользования и ESG-соответствие для корпораций',
    details: {
      problem: 'Высокие издержки на водопользование, сложность ESG-отчетности, неэффективное использование воды',
      solution: 'Аудит водопользования, предиктивное обслуживание, биржа технологий, автоматическая ESG-отчетность',
      benefits: ['Снижение издержек', 'Автоматическое соответствие экостандартам', 'Повышение инвестпривлекательности']
    }
  },
  {
    id: 'science',
    title: 'Наука',
    icon: <Lightbulb className="w-full h-full" />,
    color: 'from-yellow-500 to-amber-600',
    description: 'Открытые данные и гранты для научных исследований',
    details: {
      problem: 'Недостаток данных для исследований, ограниченное финансирование научных проектов',
      solution: 'Data Sandbox с анонимизированными данными, DAO-гранты для исследований, открытые результаты',
      benefits: ['Доступ к крупнейшему массиву данных', 'Финансирование через DAO', 'Совершение прорывных открытий']
    }
  },
  {
    id: 'infrastructure',
    title: 'Объекты',
    icon: <Globe className="w-full h-full" />,
    color: 'from-teal-500 to-cyan-600',
    description: 'Цифровизация и мониторинг водной инфраструктуры',
    details: {
      problem: 'Устаревшая инфраструктура, потери до 50% воды в системах, отсутствие мониторинга',
      solution: 'IoT-датчики, цифровые двойники сетей, предиктивный анализ утечек, автоматизированное управление',
      benefits: ['Сохранение миллиардов кубометров воды', 'Снижение эксплуатационных затрат', 'Повышение надежности']
    }
  },
  {
    id: 'investors',
    title: 'Инвесторы',
    icon: <TrendingUp className="w-full h-full" />,
    color: 'from-pink-500 to-rose-600',
    description: 'Токенизированные инвестиции в водную инфраструктуру',
    details: {
      problem: 'Высокие барьеры входа, низкая ликвидность, сложность оценки рисков в водном секторе',
      solution: 'Токенизация активов (P-VOD, W-Bond), стейкинг, ликвидные пулы на DEX, прозрачная отчетность',
      benefits: ['Глобальный доступ к инвестициям', 'Прогнозируемая доходность', 'ESG-соответствие портфеля']
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

  // Автоматическое продвижение с intro на global-crisis
  useEffect(() => {
    if (currentScreen === 'intro') {
      const timer = setTimeout(() => {
        setCurrentScreen('global-crisis');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const nextScreen = () => {
    const screens: ScreenType[] = ['intro', 'global-crisis', 'ecosystem', 'mechanisms', 'sdg-goals', 'roadmap', 'cta'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1]);
    }
  };

  const selectedHexagonData = hexagonData.find(h => h.id === selectedHexagon);

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
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
          >
            <div className="text-center text-white max-w-4xl px-8">
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-cyan-300 mb-4 text-lg"
              >
                UNITED INNOVATION CAPITAL и VODPROM представляют
              </motion.p>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
              >
                VODeco
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-2xl mb-8 text-gray-300"
              >
                Цифровая экосистема для управления будущим водных ресурсов планеты
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <Button
                  onClick={nextScreen}
                  size="lg"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-full"
                >
                  НАЧАТЬ <ArrowRight className="ml-2 w-5 h-5" />
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
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
          >
            <div className="max-w-6xl w-full">
              {/* Анимация капли и глобуса */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                  className="inline-block mb-4"
                >
                  <Droplets className="w-24 h-24 text-cyan-400 mx-auto mb-4" />
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl text-cyan-200 mb-8"
                >
                  H₂O. Вода — первичный признак и главный фактор жизни.
                </motion.p>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <Globe className="w-32 h-32 text-blue-400 mx-auto" />
                </motion.div>
              </div>

              {/* Статистика кризиса */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-slate-800/80 rounded-lg p-6 text-center border border-cyan-500/20"
                >
                  <h3 className="text-cyan-300 font-semibold mb-2">Ресурс Планеты</h3>
                  <p className="text-3xl font-bold text-white mb-2">&lt;1%</p>
                  <p className="text-gray-300 text-sm">пресной воды доступны человечеству</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                  className="bg-slate-800/80 rounded-lg p-6 text-center border border-cyan-500/20"
                >
                  <h3 className="text-cyan-300 font-semibold mb-2">Экономика Воды</h3>
                  <p className="text-3xl font-bold text-white mb-2">$1 трлн</p>
                  <p className="text-gray-300 text-sm">ежегодный дефицит инвестиций</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 }}
                  className="bg-slate-800/80 rounded-lg p-6 text-center border border-cyan-500/20"
                >
                  <h3 className="text-cyan-300 font-semibold mb-2">Гуманитарный Кризис</h3>
                  <p className="text-3xl font-bold text-white mb-2">2.2 млрд</p>
                  <p className="text-gray-300 text-sm">людей без доступа к чистой воде</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 }}
                  className="bg-slate-800/80 rounded-lg p-6 text-center border border-cyan-500/20"
                >
                  <h3 className="text-cyan-300 font-semibold mb-2">Прогноз Угрозы</h3>
                  <p className="text-3xl font-bold text-white mb-2">5+ млрд</p>
                  <p className="text-gray-300 text-sm">столкнутся с нехваткой к 2030 г.</p>
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
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-full"
                >
                  УЗНАТЬ РЕШЕНИЕ <ChevronRight className="ml-2 w-5 h-5" />
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
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-12 text-center"
            >
              Экосистема VODeco: Синергия для Будущего
            </motion.h2>

            <div className="relative w-full max-w-4xl h-[500px]">
              {/* Центральный глобус */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-20"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center">
                  <Globe className="w-16 h-16 text-white" />
                </div>
              </motion.div>

              {/* Гексагоны вокруг глобуса */}
              {hexagonData.map((hexagon, index) => {
                const angle = (index * 360) / hexagonData.length;
                const radius = 180;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={hexagon.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="absolute cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedHexagon(hexagon.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${hexagon.color} rounded-lg shadow-lg border border-white/20 flex items-center justify-center text-white relative`}
                         style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                      <div className="w-8 h-8">
                        {hexagon.icon}
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                      <p className="text-xs text-white font-medium">{hexagon.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-12"
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-full"
              >
                СМОТРЕТЬ РЕШЕНИЯ В ДЕЙСТВИИ <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Экран 3: Механизмы трансформации */}
        {currentScreen === 'mechanisms' && (
          <motion.div
            key="mechanisms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-8 text-center"
            >
              Механизмы Трансформации
            </motion.h2>

            {/* Табы */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
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
                  className={`px-6 py-3 ${
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
            <div className="max-w-4xl w-full bg-slate-800/80 rounded-lg p-8 border border-cyan-500/20">
              <AnimatePresence mode="wait">
                {activeTab === 'manage' && (
                  <motion.div
                    key="manage"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Проблема:</h3>
                      <p className="text-gray-300">Централизация, непрозрачность, конфликт интересов в управлении водными ресурсами создают коррупцию и неэффективность.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Решение:</h3>
                      <p className="text-gray-300">DAO-управление через токены VOD, прозрачное голосование в блокчейне, делегирование полномочий экспертам, коллективное принятие стратегических решений.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Выгода:</h3>
                      <p className="text-gray-300">Справедливое распределение ресурсов, учет интересов всех сторон, полная прозрачность процессов и исключение коррупции.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'consume' && (
                  <motion.div
                    key="consume"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Проблема:</h3>
                      <p className="text-gray-300">Нерациональное использование воды, непрозрачные тарифы, низкое качество услуг и отсутствие контроля со стороны потребителей.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Решение:</h3>
                      <p className="text-gray-300">Платформа VOD для мониторинга качества и расхода, экономические стимулы для водосбережения, общественный контроль через приложение VOD Check.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Выгода:</h3>
                      <p className="text-gray-300">Экономия для потребителей, повышение качества услуг, активное участие граждан в защите водных ресурсов.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'invest' && (
                  <motion.div
                    key="invest"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Проблема:</h3>
                      <p className="text-gray-300">Высокие барьеры входа в водный сектор, низкая ликвидность инвестиций, сложность оценки рисков и доходности.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Решение:</h3>
                      <p className="text-gray-300">Токенизация активов (P-VOD, W-Bond), стейкинг токенов VOD, ликвидные пулы на DEX, прозрачная отчетность в реальном времени.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Выгода:</h3>
                      <p className="text-gray-300">Глобальный доступ к инвестициям в водную инфраструктуру, прогнозируемая доходность, ESG-соответствие портфеля.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ecology' && (
                  <motion.div
                    key="ecology"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Проблема:</h3>
                      <p className="text-gray-300">Загрязнение водных ресурсов, истощение запасов, климатические изменения и отсутствие экономических стимулов для экологических проектов.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Решение:</h3>
                      <p className="text-gray-300">Токенизация эко-проектов через W-Cert, глобальный мониторинг через IoT-датчики, вознаграждения за экологический вклад, углеродные кредиты.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">Выгода:</h3>
                      <p className="text-gray-300">Целевое финансирование восстановления экосистем, устойчивое развитие, создание новой "зеленой" экономики.</p>
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
                ГЛОБАЛЬНЫЕ ЦЕЛИ <ChevronRight className="ml-2 w-5 h-5" />
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
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-8 text-center"
            >
              Вклад в Цели Устойчивого Развития ООН
            </motion.h2>

            {/* Табы ЦУР */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { id: 'sdg6', title: 'Доступ к воде (ЦУР 6)' },
                { id: 'sdg12', title: 'Эффективность (ЦУР 12)' },
                { id: 'sdg17', title: 'Сотрудничество (ЦУР 17)' },
                { id: 'sdg9', title: 'Финансирование (ЦУР 9)' }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveSDGTab(tab.id)}
                  variant={activeSDGTab === tab.id ? "default" : "outline"}
                  className={`px-4 py-3 text-sm ${
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
            <div className="max-w-4xl w-full bg-slate-800/80 rounded-lg p-8 border border-cyan-500/20">
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
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 overflow-y-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-12 text-center"
            >
              Дорожная Карта
            </motion.h2>

            <div className="max-w-4xl w-full space-y-8">
              {[
                {
                  year: '2024',
                  title: 'Pre-Sale & Запуск',
                  description: 'Проведение раундов финансирования. Запуск пилотных проектов в Республике Узбекистан. Развертывание платформы VOD и приложения VOD Check.',
                  delay: 0
                },
                {
                  year: '2025-2027',
                  title: 'Масштабирование',
                  description: 'Листинг токена VOD на биржах. Расширение на Центральную Азию и Евразию. Подключение ключевых объектов. Формирование "Банка Воды".',
                  delay: 0.2
                },
                {
                  year: '2028-2030',
                  title: 'Глобальная экспансия',
                  description: 'Выход на рынки Азии, Европы, Африки, Америки. Интеграция с программами ООН и Всемирного банка. Подключение 75% целевых объектов.',
                  delay: 0.4
                },
                {
                  year: '2030+',
                  title: 'Экосистема Управления',
                  description: 'VODeco — глобальный стандарт. Расширение на мониторинг воздуха, почвы, углеродные кредиты. Глобальная децентрализованная экономика.',
                  delay: 0.6
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay }}
                  className="flex items-start gap-8"
                >
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {item.year}
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-slate-800/80 rounded-lg p-6 border border-cyan-500/20">
                    <h3 className="text-2xl font-bold text-cyan-300 mb-3">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                  
                  {index < 3 && (
                    <div className="absolute left-12 mt-24 w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <Button
                onClick={nextScreen}
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-full"
              >
                ПРИСОЕДИНИТЬСЯ К БУДУЩЕМУ <ChevronRight className="ml-2 w-5 h-5" />
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
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-12 text-center leading-tight"
            >
              Будущее воды. Будущее планеты.<br />
              <span className="text-cyan-400">Оно создается сегодня. Вместе с вами.</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/80 rounded-lg p-8 border border-cyan-500/20 text-center cursor-pointer hover:bg-slate-700/80 transition-colors"
                onClick={() => setLocation('/auth')}
              >
                <Users className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">СТАТЬ ЧАСТЬЮ ЭКОСИСТЕМЫ</h3>
                <p className="text-gray-300">Зарегистрируйтесь, чтобы получить доступ к аналитике и стать полноправным участником VODeco.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800/80 rounded-lg p-8 border border-cyan-500/20 text-center cursor-pointer hover:bg-slate-700/80 transition-colors"
                onClick={() => setLocation('/wallet')}
              >
                <TrendingUp className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">ИНВЕСТИРОВАТЬ В БУДУЩЕЕ</h3>
                <p className="text-gray-300">Примите участие в Pre-Sale токена VOD. Ваши инвестиции — это чистая вода для миллионов и стабильный доход для вас.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-800/80 rounded-lg p-8 border border-cyan-500/20 text-center cursor-pointer hover:bg-slate-700/80 transition-colors"
                onClick={() => setLocation('/contact')}
              >
                <Building2 className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">СТАТЬ ПАРТНЕРОМ</h3>
                <p className="text-gray-300">Приглашаем к сотрудничеству правительства, корпорации и фонды для реализации этого исторического проекта.</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <Button
                onClick={() => setLocation('/dashboard')}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl"
              >
                ВОЙТИ В ПЛАТФОРМУ <ArrowRight className="ml-3 w-6 h-6" />
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

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Проблема:</h3>
                  <p className="text-white">{selectedHexagonData.details.problem}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Решение:</h3>
                  <p className="text-white">{selectedHexagonData.details.solution}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Выгоды:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedHexagonData.details.benefits.map((benefit, i) => (
                      <li key={i} className="text-white">{benefit}</li>
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