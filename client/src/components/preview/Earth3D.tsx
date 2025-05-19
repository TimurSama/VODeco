import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Earth3DProps {
  size?: number;
  rotation?: boolean;
  crisis?: boolean; // Режим кризиса (красноватый цвет планеты)
  highlightWater?: boolean; // Подсвечивать ли водные ресурсы
}

export default function Earth3D({ 
  size = 200, 
  rotation = true,
  crisis = false,
  highlightWater = false
}: Earth3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const requestRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Инициализация THREE.js
    const container = containerRef.current;
    const width = size;
    const height = size;
    
    // Создаем сцену, камеру и рендерер
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Прозрачный фон
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Освещение
    const ambientLight = new THREE.AmbientLight(0x888888);
    scene.add(ambientLight);
    
    // Направленный свет для создания теней
    const directionalLight = new THREE.DirectionalLight(crisis ? 0xff3333 : 0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Текстуры земли
    const textureLoader = new THREE.TextureLoader();
    
    // Базовая текстура земли
    const earthTexture = textureLoader.load('/earth-globe.jpg');
    
    // Создание материала земли
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.05,
      specular: 0x222222,
      shininess: 25
    });
    
    // Если режим кризиса, добавляем красноватый оттенок
    if (crisis) {
      earthMaterial.color.set(0xff8888);
    }
    
    // Если нужно подсветить воду
    if (highlightWater) {
      earthMaterial.emissive = new THREE.Color(0x006699);
      earthMaterial.emissiveIntensity = 0.1;
    }
    
    // Создание сферы земли
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;
    
    // Добавление облаков (полупрозрачный слой)
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('/clouds.png'),
      transparent: true,
      opacity: 0.4
    });
    
    const cloudsGeometry = new THREE.SphereGeometry(1.02, 32, 32); // Чуть больше Земли
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);
    cloudsRef.current = clouds;
    
    // Анимация вращения
    const animate = () => {
      if (rotation) {
        if (earth) earth.rotation.y += 0.001;
        if (clouds) clouds.rotation.y += 0.0015;
      }
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Очистка при размонтировании
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (rendererRef.current && rendererRef.current.domElement) {
        // Отключаем рендерер
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, [size, rotation, crisis, highlightWater]);
  
  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: size, 
        height: size, 
        margin: '0 auto' 
      }}
    />
  );
}