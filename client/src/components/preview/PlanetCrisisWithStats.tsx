import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ThreeGlobe from './ThreeGlobe';

interface PlanetCrisisWithStatsProps {
  onSave: () => void;
}

export default function PlanetCrisisWithStats({ onSave }: PlanetCrisisWithStatsProps) {
  const [currentPlate, setCurrentPlate] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [redLevel, setRedLevel] = useState(0); // Уровень "покраснения" глобуса (0-100%)
  const [showHexagons, setShowHexagons] = useState(false);
  const [hidePlates, setHidePlates] = useState(false);
  
  // Данные для информационных плиток
  const plates = [
    [
      "71% поверхности Земли — вода",
      "0.02% массы планеты — вода",
      "0.0006% — пригодная пресная",
      "0.0002% — реально доступная"
    ],
    [
      "1.2 млн смертей в год",
      "2.8 млн км³ воды уничтожено",
      "400 млн тонн токсинов в год",
      "2.2 млрд человек без чистой воды"
    ],
    [
      "25% пресной воды утрачены",
      "30% населения без доступа",
      "65% пашни под угрозой",
      "80% сточных вод без очистки"
    ],
    [
      "2030 — водные конфликты",
      "2040 — глобальный дефицит",
      "2050 — 70% экосистем в кризисе",
      "2060 — риск экологического коллапса"
    ]
  ];
  
  // Последовательное появление плиток и увеличение уровня красноты
  useEffect(() => {
    // Начальная задержка
    const initialTimer = setTimeout(() => {
      // Планета изначально голубая (redLevel = 0)
    }, 1000);
    
    // Показываем первую плитку и начинаем покраснение
    const timer1 = setTimeout(() => {
      setCurrentPlate(1);
      setRedLevel(25); // 25% покраснения с первой плиткой
    }, 2000);
    
    // Показываем вторую плитку и увеличиваем покраснение
    const timer2 = setTimeout(() => {
      setCurrentPlate(2);
      setRedLevel(50); // 50% покраснения со второй плиткой
    }, 4000);
    
    // Показываем третью плитку и увеличиваем покраснение
    const timer3 = setTimeout(() => {
      setCurrentPlate(3);
      setRedLevel(75); // 75% покраснения с третьей плиткой
    }, 6000);
    
    // Показываем четвертую плитку и максимальное покраснение
    const timer4 = setTimeout(() => {
      setCurrentPlate(4);
      setRedLevel(100); // 100% покраснения с четвертой плиткой
    }, 8000);
    
    // Показываем кнопку после всех плиток
    const timerButton = setTimeout(() => {
      console.log("Showing button now");
      setShowButton(true);
    }, 9000);
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timerButton);
    };
  }, []);
  
  // Убеждаемся, что кнопка точно показывается, если отображаются все плитки
  useEffect(() => {
    if (currentPlate >= 4 && !showButton) {
      // Если все плитки видны, но кнопка еще не показана - показываем ее
      const forceShowButtonTimer = setTimeout(() => {
        console.log("Force showing button");
        setShowButton(true);
      }, 1500);
      
      return () => clearTimeout(forceShowButtonTimer);
    }
  }, [currentPlate, showButton]);
  
  // Анимация для плиток
  const plateVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };
  
  // Анимация для кнопки
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  // Анимация для гексагонов
  const hexagonVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: [0, 0.8, 0.6],
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };
  
  // Обработка нажатия на кнопку спасения
  const handleSaveClick = () => {
    // Скрываем плитки
    setHidePlates(true);
    
    // Анимируем восстановление планеты
    setRedLevel(0);
    
    // Убираем кнопку
    setShowButton(false);
    
    // Показываем гексагоны вокруг планеты
    setTimeout(() => {
      setShowHexagons(true);
    }, 1000);
    
    // После анимации вызываем коллбэк
    setTimeout(() => {
      onSave();
    }, 3000);
  };

  // Функция для генерации плитки со статистикой
  const renderStatPlate = (plateIndex: number, plateData: string[]) => {
    if (currentPlate >= plateIndex && !hidePlates) {
      return (
        <motion.div
          className="bg-card/40 backdrop-blur-sm rounded-lg border border-primary/30 p-2.5 shadow-md"
          variants={plateVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={`plate-${plateIndex}`}
        >
          <h3 className="text-sm md:text-base font-bold text-primary mb-1.5">{
            plateIndex === 1 ? "Факты о воде на Земле" :
            plateIndex === 2 ? "Влияние на человечество" :
            plateIndex === 3 ? "Текущее состояние" :
            "Прогноз на будущее"
          }</h3>
          <ul className="space-y-0.5">
            {plateData.map((item, index) => (
              <li key={index} className="text-white/90 flex items-start text-xs">
                <span className="text-primary mr-1 mt-0.5 text-lg">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-[120vh] w-full flex flex-col items-center overflow-y-auto pb-32 pt-6">
      {/* Фоновый градиент */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10"></div>
      <div className="fixed inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15 -z-10"></div>
      
      <div className="relative z-10 w-full max-w-4xl px-2 flex flex-col items-center">
        {/* Верхний ряд - первые две плитки */}
        <div className="grid grid-cols-2 gap-2 w-full mb-4">
          {renderStatPlate(1, plates[0])}
          {renderStatPlate(2, plates[1])}
        </div>
        
        {/* Центральный элемент - 3D глобус с возможными гексагонами */}
        <div className="mb-6 transition-all duration-500 relative" style={{ transform: showButton ? 'scale(0.95)' : 'scale(1)' }}>
          <ThreeGlobe redLevel={redLevel} size={180} />
          
          {/* Гексагональные элементы вокруг восстановленной планеты */}
          {showHexagons && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              {/* Ряд гексагонов вокруг планеты */}
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  variants={hexagonVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    width: '40px',
                    height: '34px',
                    transform: `rotate(${index * 60}deg) translateY(-120px) rotate(-${index * 60}deg)`,
                    transformOrigin: 'center center'
                  }}
                >
                  <svg viewBox="0 0 60 60" className="w-full h-full">
                    <path
                      d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      fill="#14b8a6"
                      fillOpacity="0.15"
                    />
                  </svg>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Нижний ряд - остальные две плитки */}
        <div className="grid grid-cols-2 gap-2 w-full mb-6">
          {renderStatPlate(3, plates[2])}
          {renderStatPlate(4, plates[3])}
        </div>
        
        {/* Кнопка спасения планеты */}
        {showButton && !hidePlates && (
          <motion.div
            className="mt-2 mb-10 pt-2"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Button 
              className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 text-base rounded-full shadow-lg"
              onClick={handleSaveClick}
            >
              Спасти планету +50💧
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}