import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  // Анимация заголовка
  const titleVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация текста
  const textVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8
      }
    }
  };
  
  // Анимация капли
  const dropletVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0,
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative p-4 text-center cursor-pointer"
      onClick={onNext}
    >
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
      
      <div className="relative z-10 max-w-3xl">
        {/* Заголовок */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          Добро пожаловать в <span className="text-primary">VODeco</span>
        </motion.h1>
        
        {/* Подзаголовок */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          Децентрализованную экосистему управления водными ресурсами
        </motion.p>
        
        {/* Капля воды */}
        <motion.div
          className="inline-flex items-center text-sm font-medium text-primary"
          variants={dropletVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Droplets className="mr-2 h-6 w-6" />
          Нажмите чтобы продолжить +5💧
        </motion.div>
      </div>
      
      {/* Декоративные элементы */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        initial={{ opacity: 0.1 }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
      ></motion.div>
    </div>
  );
}