import { motion } from 'framer-motion';
import { 
  Database, 
  Layers, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  BarChart4 
} from 'lucide-react';

interface ArchitectureScreenProps {
  onNext: () => void;
}

export default function ArchitectureScreen({ onNext }: ArchitectureScreenProps) {
  const layers = [
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: "Интерфейсный слой",
      description: "Web-интерфейс, мобильное приложение, API",
      color: "rgba(20, 184, 166, 0.1)"
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      title: "Слой управления",
      description: "DAO, голосование, смарт-контракты",
      color: "rgba(20, 184, 166, 0.15)"
    },
    {
      icon: <BarChart4 className="h-5 w-5 text-primary" />,
      title: "Аналитический слой",
      description: "ML/AI, обработка данных, прогнозирование",
      color: "rgba(20, 184, 166, 0.2)"
    },
    {
      icon: <Layers className="h-5 w-5 text-primary" />,
      title: "Слой токенизации",
      description: "Токены VOD, субтокены, NFT, инвестиции",
      color: "rgba(20, 184, 166, 0.25)"
    },
    {
      icon: <Database className="h-5 w-5 text-primary" />,
      title: "Слой данных",
      description: "Блокчейн, распределенное хранилище",
      color: "rgba(20, 184, 166, 0.3)"
    },
    {
      icon: <Cpu className="h-5 w-5 text-primary" />,
      title: "Инфраструктурный слой",
      description: "IoT датчики, спутники, станции мониторинга",
      color: "rgba(20, 184, 166, 0.35)"
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
  
  // Анимация для слоев
  const layerVariants = {
    initial: { opacity: 0, x: -30 },
    animate: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.2 + (i * 0.15),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Анимация для соединительных линий
  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1,
      opacity: 0.5,
      transition: {
        delay: 1.2,
        duration: 1,
        ease: "easeInOut"
      }
    }
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
          className="text-center mb-12"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Архитектура платформы
          </h2>
          <p className="text-lg text-white/70">
            Многослойная система для эффективного управления водными ресурсами
          </p>
        </motion.div>
        
        {/* Архитектурные слои */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all"
              style={{ background: `linear-gradient(135deg, ${layer.color}, transparent)` }}
              variants={layerVariants}
              custom={index}
              initial="initial"
              animate="animate"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 w-fit mr-4 flex-shrink-0">
                  {layer.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{layer.title}</h3>
                  <p className="text-sm text-white/70">{layer.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Схема взаимодействия слоев */}
        <motion.div
          className="relative h-10 w-full mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <svg className="w-full h-full" viewBox="0 0 400 10">
            <motion.path
              d="M 20 5 C 100 20, 300 -10, 380 5"
              stroke="rgba(20, 184, 166, 0.5)"
              strokeWidth="1"
              strokeDasharray="4,4"
              fill="none"
              variants={lineVariants}
              initial="initial"
              animate="animate"
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Декоративный элемент */}
      <motion.div 
        className="absolute bottom-4 right-4 text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Нажмите для продолжения +5💧
      </motion.div>
    </div>
  );
}