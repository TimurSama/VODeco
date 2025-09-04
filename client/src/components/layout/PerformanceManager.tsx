import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePerformance } from '@/hooks/use-performance';

interface PerformanceContextType {
  isLowEndDevice: boolean;
  shouldAnimate: boolean;
  isVisible: boolean;
  batteryLevel: number;
  connectionType: string;
  disableHeavyAnimations: boolean;
  setDisableHeavyAnimations: (value: boolean) => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const usePerformanceContext = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider');
  }
  return context;
};

interface PerformanceManagerProps {
  children: React.ReactNode;
}

export const PerformanceManager: React.FC<PerformanceManagerProps> = ({ children }) => {
  const performance = usePerformance();
  const [disableHeavyAnimations, setDisableHeavyAnimations] = useState(false);

  useEffect(() => {
    // Автоматически отключаем тяжелые анимации на слабых устройствах
    if (performance.isLowEndDevice || performance.batteryLevel < 0.3) {
      setDisableHeavyAnimations(true);
    }
  }, [performance.isLowEndDevice, performance.batteryLevel]);

  // Отключаем анимации при потере фокуса
  useEffect(() => {
    if (!performance.isVisible) {
      setDisableHeavyAnimations(true);
    } else if (!performance.isLowEndDevice && performance.batteryLevel > 0.3) {
      setDisableHeavyAnimations(false);
    }
  }, [performance.isVisible, performance.isLowEndDevice, performance.batteryLevel]);

  const contextValue: PerformanceContextType = {
    ...performance,
    disableHeavyAnimations,
    setDisableHeavyAnimations
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Компонент для отображения индикатора производительности (только в dev режиме)
export const PerformanceIndicator: React.FC = () => {
  const { isLowEndDevice, shouldAnimate, batteryLevel, connectionType, disableHeavyAnimations } = usePerformanceContext();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-[100]">
      <div>Device: {isLowEndDevice ? 'Low-end' : 'High-end'}</div>
      <div>Animate: {shouldAnimate ? 'Yes' : 'No'}</div>
      <div>Battery: {Math.round(batteryLevel * 100)}%</div>
      <div>Connection: {connectionType}</div>
      <div>Heavy Animations: {disableHeavyAnimations ? 'Disabled' : 'Enabled'}</div>
    </div>
  );
};
