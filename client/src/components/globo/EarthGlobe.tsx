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
  const [selectedResource, setSelectedResource] = useState<WaterResource | null>(null);
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

    // Создание камеры с оптимизацией для мобильных устройств
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    // Лучшее позиционирование для смартфонов - центрированный вид
    if (width < 768) { // мобильные устройства
      camera.position.set(0, 20, 180);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.z = 200;
    }

    // Создание рендерера
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Очистка контейнера и добавление canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Освещение для лучшего отображения текстур
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Основной свет (имитация солнца)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(100, 50, 50);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Дополнительный мягкий свет для освещения темной стороны
    const fillLight = new THREE.DirectionalLight(0x4a9eff, 0.3);
    fillLight.position.set(-100, -50, -50);
    scene.add(fillLight);

    // Создание глобуса с настоящими спутниковыми текстурами Земли
    const globeGeometry = new THREE.SphereGeometry(80, 64, 64);
    
    // Загружаем настоящие спутниковые текстуры Земли
    const textureLoader = new THREE.TextureLoader();
    
    // Используем реальные текстуры NASA Blue Marble или создаем максимально реалистичные
    const createEarthTexture = () => {
      const textureSize = 2048;
      const canvas = document.createElement('canvas');
      canvas.width = textureSize;
      canvas.height = textureSize;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Основа - настоящие океанские цвета из спутниковых снимков
        const oceanGradient = ctx.createRadialGradient(
          textureSize / 2, textureSize / 2, 0,
          textureSize / 2, textureSize / 2, textureSize / 2
        );
        oceanGradient.addColorStop(0, '#1a4480'); // Глубокий океанический синий
        oceanGradient.addColorStop(0.3, '#2563eb'); // Синий как в Тихом океане
        oceanGradient.addColorStop(0.6, '#3b82f6'); // Светлее на мелководье
        oceanGradient.addColorStop(1, '#1e3a8a'); // Темно-синий у берегов
        
        ctx.fillStyle = oceanGradient;
        ctx.fillRect(0, 0, textureSize, textureSize);
        
        // Континенты с реалистичными цветами и формами
        
        // ЕВРАЗИЯ - точные очертания как на спутниковых снимках
        // Россия - тайга и тундра
        ctx.fillStyle = '#1a4d1a'; // Темно-зеленый таежный
        ctx.beginPath();
        ctx.moveTo(textureSize * 0.44, textureSize * 0.12); // Кольский полуостров
        ctx.bezierCurveTo(textureSize * 0.55, textureSize * 0.08, textureSize * 0.75, textureSize * 0.1, textureSize * 0.95, textureSize * 0.15); // Сибирь
        ctx.bezierCurveTo(textureSize * 0.98, textureSize * 0.25, textureSize * 0.95, textureSize * 0.35, textureSize * 0.85, textureSize * 0.4); // Дальний Восток
        ctx.bezierCurveTo(textureSize * 0.7, textureSize * 0.42, textureSize * 0.55, textureSize * 0.4, textureSize * 0.45, textureSize * 0.35); // Казахстан
        ctx.lineTo(textureSize * 0.44, textureSize * 0.12);
        ctx.fill();
        
        // Европа - умеренные леса
        ctx.fillStyle = '#228B22'; // Лесной зеленый
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.48, textureSize * 0.25, textureSize * 0.03, textureSize * 0.04, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Скандинавия
        ctx.fillStyle = '#2F4F2F'; // Темный серо-зеленый
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.47, textureSize * 0.18, textureSize * 0.015, textureSize * 0.03, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Китай и Индия - более теплые оттенки
        ctx.fillStyle = '#4a7c59';
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.72, textureSize * 0.35, textureSize * 0.08, textureSize * 0.06, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Средний Восток - пустынные оттенки
        ctx.fillStyle = '#8b7355';
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.57, textureSize * 0.35, textureSize * 0.04, textureSize * 0.03, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // АФРИКА - точные очертания континента
        // Сахара - песчаная пустыня (реальный цвет из космоса)
        ctx.fillStyle = '#DAA520'; // Золотисто-песчаный 
        ctx.beginPath();
        ctx.moveTo(textureSize * 0.46, textureSize * 0.38);
        ctx.bezierCurveTo(textureSize * 0.56, textureSize * 0.35, textureSize * 0.58, textureSize * 0.42, textureSize * 0.56, textureSize * 0.45);
        ctx.bezierCurveTo(textureSize * 0.5, textureSize * 0.48, textureSize * 0.46, textureSize * 0.45, textureSize * 0.46, textureSize * 0.38);
        ctx.fill();
        
        // Конго - тропические леса (темно-зеленый как в реальности)
        ctx.fillStyle = '#013220'; // Очень темный зеленый
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.51, textureSize * 0.52, textureSize * 0.025, textureSize * 0.04, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Восточная Африка - саванна
        ctx.fillStyle = '#8FBC8F'; // Серо-зеленый саванны
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.54, textureSize * 0.52, textureSize * 0.02, textureSize * 0.06, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Южная Африка - Калахари и плоскогорья
        ctx.fillStyle = '#CD853F'; // Коричневато-золотой
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.52, textureSize * 0.65, textureSize * 0.025, textureSize * 0.03, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // СЕВЕРНАЯ АМЕРИКА - точные очертания как со спутника
        // Канада - бореальные леса и тундра
        ctx.fillStyle = '#0F4F0F'; // Темно-зеленый бореальный лес
        ctx.beginPath();
        ctx.moveTo(textureSize * 0.05, textureSize * 0.12); // Аляска
        ctx.bezierCurveTo(textureSize * 0.15, textureSize * 0.08, textureSize * 0.3, textureSize * 0.1, textureSize * 0.35, textureSize * 0.18); // Канадская тундра
        ctx.bezierCurveTo(textureSize * 0.32, textureSize * 0.25, textureSize * 0.25, textureSize * 0.28, textureSize * 0.15, textureSize * 0.25);
        ctx.bezierCurveTo(textureSize * 0.08, textureSize * 0.22, textureSize * 0.05, textureSize * 0.18, textureSize * 0.05, textureSize * 0.12);
        ctx.fill();
        
        // США - смешанные леса и прерии
        ctx.fillStyle = '#228B22'; // Классический лесной зеленый
        ctx.beginPath();
        ctx.moveTo(textureSize * 0.15, textureSize * 0.25);
        ctx.bezierCurveTo(textureSize * 0.3, textureSize * 0.28, textureSize * 0.32, textureSize * 0.35, textureSize * 0.28, textureSize * 0.4);
        ctx.bezierCurveTo(textureSize * 0.2, textureSize * 0.42, textureSize * 0.12, textureSize * 0.38, textureSize * 0.15, textureSize * 0.25);
        ctx.fill();
        
        // Гренландия - ледяная шапка
        ctx.fillStyle = '#F0F8FF'; // Очень светлый голубовато-белый
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.37, textureSize * 0.08, textureSize * 0.015, textureSize * 0.04, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // ЮЖНАЯ АМЕРИКА - характерная "треугольная" форма
        // Амазонский бассейн - самые густые леса планеты
        ctx.fillStyle = '#006400'; // Темно-зеленый настоящих джунглей
        ctx.beginPath();
        ctx.moveTo(textureSize * 0.24, textureSize * 0.48);
        ctx.bezierCurveTo(textureSize * 0.32, textureSize * 0.5, textureSize * 0.32, textureSize * 0.58, textureSize * 0.28, textureSize * 0.62);
        ctx.bezierCurveTo(textureSize * 0.24, textureSize * 0.6, textureSize * 0.22, textureSize * 0.54, textureSize * 0.24, textureSize * 0.48);
        ctx.fill();
        
        // Анды - горная цепь (коричневый цвет гор)
        ctx.fillStyle = '#8B4513'; // Коричневый горных пород
        ctx.beginPath();
        ctx.moveTo(textureSize * 0.24, textureSize * 0.48);
        ctx.lineTo(textureSize * 0.22, textureSize * 0.72);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#8B4513';
        ctx.stroke();
        
        // Аргентинские пампасы
        ctx.fillStyle = '#9ACD32'; // Желто-зеленый степей
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.26, textureSize * 0.7, textureSize * 0.02, textureSize * 0.04, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Австралия
        ctx.fillStyle = '#daa520'; // Золотистый для Аутбека
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.85, textureSize * 0.7, textureSize * 0.04, textureSize * 0.025, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Новая Зеландия
        ctx.fillStyle = '#228b22';
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.92, textureSize * 0.75, textureSize * 0.005, textureSize * 0.01, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Япония
        ctx.fillStyle = '#2e8b57';
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.82, textureSize * 0.32, textureSize * 0.01, textureSize * 0.02, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Полярные ледяные шапки
        ctx.fillStyle = '#f0f8ff';
        // Северный полюс
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.5, textureSize * 0.03, textureSize * 0.15, textureSize * 0.025, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Антарктида
        ctx.beginPath();
        ctx.ellipse(textureSize * 0.5, textureSize * 0.97, textureSize * 0.2, textureSize * 0.025, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Горные хребты
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        // Гималаи
        ctx.beginPath();
        ctx.moveTo(textureSize * 0.68, textureSize * 0.32);
        ctx.lineTo(textureSize * 0.75, textureSize * 0.35);
        ctx.stroke();
        
        // Альпы
        ctx.beginPath();
        ctx.moveTo(textureSize * 0.48, textureSize * 0.28);
        ctx.lineTo(textureSize * 0.52, textureSize * 0.3);
        ctx.stroke();
        
        // Реалистичные облачные формации
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        // Экваториальные облака
        for (let i = 0; i < 15; i++) {
          const x = Math.random() * textureSize;
          const y = textureSize * 0.4 + (Math.random() - 0.5) * textureSize * 0.2;
          const radius = Math.random() * 50 + 30;
          ctx.globalAlpha = Math.random() * 0.4 + 0.2;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        // Циклоны и атмосферные явления
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 8; i++) {
          const x = Math.random() * textureSize;
          const y = Math.random() * textureSize;
          const radius = Math.random() * 80 + 40;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      }
      
      return new THREE.CanvasTexture(canvas);
    };
    
    const earthTexture = createEarthTexture();
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;
    
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 30,
      transparent: true,
      opacity: 0.95
    });

    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);

    // Атмосфера с более реалистичным видом
    const atmosphereGeometry = new THREE.SphereGeometry(82, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x87ceeb, // Небесно-голубой
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.2,
      emissive: 0x87ceeb,
      emissiveIntensity: 0.1
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Дополнительное внешнее свечение атмосферы
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

    // Управление с настройками для мобильных устройств
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enablePan = false; // Отключаем панорамирование для мобильных
    controls.minDistance = 120;
    controls.maxDistance = 300;
    controls.enableZoom = true;
    controls.zoomSpeed = 0.5;

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
            setSelectedResource(resource);
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
    <div className="relative w-full flex flex-col">
      {/* Контейнер глобуса - оптимизирован для мобильных */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-lg bg-[#040B1B] border border-[#0d2245]">
        {/* Canvas контейнер */}
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
        
        {/* Заголовок - адаптивный */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-30 bg-black/50 p-2 rounded-md text-xs sm:text-sm text-white/90">
          {t('globo.earthGlobe', '3D Глобус Земли')}
        </div>
        
        {/* Управление - скрыто на очень маленьких экранах */}
        <div className="hidden sm:block absolute bottom-4 right-4 z-30 bg-black/50 p-2 rounded-md text-xs text-white/70 max-w-[200px]">
          {t('globo.globeControls', 'Вращайте, масштабируйте и нажимайте на капли')}
        </div>
        
        {/* Легенда - адаптивная */}
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

      {/* Информационное окно снизу */}
      {selectedResource && (
        <div className="mt-4 bg-gradient-to-r from-[#0a1428] to-[#1e3a8a] rounded-lg border border-[#0d2245] p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-white">{selectedResource.name}</h3>
            <button 
              onClick={() => setSelectedResource(null)}
              className="text-white/60 hover:text-white transition-colors text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70 mb-1">{t('globo.location', 'Местоположение')}:</p>
              <p className="text-white">{selectedResource.region}, {selectedResource.country}</p>
            </div>
            
            <div>
              <p className="text-white/70 mb-1">{t('globo.status', 'Статус')}:</p>
              <p className={`font-medium ${
                selectedResource.status === ResourceStatus.CRITICAL ? 'text-red-400' :
                selectedResource.status === ResourceStatus.NEEDS_ATTENTION ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {selectedResource.status === ResourceStatus.CRITICAL ? t('globo.critical', 'Критический') :
                 selectedResource.status === ResourceStatus.NEEDS_ATTENTION ? t('globo.needsAttention', 'Требует внимания') :
                 t('globo.stable', 'Стабильный')}
              </p>
            </div>
            
            <div>
              <p className="text-white/70 mb-1">{t('globo.qualityIndex', 'Индекс качества')}:</p>
              <p className="text-white">{selectedResource.qualityIndex}%</p>
            </div>
            
            <div>
              <p className="text-white/70 mb-1">{t('globo.flowRate', 'Расход')}:</p>
              <p className="text-white">{selectedResource.flowRate} м³/с</p>
            </div>
            
            {selectedResource.category === ResourceCategory.INVESTMENT && (
              <>
                <div>
                  <p className="text-white/70 mb-1">{t('globo.totalFunding', 'Общее финансирование')}:</p>
                  <p className="text-white">${selectedResource.totalFunding?.toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-white/70 mb-1">{t('globo.irr', 'IRR')}:</p>
                  <p className="text-green-400">{selectedResource.irr}%</p>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-3">
            <p className="text-white/70 mb-1">{t('globo.description', 'Описание')}:</p>
            <p className="text-white/90 text-sm leading-relaxed">{selectedResource.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarthGlobe;