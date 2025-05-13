import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface PlanetCrisisWithStatsProps {
  onSave: () => void;
}

export default function PlanetCrisisWithStats({ onSave }: PlanetCrisisWithStatsProps) {
  const [currentPlate, setCurrentPlate] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [planetState, setPlanetState] = useState<'normal' | 'crisis' | 'recover'>('normal');
  
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
  
  // Последовательное появление плиток и смена состояния планеты
  useEffect(() => {
    // Показываем первую плитку сразу
    const timer1 = setTimeout(() => {
      setCurrentPlate(1);
      // Начинаем показывать планету в состоянии кризиса
      setPlanetState('crisis');
    }, 2000);
    
    // Показываем вторую плитку
    const timer2 = setTimeout(() => {
      setCurrentPlate(2);
    }, 4000);
    
    // Показываем третью плитку
    const timer3 = setTimeout(() => {
      setCurrentPlate(3);
    }, 6000);
    
    // Показываем четвертую плитку
    const timer4 = setTimeout(() => {
      setCurrentPlate(4);
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
  
  // Анимация для планеты
  const planetVariants = {
    initial: { opacity: 0, scale: 0.8 },
    normal: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    },
    crisis: { 
      opacity: 1, 
      scale: 1,
      filter: "hue-rotate(320deg) saturate(1.5)",
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    },
    recover: {
      filter: "hue-rotate(0deg) saturate(1)",
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
  
  // Анимация для плиток
  const plateVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { 
      opacity: 1, 
      x: 0,
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
    setPlanetState('recover');
    
    // После анимации вызываем коллбэк
    setTimeout(() => {
      onSave();
    }, 2000);
  };

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
      
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Левая колонка - планета */}
        <div className="flex items-center justify-center">
          <motion.div
            className="relative"
            variants={planetVariants}
            initial="initial"
            animate={planetState}
          >
            {/* Планета Земля */}
            <div className="w-64 h-64 rounded-full relative overflow-hidden border border-primary/30">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600"
                style={{
                  filter: planetState === 'crisis' ? 'hue-rotate(320deg) saturate(1.5)' : 'none'
                }}
              />
              
              {/* Континенты */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{ 
                  backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path fill=\"white\" d=\"M30,20 Q40,15 45,25 T60,30 Q70,20 75,30 T65,40 Q75,45 70,55 T50,60 Q40,70 30,65 T25,50 Q15,45 20,35 T30,20 Z\"/></svg>')",
                  backgroundSize: "cover"
                }}
              />
              
              {/* Облака */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{ 
                  backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle fill=\"white\" cx=\"20\" cy=\"30\" r=\"5\"/><circle fill=\"white\" cx=\"40\" cy=\"20\" r=\"8\"/><circle fill=\"white\" cx=\"60\" cy=\"35\" r=\"6\"/><circle fill=\"white\" cx=\"75\" cy=\"25\" r=\"4\"/><circle fill=\"white\" cx=\"30\" cy=\"60\" r=\"7\"/><circle fill=\"white\" cx=\"70\" cy=\"70\" r=\"9\"/><circle fill=\"white\" cx=\"15\" cy=\"80\" r=\"6\"/></svg>')",
                  backgroundSize: "cover",
                  animation: "rotateClouds 120s linear infinite"
                }}
              />
            </div>
            
            {/* Гексагональная структура, появляющаяся при восстановлении */}
            {planetState === 'recover' && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ 
                  backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path fill=\"none\" stroke=\"%2314b8a6\" stroke-width=\"0.5\" d=\"M25,0 L50,14.4 L50,43.4 L25,57.7 L0,43.4 L0,14.4 Z\" transform=\"translate(25, 20)\"/><path fill=\"none\" stroke=\"%2314b8a6\" stroke-width=\"0.5\" d=\"M25,0 L50,14.4 L50,43.4 L25,57.7 L0,43.4 L0,14.4 Z\" transform=\"translate(0, 40)\"/><path fill=\"none\" stroke=\"%2314b8a6\" stroke-width=\"0.5\" d=\"M25,0 L50,14.4 L50,43.4 L25,57.7 L0,43.4 L0,14.4 Z\" transform=\"translate(50, 40)\"/></svg>')",
                  backgroundSize: "cover"
                }}
              />
            )}
          </motion.div>
        </div>
        
        {/* Правая колонка - информационные плитки */}
        <div className="flex flex-col space-y-4 justify-center">
          {/* Плитка 1 - общие факты */}
          {currentPlate >= 1 && (
            <motion.div
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-4"
              variants={plateVariants}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-lg font-bold text-white mb-2">Факты о воде на Земле</h3>
              <ul className="space-y-2">
                {plates[0].map((item, index) => (
                  <li key={index} className="text-white/80 flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {/* Плитка 2 - смертность и загрязнение */}
          {currentPlate >= 2 && (
            <motion.div
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-4"
              variants={plateVariants}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-lg font-bold text-white mb-2">Влияние на человечество</h3>
              <ul className="space-y-2">
                {plates[1].map((item, index) => (
                  <li key={index} className="text-white/80 flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {/* Плитка 3 - утрата ресурсов */}
          {currentPlate >= 3 && (
            <motion.div
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-4"
              variants={plateVariants}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-lg font-bold text-white mb-2">Текущее состояние</h3>
              <ul className="space-y-2">
                {plates[2].map((item, index) => (
                  <li key={index} className="text-white/80 flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {/* Плитка 4 - прогнозы на будущее */}
          {currentPlate >= 4 && (
            <motion.div
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-4"
              variants={plateVariants}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-lg font-bold text-white mb-2">Прогноз на будущее</h3>
              <ul className="space-y-2">
                {plates[3].map((item, index) => (
                  <li key={index} className="text-white/80 flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {/* Кнопка спасения планеты */}
          {showButton && (
            <motion.div
              className="flex justify-center mt-6"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
            >
              <Button 
                className="bg-primary hover:bg-primary/90 text-black font-medium px-8 py-6 text-lg rounded-full"
                onClick={handleSaveClick}
              >
                Спасти планету +50💧
              </Button>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* CSS для анимации вращения облаков */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rotateClouds {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}} />
    </div>
  );
}