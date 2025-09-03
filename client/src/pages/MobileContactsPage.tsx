import { useState } from "react";
import { 
  User, Users, Search, Filter, ArrowLeft, 
  Star, Phone, Mail, MapPin, Shield, Database, 
  UserPlus, MessageSquare, Plus, MoreVertical
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import MobileHeader from '@/components/layout/MobileHeader';
// import "../mobile.css";

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
  daoId?: string;
  did?: string;
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
  connectionLevel: number;
  daoMetrics?: {
    trustScore: number;
    engagementRate: number;
    reputationScore: number;
    votingWeight?: number;
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

// Демо-данные: Заявки контактов
const mockRequests = [
  {
    id: '1',
    contact: mockContacts.find(c => c.id === '6'),
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 дня назад
    type: 'incoming',
  },
  {
    id: '2',
    contact: mockContacts.find(c => c.id === '7'),
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 день назад
    type: 'incoming',
  },
  {
    id: '3',
    name: 'Петр Карпов',
    role: 'government',
    organization: 'Комитет по экологии',
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 дня назад
    type: 'outgoing',
  }
];

export default function MobileContactsPage() {
  // Состояния
  const [activeTab, setActiveTab] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  // Отфильтрованные контакты
  const filteredContacts = mockContacts.filter(contact => {
    // Фильтр по поиску
    const matchesSearch = searchQuery === '' || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.organization && contact.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
    // Фильтр по роли
    const matchesRole = roleFilter === 'all' || contact.role === roleFilter;
    
    // Фильтр по типу соединения (вкладки)
    const matchesConnectionType = 
      activeTab === 'all' || 
      (activeTab === 'friends' && contact.connectionType === 'friend') ||
      (activeTab === 'business' && contact.connectionType === 'business') ||
      (activeTab === 'groups' && contact.connectionType === 'group');
    
    return matchesSearch && matchesRole && matchesConnectionType;
  });
  
  // Получение текста роли
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
  
  // Получение цвета индикатора статуса
  const getStatusColor = (status: ContactStatus) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };
  
  // Получение класса для индикатора доверия
  const getTrustClass = (score: number) => {
    if (score >= 80) return 'trust-high';
    if (score >= 60) return 'trust-medium';
    return 'trust-low';
  };
  
  // Функция для получения текста уровня связи и цвета
  const getConnectionDetails = (level: number) => {
    switch(level) {
      case 1: 
        return { text: 'Прямая связь', class: 'connection-level-1' };
      case 2: 
        return { text: 'Через 1 контакт', class: 'connection-level-2' };
      case 3: 
        return { text: 'Через 2 контакта', class: 'connection-level-3' };
      default: 
        return { text: 'Дальняя связь', class: 'connection-level-3' };
    }
  };
  
  // Открывает профиль контакта
  const openContact = (contact: Contact) => {
    setSelectedContact(contact);
  };
  
  // Возвращает к списку контактов
  const backToList = () => {
    setSelectedContact(null);
  };
  
  // Отображение детального профиля контакта
  if (selectedContact) {
    const connectionDetails = getConnectionDetails(selectedContact.connectionLevel);
    
    return (
      <div className="mobile-full-screen flex flex-col bg-background overflow-y-auto">
        {/* Шапка профиля */}
        <MobileHeader 
          title="Профиль контакта" 
          showBackButton={true} 
          onBack={backToList} 
        />
        
        <div className="p-2 flex justify-end border-b border-primary/10 sticky top-14 bg-background z-10">
          <Button variant="ghost" size="icon">
            <Star className={`h-5 w-5 ${selectedContact.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Основная информация */}
        <div className="p-4 flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarFallback className="text-xl bg-secondary/20 text-secondary">
                {selectedContact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-background ${getStatusColor(selectedContact.status)}`}></div>
            
            {selectedContact.isVerified && (
              <div className="absolute top-0 right-0 bg-blue-500 rounded-full p-1 border border-background">
                <Shield className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <h1 className="text-xl font-bold mt-3">{selectedContact.name}</h1>
          
          <div className="flex items-center mt-1">
            <Badge variant="outline">{getRoleText(selectedContact.role)}</Badge>
            
            <div className={`connection-badge ml-2 ${connectionDetails.class}`}>
              {selectedContact.connectionLevel}
            </div>
          </div>
          
          {selectedContact.organization && (
            <p className="text-sm text-foreground/70 mt-1">{selectedContact.organization}</p>
          )}
          
          {selectedContact.location && (
            <p className="text-xs text-foreground/60 flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {selectedContact.location}
            </p>
          )}
          
          <div className="flex gap-2 mt-4 w-full">
            <Button className="flex-1" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Написать
            </Button>
            
            {selectedContact.connectionType === 'requested' && (
              <Button variant="secondary" className="flex-1" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Принять
              </Button>
            )}
            
            {selectedContact.phone && (
              <Button variant="outline" size="sm" className="w-10 p-0 flex-shrink-0">
                <Phone className="h-4 w-4" />
              </Button>
            )}
            
            <Button variant="outline" size="sm" className="w-10 p-0 flex-shrink-0">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* DAO метрики */}
        {selectedContact.daoMetrics && (
          <div className="px-4 py-3 border-t border-primary/10">
            <h3 className="text-sm font-medium mb-2">DAO-метрики</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-primary/5 p-2 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-foreground/60">Доверие</span>
                  <span className={`text-xs font-medium ${getTrustClass(selectedContact.daoMetrics.trustScore)}`}>
                    {selectedContact.daoMetrics.trustScore}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${getTrustClass(selectedContact.daoMetrics.trustScore)}`}
                    style={{ width: `${selectedContact.daoMetrics.trustScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-primary/5 p-2 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-foreground/60">Активность</span>
                  <span className={`text-xs font-medium ${getTrustClass(selectedContact.daoMetrics.engagementRate)}`}>
                    {selectedContact.daoMetrics.engagementRate}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${getTrustClass(selectedContact.daoMetrics.engagementRate)}`}
                    style={{ width: `${selectedContact.daoMetrics.engagementRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-primary/5 p-2 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-foreground/60">Репутация</span>
                  <span className={`text-xs font-medium ${getTrustClass(selectedContact.daoMetrics.reputationScore)}`}>
                    {selectedContact.daoMetrics.reputationScore}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${getTrustClass(selectedContact.daoMetrics.reputationScore)}`}
                    style={{ width: `${selectedContact.daoMetrics.reputationScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* DAO и Web3 идентификаторы */}
        {(selectedContact.daoId || selectedContact.did || selectedContact.wallet) && (
          <div className="px-4 py-3 border-t border-primary/10">
            <h3 className="text-sm font-medium mb-2">Web3-идентификация</h3>
            
            <div className="space-y-2">
              {selectedContact.daoId && (
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2 text-foreground/60" />
                  <span className="text-xs font-mono overflow-hidden overflow-ellipsis">
                    {selectedContact.daoId}
                  </span>
                </div>
              )}
              
              {selectedContact.did && (
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-foreground/60" />
                  <span className="text-xs font-mono overflow-hidden overflow-ellipsis">
                    {selectedContact.did}
                  </span>
                </div>
              )}
              
              {selectedContact.wallet && (
                <div className="flex items-center">
                  <div className="text-xs bg-primary/10 rounded-md p-2 w-full font-mono overflow-hidden overflow-ellipsis">
                    {selectedContact.wallet.address}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Компетенции */}
        {selectedContact.expertise && selectedContact.expertise.length > 0 && (
          <div className="px-4 py-3 border-t border-primary/10">
            <h3 className="text-sm font-medium mb-2">Компетенции</h3>
            
            <div className="flex flex-wrap gap-1">
              {selectedContact.expertise.map((exp, index) => (
                <Badge key={index} variant="outline">
                  {exp}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* О контакте */}
        {selectedContact.bio && (
          <div className="px-4 py-3 border-t border-primary/10">
            <h3 className="text-sm font-medium mb-2">О контакте</h3>
            <p className="text-sm text-foreground/80">{selectedContact.bio}</p>
          </div>
        )}
        
        {/* Общие проекты */}
        {selectedContact.commonProjects && selectedContact.commonProjects.length > 0 && (
          <div className="px-4 py-3 border-t border-primary/10">
            <h3 className="text-sm font-medium mb-2">Общие проекты</h3>
            
            <div className="space-y-2">
              {selectedContact.commonProjects.map((project, index) => (
                <div key={index} className="p-2 bg-primary/5 rounded-lg text-sm">
                  {project}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Достижения NFT */}
        {selectedContact.wallet?.nftAchievements && selectedContact.wallet.nftAchievements.length > 0 && (
          <div className="px-4 py-3 border-t border-primary/10">
            <h3 className="text-sm font-medium mb-2">NFT-достижения</h3>
            
            <div className="flex flex-wrap gap-1">
              {selectedContact.wallet.nftAchievements.map((achievement, index) => (
                <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary">
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Список контактов
  return (
    <div className="mobile-full-screen bg-background">
      {/* Фиксированная шапка */}
      <MobileHeader title="Контакты" />
      
      {/* Поиск */}
      <div className="p-2 border-b border-primary/10">
        <div className="relative">
          <Search className="h-4 w-4 text-foreground/60 absolute left-2 top-1/2 transform -translate-y-1/2" />
          <Input 
            id="search-input"
            placeholder="Поиск по имени, организации, тегам..." 
            className="bg-card/50 pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Категории и фильтры */}
      <div className="sticky top-14 z-10 bg-background border-b border-primary/10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              Все
            </TabsTrigger>
            <TabsTrigger value="friends" className="text-xs">
              Друзья
            </TabsTrigger>
            <TabsTrigger value="business" className="text-xs">
              Деловые
            </TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">
              Группы
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center justify-between px-3 pt-2">
            <div className="text-xs text-foreground/60">
              {filteredContacts.length} контактов
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-xs p-1 h-7"
              onClick={() => document.getElementById('role-filter')?.click()}
            >
              <Filter className="h-3 w-3 mr-1" />
              Фильтр
            </Button>
          </div>
        </Tabs>
      </div>
      
      {/* Фильтр по роли */}
      <div className="sticky top-[7.5rem] z-[9] bg-background border-b border-primary/10 px-2 mb-1">
        <select 
          id="role-filter"
          className="hidden"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">Все роли</option>
          <option value="scientist">Ученые</option>
          <option value="investor">Инвесторы</option>
          <option value="operator">Операторы</option>
          <option value="government">Гос. служащие</option>
          <option value="community">Активисты</option>
          <option value="expert">Эксперты</option>
        </select>
        
        <div className="flex gap-1 overflow-x-auto py-1 no-scrollbar">
          <Badge 
            variant={roleFilter === 'all' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setRoleFilter('all')}
          >
            Все роли
          </Badge>
          <Badge 
            variant={roleFilter === 'scientist' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setRoleFilter('scientist')}
          >
            Ученые
          </Badge>
          <Badge 
            variant={roleFilter === 'investor' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setRoleFilter('investor')}
          >
            Инвесторы
          </Badge>
          <Badge 
            variant={roleFilter === 'operator' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setRoleFilter('operator')}
          >
            Операторы
          </Badge>
          <Badge 
            variant={roleFilter === 'government' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setRoleFilter('government')}
          >
            Гос. служащие
          </Badge>
          <Badge 
            variant={roleFilter === 'expert' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setRoleFilter('expert')}
          >
            Эксперты
          </Badge>
        </div>
      </div>
      
      {/* Список контактов */}
      <div className="mobile-list pb-20">
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <div 
              key={contact.id} 
              className="mobile-list-item"
              onClick={() => openContact(contact)}
            >
              <div className="contact-card w-full">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-secondary/20 text-secondary">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-background ${getStatusColor(contact.status)}`}></div>
                  
                  {contact.isVerified && (
                    <div className="absolute top-0 right-0 bg-blue-500 rounded-full p-0.5 border border-background">
                      <Shield className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 ml-3 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm truncate flex items-center">
                      {contact.name}
                      {contact.isFavorite && <Star className="h-3 w-3 ml-1 fill-yellow-500 text-yellow-500" />}
                    </div>
                    
                    <div className={`connection-badge ${getConnectionDetails(contact.connectionLevel).class}`}>
                      {contact.connectionLevel}
                    </div>
                  </div>
                  
                  <div className="text-xs text-foreground/60 truncate">
                    {getRoleText(contact.role)}
                    {contact.organization && ` • ${contact.organization}`}
                  </div>
                  
                  {contact.daoMetrics && (
                    <div className="flex items-center mt-1">
                      <div className="progress-bar flex-1 mr-1">
                        <div 
                          className={`progress-fill ${getTrustClass(contact.daoMetrics.trustScore)}`}
                          style={{ width: `${contact.daoMetrics.trustScore}%` }}
                        ></div>
                      </div>
                      
                      <span className="text-[10px] text-foreground/60">
                        {contact.daoMetrics.trustScore}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-foreground/60">
            <p>Контакты не найдены</p>
          </div>
        )}
      </div>
      
      {/* Плавающая кнопка добавления контакта */}
      <div className="fixed bottom-5 right-5 z-20">
        <Button className="h-14 w-14 rounded-full shadow-lg">
          <UserPlus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}