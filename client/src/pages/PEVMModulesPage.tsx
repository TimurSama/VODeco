
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  Database, 
  Wrench, 
  Users, 
  BarChart3, 
  Smartphone,
  Zap,
  Coins,
  TrendingUp,
  Clock,
  Code,
  Server,
  CheckCircle,
  AlertTriangle,
  DollarSign
} from "lucide-react";

const PEVMModulesPage: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'module-a',
      code: 'A',
      name: 'Баланс водоотведения/водоснабжения',
      description: 'Автоматизированная система контроля и балансировки водных потоков',
      category: 'Водный баланс',
      progress: 15,
      estimatedCost: 250000,
      stakingPool: 75000,
      expectedIRR: 18.5,
      developmentTime: '8-12 месяцев',
      icon: <Database className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'module-b',
      code: 'B',
      name: 'Анализ технологических параметров',
      description: 'ИИ-система мониторинга и анализа качественных показателей воды',
      category: 'Аналитика',
      progress: 25,
      estimatedCost: 180000,
      stakingPool: 45000,
      expectedIRR: 22.3,
      developmentTime: '6-9 месяцев',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'module-c',
      code: 'C',
      name: 'Управление ремонтами и спецтехникой',
      description: 'Планирование, учет и мониторинг ремонтных работ и оборудования',
      category: 'Операции',
      progress: 10,
      estimatedCost: 320000,
      stakingPool: 95000,
      expectedIRR: 15.8,
      developmentTime: '10-14 месяцев',
      icon: <Wrench className="h-6 w-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'module-d',
      code: 'D',
      name: 'Автоматизация сбытовой службы',
      description: 'Управление клиентской базой, тарифами и биллинговыми процессами',
      category: 'Клиенты',
      progress: 20,
      estimatedCost: 200000,
      stakingPool: 80000,
      expectedIRR: 25.7,
      developmentTime: '7-10 месяцев',
      icon: <Users className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'module-f',
      code: 'F',
      name: 'Big Data обработка и визуализация',
      description: 'Платформа для обработки больших данных и создания интерактивных дашбордов',
      category: 'Данные',
      progress: 30,
      estimatedCost: 400000,
      stakingPool: 120000,
      expectedIRR: 28.4,
      developmentTime: '12-18 месяцев',
      icon: <Server className="h-6 w-6" />,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'module-g',
      code: 'G',
      name: 'Мобильные обходы оборудования',
      description: 'Мобильное приложение для инспекций и технического обслуживания',
      category: 'Мобильные',
      progress: 5,
      estimatedCost: 150000,
      stakingPool: 30000,
      expectedIRR: 19.2,
      developmentTime: '5-8 месяцев',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'module-h',
      code: 'H',
      name: 'Управление энергопотреблением',
      description: 'Система оптимизации энергозатрат водоочистных сооружений',
      category: 'Энергетика',
      progress: 12,
      estimatedCost: 280000,
      stakingPool: 85000,
      expectedIRR: 21.6,
      developmentTime: '9-12 месяцев',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const handleStaking = (moduleId: string) => {
    setSelectedModule(moduleId);
    // TODO: Реализовать стейкинг логику
  };

  const totalStaked = modules.reduce((sum, module) => sum + module.stakingPool, 0);
  const avgIRR = modules.reduce((sum, module) => sum + module.expectedIRR, 0) / modules.length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="hexagon h-20 w-20 bg-gradient-to-r from-purple-500 to-blue-500 
            flex items-center justify-center">
            <Code className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">Модули ПЭВМ</h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Программное обеспечение для цифровой трансформации водного хозяйства - 
          8 модулей для полной автоматизации процессов
        </p>
        <Badge variant="outline" className="mt-4 bg-orange-500/10 text-orange-500 border-orange-500/20">
          Сбор средств на разработку • Стейкинг открыт
        </Badge>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Общий бюджет</p>
                <p className="text-2xl font-bold text-primary">
                  ${modules.reduce((sum, m) => sum + m.estimatedCost, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Средства стейкинга</p>
                <p className="text-2xl font-bold text-green-400">${totalStaked.toLocaleString()}</p>
              </div>
              <Coins className="h-8 w-8 text-green-400/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Средняя IRR</p>
                <p className="text-2xl font-bold text-yellow-400">{avgIRR.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Модули</p>
                <p className="text-2xl font-bold text-blue-400">{modules.length}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-400/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Модули */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full bg-background/20 p-1 grid grid-cols-3">
          <TabsTrigger value="overview">Обзор модулей</TabsTrigger>
          <TabsTrigger value="staking">Стейкинг пулы</TabsTrigger>
          <TabsTrigger value="roadmap">Дорожная карта</TabsTrigger>
        </TabsList>

        {/* Обзор модулей */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className="border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${module.color} flex items-center justify-center text-white`}>
                        {module.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{module.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {module.code}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/80">{module.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Прогресс разработки</span>
                      <span className="font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-foreground/60">Бюджет</p>
                      <p className="font-semibold">${module.estimatedCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">IRR</p>
                      <p className="font-semibold text-green-500">{module.expectedIRR}%</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Застейкано</p>
                      <p className="font-semibold">${module.stakingPool.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Срок</p>
                      <p className="font-semibold">{module.developmentTime}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                    >
                      Детали
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleStaking(module.id)}
                    >
                      <Coins className="h-4 w-4 mr-2" />
                      Стейкинг
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Стейкинг пулы */}
        <TabsContent value="staking" className="mt-6 space-y-6">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Coins className="h-5 w-5" />
                Стейкинг пулы модулей ПЭВМ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modules
                  .sort((a, b) => b.expectedIRR - a.expectedIRR)
                  .map((module) => (
                    <div key={module.id} className="p-4 bg-background/30 rounded-lg border border-primary/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${module.color} flex items-center justify-center text-white text-sm font-bold`}>
                            {module.code}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{module.name}</h4>
                            <p className="text-sm text-white/60">{module.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">{module.expectedIRR}%</div>
                          <div className="text-xs text-white/60">IRR</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-white/60">Минимум</p>
                          <p className="font-semibold text-white">1,000 VOD</p>
                        </div>
                        <div>
                          <p className="text-white/60">Застейкано</p>
                          <p className="font-semibold text-white">${module.stakingPool.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Срок</p>
                          <p className="font-semibold text-white">{module.developmentTime}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Input 
                          placeholder="Количество VOD"
                          className="flex-1"
                          value={selectedModule === module.id ? stakeAmount : ''}
                          onChange={(e) => {
                            setSelectedModule(module.id);
                            setStakeAmount(e.target.value);
                          }}
                        />
                        <Button 
                          className={`bg-gradient-to-r ${module.color} text-white`}
                        >
                          Застейкать
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold mb-3">Преимущества стейкинга в модули ПЭВМ</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Высокая доходность (15-28% IRR)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Участие в прибыли от лицензирования
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Приоритетный доступ к модулям
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Голосование по развитию продукта
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Эксклюзивные NFT "Developer"
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Техническая поддержка 24/7
                    </li>
                  </ul>
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
                Дорожная карта разработки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="text-2xl font-bold text-green-500">Q1 2025</div>
                    <div className="text-sm font-medium mt-2">Модули G, B</div>
                    <div className="text-xs text-foreground/60 mt-1">Мобильные обходы, Аналитика</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-500">Q2 2025</div>
                    <div className="text-sm font-medium mt-2">Модули D, H</div>
                    <div className="text-xs text-foreground/60 mt-1">Сбытовая служба, Энергопотребление</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-500">Q3 2025</div>
                    <div className="text-sm font-medium mt-2">Модули A, C</div>
                    <div className="text-xs text-foreground/60 mt-1">Водный баланс, Ремонты</div>
                  </div>
                  <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-500">Q4 2025</div>
                    <div className="text-sm font-medium mt-2">Модуль F</div>
                    <div className="text-xs text-foreground/60 mt-1">Big Data платформа</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/20">
                  <h4 className="font-semibold text-lg mb-4">Этапы разработки</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">1</div>
                      <div className="flex-1">
                        <h5 className="font-medium">Сбор средств и планирование</h5>
                        <p className="text-sm text-foreground/60">Завершение стейкинга, техническое планирование, формирование команд</p>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">Активно</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm font-bold">2</div>
                      <div className="flex-1">
                        <h5 className="font-medium">MVP разработка</h5>
                        <p className="text-sm text-foreground/60">Создание базовых версий модулей с ключевым функционалом</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">Подготовка</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">3</div>
                      <div className="flex-1">
                        <h5 className="font-medium">Тестирование и интеграция</h5>
                        <p className="text-sm text-foreground/60">Пилотные проекты, интеграция с существующими системами</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Планируется</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">4</div>
                      <div className="flex-1">
                        <h5 className="font-medium">Коммерческий запуск</h5>
                        <p className="text-sm text-foreground/60">Лицензирование, продажи, техническая поддержка</p>
                      </div>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-500">2025-2026</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <h4 className="font-semibold text-yellow-500">Важная информация</h4>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Все модули ПЭВМ находятся в стадии планирования и сбора средств. 
                    Разработка начнется после достижения целевых показателей стейкинга для каждого модуля. 
                    Инвесторы получают приоритетные права на использование готового ПО.
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

export default PEVMModulesPage;
