import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Компоненты для разных экранов
import LoadingAnimation from "../components/preview/LoadingAnimation";
import WelcomeScreen from "../components/preview/WelcomeScreen";
import PlanetCrisisScreen from "../components/preview/PlanetCrisisScreen";
import InterventionScreen from "../components/preview/InterventionScreen";
import UniteForceScreen from "../components/preview/UniteForceScreen";
import WhyDaoScreen from "../components/preview/WhyDaoScreen";
import ArchitectureScreen from "../components/preview/ArchitectureScreen";
import TokenomicsScreen from "../components/preview/TokenomicsScreen";
import ForEveryoneScreen from "../components/preview/ForEveryoneScreen";
import FinalCallScreen from "../components/preview/FinalCallScreen";

export default function PreviewPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [showExplore, setShowExplore] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  
  // Максимальное количество экранов
  const totalStages = 10;
  
  // Автоматическое обновление токенов при действиях пользователя
  const addTokens = (amount: number) => {
    setTokens(prev => prev + amount);
  };
  
  // Обработка скролла для перемещения между экранами
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isScrolling) return;
      
      // Предотвращаем слишком частый скролл
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1000);
      
      if (e.deltaY > 0 && currentStage < totalStages - 1) {
        // Скролл вниз
        setCurrentStage(prev => prev + 1);
      } else if (e.deltaY < 0 && currentStage > 0) {
        // Скролл вверх
        setCurrentStage(prev => prev - 1);
      }
    };
    
    const element = previewRef.current;
    if (element) {
      element.addEventListener('wheel', handleScroll);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleScroll);
      }
    };
  }, [currentStage, isScrolling]);
  
  // Обработка начального экрана
  const handleExplore = () => {
    addTokens(100);
    setShowExplore(true);
    setTimeout(() => setCurrentStage(1), 3000); // Переход после анимации
  };
  
  // Обработка перехода на следующий экран
  const handleNextScreen = () => {
    if (currentStage < totalStages - 1) {
      setCurrentStage(prev => prev + 1);
    }
  };
  
  // Обработка спасения планеты
  const handleSavePlanet = () => {
    addTokens(50);
    handleNextScreen();
  };
  
  // Обработка финального перехода
  const handleFinalContinue = () => {
    addTokens(50);
    setLocation('/dashboard');
  };
  
  return (
    <div 
      ref={previewRef}
      className="w-full h-screen overflow-hidden bg-background text-white flex flex-col items-center justify-center relative"
    >
      {/* Индикатор текущего экрана и токенов */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        <div className="bg-card/40 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
          <span className="text-primary">{tokens} 💧</span>
        </div>
        <div className="bg-card/40 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
          {currentStage + 1} / {totalStages}
        </div>
      </div>
      
      {/* Индикатор скролла */}
      {currentStage < totalStages - 1 && (
        <motion.div 
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 1, 0.2], 
            y: [0, 10, 0] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
        >
          <ChevronDown className="h-6 w-6 text-primary" />
        </motion.div>
      )}
      
      {/* Контейнер с анимированными экранами */}
      <AnimatePresence mode="wait">
        {currentStage === 0 && !showExplore && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center"
          >
            <LoadingAnimation onExplore={handleExplore} />
          </motion.div>
        )}
        
        {(currentStage === 0 && showExplore) && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center"
          >
            <div className="text-2xl">Переход в режим исследования...</div>
          </motion.div>
        )}
        
        {currentStage === 1 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <WelcomeScreen onNext={handleNextScreen} />
          </motion.div>
        )}
        
        {currentStage === 2 && (
          <motion.div
            key="planet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <PlanetCrisisScreen onNext={handleNextScreen} />
          </motion.div>
        )}
        
        {currentStage === 3 && (
          <motion.div
            key="intervention"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <InterventionScreen onSavePlanet={handleSavePlanet} />
          </motion.div>
        )}
        
        {currentStage === 4 && (
          <motion.div
            key="unite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <UniteForceScreen onNext={handleNextScreen} />
          </motion.div>
        )}
        
        {currentStage === 5 && (
          <motion.div
            key="whydao"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <WhyDaoScreen onNext={handleNextScreen} />
          </motion.div>
        )}
        
        {currentStage === 6 && (
          <motion.div
            key="architecture"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <ArchitectureScreen onNext={handleNextScreen} />
          </motion.div>
        )}
        
        {currentStage === 7 && (
          <motion.div
            key="tokenomics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <TokenomicsScreen onNext={handleNextScreen} />
          </motion.div>
        )}
        
        {currentStage === 8 && (
          <motion.div
            key="foreveryone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <ForEveryoneScreen onNext={handleNextScreen} />
          </motion.div>
        )}
        
        {currentStage === 9 && (
          <motion.div
            key="finalcall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <FinalCallScreen onContinue={handleFinalContinue} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}