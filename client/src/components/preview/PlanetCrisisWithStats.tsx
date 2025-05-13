import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface PlanetCrisisWithStatsProps {
  onSave: () => void;
}

export default function PlanetCrisisWithStats({ onSave }: PlanetCrisisWithStatsProps) {
  const [currentPlate, setCurrentPlate] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [redLevel, setRedLevel] = useState(0); // Уровень "покраснения" глобуса (0-100%)
  const globeRef = useRef<HTMLDivElement>(null);
  
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
  
  // Анимация глобуса
  useEffect(() => {
    // Начинаем вращение глобуса
    const globe = globeRef.current;
    if (globe) {
      globe.style.animation = 'rotateGlobe 60s linear infinite';
    }
    
    // Показываем первую плитку и начинаем постепенное "покраснение" глобуса
    const timer1 = setTimeout(() => {
      setCurrentPlate(1);
      setRedLevel(25); // 25% покраснения с первой плиткой
    }, 2000);
    
    // Показываем вторую плитку и увеличиваем "покраснение"
    const timer2 = setTimeout(() => {
      setCurrentPlate(2);
      setRedLevel(50); // 50% покраснения со второй плиткой
    }, 4000);
    
    // Показываем третью плитку и увеличиваем "покраснение"
    const timer3 = setTimeout(() => {
      setCurrentPlate(3);
      setRedLevel(75); // 75% покраснения с третьей плиткой
    }, 6000);
    
    // Показываем четвертую плитку и максимальное "покраснение"
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
    setRedLevel(0);
    
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Настоящий 3D-глобус с постепенным окрашиванием */}
            <div 
              ref={globeRef}
              className="w-72 h-72 rounded-full relative overflow-hidden shadow-xl"
              style={{
                background: 'url(/earth-globe.jpg) repeat-x',
                backgroundSize: 'cover',
                boxShadow: `0 0 40px rgba(255, ${Math.max(0, 100 - redLevel)}, ${Math.max(0, 100 - redLevel)}, 0.3)`,
                filter: `hue-rotate(${redLevel * 0.6}deg) saturate(${1 + (redLevel / 100)})`
              }}
            >
              {/* Слой для эффекта "покраснения" */}
              <div 
                className="absolute inset-0 bg-red-600 mix-blend-overlay transition-opacity duration-1000"
                style={{ opacity: redLevel / 200 }}
              />
              
              {/* Слой атмосферы */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{ 
                  boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.1), 0 0 20px rgba(0, 183, 255, 0.2)',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%)'
                }}
              />
              
              {/* Эффект дыма/загрязнения, который усиливается с увеличением redLevel */}
              <div 
                className="absolute inset-0 bg-black transition-opacity duration-1000"
                style={{ 
                  opacity: (redLevel / 100) * 0.3,
                  backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii4wNSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAuMyAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==)',
                  backgroundSize: 'cover',
                  mixBlendMode: 'soft-light'
                }}
              />
            </div>
            
            {/* Гексагональная структура, появляющаяся при восстановлении */}
            {redLevel === 0 && (
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
      
      {/* CSS для анимации вращения глобуса */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rotateGlobe {
          from {
            background-position-x: 0%;
          }
          to {
            background-position-x: -200%;
          }
        }
      `}} />
    </div>
  );
}