
import React, { useState, useEffect } from 'react';
import HexOceanWaves from './HexOceanWaves';
import StaticBackground from './StaticBackground';
import { usePerformance } from '@/hooks/use-performance';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

/**
 * Оптимизированный компонент фона с интеллектуальным управлением анимацией
 */
export default function BackgroundProvider({ children }: BackgroundProviderProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const { shouldAnimate, isVisible, isLowEndDevice } = usePerformance();

  useEffect(() => {
    // Задержка для показа анимации после загрузки основного контента
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen vodeco-bg water-waves">
      {/* Выбираем тип фона в зависимости от производительности устройства */}
      {showAnimation && isVisible && (
        shouldAnimate && !isLowEndDevice ? (
          <HexOceanWaves />
        ) : (
          <StaticBackground />
        )
      )}
      
      {/* Основное содержимое приложения */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
