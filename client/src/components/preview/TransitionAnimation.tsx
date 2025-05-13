import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TransitionAnimationProps {
  onComplete: () => void;
}

export default function TransitionAnimation({ onComplete }: TransitionAnimationProps) {
  const [currentShape, setCurrentShape] = useState(0);
  const shapes = ['droplet', 'coin', 'gear', 'earth', 'hexagon', 'network'];
  
  // Последовательная смена форм
  useEffect(() => {
    if (currentShape < shapes.length) {
      const timer = setTimeout(() => {
        setCurrentShape(prev => prev + 1);
      }, 600); // Время задержки между формами
      
      return () => clearTimeout(timer);
    } else {
      // Завершаем анимацию и переходим к основному контенту
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [currentShape, onComplete]);
  
  // Анимация для капли
  const dropletVariants = {
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
  
  // Анимация для волн
  const waveVariants = (delay: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1, 1.5],
      opacity: [0, 0.8, 0],
      transition: {
        delay: delay,
        duration: 1.5,
        ease: "easeOut"
      }
    }
  });
  
  // Функция для получения SVG изображения в зависимости от текущей формы
  const getShapeSvg = () => {
    switch (shapes[currentShape]) {
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
      case 'coin':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#14b8a6" strokeWidth="2" fill="none" />
            <text x="22" y="38" fill="#14b8a6" fontSize="20">$</text>
          </svg>
        );
      case 'gear':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path 
              d="M30 10 L33 0 L37 10 L47 3 L43 14 L57 13 L45 20 L60 30 L45 40 L57 47 L43 46 L47 57 L37 50 L33 60 L30 50 L23 57 L17 46 L3 47 L15 40 L0 30 L15 20 L3 13 L17 14 L13 3 L23 3 L30 10 Z"
              stroke="#14b8a6" 
              strokeWidth="1"
              fill="none"
            />
            <circle cx="30" cy="30" r="10" stroke="#14b8a6" strokeWidth="1" fill="none" />
          </svg>
        );
      case 'earth':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#14b8a6" strokeWidth="2" fill="none" />
            <ellipse cx="30" cy="30" rx="15" ry="28" stroke="#14b8a6" strokeWidth="1" fill="none" />
            <ellipse cx="30" cy="30" rx="28" ry="15" stroke="#14b8a6" strokeWidth="1" fill="none" />
          </svg>
        );
      case 'hexagon':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path 
              d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z" 
              stroke="#14b8a6" 
              strokeWidth="2"
              fill="none"
            />
          </svg>
        );
      case 'network':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="5" fill="#14b8a6" />
            <circle cx="10" cy="10" r="3" fill="#14b8a6" />
            <circle cx="50" cy="10" r="3" fill="#14b8a6" />
            <circle cx="10" cy="50" r="3" fill="#14b8a6" />
            <circle cx="50" cy="50" r="3" fill="#14b8a6" />
            <circle cx="30" cy="10" r="3" fill="#14b8a6" />
            <circle cx="10" cy="30" r="3" fill="#14b8a6" />
            <circle cx="50" cy="30" r="3" fill="#14b8a6" />
            <circle cx="30" cy="50" r="3" fill="#14b8a6" />
            <line x1="30" y1="30" x2="10" y2="10" stroke="#14b8a6" strokeWidth="1" />
            <line x1="30" y1="30" x2="50" y2="10" stroke="#14b8a6" strokeWidth="1" />
            <line x1="30" y1="30" x2="10" y2="50" stroke="#14b8a6" strokeWidth="1" />
            <line x1="30" y1="30" x2="50" y2="50" stroke="#14b8a6" strokeWidth="1" />
            <line x1="30" y1="30" x2="30" y2="10" stroke="#14b8a6" strokeWidth="1" />
            <line x1="30" y1="30" x2="10" y2="30" stroke="#14b8a6" strokeWidth="1" />
            <line x1="30" y1="30" x2="50" y2="30" stroke="#14b8a6" strokeWidth="1" />
            <line x1="30" y1="30" x2="30" y2="50" stroke="#14b8a6" strokeWidth="1" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Центральная фигура в анимации */}
      <motion.div
        key={currentShape}
        className="relative z-20"
        variants={dropletVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {getShapeSvg()}
      </motion.div>
      
      {/* Волны, расходящиеся от центра */}
      {currentShape === 0 && (
        <>
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((delay, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary/40 rounded-full z-10"
              variants={waveVariants(delay)}
              initial="initial"
              animate="animate"
              style={{ width: '10px', height: '10px' }}
            />
          ))}
        </>
      )}
      
      {/* Появление гексагонального фона в конце анимации */}
      {currentShape === shapes.length - 1 && (
        <motion.div
          className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-0 z-0"
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
      )}
      
      {/* Градиентный фон, появляющийся в конце анимации */}
      {currentShape === shapes.length - 1 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background opacity-0 z-0"
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
      )}
    </div>
  );
}