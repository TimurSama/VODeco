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
        {/* Улучшенный фон с тонкой гексагональной сеткой */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          {/* Тонкая гексагональная сетка */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="hexPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <polygon 
                    points="10,2 18,7 18,13 10,18 2,13 2,7" 
                    fill="none" 
                    stroke="rgba(59, 130, 246, 0.3)" 
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexPattern)" />
            </svg>
          </div>
          
          {/* Центральное свечение */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 60%)',
            }}
          />
        </div>

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

  // Экран 1: Космический фон с каплей воды
  const CosmicIntroScreen = () => (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Адаптивный космический фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        {/* Упрощенная сетка звезд */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Простая анимация градиента */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Реалистичная 3D капля воды */}
      <AnimatePresence>
        {showWaterDrop && (
          <motion.div
            initial={{ scale: 0.1, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-32 h-48 sm:w-40 sm:h-56 md:w-48 md:h-64">
              {/* Основная капля с заострённым верхом */}
              <div 
                className="w-full h-full relative"
                style={{
                  background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.95) 0%, rgba(147, 197, 253, 0.8) 40%, rgba(219, 234, 254, 0.6) 70%, rgba(255, 255, 255, 0.9) 90%)',
                  borderRadius: '50% 50% 50% 50% / 80% 80% 60% 60%',
                  clipPath: 'ellipse(50% 45% at 50% 60%)',
                  boxShadow: `
                    0 0 30px rgba(59, 130, 246, 0.5),
                    inset -5px -5px 15px rgba(0, 0, 0, 0.1),
                    inset 5px 5px 15px rgba(255, 255, 255, 0.4)
                  `,
                  backdropFilter: 'blur(2px)',
                }}
              >
                {/* Заострённый верх капли */}
                <div 
                  className="absolute w-4 h-8 left-1/2 transform -translate-x-1/2 -top-2"
                  style={{
                    background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.95) 0%, rgba(147, 197, 253, 0.8) 100%)',
                    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                    filter: 'blur(0.5px)',
                  }}
                />

                {/* Молекула воды H2O в центре */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    rotateY: [0, 360],
                    rotateX: [0, 15, 0, -15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Атом кислорода (красный) */}
                  <div 
                    className="relative w-6 h-6 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #ff6b6b, #e74c3c)',
                      boxShadow: '0 0 8px rgba(231, 76, 60, 0.6)',
                    }}
                  />
                  {/* Атом водорода 1 (белый) */}
                  <div 
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #ffffff, #ecf0f1)',
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
                      top: '-8px',
                      left: '-12px',
                    }}
                  />
                  {/* Атом водорода 2 (белый) */}
                  <div 
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #ffffff, #ecf0f1)',
                      boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
                      top: '-8px',
                      right: '-12px',
                    }}
                  />
                  {/* Связи между атомами */}
                  <div 
                    className="absolute w-3 h-0.5 bg-white opacity-60"
                    style={{
                      top: '-5px',
                      left: '-9px',
                      transform: 'rotate(-30deg)',
                    }}
                  />
                  <div 
                    className="absolute w-3 h-0.5 bg-white opacity-60"
                    style={{
                      top: '-5px',
                      right: '-9px',
                      transform: 'rotate(30deg)',
                    }}
                  />
                </motion.div>

                {/* Блик на капле */}
                <div 
                  className="absolute w-6 h-8 bg-white opacity-70 rounded-full"
                  style={{
                    top: '20%',
                    left: '25%',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 100%)',
                    filter: 'blur(1px)',
                  }}
                />
                
                {/* Круглые пузырьки воздуха поднимающиеся снизу вверх */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${4 + Math.random() * 4}px`,
                      height: `${4 + Math.random() * 4}px`,
                      left: `${25 + Math.random() * 50}%`,
                      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4))',
                      boxShadow: '0 0 6px rgba(255, 255, 255, 0.6), inset 1px 1px 2px rgba(255, 255, 255, 0.8)',
                    }}
                    animate={{
                      y: ['100%', '-20%'],
                      opacity: [0, 0.8, 0.8, 0],
                      scale: [0.5, 1, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
              
              {/* Отражение под каплей */}
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-blue-500 opacity-20 rounded-full"
                style={{
                  filter: 'blur(8px)',
                }}
                animate={{
                  scaleX: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
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

      {/* VODeco заголовок (сдвинут ниже) */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-32 md:bottom-40 left-1/2 transform -translate-x-1/2 text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          VODeco
        </h1>
        <p className="text-base md:text-lg text-blue-200 opacity-90">
          Управление водными ресурсами будущего
        </p>
      </motion.div>
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

        {/* Экраны 3-4: с тем же космическим фоном */}
        {(currentScreen === 2 || currentScreen === 3) && (
          <motion.div
            key={`screen-${currentScreen}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-screen overflow-hidden"
          >
            {/* Тот же космический фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
              {/* Упрощенная сетка звезд */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
              
              {/* Простая анимация градиента */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Контент экрана */}
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