
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  UserCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit,
  Save,
  X,
  Camera,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Users,
  Activity
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  specialization: string;
  experience: number;
  education: string;
  achievements: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    specialization: '',
    experience: 0,
    education: '',
    achievements: [],
    socialLinks: {}
  });

  const [stats, setStats] = useState({
    projectsCompleted: 12,
    tokensEarned: 2450,
    daoVotes: 34,
    stakingAmount: 1500,
    trustScore: 85,
    communityRank: 'Advanced'
  });

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateUser({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email
      });
      
      // Здесь будет сохранение дополнительной информации профиля
      // await updateUserProfile(profile);
      
      setIsEditing(false);
      toast({
        title: "Профиль обновлен",
        description: "Ваши изменения успешно сохранены"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить изменения",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Заголовок профиля */}
      <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Аватар */}
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Основная информация */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-primary">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-foreground/60 text-lg">{profile.specialization || 'Участник VODeco'}</p>
                </div>
                
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="gap-2"
                  variant={isEditing ? "default" : "outline"}
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </Button>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.projectsCompleted}</div>
                  <div className="text-sm text-foreground/60">Проектов</div>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.tokensEarned}</div>
                  <div className="text-sm text-foreground/60">Токенов</div>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.trustScore}%</div>
                  <div className="text-sm text-foreground/60">Доверие</div>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <Badge variant="outline" className="text-primary border-primary/30">
                    {stats.communityRank}
                  </Badge>
                  <div className="text-sm text-foreground/60 mt-1">Ранг</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Детальная информация */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Личное</TabsTrigger>
          <TabsTrigger value="professional">Карьера</TabsTrigger>
          <TabsTrigger value="achievements">Достижения</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
        </TabsList>

        {/* Личная информация */}
        <TabsContent value="personal" className="mt-6">
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-primary" />
                Личная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    placeholder="+7 (xxx) xxx-xx-xx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Местоположение</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Город, Страна"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Расскажите о себе, ваших интересах и целях в VODeco..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Профессиональная информация */}
        <TabsContent value="professional" className="mt-6">
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Профессиональная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Специализация</Label>
                  <Input
                    id="specialization"
                    value={profile.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Водные технологии, Экология, IT..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Опыт работы (лет)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={profile.experience}
                    onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                    min="0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="education">Образование</Label>
                <Textarea
                  id="education"
                  value={profile.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Учебные заведения, степени, сертификаты..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Достижения */}
        <TabsContent value="achievements" className="mt-6">
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Достижения и награды
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <h4 className="font-medium">Эко-новатор</h4>
                  </div>
                  <p className="text-sm text-foreground/60">За участие в 10+ экологических проектах</p>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-6 w-6 text-blue-500" />
                    <h4 className="font-medium">Активный участник</h4>
                  </div>
                  <p className="text-sm text-foreground/60">За активность в DAO голосованиях</p>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-6 w-6 text-green-500" />
                    <h4 className="font-medium">Лидер сообщества</h4>
                  </div>
                  <p className="text-sm text-foreground/60">За наставничество новых участников</p>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="h-6 w-6 text-purple-500" />
                    <h4 className="font-medium">Стейкинг мастер</h4>
                  </div>
                  <p className="text-sm text-foreground/60">За долгосрочный стейкинг токенов</p>
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
                Последняя активность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Участие в голосовании</p>
                    <p className="text-sm text-foreground/60">Проголосовали за "Водоочистка Алматы"</p>
                  </div>
                  <span className="text-sm text-foreground/60">2 часа назад</span>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Стейкинг токенов</p>
                    <p className="text-sm text-foreground/60">Застейкали 500 VOD токенов</p>
                  </div>
                  <span className="text-sm text-foreground/60">1 день назад</span>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Завершение миссии</p>
                    <p className="text-sm text-foreground/60">Получили 75 токенов за сбор данных</p>
                  </div>
                  <span className="text-sm text-foreground/60">3 дня назад</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
