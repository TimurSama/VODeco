import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WaterResource, ResourceStatus } from '@/types';
// @ts-ignore
import ThreeGlobe from 'three-globe';

interface GlobeVisualizationProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ resources, onResourceSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Функция для преобразования ресурсов в данные для глобуса
  const getGlobeData = useCallback(() => {
    return resources.map(resource => {
      // Цвет в зависимости от статуса
      let color = '#14b8a6'; // Default turquoise
      
      if (resource.status === ResourceStatus.CRITICAL) {
        color = '#ef4444'; // Red for critical
      } else if (resource.status === ResourceStatus.WARNING) {
        color = '#f59e0b'; // Amber for warning
      } else if (resource.status === ResourceStatus.STABLE) {
        color = '#10b981'; // Green for stable
      }
      
      return {
        id: resource.id,
        lat: resource.latitude,
        lng: resource.longitude,
        name: resource.name,
        region: resource.region,
        country: resource.country,
        status: resource.status,
        irr: resource.irr,
        totalFunding: resource.investmentVolume,
        color
      };
    });
  }, [resources]);

  // Инициализация сцены
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Создаем сцену
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#040B1B'); // Темный космос
    sceneRef.current = scene;
    
    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 300;
    cameraRef.current = camera;
    
    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Очищаем контейнер если в нем уже что-то есть
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Создаем управление камерой
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 120;
    controls.maxDistance = 400;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Создаем глобус
    try {
      // @ts-ignore
      const Globe = new ThreeGlobe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .atmosphereColor('#14b8a6')
        .atmosphereAltitude(0.15);
      
      Globe.scale.set(100, 100, 100);
      scene.add(Globe);
      globeRef.current = Globe;
    } catch (error) {
      console.error('Error initializing globe:', error);
    }
    
    // Анимация
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Обработка ресайза окна
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    setIsLoading(false);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  // Добавление точек с ресурсами на глобус
  useEffect(() => {
    if (!globeRef.current || isLoading) return;
    
    try {
      const points = getGlobeData();
      
      // Добавляем маркеры на глобус
      const pointsMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pointsGroup = new THREE.Group();
      
      points.forEach(point => {
        // Преобразуем координаты в 3D
        const phi = (90 - point.lat) * (Math.PI / 180);
        const theta = (90 - point.lng) * (Math.PI / 180);
        
        // Создаем сферу для точки
        const geometry = new THREE.SphereGeometry(1, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(point.color) });
        const sphere = new THREE.Mesh(geometry, material);
        
        // Размещаем на глобусе
        const radius = 102; // Чуть больше радиуса глобуса, чтобы выступало
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        sphere.position.set(x, y, z);
        
        // Добавляем данные для идентификации
        sphere.userData = { id: point.id };
        
        pointsGroup.add(sphere);
      });
      
      if (sceneRef.current) {
        // Удаляем предыдущие маркеры, если они есть
        sceneRef.current.children.forEach(child => {
          if (child.userData && child.userData.isMarkersGroup) {
            sceneRef.current?.remove(child);
          }
        });
        
        // Пометка для дальнейшего распознавания
        pointsGroup.userData = { isMarkersGroup: true };
        sceneRef.current.add(pointsGroup);
      }
      
      // Обработчик клика
      const handleClick = (event: MouseEvent) => {
        if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
        
        // Нормализованные координаты мыши
        const rect = containerRef.current.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        );
        
        // Рейкаст для определения пересечения с объектами
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, cameraRef.current);
        
        // Получаем все объекты в сцене
        const allObjects: THREE.Object3D[] = [];
        sceneRef.current.traverse(object => {
          if (object instanceof THREE.Mesh && object.userData && object.userData.id) {
            allObjects.push(object);
          }
        });
        
        // Проверяем пересечения
        const intersects = raycaster.intersectObjects(allObjects, false);
        
        if (intersects.length > 0) {
          const clickedObject = intersects[0].object;
          const resourceId = clickedObject.userData?.id;
          
          if (resourceId) {
            const resource = resources.find(r => r.id === resourceId);
            if (resource) {
              onResourceSelect(resource);
            }
          }
        }
      };
      
      // Удаляем предыдущий обработчик
      containerRef.current?.removeEventListener('click', handleClick);
      containerRef.current?.addEventListener('click', handleClick);
      
      return () => {
        containerRef.current?.removeEventListener('click', handleClick);
      };
      
    } catch (error) {
      console.error('Error adding points to globe:', error);
    }
  }, [resources, isLoading, getGlobeData, onResourceSelect]);
  
  // Изменение масштаба
  const handleZoomIn = () => {
    if (!controlsRef.current) return;
    const target = Math.max(controlsRef.current.minDistance, controlsRef.current.target.distanceTo(cameraRef.current!.position) * 0.8);
    controlsRef.current.dollyIn(1.2);
    controlsRef.current.update();
  };
  
  const handleZoomOut = () => {
    if (!controlsRef.current) return;
    const target = Math.min(controlsRef.current.maxDistance, controlsRef.current.target.distanceTo(cameraRef.current!.position) * 1.2);
    controlsRef.current.dollyOut(1.2);
    controlsRef.current.update();
  };
  
  const handleRotate = () => {
    if (!controlsRef.current) return;
    controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
  };
  
  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full absolute top-0 left-0"></div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn}
          className="p-2 bg-card border border-border rounded-full shadow-lg hover:bg-muted transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M11 8v6"/><path d="M8 11h6"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 bg-card border border-border rounded-full shadow-lg hover:bg-muted transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M8 11h6"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
        <button 
          onClick={handleRotate}
          className="p-2 bg-card border border-border rounded-full shadow-lg hover:bg-muted transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
      </div>
      
      <style>{`
        .globe-tooltip {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #14b8a6;
          border-radius: 4px;
          color: white;
          padding: 8px 12px;
          font-family: system-ui, sans-serif;
          font-size: 14px;
          position: absolute;
          pointer-events: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 100;
        }
        
        .globe-tooltip-header {
          font-weight: bold;
          margin-bottom: 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 4px;
        }
        
        .globe-tooltip-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
      `}</style>
    </div>
  );
};

export default GlobeVisualization;