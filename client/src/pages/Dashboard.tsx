
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
  BarChart3
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
    <section id="dashboard" className="py-8 px-4">
      <div className="container mx-auto">
        {/* Welcome Banner */}
        <WelcomeBanner />
        
        {/* Карусель новостей */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t('dashboard.news.title', 'Последние новости')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Carousel className="w-full">
              <CarouselContent>
                {newsItems.map((news) => (
                  <CarouselItem key={news.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={
                            news.category === 'investment' ? 'default' :
                            news.category === 'ecology' ? 'destructive' :
                            news.category === 'technology' ? 'secondary' :
                            'outline'
                          }>
                            {news.category === 'investment' ? 'Инвестиции' :
                             news.category === 'ecology' ? 'Экология' :
                             news.category === 'technology' ? 'Технологии' :
                             'Управление'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{news.date}</span>
                        </div>
                        <h4 className="font-semibold mb-2 line-clamp-2">{news.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">{news.description}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title={t('dashboard.stats.waterResources', 'Водные ресурсы')} 
            value={resources.length.toString()} 
            change={criticalCount > 0 ? `${criticalCount} критических` : 'Все в норме'} 
            icon="water_drop" 
            color={criticalCount > 0 ? 'destructive' : 'primary'} 
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

        {/* Интерактивный глобус и информационная панель */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Левая колонка - фильтры и список объектов (1/3) */}
          <div className="xl:col-span-1 space-y-4">
            {/* Фильтры и настройки */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t('dashboard.filters.title', 'Фильтры и настройки')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Поиск */}
                <div className="relative">
                  <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск ресурсов..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Фильтр по статусу */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Статус</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value={ResourceStatus.CRITICAL}>Критический</SelectItem>
                      <SelectItem value={ResourceStatus.NEEDS_ATTENTION}>Требует внимания</SelectItem>
                      <SelectItem value={ResourceStatus.STABLE}>Стабильный</SelectItem>
                      <SelectItem value={ResourceStatus.EXCELLENT}>Отличный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Фильтр по категории */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      <SelectItem value={ResourceCategory.INVESTMENT}>Инвестиционные</SelectItem>
                      <SelectItem value={ResourceCategory.PATH}>Путевые</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Статистика по фильтрам */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Найдено ресурсов</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Всего:</span>
                      <span className="font-medium">{filteredResources.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Критических:</span>
                      <span className="font-medium text-red-500">
                        {filteredResources.filter(r => r.status === ResourceStatus.CRITICAL).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Инвестиционных:</span>
                      <span className="font-medium text-blue-500">
                        {filteredResources.filter(r => r.category === ResourceCategory.INVESTMENT).length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Кнопка сброса фильтров */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setFilterCategory('all');
                    setSelectedResource(null);
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>

            {/* Список объектов */}
            <div className="max-h-[600px] overflow-y-auto">
              <ObjectsList 
                resources={resources}
                searchTerm={searchTerm}
                filterStatus={filterStatus}
                filterCategory={filterCategory}
              />
            </div>
          </div>

          {/* Правая часть - глобус и информация (2/3) */}
          <div className="xl:col-span-3 space-y-6">
            {/* Интерактивный глобус */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {t('dashboard.globe.title', 'Интерактивный глобус водных ресурсов')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-20">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p>{t('dashboard.globe.loading', 'Загрузка глобуса...')}</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-red-500 mb-4">{t('dashboard.globe.error', 'Ошибка загрузки данных')}</p>
                    <Button onClick={() => window.location.reload()}>
                      Попробовать снова
                    </Button>
                  </div>
                ) : (
                  <EarthGlobe 
                    resources={filteredResources}
                    onResourceSelect={handleResourceSelect}
                  />
                )}
              </CardContent>
            </Card>

            {/* Информационный блок */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">
                      {selectedResource ? 'Детали ресурса' : 'Общая информация'}
                    </TabsTrigger>
                    <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    {selectedResource ? (
                      /* Информация о выбранном ресурсе */
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold">{selectedResource.name}</h3>
                            <p className="text-muted-foreground">
                              {selectedResource.region}, {selectedResource.country}
                            </p>
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Droplets className="h-8 w-8 text-blue-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Качество воды</p>
                              <p className="font-semibold">{selectedResource.qualityIndex}%</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <BarChart3 className="h-8 w-8 text-green-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Расход</p>
                              <p className="font-semibold">{selectedResource.flowRate} м³/с</p>
                            </div>
                          </div>

                          {selectedResource.category === ResourceCategory.INVESTMENT && (
                            <>
                              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <DollarSign className="h-8 w-8 text-green-500" />
                                <div>
                                  <p className="text-sm text-muted-foreground">IRR</p>
                                  <p className="font-semibold">{selectedResource.irr}%</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Building2 className="h-8 w-8 text-blue-500" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Финансирование</p>
                                  <p className="font-semibold">${selectedResource.totalFunding?.toLocaleString()}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Users className="h-8 w-8 text-purple-500" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Участники</p>
                                  <p className="font-semibold">{selectedResource.participantsCount}</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="pt-4">
                          <h4 className="font-semibold mb-2">Описание</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {selectedResource.description}
                          </p>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button onClick={() => setSelectedResource(null)} variant="outline">
                            Закрыть детали
                          </Button>
                          {selectedResource.category === ResourceCategory.INVESTMENT && (
                            <Button>
                              Инвестировать
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Общая информация */
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Общая статистика водных ресурсов</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <Droplets className="h-10 w-10 text-blue-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Всего объектов</p>
                              <p className="text-2xl font-bold">{resources.length}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <DollarSign className="h-10 w-10 text-green-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Общие инвестиции</p>
                              <p className="text-2xl font-bold">${totalInvestments.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <TrendingUp className="h-10 w-10 text-purple-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Стейкинг</p>
                              <p className="text-2xl font-bold">${totalStaking.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <Users className="h-10 w-10 text-orange-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Участники</p>
                              <p className="text-2xl font-bold">{totalParticipants}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-4">Распределение по статусам</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.values(ResourceStatus).map((status) => {
                              const count = resources.filter(r => r.status === status).length;
                              const percentage = resources.length > 0 ? ((count / resources.length) * 100).toFixed(1) : '0';
                              
                              return (
                                <div key={status} className="text-center p-3 bg-muted/30 rounded-lg">
                                  <p className="font-semibold text-lg">{count}</p>
                                  <p className="text-sm text-muted-foreground">{status}</p>
                                  <p className="text-xs text-muted-foreground">{percentage}%</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-muted-foreground mb-2">
                            Нажмите на объект на глобусе для просмотра подробной информации
                          </p>
                          <FlaskConical className="h-8 w-8 mx-auto text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Аналитика и тренды</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Критические ресурсы</h4>
                            <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
                            <p className="text-sm text-muted-foreground">
                              Требуют немедленного вмешательства
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Инвестиционный потенциал</h4>
                            <p className="text-2xl font-bold text-green-500">
                              {resources.filter(r => r.category === ResourceCategory.INVESTMENT).length}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Доступных проектов
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
