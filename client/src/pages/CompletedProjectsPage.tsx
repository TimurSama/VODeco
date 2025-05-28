
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CompletedProjectCard from '@/components/projects/CompletedProjectCard';
import CompletedProjectDetails from '@/components/projects/CompletedProjectDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  CheckCircle, 
  Search, 
  Filter,
  MapPin,
  Calendar,
  Building,
  TrendingUp
} from 'lucide-react';

interface CompletedProject {
  id: number;
  name: string;
  type: string;
  location: string;
  region: string;
  country: string;
  completionDate: string;
  capacity?: number;
  totalInvestment?: number;
  beneficiaries?: number;
  description: string;
  achievements?: string;
  partners?: string;
  technologies?: string;
  impact?: string;
  clientCompany?: string;
  industry?: string;
  equipmentUsed?: string;
  operationalSince?: string;
  maintenancePeriod?: number;
  qualityStandards?: string;
}

type FilterType = 'All' | 'Recent' | 'High Impact' | 'Industrial' | 'Municipal';

const CompletedProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<CompletedProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<CompletedProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<CompletedProject | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [projects, filter, searchTerm, countryFilter, typeFilter]);

  const fetchCompletedProjects = async () => {
    try {
      const response = await fetch('/api/completed-projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching completed projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...projects];

    // Текстовый поиск
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтр по стране
    if (countryFilter !== 'all') {
      filtered = filtered.filter(project => project.country === countryFilter);
    }

    // Фильтр по типу
    if (typeFilter !== 'all') {
      filtered = filtered.filter(project => project.type === typeFilter);
    }

    // Основной фильтр
    switch (filter) {
      case 'Recent':
        filtered = filtered.filter(project => 
          new Date(project.completionDate).getFullYear() >= 2010
        );
        break;
      case 'High Impact':
        filtered = filtered.filter(project => 
          (project.beneficiaries && project.beneficiaries > 100000) ||
          (project.totalInvestment && project.totalInvestment > 5000000)
        );
        break;
      case 'Industrial':
        filtered = filtered.filter(project => project.type === 'industrial');
        break;
      case 'Municipal':
        filtered = filtered.filter(project => 
          project.type === 'municipal' || project.type === 'treatment_plant'
        );
        break;
    }

    setFilteredProjects(filtered);
  };

  const handleProjectDetails = (project: CompletedProject) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const getUniqueCountries = () => {
    return [...new Set(projects.map(p => p.country))];
  };

  const getUniqueTypes = () => {
    return [...new Set(projects.map(p => p.type))];
  };

  const getTotalStats = () => {
    const totalInvestment = projects.reduce((sum, p) => sum + (p.totalInvestment || 0), 0);
    const totalBeneficiaries = projects.reduce((sum, p) => sum + (p.beneficiaries || 0), 0);
    const operationalYears = projects.reduce((sum, p) => {
      const years = p.operationalSince ? new Date().getFullYear() - parseInt(p.operationalSince) : 0;
      return sum + years;
    }, 0);

    return { totalInvestment, totalBeneficiaries, operationalYears };
  };

  const stats = getTotalStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Загрузка завершенных проектов...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Заголовок и статистика */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-space font-bold text-3xl text-white flex items-center">
              <CheckCircle className="h-8 w-8 mr-3 text-accent" />
              Завершенные проекты
            </h1>
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              {projects.length} проектов реализовано
            </Badge>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="glassmorphism border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  ${(stats.totalInvestment / 1000000).toFixed(0)}M
                </div>
                <div className="text-sm text-white/60">Общие инвестиции</div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">
                  {(stats.totalBeneficiaries / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-white/60">Пользователей</div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {projects.length}
                </div>
                <div className="text-sm text-white/60">Проектов</div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  20+
                </div>
                <div className="text-sm text-white/60">Лет опыта</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Фильтры */}
        <Card className="glassmorphism border-primary/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Фильтры и поиск
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Поиск проектов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-primary/30 text-white"
                />
              </div>

              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="bg-background/50 border-primary/30">
                  <SelectValue placeholder="Страна" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все страны</SelectItem>
                  {getUniqueCountries().map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-background/50 border-primary/30">
                  <SelectValue placeholder="Тип проекта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  {getUniqueTypes().map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2 lg:col-span-2">
                {(['All', 'Recent', 'High Impact', 'Industrial', 'Municipal'] as FilterType[]).map(filterType => (
                  <Button
                    key={filterType}
                    variant={filter === filterType ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(filterType)}
                    className={filter === filterType 
                      ? "bg-primary text-white" 
                      : "bg-background/50 border-primary/30 text-white hover:bg-primary/20"
                    }
                  >
                    {filterType}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Сетка проектов */}
        {filteredProjects.length === 0 ? (
          <Card className="glassmorphism border-primary/20">
            <CardContent className="p-8 text-center">
              <p className="text-white/70 text-lg">
                Проекты не найдены. Попробуйте изменить фильтры поиска.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <CompletedProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleProjectDetails}
              />
            ))}
          </div>
        )}

        {/* Детали проекта */}
        <CompletedProjectDetails
          project={selectedProject}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </div>
    </div>
  );
};

export default CompletedProjectsPage;
