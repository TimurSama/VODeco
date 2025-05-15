import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Settings, Globe, Hexagon, Activity, Waves } from 'lucide-react';

interface TransitionAnimationProps {
  onComplete: () => void;
}

export default function TransitionAnimation({ onComplete }: TransitionAnimationProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  // Фазы анимации: капля воды → шестеренка → планета → гексагон
  const phases = ['droplet', 'gear', 'earth', 'hexagon'];
  
  // Последовательная смена фаз
  useEffect(() => {
    if (currentPhase < phases.length) {
      const timer = setTimeout(() => {
        setCurrentPhase(prev => prev + 1);
      }, 1000); // Увеличиваем время задержки для лучшего восприятия
      
      return () => clearTimeout(timer);
    } else {
      // Завершаем анимацию и переходим к основному контенту
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [currentPhase, onComplete]);
  
  // Анимация для основных элементов
  const elementVariants = {
    initial: { scale: 0, opacity: 0, rotate: -15 },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 1.5,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };
  
  // Анимация для пульсации
  const pulseVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };
  
  // Анимация для вращения
  const rotateVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity
      }
    }
  };
  
  // Анимация для пунктирных окружностей
  const circleVariants = (delay: number) => ({
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: [0.5, 1.2, 2],
      opacity: [0, 0.6, 0],
      transition: {
        delay,
        duration: 2,
        ease: "easeOut",
        repeat: Infinity
      }
    }
  });
  
  // Анимация для гексагонов (сеть)
  const hexGridVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 20,
      opacity: [0, 0.2, 0.15],
      transition: {
        duration: 2.5,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация для отдельных гексагонов
  const hexagonVariants = (delay: number, distance: number, angle: number) => {
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    return {
      initial: { x: 0, y: 0, scale: 0.2, opacity: 0, rotate: 0 },
      animate: { 
        x, 
        y, 
        scale: 1, 
        opacity: [0, 1, 0.7],
        rotate: angle * (180 / Math.PI),
        transition: {
          delay,
          duration: 1.2,
          ease: "easeOut"
        }
      }
    };
  };
  
  // Генерация нескольких гексагонов, расходящихся в разных направлениях
  const generateHexagonDirections = (count: number) => {
    const hexagons = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      hexagons.push({
        angle,
        delay: 0.1 + (i * 0.05),
        distance: 50 + (i % 3) * 30
      });
    }
    return hexagons;
  };
  
  const hexagonDirections = generateHexagonDirections(12);
  
  // Функция для получения контента в зависимости от текущей фазы
  const getPhaseContent = () => {
    switch (phases[currentPhase]) {
      case 'droplet':
        return (
          <div className="relative">
            {/* Пульсирующая капля (используем готовую иконку) */}
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="text-primary"
            >
              <Droplet size={80} strokeWidth={1.5} />
            </motion.div>
            
            {/* Пунктирные круги вокруг капли */}
            {[0.1, 0.5, 0.9].map((delay, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-dashed border-primary/50 rounded-full z-0"
                variants={circleVariants(delay)}
                initial="initial"
                animate="animate"
                style={{ width: '80px', height: '80px' }}
              />
            ))}
            
            {/* Волновые линии */}
            <motion.div
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-primary/70"
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <Waves size={50} />
            </motion.div>
          </div>
        );
      case 'gear':
        return (
          <div className="relative">
            {/* Центральная капля */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/90"
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <Droplet size={40} />
            </motion.div>
            
            {/* Вращающаяся шестеренка (используем готовую иконку) */}
            <motion.div
              variants={rotateVariants}
              initial="initial"
              animate="animate"
              className="text-primary"
            >
              <Settings size={100} strokeWidth={1} />
            </motion.div>
            
            {/* Маленькие шестеренки по периметру */}
            {[0, 60, 120, 180, 240, 300].map((angle, index) => (
              <motion.div
                key={index}
                className="absolute text-primary/70"
                style={{ 
                  transformOrigin: 'center',
                  transform: `rotate(${angle}deg) translate(70px) rotate(-${angle}deg)`,
                }}
                animate={{ rotate: angle + 360 }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
              >
                <Settings size={20} />
              </motion.div>
            ))}
            
            {/* Пульсирующая активность */}
            <motion.div
              className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 text-primary/80"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <Activity size={30} />
            </motion.div>
          </div>
        );
      case 'earth':
        return (
          <div className="relative">
            {/* Планета (используем готовую иконку) */}
            <motion.div
              className="text-primary"
              animate={{ 
                rotate: 360,
                transition: { 
                  duration: 20, 
                  ease: "linear", 
                  repeat: Infinity 
                }
              }}
            >
              <Globe size={90} strokeWidth={1.5} />
            </motion.div>
            
            {/* Капля внутри */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/90"
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <Droplet size={30} />
            </motion.div>
            
            {/* Орбиты вокруг */}
            {[0, 45, 90].map((angle, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  width: '150px', 
                  height: '100px', 
                  border: '1px dotted rgba(20, 184, 166, 0.5)',
                  borderRadius: '100%', 
                  transform: `rotateX(70deg) rotateZ(${angle}deg)`
                }}
                animate={{ 
                  rotateZ: angle + 360,
                  transition: { 
                    duration: 15 + index * 5, 
                    ease: "linear", 
                    repeat: Infinity 
                  }
                }}
              />
            ))}
            
            {/* Звезды вокруг */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute bg-primary rounded-full"
                style={{ 
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{ 
                  duration: 1 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        );
      case 'hexagon':
        return (
          <div className="relative">
            {/* Центральный гексагон (используем готовую иконку) */}
            <motion.div
              className="text-primary relative z-30"
              animate={{ 
                scale: [1, 1.1, 1], 
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{ 
                duration: 3, 
                times: [0, 0.25, 0.5, 0.75, 1],
                ease: "easeInOut" 
              }}
            >
              <Hexagon size={70} fill="rgba(20, 184, 166, 0.2)" strokeWidth={2} />
            </motion.div>
            
            {/* Гексагоны, разлетающиеся в разные стороны */}
            {hexagonDirections.map((hex, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/80 z-20"
                variants={hexagonVariants(hex.delay, hex.distance, hex.angle)}
                initial="initial"
                animate="animate"
              >
                <Hexagon size={30 + (index % 4) * 10} />
              </motion.div>
            ))}
            
            {/* Расширяющаяся сетка гексагонов */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/10 z-10"
              variants={hexGridVariants}
              initial="initial"
              animate="animate"
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <defs>
                  <pattern id="hexGrid" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
                    <path 
                      d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z M28 33L0 16M28 33L56 16M28 33L28 0M28 33L28 66" 
                      stroke="currentColor" 
                      strokeWidth="1"
                      fill="none"
                    />
                  </pattern>
                </defs>
                <rect width="60" height="60" fill="url(#hexGrid)" />
              </svg>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background opacity-30"></div>
      
      {/* Центральный элемент в анимации */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase}
          className="relative z-20"
          variants={elementVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {getPhaseContent()}
        </motion.div>
      </AnimatePresence>
      
      {/* Эффект волны на стадии капли */}
      {currentPhase === 0 && (
        <>
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((delay, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary/40 rounded-full z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 2],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                delay,
                duration: 2,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 3
              }}
              style={{ width: '10px', height: '10px' }}
            />
          ))}
        </>
      )}
      
      {/* Эффект световых лучей */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-0"
        animate={{ 
          opacity: [0, 0.2, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Заполнение фона гексагонами в последней фазе */}
      {currentPhase === phases.length - 1 && (
        <motion.div
          className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-0 z-0"
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
      )}
      
      {/* Градиентный фон, появляющийся в последней фазе */}
      {currentPhase === phases.length - 1 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background opacity-0 z-0"
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
      )}
    </div>
  );
}