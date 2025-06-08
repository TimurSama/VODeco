import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import EarthGlobe from "@/components/globo/EarthGlobe";
import { WaterResource } from "@/types";
import { 
  Building, 
  Beaker, 
  Droplets, 
  Users, 
  DollarSign, 
  Settings,
  Hexagon,
  TreePine,
  Heart
} from "lucide-react";

interface InteractivePresentationProps {
  onComplete: () => void;
}

export default function InteractivePresentation({ onComplete }: InteractivePresentationProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showWaterDrop, setShowWaterDrop] = useState(false);

  // Загрузка данных водных ресурсов
  const { data: resources = [] } = useQuery<WaterResource[]>({
    queryKey: ['/api/water-resources'],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (currentScreen === 0) {
      const timer = setTimeout(() => {
        setShowWaterDrop(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const nextScreen = () => {
    if (currentScreen < 6) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  // Экран 2: Глобус с гексагонами
  const GlobeWithHexagonsScreen = () => {
    const hexagons = [
      { id: 'dao', title: 'DAO', icon: Hexagon, color: '#ff00ff' },
      { id: 'society', title: 'Общество', icon: Heart, color: '#ff69b4' },
      { id: 'government', title: 'Государства', icon: Building, color: '#ff7700' },
      { id: 'water-objects', title: 'Водные объекты', icon: Droplets, color: '#00e5ff' },
      { id: 'investors', title: 'Инвесторы', icon: DollarSign, color: '#ffd700' },
      { id: 'business', title: 'Бизнес', icon: Settings, color: '#0088ff' },
      { id: 'science', title: 'Наука', icon: Beaker, color: '#8a2be2' },
    ];

    // Адаптивные позиции для разных размеров экрана
    const getHexagonPositions = (isMobile: boolean) => {
      const radius = isMobile ? 140 : 200;
      const angleStep = (2 * Math.PI) / hexagons.length;
      return hexagons.map((_, index) => ({
        x: Math.cos(index * angleStep - Math.PI / 2) * radius,
        y: Math.sin(index * angleStep - Math.PI / 2) * radius,
      }));
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const positions = getHexagonPositions(isMobile);

    return (
      <div className="relative w-full h-screen overflow-hidden">

        {/* Центральный глобус */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`${isMobile ? 'w-48 h-48' : 'w-64 h-64 md:w-80 md:h-80'}`}>
            <EarthGlobe
              resources={resources}
              onResourceSelect={() => {}}
            />
          </div>
        </motion.div>

        {/* 7 гексагонов вокруг глобуса */}
        <div className="absolute inset-0 flex items-center justify-center">
          {hexagons.map((hexagon, index) => (
            <motion.div
              key={hexagon.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: positions[index].x,
                y: positions[index].y,
              }}
              transition={{ 
                duration: 0.6, 
                delay: 1.5 + index * 0.1,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 30px ${hexagon.color}80`,
              }}
              className={`absolute cursor-pointer ${isMobile ? 'w-16 h-20' : 'w-20 h-24 md:w-24 md:h-28'}`}
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                backgroundColor: `${hexagon.color}15`,
                border: `2px solid ${hexagon.color}`,
                backdropFilter: 'blur(3px)',
                boxShadow: `0 0 15px ${hexagon.color}30`,
              }}
            >
              <div className="flex flex-col items-center justify-center h-full p-1">
                <hexagon.icon 
                  className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6'} mb-1`}
                  style={{ color: hexagon.color }} 
                />
                <span className={`text-white font-semibold text-center leading-tight ${isMobile ? 'text-xs' : 'text-xs md:text-sm'}`}>
                  {hexagon.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Заголовок экрана */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center"
        >
          <h2 className={`font-bold text-white ${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
            Экосистема VODeco
          </h2>
          <p className={`text-blue-200 opacity-80 ${isMobile ? 'text-sm' : 'text-base'}`}>
            Взаимодействие ключевых участников
          </p>
        </motion.div>
      </div>
    );
  };

  // Экран 1: Простой фон с каплей воды
  const CosmicIntroScreen = () => (
    <div className="relative w-full h-screen overflow-hidden">

      {/* VODeco заголовок вверху по центру */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-20"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
          VODeco
        </h1>
        <p className="text-lg md:text-xl text-blue-200 opacity-90">
          Управление водными ресурсами будущего
        </p>
      </motion.div>

      {/* Реалистичная капля воды */}
      <AnimatePresence>
        {showWaterDrop && (
          <motion.div
            initial={{ scale: 0.1, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              {/* Основная капля в форме слезы */}
              <div className="relative w-40 h-56 md:w-48 md:h-64">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 140"
                  className="absolute inset-0"
                >
                  <defs>
                    <radialGradient id="waterGradient" cx="0.3" cy="0.3">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                      <stop offset="30%" stopColor="rgba(147, 197, 253, 0.8)" />
                      <stop offset="70%" stopColor="rgba(59, 130, 246, 0.9)" />
                      <stop offset="100%" stopColor="rgba(29, 78, 216, 0.95)" />
                    </radialGradient>
                    <filter id="waterShadow">
                      <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(59, 130, 246, 0.5)" />
                    </filter>
                  </defs>
                  {/* Форма капли */}
                  <path
                    d="M50 10 Q50 10 50 10 Q70 30 70 70 Q70 100 50 120 Q30 100 30 70 Q30 30 50 10 Z"
                    fill="url(#waterGradient)"
                    filter="url(#waterShadow)"
                    style={{
                      backdropFilter: 'blur(2px)',
                    }}
                  />
                  {/* Блик */}
                  <ellipse
                    cx="42"
                    cy="40"
                    rx="8"
                    ry="12"
                    fill="rgba(255, 255, 255, 0.6)"
                    style={{ filter: 'blur(1px)' }}
                  />
                </svg>

                {/* 3D Молекула воды H2O */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  animate={{
                    rotateY: [0, 360],
                    rotateZ: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Атом кислорода (красный, больше) */}
                  <motion.div 
                    className="relative w-8 h-8 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #ff4757, #c44569)',
                      boxShadow: '0 0 12px rgba(255, 71, 87, 0.8), inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.3)',
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      rotateX: [0, 15, 0, -15, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                  
                  {/* Атом водорода 1 (белый, меньше) */}
                  <motion.div 
                    className="absolute w-4 h-4 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #ffffff, #ddd)',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), inset -1px -1px 2px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.8)',
                      top: '-12px',
                      left: '-16px',
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      rotateY: [0, -30, 0, 30, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                  
                  {/* Атом водорода 2 (белый, меньше) */}
                  <motion.div 
                    className="absolute w-4 h-4 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #ffffff, #ddd)',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), inset -1px -1px 2px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.8)',
                      top: '-12px',
                      right: '-16px',
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      rotateY: [0, 30, 0, -30, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  />
                  
                  {/* Химические связи */}
                  <div 
                    className="absolute w-4 h-0.5 bg-gradient-to-r from-white to-red-300 opacity-80 rounded-full"
                    style={{
                      top: '-8px',
                      left: '-12px',
                      transform: 'rotate(-25deg)',
                      boxShadow: '0 0 3px rgba(255, 255, 255, 0.7)',
                    }}
                  />
                  <div 
                    className="absolute w-4 h-0.5 bg-gradient-to-l from-white to-red-300 opacity-80 rounded-full"
                    style={{
                      top: '-8px',
                      right: '-12px',
                      transform: 'rotate(25deg)',
                      boxShadow: '0 0 3px rgba(255, 255, 255, 0.7)',
                    }}
                  />
                </motion.div>

                {/* Пузырьки воздуха поднимающиеся */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${3 + Math.random() * 4}px`,
                      height: `${3 + Math.random() * 4}px`,
                      left: `${30 + Math.random() * 40}%`,
                      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(147, 197, 253, 0.6))',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), inset 1px 1px 3px rgba(255, 255, 255, 0.9)',
                    }}
                    animate={{
                      y: ['90%', '-10%'],
                      opacity: [0, 0.9, 0.9, 0],
                      scale: [0.3, 1, 1.3, 0.5],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 4,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
              
              {/* Отражение под каплей */}
              <motion.div 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-blue-400 opacity-15 rounded-full"
                style={{
                  filter: 'blur(10px)',
                }}
                animate={{
                  scaleX: [1, 1.2, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full min-h-screen relative">
      <AnimatePresence mode="wait">
        {currentScreen === 0 && (
          <motion.div
            key="cosmic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <CosmicIntroScreen />
          </motion.div>
        )}
        
        {/* Экран 2: Глобус с гексагонами */}
        {currentScreen === 1 && (
          <motion.div
            key="globe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <GlobeWithHexagonsScreen />
          </motion.div>
        )}

        {/* Экраны 3-4: простой фон */}
        {(currentScreen === 2 || currentScreen === 3) && (
          <motion.div
            key={`screen-${currentScreen}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-screen overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Экран {currentScreen + 1}</h2>
                <p className="text-lg md:text-xl mb-8">Здесь будет контент экрана {currentScreen + 1}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Остальные экраны */}
        {currentScreen > 3 && (
          <motion.div
            key="other"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
          >
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Экран {currentScreen + 1}</h2>
              <p className="text-lg mb-8">Здесь будет контент экрана {currentScreen + 1}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопка "Продолжить" адаптивная */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: currentScreen === 0 ? 2.5 : 0.5 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <Button
          onClick={nextScreen}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base backdrop-blur-sm border border-blue-400/30"
        >
          {currentScreen === 6 ? 'Завершить' : 'Продолжить'}
        </Button>
      </motion.div>
    </div>
  );
}