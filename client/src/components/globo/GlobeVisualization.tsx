import React, { useEffect, useRef, useState } from 'react';
import { WaterResource, ResourceStatus } from '@/types';

interface GlobeVisualizationProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ resources, onResourceSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Простая версия для отображения списка ресурсов
  useEffect(() => {
    // Эмулируем загрузку
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center bg-[#040B1B]">
        {isLoading ? (
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        ) : (
          <div className="text-center p-4">
            <h3 className="text-lg text-primary font-medium mb-4">Интерактивная карта ресурсов временно недоступна</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Используйте список ресурсов для просмотра инвестиционных объектов
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-2xl">
              {resources.slice(0, 4).map(resource => (
                <button
                  key={resource.id}
                  onClick={() => onResourceSelect(resource)}
                  className="flex flex-col p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{resource.name}</h4>
                    <div 
                      className={`h-3 w-3 rounded-full ${
                        resource.status === ResourceStatus.CRITICAL ? 'bg-danger' :
                        resource.status === ResourceStatus.NEEDS_ATTENTION ? 'bg-warning' :
                        'bg-positive'
                      }`}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {resource.region}, {resource.country}
                  </div>
                  {resource.irr !== undefined && (
                    <div className="mt-2 text-xs flex justify-between">
                      <span>Годовая доходность:</span>
                      <span className="text-primary">{resource.irr}%</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobeVisualization;