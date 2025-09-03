import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  Users, 
  TrendingUp,
  Shield,
  Globe,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Policy {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'expired' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  region: string;
  category: string;
  createdAt: Date;
  expiresAt?: Date;
  affectedPopulation: number;
  budget: number;
}

interface Crisis {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  type: 'water_shortage' | 'contamination' | 'flood' | 'drought' | 'infrastructure';
  status: 'reported' | 'investigating' | 'responding' | 'resolved';
  reportedAt: Date;
  affectedArea: number;
  affectedPopulation: number;
}

interface RegionalData {
  region: string;
  population: number;
  waterQuality: 'excellent' | 'good' | 'fair' | 'poor';
  activePolicies: number;
  crisisCount: number;
  complianceRate: number;
}

export default function GovernmentCabinet() {
  const [activeTab, setActiveTab] = useState<'overview' | 'policies' | 'crises' | 'coordination'>('overview');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [selectedCrisis, setSelectedCrisis] = useState<Crisis | null>(null);

  // Моковые данные
  const policies: Policy[] = [
    {
      id: '1',
      title: 'Стандарты качества питьевой воды 2024',
      description: 'Обновленные стандарты качества питьевой воды для всех регионов',
      status: 'active',
      priority: 'high',
      region: 'Все регионы',
      category: 'Качество воды',
      createdAt: new Date('2024-01-15'),
      expiresAt: new Date('2025-01-15'),
      affectedPopulation: 150000000,
      budget: 5000000
    },
    {
      id: '2',
      title: 'Программа модернизации водной инфраструктуры',
      description: 'Комплексная программа обновления водопроводных сетей',
      status: 'active',
      priority: 'critical',
      region: 'Центральный регион',
      category: 'Инфраструктура',
      createdAt: new Date('2024-03-01'),
      affectedPopulation: 25000000,
      budget: 15000000
    }
  ];

  const crises: Crisis[] = [
    {
      id: '1',
      title: 'Загрязнение реки Волга',
      description: 'Обнаружено превышение ПДК по тяжелым металлам',
      severity: 'high',
      location: 'Волгоградская область',
      type: 'contamination',
      status: 'responding',
      reportedAt: new Date('2024-01-20'),
      affectedArea: 1500,
      affectedPopulation: 500000
    },
    {
      id: '2',
      title: 'Засуха в южных регионах',
      description: 'Критически низкий уровень водохранилищ',
      severity: 'critical',
      location: 'Краснодарский край',
      type: 'drought',
      status: 'investigating',
      reportedAt: new Date('2024-01-18'),
      affectedArea: 5000,
      affectedPopulation: 2000000
    }
  ];

  const regionalData: RegionalData[] = [
    {
      region: 'Центральный',
      population: 40000000,
      waterQuality: 'good',
      activePolicies: 5,
      crisisCount: 2,
      complianceRate: 85
    },
    {
      region: 'Южный',
      population: 25000000,
      waterQuality: 'fair',
      activePolicies: 3,
      crisisCount: 3,
      complianceRate: 72
    },
    {
      region: 'Северо-Западный',
      population: 15000000,
      waterQuality: 'excellent',
      activePolicies: 4,
      crisisCount: 1,
      complianceRate: 94
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-orange-100 text-orange-800';
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

  const getWaterQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок кабинета */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-green-500 rounded-lg text-white">
          <Building className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Правительственный кабинет</h1>
          <p className="text-gray-600">Управление политиками, координация и кризисное реагирование</p>
        </div>
      </div>

      {/* Навигация по вкладкам */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Обзор', icon: TrendingUp },
          { id: 'policies', label: 'Политики', icon: FileText },
          { id: 'crises', label: 'Кризисы', icon: AlertTriangle },
          { id: 'coordination', label: 'Координация', icon: Users }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Статистика */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Активные политики</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{policies.filter(p => p.status === 'active').length}</div>
              <p className="text-xs text-gray-600">Всего политик</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Активные кризисы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{crises.filter(c => c.status !== 'resolved').length}</div>
              <p className="text-xs text-gray-600">Требуют внимания</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Охват населения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85M</div>
              <p className="text-xs text-gray-600">Под защитой</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Средняя оценка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">8.4/10</div>
              <p className="text-xs text-gray-600">Эффективность</p>
            </CardContent>
          </Card>

          {/* Региональные данные */}
          <div className="md:col-span-2 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Региональная статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalData.map((region) => (
                    <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-medium">{region.region}</h3>
                          <p className="text-sm text-gray-600">{region.population.toLocaleString()} чел.</p>
                        </div>
                        <Badge className={getWaterQualityColor(region.waterQuality)}>
                          {region.waterQuality === 'excellent' ? 'Отлично' :
                           region.waterQuality === 'good' ? 'Хорошо' :
                           region.waterQuality === 'fair' ? 'Удовлетворительно' : 'Плохо'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-4 text-sm">
                          <span>Политики: {region.activePolicies}</span>
                          <span>Кризисы: {region.crisisCount}</span>
                          <span>Соответствие: {region.complianceRate}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="space-y-6">
          {/* Создание новой политики */}
          <Card>
            <CardHeader>
              <CardTitle>Создать новую политику</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название политики</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quality">Качество воды</SelectItem>
                      <SelectItem value="infrastructure">Инфраструктура</SelectItem>
                      <SelectItem value="conservation">Сохранение</SelectItem>
                      <SelectItem value="emergency">Чрезвычайные ситуации</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Регион</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите регион" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все регионы</SelectItem>
                      <SelectItem value="central">Центральный</SelectItem>
                      <SelectItem value="south">Южный</SelectItem>
                      <SelectItem value="northwest">Северо-Западный</SelectItem>
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
                <Textarea placeholder="Подробное описание политики" rows={3} />
              </div>
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Создать политику
              </Button>
            </CardContent>
          </Card>

          {/* Список политик */}
          <Card>
            <CardHeader>
              <CardTitle>Активные политики</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{policy.title}</h3>
                          <Badge className={getStatusColor(policy.status)}>
                            {policy.status === 'active' ? 'Активна' :
                             policy.status === 'draft' ? 'Черновик' :
                             policy.status === 'expired' ? 'Истекла' : 'Отменена'}
                          </Badge>
                          <Badge variant="outline">{policy.priority}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Регион: {policy.region}</span>
                          <span>Население: {policy.affectedPopulation.toLocaleString()}</span>
                          <span>Бюджет: ${policy.budget.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Редактировать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'crises' && (
        <div className="space-y-6">
          {/* Создание отчета о кризисе */}
          <Card>
            <CardHeader>
              <CardTitle>Сообщить о кризисе</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название кризиса</Label>
                  <Input placeholder="Краткое описание" />
                </div>
                <div>
                  <Label>Тип кризиса</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water_shortage">Нехватка воды</SelectItem>
                      <SelectItem value="contamination">Загрязнение</SelectItem>
                      <SelectItem value="flood">Наводнение</SelectItem>
                      <SelectItem value="drought">Засуха</SelectItem>
                      <SelectItem value="infrastructure">Инфраструктура</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Местоположение</Label>
                  <Input placeholder="Регион, область" />
                </div>
                <div>
                  <Label>Серьезность</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите уровень" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкая</SelectItem>
                      <SelectItem value="medium">Средняя</SelectItem>
                      <SelectItem value="high">Высокая</SelectItem>
                      <SelectItem value="critical">Критическая</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea placeholder="Подробное описание ситуации" rows={3} />
              </div>
              <Button className="w-full">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Сообщить о кризисе
              </Button>
            </CardContent>
          </Card>

          {/* Список кризисов */}
          <Card>
            <CardHeader>
              <CardTitle>Активные кризисы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crises.map((crisis) => (
                  <div key={crisis.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{crisis.title}</h3>
                          <Badge className={getSeverityColor(crisis.severity)}>
                            {crisis.severity === 'critical' ? 'Критический' :
                             crisis.severity === 'high' ? 'Высокий' :
                             crisis.severity === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                          <Badge variant="outline">{crisis.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{crisis.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Местоположение: {crisis.location}</span>
                          <span>Пострадало: {crisis.affectedPopulation.toLocaleString()} чел.</span>
                          <span>Площадь: {crisis.affectedArea} км²</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Детали
                        </Button>
                        <Button variant="outline" size="sm">
                          Координировать
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

      {activeTab === 'coordination' && (
        <div className="space-y-6">
          {/* Межрегиональная координация */}
          <Card>
            <CardHeader>
              <CardTitle>Межрегиональная координация</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Активные координационные группы</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Волжский бассейн</h4>
                          <p className="text-sm text-gray-600">5 регионов, 12 участников</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Активна</Badge>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Черноморское побережье</h4>
                          <p className="text-sm text-gray-600">3 региона, 8 участников</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Планируется</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Быстрые действия</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Создать конференцию
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Отправить уведомление
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Запланировать встречу
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Создать отчет
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Контакты региональных представителей */}
          <Card>
            <CardHeader>
              <CardTitle>Региональные представители</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionalData.map((region) => (
                  <div key={region.region} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{region.region}</h4>
                        <p className="text-sm text-gray-600">Представитель</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>+7 (XXX) XXX-XX-XX</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>gov.{region.region.toLowerCase()}@vodeco.ru</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Доступен для связи</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

