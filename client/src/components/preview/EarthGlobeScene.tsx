import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from 'three';
import { Button } from "@/components/ui/button";

interface EarthGlobeSceneProps {
  onContinue: () => void;
}

interface InfoWindow {
  id: string;
  title: string;
  data: string[];
  detailedData?: string[];
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const infoWindows: InfoWindow[] = [
  {
    id: 'water-resources',
    title: 'Водные ресурсы Земли',
    position: 'top-left',
    data: [
      '71% поверхности Земли покрыто водой',
      '1,386 млрд км³ - общий объем воды на планете',
      'Только 2,5% - пресная вода',
      'Лишь 0,007% - доступная пресная вода'
    ],
    detailedData: [
      'Океаны: 1,338 млрд км³ (96.5%)',
      'Ледники: 24.4 млн км³ (1.76%)',
      'Подземные воды: 23.4 млн км³ (1.69%)',
      'Поверхностные воды: 0.3 млн км³ (0.022%)'
    ]
  },
  {
    id: 'economics',
    title: 'Экономика водных ресурсов',
    position: 'top-right',
    data: [
      '4,600 км³ - ежегодное потребление воды человечеством',
      '$900 млрд - ежегодный оборот средств, связанных с водными ресурсами',
      '6% - ежегодный рост рынка водных ресурсов'
    ],
    detailedData: [
      'Сельское хозяйство: 70% потребления',
      'Промышленность: 22% потребления', 
      'Бытовое потребление: 8%',
      'Стоимость воды растет на 6-7% ежегодно'
    ]
  },
  {
    id: 'problems',
    title: 'Глобальные проблемы',
    position: 'bottom-left',
    data: [
      '40% населения мира живет в условиях водного стресса',
      '$1 трлн - ежегодный дефицит инвестиций в водную инфраструктуру',
      '30-50% - потери воды из-за устаревшего оборудования и методик',
      '20-35% - потери, связанные с коррупцией и фальсификацией данных'
    ],
    detailedData: [
      '2 млрд человек без доступа к чистой воде',
      '3.6 млрд без санитарии',
      '80% сточных вод сбрасывается без очистки',
      '2 млн смертей ежегодно от загрязненной воды'
    ]
  },
  {
    id: 'future',
    title: 'Прогнозы будущего',
    position: 'bottom-right',
    data: [
      'К 2030: 40% рост невозвратного загрязнения водных ресурсов',
      'К 2040: 700 млн человек будут вынуждены мигрировать из-за нехватки воды',
      'К 2050: 52% населения Земли будет жить в регионах с дефицитом воды'
    ],
    detailedData: [
      'Спрос на воду вырастет на 55% к 2050',
      'Дефицит воды в городах увеличится в 2 раза',
      'Инвестиции $6.7 трлн нужны до 2030',
      'Температура повысится на 1.5-2°C'
    ]
  }
];

export default function EarthGlobeScene({ onContinue }: EarthGlobeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const globeRef = useRef<THREE.Mesh>();
  const animationRef = useRef<number>();
  
  const [hoveredWindow, setHoveredWindow] = useState<string | null>(null);
  const [showDangerZones, setShowDangerZones] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Настройка сцены
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Создание глобуса
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Загрузка текстур
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/earth-day.jpg');
    const nightTexture = textureLoader.load('/earth-night.jpg');
    const bumpTexture = textureLoader.load('/earth-bump.jpg');
    
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Позиционирование камеры
    camera.position.z = 6;

    // Сохранение ссылок
    sceneRef.current = scene;
    rendererRef.current = renderer;
    globeRef.current = globe;

    // Анимация вращения
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      if (globe) {
        globe.rotation.y += 0.005;
      }
      
      renderer.render(scene, camera);
    };

    // Анимация появления глобуса
    globe.scale.set(0, 0, 0);
    const startTime = Date.now();
    const animateAppearance = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / 2000, 1); // 2 секунды
      const scale = progress;
      
      globe.scale.set(scale, scale, scale);
      
      if (progress < 1) {
        requestAnimationFrame(animateAppearance);
      } else {
        animate();
      }
    };
    
    animateAppearance();

    // Обработка изменения размера окна
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    // Показать зоны опасности при наведении на проблемы
    if (hoveredWindow === 'problems' || hoveredWindow === 'future') {
      setShowDangerZones(true);
    } else {
      setShowDangerZones(false);
    }
  }, [hoveredWindow]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D глобус */}
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Зоны опасности на глобусе */}
      {showDangerZones && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Красные зоны (критические) */}
          <div className="absolute w-8 h-8 bg-red-500 rounded-full opacity-60 animate-pulse"
               style={{ top: '30%', left: '45%' }} /> {/* Африка */}
          <div className="absolute w-6 h-6 bg-red-500 rounded-full opacity-60 animate-pulse"
               style={{ top: '40%', left: '70%' }} /> {/* Индия */}
          <div className="absolute w-10 h-10 bg-red-500 rounded-full opacity-60 animate-pulse"
               style={{ top: '35%', left: '15%' }} /> {/* Ближний Восток */}
          
          {/* Оранжевые зоны (риск) */}
          <div className="absolute w-6 h-6 bg-orange-500 rounded-full opacity-50 animate-pulse"
               style={{ top: '25%', left: '25%' }} /> {/* Европа */}
          <div className="absolute w-8 h-8 bg-orange-500 rounded-full opacity-50 animate-pulse"
               style={{ top: '45%', left: '85%' }} /> {/* Китай */}
          <div className="absolute w-7 h-7 bg-orange-500 rounded-full opacity-50 animate-pulse"
               style={{ top: '50%', left: '10%' }} /> {/* Южная Америка */}
        </div>
      )}

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Водный кризис - одна из самых серьезных угроз человечеству в 21 веке
        </h1>
        <p className="text-lg text-cyan-200">
          Но у нас есть революционное решение
        </p>
      </motion.div>

      {/* Информационные окна */}
      {infoWindows.map((window, index) => (
        <motion.div
          key={window.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3 + index * 0.2, duration: 0.6 }}
          className={`absolute w-72 p-4 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-cyan-500/30 z-10 cursor-pointer transition-all duration-300 ${
            hoveredWindow === window.id ? 'bg-slate-700/95 border-cyan-400/50 shadow-xl' : ''
          } ${
            window.position === 'top-left' ? 'top-20 left-4' :
            window.position === 'top-right' ? 'top-20 right-4' :
            window.position === 'bottom-left' ? 'bottom-20 left-4' :
            'bottom-20 right-4'
          }`}
          onMouseEnter={() => setHoveredWindow(window.id)}
          onMouseLeave={() => setHoveredWindow(null)}
        >
          <h3 className="text-lg font-bold text-cyan-300 mb-3">{window.title}</h3>
          <div className="space-y-2">
            {(hoveredWindow === window.id && window.detailedData ? window.detailedData : window.data).map((item, i) => (
              <p key={i} className="text-sm text-white">{item}</p>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Кнопка продолжить */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <Button
          onClick={onContinue}
          size="lg"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
        >
          Продолжить
        </Button>
      </motion.div>
    </div>
  );
}