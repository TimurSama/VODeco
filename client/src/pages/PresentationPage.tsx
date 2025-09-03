import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  Leaf,
  Server,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  BookOpen,
  Users2,
  Building,
  Factory,
  GraduationCap,
  Briefcase,
  Landmark,
  Coins,
  TrendingUp as TrendingUpIcon,
  AlertTriangle,
  Info,
  Target as TargetIcon
} from 'lucide-react';

const PresentationPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [modalStates, setModalStates] = useState({
    dao: false,
    technology: false,
    mechanics: false,
    value: false,
    doctrine: false,
    manifesto: false,
    future: false,
    platform: false,
    services: false,
    tokenomics: false,
    roadmap: false,
    partnerships: false
  });
  const { scrollYProgress } = useScroll();
  
  const sections = [
    { id: 'hero', title: 'VODeco', subtitle: 'Глобальная Экосистема Водных Ресурсов' },
    { id: 'crisis', title: 'Кризис', subtitle: 'Мир вступает в новую эру' },
    { id: 'solution', title: 'Решение', subtitle: 'VODeco — неизбежный шаг' },
    { id: 'dao', title: 'DAO', subtitle: 'Фундамент нового сотрудничества' },
    { id: 'technology', title: 'Технологии', subtitle: 'Мониторинг, контроль, управление' },
    { id: 'mechanics', title: 'Механики', subtitle: 'Инструменты и решения' },
    { id: 'value', title: 'Ценность', subtitle: 'Для всех участников' },
    { id: 'doctrine', title: 'Доктрина', subtitle: 'Принципы и убеждения' },
    { id: 'manifesto', title: 'Манифест', subtitle: 'Мы объединяем мир вокруг воды' },
    { id: 'future', title: 'Будущее', subtitle: 'Дорожная карта развития' }
  ];

  const autoPlay = () => {
    setIsAutoPlaying(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < sections.length - 1) {
        index++;
        setCurrentSection(index);
      } else {
        clearInterval(interval);
        setIsAutoPlaying(false);
      }
    }, 5000);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
  };

  const openModal = (modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: false }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const sectionIndex = Math.floor(scrollPercent * sections.length);
      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return (
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex items-center justify-center text-center"
          >
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  VODeco
                </h1>
                <p className="text-2xl md:text-4xl mb-6 text-cyan-100 font-light">
                  Глобальная Экосистема Водных Ресурсов
                </p>
                <p className="text-xl md:text-2xl mb-12 text-blue-200 max-w-4xl mx-auto leading-relaxed">
                  Неизбежная трансформация. Единое DAO-объединение. Общее будущее.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg"
                    onClick={autoPlay}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Автопрезентация
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 text-lg"
                    onClick={() => setCurrentSection(1)}
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Начать изучение
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'crisis':
        return (
          <motion.div
            key="crisis"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex items-center justify-center py-20"
          >
            <GlassPanel variant="elevated" padding="xl" className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
                >
                  <AlertTriangle className="w-12 h-12 text-red-400" />
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-red-400">
                  Мир вступает в новую эру
                </h2>
                <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
                  В XXI веке вода становится не просто природным ресурсом, а стратегическим активом, 
                  от которого зависит экономическая стабильность, здоровье и безопасность.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-orange-400 mb-4">Проблемы:</h3>
                  {[
                    'Рост населения и урбанизация',
                    'Изменение климата и экстремальные явления',
                    'Деградация экосистем и загрязнение',
                    'Истощение запасов пресной воды',
                    'Неэффективное управление ресурсами'
                  ].map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-blue-200">{problem}</span>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-green-400 mb-4">Последствия:</h3>
                  {[
                    'Экономические потери триллионы долларов',
                    'Социальные конфликты и миграция',
                    'Продовольственная безопасность под угрозой',
                    'Здоровье населения ухудшается',
                    'Биоразнообразие сокращается'
                  ].map((consequence, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20"
                    >
                      <Info className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-blue-200">{consequence}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center mt-12"
              >
                <p className="text-xl text-red-300 font-medium mb-6">
                  Управление водными ресурсами в разрозненных системах больше не работает
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-8 py-4 text-lg"
                  onClick={() => setCurrentSection(2)}
                >
                  Узнать решение
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </GlassPanel>
          </motion.div>
        );

      case 'solution':
        return (
          <motion.div
            key="solution"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex items-center justify-center py-20"
          >
            <GlassPanel variant="elevated" padding="xl" className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <Lightbulb className="w-12 h-12 text-green-400" />
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-green-400">
                  Единственное устойчивое решение
                </h2>
                <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
                  Создание интегрированных глобальных платформ — открытых, прозрачных, 
                  технологичных, объединяющих все заинтересованные стороны.
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center mb-12"
              >
                <h3 className="text-3xl font-bold text-cyan-400 mb-6">
                  VODeco — это неизбежный шаг в эволюции управления водой
                </h3>
                <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                  Аналог появления интернета или глобальных платёжных систем, 
                  но для ключевого ресурса жизни.
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: <Globe className="w-12 h-12 text-blue-400" />,
                    title: "Глобальность",
                    description: "Охват всех водных ресурсов планеты"
                  },
                  {
                    icon: <Shield className="w-12 h-12 text-green-400" />,
                    title: "Прозрачность",
                    description: "Открытый доступ к данным и решениям"
                  },
                  {
                    icon: <Zap className="w-12 h-12 text-yellow-400" />,
                    title: "Технологичность",
                    description: "Современные инструменты и решения"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-blue-200">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button 
                     size="lg" 
                     className="bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white px-8 py-4 text-lg"
                     onClick={() => setCurrentSection(3)}
                   >
                     Узнать о DAO
                     <ArrowRight className="ml-2 h-5 w-5" />
                   </Button>
                   <Button 
                     size="lg" 
                     variant="outline" 
                     className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 text-lg"
                     onClick={() => openModal('dao')}
                   >
                     <Info className="mr-2 h-5 w-5" />
                     Подробнее о DAO
                   </Button>
                   <Button
                     variant="outline"
                     size="lg"
                     className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg"
                     onClick={() => openModal('platform')}
                   >
                     <Info className="mr-2 h-5 w-5" />
                     О платформе VOD
                   </Button>
                   <Button
                     variant="outline"
                     size="lg"
                     className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white px-8 py-4 text-lg"
                     onClick={() => openModal('tokenomics')}
                   >
                     <Info className="mr-2 h-5 w-5" />
                     Токеномика
                   </Button>
                 </div>
              </motion.div>
            </GlassPanel>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center"
          >
            <GlassPanel variant="elevated" padding="xl" className="text-center">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4">
                Раздел в разработке
              </h2>
              <p className="text-blue-200 mb-6">
                Этот раздел презентации находится в разработке
              </p>
              <Button onClick={() => setCurrentSection(0)}>
                Вернуться к началу
              </Button>
            </GlassPanel>
          </motion.div>
        );
    }
  };

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
            <Link href="/preview">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                Обзор
              </span>
            </Link>
            <Link href="/presentation">
              <span className="text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1">
                Презентация
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

      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-slate-800/50 backdrop-blur-sm">
        <div className="h-1 bg-slate-700">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Section Navigation */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSection === index 
                  ? 'bg-cyan-400 scale-125' 
                  : 'bg-slate-400 hover:bg-slate-300'
              }`}
              title={section.title}
            />
          ))}
        </div>
      </div>

      {/* Section Title */}
      <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2">
            {sections[currentSection].title}
          </h2>
          <p className="text-blue-200 text-sm md:text-base">
            {sections[currentSection].subtitle}
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="pt-32">
        <AnimatePresence mode="wait">
          {renderSection(sections[currentSection].id)}
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={isAutoPlaying ? stopAutoPlay : autoPlay}
          className={`border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white ${
            isAutoPlaying ? 'bg-cyan-400 text-white' : ''
          }`}
        >
          {isAutoPlaying ? <Clock className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          disabled={currentSection === sections.length - 1}
          className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Section Counter */}
      <div className="fixed bottom-8 right-8 z-30">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
          <span className="text-cyan-400 font-bold">{currentSection + 1}</span>
          <span className="text-slate-400"> / {sections.length}</span>
        </div>
      </div>

      {/* Модальные окна */}
      <InfoModal
        isOpen={modalStates.dao}
        onClose={() => closeModal('dao')}
        title="DAO — Фундамент нового сотрудничества"
        type="dao"
        size="xl"
        content={
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-200">
                <strong>DAO (Decentralized Autonomous Organization)</strong> — это децентрализованная автономная организация, 
                где каждый участник имеет равный доступ к информации и возможность влиять на решения.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Принципы DAO:</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Равноправие всех участников</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Прозрачность всех процессов</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Открытое голосование</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Автоматическое исполнение решений</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Преимущества:</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Исключение монополии и коррупции</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Открытые процессы принятия решений</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Объединение на основе общих ценностей</span>
                </li>
              </ul>
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
     </div>
   );
 };

export default PresentationPage;
