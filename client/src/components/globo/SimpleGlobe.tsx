import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WaterResource, ResourceStatus, ResourceCategory } from '@/types';

interface SimpleGlobeProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
}

const SimpleGlobe: React.FC<SimpleGlobeProps> = ({ resources, onResourceSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  console.log("SimpleGlobe rendered with", resources.length, "resources");

  // Инициализация базовой сцены
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
      
      // Создаем рендерер
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      
      // Очищаем контейнер если в нем что-то есть
      while(containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Добавляем освещение
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      // Создаем управление камерой
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controlsRef.current = controls;
      
      // Создаем базовый глобус
      createGlobe(scene);
      
      // Добавляем маркеры ресурсов
      addResourceMarkers(scene);
      
      // Анимационный цикл
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
      
      // Обработчик изменения размера окна
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight || 500;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      
      setIsInitialized(true);
      console.log("SimpleGlobe initialization complete");
      
      // Очистка при размонтировании
      return () => {
        console.log("Cleaning up SimpleGlobe");
        window.removeEventListener('resize', handleResize);
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
      
      // Создаем земной шар с текстурой ночной земли
      const earthGeometry = new THREE.SphereGeometry(100, 64, 64);
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg'),
        bumpMap: textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg'),
        bumpScale: 0.8,
        specularMap: textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png'),
        specular: new THREE.Color(0x2d4ea0),
        shininess: 6
      });
      
      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earthMesh);
      
      // Добавляем атмосферу (свечение)
      const atmosphereGeometry = new THREE.SphereGeometry(102, 64, 64);
      const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x14b8a6,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.15
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
        let size = 0.5;
        
        if (resource.category === ResourceCategory.INVESTMENT) {
          color = 0x3b82f6; // Синий для инвестиционных объектов
          size = 0.8;
        }
        
        // Модифицируем цвет в зависимости от статуса
        if (resource.status === ResourceStatus.CRITICAL) {
          color = 0xef4444; // Красный для критических
          size *= 1.5;
        } else if (resource.status === ResourceStatus.NEEDS_ATTENTION) {
          if (resource.category === ResourceCategory.INVESTMENT) {
            color = 0xf59e0b; // Янтарный для инвестиционных, требующих внимания
          }
          size *= 1.2;
        }
        
        // Создаем маркер
        const markerGeometry = new THREE.SphereGeometry(size, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color });
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