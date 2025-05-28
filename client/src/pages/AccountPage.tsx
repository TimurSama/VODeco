import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, QrCode, Award, History, Settings, 
  Globe, FlaskConical, Building2, BarChart3, Edit, Eye, Lock, 
  UserPlus, Bell, Wallet, HelpCircle, ExternalLink 
} from "lucide-react";
import { UserRole } from '@/types';

// Определение типов ролей
type RoleType = 'community' | 'scientific' | 'government' | 'investor';

export default function AccountPage() {
  // Реальные данные пользователя будут получены из API
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    walletAddress: "",
    role: "participant",
    joined: "",
    avatar: "",
    votingPower: 0,
    // Баланс токенов
    vodBalance: 0,
    h2oBalance: 0,
    stakedVOD: 0,
    // Статистика активности
    totalVotes: 0,
    proposalsCreated: 0,
    successfulVotes: 0,
    investmentsMade: 0,
    totalInvested: 0,
    currentROI: 0,
    // Достижения
    achievements: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    walletAddress: ""
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Загрузка данных пользователя
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      try {
        const response = await fetch('/api/user', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            id: `DAO_${String(data.id).padStart(8, '0')}`,
            username: data.username || '',
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            walletAddress: data.walletAddress || '',
            role: data.role || 'participant',
            joined: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '',
            avatar: data.avatar || '',
            votingPower: data.votingPower || 0,
            vodBalance: 0,
            h2oBalance: 0,
            stakedVOD: 0,
            totalVotes: 0,
            proposalsCreated: 0,
            successfulVotes: 0,
            investmentsMade: 0,
            totalInvested: 0,
            currentROI: 0,
            achievements: []
          });

          setEditForm({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            walletAddress: data.walletAddress || ''
          });
        }
      } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(prev => ({
          ...prev,
          firstName: updatedUser.firstName || '',
          lastName: updatedUser.lastName || '',
          email: updatedUser.email || '',
          walletAddress: updatedUser.walletAddress || ''
        }));

        setIsEditing(false);
        toast({
          title: "Данные сохранены",
          description: "Информация профиля успешно обновлена",
        });
      } else {
        throw new Error('Ошибка сохранения');
      }
    } catch (error) {
      console.error('Ошибка сохранения данных:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить данные",
        variant: "destructive"
      });
    }
  };
  const [activeRole, setActiveRole] = useState<RoleType>('community');
  const [activeTab, setActiveTab] = useState('profile');

  // Функция получения иконки для роли
  const getRoleIcon = (role: RoleType) => {
    switch (role) {
      case 'community': return <Globe className="h-5 w-5" />;
      case 'scientific': return <FlaskConical className="h-5 w-5" />;
      case 'government': return <Building2 className="h-5 w-5" />;
      case 'investor': return <BarChart3 className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  // Функция получения цвета для роли
  const getRoleColor = (role: RoleType): string => {
    switch (role) {
      case 'community': return 'primary';
      case 'scientific': return 'cyan-500';
      case 'government': return 'violet-500';
      case 'investor': return 'amber-500';
      default: return 'primary';
    }
  };

  return (
    <div className="relative">
      {/* Фоновая сетка из гексагонов */}
      <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hexPattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="scale(1) rotate(0)">
            <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke="rgba(45, 212, 191, 0.3)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      {/* Верхняя секция с информацией о пользователе */}
      <div className="glassmorphism-dark w-full rounded-xl p-6 mb-8 relative overflow-hidden">
        {/* Неоновое свечение вокруг профиля */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30 z-0"></div>

        {/* Основная информация */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Аватар и ID */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-md animate-pulse"></div>
              <div className="relative hexagon h-32 w-32 bg-gradient-to-br from-background to-primary/20 border border-primary/30 flex items-center justify-center">
                {userData.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt={userData.username} 
                    className="h-24 w-24 object-cover hexagon"
                  />
                ) : (
                  <User className="h-14 w-14 text-primary" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-1 shadow-lg border-2 border-background">
                <Award className="h-5 w-5 text-background" />
              </div>
            </div>

            <div className="text-center">
              <div className="bg-background/30 border border-primary/20 px-3 py-1 rounded-full text-xs text-primary mb-1 inline-flex items-center">
                <QrCode className="h-3 w-3 mr-1" />
                {userData.id}
              </div>
              <h2 className="text-xl font-bold text-white">{userData.username}</h2>
              <p className="text-white/60 text-sm">С нами с {userData.joined}</p>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Показать QR-код
            </Button>
          </div>

          {/* Статистика и метрики */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Показатель вовлеченности */}
            <div className="bg-background/20 rounded-lg p-4 border border-primary/10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-medium">Уровень вовлеченности</h3>
                  <p className="text-white/60 text-xs">Основано на активности в DAO</p>
                </div>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Уровень 3</Badge>
              </div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-white/70">Прогресс</span>
                <span className="text-primary font-medium">{userData.votingPower}%</span>
              </div>
              <Progress value={userData.votingPower} className="h-2 bg-background/30" />

              <div className="mt-4 grid grid-cols-3 gap-1 text-center text-xs">
                <div className="bg-background/30 p-2 rounded-md">
                  <div className="text-white">{userData.totalVotes}</div>
                  <div className="text-white/60">Активности</div>
                </div>
                <div className="bg-background/30 p-2 rounded-md">
                  <div className="text-white">{userData.achievements.length}</div>
                  <div className="text-white/60">Достижения</div>
                </div>
                <div className="bg-background/30 p-2 rounded-md">
                  <div className="text-primary">{userData.votingPower}</div>
                  <div className="text-white/60">Сила голоса</div>
                </div>
              </div>
            </div>

            {/* Переключение ролей */}
            <div className="bg-background/20 rounded-lg p-4 border border-primary/10">
              <h3 className="text-white font-medium mb-3">Активная роль</h3>
              <div className="grid grid-cols-2 gap-2">
                {(['community', 'scientific', 'government', 'investor'] as RoleType[]).map(role => (
                  <button 
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center text-sm transition-all
                      ${activeRole === role 
                        ? `bg-${getRoleColor(role)}/20 border border-${getRoleColor(role)}/30 text-${getRoleColor(role)}` 
                        : 'bg-background/30 border border-white/5 text-white/70 hover:border-primary/20'
                      }`}
                  >
                    {getRoleIcon(role)}
                    <span className="mt-2 capitalize">
                      {role === 'community' ? 'Общественный' :
                       role === 'scientific' ? 'Научный' :
                       role === 'government' ? 'Гос. сектор' :
                       'Инвестор'}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-white/50 text-xs mt-4">
                Переключение роли меняет доступные функции и данные в соответствии с вашими привилегиями.
              </p>
            </div>

            {/* DAO Статус и Рейтинг */}
            <div className="bg-background/20 rounded-lg p-4 border border-primary/10 md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">DAO Статус и Инвестиции</h3>
                <Badge className="bg-accent/20 text-accent hover:bg-accent/30">VOD Участник</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col justify-between bg-background/30 p-3 rounded-lg">
                  <div className="text-white/60 text-xs">Сила голоса</div>
                  <div className="text-2xl font-bold text-white mt-2">{userData.votingPower} <span className="text-primary text-sm">VOD</span></div>
                  <div className="text-xs text-white/50 mt-1">≈ 1.2% от общего пула</div>
                </div>

                <div className="flex flex-col justify-between bg-background/30 p-3 rounded-lg">
                  <div className="text-white/60 text-xs">В стейкинге</div>
                  <div className="text-2xl font-bold text-white mt-2">{userData.stakedVOD} <span className="text-primary text-sm">VOD</span></div>
                  <div className="text-xs text-green-400 mt-1">+24.6 VOD (5.2%)</div>
                </div>

                <div className="flex flex-col justify-between bg-background/30 p-3 rounded-lg">
                  <div className="text-white/60 text-xs">Инвестировано в проекты</div>
                  <div className="text-2xl font-bold text-white mt-2">3 <span className="text-primary text-sm">проекта</span></div>
                  <div className="text-xs text-white/50 mt-1">Общий IRR: 18.7%</div>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="link" className="text-primary text-xs">
                  <Wallet className="h-3 w-3 mr-1" />
                  Подробная статистика
                </Button>
                <Button variant="link" className="text-primary text-xs">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  Как улучшить рейтинг?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Основное содержимое страницы */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="w-full bg-background/20 p-1 rounded-lg mb-6">
          <TabsTrigger 
            value="profile" 
            className="flex items-center data-[state=active]:bg-primary/20"
            onClick={() => setActiveTab('profile')}
          >
            <User className="h-4 w-4 mr-2" />
            Профиль
          </TabsTrigger>
          <TabsTrigger 
            value="achievements" 
            className="flex items-center data-[state=active]:bg-primary/20"
            onClick={() => setActiveTab('achievements')}
          >
            <Award className="h-4 w-4 mr-2" />
            Достижения
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            className="flex items-center data-[state=active]:bg-primary/20"
            onClick={() => setActiveTab('activity')}
          >
            <History className="h-4 w-4 mr-2" />
            Активность
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex items-center data-[state=active]:bg-primary/20"
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-6">
          <div className="glassmorphism-dark rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-lg font-medium flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Информация профиля
              </h3>
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                <Edit className="h-4 w-4 mr-2" />
                Редактировать
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-xs block mb-1">Имя пользователя</label>
                  <div className="p-3 bg-background/30 rounded-lg border border-primary/10 text-white">
                    {userData.username}
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs block mb-1">DAO ID</label>
                  <div className="p-3 bg-background/30 rounded-lg border border-primary/10 text-white font-mono">
                    {userData.id}
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs block mb-1">Дата регистрации</label>
                  <div className="p-3 bg-background/30 rounded-lg border border-primary/10 text-white">
                    {userData.joined}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-xs block mb-1">Роль в DAO</label>
                  <div className="p-3 bg-background/30 rounded-lg border border-primary/10 text-white flex items-center">
                    <Badge className="bg-primary/20 text-primary">
                      {userData.role === UserRole.Participant ? 'Участник' : 
                       userData.role === UserRole.Operator ? 'Оператор' :
                       userData.role === UserRole.Scientist ? 'Учёный' :
                       userData.role === UserRole.Investor ? 'Инвестор' :
                       userData.role === UserRole.Government ? 'Гос. представитель' : 'Гость'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs block mb-1">Привязанные кошельки</label>
                  <div className="p-3 bg-background/30 rounded-lg border border-primary/10 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                          <Wallet className="h-3 w-3 text-primary" />
                        </div>
                        <span className="font-mono text-sm">0x71C7...4E39</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500">Основной</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs block mb-1">Публичный профиль</label>
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/30 text-primary hover:bg-primary/10 flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Просмотр
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/30 text-primary hover:bg-primary/10 flex-1"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Настройки приватности
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Действия и быстрые ссылки */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glassmorphism-dark rounded-xl p-6 space-y-4">
              <h3 className="text-white text-lg font-medium flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-primary" />
                Контакты
              </h3>

              <p className="text-white/60 text-sm">
                Управляйте своими контактами и подключениями в DAO VODeco.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  Мои контакты
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  Найти участников
                </Button>
              </div>
            </div>

            <div className="glassmorphism-dark rounded-xl p-6 space-y-4">
              <h3 className="text-white text-lg font-medium flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary" />
                Уведомления
              </h3>

              <p className="text-white/60 text-sm">
                Настройте предпочтения по уведомлениям для различных событий.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  Настройки
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  История
                </Button>
              </div>
            </div>

            <div className="glassmorphism-dark rounded-xl p-6 space-y-4">
              <h3 className="text-white text-lg font-medium flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-primary" />
                Внешние сервисы
              </h3>

              <p className="text-white/60 text-sm">
                Управляйте подключениями к внешним сервисам и API.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  Интеграции
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  API ключи
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-4">
          <div className="glassmorphism-dark rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-lg font-medium flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Мои достижения
              </h3>
              <Badge className="bg-primary/20 text-primary">
                {userData.achievements.length} из 24
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userData.achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className="bg-background/20 rounded-xl border border-primary/20 p-4 flex flex-col items-center group hover:border-primary/40 transition-all"
                >
                  <div className="h-16 w-16 hexagon bg-gradient-to-br from-primary/20 to-background flex items-center justify-center mb-3 group-hover:from-primary/30 transition-all">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-white font-medium text-center">{achievement.name}</h4>
                  {'level' in achievement && (
                    <p className="text-primary text-sm">Уровень {achievement.level}</p>
                  )}
                  {'votes' in achievement && (
                    <p className="text-primary text-sm">{achievement.votes}+ голосований</p>
                  )}
                  <p className="text-white/50 text-xs mt-2">
                    {achievement.date.toLocaleDateString()}
                  </p>
                </div>
              ))}

              {/* Placeholder для будущих достижений */}
              <div className="bg-background/10 rounded-xl border border-dashed border-white/20 p-4 flex flex-col items-center justify-center h-full min-h-[160px]">
                <div className="h-16 w-16 rounded-full bg-background/20 flex items-center justify-center mb-3">
                  <Lock className="h-6 w-6 text-white/30" />
                </div>
                <p className="text-white/40 text-sm text-center">Следующее достижение</p>
                <Button variant="link" className="text-primary text-xs mt-2">
                  Как получить?
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <div className="glassmorphism-dark rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-lg font-medium flex items-center">
                <History className="h-5 w-5 mr-2 text-primary" />
                История активности
              </h3>
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                Фильтры
              </Button>
            </div>

            <div className="space-y-4 mb-4">
              {userData.activities && userData.activities.map(activity => (
                <div 
                  key={activity.id}
                  className="bg-background/20 rounded-lg border border-primary/10 p-4"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                      {activity.type === 'vote' && <Globe className="h-5 w-5 text-primary" />}
                      {activity.type === 'stake' && <Wallet className="h-5 w-5 text-primary" />}
                      {activity.type === 'certificate' && <Award className="h-5 w-5 text-primary" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-white font-medium">
                          {activity.type === 'vote' && 'Голосование в DAO'}
                          {activity.type === 'stake' && 'Стейкинг токенов'}
                          {activity.type === 'certificate' && 'Получен сертификат'}
                        </h4>
                        <Badge className="bg-background/30 text-white/70">
                          {activity.date.toLocaleDateString()}
                        </Badge>
                      </div>

                      <p className="text-white/70 text-sm mt-1">
                        {activity.type === 'vote' && `Проголосовал за проект "${activity.project}"`}
                        {activity.type === 'stake' && `Добавил ${activity.amount} VOD в пул ${activity.pool}`}
                        {activity.type === 'certificate' && `Получен сертификат "${activity.name}"`}
                      </p>

                      <div className="flex mt-3">
                        <Button variant="link" className="text-primary text-xs p-0 h-auto">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                Загрузить больше
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <div className="glassmorphism-dark rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-white text-lg font-medium flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Настройки аккаунта
              </h3>
              <p className="text-white/60 text-sm mt-2">
                Управляйте настройками вашего аккаунта и предпочтениями
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Личная информация</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full justify-start">
                      <Edit className="h-4 w-4 mr-2" />
                      Изменить имя и аватар
                    </Button>
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      Настройки безопасности
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Уведомления</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Настройки уведомлений
                    </Button>
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Email подписки
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Приватность</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      Настройки видимости профиля
                    </Button>
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full justify-start">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Управление доступом
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Интеграции</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full justify-start">
                      <Wallet className="h-4 w-4 mr-2" />
                      Управление кошельками
                    </Button>
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Подключенные приложения
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <Button variant="destructive" size="sm" className="bg-red-500/20 text-red-400 hover:bg-red-500/30">
                Деактивировать аккаунт
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}