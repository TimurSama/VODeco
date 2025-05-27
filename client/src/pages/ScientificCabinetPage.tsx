import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FlaskConical, BarChart3, Globe, Activity, Brain, FileText, Target,
  TestTube, Users, Lightbulb, Database, Clock, CheckCircle,
  AlertTriangle, TrendingUp, Eye, Download, Upload
} from "lucide-react";

export default function ScientificCabinetPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Боковое меню */}
        <div className="w-64 bg-background/40 backdrop-blur-sm border-r border-primary/20 fixed h-screen">
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
          <nav className="p-4">
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
        <div className="ml-64 w-full">
          <div className="p-6 space-y-8">

            {/* Главная панель */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Панель управления</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Database className="h-4 w-4 mr-2 text-blue-400" />
                          Активные исследования
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">24</div>
                        <p className="text-xs text-white/60">+3 за неделю</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-green-400" />
                          Сенсоры онлайн
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">127/150</div>
                        <p className="text-xs text-white/60">85% активность</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-purple-400" />
                          Публикации
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">89</div>
                        <p className="text-xs text-white/60">12 на рецензии</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Target className="h-4 w-4 mr-2 text-orange-400" />
                          Завершенные цели
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">67%</div>
                        <p className="text-xs text-white/60">15/22 цели</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Последние обновления</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-background/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">Анализ воды завершен</p>
                        <p className="text-white/60 text-sm">Станция №34 - результаты готовы</p>
                      </div>
                      <span className="text-white/40 text-sm ml-auto">2 ч назад</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                      <div>
                        <p className="text-white font-medium">Требует внимания</p>
                        <p className="text-white/60 text-sm">Датчик pH показывает аномалии</p>
                      </div>
                      <span className="text-white/40 text-sm ml-auto">5 ч назад</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Карта активности */}
            {activeTab === 'map' && (
              <div className="space-y-6">
                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Карта научной активности</h3>
                  <div className="bg-background/10 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-white text-lg">Интерактивная карта исследований</p>
                      <p className="text-white/60">Отображение станций мониторинга и активных проектов</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Статистика по регионам</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-background/10 rounded-lg">
                      <h4 className="text-white font-medium">Северный регион</h4>
                      <p className="text-white/60 text-sm">15 станций, 8 проектов</p>
                      <div className="mt-2">
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                    <div className="p-4 bg-background/10 rounded-lg">
                      <h4 className="text-white font-medium">Центральный регион</h4>
                      <p className="text-white/60 text-sm">23 станции, 12 проектов</p>
                      <div className="mt-2">
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                    <div className="p-4 bg-background/10 rounded-lg">
                      <h4 className="text-white font-medium">Южный регион</h4>
                      <p className="text-white/60 text-sm">18 станций, 6 проектов</p>
                      <div className="mt-2">
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Данные и сенсоры */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Мониторинг сенсоров</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-background/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">pH уровень</span>
                        <Badge variant="outline" className="border-green-400 text-green-400">
                          Норма
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-white">7.2</div>
                      <p className="text-white/60 text-sm">Диапазон: 6.5-8.5</p>
                    </div>

                    <div className="p-4 bg-background/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">Температура</span>
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          Стабильно
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-white">22°C</div>
                      <p className="text-white/60 text-sm">Средняя за сутки</p>
                    </div>

                    <div className="p-4 bg-background/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">Растворенный O₂</span>
                        <Badge variant="outline" className="border-orange-400 text-orange-400">
                          Низкий
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-white">5.2 мг/л</div>
                      <p className="text-white/60 text-sm">Норма: &gt;6.0 мг/л</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Последние измерения</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-white">Станция WQ-001</p>
                          <p className="text-white/60 text-sm">Автоматическое измерение</p>
                        </div>
                      </div>
                      <span className="text-white/60 text-sm">15:30</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <TestTube className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-white">Лабораторный анализ</p>
                          <p className="text-white/60 text-sm">Проба №2547</p>
                        </div>
                      </div>
                      <span className="text-white/60 text-sm">14:20</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ИИ Анализ */}
            {activeTab === 'ai-analysis' && (
              <div className="space-y-6">
                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Искусственный интеллект</h3>
                  <div className="bg-background/10 rounded-lg p-6 text-center">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">Анализ данных ИИ</h4>
                    <p className="text-white/60 mb-6">
                      Автоматический анализ экологических данных с использованием машинного обучения
                    </p>
                    <Button className="bg-primary hover:bg-primary/90">
                      Запустить анализ
                    </Button>
                  </div>
                </div>

                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Предсказания ИИ</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-background/10 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        <span className="text-white font-medium">Качество воды</span>
                      </div>
                      <p className="text-white/60 text-sm">
                        Прогноз улучшения на 15% в следующем месяце
                      </p>
                    </div>
                    <div className="p-4 bg-background/10 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-orange-400" />
                        <span className="text-white font-medium">Риск загрязнения</span>
                      </div>
                      <p className="text-white/60 text-sm">
                        Повышенный риск в районе станции №15
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Публикации */}
            {activeTab === 'publications' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Научные публикации</h3>
                <p className="text-white/60 mb-6">Управление научными работами и публикациями</p>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Загрузить статью
                  </Button>
                  <Button variant="outline" className="border-primary/30 text-primary">
                    <Eye className="h-4 w-4 mr-2" />
                    Просмотр архива
                  </Button>
                </div>
              </div>
            )}

            {/* Миссии */}
            {activeTab === 'missions' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Научные миссии</h3>
                <p className="text-white/60 mb-6">Планирование и выполнение исследовательских задач</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Target className="h-4 w-4 mr-2" />
                  Создать миссию
                </Button>
              </div>
            )}

            {/* Симуляторы */}
            {activeTab === 'laboratory' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Лабораторные симуляторы</h3>
                <p className="text-white/60 mb-6">Виртуальные эксперименты и моделирование</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <TestTube className="h-4 w-4 mr-2" />
                  Запустить симулятор
                </Button>
              </div>
            )}

            {/* Сотрудничество */}
            {activeTab === 'collaboration' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Научное сотрудничество</h3>
                <p className="text-white/60 mb-6">Координация с международными исследовательскими группами</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Users className="h-4 w-4 mr-2" />
                  Найти коллег
                </Button>
              </div>
            )}

            {/* Инновации */}
            {activeTab === 'innovations' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Инновационные проекты</h3>
                <p className="text-white/60 mb-6">Разработка новых технологий и методов исследования</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Предложить идею
                </Button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}