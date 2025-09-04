import React from 'react';
import { Button } from '@/components/ui/button';
import { Battery, Zap, ZapOff } from 'lucide-react';
import { usePerformanceContext } from '@/components/layout/PerformanceManager';

/**
 * Компонент для переключения режима производительности
 */
export const PerformanceToggle: React.FC = () => {
  const { 
    disableHeavyAnimations, 
    setDisableHeavyAnimations, 
    isLowEndDevice, 
    batteryLevel,
    connectionType 
  } = usePerformanceContext();

  const handleToggle = () => {
    setDisableHeavyAnimations(!disableHeavyAnimations);
  };

  const getBatteryIcon = () => {
    if (batteryLevel > 0.7) return <Battery className="h-4 w-4 text-green-500" />;
    if (batteryLevel > 0.3) return <Battery className="h-4 w-4 text-yellow-500" />;
    return <Battery className="h-4 w-4 text-red-500" />;
  };

  const getConnectionColor = () => {
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return 'text-red-500';
      case '3g':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-primary/20">
      {/* Индикатор батареи */}
      {getBatteryIcon()}
      
      {/* Индикатор соединения */}
      <span className={`text-xs ${getConnectionColor()}`}>
        {connectionType.toUpperCase()}
      </span>
      
      {/* Кнопка переключения */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className="h-8 px-2"
        title={disableHeavyAnimations ? "Включить анимации" : "Отключить анимации для экономии батареи"}
      >
        {disableHeavyAnimations ? (
          <ZapOff className="h-4 w-4 text-orange-500" />
        ) : (
          <Zap className="h-4 w-4 text-green-500" />
        )}
      </Button>
      
      {/* Индикатор устройства */}
      {isLowEndDevice && (
        <span className="text-xs text-orange-500" title="Слабое устройство - анимации ограничены">
          Low-end
        </span>
      )}
    </div>
  );
};
