import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FlaskConical, Database, FileText, BarChart2, BarChart3, Users,
  TrendingUp, AlertTriangle, CheckCircle, Clock,
  Droplets, Thermometer, Zap, Wind, Beaker, Globe,
  Activity, Brain, Target, TestTube, Lightbulb
} from "lucide-react";

// Типы данных для научного кабинета
interface WaterQualityData {
  id: string;
  location: string;
  ph: number;
  temperature: number;
  dissolvedOxygen: number;
  turbidity: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdated: Date;
}

interface ResearchProject {
  id: string;
  title: string;
  titleEn: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  team: string[];
  startDate: Date;
  expectedEnd: Date;
  description: string;
  descriptionEn: string;
}

interface Publication {
  id: string;
  title: string;
  titleEn: string;
  authors: string[];
  journal: string;
  year: number;
  impact: number;
  downloads: number;
}

const mockWaterQualityData: WaterQualityData[] = [
  {
    id: '1',
    location: 'Ташкент, станция №1',
    ph: 7.2,
    temperature: 18.5,
    dissolvedOxygen: 8.4,
    turbidity: 2.1,
    status: 'good',
    lastUpdated: new Date()
  },
  {
    id: '2',
    location: 'Самарканд, станция №3',
    ph: 6.8,
    temperature: 20.1,
    dissolvedOxygen: 7.9,
    turbidity: 1.8,
    status: 'excellent',
    lastUpdated: new Date()
  },
  {
    id: '3',
    location: 'Бухара, станция №2',
    ph: 8.1,
    temperature: 22.3,
    dissolvedOxygen: 6.2,
    turbidity: 4.5,
    status: 'fair',
    lastUpdated: new Date()
  }
];

const mockResearchProjects: ResearchProject[] = [
  {
    id: '1',
    title: 'Влияние климатических изменений на качество водных ресурсов',
    titleEn: 'Climate Change Impact on Water Resources Quality',
    status: 'active',
    progress: 68,
    team: ['Д-р Иванов А.С.', 'Профессор Петрова М.Н.', 'Асп. Сидоров К.П.'],
    startDate: new Date(2024, 1, 15),
    expectedEnd: new Date(2024, 11, 30),
    description: 'Исследование влияния глобального потепления на качество и доступность пресной воды в Центральной Азии',
    descriptionEn: 'Research on global warming impact on freshwater quality and availability in Central Asia'
  },
  {
    id: '2',
    title: 'Разработка биосенсоров для мониторинга загрязнений',
    titleEn: 'Development of Biosensors for Pollution Monitoring',
    status: 'planning',
    progress: 15,
    team: ['Д-р Козлов В.И.', 'Инж. Морозова Л.А.'],
    startDate: new Date(2024, 3, 1),
    expectedEnd: new Date(2025, 2, 28),
    description: 'Создание новых биосенсоров для раннего обнаружения токсичных веществ в водных системах',
    descriptionEn: 'Creating new biosensors for early detection of toxic substances in water systems'
  }
];

const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'Инновационные методы очистки воды в аридных зонах',
    titleEn: 'Innovative Water Purification Methods in Arid Zones',
    authors: ['Иванов А.С.', 'Петрова М.Н.', 'Сидоров К.П.'],
    journal: 'Water Research Journal',
    year: 2024,
    impact: 4.2,
    downloads: 1247
  },
  {
    id: '2',
    title: 'Экосистемный подход к управлению водными ресурсами',
    titleEn: 'Ecosystem Approach to Water Resource Management',
    authors: ['Козлов В.И.', 'Морозова Л.А.'],
    journal: 'Ecological Engineering',
    year: 2023,
    impact: 3.8,
    downloads: 892
  }
];

export default function ScientificCabinetPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const isRussian = i18n.language === 'ru';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    const texts = {
      excellent: { ru: 'Отличное', en: 'Excellent' },
      good: { ru: 'Хорошее', en: 'Good' },
      fair: { ru: 'Удовлетворительное', en: 'Fair' },
      poor: { ru: 'Плохое', en: 'Poor' }
    };
    return texts[status as keyof typeof texts]?.[isRussian ? 'ru' : 'en'] || status;
  };

  const getProjectStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'active': return <Clock className="h-4 w-4 text-blue-400" />;
      case 'planning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'on-hold': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Боковое меню */}
      <div className="w-64 bg-background/40 backdrop-blur-sm border-r border-primary/20 flex flex-col">
        {/* Заголовок кабинета */}
        <div className="p-6 border-b border-primary/20">
          <div className="hexagon h-12 w-12 bg-gradient-to-r from-blue-500/30 to-purple-500/30 
            flex items-center justify-center mb-3">
            <FlaskConical className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {t('scientific.title', 'Научный кабинет')}
          </h2>
          <p className="text-white/60 text-sm">
            {t('scientific.subtitle', 'Исследования и анализ')}
          </p>
        </div>

        {/* Навигационное меню */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'dashboard'
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
              <Globe className="h-4 w-4 mr-3" />
              Карта активности
            </button>
            
            <button
              onClick={() => setActiveTab('data')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'data'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <Activity className="h-4 w-4 mr-3" />
              Данные и сенсоры
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
              onClick={() => setActiveTab('publications')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'publications'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <FileText className="h-4 w-4 mr-3" />
              Публикации
            </button>
            
            <button
              onClick={() => setActiveTab('missions')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'missions'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <Target className="h-4 w-4 mr-3" />
              Миссии
            </button>
            
            <button
              onClick={() => setActiveTab('laboratory')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'laboratory'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <TestTube className="h-4 w-4 mr-3" />
              Симуляторы
            </button>
            
            <button
              onClick={() => setActiveTab('collaboration')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'collaboration'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <Users className="h-4 w-4 mr-3" />
              Взаимодействие
            </button>
            
            <button
              onClick={() => setActiveTab('innovations')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                activeTab === 'innovations'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-background/20'
              }`}
            >
              <Lightbulb className="h-4 w-4 mr-3" />
              Инновации
            </button>
          </div>
        </nav>
      </div>

      {/* Основной контент */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

        {/* Панель управления */}
        <TabsContent value="dashboard" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Database className="h-4 w-4 mr-2 text-blue-400" />
                  {t('scientific.metrics.activeSensors', 'Активные датчики')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">247</p>
                <p className="text-green-400 text-sm">+12 за неделю</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-green-400" />
                  {t('scientific.metrics.activeProjects', 'Активные проекты')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{mockResearchProjects.filter(p => p.status === 'active').length}</p>
                <p className="text-blue-400 text-sm">2 завершаются в этом месяце</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-purple-400" />
                  {t('scientific.metrics.publications', 'Публикации')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{mockPublications.length}</p>
                <p className="text-primary text-sm">Импакт-фактор: 4.0</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-orange-400" />
                  {t('scientific.metrics.researchers', 'Исследователей')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-green-400 text-sm">+3 новых сотрудника</p>
              </CardContent>
            </Card>
          </div>

          {/* Сводка качества воды */}
          <Card className="glassmorphism-dark border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Droplets className="h-5 w-5 mr-2 text-blue-400" />
                {t('scientific.waterQuality.title', 'Сводка качества воды')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockWaterQualityData.map((data) => (
                  <div key={data.id} className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">{data.location}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60 text-sm">pH:</span>
                        <span className="text-white">{data.ph}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60 text-sm">Температура:</span>
                        <span className="text-white">{data.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60 text-sm">Кислород:</span>
                        <span className="text-white">{data.dissolvedOxygen} мг/л</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60 text-sm">Статус:</span>
                        <span className={getStatusColor(data.status)}>
                          {getStatusText(data.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Карта научной активности */}
        <TabsContent value="map" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="h-5 w-5 mr-2 text-blue-400" />
                    Географическое распределение исследований
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-background/20 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Database className="h-16 w-16 text-primary/60 mx-auto mb-4" />
                        <p className="text-white/60 mb-4">[Интерактивная карта научной активности]</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                            <span className="text-white/80">Исследования</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <span className="text-white/80">Экспедиции</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                            <span className="text-white/80">Лаборатории</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span className="text-white/80">Сенсоры</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400">
                      Проекты
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-400/30 text-green-400">
                      Полевые работы
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-400/30 text-purple-400">
                      Лаборатории
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
                  <CardTitle className="text-white">Активные исследования</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Амударья</span>
                        <Badge className="bg-blue-500/20 text-blue-400">7 проектов</Badge>
                      </div>
                      <p className="text-white/60 text-xs">Гидрология, качество воды, биоразнообразие</p>
                    </div>
                    
                    <div className="bg-background/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Сырдарья</span>
                        <Badge className="bg-green-500/20 text-green-400">4 проекта</Badge>
                      </div>
                      <p className="text-white/60 text-xs">Солевой баланс, ирригация, экосистемы</p>
                    </div>
                    
                    <div className="bg-background/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Каракалпакстан</span>
                        <Badge className="bg-purple-500/20 text-purple-400">3 проекта</Badge>
                      </div>
                      <p className="text-white/60 text-xs">Аральское море, опустынивание, реставрация</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Источники и потоки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Горные источники</span>
                      <span className="text-blue-400">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Промышленность</span>
                      <span className="text-yellow-400">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Сельское хозяйство</span>
                      <span className="text-green-400">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Данные и сенсоры */}
        <TabsContent value="data" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Droplets className="h-5 w-5 mr-2 text-blue-400" />
                  Потоковые данные в реальном времени
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">pH уровень</span>
                      <span className="text-green-400">7.2</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <p className="text-white/60 text-xs mt-1">Норма: 6.5-8.5</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Мутность</span>
                      <span className="text-yellow-400">12 NTU</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    <p className="text-white/60 text-xs mt-1">Допустимо: &lt;20 NTU</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Солёность</span>
                      <span className="text-blue-400">1.2 г/л</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-white/60 text-xs mt-1">Питьевая: &lt;1.5 г/л</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Температура</span>
                      <span className="text-white">18.5°C</span>
                    </div>
                    <Progress value={55} className="h-2" />
                    <p className="text-white/60 text-xs mt-1">Сезонная норма</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-purple-400" />
                  Микробиологические показатели
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">E. Coli</span>
                      <Badge className="bg-green-500/20 text-green-400">Не обнаружено</Badge>
                    </div>
                    <p className="text-white/60 text-xs">Последняя проверка: 2 часа назад</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Колиформы</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">3 КОЕ/100мл</Badge>
                    </div>
                    <p className="text-white/60 text-xs">Норма: &lt;5 КОЕ/100мл</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Микропластик</span>
                      <Badge className="bg-red-500/20 text-red-400">15 частиц/л</Badge>
                    </div>
                    <p className="text-white/60 text-xs">Требует внимания</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Биопленки</span>
                      <Badge className="bg-blue-500/20 text-blue-400">Умеренные</Badge>
                    </div>
                    <p className="text-white/60 text-xs">Естественный уровень</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Фильтрация и импорт данных</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm">Источник данных</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                      <option>Все источники</option>
                      <option>Полевые станции</option>
                      <option>Лабораторные анализы</option>
                      <option>Спутниковые данные</option>
                      <option>IoT сенсоры</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white/60 text-sm">Регион</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                      <option>Весь Узбекистан</option>
                      <option>Бассейн Амударьи</option>
                      <option>Бассейн Сырдарьи</option>
                      <option>Каракалпакстан</option>
                      <option>Ферганская долина</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white/60 text-sm">Временной период</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                      <option>Последние 24 часа</option>
                      <option>Последняя неделя</option>
                      <option>Последний месяц</option>
                      <option>Последний год</option>
                      <option>Настраиваемый период</option>
                    </select>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                      Импорт внешних данных
                    </Button>
                    <Button variant="outline" className="w-full border-primary/30 text-primary mb-2">
                      Экспорт в CSV/JSON
                    </Button>
                    <Button variant="outline" className="w-full border-green-400/30 text-green-400">
                      API подключение
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Thermometer className="h-5 w-5 mr-2 text-primary" />
                Подключение полевых приборов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">pH метр портативный</h4>
                      <p className="text-green-400 text-xs">Подключен</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">Модель: AquaTest Pro-7</p>
                  <p className="text-white/60 text-sm">Последние данные: 5 мин назад</p>
                </div>

                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <Beaker className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Мутномер</h4>
                      <p className="text-blue-400 text-xs">Синхронизация</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">Модель: TurbiMax WP-4</p>
                  <p className="text-white/60 text-sm">Калибровка: сегодня</p>
                </div>

                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Thermometer className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Термодатчик</h4>
                      <p className="text-green-400 text-xs">Активен</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">Модель: TempLog-X1</p>
                  <p className="text-white/60 text-sm">Интервал: 15 секунд</p>
                </div>

                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Кондуктометр</h4>
                      <p className="text-red-400 text-xs">Офлайн</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">Модель: CondMax-200</p>
                  <p className="text-white/60 text-sm">Требует подключения</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Мониторинг */}
        <TabsContent value="monitoring" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Thermometer className="h-5 w-5 mr-2 text-red-400" />
                  {t('scientific.monitoring.temperature', 'Температурный мониторинг')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-background/20 rounded-lg flex items-center justify-center">
                  <p className="text-white/60">[График температуры по времени]</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/60 text-sm">Мин.</p>
                    <p className="text-blue-400 font-bold">16.2°C</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Средн.</p>
                    <p className="text-white font-bold">20.3°C</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Макс.</p>
                    <p className="text-red-400 font-bold">24.8°C</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  {t('scientific.monitoring.ph', 'pH мониторинг')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-background/20 rounded-lg flex items-center justify-center">
                  <p className="text-white/60">[График pH по времени]</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/60 text-sm">Мин.</p>
                    <p className="text-red-400 font-bold">6.5</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Средн.</p>
                    <p className="text-white font-bold">7.2</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Макс.</p>
                    <p className="text-blue-400 font-bold">8.1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20 mt-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wind className="h-5 w-5 mr-2 text-green-400" />
                {t('scientific.monitoring.realtime', 'Данные в реальном времени')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white/60 py-2">Станция</th>
                      <th className="text-left text-white/60 py-2">pH</th>
                      <th className="text-left text-white/60 py-2">Темп. °C</th>
                      <th className="text-left text-white/60 py-2">O₂ мг/л</th>
                      <th className="text-left text-white/60 py-2">Статус</th>
                      <th className="text-left text-white/60 py-2">Обновлено</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockWaterQualityData.map((data) => (
                      <tr key={data.id} className="border-b border-white/10">
                        <td className="text-white py-3">{data.location}</td>
                        <td className="text-white py-3">{data.ph}</td>
                        <td className="text-white py-3">{data.temperature}</td>
                        <td className="text-white py-3">{data.dissolvedOxygen}</td>
                        <td className={`py-3 ${getStatusColor(data.status)}`}>
                          {getStatusText(data.status)}
                        </td>
                        <td className="text-white/60 py-3">
                          {data.lastUpdated.toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ИИ Анализ и Big Data */}
        <TabsContent value="ai-analysis" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
                  Прогнозирование и моделирование
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Климатические изменения</h4>
                    <div className="h-32 bg-background/20 rounded-lg flex items-center justify-center mb-3">
                      <p className="text-white/60 text-sm">[График прогноза осадков и температуры]</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Осадки 2025:</span>
                        <p className="text-yellow-400 font-medium">-12% от нормы</p>
                      </div>
                      <div>
                        <span className="text-white/60">Температура:</span>
                        <p className="text-red-400 font-medium">+1.8°C</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Качество воды</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">Тренд pH</span>
                        <span className="text-green-400">Стабильный</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Загрязнения</span>
                        <span className="text-yellow-400">Рост +5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Микропластик</span>
                        <span className="text-red-400">Критический</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-green-400" />
                  Корреляции и тренды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-medium">Сильная корреляция</span>
                    </div>
                    <p className="text-white text-sm mb-2">Температура воды ↔ Биоразнообразие</p>
                    <p className="text-white/60 text-xs">Коэффициент: -0.78 • Достоверность: 94%</p>
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart2 className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">Средняя корреляция</span>
                    </div>
                    <p className="text-white text-sm mb-2">Солёность ↔ Сельхоз стоки</p>
                    <p className="text-white/60 text-xs">Коэффициент: +0.56 • Достоверность: 87%</p>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 font-medium">Новый тренд</span>
                    </div>
                    <p className="text-white text-sm mb-2">Микропластик в горных источниках</p>
                    <p className="text-white/60 text-xs">Обнаружено 3 дня назад • Требует изучения</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FlaskConical className="h-5 w-5 mr-2 text-primary" />
                Сценарное моделирование экосистем
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Повышение температуры +3°C</h4>
                  <p className="text-white/60 text-sm mb-3">Воздействие на водные экосистемы Узбекистана</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Испарение:</span>
                      <span className="text-red-400">+25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Биоразнообразие:</span>
                      <span className="text-red-400">-18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Качество воды:</span>
                      <span className="text-yellow-400">Ухудшение</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-red-600 hover:bg-red-700">
                    Детальный анализ
                  </Button>
                </div>
                
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Сокращение осадков -20%</h4>
                  <p className="text-white/60 text-sm mb-3">Влияние на водный баланс региона</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Уровень рек:</span>
                      <span className="text-red-400">-35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Подземные воды:</span>
                      <span className="text-yellow-400">-12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Солёность:</span>
                      <span className="text-red-400">+28%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700">
                    Моделирование
                  </Button>
                </div>
                
                <div className="bg-background/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Внедрение умных технологий</h4>
                  <p className="text-white/60 text-sm mb-3">IoT сенсоры + ИИ управление</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Эффективность:</span>
                      <span className="text-green-400">+42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Экономия воды:</span>
                      <span className="text-green-400">+31%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Окупаемость:</span>
                      <span className="text-blue-400">2.3 года</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                    Технико-экономическое обоснование
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Панель инициатив и миссий */}
        <TabsContent value="missions" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-400" />
                  Создание исследовательских миссий
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm">Название миссии</label>
                    <input 
                      type="text" 
                      placeholder="Например: Мониторинг Аральского моря"
                      className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/60 text-sm">Тип миссии</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                      <option>Полевые исследования</option>
                      <option>Лабораторный анализ</option>
                      <option>Общественный мониторинг</option>
                      <option>Образовательная программа</option>
                      <option>Экологическая акция</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white/60 text-sm">Уровень сложности</label>
                    <select className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1">
                      <option>Новичок (1-3 дня)</option>
                      <option>Любитель (1-2 недели)</option>
                      <option>Продвинутый (1-3 месяца)</option>
                      <option>Эксперт (3+ месяца)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white/60 text-sm">Награды за выполнение</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <input 
                        type="number" 
                        placeholder="Баллы"
                        className="bg-background/30 border border-primary/30 rounded px-3 py-2 text-white"
                      />
                      <select className="bg-background/30 border border-primary/30 rounded px-3 py-2 text-white">
                        <option>Значок</option>
                        <option>Сертификат</option>
                        <option>VOD токены</option>
                        <option>Особый статус</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-white/60 text-sm">Описание миссии</label>
                    <textarea 
                      placeholder="Опишите цели, задачи и ожидаемые результаты"
                      className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white mt-1 h-20 resize-none"
                    />
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Создать миссию
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Активные миссии сообщества</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4 border-l-4 border-blue-400">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-medium">Фотофиксация родников</h4>
                        <p className="text-white/60 text-sm">Ташкентская область • 47 участников</p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400">Активна</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white text-sm">150 баллов</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-400">🏆</span>
                        <span className="text-white text-sm">Эко-исследователь</span>
                      </div>
                    </div>
                    <Progress value={67} className="h-2 mb-2" />
                    <p className="text-white/60 text-xs">Прогресс: 67% • Осталось 8 дней</p>
                  </div>

                  <div className="bg-background/20 rounded-lg p-4 border-l-4 border-green-400">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-medium">Тестирование портативных pH-метров</h4>
                        <p className="text-white/60 text-sm">Вся республика • 23 участника</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Новая</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white text-sm">300 баллов</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-purple-400">🔬</span>
                        <span className="text-white text-sm">Лаборант</span>
                      </div>
                    </div>
                    <Progress value={12} className="h-2 mb-2" />
                    <p className="text-white/60 text-xs">Прогресс: 12% • Осталось 21 день</p>
                  </div>

                  <div className="bg-background/20 rounded-lg p-4 border-l-4 border-purple-400">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-medium">Школьная программа "Чистая вода"</h4>
                        <p className="text-white/60 text-sm">Навои • 156 участников</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400">Образовательная</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white text-sm">75 баллов</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-blue-400">📚</span>
                        <span className="text-white text-sm">Просветитель</span>
                      </div>
                    </div>
                    <Progress value={89} className="h-2 mb-2" />
                    <p className="text-white/60 text-xs">Прогресс: 89% • Осталось 3 дня</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Связь с образовательными учреждениями
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">НУУз</h4>
                      <p className="text-blue-400 text-xs">15 проектов</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">Факультет гидрологии</p>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    Сотрудничать
                  </Button>
                </div>

                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">ТИИИМСХ</h4>
                      <p className="text-green-400 text-xs">8 проектов</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">Кафедра ирригации</p>
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                    Сотрудничать
                  </Button>
                </div>

                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <Database className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Лицей №1</h4>
                      <p className="text-purple-400 text-xs">3 проекта</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">Химико-биологический профиль</p>
                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                    Наставничество
                  </Button>
                </div>

                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                      <Beaker className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Школа №47</h4>
                      <p className="text-yellow-400 text-xs">Новый партнер</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-2">Экологический кружок</p>
                  <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700">
                    Подключить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Исследования */}
        <TabsContent value="research" className="mt-6">
          <div className="space-y-6">
            {mockResearchProjects.map((project) => (
              <Card key={project.id} className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getProjectStatusIcon(project.status)}
                      <CardTitle className="text-white">
                        {isRussian ? project.title : project.titleEn}
                      </CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    {isRussian ? project.description : project.descriptionEn}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-white/60 text-sm mb-1">Команда:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.team.map((member, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Сроки:</p>
                      <p className="text-white text-sm">
                        {project.startDate.toLocaleDateString()} - {project.expectedEnd.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Прогресс:</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="glassmorphism-dark border-primary/20 border-dashed">
              <CardContent className="p-6 text-center">
                <Beaker className="h-12 w-12 text-primary/60 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">
                  {t('scientific.research.newProject', 'Начать новое исследование')}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  {t('scientific.research.newProjectDesc', 'Создайте новый исследовательский проект')}
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  {t('scientific.research.createProject', 'Создать проект')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Лаборатория */}
        <TabsContent value="laboratory" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Beaker className="h-5 w-5 mr-2 text-green-400" />
                  {t('scientific.laboratory.analyzer', 'Анализатор проб воды')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Загрузить новую пробу</h4>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept=".csv,.xlsx,.json"
                        className="w-full text-white/70 bg-background/30 border border-primary/30 rounded px-3 py-2"
                      />
                      <Button className="w-full bg-green-500 hover:bg-green-600">
                        {t('scientific.laboratory.analyze', 'Начать анализ')}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Последние результаты</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Проба #2024-05-23-001:</span>
                        <span className="text-green-400">✓ Норма</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Проба #2024-05-23-002:</span>
                        <span className="text-yellow-400">⚠ Внимание</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Проба #2024-05-22-015:</span>
                        <span className="text-green-400">✓ Норма</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FlaskConical className="h-5 w-5 mr-2 text-blue-400" />
                  {t('scientific.laboratory.experiments', 'Активные эксперименты')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">Тест очистки озоном</h4>
                      <Badge className="bg-blue-500/20 text-blue-400">Активен</Badge>
                    </div>
                    <Progress value={68} className="h-2 mb-2" />
                    <p className="text-white/60 text-sm">68% завершено • Осталось 2.5 часа</p>
                  </div>
                  
                  <div className="bg-background/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">pH стабилизация</h4>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Ожидание</Badge>
                    </div>
                    <Progress value={0} className="h-2 mb-2" />
                    <p className="text-white/60 text-sm">Запуск в 14:30</p>
                  </div>
                  
                  <Button variant="outline" className="w-full border-primary/30 text-primary">
                    {t('scientific.laboratory.newExperiment', 'Создать эксперимент')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="h-5 w-5 mr-2 text-purple-400" />
                {t('scientific.laboratory.equipment', 'Лабораторное оборудование')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <h4 className="text-white font-medium">Спектрометр MS-2000</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Статус:</span>
                      <span className="text-green-400">Готов</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Температура:</span>
                      <span className="text-white">23.1°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Калибровка:</span>
                      <span className="text-white">15.05.2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <h4 className="text-white font-medium">pH-метр PH-3000</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Статус:</span>
                      <span className="text-blue-400">Работает</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Последнее значение:</span>
                      <span className="text-white">7.2 pH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Калибровка:</span>
                      <span className="text-white">20.05.2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <h4 className="text-white font-medium">Микроскоп MIC-500</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Статус:</span>
                      <span className="text-yellow-400">Техобслуживание</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Увеличение:</span>
                      <span className="text-white">1000x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Доступен:</span>
                      <span className="text-white">24.05.2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Публикации */}
        <TabsContent value="publications" className="mt-6">
          <div className="space-y-6">
            {mockPublications.map((publication) => (
              <Card key={publication.id} className="glassmorphism-dark border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-lg mb-2">
                        {isRussian ? publication.title : publication.titleEn}
                      </h3>
                      <p className="text-white/60 text-sm mb-2">
                        {publication.authors.join(', ')}
                      </p>
                      <p className="text-primary text-sm">
                        {publication.journal} • {publication.year}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-primary/20 text-primary mb-2">
                        IF: {publication.impact}
                      </Badge>
                      <p className="text-white/60 text-sm">
                        {publication.downloads} загрузок
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      {t('scientific.publications.view', 'Просмотр')}
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      {t('scientific.publications.download', 'Скачать')}
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                      {t('scientific.publications.cite', 'Цитировать')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Отчеты */}
        <TabsContent value="reports" className="mt-6">
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-primary/60 mx-auto mb-4" />
            <h3 className="text-white font-medium text-lg mb-2">
              {t('scientific.reports.title', 'Система отчетов')}
            </h3>
            <p className="text-white/60 mb-6">
              {t('scientific.reports.description', 'Генерируйте детальные отчеты по исследованиям и мониторингу')}
            </p>
            <div className="flex gap-3 justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                {t('scientific.reports.generate', 'Сгенерировать отчет')}
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary">
                {t('scientific.reports.templates', 'Шаблоны отчетов')}
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