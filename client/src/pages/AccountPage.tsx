import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Wallet, 
  Activity, 
  Settings, 
  Shield, 
  Award,
  TrendingUp,
  Calendar,
  Coins,
  Target,
  Users,
  ChevronRight,
  Edit,
  Eye,
  Bell,
  Lock,
  Download,
  Upload,
  RefreshCw
} from "lucide-react";

interface UserActivity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  tokensEarned?: number;
  status: 'completed' | 'pending' | 'failed';
}

interface UserStats {
  totalTokensEarned: number;
  totalStaked: number;
  activeStakings: number;
  completedMissions: number;
  daoVotes: number;
  trustScore: number;
  level: number;
  experiencePoints: number;
  nextLevelXP: number;
}

export default function AccountPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  const [userStats, setUserStats] = useState<UserStats>({
    totalTokensEarned: 2450,
    totalStaked: 1500,
    activeStakings: 3,
    completedMissions: 12,
    daoVotes: 34,
    trustScore: 85,
    level: 5,
    experiencePoints: 2100,
    nextLevelXP: 2500
  });

  const [recentActivities, setRecentActivities] = useState<UserActivity[]>([
    {
      id: 1,
      type: 'voting',
      description: 'Участие в голосовании "Водоочистка Алматы"',
      timestamp: '2024-01-15T14:30:00Z',
      tokensEarned: 50,
      status: 'completed'
    },
    {
      id: 2,
      type: 'staking',
      description: 'Стейкинг 500 VOD токенов на 60 дней',
      timestamp: '2024-01-14T10:15:00Z',
      status: 'completed'
    },
    {
      id: 3,
      type: 'mission',
      description: 'Завершение миссии сбора данных',
      timestamp: '2024-01-12T16:45:00Z',
      tokensEarned: 75,
      status: 'completed'
    },
    {
      id: 4,
      type: 'purchase',
      description: 'Покупка 200 VOD токенов',
      timestamp: '2024-01-10T09:20:00Z',
      status: 'completed'
    }
  ]);

  const levelProgress = (userStats.experiencePoints / userStats.nextLevelXP) * 100;

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Здесь будет загрузка актуальных данных
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Данные обновлены",
        description: "Актуальная информация загружена"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Заголовок с информацией о пользователе */}
      <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-primary">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-foreground/60">Участник VODeco DAO</p>

              {/* Прогресс уровня */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Уровень {userStats.level}</span>
                  <span className="text-sm text-foreground/60">
                    {userStats.experiencePoints} / {userStats.nextLevelXP} XP
                  </span>
                </div>
                <Progress value={levelProgress} className="h-2" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={refreshData}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Обновить
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Редактировать
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Основные вкладки */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="wallet">Кошелек</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        {/* Обзор */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Coins className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Заработано токенов</p>
                    <p className="text-2xl font-bold">{userStats.totalTokensEarned.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">В стейкинге</p>
                    <p className="text-2xl font-bold">{userStats.totalStaked.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <Target className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Выполнено миссий</p>
                    <p className="text-2xl font-bold">{userStats.completedMissions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-full">
                    <Shield className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Рейтинг доверия</p>
                    <p className="text-2xl font-bold">{userStats.trustScore}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Быстрые действия */}
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Wallet className="h-6 w-6" />
                  <span>Управление кошельком</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Target className="h-6 w-6" />
                  <span>Миссии</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>DAO голосования</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Кошелек */}
        <TabsContent value="wallet" className="mt-6 space-y-6">
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Информация о кошельке
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Балансы токенов</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span>VOD</span>
                      <span className="font-medium">1,250.50</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span>VOD_Uzbekistan</span>
                      <span className="font-medium">432.18</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span>H2O</span>
                      <span className="font-medium">678.92</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Активные стейкинги</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">VOD Стейкинг</span>
                        <Badge variant="outline" className="text-green-500 border-green-500/30">
                          Активен
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Сумма:</span>
                          <span>500 VOD</span>
                        </div>
                        <div className="flex justify-between">
                          <span>APY:</span>
                          <span>12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Осталось:</span>
                          <span>45 дней</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">H2O Стейкинг</span>
                        <Badge variant="outline" className="text-blue-500 border-blue-500/30">
                          Активен
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Сумма:</span>
                          <span>1000 H2O</span>
                        </div>
                        <div className="flex justify-between">
                          <span>APY:</span>
                          <span>8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Осталось:</span>
                          <span>12 дней</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Активность */}
        <TabsContent value="activity" className="mt-6">
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                История активности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10"
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />

                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-foreground/60">
                        {new Date(activity.timestamp).toLocaleDateString('ru-RU')}
                      </p>
                    </div>

                    {activity.tokensEarned && (
                      <div className="text-right">
                        <p className="font-medium text-green-500">
                          +{activity.tokensEarned} токенов
                        </p>
                      </div>
                    )}

                    <ChevronRight className="h-4 w-4 text-foreground/40" />
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Экспорт истории
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Настройки */}
        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Профиль
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Edit className="h-4 w-4" />
                  Редактировать профиль
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Eye className="h-4 w-4" />
                  Настройки приватности
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Upload className="h-4 w-4" />
                  Загрузить аватар
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Lock className="h-4 w-4" />
                  Изменить пароль
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Shield className="h-4 w-4" />
                  Двухфакторная аутентификация
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Activity className="h-4 w-4" />
                  Активные сессии
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Уведомления
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bell className="h-4 w-4" />
                  Email уведомления
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bell className="h-4 w-4" />
                  Push уведомления
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bell className="h-4 w-4" />
                  DAO уведомления
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Данные
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Экспорт данных
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Upload className="h-4 w-4" />
                  Импорт данных
                </Button>
                <Button variant="destructive" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  Удалить аккаунт
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}