
import React from 'react';
import HexOceanWaves from './HexOceanWaves';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

/**
 * Компонент, который оборачивает приложение и добавляет анимированный фон
 */
export default function BackgroundProvider({ children }: BackgroundProviderProps) {
  return (
    <div className="relative min-h-screen bg-[#000b1e]">
      {/* Анимированный фон с океанскими волнами */}
      <HexOceanWaves />
      
      {/* Основное содержимое приложения */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
