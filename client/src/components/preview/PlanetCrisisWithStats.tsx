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
      setShowButton(true);
    }, 9500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timerButton);
    };
  }, []);
  
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
    }
  };
  
  // Обработка нажатия на кнопку спасения
  const handleSaveClick = () => {
    // Анимируем восстановление планеты
    setRedLevel(0);
    
    // После анимации вызываем коллбэк
    setTimeout(() => {
      onSave();
    }, 2000);
  };

  // Функция для генерации плитки со статистикой
  const renderStatPlate = (plateIndex: number, plateData: string[]) => {
    if (currentPlate >= plateIndex) {
      return (
        <motion.div
          className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-3"
          variants={plateVariants}
          initial="initial"
          animate="animate"
          key={`plate-${plateIndex}`}
        >
          <h3 className="text-sm md:text-base font-bold text-white mb-1">{
            plateIndex === 1 ? "Факты о воде на Земле" :
            plateIndex === 2 ? "Влияние на человечество" :
            plateIndex === 3 ? "Текущее состояние" :
            "Прогноз на будущее"
          }</h3>
          <ul className="space-y-1">
            {plateData.map((item, index) => (
              <li key={index} className="text-white/80 flex items-start text-xs md:text-sm">
                <span className="text-primary mr-1">•</span>
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
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center pt-16 pb-6">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
      
      <div className="relative z-10 w-full max-w-4xl p-4 flex flex-col items-center">
        {/* Верхний ряд - первые две плитки */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          {renderStatPlate(1, plates[0])}
          {renderStatPlate(2, plates[1])}
        </div>
        
        {/* Центральный элемент - 3D глобус */}
        <div className="mb-6 transition-all duration-500" style={{ transform: showButton ? 'scale(0.9)' : 'scale(1)' }}>
          <ThreeGlobe redLevel={redLevel} size={220} />
        </div>
        
        {/* Нижний ряд - остальные две плитки */}
        <div className="grid grid-cols-2 gap-3 w-full mb-4">
          {renderStatPlate(3, plates[2])}
          {renderStatPlate(4, plates[3])}
        </div>
        
        {/* Кнопка спасения планеты */}
        {showButton && (
          <motion.div
            className="mt-2"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
          >
            <Button 
              className="bg-primary hover:bg-primary/90 text-black font-medium px-6 py-4 text-base rounded-full"
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