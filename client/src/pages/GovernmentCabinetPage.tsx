import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, FileText, Shield, Users, Globe,
  CheckCircle, Clock, AlertTriangle, Scale,
  Eye, Download, Upload, BarChart3, Target, Database,
  MapPin, Brain, Inbox, TrendingUp, Menu, ChevronLeft
} from "lucide-react";

export default function GovernmentCabinetPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Боковое меню */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-background/40 backdrop-blur-sm border-r border-primary/20 fixed h-screen transition-all duration-300 flex flex-col`}>
          {/* Кнопка сворачивания */}
          <div className="p-4 border-b border-primary/20 flex justify-between items-center">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="hexagon h-8 w-8 bg-gradient-to-r from-purple-500/30 to-blue-600/30 
                  flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <span className="text-white font-medium text-sm">Правительственный</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-background/20 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? (
                <Menu className="h-4 w-4 text-white/70" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-white/70" />
              )}
            </button>
          </div>

          {/* Навигационное меню */}
          <nav className="flex-1 p-2 overflow-y-auto">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'dashboard'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Панель управления' : ''}
              >
                <BarChart3 className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Панель управления</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('policies')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'policies'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Управление политиками' : ''}
              >
                <Shield className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Управление политиками</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('compliance')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'compliance'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Соблюдение требований' : ''}
              >
                <Scale className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Соблюдение требований</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('documents')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'documents'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Документооборот' : ''}
              >
                <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Документооборот</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('regional')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'regional'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Региональная карта' : ''}
              >
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Региональная карта</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'analytics'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'ИИ Аналитика' : ''}
              >
                <Brain className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">ИИ Аналитика</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('requests')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'requests'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Управление запросами' : ''}
              >
                <Inbox className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Управление запросами</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'reports'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Отчеты и аналитика' : ''}
              >
                <TrendingUp className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Отчеты и аналитика</span>}
              </button>
            </div>
          </nav>
        </div>

        {/* Основной контент */}
        <div className={`${sidebarCollapsed ? 'ml-16' : 'ml-64'} w-full transition-all duration-300`}>
          <div className="p-6 space-y-8">

            {/* Панель управления */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Правительственная панель</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-blue-400" />
                          Активные политики
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">156</div>
                        <p className="text-xs text-white/60">+8 новых</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-green-400" />
                          Документы в обороте
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">2,847</div>
                        <p className="text-xs text-white/60">За этот месяц</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Inbox className="h-4 w-4 mr-2 text-orange-400" />
                          Входящие запросы
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">47</div>
                        <p className="text-xs text-white/60">Требуют рассмотрения</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Scale className="h-4 w-4 mr-2 text-purple-400" />
                          Соответствие
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">94%</div>
                        <p className="text-xs text-white/60">Уровень соблюдения</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Последние события</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-background/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">Новая политика утверждена</p>
                        <p className="text-white/60 text-sm">Экологические стандарты для водных ресурсов</p>
                      </div>
                      <span className="text-white/40 text-sm ml-auto">1 ч назад</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background/10 rounded-lg">
                      <Clock className="h-5 w-5 text-orange-400" />
                      <div>
                        <p className="text-white font-medium">Документ на рассмотрении</p>
                        <p className="text-white/60 text-sm">Предложения по модернизации системы</p>
                      </div>
                      <span className="text-white/40 text-sm ml-auto">3 ч назад</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Управление политиками */}
            {activeTab === 'policies' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Управление политиками</h3>
                <p className="text-white/60 mb-6">Создание и управление политиками водных ресурсов</p>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Shield className="h-4 w-4 mr-2" />
                    Создать политику
                  </Button>
                  <Button variant="outline" className="border-primary/30 text-primary">
                    <Eye className="h-4 w-4 mr-2" />
                    Просмотр всех
                  </Button>
                </div>
              </div>
            )}

            {/* Соблюдение требований */}
            {activeTab === 'compliance' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Соблюдение требований</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-background/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Экологические стандарты</span>
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        Соответствует
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-white">98%</div>
                    <p className="text-white/60 text-sm">Соответствие требованиям</p>
                  </div>

                  <div className="p-4 bg-background/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Качество воды</span>
                      <Badge variant="outline" className="border-blue-400 text-blue-400">
                        Проверено
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-white">95%</div>
                    <p className="text-white/60 text-sm">Соответствие нормам</p>
                  </div>

                  <div className="p-4 bg-background/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Безопасность</span>
                      <Badge variant="outline" className="border-orange-400 text-orange-400">
                        Требует внимания
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-white">87%</div>
                    <p className="text-white/60 text-sm">Уровень безопасности</p>
                  </div>
                </div>
              </div>
            )}

            {/* Документооборот */}
            {activeTab === 'documents' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Система документооборота</h3>
                <p className="text-white/60 mb-6">Цифровые подписи и электронный документооборот</p>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Загрузить документ
                  </Button>
                  <Button variant="outline" className="border-primary/30 text-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Скачать архив
                  </Button>
                </div>
              </div>
            )}

            {/* Региональная карта */}
            {activeTab === 'regional' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Региональная карта</h3>
                <div className="bg-background/10 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-white text-lg">Карта регионального управления</p>
                    <p className="text-white/60">Распределение ресурсов по регионам</p>
                  </div>
                </div>
              </div>
            )}

            {/* ИИ Аналитика */}
            {activeTab === 'analytics' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">ИИ Аналитика</h3>
                <div className="bg-background/10 rounded-lg p-6 text-center">
                  <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Аналитика государственных решений</h4>
                  <p className="text-white/60 mb-6">
                    Прогнозирование последствий политических решений с помощью ИИ
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    Запустить анализ
                  </Button>
                </div>
              </div>
            )}

            {/* Управление запросами */}
            {activeTab === 'requests' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Управление запросами</h3>
                <p className="text-white/60 mb-6">Обработка запросов от граждан и организаций</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-400" />
                      <div>
                        <p className="text-white">Запрос на лицензирование</p>
                        <p className="text-white/60 text-sm">ООО "ЭкоВода" - водопользование</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-orange-400 text-orange-400">
                      В работе
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white">Экологическая экспертиза</p>
                        <p className="text-white/60 text-sm">Проект очистных сооружений</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      Одобрено
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Отчеты и аналитика */}
            {activeTab === 'reports' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Отчеты и аналитика</h3>
                <p className="text-white/60 mb-6">Статистика и аналитические отчеты по управлению</p>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Сгенерировать отчет
                  </Button>
                  <Button variant="outline" className="border-primary/30 text-primary">
                    <FileText className="h-4 w-4 mr-2" />
                    Шаблоны отчетов
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}