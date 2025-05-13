import { motion } from 'framer-motion';
import { 
  Users, Building, Flask, Briefcase, Wallet, Eye, 
  HardDriveDownload, Globe 
} from 'lucide-react';

interface UniteForceScreenProps {
  onNext: () => void;
}

export default function UniteForceScreen({ onNext }: UniteForceScreenProps) {
  // Участники DAO
  const participants = [
    { name: "Общество", icon: <Users className="h-8 w-8 text-primary" /> },
    { name: "Государства", icon: <Building className="h-8 w-8 text-primary" /> },
    { name: "Учёные", icon: <Flask className="h-8 w-8 text-primary" /> },
    { name: "Компании", icon: <Briefcase className="h-8 w-8 text-primary" /> },
    { name: "Инвесторы", icon: <Wallet className="h-8 w-8 text-primary" /> },
    { name: "Наблюдатели", icon: <Eye className="h-8 w-8 text-primary" /> },
    { name: "Инженеры", icon: <HardDriveDownload className="h-8 w-8 text-primary" /> },
    { name: "Регионы", icon: <Globe className="h-8 w-8 text-primary" /> }
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
  
  // Анимация шестиугольников
  const hexVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.4 + (i * 0.1),
        duration: 0.5,
        ease: "backOut"
      }
    })
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative pt-12 px-4 overflow-hidden"
      onClick={onNext}
    >
      {/* Фоновый гексагональный паттерн */}
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"></div>
      
      <div className="relative z-10 max-w-5xl w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Кто участвует в DAO?
          </h2>
        </motion.div>
        
        {/* Сетка шестиугольников */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
          {participants.map((participant, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={hexVariants}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <div className="hexagon-container">
                <div className="hexagon bg-card/30 backdrop-blur-sm border border-primary/30 flex flex-col items-center justify-center p-6 shadow-lg">
                  <div className="mb-3">{participant.icon}</div>
                  <span className="text-white font-medium">{participant.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Подсказка о взаимодействии */}
        <motion.div
          className="text-center mt-12 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Все участники объединены в единую децентрализованную сеть
        </motion.div>
      </div>
      
      {/* CSS для шестиугольников */}
      <style jsx>{`
        .hexagon-container {
          width: 120px;
          height: 140px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hexagon {
          width: 120px;
          height: 120px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transition: all 0.3s ease;
        }
        
        .hexagon:hover {
          transform: scale(1.05);
          border-color: rgba(20, 184, 166, 0.5);
          background-color: rgba(20, 184, 166, 0.1);
        }
      `}</style>
    </div>
  );
}