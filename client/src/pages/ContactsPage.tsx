import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from "@/components/ui/card";
import { 
  Users, User, UserPlus, Search, Filter, Mail, MessageSquare, 
  Phone, MapPin, Award, Clock, Briefcase, FileText, 
  MoreHorizontal, Star, StarOff, UserCheck, Plus, ChevronDown, Tags,
  Globe, Database, Shield, Eye, Heart, Wallet, Coins, Medal, Share,
  BadgeCheck, Building, PenSquare, HandHelping
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Типы контактов
type ContactRole = 
  | 'scientist' 
  | 'investor' 
  | 'operator' 
  | 'government' 
  | 'community'
  | 'expert';

type ContactStatus = 'online' | 'offline' | 'away' | 'busy';

// Интерфейс контакта
interface Contact {
  id: string;
  daoId?: string; // DAO ID для проверки подлинности
  did?: string; // Decentralized Identifier
  name: string;
  role: ContactRole;
  organization?: string;
  avatar?: string;
  email: string;
  phone?: string;
  location?: string;
  language?: string[];
  expertise?: string[];
  bio?: string;
  status: ContactStatus;
  lastActive?: Date;
  commonProjects?: string[];
  tags?: string[];
  notes?: string;
  isFavorite: boolean;
  isVerified?: boolean;
  connectionLevel: number; // 1-3, где 1 - прямая связь, 2 - через одного, 3 - через двух
  daoMetrics?: {
    trustScore: number; // Коэффициент доверия в DAO (0-100)
    engagementRate: number; // Коэффициент вовлеченности (0-100)
    reputationScore: number; // Репутация (0-100)
    votingWeight?: number; // Вес при голосовании
  };
  wallet?: {
    address: string;
    tokens?: number;
    nftAchievements?: string[];
  };
  connectionType: 'friend' | 'business' | 'group' | 'requested' | 'pending';
  profileVisibility: 'public' | 'private' | 'dao-only';
}

// Интерфейс группы
interface ContactGroup {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  membersCount: number;
  category: string;
  tags?: string[];
}

// Демо-данные: Контакты
const mockContacts: Contact[] = [
  {
    id: '1',
    daoId: 'DAO-SCIENTIST-0057',
    did: 'did:vod:1a2b3c4d5e6f7g8h9i0j',
    name: 'Алексей Водный',
    role: 'scientist',
    organization: 'Институт водных ресурсов',
    avatar: '/assets/user1.png',
    email: 'alexey@institute-water.org',
    phone: '+7 (900) 123-45-67',
    location: 'Иркутск, Россия',
    language: ['Русский', 'Английский'],
    expertise: ['Гидрология', 'Экологическая оценка', 'Мониторинг воды'],
    bio: 'Доктор наук в области гидрологии с 15-летним опытом исследований Байкальского региона',
    status: 'online',
    lastActive: new Date(),
    commonProjects: ['Мониторинг Байкала', 'Очистка речной системы Ангары'],
    tags: ['ученый', 'эколог', 'байкал'],
    isFavorite: true,
    isVerified: true,
    connectionLevel: 1,
    daoMetrics: {
      trustScore: 89,
      engagementRate: 92,
      reputationScore: 87,
      votingWeight: 2.4
    },
    wallet: {
      address: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      tokens: 320,
      nftAchievements: ['Экспедиция Байкал 2024', 'Лауреат научной премии DAO']
    },
    connectionType: 'friend',
    profileVisibility: 'public'
  },
  {
    id: '2',
    daoId: 'DAO-INVESTOR-0128',
    did: 'did:vod:2b3c4d5e6f7g8h9i0j1k',
    name: 'Елена Михайлова',
    role: 'investor',
    organization: 'Эко-Инвест',
    avatar: '/assets/user2.png',
    email: 'elena@eco-invest.com',
    phone: '+7 (911) 987-65-43',
    location: 'Москва, Россия',
    language: ['Русский', 'Английский', 'Немецкий'],
    expertise: ['Зеленые инвестиции', 'Устойчивое развитие'],
    bio: 'Венчурный инвестор со специализацией на экологических проектах',
    status: 'online',
    lastActive: new Date(Date.now() - 1000 * 60 * 15),
    commonProjects: ['Устойчивое водопользование в регионе'],
    tags: ['инвестор', 'финансы', 'эко-фонд'],
    isFavorite: false,
    isVerified: true,
    connectionLevel: 1,
    daoMetrics: {
      trustScore: 94,
      engagementRate: 78,
      reputationScore: 91,
      votingWeight: 3.8
    },
    wallet: {
      address: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u',
      tokens: 1250,
      nftAchievements: ['Топ-инвестор 2024', 'Основатель проекта']
    },
    connectionType: 'business',
    profileVisibility: 'dao-only'
  },
  {
    id: '3',
    daoId: 'DAO-OPERATOR-0035',
    name: 'Иван Соколов',
    role: 'operator',
    organization: 'Водоканал',
    avatar: '/assets/user3.png',
    email: 'ivan@vodokanal.ru',
    phone: '+7 (922) 456-78-90',
    location: 'Новосибирск, Россия',
    language: ['Русский'],
    expertise: ['Очистка воды', 'Инфраструктура', 'Управление ресурсами'],
    bio: 'Руководитель проектов по модернизации систем водоочистки',
    status: 'offline',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3),
    commonProjects: ['Модернизация очистки стоков'],
    tags: ['оператор', 'инженер', 'инфраструктура'],
    isFavorite: false,
    connectionLevel: 2,
    daoMetrics: {
      trustScore: 81,
      engagementRate: 85,
      reputationScore: 79
    },
    wallet: {
      address: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v',
      tokens: 95
    },
    connectionType: 'group',
    profileVisibility: 'public'
  },
  {
    id: '4',
    did: 'did:vod:4e5f6g7h8i9j0k1l2m3n',
    name: 'Ольга Речная',
    role: 'government',
    organization: 'Министерство природных ресурсов',
    avatar: '/assets/user4.png',
    email: 'olga@minprirody.gov.ru',
    phone: '+7 (933) 321-54-76',
    location: 'Красноярск, Россия',
    language: ['Русский', 'Английский'],
    expertise: ['Эко-законодательство', 'Природоохрана', 'Государственные программы'],
    bio: 'Советник министра по вопросам охраны водных экосистем',
    status: 'away',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 12),
    tags: ['гос.служащий', 'регулирование', 'политика'],
    isFavorite: true,
    connectionLevel: 2,
    daoMetrics: {
      trustScore: 87,
      engagementRate: 65,
      reputationScore: 90,
      votingWeight: 2.1
    },
    connectionType: 'business',
    profileVisibility: 'dao-only'
  },
  {
    id: '5',
    daoId: 'DAO-EXPERT-0083',
    did: 'did:vod:5f6g7h8i9j0k1l2m3n4o',
    name: 'Николай Екатеринов',
    role: 'expert',
    organization: 'Siberian Water Consulting',
    avatar: '/assets/user5.png',
    email: 'nikolay@swc.ru',
    phone: '+7 (944) 789-01-23',
    location: 'Екатеринбург, Россия',
    language: ['Русский', 'Английский', 'Китайский'],
    expertise: ['Международные стандарты', 'Аудит водных систем', 'Устойчивое развитие'],
    bio: 'Ведущий консультант по вопросам водосбережения и эффективного использования водных ресурсов',
    status: 'busy',
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
    commonProjects: ['Стандартизация мониторинга', 'Образовательные программы'],
    tags: ['консультант', 'аудитор', 'международник'],
    isFavorite: false,
    isVerified: true,
    connectionLevel: 1,
    daoMetrics: {
      trustScore: 92,
      engagementRate: 88,
      reputationScore: 95,
      votingWeight: 1.9
    },
    wallet: {
      address: '0x5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x',
      tokens: 215,
      nftAchievements: ['Эксперт года', 'Международный сертификат ISO']
    },
    connectionType: 'friend',
    profileVisibility: 'public'
  },
  {
    id: '6',
    daoId: 'DAO-COMMUNITY-0042',
    name: 'Анна Озерова',
    role: 'community',
    organization: 'Eco-Community "Чистая вода"',
    avatar: '/assets/user6.png',
    email: 'anna@clean-water.org',
    phone: '+7 (955) 234-56-78',
    location: 'Байкальск, Россия',
    language: ['Русский'],
    expertise: ['Общественные инициативы', 'Эко-просвещение', 'Волонтерство'],
    bio: 'Основатель движения за сохранение Байкала, организатор общественных акций по очистке водоемов',
    status: 'offline',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ['активист', 'общественник', 'эко-движение'],
    isFavorite: false,
    connectionLevel: 3,
    daoMetrics: {
      trustScore: 76,
      engagementRate: 96,
      reputationScore: 82
    },
    connectionType: 'requested',
    profileVisibility: 'public'
  },
  {
    id: '7',
    name: 'Максим Волгин',
    role: 'scientist',
    organization: 'Технологический университет',
    avatar: '/assets/user7.png',
    email: 'maxim@tech-univ.edu',
    phone: '+7 (966) 345-67-89',
    location: 'Казань, Россия',
    expertise: ['Биохимия', 'Очистка сточных вод', 'Биотехнологии'],
    bio: 'Кандидат биологических наук, разрабатывает инновационные методы очистки воды с использованием микроорганизмов',
    status: 'offline',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48),
    tags: ['ученый', 'биотехнологии', 'инновации'],
    isFavorite: false,
    connectionLevel: 2,
    connectionType: 'pending',
    profileVisibility: 'public'
  }
];

// Демо-данные: Группы контактов
const mockContactGroups: ContactGroup[] = [
  {
    id: '1',
    name: 'Научное сообщество Байкала',
    description: 'Ученые и исследователи, занимающиеся изучением экосистемы Байкала',
    avatar: '/assets/group1.png',
    membersCount: 27,
    category: 'science',
    tags: ['исследования', 'наука', 'байкал']
  },
  {
    id: '2',
    name: 'Инвестиционный клуб VOD',
    description: 'Сообщество инвесторов, поддерживающих проекты в сфере экологии и водных ресурсов',
    avatar: '/assets/group2.png',
    membersCount: 43,
    category: 'investment',
    tags: ['инвестиции', 'финансы', 'проекты']
  },
  {
    id: '3',
    name: 'Операторы водоочистных сооружений',
    description: 'Специалисты по эксплуатации и обслуживанию систем очистки воды',
    avatar: '/assets/group3.png',
    membersCount: 18,
    category: 'operations',
    tags: ['операции', 'инженерия', 'очистка']
  },
  {
    id: '4',
    name: 'Эко-активисты региона',
    description: 'Объединение активистов, защищающих водные ресурсы Сибири',
    avatar: '/assets/group4.png',
    membersCount: 65,
    category: 'community',
    tags: ['активизм', 'защита', 'общество']
  }
];

export default function ContactsPage() {
  // Состояния
  const [activeTab, setActiveTab] = useState('individuals');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterExpanded, setFilterExpanded] = useState(false);
  
  // Отфильтрованные контакты
  const filteredContacts = mockContacts.filter(contact => {
    // Фильтр по поиску
    const matchesSearch = searchQuery === '' || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.organization && contact.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
    // Фильтр по роли
    const matchesRole = roleFilter === 'all' || contact.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Обработчики
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
  };
  
  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };
  
  const toggleFavorite = (contactId: string) => {
    // В реальном приложении здесь будет логика обновления статуса избранного
    console.log('Toggle favorite for contact:', contactId);
  };
  
  const sendMessage = (contactId: string) => {
    // В реальном приложении здесь будет перенаправление на страницу сообщений
    console.log('Send message to contact:', contactId);
  };

  // Функция для получения цвета индикатора статуса
  const getStatusColor = (status: ContactStatus) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };
  
  // Функция для получения текста статуса
  const getStatusText = (status: ContactStatus) => {
    switch(status) {
      case 'online': return 'В сети';
      case 'offline': return 'Не в сети';
      case 'away': return 'Отошел';
      case 'busy': return 'Занят';
      default: return 'Не в сети';
    }
  };
  
  // Функция для получения текста уровня связи
  const getConnectionLevelText = (level: number) => {
    switch(level) {
      case 1: return 'Прямая связь';
      case 2: return 'Через общего контакта';
      case 3: return 'Связь через двух контактов';
      default: return 'Дальняя связь';
    }
  };
  
  // Функция для получения иконки роли
  const getRoleIcon = (role: ContactRole) => {
    switch(role) {
      case 'scientist': return <FileText className="h-4 w-4" />;
      case 'investor': return <Briefcase className="h-4 w-4" />;
      case 'operator': return <Clock className="h-4 w-4" />;
      case 'government': return <Award className="h-4 w-4" />;
      case 'community': return <Users className="h-4 w-4" />;
      case 'expert': return <Award className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };
  
  // Функция для получения текста роли
  const getRoleText = (role: ContactRole) => {
    switch(role) {
      case 'scientist': return 'Ученый';
      case 'investor': return 'Инвестор';
      case 'operator': return 'Оператор';
      case 'government': return 'Гос. служащий';
      case 'community': return 'Активист';
      case 'expert': return 'Эксперт';
      default: return 'Контакт';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col h-[calc(100vh-140px)]">
        <div className="flex items-center mb-4">
          <div className="hexagon h-10 w-10 bg-gradient-to-r from-primary/30 to-secondary/30 
            flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary ml-3">Контакты</h1>
          
          <div className="ml-auto">
            <Button variant="secondary" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Добавить контакт
            </Button>
          </div>
        </div>

        <Card className="flex-1 border border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden">
          <Tabs defaultValue="individuals" className="h-full flex flex-col" onValueChange={setActiveTab}>
            <div className="border-b border-primary/10">
              <TabsList className="w-full justify-start p-0">
                <TabsTrigger value="individuals" className="data-[state=active]:bg-primary/10 rounded-none border-r border-primary/10 px-6">
                  <User className="h-4 w-4 mr-2" />
                  Персоны
                </TabsTrigger>
                <TabsTrigger value="groups" className="data-[state=active]:bg-primary/10 rounded-none border-r border-primary/10 px-6">
                  <Users className="h-4 w-4 mr-2" />
                  Группы и сообщества
                </TabsTrigger>
                <TabsTrigger value="requests" className="data-[state=active]:bg-primary/10 rounded-none px-6">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Заявки
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-secondary">3</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Вкладка Персоны */}
            <TabsContent value="individuals" className="flex-1 p-0 h-full flex">
              {/* Левая панель: список контактов */}
              <div className="w-1/3 border-r border-primary/10 h-full flex flex-col">
                {/* Поиск и фильтрация */}
                <div className="p-3 border-b border-primary/10">
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
                    <Input 
                      placeholder="Поиск контактов..." 
                      className="pl-10 bg-card/50"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  
                  {/* Фильтры */}
                  <Collapsible open={filterExpanded} onOpenChange={setFilterExpanded}>
                    <div className="flex items-center">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="px-2 text-xs">
                          <Filter className="h-3 w-3 mr-1" />
                          Фильтры
                          <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${filterExpanded ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                      
                      {roleFilter !== 'all' && (
                        <Badge className="ml-2 text-xs" variant="outline">
                          {getRoleText(roleFilter as ContactRole)}
                          <button 
                            className="ml-1 hover:text-primary" 
                            onClick={() => handleRoleFilter('all')}
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                    </div>
                    
                    <CollapsibleContent>
                      <div className="grid grid-cols-3 gap-1 mt-2">
                        <Button 
                          variant={roleFilter === 'all' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => handleRoleFilter('all')}
                        >
                          Все
                        </Button>
                        <Button 
                          variant={roleFilter === 'scientist' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => handleRoleFilter('scientist')}
                        >
                          Ученые
                        </Button>
                        <Button 
                          variant={roleFilter === 'investor' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => handleRoleFilter('investor')}
                        >
                          Инвесторы
                        </Button>
                        <Button 
                          variant={roleFilter === 'operator' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => handleRoleFilter('operator')}
                        >
                          Операторы
                        </Button>
                        <Button 
                          variant={roleFilter === 'government' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => handleRoleFilter('government')}
                        >
                          Гос. служащие
                        </Button>
                        <Button 
                          variant={roleFilter === 'community' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => handleRoleFilter('community')}
                        >
                          Активисты
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                {/* Список контактов */}
                <ScrollArea className="flex-1">
                  {filteredContacts.length === 0 ? (
                    <div className="p-6 text-center text-foreground/60">
                      <p>Контакты не найдены</p>
                    </div>
                  ) : (
                    filteredContacts.map(contact => (
                      <div 
                        key={contact.id}
                        className={`p-3 border-b border-primary/5 flex items-center cursor-pointer hover:bg-primary/5 transition-colors
                          ${selectedContact?.id === contact.id ? 'bg-primary/10' : ''}`}
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10 border border-primary/10">
                            <AvatarFallback className="bg-secondary/20 text-secondary">
                              {contact.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ${getStatusColor(contact.status)} border border-background`} />
                          {contact.isVerified && (
                            <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                              <UserCheck className="h-2 w-2 text-white" />
                            </span>
                          )}
                        </div>
                        
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-sm truncate flex items-center">
                              {contact.name}
                              {contact.isFavorite && (
                                <Star className="h-3 w-3 ml-1 text-yellow-500 fill-yellow-500" />
                              )}
                            </h4>
                          </div>
                          
                          <div className="flex items-center text-xs text-foreground/60">
                            {getRoleIcon(contact.role)}
                            <span className="ml-1">{getRoleText(contact.role)}</span>
                            {contact.organization && (
                              <span className="ml-1 truncate"> • {contact.organization}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </div>
              
              {/* Правая панель: детали контакта */}
              <div className="w-2/3 flex flex-col h-full">
                {selectedContact ? (
                  <ScrollArea className="flex-1 p-4">
                    <div className="flex items-start">
                      <Avatar className="h-16 w-16 border border-primary/10">
                        <AvatarFallback className="bg-secondary/20 text-secondary text-xl">
                          {selectedContact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <h2 className="text-xl font-bold flex items-center">
                            {selectedContact.name}
                            {selectedContact.isVerified && (
                              <Badge className="ml-2 bg-blue-500" variant="secondary">
                                <UserCheck className="h-3 w-3 mr-1" />
                                Верифицирован
                              </Badge>
                            )}
                          </h2>
                          
                          <div className="ml-auto flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleFavorite(selectedContact.id)}
                            >
                              {selectedContact.isFavorite ? (
                                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                              ) : (
                                <StarOff className="h-5 w-5" />
                              )}
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => sendMessage(selectedContact.id)}>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Написать сообщение
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Отправить email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Добавить в группу
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Tags className="h-4 w-4 mr-2" />
                                  Редактировать теги
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="mr-2">
                            {getRoleText(selectedContact.role)}
                          </Badge>
                          
                          <div className="flex items-center text-sm text-foreground/60">
                            <span className={`h-2 w-2 rounded-full ${getStatusColor(selectedContact.status)} mr-1`} />
                            {getStatusText(selectedContact.status)}
                          </div>
                          
                          {selectedContact.lastActive && (
                            <div className="text-xs text-foreground/60 ml-2">
                              • Активность: {selectedContact.status === 'online' 
                                ? 'сейчас в сети' 
                                : 'сегодня в ' + selectedContact.lastActive.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          )}
                        </div>
                        
                        {selectedContact.organization && (
                          <div className="text-sm mt-1 text-foreground/80">
                            <Briefcase className="h-4 w-4 inline-block mr-1" />
                            {selectedContact.organization}
                          </div>
                        )}
                        
                        {selectedContact.location && (
                          <div className="text-sm mt-1 text-foreground/80">
                            <MapPin className="h-4 w-4 inline-block mr-1" />
                            {selectedContact.location}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Card className="col-span-2 border border-primary/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Контактная информация</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-foreground/60" />
                              <span className="text-sm">{selectedContact.email}</span>
                            </div>
                            
                            {selectedContact.phone && (
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-foreground/60" />
                                <span className="text-sm">{selectedContact.phone}</span>
                              </div>
                            )}

                            {selectedContact.language && (
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-2 text-foreground/60" />
                                <span className="text-sm">{selectedContact.language.join(', ')}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Web3 и DAO интеграция */}
                      {(selectedContact.daoId || selectedContact.did) && (
                        <Card className="col-span-2 border border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">DAO интеграция</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {selectedContact.daoId && (
                                <div className="flex items-center">
                                  <Database className="h-4 w-4 mr-2 text-foreground/60" />
                                  <span className="text-sm font-mono text-xs">DAO ID: {selectedContact.daoId}</span>
                                </div>
                              )}
                              {selectedContact.did && (
                                <div className="flex items-center">
                                  <Shield className="h-4 w-4 mr-2 text-foreground/60" />
                                  <span className="text-sm font-mono text-xs">DID: {selectedContact.did}</span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-2 text-foreground/60" />
                                <span className="text-sm">
                                  Видимость профиля: {
                                    selectedContact.profileVisibility === 'public' 
                                      ? 'Публичный' 
                                      : selectedContact.profileVisibility === 'private'
                                        ? 'Приватный'
                                        : 'Только для участников DAO'
                                  }
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 mr-2 text-foreground/60" />
                                <span className="text-sm">
                                  Тип связи: {
                                    selectedContact.connectionType === 'friend' 
                                      ? 'Друг' 
                                      : selectedContact.connectionType === 'business'
                                        ? 'Деловой контакт'
                                        : selectedContact.connectionType === 'group'
                                          ? 'Участник группы'
                                          : selectedContact.connectionType === 'requested'
                                            ? 'Запрошено соединение'
                                            : 'Ожидает подтверждения'
                                  }
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      {/* DAO метрики */}
                      {selectedContact.daoMetrics && (
                        <Card className="col-span-2 border border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">DAO-метрики</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                                <span className="text-xs text-foreground/60">Доверие</span>
                                <span className="text-2xl font-bold">{selectedContact.daoMetrics.trustScore}</span>
                                <div className="w-full h-1 bg-foreground/10 mt-1 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${selectedContact.daoMetrics.trustScore}%` }}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                                <span className="text-xs text-foreground/60">Активность</span>
                                <span className="text-2xl font-bold">{selectedContact.daoMetrics.engagementRate}</span>
                                <div className="w-full h-1 bg-foreground/10 mt-1 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${selectedContact.daoMetrics.engagementRate}%` }}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                                <span className="text-xs text-foreground/60">Репутация</span>
                                <span className="text-2xl font-bold">{selectedContact.daoMetrics.reputationScore}</span>
                                <div className="w-full h-1 bg-foreground/10 mt-1 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${selectedContact.daoMetrics.reputationScore}%` }}
                                  />
                                </div>
                              </div>
                              {selectedContact.daoMetrics.votingWeight && (
                                <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                                  <span className="text-xs text-foreground/60">Вес голоса</span>
                                  <span className="text-2xl font-bold">{selectedContact.daoMetrics.votingWeight}×</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Web3 кошелек и токены */}
                      {selectedContact.wallet && (
                        <Card className="col-span-2 border border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Web3-интеграция</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <Wallet className="h-4 w-4 mr-2 text-foreground/60" />
                                <span className="text-xs font-mono">{selectedContact.wallet.address}</span>
                              </div>
                              
                              {selectedContact.wallet.tokens !== undefined && (
                                <div className="flex items-center">
                                  <Coins className="h-4 w-4 mr-2 text-foreground/60" />
                                  <span className="text-sm">{selectedContact.wallet.tokens} VOD токенов</span>
                                </div>
                              )}
                              
                              {selectedContact.wallet.nftAchievements && selectedContact.wallet.nftAchievements.length > 0 && (
                                <div>
                                  <div className="flex items-center mb-2">
                                    <Medal className="h-4 w-4 mr-2 text-foreground/60" />
                                    <span className="text-sm">NFT-достижения</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedContact.wallet.nftAchievements.map((achievement, index) => (
                                      <Badge key={index} variant="outline" className="bg-secondary/10">
                                        {achievement}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button size="sm" variant="outline" className="w-full">
                              <Share className="h-4 w-4 mr-2" />
                              Экспорт в NFT-визитку
                            </Button>
                          </CardFooter>
                        </Card>
                      )}
                      
                      {selectedContact.connectionLevel > 1 && (
                        <Card className="col-span-2 border border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Связь</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-foreground/60" />
                              <span className="text-sm">{getConnectionLevelText(selectedContact.connectionLevel)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      {selectedContact.expertise && selectedContact.expertise.length > 0 && (
                        <Card className="border border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Компетенции</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-1">
                              {selectedContact.expertise.map((exp, index) => (
                                <Badge key={index} variant="outline">
                                  {exp}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      {selectedContact.tags && selectedContact.tags.length > 0 && (
                        <Card className="border border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Теги</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-1">
                              {selectedContact.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary hover:bg-secondary/30">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      {selectedContact.bio && (
                        <Card className="col-span-2 border border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">О контакте</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-foreground/80">{selectedContact.bio}</p>
                          </CardContent>
                        </Card>
                      )}
                      
                      {selectedContact.commonProjects && selectedContact.commonProjects.length > 0 && (
                        <Card className="col-span-2 border border-primary/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Общие проекты</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {selectedContact.commonProjects.map((project, index) => (
                                <div key={index} className="p-2 rounded-md bg-card hover:bg-primary/5 border border-primary/10 cursor-pointer">
                                  <span className="text-sm">{project}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      <Card className="col-span-2 border border-primary/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Заметки</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <textarea 
                            className="w-full p-2 rounded-md border border-primary/10 bg-card/80"
                            placeholder="Добавьте заметки о контакте..."
                            rows={3}
                            defaultValue={selectedContact.notes}
                          />
                        </CardContent>
                        <CardFooter>
                          <Button size="sm" className="ml-auto">Сохранить</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
                    <Users className="h-16 w-16 text-foreground/20 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Выберите контакт</h3>
                    <p className="text-foreground/60 text-sm max-w-md">
                      Выберите контакт из списка слева, чтобы увидеть подробную информацию или воспользуйтесь поиском для фильтрации.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Вкладка Группы */}
            <TabsContent value="groups" className="flex-1 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockContactGroups.map(group => (
                  <Card key={group.id} className="border border-primary/10 hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Avatar className="h-10 w-10 mr-3 border border-primary/10">
                          <AvatarFallback className="bg-secondary/20 text-secondary">
                            {group.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {group.name}
                          <div className="text-xs font-normal text-foreground/60">
                            {group.membersCount} участников
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/80 mb-3">
                        {group.description}
                      </p>
                      
                      {group.tags && group.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {group.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary hover:bg-secondary/30 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Просмотреть группу
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {/* Карточка для создания новой группы */}
                <Card className="border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-full py-10">
                    <Plus className="h-10 w-10 text-primary/50 mb-3" />
                    <h3 className="text-lg font-medium text-primary mb-2">Создать группу</h3>
                    <p className="text-sm text-center text-foreground/60 mb-4">
                      Объедините контакты в новую профессиональную группу
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Создать группу
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Вкладка Заявки */}
            <TabsContent value="requests" className="flex-1 p-4">
              <div className="mb-4">
                <Tabs defaultValue="incoming">
                  <TabsList>
                    <TabsTrigger value="incoming">
                      Входящие
                      <Badge className="ml-2 bg-secondary">2</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="outgoing">
                      Исходящие
                      <Badge className="ml-2">1</Badge>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="incoming" className="mt-4">
                    <Card>
                      <CardContent className="p-0">
                        <div className="divide-y divide-primary/5">
                          {/* Входящая заявка 1 */}
                          <div className="p-4 flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarFallback className="bg-secondary/20 text-secondary">
                                АО
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium">Анна Озерова</h4>
                                <Badge variant="outline">community</Badge>
                              </div>
                              <p className="text-sm text-foreground/70 mb-1">
                                Eco-Community "Чистая вода"
                              </p>
                              <p className="text-xs text-foreground/60">
                                Запрос отправлен 3 дня назад
                              </p>
                            </div>
                            
                            <div className="ml-4 flex gap-2">
                              <Button size="sm" variant="default">
                                <UserCheck className="h-4 w-4 mr-1" />
                                Принять
                              </Button>
                              <Button size="sm" variant="outline">
                                Отклонить
                              </Button>
                            </div>
                          </div>
                          
                          {/* Входящая заявка 2 */}
                          <div className="p-4 flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarFallback className="bg-secondary/20 text-secondary">
                                МВ
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium">Максим Волгин</h4>
                                <Badge variant="outline">scientist</Badge>
                              </div>
                              <p className="text-sm text-foreground/70 mb-1">
                                Технологический университет
                              </p>
                              <p className="text-xs text-foreground/60">
                                Запрос отправлен 1 день назад
                              </p>
                            </div>
                            
                            <div className="ml-4 flex gap-2">
                              <Button size="sm" variant="default">
                                <UserCheck className="h-4 w-4 mr-1" />
                                Принять
                              </Button>
                              <Button size="sm" variant="outline">
                                Отклонить
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="outgoing" className="mt-4">
                    <Card>
                      <CardContent className="p-0">
                        <div className="divide-y divide-primary/5">
                          {/* Исходящая заявка */}
                          <div className="p-4 flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarFallback className="bg-secondary/20 text-secondary">
                                ПК
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium">Петр Карпов</h4>
                                <Badge variant="outline">government</Badge>
                              </div>
                              <p className="text-sm text-foreground/70 mb-1">
                                Комитет по экологии
                              </p>
                              <p className="text-xs text-foreground/60">
                                Запрос отправлен 4 дня назад
                              </p>
                            </div>
                            
                            <div className="ml-4">
                              <Button size="sm" variant="outline">
                                Отменить запрос
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Найти новые контакты</CardTitle>
                  <CardDescription>
                    Расширьте свою сеть контактов с участниками DAO VODeco
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer border-primary/10">
                        <CardContent className="p-4 flex items-center">
                          <HandHelping className="h-8 w-8 text-primary mr-3" />
                          <div>
                            <h4 className="font-medium text-sm">По общим интересам</h4>
                            <p className="text-xs text-foreground/70">Найдите участников с похожими интересами</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer border-primary/10">
                        <CardContent className="p-4 flex items-center">
                          <Building className="h-8 w-8 text-primary mr-3" />
                          <div>
                            <h4 className="font-medium text-sm">По организации</h4>
                            <p className="text-xs text-foreground/70">Найдите коллег из вашей организации</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer border-primary/10">
                        <CardContent className="p-4 flex items-center">
                          <BadgeCheck className="h-8 w-8 text-primary mr-3" />
                          <div>
                            <h4 className="font-medium text-sm">По рекомендациям</h4>
                            <p className="text-xs text-foreground/70">Контакты, рекомендованные вашей сетью</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Рекомендуемые контакты</h3>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg border border-primary/10 bg-card flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-secondary/20 text-secondary">
                              ИК
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">Ирина Ключевская</h4>
                              <Badge variant="outline">expert</Badge>
                            </div>
                            <p className="text-xs text-foreground/70">
                              Эксперт по устойчивому развитию
                            </p>
                          </div>
                          
                          <Button size="sm" variant="outline" className="ml-3">
                            <UserPlus className="h-4 w-4 mr-1" />
                            Добавить
                          </Button>
                        </div>
                        
                        <div className="p-3 rounded-lg border border-primary/10 bg-card flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-secondary/20 text-secondary">
                              АП
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">Андрей Прибрежный</h4>
                              <Badge variant="outline">operator</Badge>
                            </div>
                            <p className="text-xs text-foreground/70">
                              Инженер по водным ресурсам
                            </p>
                          </div>
                          
                          <Button size="sm" variant="outline" className="ml-3">
                            <UserPlus className="h-4 w-4 mr-1" />
                            Добавить
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}