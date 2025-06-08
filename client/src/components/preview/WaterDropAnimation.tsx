import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface WaterDropAnimationProps {
  onComplete: () => void;
}

export default function WaterDropAnimation({ onComplete }: WaterDropAnimationProps) {
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 2000);
    const fadeTimer = setTimeout(() => setFadeOut(true), 6000);
    const completeTimer = setTimeout(() => onComplete(), 7000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      <div className="relative">
        {/* Анимированная капля воды */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: fadeOut ? 0 : 1, 
            opacity: fadeOut ? 0 : 1 
          }}
          transition={{ 
            scale: { duration: fadeOut ? 1 : 2, ease: "easeOut" },
            opacity: { duration: fadeOut ? 1 : 0.5 }
          }}
          className="relative mx-auto"
          style={{ width: '300px', height: '360px' }}
        >
          {/* Основная капля */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-200 via-blue-300 to-blue-500 rounded-full opacity-90 shadow-2xl"
               style={{
                 borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                 transform: 'rotate(-45deg)',
                 filter: 'blur(0.5px)'
               }}>
            
            {/* Блики на капле */}
            <div className="absolute top-6 left-6 w-16 h-16 bg-white opacity-40 rounded-full blur-sm" />
            <div className="absolute top-12 right-8 w-8 h-8 bg-white opacity-30 rounded-full blur-sm" />
            
            {/* Пузырьки воздуха */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 300, opacity: 0 }}
                animate={{ 
                  y: -50, 
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1, 0.3]
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${8 + i * 2}px`,
                  height: `${8 + i * 2}px`,
                  left: `${30 + i * 15}%`,
                  filter: 'blur(0.5px)'
                }}
              />
            ))}

            {/* Молекула H₂O в центре */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="relative w-20 h-20"
              >
                {/* Атом кислорода (большой) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg border-2 border-red-300" />
                
                {/* Атомы водорода (маленькие) */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-lg border border-blue-200" />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-blue-400 rounded-full shadow-lg border border-blue-200" />
                
                {/* Связи между атомами */}
                <div className="absolute top-1/2 left-1/2 w-px h-6 bg-white transform -translate-x-1/2 -translate-y-1/2 -rotate-45 origin-bottom" />
                <div className="absolute top-1/2 left-1/2 w-px h-6 bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45 origin-bottom" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Текст под каплей */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showText ? (fadeOut ? 0 : 1) : 0, 
            y: showText ? 0 : 20 
          }}
          transition={{ duration: fadeOut ? 1 : 0.8 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            H₂O
          </h2>
          <p className="text-lg md:text-xl text-cyan-200 max-w-lg leading-relaxed">
            вода - первичный и главный признак и фактор жизни
          </p>
        </motion.div>
      </div>
    </div>
  );
}