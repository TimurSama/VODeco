import { motion } from 'framer-motion';
import { Atom, Skull, Droplet } from 'lucide-react';

interface PlanetCrisisScreenProps {
  onNext: () => void;
}

export default function PlanetCrisisScreen({ onNext }: PlanetCrisisScreenProps) {
  const statistics = [
    { 
      icon: <Droplet className="h-6 w-6 text-primary" />, 
      value: "2.2 млрд.",
      description: "людей не имеют доступа к чистой питьевой воде"
    },
    { 
      icon: <Skull className="h-6 w-6 text-primary" />, 
      value: "3.6 млн.",
      description: "людей ежегодно умирают от болезней, связанных с некачественной водой"
    },
    { 
      icon: <Atom className="h-6 w-6 text-primary" />, 
      value: "80%",
      description: "сточных вод сбрасываются в водоемы без очистки"
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
  
  // Анимация блоков статистики
  const statVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.2),
        duration: 0.5,
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
      
      <div className="relative z-10 max-w-4xl w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Планета в кризисе
          </h2>
          <p className="text-lg text-white/70">
            Водный кризис — бомба замедленного действия
          </p>
        </motion.div>
        
        {/* Блоки статистики */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-6 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all cursor-pointer"
              variants={statVariants}
              custom={index}
              initial="initial"
              animate="animate"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-white/70">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Декоративный элемент */}
      <motion.div 
        className="absolute bottom-4 right-4 text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Нажмите для продолжения +5💧
      </motion.div>
    </div>
  );
}