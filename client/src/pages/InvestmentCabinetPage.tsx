import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, TrendingUp, DollarSign, PieChart, Target,
  Wallet, ArrowUpRight, ArrowDownRight, Clock, 
  Shield, Zap, Activity, Users, Coins
} from "lucide-react";

// Типы данных для инвестиционного кабинета
interface Investment {
  id: string;
  projectName: string;
  projectNameEn: string;
  amount: number;
  currentValue: number;
  roi: number;
  status: 'active' | 'completed' | 'pending';
  startDate: Date;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  category: 'infrastructure' | 'technology' | 'sustainability';
}

interface Portfolio {
  totalInvested: number;
  currentValue: number;
  totalROI: number;
  activeInvestments: number;
  completedInvestments: number;
  monthlyReturn: number;
}

interface MarketData {
  vodPrice: number;
  vodChange24h: number;
  marketCap: number;
  volume24h: number;
  totalSupply: number;
  circulatingSupply: number;
}

const mockInvestments: Investment[] = [
  {
    id: '1',
    projectName: 'Модернизация водоочистной станции Ташкент-1',
    projectNameEn: 'Tashkent-1 Water Treatment Plant Modernization',
    amount: 50000,
    currentValue: 62500,
    roi: 25.0,
    status: 'active',
    startDate: new Date(2024, 0, 15),
    expectedReturn: 18.5,
    riskLevel: 'medium',
    category: 'infrastructure'
  },
  {
    id: '2',
    projectName: 'IoT система мониторинга качества воды',
    projectNameEn: 'IoT Water Quality Monitoring System',
    amount: 25000,
    currentValue: 31250,
    roi: 25.0,
    status: 'active',
    startDate: new Date(2024, 1, 1),
    expectedReturn: 22.0,
    riskLevel: 'high',
    category: 'technology'
  },
  {
    id: '3',
    projectName: 'Проект восстановления экосистемы Арала',
    projectNameEn: 'Aral Sea Ecosystem Restoration Project',
    amount: 100000,
    currentValue: 115000,
    roi: 15.0,
    status: 'completed',
    startDate: new Date(2023, 6, 1),
    expectedReturn: 12.0,
    riskLevel: 'low',
    category: 'sustainability'
  }
];

const mockPortfolio: Portfolio = {
  totalInvested: 175000,
  currentValue: 208750,
  totalROI: 19.3,
  activeInvestments: 2,
  completedInvestments: 1,
  monthlyReturn: 3.2
};

const mockMarketData: MarketData = {
  vodPrice: 2.34,
  vodChange24h: 5.7,
  marketCap: 45620000,
  volume24h: 1230000,
  totalSupply: 100000000,
  circulatingSupply: 45620000
};

export default function InvestmentCabinetPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('portfolio');
  const isRussian = i18n.language === 'ru';

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskText = (risk: string) => {
    const texts = {
      low: { ru: 'Низкий', en: 'Low' },
      medium: { ru: 'Средний', en: 'Medium' },
      high: { ru: 'Высокий', en: 'High' }
    };
    return texts[risk as keyof typeof texts]?.[isRussian ? 'ru' : 'en'] || risk;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'infrastructure': return 'bg-blue-500/20 text-blue-400';
      case 'technology': return 'bg-purple-500/20 text-purple-400';
      case 'sustainability': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCategoryText = (category: string) => {
    const texts = {
      infrastructure: { ru: 'Инфраструктура', en: 'Infrastructure' },
      technology: { ru: 'Технологии', en: 'Technology' },
      sustainability: { ru: 'Устойчивость', en: 'Sustainability' }
    };
    return texts[category as keyof typeof texts]?.[isRussian ? 'ru' : 'en'] || category;
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
        <div className="hexagon h-16 w-16 bg-gradient-to-r from-green-500 to-emerald-600 
          flex items-center justify-center">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t('investment.title', 'Инвестиционный кабинет')}
          </h1>
          <p className="text-white/70">
            {t('investment.subtitle', 'Управление портфелем и анализ доходности')}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-background/20">
          <TabsTrigger value="portfolio">{t('investment.tabs.portfolio', 'Портфель')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('investment.tabs.analytics', 'Аналитика')}</TabsTrigger>
          <TabsTrigger value="projects">{t('investment.tabs.projects', 'Проекты')}</TabsTrigger>
          <TabsTrigger value="trading">{t('investment.tabs.trading', 'Торговля')}</TabsTrigger>
          <TabsTrigger value="market">{t('investment.tabs.market', 'Рынок VOD')}</TabsTrigger>
          <TabsTrigger value="reports">{t('investment.tabs.reports', 'Отчеты')}</TabsTrigger>
        </TabsList>

        {/* Портфель */}
        <TabsContent value="portfolio" className="mt-6">
          {/* Основные метрики портфеля */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Wallet className="h-4 w-4 mr-2 text-green-400" />
                  {t('investment.metrics.totalInvested', 'Всего инвестировано')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{formatCurrency(mockPortfolio.totalInvested)}</p>
                <p className="text-green-400 text-sm">+{mockPortfolio.monthlyReturn}% за месяц</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
                  {t('investment.metrics.currentValue', 'Текущая стоимость')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{formatCurrency(mockPortfolio.currentValue)}</p>
                <p className="text-blue-400 text-sm">
                  +{formatCurrency(mockPortfolio.currentValue - mockPortfolio.totalInvested)} прибыль
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Target className="h-4 w-4 mr-2 text-purple-400" />
                  {t('investment.metrics.totalROI', 'Общий ROI')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{mockPortfolio.totalROI}%</p>
                <p className="text-purple-400 text-sm">Превышает рынок на 4.3%</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-orange-400" />
                  {t('investment.metrics.activeInvestments', 'Активные инвестиции')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{mockPortfolio.activeInvestments}</p>
                <p className="text-orange-400 text-sm">{mockPortfolio.completedInvestments} завершенных</p>
              </CardContent>
            </Card>
          </div>

          {/* Распределение портфеля */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  {t('investment.portfolio.distribution', 'Распределение по категориям')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-white/60">[Круговая диаграмма распределения]</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Инфраструктура:</span>
                    <span className="text-white">57%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Технологии:</span>
                    <span className="text-white">29%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Устойчивость:</span>
                    <span className="text-white">14%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  {t('investment.portfolio.performance', 'Динамика портфеля')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-white/60">[График роста портфеля по времени]</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/60 text-sm">1 месяц</p>
                    <p className="text-green-400 font-bold">+3.2%</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">3 месяца</p>
                    <p className="text-green-400 font-bold">+8.7%</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">1 год</p>
                    <p className="text-green-400 font-bold">+19.3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Список инвестиций */}
          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Coins className="h-5 w-5 mr-2 text-primary" />
                {t('investment.portfolio.investments', 'Мои инвестиции')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInvestments.map((investment) => (
                  <div key={investment.id} className="bg-background/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">
                          {isRussian ? investment.projectName : investment.projectNameEn}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(investment.category)}>
                            {getCategoryText(investment.category)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {investment.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {investment.roi >= 0 ? 
                            <ArrowUpRight className="h-4 w-4 text-green-400" /> :
                            <ArrowDownRight className="h-4 w-4 text-red-400" />
                          }
                          <span className={investment.roi >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {investment.roi > 0 ? '+' : ''}{investment.roi}%
                          </span>
                        </div>
                        <p className="text-white/60 text-sm">
                          {formatCurrency(investment.currentValue)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-white/60">Инвестировано:</p>
                        <p className="text-white">{formatCurrency(investment.amount)}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Ожидаемая доходность:</p>
                        <p className="text-white">{investment.expectedReturn}%</p>
                      </div>
                      <div>
                        <p className="text-white/60">Риск:</p>
                        <p className={getRiskColor(investment.riskLevel)}>
                          {getRiskText(investment.riskLevel)}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/60">Дата инвестиции:</p>
                        <p className="text-white">{investment.startDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Аналитика */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  {t('investment.analytics.returns', 'Анализ доходности')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-white/60">[График доходности по времени]</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-background/20 rounded-lg p-3">
                    <p className="text-white/60">Лучший проект:</p>
                    <p className="text-green-400 font-bold">+25.0%</p>
                  </div>
                  <div className="bg-background/20 rounded-lg p-3">
                    <p className="text-white/60">Средняя доходность:</p>
                    <p className="text-white font-bold">+19.3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-400" />
                  {t('investment.analytics.risk', 'Анализ рисков')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-white/60">[Диаграмма риск/доходность]</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Общий риск портфеля:</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">Средний</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Коэффициент Шарпа:</span>
                    <span className="text-white">1.42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Максимальная просадка:</span>
                    <span className="text-red-400">-3.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Проекты */}
        <TabsContent value="projects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Станция водоочистки Андижан</CardTitle>
                <Badge className="bg-green-500/20 text-green-400 w-fit">Открыт для инвестиций</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Требуется:</span>
                    <span className="text-white font-medium">$2.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Собрано:</span>
                    <span className="text-white">$1.8M (72%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Ожидаемый ROI:</span>
                    <span className="text-green-400">22%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Инвестировать
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">IoT сенсоры Навои</CardTitle>
                <Badge className="bg-blue-500/20 text-blue-400 w-fit">Технологический</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Требуется:</span>
                    <span className="text-white font-medium">$800K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Собрано:</span>
                    <span className="text-white">$320K (40%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Ожидаемый ROI:</span>
                    <span className="text-green-400">28%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Инвестировать
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Экореставрация Каракалпакстан</CardTitle>
                <Badge className="bg-purple-500/20 text-purple-400 w-fit">Экологический</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Требуется:</span>
                    <span className="text-white font-medium">$5.2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Собрано:</span>
                    <span className="text-white">$780K (15%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Ожидаемый ROI:</span>
                    <span className="text-green-400">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Инвестировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Торговля */}
        <TabsContent value="trading" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    График VOD/USD
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-white/60">[TradingView график VOD/USD с инструментами анализа]</p>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-white/60 text-sm">Цена</p>
                      <p className="text-white font-bold">$2.34</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Изменение 24ч</p>
                      <p className="text-green-400 font-bold">+5.7%</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Объем</p>
                      <p className="text-white font-bold">$1.2M</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Макс/Мин</p>
                      <p className="text-white font-bold">$2.45/$2.28</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Стакан заявок</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-red-400 font-medium mb-3">Продажа</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-red-400">$2.36</span>
                          <span className="text-white/60">1,250 VOD</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-400">$2.35</span>
                          <span className="text-white/60">2,340 VOD</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-400">$2.34</span>
                          <span className="text-white/60">890 VOD</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-3">Покупка</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">$2.33</span>
                          <span className="text-white/60">3,420 VOD</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">$2.32</span>
                          <span className="text-white/60">1,560 VOD</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">$2.31</span>
                          <span className="text-white/60">2,100 VOD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Торговая панель</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Купить
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600/20"
                      >
                        Продать
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-white/60 text-sm">Цена</label>
                        <input 
                          type="number" 
                          placeholder="2.34"
                          className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white/60 text-sm">Количество VOD</label>
                        <input 
                          type="number" 
                          placeholder="1000"
                          className="w-full bg-background/30 border border-primary/30 rounded px-3 py-2 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white/60 text-sm">Общая сумма</label>
                        <input 
                          type="text" 
                          placeholder="$2,340"
                          disabled
                          className="w-full bg-background/20 border border-white/10 rounded px-3 py-2 text-white/60"
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Разместить заявку
                    </Button>

                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white/60 text-sm mb-2">Доступный баланс:</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">USD:</span>
                          <span className="text-white">$15,420</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">VOD:</span>
                          <span className="text-white">8,340 VOD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism-dark border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Открытые заявки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-green-400 text-sm">Покупка</span>
                        <span className="text-white/60 text-xs">12:34</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">1,500 VOD</span>
                        <span className="text-white">@ $2.32</span>
                      </div>
                    </div>
                    
                    <div className="bg-background/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-red-400 text-sm">Продажа</span>
                        <span className="text-white/60 text-xs">11:58</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">800 VOD</span>
                        <span className="text-white">@ $2.38</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Рынок VOD */}
        <TabsContent value="market" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                  {t('investment.market.price', 'Цена VOD')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">${mockMarketData.vodPrice}</p>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+{mockMarketData.vodChange24h}% (24ч)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-blue-400" />
                  {t('investment.market.marketCap', 'Рыночная капитализация')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{formatCurrency(mockMarketData.marketCap)}</p>
                <p className="text-blue-400 text-sm">Ранг #156 в DeFi</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-purple-400" />
                  {t('investment.market.volume', 'Объем торгов 24ч')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{formatCurrency(mockMarketData.volume24h)}</p>
                <p className="text-purple-400 text-sm">+15.3% за 24ч</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                {t('investment.market.chart', 'График цены VOD')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-background/20 rounded-lg flex items-center justify-center mb-4">
                <p className="text-white/60">[График цены VOD с TradingView]</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Всего токенов:</p>
                  <p className="text-white">{mockMarketData.totalSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/60">В обращении:</p>
                  <p className="text-white">{mockMarketData.circulatingSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/60">ATH:</p>
                  <p className="text-green-400">$4.67</p>
                </div>
                <div>
                  <p className="text-white/60">ATL:</p>
                  <p className="text-red-400">$0.45</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Отчеты */}
        <TabsContent value="reports" className="mt-6">
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-primary/60 mx-auto mb-4" />
            <h3 className="text-white font-medium text-lg mb-2">
              {t('investment.reports.title', 'Инвестиционные отчеты')}
            </h3>
            <p className="text-white/60 mb-6">
              {t('investment.reports.description', 'Генерируйте подробные отчеты о доходности и рисках портфеля')}
            </p>
            <div className="flex gap-3 justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                {t('investment.reports.generate', 'Сгенерировать отчет')}
              </Button>
              <Button variant="outline" className="border-primary/30 text-primary">
                {t('investment.reports.export', 'Экспорт в PDF')}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}