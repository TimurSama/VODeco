import { motion } from 'framer-motion';

interface ArchitectureScreenProps {
  onNext: () => void;
}

export default function ArchitectureScreen({ onNext }: ArchitectureScreenProps) {
  // Слои архитектуры
  const layers = [
    {
      name: "Пользователи и роли",
      description: "Участники экосистемы с разными правами доступа",
      color: "from-blue-400/20 to-blue-600/20"
    },
    {
      name: "Токеномика и экономика воды",
      description: "Мотивационная система и экономические механизмы",
      color: "from-teal-400/20 to-teal-600/20"
    },
    {
      name: "DAO и блокчейн",
      description: "Управление и прозрачные транзакции",
      color: "from-green-400/20 to-green-600/20"
    },
    {
      name: "SCADA / IoT / AI",
      description: "Сбор и анализ данных о водных ресурсах",
      color: "from-cyan-400/20 to-cyan-600/20"
    },
    {
      name: "Инфраструктура",
      description: "Физические компоненты и системы водоснабжения",
      color: "from-indigo-400/20 to-indigo-600/20"
    }
  ].reverse(); // Перевернем, чтобы отображать слои снизу вверх

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
  
  // Анимация слоев
  const layerVariants = {
    initial: { opacity: 0, scale: 0.95, y: 30 },
    animate: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.15),
        duration: 0.7,
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
      
      <div className="relative z-10 max-w-4xl w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Архитектура
          </h2>
          <p className="text-white/70 text-lg">
            Многослойная структура DAO VODeco
          </p>
        </motion.div>
        
        {/* Слои архитектуры */}
        <div className="relative space-y-3 mx-auto max-w-lg">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              className={`rounded-lg py-5 px-6 backdrop-blur-sm border border-white/10 bg-gradient-to-r ${layer.color}`}
              variants={layerVariants}
              initial="initial"
              animate="animate"
              custom={index}
              style={{ 
                marginTop: index > 0 ? '-8px' : '0',
                zIndex: layers.length - index,
                position: 'relative'
              }}
            >
              <h3 className="text-white font-semibold text-lg mb-1">{layer.name}</h3>
              <p className="text-white/70 text-sm">{layer.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Соединительные линии */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <svg width="100%" height="100%" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0.3)" />
                <stop offset="100%" stopColor="rgba(20, 184, 166, 0.05)" />
              </linearGradient>
            </defs>
            {/* Здесь могли бы быть линии, соединяющие слои, но это требует точных координат */}
          </svg>
        </motion.div>
      </div>
    </div>
  );
}