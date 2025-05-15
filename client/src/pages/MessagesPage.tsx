import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from "@/components/ui/card";
import { 
  MessageSquare, BellDot, Bot, User, Users, FileText, Bell, 
  Search, Paperclip, Send, ArrowRight, Pin, Smile
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Типы сообщений
type MessageType = 'incoming' | 'outgoing' | 'system' | 'ai-assistant';

// Интерфейс сообщения
interface Message {
  id: string;
  type: MessageType;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    type: 'image' | 'document' | 'link';
    url: string;
    name: string;
  }[];
  pinned?: boolean;
}

// Интерфейс чата
interface Chat {
  id: string;
  type: 'personal' | 'group' | 'system';
  name: string;
  avatar?: string;
  lastMessage?: {
    content: string;
    timestamp: Date;
    senderId: string;
  };
  unreadCount: number;
  participants?: {
    id: string;
    name: string;
    avatar?: string;
    online: boolean;
  }[];
}

// Интерфейс уведомления
interface Notification {
  id: string;
  type: 'system' | 'personal' | 'group';
  importance: 'high' | 'medium' | 'low';
  title: string;
  content: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  action?: string;
}

// Демо-данные: Чаты
const mockChats: Chat[] = [
  {
    id: '1',
    type: 'system',
    name: 'VODeco Ассистент',
    avatar: '/assets/bot-avatar.png',
    lastMessage: {
      content: 'Чем я могу вам помочь сегодня?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 минут назад
      senderId: 'system'
    },
    unreadCount: 1,
  },
  {
    id: '2',
    type: 'personal',
    name: 'Алексей Водный',
    avatar: '/assets/user1.png',
    lastMessage: {
      content: 'Как вам последние данные по проекту №5?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
      senderId: '2'
    },
    unreadCount: 2,
  },
  {
    id: '3',
    type: 'group',
    name: 'Группа Байкал',
    avatar: '/assets/group1.png',
    lastMessage: {
      content: 'Предлагаю рассмотреть новые технологии очистки...',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
      senderId: '5'
    },
    unreadCount: 0,
  },
  {
    id: '4',
    type: 'system',
    name: 'DAO Новости',
    avatar: '/assets/news.png',
    lastMessage: {
      content: 'Новое предложение доступно для голосования',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 часов назад
      senderId: 'system'
    },
    unreadCount: 0,
  },
  {
    id: '5',
    type: 'personal',
    name: 'Мария Эколог',
    avatar: '/assets/user2.png',
    lastMessage: {
      content: 'Отправила вам отчет по анализу воды',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 день назад
      senderId: '3'
    },
    unreadCount: 0,
  },
];

// Демо-данные: Сообщения для активного чата
const mockMessages: Message[] = [
  {
    id: '1',
    type: 'system',
    sender: {
      id: 'system',
      name: 'VODeco',
    },
    content: 'Добро пожаловать в чат VODeco! Здесь вы можете общаться с другими участниками экосистемы.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 дня назад
    read: true,
  },
  {
    id: '2',
    type: 'ai-assistant',
    sender: {
      id: 'assistant',
      name: 'VODeco Ассистент',
    },
    content: 'Привет! Я ваш персональный ассистент в системе VODeco. Я могу помочь вам с навигацией, предоставить информацию о проектах и ответить на ваши вопросы.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 час назад
    read: true,
  },
  {
    id: '3',
    type: 'outgoing',
    sender: {
      id: 'currentUser',
      name: 'Вы',
    },
    content: 'Привет! Я хотел бы узнать о текущих проектах в системе.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
    read: true,
  },
  {
    id: '4',
    type: 'ai-assistant',
    sender: {
      id: 'assistant',
      name: 'VODeco Ассистент',
    },
    content: 'Конечно! В настоящее время у нас есть 10 активных проектов, 3 из которых открыты для инвестиций: "Очистка речной системы Ангары", "Мониторинг экосистемы Байкала" и "Устойчивое водопользование в регионе".',
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 минут назад
    read: true,
  },
  {
    id: '5',
    type: 'ai-assistant',
    sender: {
      id: 'assistant',
      name: 'VODeco Ассистент',
    },
    content: 'Хотите подробнее узнать о каком-то конкретном проекте или перейти на страницу инвестиций?',
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 минут назад
    read: true,
  },
  {
    id: '6',
    type: 'outgoing',
    sender: {
      id: 'currentUser',
      name: 'Вы',
    },
    content: 'Расскажи мне больше о проекте "Мониторинг экосистемы Байкала"',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 минут назад
    read: true,
  },
  {
    id: '7',
    type: 'ai-assistant',
    sender: {
      id: 'assistant',
      name: 'VODeco Ассистент',
    },
    content: 'Проект "Мониторинг экосистемы Байкала" направлен на создание сети датчиков для непрерывного отслеживания качества воды, биоразнообразия и других экологических параметров озера. Проект имеет IRR 12.5% и уже привлек 65% необходимого финансирования. Требуется еще 35 VOD токенов для завершения сбора.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 минут назад
    read: true,
  },
  {
    id: '8',
    type: 'ai-assistant',
    sender: {
      id: 'assistant',
      name: 'VODeco Ассистент',
    },
    content: 'Чем я могу вам помочь сегодня?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 минут назад
    read: false,
    pinned: true
  },
];

// Демо-данные: Уведомления
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'system',
    importance: 'high',
    title: 'Голосование завершается',
    content: 'Предложение "Расширение мониторинга рек" будет закрыто через 6 часов. Проголосуйте сейчас!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
    read: false,
    link: '/dao',
    action: 'Голосовать'
  },
  {
    id: '2',
    type: 'personal',
    importance: 'medium',
    title: 'Новый комментарий',
    content: 'Алексей прокомментировал вашу публикацию в группе "Водные ресурсы"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 часа назад
    read: false,
    link: '/groups',
  },
  {
    id: '3',
    type: 'group',
    importance: 'medium',
    title: 'Приглашение в группу',
    content: 'Вас пригласили присоединиться к группе "Экспертное сообщество по водным ресурсам"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 часов назад
    read: true,
    link: '/groups',
    action: 'Присоединиться'
  },
  {
    id: '4',
    type: 'system',
    importance: 'low',
    title: 'Обновление системы',
    content: 'Новая версия VODeco доступна с улучшенными функциями визуализации данных',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 день назад
    read: true,
  },
  {
    id: '5',
    type: 'system',
    importance: 'high',
    title: 'Инвестиции активированы',
    content: 'Ваши инвестиции в проект "Очистка рек" успешно активированы. Начисление дивидендов начнется через 14 дней',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 дня назад
    read: true,
    link: '/bank',
  },
];

export default function MessagesPage() {
  // Состояния
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<string>('1'); // По умолчанию выбран первый чат
  const [messageText, setMessageText] = useState('');
  const [filteredNotifications, setFilteredNotifications] = useState(mockNotifications);
  const [notificationType, setNotificationType] = useState('all');

  // Обработчики
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // В реальном приложении здесь будет логика отправки сообщения
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const handleFilterNotifications = (type: string) => {
    setNotificationType(type);
    if (type === 'all') {
      setFilteredNotifications(mockNotifications);
    } else if (type === 'unread') {
      setFilteredNotifications(mockNotifications.filter(n => !n.read));
    } else {
      setFilteredNotifications(mockNotifications.filter(n => n.type === type));
    }
  };

  // Форматирование времени
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const isToday = now.getDate() === date.getDate() && 
                   now.getMonth() === date.getMonth() && 
                   now.getFullYear() === date.getFullYear();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diff < 1000 * 60 * 60 * 24 * 7) { // Меньше недели
      const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      return days[date.getDay()];
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col h-[calc(100vh-140px)]">
        <div className="flex items-center mb-4">
          <div className="hexagon h-10 w-10 bg-gradient-to-r from-primary/30 to-secondary/30 
            flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary ml-3">Сообщения</h1>
          
          {/* Индикатор непрочитанных уведомлений */}
          <div className="ml-auto flex">
            <Badge className="bg-secondary text-white" variant="secondary">
              {mockNotifications.filter(n => !n.read).length} новых
            </Badge>
          </div>
        </div>

        <Card className="flex-1 border border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden">
          <Tabs defaultValue="chats" className="h-full flex flex-col" onValueChange={setActiveTab}>
            <div className="border-b border-primary/10">
              <TabsList className="w-full justify-start p-0">
                <TabsTrigger value="chats" className="data-[state=active]:bg-primary/10 rounded-none border-r border-primary/10 px-6">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Чаты
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10 rounded-none px-6">
                  <BellDot className="h-4 w-4 mr-2" />
                  Уведомления
                  {mockNotifications.filter(n => !n.read).length > 0 && (
                    <span className="ml-2 rounded-full bg-secondary w-5 h-5 text-[10px] flex items-center justify-center text-white">
                      {mockNotifications.filter(n => !n.read).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="assistant" className="data-[state=active]:bg-primary/10 rounded-none border-l border-primary/10 px-6">
                  <Bot className="h-4 w-4 mr-2" />
                  Ассистент
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Вкладка Чаты */}
            <TabsContent value="chats" className="flex-1 p-0 h-full flex">
              {/* Левая панель: список чатов */}
              <div className="w-1/3 border-r border-primary/10 h-full flex flex-col">
                <div className="p-3 border-b border-primary/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
                    <Input 
                      placeholder="Поиск сообщений..." 
                      className="pl-10 bg-card/50"
                    />
                  </div>
                </div>
                
                <ScrollArea className="flex-1">
                  {mockChats.map(chat => (
                    <div 
                      key={chat.id}
                      className={`p-3 border-b border-primary/5 flex items-center cursor-pointer hover:bg-primary/5 transition-colors
                        ${selectedChat === chat.id ? 'bg-primary/10' : ''}`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10 border border-primary/10">
                          <AvatarFallback className="bg-secondary/20 text-secondary">
                            {chat.type === 'personal' ? (
                              <User className="h-5 w-5" />
                            ) : chat.type === 'group' ? (
                              <Users className="h-5 w-5" />
                            ) : (
                              <Bot className="h-5 w-5" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        {chat.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 rounded-full bg-secondary w-5 h-5 text-[10px] flex items-center justify-center text-white">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                      
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                          {chat.lastMessage && (
                            <span className="text-xs text-foreground/60">
                              {formatTime(chat.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        
                        {chat.lastMessage && (
                          <p className="text-xs text-foreground/70 truncate">
                            {chat.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              
              {/* Правая панель: выбранный чат */}
              <div className="w-2/3 flex flex-col h-full">
                {/* Заголовок чата */}
                <div className="p-3 border-b border-primary/10 flex items-center">
                  {mockChats.find(c => c.id === selectedChat) && (
                    <>
                      <Avatar className="h-8 w-8 border border-primary/10">
                        <AvatarFallback className="bg-secondary/20 text-secondary">
                          {mockChats.find(c => c.id === selectedChat)?.type === 'personal' ? (
                            <User className="h-4 w-4" />
                          ) : mockChats.find(c => c.id === selectedChat)?.type === 'group' ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <h3 className="font-medium text-sm">
                          {mockChats.find(c => c.id === selectedChat)?.name}
                        </h3>
                        <p className="text-xs text-foreground/60">
                          {mockChats.find(c => c.id === selectedChat)?.type === 'personal'
                            ? 'Личный чат'
                            : mockChats.find(c => c.id === selectedChat)?.type === 'group'
                              ? 'Групповой чат'
                              : 'Системный канал'}
                        </p>
                      </div>
                    </>
                  )}
                  
                  {/* Дополнительные действия */}
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Search className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Поиск в чате</DropdownMenuItem>
                        <DropdownMenuItem>Информация о чате</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Отключить уведомления</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Сообщения */}
                <ScrollArea className="flex-1 p-4">
                  {mockMessages.map(message => (
                    <div key={message.id} className="mb-4">
                      {message.pinned && (
                        <div className="flex items-center text-xs text-foreground/60 mb-1">
                          <Pin className="h-3 w-3 mr-1" />
                          Закрепленное сообщение
                        </div>
                      )}
                      <div className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${
                          message.type === 'outgoing' 
                            ? 'bg-primary/10 text-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                            : message.type === 'system'
                              ? 'bg-secondary/10 text-foreground rounded-lg' 
                              : message.type === 'ai-assistant'
                                ? 'bg-secondary/20 text-foreground rounded-tl-lg rounded-tr-lg rounded-br-lg'
                                : 'bg-card/80 border border-primary/10 text-foreground rounded-tl-lg rounded-tr-lg rounded-br-lg'
                        } py-2 px-3`}>
                          {message.type !== 'outgoing' && (
                            <div className="flex items-center mb-1">
                              <span className="text-xs font-medium">
                                {message.sender.name}
                              </span>
                            </div>
                          )}
                          
                          <p className="text-sm">{message.content}</p>
                          
                          <div className="flex items-center justify-end mt-1 gap-1">
                            <span className="text-[10px] text-foreground/60">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.type === 'outgoing' && (
                              <span className="text-[10px] text-foreground/60">
                                {message.read ? '✓✓' : '✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                
                {/* Ввод сообщения */}
                <div className="p-3 border-t border-primary/10 flex items-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input 
                    placeholder="Введите сообщение..." 
                    className="mx-2 bg-card/50"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 mr-1">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="shrink-0" onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-1" />
                    Отправить
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Вкладка Уведомления */}
            <TabsContent value="notifications" className="flex-1 p-0 h-full flex flex-col">
              <div className="p-3 border-b border-primary/10 flex items-center gap-2">
                <Button 
                  variant={notificationType === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleFilterNotifications('all')}
                >
                  Все
                </Button>
                <Button 
                  variant={notificationType === 'unread' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleFilterNotifications('unread')}
                >
                  Непрочитанные
                </Button>
                <Button 
                  variant={notificationType === 'system' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleFilterNotifications('system')}
                >
                  Системные
                </Button>
                <Button 
                  variant={notificationType === 'personal' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleFilterNotifications('personal')}
                >
                  Личные
                </Button>
                <Button 
                  variant={notificationType === 'group' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleFilterNotifications('group')}
                >
                  Групповые
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                {filteredNotifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-primary/5 hover:bg-primary/5 transition-colors
                      ${!notification.read ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3
                        ${notification.importance === 'high' 
                          ? 'bg-red-500/10' 
                          : notification.importance === 'medium' 
                            ? 'bg-secondary/10' 
                            : 'bg-primary/10'}`}
                      >
                        {notification.type === 'system' ? (
                          <Bell className={`h-5 w-5 
                            ${notification.importance === 'high' 
                              ? 'text-red-500' 
                              : notification.importance === 'medium' 
                                ? 'text-secondary' 
                                : 'text-primary'}`} 
                          />
                        ) : notification.type === 'personal' ? (
                          <User className={`h-5 w-5 
                            ${notification.importance === 'high' 
                              ? 'text-red-500' 
                              : notification.importance === 'medium' 
                                ? 'text-secondary' 
                                : 'text-primary'}`} 
                          />
                        ) : (
                          <Users className={`h-5 w-5 
                            ${notification.importance === 'high' 
                              ? 'text-red-500' 
                              : notification.importance === 'medium' 
                                ? 'text-secondary' 
                                : 'text-primary'}`} 
                          />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <span className="text-xs text-foreground/60 whitespace-nowrap ml-2">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-foreground/80 mt-1">
                          {notification.content}
                        </p>
                        
                        {notification.action && (
                          <div className="mt-2">
                            <Button 
                              size="sm" 
                              variant="secondary"
                              className="h-7 text-xs py-0"
                            >
                              {notification.action}
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>

            {/* Вкладка Ассистент DAO */}
            <TabsContent value="assistant" className="flex-1 p-4">
              <Card className="border border-secondary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Bot className="h-5 w-5 mr-2 text-secondary" />
                    VODeco Ассистент
                  </CardTitle>
                  <CardDescription>
                    Персональный ассистент в экосистеме VODeco
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                    <p className="text-sm mb-2">
                      Я могу помочь вам с:
                    </p>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Навигацией по платформе</li>
                      <li>Информацией о проектах и инвестициях</li>
                      <li>Процессами DAO и голосованиями</li>
                      <li>Созданием документов и отчетов</li>
                      <li>Консультацией по водным ресурсам</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium mb-2">Быстрые команды:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Создать отчет по проекту
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Найти группы по интересам
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Bell className="h-4 w-4 mr-2" />
                        Проверить статус заявки
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Написать в поддержку
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Начать диалог с ассистентом
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Рекомендации на основе вашей активности:</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Card className="border border-primary/10">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Новое голосование требует вашего внимания</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <p className="text-xs text-foreground/70">
                        Инициатива по мониторингу качества воды в регионе ждет вашего голоса. Срок голосования истекает через 2 дня.
                      </p>
                    </CardContent>
                    <CardFooter className="py-3">
                      <Button size="sm" variant="outline" className="w-full">
                        Перейти к голосованию
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border border-primary/10">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Доступна новая группа по вашим интересам</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <p className="text-xs text-foreground/70">
                        "Экспертное сообщество по водным ресурсам" - группа специалистов, обсуждающих современные подходы к управлению водными ресурсами.
                      </p>
                    </CardContent>
                    <CardFooter className="py-3">
                      <Button size="sm" variant="outline" className="w-full">
                        Присоединиться к группе
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}