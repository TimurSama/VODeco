import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Импорт обновленных компонентов для каждого экрана
import SplashIntro from "../components/preview/SplashIntro";
import TransitionAnimation from "../components/preview/TransitionAnimation";
import WelcomeScreen from "../components/preview/WelcomeScreen";
import PlanetCrisisWithStats from "../components/preview/PlanetCrisisWithStats";
import UniteForceScreen from "../components/preview/UniteForceScreen";
import WhyDaoScreen from "../components/preview/WhyDaoScreen";
import ArchitectureScreen from "../components/preview/ArchitectureScreen";
import TokenomicsScreen from "../components/preview/TokenomicsScreen";
import ForEveryoneScreen from "../components/preview/ForEveryoneScreen";
import FinalCallScreen from "../components/preview/FinalCallScreen";
import PresentationScenario from "../components/preview/PresentationScenario";

// Перечисление этапов презентации
enum PresentationStage {
  SPLASH_INTRO,       // Начальный экран с логотипом и кнопками
  TRANSITION,         // Анимация перехода между начальным экраном и презентацией
  NEW_SCENARIO,       // Новый сценарий презентации
  WELCOME,            // Приветствие
  PLANET_CRISIS,      // Информация о планете и водном кризисе
  UNITE_FORCES,       // Объединение сил в единую экосистему
  WHY_DAO,            // Почему DAO эффективно для управления водой
  ARCHITECTURE,       // Архитектура платформы
  TOKENOMICS,         // Токеномика платформы
  FOR_EVERYONE,       // Кто и что получает от платформы
  FINAL_CALL          // Финальный призыв и переход в приложение
}

export default function PreviewPage() {
  const [currentStage, setCurrentStage] = useState<PresentationStage>(PresentationStage.SPLASH_INTRO);
  const [tokens, setTokens] = useState(0);
  const [, setLocation] = useLocation();

  // Функция добавления токенов
  const addTokens = (amount: number) => {
    setTokens(prev => prev + amount);
  };
  
  // Обработчики перехода между этапами
  const handleLogin = () => {
    setLocation('/login');
  };
  
  const handleExplore = () => {
    addTokens(100);
    // Переход сразу к новому сценарию через анимацию перехода
    setCurrentStage(PresentationStage.TRANSITION);
  };
  
  const handleTransitionComplete = () => {
    // Вместо Welcome переходим на новый сценарий
    setCurrentStage(PresentationStage.NEW_SCENARIO);
  };
  
  const handleNewScenarioComplete = () => {
    // После завершения нового сценария переходим на дашборд
    addTokens(150);
    setLocation('/dashboard');
  };
  
  // Старые обработчики для совместимости
  const handleWelcomeNext = () => {
    addTokens(5);
    setCurrentStage(PresentationStage.PLANET_CRISIS);
  };
  
  const handlePlanetSave = () => {
    addTokens(50);
    setCurrentStage(PresentationStage.UNITE_FORCES);
  };
  
  const handleUniteForceNext = () => {
    addTokens(5);
    setCurrentStage(PresentationStage.WHY_DAO);
  };
  
  const handleWhyDaoNext = () => {
    addTokens(5);
    setCurrentStage(PresentationStage.ARCHITECTURE);
  };
  
  const handleArchitectureNext = () => {
    addTokens(5);
    setCurrentStage(PresentationStage.TOKENOMICS);
  };
  
  const handleTokenomicsNext = () => {
    addTokens(5);
    setCurrentStage(PresentationStage.FOR_EVERYONE);
  };
  
  const handleForEveryoneNext = () => {
    addTokens(5);
    setCurrentStage(PresentationStage.FINAL_CALL);
  };
  
  const handleFinalContinue = () => {
    addTokens(50);
    setLocation('/dashboard'); // Переход в приложение
  };
  
  // Отображаем счетчик токенов, если мы не на начальном экране
  const shouldShowTokens = currentStage !== PresentationStage.SPLASH_INTRO;
  
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Счетчик токенов */}
      {shouldShowTokens && (
        <motion.div
          className="absolute top-4 right-4 z-50 flex items-center bg-background/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-bold">{tokens}</span>
          <span className="ml-1 text-white/80">💧</span>
        </motion.div>
      )}
      
      {/* Индикатор прогресса - показываем, только если мы в основной презентации старого формата */}
      {currentStage > PresentationStage.TRANSITION && 
       currentStage !== PresentationStage.NEW_SCENARIO && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col items-center space-y-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStage - 3 
                    ? 'bg-primary' 
                    : index < currentStage - 3 
                      ? 'bg-primary/50' 
                      : 'bg-white/20'
                }`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: index === currentStage - 3 ? 1.2 : 1, 
                  opacity: 1 
                }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Основной контент */}
      <AnimatePresence mode="wait">
        {currentStage === PresentationStage.SPLASH_INTRO && (
          <motion.div
            key="splash"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashIntro onLogin={handleLogin} onExplore={handleExplore} />
          </motion.div>
        )}
        
        {currentStage === PresentationStage.TRANSITION && (
          <motion.div
            key="transition"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TransitionAnimation onComplete={handleTransitionComplete} />
          </motion.div>
        )}
        
        {/* Новый сценарий презентации */}
        {currentStage === PresentationStage.NEW_SCENARIO && (
          <motion.div
            key="new-scenario"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PresentationScenario onComplete={handleNewScenarioComplete} />
          </motion.div>
        )}
        
        {/* Старые экраны презентации для совместимости */}
        {currentStage === PresentationStage.WELCOME && (
          <motion.div
            key="welcome"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreen onNext={handleWelcomeNext} />
          </motion.div>
        )}
        
        {currentStage === PresentationStage.PLANET_CRISIS && (
          <motion.div
            key="planet-crisis"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PlanetCrisisWithStats onSave={handlePlanetSave} />
          </motion.div>
        )}
        
        {currentStage === PresentationStage.UNITE_FORCES && (
          <motion.div
            key="unite-forces"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UniteForceScreen onNext={handleUniteForceNext} />
          </motion.div>
        )}
        
        {currentStage === PresentationStage.WHY_DAO && (
          <motion.div
            key="why-dao"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WhyDaoScreen onNext={handleWhyDaoNext} />
          </motion.div>
        )}
        
        {currentStage === PresentationStage.ARCHITECTURE && (
          <motion.div
            key="architecture"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArchitectureScreen onNext={handleArchitectureNext} />
          </motion.div>
        )}
        
        {currentStage === PresentationStage.TOKENOMICS && (
          <motion.div
            key="tokenomics"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TokenomicsScreen onNext={handleTokenomicsNext} />
          </motion.div>
        )}
        
        {currentStage === PresentationStage.FOR_EVERYONE && (
          <motion.div
            key="for-everyone"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForEveryoneScreen onNext={handleForEveryoneNext} />
          </motion.div>
        )}
        
        {currentStage === PresentationStage.FINAL_CALL && (
          <motion.div
            key="final-call"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalCallScreen onContinue={handleFinalContinue} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}