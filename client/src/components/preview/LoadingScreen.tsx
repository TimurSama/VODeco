import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet } from 'lucide-react';
import Earth3D from './Earth3D';

interface LoadingScreenProps {
  onComplete: () => void;
  autoStart?: boolean;
}

export default function LoadingScreen({ onComplete, autoStart = false }: LoadingScreenProps) {
  const [stage, setStage] = useState<'initial' | 'drop' | 'logo' | 'earth' | 'problem' | 'solution' | 'complete'>('initial');
  const [visible, setVisible] = useState(true);
  
  // Автоматический запуск анимации только в режиме autoStart
  useEffect(() => {
    if (autoStart) {
      // Небольшая задержка перед началом анимации
      const timer = setTimeout(() => {
        handleStart();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart]);
  
  // Обработчики переходов между экранами - теперь только по клику
  const handleStart = () => {
    setStage('drop');
  };
  
  const handleNext = () => {
    if (stage === 'drop') {
      setStage('logo');
    } else if (stage === 'logo') {
      setStage('earth');
    } else if (stage === 'earth') {
      setStage('problem');
    } else if (stage === 'problem') {
      setStage('solution');
    } else if (stage === 'solution') {
      setStage('complete');
      setVisible(false);
      setTimeout(() => onComplete(), 1000);
    }
  };
  
  const handleSkip = () => {
    setVisible(false);
    setTimeout(() => onComplete(), 500);
  };
  
  // Анимация капли
  const dropletVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeOut" 
      }
    },
    exit: { 
      scale: [1, 1.2, 0], 
      opacity: [1, 1, 0],
      transition: { 
        duration: 0.5, 
        times: [0, 0.3, 1] 
      }
    }
  };
  
  // Анимация логотипа
  const logoVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: { 
      scale: [1, 1.2, 0], 
      opacity: [1, 1, 0],
      transition: { 
        duration: 0.5 
      }
    }
  };
  
  // Анимация планеты
  const earthVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        duration: 1,
        ease: "easeOut"
      }
    },
    rotate: {
      rotate: 360,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { 
        duration: 0.5 
      }
    }
  };
  
  // Анимация цифр и фактов
  const factVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };
  
  // Анимация гексагонов
  const hexagonVariants = {
    initial: { scale: 0, opacity: 0, rotate: -30 },
    animate: (i: number) => ({ 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Факты о воде для этапа Earth
  const waterFacts = [
    '71% поверхности планеты покрыто водой',
    '0.5% всей воды доступно человеку',
    '97.5% воды — солёная или недоступная',
    'Вода — основа жизни на Земле'
  ];
  
  // Проблемы с водой для этапа Problem
  const waterProblems = [
    '2.2 млрд без доступа к чистой воде',
    '36% потерь воды в Узбекистане',
    '3.5 млрд без базовой санитарии'
  ];
  
  // Решения для этапа Solution
  const solutions = [
    'Децентрализация',
    'Прозрачность',
    'Сенсоры и IoT',
    'Местная работа',
    'Образование',
    'Возврат экологии'
  ];
  
  // Расчет позиций для гексагонов
  const getHexPosition = (index: number, total: number) => {
    const radius = 150;
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep;
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#001520]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleNext} // Добавляем обработчик клика для всего экрана
        >
          {/* Фоновая гексагональная сетка */}
          <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
          
          {/* Темный градиент для лучшей видимости */}
          <div className="absolute inset-0 bg-gradient-radial from-[#001520] to-transparent opacity-50"></div>
          
          {/* Содержимое экрана загрузки */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-4">
            {/* Стадия Initial - кнопка запуска */}
            {stage === 'initial' && (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
                  Добро пожаловать в <span className="text-primary">VODeco</span>
                </h2>
                
                <p className="text-lg text-white/80 mb-12">
                  Нажмите, чтобы продолжить...
                </p>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStart();
                  }}
                >
                  Начать
                </Button>
              </motion.div>
            )}
            
            {/* Стадия Drop - падающая капля */}
            {stage === 'drop' && (
              <div className="flex flex-col items-center">
                <motion.div
                  variants={dropletVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-primary"
                >
                  <Droplet size={80} />
                </motion.div>
                
                {/* Анимация звуковых волн от капли */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    className="absolute border border-primary/30 rounded-full"
                    initial={{ 
                      width: 20, 
                      height: 20, 
                      opacity: 0 
                    }}
                    animate={{ 
                      width: [20, 300], 
                      height: [20, 300], 
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      delay: 0.8 + i * 0.2, 
                      duration: 2,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Подсказка для клика */}
                <motion.p
                  className="absolute bottom-12 text-white/60 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.7] }}
                  transition={{ 
                    delay: 2,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Нажмите для продолжения
                </motion.p>
              </div>
            )}
            
            {/* Стадия Logo - логотип DAO VOD ECO */}
            {stage === 'logo' && (
              <motion.div 
                className="text-center"
                variants={logoVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="mb-4 text-primary flex items-center justify-center">
                  <span className="text-5xl md:text-7xl font-bold mr-2">DA</span>
                  <Droplet className="h-12 w-12 md:h-16 md:w-16 fill-primary" />
                  <span className="text-5xl md:text-7xl font-bold ml-2">ECO</span>
                </div>
                
                <p className="text-white/80 text-md md:text-xl mb-8">
                  Вода — источник жизни. Цифровая система — её защита.
                </p>
                
                {/* Подсказка для клика */}
                <motion.p
                  className="text-white/60 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.7] }}
                  transition={{ 
                    delay: 1,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Нажмите для продолжения
                </motion.p>
              </motion.div>
            )}
            
            {/* Стадия Earth - планета Земля с фактами о воде */}
            {stage === 'earth' && (
              <div className="relative flex flex-col items-center">
                <motion.div
                  variants={earthVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative mb-8"
                >
                  {/* Используем 3D планету вместо значка */}
                  <Earth3D size={250} highlightWater={true} />
                </motion.div>
                
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mb-8">
                  {waterFacts.map((fact, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={factVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-white text-center"
                    >
                      {fact}
                    </motion.div>
                  ))}
                </div>
                
                {/* Подсказка для клика */}
                <motion.p
                  className="text-white/60 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.7] }}
                  transition={{ 
                    delay: 2,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Нажмите для продолжения
                </motion.p>
              </div>
            )}
            
            {/* Стадия Problem - проблемы с водой */}
            {stage === 'problem' && (
              <div className="relative flex flex-col items-center">
                <motion.div
                  variants={earthVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative mb-8"
                >
                  {/* Используем 3D планету в режиме кризиса */}
                  <Earth3D size={250} crisis={true} />
                </motion.div>
                
                <div className="relative grid grid-cols-1 gap-4 max-w-lg mb-8">
                  {waterProblems.map((problem, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={factVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-white text-center"
                    >
                      {problem}
                    </motion.div>
                  ))}
                </div>
                
                {/* Подсказка для клика */}
                <motion.p
                  className="text-white/60 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.7] }}
                  transition={{ 
                    delay: 2,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Нажмите для продолжения
                </motion.p>
              </div>
            )}
            
            {/* Стадия Solution - решения VODeco */}
            {stage === 'solution' && (
              <div className="relative flex flex-col items-center">
                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Используем 3D планету с подсвеченной водой */}
                  <Earth3D size={250} highlightWater={true} rotation={true} />
                  
                  {/* Гексагональная сетка вокруг планеты */}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  
                  {/* Решения в шестиугольниках вокруг планеты */}
                  <div className="absolute inset-0">
                    {solutions.map((solution, i) => {
                      const pos = getHexPosition(i, solutions.length);
                      return (
                        <motion.div
                          key={i}
                          custom={i}
                          variants={hexagonVariants}
                          initial="initial"
                          animate="animate"
                          className="absolute flex items-center justify-center w-24 h-24 -mt-12 -ml-12"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `translate(${pos.x}px, ${pos.y}px)`
                          }}
                        >
                          <div className="bg-primary/20 border border-primary/40 rounded-xl p-2 text-white text-center text-xs">
                            {solution}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-center max-w-md mb-8"
                >
                  <h3 className="text-xl font-bold text-primary mb-2">
                    VODeco — экосистема будущего
                  </h3>
                  <p className="text-white/80">
                    Децентрализованная платформа для управления, защиты и восстановления водных ресурсов
                  </p>
                </motion.div>
                
                {/* Подсказка для клика */}
                <motion.p
                  className="text-white/60 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.7] }}
                  transition={{ 
                    delay: 2,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Нажмите для продолжения
                </motion.p>
              </div>
            )}
            
            {/* Кнопка пропуска */}
            <motion.button
              className="absolute bottom-8 right-8 text-xs text-white/50 hover:text-white z-50"
              onClick={(e) => {
                e.stopPropagation();
                handleSkip();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Пропустить
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Компонент для кнопки, чтобы избежать импорта
function Button({ 
  children, 
  variant = 'default', 
  size = 'default',
  className = '', 
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'outline'; 
  size?: 'default' | 'lg';
  className?: string; 
  onClick?: (e: React.MouseEvent) => void; 
}) {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50";
  const variantStyles = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "bg-transparent border border-white hover:bg-white/10"
  };
  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-14 px-6 py-4 text-lg"
  };
  
  return (
    <button 
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}