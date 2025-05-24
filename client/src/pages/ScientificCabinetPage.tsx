import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FlaskConical, Database, FileText, BarChart2, Users,
  TrendingUp, AlertTriangle, CheckCircle, Clock,
  Droplets, Thermometer, Zap, Wind, Beaker
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Заголовок */}
      <div className="flex items-center gap-4">
        <div className="hexagon h-16 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 
          flex items-center justify-center">
          <FlaskConical className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t('scientific.title', 'Научный кабинет')}
          </h1>
          <p className="text-white/70">
            {t('scientific.subtitle', 'Исследования и анализ водных ресурсов')}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-background/20">
          <TabsTrigger value="dashboard">{t('scientific.tabs.dashboard', 'Панель')}</TabsTrigger>
          <TabsTrigger value="monitoring">{t('scientific.tabs.monitoring', 'Мониторинг')}</TabsTrigger>
          <TabsTrigger value="research">{t('scientific.tabs.research', 'Исследования')}</TabsTrigger>
          <TabsTrigger value="laboratory">{t('scientific.tabs.laboratory', 'Лаборатория')}</TabsTrigger>
          <TabsTrigger value="publications">{t('scientific.tabs.publications', 'Публикации')}</TabsTrigger>
          <TabsTrigger value="reports">{t('scientific.tabs.reports', 'Отчеты')}</TabsTrigger>
        </TabsList>

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
  );
}