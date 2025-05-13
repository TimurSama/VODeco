import { motion } from 'framer-motion';
import { 
  BarChart3, 
  CloudCog, 
  Database, 
  ShieldAlert 
} from 'lucide-react';

interface InterventionScreenProps {
  onNext: () => void;
}

export default function InterventionScreen({ onNext }: InterventionScreenProps) {
  const solutions = [
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Мониторинг",
      description: "Реальное время, IoT-датчики, спутники"
    },
    {
      icon: <CloudCog className="h-6 w-6 text-primary" />,
      title: "Аналитика",
      description: "AI/ML анализ данных, прогнозы, оценка рисков"
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Прозрачность",
      description: "Blockchain регистр данных, смарт-контракты"
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-primary" />,
      title: "Управление",
      description: "DAO голосование, целевое финансирование"
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
  
  // Анимация блоков решений
  const solutionVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.2 + (i * 0.15),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Анимация фоновой линии
  const lineVariants = {
    initial: { height: "0%" },
    animate: { 
      height: "80%",
      transition: {
        delay: 0.1,
        duration: 1.2,
        ease: "easeOut"
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
      
      {/* Вертикальная линия */}
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 top-[15%] w-0.5 bg-gradient-to-b from-primary via-primary to-primary/0"
        variants={lineVariants}
        initial="initial"
        animate="animate"
      />
      
      <div className="relative z-10 max-w-4xl w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Вмешательство необходимо сейчас
          </h2>
          <p className="text-lg text-white/70">
            VODeco предлагает системный подход к управлению водными ресурсами
          </p>
        </motion.div>
        
        {/* Блоки решений */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-6 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all cursor-pointer flex items-start"
              variants={solutionVariants}
              custom={index}
              initial="initial"
              animate="animate"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-2 rounded-full bg-primary/10 w-fit mr-4 flex-shrink-0">
                {solution.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{solution.title}</h3>
                <p className="text-white/70">{solution.description}</p>
              </div>
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