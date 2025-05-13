import { useState, useEffect } from "react";
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
  Lock, Filter, MessageSquare, Search, Plus, ChevronRight, Pin, Bell
} from "lucide-react";
import { Group } from "@/types";
import { apiRequest } from "@/lib/queryClient";

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  // Получение групп с сервера
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const data = await apiRequest<Group[]>('GET', '/api/groups');
        setGroups(data);
        setFilteredGroups(data);
      } catch (error) {
        console.error("Ошибка при загрузке групп:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
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
      case 'global': return <Globe className="h-5 w-5" />;
      case 'regional': return <Building2 className="h-5 w-5" />;
      case 'professional': return <Briefcase className="h-5 w-5" />;
      case 'education': return <School className="h-5 w-5" />;
      case 'investment': return <Briefcase className="h-5 w-5" />;
      default: return <UsersRound className="h-5 w-5" />;
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
    <Card key={group.id} className="glassmorphism-dark overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${getGroupTypeColor(group.type)}`}>
            {getGroupTypeName(group.type)}
          </Badge>
          
          <Badge variant="outline" className="text-white/70 bg-white/5">
            {group.memberCount} участников
          </Badge>
        </div>
        <CardTitle className="text-lg text-white mt-2">{group.name}</CardTitle>
        <div className="flex items-center text-sm text-white/60 space-x-2">
          {getGroupCategoryIcon(group.category)}
          <span>{getGroupCategoryName(group.category)}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="text-white/70 line-clamp-2 h-10">
          {group.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t border-white/10">
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
          <MessageSquare className="h-4 w-4 mr-1" />
          Обсуждения
        </Button>
        <Button variant="outline" size="sm" className="text-white hover:text-primary hover:bg-primary/10 hover:border-primary">
          Открыть
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        {/* Заголовок страницы */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="hexagon h-12 w-12 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mr-4">
              <UsersRound className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Группы</h1>
              <p className="text-white/60">Участвуйте в официальных и пользовательских DAO-группах</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedFilter ? getGroupCategoryName(selectedFilter) : "Фильтр"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-primary/20 text-white">
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
            
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Создать группу
            </Button>
          </div>
        </div>
        
        {/* Поисковая строка */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
          <Input 
            className="pl-10 bg-card/40 border-primary/20 text-white placeholder:text-white/40"
            placeholder="Найти группу по названию или описанию..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        {/* Вкладки типов групп */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-card/40 border border-primary/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary/20">
              <UsersRound className="h-4 w-4 mr-2" />
              Все группы
            </TabsTrigger>
            <TabsTrigger value="official" className="data-[state=active]:bg-primary/20">
              <Users className="h-4 w-4 mr-2" />
              Официальные
            </TabsTrigger>
            <TabsTrigger value="public" className="data-[state=active]:bg-primary/20">
              <Globe className="h-4 w-4 mr-2" />
              Публичные
            </TabsTrigger>
            <TabsTrigger value="private" className="data-[state=active]:bg-primary/20">
              <Lock className="h-4 w-4 mr-2" />
              Закрытые
            </TabsTrigger>
          </TabsList>
          
          {/* Содержимое вкладок */}
          <TabsContent value="all" className="mt-6">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="hexagon h-12 w-12 bg-primary/20 animate-pulse"></div>
              </div>
            ) : filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-white/20 rounded-lg bg-card/20">
                <UsersRound className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">Группы не найдены</h3>
                <p className="text-white/60 mt-2">
                  {searchQuery 
                    ? "Попробуйте изменить параметры поиска" 
                    : "В этой категории пока нет групп"}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-white/20 rounded-lg bg-card/20">
                <Users className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">Официальные группы не найдены</h3>
                <p className="text-white/60 mt-2">
                  {searchQuery 
                    ? "Попробуйте изменить параметры поиска" 
                    : "В этой категории пока нет групп"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="public" className="mt-6">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="hexagon h-12 w-12 bg-primary/20 animate-pulse"></div>
              </div>
            ) : filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-white/20 rounded-lg bg-card/20">
                <Globe className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">Публичные группы не найдены</h3>
                <p className="text-white/60 mt-2">
                  {searchQuery 
                    ? "Попробуйте изменить параметры поиска" 
                    : "В этой категории пока нет групп"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="private" className="mt-6">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="hexagon h-12 w-12 bg-primary/20 animate-pulse"></div>
              </div>
            ) : filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-white/20 rounded-lg bg-card/20">
                <Lock className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">Закрытые группы не найдены</h3>
                <p className="text-white/60 mt-2">
                  {searchQuery 
                    ? "Попробуйте изменить параметры поиска" 
                    : "У вас нет доступа к закрытым группам или они отсутствуют"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Присоединенные группы */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Ваше участие</h2>
            <Button variant="link" className="text-primary hover:text-primary/80">
              Все мои группы
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <ScrollArea className="h-[180px] bg-card/20 rounded-lg border border-primary/20 p-4">
            <div className="space-y-3">
              <div className="p-3 bg-card/40 rounded-lg flex items-center justify-between hover:bg-card/60 transition-colors">
                <div className="flex items-center">
                  <div className="mr-3 w-10 h-10 rounded-lg flex items-center justify-center bg-primary/20 text-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Глобальная DAO-группа</h3>
                    <p className="text-xs text-white/60">Официальная группа · 156 участников</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/20">
                    Активная
                  </Badge>
                  <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-400/20">
                    <Bell className="h-3 w-3 mr-1" />
                    3
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 bg-card/40 rounded-lg flex items-center justify-between hover:bg-card/60 transition-colors">
                <div className="flex items-center">
                  <div className="mr-3 w-10 h-10 rounded-lg flex items-center justify-center bg-secondary/20 text-secondary">
                    <School className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Образовательные курсы</h3>
                    <p className="text-xs text-white/60">Публичная группа · 86 участников</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/20">
                    Активная
                  </Badge>
                  <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-400/20">
                    <Pin className="h-3 w-3 mr-1" />
                    1
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 bg-card/40 rounded-lg flex items-center justify-between hover:bg-card/60 transition-colors">
                <div className="flex items-center">
                  <div className="mr-3 w-10 h-10 rounded-lg flex items-center justify-center bg-accent/20 text-accent">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Научное сообщество</h3>
                    <p className="text-xs text-white/60">Публичная группа · 27 участников</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/20">
                    Активная
                  </Badge>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        
        {/* Рекомендуемые группы */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Рекомендуемые</h2>
          </div>
          
          <ScrollArea className="h-[220px]">
            <div className="flex space-x-6 pb-4">
              {filteredGroups.slice(0, 5).map(group => (
                <Card key={group.id} className="min-w-[280px] glassmorphism-dark">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={`${getGroupTypeColor(group.type)}`}>
                        {getGroupTypeName(group.type)}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white mt-2">{group.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-white/70 line-clamp-2 h-10">
                      {group.description}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center">
                    <Badge variant="outline" className="text-white/70 bg-white/5">
                      {group.memberCount} участников
                    </Badge>
                    <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Присоединиться
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}