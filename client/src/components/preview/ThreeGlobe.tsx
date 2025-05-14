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
  
  // Создаем экстремально красный фильтр для планеты при высоком уровне кризиса
  const createRedFilter = () => {
    if (redLevel > 50 && globeRef.current) {
      try {
        const material = globeRef.current.material && typeof globeRef.current.material === 'function' 
          ? globeRef.current.material() 
          : null;
          
        if (material) {
          // Определяем интенсивность красного на основе уровня
          const intensity = Math.min((redLevel - 50) / 50, 1.0); // 0-1 для уровней 50-100
          
          // Устанавливаем насыщенный красный цвет с нарастающей интенсивностью
          if (material.color instanceof THREE.Color) {
            // Чем выше redLevel, тем более насыщенный красный
            const green = Math.max(0.3 - (intensity * 0.3), 0);
            const blue = Math.max(0.2 - (intensity * 0.2), 0);
            material.color.setRGB(1.0, green, blue);
          }
          
          // Добавляем красное свечение через эмиссию
          if ('emissive' in material && material.emissive instanceof THREE.Color) {
            material.emissive.setRGB(intensity * 0.8, 0, 0);
            if ('emissiveIntensity' in material) {
              material.emissiveIntensity = 0.5 + (intensity * 0.5);
            }
          }
          
          // Усиливаем металлический эффект для более драматичного отображения
          if ('metalness' in material && typeof material.metalness === 'number') {
            material.metalness = Math.min(intensity * 0.5, 0.5);
          }
          
          // Усиливаем шероховатость для более драматичного отображения
          if ('roughness' in material && typeof material.roughness === 'number') {
            material.roughness = Math.max(0.7 - (intensity * 0.3), 0.4);
          }
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
    
    // Обновляем освещение для более драматичного эффекта
    if (sceneRef.current) {
      // Создаем красную дымку вокруг планеты при высоких уровнях кризиса
      if (level > 90 && !sceneRef.current.userData.redFogAdded) {
        // Добавляем красный туман для эффекта апокалипсиса
        sceneRef.current.fog = new THREE.FogExp2(0xff1111, 0.002);
        sceneRef.current.userData.redFogAdded = true;
      } else if (level <= 90 && sceneRef.current.userData.redFogAdded) {
        // Убираем туман при снижении уровня
        sceneRef.current.fog = null;
        sceneRef.current.userData.redFogAdded = false;
      }
    
      // Находим световой источник и меняем его цвет
      sceneRef.current.children.forEach((child: THREE.Object3D) => {
        if (child instanceof THREE.DirectionalLight) {
          // Основной свет меняется в зависимости от уровня красноты
          if (child.position.x === 1 && child.position.y === 1) {
            if (level > 80) {
              // Для максимального уровня - чисто красный свет
              child.color.setRGB(1, 0.1, 0);
              child.intensity = 3.0; // Очень яркий
            } else if (level > 50) {
              // Смещение от голубого/белого к насыщенному красному
              const redRatio = (level - 50) / 30; // 0-1 для уровней 50-80
              const hue = Math.max(0.0, 0.02 - (redRatio * 0.02)); // Почти сразу красный
              const saturation = Math.min(0.7 + (redRatio * 0.3), 1.0);
              const lightness = 0.5;
              child.color.setHSL(hue, saturation, lightness);
              child.intensity = 2.0 + (redRatio * 1.0); // Усиливаем интенсивность
            } else {
              // Для низких уровней - нормальный свет
              child.color.setRGB(1, 1, 1);
              child.intensity = 1.5;
            }
          }
          // Дополнительный свет меняет интенсивность и цвет
          else if (child.position.x === -1) {
            if (level > 80) {
              // Для максимального уровня - темно-красный дополнительный свет
              child.color.setRGB(0.8, 0, 0);
              child.intensity = 0.9; // Усиливаем для драматизма
            } else if (level > 50) {
              // Постепенно делаем дополнительный свет красноватым
              const redRatio = (level - 50) / 30; // 0-1 для уровней 50-80
              child.color.setRGB(1, Math.max(0.5 - redRatio*0.5, 0), Math.max(0.6 - redRatio*0.6, 0));
              child.intensity = 0.8 + (redRatio * 0.1); // Слегка увеличиваем яркость
            } else {
              // Для низких уровней - голубоватый свет
              child.color.setRGB(0.7, 0.8, 1.0);
              child.intensity = 0.8;
            }
          }
        } else if (child instanceof THREE.AmbientLight) {
          // Меняем цвет окружающего света при высоких уровнях красноты
          if (level > 90) {
            child.color.setRGB(0.8, 0.3, 0.3); // Красноватый окружающий свет
            child.intensity = 3.0; // Усиливаем для более красного окружения
          } else if (level > 75) {
            const redRatio = (level - 75) / 15; // 0-1 для уровней 75-90
            child.color.lerp(new THREE.Color(0.8, 0.3, 0.3), redRatio);
            child.intensity = 2.0 + (redRatio * 1.0);
          }
        }
      });
    }
  };

  const getShadowColor = () => {
    // Определяем цвет тени в зависимости от уровня красноты
    if (redLevel > 80) {
      // Для очень высоких значений - огненно-красная тень с большим распространением
      return `0 0 40px 10px rgba(255, 40, 20, 0.6), 0 0 80px 20px rgba(255, 60, 20, 0.3)`;
    } else if (redLevel > 50) {
      // Для средних значений - красноватая тень
      const intensity = (redLevel - 50) / 30; // 0-1 для уровней 50-80
      const red = Math.min(100 + redLevel * 1.5, 255);
      const green = Math.max(100 - redLevel, 20);
      const blue = Math.max(150 - redLevel * 1.2, 10);
      const alpha = 0.3 + (intensity * 0.3);
      return `0 0 30px rgba(${red}, ${green}, ${blue}, ${alpha}), 0 0 60px rgba(${red}, ${green/2}, ${blue/2}, ${alpha/2})`;
    } else {
      // Для низких значений - обычная тень
      return `0 0 30px rgba(${Math.min(100 + redLevel, 255)}, ${Math.max(100 - redLevel, 20)}, ${Math.max(150 - redLevel, 20)}, 0.3)`;
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
        boxShadow: getShadowColor(),
        transition: 'box-shadow 0.5s ease-in-out'
      }}
    >
      {/* Эффект красного свечения при высоком уровне красноты */}
      {redLevel > 80 && (
        <div 
          style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,30,0,0.2) 0%, rgba(255,30,0,0) 70%)`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default ThreeGlobe;