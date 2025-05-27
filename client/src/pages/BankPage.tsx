
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BadgeDollarSign, 
  Droplets, 
  TrendingUp, 
  Globe, 
  Calculator,
  LineChart,
  Waves,
  Factory,
  ShieldCheck,
  Users,
  Clock,
  Target,
  Award,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface WaterCredit {
  id: string;
  region: string;
  country: string;
  volume: number; // in cubic meters
  quality: number; // quality index 0-100
  price: number; // per cubic meter
  issuer: string;
  expiry: string;
  verified: boolean;
  type: 'conservation' | 'treatment' | 'restoration' | 'efficiency';
}

interface WaterFuture {
  id: string;
  contractType: 'call' | 'put';
  strikePrice: number;
  expiry: string;
  volume: number;
  premium: number;
  region: string;
}

interface WaterInsurance {
  id: string;
  coverageType: 'drought' | 'flood' | 'contamination' | 'infrastructure';
  coverage: number;
  premium: number;
  region: string;
  active: boolean;
}

export default function BankPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [waterCredits] = useState<WaterCredit[]>([
    {
      id: 'WC001',
      region: 'Bukhara',
      country: 'Uzbekistan',
      volume: 50000,
      quality: 85,
      price: 0.15,
      issuer: 'AmuBukhara-1 Station',
      expiry: '2025-12-31',
      verified: true,
      type: 'treatment'
    },
    {
      id: 'WC002',
      region: 'Jizzakh',
      country: 'Uzbekistan',
      volume: 75000,
      quality: 92,
      price: 0.12,
      issuer: 'Pumping Station No. 2',
      expiry: '2025-11-30',
      verified: true,
      type: 'efficiency'
    }
  ]);

  const [waterFutures] = useState<WaterFuture[]>([
    {
      id: 'WF001',
      contractType: 'call',
      strikePrice: 0.20,
      expiry: '2025-06-30',
      volume: 100000,
      premium: 0.02,
      region: 'Central Asia'
    }
  ]);

  const [insurancePolicies] = useState<WaterInsurance[]>([
    {
      id: 'WI001',
      coverageType: 'drought',
      coverage: 500000,
      premium: 15000,
      region: 'Uzbekistan',
      active: true
    }
  ]);

  const [carbonCreditsFromWater, setCarbonCreditsFromWater] = useState(245.8);
  const [waterSavingsCertificate, setWaterSavingsCertificate] = useState(1250000);
  const [globalWaterIndex, setGlobalWaterIndex] = useState(127.45);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="glassmorphism-dark rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 opacity-10 -translate-y-1/4 translate-x-1/4">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,0 95,25 95,75 50,100 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
          </svg>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center relative z-10">
          <div className="flex items-center mb-6 lg:mb-0">
            <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center mr-6">
              <Droplets className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Первый Всемирный Банк Воды</h1>
              <p className="text-primary/80 text-lg">Революционная водная финансовая экосистема</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-background/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{globalWaterIndex}</div>
              <div className="text-white/70 text-sm">Global Water Index</div>
            </div>
            <div className="bg-background/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">{carbonCreditsFromWater}</div>
              <div className="text-white/70 text-sm">Carbon Credits (tCO2)</div>
            </div>
            <div className="bg-background/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">{(waterSavingsCertificate / 1000000).toFixed(1)}M</div>
              <div className="text-white/70 text-sm">Water Saved (m³)</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-background/20 backdrop-blur-sm">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="credits">Водные Кредиты</TabsTrigger>
          <TabsTrigger value="futures">Фьючерсы</TabsTrigger>
          <TabsTrigger value="insurance">Страхование</TabsTrigger>
          <TabsTrigger value="exchange">Биржа</TabsTrigger>
          <TabsTrigger value="certificates">Сертификаты</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glassmorphism-dark border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Водный Портфель</p>
                    <p className="text-2xl font-bold text-white">2.45M m³</p>
                    <div className="flex items-center text-green-400 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +12.5%
                    </div>
                  </div>
                  <Waves className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Активные Контракты</p>
                    <p className="text-2xl font-bold text-white">1,247</p>
                    <div className="flex items-center text-green-400 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +8.3%
                    </div>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">ROI Водных Активов</p>
                    <p className="text-2xl font-bold text-white">15.7%</p>
                    <div className="flex items-center text-green-400 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +2.1%
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">ESG Рейтинг</p>
                    <p className="text-2xl font-bold text-white">AAA+</p>
                    <div className="flex items-center text-green-400 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </div>
                  </div>
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Быстрые Операции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Button className="bg-primary hover:bg-primary/80 text-black">
                  Купить Водные Кредиты
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Фьючерс на Воду
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Страхование
                </Button>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                  Обмен Углеродных Кредитов
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Водная Деривативы
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  DAO Голосование
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Water Credits Tab */}
        <TabsContent value="credits" className="space-y-6">
          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Droplets className="h-5 w-5 mr-2 text-primary" />
                Водные Кредиты (Торгуемые Сертификаты Водосбережения)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waterCredits.map((credit) => (
                  <div key={credit.id} className="bg-background/20 rounded-lg p-4 border border-primary/10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-white">{credit.id}</h4>
                          {credit.verified && <CheckCircle className="h-4 w-4 text-green-400" />}
                          <Badge variant="outline" className="text-xs">
                            {credit.type}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm">{credit.region}, {credit.country}</p>
                        <p className="text-white/60 text-xs">Эмитент: {credit.issuer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">${credit.price}</p>
                        <p className="text-white/60 text-xs">за m³</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-white/50">Объем</p>
                        <p className="text-white font-medium">{credit.volume.toLocaleString()} m³</p>
                      </div>
                      <div>
                        <p className="text-white/50">Качество</p>
                        <p className="text-white font-medium">{credit.quality}/100</p>
                      </div>
                      <div>
                        <p className="text-white/50">Срок действия</p>
                        <p className="text-white font-medium">{credit.expiry}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-white/60">
                        Общая стоимость: ${(credit.volume * credit.price).toLocaleString()}
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/80 text-black">
                        Купить Кредиты
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Futures Tab */}
        <TabsContent value="futures" className="space-y-6">
          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-primary" />
                Фьючерсы и Опционы на Водные Ресурсы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waterFutures.map((future) => (
                  <div key={future.id} className="bg-background/20 rounded-lg p-4 border border-primary/10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-white">{future.id}</h4>
                          <Badge variant={future.contractType === 'call' ? 'default' : 'secondary'}>
                            {future.contractType.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm">{future.region}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">${future.strikePrice}</p>
                        <p className="text-white/60 text-xs">Strike Price</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-white/50">Объем</p>
                        <p className="text-white font-medium">{future.volume.toLocaleString()} m³</p>
                      </div>
                      <div>
                        <p className="text-white/50">Премия</p>
                        <p className="text-white font-medium">${future.premium}</p>
                      </div>
                      <div>
                        <p className="text-white/50">Экспирация</p>
                        <p className="text-white font-medium">{future.expiry}</p>
                      </div>
                      <div>
                        <p className="text-white/50">Потенциальная прибыль</p>
                        <p className="text-green-400 font-medium">+23.5%</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-white/60">
                        Общая стоимость контракта: ${(future.volume * future.premium).toLocaleString()}
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">
                          Купить
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/20">
                          Продать
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance Tab */}
        <TabsContent value="insurance" className="space-y-6">
          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                Страхование Водных Рисков
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insurancePolicies.map((policy) => (
                  <div key={policy.id} className="bg-background/20 rounded-lg p-4 border border-primary/10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-white">{policy.id}</h4>
                          <Badge variant={policy.active ? 'default' : 'secondary'}>
                            {policy.active ? 'Активно' : 'Неактивно'}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm">Тип: {policy.coverageType}</p>
                        <p className="text-white/60 text-xs">Регион: {policy.region}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">${policy.coverage.toLocaleString()}</p>
                        <p className="text-white/60 text-xs">Покрытие</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <p className="text-white/50">Годовая премия: ${policy.premium.toLocaleString()}</p>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/80 text-black">
                        Управлять Полисом
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  + Новый Страховой Полис
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exchange Tab */}
        <TabsContent value="exchange" className="space-y-6">
          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Международная Водная Биржа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Торговые Пары</h3>
                  <div className="space-y-2">
                    {[
                      { pair: 'VOD/WATER', price: 1.25, change: '+3.4%' },
                      { pair: 'CARBON/WATER', price: 0.85, change: '-1.2%' },
                      { pair: 'H2O/USD', price: 0.15, change: '+5.7%' },
                      { pair: 'DROUGHT/VOD', price: 2.34, change: '+12.3%' }
                    ].map((trading, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-background/20 rounded-lg">
                        <span className="text-white font-medium">{trading.pair}</span>
                        <div className="text-right">
                          <div className="text-white">${trading.price}</div>
                          <div className={`text-sm ${trading.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {trading.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Быстрая Торговля</h3>
                  <div className="space-y-3">
                    <Input placeholder="Количество" className="bg-background/20 border-primary/20" />
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Купить
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white">
                        Продать
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <Card className="glassmorphism-dark border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Цифровые Сертификаты и NFT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-background/20 rounded-lg p-4 border border-green-500/30">
                  <div className="text-center mb-4">
                    <Award className="h-12 w-12 text-green-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-white">Сертификат Водосбережения</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Сэкономлено:</span>
                      <span className="text-white">{(waterSavingsCertificate / 1000).toLocaleString()} тыс. m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">CO2 эквивалент:</span>
                      <span className="text-green-400">{carbonCreditsFromWater} tCO2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Статус:</span>
                      <span className="text-green-400">Verified ✓</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                    Скачать NFT
                  </Button>
                </div>

                <div className="bg-background/20 rounded-lg p-4 border border-blue-500/30">
                  <div className="text-center mb-4">
                    <Factory className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-white">Сертификат Очистки</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Объем очищенной воды:</span>
                      <span className="text-white">850,000 m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Качество до/после:</span>
                      <span className="text-blue-400">45/92</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Технология:</span>
                      <span className="text-white">Advanced RO</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                    Создать NFT
                  </Button>
                </div>

                <div className="bg-background/20 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-center mb-4">
                    <Target className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-white">ESG Сертификат</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">ESG Score:</span>
                      <span className="text-white">AAA+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">SDG Соответствие:</span>
                      <span className="text-purple-400">6, 14, 15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Аудитор:</span>
                      <span className="text-white">UN-Water</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white">
                    Получить Сертификат
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
