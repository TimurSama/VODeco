import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Импорт компонентов для каждого экрана
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
  
  // Управление переходом к следующему экрану
  const handleNextScreen = () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // Время для анимации
    
    if (currentStage < totalStages - 1) {
      setCurrentStage(prev => prev + 1);
    } else {
      // Последний экран
      setShowExplore(true);
    }
  };
  
  // Прокрутка колесом мыши
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      if (e.deltaY > 0) {
        // Скролл вниз
        handleNextScreen();
      } else if (e.deltaY < 0 && currentStage > 0) {
        // Скролл вверх
        setIsScrolling(true);
        setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
        setCurrentStage(prev => prev - 1);
      }
    };
    
    const ref = previewRef.current;
    if (ref) {
      ref.addEventListener('wheel', handleScroll, { passive: false });
    }
    
    return () => {
      if (ref) {
        ref.removeEventListener('wheel', handleScroll);
      }
    };
  }, [currentStage, isScrolling]);
  
  // Функция добавления токенов
  const addTokens = (amount: number) => {
    setTokens(prev => prev + amount);
  };
  
  // Обработчики для каждого шага
  const handleWelcomeNext = () => {
    addTokens(5);
    handleNextScreen();
  };
  
  const handleCrisisNext = () => {
    addTokens(5);
    handleNextScreen();
  };
  
  const handleInterventionNext = () => {
    addTokens(5);
    handleNextScreen();
  };
  
  const handleUniteForceNext = () => {
    addTokens(5);
    handleNextScreen();
  };
  
  const handleWhyDaoNext = () => {
    addTokens(5);
    handleNextScreen();
  };
  
  const handleArchitectureNext = () => {
    addTokens(5);
    handleNextScreen();
  };
  
  const handleTokenomicsNext = () => {
    addTokens(5);
    handleNextScreen();
  };
  
  const handleForEveryoneNext = () => {
    addTokens(5);
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
      className="w-full h-screen relative overflow-hidden"
    >
      {/* Токены */}
      <motion.div
        className="absolute top-4 right-4 z-50 flex items-center bg-background/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-primary font-bold">{tokens}</span>
        <span className="ml-1 text-white/80">💧</span>
      </motion.div>
      
      {/* Индикатор прогресса */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col items-center space-y-2">
          {Array.from({ length: totalStages }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStage 
                  ? 'bg-primary' 
                  : index < currentStage 
                    ? 'bg-primary/50' 
                    : 'bg-white/20'
              }`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: index === currentStage ? 1.2 : 1, 
                opacity: 1 
              }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            />
          ))}
        </div>
      </div>
      
      {/* Скролл вниз индикатор */}
      {currentStage === 0 && (
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white/50 flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: [0.5, 1, 0.5], 
            y: [-10, 0, -10] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <span className="text-xs mb-2">Скролл вниз</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      )}
      
      {/* Контент стадий */}
      <AnimatePresence mode="wait">
        {currentStage === 0 && (
          <motion.div
            key="loading"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingAnimation onComplete={handleNextScreen} />
          </motion.div>
        )}
        
        {currentStage === 1 && (
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
        
        {currentStage === 2 && (
          <motion.div
            key="crisis"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PlanetCrisisScreen onNext={handleCrisisNext} />
          </motion.div>
        )}
        
        {currentStage === 3 && (
          <motion.div
            key="intervention"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InterventionScreen onNext={handleInterventionNext} />
          </motion.div>
        )}
        
        {currentStage === 4 && (
          <motion.div
            key="unite"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UniteForceScreen onNext={handleUniteForceNext} />
          </motion.div>
        )}
        
        {currentStage === 5 && (
          <motion.div
            key="whydao"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WhyDaoScreen onNext={handleWhyDaoNext} />
          </motion.div>
        )}
        
        {currentStage === 6 && (
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
        
        {currentStage === 7 && (
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
        
        {currentStage === 8 && (
          <motion.div
            key="foreveryone"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForEveryoneScreen onNext={handleForEveryoneNext} />
          </motion.div>
        )}
        
        {currentStage === 9 && (
          <motion.div
            key="final"
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