
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Code,
  CheckCircle,
  Settings,
  Database
} from "lucide-react";

const AIComponentsPage: React.FC = () => {
  const aiComponents = [
    {
      id: 'predictive-analytics',
      name: 'Предиктивная аналитика',
      description: 'ИИ система прогнозирования качества воды и потенциальных проблем',
      category: 'Аналитика',
      progress: 40,
      features: [
        'Прогноз загрязнений за 48-72 часа',
        'Анализ сезонных паттернов',
        'Предсказание поломок оборудования',
        'Оптимизация химической обработки'
      ],
      applications: [
        'Водоочистные станции',
        'Промышленные предприятия',
        'Муниципальные системы',
        'Аграрный сектор'
      ],
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-500',
      accuracy: '94.2%',
      processingTime: '< 1 сек'
    },
    {
      id: 'anomaly-detection',
      name: 'Поиск аномалий',
      description: 'Автоматическое выявление отклонений в качестве воды и работе систем',
      category: 'Безопасность',
      progress: 60,
      features: [
        'Обнаружение аномальных показателей',
        'Выявление несанкционированных сбросов',
        'Мониторинг состояния оборудования',
        'Анализ потребления ресурсов'
      ],
      applications: [
        'Экологический мониторинг',
        'Промышленная безопасность',
        'Городские системы',
        'Природные водоемы'
      ],
      icon: <Search className="h-6 w-6" />,
      color: 'from-red-500 to-orange-500',
      accuracy: '96.8%',
      processingTime: '< 0.5 сек'
    },
    {
      id: 'recommendation-system',
      name: 'Система рекомендаций',
      description: 'ИИ советник для оптимизации водных процессов и инвестиционных решений',
      category: 'Оптимизация',
      progress: 25,
      features: [
        'Рекомендации по очистке воды',
        'Оптимизация энергопотребления',
        'Инвестиционные советы',
        'Планирование технического обслуживания'
      ],
      applications: [
        'Операторы водоснабжения',
        'Инвесторы и фонды',
        'Государственные органы',
        'Консалтинговые компании'
      ],
      icon: <Target className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-500',
      accuracy: '89.5%',
      processingTime: '< 2 сек'
    },
    {
      id: 'computer-vision',
      name: 'Компьютерное зрение',
      description: 'Анализ изображений и видео для оценки состояния водных объектов',
      category: 'Визуальный анализ',
      progress: 35,
      features: [
        'Анализ качества воды по фото',
        'Обнаружение загрязнений',
        'Мониторинг уровня воды',
        'Оценка состояния инфраструктуры'
      ],
      applications: [
        'Мобильное приложение VOD Check',
        'Дроновый мониторинг',
        'Спутниковые данные',
        'Камеры наблюдения'
      ],
      icon: <Shield className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-500',
      accuracy: '91.7%',
      processingTime: '< 3 сек'
    },
    {
      id: 'nlp-reports',
      name: 'Обработка текста',
      description: 'Анализ документов, отчетов и новостей для извлечения информации о воде',
      category: 'Документооборот',
      progress: 20,
      features: [
        'Анализ экологических отчетов',
        'Извлечение данных из документов',
        'Мониторинг новостей',
        'Автоматическое составление отчетов'
      ],
      applications: [
        'Регулирующие органы',
        'Научные исследования',
        'Медиа мониторинг',
        'Корпоративная отчетность'
      ],
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-indigo-500 to-blue-500',
      accuracy: '87.3%',
      processingTime: '< 5 сек'
    },
    {
      id: 'optimization-engine',
      name: 'Двигатель оптимизации',
      description: 'ИИ для оптимизации процессов очистки и распределения воды',
      category: 'Управление',
      progress: 30,
      features: [
        'Оптимизация химических процессов',
        'Управление энергопотреблением',
        'Планирование ресурсов',
        'Автоматизация процессов'
      ],
      applications: [
        'Автоматизированные системы',
        'Промышленные процессы',
        'Городское планирование',
        'Энергетический менеджмент'
      ],
      icon: <Zap className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-500',
      accuracy: '92.1%',
      processingTime: '< 1.5 сек'
    }
  ];

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const avgProgress = aiComponents.reduce((sum, comp) => sum + comp.progress, 0) / aiComponents.length;
  const totalComponents = aiComponents.length;
  const readyComponents = aiComponents.filter(comp => comp.progress >= 50).length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="hexagon h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-500 
            flex items-center justify-center">
            <Brain className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">ИИ Компоненты</h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Искусственный интеллект для революционного управления водными ресурсами - 
          от предиктивной аналитики до автоматической оптимизации
        </p>
        <Badge variant="outline" className="mt-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
          В разработке • Прогресс {avgProgress.toFixed(0)}%
        </Badge>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">ИИ Компонентов</p>
                <p className="text-2xl font-bold text-primary">{totalComponents}</p>
              </div>
              <Brain className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Готовы к тестированию</p>
                <p className="text-2xl font-bold text-green-400">{readyComponents}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Средняя точность</p>
                <p className="text-2xl font-bold text-yellow-400">91.8%</p>
              </div>
              <Target className="h-8 w-8 text-yellow-400/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Общий прогресс</p>
                <p className="text-2xl font-bold text-blue-400">{avgProgress.toFixed(0)}%</p>
              </div>
              <Code className="h-8 w-8 text-blue-400/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основной контент */}
      <Tabs defaultValue="components" className="w-full">
        <TabsList className="w-full bg-background/20 p-1 grid grid-cols-3">
          <TabsTrigger value="components">ИИ Компоненты</TabsTrigger>
          <TabsTrigger value="integration">Интеграция</TabsTrigger>
          <TabsTrigger value="roadmap">Дорожная карта</TabsTrigger>
        </TabsList>

        {/* ИИ Компоненты */}
        <TabsContent value="components" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiComponents.map((component) => (
              <Card key={component.id} className="border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${component.color} flex items-center justify-center text-white`}>
                        {component.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{component.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{component.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-foreground/60">Точность</div>
                      <div className="text-lg font-bold text-green-500">{component.accuracy}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/80">{component.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Прогресс разработки</span>
                      <span className="font-medium">{component.progress}%</span>
                    </div>
                    <Progress value={component.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-foreground/60 mb-1">Время обработки</p>
                      <p className="font-semibold">{component.processingTime}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60 mb-1">Статус</p>
                      <Badge variant={component.progress >= 50 ? "default" : "outline"} className="text-xs">
                        {component.progress >= 50 ? "Тестирование" : "Разработка"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Ключевые функции:</h4>
                    <ul className="text-xs space-y-1">
                      {component.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
                  >
                    {selectedComponent === component.id ? 'Скрыть детали' : 'Показать детали'}
                  </Button>

                  {selectedComponent === component.id && (
                    <div className="mt-4 p-4 bg-background/30 rounded-lg border border-primary/10">
                      <h5 className="font-medium mb-2">Области применения:</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {component.applications.map((app, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Target className="h-3 w-3 text-primary" />
                            {app}
                          </div>
                        ))}
                      </div>
                      
                      <h5 className="font-medium mt-4 mb-2">Все функции:</h5>
                      <div className="space-y-1">
                        {component.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Интеграция */}
        <TabsContent value="integration" className="mt-6 space-y-6">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Settings className="h-5 w-5" />
                Интеграция ИИ в экосистему VODeco
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Платформа VODeco</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Автоматический анализ данных с IoT датчиков
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Предиктивные уведомления в дашборде
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      ИИ-рекомендации для инвесторов
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Автоматическая оценка рисков проектов
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Мобильное приложение VOD Check</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Анализ фото воды через компьютерное зрение
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Персональные рекомендации пользователям
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Автоматическое выявление аномалий
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Оптимизация маршрутов сбора данных
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Модули ПЭВМ</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Встроенная аналитика в каждый модуль
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Автоматизация бизнес-процессов
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Предиктивное обслуживание оборудования
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Оптимизация операционных затрат
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Государственные кабинеты</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Аналитика для принятия решений
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Раннее предупреждение о кризисах
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Моделирование сценариев развития
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Автоматические отчеты для регуляторов
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-lg mb-4">Архитектура ИИ системы</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background/30 rounded-lg">
                    <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h5 className="font-medium">Слой данных</h5>
                    <p className="text-xs text-foreground/60">Блокчейн + традиционные БД</p>
                  </div>
                  <div className="text-center p-4 bg-background/30 rounded-lg">
                    <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <h5 className="font-medium">ИИ движок</h5>
                    <p className="text-xs text-foreground/60">ML модели + Edge computing</p>
                  </div>
                  <div className="text-center p-4 bg-background/30 rounded-lg">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h5 className="font-medium">API интерфейсы</h5>
                    <p className="text-xs text-foreground/60">REST + GraphQL + WebSocket</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Дорожная карта */}
        <TabsContent value="roadmap" className="mt-6 space-y-6">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                Дорожная карта развития ИИ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="text-2xl font-bold text-green-500">Q1 2025</div>
                    <div className="text-sm font-medium mt-2">Фаза 1</div>
                    <div className="text-xs text-foreground/60 mt-1">Поиск аномалий + Компьютерное зрение</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-500">Q2 2025</div>
                    <div className="text-sm font-medium mt-2">Фаза 2</div>
                    <div className="text-xs text-foreground/60 mt-1">Предиктивная аналитика</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-500">Q3 2025</div>
                    <div className="text-sm font-medium mt-2">Фаза 3</div>
                    <div className="text-xs text-foreground/60 mt-1">Система рекомендаций + NLP</div>
                  </div>
                  <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-500">Q4 2025</div>
                    <div className="text-sm font-medium mt-2">Фаза 4</div>
                    <div className="text-xs text-foreground/60 mt-1">Двигатель оптимизации</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-lg mb-4">Ключевые вехи</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">1</div>
                      <div className="flex-1">
                        <h5 className="font-medium">MVP разработка</h5>
                        <p className="text-sm text-foreground/60">Базовые модели машинного обучения и тестовые интеграции</p>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">В процессе</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">2</div>
                      <div className="flex-1">
                        <h5 className="font-medium">Пилотное тестирование</h5>
                        <p className="text-sm text-foreground/60">Интеграция с VOD Check и первыми IoT датчиками</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Q2 2025</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">3</div>
                      <div className="flex-1">
                        <h5 className="font-medium">Масштабирование</h5>
                        <p className="text-sm text-foreground/60">Полная интеграция во все компоненты экосистемы</p>
                      </div>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Q3-Q4 2025</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">4</div>
                      <div className="flex-1">
                        <h5 className="font-medium">Коммерциализация</h5>
                        <p className="text-sm text-foreground/60">Лицензирование ИИ технологий третьим сторонам</p>
                      </div>
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-500">2026</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <h4 className="font-semibold text-yellow-500">Текущий статус</h4>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Все ИИ компоненты находятся в активной разработке. Первые модели планируются к интеграции 
                    с мобильным приложением VOD Check и IoT датчиками во втором квартале 2025 года. 
                    Стейкинг открыт для финансирования исследований и разработки.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIComponentsPage;
