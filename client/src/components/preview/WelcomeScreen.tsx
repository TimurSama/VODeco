import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  // Анимация фона с гексагональной сеткой
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 1.5 }
    }
  };
  
  // Анимация текста
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.5 + (i * 0.2),
        duration: 0.8,
        ease: "easeOut" 
      }
    })
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      onClick={onNext}
    >
      {/* Гексагональный фон */}
      <motion.div 
        className="absolute inset-0 z-0 bg-background"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[length:30px_30px]" />
        <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-20" />
      </motion.div>
      
      {/* Содержимое экрана */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        <motion.div
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight"
          variants={textVariants}
          initial="initial"
          animate="animate"
          custom={0}
        >
          Добро пожаловать в экосистему
        </motion.div>
        
        <motion.div
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-primary tracking-tight"
          variants={textVariants}
          initial="initial"
          animate="animate"
          custom={1}
        >
          DAO VODeco
        </motion.div>
        
        <motion.div
          className="text-xl sm:text-2xl text-white/80 font-light"
          variants={textVariants}
          initial="initial"
          animate="animate"
          custom={2}
        >
          Сохраняем экологию, творим настоящее, создаём будущее
        </motion.div>
      </div>
    </div>
  );
}