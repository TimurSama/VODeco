import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WaterResource, ResourceStatus, ResourceCategory } from '@/types';
import { useTranslation } from 'react-i18next';

interface EarthGlobeProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
}

const EarthGlobe: React.FC<EarthGlobeProps> = ({ resources, onResourceSelect }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const globeInstanceRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    markers: THREE.Group;
    animationId: number;
  } | null>(null);

  console.log("EarthGlobe rendered with", resources.length, "resources");

  useEffect(() => {
    if (!containerRef.current) return;

    console.log("Initializing Earth Globe...");

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    console.log("Globe container size:", { width, height });

    // Создание сцены
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040B1B);

    // Создание камеры
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 200;

    // Создание рендерера
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Очистка контейнера и добавление canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Создание глобуса
    const globeGeometry = new THREE.SphereGeometry(80, 32, 32);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      shininess: 30,
      transparent: true,
      opacity: 0.9
    });

    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);

    // Атмосфера
    const atmosphereGeometry = new THREE.SphereGeometry(82, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x14b8a6,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.15
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Управление
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Группа маркеров
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);

    // Создание маркеров
    resources.forEach((resource) => {
      const marker = createDropMarker(resource);
      markersGroup.add(marker);
    });

    // Анимация
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      controls.update();
      
      // Пульсация маркеров
      const time = Date.now() * 0.001;
      markersGroup.children.forEach((marker, index) => {
        const scale = 1 + Math.sin(time * 2 + index) * 0.2;
        marker.scale.setScalar(scale);
      });

      renderer.render(scene, camera);
      
      if (globeInstanceRef.current) {
        globeInstanceRef.current.animationId = animationId;
      }
    };

    animate();

    // Обработчик кликов
    const handleClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

      const intersects = raycaster.intersectObjects(markersGroup.children);

      if (intersects.length > 0) {
        const marker = intersects[0].object;
        const resourceId = marker.userData?.resourceId;
        
        if (resourceId) {
          const resource = resources.find(r => r.id === resourceId);
          if (resource) {
            console.log("Resource selected:", resource);
            onResourceSelect(resource);
          }
        }
      }
    };

    container.addEventListener('click', handleClick);

    // Обработчик изменения размера
    const handleResize = () => {
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 600;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Сохраняем экземпляр
    globeInstanceRef.current = {
      scene,
      camera,
      renderer,
      controls,
      markers: markersGroup,
      animationId: 0
    };

    setIsLoading(false);
    console.log("Earth Globe initialized successfully");

    // Очистка
    return () => {
      console.log("Cleaning up Earth Globe");
      
      if (globeInstanceRef.current) {
        cancelAnimationFrame(globeInstanceRef.current.animationId);
      }
      
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Очистка Three.js ресурсов
      scene.traverse((object) => {
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

      renderer.dispose();
      globeInstanceRef.current = null;
    };
  }, [resources, onResourceSelect]);

  // Создание маркера в виде капли
  const createDropMarker = (resource: WaterResource) => {
    // Простая форма капли из сферы и конуса
    const dropGroup = new THREE.Group();

    // Основа капли (сфера)
    const dropGeometry = new THREE.SphereGeometry(2, 8, 8);
    
    // Цвет по статусу
    let color = 0x3b82f6;
    if (resource.status === ResourceStatus.CRITICAL) {
      color = 0xef4444;
    } else if (resource.status === ResourceStatus.NEEDS_ATTENTION) {
      color = 0xf59e0b;
    } else if (resource.category === ResourceCategory.INVESTMENT) {
      color = 0x06b6d4;
    } else {
      color = 0x10b981;
    }

    const dropMaterial = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.2,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });

    const dropMesh = new THREE.Mesh(dropGeometry, dropMaterial);
    dropGroup.add(dropMesh);

    // Хвостик капли (конус)
    const tailGeometry = new THREE.ConeGeometry(1, 3, 6);
    const tailMesh = new THREE.Mesh(tailGeometry, dropMaterial);
    tailMesh.position.y = -2.5;
    dropGroup.add(tailMesh);

    // Позиционирование на глобусе
    const phi = (90 - resource.latitude) * (Math.PI / 180);
    const theta = (resource.longitude + 180) * (Math.PI / 180);

    const radius = 85;
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    dropGroup.position.set(x, y, z);
    dropGroup.lookAt(x * 2, y * 2, z * 2);

    // Данные для кликов
    dropGroup.userData = {
      resourceId: resource.id,
      resourceName: resource.name
    };

    return dropGroup;
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg bg-[#040B1B] border border-[#0d2245]">
      {/* Контейнер для глобуса */}
      <div 
        ref={containerRef} 
        className="w-full h-full"
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
      
      {/* Управление */}
      <div className="absolute bottom-4 right-4 z-30 bg-black/50 p-2 rounded-md text-xs text-white/70 max-w-[200px]">
        {t('globo.globeControls', 'Вращайте, масштабируйте и нажимайте на капли')}
      </div>
      
      {/* Легенда */}
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

export default EarthGlobe;