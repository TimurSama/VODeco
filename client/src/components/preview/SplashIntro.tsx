import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface SplashIntroProps {
  onLogin: () => void;
  onExplore: () => void;
}

export default function SplashIntro({ onLogin, onExplore }: SplashIntroProps) {
  const [showDroplet, setShowDroplet] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  // Запускаем последовательную анимацию
  useEffect(() => {
    // Запуск анимации падения капли с небольшой задержкой
    const dropletTimer = setTimeout(() => {
      setShowDroplet(true);
    }, 800);
    
    // Показываем логотип после анимации капли
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 2500);
    
    // Показываем кнопки после появления логотипа
    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 3200);
    
    return () => {
      clearTimeout(dropletTimer);
      clearTimeout(logoTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);
  
  // Анимация для капли
  const dropletVariants = {
    initial: { y: -300, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    },
    splash: {
      scale: [1, 1.2, 0],
      opacity: [1, 0.8, 0],
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация для линий логотипа
  const lineVariants = (index: number) => ({
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: 1,
      scale: 1,
      rotate: index * 60, // Разворачиваем линии по кругу (6 линий)
      transition: {
        delay: 0.1 * index,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  });
  
  // Анимация для текста
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация для кнопок
  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center">
      <div className="relative h-64 w-64 mb-10">
        {showDroplet && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            variants={dropletVariants}
            initial="initial"
            animate={showLogo ? "splash" : "animate"}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
              <path 
                d="M30 0 C30 0, 0 40, 0 60 C0 80, 60 80, 60 60 C60 40, 30 0, 30 0 Z" 
                fill="none" 
                stroke="#14b8a6" 
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        )}
        
        {showLogo && (
          <div className="relative h-full w-full">
            {/* Центральная точка */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            
            {/* 6 линий логотипа */}
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div 
                key={index}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-center"
                variants={lineVariants(index)}
                initial="initial"
                animate="animate"
              >
                <div className="w-64 h-1 bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Текст логотипа */}
      {showLogo && (
        <motion.div
          className="text-center mb-12"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-4xl font-bold text-white">
            dao V<span className="text-primary">O</span>Dec<span className="text-primary">o</span>
          </h1>
          <p className="text-white/70 text-lg mt-2">WELCOME</p>
        </motion.div>
      )}
      
      {/* Кнопки */}
      {showButtons && (
        <motion.div
          className="flex flex-col space-y-4"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
        >
          <Button 
            variant="outline" 
            className="w-40 border-primary text-primary hover:bg-primary/10"
            onClick={onLogin}
          >
            Login
          </Button>
          <Button 
            className="w-40 bg-primary hover:bg-primary/90 text-black font-medium"
            onClick={onExplore}
          >
            Explore +100💧
          </Button>
        </motion.div>
      )}
    </div>
  );
}