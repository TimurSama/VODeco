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
  Microscope, 
  FileText, 
  BarChart3, 
  Users, 
  Database,
  TrendingUp,
  Calendar,
  Download,
  Upload,
  Search,
  Filter,
  BookOpen,
  Award,
  Globe,
  Target,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Share2,
  Plus,
  Settings,
  Zap
} from 'lucide-react';

interface Research {
  id: string;
  title: string;
  description: string;
  category: 'water_quality' | 'ecosystem' | 'technology' | 'conservation' | 'monitoring';
  status: 'planning' | 'active' | 'completed' | 'published';
  leadResearcher: string;
  team: string[];
  startDate: Date;
  endDate?: Date;
  budget: number;
  location: string;
  methodology: string;
  findings: string[];
  publications: string[];
  impact: number;
  citations: number;
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  abstract: string;
  keywords: string[];
  citations: number;
  impact: number;
  status: 'draft' | 'submitted' | 'review' | 'published';
  researchId: string;
  createdAt: Date;
  publishedAt?: Date;
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  size: number;
  records: number;
  lastUpdated: Date;
  format: string;
  access: 'public' | 'restricted' | 'private';
  quality: number;
  tags: string[];
  downloads: number;
  citations: number;
}

interface Collaboration {
  id: string;
  title: string;
  description: string;
  partners: string[];
  type: 'research' | 'conference' | 'workshop' | 'publication';
  status: 'proposed' | 'active' | 'completed';
  startDate: Date;
  endDate?: Date;
  budget: number;
  outcomes: string[];
}

export default function ScientificCabinet() {
  const [activeTab, setActiveTab] = useState<'overview' | 'research' | 'publications' | 'data' | 'collaborations'>('overview');
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(null);

  // Моковые данные
  const research: Research[] = [
    {
      id: '1',
      title: 'Анализ микропластика в водных экосистемах',
      description: 'Комплексное исследование распространения и влияния микропластика на водные организмы',
      category: 'water_quality',
      status: 'active',
      leadResearcher: 'Др. Иванова А.С.',
      team: ['Петров В.М.', 'Сидорова Е.К.', 'Козлов Д.А.'],
      startDate: new Date('2023-09-01'),
      endDate: new Date('2025-03-01'),
      budget: 2500000,
      location: 'Байкальский регион',
      methodology: 'Комбинированный подход: полевые исследования + лабораторный анализ',
      findings: [
        'Обнаружено 15 новых видов микропластика',
        'Установлена корреляция с антропогенной активностью',
        'Разработаны методы очистки'
      ],
      publications: ['doi:10.1000/water.2024.001'],
      impact: 85,
      citations: 23
    },
    {
      id: '2',
      title: 'Мониторинг качества воды с помощью IoT',
      description: 'Разработка и внедрение системы непрерывного мониторинга качества воды',
      category: 'technology',
      status: 'completed',
      leadResearcher: 'Др. Смирнов П.В.',
      team: ['Алексеева М.И.', 'Волков С.Н.'],
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-01'),
      budget: 1800000,
      location: 'Московская область',
      methodology: 'Технологическое исследование с полевым тестированием',
      findings: [
        'Создана система мониторинга в реальном времени',
        'Точность измерений повышена на 40%',
        'Снижение затрат на мониторинг на 60%'
      ],
      publications: ['doi:10.1000/tech.2023.045'],
      impact: 92,
      citations: 45
    },
    {
      id: '3',
      title: 'Восстановление водно-болотных угодий',
      description: 'Исследование методов восстановления экосистем водно-болотных угодий',
      category: 'conservation',
      status: 'planning',
      leadResearcher: 'Др. Козлова Е.А.',
      team: ['Морозов А.П.', 'Новикова Т.С.', 'Лебедев И.М.'],
      startDate: new Date('2024-06-01'),
      endDate: new Date('2027-06-01'),
      budget: 3500000,
      location: 'Дельта Волги',
      methodology: 'Экологическое исследование с долгосрочным мониторингом',
      findings: [],
      publications: [],
      impact: 0,
      citations: 0
    }
  ];

  const publications: Publication[] = [
    {
      id: '1',
      title: 'Микропластик в водных экосистемах: новые методы обнаружения',
      authors: ['Иванова А.С.', 'Петров В.М.', 'Сидорова Е.К.'],
      journal: 'Water Research',
      year: 2024,
      doi: '10.1000/water.2024.001',
      abstract: 'Представлены результаты исследования распространения микропластика в водных экосистемах с использованием новых методов анализа.',
      keywords: ['микропластик', 'водные экосистемы', 'загрязнение', 'анализ'],
      citations: 23,
      impact: 85,
      status: 'published',
      researchId: '1',
      createdAt: new Date('2024-01-15'),
      publishedAt: new Date('2024-02-01')
    },
    {
      id: '2',
      title: 'IoT системы мониторинга качества воды: практический опыт',
      authors: ['Смирнов П.В.', 'Алексеева М.И.'],
      journal: 'Environmental Technology',
      year: 2023,
      doi: '10.1000/tech.2023.045',
      abstract: 'Описана разработка и внедрение системы непрерывного мониторинга качества воды с использованием IoT технологий.',
      keywords: ['IoT', 'мониторинг', 'качество воды', 'технологии'],
      citations: 45,
      impact: 92,
      status: 'published',
      researchId: '2',
      createdAt: new Date('2023-11-20'),
      publishedAt: new Date('2023-12-15')
    }
  ];

  const datasets: Dataset[] = [
    {
      id: '1',
      name: 'Данные качества воды Байкала 2020-2024',
      description: 'Комплексные данные мониторинга качества воды озера Байкал за 4 года',
      category: 'water_quality',
      size: 2.5,
      records: 150000,
      lastUpdated: new Date('2024-01-15'),
      format: 'CSV, JSON',
      access: 'public',
      quality: 95,
      tags: ['Байкал', 'качество воды', 'мониторинг', '2020-2024'],
      downloads: 234,
      citations: 67
    },
    {
      id: '2',
      name: 'Микропластик в реках России',
      description: 'Данные о содержании микропластика в крупных реках России',
      category: 'pollution',
      size: 1.8,
      records: 45000,
      lastUpdated: new Date('2024-01-10'),
      format: 'CSV, Excel',
      access: 'restricted',
      quality: 88,
      tags: ['микропластик', 'реки', 'загрязнение'],
      downloads: 156,
      citations: 34
    },
    {
      id: '3',
      name: 'IoT датчики мониторинга',
      description: 'Данные с IoT датчиков мониторинга качества воды',
      category: 'technology',
      size: 5.2,
      records: 300000,
      lastUpdated: new Date('2024-01-20'),
      format: 'JSON, XML',
      access: 'private',
      quality: 92,
      tags: ['IoT', 'датчики', 'мониторинг'],
      downloads: 89,
      citations: 23
    }
  ];

  const collaborations: Collaboration[] = [
    {
      id: '1',
      title: 'Международная конференция по водным ресурсам',
      description: 'Организация международной конференции по проблемам водных ресурсов',
      partners: ['МГУ', 'Стэнфордский университет', 'UNESCO'],
      type: 'conference',
      status: 'active',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-09-01'),
      budget: 500000,
      outcomes: [
        'Проведена конференция с 200+ участниками',
        'Подписаны 5 меморандумов о сотрудничестве',
        'Создана рабочая группа по микропластику'
      ]
    },
    {
      id: '2',
      title: 'Совместное исследование с МГУ',
      description: 'Исследование новых методов очистки воды',
      partners: ['МГУ', 'Институт водных проблем РАН'],
      type: 'research',
      status: 'proposed',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2026-06-01'),
      budget: 3000000,
      outcomes: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'restricted': return 'bg-yellow-100 text-yellow-800';
      case 'private': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 90) return 'text-green-600';
    if (impact >= 80) return 'text-blue-600';
    if (impact >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Заголовок кабинета */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-500 rounded-lg text-white">
          <Microscope className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Научный кабинет</h1>
          <p className="text-gray-600">Исследовательские инструменты, анализ данных и публикации</p>
        </div>
      </div>

      {/* Навигация по вкладкам */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Обзор', icon: BarChart3 },
          { id: 'research', label: 'Исследования', icon: Microscope },
          { id: 'publications', label: 'Публикации', icon: FileText },
          { id: 'data', label: 'Данные', icon: Database },
          { id: 'collaborations', label: 'Коллаборации', icon: Users }
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
          {/* Ключевые метрики */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Активные исследования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{research.filter(r => r.status === 'active').length}</div>
                <p className="text-xs text-gray-600">Проектов</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Публикации</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{publications.length}</div>
                <p className="text-xs text-gray-600">Статей</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Цитирования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {publications.reduce((sum, pub) => sum + pub.citations, 0)}
                </div>
                <p className="text-xs text-gray-600">Всего</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Научный индекс</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(publications.reduce((sum, pub) => sum + pub.impact, 0) / publications.length)}
                </div>
                <p className="text-xs text-gray-600">Средний H-index</p>
              </CardContent>
            </Card>
          </div>

          {/* Активные исследования */}
          <Card>
            <CardHeader>
              <CardTitle>Активные исследования</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {research.filter(r => r.status === 'active').map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Microscope className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{project.title}</h3>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status === 'active' ? 'Активно' :
                               project.status === 'completed' ? 'Завершено' :
                               project.status === 'planning' ? 'Планируется' : 'Опубликовано'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Руководитель:</span>
                              <div className="font-medium">{project.leadResearcher}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Бюджет:</span>
                              <div className="font-medium">${(project.budget / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Команда:</span>
                              <div className="font-medium">{project.team.length} чел.</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Влияние:</span>
                              <div className={`font-medium ${getImpactColor(project.impact)}`}>
                                {project.impact}/100
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

          {/* Последние публикации */}
          <Card>
            <CardHeader>
              <CardTitle>Последние публикации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publications.slice(0, 3).map((pub) => (
                  <div key={pub.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">{pub.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {pub.authors.join(', ')} • {pub.journal} • {pub.year}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span>Цитирования: {pub.citations}</span>
                            <span>Влияние: {pub.impact}/100</span>
                            <span>DOI: {pub.doi}</span>
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
                          PDF
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

      {activeTab === 'research' && (
        <div className="space-y-6">
          {/* Создание нового исследования */}
          <Card>
            <CardHeader>
              <CardTitle>Создать новое исследование</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название исследования</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water_quality">Качество воды</SelectItem>
                      <SelectItem value="ecosystem">Экосистемы</SelectItem>
                      <SelectItem value="technology">Технологии</SelectItem>
                      <SelectItem value="conservation">Сохранение</SelectItem>
                      <SelectItem value="monitoring">Мониторинг</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Руководитель</Label>
                  <Input placeholder="Введите ФИО руководителя" />
                </div>
                <div>
                  <Label>Местоположение</Label>
                  <Input placeholder="Введите местоположение" />
                </div>
                <div>
                  <Label>Бюджет</Label>
                  <Input type="number" placeholder="Введите бюджет" />
                </div>
                <div>
                  <Label>Дата начала</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea placeholder="Подробное описание исследования" rows={3} />
              </div>
              <div>
                <Label>Методология</Label>
                <Textarea placeholder="Опишите методологию исследования" rows={3} />
              </div>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Создать исследование
              </Button>
            </CardContent>
          </Card>

          {/* Все исследования */}
          <Card>
            <CardHeader>
              <CardTitle>Все исследования</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {research.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Microscope className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{project.title}</h3>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status === 'active' ? 'Активно' :
                               project.status === 'completed' ? 'Завершено' :
                               project.status === 'planning' ? 'Планируется' : 'Опубликовано'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Руководитель:</span>
                              <div className="font-medium">{project.leadResearcher}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Бюджет:</span>
                              <div className="font-medium">${(project.budget / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Команда:</span>
                              <div className="font-medium">{project.team.length} чел.</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Влияние:</span>
                              <div className={`font-medium ${getImpactColor(project.impact)}`}>
                                {project.impact}/100
                              </div>
                            </div>
                          </div>
                          {project.findings.length > 0 && (
                            <div className="mt-3">
                              <span className="text-sm font-medium text-gray-700">Ключевые находки:</span>
                              <ul className="text-sm text-gray-600 mt-1">
                                {project.findings.slice(0, 2).map((finding, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {finding}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
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

      {activeTab === 'publications' && (
        <div className="space-y-6">
          {/* Создание публикации */}
          <Card>
            <CardHeader>
              <CardTitle>Создать публикацию</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название статьи</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Журнал</Label>
                  <Input placeholder="Введите название журнала" />
                </div>
                <div>
                  <Label>Авторы</Label>
                  <Input placeholder="Введите авторов через запятую" />
                </div>
                <div>
                  <Label>Год</Label>
                  <Input type="number" placeholder="2024" />
                </div>
                <div>
                  <Label>DOI</Label>
                  <Input placeholder="10.1000/example.2024.001" />
                </div>
                <div>
                  <Label>Статус</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Черновик</SelectItem>
                      <SelectItem value="submitted">Отправлено</SelectItem>
                      <SelectItem value="review">На рецензии</SelectItem>
                      <SelectItem value="published">Опубликовано</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Аннотация</Label>
                <Textarea placeholder="Введите аннотацию статьи" rows={4} />
              </div>
              <div>
                <Label>Ключевые слова</Label>
                <Input placeholder="Введите ключевые слова через запятую" />
              </div>
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Создать публикацию
              </Button>
            </CardContent>
          </Card>

          {/* Все публикации */}
          <Card>
            <CardHeader>
              <CardTitle>Все публикации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div key={pub.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{pub.title}</h3>
                            <Badge className={pub.status === 'published' ? 'bg-green-100 text-green-800' :
                                             pub.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                                             pub.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                             'bg-gray-100 text-gray-800'}>
                              {pub.status === 'published' ? 'Опубликовано' :
                               pub.status === 'review' ? 'На рецензии' :
                               pub.status === 'submitted' ? 'Отправлено' : 'Черновик'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {pub.authors.join(', ')} • {pub.journal} • {pub.year}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">{pub.abstract}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Цитирования:</span>
                              <div className="font-medium">{pub.citations}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Влияние:</span>
                              <div className={`font-medium ${getImpactColor(pub.impact)}`}>
                                {pub.impact}/100
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">DOI:</span>
                              <div className="font-medium text-blue-600">{pub.doi}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Дата:</span>
                              <div className="font-medium">{pub.createdAt.toLocaleDateString()}</div>
                            </div>
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
                          PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-1" />
                          Поделиться
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

      {activeTab === 'data' && (
        <div className="space-y-6">
          {/* Загрузка данных */}
          <Card>
            <CardHeader>
              <CardTitle>Загрузить новый набор данных</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название набора данных</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Категория</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water_quality">Качество воды</SelectItem>
                      <SelectItem value="pollution">Загрязнение</SelectItem>
                      <SelectItem value="technology">Технологии</SelectItem>
                      <SelectItem value="ecosystem">Экосистемы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Уровень доступа</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите доступ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Публичный</SelectItem>
                      <SelectItem value="restricted">Ограниченный</SelectItem>
                      <SelectItem value="private">Приватный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Формат данных</Label>
                  <Input placeholder="CSV, JSON, Excel" />
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea placeholder="Подробное описание набора данных" rows={3} />
              </div>
              <div>
                <Label>Теги</Label>
                <Input placeholder="Введите теги через запятую" />
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Выбрать файл
                </Button>
                <Button className="flex-1">
                  <Database className="w-4 h-4 mr-2" />
                  Загрузить
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Наборы данных */}
          <Card>
            <CardHeader>
              <CardTitle>Наборы данных</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div key={dataset.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Database className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{dataset.name}</h3>
                            <Badge className={getAccessColor(dataset.access)}>
                              {dataset.access === 'public' ? 'Публичный' :
                               dataset.access === 'restricted' ? 'Ограниченный' : 'Приватный'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{dataset.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Размер:</span>
                              <div className="font-medium">{dataset.size} ГБ</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Записей:</span>
                              <div className="font-medium">{dataset.records.toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Качество:</span>
                              <div className="font-medium">{dataset.quality}%</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Загрузки:</span>
                              <div className="font-medium">{dataset.downloads}</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">Теги: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {dataset.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
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

      {activeTab === 'collaborations' && (
        <div className="space-y-6">
          {/* Создание коллаборации */}
          <Card>
            <CardHeader>
              <CardTitle>Создать коллаборацию</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название коллаборации</Label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <Label>Тип</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Исследование</SelectItem>
                      <SelectItem value="conference">Конференция</SelectItem>
                      <SelectItem value="workshop">Воркшоп</SelectItem>
                      <SelectItem value="publication">Публикация</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Партнеры</Label>
                  <Input placeholder="Введите партнеров через запятую" />
                </div>
                <div>
                  <Label>Бюджет</Label>
                  <Input type="number" placeholder="Введите бюджет" />
                </div>
                <div>
                  <Label>Дата начала</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Дата окончания</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea placeholder="Подробное описание коллаборации" rows={3} />
              </div>
              <Button className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Создать коллаборацию
              </Button>
            </CardContent>
          </Card>

          {/* Все коллаборации */}
          <Card>
            <CardHeader>
              <CardTitle>Коллаборации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collaborations.map((collab) => (
                  <div key={collab.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{collab.title}</h3>
                            <Badge className={collab.status === 'active' ? 'bg-green-100 text-green-800' :
                                             collab.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                             'bg-yellow-100 text-yellow-800'}>
                              {collab.status === 'active' ? 'Активно' :
                               collab.status === 'completed' ? 'Завершено' : 'Предложено'}
                            </Badge>
                            <Badge variant="outline">{collab.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{collab.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Партнеры:</span>
                              <div className="font-medium">{collab.partners.length}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Бюджет:</span>
                              <div className="font-medium">${(collab.budget / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Период:</span>
                              <div className="font-medium">
                                {collab.startDate.toLocaleDateString()} - {collab.endDate?.toLocaleDateString() || 'TBD'}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Результаты:</span>
                              <div className="font-medium">{collab.outcomes.length}</div>
                            </div>
                          </div>
                          {collab.outcomes.length > 0 && (
                            <div className="mt-3">
                              <span className="text-sm font-medium text-gray-700">Результаты:</span>
                              <ul className="text-sm text-gray-600 mt-1">
                                {collab.outcomes.slice(0, 2).map((outcome, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
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
    </div>
  );
}

