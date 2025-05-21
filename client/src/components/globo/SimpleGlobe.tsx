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
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-[#040B1B] border border-[#0d2245]">
      {/* Карта мира (фоновое изображение) */}
      <div className="absolute inset-0 bg-[#040B1B] opacity-90 z-0">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-[90%] h-[90%] border-[0.5px] border-[#0a4f6e] rounded-full opacity-20" />
          <div className="absolute w-[60%] h-[60%] border-[0.5px] border-[#0a4f6e] rounded-full opacity-20" />
          <div className="absolute w-[30%] h-[30%] border-[0.5px] border-[#0a4f6e] rounded-full opacity-20" />
        </div>
        
        {/* Сетка линий долготы */}
        <div className="absolute inset-0 z-10 flex flex-col justify-around opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`lat-${i}`} className="w-full h-[0.5px] bg-[#0a4f6e]" />
          ))}
        </div>
        
        {/* Сетка линий широты */}
        <div className="absolute inset-0 z-10 flex flex-row justify-around opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`lng-${i}`} className="h-full w-[0.5px] bg-[#0a4f6e]" />
          ))}
        </div>
      </div>
      
      {/* Контейнер для маркеров */}
      <div className="absolute inset-0 z-20">
        {renderMarkers()}
      </div>
      
      {/* Подсказка по взаимодействию */}
      <div className="absolute bottom-4 right-4 z-30 bg-black/50 p-2 rounded-md text-xs text-white/70">
        {t('globo.clickToExplore')}
      </div>
    </div>
  );
};

export default SimpleGlobe;
  useEffect(() => {
    if (!containerRef.current || isInitialized) return;
    
    console.log("Initializing SimpleGlobe...");
    
    try {
      // Создаем основные объекты Three.js
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x040B1B);
      sceneRef.current = scene;
      
      // Настраиваем размеры
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 500; // Fallback height
      console.log("Container dimensions:", { width, height });
      
      // Создаем камеру
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 0, 250);
      cameraRef.current = camera;
      
      // Создаем рендерер с правильными настройками для мобильных устройств
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Ограничиваем pixelRatio для производительности
      
      // Очищаем контейнер если в нем что-то есть
      while(containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Добавляем сильное освещение для лучшей видимости объектов
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Увеличиваем интенсивность
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Увеличиваем интенсивность
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      // Добавляем дополнительный источник света с другой стороны
      const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
      backLight.position.set(-1, -1, -1);
      scene.add(backLight);
      
      // Создаем управление камерой
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8; // Немного увеличиваем скорость вращения
      controlsRef.current = controls;
      
      // Создаем базовый глобус
      createGlobe(scene);
      
      // Добавляем маркеры ресурсов
      addResourceMarkers(scene);
      
      // Анимационный цикл с оптимизациями
      let lastTime = 0;
      const FRAME_RATE = 30; // Ограничиваем FPS для мобильных устройств
      const FRAME_TIME = 1000 / FRAME_RATE;
      
      const animate = (time = 0) => {
        requestRef.current = requestAnimationFrame(animate);
        
        // Ограничиваем частоту кадров
        const delta = time - lastTime;
        if (delta < FRAME_TIME) return;
        lastTime = time;
        
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };
      
      animate();
      
      // Обработчик изменения размера окна с дебаунсом
      let resizeTimer: number;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
          
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight || 500;
          
          cameraRef.current.aspect = width / height;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(width, height);
        }, 250);
      };
      
      window.addEventListener('resize', handleResize);
      
      setIsInitialized(true);
      console.log("SimpleGlobe initialization complete");
      
      // Очистка при размонтировании
      return () => {
        console.log("Cleaning up SimpleGlobe");
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
        cancelAnimationFrame(requestRef.current);
        
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        
        if (sceneRef.current) {
          // Очистка ресурсов
          sceneRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              if (object.geometry) {
                object.geometry.dispose();
              }
              
              if (object.material) {
                if (Array.isArray(object.material)) {
                  object.material.forEach(material => material.dispose());
                } else {
                  object.material.dispose();
                }
              }
            }
          });
        }
      };
    } catch (error) {
      console.error("Error initializing SimpleGlobe:", error);
    }
  }, [isInitialized, resources]);
  
  // Функция для создания базового глобуса
  const createGlobe = (scene: THREE.Scene) => {
    try {
      console.log("Creating globe sphere...");
      
      // Создаем текстуру для глобуса
      const textureLoader = new THREE.TextureLoader();
      
      // Создаем земной шар с базовой текстурой
      const earthGeometry = new THREE.SphereGeometry(100, 64, 64);
      const earthMaterial = new THREE.MeshPhongMaterial({
        // Используем цвет вместо текстур для надежности
        color: 0x1e3a8a, // темно-синий цвет для океанов
        emissive: 0x0a192f, // слабое свечение
        specular: new THREE.Color(0x2d4ea0),
        shininess: 10
      });
      
      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earthMesh);
      
      // Добавляем атмосферу (свечение)
      const atmosphereGeometry = new THREE.SphereGeometry(102, 64, 64);
      const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x14b8a6,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.3, // Увеличиваем яркость атмосферы
        emissive: 0x14b8a6,
        emissiveIntensity: 0.2
      });
      
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);
      
      console.log("Globe created successfully");
    } catch (error) {
      console.error("Error creating globe:", error);
    }
  };
  
  // Функция для добавления маркеров ресурсов
  const addResourceMarkers = (scene: THREE.Scene) => {
    try {
      console.log("Adding resource markers...");
      
      // Удаляем предыдущие маркеры, если они есть
      scene.traverse((object) => {
        if (object.userData && object.userData.isResourceMarker) {
          scene.remove(object);
        }
      });
      
      // Создаем группу для маркеров
      const markersGroup = new THREE.Group();
      markersGroup.userData = { isResourceGroup: true };
      
      // Добавляем маркеры для каждого ресурса
      resources.forEach(resource => {
        // Определяем цвет и размер маркера в зависимости от категории и статуса
        let color = 0xFFFFFF; // Белый по умолчанию для path
        let size = 1.5; // Увеличиваем базовый размер для лучшей видимости
        
        if (resource.category === ResourceCategory.INVESTMENT) {
          color = 0x3b82f6; // Синий для инвестиционных объектов
          size = 2.0;
        }
        
        // Модифицируем цвет в зависимости от статуса
        if (resource.status === ResourceStatus.CRITICAL) {
          color = 0xff4444; // Яркий красный для критических
          size *= 1.5;
        } else if (resource.status === ResourceStatus.NEEDS_ATTENTION) {
          if (resource.category === ResourceCategory.INVESTMENT) {
            color = 0xffbb00; // Яркий янтарный для инвестиционных, требующих внимания
          }
          size *= 1.2;
        }
        
        // Создаем маркер с эффектом свечения
        const markerGeometry = new THREE.SphereGeometry(size, 16, 16);
        const markerMaterial = new THREE.MeshPhongMaterial({ 
          color,
          emissive: color,
          emissiveIntensity: 0.5,
          shininess: 50
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        
        // Преобразуем географические координаты в 3D-координаты
        const phi = (90 - resource.latitude) * (Math.PI / 180);
        const theta = (90 - resource.longitude) * (Math.PI / 180);
        
        // Размещаем маркер на поверхности глобуса
        const radius = 101; // Чуть больше радиуса глобуса
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        marker.position.set(x, y, z);
        marker.userData = { 
          isResourceMarker: true,
          resourceId: resource.id,
          resourceName: resource.name,
          resourceCategory: resource.category
        };
        
        // Добавляем маркер в группу
        markersGroup.add(marker);
      });
      
      // Добавляем группу маркеров в сцену
      scene.add(markersGroup);
      
      // Добавляем обработчик клика для выбора ресурса
      const handleClick = (event: MouseEvent) => {
        if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
        
        // Определяем позицию мыши в нормализованных координатах (-1 до +1)
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Создаем Raycaster для определения пересечений
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
        
        // Находим все маркеры ресурсов
        const markerObjects: THREE.Object3D[] = [];
        sceneRef.current.traverse((object) => {
          if (object.userData && object.userData.isResourceMarker) {
            markerObjects.push(object);
          }
        });
        
        // Проверяем пересечения с маркерами
        const intersects = raycaster.intersectObjects(markerObjects);
        
        if (intersects.length > 0) {
          const clickedObject = intersects[0].object;
          const resourceId = clickedObject.userData?.resourceId;
          
          if (resourceId) {
            const selectedResource = resources.find(r => r.id === resourceId);
            if (selectedResource) {
              console.log("Resource selected:", selectedResource.name);
              onResourceSelect(selectedResource);
            }
          }
        }
      };
      
      // Добавляем обработчик клика
      containerRef.current?.addEventListener('click', handleClick);
      
      // Очистка обработчика при размонтировании
      return () => {
        containerRef.current?.removeEventListener('click', handleClick);
      };
    } catch (error) {
      console.error("Error adding resource markers:", error);
    }
  };
  
  return (
    <div className="relative w-full h-full">
      {/* Контейнер для глобуса */}
      <div 
        ref={containerRef} 
        className="w-full h-[600px] bg-[#040B1B]"
      />
      
      {/* Информация о статусе загрузки */}
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#040B1B]/90">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Initializing globe...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleGlobe;