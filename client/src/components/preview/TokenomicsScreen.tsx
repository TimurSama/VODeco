import { motion } from 'framer-motion';
import { PieChart } from 'recharts';
import { 
  Droplets, 
  TrendingUp, 
  Layers, 
  Shield 
} from 'lucide-react';

interface TokenomicsScreenProps {
  onNext: () => void;
}

export default function TokenomicsScreen({ onNext }: TokenomicsScreenProps) {
  const tokenFeatures = [
    {
      icon: <Droplets className="h-5 w-5 text-primary" />,
      title: "Основной токен VOD",
      description: "Внутренняя валюта экосистемы, право голоса в DAO"
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      title: "Инвестиционная механика",
      description: "Стейкинг, пассивный доход, рост с развитием экосистемы"
    },
    {
      icon: <Layers className="h-5 w-5 text-primary" />,
      title: "Субтокены",
      description: "Региональные токены для локальных проектов"
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Управление и безопасность",
      description: "Смарт-контракты, автоматическое распределение"
    }
  ];

  const allocation = [
    { name: 'Резерв DAO', value: 30 },
    { name: 'Команда', value: 15 },
    { name: 'Инвесторы', value: 25 },
    { name: 'Экосистема', value: 20 },
    { name: 'Маркетинг', value: 10 }
  ];

  // Цвета для диаграммы
  const colors = [
    'rgba(20, 184, 166, 0.8)',  // primary
    'rgba(20, 184, 166, 0.6)',
    'rgba(20, 184, 166, 0.4)',
    'rgba(20, 184, 166, 0.3)',
    'rgba(20, 184, 166, 0.2)'
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
  
  // Анимация блоков
  const featureVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.15),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Анимация для процентов
  const percentVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 1 + (i * 0.1),
        duration: 0.3,
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
          className="text-center mb-10"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Токеномика
          </h2>
          <p className="text-lg text-white/70">
            Экономическая модель платформы VODeco
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Левая колонка - свойства токена */}
          <div className="md:col-span-2 space-y-4">
            {tokenFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-4 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all"
                variants={featureVariants}
                custom={index}
                initial="initial"
                animate="animate"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 w-fit mr-4 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Правая колонка - распределение токенов */}
          <div className="flex flex-col">
            <motion.div
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-4 h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h3 className="text-lg font-bold text-white mb-4 text-center">Распределение токенов</h3>
              
              {/* Схема распределения (представление без recharts) */}
              <div className="space-y-3">
                {allocation.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-between"
                    variants={percentVariants}
                    custom={index}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span className="text-sm text-white">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-primary">{item.value}%</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Визуальное представление процентов */}
              <div className="w-full h-2 bg-primary/10 rounded-full mt-6 overflow-hidden">
                {allocation.map((item, index) => {
                  // Рассчитываем нарастающий процент для позиционирования
                  const prevTotal = allocation
                    .slice(0, index)
                    .reduce((sum, curr) => sum + curr.value, 0);
                  
                  return (
                    <motion.div
                      key={index}
                      className="h-full absolute"
                      style={{ 
                        backgroundColor: colors[index % colors.length],
                        width: `${item.value}%`,
                        left: `${prevTotal}%`
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ 
                        delay: 1.3 + (index * 0.1), 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
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