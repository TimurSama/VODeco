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
      { id: 'dao', title: 'DAO', icon: Hexagon, color: '#ff00ff', position: { x: 0, y: -220 } },
      { id: 'society', title: 'Общество', icon: Heart, color: '#ff69b4', position: { x: -190, y: -110 } },
      { id: 'government', title: 'Государства', icon: Building, color: '#ff7700', position: { x: -190, y: 110 } },
      { id: 'water-objects', title: 'Водные объекты', icon: Droplets, color: '#00e5ff', position: { x: 0, y: 220 } },
      { id: 'investors', title: 'Инвесторы', icon: DollarSign, color: '#ffd700', position: { x: 190, y: 110 } },
      { id: 'business', title: 'Бизнес', icon: Settings, color: '#0088ff', position: { x: 190, y: -110 } },
      { id: 'science', title: 'Наука', icon: Beaker, color: '#8a2be2', position: { x: 0, y: -280 } },
    ];

    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* Гексагональная сетка фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 opacity-20">
            {[...Array(15)].map((_, row) => (
              <div key={row} className="flex" style={{ marginLeft: row % 2 === 0 ? '0' : '30px' }}>
                {[...Array(20)].map((_, col) => (
                  <motion.div
                    key={`${row}-${col}`}
                    className="w-16 h-16 m-1 border border-primary/30"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: (row + col) * 0.1,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Центральный глобус */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-80 h-80">
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
                x: hexagon.position.x,
                y: hexagon.position.y,
              }}
              transition={{ 
                duration: 0.8, 
                delay: 1 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="absolute w-24 h-28 cursor-pointer"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                backgroundColor: `${hexagon.color}20`,
                border: `2px solid ${hexagon.color}`,
                backdropFilter: 'blur(5px)',
                boxShadow: `0 0 20px ${hexagon.color}40`,
              }}
            >
              <div className="flex flex-col items-center justify-center h-full p-2">
                <hexagon.icon 
                  className="w-6 h-6 mb-1" 
                  style={{ color: hexagon.color }} 
                />
                <span className="text-white text-xs font-semibold text-center leading-tight">
                  {hexagon.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Экран 1: Космический фон с каплей воды
  const CosmicIntroScreen = () => (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Анимированный космический фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-blue-900">
        {/* Звезды */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Туманности */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* 3D Капля воды */}
      <AnimatePresence>
        {showWaterDrop && (
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              {/* Капля воды */}
              <motion.div
                className="w-48 h-64 relative"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 197, 253, 0.7) 50%, rgba(219, 234, 254, 0.5) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    boxShadow: '0 0 50px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {/* Пузырьки внутри капли */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white rounded-full opacity-60"
                      style={{
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        left: `${Math.random() * 70 + 15}%`,
                        top: `${Math.random() * 70 + 15}%`,
                      }}
                      animate={{
                        y: [-20, -80, -20],
                        x: [0, Math.random() * 20 - 10, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 0.9, 0.6],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
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

        {/* Остальные экраны */}
        {currentScreen > 1 && (
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

      {/* Кнопка "Продолжить" внизу по центру */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: currentScreen === 0 ? 3 : 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <Button
          onClick={nextScreen}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {currentScreen === 6 ? 'Завершить' : 'Продолжить'}
        </Button>
      </motion.div>
    </div>
  );
}