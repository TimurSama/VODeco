import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, Zap, Wrench, AlertTriangle, Activity,
  Gauge, Thermometer, Droplets, Power, Wifi,
  CheckCircle, Clock, XCircle, MapPin, Calendar, Wind,
  Brain, FileText, TestTube, ArrowLeftRight, BarChart3,
  Bell, Camera, Cog, Download, Eye, FileDown, Filter,
  Phone, Plus, RotateCcw, ShieldX
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
        <TabsList className="grid w-full grid-cols-9 bg-background/20 text-xs">
          <TabsTrigger value="dashboard">{t('operator.tabs.dashboard', 'Главная панель')}</TabsTrigger>
          <TabsTrigger value="map">{t('operator.tabs.map', 'Карта объектов')}</TabsTrigger>
          <TabsTrigger value="operations">{t('operator.tabs.operations', 'Журнал операций')}</TabsTrigger>
          <TabsTrigger value="sensors">{t('operator.tabs.sensors', 'Сенсоры')}</TabsTrigger>
          <TabsTrigger value="control">{t('operator.tabs.control', 'Управление')}</TabsTrigger>
          <TabsTrigger value="maintenance">{t('operator.tabs.maintenance', 'ТО')}</TabsTrigger>
          <TabsTrigger value="video">{t('operator.tabs.video', 'Видеонаблюдение')}</TabsTrigger>
          <TabsTrigger value="reports">{t('operator.tabs.reports', 'KPI и отчеты')}</TabsTrigger>
          <TabsTrigger value="emergency">{t('operator.tabs.emergency', 'Аварийное реагирование')}</TabsTrigger>
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

        {/* Карта управления объектами */}
        <TabsContent value="map" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Карта */}
            <Card className="lg:col-span-2 glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Карта управления объектами
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-background/20 rounded-lg relative overflow-hidden">
                  {/* Интерактивная карта */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20">
                    {mockStations.map((station, index) => (
                      <div
                        key={station.id}
                        className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all hover:scale-125 ${
                          station.status === 'operational' ? 'bg-green-400' :
                          station.status === 'maintenance' ? 'bg-yellow-400' :
                          station.status === 'offline' ? 'bg-red-400' : 'bg-orange-400'
                        }`}
                        style={{
                          left: `${station.coordinates.lng}%`,
                          top: `${station.coordinates.lat}%`
                        }}
                        title={station.name}
                      />
                    ))}
                  </div>
                  
                  {/* ИИ-аналитика и предиктивная диагностика */}
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Brain className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-white text-sm font-medium">ИИ-Аналитика</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="text-green-400">✓ Прогноз стабильности: 98%</div>
                      <div className="text-yellow-400">⚠ Потенциальная проблема через 3 дня</div>
                      <div className="text-blue-400">📊 Оптимизация нагрузки: активна</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Состояние объектов */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm">Состояние объектов</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockStations.slice(0, 6).map((station) => (
                  <div key={station.id} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-medium">{station.name}</p>
                      <p className="text-white/60 text-xs">{station.type === 'pumping' ? 'Насосная' : station.type === 'treatment' ? 'Очистная' : 'Распределительная'}</p>
                    </div>
                    <Badge className={
                      station.status === 'operational' ? 'bg-green-500/20 text-green-400' :
                      station.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                      station.status === 'offline' ? 'bg-red-500/20 text-red-400' :
                      'bg-orange-500/20 text-orange-400'
                    }>
                      {station.status === 'operational' ? 'Активна' :
                       station.status === 'maintenance' ? 'ТО' :
                       station.status === 'offline' ? 'Офлайн' : 'Авария'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Журнал операций и событий */}
        <TabsContent value="operations" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* История операций */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  История операций
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {[
                    { time: '15:34', user: 'Оператор А.Иванов', action: 'Запуск насоса №3', status: 'success' },
                    { time: '15:12', user: 'Система', action: 'Автоматическое переключение режима', status: 'info' },
                    { time: '14:58', user: 'Оператор М.Петров', action: 'Остановка для ТО', status: 'warning' },
                    { time: '14:45', user: 'ИИ-Система', action: 'Предиктивное предупреждение', status: 'info' },
                    { time: '14:23', user: 'Оператор А.Иванов', action: 'Изменение параметров фильтрации', status: 'success' },
                    { time: '13:56', user: 'Система', action: 'Аварийное отключение секции Б', status: 'error' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          log.status === 'success' ? 'bg-green-400' :
                          log.status === 'warning' ? 'bg-yellow-400' :
                          log.status === 'error' ? 'bg-red-400' : 'bg-blue-400'
                        }`} />
                        <div>
                          <p className="text-white text-sm">{log.action}</p>
                          <p className="text-white/60 text-xs">{log.user}</p>
                        </div>
                      </div>
                      <span className="text-white/60 text-xs">{log.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Инциденты и отклонения */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                  Инциденты и отклонения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {[
                    { 
                      time: '13:56', 
                      title: 'Превышение давления в секции Б', 
                      severity: 'critical',
                      resolved: false,
                      operator: 'Не назначен'
                    },
                    { 
                      time: '12:34', 
                      title: 'Отклонение pH в резервуаре №2', 
                      severity: 'warning',
                      resolved: true,
                      operator: 'М.Петров'
                    },
                    { 
                      time: '11:45', 
                      title: 'Повышенная вибрация насоса №1', 
                      severity: 'info',
                      resolved: true,
                      operator: 'А.Иванов'
                    }
                  ].map((incident, index) => (
                    <div key={index} className="p-3 bg-background/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={
                          incident.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          incident.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }>
                          {incident.severity === 'critical' ? 'Критично' :
                           incident.severity === 'warning' ? 'Предупреждение' : 'Информация'}
                        </Badge>
                        <span className="text-white/60 text-xs">{incident.time}</span>
                      </div>
                      <p className="text-white text-sm mb-2">{incident.title}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">Исполнитель: {incident.operator}</span>
                        <Badge className={incident.resolved ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                          {incident.resolved ? 'Решено' : 'Активно'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Панель сенсоров и параметров */}
        <TabsContent value="sensors" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Давление */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Gauge className="h-4 w-4 mr-2 text-blue-400" />
                  Давление в системе
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white">3.2 атм</div>
                  <div className="text-green-400 text-sm">В норме (2.8-4.0 атм)</div>
                </div>
                <Progress value={65} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-white/60">
                  <span>Мин: 2.8</span>
                  <span>Макс: 4.0</span>
                </div>
              </CardContent>
            </Card>

            {/* Объем */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                  Объем подачи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white">1,245 м³/ч</div>
                  <div className="text-yellow-400 text-sm">Повышенный расход</div>
                </div>
                <Progress value={85} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-white/60">
                  <span>Норма: 800-1200</span>
                  <span>Критично: {'>'} 1400</span>
                </div>
              </CardContent>
            </Card>

            {/* pH */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <TestTube className="h-4 w-4 mr-2 text-green-400" />
                  Уровень pH
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white">7.2</div>
                  <div className="text-green-400 text-sm">Оптимально (6.5-8.5)</div>
                </div>
                <Progress value={70} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-white/60">
                  <span>Кислая: &lt;6.5</span>
                  <span>Щелочная: {'>'} 8.5</span>
                </div>
              </CardContent>
            </Card>

            {/* Температура */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-orange-400" />
                  Температура
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white">18.5°C</div>
                  <div className="text-green-400 text-sm">В норме</div>
                </div>
                <Progress value={45} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-white/60">
                  <span>Холодная: {'<'} 10°C</span>
                  <span>Горячая: {'>'} 25°C</span>
                </div>
              </CardContent>
            </Card>

            {/* Ток */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                  Потребление тока
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white">245 А</div>
                  <div className="text-green-400 text-sm">Нормальное</div>
                </div>
                <Progress value={60} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-white/60">
                  <span>Норма: 180-300 А</span>
                  <span>Перегрузка: {'>'} 350 А</span>
                </div>
              </CardContent>
            </Card>

            {/* Вибрации */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-purple-400" />
                  Уровень вибраций
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-white">2.1 мм/с</div>
                  <div className="text-yellow-400 text-sm">Повышенный</div>
                </div>
                <Progress value={75} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-white/60">
                  <span>Норма: &lt;2.0</span>
                  <span>Критично: &gt;3.5</span>
                </div>
              </CardContent>
            </Card>
          </div>
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

        {/* Модули управления и настройки */}
        <TabsContent value="control" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Режимы работы */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Режимы работы системы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Главная насосная', mode: 'auto', status: 'active' },
                  { name: 'Система фильтрации', mode: 'manual', status: 'maintenance' },
                  { name: 'Распределительная сеть', mode: 'semi', status: 'active' },
                  { name: 'Очистные сооружения', mode: 'auto', status: 'active' }
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-medium">{system.name}</p>
                      <Badge className={
                        system.mode === 'auto' ? 'bg-green-500/20 text-green-400' :
                        system.mode === 'manual' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }>
                        {system.mode === 'auto' ? 'Автоматический' :
                         system.mode === 'manual' ? 'Ручной' : 'Полуавтомат'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        system.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <Button size="sm" variant="outline" className="text-xs">
                        Настроить
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Управление оборудованием */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Cog className="h-5 w-5 mr-2 text-primary" />
                  Управление оборудованием
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Насос №1', type: 'pump', status: 'running', power: 85 },
                  { name: 'Насос №2', type: 'pump', status: 'stopped', power: 0 },
                  { name: 'Клапан А-14', type: 'valve', status: 'open', power: 100 },
                  { name: 'Фильтр Б-7', type: 'filter', status: 'cleaning', power: 60 }
                ].map((equipment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        equipment.type === 'pump' ? 'bg-blue-500/20' :
                        equipment.type === 'valve' ? 'bg-green-500/20' : 'bg-purple-500/20'
                      }`}>
                        {equipment.type === 'pump' ? <Zap className="h-4 w-4 text-blue-400" /> :
                         equipment.type === 'valve' ? <Settings className="h-4 w-4 text-green-400" /> :
                         <Filter className="h-4 w-4 text-purple-400" />}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{equipment.name}</p>
                        <p className="text-white/60 text-xs">{equipment.status} • {equipment.power}%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        {equipment.status === 'running' ? 'Остановить' : 'Запустить'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Расписания и сценарии */}
          <Card className="glassmorphism-dark border-primary/20 mt-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Расписания и автоматические сценарии
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    name: 'Ночная промывка фильтров', 
                    schedule: '02:00 - 04:00', 
                    frequency: 'Ежедневно',
                    active: true 
                  },
                  { 
                    name: 'Пиковая нагрузка', 
                    schedule: '07:00 - 09:00, 18:00 - 20:00', 
                    frequency: 'Будни',
                    active: true 
                  },
                  { 
                    name: 'Профилактическая остановка', 
                    schedule: '00:00 - 06:00', 
                    frequency: 'Воскресенье',
                    active: false 
                  }
                ].map((scenario, index) => (
                  <div key={index} className="p-4 bg-background/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white text-sm font-medium">{scenario.name}</h4>
                      <Switch checked={scenario.active} />
                    </div>
                    <div className="space-y-1 text-xs text-white/60">
                      <p>⏰ {scenario.schedule}</p>
                      <p>🔄 {scenario.frequency}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Видео- и фотонаблюдение */}
        <TabsContent value="video" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Живое видео */}
            <Card className="lg:col-span-2 glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-primary" />
                  Прямой видеопоток
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Главный вход', location: 'Насосная станция №1', status: 'online' },
                    { name: 'Машинный зал', location: 'Насосная станция №1', status: 'online' },
                    { name: 'Резервуары', location: 'Очистные сооружения', status: 'maintenance' },
                    { name: 'Периметр', location: 'Распределительная станция', status: 'online' }
                  ].map((camera, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-video bg-background/20 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                          <div className="text-center">
                            <Camera className={`h-8 w-8 mx-auto mb-2 ${
                              camera.status === 'online' ? 'text-green-400' : 'text-yellow-400'
                            }`} />
                            <p className="text-white text-sm">{camera.name}</p>
                            <p className="text-white/60 text-xs">{camera.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className={
                          camera.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }>
                          {camera.status === 'online' ? 'Онлайн' : 'ТО'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Архив и анализ */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm">Архив и анализ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-background/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Eye className="h-4 w-4 mr-2 text-blue-400" />
                    <span className="text-white text-sm">Компьютерное зрение</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="text-green-400">✓ Обнаружение утечек: активно</div>
                    <div className="text-blue-400">📊 Анализ движения: включен</div>
                    <div className="text-yellow-400">⚠ Аномальная активность: 2 события</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white text-sm font-medium">Последние события</h4>
                  {[
                    { time: '14:23', event: 'Несанкционированный доступ', camera: 'Периметр', severity: 'high' },
                    { time: '12:45', event: 'Утечка в секции А', camera: 'Резервуары', severity: 'critical' },
                    { time: '11:12', event: 'Плановое обслуживание', camera: 'Машинный зал', severity: 'low' }
                  ].map((event, index) => (
                    <div key={index} className="p-2 bg-background/20 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <Badge className={
                          event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-blue-500/20 text-blue-400'
                        }>
                          {event.severity === 'critical' ? 'Критично' :
                           event.severity === 'high' ? 'Высокий' : 'Низкий'}
                        </Badge>
                        <span className="text-white/60 text-xs">{event.time}</span>
                      </div>
                      <p className="text-white text-xs">{event.event}</p>
                      <p className="text-white/60 text-xs">Камера: {event.camera}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* KPI и отчеты */}
        <TabsContent value="reports" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KPI метрики */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Ключевые показатели эффективности
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-background/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">98.7%</div>
                    <div className="text-white/60 text-xs">Надежность оборудования</div>
                  </div>
                  <div className="p-3 bg-background/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">94.2%</div>
                    <div className="text-white/60 text-xs">Эффективность водоподачи</div>
                  </div>
                  <div className="p-3 bg-background/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-400">-12%</div>
                    <div className="text-white/60 text-xs">Снижение энергозатрат</div>
                  </div>
                  <div className="p-3 bg-background/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">15 мин</div>
                    <div className="text-white/60 text-xs">Среднее время реакции</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white text-sm font-medium">Экономические показатели</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Энергопотребление</span>
                      <span className="text-green-400 text-sm">↓ 8.4% к прошлому месяцу</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Стоимость обслуживания</span>
                      <span className="text-yellow-400 text-sm">↑ 2.1% к прошлому месяцу</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Общая экономия</span>
                      <span className="text-blue-400 text-sm">524,000 ₽/месяц</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white text-sm font-medium">Экологические показатели</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Снижение выбросов CO₂</span>
                      <span className="text-green-400 text-sm">-147 тонн/месяц</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Экономия воды</span>
                      <span className="text-blue-400 text-sm">12.3% от потребления</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Отчеты и интеграции */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileDown className="h-5 w-5 mr-2 text-primary" />
                  Отчеты и интеграции
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-white text-sm font-medium">Готовые отчеты</h4>
                  {[
                    { name: 'Суточный отчет операций', format: 'PDF', size: '2.4 МБ', date: 'Сегодня' },
                    { name: 'Месячная аналитика KPI', format: 'Excel', size: '5.8 МБ', date: 'Вчера' },
                    { name: 'Журнал инцидентов', format: 'CSV', size: '1.2 МБ', date: 'Вчера' }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                      <div>
                        <p className="text-white text-sm">{report.name}</p>
                        <p className="text-white/60 text-xs">{report.format} • {report.size} • {report.date}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Скачать
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-white text-sm font-medium">API интеграции</h4>
                  {[
                    { name: 'Реестр данных Минэкологии', status: 'active', sync: '10 мин назад' },
                    { name: 'Система мониторинга региона', status: 'active', sync: '2 ч назад' },
                    { name: 'Внешняя система учета', status: 'error', sync: 'Ошибка подключения' }
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                      <div>
                        <p className="text-white text-sm">{integration.name}</p>
                        <p className="text-white/60 text-xs">Синхронизация: {integration.sync}</p>
                      </div>
                      <Badge className={
                        integration.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }>
                        {integration.status === 'active' ? 'Активна' : 'Ошибка'}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/80">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать новый отчет
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Аварийное реагирование */}
        <TabsContent value="emergency" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Панель экстренного управления */}
            <Card className="lg:col-span-2 glassmorphism-dark border-red-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                  Панель экстренного управления
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { name: 'Аварийная остановка', color: 'red', icon: Power },
                    { name: 'Перенаправление потоков', color: 'orange', icon: ArrowLeftRight },
                    { name: 'Изоляция секций', color: 'yellow', icon: ShieldX },
                    { name: 'Вызов службы', color: 'blue', icon: Phone },
                    { name: 'Оповещение персонала', color: 'purple', icon: Bell },
                    { name: 'Резервные системы', color: 'green', icon: RotateCcw }
                  ].map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={index}
                        className={`h-20 flex flex-col items-center justify-center bg-${action.color}-500/20 hover:bg-${action.color}-500/30 border-${action.color}-500/50 text-${action.color}-400`}
                        variant="outline"
                      >
                        <IconComponent className="h-6 w-6 mb-2" />
                        <span className="text-xs text-center">{action.name}</span>
                      </Button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <h4 className="text-white text-sm font-medium">Автоматические сценарии</h4>
                  {[
                    { 
                      name: 'Перепад давления >50%', 
                      action: 'Автоматическое отключение секции', 
                      status: 'active',
                      lastTriggered: 'Никогда' 
                    },
                    { 
                      name: 'Утечка >100 л/мин', 
                      action: 'Перенаправление + оповещение', 
                      status: 'active',
                      lastTriggered: '3 дня назад' 
                    },
                    { 
                      name: 'Отказ >2 насосов', 
                      action: 'Резервное питание + вызов службы', 
                      status: 'active',
                      lastTriggered: 'Никогда' 
                    }
                  ].map((scenario, index) => (
                    <div key={index} className="p-4 bg-background/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">{scenario.name}</span>
                        <Badge className="bg-green-500/20 text-green-400">Активен</Badge>
                      </div>
                      <p className="text-white/60 text-xs mb-1">Действие: {scenario.action}</p>
                      <p className="text-white/60 text-xs">Последнее срабатывание: {scenario.lastTriggered}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Связь и уведомления */}
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-sm">Связь и уведомления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-white text-sm font-medium">Экстренные контакты</h4>
                  {[
                    { name: 'МЧС', phone: '112', type: 'emergency' },
                    { name: 'Водоканал дежурный', phone: '+7 (495) 123-45-67', type: 'service' },
                    { name: 'Главный инженер', phone: '+7 (495) 987-65-43', type: 'internal' },
                    { name: 'Техподдержка', phone: '+7 (495) 555-01-02', type: 'support' }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                      <div>
                        <p className="text-white text-sm">{contact.name}</p>
                        <p className="text-white/60 text-xs">{contact.phone}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Вызов
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-white text-sm font-medium">Push-уведомления</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Критические события</span>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Предупреждения</span>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Плановые работы</span>
                      <Switch checked={false} />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">Активные тревоги</span>
                  </div>
                  <div className="text-red-300 text-xs">
                    • Превышение давления в секции Б<br/>
                    • Связь с камерой "Резервуары" потеряна
                  </div>
                  <Button size="sm" className="w-full mt-2 bg-red-500 hover:bg-red-600">
                    Обработать тревоги
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Станции */}
        <TabsContent value="stations" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-400" />
                  {t('operator.control.remote', 'Удаленное управление')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Насосная станция Ташкент-1</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-white/60 text-sm">Насос №1</p>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <span className="text-white">Работает</span>
                          <Button size="sm" variant="outline" className="ml-auto border-red-600 text-red-400">
                            Стоп
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Насос №2</p>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-white">Остановлен</span>
                          <Button size="sm" className="ml-auto bg-green-600 hover:bg-green-700">
                            Пуск
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/60 text-sm">Давление</span>
                          <span className="text-white text-sm">4.2 бар</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">-</Button>
                          <Progress value={70} className="h-6 flex-1" />
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">+</Button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/60 text-sm">Расход</span>
                          <span className="text-white text-sm">4200 м³/ч</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">-</Button>
                          <Progress value={84} className="h-6 flex-1" />
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">+</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Быстрые команды</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Автореж.
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400">
                        Ручной
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                        Аварийный стоп
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-600 text-green-400">
                        Сброс ошибок
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Gauge className="h-5 w-5 mr-2 text-green-400" />
                  {t('operator.control.monitoring', 'Мониторинг в реальном времени')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/20 rounded-lg p-3 text-center">
                      <Thermometer className="h-6 w-6 text-red-400 mx-auto mb-2" />
                      <p className="text-white/60 text-sm">Температура</p>
                      <p className="text-white font-bold">65.2°C</p>
                      <p className="text-green-400 text-xs">Норма</p>
                    </div>
                    
                    <div className="bg-background/20 rounded-lg p-3 text-center">
                      <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                      <p className="text-white/60 text-sm">Мощность</p>
                      <p className="text-white font-bold">142 кВт</p>
                      <p className="text-blue-400 text-xs">87%</p>
                    </div>
                    
                    <div className="bg-background/20 rounded-lg p-3 text-center">
                      <Wind className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-white/60 text-sm">Вибрация</p>
                      <p className="text-white font-bold">2.1 мм/с</p>
                      <p className="text-green-400 text-xs">Норма</p>
                    </div>
                    
                    <div className="bg-background/20 rounded-lg p-3 text-center">
                      <Wifi className="h-6 w-6 text-green-400 mx-auto mb-2" />
                      <p className="text-white/60 text-sm">Связь</p>
                      <p className="text-white font-bold">98%</p>
                      <p className="text-green-400 text-xs">Стабильно</p>
                    </div>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">График нагрузки</h4>
                    <div className="h-32 bg-background/20 rounded-lg flex items-center justify-center">
                      <p className="text-white/60 text-sm">[График нагрузки за 24 часа]</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                {t('operator.control.scenarios', 'Сценарии управления')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Утренний пик</h4>
                  <p className="text-white/60 text-sm mb-3">Увеличение производительности на 30% с 6:00 до 9:00</p>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-green-500/20 text-green-400">Активен</Badge>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      Настроить
                    </Button>
                  </div>
                </div>
                
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Ночной режим</h4>
                  <p className="text-white/60 text-sm mb-3">Снижение нагрузки и плановое обслуживание с 23:00 до 5:00</p>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-blue-500/20 text-blue-400">Запланирован</Badge>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      Настроить
                    </Button>
                  </div>
                </div>
                
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Аварийный</h4>
                  <p className="text-white/60 text-sm mb-3">Автоматическое переключение на резервные системы</p>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-yellow-500/20 text-yellow-400">Готов</Badge>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      Тест
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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