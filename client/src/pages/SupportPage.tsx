
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  LifeBuoy, Send, MessageSquare, Mail, Phone, MapPin, 
  Globe, Users, Building, ExternalLink
} from "lucide-react";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Отправка в админ кабинет
    console.log('Support request:', formData);
    // Сброс формы
    setFormData({
      name: '',
      email: '',
      category: '',
      subject: '',
      message: ''
    });
  };

  const socialLinks = [
    { name: 'X (Twitter)', icon: '𝕏', url: '#', color: 'text-gray-600' },
    { name: 'Instagram', icon: '📷', url: '#', color: 'text-pink-500' },
    { name: 'Telegram', icon: '✈️', url: '#', color: 'text-blue-500' },
    { name: 'Facebook', icon: '📘', url: '#', color: 'text-blue-600' },
    { name: 'LinkedIn', icon: '💼', url: '#', color: 'text-blue-700' }
  ];

  const regionalOffices = [
    { city: 'Нью-Йорк', country: 'США', emoji: '🇺🇸', contact: 'ny@vodeco.org' },
    { city: 'Ташкент', country: 'Узбекистан', emoji: '🇺🇿', contact: 'tashkent@vodeco.org' },
    { city: 'Минск', country: 'Беларусь', emoji: '🇧🇾', contact: 'minsk@vodeco.org' },
    { city: 'Иерусалим', country: 'Израиль', emoji: '🇮🇱', contact: 'jerusalem@vodeco.org' },
    { city: 'Варшава', country: 'Польша', emoji: '🇵🇱', contact: 'warsaw@vodeco.org' },
    { city: 'Берлин', country: 'Германия', emoji: '🇩🇪', contact: 'berlin@vodeco.org' },
    { city: 'Лондон', country: 'Великобритания', emoji: '🇬🇧', contact: 'london@vodeco.org' },
    { city: 'Пекин', country: 'Китай', emoji: '🇨🇳', contact: 'beijing@vodeco.org' },
    { city: 'Сингапур', country: 'Сингапур', emoji: '🇸🇬', contact: 'singapore@vodeco.org' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Заголовок */}
      <Card className="w-full border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mb-4">
              <LifeBuoy className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Центр поддержки</h1>
            <p className="text-foreground/80 mt-2">
              Мы здесь, чтобы помочь вам с любыми вопросами по платформе VODeco
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Форма обращения */}
        <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <MessageSquare className="h-5 w-5" />
              Отправить обращение
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ваше имя"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Категория обращения</Label>
                <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Техническая поддержка</SelectItem>
                    <SelectItem value="account">Проблемы с аккаунтом</SelectItem>
                    <SelectItem value="projects">Вопросы по проектам</SelectItem>
                    <SelectItem value="dao">DAO и голосования</SelectItem>
                    <SelectItem value="tokens">Токены и кошелек</SelectItem>
                    <SelectItem value="partnership">Партнерство</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Тема *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Кратко опишите проблему"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Сообщение *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Подробно опишите вашу проблему или вопрос..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Отправить обращение
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Контактная информация */}
        <div className="space-y-6">
          {/* Социальные сети */}
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Globe className="h-5 w-5" />
                Социальные сети
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    className="justify-start border-primary/20 hover:bg-primary/10"
                    asChild
                  >
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <span className="text-lg mr-2">{social.icon}</span>
                      {social.name}
                      <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                    </a>
                  </Button>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <Button
                variant="outline"
                className="w-full justify-start border-primary/20 hover:bg-primary/10"
                asChild
              >
                <a href="/groups" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Наши группы и сообщества
                  <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Быстрые контакты */}
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Phone className="h-5 w-5" />
                Быстрые контакты
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email поддержка</p>
                  <p className="text-sm text-foreground/60">support@vodeco.org</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                <MessageSquare className="h-5 w-5 text-secondary" />
                <div>
                  <p className="font-medium">Telegram бот</p>
                  <p className="text-sm text-foreground/60">@vodeco_support_bot</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Региональные представители */}
      <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Building className="h-5 w-5" />
            Региональные представители
          </CardTitle>
          <p className="text-foreground/60">
            Свяжитесь с нашими представителями в вашем регионе
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionalOffices.map((office) => (
              <Card key={office.city} className="border border-primary/10 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{office.emoji}</span>
                    <div>
                      <h4 className="font-medium">{office.city}</h4>
                      <p className="text-sm text-foreground/60">{office.country}</p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="w-full justify-center">
                    <Mail className="h-3 w-3 mr-1" />
                    {office.contact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Дополнительная информация */}
      <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-primary">Время ответа</h3>
            <p className="text-foreground/80">
              Мы стараемся отвечать на все обращения в течение 24 часов в рабочие дни
            </p>
            <p className="text-sm text-foreground/60">
              Для срочных вопросов используйте Telegram бот для быстрой связи
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
