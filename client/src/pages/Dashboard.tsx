
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { WaterResource, ResourceStatus, ResourceCategory } from '@/types';
import StatsCard from '@/components/dashboard/StatsCard';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import ObjectsList from '@/components/dashboard/ObjectsList';
import EarthGlobe from '@/components/globo/EarthGlobe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  Settings, 
  Users, 
  DollarSign, 
  Droplets,
  TrendingUp,
  Globe,
  Building2,
  FlaskConical,
  BarChart3,
  MapPin,
  Calendar,
  Target,
  PiggyBank,
  X
} from 'lucide-react';

// Типы для новостей
interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'investment' | 'ecology' | 'technology' | 'governance';
  image?: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [selectedResource, setSelectedResource] = useState<WaterResource | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Загрузка данных водных ресурсов
  const { data: resources = [], isLoading, error } = useQuery({
    queryKey: ['/api/water-resources'],
    queryFn: getQueryFn<WaterResource[]>({ on401: 'throw' }),
  });

  // Мок данные для новостей
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Новый инвестиционный проект в Амазонии',
      description: 'Запущен крупный проект по очистке водных ресурсов с ожидаемой доходностью 12% годовых',
      date: '2024-01-15',
      category: 'investment',
    },
    {
      id: '2',
      title: 'Критическое состояние водоемов в Азии',
      description: 'Обнаружено серьезное загрязнение в 15 водных объектах, требуется немедленное вмешательство',
      date: '2024-01-14',
      category: 'ecology',
    },
    {
      id: '3',
      title: 'Внедрение новых технологий очистки',
      description: 'Разработана инновационная система фильтрации, увеличивающая эффективность на 40%',
      date: '2024-01-13',
      category: 'technology',
    },
    {
      id: '4',
      title: 'Голосование по новым экологическим стандартам',
      description: 'DAO принимает решение о ужесточении требований к промышленным сбросам',
      date: '2024-01-12',
      category: 'governance',
    },
  ];

  // Фильтрация ресурсов
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || resource.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Обработчик выбора ресурса
  const handleResourceSelect = (resource: WaterResource) => {
    setSelectedResource(resource);
  };

  // Вычисление общей статистики
  const totalInvestments = resources
    .filter(r => r.category === ResourceCategory.INVESTMENT)
    .reduce((sum, r) => sum + (r.totalFunding || 0), 0);

  const totalStaking = resources
    .filter(r => r.category === ResourceCategory.INVESTMENT)
    .reduce((sum, r) => sum + (r.availableForDAO || 0), 0);

  const totalParticipants = resources
    .reduce((sum, r) => sum + (r.participantsCount || 0), 0);

  const criticalCount = resources.filter(r => r.status === ResourceStatus.CRITICAL).length;

  return (
    <section id="dashboard" className="py-2 sm:py-4 lg:py-8 px-2 sm:px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Banner */}
        <WelcomeBanner />
        
        {/* Карусель новостей */}
        <Card className="mb-4 sm:mb-6 lg:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              {t('dashboard.news.title', 'Последние новости')}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 sm:-ml-4">
                {newsItems.map((news) => (
                  <CarouselItem key={news.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <Card className="h-full">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={
                            news.category === 'investment' ? 'default' :
                            news.category === 'ecology' ? 'destructive' :
                            news.category === 'technology' ? 'secondary' :
                            'outline'
                          } className="text-xs">
                            {news.category === 'investment' ? 'Инвест.' :
                             news.category === 'ecology' ? 'Экология' :
                             news.category === 'technology' ? 'Техно.' :
                             'Управл.'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{news.date}</span>
                        </div>
                        <h4 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">{news.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{news.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <StatsCard 
            title={t('dashboard.stats.waterResources', 'Водные ресурсы')} 
            value={resources.length.toString()} 
            change={criticalCount > 0 ? `${criticalCount} критических` : 'Все в норме'} 
            icon="water_drop" 
            color={criticalCount > 0 ? 'accent' : 'primary'} 
          />
          
          <StatsCard 
            title={t('dashboard.stats.totalInvestments', 'Общие инвестиции')} 
            value={`$${totalInvestments.toLocaleString()}`} 
            change={t('dashboard.stats.investmentsChange', 'Активные проекты')} 
            icon="trending_up" 
            color="accent" 
          />
          
          <StatsCard 
            title={t('dashboard.stats.totalStaking', 'Стейкинг')} 
            value={`$${totalStaking.toLocaleString()}`} 
            change={t('dashboard.stats.stakingChange', 'Доступно для DAO')} 
            icon="coins" 
            color="primary" 
          />
          
          <StatsCard 
            title={t('dashboard.stats.participants', 'Участники')} 
            value={totalParticipants.toString()} 
            change={t('dashboard.stats.participantsChange', 'Активных участников')} 
            icon="users" 
            color="accent" 
          />
        </div>

        {/* Глобус с боковой панелью справа */}
        <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-transparent">
          {/* Глобус на прозрачном фоне */}
          <div className="absolute inset-0 bg-transparent">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>{t('dashboard.globe.loading', 'Загрузка глобуса...')}</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-red-500 mb-4">{t('dashboard.globe.error', 'Ошибка загрузки данных')}</p>
                  <Button onClick={() => window.location.reload()}>
                    Попробовать снова
                  </Button>
                </div>
              </div>
            ) : (
              <EarthGlobe 
                resources={filteredResources}
                onResourceSelect={handleResourceSelect}
              />
            )}
          </div>

          {/* Адаптивная боковая панель */}
          <div className="absolute top-2 right-2 w-32 sm:w-40 lg:w-48 space-y-2 z-20">
            {/* Тонкая вертикальная панель фильтров */}
            <Card className="bg-background/80 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1">
                  <Settings className="h-3 w-3" />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {/* Поиск */}
                <div className="relative">
                  <Search className="absolute top-1.5 left-2 h-3 w-3 text-muted-foreground" />
                  <Input
                    placeholder="Поиск..."
                    className="pl-6 h-7 text-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Фильтры вертикально */}
                <div className="space-y-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value={ResourceStatus.CRITICAL}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Критич.
                        </div>
                      </SelectItem>
                      <SelectItem value={ResourceStatus.NEEDS_ATTENTION}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          Внимание
                        </div>
                      </SelectItem>
                      <SelectItem value={ResourceStatus.STABLE}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Стабильн.
                        </div>
                      </SelectItem>
                      <SelectItem value={ResourceStatus.EXCELLENT}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Отличн.
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value={ResourceCategory.INVESTMENT}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          Инвест.
                        </div>
                      </SelectItem>
                      <SelectItem value={ResourceCategory.PATH}>Путевые</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Компактная статистика */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Всего:</span>
                    <span className="font-medium">{filteredResources.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-500">Критич.:</span>
                    <span className="font-medium text-red-500">
                      {filteredResources.filter(r => r.status === ResourceStatus.CRITICAL).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-500">Инвест.:</span>
                    <span className="font-medium text-cyan-500">
                      {filteredResources.filter(r => r.category === ResourceCategory.INVESTMENT).length}
                    </span>
                  </div>
                </div>

                {/* Кнопка сброса */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full h-6 text-xs"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setFilterCategory('all');
                    setSelectedResource(null);
                  }}
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Сброс
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Нижняя панель - информация об объектах */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">
                  {selectedResource ? 'Объектная информация' : 'Общая информация'}
                </TabsTrigger>
                <TabsTrigger value="list">Перечень объектов</TabsTrigger>
              </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    {selectedResource ? (
                      /* Краткая информация о выбранном ресурсе */
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">{selectedResource.name}</h3>
                            <p className="text-muted-foreground text-sm">
                              {selectedResource.region}, {selectedResource.country}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              variant={
                                selectedResource.status === ResourceStatus.CRITICAL ? 'destructive' :
                                selectedResource.status === ResourceStatus.NEEDS_ATTENTION ? 'outline' :
                                selectedResource.status === ResourceStatus.STABLE ? 'secondary' :
                                'default'
                              }
                              className={
                                selectedResource.status === ResourceStatus.NEEDS_ATTENTION ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                selectedResource.status === ResourceStatus.STABLE ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                ''
                              }
                            >
                              {selectedResource.status}
                            </Badge>
                            <Button 
                              size="sm"
                              onClick={() => setShowDetailModal(true)}
                            >
                              Детали
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                            <Droplets className="h-6 w-6 text-blue-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">Качество</p>
                              <p className="font-semibold text-sm">{selectedResource.qualityIndex}%</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                            <BarChart3 className="h-6 w-6 text-green-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">Расход</p>
                              <p className="font-semibold text-sm">{selectedResource.flowRate} м³/с</p>
                            </div>
                          </div>

                          {selectedResource.category === ResourceCategory.INVESTMENT && (
                            <>
                              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                                <DollarSign className="h-6 w-6 text-green-500" />
                                <div>
                                  <p className="text-xs text-muted-foreground">IRR</p>
                                  <p className="font-semibold text-sm">{selectedResource.irr}%</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                                <Users className="h-6 w-6 text-purple-500" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Участники</p>
                                  <p className="font-semibold text-sm">{selectedResource.participantsCount}</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button onClick={() => setSelectedResource(null)} variant="outline" size="sm">
                            Закрыть
                          </Button>
                          {selectedResource.category === ResourceCategory.INVESTMENT && (
                            <>
                              <Button size="sm">
                                Инвестировать
                              </Button>
                              <Button variant="secondary" size="sm">
                                Стейкинг
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Интерактивная панель с кнопками */
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">Объектная информация</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <button 
                            className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer border border-transparent hover:border-blue-500/20"
                            onClick={() => {
                              // Показать все объекты
                              setFilterStatus('all');
                              setFilterCategory('all');
                            }}
                          >
                            <Droplets className="h-10 w-10 text-blue-500" />
                            <div className="text-left">
                              <p className="text-sm text-muted-foreground">Всего объектов</p>
                              <p className="text-2xl font-bold">{resources.length}</p>
                            </div>
                          </button>

                          <button 
                            className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer border border-transparent hover:border-red-500/20"
                            onClick={() => {
                              setFilterStatus(ResourceStatus.CRITICAL);
                              setFilterCategory('all');
                            }}
                          >
                            <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
                            <div className="text-left">
                              <p className="text-sm text-muted-foreground">Критические</p>
                              <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
                            </div>
                          </button>

                          <button 
                            className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-cyan-500/10 transition-colors cursor-pointer border border-transparent hover:border-cyan-500/20"
                            onClick={() => {
                              setFilterStatus('all');
                              setFilterCategory(ResourceCategory.INVESTMENT);
                            }}
                          >
                            <DollarSign className="h-10 w-10 text-cyan-500" />
                            <div className="text-left">
                              <p className="text-sm text-muted-foreground">Инвестиционные</p>
                              <p className="text-2xl font-bold text-cyan-500">
                                {resources.filter(r => r.category === ResourceCategory.INVESTMENT).length}
                              </p>
                            </div>
                          </button>

                          <button 
                            className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-purple-500/10 transition-colors cursor-pointer border border-transparent hover:border-purple-500/20"
                            onClick={() => {
                              // Показать стейкинг статистику
                              setFilterCategory(ResourceCategory.INVESTMENT);
                            }}
                          >
                            <TrendingUp className="h-10 w-10 text-purple-500" />
                            <div className="text-left">
                              <p className="text-sm text-muted-foreground">Стейкинг</p>
                              <p className="text-2xl font-bold text-purple-500">${totalStaking.toLocaleString()}</p>
                            </div>
                          </button>
                        </div>

                        <div className="text-center py-8">
                          <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-2">
                            Нажмите на кнопки выше для фильтрации объектов
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Или выберите объект на глобусе для просмотра подробной информации
                          </p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="list" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Перечень водных ресурсов</h3>
                      
                      {/* Быстрая статистика */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="font-semibold text-lg">{resources.length}</p>
                          <p className="text-sm text-muted-foreground">Всего объектов</p>
                        </div>
                        <div className="text-center p-3 bg-red-500/10 rounded-lg">
                          <p className="font-semibold text-lg text-red-500">{criticalCount}</p>
                          <p className="text-sm text-muted-foreground">Критических</p>
                        </div>
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                          <p className="font-semibold text-lg text-blue-500">
                            {resources.filter(r => r.category === ResourceCategory.INVESTMENT).length}
                          </p>
                          <p className="text-sm text-muted-foreground">Инвестиционных</p>
                        </div>
                        <div className="text-center p-3 bg-green-500/10 rounded-lg">
                          <p className="font-semibold text-lg text-green-500">
                            ${totalInvestments.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Общие инвестиции</p>
                        </div>
                      </div>

                      {/* Список объектов в табличном виде */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Название</th>
                              <th className="text-left p-2">Регион</th>
                              <th className="text-left p-2">Статус</th>
                              <th className="text-left p-2">Категория</th>
                              <th className="text-left p-2">Качество</th>
                              <th className="text-left p-2">Действия</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredResources.map((resource) => (
                              <tr key={resource.id} className="border-b hover:bg-muted/20 cursor-pointer" 
                                  onClick={() => handleResourceSelect(resource)}>
                                <td className="p-2 font-medium">{resource.name}</td>
                                <td className="p-2">{resource.region}, {resource.country}</td>
                                <td className="p-2">
                                  <Badge 
                                    variant={
                                      resource.status === ResourceStatus.CRITICAL ? 'destructive' :
                                      resource.status === ResourceStatus.NEEDS_ATTENTION ? 'outline' :
                                      'secondary'
                                    }
                                    className={
                                      resource.status === ResourceStatus.NEEDS_ATTENTION ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                      resource.status === ResourceStatus.STABLE ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                      ''
                                    }
                                  >
                                    {resource.status}
                                  </Badge>
                                </td>
                                <td className="p-2">
                                  {resource.category === ResourceCategory.INVESTMENT && (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                      Инвест.
                                    </Badge>
                                  )}
                                </td>
                                <td className="p-2">{resource.qualityIndex}%</td>
                                <td className="p-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleResourceSelect(resource);
                                    }}
                                  >
                                    Выбрать
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
          </CardContent>
        </Card>

        {/* Модальное окно с детальной информацией */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedResource && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedResource.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {selectedResource.region}, {selectedResource.country}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        selectedResource.status === ResourceStatus.CRITICAL ? 'destructive' :
                        selectedResource.status === ResourceStatus.NEEDS_ATTENTION ? 'outline' :
                        selectedResource.status === ResourceStatus.STABLE ? 'secondary' :
                        'default'
                      }
                      className={
                        selectedResource.status === ResourceStatus.NEEDS_ATTENTION ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        selectedResource.status === ResourceStatus.STABLE ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        ''
                      }
                    >
                      {selectedResource.status}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  {/* Основные показатели */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Droplets className="h-10 w-10 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Качество воды</p>
                        <p className="text-xl font-bold">{selectedResource.qualityIndex}%</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <BarChart3 className="h-10 w-10 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Расход воды</p>
                        <p className="text-xl font-bold">{selectedResource.flowRate} м³/с</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Calendar className="h-10 w-10 text-purple-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Последнее обновление</p>
                        <p className="text-xl font-bold">
                          {new Date().toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Инвестиционная информация */}
                  {selectedResource.category === ResourceCategory.INVESTMENT && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Инвестиционная информация
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg">
                          <DollarSign className="h-8 w-8 text-green-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">IRR</p>
                            <p className="text-2xl font-bold text-green-500">{selectedResource.irr}%</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-lg">
                          <Building2 className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Общее финансирование</p>
                            <p className="text-2xl font-bold">${selectedResource.totalFunding?.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-lg">
                          <Users className="h-8 w-8 text-purple-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Участники</p>
                            <p className="text-2xl font-bold">{selectedResource.participantsCount}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-orange-500/10 rounded-lg">
                          <Target className="h-8 w-8 text-orange-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Доступно DAO</p>
                            <p className="text-2xl font-bold">${selectedResource.availableForDAO?.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Прогресс финансирования */}
                      {selectedResource.fundingProgress && selectedResource.totalFunding && (
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Прогресс финансирования</span>
                            <span className="font-bold">
                              ${selectedResource.fundingProgress.toLocaleString()} / ${selectedResource.totalFunding.toLocaleString()}
                            </span>
                          </div>
                          <Progress 
                            value={Math.min((selectedResource.fundingProgress / selectedResource.totalFunding) * 100, 100)}
                            className="h-3"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.round((selectedResource.fundingProgress / selectedResource.totalFunding) * 100)}% завершено
                          </p>
                        </div>
                      )}

                      {/* Информация о стейкинге */}
                      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <PiggyBank className="h-4 w-4" />
                          Стейкинг токенов
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Минимальная сумма</p>
                            <p className="font-semibold">$1,000</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Годовая доходность</p>
                            <p className="font-semibold text-green-500">8-12%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Период блокировки</p>
                            <p className="font-semibold">30-90 дней</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Описание */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-3">Подробное описание</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedResource.description}
                    </p>
                  </div>

                  {/* Координаты */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-3">Геопозиция</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Широта</p>
                        <p className="font-semibold">{selectedResource.latitude}°</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Долгота</p>
                        <p className="font-semibold">{selectedResource.longitude}°</p>
                      </div>
                    </div>
                  </div>

                  {/* Кнопки действий */}
                  <div className="flex gap-3 pt-6 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDetailModal(false)}
                    >
                      Закрыть
                    </Button>
                    
                    {selectedResource.category === ResourceCategory.INVESTMENT && (
                      <>
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Инвестировать
                        </Button>
                        
                        <Button 
                          variant="secondary"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <PiggyBank className="h-4 w-4 mr-2" />
                          Стейкинг
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Dashboard;
