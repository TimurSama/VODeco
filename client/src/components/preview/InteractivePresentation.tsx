import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as THREE from "three";
import { 
  Building, 
  Beaker, 
  Droplets, 
  Users, 
  DollarSign, 
  Settings,
  X,
  ArrowRight,
  Hexagon
} from "lucide-react";

interface InteractivePresentationProps {
  onComplete: () => void;
}

interface HexagonType {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  position: { x: number; y: number };
  content: {
    problems: string[];
    solutions: string[];
    benefits: string[];
    functions: string[];
  };
}

export default function InteractivePresentation({ onComplete }: InteractivePresentationProps) {
  const globeRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const globeObjectRef = useRef<THREE.Mesh>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [activeHexagon, setActiveHexagon] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'problems' | 'solutions' | 'benefits' | 'functions'>('problems');
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const hexagons: HexagonType[] = [
    {
      id: 'government',
      title: 'Государство',
      icon: Building,
      color: '#ff7700',
      position: { x: -200, y: -150 },
      content: {
        problems: [
          'Фальсификация данных мониторинга',
          'Проблемы управления трансграничными водами',
          'Отсутствие единой системы мониторинга',
          'Коррупционные риски в распределении ресурсов',
          'Неэффективное законодательство'
        ],
        solutions: [
          'Блокчейн для прозрачности данных',
          'Международные соглашения на базе DAO',
          'IoT-мониторинг в реальном времени',
          'Смарт-контракты для распределения',
          'Децентрализованное управление (DAO)'
        ],
        benefits: [
          'Повышение доверия граждан',
          'Снижение коррупции',
          'Эффективное управление ресурсами',
          'Улучшение международных отношений',
          'Прозрачность принятия решений'
        ],
        functions: [
          'Верификация данных через блокчейн',
          'Платформа для межгосударственного взаимодействия',
          'Инструменты для общественного контроля',
          'Автоматизация отчетности',
          'Аналитика для принятия решений'
        ]
      }
    },
    {
      id: 'science',
      title: 'Научное сообщество',
      icon: Beaker,
      color: '#8a2be2',
      position: { x: 200, y: -150 },
      content: {
        problems: [
          'Недостаток данных для исследований',
          'Сложность доступа к актуальной информации',
          'Фрагментация исследований',
          'Трудности внедрения разработок',
          'Нехватка финансирования'
        ],
        solutions: [
          'Единая база данных VODECO',
          'Открытый доступ к данным мониторинга',
          'Платформа для совместных исследований',
          'Интеграция науки и практики через DAO',
          'Краудфандинг исследований через токены'
        ],
        benefits: [
          'Ускорение научных открытий',
          'Повышение качества исследований',
          'Синергия между учеными',
          'Быстрое внедрение инноваций',
          'Привлечение инвестиций в науку'
        ],
        functions: [
          'Хранилище верифицированных данных',
          'Инструменты анализа и визуализации',
          'Площадка для публикации исследований',
          'Механизмы грантов и финансирования',
          'Инструменты для коллаборации'
        ]
      }
    },
    {
      id: 'water-objects',
      title: 'Объекты водохозяйственного комплекса',
      icon: Droplets,
      color: '#00e5ff',
      position: { x: -200, y: 150 },
      content: {
        problems: [
          'Износ инфраструктуры',
          'Низкая эффективность очистки',
          'Потери воды при транспортировке',
          'Отсутствие автоматизации',
          'Сложность мониторинга состояния'
        ],
        solutions: [
          'Модернизация с привлечением инвестиций DAO',
          'Внедрение современных технологий очистки',
          'Цифровые двойники объектов',
          'Автоматизация управления (SCADA на блокчейне)',
          'Постоянный мониторинг через IoT'
        ],
        benefits: [
          'Снижение затрат на эксплуатацию',
          'Повышение качества воды',
          'Уменьшение потерь ресурсов',
          'Оптимизация работы объектов',
          'Продление срока службы инфраструктуры'
        ],
        functions: [
          'Инвестиционная платформа для модернизации',
          'База данных технологий и подрядчиков',
          'Система предиктивного обслуживания',
          'Инструменты для цифрового моделирования',
          'Мониторинг эффективности в реальном времени'
        ]
      }
    },
    {
      id: 'users',
      title: 'Водопользователи',
      icon: Users,
      color: '#00ff88',
      position: { x: 200, y: 150 },
      content: {
        problems: [
          'Непрозрачное тарифообразование',
          'Низкое качество воды',
          'Отсутствие информации о состоянии воды',
          'Сложность влияния на управление',
          'Недостаток инструментов экономии'
        ],
        solutions: [
          'Прозрачный учет потребления на блокчейне',
          'Общественный мониторинг качества воды',
          'Доступ к данным через приложение VODECO',
          'Участие в DAO для принятия решений',
          'Рекомендации по экономии на основе ИИ'
        ],
        benefits: [
          'Справедливые тарифы',
          'Гарантия качества воды',
          'Осознанное потребление',
          'Возможность влиять на систему',
          'Экономия личных средств'
        ],
        functions: [
          'Личный кабинет с данными потребления',
          'Карта качества воды',
          'Инструменты голосования в DAO',
          'Система оповещений и рекомендаций',
          'Маркетплейс водосберегающих технологий'
        ]
      }
    },
    {
      id: 'investors',
      title: 'Инвесторы',
      icon: DollarSign,
      color: '#ffd700',
      position: { x: 0, y: -200 },
      content: {
        problems: [
          'Высокие риски инвестиций в инфраструктуру',
          'Непрозрачность проектов',
          'Сложность оценки эффективности',
          'Длительные сроки окупаемости',
          'Отсутствие ликвидных инструментов'
        ],
        solutions: [
          'Децентрализованное финансирование через DAO',
          'Прозрачность проектов на блокчейне',
          'Мониторинг KPI через смарт-контракты',
          'Токенизация активов (доходные токены VOD)',
          'Вторичный рынок токенов'
        ],
        benefits: [
          'Снижение рисков',
          'Прозрачность и контроль',
          'Объективная оценка доходности',
          'Повышение ликвидности инвестиций',
          'Участие в социально значимых проектах'
        ],
        functions: [
          'Инвестиционная платформа VODECO',
          'Инструменты анализа проектов',
          'Смарт-контракты для управления инвестициями',
          'Кошелек для токенов VOD',
          'Отчетность по проектам в реальном времени'
        ]
      }
    },
    {
      id: 'contractors',
      title: 'Подрядчики',
      icon: Settings,
      color: '#0088ff',
      position: { x: -120, y: 200 },
      content: {
        problems: [
          'Сложность выхода на рынок',
          'Непрозрачные тендеры',
          'Трудности демонстрации эффективности',
          'Недостаток информации о потребностях',
          'Сложность привлечения финансирования'
        ],
        solutions: [
          'Открытая платформа VODECO для подрядчиков',
          'Прозрачные тендеры на блокчейне',
          'Верификация эффективности технологий через IoT',
          'Доступ к базе данных проектов и потребностей',
          'Интеграция с инвестиционной платформой'
        ],
        benefits: [
          'Равный доступ к заказам',
          'Честная конкуренция',
          'Подтверждение репутации и качества',
          'Доступ к новым рынкам',
          'Возможности для роста и развития'
        ],
        functions: [
          'Реестр подрядчиков и технологий',
          'Платформа для проведения тендеров',
          'Система рейтинга и отзывов',
          'Инструменты для демонстрации кейсов',
          'Аналитика рынка и потребностей'
        ]
      }
    },
    {
      id: 'dao',
      title: 'DAO',
      icon: Hexagon,
      color: '#ff00ff',
      position: { x: 120, y: 200 },
      content: {
        problems: [
          'Централизованное принятие решений',
          'Отсутствие прозрачности в управлении',
          'Сложность координации между участниками',
          'Недостаток доверия между сторонами',
          'Неэффективность традиционных структур управления'
        ],
        solutions: [
          'Децентрализованное автономное управление',
          'Прозрачное голосование на блокчейне',
          'Смарт-контракты для автоматизации решений',
          'Токенизированная система стимулирования',
          'Открытый доступ к данным и процессам'
        ],
        benefits: [
          'Демократическое принятие решений',
          'Полная прозрачность операций',
          'Эффективная координация участников',
          'Высокий уровень доверия',
          'Быстрая адаптация к изменениям'
        ],
        functions: [
          'Платформа для голосования и предложений',
          'Система управления токенами VOD',
          'Автоматическое исполнение решений',
          'Мониторинг эффективности управления',
          'Инструменты для создания рабочих групп'
        ]
      }
    }
  ];

  // Инициализация 3D глобуса
  useEffect(() => {
    if (!globeRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      globeRef.current.clientWidth / globeRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    globeRef.current.appendChild(renderer.domElement);

    // Создание глобуса
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    const material = new THREE.MeshPhongMaterial({
      color: 0x004080,
      transparent: true,
      opacity: 0.8,
      wireframe: false
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Создание точек на глобусе (узлы сети)
    const networkNodes: THREE.Vector3[] = [];
    const nodeCount = 50;
    
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 5.1;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      networkNodes.push(new THREE.Vector3(x, y, z));
    }
    
    // Создание статических точек (узлы)
    const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.9
    });
    
    networkNodes.forEach(nodePos => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(nodePos);
      scene.add(node);
    });
    
    // Создание линий между узлами (блокчейн-паутина)
    const connections: { start: THREE.Vector3; end: THREE.Vector3; line: THREE.Line }[] = [];
    
    for (let i = 0; i < networkNodes.length; i++) {
      for (let j = i + 1; j < networkNodes.length; j++) {
        const distance = networkNodes[i].distanceTo(networkNodes[j]);
        
        // Соединяем только близкие узлы
        if (distance < 3 && Math.random() > 0.7) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            networkNodes[i],
            networkNodes[j]
          ]);
          
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00e5ff,
            transparent: true,
            opacity: 0.3
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
          
          connections.push({
            start: networkNodes[i],
            end: networkNodes[j],
            line
          });
        }
      }
    }
    
    // Создание движущихся частиц по линиям
    const particles: { 
      mesh: THREE.Mesh; 
      connection: typeof connections[0]; 
      progress: number; 
      direction: number;
      speed: number;
    }[] = [];
    
    const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 1
    });
    
    // Создаем частицы для каждого соединения
    connections.forEach(connection => {
      if (Math.random() > 0.5) { // Не все линии имеют частицы
        const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
        scene.add(particle);
        
        particles.push({
          mesh: particle,
          connection,
          progress: Math.random(),
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: 0.005 + Math.random() * 0.01
        });
      }
    });

    // Освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00e5ff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 10;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    globeObjectRef.current = globe;
    cameraRef.current = camera;

    // Анимация
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (!isDragging) {
        globe.rotation.y += 0.005;
      }
      
      // Анимация движущихся частиц
      particles.forEach(particle => {
        particle.progress += particle.speed * particle.direction;
        
        // Разворот направления на концах
        if (particle.progress >= 1) {
          particle.progress = 1;
          particle.direction = -1;
        } else if (particle.progress <= 0) {
          particle.progress = 0;
          particle.direction = 1;
        }
        
        // Обновление позиции частицы
        const { start, end } = particle.connection;
        particle.mesh.position.lerpVectors(start, end, particle.progress);
        
        // Пульсация яркости
        const opacity = 0.5 + 0.5 * Math.sin(Date.now() * 0.005 + particle.progress * Math.PI);
        (particle.mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
      });
      
      // Пульсация узлов
      scene.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && 
            child.geometry instanceof THREE.SphereGeometry &&
            child.material instanceof THREE.MeshBasicMaterial &&
            (child.material as THREE.MeshBasicMaterial).color.getHex() === 0x00e5ff) {
          const scale = 0.8 + 0.4 * Math.sin(Date.now() * 0.003 + index * 0.5);
          child.scale.setScalar(scale);
        }
      });
      
      renderer.render(scene, camera);
    };
    animate();

    // Обработка изменения размера
    const handleResize = () => {
      if (!globeRef.current) return;
      
      camera.aspect = globeRef.current.clientWidth / globeRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeRef.current && renderer.domElement) {
        globeRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDragging]);

  // Обработка перетаскивания глобуса
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !globeObjectRef.current) return;

    const deltaX = e.clientX - mousePosition.x;
    const deltaY = e.clientY - mousePosition.y;

    globeObjectRef.current.rotation.y += deltaX * 0.01;
    globeObjectRef.current.rotation.x += deltaY * 0.01;

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleHexagonClick = (hexagonId: string) => {
    setActiveHexagon(hexagonId);
    setActiveTab('problems');
  };

  const closeInfoPanel = () => {
    setActiveHexagon(null);
  };

  const getHexagonStyle = (hexagon: HexagonType) => {
    const isActive = activeHexagon === hexagon.id;
    const isInactive = activeHexagon && activeHexagon !== hexagon.id;
    
    return {
      transform: `translate(${hexagon.position.x}px, ${hexagon.position.y}px) ${
        isActive ? 'scale(1.2)' : isInactive ? 'scale(0.8)' : 'scale(1)'
      }`,
      opacity: isInactive ? 0.3 : 1,
      borderColor: hexagon.color,
      backgroundColor: isActive ? `${hexagon.color}30` : 'rgba(0, 50, 80, 0.7)',
    };
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">{/* Убрал фон, оставил только основной фон приложения */}

      {/* Заголовок */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm border-b border-primary/10">
        <div className="text-2xl font-bold text-primary">VODECO</div>
        <Button 
          onClick={onComplete}
          className="bg-primary hover:bg-primary/90 text-black font-medium"
        >
          Войти в Платформу
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </header>

      {/* Центральный контейнер с глобусом */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Глобус */}
        <div 
          ref={globeRef}
          className="w-96 h-96 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        {/* Гексагональные блоки */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {hexagons.map((hexagon) => (
            <motion.div
              key={hexagon.id}
              className="absolute w-32 h-36 cursor-pointer pointer-events-auto transition-all duration-500"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                border: '3px solid',
                backdropFilter: 'blur(3px)',
                boxShadow: `0 0 20px ${hexagon.color}40, inset 0 0 20px ${hexagon.color}20`,
                ...getHexagonStyle(hexagon)
              }}
              onClick={() => handleHexagonClick(hexagon.id)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <hexagon.icon 
                  className="w-8 h-8 mb-2" 
                  style={{ color: hexagon.color }}
                />
                <h3 className="text-xs font-medium text-white leading-tight">
                  {hexagon.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Информационная панель */}
      <AnimatePresence>
        {activeHexagon && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="absolute right-0 top-0 bottom-0 w-120 bg-black/90 backdrop-blur-lg border-l-2 border-primary z-50"
          >
            <div className="flex flex-col h-full">
              {/* Заголовок панели */}
              <div className="flex justify-between items-center p-6 border-b border-primary/20">
                <h2 className="text-xl font-bold text-primary">
                  {hexagons.find(h => h.id === activeHexagon)?.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeInfoPanel}
                  className="text-white hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Табы */}
              <div className="flex p-4 border-b border-primary/20">
                {(['problems', 'solutions', 'benefits', 'functions'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'text-primary border-primary'
                        : 'text-white/60 border-transparent hover:text-white'
                    }`}
                  >
                    {tab === 'problems' && 'Проблемы'}
                    {tab === 'solutions' && 'Решения'}
                    {tab === 'benefits' && 'Выгоды'}
                    {tab === 'functions' && 'Функции'}
                  </button>
                ))}
              </div>

              {/* Контент */}
              <div className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-3">
                  {hexagons
                    .find(h => h.id === activeHexagon)
                    ?.content[activeTab]?.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start text-white/90 leading-relaxed"
                    >
                      <span className="text-primary mr-3 mt-1">⬢</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Инструкция */}
      {!activeHexagon && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-40"
        >
          <p className="text-white/80 text-lg mb-2">
            Выберите направление, чтобы узнать больше
          </p>
          <p className="text-primary text-sm">
            Нажмите на гексагон или вращайте глобус
          </p>
        </motion.div>
      )}
    </div>
  );
}