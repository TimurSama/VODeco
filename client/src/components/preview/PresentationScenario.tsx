import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Globe, Settings, Hexagon, Heart, Users, Database, BookOpen, Leaf } from 'lucide-react';
import LoadingScreen from './LoadingScreen';

interface PresentationScenarioProps {
  onComplete?: () => void;
}

export default function PresentationScenario({ onComplete }: PresentationScenarioProps) {
  const [stage, setStage] = useState<'loading' | 'intro' | 'modules' | 'map' | 'join' | 'complete'>('loading');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  // Обработка завершения загрузочного экрана
  const handleLoadingComplete = () => {
    setStage('intro');
  };
  
  // Обработка клика по модулю
  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
  };
  
  // Закрытие информации о модуле
  const handleCloseModule = () => {
    setActiveModule(null);
  };
  
  // Переход к следующему этапу сценария
  const handleNext = () => {
    if (stage === 'intro') {
      setStage('modules');
    } else if (stage === 'modules' && !activeModule) {
      setStage('map');
    } else if (stage === 'map') {
      setStage('join');
    } else if (stage === 'join') {
      setStage('complete');
      if (onComplete) setTimeout(onComplete, 500);
    }
  };
  
  // Модули экосистемы VODeco
  const modules = [
    { 
      id: 'dao', 
      name: 'DAO и управление', 
      icon: <Database className="h-8 w-8" />, 
      color: 'bg-blue-500',
      description: 'Прозрачные голосования, участие через токены VOD, смарт-контракты для контроля средств и решений.',
      details: 'Любой участник может влиять на решения: от бюджета станции до стандартов качества воды. Всё — прозрачно, в блокчейне.'
    },
    { 
      id: 'sensors', 
      name: 'Сенсоры и IoT', 
      icon: <Settings className="h-8 w-8" />, 
      color: 'bg-green-500',
      description: 'Устройства отслеживают качество, утечки, давление, потери, состояние труб и источников.',
      details: 'Фермер из Самарканда получает уведомление о засолении почвы до того, как пострадает урожай.'
    },
    { 
      id: 'users', 
      name: 'Уровни пользователей', 
      icon: <Users className="h-8 w-8" />, 
      color: 'bg-purple-500',
      description: 'Индивидуальный, муниципальный, аграрный, промышленный, государственный уровни доступа и управления.',
      details: 'Каждый вид пользователя имеет свои интерфейсы, цели и метрики, но работает в одной системе.'
    },
    { 
      id: 'education', 
      name: 'Обучение и SPC', 
      icon: <BookOpen className="h-8 w-8" />, 
      color: 'bg-yellow-500',
      description: 'Локальные проектные компании (SPC), центры обучения специалистов, DAO-гранты на образование.',
      details: 'От токена до реального студента до инженера на объекте — полный цикл подготовки специалистов.'
    },
    { 
      id: 'ecology', 
      name: 'Экология и возврат', 
      icon: <Leaf className="h-8 w-8" />, 
      color: 'bg-teal-500',
      description: 'Мониторинг биоразнообразия, системы биоочистки и природных фильтров, снижение воздействия.',
      details: 'Наша цель — вода возвращается в природу чище, чем была взята.'
    },
    { 
      id: 'economy', 
      name: 'Экономика и токены', 
      icon: <Heart className="h-8 w-8" />, 
      color: 'bg-red-500',
      description: 'Реинвестиции прибыли в регион, DAO-финансирование инфраструктуры, токены для участия.',
      details: 'Участник голосует за модернизацию станции — и получает долю прибыли с новой системы.'
    }
  ];
  
  // Данные проектов на карте
  const mapProjects = [
    { 
      id: 'tashkent', 
      name: 'Узбекистан, Ташкент', 
      coordinates: { x: 55, y: 48 },
      description: 'Модернизация системы ирригации и мониторинга качества воды',
      impact: '30% снижение потерь воды, +20% урожайность'
    },
    { 
      id: 'vinnitsa', 
      name: 'Украина, Винница', 
      coordinates: { x: 48, y: 42 },
      description: 'Цифровая система контроля муниципального водоснабжения',
      impact: '15% экономия воды, улучшение качества на 40%'
    },
    { 
      id: 'ashgabat', 
      name: 'Туркменистан, Ашхабад', 
      coordinates: { x: 58, y: 49 },
      description: 'Солнечная опреснительная установка с DAO-управлением',
      impact: 'Обеспечение чистой водой 25,000 человек'
    },
    { 
      id: 'africa', 
      name: 'Танзания, озеро Виктория', 
      coordinates: { x: 45, y: 62 },
      description: 'Система мониторинга экосистемы озера и предотвращения загрязнений',
      impact: 'Восстановление популяции рыбы, сохранение биоразнообразия'
    },
    { 
      id: 'asia', 
      name: 'Индия, долина Ганга', 
      coordinates: { x: 62, y: 52 },
      description: 'Комплексная программа очистки и восстановления священной реки',
      impact: 'Снижение загрязнения на 35%, возвращение экосистемы'
    }
  ];
  
  // Общие варианты анимации
  const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  // Варианты анимации для модулей
  const moduleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: i * 0.15,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }),
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };
  
  // Варианты анимации для проектов на карте
  const projectVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.5 + i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { scale: 1.2, transition: { duration: 0.2 } }
  };
  
  // Расчет позиций для шестиугольных модулей
  const getModulePosition = (index: number, total: number) => {
    const radius = window.innerWidth < 768 ? 120 : 180;
    const angleStep = (2 * Math.PI) / total;
    const baseAngle = Math.PI / 2; // Начинаем сверху
    const angle = baseAngle + index * angleStep;
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Экран загрузки */}
      {stage === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} autoStart={true} />
      )}
      
      {/* Основной контент презентации */}
      <AnimatePresence mode="wait">
        {/* Интро */}
        {stage === 'intro' && (
          <motion.div 
            key="intro"
            className="flex flex-col items-center justify-center h-full w-full p-4 relative"
            {...fadeInOut}
          >
            <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15 z-0"></div>
            <div className="absolute inset-0 bg-gradient-radial from-[#001520] via-transparent to-[#001520] opacity-50 z-0"></div>
            
            <div className="relative z-10 max-w-3xl text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6"
              >
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl md:text-7xl font-bold text-white mr-2">DA</span>
                  <Droplet className="h-12 w-12 md:h-16 md:w-16 text-primary fill-primary/80" />
                  <span className="text-5xl md:text-7xl font-bold text-white ml-2">ECO</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl text-white mb-2">
                  Цифровая архитектура воды
                </h2>
                
                <p className="text-lg text-white/80">
                  Децентрализованная экосистема управления водными ресурсами
                </p>
              </motion.div>
              
              <motion.button
                className="mt-8 bg-primary/80 hover:bg-primary text-white px-8 py-3 rounded-full font-medium transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                onClick={handleNext}
              >
                Узнать о модулях экосистемы
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Модули экосистемы */}
        {stage === 'modules' && (
          <motion.div 
            key="modules"
            className="flex flex-col items-center justify-center h-full w-full p-4 relative"
            {...fadeInOut}
          >
            <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15 z-0"></div>
            <div className="absolute inset-0 bg-gradient-radial from-[#001520] via-transparent to-[#001520] opacity-50 z-0"></div>
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
              >
                Экосистема <span className="text-primary">VODeco</span>
              </motion.h2>
              
              {/* Центральная планета */}
              <div className="relative mb-8 md:mb-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    transition: { 
                      delay: 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }}
                  className="relative z-10"
                >
                  <Globe className="h-24 w-24 md:h-32 md:w-32 text-primary" strokeWidth={1} />
                </motion.div>
                
                {/* Модули вокруг планеты */}
                <div className="absolute inset-0">
                  {modules.map((module, i) => {
                    const pos = getModulePosition(i, modules.length);
                    return (
                      <motion.div
                        key={module.id}
                        custom={i}
                        variants={moduleVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleModuleClick(module.id)}
                        className="absolute cursor-pointer"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(${pos.x}px, ${pos.y}px)`
                        }}
                      >
                        <div className={`w-16 h-16 md:w-20 md:h-20 ${module.color} bg-opacity-80 rounded-xl flex items-center justify-center`}>
                          {module.icon}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                          <span className="text-white text-xs md:text-sm font-medium">{module.name}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Кнопка далее (показывается только когда не открыт модуль) */}
              {!activeModule && (
                <motion.button
                  className="mt-16 bg-primary/80 hover:bg-primary text-white px-8 py-3 rounded-full font-medium transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  onClick={handleNext}
                >
                  Посмотреть карту проектов
                </motion.button>
              )}
              
              {/* Информация о выбранном модуле */}
              <AnimatePresence>
                {activeModule && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/70 z-30 flex items-center justify-center p-4"
                    onClick={handleCloseModule}
                  >
                    <div 
                      className="bg-[#001520] border border-primary/30 rounded-xl p-6 max-w-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {modules.find(m => m.id === activeModule) && (
                        <>
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 ${modules.find(m => m.id === activeModule)?.color} bg-opacity-80 rounded-lg flex items-center justify-center mr-4`}>
                              {modules.find(m => m.id === activeModule)?.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">
                              {modules.find(m => m.id === activeModule)?.name}
                            </h3>
                          </div>
                          
                          <p className="text-white/80 mb-4">
                            {modules.find(m => m.id === activeModule)?.description}
                          </p>
                          
                          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
                            <p className="text-white italic">
                              {modules.find(m => m.id === activeModule)?.details}
                            </p>
                          </div>
                          
                          <button
                            className="w-full bg-primary/80 hover:bg-primary text-white py-2 rounded-lg font-medium transition-colors"
                            onClick={handleCloseModule}
                          >
                            Закрыть
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
        
        {/* Карта проектов */}
        {stage === 'map' && (
          <motion.div 
            key="map"
            className="flex flex-col items-center justify-center h-full w-full p-4 relative"
            {...fadeInOut}
          >
            <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15 z-0"></div>
            <div className="absolute inset-0 bg-gradient-radial from-[#001520] via-transparent to-[#001520] opacity-50 z-0"></div>
            
            <div className="relative z-10 w-full max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
              >
                Глобальная карта проектов <span className="text-primary">VODeco</span>
              </motion.h2>
              
              {/* Карта мира */}
              <div className="relative w-full aspect-[16/9] mb-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                >
                  {/* Базовая карта мира с градиентом */}
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20 rounded-2xl"></div>
                  
                  {/* Контуры континентов (упрощенно) */}
                  <div className="absolute inset-0 rounded-2xl border border-primary/30"></div>
                  
                  {/* Проекты на карте */}
                  {mapProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      custom={i}
                      variants={projectVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      className="absolute cursor-pointer"
                      style={{
                        top: `${project.coordinates.y}%`,
                        left: `${project.coordinates.x}%`
                      }}
                    >
                      <div className="relative">
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full"></div>
                        <div className="absolute -top-2 -left-2 w-7 h-7 md:w-8 md:h-8 border-2 border-primary rounded-full opacity-50 animate-ping"></div>
                        
                        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-[#001520]/90 border border-primary/30 rounded-lg p-2 text-center w-40 opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-xs font-bold text-white mb-1">{project.name}</p>
                          <p className="text-[10px] text-white/80">{project.description}</p>
                          <p className="text-[10px] text-primary mt-1">{project.impact}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-white/80 mb-6 max-w-xl mx-auto">
                  Наши проекты расположены по всему миру, от Центральной Азии до Африки. 
                  Каждый проект уникален и адаптирован к местным условиям.
                </p>
                
                <button
                  className="bg-primary/80 hover:bg-primary text-white px-8 py-3 rounded-full font-medium transition-colors"
                  onClick={handleNext}
                >
                  Присоединиться к экосистеме
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Присоединение */}
        {stage === 'join' && (
          <motion.div 
            key="join"
            className="flex flex-col items-center justify-center h-full w-full p-4 relative"
            {...fadeInOut}
          >
            <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15 z-0"></div>
            <div className="absolute inset-0 bg-gradient-radial from-[#001520] via-transparent to-[#001520] opacity-50 z-0"></div>
            
            <div className="relative z-10 max-w-2xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex items-center justify-center mb-6"
              >
                <Hexagon className="h-24 w-24 text-primary" strokeWidth={1.5} />
                <Droplet className="h-12 w-12 text-primary fill-primary/80 absolute" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-white mb-4"
              >
                Присоединяйтесь к <span className="text-primary">VODeco</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-white/80 mb-8"
              >
                Это не просто платформа. Это экосистема будущего, где каждый может участвовать, 
                инвестировать и защищать то, без чего невозможна жизнь — ВОДУ.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <button
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Инвестировать в DAO
                </button>
                
                <button
                  className="w-full md:w-auto bg-transparent border border-primary hover:bg-primary/10 text-primary px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Стать партнёром
                </button>
                
                <button
                  className="w-full md:w-auto bg-transparent border border-white/30 hover:bg-white/5 text-white px-8 py-3 rounded-full font-medium transition-colors"
                  onClick={handleNext}
                >
                  Начать работу
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}