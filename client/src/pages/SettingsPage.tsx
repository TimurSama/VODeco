
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Wallet,
  Eye,
  Lock,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Save,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    dao: true,
    missions: true,
    trading: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showActivity: false,
    allowContacts: true,
    dataAnalytics: false
  });

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleSaveSettings = () => {
    // Логика сохранения настроек
    console.log("Settings saved");
  };

  const handleExportData = () => {
    // Логика экспорта данных
    console.log("Data export initiated");
  };

  const handleDeleteAccount = () => {
    // Логика удаления аккаунта
    console.log("Account deletion requested");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mb-4">
              <Settings className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">Настройки</CardTitle>
            <p className="text-foreground/60 mt-2">
              Управление параметрами платформы и персональными предпочтениями
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Профиль</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Уведомления</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Приватность</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Внешний вид</span>
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Кошелек</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Расширенные</span>
              </TabsTrigger>
            </TabsList>

            {/* Профиль */}
            <TabsContent value="profile" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Личная информация
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="fullName">Полное имя</Label>
                        <Input id="fullName" placeholder="Введите ваше полное имя" />
                      </div>
                      
                      <div>
                        <Label htmlFor="username">Имя пользователя</Label>
                        <Input id="username" placeholder="username" />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">О себе</Label>
                        <Textarea 
                          id="bio" 
                          placeholder="Расскажите о себе, вашем опыте в области водных ресурсов..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Региональные настройки
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="language">Язык</Label>
                        <Select onValueChange={handleLanguageChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите язык" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ru">Русский</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="uz">O'zbek</SelectItem>
                            <SelectItem value="kz">Қазақ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="timezone">Часовой пояс</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите часовой пояс" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc+3">UTC+3 (Москва)</SelectItem>
                            <SelectItem value="utc+5">UTC+5 (Ташкент)</SelectItem>
                            <SelectItem value="utc+6">UTC+6 (Алматы)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="currency">Валюта</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите валюту" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="rub">RUB</SelectItem>
                            <SelectItem value="uzs">UZS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Уведомления */}
            <TabsContent value="notifications" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Настройки уведомлений
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Способы доставки</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <div>
                            <Label>Email уведомления</Label>
                            <p className="text-sm text-foreground/60">Получать уведомления на почту</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <div>
                            <Label>Push уведомления</Label>
                            <p className="text-sm text-foreground/60">Браузерные уведомления</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <div>
                            <Label>SMS уведомления</Label>
                            <p className="text-sm text-foreground/60">Важные уведомления по SMS</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Типы уведомлений</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>DAO голосования</Label>
                          <p className="text-sm text-foreground/60">Новые предложения и результаты</p>
                        </div>
                        <Switch 
                          checked={notifications.dao}
                          onCheckedChange={(checked) => setNotifications({...notifications, dao: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Миссии</Label>
                          <p className="text-sm text-foreground/60">Новые задания и награды</p>
                        </div>
                        <Switch 
                          checked={notifications.missions}
                          onCheckedChange={(checked) => setNotifications({...notifications, missions: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Торговля</Label>
                          <p className="text-sm text-foreground/60">Изменения цен токенов</p>
                        </div>
                        <Switch 
                          checked={notifications.trading}
                          onCheckedChange={(checked) => setNotifications({...notifications, trading: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Приватность */}
            <TabsContent value="privacy" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Настройки приватности
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-primary" />
                      <div>
                        <Label>Видимость профиля</Label>
                        <p className="text-sm text-foreground/60">Показывать профиль другим пользователям</p>
                      </div>
                    </div>
                    <Switch 
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-primary" />
                      <div>
                        <Label>Показывать активность</Label>
                        <p className="text-sm text-foreground/60">Отображать последнее время входа</p>
                      </div>
                    </div>
                    <Switch 
                      checked={privacy.showActivity}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showActivity: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <Label>Разрешить добавление в контакты</Label>
                        <p className="text-sm text-foreground/60">Другие пользователи могут добавлять вас</p>
                      </div>
                    </div>
                    <Switch 
                      checked={privacy.allowContacts}
                      onCheckedChange={(checked) => setPrivacy({...privacy, allowContacts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-primary" />
                      <div>
                        <Label>Аналитика данных</Label>
                        <p className="text-sm text-foreground/60">Разрешить сбор анонимной статистики</p>
                      </div>
                    </div>
                    <Switch 
                      checked={privacy.dataAnalytics}
                      onCheckedChange={(checked) => setPrivacy({...privacy, dataAnalytics: checked})}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Внешний вид */}
            <TabsContent value="appearance" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Настройки внешнего вида
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Тема</h4>
                    
                    <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        {isDarkTheme ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                        <div>
                          <Label>Темная тема</Label>
                          <p className="text-sm text-foreground/60">Использовать темную цветовую схему</p>
                        </div>
                      </div>
                      <Switch 
                        checked={isDarkTheme}
                        onCheckedChange={setIsDarkTheme}
                      />
                    </div>
                    
                    <div>
                      <Label>Цветовая схема</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        <div className="h-12 w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg cursor-pointer border-2 border-primary"></div>
                        <div className="h-12 w-full bg-gradient-to-r from-green-500 to-teal-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-primary/50"></div>
                        <div className="h-12 w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-primary/50"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Интерфейс</h4>
                    
                    <div>
                      <Label>Размер шрифта</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите размер" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Маленький</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="large">Большой</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Анимации</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Настройки анимации" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все анимации</SelectItem>
                          <SelectItem value="essential">Только важные</SelectItem>
                          <SelectItem value="none">Отключить</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Кошелек */}
            <TabsContent value="wallet" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Настройки кошелька
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Безопасность</h4>
                    
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Изменить PIN-код
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Переподключить кошелек
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Резервная копия ключей
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Автоматизация</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Автостейкинг</Label>
                          <p className="text-sm text-foreground/60">Автоматически стейкать VOD токены</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Реинвестирование</Label>
                          <p className="text-sm text-foreground/60">Автоматически реинвестировать доходы</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Расширенные */}
            <TabsContent value="advanced" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Расширенные настройки
                </h3>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Данные аккаунта</h4>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Экспорт данных
                      </Button>
                      
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Импорт настроек
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Опасная зона
                    </h4>
                    
                    <div className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-destructive">Удаление аккаунта</Label>
                          <p className="text-sm text-foreground/60">
                            Удаление аккаунта необратимо. Все данные, токены и история будут утеряны.
                          </p>
                        </div>
                        
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteAccount}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Удалить аккаунт
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Отменить
            </Button>
            <Button onClick={handleSaveSettings} className="flex items-center gap-2 text-blue-900 hover:text-blue-800">
              <Save className="h-4 w-4" />
              Сохранить настройки
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
