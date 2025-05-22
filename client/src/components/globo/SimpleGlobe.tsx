import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WaterResource, ResourceStatus, ResourceCategory } from '@/types';
import { useTranslation } from 'react-i18next';

interface SimpleGlobeProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
}

// 3D Глобус Земли с Three.js и интерактивными маркерами-каплями
const SimpleGlobe: React.FC<SimpleGlobeProps> = ({ resources, onResourceSelect }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const requestRef = useRef<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  console.log("SimpleGlobe rendered with", resources.length, "resources");

  // Инициализация Three.js сцены
  useEffect(() => {
    if (!containerRef.current || isInitialized) return;
    
    console.log("Initializing 3D Globe...");
    
    try {
      // Создание сцены
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x040B1B);
      sceneRef.current = scene;
      
      // Размеры контейнера
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 600;
      
      // Создание камеры
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 0, 250);
      cameraRef.current = camera;
      
      // Создание рендерера
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      // Добавление canvas в контейнер
      while(containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Освещение
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(100, 100, 50);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);
      
      // Дополнительное освещение для лучшей видимости
      const fillLight = new THREE.DirectionalLight(0x4a9eff, 0.3);
      fillLight.position.set(-100, -100, -50);
      scene.add(fillLight);
      
      // Управление камерой
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
      controls.zoomSpeed = 0.8;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.0;
      controls.minDistance = 150;
      controls.maxDistance = 400;
      controlsRef.current = controls;
      
      // Создание глобуса Земли
      createEarthGlobe(scene);
      
      // Анимационный цикл
      const animate = () => {
        requestRef.current = requestAnimationFrame(animate);
        
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        // Анимация маркеров (пульсация)
        if (markersGroupRef.current) {
          const time = Date.now() * 0.002;
          markersGroupRef.current.children.forEach((marker, index) => {
            const scale = 1 + Math.sin(time + index * 0.5) * 0.1;
            marker.scale.setScalar(scale);
          });
        }
        
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };
      
      animate();
      
      // Обработчик изменения размера
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight || 600;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      
      setIsInitialized(true);
      setIsLoading(false);
      console.log("3D Globe initialization complete");
      
      // Очистка при размонтировании
      return () => {
        console.log("Cleaning up 3D Globe");
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(requestRef.current);
        
        if (rendererRef.current && containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        
        // Очистка ресурсов Three.js
        if (sceneRef.current) {
          sceneRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              if (object.geometry) object.geometry.dispose();
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
        
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
      };
    } catch (error) {
      console.error("Error initializing 3D Globe:", error);
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Создание глобуса Земли
  const createEarthGlobe = (scene: THREE.Scene) => {
    try {
      console.log("Creating Earth Globe...");
      
      // Геометрия и материал для Земли
      const earthGeometry = new THREE.SphereGeometry(100, 64, 64);
      const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2563eb, // Синий цвет океанов
        shininess: 10,
        transparent: true,
        opacity: 0.9
      });
      
      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      earthMesh.receiveShadow = true;
      scene.add(earthMesh);
      globeRef.current = earthMesh;
      
      // Атмосфера (свечение вокруг планеты)
      const atmosphereGeometry = new THREE.SphereGeometry(102, 64, 64);
      const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x14b8a6,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.2,
        emissive: 0x14b8a6,
        emissiveIntensity: 0.1
      });
      
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);
      
      console.log("Earth Globe created successfully");
    } catch (error) {
      console.error("Error creating Earth Globe:", error);
    }
  };

  // Добавление маркеров-капель на глобус
  useEffect(() => {
    if (!sceneRef.current || !isInitialized || resources.length === 0) return;
    
    console.log("Adding water drop markers...");
    
    // Удаляем предыдущие маркеры
    if (markersGroupRef.current) {
      sceneRef.current.remove(markersGroupRef.current);
    }
    
    // Создаем группу маркеров
    const markersGroup = new THREE.Group();
    markersGroupRef.current = markersGroup;
    
    resources.forEach((resource) => {
      const marker = createWaterDropMarker(resource);
      markersGroup.add(marker);
    });
    
    sceneRef.current.add(markersGroup);
    
    // Добавляем обработчик кликов
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
      
      const intersects = raycaster.intersectObjects(markersGroup.children);
      
      if (intersects.length > 0) {
        const clickedMarker = intersects[0].object;
        const resourceId = clickedMarker.userData?.resourceId;
        
        if (resourceId) {
          const selectedResource = resources.find(r => r.id === resourceId);
          if (selectedResource) {
            console.log("Resource selected:", selectedResource);
            onResourceSelect(selectedResource);
          }
        }
      }
    };
    
    containerRef.current?.addEventListener('click', handleClick);
    
    return () => {
      containerRef.current?.removeEventListener('click', handleClick);
    };
  }, [resources, isInitialized, onResourceSelect]);

  // Создание маркера в виде капли воды
  const createWaterDropMarker = (resource: WaterResource) => {
    // Создаем форму капли с помощью геометрии
    const dropShape = new THREE.Shape();
    dropShape.moveTo(0, 0);
    dropShape.bezierCurveTo(0, -2, -1.5, -3, -1.5, -4.5);
    dropShape.bezierCurveTo(-1.5, -6, 0, -7, 0, -7);
    dropShape.bezierCurveTo(0, -7, 1.5, -6, 1.5, -4.5);
    dropShape.bezierCurveTo(1.5, -3, 0, -2, 0, 0);
    
    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.2,
      bevelThickness: 0.2
    };
    
    const dropGeometry = new THREE.ExtrudeGeometry(dropShape, extrudeSettings);
    
    // Определяем цвет по статусу и категории
    let color = 0x3b82f6; // Синий по умолчанию
    let emissiveColor = 0x1e40af;
    
    if (resource.status === ResourceStatus.CRITICAL) {
      color = 0xef4444; // Красный
      emissiveColor = 0xdc2626;
    } else if (resource.status === ResourceStatus.NEEDS_ATTENTION) {
      color = 0xf59e0b; // Янтарный
      emissiveColor = 0xd97706;
    } else if (resource.category === ResourceCategory.INVESTMENT) {
      color = 0x06b6d4; // Циан
      emissiveColor = 0x0891b2;
    } else {
      color = 0x10b981; // Зеленый
      emissiveColor = 0x059669;
    }
    
    const dropMaterial = new THREE.MeshPhongMaterial({
      color: color,
      emissive: emissiveColor,
      emissiveIntensity: 0.3,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    
    const dropMesh = new THREE.Mesh(dropGeometry, dropMaterial);
    
    // Преобразование географических координат в 3D позицию на сфере
    const phi = (90 - resource.latitude) * (Math.PI / 180);
    const theta = (resource.longitude + 180) * (Math.PI / 180);
    
    const radius = 105; // Чуть больше радиуса Земли
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    dropMesh.position.set(x, y, z);
    
    // Поворачиваем каплю так, чтобы она "смотрела" наружу от поверхности Земли
    dropMesh.lookAt(x * 2, y * 2, z * 2);
    
    // Масштабирование в зависимости от важности
    let scale = 1;
    if (resource.status === ResourceStatus.CRITICAL) {
      scale = 1.5;
    } else if (resource.status === ResourceStatus.NEEDS_ATTENTION) {
      scale = 1.3;
    } else if (resource.category === ResourceCategory.INVESTMENT) {
      scale = 1.2;
    }
    
    dropMesh.scale.setScalar(scale);
    
    // Добавляем данные для обработки кликов
    dropMesh.userData = {
      resourceId: resource.id,
      resourceName: resource.name,
      resourceCategory: resource.category,
      resourceStatus: resource.status
    };
    
    dropMesh.castShadow = true;
    
    return dropMesh;
  };
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg bg-[#040B1B] border border-[#0d2245]">
      {/* Контейнер для 3D глобуса */}
      <div 
        ref={containerRef} 
        className="w-full h-full bg-[#040B1B]"
      />
      
      {/* Индикатор загрузки */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#040B1B]/90 z-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80">{t('globo.loadingGlobe', 'Загрузка глобуса...')}</p>
          </div>
        </div>
      )}
      
      {/* Заголовок */}
      <div className="absolute top-4 left-4 z-30 bg-black/50 p-2 rounded-md text-sm text-white/90">
        {t('globo.earthGlobe', '3D Глобус Земли')}
      </div>
      
      {/* Подсказка по управлению */}
      <div className="absolute bottom-4 right-4 z-30 bg-black/50 p-2 rounded-md text-xs text-white/70 max-w-[200px]">
        {t('globo.globeControls', 'Вращайте, масштабируйте и нажимайте на капли-маркеры')}
      </div>
      
      {/* Легенда цветов */}
      <div className="absolute top-4 right-4 z-30 bg-black/50 p-3 rounded-md text-xs text-white/70">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>{t('globo.critical', 'Критический')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>{t('globo.needsAttention', 'Требует внимания')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span>{t('globo.investment', 'Инвестиционный')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{t('globo.stable', 'Стабильный')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleGlobe;