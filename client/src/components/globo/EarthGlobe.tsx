import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WaterResource, ResourceStatus, ResourceCategory, CompletedProject } from '@/types';
import { useTranslation } from 'react-i18next';

interface EarthGlobeProps {
  resources: WaterResource[];
  completedProjects?: CompletedProject[];
  onResourceSelect: (resource: WaterResource) => void;
  onProjectSelect?: (project: CompletedProject) => void;
}

const EarthGlobe: React.FC<EarthGlobeProps> = ({ 
  resources, 
  completedProjects = [], 
  onResourceSelect, 
  onProjectSelect 
}) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<WaterResource | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const globeInstanceRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    markers: THREE.Group;
    animationId: number;
  } | null>(null);

  console.log("EarthGlobe rendered with", resources.length, "resources");
  console.log("EarthGlobe rendered with", completedProjects.length, "completed projects");

  useEffect(() => {
    if (!containerRef.current) return;

    console.log("Initializing Earth Globe...");

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    console.log("Globe container size:", { width, height });

    // Создание сцены
    const scene = new THREE.Scene();
    scene.background = null;

    // Создание камеры
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    if (width < 768) {
      camera.position.set(0, 20, 180);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.z = 200;
    }

    // Создание рендерера
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      premultipliedAlpha: false 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(100, 50, 50);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x4a9eff, 0.3);
    fillLight.position.set(-100, -50, -50);
    scene.add(fillLight);

    // Создание глобуса
    const globeGeometry = new THREE.SphereGeometry(80, 128, 128);

    const textureLoader = new THREE.TextureLoader();

    const earthDayTexture = textureLoader.load(
      'https://unpkg.com/three-globe@2/example/img/earth-blue-marble.jpg',
      (texture) => {
        console.log('Day texture loaded successfully');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading day texture:', error);
        setIsLoading(false);
      }
    );

    const earthNightTexture = textureLoader.load(
      'https://unpkg.com/three-globe@2/example/img/earth-night.jpg',
      (texture) => {
        console.log('Night texture loaded successfully');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
      }
    );

    const earthBumpTexture = textureLoader.load(
      'https://unpkg.com/three-globe@2/example/img/earth-topology.png',
      (texture) => {
        console.log('Bump texture loaded successfully');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
      }
    );

    const earthCloudsTexture = textureLoader.load(
      'https://unpkg.com/three-globe@2/example/img/earth-clouds.png',
      (texture) => {
        console.log('Clouds texture loaded successfully');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
      }
    );

    const earthSpecularTexture = textureLoader.load(
      'https://unpkg.com/three-globe@2/example/img/earth-water.png',
      (texture) => {
        console.log('Specular texture loaded successfully');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
      }
    );

    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthDayTexture,
      bumpMap: earthBumpTexture,
      bumpScale: 0.3,
      specularMap: earthSpecularTexture,
      specular: new THREE.Color(0x4444aa),
      shininess: 30,
      transparent: false,
      opacity: 1.0
    });

    let currentDistance = 200;
    let isMapMode = false;

    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);

    // Слой облаков
    const cloudsGeometry = new THREE.SphereGeometry(80.5, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: earthCloudsTexture,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(cloudsMesh);

    // Атмосфера
    const atmosphereGeometry = new THREE.SphereGeometry(82, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x87ceeb,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.15,
      emissive: 0x87ceeb,
      emissiveIntensity: 0.08
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    const outerAtmosphereGeometry = new THREE.SphereGeometry(84, 32, 32);
    const outerAtmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a9eff,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.1,
      emissive: 0x4a9eff,
      emissiveIntensity: 0.05
    });

    const outerAtmosphere = new THREE.Mesh(outerAtmosphereGeometry, outerAtmosphereMaterial);
    scene.add(outerAtmosphere);

    // Управление
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.enablePan = false;
    controls.minDistance = 90;
    controls.maxDistance = 400;
    controls.enableZoom = false; // Отключаем зум по умолчанию
    controls.zoomSpeed = 0.8;
    controls.rotateSpeed = 0.3;

    // Обработчики для контроля зума только над глобусом
    let isOverGlobe = false;

    const handleMouseEnter = () => {
      isOverGlobe = true;
      controls.enableZoom = true;
    };

    const handleMouseLeave = () => {
      isOverGlobe = false;
      controls.enableZoom = false;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isOverGlobe) {
        event.preventDefault();
        // Позволяем скроллу страницы работать
        const scrollEvent = new WheelEvent('wheel', {
          deltaY: event.deltaY,
          deltaX: event.deltaX,
          deltaZ: event.deltaZ,
          bubbles: true,
          cancelable: true
        });
        document.dispatchEvent(scrollEvent);
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Группа маркеров
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);

    // Создание маркеров для водных ресурсов
    resources.forEach((resource) => {
      const marker = createWaterDropMarker(resource);
      markersGroup.add(marker);
    });

    // Создание маркеров для завершенных проектов
    console.log("Creating markers for", completedProjects.length, "completed projects");
    completedProjects.forEach((project, index) => {
      console.log(`Project ${index + 1}:`, project.name, "at", project.latitude, project.longitude);
      if (project.latitude && project.longitude) {
        const marker = createCompletedProjectMarker(project);
        markersGroup.add(marker);
        console.log("Added completed project marker for:", project.name);
      } else {
        console.log("Missing coordinates for project:", project.name);
      }
    });

    // Анимация
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      controls.update();

      const distance = camera.position.distanceTo(globeMesh.position);

      if (distance < 150 && !isMapMode) {
        isMapMode = true;
        console.log('Switching to map mode');

        globeMaterial.map = earthNightTexture;
        globeMaterial.emissive = new THREE.Color(0x222222);
        globeMaterial.emissiveIntensity = 0.3;

        cloudsMaterial.opacity = 0.6;

        atmosphereMaterial.color.setHex(0x4a90e2);
        atmosphereMaterial.emissive.setHex(0x4a90e2);
        atmosphereMaterial.opacity = 0.25;

      } else if (distance > 180 && isMapMode) {
        isMapMode = false;
        console.log('Switching to globe mode');

        globeMaterial.map = earthDayTexture;
        globeMaterial.emissive = new THREE.Color(0x000000);
        globeMaterial.emissiveIntensity = 0;

        cloudsMaterial.opacity = 0.4;

        atmosphereMaterial.color.setHex(0x87ceeb);
        atmosphereMaterial.emissive.setHex(0x87ceeb);
        atmosphereMaterial.opacity = 0.15;
      }

      const time = Date.now() * 0.0001;
      cloudsMesh.rotation.y = time * 0.5;

      const pulseTime = Date.now() * 0.001;
      markersGroup.children.forEach((marker, index) => {
        const scale = 1 + Math.sin(pulseTime * 2 + index) * 0.2;
        marker.scale.setScalar(scale);
      });

      globeMaterial.needsUpdate = true;
      cloudsMaterial.needsUpdate = true;
      atmosphereMaterial.needsUpdate = true;

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
            setSelectedResource(resource);
            setShowPopup(true);
            onResourceSelect(resource);
          }
        }

        if (marker.userData?.projectId) {
          const project = completedProjects.find(p => p.id === marker.userData.projectId);
            if (project && onProjectSelect) {
              onProjectSelect(project);
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
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('wheel', handleWheel);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => {
                if (material.map) material.map.dispose();
                if (material.bumpMap) material.bumpMap.dispose();
                if (material.specularMap) material.specularMap.dispose();
                material.dispose();
              });
            } else {
              if (object.material.map) object.material.map.dispose();
              if (object.material.bumpMap) object.material.bumpMap.dispose();
              if (object.material.specularMap) object.material.specularMap.dispose();
              object.material.dispose();
            }
          }
        }
      });

      earthDayTexture.dispose();
      earthNightTexture.dispose();
      earthBumpTexture.dispose();
      earthCloudsTexture.dispose();
      earthSpecularTexture.dispose();

      renderer.dispose();
      globeInstanceRef.current = null;
    };
  }, [resources, completedProjects, onResourceSelect, onProjectSelect]);

  // Создание маркера в виде реалистичной капли воды
  const createWaterDropMarker = (resource: WaterResource) => {
    const dropGroup = new THREE.Group();

    // Создание формы капли воды
    const dropShape = new THREE.Shape();

    // Основная округлая часть капли
    dropShape.absarc(0, 0, 1.5, 0, Math.PI * 2, false);

    // Хвостик капли (заостренная часть снизу)
    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };

    // Основная часть капли
    const mainDropGeometry = new THREE.SphereGeometry(1.8, 16, 16);

    // Хвостик капли
    const tailGeometry = new THREE.ConeGeometry(0.8, 2.5, 12);

    // Для завершенных проектов используем шестеренку
    if (resource.category === ResourceCategory.COMPLETED || resource.status === ResourceStatus.COMPLETED) {
      return createCompletedGearMarker(resource);
    }

    // Цвет по статусу для обычных ресурсов
    let color = 0x3b82f6;
    let emissiveColor = 0x1e40af;

    if (resource.status === ResourceStatus.CRITICAL) {
      color = 0xef4444;
      emissiveColor = 0xdc2626;
    } else if (resource.status === ResourceStatus.NEEDS_ATTENTION) {
      color = 0xf59e0b;
      emissiveColor = 0xd97706;
    } else if (resource.category === ResourceCategory.INVESTMENT) {
      color = 0x06b6d4;
      emissiveColor = 0x0891b2;
    } else {
      color = 0x10b981;
      emissiveColor = 0x059669;
    }

    // Реалистичный материал воды
    const waterMaterial = new THREE.MeshPhongMaterial({
      color: color,
      emissive: emissiveColor,
      emissiveIntensity: 0.3,
      shininess: 100,
      transparent: true,
      opacity: 0.85,
      specular: 0xffffff,
      reflectivity: 0.3
    });

    // Основная часть капли
    const mainDrop = new THREE.Mesh(mainDropGeometry, waterMaterial);
    mainDrop.position.y = 0.5;
    dropGroup.add(mainDrop);

    // Хвостик капли
    const tailDrop = new THREE.Mesh(tailGeometry, waterMaterial);
    tailDrop.position.y = -1.8;
    dropGroup.add(tailDrop);

    // Блик на капле для реалистичности
    const highlightGeometry = new THREE.SphereGeometry(0.6, 8, 8);
    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });

    const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    highlight.position.set(0.5, 1, 0.5);
    dropGroup.add(highlight);

    // Позиционирование на глобусе
    const phi = (90 - resource.latitude) * (Math.PI / 180);
    const theta = (resource.longitude + 180) * (Math.PI / 180);

    const radius = 85;
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    dropGroup.position.set(x, y, z);
    dropGroup.lookAt(x * 2, y * 2, z * 2);

    // Масштабирование по важности
    let scale = 1;
    if (resource.status === ResourceStatus.CRITICAL) {
      scale = 1.4;
    } else if (resource.status === ResourceStatus.NEEDS_ATTENTION) {
      scale = 1.2;
    } else if (resource.category === ResourceCategory.INVESTMENT) {
      scale = 1.1;
    }

    dropGroup.scale.setScalar(scale);

    // Данные для кликов
    dropGroup.userData = {
      resourceId: resource.id,
      resourceName: resource.name
    };

    // Все части капли должны реагировать на клики
    mainDrop.userData = dropGroup.userData;
    tailDrop.userData = dropGroup.userData;
    highlight.userData = dropGroup.userData;

    return dropGroup;
  };

  // Создание маркера для завершенного проекта (зеленый щит)
  const createCompletedProjectMarker = (project: CompletedProject) => {
    const shieldGroup = new THREE.Group();

    // Основная форма щита
    const shieldGeometry = new THREE.CylinderGeometry(2, 2.5, 0.5, 8);
    const shieldMaterial = new THREE.MeshPhongMaterial({
      color: 0x22c55e,
      emissive: 0x15803d,
      emissiveIntensity: 0.4,
      shininess: 80,
      transparent: true,
      opacity: 0.9,
      specular: 0xffffff
    });

    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldGroup.add(shield);

    // Верхняя часть щита (корона)
    const crownGeometry = new THREE.ConeGeometry(1.5, 1.5, 6);
    const crown = new THREE.Mesh(crownGeometry, shieldMaterial);
    crown.position.y = 1;
    shieldGroup.add(crown);

    // Символ галочки в центре щита
    const checkGeometry = new THREE.BoxGeometry(0.3, 1.2, 0.2);
    const checkMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const check1 = new THREE.Mesh(checkGeometry, checkMaterial);
    check1.rotation.z = Math.PI / 4;
    check1.position.set(-0.3, -0.2, 0.3);
    shieldGroup.add(check1);

    const check2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2, 0.2), checkMaterial);
    check2.rotation.z = -Math.PI / 4;
    check2.position.set(0.5, 0.2, 0.3);
    shieldGroup.add(check2);

    // Позиционирование на глобусе
    const latRad = (project.latitude! * Math.PI) / 180;
    const lonRad = (project.longitude! * Math.PI) / 180;
    const radius = 51.5;

    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.sin(lonRad);

    shieldGroup.position.set(x, y, z);

    // Ориентация к центру Земли
    shieldGroup.lookAt(new THREE.Vector3(0, 0, 0));
    shieldGroup.rotateX(Math.PI);

    // Добавляем данные проекта
    shieldGroup.userData = { 
      type: 'completed_project', 
      project,
      projectId: project.id,
      projectName: project.name 
    };

    // Все части щита должны реагировать на клики
    shield.userData = shieldGroup.userData;
    crown.userData = shieldGroup.userData;
    check1.userData = shieldGroup.userData;
    check2.userData = shieldGroup.userData;

    return shieldGroup;
  };

  // Создание маркера в виде зеленой шестеренки для завершенных проектов
  const createCompletedGearMarker = (resource: WaterResource) => {
    const gearGroup = new THREE.Group();

    // Основная шестеренка
    const gearGeometry = new THREE.CylinderGeometry(2, 2, 0.4, 8);
    const gearMaterial = new THREE.MeshPhongMaterial({
      color: 0x22c55e,
      emissive: 0x15803d,
      emissiveIntensity: 0.4,
      shininess: 80,
      transparent: true,
      opacity: 0.9,
      specular: 0xffffff
    });

    const mainGear = new THREE.Mesh(gearGeometry, gearMaterial);
    gearGroup.add(mainGear);

    // Зубья шестеренки
    for (let i = 0; i < 8; i++) {
      const toothGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.6);
      const tooth = new THREE.Mesh(toothGeometry, gearMaterial);
      
      const angle = (i / 8) * Math.PI * 2;
      tooth.position.x = Math.cos(angle) * 2.2;
      tooth.position.z = Math.sin(angle) * 2.2;
      
      gearGroup.add(tooth);
    }

    // Центральная часть
    const centerGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.6, 16);
    const center = new THREE.Mesh(centerGeometry, gearMaterial);
    gearGroup.add(center);

    // Позиционирование на глобусе
    const latRad = (resource.latitude * Math.PI) / 180;
    const lonRad = (resource.longitude * Math.PI) / 180;
    const radius = 51.5;

    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.sin(lonRad);

    gearGroup.position.set(x, y, z);

    // Ориентация к центру Земли
    gearGroup.lookAt(new THREE.Vector3(0, 0, 0));
    gearGroup.rotateX(Math.PI);

    // Данные ресурса
    gearGroup.userData = { 
      type: 'completed_resource', 
      resource,
      resourceId: resource.id,
      resourceName: resource.name
    };

    // Все части шестеренки должны реагировать на клики
    mainGear.userData = gearGroup.userData;
    center.userData = gearGroup.userData;

    return gearGroup;
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedResource(null);
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* Контейнер глобуса */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden bg-transparent">
        <div 
          ref={containerRef} 
          className="w-full h-full"
        />

        {/* Индикатор загрузки */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="text-center bg-background/80 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-foreground">{t('globo.loadingGlobe', 'Загрузка глобуса...')}</p>
            </div>
          </div>
        )}

        {/* Легенда */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 bg-black/50 p-2 sm:p-3 rounded-md text-xs text-white/70">
          <div className="space-y-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs">{t('globo.critical', 'Критич.')}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs">{t('globo.needsAttention', 'Внимание')}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-xs">{t('globo.investment', 'Инвест.')}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">{t('globo.stable', 'Стабильн.')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup окно с полной информацией */}
      {showPopup && selectedResource && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#0a1428] to-[#1e3a8a] rounded-xl border border-[#0d2245] p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            {/* Кнопка закрытия */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-2xl z-10"
            >
              ×
            </button>

            {/* Заголовок */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedResource.name}</h2>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedResource.status === ResourceStatus.CRITICAL ? 'bg-red-500/20 text-red-400' :
                  selectedResource.status === ResourceStatus.NEEDS_ATTENTION ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {selectedResource.status === ResourceStatus.CRITICAL ? t('globo.critical', 'Критический') :
                   selectedResource.status === ResourceStatus.NEEDS_ATTENTION ? t('globo.needsAttention', 'Требует внимания') :
                   t('globo.stable', 'Стабильный')}
                </span>
                {selectedResource.category === ResourceCategory.INVESTMENT && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/20 text-cyan-400">
                    {t('globo.investment', 'Инвестиционный')}
                  </span>
                )}
              </div>
            </div>

            {/* Основная информация */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white/70 text-sm mb-1">{t('globo.location', 'Местоположение')}</h3>
                  <p className="text-white text-lg">{selectedResource.region}, {selectedResource.country}</p>
                  <p className="text-white/60 text-sm">
                    {selectedResource.latitude.toFixed(4)}°, {selectedResource.longitude.toFixed(4)}°
                  </p>
                </div>

                <div>
                  <h3 className="text-white/70 text-sm mb-1">{t('globo.qualityIndex', 'Индекс качества')}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          selectedResource.qualityIndex >= 80 ? 'bg-green-500' :
                          selectedResource.qualityIndex >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${selectedResource.qualityIndex}%` }}
                      />
                    </div>
                    <span className="text-white font-medium">{selectedResource.qualityIndex}%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-white/70 text-sm mb-1">{t('globo.flowRate', 'Расход воды')}</h3>
                  <p className="text-white text-lg">{selectedResource.flowRate} м³/с</p>
                </div>
              </div>

              <div className="space-y-4">
                {selectedResource.category === ResourceCategory.INVESTMENT && (
                  <>
                    <div>
                      <h3 className="text-white/70 text-sm mb-1">{t('globo.totalFunding', 'Общее финансирование')}</h3>
                      <p className="text-white text-lg font-semibold">${selectedResource.totalFunding?.toLocaleString()}</p>
                    </div>

                    <div>
                      <h3 className="text-white/70 text-sm mb-1">{t('globo.irr', 'Внутренняя норма доходности')}</h3>
                      <p className="text-green-400 text-lg font-semibold">{selectedResource.irr}%</p>
                    </div>

                    <div>
                      <h3 className="text-white/70 text-sm mb-1">Доступно для стейкинга</h3>
                      <p className="text-cyan-400 text-lg font-semibold">
                        ${((selectedResource.totalFunding || 0) * 0.3).toLocaleString()}
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <h3 className="text-white/70 text-sm mb-1">Последнее обновление</h3>
                  <p className="text-white/80">{new Date().toLocaleDateString('ru-RU')}</p>
                </div>
              </div>
            </div>

            {/* Описание */}
            <div className="mb-6">
              <h3 className="text-white/70 text-sm mb-2">{t('globo.description', 'Описание')}</h3>
              <p className="text-white/90 leading-relaxed">{selectedResource.description}</p>
            </div>

            {/* Интерактивные кнопки */}
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                {t('globo.viewDetails', 'Подробнее')}
              </button>

              {selectedResource.category === ResourceCategory.INVESTMENT && (
                <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
                  {t('globo.staking', 'Стейкинг')}
                </button>
              )}

              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                {t('globo.monitoring', 'Мониторинг')}
              </button>

              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                {t('globo.analytics', 'Аналитика')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarthGlobe;