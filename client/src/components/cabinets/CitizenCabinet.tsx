import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GlassPanel from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Droplets, Users, Award, TrendingUp, MapPin, Calendar, CheckCircle, Clock, AlertCircle, Star, Trophy, Target, Activity, Heart, Zap } from 'lucide-react';

interface WaterReport {
  id: string;
  location: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  timestamp: string;
  status: 'pending' | 'verified' | 'rejected';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  reward: number;
}

interface DAOProposal {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'closed' | 'passed' | 'rejected';
  votesFor: number;
  votesAgainst: number;
  endDate: string;
  hasVoted: boolean;
}

export default function CitizenCabinet() {
  const [activeTab, setActiveTab] = useState<'overview' | 'monitoring' | 'achievements' | 'dao' | 'profile'>('overview');

  // Mock data
  const waterReports: WaterReport[] = [
    {
      id: '1',
      location: 'Река Москва, парк Горького',
      quality: 'good',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'verified'
    },
    {
      id: '2',
      location: 'Пруд в Сокольниках',
      quality: 'excellent',
      timestamp: '2024-01-14T15:45:00Z',
      status: 'verified'
    },
    {
      id: '3',
      location: 'Канал им. Москвы',
      quality: 'fair',
      timestamp: '2024-01-13T09:20:00Z',
      status: 'pending'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Первые шаги',
      description: 'Отправьте первый отчет о качестве воды',
      icon: '🌊',
      progress: 1,
      maxProgress: 1,
      isCompleted: true,
      reward: 50
    },
    {
      id: '2',
      name: 'Активный монитор',
      description: 'Отправьте 10 отчетов о качестве воды',
      icon: '📊',
      progress: 3,
      maxProgress: 10,
      isCompleted: false,
      reward: 200
    },
    {
      id: '3',
      name: 'Гражданский активист',
      description: 'Участвуйте в 5 голосованиях DAO',
      icon: '🗳️',
      progress: 2,
      maxProgress: 5,
      isCompleted: false,
      reward: 300
    },
    {
      id: '4',
      name: 'Эксперт качества',
      description: 'Получите 20 подтверждений ваших отчетов',
      icon: '🏆',
      progress: 8,
      maxProgress: 20,
      isCompleted: false,
      reward: 500
    }
  ];

  const daoProposals: DAOProposal[] = [
    {
      id: '1',
      title: 'Установка дополнительных датчиков в парке Горького',
      description: 'Предлагается установить 5 новых датчиков качества воды для улучшения мониторинга',
      category: 'Инфраструктура',
      status: 'active',
      votesFor: 156,
      votesAgainst: 23,
      endDate: '2024-01-25T23:59:59Z',
      hasVoted: false
    },
    {
      id: '2',
      title: 'Программа очистки малых рек Москвы',
      description: 'Комплексная программа по очистке и восстановлению малых рек в черте города',
      category: 'Экология',
      status: 'active',
      votesFor: 89,
      votesAgainst: 12,
      endDate: '2024-01-30T23:59:59Z',
      hasVoted: true
    },
    {
      id: '3',
      title: 'Создание мобильного приложения для мониторинга',
      description: 'Разработка удобного мобильного приложения для быстрого сбора данных о качестве воды',
      category: 'Технологии',
      status: 'closed',
      votesFor: 234,
      votesAgainst: 45,
      endDate: '2024-01-10T23:59:59Z',
      hasVoted: false
    }
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityText = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'Отличное';
      case 'good': return 'Хорошее';
      case 'fair': return 'Удовлетворительное';
      case 'poor': return 'Плохое';
      default: return 'Неизвестно';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabinet Header */}
      <GlassPanel variant="elevated" padding="lg" className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Гражданский кабинет
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Участвуйте в мониторинге качества воды и управлении экосистемой
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,250</div>
              <div className="text-sm text-gray-500">VOD токенов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-gray-500">Достижений</div>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Tab Navigation */}
      <GlassPanel variant="subtle" padding="md" className="mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Обзор', icon: Activity },
            { id: 'monitoring', label: 'Мониторинг', icon: Droplets },
            { id: 'achievements', label: 'Достижения', icon: Award },
            { id: 'dao', label: 'DAO', icon: Users },
            { id: 'profile', label: 'Профиль', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-cyan-700 hover:border-cyan-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </GlassPanel>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Статистика */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span>Отчеты о воде</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">23</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Всего отправлено отчетов
                </p>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5 за неделю
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Достижения</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">4/12</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Получено достижений
                </p>
                <Progress value={33} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>Участие в DAO</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">8</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Голосований за месяц
                </p>
                <div className="mt-2 flex items-center text-sm text-blue-600">
                  <Target className="w-4 h-4 mr-1" />
                  80% активность
                </div>
              </CardContent>
            </Card>

            {/* Последние отчеты */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Последние отчеты о качестве воды</CardTitle>
                <CardDescription>
                  Ваши недавние измерения качества воды
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {waterReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(report.status)}
                          <div>
                            <div className="font-medium">{report.location}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(report.timestamp).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getQualityColor(report.quality)}>
                          {getQualityText(report.quality)}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5" />
                  Новый отчет о качестве воды
                </CardTitle>
                <CardDescription>
                  Добавьте информацию о качестве воды в вашем районе
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Местоположение</Label>
                    <Input id="location" placeholder="Введите адрес или координаты" />
                  </div>
                  <div>
                    <Label htmlFor="quality">Качество воды</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите качество" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Отличное</SelectItem>
                        <SelectItem value="good">Хорошее</SelectItem>
                        <SelectItem value="fair">Удовлетворительное</SelectItem>
                        <SelectItem value="poor">Плохое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Дополнительные заметки</Label>
                  <Textarea id="notes" placeholder="Опишите детали наблюдения..." />
                </div>
                <Button className="w-full">
                  <Droplets className="w-4 h-4 mr-2" />
                  Отправить отчет
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>История отчетов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {waterReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{report.location}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(report.timestamp).toLocaleString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getQualityColor(report.quality)}>
                          {getQualityText(report.quality)}
                        </Badge>
                        {getStatusIcon(report.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  Достижения
                </CardTitle>
                <CardDescription>
                  Зарабатывайте достижения за активное участие
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className={`${achievement.isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium">{achievement.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {achievement.description}
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Прогресс</span>
                                <span>{achievement.progress}/{achievement.maxProgress}</span>
                              </div>
                              <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center text-sm text-yellow-600">
                                <Star className="w-4 h-4 mr-1" />
                                {achievement.reward} токенов
                              </div>
                              {achievement.isCompleted && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Получено
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'dao' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  Активные предложения DAO
                </CardTitle>
                <CardDescription>
                  Участвуйте в принятии решений сообщества
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {daoProposals.map((proposal) => (
                    <Card key={proposal.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium">{proposal.title}</h3>
                              <Badge variant={proposal.status === 'active' ? 'default' : 'secondary'}>
                                {proposal.status === 'active' ? 'Активно' : 'Закрыто'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {proposal.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Категория: {proposal.category}</span>
                              <span>До: {new Date(proposal.endDate).toLocaleDateString('ru-RU')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Голоса за: {proposal.votesFor}</span>
                            <span>Голоса против: {proposal.votesAgainst}</span>
                          </div>
                          <div className="flex space-x-2">
                            <div className="flex-1 bg-green-100 rounded h-2">
                              <div 
                                className="bg-green-500 h-2 rounded" 
                                style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                              />
                            </div>
                            <div className="flex-1 bg-red-100 rounded h-2">
                              <div 
                                className="bg-red-500 h-2 rounded" 
                                style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {proposal.status === 'active' && !proposal.hasVoted && (
                          <div className="mt-4 flex space-x-2">
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Голосовать за
                            </Button>
                            <Button size="sm" variant="destructive" className="flex-1">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              Голосовать против
                            </Button>
                          </div>
                        )}

                        {proposal.hasVoted && (
                          <div className="mt-4">
                            <Badge className="bg-blue-100 text-blue-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Вы уже проголосовали
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  Личная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" defaultValue="Александр Петров" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="alex@example.com" />
                </div>
                <div>
                  <Label htmlFor="location">Город</Label>
                  <Input id="location" defaultValue="Москва" />
                </div>
                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика активности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Дней в системе</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Отчетов отправлено</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span>Голосований в DAO</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Достижений получено</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between">
                  <span>Токенов заработано</span>
                  <span className="font-medium text-green-600">1,250</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

