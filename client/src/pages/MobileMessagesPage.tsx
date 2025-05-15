import { useState } from "react";
import { 
  MessageSquare, Bot, User, Users, Search, 
  ArrowLeft, Send, MoreVertical, Plus, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MobileHeader from '@/components/layout/MobileHeader';
import "../mobile.css";

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
const mockMessages: { [key: string]: Message[] } = {
  '1': [
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
      content: 'Привет! Я ваш персональный ассистент в системе VODeco. Могу помочь с навигацией, проектами или ответить на вопросы.',
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
      content: 'Конечно! У нас есть 10 активных проектов, 3 из которых открыты для инвестиций: "Очистка речной системы Ангары", "Мониторинг экосистемы Байкала" и "Устойчивое водопользование в регионе".',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 минут назад
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
    },
  ],
  '2': [
    {
      id: '1',
      type: 'incoming',
      sender: {
        id: '2',
        name: 'Алексей Водный',
      },
      content: 'Здравствуйте! Я рассмотрел ваше предложение по проекту очистки.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
      read: true,
    },
    {
      id: '2',
      type: 'outgoing',
      sender: {
        id: 'currentUser',
        name: 'Вы',
      },
      content: 'Добрый день! Отлично, какие у вас есть мысли или вопросы?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 час назад
      read: true,
    },
    {
      id: '3',
      type: 'incoming',
      sender: {
        id: '2',
        name: 'Алексей Водный',
      },
      content: 'Мне нравится ваш подход. Есть несколько предложений по оптимизации процесса фильтрации.',
      timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 минут назад
      read: true,
    },
    {
      id: '4',
      type: 'incoming',
      sender: {
        id: '2',
        name: 'Алексей Водный',
      },
      content: 'Вы уже видели последние данные по проекту №5? Там есть интересные результаты.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
      read: false,
    },
    {
      id: '5',
      type: 'incoming',
      sender: {
        id: '2',
        name: 'Алексей Водный',
      },
      content: 'Как вам последние данные по проекту №5?',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 минут назад
      read: false,
    },
  ]
};

// Демо-данные: Уведомления
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'system',
    importance: 'high',
    title: 'Голосование завершается',
    content: 'Предложение "Расширение мониторинга рек" будет закрыто через 6 часов.',
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
];



export default function MobileMessagesPage() {
  // Состояния
  const [activeTab, setActiveTab] = useState('chats');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  
  // Функция для форматирования времени
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
  
  // Открывает чат
  const openChat = (chatId: string) => {
    setActiveChat(chatId);
  };
  
  // Возвращает к списку чатов
  const backToList = () => {
    setActiveChat(null);
  };
  
  // Отправка сообщения
  const sendMessage = () => {
    if (!messageText.trim() || !activeChat) return;
    
    // В реальном приложении здесь будет логика отправки сообщения
    console.log('Sending message to chat', activeChat, ':', messageText);
    setMessageText('');
  };
  
  // Если открыт конкретный чат, показываем его
  if (activeChat) {
    const chat = mockChats.find(c => c.id === activeChat);
    const messages = mockMessages[activeChat] || [];
    
    return (
      <div className="mobile-full-screen flex flex-col bg-background">
        {/* Шапка */}
        <MobileHeader 
          title={chat?.name} 
          showBackButton={true} 
          onBack={backToList} 
        />
        
        {/* Инфо о чате */}
        <div className="px-3 py-2 border-b border-primary/10 flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback className="bg-secondary/20 text-secondary">
              {chat?.name.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="text-xs text-foreground/60">
              {chat?.type === 'personal' ? 'Личный чат' : 
               chat?.type === 'group' ? 'Групповой чат' : 
               'Системный канал'}
            </div>
          </div>
          
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Сообщения */}
        <div className="flex-1 p-3 overflow-y-auto">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`mb-3 flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.type === 'outgoing' 
                    ? 'bg-primary/30 text-foreground ml-auto' 
                    : message.type === 'system'
                      ? 'bg-secondary/20 text-foreground' 
                      : message.type === 'ai-assistant'
                        ? 'bg-secondary/30 text-foreground'
                        : 'bg-card/80 border border-primary/10 text-foreground'
                }`}
              >
                {message.type !== 'outgoing' && (
                  <div className="text-xs font-medium mb-1">{message.sender.name}</div>
                )}
                
                <p className="text-sm">{message.content}</p>
                
                <div className="flex justify-end items-center mt-1">
                  <span className="text-[10px] text-foreground/60">
                    {formatTime(message.timestamp)}
                  </span>
                  
                  {message.type === 'outgoing' && (
                    <span className="text-[10px] text-foreground/60 ml-1">
                      {message.read ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Поле ввода */}
        <div className="p-2 border-t border-primary/10 flex items-center">
          <Input 
            placeholder="Сообщение..." 
            className="flex-1 bg-card/50"
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <Button 
            className="ml-2" 
            size="icon" 
            onClick={sendMessage}
            disabled={!messageText.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  
  // Список чатов
  return (
    <div className="mobile-full-screen bg-background">
      {/* Фиксированная шапка */}
      <MobileHeader 
        title="Сообщения" 
        notificationCount={mockNotifications.filter(n => !n.read).length}
      />
      
      <div className="flex justify-between items-center px-3 py-2">
        <div className="flex-1">
          <div className="relative">
            <Search className="h-4 w-4 text-foreground/60 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <Input 
              placeholder="Поиск чатов и сообщений..." 
              className="bg-card/50 pl-8"
            />
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="ml-2">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="chats" className="text-sm">
            Чаты
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">
            Уведомления
            {mockNotifications.filter(n => !n.read).length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {mockNotifications.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="assistant" className="text-sm">
            Ассистент
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chats" className="mt-0 p-0">
          <div className="mobile-list">
            {mockChats.map(chat => (
              <div 
                key={chat.id} 
                className="chat-list-item"
                onClick={() => openChat(chat.id)}
              >
                <div className="chat-avatar">
                  <Avatar className="h-full w-full">
                    <AvatarFallback className={`
                      ${chat.type === 'system' 
                        ? 'bg-secondary/20 text-secondary' 
                        : chat.type === 'personal'
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-accent/20 text-accent'
                      }
                    `}>
                      {chat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Статус онлайн */}
                  {chat.type === 'personal' && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="chat-info">
                  <div className="chat-name">
                    <span>{chat.name}</span>
                    {chat.lastMessage && (
                      <span className="chat-time">
                        {formatTime(chat.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <p className="chat-preview">
                      {chat.lastMessage?.content || 'Нет сообщений'}
                    </p>
                    
                    {chat.unreadCount > 0 && (
                      <div className="chat-badge">{chat.unreadCount}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center p-4">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Новый чат
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0 px-2 py-2">
          {mockNotifications.map(notification => (
            <div 
              key={notification.id}
              className={`p-3 mb-2 rounded-lg border ${
                notification.read 
                  ? 'border-primary/10 bg-card/50' 
                  : 'border-primary/20 bg-primary/5'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>
                  {notification.title}
                </h3>
                <span className="text-[10px] text-foreground/60 ml-1">
                  {formatTime(notification.timestamp)}
                </span>
              </div>
              
              <p className="text-xs text-foreground/80 mb-2">
                {notification.content}
              </p>
              
              {notification.action && (
                <Button size="sm" variant="secondary" className="w-full text-xs">
                  {notification.action}
                </Button>
              )}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="assistant" className="mt-0 px-2 py-2">
          <div className="p-4 mb-3 rounded-lg border border-secondary/20 bg-secondary/5">
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback className="bg-secondary/20 text-secondary">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">VODeco Ассистент</h3>
                <p className="text-xs text-foreground/60">Ваш персональный помощник</p>
              </div>
            </div>
            
            <p className="text-sm mb-3">
              Чем я могу вам помочь сегодня? Я могу ответить на вопросы о проектах, помочь с навигацией или предоставить информацию об экосистеме VODeco.
            </p>
            
            <Button 
              className="w-full" 
              size="sm"
              onClick={() => openChat('1')}
            >
              Начать диалог
            </Button>
          </div>
          
          <div className="border-t border-primary/10 pt-3 mb-2">
            <h3 className="text-sm font-medium mb-2 px-1">Быстрые действия</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <Globe className="h-4 w-4 mr-2" />
                <span className="text-xs">Объекты рядом</span>
              </Button>
              
              <Button variant="outline" size="sm" className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-xs">Найти экспертов</span>
              </Button>
              
              <Button variant="outline" size="sm" className="justify-start">
                <Search className="h-4 w-4 mr-2" />
                <span className="text-xs">Статус проекта</span>
              </Button>
              
              <Button variant="outline" size="sm" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                <span className="text-xs">Мои инвестиции</span>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}