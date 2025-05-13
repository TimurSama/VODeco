import { motion } from 'framer-motion';
import { 
  Layers, Timer, Network, TrendingUp
} from 'lucide-react';

interface WhyDaoScreenProps {
  onNext: () => void;
}

export default function WhyDaoScreen({ onNext }: WhyDaoScreenProps) {
  // Преимущества DAO
  const daoAdvantages = [
    { 
      name: "Прозрачным", 
      icon: <Layers className="h-6 w-6 text-primary" />,
      description: "Все данные и решения доступны участникам системы" 
    },
    { 
      name: "Эффективным", 
      icon: <Timer className="h-6 w-6 text-primary" />,
      description: "Быстрое принятие решений и мгновенные транзакции" 
    },
    { 
      name: "Совместным", 
      icon: <Network className="h-6 w-6 text-primary" />,
      description: "Коллаборация всех заинтересованных сторон" 
    },
    { 
      name: "Мотивирующим", 
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      description: "Токеномика стимулирует правильное поведение" 
    },
  ];
  
  // Сравнительная таблица
  const comparisonData = [
    { feature: "Подключение", old: "6 мес", new: "2 дня" },
    { feature: "Стандарты", old: "закрыты", new: "публичны" },
    { feature: "Отчётность", old: "PDF и папки", new: "NFT-паспорт" },
    { feature: "Гранты", old: "8 мес", new: "DAO-грант 2 нед." },
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
  
  // Анимация преимуществ
  const advantageVariants = {
    initial: { opacity: 0, x: -30 },
    animate: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.15),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };
  
  // Анимация сравнительной таблицы
  const tableVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative p-4 overflow-hidden"
      onClick={onNext}
    >
      {/* Фоновый гексагональный паттерн */}
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
      
      <div className="relative z-10 max-w-6xl w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-10"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            DAO делает управление водой:
          </h2>
        </motion.div>
        
        {/* Преимущества DAO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {daoAdvantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-card/30 backdrop-blur-sm rounded-lg p-5 border border-primary/20"
              variants={advantageVariants}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  {advantage.icon}
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">{advantage.name}</h3>
                <p className="text-white/70 text-sm">{advantage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Сравнительная таблица */}
        <motion.div
          className="bg-card/20 rounded-lg overflow-hidden border border-primary/30"
          variants={tableVariants}
          initial="initial"
          animate="animate"
        >
          <div className="p-4 bg-primary/10 border-b border-primary/30">
            <h3 className="text-lg font-medium text-white">Сравнение старой системы и DAO</h3>
          </div>
          
          <div className="divide-y divide-primary/20">
            <div className="grid grid-cols-3 text-sm font-medium p-4 bg-primary/5">
              <div className="text-white/80">Показатель</div>
              <div className="text-white/70">Старое управление</div>
              <div className="text-primary">DAO VODeco</div>
            </div>
            
            {comparisonData.map((row, index) => (
              <div 
                key={index} 
                className="grid grid-cols-3 text-sm p-4 hover:bg-primary/5 transition-colors"
              >
                <div className="text-white font-medium">{row.feature}</div>
                <div className="text-white/60">{row.old}</div>
                <div className="text-primary font-medium">{row.new}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}