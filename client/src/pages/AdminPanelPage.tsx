
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldAlert, Users, Database, Settings, BarChart3, Bell, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";

export default function AdminPanelPage() {
  const { user } = useAuth();

  // Проверяем, является ли пользователь администратором
  if (!user || user.role !== 'admin') {
    return <Redirect to="/" />;
  }

  const adminStats = [
    { label: "Всего пользователей", value: "1,247", icon: Users, color: "bg-blue-500" },
    { label: "Активные проекты", value: "23", icon: Database, color: "bg-green-500" },
    { label: "Открытые голосования", value: "5", icon: BarChart3, color: "bg-orange-500" },
    { label: "Системные уведомления", value: "12", icon: Bell, color: "bg-red-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="hexagon h-12 w-12 bg-gradient-to-r from-primary/30 to-secondary/30 
            flex items-center justify-center">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">Панель администратора</h1>
            <p className="text-foreground/70">Добро пожаловать, {user.firstName} {user.lastName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Главный администратор
          </Badge>
          <Badge variant="outline">ID: 00770017</Badge>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => (
          <Card key={index} className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/70">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Управление пользователями */}
        <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Управление пользователями
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">
              Управление учетными записями пользователей, ролями и правами доступа.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Просмотр пользователей</Button>
              <Button variant="outline" size="sm">Модерация</Button>
              <Button variant="outline" size="sm">Роли и права</Button>
            </div>
          </CardContent>
        </Card>

        {/* Управление контентом */}
        <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Управление контентом
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">
              Модерация проектов, голосований и контента платформы.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Проекты</Button>
              <Button variant="outline" size="sm">Голосования</Button>
              <Button variant="outline" size="sm">Группы</Button>
            </div>
          </CardContent>
        </Card>

        {/* Системные настройки */}
        <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Системные настройки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">
              Конфигурация системы, резервное копирование и обновления.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Конфигурация</Button>
              <Button variant="outline" size="sm">Резервные копии</Button>
              <Button variant="outline" size="sm">Логи</Button>
            </div>
          </CardContent>
        </Card>

        {/* Аналитика */}
        <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Аналитика и отчеты
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">
              Статистика платформы, отчеты по активности и производительности.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Статистика</Button>
              <Button variant="outline" size="sm">Отчеты</Button>
              <Button variant="outline" size="sm">Мониторинг</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Быстрые действия */}
      <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 justify-start" variant="outline">
              <div className="text-left">
                <div className="font-semibold">Создать объявление</div>
                <div className="text-sm text-foreground/70">Системное уведомление для всех пользователей</div>
              </div>
            </Button>
            <Button className="h-auto p-4 justify-start" variant="outline">
              <div className="text-left">
                <div className="font-semibold">Экстренная модерация</div>
                <div className="text-sm text-foreground/70">Проверка контента требующего внимания</div>
              </div>
            </Button>
            <Button className="h-auto p-4 justify-start" variant="outline">
              <div className="text-left">
                <div className="font-semibold">Техническое обслуживание</div>
                <div className="text-sm text-foreground/70">Планирование и выполнение обновлений</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
