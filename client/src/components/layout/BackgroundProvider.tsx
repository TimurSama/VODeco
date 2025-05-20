import React from 'react';
import AnimatedHexGrid from './AnimatedHexGrid';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

/**
 * Компонент, который оборачивает приложение и добавляет анимированный фон
 */
export default function BackgroundProvider({ children }: BackgroundProviderProps) {
  return (
    <div className="relative min-h-screen bg-[#001520]">
      {/* Анимированный гексагональный фон */}
      <AnimatedHexGrid 
        baseOpacity={0.2}
        pulseOpacity={0.4}
        color="#00FFFF"
        speed={1.2}
      />
      
      {/* Основной контент */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}