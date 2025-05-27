import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, PieChart, TrendingUp, LineChart, DollarSign, FileText,
  Wallet, CreditCard, Target, TrendingDown, Plus, Minus,
  Menu, ChevronLeft
} from "lucide-react";

export default function InvestmentCabinetPage() {
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
                <div className="hexagon h-8 w-8 bg-gradient-to-r from-green-500/30 to-emerald-600/30 
                  flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <span className="text-white font-medium text-sm">Инвестиционный</span>
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
                title={sidebarCollapsed ? 'Главная панель' : ''}
              >
                <BarChart3 className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Главная панель</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'portfolio'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Портфель' : ''}
              >
                <PieChart className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Портфель</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('trading')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'trading'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Торговля' : ''}
              >
                <TrendingUp className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Торговля</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'analytics'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Аналитика' : ''}
              >
                <LineChart className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Аналитика</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('market')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'market'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Рынок VOD' : ''}
              >
                <DollarSign className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Рынок VOD</span>}
              </button>
              
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                  activeTab === 'reports'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-background/20'
                }`}
                title={sidebarCollapsed ? 'Отчеты' : ''}
              >
                <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Отчеты</span>}
              </button>
            </div>
          </nav>
        </div>

        {/* Основной контент */}
        <div className={`${sidebarCollapsed ? 'ml-16' : 'ml-64'} w-full transition-all duration-300`}>
          <div className="p-6 space-y-8">

            {/* Главная панель */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Инвестиционная панель</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Wallet className="h-4 w-4 mr-2 text-green-400" />
                          Общий баланс
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">$125,430</div>
                        <p className="text-xs text-white/60">+12.5% за месяц</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
                          VOD токены
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">8,750</div>
                        <p className="text-xs text-white/60">$2.85 за токен</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <Target className="h-4 w-4 mr-2 text-purple-400" />
                          Активные инвестиции
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">15</div>
                        <p className="text-xs text-white/60">В 8 проектах</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism-dark border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm font-medium flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2 text-orange-400" />
                          ROI
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-white">18.7%</div>
                        <p className="text-xs text-white/60">Годовая доходность</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Последние транзакции</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-background/10 rounded-lg">
                      <Plus className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">Покупка VOD</p>
                        <p className="text-white/60 text-sm">500 токенов по $2.82</p>
                      </div>
                      <span className="text-green-400 ml-auto">+$1,410</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">Дивиденды получены</p>
                        <p className="text-white/60 text-sm">Проект "Чистая вода Сибири"</p>
                      </div>
                      <span className="text-blue-400 ml-auto">+$267</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Портфель */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Структура портфеля</h3>
                  <div className="bg-background/10 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-white text-lg">Диаграмма распределения активов</p>
                      <p className="text-white/60">Визуализация инвестиционного портфеля</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Активы по категориям</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                      <div>
                        <p className="text-white font-medium">VOD Токены</p>
                        <p className="text-white/60 text-sm">65% портфеля</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$81,530</p>
                        <p className="text-green-400 text-sm">+15.2%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Экологические проекты</p>
                        <p className="text-white/60 text-sm">25% портфеля</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$31,360</p>
                        <p className="text-blue-400 text-sm">+8.7%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Стейблкоины</p>
                        <p className="text-white/60 text-sm">10% портфеля</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$12,540</p>
                        <p className="text-white/60 text-sm">0.0%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Торговля */}
            {activeTab === 'trading' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Торговая панель</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-background/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-4">Купить VOD</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm">Количество</label>
                        <input 
                          type="number" 
                          className="w-full bg-background/20 border border-primary/20 rounded-lg p-3 text-white"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm">Цена за токен</label>
                        <input 
                          type="number" 
                          className="w-full bg-background/20 border border-primary/20 rounded-lg p-3 text-white"
                          placeholder="$2.85"
                        />
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Купить
                      </Button>
                    </div>
                  </div>

                  <div className="bg-background/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-4">Продать VOD</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm">Количество</label>
                        <input 
                          type="number" 
                          className="w-full bg-background/20 border border-primary/20 rounded-lg p-3 text-white"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm">Цена за токен</label>
                        <input 
                          type="number" 
                          className="w-full bg-background/20 border border-primary/20 rounded-lg p-3 text-white"
                          placeholder="$2.85"
                        />
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        Продать
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Аналитика */}
            {activeTab === 'analytics' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Аналитика доходности</h3>
                <div className="bg-background/10 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-white text-lg">График доходности портфеля</p>
                    <p className="text-white/60">Динамика изменения стоимости активов</p>
                  </div>
                </div>
              </div>
            )}

            {/* Рынок VOD */}
            {activeTab === 'market' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Рынок VOD токенов</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-background/10 rounded-lg p-4 text-center">
                    <p className="text-white/60 text-sm">Текущая цена</p>
                    <p className="text-2xl font-bold text-white">$2.85</p>
                    <p className="text-green-400 text-sm">+5.2% за 24ч</p>
                  </div>
                  <div className="bg-background/10 rounded-lg p-4 text-center">
                    <p className="text-white/60 text-sm">Объем торгов</p>
                    <p className="text-2xl font-bold text-white">$2.1M</p>
                    <p className="text-blue-400 text-sm">За последние 24ч</p>
                  </div>
                  <div className="bg-background/10 rounded-lg p-4 text-center">
                    <p className="text-white/60 text-sm">Рыночная капитализация</p>
                    <p className="text-2xl font-bold text-white">$142M</p>
                    <p className="text-purple-400 text-sm">Общая стоимость</p>
                  </div>
                </div>
              </div>
            )}

            {/* Отчеты */}
            {activeTab === 'reports' && (
              <div className="bg-background/20 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Инвестиционные отчеты</h3>
                <p className="text-white/60 mb-6">Детальная аналитика и отчеты по инвестициям</p>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    <FileText className="h-4 w-4 mr-2" />
                    Сгенерировать отчет
                  </Button>
                  <Button variant="outline" className="border-primary/30 text-primary">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Экспорт данных
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