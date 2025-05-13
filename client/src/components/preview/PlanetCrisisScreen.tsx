import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PlanetCrisisScreenProps {
  onNext: () => void;
}

export default function PlanetCrisisScreen({ onNext }: PlanetCrisisScreenProps) {
  const [showStats, setShowStats] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  // Анимация планеты
  const planetVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация плиток с информацией
  const tileVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 1.5 + (i * 0.2),
        duration: 0.6,
        ease: "easeOut" 
      }
    })
  };

  // Данные о водных катастрофах (4 плитки)
  const crisisData = [
    {
      title: "Водные ресурсы",
      stats: [
        "71% поверхности Земли — вода",
        "0.02% массы планеты — вода",
        "0.0006% — пригодная пресная",
        "0.0002% — реально доступная"
      ]
    },
    {
      title: "Человеческое влияние",
      stats: [
        "1.2 млн смертей в год",
        "2.8 млн км³ воды уничтожено",
        "400 млн тонн токсинов в год",
        "2.2 млрд человек без чистой воды"
      ]
    },
    {
      title: "Текущий кризис",
      stats: [
        "25% пресной воды утрачены",
        "30% населения без доступа",
        "65% пашни под угрозой",
        "80% сточных вод без очистки"
      ]
    },
    {
      title: "Прогноз",
      stats: [
        "2030 — водные конфликты",
        "2040 — глобальный дефицит",
        "2050 — 70% экосистем в кризисе",
        "2060 — риск экологического коллапса"
      ]
    }
  ];

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden"
      onClick={onNext}
    >
      {/* Фоновые эффекты кризиса */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-background z-0"></div>
      <div className="absolute inset-0 bg-[url('/smog-texture.svg')] opacity-10 z-0"></div>
      
      <div className="relative z-10 max-w-7xl w-full flex flex-col items-center">
        {/* Вращающаяся планета */}
        <motion.div
          className="relative mb-8 mt-6 w-56 h-56 md:w-72 md:h-72"
          variants={planetVariants}
          initial="initial"
          animate="animate"
        >
          <div className="absolute inset-0 rounded-full bg-blue-600 opacity-60 overflow-hidden">
            <div 
              className="absolute inset-0 bg-[url('/earth-texture.jpg')] bg-cover"
              style={{
                animation: 'spin 30s linear infinite',
                filter: 'sepia(0.3) brightness(0.8) saturate(0.6)'
              }}
            ></div>
            <div className="absolute inset-0 bg-red-900/30"></div>
          </div>
        </motion.div>
        
        {/* Плитки с информацией */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {crisisData.map((tile, index) => (
              <motion.div
                key={index}
                className="bg-card/40 backdrop-blur-sm rounded-lg p-5 border border-white/10"
                variants={tileVariants}
                initial="initial"
                animate="animate"
                custom={index}
              >
                <h3 className="text-primary text-lg font-semibold mb-3">{tile.title}</h3>
                <ul className="space-y-2">
                  {tile.stats.map((stat, statIndex) => (
                    <li key={statIndex} className="text-white/80 text-sm flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      {stat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}