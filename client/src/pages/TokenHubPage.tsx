
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bookmark, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown, 
  Coins, 
  Globe, 
  Droplet, 
  Mountain,
  BarChart3,
  RefreshCw,
  Plus,
  Minus,
  Activity,
  DollarSign,
  Users,
  Target,
  Award,
  Calendar,
  Building2
} from "lucide-react";

export default function TokenHubPage() {
  const [selectedToken, setSelectedToken] = useState('VOD');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [fromToken, setFromToken] = useState('VOD');
  const [toToken, setToToken] = useState('VOD_Uzbekistan');

  // Mock data for tokens
  const mainTokens = [
    {
      symbol: 'VOD',
      name: 'VOD Token',
      price: 1.25,
      change24h: 2.3,
      volume24h: 125000,
      marketCap: 2500000,
      icon: <Droplet className="h-6 w-6 text-primary" />,
      color: 'from-primary to-primary/80'
    },
    {
      symbol: 'H2O',
      name: 'H2O Utility Token',
      price: 0.85,
      change24h: -1.2,
      volume24h: 89000,
      marketCap: 1800000,
      icon: <Droplet className="h-6 w-6 text-blue-400" />,
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const regionalTokens = [
    {
      symbol: 'VOD_Uzbekistan',
      name: 'VOD Uzbekistan',
      price: 0.95,
      change24h: 3.1,
      volume24h: 45000,
      region: 'Central Asia',
      icon: <Globe className="h-5 w-5 text-green-400" />,
      color: 'from-green-400 to-green-600'
    },
    {
      symbol: 'VOD_Aral',
      name: 'VOD Aral Sea',
      price: 1.10,
      change24h: 1.8,
      volume24h: 32000,
      region: 'Aral Sea Basin',
      icon: <Mountain className="h-5 w-5 text-yellow-400" />,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      symbol: 'VOD_Ural',
      name: 'VOD Ural Region',
      price: 0.78,
      change24h: -0.5,
      volume24h: 28000,
      region: 'Ural Mountains',
      icon: <Mountain className="h-5 w-5 text-purple-400" />,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const stakingPools = [
    {
      name: 'VOD Long-term Pool',
      apy: 12.5,
      lockPeriod: '12 months',
      totalStaked: 450000,
      minStake: 100,
      icon: <Target className="h-5 w-5 text-primary" />
    },
    {
      name: 'Regional Development Pool',
      apy: 8.7,
      lockPeriod: '6 months',
      totalStaked: 280000,
      minStake: 50,
      icon: <Globe className="h-5 w-5 text-green-400" />
    },
    {
      name: 'DAO Governance Pool',
      apy: 15.2,
      lockPeriod: '24 months',
      totalStaked: 180000,
      minStake: 200,
      icon: <Award className="h-5 w-5 text-yellow-400" />
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatPrice = (price: number) => `$${price.toFixed(4)}`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="hexagon h-16 w-16 bg-gradient-to-r from-primary/30 to-secondary/30 
            flex items-center justify-center">
            <Bookmark className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">ТокенХаб</h1>
            <p className="text-foreground/80">Центр управления токенами экосистемы VODeco</p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Обновить данные
        </Button>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Общая рыночная капитализация</p>
                <p className="text-2xl font-bold text-primary">$4.3M</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">24ч объем торгов</p>
                <p className="text-2xl font-bold text-green-400">$242K</p>
              </div>
              <Activity className="h-8 w-8 text-green-400/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Активные пользователи</p>
                <p className="text-2xl font-bold text-blue-400">1,245</p>
              </div>
              <Users className="h-8 w-8 text-blue-400/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Средняя доходность</p>
                <p className="text-2xl font-bold text-yellow-400">12.1%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="w-full bg-background/20 p-1 grid grid-cols-4">
          <TabsTrigger value="tokens" className="flex items-center data-[state=active]:bg-primary/20">
            <Coins className="w-4 h-4 mr-2" />
            Токены
          </TabsTrigger>
          <TabsTrigger value="exchange" className="flex items-center data-[state=active]:bg-primary/20">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Обмен
          </TabsTrigger>
          <TabsTrigger value="staking" className="flex items-center data-[state=active]:bg-primary/20">
            <BarChart3 className="w-4 h-4 mr-2" />
            Стейкинг
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center data-[state=active]:bg-primary/20">
            <Activity className="w-4 h-4 mr-2" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        {/* Tokens Tab */}
        <TabsContent value="tokens" className="mt-6 space-y-6">
          {/* Main Tokens */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Coins className="h-5 w-5" />
                Основные токены
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mainTokens.map((token) => (
                  <div key={token.symbol} className="flex items-center justify-between p-4 bg-background/30 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${token.color} flex items-center justify-center`}>
                        {token.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{token.name}</h4>
                        <p className="text-sm text-white/60">{token.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{formatPrice(token.price)}</p>
                      <div className={`flex items-center text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {Math.abs(token.change24h)}%
                      </div>
                    </div>
                    <div className="text-right text-sm text-white/60">
                      <p>Объем: {formatNumber(token.volume24h)}</p>
                      <p>Кап: {formatNumber(token.marketCap)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Tokens */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Globe className="h-5 w-5" />
                Региональные субтокены
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionalTokens.map((token) => (
                  <div key={token.symbol} className="p-4 bg-background/30 rounded-lg border border-primary/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${token.color} flex items-center justify-center`}>
                        {token.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">{token.region}</Badge>
                    </div>
                    <h4 className="font-medium text-white mb-1">{token.name}</h4>
                    <p className="text-sm text-white/60 mb-2">{token.symbol}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{formatPrice(token.price)}</span>
                      <div className={`flex items-center text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {Math.abs(token.change24h)}%
                      </div>
                    </div>
                    <p className="text-xs text-white/40 mt-2">Объем: {formatNumber(token.volume24h)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exchange Tab - Биржа объектов */}
        <TabsContent value="exchange" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Обмен токенов */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <ArrowUpDown className="h-5 w-5" />
                  Обмен токенов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/80 mb-2 block">Отдаете</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="0.00" 
                      value={exchangeAmount}
                      onChange={(e) => setExchangeAmount(e.target.value)}
                      className="flex-1"
                    />
                    <select 
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      className="px-3 py-2 bg-background border border-input rounded-md"
                    >
                      <option value="VOD">VOD</option>
                      <option value="H2O">H2O</option>
                      <option value="VOD_Uzbekistan">VOD_Uzbekistan</option>
                      <option value="VOD_Aral">VOD_Aral</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <div>
                  <label className="text-sm text-foreground/80 mb-2 block">Получаете</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="0.00" 
                      value={exchangeAmount ? (parseFloat(exchangeAmount) * 0.95).toFixed(4) : ''}
                      readOnly
                      className="flex-1"
                    />
                    <select 
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className="px-3 py-2 bg-background border border-input rounded-md"
                    >
                      <option value="VOD_Uzbekistan">VOD_Uzbekistan</option>
                      <option value="VOD">VOD</option>
                      <option value="H2O">H2O</option>
                      <option value="VOD_Aral">VOD_Aral</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Курс обмена:</span>
                    <span className="text-foreground">1 {fromToken} = 0.95 {toToken}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Комиссия:</span>
                    <span className="text-foreground">0.3%</span>
                  </div>
                </div>
                
                <Button className="w-full" disabled={!exchangeAmount}>
                  Обменять токены
                </Button>
              </CardContent>
            </Card>

            {/* Биржа водных объектов */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Building2 className="h-5 w-5" />
                  Биржа водных объектов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-background/30 rounded-lg border border-primary/10">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Водоочистные сооружения Ташкента</h4>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">Доступно</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-foreground/60">Цена доли:</span>
                        <span className="font-semibold ml-2">25,000 VOD</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">IRR:</span>
                        <span className="font-semibold ml-2 text-green-500">18.5%</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Доступно:</span>
                        <span className="font-semibold ml-2">12/100 долей</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Дивиденды:</span>
                        <span className="font-semibold ml-2">Ежемесячно</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">Купить долю</Button>
                  </div>

                  <div className="p-3 bg-background/30 rounded-lg border border-primary/10">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Система очистки Алматы</h4>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Популярно</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-foreground/60">Цена доли:</span>
                        <span className="font-semibold ml-2">35,000 VOD</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">IRR:</span>
                        <span className="font-semibold ml-2 text-green-500">22.1%</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Доступно:</span>
                        <span className="font-semibold ml-2">5/50 долей</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Дивиденды:</span>
                        <span className="font-semibold ml-2">Ежемесячно</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">Купить долю</Button>
                  </div>

                  <div className="p-3 bg-background/30 rounded-lg border border-primary/10">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Модуль ПЭВМ "Аналитика"</h4>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Новинка</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-foreground/60">Цена доли:</span>
                        <span className="font-semibold ml-2">5,000 VOD</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">IRR:</span>
                        <span className="font-semibold ml-2 text-green-500">28.4%</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Доступно:</span>
                        <span className="font-semibold ml-2">25/100 долей</span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Стадия:</span>
                        <span className="font-semibold ml-2">Разработка</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">Купить долю</Button>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                  <h4 className="font-semibold mb-2">Преимущества биржи объектов</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Прозрачность через блокчейн</li>
                    <li>• Автоматические выплаты дивидендов</li>
                    <li>• Ликвидность инвестиций</li>
                    <li>• Диверсификация рисков</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Staking Tab */}
        <TabsContent value="staking" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakingPools.map((pool, index) => (
              <Card key={index} className="border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary text-lg">
                    {pool.icon}
                    {pool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/60">APY:</span>
                    <span className="text-xl font-bold text-green-400">{pool.apy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/60">Период блокировки:</span>
                    <span className="text-foreground">{pool.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/60">Общий стейк:</span>
                    <span className="text-foreground">{formatNumber(pool.totalStaked)} VOD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/60">Минимум:</span>
                    <span className="text-foreground">{pool.minStake} VOD</span>
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Застейкать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BarChart3 className="h-5 w-5" />
                  Производительность портфеля
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                    <span className="text-foreground/80">Общая доходность</span>
                    <span className="text-green-400 font-bold">+23.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                    <span className="text-foreground/80">30-дневная доходность</span>
                    <span className="text-green-400 font-bold">+5.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                    <span className="text-foreground/80">7-дневная доходность</span>
                    <span className="text-red-400 font-bold">-1.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Calendar className="h-5 w-5" />
                  Предстоящие события
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-background/30 rounded-lg border-l-4 border-primary">
                    <h4 className="font-medium text-white">Разблокировка стейка</h4>
                    <p className="text-sm text-white/60">15 декабря 2024</p>
                    <p className="text-sm text-primary">500 VOD</p>
                  </div>
                  <div className="p-3 bg-background/30 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-medium text-white">Выплата вознаграждений</h4>
                    <p className="text-sm text-white/60">20 декабря 2024</p>
                    <p className="text-sm text-green-400">62.5 VOD</p>
                  </div>
                  <div className="p-3 bg-background/30 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-medium text-white">Голосование DAO</h4>
                    <p className="text-sm text-white/60">25 декабря 2024</p>
                    <p className="text-sm text-yellow-400">Предложение #47</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
