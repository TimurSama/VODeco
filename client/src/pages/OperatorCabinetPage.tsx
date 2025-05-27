import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, Zap, Wrench, AlertTriangle, Activity,
  Gauge, Thermometer, Droplets, Power, Wifi,
  CheckCircle, Clock, XCircle, MapPin, Calendar, Wind,
  Brain, FileText, TestTube, ArrowLeftRight, BarChart3,
  Bell, Camera, Cog, Download, Eye, FileDown, Filter,
  Phone, Plus, RotateCcw, ShieldX, Menu, ChevronLeft
} from "lucide-react";

export default function OperatorCabinetPage() {
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
                <div className="hexagon h-8 w-8 bg-gradient-to-r from-orange-500/30 to-red-500/30 
                  flex items-center justify-center">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <span className="text-white font-medium text-sm">Операторский</span>
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
                onClick={() => setActiveTab('map')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'map'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Карта объектов' : ''}
              >
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Карта объектов</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('operations')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'operations'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Журнал операций' : ''}
              >
                <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Журнал операций</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('sensors')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'sensors'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Мониторинг сенсоров' : ''}
              >
                <Activity className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Мониторинг сенсоров</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('control')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'control'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Модули управления' : ''}
              >
                <Cog className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Модули управления</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('maintenance')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'maintenance'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'График обслуживания' : ''}
              >
                <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">График обслуживания</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('surveillance')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'surveillance'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Видеонаблюдение' : ''}
              >
                <Camera className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Видеонаблюдение</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'reports'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'KPI Отчеты' : ''}
              >
                <BarChart3 className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">KPI Отчеты</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('emergency')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'emergency'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Система экстренного реагирования' : ''}
              >
                <AlertTriangle className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Экстренное реагирование</span>}
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
                  <h3 className="text-xl font-bold text-white mb-4">Панель управления</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-green-400" />
                          Активные станции
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">47/52</div>
                        <p className="text-xs text-white/60">90% в работе</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Droplets className="h-4 w-4 mr-2 text-blue-400" />
                          Суточный объем
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">2.4М л</div>
                        <p className="text-xs text-white/60">+5% от плана</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-orange-400" />
                          Уведомления
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">3</div>
                        <p className="text-xs text-white/60">Требуют внимания</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Gauge className="h-4 w-4 mr-2 text-purple-400" />
                          Эффективность
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">94%</div>
                        <p className="text-xs text-white/60">Средняя по системе</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Карта объектов */}
            {activeTab === 'map' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Карта водных объектов</h3>
                <div className="bg-background/10 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-white text-lg">Интерактивная карта объектов</p>
                    <p className="text-white/60">Управление станциями и мониторинг состояния</p>
                  </div>
                </div>
              </div>
            )}

            {/* Журнал операций */}
            {activeTab === 'operations' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Журнал операций</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white">Станция WP-15 запущена</p>
                        <p className="text-white/60 text-sm">Плановый запуск после обслуживания</p>
                      </div>
                    </div>
                    <span className="text-white/60 text-sm">10:30</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-orange-400" />
                      <div>
                        <p className="text-white">Техобслуживание WT-23</p>
                        <p className="text-white/60 text-sm">Замена фильтров завершена</p>
                      </div>
                    </div>
                    <span className="text-white/60 text-sm">09:15</span>
                  </div>
                </div>
              </div>
            )}

            {/* Мониторинг сенсоров */}
            {activeTab === 'sensors' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Мониторинг сенсоров</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-background/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Давление</span>
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        Норма
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-white">2.4 бар</div>
                    <p className="text-white/60 text-sm">Диапазон: 2.0-3.0</p>
                  </div>

                  <div className="p-4 bg-background/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Расход</span>
                      <Badge variant="outline" className="border-blue-400 text-blue-400">
                        Стабильно
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-white">150 л/мин</div>
                    <p className="text-white/60 text-sm">Средний за час</p>
                  </div>

                  <div className="p-4 bg-background/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Температура</span>
                      <Badge variant="outline" className="border-orange-400 text-orange-400">
                        Высокая
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-white">35°C</div>
                    <p className="text-white/60 text-sm">Норма: &lt;30°C</p>
                  </div>
                </div>
              </div>
            )}

            {/* Остальные разделы */}
            {activeTab === 'control' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Модули управления</h3>
                <p className="text-white/60 mb-6">Дистанционное управление оборудованием</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Cog className="h-4 w-4 mr-2" />
                  Панель управления
                </Button>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">График обслуживания</h3>
                <p className="text-white/60 mb-6">Планирование и отслеживание технического обслуживания</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Calendar className="h-4 w-4 mr-2" />
                  Создать задачу
                </Button>
              </div>
            )}

            {activeTab === 'surveillance' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Видеонаблюдение</h3>
                <p className="text-white/60 mb-6">Система видеонаблюдения с компьютерным зрением</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Camera className="h-4 w-4 mr-2" />
                  Открыть камеры
                </Button>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">KPI Отчеты</h3>
                <p className="text-white/60 mb-6">Аналитика производительности и ключевые показатели</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <FileDown className="h-4 w-4 mr-2" />
                  Сгенерировать отчет
                </Button>
              </div>
            )}

            {activeTab === 'emergency' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Экстренное реагирование</h3>
                <p className="text-white/60 mb-6">Система управления чрезвычайными ситуациями</p>
                <Button className="bg-red-600 hover:bg-red-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Панель ЧС
                </Button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}