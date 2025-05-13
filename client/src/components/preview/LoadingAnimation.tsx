import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface LoadingAnimationProps {
  onExplore: () => void;
}

export default function LoadingAnimation({ onExplore }: LoadingAnimationProps) {
  const [animationStage, setAnimationStage] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  
  useEffect(() => {
    // Имитация последовательной анимации
    const timer1 = setTimeout(() => setAnimationStage(1), 1000); // Капля падает
    const timer2 = setTimeout(() => setAnimationStage(2), 2000); // Капля разбивается
    const timer3 = setTimeout(() => setAnimationStage(3), 3000); // Формируется логотип
    const timer4 = setTimeout(() => setShowButtons(true), 4000); // Появляются кнопки
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Анимация капли
  const dropVariants = {
    initial: { y: -200, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 1,
        ease: "easeOut" 
      }
    },
    splash: {
      scale: [1, 1.5, 0],
      opacity: [1, 0.8, 0],
      transition: { 
        duration: 0.5,
      }
    }
  };
  
  // Анимация линий логотипа
  const lineVariants = {
    initial: { opacity: 0, pathLength: 0 },
    animate: (i: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: { 
        delay: 2 + (i * 0.15),
        duration: 0.5,
        ease: "easeInOut" 
      }
    })
  };
  
  // Анимация текста
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 3 + (i * 0.2),
        duration: 0.5,
        ease: "easeOut" 
      }
    })
  };
  
  // Анимация кнопок
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 4 + (i * 0.2),
        duration: 0.5,
        ease: "backOut" 
      }
    })
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black">
      <div className="relative h-52 w-52 mb-10">
        {/* Анимированная капля */}
        {animationStage < 2 && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            variants={dropVariants}
            initial="initial"
            animate={animationStage === 0 ? "initial" : "animate"}
            exit="splash"
          >
            <div className="w-6 h-6 rounded-full bg-primary filter blur-[1px]" />
          </motion.div>
        )}
        
        {/* Логотип DAO VODeco из 6 линий */}
        {animationStage >= 2 && (
          <motion.svg 
            viewBox="0 0 100 100" 
            className="w-full h-full absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Слои капли */}
            {[...Array(6)].map((_, i) => (
              <motion.path
                key={i}
                d={`M50,20 Q${45 + i*2},${40 + i*3} ${40 + i*3},${60 + i*2} Q${50},${80 + i} ${60 - i*3},${60 + i*2} Q${55 - i*2},${40 + i*3} 50,20`}
                stroke="rgba(20, 184, 166, ${0.5 + i * 0.08})"
                strokeWidth="1"
                fill="none"
                variants={lineVariants}
                initial="initial"
                animate={animationStage >= 2 ? "animate" : "initial"}
                custom={i}
              />
            ))}
          </motion.svg>
        )}
      </div>
      
      {/* Текст лого */}
      <div className="mb-12">
        <motion.div
          className="text-4xl font-bold tracking-wider relative text-white"
          variants={textVariants}
          initial="initial"
          animate={animationStage >= 3 ? "animate" : "initial"}
          custom={0}
        >
          dao V<span className="text-primary">O</span>Deco
        </motion.div>
      </div>
      
      {/* Кнопки */}
      {showButtons && (
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            custom={1}
            className="text-xl font-light tracking-widest text-white/80"
          >
            WELCOME
          </motion.div>
          
          <div className="space-y-3">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={0}
            >
              <Button variant="outline" className="min-w-[200px]" size="lg">
                Login
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              initial="initial" 
              animate="animate"
              custom={1}
            >
              <Button 
                className="min-w-[200px] bg-primary hover:bg-primary/90" 
                size="lg"
                onClick={onExplore}
              >
                Explore +100💧
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}