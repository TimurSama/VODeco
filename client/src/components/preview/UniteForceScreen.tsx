import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Building2, 
  FlaskConical, 
  Globe, 
  Users 
} from 'lucide-react';

interface UniteForceScreenProps {
  onNext: () => void;
}

export default function UniteForceScreen({ onNext }: UniteForceScreenProps) {
  const stakeholders = [
    {
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      title: "Образование",
      position: { x: "-10%", y: "30%" }
    },
    {
      icon: <Building2 className="h-5 w-5 text-primary" />,
      title: "Бизнес",
      position: { x: "10%", y: "70%" }
    },
    {
      icon: <FlaskConical className="h-5 w-5 text-primary" />,
      title: "Наука",
      position: { x: "25%", y: "20%" }
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: "Гос. сектор",
      position: { x: "-25%", y: "55%" }
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Сообщества",
      position: { x: "0%", y: "40%" }
    }
  ];

  // Анимация заголовка
  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация для центрального элемента
  const centerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация для участников
  const stakeholderVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.5 + (i * 0.15),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };
  
  // Анимация для линий соединения
  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i: number) => ({ 
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.8 + (i * 0.1),
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative p-4"
      onClick={onNext}
    >
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
      
      <div className="relative z-10 max-w-5xl w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Объединение сил
          </h2>
          <p className="text-lg text-white/70">
            VODeco соединяет всех заинтересованных участников в единую экосистему
          </p>
        </motion.div>
        
        {/* Схема взаимодействия */}
        <div className="relative h-[400px] w-full mx-auto">
          {/* Центральный элемент - VODeco */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            variants={centerVariants}
            initial="initial"
            animate="animate"
          >
            <div className="w-24 h-24 rounded-full bg-background border-2 border-primary/80 shadow-lg shadow-primary/20 flex items-center justify-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                VODeco
              </span>
            </div>
          </motion.div>
          
          {/* Участники */}
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={index}
              className="absolute h-24 pointer-events-none"
              style={{ 
                left: `calc(50% + ${stakeholder.position.x})`, 
                top: `calc(${stakeholder.position.y})`,
                transform: "translate(-50%, -50%)"
              }}
              variants={stakeholderVariants}
              custom={index}
              initial="initial"
              animate="animate"
            >
              <div className="w-16 h-16 rounded-full bg-background/70 backdrop-blur-sm border border-primary/50 flex flex-col items-center justify-center">
                <div className="p-2 rounded-full bg-primary/10 mb-1">
                  {stakeholder.icon}
                </div>
                <span className="text-xs text-white font-medium">{stakeholder.title}</span>
              </div>
              
              {/* Линия соединения */}
              <svg className="absolute top-0 left-0 w-full h-full" style={{ overflow: 'visible' }}>
                <motion.path
                  d={`M ${8} ${8} L 0 0`}
                  stroke="rgba(20, 184, 166, 0.5)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  fill="none"
                  variants={lineVariants}
                  custom={index}
                  initial="initial"
                  animate="animate"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Декоративный элемент */}
      <motion.div 
        className="absolute bottom-4 right-4 text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Нажмите для продолжения +5💧
      </motion.div>
    </div>
  );
}