import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Factory, 
  Settings, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Wrench,
  Database,
  Wifi,
  Zap,
  Gauge,
  Thermometer,
  Droplets,
  BarChart3,
  Calendar,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'pump' | 'filter' | 'valve' | 'sensor' | 'tank' | 'pipe';
  location: string;
  status: 'operational' | 'maintenance' | 'warning' | 'critical' | 'offline';
  health: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
  efficiency: number;
  uptime: number;
  cost: number;
  manufacturer: string;
  model: string;
  installedDate: Date;
}

interface IoTDevice {
  id: string;
  name: string;
  type: 'water_quality' | 'flow_rate' | 'pressure' | 'temperature' | 'level';
  location: string;
  status: 'online' | 'offline' | 'error' | 'maintenance';
  lastReading: {
    value: number;
    unit: string;
    timestamp: Date;
  };
  battery: number;
  signal: number;
  firmware: string;
  lastCalibration: Date;
}

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  assetId: string;
  type: 'preventive' | 'corrective' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo: string;
  scheduledDate: Date;
  estimatedDuration: number;
  actualDuration?: number;
  cost: number;
  parts: string[];
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  target: number;
}

export default function InfrastructureCabinet() {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'iot' | 'maintenance' | 'analytics'>('overview');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Моковые данные
  const assets: Asset[] = [
    {
      id: '1',
      name: 'Главная насосная станция #1',
      type: 'pump',
      location: 'Центральная станция',
      status: 'operational',
      health: 92,
      lastMaintenance: new Date('2024-01-10'),
      nextMaintenance: new Date('2024-04-10'),
      efficiency: 87,
      uptime: 99.2,
      cost: 150000,
      manufacturer: 'Grundfos',
      model: 'CRN 45-2',
      installedDate: new Date('2020-03-15')
    },
    {
      id: '2',
      name: 'Фильтр очистки воды',
      type: 'filter',
      location: 'Очистные сооружения',
      status: 'maintenance',
      health: 65,
      lastMaintenance: new Date('2024-01-05'),
      nextMaintenance: new Date('2024-01-25'),
      efficiency: 78,
      uptime: 95.8,
      cost: 75000,
      manufacturer: 'Pentair',
      model: 'Big Blue 20',
      installedDate: new Date('2021-06-20')
    },
    {
      id: '3',
      name: 'Контрольный клапан',
      type: 'valve',
      location: 'Магистральная линия',
      status: 'warning',
      health: 45,
      lastMaintenance: new Date('2023-12-15'),
      nextMaintenance: new Date('2024-02-15'),
      efficiency: 82,
      uptime: 98.5,
      cost: 25000,
      manufacturer: 'AVK',
      model: 'Series 01',
      installedDate: new Date('2022-01-10')
    }
  ];

  const iotDevices: IoTDevice[] = [
    {
      id: '1',
      name: 'Датчик качества воды WQ-001',
      type: 'water_quality',
      location: 'Входная точка',
      status: 'online',
      lastReading: {
        value: 7.2,
        unit: 'pH',
        timestamp: new Date()
      },
      battery: 85,
      signal: 92,
      firmware: 'v2.1.4',
      lastCalibration: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Датчик расхода FR-002',
      type: 'flow_rate',
      location: 'Магистральная линия',
      status: 'online',
      lastReading: {
        value: 1250,
        unit: 'л/мин',
        timestamp: new Date()
      },
      battery: 78,
      signal: 88,
      firmware: 'v1.8.2',
      lastCalibration: new Date('2023-12-15')
    },
    {
      id: '3',
      name: 'Датчик давления PR-003',
      type: 'pressure',
      location: 'Насосная станция',
      status: 'error',
      lastReading: {
        value: 0,
        unit: 'бар',
        timestamp: new Date(Date.now() - 3600000)
      },
      battery: 15,
      signal: 0,
      firmware: 'v1.7.1',
      lastCalibration: new Date('2023-11-20')
    }
  ];

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: '1',
      title: 'Плановое обслуживание насосной станции',
      description: 'Замена фильтров и проверка работоспособности',
      assetId: '1',
      type: 'preventive',
      priority: 'medium',
      status: 'scheduled',
      assignedTo: 'Иванов А.П.',
      scheduledDate: new Date('2024-04-10'),
      estimatedDuration: 4,
      cost: 5000,
      parts: ['Фильтр воздушный', 'Масло смазочное', 'Прокладки']
    },
    {
      id: '2',
      title: 'Ремонт фильтра очистки',
      description: 'Замена картриджей и очистка корпуса',
      assetId: '2',
      type: 'corrective',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Петров В.С.',
      scheduledDate: new Date('2024-01-20'),
      estimatedDuration: 2,
      actualDuration: 1.5,
      cost: 3000,
      parts: ['Картридж фильтра', 'Уплотнители']
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      name: 'Общая эффективность',
      value: 84.5,
      unit: '%',
      trend: 'up',
      change: 2.3,
      target: 90
    },
    {
      name: 'Время простоя',
      value: 0.8,
      unit: '%',
      trend: 'down',
      change: -0.3,
      target: 1.0
    },
    {
      name: 'Энергопотребление',
      value: 1250,
      unit: 'кВт⋅ч',
      trend: 'down',
      change: -5.2,
      target: 1200
    },
    {
      name: 'Качество воды',
      value: 98.7,
      unit: '%',
      trend: 'up',
      change: 0.5,
      target: 99
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок кабинета */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-orange-500 rounded-lg text-white">
          <Factory className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Инфраструктурный кабинет</h1>
          <p className="text-gray-600">Управление активами, IoT интеграция и предиктивное обслуживание</p>
        </div>
      </div>

      {/* Навигация по вкладкам */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Обзор', icon: BarChart3 },
          { id: 'assets', label: 'Активы', icon: Settings },
          { id: 'iot', label: 'IoT устройства', icon: Wifi },
          { id: 'maintenance', label: 'Обслуживание', icon: Wrench },
          { id: 'analytics', label: 'Аналитика', icon: TrendingUp }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Содержимое вкладок */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Ключевые метрики */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    {getTrendIcon(metric.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}{metric.unit}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={metric.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {metric.change >= 0 ? '+' : ''}{metric.change}%
                    </span>
                    <span className="text-gray-600">цель: {metric.target}{metric.unit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Статус активов */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Статус активов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Settings className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{asset.name}</h4>
                          <p className="text-sm text-gray-600">{asset.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(asset.status)}>
                          {asset.status === 'operational' ? 'Работает' :
                           asset.status === 'maintenance' ? 'Обслуживание' :
                           asset.status === 'warning' ? 'Предупреждение' :
                           asset.status === 'critical' ? 'Критично' : 'Отключен'}
                        </Badge>
                        <div className={`text-sm font-medium ${getHealthColor(asset.health)}`}>
                          {asset.health}% здоровья
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IoT устройства</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {iotDevices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Wifi className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{device.name}</h4>
                          <p className="text-sm text-gray-600">{device.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={device.status === 'online' ? 'bg-green-100 text-green-800' : 
                                         device.status === 'error' ? 'bg-red-100 text-red-800' : 
                                         'bg-gray-100 text-gray-800'}>
                          {device.status === 'online' ? 'Онлайн' :
                           device.status === 'offline' ? 'Офлайн' :
                           device.status === 'error' ? 'Ошибка' : 'Обслуживание'}
                        </Badge>
                        <div className="text-sm text-gray-600">
                          {device.lastReading.value} {device.lastReading.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Запланированные задачи */}
          <Card>
            <CardHeader>
              <CardTitle>Запланированные задачи</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceTasks.filter(task => task.status === 'scheduled').map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>Назначен: {task.assignedTo}</span>
                          <span>Дата: {task.scheduledDate.toLocaleDateString()}</span>
                          <span>Длительность: {task.estimatedDuration}ч</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{task.priority}</Badge>
                      <div className="text-sm text-gray-600 mt-1">
                        ${task.cost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'assets' && (
        <div className="space-y-6">
          {/* Добавление нового актива */}
          <Card>
            <CardHeader>
              <CardTitle>Добавить новый актив</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название актива</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Тип актива</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pump">Насос</SelectItem>
                      <SelectItem value="filter">Фильтр</SelectItem>
                      <SelectItem value="valve">Клапан</SelectItem>
                      <SelectItem value="sensor">Датчик</SelectItem>
                      <SelectItem value="tank">Резервуар</SelectItem>
                      <SelectItem value="pipe">Трубопровод</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Местоположение</Label>
                  <Input placeholder="Введите местоположение" />
                </div>
                <div>
                  <Label>Производитель</Label>
                  <Input placeholder="Введите производителя" />
                </div>
                <div>
                  <Label>Модель</Label>
                  <Input placeholder="Введите модель" />
                </div>
                <div>
                  <Label>Стоимость</Label>
                  <Input type="number" placeholder="Введите стоимость" />
                </div>
              </div>
              <Button className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Добавить актив
              </Button>
            </CardContent>
          </Card>

          {/* Список активов */}
          <Card>
            <CardHeader>
              <CardTitle>Управление активами</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Settings className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{asset.name}</h3>
                            <Badge className={getStatusColor(asset.status)}>
                              {asset.status === 'operational' ? 'Работает' :
                               asset.status === 'maintenance' ? 'Обслуживание' :
                               asset.status === 'warning' ? 'Предупреждение' :
                               asset.status === 'critical' ? 'Критично' : 'Отключен'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{asset.location}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Здоровье:</span>
                              <div className={`font-medium ${getHealthColor(asset.health)}`}>
                                {asset.health}%
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Эффективность:</span>
                              <div className="font-medium">{asset.efficiency}%</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Время работы:</span>
                              <div className="font-medium">{asset.uptime}%</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Стоимость:</span>
                              <div className="font-medium">${asset.cost.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Детали
                        </Button>
                        <Button variant="outline" size="sm">
                          Обслуживание
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'iot' && (
        <div className="space-y-6">
          {/* Добавление IoT устройства */}
          <Card>
            <CardHeader>
              <CardTitle>Добавить IoT устройство</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название устройства</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Тип устройства</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water_quality">Качество воды</SelectItem>
                      <SelectItem value="flow_rate">Расход</SelectItem>
                      <SelectItem value="pressure">Давление</SelectItem>
                      <SelectItem value="temperature">Температура</SelectItem>
                      <SelectItem value="level">Уровень</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Местоположение</Label>
                  <Input placeholder="Введите местоположение" />
                </div>
                <div>
                  <Label>IP адрес</Label>
                  <Input placeholder="192.168.1.100" />
                </div>
              </div>
              <Button className="w-full">
                <Wifi className="w-4 h-4 mr-2" />
                Добавить устройство
              </Button>
            </CardContent>
          </Card>

          {/* Список IoT устройств */}
          <Card>
            <CardHeader>
              <CardTitle>IoT устройства</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {iotDevices.map((device) => (
                  <div key={device.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Wifi className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{device.name}</h3>
                            <Badge className={device.status === 'online' ? 'bg-green-100 text-green-800' : 
                                             device.status === 'error' ? 'bg-red-100 text-red-800' : 
                                             'bg-gray-100 text-gray-800'}>
                              {device.status === 'online' ? 'Онлайн' :
                               device.status === 'offline' ? 'Офлайн' :
                               device.status === 'error' ? 'Ошибка' : 'Обслуживание'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{device.location}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Последнее значение:</span>
                              <div className="font-medium">{device.lastReading.value} {device.lastReading.unit}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Батарея:</span>
                              <div className="font-medium">{device.battery}%</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Сигнал:</span>
                              <div className="font-medium">{device.signal}%</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Прошивка:</span>
                              <div className="font-medium">{device.firmware}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Настройки
                        </Button>
                        <Button variant="outline" size="sm">
                          Калибровка
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          {/* Создание задачи обслуживания */}
          <Card>
            <CardHeader>
              <CardTitle>Создать задачу обслуживания</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название задачи</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Тип обслуживания</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Профилактическое</SelectItem>
                      <SelectItem value="corrective">Корректирующее</SelectItem>
                      <SelectItem value="emergency">Экстренное</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Актив</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите актив" />
                    </SelectTrigger>
                    <SelectContent>
                      {assets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>{asset.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Приоритет</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите приоритет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                      <SelectItem value="critical">Критический</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea placeholder="Подробное описание задачи" rows={3} />
              </div>
              <Button className="w-full">
                <Wrench className="w-4 h-4 mr-2" />
                Создать задачу
              </Button>
            </CardContent>
          </Card>

          {/* Список задач обслуживания */}
          <Card>
            <CardHeader>
              <CardTitle>Задачи обслуживания</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceTasks.map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Wrench className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge variant="outline">{task.type}</Badge>
                            <Badge className={task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                             task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                             'bg-gray-100 text-gray-800'}>
                              {task.status === 'scheduled' ? 'Запланировано' :
                               task.status === 'in_progress' ? 'В работе' :
                               task.status === 'completed' ? 'Завершено' : 'Отменено'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Назначен:</span>
                              <div className="font-medium">{task.assignedTo}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Дата:</span>
                              <div className="font-medium">{task.scheduledDate.toLocaleDateString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Длительность:</span>
                              <div className="font-medium">{task.estimatedDuration}ч</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Стоимость:</span>
                              <div className="font-medium">${task.cost.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Детали
                        </Button>
                        <Button variant="outline" size="sm">
                          Начать
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Предиктивная аналитика */}
          <Card>
            <CardHeader>
              <CardTitle>Предиктивная аналитика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Прогноз отказов</h3>
                  {assets.map((asset) => (
                    <div key={asset.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{asset.name}</span>
                        <span className="text-sm text-gray-600">
                          {asset.health < 50 ? 'Высокий риск' :
                           asset.health < 70 ? 'Средний риск' : 'Низкий риск'}
                        </span>
                      </div>
                      <Progress value={asset.health} className="mb-2" />
                      <div className="text-xs text-gray-600">
                        Рекомендуемое обслуживание: {asset.nextMaintenance.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Энергоэффективность</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span>Общее потребление</span>
                        <span className="font-medium">1,250 кВт⋅ч</span>
                      </div>
                      <Progress value={85} className="mb-1" />
                      <div className="text-xs text-green-600">-5.2% к прошлому месяцу</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span>Эффективность насосов</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="mb-1" />
                      <div className="text-xs text-green-600">+2.3% к прошлому месяцу</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Отчеты */}
          <Card>
            <CardHeader>
              <CardTitle>Отчеты и аналитика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  <span>Отчет по активам</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span>Производительность</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <DollarSign className="w-6 h-6 mb-2" />
                  <span>Финансовый отчет</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

