import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Target,
  TrendingDown,
  Activity,
  Globe,
  Shield,
  Leaf,
  Users,
  Calendar,
  FileText,
  Download,
  Eye,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Investment {
  id: string;
  name: string;
  type: 'project' | 'infrastructure' | 'technology' | 'research';
  category: 'water_quality' | 'conservation' | 'infrastructure' | 'innovation';
  status: 'active' | 'completed' | 'planned' | 'suspended';
  investment: number;
  return: number;
  roi: number;
  duration: number;
  risk: 'low' | 'medium' | 'high';
  location: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  partners: string[];
  esgScore: number;
}

interface ESGReport {
  id: string;
  title: string;
  period: string;
  score: number;
  environmental: number;
  social: number;
  governance: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  highlights: string[];
  risks: string[];
  opportunities: string[];
}

interface MarketData {
  metric: string;
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

interface Portfolio {
  totalValue: number;
  totalReturn: number;
  totalROI: number;
  activeInvestments: number;
  completedInvestments: number;
  averageROI: number;
  riskScore: number;
  diversification: number;
}

export default function InvestorCabinet() {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'esg' | 'market' | 'opportunities'>('overview');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  // Моковые данные
  const investments: Investment[] = [
    {
      id: '1',
      name: 'Модернизация очистных сооружений',
      type: 'infrastructure',
      category: 'water_quality',
      status: 'active',
      investment: 5000000,
      return: 6500000,
      roi: 30,
      duration: 24,
      risk: 'medium',
      location: 'Московская область',
      description: 'Комплексная модернизация системы очистки воды с внедрением новых технологий',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2025-06-01'),
      partners: ['Водоканал Москвы', 'ЭкоТех'],
      esgScore: 85
    },
    {
      id: '2',
      name: 'Система мониторинга качества воды',
      type: 'technology',
      category: 'innovation',
      status: 'active',
      investment: 2500000,
      return: 3200000,
      roi: 28,
      duration: 18,
      risk: 'low',
      location: 'Санкт-Петербург',
      description: 'Внедрение IoT системы для непрерывного мониторинга качества воды',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2025-03-01'),
      partners: ['Водоканал СПб', 'IoT Solutions'],
      esgScore: 92
    },
    {
      id: '3',
      name: 'Программа сохранения водных ресурсов',
      type: 'project',
      category: 'conservation',
      status: 'planned',
      investment: 3000000,
      return: 4200000,
      roi: 40,
      duration: 36,
      risk: 'high',
      location: 'Байкальский регион',
      description: 'Комплексная программа по сохранению и восстановлению водных экосистем',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2027-03-01'),
      partners: ['Минприроды', 'ЭкоБайкал'],
      esgScore: 95
    }
  ];

  const esgReports: ESGReport[] = [
    {
      id: '1',
      title: 'ESG отчет Q4 2023',
      period: 'Q4 2023',
      score: 87,
      environmental: 92,
      social: 85,
      governance: 84,
      status: 'published',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      highlights: [
        'Снижение потребления энергии на 15%',
        'Улучшение качества воды на 23%',
        'Увеличение социальных инвестиций на 40%'
      ],
      risks: [
        'Климатические изменения',
        'Регулятивные изменения',
        'Технологические риски'
      ],
      opportunities: [
        'Расширение на новые регионы',
        'Внедрение AI технологий',
        'Партнерства с научными институтами'
      ]
    },
    {
      id: '2',
      title: 'ESG отчет Q3 2023',
      period: 'Q3 2023',
      score: 84,
      environmental: 89,
      social: 82,
      governance: 81,
      status: 'published',
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2023-10-15'),
      highlights: [
        'Запуск 3 новых проектов',
        'Достижение 90% соответствия стандартам',
        'Увеличение прозрачности отчетности'
      ],
      risks: [
        'Волатильность сырьевых цен',
        'Конкуренция на рынке',
        'Изменения в законодательстве'
      ],
      opportunities: [
        'Цифровизация процессов',
        'Международное сотрудничество',
        'Развитие кадрового потенциала'
      ]
    }
  ];

  const marketData: MarketData[] = [
    {
      metric: 'Объем рынка водных технологий',
      current: 850,
      previous: 780,
      change: 8.97,
      trend: 'up',
      unit: 'млрд $'
    },
    {
      metric: 'Рост ESG инвестиций',
      current: 45,
      previous: 38,
      change: 18.42,
      trend: 'up',
      unit: '%'
    },
    {
      metric: 'Средняя ROI водных проектов',
      current: 28.5,
      previous: 25.2,
      change: 13.10,
      trend: 'up',
      unit: '%'
    },
    {
      metric: 'Риск-премия сектора',
      current: 4.2,
      previous: 4.8,
      change: -12.50,
      trend: 'down',
      unit: '%'
    }
  ];

  const portfolio: Portfolio = {
    totalValue: 10500000,
    totalReturn: 13900000,
    totalROI: 32.4,
    activeInvestments: 2,
    completedInvestments: 5,
    averageROI: 28.7,
    riskScore: 6.2,
    diversification: 78
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getESGColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Заголовок кабинета */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-500 rounded-lg text-white">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Инвестиционный кабинет</h1>
          <p className="text-gray-600">Инвестиционная панель, ESG отчетность и анализ рынка</p>
        </div>
      </div>

      {/* Навигация по вкладкам */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Обзор', icon: BarChart3 },
          { id: 'portfolio', label: 'Портфолио', icon: PieChart },
          { id: 'esg', label: 'ESG отчеты', icon: Leaf },
          { id: 'market', label: 'Рынок', icon: Globe },
          { id: 'opportunities', label: 'Возможности', icon: Target }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Содержимое вкладок */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Ключевые метрики портфолио */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Общая стоимость</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(portfolio.totalValue / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-gray-600">Портфолио</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${(portfolio.totalReturn / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-gray-600">+{portfolio.totalROI}% ROI</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Активные инвестиции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolio.activeInvestments}</div>
                <p className="text-xs text-gray-600">Проектов</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Средний ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{portfolio.averageROI}%</div>
                <p className="text-xs text-gray-600">По портфолио</p>
              </CardContent>
            </Card>
          </div>

          {/* Рыночные данные */}
          <Card>
            <CardHeader>
              <CardTitle>Рыночные показатели</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketData.map((data) => (
                  <div key={data.metric} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{data.metric}</h4>
                      {getTrendIcon(data.trend)}
                    </div>
                    <div className="text-2xl font-bold">{data.current}{data.unit}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={data.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {data.change >= 0 ? '+' : ''}{data.change}%
                      </span>
                      <span className="text-gray-600">к прошлому периоду</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Активные инвестиции */}
          <Card>
            <CardHeader>
              <CardTitle>Активные инвестиции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.filter(inv => inv.status === 'active').map((investment) => (
                  <div key={investment.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{investment.name}</h3>
                            <Badge className={getStatusColor(investment.status)}>
                              {investment.status === 'active' ? 'Активна' :
                               investment.status === 'completed' ? 'Завершена' :
                               investment.status === 'planned' ? 'Планируется' : 'Приостановлена'}
                            </Badge>
                            <Badge className={getRiskColor(investment.risk)}>
                              {investment.risk === 'low' ? 'Низкий риск' :
                               investment.risk === 'medium' ? 'Средний риск' : 'Высокий риск'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{investment.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Инвестиция:</span>
                              <div className="font-medium">${(investment.investment / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <span className="text-gray-500">ROI:</span>
                              <div className="font-medium text-green-600">{investment.roi}%</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Длительность:</span>
                              <div className="font-medium">{investment.duration} мес.</div>
                            </div>
                            <div>
                              <span className="text-gray-500">ESG оценка:</span>
                              <div className={`font-medium ${getESGColor(investment.esgScore)}`}>
                                {investment.esgScore}/100
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Детали
                        </Button>
                        <Button variant="outline" size="sm">
                          Отчет
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Добавление новой инвестиции */}
          <Card>
            <CardHeader>
              <CardTitle>Добавить инвестицию</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название проекта</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Тип инвестиции</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">Проект</SelectItem>
                      <SelectItem value="infrastructure">Инфраструктура</SelectItem>
                      <SelectItem value="technology">Технологии</SelectItem>
                      <SelectItem value="research">Исследования</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water_quality">Качество воды</SelectItem>
                      <SelectItem value="conservation">Сохранение</SelectItem>
                      <SelectItem value="infrastructure">Инфраструктура</SelectItem>
                      <SelectItem value="innovation">Инновации</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Сумма инвестиции</Label>
                  <Input type="number" placeholder="Введите сумму" />
                </div>
                <div>
                  <Label>Уровень риска</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите риск" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Местоположение</Label>
                  <Input placeholder="Введите местоположение" />
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea placeholder="Подробное описание проекта" rows={3} />
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Добавить инвестицию
              </Button>
            </CardContent>
          </Card>

          {/* Анализ портфолио */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Распределение по категориям</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Качество воды', value: 45, color: 'bg-blue-500' },
                    { category: 'Инфраструктура', value: 30, color: 'bg-green-500' },
                    { category: 'Инновации', value: 15, color: 'bg-purple-500' },
                    { category: 'Сохранение', value: 10, color: 'bg-orange-500' }
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={item.value} className="w-20" />
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Показатели риска</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Общий риск портфолио</span>
                    <div className="flex items-center gap-2">
                      <Progress value={portfolio.riskScore * 10} className="w-20" />
                      <span className="font-medium">{portfolio.riskScore}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Диверсификация</span>
                    <div className="flex items-center gap-2">
                      <Progress value={portfolio.diversification} className="w-20" />
                      <span className="font-medium">{portfolio.diversification}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ликвидность</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-20" />
                      <span className="font-medium">75%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Все инвестиции */}
          <Card>
            <CardHeader>
              <CardTitle>Все инвестиции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div key={investment.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{investment.name}</h3>
                            <Badge className={getStatusColor(investment.status)}>
                              {investment.status === 'active' ? 'Активна' :
                               investment.status === 'completed' ? 'Завершена' :
                               investment.status === 'planned' ? 'Планируется' : 'Приостановлена'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{investment.location}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Инвестиция:</span>
                              <div className="font-medium">${(investment.investment / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <span className="text-gray-500">ROI:</span>
                              <div className="font-medium text-green-600">{investment.roi}%</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Длительность:</span>
                              <div className="font-medium">{investment.duration} мес.</div>
                            </div>
                            <div>
                              <span className="text-gray-500">ESG:</span>
                              <div className={`font-medium ${getESGColor(investment.esgScore)}`}>
                                {investment.esgScore}/100
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Детали
                        </Button>
                        <Button variant="outline" size="sm">
                          Управление
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'esg' && (
        <div className="space-y-6">
          {/* Создание ESG отчета */}
          <Card>
            <CardHeader>
              <CardTitle>Создать ESG отчет</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название отчета</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Период</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1">Q1 2024</SelectItem>
                      <SelectItem value="q2">Q2 2024</SelectItem>
                      <SelectItem value="q3">Q3 2024</SelectItem>
                      <SelectItem value="q4">Q4 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Environmental Score</Label>
                  <Input type="number" placeholder="0-100" />
                </div>
                <div>
                  <Label>Social Score</Label>
                  <Input type="number" placeholder="0-100" />
                </div>
                <div>
                  <Label>Governance Score</Label>
                  <Input type="number" placeholder="0-100" />
                </div>
              </div>
              <div>
                <Label>Ключевые достижения</Label>
                <Textarea placeholder="Опишите основные достижения в области ESG" rows={3} />
              </div>
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Создать отчет
              </Button>
            </CardContent>
          </Card>

          {/* ESG отчеты */}
          <Card>
            <CardHeader>
              <CardTitle>ESG отчеты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {esgReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Leaf className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{report.title}</h3>
                            <Badge className={report.status === 'published' ? 'bg-green-100 text-green-800' :
                                             report.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                             'bg-gray-100 text-gray-800'}>
                              {report.status === 'published' ? 'Опубликован' :
                               report.status === 'draft' ? 'Черновик' : 'Архив'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-500">Общий ESG:</span>
                              <div className={`font-medium ${getESGColor(report.score)}`}>{report.score}/100</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Environmental:</span>
                              <div className="font-medium text-green-600">{report.environmental}/100</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Social:</span>
                              <div className="font-medium text-blue-600">{report.social}/100</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Governance:</span>
                              <div className="font-medium text-purple-600">{report.governance}/100</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            Создан: {report.createdAt.toLocaleDateString()} | 
                            Обновлен: {report.updatedAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Просмотр
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Скачать
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'market' && (
        <div className="space-y-6">
          {/* Рыночная аналитика */}
          <Card>
            <CardHeader>
              <CardTitle>Рыночная аналитика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketData.map((data) => (
                  <div key={data.metric} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{data.metric}</h4>
                      {getTrendIcon(data.trend)}
                    </div>
                    <div className="text-3xl font-bold mb-2">{data.current}{data.unit}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={data.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {data.change >= 0 ? '+' : ''}{data.change}%
                      </span>
                      <span className="text-gray-600">к прошлому периоду</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Тренды и прогнозы */}
          <Card>
            <CardHeader>
              <CardTitle>Тренды и прогнозы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Рост ESG инвестиций</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Ожидается рост ESG инвестиций в водном секторе на 25% в 2024 году
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Позитивный тренд</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Технологические инновации</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Внедрение AI и IoT технологий увеличит эффективность на 30-40%
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600">Технологический прорыв</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Регулятивные изменения</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Новые экологические стандарты создадут дополнительные возможности
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-600">Регулятивные возможности</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          {/* Новые возможности */}
          <Card>
            <CardHeader>
              <CardTitle>Инвестиционные возможности</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">Система умного орошения</h3>
                          <Badge className="bg-green-100 text-green-800">Новая возможность</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          AI-система для оптимизации водопотребления в сельском хозяйстве
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Потенциальный ROI:</span>
                            <div className="font-medium text-green-600">35-45%</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Срок реализации:</span>
                            <div className="font-medium">18-24 мес.</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Риск:</span>
                            <div className="font-medium text-yellow-600">Средний</div>
                          </div>
                          <div>
                            <span className="text-gray-500">ESG потенциал:</span>
                            <div className="font-medium text-green-600">Высокий</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        Детали
                      </Button>
                      <Button size="sm">
                        Инвестировать
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">Восстановление водно-болотных угодий</h3>
                          <Badge className="bg-blue-100 text-blue-800">Экологический проект</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Масштабный проект по восстановлению экосистем в дельте Волги
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Потенциальный ROI:</span>
                            <div className="font-medium text-green-600">25-30%</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Срок реализации:</span>
                            <div className="font-medium">36-48 мес.</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Риск:</span>
                            <div className="font-medium text-green-600">Низкий</div>
                          </div>
                          <div>
                            <span className="text-gray-500">ESG потенциал:</span>
                            <div className="font-medium text-green-600">Очень высокий</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        Детали
                      </Button>
                      <Button size="sm">
                        Инвестировать
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

