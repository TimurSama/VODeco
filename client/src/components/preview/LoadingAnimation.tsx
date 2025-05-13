import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  // Анимация для логотипа и текста
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  // Анимация для волны
  const waveVariants = {
    initial: { scaleY: 0, opacity: 0 },
    animate: { 
      scaleY: 1, 
      opacity: [0, 0.5, 0.8, 0.5, 0],
      transition: {
        duration: 2,
        repeat: 1,
        ease: "easeInOut"
      }
    }
  };
  
  // Анимация для загрузочной линии
  const loadingLineVariants = {
    initial: { width: "0%" },
    animate: { 
      width: "100%",
      transition: {
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  // Завершаем анимацию через 3.5 секунды
  setTimeout(() => {
    onComplete();
  }, 3500);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Логотип */}
        <motion.div
          className="relative mb-10"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              VOD
            </span>
          </div>
          
          {/* Анимированные волны */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-8 z-0"
            variants={waveVariants}
            initial="initial"
            animate="animate"
          >
            <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 10 Q 25 0, 50 10 T 100 10"
                fill="none"
                stroke="rgba(20, 184, 166, 0.5)"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Название */}
        <motion.h1
          className="text-3xl font-bold mb-10 text-white"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <span className="text-primary">VOD</span>eco
        </motion.h1>
        
        {/* Загрузочная линия */}
        <motion.div
          className="w-48 h-1 bg-primary/20 rounded-full overflow-hidden mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-primary"
            variants={loadingLineVariants}
            initial="initial"
            animate="animate"
          />
        </motion.div>
        
        {/* Текст загрузки */}
        <motion.p
          className="text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Инициализация экосистемы
        </motion.p>
      </div>
    </div>
  );
}