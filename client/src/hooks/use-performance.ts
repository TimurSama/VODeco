import { useState, useEffect } from 'react';

/**
 * Хук для управления производительностью анимаций
 */
export function usePerformance() {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
      
      // Определяем слабое устройство
      const isLowEnd = cores <= 2 || memory <= 2 || screenSize < 1000000;
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

  return {
    isLowEndDevice,
    prefersReducedMotion,
    isVisible,
    shouldAnimate: !prefersReducedMotion && !isLowEndDevice && isVisible
  };
}
