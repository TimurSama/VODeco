import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import GlassPanel from '@/components/ui/GlassPanel';
import InfoModal from '@/components/ui/InfoModal';
import { 
  Droplets, 
  Globe, 
  Users, 
  Building2, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Play,
  MonitorSpeaker,
  DollarSign,
  FileText,
  BarChart3,
  Zap,
  Target,
  Heart,
  FlaskConical,
  CheckCircle,
  Star,
  Award,
  MapPin,
  Activity,
  Eye,
  Lock,
  Unlock,
  Database,
  Network,
  Smartphone,
  Cloud,
  BarChart,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  Settings,
  Cog,
  Rocket,
  Lightbulb,
  Globe2,
  Server,
  Info
} from 'lucide-react';

const PreviewPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [modalStates, setModalStates] = useState({
    overview: false,
    ecosystem: false,
    technology: false,
    benefits: false,
    roadmap: false,
    partners: false,
    platform: false,
    services: false,
    tokenomics: false,
    partnerships: false
  });

  const openModal = (modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: false }));
  };

  const sections = [
    { id: 'overview', label: 'Обзор', icon: Eye },
    { id: 'ecosystem', label: 'Экосистема', icon: Globe2 },
    { id: 'technology', label: 'Технологии', icon: Cog },
    { id: 'benefits', label: 'Преимущества', icon: Star },
    { id: 'roadmap', label: 'Дорожная карта', icon: MapPin },
    { id: 'partners', label: 'Партнеры', icon: Users }
  ];

  const ecosystemFeatures = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "DAO Управление",
      description: "Децентрализованная автономная организация для прозрачного принятия решений",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Глобальный Мониторинг",
      description: "IoT-сети и датчики для отслеживания качества воды в реальном времени",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Социальное Участие",
      description: "Гражданская наука и геймификация для вовлечения общества",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "ESG Интеграция",
      description: "Автоматическое соответствие экологическим стандартам и отчетность",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Аналитика Данных",
      description: "ИИ и машинное обучение для прогнозирования и оптимизации",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "Блокчейн Безопасность",
      description: "Неизменяемые записи и смарт-контракты для доверия",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const technologyStack = [
    {
      category: "Frontend",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express", "TypeScript", "PostgreSQL"],
      icon: <Server className="h-6 w-6" />
    },
    {
      category: "Blockchain",
      technologies: ["Ethereum", "Smart Contracts", "Web3.js", "MetaMask"],
      icon: <Lock className="h-6 w-6" />
    },
    {
      category: "IoT & Data",
      technologies: ["MQTT", "InfluxDB", "Grafana", "Machine Learning"],
      icon: <Database className="h-6 w-6" />
    },
    {
      category: "Cloud",
      technologies: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      icon: <Cloud className="h-6 w-6" />
    },
    {
      category: "Analytics",
      technologies: ["Tableau", "Power BI", "Python", "TensorFlow"],
      icon: <BarChart className="h-6 w-6" />
    }
  ];

  const benefits = [
    {
      for: "Общества",
      icon: <Users className="h-6 w-6" />,
      items: [
        "Доступ к данным о качестве воды",
        "Участие в принятии решений",
        "Вознаграждения за активность",
        "Повышение экологической грамотности"
      ],
      color: "text-green-400"
    },
    {
      for: "Науки",
      icon: <FlaskConical className="h-6 w-6" />,
      items: [
        "Уникальная база данных в реальном времени",
        "Площадка для совместных исследований",
        "Гранты и финансирование проектов",
        "Публикации и обмен знаниями"
      ],
      color: "text-blue-400"
    },
    {
      for: "Бизнеса",
      icon: <TrendingUp className="h-6 w-6" />,
      items: [
        "ESG-репутация и сертификация",
        "Доступ к тендерам и грантам",
        "Аналитика и оптимизация процессов",
        "Новые рынки и возможности"
      ],
      color: "text-orange-400"
    },
    {
      for: "Государств",
      icon: <Building2 className="h-6 w-6" />,
      items: [
        "Централизованный контроль ресурсов",
        "Прогнозирование и планирование",
        "Взаимодействие с гражданами",
        "Международное сотрудничество"
      ],
      color: "text-purple-400"
    }
  ];

  const roadmap = [
    {
      phase: "Фаза 1: Альфа",
      period: "Q1 2024",
      features: ["Базовая платформа", "DAO голосование", "Мониторинг воды", "Пользовательские кабинеты"],
      status: "completed"
    },
    {
      phase: "Фаза 2: Бета",
      period: "Q2 2024",
      features: ["IoT интеграция", "Аналитика данных", "ESG отчеты", "Мобильное приложение"],
      status: "current"
    },
    {
      phase: "Фаза 3: Запуск",
      period: "Q3 2024",
      features: ["Полная экосистема", "Международное расширение", "Партнерские программы", "Токеномика"],
      status: "upcoming"
    },
    {
      phase: "Фаза 4: Масштабирование",
      period: "Q4 2024",
      features: ["Глобальное развертывание", "AI интеграция", "Межгосударственные соглашения", "Устойчивое развитие"],
      status: "upcoming"
    }
  ];

  const partners = [
    { name: "ООН", logo: "🌍", description: "Цели устойчивого развития" },
    { name: "UNICAP", logo: "🎓", description: "Университетское партнерство" },
    { name: "Всемирный Банк", logo: "🏦", description: "Финансирование проектов" },
    { name: "ЕС", logo: "🇪🇺", description: "Зеленая сделка" },
    { name: "Академия Наук", logo: "🔬", description: "Научные исследования" }
  ];

  return (
    <div className="min-h-screen vodeco-bg water-waves text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-400/20 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-cyan-500/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="font-bold text-2xl tracking-wider bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">VODECO</span>
      </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/landing">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                Главная
              </span>
            </Link>
            <Link href="/">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                Платформа
              </span>
            </Link>
            <Link href="/dao">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                DAO
              </span>
            </Link>
            <Link href="/globo">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                Глобус
              </span>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                <Play className="mr-2 h-4 w-4" />
                Начать
              </Button>
            </Link>
                </div>
            </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-cyan-900/50"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
              <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Полный Обзор VODeco
                </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-100 max-w-4xl mx-auto">
              Изучите экосистему будущего управления водными ресурсами
            </p>
            <p className="text-lg md:text-xl mb-12 text-blue-200 max-w-3xl mx-auto">
              От концепции до реализации — все, что нужно знать о революционной платформе
                </p>
              </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <GlassPanel variant="subtle" padding="md">
            <nav className="flex flex-wrap justify-center gap-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'text-cyan-100 hover:text-cyan-300 hover:bg-cyan-500/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </GlassPanel>
            </div>
      </section>

      {/* Content Sections */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Overview Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'overview' && (
                <motion.div
                key="overview"
                initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <GlassPanel variant="elevated" padding="xl" className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400">
                    Что такое VODeco?
                  </h2>
                  <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
                    VODeco — это глобальная экосистема управления водными ресурсами, построенная на принципах 
                    децентрализации, прозрачности и технологической инновации. Мы объединяем IoT, блокчейн, 
                    искусственный интеллект и DAO-управление для создания устойчивого будущего.
                  </p>
                </GlassPanel>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ecosystemFeatures.map((feature, index) => (
                <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <GlassPanel variant="default" padding="lg" className="text-center h-full">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}>
                          {feature.icon}
                      </div>
                        <h3 className="text-xl font-bold mb-3 text-cyan-300">{feature.title}</h3>
                        <p className="text-blue-200">{feature.description}</p>
                      </GlassPanel>
                </motion.div>
                  ))}
                      </div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Ecosystem Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'ecosystem' && (
                <motion.div
                key="ecosystem"
                initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <GlassPanel variant="elevated" padding="xl" className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-green-400">
                    Экосистема VODeco
                  </h2>
                  <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-6">
                    Интегрированная платформа, объединяющая все заинтересованные стороны в единую сеть
                  </p>
                <Button
                    variant="outline"
                  size="lg"
                    onClick={() => openModal('ecosystem')}
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                >
                    <Info className="mr-2 h-5 w-5" />
                    Узнать больше об экосистеме
                </Button>
                </GlassPanel>

                <div className="grid lg:grid-cols-2 gap-12">
                  <GlassPanel variant="default" padding="lg">
                    <h3 className="text-2xl font-bold mb-6 text-cyan-300">Участники Экосистемы</h3>
                    <div className="space-y-4">
                      {[
                        { icon: <Users className="w-5 h-5" />, name: "Граждане", role: "Мониторинг и участие" },
                        { icon: <Building2 className="w-5 h-5" />, name: "Государства", role: "Регулирование и контроль" },
                        { icon: <TrendingUp className="w-5 h-5" />, name: "Бизнес", role: "ESG и оптимизация" },
                        { icon: <FlaskConical className="w-5 h-5" />, name: "Наука", role: "Исследования и данные" },
                        { icon: <DollarSign className="w-5 h-5" />, name: "Инвесторы", role: "Финансирование проектов" }
                      ].map((participant, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30">
                          <div className="text-cyan-400">{participant.icon}</div>
                          <div>
                            <div className="font-semibold text-white">{participant.name}</div>
                            <div className="text-sm text-blue-200">{participant.role}</div>
                    </div>
                        </div>
                      ))}
                    </div>
                  </GlassPanel>

                  <GlassPanel variant="default" padding="lg">
                    <h3 className="text-2xl font-bold mb-6 text-cyan-300">Ключевые Компоненты</h3>
                    <div className="space-y-4">
                      {[
                        { icon: <Database className="w-5 h-5" />, name: "Центр Данных", desc: "IoT и аналитика" },
                        { icon: <Network className="w-5 h-5" />, name: "Блокчейн Сеть", desc: "Безопасность и прозрачность" },
                        { icon: <Smartphone className="w-5 h-5" />, name: "Мобильные Приложения", desc: "Доступность" },
                        { icon: <BarChart className="w-5 h-5" />, name: "Аналитические Панели", desc: "Инсайты и отчеты" }
                      ].map((component, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30">
                          <div className="text-green-400">{component.icon}</div>
                          <div>
                            <div className="font-semibold text-white">{component.name}</div>
                            <div className="text-sm text-blue-200">{component.desc}</div>
                      </div>
                    </div>
                      ))}
                  </div>
                  </GlassPanel>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technology Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'technology' && (
                  <motion.div
                key="technology"
                initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <GlassPanel variant="elevated" padding="xl" className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-purple-400">
                    Технологический Стек
                  </h2>
                  <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-6">
                    Современные технологии для решения глобальных экологических задач
                  </p>
              <Button
                    variant="outline"
                size="lg"
                    onClick={() => openModal('technology')}
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    <Info className="mr-2 h-5 w-5" />
                    Узнать больше о технологиях
              </Button>
                </GlassPanel>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {technologyStack.map((tech, index) => (
          <motion.div
                      key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <GlassPanel variant="default" padding="lg" className="h-full">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-purple-400">{tech.icon}</div>
                          <h3 className="text-xl font-bold text-white">{tech.category}</h3>
                    </div>
                        <div className="space-y-2">
                          {tech.technologies.map((technology, techIndex) => (
                            <div key={techIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-blue-200">{technology}</span>
                      </div>
                          ))}
                      </div>
                      </GlassPanel>
              </motion.div>
                  ))}
                    </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Benefits Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'benefits' && (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <GlassPanel variant="elevated" padding="xl" className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-orange-400">
                    Преимущества для Всех
                  </h2>
                  <p className="text-xl text-blue-200 max-w-4xl mx-auto">
                    Каждый участник экосистемы получает уникальную ценность
                  </p>
                </GlassPanel>

                <div className="grid lg:grid-cols-2 gap-8">
                  {benefits.map((benefit, index) => (
              <motion.div
                      key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <GlassPanel variant="default" padding="lg" className="h-full">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`${benefit.color}`}>{benefit.icon}</div>
                          <h3 className="text-xl font-bold text-white">{benefit.for}</h3>
                    </div>
                        <ul className="space-y-2 mb-4">
                          {benefit.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-blue-200">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="space-y-2">
                          {benefit.for === 'Для общества' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openModal('tokenomics')}
                              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white w-full"
                            >
                              <Info className="mr-2 h-4 w-4" />
                              Токеномика
                            </Button>
                          )}
                          {benefit.for === 'Для науки' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openModal('technology')}
                              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white w-full"
                            >
                              <Info className="mr-2 h-4 w-4" />
                              Технологии
                            </Button>
                          )}
                          {benefit.for === 'Для бизнеса' && (
              <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openModal('platform')}
                              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white w-full"
                            >
                              <Info className="mr-2 h-4 w-4" />
                              О платформе
              </Button>
                          )}
                          {benefit.for === 'Для государств' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openModal('partnerships')}
                              className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white w-full"
                            >
                              <Info className="mr-2 h-4 w-4" />
                              Партнёрства
                            </Button>
                          )}
                          {benefit.for === 'Для инвесторов' && (
                <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openModal('tokenomics')}
                              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white w-full"
                            >
                              <Info className="mr-2 h-4 w-4" />
                              Токеномика
                </Button>
                          )}
                        </div>
                      </GlassPanel>
                    </motion.div>
              ))}
            </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Roadmap Section */}
              <AnimatePresence mode="wait">
            {activeSection === 'roadmap' && (
                  <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <GlassPanel variant="elevated" padding="xl" className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400">
                    Дорожная Карта Развития
                  </h2>
                  <p className="text-xl text-blue-200 max-w-4xl mx-auto">
                    Поэтапное развитие платформы от концепции до глобального развертывания
                  </p>
                </GlassPanel>

                <div className="space-y-8">
                  {roadmap.map((phase, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <GlassPanel 
                        variant={phase.status === 'current' ? 'elevated' : 'default'} 
                        padding="lg"
                        className={`border-2 ${
                          phase.status === 'completed' ? 'border-green-500/50' :
                          phase.status === 'current' ? 'border-yellow-500/50' :
                          'border-gray-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                    <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{phase.phase}</h3>
                            <p className="text-cyan-300 font-medium">{phase.period}</p>
                    </div>
                          <Badge 
                            variant={
                              phase.status === 'completed' ? 'default' :
                              phase.status === 'current' ? 'secondary' :
                              'outline'
                            }
                            className={
                              phase.status === 'completed' ? 'bg-green-500 text-white' :
                              phase.status === 'current' ? 'bg-yellow-500 text-black' :
                              'border-gray-400 text-gray-400'
                            }
                          >
                            {phase.status === 'completed' ? 'Завершено' :
                             phase.status === 'current' ? 'В процессе' :
                             'Планируется'}
                          </Badge>
                    </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phase.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-blue-200">{feature}</span>
                    </div>
                          ))}
                    </div>
                      </GlassPanel>
                  </motion.div>
                  ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

          {/* Partners Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'partners' && (
            <motion.div
                key="partners"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <GlassPanel variant="elevated" padding="xl" className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-pink-400">
                    Стратегические Партнеры
                  </h2>
                  <p className="text-xl text-blue-200 max-w-4xl mx-auto">
                    Международные организации и институты, поддерживающие миссию VODeco
                  </p>
                </GlassPanel>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {partners.map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <GlassPanel variant="default" padding="lg" className="text-center h-full">
                        <div className="text-4xl mb-4">{partner.logo}</div>
                        <h3 className="text-xl font-bold mb-2 text-white">{partner.name}</h3>
                        <p className="text-blue-200">{partner.description}</p>
                      </GlassPanel>
            </motion.div>
                  ))}
                </div>
          </motion.div>
        )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassPanel variant="elevated" padding="xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400">
              Готовы Присоединиться к Будущему?
            </h2>
            <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
              VODeco — это не просто платформа, это революция в управлении водными ресурсами. 
              Присоединяйтесь к экосистеме, которая изменит мир.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Начать Использование
                </Button>
              </Link>
              <Link href="/landing">
                <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 text-lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Узнать Больше
                </Button>
              </Link>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* Модальные окна */}
      <InfoModal
        isOpen={modalStates.overview}
        onClose={() => closeModal('overview')}
        title="Обзор VODeco"
        type="info"
        size="xl"
        content={
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-200">
                <strong>VODeco</strong> — это глобальная экосистема водных ресурсов, построенная на принципах 
                децентрализованного управления, прозрачности и технологического прогресса.
              </p>
                    </div>
                    <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Ключевые принципы:</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Неизбежность трансформации управления водой</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Единое DAO-объединение всех участников</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Общее будущее для всех заинтересованных сторон</span>
                </li>
              </ul>
                    </div>
                    <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Миссия:</h3>
              <p className="text-blue-200">
                Создать инфраструктуру будущего, где управление водой становится таким же технологичным, 
                прозрачным и совместным, как интернет — для информации.
              </p>
                    </div>
          </div>
        }
      />

      <InfoModal
        isOpen={modalStates.ecosystem}
        onClose={() => closeModal('ecosystem')}
        title="Экосистема VODeco"
        type="info"
        size="xl"
        content={
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-blue-200">
                <strong>Экосистема VODeco</strong> — это интегрированная платформа, объединяющая все 
                заинтересованные стороны в единую сеть для эффективного управления водными ресурсами.
              </p>
                    </div>
            <div className="grid md:grid-cols-2 gap-6">
                    <div>
                <h3 className="text-xl font-bold text-green-400 mb-4">Участники:</h3>
                <ul className="space-y-3 text-blue-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Граждане:</strong> Мониторинг и участие</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Государства:</strong> Регулирование и контроль</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Бизнес:</strong> ESG и оптимизация</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Наука:</strong> Исследования и данные</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Инвесторы:</strong> Финансирование проектов</span>
                  </li>
                </ul>
                    </div>
                    <div>
                <h3 className="text-xl font-bold text-green-400 mb-4">Компоненты:</h3>
                <ul className="space-y-3 text-blue-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Центр Данных:</strong> IoT и аналитика</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Блокчейн Сеть:</strong> Безопасность и прозрачность</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Мобильные Приложения:</strong> Доступность</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Аналитические Панели:</strong> Инсайты и отчеты</span>
                  </li>
                </ul>
                    </div>
            </div>
          </div>
        }
      />

      <InfoModal
        isOpen={modalStates.technology}
        onClose={() => closeModal('technology')}
        title="Технологический стек VODeco"
        type="tech"
        size="xl"
        content={
          <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <p className="text-blue-200">
                <strong>Технологический стек VODeco</strong> включает современные технологии для решения 
                глобальных экологических задач и обеспечения надежности платформы.
              </p>
                    </div>
            <div className="grid md:grid-cols-2 gap-6">
                    <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Frontend:</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• React + TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Framer Motion</li>
                </ul>
                    </div>
                    <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Backend:</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Node.js + Express</li>
                  <li>• TypeScript</li>
                  <li>• PostgreSQL</li>
                </ul>
                    </div>
                    <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Blockchain:</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Ethereum</li>
                  <li>• Smart Contracts</li>
                  <li>• Web3.js</li>
                </ul>
                    </div>
                    <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">IoT & Data:</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• MQTT</li>
                  <li>• InfluxDB</li>
                  <li>• Machine Learning</li>
                </ul>
                    </div>
                    </div>
            </div>
                 }
       />

       <InfoModal
         isOpen={modalStates.platform}
         onClose={() => closeModal('platform')}
         title="Цифровая платформа VOD"
         type="info"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>VOD</strong> — это цифровая платформа, консолидирующая и интегрирующая максимально широкий круг участников 
                 водного сектора экономики для устойчивого управления водными ресурсами.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-blue-400 mb-4">Участники платформы:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Государство</strong> — регулирование и контроль</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Производственные операторы</strong> — водная инфраструктура</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Коммунальные операторы</strong> — водоснабжение населения</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Научные учреждения</strong> — исследования и разработки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Образовательные учреждения</strong> — подготовка кадров</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Корпоративные потребители</strong> — промышленность и сельское хозяйство</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Индивидуальные потребители</strong> — граждане</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Национальные и международные инвесторы</strong> — финансирование проектов</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-blue-400 mb-4">Интегрируемые данные:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>IoT-датчики</strong> — мониторинг в реальном времени</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Системы мониторинга</strong> — качество и количество воды</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Климатические данные</strong> — прогнозирование рисков</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Гидрологические модели</strong> — анализ водных ресурсов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Экономические инструменты</strong> — анализ эффективности</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Финансовые модели</strong> — инвестиционное планирование</span>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
               <p className="text-green-300 font-medium">
                 <strong>Результат:</strong> VOD — это не просто техническая платформа, а фундамент цифровой трансформации 
                 и развития водного сектора экономики, предназначенный для консолидации усилий всех участников в едином 
                 синергетическом процессе.
               </p>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.services}
         onClose={() => closeModal('services')}
         title="Основные услуги платформы VOD"
         type="info"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Платформа VOD</strong> предоставляет участникам и пользователям сектора водных ресурсов 
                 доступ к единой цифровой среде с набором ключевых сервисов.
               </p>
                      </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-cyan-400 mb-4">Для широкой аудитории:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Инвестирование в реальные объекты</strong> — каждый становится соучастником модернизации</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Получение дохода от водных проектов</strong> — стейкинг токенов приносит прибыль</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Участие в экономике будущего</strong> — токен как средство расчётов и учёта</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Голосование в DAO</strong> — влияние на развитие водных проектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Запуск собственных инициатив</strong> — выдвижение идей и получение финансирования</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Цифровая карта воды</strong> — персонализированная информация о качестве</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Прогнозирование водных угроз</strong> — ИИ-анализ засух и загрязнений</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Личный водный профиль</strong> — отслеживание "водного следа"</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Получение токенов за полезные действия</strong> — установка датчиков, сбор данных</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Роль "экологического майнера"</strong> — внесение и валидирование данных</span>
                   </li>
                 </ul>
                      </div>
               <div>
                 <h3 className="text-xl font-bold text-cyan-400 mb-4">Для профессиональной аудитории:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Доступ к данным в реальном времени</strong> — IoT-датчики, спутниковый мониторинг</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Интеллектуальное прогнозирование рисков</strong> — автоматическое моделирование</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Инструменты управления водными объектами</strong> — цифровые паспорта, контроль</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>API и SDK для разработчиков</strong> — интеграция с корпоративными системами</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Консалтинг и аудит водной безопасности</strong> — проектирование решений</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Доступ к инвестиционным возможностям</strong> — участие в стейкинге проектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Отчётность по ESG</strong> — формирование отчётов для международных фондов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Партнёрство в цифровой трансформации</strong> — участие в пилотных проектах</span>
                   </li>
                 </ul>
            </div>
                </div>
                  </div>
         }
       />

       <InfoModal
         isOpen={modalStates.tokenomics}
         onClose={() => closeModal('tokenomics')}
         title="Токеномика экосистемы VOD"
         type="info"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Токен VOD</strong> — это проектная валюта, обеспеченная активами проекта и водными ресурсами, 
                 являющаяся основой экономики платформы.
               </p>
                  </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Функции токена VOD:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Средство расчётов</strong> — оплата услуг и товаров в экосистеме</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Инвестиционный инструмент</strong> — участие в проектах модернизации</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Вознаграждение за активность</strong> — токены за полезные действия</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Управление через DAO</strong> — голосование за проекты и инициативы</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Стейкинг</strong> — получение пассивного дохода</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Ликвидность</strong> — торговля на криптобиржах</span>
                   </li>
                 </ul>
              </div>
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Модель монетизации:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Freemium-доступ</strong> — базовые функции бесплатно</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Платные подписки</strong> — расширенные функции и аналитика</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Микроплатежи</strong> — эксклюзивные функции и NFT</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>API-доступ</strong> — интеграция с корпоративными системами</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Комиссии с операций</strong> — внутри DAO и на биржах</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Доход от стейкинга</strong> — процент от прибыли проектов</span>
                   </li>
                 </ul>
            </div>
              </div>
             <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
               <p className="text-green-300 font-medium">
                 <strong>Экономическая модель:</strong> Токен VOD обеспечивает устойчивую экономику платформы, 
                 где каждый участник может найти своё место и получить выгоду от участия в экосистеме.
               </p>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.partnerships}
         onClose={() => closeModal('partnerships')}
         title="Стратегические партнёрства VOD"
         type="info"
         size="xl"
         content={
              <div className="space-y-6">
             <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Стратегические партнёрства VOD</strong> — это ключевой элемент успеха платформы, 
                 обеспечивающий интеграцию с международными организациями, правительствами и технологическими компаниями.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
                <div>
                 <h3 className="text-xl font-bold text-green-400 mb-4">Международные организации:</h3>
                 <ul className="space-y-3 text-blue-400">
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>ООН</strong> — соответствие Целям устойчивого развития (SDG)</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Всемирный банк</strong> — финансирование инфраструктурных проектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>ЕБРР</strong> — поддержка экологических инициатив</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Азиатский банк развития</strong> — региональное сотрудничество</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>UNESCO</strong> — научные исследования и образование</span>
                   </li>
                 </ul>
                </div>
                <div>
                 <h3 className="text-xl font-bold text-green-400 mb-4">Правительства и ведомства:</h3>
                 <ul className="space-y-3 text-blue-400">
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Министерства экологии</strong> — экологическая политика и стандарты</span>
                      </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-2">•</span>
                     <span><strong>Водные ведомства</strong> — регулирование водопользования</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Центральные банки</strong> — цифровые валюты и финансовое регулирование</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Агентства по цифровизации</strong> — технологическая трансформация</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Местные администрации</strong> — муниципальные проекты</span>
                   </li>
                  </ul>
                </div>
                <div>
                 <h3 className="text-xl font-bold text-green-400 mb-4">Технологические компании:</h3>
                 <ul className="space-y-3 text-blue-400">
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>IoT-провайдеры</strong> — датчики и системы мониторинга</span>
                      </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Облачные платформы</strong> — инфраструктура и масштабирование</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>ИИ-лаборатории</strong> — алгоритмы и модели машинного обучения</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Блокчейн-компании</strong> — смарт-контракты и DeFi-решения</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Аналитические платформы</strong> — BI-инструменты и дашборды</span>
                   </li>
                  </ul>
                </div>
               <div>
                 <h3 className="text-xl font-bold text-green-400 mb-4">Академические партнёрства:</h3>
                 <ul className="space-y-3 text-blue-400">
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Университеты</strong> — научные исследования и подготовка кадров</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>НИИ</strong> — прикладные разработки и инновации</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Технологические парки</strong> — инкубация стартапов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Международные консорциумы</strong> — совместные проекты</span>
                   </li>
                 </ul>
              </div>
    </div>
             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
               <p className="text-blue-300 font-medium">
                 <strong>Результат партнёрств:</strong> Стратегические партнёрства обеспечивают VOD доступ к 
                 международным стандартам, финансированию, технологиям и экспертизе, необходимой для создания 
                 глобальной экосистемы управления водными ресурсами.
               </p>
             </div>
           </div>
         }
       />
     </div>
   );
 };

export default PreviewPage;