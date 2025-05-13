import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TransitionAnimationProps {
  onComplete: () => void;
}

export default function TransitionAnimation({ onComplete }: TransitionAnimationProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  // Новые фазы анимации: капля воды → шестеренка → планета → гексагон
  const phases = ['droplet', 'gear', 'earth', 'hexagon'];
  
  // Последовательная смена фаз
  useEffect(() => {
    if (currentPhase < phases.length) {
      const timer = setTimeout(() => {
        setCurrentPhase(prev => prev + 1);
      }, 800); // Увеличиваем время задержки для лучшего восприятия
      
      return () => clearTimeout(timer);
    } else {
      // Завершаем анимацию и переходим к основному контенту
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [currentPhase, onComplete]);
  
  // Анимация для основных элементов
  const elementVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 1.5,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };
  
  // Анимация для вращения
  const rotateVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity
      }
    }
  };
  
  // Анимация для гексагонов
  const hexagonVariants = (delay: number, scale: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale,
      opacity: [0, 0.7, 0.5],
      transition: {
        delay,
        duration: 1.5,
        ease: "easeOut"
      }
    }
  });
  
  // Функция для получения SVG изображения в зависимости от текущей фазы
  const getPhaseSvg = () => {
    switch (phases[currentPhase]) {
      case 'droplet':
        return (
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
            <path 
              d="M30 0 C30 0, 0 40, 0 60 C0 80, 60 80, 60 60 C60 40, 30 0, 30 0 Z" 
              fill="none" 
              stroke="#14b8a6" 
              strokeWidth="2"
            />
          </svg>
        );
      case 'gear':
        return (
          <div className="relative">
            {/* Капля в центре */}
            <svg width="30" height="40" viewBox="0 0 60 80" fill="none" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <path 
                d="M30 0 C30 0, 0 40, 0 60 C0 80, 60 80, 60 60 C60 40, 30 0, 30 0 Z" 
                fill="#14b8a6" 
                opacity="0.7"
              />
            </svg>
            
            {/* Шестеренка вокруг */}
            <motion.svg 
              width="70" height="70" 
              viewBox="0 0 70 70" 
              fill="none"
              variants={rotateVariants}
              initial="initial"
              animate="animate"
            >
              <path 
                d="M35 10 L38 0 L42 10 L52 3 L48 14 L62 13 L50 20 L65 30 L50 40 L62 47 L48 46 L52 57 L42 50 L38 60 L35 50 L28 57 L22 46 L8 47 L20 40 L5 30 L20 20 L8 13 L22 14 L18 3 L28 3 L35 10 Z"
                stroke="#14b8a6" 
                strokeWidth="1.5"
                fill="none"
              />
            </motion.svg>
          </div>
        );
      case 'earth':
        return (
          <div className="relative">
            {/* Шестеренка вокруг */}
            <motion.svg 
              width="80" height="80" 
              viewBox="0 0 80 80" 
              fill="none"
              variants={rotateVariants}
              initial="initial"
              animate="animate"
              style={{ animationDuration: '30s' }}
            >
              <path 
                d="M40 10 L44 0 L48 10 L60 3 L55 15 L70 15 L60 25 L75 40 L60 55 L70 65 L55 65 L60 77 L48 70 L44 80 L40 70 L32 77 L25 65 L10 65 L20 55 L5 40 L20 25 L10 15 L25 15 L20 3 L32 3 L40 10 Z"
                stroke="#14b8a6" 
                strokeWidth="1.2"
                fill="none"
                opacity="0.5"
              />
            </motion.svg>
            
            {/* Капля внутри */}
            <svg width="20" height="25" viewBox="0 0 60 80" fill="none" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <path 
                d="M30 0 C30 0, 0 40, 0 60 C0 80, 60 80, 60 60 C60 40, 30 0, 30 0 Z" 
                fill="#14b8a6" 
                opacity="0.8"
              />
            </svg>
            
            {/* Планета Земля вокруг капли */}
            <svg width="50" height="50" viewBox="0 0 60 60" fill="none" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <circle cx="30" cy="30" r="28" stroke="#14b8a6" strokeWidth="1.5" fill="none" />
              <ellipse cx="30" cy="30" rx="15" ry="28" stroke="#14b8a6" strokeWidth="1" fill="none" />
              <ellipse cx="30" cy="30" rx="28" ry="15" stroke="#14b8a6" strokeWidth="1" fill="none" />
            </svg>
          </div>
        );
      case 'hexagon':
        return (
          <div className="relative">
            {/* Центральный гексагон */}
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path 
                d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z" 
                stroke="#14b8a6" 
                strokeWidth="2"
                fill="#14b8a6"
                fillOpacity="0.2"
              />
            </svg>
            
            {/* Размножающиеся гексагоны */}
            {[0.1, 0.2, 0.3, 0.4, 0.5].map((delay, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                variants={hexagonVariants(delay, 1 + (index * 0.5))}
                initial="initial"
                animate="animate"
              >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path 
                    d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z" 
                    stroke="#14b8a6" 
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Центральный элемент в анимации */}
      <motion.div
        key={currentPhase}
        className="relative z-20"
        variants={elementVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {getPhaseSvg()}
      </motion.div>
      
      {/* Волны, расходящиеся от капли на первой фазе */}
      {currentPhase === 0 && (
        <>
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((delay, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary/40 rounded-full z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1.5],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                delay,
                duration: 1.5,
                ease: "easeOut"
              }}
              style={{ width: '10px', height: '10px' }}
            />
          ))}
        </>
      )}
      
      {/* Заполнение фона гексагонами в последней фазе */}
      {currentPhase === phases.length - 1 && (
        <motion.div
          className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-0 z-0"
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
      )}
      
      {/* Градиентный фон, появляющийся в последней фазе */}
      {currentPhase === phases.length - 1 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background opacity-0 z-0"
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
      )}
    </div>
  );
}