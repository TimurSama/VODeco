import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WaterResource, ResourceStatus, ResourceCategory } from '@/types';
// @ts-ignore
import ThreeGlobe from 'three-globe';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Settings, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  Layers, 
  Filter,
  TrendingUp
} from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('resources');
  const [showGlobeControls, setShowGlobeControls] = useState(true);

  // Вычисление отфильтрованных ресурсов
  const filteredResources = searchTerm 
    ? resources.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : resources;

  // Функция для преобразования ресурсов в данные для глобуса
  const getGlobeData = useCallback(() => {
    return resources.map(resource => {
      // Определяем базовый цвет в зависимости от категории (Path или Investment)
      let baseColor = '#FFFFFF'; // Белый цвет для объектов "Path" (по умолчанию)
      
      if (resource.category === ResourceCategory.INVESTMENT) {
        baseColor = '#3b82f6'; // Синий цвет для объектов инвестирования
      }
      
      // Модифицируем цвет в зависимости от статуса
      let color = baseColor;
      
      if (resource.status === ResourceStatus.CRITICAL) {
        // Для критических ресурсов используем красный цвет независимо от категории
        color = '#ef4444';
      } else if (resource.status === ResourceStatus.NEEDS_ATTENTION && resource.category === ResourceCategory.INVESTMENT) {
        // Для объектов инвестирования, требующих внимания, используем желтый
        color = '#f59e0b';
      }
      
      return {
        id: resource.id,
        lat: resource.latitude,
        lng: resource.longitude,
        name: resource.name,
        region: resource.region,
        country: resource.country,
        status: resource.status,
        category: resource.category,
        irr: resource.irr,
        totalFunding: resource.totalFunding,
        availableForDAO: resource.availableForDAO,
        fundingProgress: resource.fundingProgress,
        participantsCount: resource.participantsCount,
        investmentStatus: resource.investmentStatus,
        qualityIndex: resource.qualityIndex,
        flowRate: resource.flowRate,
        color,
        altitude: 0.05,
        // Размер маркера зависит от категории и статуса
        radius: resource.category === ResourceCategory.INVESTMENT ? 
                (resource.status === ResourceStatus.CRITICAL ? 0.3 : 
                 resource.status === ResourceStatus.NEEDS_ATTENTION ? 0.25 : 0.2) :
                (resource.status === ResourceStatus.CRITICAL ? 0.25 : 
                 resource.status === ResourceStatus.NEEDS_ATTENTION ? 0.2 : 0.15),
      };
    });
  }, [resources]);

  // Инициализация сцены
  useEffect(() => {
    if (!containerRef.current) return;
    
    try {
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
    } catch (error) {
      console.error('Error setting up 3D scene:', error);
      setIsLoading(false);
    }
  }, []);
  
  // Добавление точек с ресурсами на глобус
  useEffect(() => {
    if (!globeRef.current || !sceneRef.current || isLoading) return;
    
    try {
      const points = getGlobeData();
      
      // Добавляем маркеры на глобус
      const pointsGroup = new THREE.Group();
      
      points.forEach(point => {
        // Преобразуем координаты в 3D
        const phi = (90 - point.lat) * (Math.PI / 180);
        const theta = (90 - point.lng) * (Math.PI / 180);
        
        // Создаем сферу для точки
        const geometry = new THREE.SphereGeometry(point.radius * 2, 16, 16);
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
      
      // Удаляем предыдущие маркеры, если они есть
      sceneRef.current.children.forEach(child => {
        if (child.userData && child.userData.isMarkersGroup) {
          sceneRef.current?.remove(child);
        }
      });
      
      // Пометка для дальнейшего распознавания
      pointsGroup.userData = { isMarkersGroup: true };
      sceneRef.current.add(pointsGroup);
      
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
    if (!controlsRef.current || !cameraRef.current) return;
    const currentDistance = controlsRef.current.target.distanceTo(cameraRef.current.position);
    const target = Math.max(controlsRef.current.minDistance, currentDistance * 0.8);
    controlsRef.current.dollyIn(1.2);
    controlsRef.current.update();
  };
  
  const handleZoomOut = () => {
    if (!controlsRef.current || !cameraRef.current) return;
    const currentDistance = controlsRef.current.target.distanceTo(cameraRef.current.position);
    const target = Math.min(controlsRef.current.maxDistance, currentDistance * 1.2);
    controlsRef.current.dollyOut(1.2);
    controlsRef.current.update();
  };
  
  const handleRotate = () => {
    if (!controlsRef.current) return;
    controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
  };

  return (
    <div className="relative w-full h-full">
      {/* 3D Глобус */}
      <div 
        ref={containerRef} 
        className="w-full h-full absolute top-0 left-0"
      ></div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-50">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      
      {/* Панель управления глобусом */}
      {showGlobeControls && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          <Button 
            onClick={handleZoomIn}
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
          >
            <ZoomIn size={18} />
          </Button>
          <Button 
            onClick={handleZoomOut}
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
          >
            <ZoomOut size={18} />
          </Button>
          <Button 
            onClick={handleRotate}
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
          >
            <RotateCcw size={18} />
          </Button>
        </div>
      )}
      
      {/* Боковая панель с информацией */}
      <div className="absolute top-0 left-0 h-full max-w-md p-4 z-10 custom-scrollbar">
        <Card className="bg-card/80 backdrop-blur-md h-full flex flex-col overflow-hidden">
          <CardHeader className="px-4 py-3 flex-none">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">VOD Eco Globe</CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings size={18} />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => setShowGlobeControls(!showGlobeControls)}
                >
                  <Layers size={18} />
                </Button>
              </div>
            </div>
            
            <div className="relative mt-2">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск ресурсов..."
                className="pl-9"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <Tabs
            defaultValue="resources"
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 overflow-hidden flex flex-col"
          >
            <TabsList className="grid grid-cols-3 mx-4">
              <TabsTrigger value="resources">Ресурсы</TabsTrigger>
              <TabsTrigger value="info">Детали</TabsTrigger>
              <TabsTrigger value="staking">Стейкинг</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="flex-1 overflow-auto px-4 pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Водные ресурсы</h3>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 px-2">
                      <Filter size={14} className="mr-1" />
                      Фильтр
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {filteredResources.map(resource => (
                    <Card 
                      key={resource.id}
                      className="overflow-hidden border-border hover:border-primary transition-colors cursor-pointer"
                      onClick={() => onResourceSelect(resource)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium line-clamp-1">{resource.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {resource.region}, {resource.country}
                            </p>
                          </div>
                          <Badge
                            variant={
                              resource.status === ResourceStatus.CRITICAL ? 'destructive' :
                              resource.status === ResourceStatus.NEEDS_ATTENTION ? 'warning' :
                              resource.status === ResourceStatus.STABLE ? 'success' :
                              'default'
                            }
                            className="ml-2 whitespace-nowrap"
                          >
                            {resource.status}
                          </Badge>
                        </div>
                        
                        {resource.irr !== undefined && (
                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Доходность:</span>
                              <span className="font-medium">{resource.irr}%</span>
                            </div>
                            
                            {resource.totalFunding && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Финансирование:</span>
                                <span className="font-medium">${resource.totalFunding.toLocaleString()}</span>
                              </div>
                            )}
                            
                            {resource.qualityIndex !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Качество:</span>
                                <span className="font-medium">{resource.qualityIndex}/10</span>
                              </div>
                            )}
                            
                            {resource.investmentStatus && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Статус:</span>
                                <span className="font-medium capitalize">{resource.investmentStatus}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredResources.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Ресурсы не найдены. Измените запрос поиска.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="flex-1 overflow-auto px-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-primary" />
                  <h3 className="font-medium">О проекте VOD ECO</h3>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  VOD ECO - децентрализованная платформа для управления водными ресурсами 
                  с использованием блокчейн-технологий. Наша миссия - обеспечить эффективное 
                  и устойчивое использование водных ресурсов по всему миру.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Card>
                    <CardContent className="p-3">
                      <h4 className="text-sm font-medium mb-1">Всего ресурсов</h4>
                      <p className="text-xl font-semibold">{resources.length}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3">
                      <h4 className="text-sm font-medium mb-1">Критических</h4>
                      <p className="text-xl font-semibold text-danger">
                        {resources.filter(r => r.status === ResourceStatus.CRITICAL).length}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Распределение по статусу</h4>
                  <div className="h-8 w-full rounded-md overflow-hidden flex">
                    {Object.entries(ResourceStatus).map(([key, value]) => {
                      const count = resources.filter(r => r.status === value).length;
                      const percentage = (count / resources.length) * 100;
                      const bgColor = 
                        value === ResourceStatus.CRITICAL ? 'bg-danger' :
                        value === ResourceStatus.NEEDS_ATTENTION ? 'bg-warning' :
                        value === ResourceStatus.STABLE ? 'bg-positive' :
                        'bg-primary';
                      
                      return (
                        <div 
                          key={key}
                          className={`${bgColor} h-full`}
                          style={{ width: `${percentage}%` }}
                          title={`${value}: ${count} (${percentage.toFixed(1)}%)`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Критические</span>
                    <span>Требуют внимания</span>
                    <span>Стабильные</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="staking" className="flex-1 overflow-auto px-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary" />
                  <h3 className="font-medium">Стейкинг и инвестиции</h3>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Инвестируйте в водные ресурсы и получайте пассивный доход.
                  Выберите ресурс из списка и начните стейкинг прямо сейчас.
                </p>
                
                <Card className="bg-card">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Топ проектов по доходности</h4>
                    <div className="space-y-3">
                      {resources
                        .filter(r => r.irr !== undefined)
                        .sort((a, b) => (b.irr || 0) - (a.irr || 0))
                        .slice(0, 3)
                        .map(resource => (
                          <div 
                            key={resource.id}
                            className="flex items-center justify-between py-1 border-b border-border last:border-0 cursor-pointer"
                            onClick={() => {
                              onResourceSelect(resource);
                              setActiveTab('resources');
                            }}
                          >
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-xs text-muted-foreground">{resource.region}</p>
                            </div>
                            <Badge variant="outline" className="bg-primary/10">
                              {resource.irr}% IRR
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col">
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setActiveTab('resources');
                      onResourceSelect(resources.find(r => r.irr !== undefined) || resources[0]);
                    }}
                  >
                    Инвестировать сейчас
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Выберите ресурс для просмотра подробной информации об инвестициях
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Settings панель, если включена */}
      {showSettings && (
        <div className="absolute top-0 right-0 h-full w-72 p-4 z-10">
          <Card className="bg-card/80 backdrop-blur-md h-full overflow-auto custom-scrollbar">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings size={18} />
                Настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-sm">Отображение глобуса</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Автовращение</span>
                    <Button 
                      onClick={handleRotate}
                      variant="outline"
                      size="sm"
                    >
                      Переключить
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Контроли глобуса</span>
                    <Button 
                      onClick={() => setShowGlobeControls(!showGlobeControls)}
                      variant="outline"
                      size="sm"
                    >
                      {showGlobeControls ? 'Скрыть' : 'Показать'}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-sm">Фильтры ресурсов</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Критические</span>
                    <Badge>
                      {resources.filter(r => r.status === ResourceStatus.CRITICAL).length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Требуют внимания</span>
                    <Badge variant="warning">
                      {resources.filter(r => r.status === ResourceStatus.NEEDS_ATTENTION).length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Стабильные</span>
                    <Badge variant="success">
                      {resources.filter(r => r.status === ResourceStatus.STABLE).length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Отличные</span>
                    <Badge variant="secondary">
                      {resources.filter(r => r.status === ResourceStatus.EXCELLENT).length}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
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