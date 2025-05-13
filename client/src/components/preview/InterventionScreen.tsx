import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface InterventionScreenProps {
  onSavePlanet: () => void;
}

export default function InterventionScreen({ onSavePlanet }: InterventionScreenProps) {
  const [planetCleaned, setPlanetCleaned] = useState(false);
  
  const handleSavePlanet = () => {
    setPlanetCleaned(true);
    setTimeout(() => {
      onSavePlanet();
    }, 3000);
  };
  
  // Анимация планеты
  const planetVariants = {
    initial: { scale: 1, filter: 'brightness(0.7) saturate(0.8)' },
    cleaned: { 
      scale: 1.05, 
      filter: 'brightness(1.2) saturate(1.2)',
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация сетки
  const gridVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 0.3,
      transition: {
        delay: 1,
        duration: 1.5
      }
    }
  };
  
  // Анимация лучей
  const raysVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1.5, 
      opacity: [0, 0.6, 0],
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Фон: изначально кризисный, затем очищенный */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background to-blue-950/30 transition-all duration-1000"
        style={{ 
          opacity: planetCleaned ? 1 : 0.6
        }}
      ></div>
      
      {/* Гексагональная сетка, появляется при очистке */}
      {planetCleaned && (
        <motion.div 
          className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] bg-repeat"
          variants={gridVariants}
          initial="initial"
          animate="animate"
        ></motion.div>
      )}
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Планета */}
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 mb-16"
          variants={planetVariants}
          initial="initial"
          animate={planetCleaned ? "cleaned" : "initial"}
        >
          <div className="absolute inset-0 rounded-full bg-blue-600 overflow-hidden shadow-xl">
            <div 
              className="absolute inset-0 bg-[url('/earth-texture.jpg')] bg-cover"
              style={{
                animation: 'spin 25s linear infinite',
              }}
            ></div>
            
            {/* Эффект очистки - лучи света */}
            {planetCleaned && (
              <motion.div 
                className="absolute inset-0 bg-primary/20 mix-blend-screen"
                variants={raysVariants}
                initial="initial"
                animate="animate"
              ></motion.div>
            )}
            
            {/* Эффект загрязнения */}
            <div 
              className="absolute inset-0 bg-red-900/30 transition-opacity duration-1000" 
              style={{ opacity: planetCleaned ? 0 : 0.6 }}
            ></div>
          </div>
        </motion.div>
        
        {/* Кнопка действия */}
        {!planetCleaned && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button 
              className="bg-primary hover:bg-primary/90 text-lg py-6 px-8"
              size="lg"
              onClick={handleSavePlanet}
            >
              Спасти планету +50💧
            </Button>
          </motion.div>
        )}
        
        {/* Сообщение после очистки */}
        {planetCleaned && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Экосистема DAO активирована
            </h2>
            <p className="text-white/80 text-lg">
              Подключение узлов и построение сети...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}