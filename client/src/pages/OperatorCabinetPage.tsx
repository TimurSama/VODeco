import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, Zap, Wrench, AlertTriangle, Activity,
  Gauge, Thermometer, Droplets, Power, Wifi,
  CheckCircle, Clock, XCircle, MapPin, Calendar
} from "lucide-react";

// Типы данных для операторского кабинета
interface WaterStation {
  id: string;
  name: string;
  nameEn: string;
  type: 'pumping' | 'treatment' | 'distribution' | 'monitoring';
  location: string;
  status: 'operational' | 'maintenance' | 'offline' | 'emergency';
  capacity: number;
  currentFlow: number;
  efficiency: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
  coordinates: { lat: number; lng: number };
}

interface Equipment {
  id: string;
  name: string;
  nameEn: string;
  stationId: string;
  type: 'pump' | 'filter' | 'sensor' | 'valve' | 'motor';
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  health: number;
  temperature: number;
  pressure: number;
  vibration: number;
  lastCheck: Date;
  alertLevel: 'none' | 'warning' | 'critical';
}

interface MaintenanceTask {
  id: string;
  title: string;
  titleEn: string;
  equipmentId: string;
  type: 'preventive' | 'corrective' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  scheduledDate: Date;
  estimatedDuration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
  descriptionEn: string;
}

const mockStations: WaterStation[] = [
  {
    id: '1',
    name: 'Насосная станция Ташкент-1',
    nameEn: 'Tashkent-1 Pumping Station',
    type: 'pumping',
    location: 'г. Ташкент, ул. Водопроводная, 12',
    status: 'operational',
    capacity: 5000,
    currentFlow: 4200,
    efficiency: 84,
    lastMaintenance: new Date(2024, 3, 15),
    nextMaintenance: new Date(2024, 6, 15),
    coordinates: { lat: 41.2995, lng: 69.2401 }
  },
  {
    id: '2',
    name: 'Очистные сооружения Самарканд',
    nameEn: 'Samarkand Treatment Plant',
    type: 'treatment',
    location: 'г. Самарканд, промзона Север',
    status: 'maintenance',
    capacity: 8000,
    currentFlow: 0,
    efficiency: 0,
    lastMaintenance: new Date(2024, 4, 20),
    nextMaintenance: new Date(2024, 4, 25),
    coordinates: { lat: 39.6542, lng: 66.9597 }
  },
  {
    id: '3',
    name: 'Распределительная станция Бухара',
    nameEn: 'Bukhara Distribution Station',
    type: 'distribution',
    location: 'г. Бухара, центральный район',
    status: 'operational',
    capacity: 3000,
    currentFlow: 2800,
    efficiency: 93,
    lastMaintenance: new Date(2024, 2, 10),
    nextMaintenance: new Date(2024, 5, 10),
    coordinates: { lat: 39.7675, lng: 64.4286 }
  }
];

const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Центробежный насос №1',
    nameEn: 'Centrifugal Pump #1',
    stationId: '1',
    type: 'pump',
    status: 'running',
    health: 87,
    temperature: 65,
    pressure: 4.2,
    vibration: 2.1,
    lastCheck: new Date(),
    alertLevel: 'none'
  },
  {
    id: '2',
    name: 'Песочный фильтр А',
    nameEn: 'Sand Filter A',
    stationId: '2',
    type: 'filter',
    status: 'maintenance',
    health: 45,
    temperature: 22,
    pressure: 0,
    vibration: 0,
    lastCheck: new Date(2024, 4, 20),
    alertLevel: 'warning'
  },
  {
    id: '3',
    name: 'Датчик давления №5',
    nameEn: 'Pressure Sensor #5',
    stationId: '3',
    type: 'sensor',
    status: 'error',
    health: 12,
    temperature: 28,
    pressure: 0,
    vibration: 0,
    lastCheck: new Date(2024, 4, 18),
    alertLevel: 'critical'
  }
];

const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: '1',
    title: 'Замена фильтрующих элементов',
    titleEn: 'Replace Filter Elements',
    equipmentId: '2',
    type: 'preventive',
    priority: 'medium',
    assignedTo: 'Иванов А.С.',
    scheduledDate: new Date(2024, 4, 25),
    estimatedDuration: 4,
    status: 'scheduled',
    description: 'Плановая замена песочных фильтров согласно регламенту',
    descriptionEn: 'Scheduled replacement of sand filters according to regulations'
  },
  {
    id: '2',
    title: 'Ремонт датчика давления',
    titleEn: 'Pressure Sensor Repair',
    equipmentId: '3',
    type: 'corrective',
    priority: 'high',
    assignedTo: 'Петров В.М.',
    scheduledDate: new Date(2024, 4, 23),
    estimatedDuration: 2,
    status: 'in-progress',
    description: 'Замена неисправного датчика давления',
    descriptionEn: 'Replacement of faulty pressure sensor'
  }
];

export default function OperatorCabinetPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const isRussian = i18n.language === 'ru';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': case 'running': case 'completed': return 'text-green-400';
      case 'maintenance': case 'stopped': case 'scheduled': case 'in-progress': return 'text-yellow-400';
      case 'offline': case 'error': case 'cancelled': return 'text-red-400';
      case 'emergency': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': case 'running': case 'completed': 
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'maintenance': case 'stopped': case 'scheduled': case 'in-progress': 
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'offline': case 'error': case 'cancelled': 
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'emergency': 
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      default: 
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAlertColor = (alert: string) => {
    switch (alert) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'none': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStationTypeIcon = (type: string) => {
    switch (type) {
      case 'pumping': return <Zap className="h-5 w-5" />;
      case 'treatment': return <Droplets className="h-5 w-5" />;
      case 'distribution': return <Activity className="h-5 w-5" />;
      case 'monitoring': return <Gauge className="h-5 w-5" />;
      default: return <Settings className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Заголовок */}
      <div className="flex items-center gap-4">
        <div className="hexagon h-16 w-16 bg-gradient-to-r from-orange-500 to-red-600 
          flex items-center justify-center">
          <Settings className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t('operator.title', 'Операторский кабинет')}
          </h1>
          <p className="text-white/70">
            {t('operator.subtitle', 'Управление водными ресурсами и техническое обслуживание')}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-background/20">
          <TabsTrigger value="dashboard">{t('operator.tabs.dashboard', 'Панель')}</TabsTrigger>
          <TabsTrigger value="stations">{t('operator.tabs.stations', 'Станции')}</TabsTrigger>
          <TabsTrigger value="equipment">{t('operator.tabs.equipment', 'Оборудование')}</TabsTrigger>
          <TabsTrigger value="maintenance">{t('operator.tabs.maintenance', 'Обслуживание')}</TabsTrigger>
          <TabsTrigger value="alerts">{t('operator.tabs.alerts', 'Уведомления')}</TabsTrigger>
        </TabsList>

        {/* Панель управления */}
        <TabsContent value="dashboard" className="mt-6">
          {/* Основные метрики */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Power className="h-4 w-4 mr-2 text-green-400" />
                  {t('operator.metrics.activeStations', 'Активные станции')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {mockStations.filter(s => s.status === 'operational').length} / {mockStations.length}
                </p>
                <p className="text-green-400 text-sm">
                  {Math.round((mockStations.filter(s => s.status === 'operational').length / mockStations.length) * 100)}% работают
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                  {t('operator.metrics.totalFlow', 'Общий расход')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {mockStations.reduce((sum, s) => sum + s.currentFlow, 0).toLocaleString()} м³/ч
                </p>
                <p className="text-blue-400 text-sm">
                  Капацитет: {mockStations.reduce((sum, s) => sum + s.capacity, 0).toLocaleString()} м³/ч
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Gauge className="h-4 w-4 mr-2 text-purple-400" />
                  {t('operator.metrics.efficiency', 'Средняя эффективность')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {Math.round(mockStations.reduce((sum, s) => sum + s.efficiency, 0) / mockStations.length)}%
                </p>
                <p className="text-purple-400 text-sm">+2.3% за неделю</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-orange-400" />
                  {t('operator.metrics.alerts', 'Активные уведомления')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {mockEquipment.filter(e => e.alertLevel !== 'none').length}
                </p>
                <p className="text-orange-400 text-sm">
                  {mockEquipment.filter(e => e.alertLevel === 'critical').length} критических
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Карта станций */}
          <Card className="glassmorphism-dark border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                {t('operator.dashboard.map', 'Карта водных станций')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                <p className="text-white/60">[Интерактивная карта с расположением станций]</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockStations.map((station) => (
                  <div key={station.id} className="bg-background/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {getStationTypeIcon(station.type)}
                      <span className="text-white font-medium">
                        {isRussian ? station.name : station.nameEn}
                      </span>
                      {getStatusIcon(station.status)}
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/60">Статус:</span>
                        <span className={getStatusColor(station.status)}>{station.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Расход:</span>
                        <span className="text-white">{station.currentFlow} м³/ч</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Эффективность:</span>
                        <span className="text-white">{station.efficiency}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Станции */}
        <TabsContent value="stations" className="mt-6">
          <div className="space-y-6">
            {mockStations.map((station) => (
              <Card key={station.id} className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStationTypeIcon(station.type)}
                      <CardTitle className="text-white">
                        {isRussian ? station.name : station.nameEn}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(station.status)}
                      <Badge variant="outline" className="text-xs">
                        {station.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-white/60 text-sm">Местоположение:</p>
                      <p className="text-white">{station.location}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Капацитет:</p>
                      <p className="text-white">{station.capacity.toLocaleString()} м³/ч</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Текущий расход:</p>
                      <p className="text-white">{station.currentFlow.toLocaleString()} м³/ч</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Следующее ТО:</p>
                      <p className="text-white">{station.nextMaintenance.toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Загрузка:</span>
                      <span className="text-white">
                        {Math.round((station.currentFlow / station.capacity) * 100)}%
                      </span>
                    </div>
                    <Progress value={(station.currentFlow / station.capacity) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Эффективность:</span>
                      <span className="text-white">{station.efficiency}%</span>
                    </div>
                    <Progress value={station.efficiency} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Оборудование */}
        <TabsContent value="equipment" className="mt-6">
          <div className="space-y-6">
            {mockEquipment.map((equipment) => (
              <Card key={equipment.id} className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      {isRussian ? equipment.name : equipment.nameEn}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(equipment.status)}
                      <Badge className={getAlertColor(equipment.alertLevel)}>
                        {equipment.alertLevel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-white/60 text-sm">Состояние:</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white">{equipment.health}%</p>
                        <Progress value={equipment.health} className="h-2 flex-1" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Температура:</p>
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-4 w-4 text-red-400" />
                        <p className="text-white">{equipment.temperature}°C</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Давление:</p>
                      <div className="flex items-center gap-1">
                        <Gauge className="h-4 w-4 text-blue-400" />
                        <p className="text-white">{equipment.pressure} бар</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Вибрация:</p>
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4 text-yellow-400" />
                        <p className="text-white">{equipment.vibration} мм/с</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Связь:</p>
                      <div className="flex items-center gap-1">
                        <Wifi className="h-4 w-4 text-green-400" />
                        <p className="text-white">Онлайн</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                      Последняя проверка: {equipment.lastCheck.toLocaleString()}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {equipment.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Обслуживание */}
        <TabsContent value="maintenance" className="mt-6">
          <div className="space-y-6">
            {mockMaintenanceTasks.map((task) => (
              <Card key={task.id} className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      {isRussian ? task.title : task.titleEn}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    {isRussian ? task.description : task.descriptionEn}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-white/60 text-sm">Тип:</p>
                      <p className="text-white">{task.type}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Ответственный:</p>
                      <p className="text-white">{task.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Запланировано:</p>
                      <p className="text-white">{task.scheduledDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Длительность:</p>
                      <p className="text-white">{task.estimatedDuration}ч</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      <Calendar className="h-4 w-4 mr-1" />
                      {t('operator.maintenance.schedule', 'Перенести')}
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      <Wrench className="h-4 w-4 mr-1" />
                      {t('operator.maintenance.start', 'Начать')}
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {t('operator.maintenance.complete', 'Завершить')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Уведомления */}
        <TabsContent value="alerts" className="mt-6">
          <div className="space-y-4">
            <Card className="glassmorphism-dark border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Критическая неисправность датчика</h4>
                    <p className="text-white/60 text-sm">
                      Датчик давления №5 на распределительной станции Бухара не отвечает
                    </p>
                    <p className="text-white/40 text-xs mt-1">18 мая 2024, 14:23</p>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600">
                    Устранить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-yellow-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Плановое техническое обслуживание</h4>
                    <p className="text-white/60 text-sm">
                      Очистные сооружения Самарканд требуют планового ТО через 2 дня
                    </p>
                    <p className="text-white/40 text-xs mt-1">Запланировано на 25 мая 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-yellow-500/30 text-yellow-400">
                    Подтвердить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Обслуживание завершено</h4>
                    <p className="text-white/60 text-sm">
                      Центробежный насос №1 успешно прошел техническое обслуживание
                    </p>
                    <p className="text-white/40 text-xs mt-1">15 мая 2024, 16:45</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400">
                    Закрыть
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}