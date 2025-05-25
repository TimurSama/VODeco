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
  Eye, Download, Upload, BarChart3, Target, Database
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Заголовок */}
      <div className="flex items-center gap-4">
        <div className="hexagon h-16 w-16 bg-gradient-to-r from-purple-500 to-violet-600 
          flex items-center justify-center">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t('government.title', 'Правительственный кабинет')}
          </h1>
          <p className="text-white/70">
            {t('government.subtitle', 'Политики, регулирование и контроль соответствия')}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-background/20">
          <TabsTrigger value="overview">{t('government.tabs.overview', 'Обзор')}</TabsTrigger>
          <TabsTrigger value="policies">{t('government.tabs.policies', 'Политики')}</TabsTrigger>
          <TabsTrigger value="compliance">{t('government.tabs.compliance', 'Соответствие')}</TabsTrigger>
          <TabsTrigger value="programs">{t('government.tabs.programs', 'Программы')}</TabsTrigger>
          <TabsTrigger value="documents">{t('government.tabs.documents', 'Документооборот')}</TabsTrigger>
          <TabsTrigger value="reports">{t('government.tabs.reports', 'Отчеты')}</TabsTrigger>
        </TabsList>

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
  );
}