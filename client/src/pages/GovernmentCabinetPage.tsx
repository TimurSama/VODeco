import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, FileText, Shield, Users, Globe,
  CheckCircle, Clock, AlertTriangle, Scale,
  Eye, Download, Upload, BarChart3, Target, Database,
  MapPin, Brain, Inbox, TrendingUp
} from "lucide-react";

// Типы данных для правительственного кабинета
interface Policy {
  id: string;
  title: string;
  titleEn: string;
  type: 'regulation' | 'standard' | 'guideline' | 'law';
  status: 'draft' | 'review' | 'approved' | 'active' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveDate: Date;
  lastUpdated: Date;
  description: string;
  descriptionEn: string;
  department: string;
}

interface ComplianceMetric {
  id: string;
  name: string;
  nameEn: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastCheck: Date;
  status: 'compliant' | 'warning' | 'violation';
}

interface GovernmentProgram {
  id: string;
  name: string;
  nameEn: string;
  budget: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: 'planning' | 'active' | 'completed' | 'suspended';
  beneficiaries: number;
  description: string;
  descriptionEn: string;
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'Стандарты качества питьевой воды 2024',
    titleEn: 'Drinking Water Quality Standards 2024',
    type: 'standard',
    status: 'active',
    priority: 'high',
    effectiveDate: new Date(2024, 0, 1),
    lastUpdated: new Date(2024, 2, 15),
    description: 'Обновленные стандарты качества питьевой воды в соответствии с рекомендациями ВОЗ',
    descriptionEn: 'Updated drinking water quality standards in accordance with WHO recommendations',
    department: 'Министерство здравоохранения'
  },
  {
    id: '2',
    title: 'Регламент экологического мониторинга водных ресурсов',
    titleEn: 'Water Resources Environmental Monitoring Regulation',
    type: 'regulation',
    status: 'review',
    priority: 'medium',
    effectiveDate: new Date(2024, 6, 1),
    lastUpdated: new Date(2024, 4, 10),
    description: 'Новый регламент обязательного экологического мониторинга всех водных объектов',
    descriptionEn: 'New regulation for mandatory environmental monitoring of all water bodies',
    department: 'Министерство экологии'
  }
];

const mockComplianceMetrics: ComplianceMetric[] = [
  {
    id: '1',
    name: 'Соответствие стандартам качества воды',
    nameEn: 'Water Quality Standards Compliance',
    value: 94.2,
    target: 95.0,
    unit: '%',
    trend: 'up',
    lastCheck: new Date(),
    status: 'warning'
  },
  {
    id: '2',
    name: 'Покрытие системами мониторинга',
    nameEn: 'Monitoring Systems Coverage',
    value: 87.5,
    target: 90.0,
    unit: '%',
    trend: 'up',
    lastCheck: new Date(),
    status: 'warning'
  },
  {
    id: '3',
    name: 'Соблюдение экологических норм',
    nameEn: 'Environmental Standards Compliance',
    value: 96.8,
    target: 95.0,
    unit: '%',
    trend: 'stable',
    lastCheck: new Date(),
    status: 'compliant'
  }
];

const mockPrograms: GovernmentProgram[] = [
  {
    id: '1',
    name: 'Программа модернизации водоснабжения сельских районов',
    nameEn: 'Rural Water Supply Modernization Program',
    budget: 50000000,
    spent: 32500000,
    startDate: new Date(2023, 0, 1),
    endDate: new Date(2025, 11, 31),
    progress: 65,
    status: 'active',
    beneficiaries: 125000,
    description: 'Комплексная программа улучшения водоснабжения в сельских регионах',
    descriptionEn: 'Comprehensive program to improve water supply in rural regions'
  },
  {
    id: '2',
    name: 'Цифровизация водного хозяйства',
    nameEn: 'Water Management Digitalization',
    budget: 25000000,
    spent: 15000000,
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2026, 11, 31),
    progress: 40,
    status: 'active',
    beneficiaries: 500000,
    description: 'Внедрение цифровых технологий в управление водными ресурсами',
    descriptionEn: 'Implementation of digital technologies in water resource management'
  }
];

export default function GovernmentCabinetPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const isRussian = i18n.language === 'ru';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': case 'active': case 'approved': return 'text-green-400';
      case 'warning': case 'review': case 'draft': return 'text-yellow-400';
      case 'violation': case 'suspended': case 'archived': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': case 'active': case 'approved': 
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': case 'review': case 'draft': 
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'violation': case 'suspended': case 'archived': 
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: 
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Боковое меню */}
      <div className="w-64 bg-background/40 backdrop-blur-sm border-r border-primary/20 flex flex-col">
        {/* Заголовок кабинета */}
        <div className="p-6 border-b border-primary/20">
          <div className="hexagon h-12 w-12 bg-gradient-to-r from-purple-500/30 to-violet-600/30 
            flex items-center justify-center mb-3">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {t('government.title', 'Правительственный кабинет')}
          </h2>
          <p className="text-white/60 text-sm">
            {t('government.subtitle', 'Регулирование и контроль')}
          </p>
        </div>

        {/* Навигационное меню */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'overview'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-3" />
              Главная панель
            </button>
            
            <button
              onClick={() => setActiveTab('map')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'map'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <MapPin className="h-4 w-4 mr-3" />
              Карта региона
            </button>
            
            <button
              onClick={() => setActiveTab('ai-analysis')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'ai-analysis'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <Brain className="h-4 w-4 mr-3" />
              ИИ Анализ
            </button>
            
            <button
              onClick={() => setActiveTab('requests')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'requests'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <Inbox className="h-4 w-4 mr-3" />
              Запросы
            </button>
            
            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'contacts'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <Users className="h-4 w-4 mr-3" />
              Контакты
            </button>
            
            <button
              onClick={() => setActiveTab('research')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'research'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <Database className="h-4 w-4 mr-3" />
              Исследования
            </button>
            
            <button
              onClick={() => setActiveTab('investments')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'investments'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <TrendingUp className="h-4 w-4 mr-3" />
              Инвестиции
            </button>
            
            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'documents'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <FileText className="h-4 w-4 mr-3" />
              Документооборот
            </button>
          </div>
        </nav>
      </div>

      {/* Основной контент */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

        {/* Обзор */}
        <TabsContent value="overview" className="mt-6">
          {/* Ключевые показатели */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-400" />
                  {t('government.metrics.activePolicies', 'Активные политики')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {mockPolicies.filter(p => p.status === 'active').length}
                </p>
                <p className="text-blue-400 text-sm">
                  {mockPolicies.filter(p => p.status === 'review').length} на рассмотрении
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-400" />
                  {t('government.metrics.compliance', 'Общее соответствие')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">92.8%</p>
                <p className="text-green-400 text-sm">+2.1% за месяц</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Target className="h-4 w-4 mr-2 text-purple-400" />
                  {t('government.metrics.programs', 'Активные программы')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {mockPrograms.filter(p => p.status === 'active').length}
                </p>
                <p className="text-purple-400 text-sm">
                  {formatCurrency(mockPrograms.reduce((sum, p) => sum + p.budget, 0))} бюджет
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-orange-400" />
                  {t('government.metrics.beneficiaries', 'Бенефициары')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {mockPrograms.reduce((sum, p) => sum + p.beneficiaries, 0).toLocaleString()}
                </p>
                <p className="text-orange-400 text-sm">Граждан охвачено программами</p>
              </CardContent>
            </Card>
          </div>

          {/* Показатели соответствия */}
          <Card className="glassmorphism-dark border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                {t('government.overview.compliance', 'Показатели соответствия')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComplianceMetrics.map((metric) => (
                  <div key={metric.id} className="bg-background/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">
                        {isRussian ? metric.name : metric.nameEn}
                      </h4>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metric.status)}
                        <span className={getStatusColor(metric.status)}>
                          {metric.value}{metric.unit}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">
                          Цель: {metric.target}{metric.unit}
                        </span>
                        <span className="text-white/60">
                          Проверено: {metric.lastCheck.toLocaleDateString()}
                        </span>
                      </div>
                      <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Карта региона */}
        <TabsContent value="map" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-400" />
                    Гидрографическая сеть региона
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-background/20 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="h-16 w-16 text-primary/60 mx-auto mb-4" />
                        <p className="text-white/60 mb-2">[Интерактивная карта водных ресурсов]</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                            <span className="text-white/80">Источники</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <span className="text-white/80">Реки</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                            <span className="text-white/80">Водохранилища</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span className="text-white/80">Скважины</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400">
                      Источники
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-400/30 text-green-400">
                      Потребители
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-400/30 text-purple-400">
                      Качество
                    </Button>
                    <Button size="sm" variant="outline" className="border-yellow-400/30 text-yellow-400">
                      Мониторинг
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Водопотребители</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Промышленность</span>
                        <span className="text-blue-400">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <p className="text-white/60 text-xs mt-1">2.3 млн м³/сут</p>
                    </div>
                    
                    <div className="bg-background/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Сельское хозяйство</span>
                        <span className="text-green-400">32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                      <p className="text-white/60 text-xs mt-1">1.6 млн м³/сут</p>
                    </div>
                    
                    <div className="bg-background/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Муниципалитеты</span>
                        <span className="text-purple-400">23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                      <p className="text-white/60 text-xs mt-1">1.2 млн м³/сут</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Качество воды по этапам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Источник</span>
                      <Badge className="bg-green-500/20 text-green-400">Отличное</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Обработка</span>
                      <Badge className="bg-blue-500/20 text-blue-400">Хорошее</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Распределение</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Удовлетв.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Возврат</span>
                      <Badge className="bg-red-500/20 text-red-400">Требует внимания</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ИИ Анализ */}
        <TabsContent value="ai-analysis" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
                  Прогнозирование и моделирование
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Уровень водных ресурсов</h4>
                    <div className="h-32 bg-background/20 rounded-lg flex items-center justify-center mb-3">
                      <p className="text-white/60 text-sm">[График прогноза уровня воды на 30 дней]</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Текущий:</span>
                      <span className="text-white">87.3%</span>
                      <span className="text-white/60">Прогноз:</span>
                      <span className="text-green-400">↑ 92.1%</span>
                    </div>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Качество воды</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">pH-баланс</span>
                        <span className="text-green-400">Стабильный</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Загрязнения</span>
                        <span className="text-yellow-400">Умеренные</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Тенденция</span>
                        <span className="text-blue-400">Улучшение</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                  Раннее предупреждение
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="text-red-400 font-medium">Критично</span>
                    </div>
                    <p className="text-white text-sm mb-2">Возможная утечка в районе Чирчик</p>
                    <p className="text-white/60 text-xs">Обнаружено 2 часа назад • Требует немедленного внимания</p>
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">Предупреждение</span>
                    </div>
                    <p className="text-white text-sm mb-2">Повышенное потребление в Ташкенте</p>
                    <p className="text-white/60 text-xs">Прогноз на завтра • Рекомендуется контроль</p>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 font-medium">Информация</span>
                    </div>
                    <p className="text-white text-sm mb-2">Оптимальные условия в Самарканде</p>
                    <p className="text-white/60 text-xs">Все показатели в норме</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Сценарное моделирование
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Изменения климата</h4>
                  <p className="text-white/60 text-sm mb-3">Влияние повышения температуры на +2°C</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Испарение:</span>
                      <span className="text-red-400">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Потребление:</span>
                      <span className="text-red-400">+22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Осадки:</span>
                      <span className="text-yellow-400">-8%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                    Подробный анализ
                  </Button>
                </div>
                
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Авария на ГЭС</h4>
                  <p className="text-white/60 text-sm mb-3">Остановка Чирчикской ГЭС на 7 дней</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Электричество:</span>
                      <span className="text-red-400">-340 МВт</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Водоснабжение:</span>
                      <span className="text-yellow-400">Резерв</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Ущерб:</span>
                      <span className="text-red-400">$2.3М</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-red-600 hover:bg-red-700">
                    План реагирования
                  </Button>
                </div>
                
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Новые инвестиции</h4>
                  <p className="text-white/60 text-sm mb-3">Строительство станции в Намангане</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Производительность:</span>
                      <span className="text-green-400">+500K м³/сут</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Обслуживание:</span>
                      <span className="text-green-400">+150K чел</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Окупаемость:</span>
                      <span className="text-blue-400">4.2 года</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                    Экономический эффект
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Политики */}
        <TabsContent value="policies" className="mt-6">
          <div className="space-y-6">
            {mockPolicies.map((policy) => (
              <Card key={policy.id} className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(policy.status)}
                      <CardTitle className="text-white">
                        {isRussian ? policy.title : policy.titleEn}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(policy.priority)}>
                        {policy.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {policy.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    {isRussian ? policy.description : policy.descriptionEn}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-white/60 text-sm">Статус:</p>
                      <p className={`font-medium ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Департамент:</p>
                      <p className="text-white">{policy.department}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Дата вступления:</p>
                      <p className="text-white">{policy.effectiveDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Последнее обновление:</p>
                      <p className="text-white">{policy.lastUpdated.toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      <Eye className="h-4 w-4 mr-1" />
                      {t('government.policies.view', 'Просмотр')}
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      <Download className="h-4 w-4 mr-1" />
                      {t('government.policies.download', 'Скачать')}
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      <FileText className="h-4 w-4 mr-1" />
                      {t('government.policies.edit', 'Редактировать')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="glassmorphism-dark border-primary/20 border-dashed">
              <CardContent className="p-6 text-center">
                <Upload className="h-12 w-12 text-primary/60 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">
                  {t('government.policies.create', 'Создать новую политику')}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  {t('government.policies.createDesc', 'Добавьте новую политику или регламент')}
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  {t('government.policies.add', 'Добавить политику')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Запросы и события */}
        <TabsContent value="requests" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-400" />
                    Входящие запросы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">Жалоба на качество воды</h4>
                          <p className="text-white/60 text-sm">Махалля "Чиланзар" • 15 семей</p>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400">Срочно</Badge>
                      </div>
                      <p className="text-white/80 text-sm mb-3">Жители сообщают о странном запахе и цвете воды из крана. Требуется немедленная проверка системы водоснабжения.</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">Назначить инспекцию</Button>
                        <Button size="sm" variant="outline" className="border-primary/30 text-primary">Связаться</Button>
                      </div>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">Запрос на расширение сети</h4>
                          <p className="text-white/60 text-sm">Хоким Наманганской области</p>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400">Планирование</Badge>
                      </div>
                      <p className="text-white/80 text-sm mb-3">Необходимо подключение 5 новых махаллей к центральному водоснабжению. Бюджет: $2.8М.</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Рассмотреть проект</Button>
                        <Button size="sm" variant="outline" className="border-primary/30 text-primary">В календарь</Button>
                      </div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">Предложение по сотрудничеству</h4>
                          <p className="text-white/60 text-sm">Корпорация "Uzbekgidroenergo"</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400">Коммерческое</Badge>
                      </div>
                      <p className="text-white/80 text-sm mb-3">Совместный проект по модернизации Чарвакской ГЭС с применением зеленых технологий.</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Изучить предложение</Button>
                        <Button size="sm" variant="outline" className="border-primary/30 text-primary">Переговоры</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Журнал обращений</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white/60 py-2">Дата</th>
                          <th className="text-left text-white/60 py-2">Заявитель</th>
                          <th className="text-left text-white/60 py-2">Тема</th>
                          <th className="text-left text-white/60 py-2">Статус</th>
                          <th className="text-left text-white/60 py-2">Ответственный</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="text-white py-2">25.05.24</td>
                          <td className="text-white py-2">Махалля Чиланзар</td>
                          <td className="text-white py-2">Качество воды</td>
                          <td className="py-2"><Badge className="bg-red-500/20 text-red-400">В работе</Badge></td>
                          <td className="text-white/60 py-2">И. Каримов</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="text-white py-2">24.05.24</td>
                          <td className="text-white py-2">Хоким Намангана</td>
                          <td className="text-white py-2">Расширение сети</td>
                          <td className="py-2"><Badge className="bg-yellow-500/20 text-yellow-400">Планирование</Badge></td>
                          <td className="text-white/60 py-2">А. Рахимов</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="text-white py-2">23.05.24</td>
                          <td className="text-white py-2">Узбекгидроэнерго</td>
                          <td className="text-white py-2">Сотрудничество</td>
                          <td className="py-2"><Badge className="bg-green-500/20 text-green-400">Одобрено</Badge></td>
                          <td className="text-white/60 py-2">Д. Мирзаев</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Автоматическое распределение</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Приоритизация</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Критичные:</span>
                          <span className="text-red-400">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Высокие:</span>
                          <span className="text-yellow-400">7</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Обычные:</span>
                          <span className="text-blue-400">12</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-white font-medium mb-2">Департаменты</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Водоснабжение:</span>
                          <span className="text-white">8 задач</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Экология:</span>
                          <span className="text-white">5 задач</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Инфраструктура:</span>
                          <span className="text-white">9 задач</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Создать задачу
                    </Button>
                    <Button variant="outline" className="w-full border-primary/30 text-primary">
                      Массовое уведомление
                    </Button>
                    <Button variant="outline" className="w-full border-green-600/30 text-green-400">
                      Экстренное собрание
                    </Button>
                    <Button variant="outline" className="w-full border-purple-600/30 text-purple-400">
                      Отчет для DAO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Контакты и связи */}
        <TabsContent value="contacts" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-400" />
                  Ключевые контакты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Uzbekgidroenergo</h4>
                        <p className="text-white/60 text-sm">Государственная корпорация</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Директор:</span>
                        <span className="text-white">А. Рахманов</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Телефон:</span>
                        <span className="text-white">+998 71 123-45-67</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Последний контакт:</span>
                        <span className="text-white/60">2 дня назад</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Видеозвонок
                      </Button>
                      <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                        Сообщение
                      </Button>
                    </div>
                  </div>

                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Институт водных проблем</h4>
                        <p className="text-white/60 text-sm">Исследовательский центр</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Руководитель:</span>
                        <span className="text-white">Д-р И. Каримова</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Email:</span>
                        <span className="text-white">info@waterinst.uz</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Проект:</span>
                        <span className="text-green-400">Активный</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Конференция
                      </Button>
                      <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                        Документы
                      </Button>
                    </div>
                  </div>

                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <Scale className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Министерство экологии КЗ</h4>
                        <p className="text-white/60 text-sm">Республика Казахстан</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Министр:</span>
                        <span className="text-white">С. Назарбаев</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Направление:</span>
                        <span className="text-white">Трансграничные воды</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Соглашение:</span>
                        <span className="text-blue-400">В разработке</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Дипломатия
                      </Button>
                      <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                        Переводчик
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">История взаимодействий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-400 pl-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-white font-medium">Подписание МОД с Казахстаном</h4>
                      <span className="text-white/60 text-xs">20.05.24</span>
                    </div>
                    <p className="text-white/80 text-sm mb-2">Меморандум о сотрудничестве по управлению трансграничными водными ресурсами Сырдарьи.</p>
                    <div className="flex gap-2">
                      <Badge className="bg-green-500/20 text-green-400">Завершено</Badge>
                      <Badge className="bg-blue-500/20 text-blue-400">Документ</Badge>
                    </div>
                  </div>

                  <div className="border-l-2 border-green-400 pl-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-white font-medium">Техническая консультация</h4>
                      <span className="text-white/60 text-xs">18.05.24</span>
                    </div>
                    <p className="text-white/80 text-sm mb-2">Видеоконференция с экспертами института по вопросам модернизации очистных сооружений.</p>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400">Техническая</Badge>
                      <Badge className="bg-purple-500/20 text-purple-400">Видео</Badge>
                    </div>
                  </div>

                  <div className="border-l-2 border-yellow-400 pl-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-white font-medium">Переговоры об инвестициях</h4>
                      <span className="text-white/60 text-xs">15.05.24</span>
                    </div>
                    <p className="text-white/80 text-sm mb-2">Обсуждение совместного финансирования проекта Чарвакской ГЭС с Uzbekgidroenergo.</p>
                    <div className="flex gap-2">
                      <Badge className="bg-yellow-500/20 text-yellow-400">В процессе</Badge>
                      <Badge className="bg-green-500/20 text-green-400">$15M</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Соответствие */}
        <TabsContent value="compliance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-blue-400" />
                  {t('government.compliance.audit', 'Результаты аудита')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-white/60">[График результатов аудита по времени]</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/60 text-sm">Соответствует</p>
                    <p className="text-green-400 font-bold">87%</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Предупреждения</p>
                    <p className="text-yellow-400 font-bold">11%</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Нарушения</p>
                    <p className="text-red-400 font-bold">2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-400" />
                  {t('government.compliance.monitoring', 'Мониторинг соответствия')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">Автоматические проверки</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-white/60 text-sm">Последняя проверка: сегодня в 14:30</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">Ручные инспекции</span>
                      <Clock className="h-5 w-5 text-yellow-400" />
                    </div>
                    <p className="text-white/60 text-sm">Запланировано: 15 мая 2024</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">Аудит третьей стороны</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-white/60 text-sm">Завершен: 28 апреля 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Исследования по региону */}
        <TabsContent value="research" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-purple-400" />
                    Публикации и исследования
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-background/20 rounded-lg p-4 border-l-4 border-green-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">Мониторинг бассейна Амударьи 2024</h4>
                          <p className="text-white/60 text-sm">Институт водных проблем АН РУз • 15.05.2024</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Новое</Badge>
                      </div>
                      <p className="text-white/80 text-sm mb-3">Комплексный анализ состояния водных ресурсов в бассейне Амударьи за 2023-2024 гг. с прогнозами на ближайшие 5 лет.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge className="bg-blue-500/20 text-blue-400">PDF • 2.3MB</Badge>
                          <Badge className="bg-purple-500/20 text-purple-400">Гидрология</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            <Eye className="h-3 w-3 mr-1" />
                            Просмотр
                          </Button>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Download className="h-3 w-3 mr-1" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background/20 rounded-lg p-4 border-l-4 border-blue-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">Влияние изменения климата на водный баланс</h4>
                          <p className="text-white/60 text-sm">Узгидромет • 10.05.2024</p>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400">Важное</Badge>
                      </div>
                      <p className="text-white/80 text-sm mb-3">Исследование воздействия глобального потепления на водные ресурсы Узбекистана с моделированием сценариев до 2050 года.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge className="bg-red-500/20 text-red-400">Excel • 890KB</Badge>
                          <Badge className="bg-green-500/20 text-green-400">Климат</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            Анализ
                          </Button>
                          <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400">
                            Поделиться
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background/20 rounded-lg p-4 border-l-4 border-purple-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">Международный опыт водосбережения</h4>
                          <p className="text-white/60 text-sm">UNECE • 05.05.2024</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400">Международное</Badge>
                      </div>
                      <p className="text-white/80 text-sm mb-3">Сравнительный анализ технологий и подходов к эффективному использованию воды в аридных регионах мира.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge className="bg-green-500/20 text-green-400">PDF • 4.1MB</Badge>
                          <Badge className="bg-blue-500/20 text-blue-400">EN/RU</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            Перевод
                          </Button>
                          <Button size="sm" variant="outline" className="border-green-400/30 text-green-400">
                            Адаптация
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Загрузка собственных исследований</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-primary/60 mx-auto mb-4" />
                      <p className="text-white mb-2">Загрузите документы исследований</p>
                      <p className="text-white/60 text-sm mb-4">PDF, DOC, XLS до 50MB</p>
                      <Button className="bg-primary hover:bg-primary/90">
                        Выбрать файлы
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-white/60 text-sm">Категория</label>
                      <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                        <option>Гидрология</option>
                        <option>Экология</option>
                        <option>Климатология</option>
                        <option>Экономика</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm">Доступ</label>
                      <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                        <option>Публичный</option>
                        <option>Ведомственный</option>
                        <option>Ограниченный</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Данные мониторинга</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-background/20 rounded-lg p-3">
                      <h4 className="text-white font-medium mb-2">Качество воды</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Станций:</span>
                          <span className="text-white">127</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Параметров:</span>
                          <span className="text-white">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Обновление:</span>
                          <span className="text-green-400">Реальное время</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                        Экспорт данных
                      </Button>
                    </div>

                    <div className="bg-background/20 rounded-lg p-3">
                      <h4 className="text-white font-medium mb-2">Метеоданные</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Метеостанций:</span>
                          <span className="text-white">89</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Архив:</span>
                          <span className="text-white">30 лет</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Прогноз:</span>
                          <span className="text-blue-400">14 дней</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                        API доступ
                      </Button>
                    </div>

                    <div className="bg-background/20 rounded-lg p-3">
                      <h4 className="text-white font-medium mb-2">Расход воды</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Створов:</span>
                          <span className="text-white">56</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Точность:</span>
                          <span className="text-white">±2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Интервал:</span>
                          <span className="text-blue-400">15 мин</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                        Отчеты
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Международные базы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">FAO AQUASTAT</p>
                        <p className="text-white/60 text-xs">Глобальная статистика</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                        Подключить
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">UNESCO IHP</p>
                        <p className="text-white/60 text-xs">Гидрологические данные</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Активно</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">UNECE Water</p>
                        <p className="text-white/60 text-xs">Трансграничные воды</p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400">Запрошено</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Инвестиционные объекты */}
        <TabsContent value="investments" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-400" />
                  Действующие объекты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">Станция водоочистки Андижан</h4>
                        <p className="text-white/60 text-sm">Производительность: 50,000 м³/сут</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Действует</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-white/60">Бюджет:</span>
                        <p className="text-white font-medium">$3.2М</p>
                      </div>
                      <div>
                        <span className="text-white/60">Завершено:</span>
                        <p className="text-white font-medium">Март 2024</p>
                      </div>
                      <div>
                        <span className="text-white/60">Партнеры:</span>
                        <p className="text-white font-medium">АБР, Узбекгидро</p>
                      </div>
                      <div>
                        <span className="text-white/60">Обслуживает:</span>
                        <p className="text-white font-medium">85,000 чел</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                        Мониторинг
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400">
                        Отчеты
                      </Button>
                    </div>
                  </div>

                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">Модернизация Чарвакской ГЭС</h4>
                        <p className="text-white/60 text-sm">Мощность: +15 МВт</p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400">В процессе</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-white/60">Бюджет:</span>
                        <p className="text-white font-medium">$18.5М</p>
                      </div>
                      <div>
                        <span className="text-white/60">Прогресс:</span>
                        <p className="text-blue-400 font-medium">67%</p>
                      </div>
                      <div>
                        <span className="text-white/60">Инвесторы:</span>
                        <p className="text-white font-medium">ЕБРР, КНР</p>
                      </div>
                      <div>
                        <span className="text-white/60">Завершение:</span>
                        <p className="text-white font-medium">Дек 2024</p>
                      </div>
                    </div>
                    <Progress value={67} className="h-2 mb-3" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-400/30 text-green-400">
                        Инспекция
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-400/30 text-yellow-400">
                        Финансы
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                  Планируемые проекты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">IoT-сенсоры Навои</h4>
                        <p className="text-white/60 text-sm">500 датчиков качества воды</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Планируется</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-white/60">Бюджет:</span>
                        <p className="text-white font-medium">$1.8М</p>
                      </div>
                      <div>
                        <span className="text-white/60">Старт:</span>
                        <p className="text-white font-medium">Сент 2024</p>
                      </div>
                      <div>
                        <span className="text-white/60">Тип:</span>
                        <p className="text-white font-medium">Технологический</p>
                      </div>
                      <div>
                        <span className="text-white/60">ROI:</span>
                        <p className="text-green-400 font-medium">28%</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Утвердить
                      </Button>
                      <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                        Детали
                      </Button>
                    </div>
                  </div>

                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">Экореставрация Каракалпакстан</h4>
                        <p className="text-white/60 text-sm">Восстановление Аральского моря</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400">Концепция</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-white/60">Бюджет:</span>
                        <p className="text-white font-medium">$45М</p>
                      </div>
                      <div>
                        <span className="text-white/60">Длительность:</span>
                        <p className="text-white font-medium">7 лет</p>
                      </div>
                      <div>
                        <span className="text-white/60">Международные:</span>
                        <p className="text-white font-medium">ООН, ЕС</p>
                      </div>
                      <div>
                        <span className="text-white/60">Площадь:</span>
                        <p className="text-green-400 font-medium">12,000 га</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400">
                        Проработка
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-400/30 text-purple-400">
                        Эко-оценка
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Создание нового инвестиционного предложения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm">Название проекта</label>
                    <input 
                      type="text" 
                      placeholder="Введите название"
                      className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Тип проекта</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                      <option>Инфраструктурный</option>
                      <option>Технологический</option>
                      <option>Экологический</option>
                      <option>Социальный</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Бюджет (млн $)</label>
                    <input 
                      type="number" 
                      placeholder="0.0"
                      className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm">Регион</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                      <option>Ташкентская область</option>
                      <option>Андижанская область</option>
                      <option>Наманганская область</option>
                      <option>Самаркандская область</option>
                      <option>Каракалпакстан</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Длительность (месяцы)</label>
                    <input 
                      type="number" 
                      placeholder="24"
                      className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Приоритет</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                      <option>Критичный</option>
                      <option>Высокий</option>
                      <option>Средний</option>
                      <option>Низкий</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm">Описание проекта</label>
                    <textarea 
                      placeholder="Краткое описание целей и задач проекта"
                      className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1 h-20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Потенциальные партнеры</label>
                    <input 
                      type="text" 
                      placeholder="АБР, ЕБРР, Частные инвесторы"
                      className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="bg-green-600 hover:bg-green-700 flex-1">
                      Создать предложение
                    </Button>
                    <Button variant="outline" className="border-primary/30 text-primary">
                      Сохранить черновик
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Программы */}
        <TabsContent value="programs" className="mt-6">
          <div className="space-y-6">
            {mockPrograms.map((program) => (
              <Card key={program.id} className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      {isRussian ? program.name : program.nameEn}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {program.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    {isRussian ? program.description : program.descriptionEn}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-white/60 text-sm">Бюджет:</p>
                      <p className="text-white font-medium">{formatCurrency(program.budget)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Потрачено:</p>
                      <p className="text-white font-medium">{formatCurrency(program.spent)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Бенефициары:</p>
                      <p className="text-white font-medium">{program.beneficiaries.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Завершение:</p>
                      <p className="text-white font-medium">{program.endDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Прогресс выполнения:</span>
                      <span className="text-white">{program.progress}%</span>
                    </div>
                    <Progress value={program.progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Исполнение бюджета:</span>
                      <span className="text-white">{Math.round((program.spent / program.budget) * 100)}%</span>
                    </div>
                    <Progress value={(program.spent / program.budget) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Документооборот */}
        <TabsContent value="documents" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-green-400" />
                  {t('government.documents.upload', 'Загрузка документов')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-primary/60 mx-auto mb-2" />
                    <p className="text-white/60 text-sm mb-2">Перетащите файлы сюда или</p>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      Выбрать файлы
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white/60 text-sm">Категория документа</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white">
                      <option>Нормативные акты</option>
                      <option>Технические регламенты</option>
                      <option>Отчеты мониторинга</option>
                      <option>Международные соглашения</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white/60 text-sm">Уровень секретности</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white">
                      <option>Открытый</option>
                      <option>Ограниченного доступа</option>
                      <option>Конфиденциально</option>
                      <option>Секретно</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-400" />
                  {t('government.documents.pending', 'На рассмотрении')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">Регламент №2024-WR-015</h4>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Ожидает</Badge>
                    </div>
                    <p className="text-white/60 text-xs mb-2">Стандарты качества питьевой воды</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Автор: Минздрав</span>
                      <span className="text-white/40">2 дня назад</span>
                    </div>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">Отчет №2024-ENV-08</h4>
                      <Badge className="bg-blue-500/20 text-blue-400">На подписи</Badge>
                    </div>
                    <p className="text-white/60 text-xs mb-2">Мониторинг водных ресурсов</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Автор: Минэкологии</span>
                      <span className="text-white/40">5 часов назад</span>
                    </div>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium text-sm">Соглашение UZ-KZ-001</h4>
                      <Badge className="bg-purple-500/20 text-purple-400">Перевод</Badge>
                    </div>
                    <p className="text-white/60 text-xs mb-2">Трансграничное сотрудничество</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Автор: МИД</span>
                      <span className="text-white/40">1 неделю назад</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-400" />
                  {t('government.documents.signatures', 'Цифровые подписи')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-3">
                    <h4 className="text-white font-medium mb-2">Ваш сертификат</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Статус:</span>
                        <span className="text-green-400">Активен</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Действует до:</span>
                        <span className="text-white">15.12.2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Подписано документов:</span>
                        <span className="text-white">247</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                      Обновить сертификат
                    </Button>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <h4 className="text-white font-medium mb-2">Быстрые действия</h4>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full border-primary/30 text-primary">
                        Подписать документ
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-primary/30 text-primary">
                        Проверить подпись
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-primary/30 text-primary">
                        Архив подписей
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="h-5 w-5 mr-2 text-primary" />
                {t('government.documents.registry', 'Реестр документов')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white/60 py-2">Номер</th>
                      <th className="text-left text-white/60 py-2">Название</th>
                      <th className="text-left text-white/60 py-2">Тип</th>
                      <th className="text-left text-white/60 py-2">Статус</th>
                      <th className="text-left text-white/60 py-2">Дата</th>
                      <th className="text-left text-white/60 py-2">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="text-white py-3">2024-WR-015</td>
                      <td className="text-white py-3">Стандарты качества питьевой воды</td>
                      <td className="text-white py-3">Стандарт</td>
                      <td className="py-3">
                        <Badge className="bg-green-500/20 text-green-400">Утвержден</Badge>
                      </td>
                      <td className="text-white/60 py-3">20.05.2024</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="text-white py-3">2024-ENV-08</td>
                      <td className="text-white py-3">Отчет мониторинга водных ресурсов</td>
                      <td className="text-white py-3">Отчет</td>
                      <td className="py-3">
                        <Badge className="bg-yellow-500/20 text-yellow-400">На подписи</Badge>
                      </td>
                      <td className="text-white/60 py-3">22.05.2024</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Подписать
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="text-white py-3">UZ-KZ-001</td>
                      <td className="text-white py-3">Соглашение о трансграничном сотрудничестве</td>
                      <td className="text-white py-3">Соглашение</td>
                      <td className="py-3">
                        <Badge className="bg-blue-500/20 text-blue-400">В работе</Badge>
                      </td>
                      <td className="text-white/60 py-3">15.05.2024</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                            <FileText className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Отчеты */}
        <TabsContent value="reports" className="mt-6">
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-primary/60 mx-auto mb-4" />
            <h3 className="text-white font-medium text-lg mb-2">
              {t('government.reports.title', 'Правительственные отчеты')}
            </h3>
            <p className="text-white/60 mb-6">
              {t('government.reports.description', 'Генерируйте отчеты о соответствии, политиках и программах')}
            </p>
            <div className="flex gap-3 justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                {t('government.reports.generate', 'Сгенерировать отчет')}
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary">
                {t('government.reports.templates', 'Шаблоны отчетов')}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
        </div>
      </div>
    </div>
  );
}