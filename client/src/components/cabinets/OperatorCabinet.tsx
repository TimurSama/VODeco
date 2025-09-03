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
  Settings, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Database,
  Server,
  Wifi,
  Zap,
  Shield,
  BarChart3,
  Calendar,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Plus,
  Wrench,
  Headphones,
  MessageSquare,
  Bell,
  Globe,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';

interface SystemStatus {
  id: string;
  name: string;
  type: 'server' | 'database' | 'network' | 'application' | 'service';
  status: 'online' | 'offline' | 'warning' | 'error' | 'maintenance';
  uptime: number;
  performance: number;
  lastCheck: Date;
  responseTime: number;
  load: number;
  memory: number;
  disk: number;
}

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'system' | 'security' | 'performance' | 'user';
  status: 'active' | 'acknowledged' | 'resolved';
  createdAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
  assignedTo?: string;
  systemId: string;
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'user' | 'billing' | 'feature' | 'bug';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  userId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  responseTime: number;
  satisfaction?: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin: Date;
  loginCount: number;
  cabinetAccess: string[];
  createdAt: Date;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  threshold: number;
}

export default function OperatorCabinet() {
  const [activeTab, setActiveTab] = useState<'overview' | 'systems' | 'alerts' | 'support' | 'users' | 'analytics'>('overview');
  const [selectedSystem, setSelectedSystem] = useState<SystemStatus | null>(null);

  // Моковые данные
  const systems: SystemStatus[] = [
    {
      id: '1',
      name: 'Основной сервер приложений',
      type: 'server',
      status: 'online',
      uptime: 99.8,
      performance: 85,
      lastCheck: new Date(),
      responseTime: 120,
      load: 65,
      memory: 78,
      disk: 45
    },
    {
      id: '2',
      name: 'База данных PostgreSQL',
      type: 'database',
      status: 'online',
      uptime: 99.9,
      performance: 92,
      lastCheck: new Date(),
      responseTime: 45,
      load: 45,
      memory: 62,
      disk: 38
    },
    {
      id: '3',
      name: 'API Gateway',
      type: 'service',
      status: 'warning',
      uptime: 98.5,
      performance: 73,
      lastCheck: new Date(),
      responseTime: 280,
      load: 82,
      memory: 89,
      disk: 23
    },
    {
      id: '4',
      name: 'Файловое хранилище',
      type: 'server',
      status: 'online',
      uptime: 99.7,
      performance: 88,
      lastCheck: new Date(),
      responseTime: 95,
      load: 58,
      memory: 71,
      disk: 67
    }
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      title: 'Высокая нагрузка на API Gateway',
      description: 'API Gateway показывает повышенную нагрузку и медленный отклик',
      severity: 'high',
      type: 'performance',
      status: 'active',
      createdAt: new Date(Date.now() - 3600000),
      systemId: '3'
    },
    {
      id: '2',
      title: 'Неудачная попытка входа',
      description: 'Обнаружена подозрительная активность при попытке входа в систему',
      severity: 'medium',
      type: 'security',
      status: 'acknowledged',
      createdAt: new Date(Date.now() - 7200000),
      acknowledgedAt: new Date(Date.now() - 3600000),
      assignedTo: 'Оператор Иванов',
      systemId: '1'
    },
    {
      id: '3',
      title: 'Обновление системы завершено',
      description: 'Плановое обновление системы безопасности успешно завершено',
      severity: 'low',
      type: 'system',
      status: 'resolved',
      createdAt: new Date(Date.now() - 86400000),
      resolvedAt: new Date(Date.now() - 82800000),
      systemId: '2'
    }
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: '1',
      title: 'Проблема с доступом к кабинету',
      description: 'Не могу войти в правительственный кабинет, выдает ошибку авторизации',
      category: 'technical',
      priority: 'high',
      status: 'in_progress',
      userId: 'user123',
      assignedTo: 'Техподдержка Петров',
      createdAt: new Date(Date.now() - 7200000),
      updatedAt: new Date(Date.now() - 3600000),
      responseTime: 15
    },
    {
      id: '2',
      title: 'Запрос на добавление новой функции',
      description: 'Хотелось бы добавить возможность экспорта данных в Excel',
      category: 'feature',
      priority: 'medium',
      status: 'open',
      userId: 'user456',
      createdAt: new Date(Date.now() - 14400000),
      updatedAt: new Date(Date.now() - 14400000),
      responseTime: 0
    },
    {
      id: '3',
      title: 'Ошибка в отчете по качеству воды',
      description: 'В отчете отображаются некорректные данные по pH',
      category: 'bug',
      priority: 'urgent',
      status: 'resolved',
      userId: 'user789',
      assignedTo: 'Разработчик Сидоров',
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 82800000),
      resolvedAt: new Date(Date.now() - 82800000),
      responseTime: 45,
      satisfaction: 5
    }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'Иванов Иван Иванович',
      email: 'ivanov@example.com',
      role: 'government',
      status: 'active',
      lastLogin: new Date(Date.now() - 3600000),
      loginCount: 156,
      cabinetAccess: ['government', 'citizen'],
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Петрова Анна Сергеевна',
      email: 'petrova@example.com',
      role: 'scientific',
      status: 'active',
      lastLogin: new Date(Date.now() - 7200000),
      loginCount: 89,
      cabinetAccess: ['scientific', 'citizen'],
      createdAt: new Date('2023-03-20')
    },
    {
      id: '3',
      name: 'Сидоров Петр Владимирович',
      email: 'sidorov@example.com',
      role: 'investor',
      status: 'suspended',
      lastLogin: new Date(Date.now() - 86400000),
      loginCount: 23,
      cabinetAccess: ['investor', 'citizen'],
      createdAt: new Date('2023-06-10')
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      name: 'Общая доступность',
      value: 99.7,
      unit: '%',
      trend: 'up',
      change: 0.2,
      threshold: 99.5
    },
    {
      name: 'Среднее время отклика',
      value: 145,
      unit: 'мс',
      trend: 'down',
      change: -12,
      threshold: 200
    },
    {
      name: 'Активные пользователи',
      value: 1247,
      unit: '',
      trend: 'up',
      change: 8.5,
      threshold: 1000
    },
    {
      name: 'Ошибки системы',
      value: 0.3,
      unit: '%',
      trend: 'down',
      change: -0.1,
      threshold: 1.0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSystemIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="w-5 h-5" />;
      case 'database': return <Database className="w-5 h-5" />;
      case 'network': return <Network className="w-5 h-5" />;
      case 'application': return <Cpu className="w-5 h-5" />;
      case 'service': return <Wifi className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок кабинета */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gray-500 rounded-lg text-white">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Операторский кабинет</h1>
          <p className="text-gray-600">Управление операциями, мониторинг системы и техническая поддержка</p>
        </div>
      </div>

      {/* Навигация по вкладкам */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Обзор', icon: BarChart3 },
          { id: 'systems', label: 'Системы', icon: Server },
          { id: 'alerts', label: 'Оповещения', icon: AlertTriangle },
          { id: 'support', label: 'Поддержка', icon: Headphones },
          { id: 'users', label: 'Пользователи', icon: Users },
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
                    <span className="text-gray-600">к прошлому периоду</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Статус систем */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Статус систем</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systems.map((system) => (
                    <div key={system.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {getSystemIcon(system.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{system.name}</h4>
                          <p className="text-sm text-gray-600">Время работы: {system.uptime}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(system.status)}>
                          {system.status === 'online' ? 'Работает' :
                           system.status === 'offline' ? 'Отключен' :
                           system.status === 'warning' ? 'Предупреждение' :
                           system.status === 'error' ? 'Ошибка' : 'Обслуживание'}
                        </Badge>
                        <div className="text-sm text-gray-600">
                          {system.responseTime}мс
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Активные оповещения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.filter(alert => alert.status === 'active').map((alert) => (
                    <div key={alert.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{alert.title}</h4>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity === 'critical' ? 'Критично' :
                               alert.severity === 'high' ? 'Высоко' :
                               alert.severity === 'medium' ? 'Средне' : 'Низко'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{alert.description}</p>
                          <div className="text-xs text-gray-500 mt-2">
                            {alert.createdAt.toLocaleString()}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Принять
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Последние тикеты поддержки */}
          <Card>
            <CardHeader>
              <CardTitle>Последние тикеты поддержки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.slice(0, 3).map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Headphones className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{ticket.title}</h3>
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority === 'urgent' ? 'Срочно' :
                               ticket.priority === 'high' ? 'Высоко' :
                               ticket.priority === 'medium' ? 'Средне' : 'Низко'}
                            </Badge>
                            <Badge variant="outline">{ticket.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span>Статус: {ticket.status}</span>
                            <span>Время ответа: {ticket.responseTime}мин</span>
                            <span>Создан: {ticket.createdAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Просмотр
                        </Button>
                        <Button variant="outline" size="sm">
                          Назначить
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

      {activeTab === 'systems' && (
        <div className="space-y-6">
          {/* Мониторинг систем */}
          <Card>
            <CardHeader>
              <CardTitle>Мониторинг систем</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {systems.map((system) => (
                  <div key={system.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {getSystemIcon(system.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{system.name}</h3>
                          <p className="text-sm text-gray-600">Тип: {system.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(system.status)}>
                          {system.status === 'online' ? 'Работает' :
                           system.status === 'offline' ? 'Отключен' :
                           system.status === 'warning' ? 'Предупреждение' :
                           system.status === 'error' ? 'Ошибка' : 'Обслуживание'}
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">
                          Время работы: {system.uptime}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Производительность</span>
                        <div className="flex items-center gap-2">
                          <Progress value={system.performance} className="flex-1" />
                          <span className="text-sm font-medium">{system.performance}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Нагрузка</span>
                        <div className="flex items-center gap-2">
                          <Progress value={system.load} className="flex-1" />
                          <span className="text-sm font-medium">{system.load}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Память</span>
                        <div className="flex items-center gap-2">
                          <Progress value={system.memory} className="flex-1" />
                          <span className="text-sm font-medium">{system.memory}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Диск</span>
                        <div className="flex items-center gap-2">
                          <Progress value={system.disk} className="flex-1" />
                          <span className="text-sm font-medium">{system.disk}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <span>Время отклика: {system.responseTime}мс</span>
                      <span>Последняя проверка: {system.lastCheck.toLocaleTimeString()}</span>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        Детали
                      </Button>
                      <Button variant="outline" size="sm">
                        Перезапуск
                      </Button>
                      <Button variant="outline" size="sm">
                        Логи
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-6">
          {/* Создание оповещения */}
          <Card>
            <CardHeader>
              <CardTitle>Создать оповещение</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название оповещения</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Тип</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">Система</SelectItem>
                      <SelectItem value="security">Безопасность</SelectItem>
                      <SelectItem value="performance">Производительность</SelectItem>
                      <SelectItem value="user">Пользователь</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Важность</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите важность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкая</SelectItem>
                      <SelectItem value="medium">Средняя</SelectItem>
                      <SelectItem value="high">Высокая</SelectItem>
                      <SelectItem value="critical">Критическая</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Система</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите систему" />
                    </SelectTrigger>
                    <SelectContent>
                      {systems.map((system) => (
                        <SelectItem key={system.id} value={system.id}>{system.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea placeholder="Подробное описание оповещения" rows={3} />
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Создать оповещение
              </Button>
            </CardContent>
          </Card>

          {/* Все оповещения */}
          <Card>
            <CardHeader>
              <CardTitle>Все оповещения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{alert.title}</h3>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity === 'critical' ? 'Критично' :
                               alert.severity === 'high' ? 'Высоко' :
                               alert.severity === 'medium' ? 'Средне' : 'Низко'}
                            </Badge>
                            <Badge variant="outline">{alert.type}</Badge>
                            <Badge className={alert.status === 'active' ? 'bg-red-100 text-red-800' :
                                             alert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                                             'bg-green-100 text-green-800'}>
                              {alert.status === 'active' ? 'Активно' :
                               alert.status === 'acknowledged' ? 'Принято' : 'Решено'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Создано:</span>
                              <div className="font-medium">{alert.createdAt.toLocaleString()}</div>
                            </div>
                            {alert.acknowledgedAt && (
                              <div>
                                <span className="text-gray-500">Принято:</span>
                                <div className="font-medium">{alert.acknowledgedAt.toLocaleString()}</div>
                              </div>
                            )}
                            {alert.resolvedAt && (
                              <div>
                                <span className="text-gray-500">Решено:</span>
                                <div className="font-medium">{alert.resolvedAt.toLocaleString()}</div>
                              </div>
                            )}
                            {alert.assignedTo && (
                              <div>
                                <span className="text-gray-500">Назначено:</span>
                                <div className="font-medium">{alert.assignedTo}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Детали
                        </Button>
                        {alert.status === 'active' && (
                          <Button variant="outline" size="sm">
                            Принять
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="space-y-6">
          {/* Создание тикета */}
          <Card>
            <CardHeader>
              <CardTitle>Создать тикет поддержки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название тикета</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Техническая</SelectItem>
                      <SelectItem value="user">Пользовательская</SelectItem>
                      <SelectItem value="billing">Биллинг</SelectItem>
                      <SelectItem value="feature">Функциональность</SelectItem>
                      <SelectItem value="bug">Ошибка</SelectItem>
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
                      <SelectItem value="urgent">Срочный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Пользователь</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите пользователя" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea placeholder="Подробное описание проблемы" rows={3} />
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Создать тикет
              </Button>
            </CardContent>
          </Card>

          {/* Все тикеты */}
          <Card>
            <CardHeader>
              <CardTitle>Тикеты поддержки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Headphones className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{ticket.title}</h3>
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority === 'urgent' ? 'Срочно' :
                               ticket.priority === 'high' ? 'Высоко' :
                               ticket.priority === 'medium' ? 'Средне' : 'Низко'}
                            </Badge>
                            <Badge variant="outline">{ticket.category}</Badge>
                            <Badge className={ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                                             ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                             ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                             'bg-gray-100 text-gray-800'}>
                              {ticket.status === 'open' ? 'Открыт' :
                               ticket.status === 'in_progress' ? 'В работе' :
                               ticket.status === 'waiting' ? 'Ожидает' :
                               ticket.status === 'resolved' ? 'Решен' : 'Закрыт'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Создан:</span>
                              <div className="font-medium">{ticket.createdAt.toLocaleDateString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Время ответа:</span>
                              <div className="font-medium">{ticket.responseTime}мин</div>
                            </div>
                            {ticket.assignedTo && (
                              <div>
                                <span className="text-gray-500">Назначен:</span>
                                <div className="font-medium">{ticket.assignedTo}</div>
                              </div>
                            )}
                            {ticket.satisfaction && (
                              <div>
                                <span className="text-gray-500">Оценка:</span>
                                <div className="font-medium">{ticket.satisfaction}/5</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Просмотр
                        </Button>
                        <Button variant="outline" size="sm">
                          Назначить
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

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Управление пользователями */}
          <Card>
            <CardHeader>
              <CardTitle>Управление пользователями</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{user.name}</h3>
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' :
                                             user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                             user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                                             'bg-yellow-100 text-yellow-800'}>
                              {user.status === 'active' ? 'Активен' :
                               user.status === 'inactive' ? 'Неактивен' :
                               user.status === 'suspended' ? 'Приостановлен' : 'Ожидает'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Последний вход:</span>
                              <div className="font-medium">{user.lastLogin.toLocaleDateString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Входов:</span>
                              <div className="font-medium">{user.loginCount}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Доступ к кабинетам:</span>
                              <div className="font-medium">{user.cabinetAccess.length}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Регистрация:</span>
                              <div className="font-medium">{user.createdAt.toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Детали
                        </Button>
                        <Button variant="outline" size="sm">
                          Управление
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
          {/* Системная аналитика */}
          <Card>
            <CardHeader>
              <CardTitle>Системная аналитика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Производительность систем</h3>
                  {systems.map((system) => (
                    <div key={system.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{system.name}</span>
                        <span className="text-sm text-gray-600">{system.performance}%</span>
                      </div>
                      <Progress value={system.performance} className="mb-1" />
                      <div className="text-xs text-gray-600">
                        Нагрузка: {system.load}% | Память: {system.memory}% | Диск: {system.disk}%
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Статистика поддержки</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span>Открытые тикеты</span>
                        <span className="font-medium">{supportTickets.filter(t => t.status === 'open').length}</span>
                      </div>
                      <Progress value={30} className="mb-1" />
                      <div className="text-xs text-gray-600">30% от общего количества</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span>Среднее время ответа</span>
                        <span className="font-medium">45мин</span>
                      </div>
                      <Progress value={75} className="mb-1" />
                      <div className="text-xs text-green-600">-15% к прошлому месяцу</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span>Удовлетворенность</span>
                        <span className="font-medium">4.2/5</span>
                      </div>
                      <Progress value={84} className="mb-1" />
                      <div className="text-xs text-green-600">+5% к прошлому месяцу</div>
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
                  <span>Системный отчет</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span>Производительность</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Users className="w-6 h-6 mb-2" />
                  <span>Пользователи</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

