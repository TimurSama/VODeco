import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  UsersRound, Users, UserPlus, Globe, Building2, Briefcase, School, 
  Lock, Filter, MessageSquare, Search, Plus, ChevronRight, Pin, Bell,
  ChevronLeft, SlidersHorizontal
} from "lucide-react";
import { Group } from "@/types";

export default function GroupsPage() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 250;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  // Временные фиктивные данные, пока мы решаем проблему с API
  useEffect(() => {
    setLoading(true);
    
    // Используем фиктивные данные для тестирования интерфейса
    const mockGroups: Group[] = [
      {
        id: 1,
        name: 'Глобальная DAO-группа',
        description: 'Официальная группа для всех участников VODeco DAO',
        type: 'official',
        category: 'global',
        imageUrl: undefined,
        creatorId: 1,
        memberCount: 156,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Европейский регион',
        description: 'Региональная группа для обсуждения европейских водных инициатив',
        type: 'official',
        category: 'regional',
        imageUrl: undefined,
        creatorId: 1,
        memberCount: 42,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Азиатский регион',
        description: 'Региональная группа для обсуждения азиатских водных инициатив',
        type: 'official',
        category: 'regional',
        imageUrl: undefined,
        creatorId: 1,
        memberCount: 37,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 4,
        name: 'Научное сообщество',
        description: 'Группа для научных дискуссий о технологиях очистки воды',
        type: 'public',
        category: 'professional',
        imageUrl: undefined,
        creatorId: 2,
        memberCount: 27,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 5,
        name: 'Образовательные курсы',
        description: 'Обучающие материалы по ESG-стандартам и водным ресурсам',
        type: 'public',
        category: 'education',
        imageUrl: undefined,
        creatorId: 2,
        memberCount: 86,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 6,
        name: 'Инвестиционный клуб',
        description: 'Закрытый клуб для инвесторов в водные проекты',
        type: 'private',
        category: 'investment',
        imageUrl: undefined,
        creatorId: 3,
        memberCount: 18,
        isActive: true,
        createdAt: new Date()
      }
    ];
    
    setGroups(mockGroups);
    setFilteredGroups(mockGroups);
    setLoading(false);
    
    // TODO: Раскомментировать и исправить, когда решим проблему с API
    /*
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setGroups(data);
          setFilteredGroups(data);
        } else {
          console.error("Данные в неправильном формате:", data);
          setGroups([]);
          setFilteredGroups([]);
        }
      } catch (error) {
        console.error("Ошибка при загрузке групп:", error);
        setGroups([]);
        setFilteredGroups([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGroups();
    */
  }, []);

  // Фильтрация групп при изменении поисковой строки или активной вкладки
  useEffect(() => {
    const filterGroups = () => {
      let result = [...groups];
      
      // Фильтрация по типу группы (вкладке)
      if (activeTab !== "all") {
        result = result.filter(group => group.type === activeTab);
      }
      
      // Фильтрация по категории если выбран фильтр
      if (selectedFilter) {
        result = result.filter(group => group.category === selectedFilter);
      }
      
      // Фильтрация по поисковому запросу
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          group => 
            group.name.toLowerCase().includes(query) || 
            group.description.toLowerCase().includes(query)
        );
      }
      
      setFilteredGroups(result);
    };
    
    filterGroups();
  }, [groups, searchQuery, activeTab, selectedFilter]);

  // Получение иконки для типа группы
  const getGroupTypeIcon = (type: string) => {
    switch (type) {
      case 'official': return <Users className="h-5 w-5 text-primary" />;
      case 'public': return <Globe className="h-5 w-5 text-secondary" />;
      case 'private': return <Lock className="h-5 w-5 text-accent" />;
      default: return <UsersRound className="h-5 w-5" />;
    }
  };

  // Получение иконки для категории группы
  const getGroupCategoryIcon = (category: string) => {
    switch (category) {
      case 'global': return <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
      case 'regional': return <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
      case 'professional': return <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
      case 'education': return <School className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
      case 'investment': return <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
      default: return <UsersRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
    }
  };

  // Получение названия типа группы
  const getGroupTypeName = (type: string) => {
    switch (type) {
      case 'official': return 'Официальная';
      case 'public': return 'Публичная';
      case 'private': return 'Закрытая';
      default: return type;
    }
  };

  // Получение названия категории группы
  const getGroupCategoryName = (category: string) => {
    switch (category) {
      case 'global': return 'Глобальная';
      case 'regional': return 'Региональная';
      case 'professional': return 'Профессиональная';
      case 'education': return 'Образовательная';
      case 'investment': return 'Инвестиционная';
      default: return category;
    }
  };

  // Получение цвета для типа группы
  const getGroupTypeColor = (type: string) => {
    switch (type) {
      case 'official': return "text-primary bg-primary/10 border-primary/30";
      case 'public': return "text-secondary bg-secondary/10 border-secondary/30";
      case 'private': return "text-accent bg-accent/10 border-accent/30";
      default: return "text-muted-foreground";
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterSelect = (category: string | null) => {
    setSelectedFilter(category);
    setShowFilterDialog(false);
  };

  const renderGroupCard = (group: Group) => (
    <Card key={group.id} className="glassmorphism-dark overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50 w-full">
      <CardHeader className="pb-0 p-2 sm:p-4">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${getGroupTypeColor(group.type)} text-[10px] sm:text-xs px-1 py-0 h-5`}>
            {getGroupTypeName(group.type)}
          </Badge>
          
          <Badge variant="outline" className="text-white/70 bg-white/5 text-[10px] sm:text-xs px-1 py-0 h-5">
            {group.memberCount}
          </Badge>
        </div>
        <CardTitle className="text-sm sm:text-base text-white mt-1 truncate">{group.name}</CardTitle>
        <div className="flex items-center text-[10px] sm:text-xs text-white/60 space-x-1">
          {getGroupCategoryIcon(group.category)}
          <span className="truncate">{getGroupCategoryName(group.category)}</span>
        </div>
      </CardHeader>
      
      <CardContent className="py-1 px-2 sm:px-4">
        <CardDescription className="text-white/70 line-clamp-2 h-8 text-[10px] sm:text-xs">
          {group.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-1 border-t border-white/10 p-2 sm:px-4">
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 h-6 p-0 min-w-0 w-6 sm:w-auto sm:p-2">
          <MessageSquare className="h-3 w-3" />
          <span className="hidden sm:inline sm:ml-1 text-xs">Обсуждения</span>
        </Button>
        <Button variant="outline" size="sm" className="text-white hover:text-primary hover:bg-primary/10 hover:border-primary h-6 text-[10px] sm:text-xs px-2">
          <span className="sm:inline">Открыть</span>
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="w-full px-2 sm:px-4 py-4 sm:py-6 max-w-[100vw] overflow-hidden">
      <div className="flex flex-col space-y-4 sm:space-y-6 w-full overflow-hidden">
        {/* Заголовок страницы */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center">
            <div className="hexagon h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mr-2">
              <UsersRound className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="max-w-[calc(100%-2.5rem)]">
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">Группы</h1>
              <p className="text-[10px] sm:text-xs text-white/60 truncate">Участвуйте в DAO-группах</p>
            </div>
          </div>
          
          <div className="flex space-x-1 sm:space-x-2">
            <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10 h-7 sm:h-9 px-1 sm:px-2 min-w-0">
                  <Filter className="h-3.5 w-3.5 sm:mr-1" />
                  <span className="hidden sm:inline text-xs">{selectedFilter ? getGroupCategoryName(selectedFilter) : "Фильтр"}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-primary/20 text-white max-w-[90vw] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Фильтр по категории</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 mt-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleFilterSelect(null)}
                  >
                    <UsersRound className="h-5 w-5 mr-2" />
                    Все категории
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleFilterSelect('global')}
                  >
                    <Globe className="h-5 w-5 mr-2" />
                    Глобальные
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleFilterSelect('regional')}
                  >
                    <Building2 className="h-5 w-5 mr-2" />
                    Региональные
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleFilterSelect('professional')}
                  >
                    <Briefcase className="h-5 w-5 mr-2" />
                    Профессиональные
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleFilterSelect('education')}
                  >
                    <School className="h-5 w-5 mr-2" />
                    Образовательные
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => handleFilterSelect('investment')}
                  >
                    <Briefcase className="h-5 w-5 mr-2" />
                    Инвестиционные
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button className="bg-primary hover:bg-primary/90 h-7 sm:h-9 px-1 sm:px-2 text-[10px] sm:text-xs" size="sm">
              <Plus className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Создать</span>
            </Button>
          </div>
        </div>
        
        {/* Поисковая строка */}
        <div className="relative">
          <Search className="absolute left-2 top-[0.35rem] h-3.5 w-3.5 sm:left-3 sm:top-3 sm:h-4 sm:w-4 text-white/50" />
          <Input 
            className="pl-7 sm:pl-10 py-1 h-7 sm:h-10 bg-card/40 border-primary/20 text-white placeholder:text-white/40 text-xs sm:text-sm"
            placeholder="Найти группу..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        {/* Вкладки типов групп */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-card/40 border border-primary/20 w-full h-8 sm:h-10 overflow-hidden min-w-0 p-0.5 sm:p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary/20 flex-1 h-6 sm:h-8 text-[10px] sm:text-xs px-0 sm:px-2 min-w-0">
              <UsersRound className="h-3 w-3 mr-0 sm:mr-1" />
              <span className="sm:inline hidden">Все</span>
              <span className="sm:hidden inline text-[10px]">Все</span>
            </TabsTrigger>
            <TabsTrigger value="official" className="data-[state=active]:bg-primary/20 flex-1 h-6 sm:h-8 text-[10px] sm:text-xs px-0 sm:px-2 min-w-0">
              <Users className="h-3 w-3 mr-0 sm:mr-1" />
              <span className="sm:inline hidden">Офиц.</span>
              <span className="sm:hidden inline text-[10px]">Оф</span>
            </TabsTrigger>
            <TabsTrigger value="public" className="data-[state=active]:bg-primary/20 flex-1 h-6 sm:h-8 text-[10px] sm:text-xs px-0 sm:px-2 min-w-0">
              <Globe className="h-3 w-3 mr-0 sm:mr-1" />
              <span className="sm:inline hidden">Публ.</span>
              <span className="sm:hidden inline text-[10px]">Пб</span>
            </TabsTrigger>
            <TabsTrigger value="private" className="data-[state=active]:bg-primary/20 flex-1 h-6 sm:h-8 text-[10px] sm:text-xs px-0 sm:px-2 min-w-0">
              <Lock className="h-3 w-3 mr-0 sm:mr-1" />
              <span className="sm:inline hidden">Закр.</span>
              <span className="sm:hidden inline text-[10px]">Зк</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Содержимое вкладок */}
          <TabsContent value="all" className="mt-6">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="hexagon h-12 w-12 bg-primary/20 animate-pulse"></div>
              </div>
            ) : filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-full">
                {filteredGroups.map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-white/20 rounded-lg bg-card/20">
                <UsersRound className="h-12 w-12 mx-auto text-white/20 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Группы не найдены</h3>
                <p className="text-white/60 text-sm">
                  Попробуйте изменить параметры поиска или создайте новую группу
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="official" className="mt-6">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="hexagon h-12 w-12 bg-primary/20 animate-pulse"></div>
              </div>
            ) : filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-full">
                {filteredGroups.map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-white/20 rounded-lg bg-card/20">
                <div>Нет официальных групп</div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="public" className="mt-6">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="hexagon h-12 w-12 bg-primary/20 animate-pulse"></div>
              </div>
            ) : filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-full">
                {filteredGroups.map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-white/20 rounded-lg bg-card/20">
                <div>Нет публичных групп</div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="private" className="mt-6">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="hexagon h-12 w-12 bg-primary/20 animate-pulse"></div>
              </div>
            ) : filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-full">
                {filteredGroups.map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-white/20 rounded-lg bg-card/20">
                <div>Нет закрытых групп</div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Ваше участие */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-lg font-bold text-white">Ваше участие</h2>
            <Button variant="link" className="text-primary/80 hover:text-primary h-7 text-xs p-0">
              Все группы
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Button>
          </div>
          
          <ScrollArea className="h-[150px] sm:h-[180px] bg-card/20 rounded-lg border border-primary/20 p-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="p-1.5 sm:p-3 bg-card/40 rounded-lg flex items-center justify-between hover:bg-card/60 transition-colors">
                <div className="flex items-center max-w-[70%]">
                  <div className="mr-1.5 sm:mr-3 w-7 h-7 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-primary/20 text-primary">
                    <Globe className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-medium text-white text-xs sm:text-base truncate">Глобальная DAO-группа</h3>
                    <p className="text-[9px] sm:text-xs text-white/60 truncate">Официальная · 156 уч.</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/20 text-[9px] sm:text-xs py-0 px-1 h-4 sm:h-5">
                    Акт.
                  </Badge>
                  <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-400/20 text-[9px] sm:text-xs py-0 px-1 h-4 sm:h-5">
                    <Bell className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5" />
                    3
                  </Badge>
                </div>
              </div>
              
              <div className="p-1.5 sm:p-3 bg-card/40 rounded-lg flex items-center justify-between hover:bg-card/60 transition-colors">
                <div className="flex items-center max-w-[70%]">
                  <div className="mr-1.5 sm:mr-3 w-7 h-7 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-secondary/20 text-secondary">
                    <School className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-medium text-white text-xs sm:text-base truncate">Образовательные курсы</h3>
                    <p className="text-[9px] sm:text-xs text-white/60 truncate">Публичная · 86 уч.</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/20 text-[9px] sm:text-xs py-0 px-1 h-4 sm:h-5">
                    Акт.
                  </Badge>
                  <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-400/20 text-[9px] sm:text-xs py-0 px-1 h-4 sm:h-5">
                    <Pin className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5" />
                    1
                  </Badge>
                </div>
              </div>
              
              <div className="p-1.5 sm:p-3 bg-card/40 rounded-lg flex items-center justify-between hover:bg-card/60 transition-colors">
                <div className="flex items-center max-w-[70%]">
                  <div className="mr-1.5 sm:mr-3 w-7 h-7 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-accent/20 text-accent">
                    <Briefcase className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-medium text-white text-xs sm:text-base truncate">Научное сообщество</h3>
                    <p className="text-[9px] sm:text-xs text-white/60 truncate">Публичная · 27 уч.</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/20 text-[9px] sm:text-xs py-0 px-1 h-4 sm:h-5">
                    Акт.
                  </Badge>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        
        {/* Рекомендуемые группы */}
        <div className="mt-2 pb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-lg font-bold text-white">Рекомендуемые</h2>
            <div className="flex space-x-1 sm:space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 w-6 sm:h-8 sm:w-8 p-0 border-primary/30 hover:bg-primary/10 hover:text-primary"
                onClick={() => scrollCarousel('left')}
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 w-6 sm:h-8 sm:w-8 p-0 border-primary/30 hover:bg-primary/10 hover:text-primary"
                onClick={() => scrollCarousel('right')}
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
          
          <div 
            ref={carouselRef}
            className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            {filteredGroups.length > 0 ? (
              filteredGroups.slice(0, 5).map(group => (
                <Card key={group.id} className="min-w-[210px] max-w-[85vw] sm:min-w-[250px] flex-shrink-0 glassmorphism-dark">
                  <CardHeader className="pb-1 p-2 sm:p-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={`${getGroupTypeColor(group.type)} text-[10px] sm:text-xs px-1 py-0 h-5`}>
                        {getGroupTypeName(group.type)}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm sm:text-base text-white mt-1 truncate">{group.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="py-1 px-2 sm:px-3">
                    <CardDescription className="text-white/70 line-clamp-2 h-8 text-[10px] sm:text-xs">
                      {group.description}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center pt-1 border-t border-white/10 p-2 sm:p-3">
                    <div className="flex items-center space-x-1 text-white/60 text-[10px]">
                      {getGroupCategoryIcon(group.category)}
                      <span className="truncate max-w-[80px]">{getGroupCategoryName(group.category)}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-1 text-[10px] text-primary hover:text-primary hover:bg-primary/10">
                      <span>Открыть</span>
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="min-w-[260px] sm:min-w-[280px] p-4 sm:p-6 border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center text-center">
                <UsersRound className="h-6 w-6 sm:h-8 sm:w-8 text-white/30 mb-2" />
                <p className="text-white/70 text-sm">Нет доступных групп</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}