import { useState, useEffect } from 'react';

/**
 * Хук для управления производительностью анимаций
 */
export function usePerformance() {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [connectionType, setConnectionType] = useState('4g');

  useEffect(() => {
    // Проверяем настройки пользователя для уменьшенной анимации
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Определяем слабые устройства
    const checkDevicePerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsLowEndDevice(true);
        return;
      }

      // Проверяем количество ядер процессора
      const cores = navigator.hardwareConcurrency || 2;
      
      // Проверяем память (если доступно)
      const memory = (navigator as any).deviceMemory || 4;
      
      // Проверяем размер экрана (маленькие экраны часто означают слабые устройства)
      const screenSize = window.screen.width * window.screen.height;
      
      // Проверяем тип соединения
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (connection) {
        setConnectionType(connection.effectiveType || '4g');
      }

      // Проверяем уровень батареи (если доступно)
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setBatteryLevel(battery.level);
        });
      }
      
      // Более строгие критерии для определения слабого устройства
      const isLowEnd = cores <= 2 || memory <= 2 || screenSize < 1000000 || 
                      connection?.effectiveType === 'slow-2g' || 
                      connection?.effectiveType === '2g' ||
                      connection?.effectiveType === '3g';
      setIsLowEndDevice(isLowEnd);
    };

    checkDevicePerformance();

    // Проверяем видимость страницы
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Более строгие условия для анимации
  const shouldAnimate = !prefersReducedMotion && 
                       !isLowEndDevice && 
                       isVisible && 
                       batteryLevel > 0.2 && 
                       connectionType !== 'slow-2g' && 
                       connectionType !== '2g';

  return {
    isLowEndDevice,
    prefersReducedMotion,
    isVisible,
    batteryLevel,
    connectionType,
    shouldAnimate
  };
}
