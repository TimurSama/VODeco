import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { WaterResource, CompletedProject, ResourceStatus, ResourceCategory } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Droplets, 
  Shield, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Filter,
  Search,
  Building,
  Factory,
  Zap
} from 'lucide-react';

interface EnhancedResourceListProps {
  resources: WaterResource[];
  completedProjects: CompletedProject[];
  onResourceSelect: (resource: WaterResource) => void;
  onProjectSelect?: (project: CompletedProject) => void;
  selectedResource?: WaterResource;
}

const EnhancedResourceList: React.FC<EnhancedResourceListProps> = ({
  resources,
  completedProjects,
  onResourceSelect,
  onProjectSelect,
  selectedResource,
}) => {
  const { t } = useTranslation();
  
  // Фильтры
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Фильтрация водных ресурсов
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.country.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || resource.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
      const matchesCountry = countryFilter === 'all' || resource.country === countryFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesCountry;
    });
  }, [resources, searchTerm, statusFilter, categoryFilter, countryFilter]);

  // Фильтрация завершенных проектов
  const filteredProjects = useMemo(() => {
    return completedProjects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.country.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || project.type === typeFilter;
      const matchesCountry = countryFilter === 'all' || project.country === countryFilter;

      return matchesSearch && matchesType && matchesCountry;
    });
  }, [completedProjects, searchTerm, typeFilter, countryFilter]);

  // Получаем уникальные страны
  const uniqueCountries = useMemo(() => {
    const resourceCountries = resources.map(r => r.country);
    const projectCountries = completedProjects.map(p => p.country);
    return Array.from(new Set([...resourceCountries, ...projectCountries])).sort();
  }, [resources, completedProjects]);

  // Получаем уникальные типы проектов
  const uniqueProjectTypes = useMemo(() => {
    return Array.from(new Set(completedProjects.map(p => p.type))).sort();
  }, [completedProjects]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setCountryFilter('all');
    setTypeFilter('all');
  };

  const getStatusColor = (status: ResourceStatus) => {
    switch (status) {
      case ResourceStatus.CRITICAL:
        return 'bg-red-500';
      case ResourceStatus.NEEDS_ATTENTION:
        return 'bg-yellow-500';
      case ResourceStatus.STABLE:
        return 'bg-blue-500';
      case ResourceStatus.EXCELLENT:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case ResourceCategory.INVESTMENT:
        return <DollarSign className="w-4 h-4" />;
      case ResourceCategory.PATH:
        return <MapPin className="w-4 h-4" />;
      default:
        return <Droplets className="w-4 h-4" />;
    }
  };

  const getProjectTypeIcon = (type: string) => {
    if (type.toLowerCase().includes('industrial') || type.toLowerCase().includes('chemical')) {
      return <Factory className="w-4 h-4" />;
    }
    if (type.toLowerCase().includes('municipal') || type.toLowerCase().includes('water supply')) {
      return <Building className="w-4 h-4" />;
    }
    if (type.toLowerCase().includes('smart') || type.toLowerCase().includes('ai')) {
      return <Zap className="w-4 h-4" />;
    }
    return <Droplets className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-4">
      {/* Фильтры */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              {t('globo.filters', 'Фильтры')}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              {t('globo.clearFilters', 'Очистить')}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={t('globo.searchPlaceholder', 'Поиск по названию, региону, стране...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Фильтры в две колонки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('globo.selectCountry', 'Выберите страну')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('globo.allCountries', 'Все страны')}</SelectItem>
                {uniqueCountries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('globo.selectStatus', 'Выберите статус')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('globo.allStatuses', 'Все статусы')}</SelectItem>
                <SelectItem value={ResourceStatus.CRITICAL}>
                  {t('globo.critical', 'Критический')}
                </SelectItem>
                <SelectItem value={ResourceStatus.NEEDS_ATTENTION}>
                  {t('globo.needsAttention', 'Требует внимания')}
                </SelectItem>
                <SelectItem value={ResourceStatus.STABLE}>
                  {t('globo.stable', 'Стабильный')}
                </SelectItem>
                <SelectItem value={ResourceStatus.EXCELLENT}>
                  {t('globo.excellent', 'Отличный')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Вкладки для разных типов объектов */}
      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            {t('globo.waterResources', 'Водные ресурсы')} ({filteredResources.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {t('globo.completedProjects', 'Завершенные')} ({filteredProjects.length})
          </TabsTrigger>
        </TabsList>

        {/* Список водных ресурсов */}
        <TabsContent value="resources">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredResources.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-center text-muted-foreground">
                  {t('globo.noResourcesFound', 'Водные ресурсы не найдены')}
                </CardContent>
              </Card>
            ) : (
              filteredResources.map((resource) => (
                <Card 
                  key={resource.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedResource?.id === resource.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => onResourceSelect(resource)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Заголовок и статус */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          {getCategoryIcon(resource.category || ResourceCategory.PATH)}
                          <h3 className="font-semibold text-sm">{resource.name}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(resource.status)}`} />
                          <Badge variant="outline" className="text-xs">
                            {resource.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Локация */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{resource.region}, {resource.country}</span>
                      </div>

                      {/* Показатели */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Качество:</span>
                          <div className="font-medium">{resource.qualityIndex}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Поток:</span>
                          <div className="font-medium">{resource.flowRate} л/с</div>
                        </div>
                      </div>

                      {/* Инвестиционная информация */}
                      {resource.totalFunding && (
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Бюджет:</span>
                            <div className="font-medium">{formatCurrency(resource.totalFunding)}</div>
                          </div>
                          {resource.irr && (
                            <div>
                              <span className="text-muted-foreground">IRR:</span>
                              <div className="font-medium">{resource.irr}%</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Список завершенных проектов */}
        <TabsContent value="completed">
          {/* Дополнительные фильтры для проектов */}
          <div className="mb-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('globo.selectProjectType', 'Тип проекта')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('globo.allTypes', 'Все типы')}</SelectItem>
                {uniqueProjectTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredProjects.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-center text-muted-foreground">
                  {t('globo.noProjectsFound', 'Завершенные проекты не найдены')}
                </CardContent>
              </Card>
            ) : (
              filteredProjects.map((project) => (
                <Card 
                  key={project.id}
                  className="cursor-pointer transition-all hover:shadow-md"
                  onClick={() => onProjectSelect?.(project)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Заголовок и тип */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          {getProjectTypeIcon(project.type)}
                          <h3 className="font-semibold text-sm">{project.name}</h3>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          <Shield className="w-3 h-3 mr-1" />
                          {t('globo.completed', 'Завершен')}
                        </Badge>
                      </div>

                      {/* Локация и дата */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}, {project.country}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{project.completion_date}</span>
                        </div>
                      </div>

                      {/* Показатели проекта */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        {project.total_investment && (
                          <div>
                            <span className="text-muted-foreground">Инвестиции:</span>
                            <div className="font-medium">{formatCurrency(project.total_investment)}</div>
                          </div>
                        )}
                        {project.beneficiaries && (
                          <div>
                            <span className="text-muted-foreground">Бенефициары:</span>
                            <div className="font-medium">{formatNumber(project.beneficiaries)}</div>
                          </div>
                        )}
                      </div>

                      {/* Тип проекта */}
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {project.type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedResourceList;