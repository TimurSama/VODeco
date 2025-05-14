import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// Импортируем ThreeGlobe как модуль любого типа, поскольку он не имеет TypeScript-определений
import ThreeGlobeLib from 'three-globe';

// Для доступа к свойствам ThreeGlobe, которые отсутствуют в типах
type ObjAccessor<T> = ((obj: object) => T) | T;

interface GlobeObject extends THREE.Object3D {
  globeImageUrl: (url: string) => GlobeObject;
  bumpImageUrl: (url: string) => GlobeObject;
  atmosphereColor: (color: string | THREE.Color) => GlobeObject;
  atmosphereAltitude: (altitude: number) => GlobeObject;
  hexPolygonsData: (data: any[]) => GlobeObject;
  hexPolygonResolution: (resolution: number) => GlobeObject;
  hexPolygonMargin: (margin: number) => GlobeObject;
  hexPolygonColor: (callback: ObjAccessor<string | THREE.Color>) => GlobeObject;
  material: () => THREE.Material & { emissiveIntensity?: number; emissive?: THREE.Color; color?: THREE.Color; };
}

interface ThreeGlobeProps {
  redLevel: number; // 0-100 уровень "красноты"
  size?: number; // размер контейнера
}

const ThreeGlobe: React.FC<ThreeGlobeProps> = ({ redLevel, size = 240 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeObject | null>(null);
  const requestRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  // Состояние для отслеживания загрузки текстуры
  const [textureLoaded, setTextureLoaded] = useState(true);
  
  // Создаем красный фильтр для планеты при высоком уровне кризиса
  const createRedFilter = () => {
    if (redLevel > 80 && globeRef.current) {
      try {
        const material = globeRef.current.material && typeof globeRef.current.material === 'function' 
          ? globeRef.current.material() 
          : null;
          
        if (material && material.color instanceof THREE.Color) {
          // Устанавливаем насыщенный красный цвет
          material.color.setRGB(1.0, 0.2, 0.1);
        }
      } catch (error) {
        console.log('Could not apply red filter to globe material');
      }
    }
  };

  // Инициализация сцены Three.js
  useEffect(() => {
    if (!containerRef.current) return;

    // Создаем сцену, камеру и рендерер
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const aspectRatio = 1; // Квадратный контейнер
    const camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
    camera.position.z = 200;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    // Очищаем контейнер перед добавлением нового канваса
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);
    
    // Создаем глобус с помощью ThreeGlobe
    // Приводим к нашему интерфейсу для типизации
    const Globe = new ThreeGlobeLib() as unknown as GlobeObject;
    
    // Используем всегда базовое изображение земли, но применяем фильтры для красной планеты
    const earthImg = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
    
    // Создаем текстуру и отслеживаем ошибки
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      earthImg,
      (texture) => {
        // Текстура загружена успешно
        setTextureLoaded(true);
      },
      undefined,
      (error) => {
        // Ошибка загрузки текстуры
        console.error('Error loading texture:', error);
        setTextureLoaded(false);
      }
    );
    
    Globe.globeImageUrl(earthImg)
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .atmosphereColor(new THREE.Color(0x3a228a))
      .atmosphereAltitude(0.25)
      .hexPolygonsData([])
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .hexPolygonColor(() => {
        // Цвет hex-сетки зависит от уровня красноты
        const r = Math.min(0.9 + (redLevel / 150), 1);
        const g = Math.max(0.1 - (redLevel / 100), 0);
        const b = Math.max(0.3 - (redLevel / 100), 0);
        return new THREE.Color(r, g, b);
      });
      
    // Настраиваем размер глобуса и добавляем в сцену
    Globe.scale.set(100, 100, 100);
    Globe.rotation.y = -Math.PI / 6; // Начальное вращение
    Globe.rotation.x = Math.PI / 10; // Небольшой наклон
    
    scene.add(Globe);
    globeRef.current = Globe;
    
    // Добавляем мягкое освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(ambientLight);

    // Динамическое освещение, меняющееся с уровнем красноты
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1);
    scene.add(light);
    
    // Дополнительный свет для подсветки деталей
    const fillLight = new THREE.DirectionalLight(0x7ec8ff, 0.8);
    fillLight.position.set(-1, 0.5, -1);
    scene.add(fillLight);
    
    // Анимация вращения
    const animate = () => {
      if (globeRef.current) {
        // Скорость вращения
        globeRef.current.rotation.y += 0.002;
        
        // Применяем эффект красноты через материал глобуса
        adjustRedLevel(redLevel);
        
        // Рендеринг
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Очистка ресурсов при размонтировании
    return () => {
      cancelAnimationFrame(requestRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [size]);
  
  // Эффект для обновления уровня красноты
  useEffect(() => {
    adjustRedLevel(redLevel);
  }, [redLevel]);
  
  // Функция для настройки красноты глобуса
  const adjustRedLevel = (level: number) => {
    if (!globeRef.current) return;
    
    // Применяем специальный красный фильтр при максимальном уровне
    if (level > 80) {
      createRedFilter();
    }
    
    // Более агрессивное покраснение атмосферы
    const r = Math.min(0.3 + (level / 50), 1.0);
    const g = Math.max(0.1 - (level / 150), 0);
    const b = Math.max(0.4 - (level / 100), 0);
    
    globeRef.current.atmosphereColor(new THREE.Color(r, g, b));
    
    // Эффект дыма и загрязнения через насыщенность и цвет
    try {
      // В некоторых случаях material может быть недоступен, поэтому используем try-catch
      const material = globeRef.current.material && typeof globeRef.current.material === 'function' 
        ? globeRef.current.material() 
        : null;
      
      if (material) {
        // Дополнительная корректировка эмиссии
        if ('emissiveIntensity' in material) {
          material.emissiveIntensity = Math.max(0.6 - (level / 150), 0.2);
        }
        
        // Добавляем красный оттенок к материалу
        if ('emissive' in material && material.emissive instanceof THREE.Color) {
          const redTint = Math.min(level / 100, 1.0); 
          material.emissive.setRGB(redTint, 0, 0);
        }
        
        // Изменяем основной цвет материала для более интенсивного красного
        if ('color' in material && material.color instanceof THREE.Color) {
          if (level > 75) {
            // Более интенсивное покраснение при высоких уровнях
            const redIntensity = (level - 75) / 25; // 0-1 для уровней 75-100
            const blueGreen = Math.max(0.5 - (redIntensity * 0.5), 0);
            material.color.setRGB(1.0, blueGreen, blueGreen);
          } else if (level > 50) {
            // Умеренное покраснение для средних уровней
            const redIntensity = (level - 50) / 25; // 0-1 для уровней 50-75
            material.color.lerp(new THREE.Color(1, 0.7 - redIntensity*0.3, 0.7 - redIntensity*0.4), 0.4);
          }
        }
      }
    } catch (error) {
      console.log('Material not available yet');
    }
    
    // Обновляем освещение
    if (sceneRef.current) {
      // Находим световой источник и меняем его цвет
      sceneRef.current.children.forEach((child: THREE.Object3D) => {
        if (child instanceof THREE.DirectionalLight) {
          // Основной свет меняется в зависимости от уровня красноты
          if (child.position.x === 1 && child.position.y === 1) {
            // Смещение от голубого/белого к насыщенному красному
            const hue = Math.max(0.0, 0.6 - (level / 100)); 
            const saturation = Math.min(0.6 + (level / 150), 1.0);
            const lightness = 0.5;
            child.color.setHSL(hue, saturation, lightness);
            child.intensity = 2.0 + (level / 60); // Усиливаем интенсивность с уровнем красноты
          }
          // Дополнительный свет меняет интенсивность и цвет
          else if (child.position.x === -1) {
            if (level > 50) {
              // Постепенно делаем дополнительный свет красноватым
              const redRatio = (level - 50) / 50; // от 0 до 1 для level от 50 до 100
              child.color.setRGB(1, Math.max(0.7 - redRatio*0.7, 0), Math.max(0.8 - redRatio*0.8, 0));
            }
            child.intensity = Math.max(0.8 - (level / 150), 0.3);
          }
        }
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: '0 auto',
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: `0 0 30px rgba(${Math.min(100 + redLevel, 255)}, ${Math.max(100 - redLevel, 20)}, ${Math.max(150 - redLevel, 20)}, 0.3)`
      }}
    />
  );
};

export default ThreeGlobe;