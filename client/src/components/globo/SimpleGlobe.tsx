import React, { useState } from 'react';
import { WaterResource, ResourceStatus, ResourceCategory } from '@/types';
import { useTranslation } from 'react-i18next';

interface SimpleGlobeProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
}

// Стилизованная интерактивная карта мира с маркерами
const SimpleGlobe: React.FC<SimpleGlobeProps> = ({ resources, onResourceSelect }) => {
  const { t } = useTranslation();
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  
  console.log("SimpleGlobe rendered with", resources.length, "resources");
  
  // Определяем цвет маркера по статусу и категории
  const getMarkerColor = (resource: WaterResource) => {
    if (resource.status === ResourceStatus.CRITICAL) {
      return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]';
    } else if (resource.status === ResourceStatus.NEEDS_ATTENTION) {
      return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.7)]';
    } else if (resource.category === ResourceCategory.INVESTMENT) {
      return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]';
    } else {
      return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]';
    }
  };
  
  // Преобразуем координаты для отображения на 2D карте
  const getMarkerPosition = (lat: number, lng: number) => {
    // Простое линейное преобразование координат в диапазон от 0% до 100%
    const x = ((lng + 180) / 360) * 100; // долгота от -180 до 180 -> 0 до 100%
    const y = ((-lat + 90) / 180) * 100; // широта от -90 до 90 -> 100% до 0%
    return { x, y };
  };
  
  // Рендерим маркеры для ресурсов
  const renderMarkers = () => {
    return resources.map((resource) => {
      const { x, y } = getMarkerPosition(resource.latitude, resource.longitude);
      const isHovered = hoveredMarker === resource.id;
      const markerSize = isHovered ? 'w-5 h-5' : 'w-4 h-4';
      const zIndex = isHovered ? 'z-30' : 'z-20';
      
      return (
        <div
          key={resource.id}
          className={`absolute rounded-full ${markerSize} ${getMarkerColor(resource)} ${zIndex} cursor-pointer transition-all duration-300 transform ${isHovered ? 'scale-125' : 'scale-100'}`}
          style={{ 
            left: `${x}%`, 
            top: `${y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={() => onResourceSelect(resource)}
          onMouseEnter={() => setHoveredMarker(resource.id)}
          onMouseLeave={() => setHoveredMarker(null)}
          title={resource.name}
        />
      );
    });
  };
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg bg-[#040B1B] border border-[#0d2245]">
      {/* Карта мира (фоновое изображение) */}
      <div className="absolute inset-0 bg-[#040B1B] opacity-90 z-0">
        {/* Круги на карте, изображающие глобус */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-[90%] h-[90%] border-2 border-[#0a4f6e] rounded-full opacity-30" />
          <div className="absolute w-[60%] h-[60%] border-2 border-[#0a4f6e] rounded-full opacity-30" />
          <div className="absolute w-[30%] h-[30%] border-2 border-[#0a4f6e] rounded-full opacity-30" />
        </div>
        
        {/* Сетка линий долготы */}
        <div className="absolute inset-0 z-10 flex flex-col justify-around opacity-30">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`lat-${i}`} className="w-full h-[1px] bg-[#0a4f6e]" />
          ))}
        </div>
        
        {/* Сетка линий широты */}
        <div className="absolute inset-0 z-10 flex flex-row justify-around opacity-30">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`lng-${i}`} className="h-full w-[1px] bg-[#0a4f6e]" />
          ))}
        </div>
      </div>
      
      {/* Контейнер для маркеров */}
      <div className="absolute inset-0 z-20">
        {renderMarkers()}
      </div>
      
      {/* Заголовок карты */}
      <div className="absolute top-4 left-4 z-30 bg-black/50 p-2 rounded-md text-sm text-white/90">
        {t('globo.worldMap', 'Карта водных ресурсов')}
      </div>
      
      {/* Подсказка по взаимодействию */}
      <div className="absolute bottom-4 right-4 z-30 bg-black/50 p-2 rounded-md text-xs text-white/70">
        {t('globo.clickToExplore', 'Нажмите на маркер для просмотра')}
      </div>
    </div>
  );
};

export default SimpleGlobe;