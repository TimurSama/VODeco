import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FinalCallScreenProps {
  onContinue: () => void;
}

export default function FinalCallScreen({ onContinue }: FinalCallScreenProps) {
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
  
  // Анимация параграфа
  const paragraphVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.8
      }
    }
  };
  
  // Анимация кнопки
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  // Анимация фона
  const backgroundVariants = {
    initial: { backgroundPosition: '0% 0%' },
    animate: { 
      backgroundPosition: '100% 100%',
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative p-4 text-center overflow-hidden"
    >
      {/* Анимированный фон */}
      <motion.div 
        className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-20"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      ></motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      
      <div className="relative z-10 max-w-3xl w-full">
        {/* Заголовок */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          VODeco — это больше, чем платформа.
        </motion.h2>
        
        {/* Текст */}
        <motion.p
          className="text-lg sm:text-xl text-white/80 mb-12"
          variants={paragraphVariants}
          initial="initial"
          animate="animate"
        >
          Это экосистема, основанная на доверии, данных и взаимодействии.
        </motion.p>
        
        {/* Кнопка */}
        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
        >
          <Button 
            className="bg-primary hover:bg-primary/90 text-lg py-7 px-8 rounded-full shadow-lg shadow-primary/20"
            size="lg"
            onClick={onContinue}
          >
            Продолжить +50💧
          </Button>
        </motion.div>
      </div>
      
      {/* Декоративные элементы */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
      
      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        initial={{ opacity: 0.1 }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
      ></motion.div>
    </div>
  );
}