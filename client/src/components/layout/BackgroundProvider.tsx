
import React, { useState, useEffect } from 'react';
import HexOceanWaves from './HexOceanWaves';
import StaticBackground from './StaticBackground';
import { PerformanceManager, usePerformanceContext } from './PerformanceManager';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

/**
 * Внутренний компонент фона
 */
function BackgroundContent({ children }: { children: React.ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const { shouldAnimate, isVisible, isLowEndDevice, disableHeavyAnimations } = usePerformanceContext();

  useEffect(() => {
    // Увеличиваем задержку для показа анимации после загрузки основного контента
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen vodeco-bg water-waves">
      {/* Выбираем тип фона в зависимости от производительности устройства */}
      {showAnimation && isVisible && (
        shouldAnimate && !isLowEndDevice && !disableHeavyAnimations ? (
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

/**
 * Оптимизированный компонент фона с интеллектуальным управлением анимацией
 */
export default function BackgroundProvider({ children }: BackgroundProviderProps) {
  return (
    <PerformanceManager>
      <BackgroundContent>
        {children}
      </BackgroundContent>
    </PerformanceManager>
  );
}
