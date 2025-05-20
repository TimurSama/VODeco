import React from 'react';
import HexGrid from '../HexGrid';

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
      <HexGrid />
      
      {/* Основной контент */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}