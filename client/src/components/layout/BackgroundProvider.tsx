
import React from 'react';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

/**
 * Компонент, который оборачивает приложение и добавляет фон
 */
export default function BackgroundProvider({ children }: BackgroundProviderProps) {
  return (
    <div className="relative min-h-screen bg-[#001520]">
      {/* Основное содержимое приложения */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
