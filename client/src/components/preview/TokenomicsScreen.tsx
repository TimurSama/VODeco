import { motion } from 'framer-motion';
import { 
  Coins, 
  BarChart, 
  FileImage 
} from 'lucide-react';

interface TokenomicsScreenProps {
  onNext: () => void;
}

export default function TokenomicsScreen({ onNext }: TokenomicsScreenProps) {
  // Категории токенов
  const tokenCategories = [
    {
      name: "Основной токен VOD",
      items: [
        "ограниченный",
        "эмиссия на 1 м³ воды",
        "применяется во всех действиях"
      ],
      icon: <Coins />,
      variant: "primary"
    },
    {
      name: "Субтокены",
      items: [
        "по объектам",
        "по регионам",
        "по инициативам"
      ],
      icon: <BarChart />,
      variant: "secondary"
    },
    {
      name: "NFT",
      items: [
        "паспорта",
        "гранты",
        "лицензии",
        "профили"
      ],
      icon: <FileImage />,
      variant: "accent"
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
  
  // Анимация категорий токенов
  const categoryVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.2),
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };
  
  // Анимация строки таблицы
  const listItemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.5 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative p-4 overflow-hidden"
      onClick={onNext}
    >
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"></div>
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
      
      <div className="relative z-10 max-w-6xl w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Токеномика
          </h2>
        </motion.div>
        
        {/* Три колонки токенов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tokenCategories.map((category, index) => (
            <motion.div
              key={index}
              className={`bg-card/30 backdrop-blur-sm rounded-lg border 
                ${category.variant === 'primary' ? 'border-primary/40' : 
                  category.variant === 'secondary' ? 'border-cyan-400/40' : 'border-pink-400/40'}`}
              variants={categoryVariants}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <div className={`p-4 flex items-center border-b 
                ${category.variant === 'primary' ? 'border-primary/30 bg-primary/10' : 
                  category.variant === 'secondary' ? 'border-cyan-400/30 bg-cyan-400/10' : 'border-pink-400/30 bg-pink-400/10'}`}
              >
                <div className={`mr-3 p-2 rounded-full 
                  ${category.variant === 'primary' ? 'bg-primary/20 text-primary' : 
                    category.variant === 'secondary' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-pink-400/20 text-pink-400'}`}
                >
                  {category.icon}
                </div>
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
              </div>
              
              <div className="p-5">
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      className="flex items-center text-white/80"
                      variants={listItemVariants}
                      initial="initial"
                      animate="animate"
                      custom={itemIndex}
                    >
                      <span className={`mr-2 text-lg 
                        ${category.variant === 'primary' ? 'text-primary' : 
                          category.variant === 'secondary' ? 'text-cyan-400' : 'text-pink-400'}`}
                      >
                        •
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Декоративный элемент токена */}
        <motion.div
          className="absolute -top-10 -right-10 opacity-10 pointer-events-none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-64 h-64 rounded-full border-4 border-primary/30 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-2 border-primary/20"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}