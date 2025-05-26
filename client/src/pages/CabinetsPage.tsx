import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FlaskConical, BarChart3, Building2, Settings, Users, 
  Lock, CheckCircle, Clock, AlertCircle, TrendingUp,
  Database, FileText, Globe, Droplets, PieChart,
  LineChart, Activity, Shield, Zap, Target
} from "lucide-react";

// Типы кабинетов
interface Cabinet {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ReactNode;
  color: string;
  requiredRole: string;
  accessLevel: 'locked' | 'pending' | 'available' | 'active';
  features: string[];
  featuresEn: string[];
  progress?: number;
}

const cabinets: Cabinet[] = [
  {
    id: 'scientific',
    name: 'Научный кабинет',
    nameEn: 'Scientific Cabinet',
    description: 'Анализ данных, исследования качества воды, мониторинг экосистем',
    descriptionEn: 'Data analysis, water quality research, ecosystem monitoring',
    icon: <FlaskConical className="h-6 w-6" />,
    color: 'from-blue-500 to-indigo-600',
    requiredRole: 'Researcher',
    accessLevel: 'available',
    features: [
      'Анализ качества воды в реальном времени',
      'Лабораторные отчеты и исследования',
      'Мониторинг экосистем',
      'Научные публикации',
      'Базы данных исследований'
    ],
    featuresEn: [
      'Real-time water quality analysis',
      'Laboratory reports and research',
      'Ecosystem monitoring',
      'Scientific publications',
      'Research databases'
    ],
    progress: 75
  },
  {
    id: 'investment',
    name: 'Инвестиционный кабинет',
    nameEn: 'Investment Cabinet',
    description: 'Управление портфелем, анализ ROI, инвестиционные возможности',
    descriptionEn: 'Portfolio management, ROI analysis, investment opportunities',
    icon: <BarChart3 className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-600',
    requiredRole: 'Investor',
    accessLevel: 'active',
    features: [
      'Портфель инвестиций',
      'Анализ доходности проектов',
      'Риск-менеджмент',
      'Маркет-анализ',
      'Токеномика VOD'
    ],
    featuresEn: [
      'Investment portfolio',
      'Project profitability analysis',
      'Risk management',
      'Market analysis',
      'VOD tokenomics'
    ],
    progress: 92
  },
  {
    id: 'government',
    name: 'Правительственный кабинет',
    nameEn: 'Government Cabinet',
    description: 'Политики, регулирование, контроль соответствия нормам',
    descriptionEn: 'Policies, regulation, compliance control',
    icon: <Building2 className="h-6 w-6" />,
    color: 'from-purple-500 to-violet-600',
    requiredRole: 'Government Official',
    accessLevel: 'available',
    features: [
      'Регулятивные документы',
      'Контроль соблюдения норм',
      'Государственные программы',
      'Отчетность и аудит',
      'Международное сотрудничество'
    ],
    featuresEn: [
      'Regulatory documents',
      'Compliance control',
      'Government programs',
      'Reporting and audit',
      'International cooperation'
    ],
    progress: 45
  },
  {
    id: 'operator',
    name: 'Операторский кабинет',
    nameEn: 'Operator Cabinet',
    description: 'Управление водными ресурсами, техническое обслуживание',
    descriptionEn: 'Water resource management, technical maintenance',
    icon: <Settings className="h-6 w-6" />,
    color: 'from-orange-500 to-red-600',
    requiredRole: 'Water Operator',
    accessLevel: 'available',
    features: [
      'Управление станциями',
      'Техническое обслуживание',
      'Мониторинг оборудования',
      'Аварийные системы',
      'Операционные отчеты'
    ],
    featuresEn: [
      'Station management',
      'Technical maintenance',
      'Equipment monitoring',
      'Emergency systems',
      'Operational reports'
    ],
    progress: 20
  }
];

export default function CabinetsPage() {
  const { t, i18n } = useTranslation();
  const [selectedCabinet, setSelectedCabinet] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const isRussian = i18n.language === 'ru';

  const getAccessIcon = (accessLevel: string) => {
    switch (accessLevel) {
      case 'locked':
        return <Lock className="h-4 w-4 text-red-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'active':
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAccessText = (accessLevel: string) => {
    const texts = {
      locked: { ru: 'Заблокирован', en: 'Locked' },
      pending: { ru: 'На рассмотрении', en: 'Pending' },
      available: { ru: 'Доступен', en: 'Available' },
      active: { ru: 'Активен', en: 'Active' }
    };
    return texts[accessLevel as keyof typeof texts]?.[isRussian ? 'ru' : 'en'] || 'Unknown';
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Заголовок */}
      <div className="text-center space-y-4">
        <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 
          flex items-center justify-center mx-auto">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          {t('cabinets.title', 'Специализированные кабинеты')}
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          {t('cabinets.description', 'Получайте доступ к профессиональным инструментам и функциям в зависимости от вашей роли в экосистеме VODeco')}
        </p>
      </div>

      {/* Обзор кабинетов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cabinets.map((cabinet) => (
          <Card 
            key={cabinet.id}
            className={`glassmorphism-dark border-primary/20 hover:border-primary/40 transition-all cursor-pointer ${
              selectedCabinet === cabinet.id ? 'ring-2 ring-primary/50' : ''
            }`}
            onClick={() => setSelectedCabinet(selectedCabinet === cabinet.id ? null : cabinet.id)}
          >
            <CardHeader className="pb-3">
              <div className={`hexagon h-12 w-12 bg-gradient-to-r ${cabinet.color} 
                flex items-center justify-center mb-3`}>
                {cabinet.icon}
              </div>
              <CardTitle className="text-white text-lg">
                {isRussian ? cabinet.name : cabinet.nameEn}
              </CardTitle>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {cabinet.requiredRole}
                </Badge>
                <div className="flex items-center gap-1">
                  {getAccessIcon(cabinet.accessLevel)}
                  <span className="text-xs text-white/60">
                    {getAccessText(cabinet.accessLevel)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                {isRussian ? cabinet.description : cabinet.descriptionEn}
              </p>
              {cabinet.progress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>{t('cabinets.progress', 'Прогресс доступа')}</span>
                    <span>{cabinet.progress}%</span>
                  </div>
                  <Progress value={cabinet.progress} className="h-2" />
                </div>
              )}
              
              {(cabinet.accessLevel === 'available' || cabinet.accessLevel === 'active') && (
                <div className="mt-3">
                  <Button 
                    size="sm" 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(`/cabinets/${cabinet.id}`);
                    }}
                  >
                    {t('cabinets.enter', 'Войти в кабинет')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Детальная информация о выбранном кабинете */}
      {selectedCabinet && (
        <Card className="glassmorphism-dark border-primary/20">
          <CardContent className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-background/20">
                <TabsTrigger value="overview">{t('cabinets.tabs.overview', 'Обзор')}</TabsTrigger>
                <TabsTrigger value="features">{t('cabinets.tabs.features', 'Функции')}</TabsTrigger>
                <TabsTrigger value="access">{t('cabinets.tabs.access', 'Доступ')}</TabsTrigger>
                <TabsTrigger value="activity">{t('cabinets.tabs.activity', 'Активность')}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                {(() => {
                  const cabinet = cabinets.find(c => c.id === selectedCabinet);
                  if (!cabinet) return null;
                  
                  return (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`hexagon h-16 w-16 bg-gradient-to-r ${cabinet.color} 
                          flex items-center justify-center`}>
                          {cabinet.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {isRussian ? cabinet.name : cabinet.nameEn}
                          </h3>
                          <p className="text-white/70">
                            {isRussian ? cabinet.description : cabinet.descriptionEn}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-background/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-primary" />
                            <span className="text-white/60 text-sm">
                              {t('cabinets.requiredRole', 'Требуемая роль')}
                            </span>
                          </div>
                          <p className="text-white font-medium">{cabinet.requiredRole}</p>
                        </div>
                        
                        <div className="bg-background/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <span className="text-white/60 text-sm">
                              {t('cabinets.status', 'Статус')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getAccessIcon(cabinet.accessLevel)}
                            <span className="text-white font-medium">
                              {getAccessText(cabinet.accessLevel)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-background/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <span className="text-white/60 text-sm">
                              {t('cabinets.progress', 'Прогресс')}
                            </span>
                          </div>
                          <p className="text-white font-medium">{cabinet.progress || 0}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                {(() => {
                  const cabinet = cabinets.find(c => c.id === selectedCabinet);
                  if (!cabinet) return null;
                  
                  const features = isRussian ? cabinet.features : cabinet.featuresEn;
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-background/20 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="text-white">{feature}</span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </TabsContent>

              <TabsContent value="access" className="mt-6">
                <div className="space-y-6">
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">
                      {t('cabinets.accessRequirements', 'Требования для доступа')}
                    </h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• {t('cabinets.req1', 'Подтвержденная роль в системе')}</li>
                      <li>• {t('cabinets.req2', 'Минимальный рейтинг участия')}</li>
                      <li>• {t('cabinets.req3', 'Прохождение обучения и сертификации')}</li>
                      <li>• {t('cabinets.req4', 'Соглашение о конфиденциальности')}</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => {
                        const cabinet = cabinets.find(c => c.id === selectedCabinet);
                        if (cabinet && cabinet.accessLevel === 'available' || cabinet?.accessLevel === 'active') {
                          setLocation(`/cabinets/${selectedCabinet}`);
                        }
                      }}
                      disabled={(() => {
                        const cabinet = cabinets.find(c => c.id === selectedCabinet);
                        return cabinet?.accessLevel === 'locked' || cabinet?.accessLevel === 'pending';
                      })()}
                    >
                      {(() => {
                        const cabinet = cabinets.find(c => c.id === selectedCabinet);
                        if (cabinet?.accessLevel === 'available' || cabinet?.accessLevel === 'active') {
                          return t('cabinets.enter', 'Войти в кабинет');
                        }
                        return t('cabinets.requestAccess', 'Запросить доступ');
                      })()}
                    </Button>
                    <Button variant="outline" className="border-primary/30 text-primary">
                      {t('cabinets.learnMore', 'Узнать больше')}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-primary/60 mx-auto mb-4" />
                  <p className="text-white/60">
                    {t('cabinets.noActivity', 'Нет активности для отображения')}
                  </p>
                  <p className="text-white/40 text-sm mt-2">
                    {t('cabinets.activityHint', 'Активность появится после получения доступа к кабинету')}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}