
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  Droplets, 
  MapPin, 
  Award, 
  Coins, 
  Calendar,
  ShoppingCart,
  FileText,
  Zap,
  Users,
  TrendingUp,
  Settings,
  Bell,
  CheckCircle,
  Clock,
  Package
} from "lucide-react";

const VODCheckPage: React.FC = () => {
  const [preorderCount, setPreorderCount] = useState(1);
  const [userEmail, setUserEmail] = useState('');
  const [preorderSubmitted, setPreorderSubmitted] = useState(false);

  const handlePreorder = () => {
    if (userEmail && preorderCount > 0) {
      setPreorderSubmitted(true);
      // TODO: Отправить данные предзаказа на сервер
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary to-secondary 
            flex items-center justify-center">
            <Smartphone className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">VOD Check</h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Мобильное приложение "Проверяй и зарабатывай" - революционный подход к мониторингу качества воды 
          с игровыми механиками и NFT достижениями
        </p>
        <Badge variant="outline" className="mt-4 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          В разработке • Предзаказ открыт
        </Badge>
      </div>

      {/* Основные функции */}
      <Tabs defaultValue="mechanics" className="w-full">
        <TabsList className="w-full bg-background/20 p-1 grid grid-cols-4">
          <TabsTrigger value="mechanics">Механики</TabsTrigger>
          <TabsTrigger value="features">Функции</TabsTrigger>
          <TabsTrigger value="sensors">IoT Датчики</TabsTrigger>
          <TabsTrigger value="preorder">Предзаказ</TabsTrigger>
        </TabsList>

        {/* Игровые механики */}
        <TabsContent value="mechanics" className="mt-6 space-y-6">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Award className="h-5 w-5" />
                Игровые механики "Проверяй и зарабатывай"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-background/30 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Droplets className="h-8 w-8 text-blue-500" />
                    <h3 className="font-semibold">Анализ воды</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    Проведите анализ воды с помощью тест-полосок или IoT датчиков и загрузите результаты
                  </p>
                  <div className="text-primary font-medium">+10-50 VOD за анализ</div>
                </div>

                <div className="p-4 bg-background/30 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-8 w-8 text-green-500" />
                    <h3 className="font-semibold">Геолокация</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    Точные координаты места анализа создают достоверную карту качества воды
                  </p>
                  <div className="text-primary font-medium">+5 VOD за геотеги</div>
                </div>

                <div className="p-4 bg-background/30 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <h3 className="font-semibold">NFT Достижения</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    Получайте уникальные NFT за регулярность, качество данных и специальные достижения
                  </p>
                  <div className="text-primary font-medium">Редкие NFT</div>
                </div>

                <div className="p-4 bg-background/30 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-8 w-8 text-purple-500" />
                    <h3 className="font-semibold">Лидерборды</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    Соревнуйтесь с другими пользователями по городам, регионам и странам
                  </p>
                  <div className="text-primary font-medium">Еженедельные призы</div>
                </div>

                <div className="p-4 bg-background/30 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-8 w-8 text-cyan-500" />
                    <h3 className="font-semibold">Система уровней</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    Повышайте свой уровень эколога и получайте доступ к эксклюзивным функциям
                  </p>
                  <div className="text-primary font-medium">20 уровней</div>
                </div>

                <div className="p-4 bg-background/30 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Coins className="h-8 w-8 text-orange-500" />
                    <h3 className="font-semibold">Обучающие игры</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    Специальные игровые модули для детей с экологическими сценариями
                  </p>
                  <div className="text-primary font-medium">Семейные награды</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Функции приложения */}
        <TabsContent value="features" className="mt-6 space-y-6">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Smartphone className="h-5 w-5" />
                Основные функции приложения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Анализ и мониторинг</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Анализ воды через тест-полоски
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Подключение IoT датчиков
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Автоматическая геолокация
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Загрузка фото и видео
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Голосовые комментарии
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Награды и токены</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Заработок VOD токенов
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        NFT достижения и бейджи
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Еженедельные конкурсы
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Региональные лидерборды
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Реферальная программа
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-lg mb-3">Уникальные возможности</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <h5 className="font-medium">Отчеты экспертам</h5>
                      <p className="text-xs text-foreground/60">Данные передаются в ЮНИСЕФ, ВОЗ, Water.org</p>
                    </div>
                    <div className="text-center">
                      <Bell className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <h5 className="font-medium">Экстренные уведомления</h5>
                      <p className="text-xs text-foreground/60">Оповещения о критических загрязнениях</p>
                    </div>
                    <div className="text-center">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <h5 className="font-medium">ИИ анализ</h5>
                      <p className="text-xs text-foreground/60">Автоматическое выявление аномалий</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IoT Датчики */}
        <TabsContent value="sensors" className="mt-6 space-y-6">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Zap className="h-5 w-5" />
                IoT Датчики VODeco (В производстве)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold text-yellow-500">Статус производства</h3>
                    <p className="text-sm">Датчики находятся в стадии производства и тестирования</p>
                  </div>
                </div>
                <Progress value={65} className="mb-4" />
                <p className="text-sm text-foreground/80">
                  Ожидаемая дата выпуска: Q2 2025 • Принимаем предзаказы с скидкой 30%
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Технические характеристики</h4>
                  <div className="bg-background/30 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li><strong>pH:</strong> 0-14 (±0.1)</li>
                      <li><strong>TDS:</strong> 0-9999 ppm (±2%)</li>
                      <li><strong>Температура:</strong> -10°C до +60°C</li>
                      <li><strong>Растворенный кислород:</strong> 0-20 mg/L</li>
                      <li><strong>Мутность:</strong> 0-1000 NTU</li>
                      <li><strong>Проводимость:</strong> 0-9999 µS/cm</li>
                      <li><strong>Тяжелые металлы:</strong> Pb, Hg, Cd, As</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Умные функции</h4>
                  <div className="bg-background/30 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Автоматическая передача в блокчейн
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        GPS координаты и временные метки
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Солнечная батарея + резервная батарея
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        LoRaWAN / 4G / WiFi связь
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Самоочистка и калибровка
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Защита IP68 (полная герметичность)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                <h4 className="font-semibold text-lg mb-3">Будущая интеграция</h4>
                <p className="text-sm text-foreground/80 mb-4">
                  После завершения производства датчики будут автоматически интегрированы с приложением VOD Check 
                  и платформой VODeco для создания глобальной сети мониторинга качества воды в реальном времени.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-500">24/7</div>
                    <div className="text-xs">Мониторинг</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">±99%</div>
                    <div className="text-xs">Точность</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-500">5 лет</div>
                    <div className="text-xs">Гарантия</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Предзаказ */}
        <TabsContent value="preorder" className="mt-6 space-y-6">
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <ShoppingCart className="h-5 w-5" />
                Предзаказ IoT датчиков
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!preorderSubmitted ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Комплектация "Стандарт"</h4>
                      <div className="bg-background/30 p-4 rounded-lg border">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Цена при предзаказе:</span>
                          <div className="text-right">
                            <div className="line-through text-foreground/60">$899</div>
                            <div className="text-xl font-bold text-green-500">$629</div>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• Датчик качества воды</li>
                          <li>• Набор тест-полосок (100 шт)</li>
                          <li>• Мобильное приложение</li>
                          <li>• 1000 VOD токенов в подарок</li>
                          <li>• Эксклюзивный NFT "Early Adopter"</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Комплектация "Профессионал"</h4>
                      <div className="bg-background/30 p-4 rounded-lg border border-gold/30">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Цена при предзаказе:</span>
                          <div className="text-right">
                            <div className="line-through text-foreground/60">$1,599</div>
                            <div className="text-xl font-bold text-yellow-500">$1,119</div>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>• 3x Датчика качества воды</li>
                          <li>• Набор тест-полосок (500 шт)</li>
                          <li>• Портативная лаборатория</li>
                          <li>• 5000 VOD токенов в подарок</li>
                          <li>• Редкий NFT "Water Guardian"</li>
                          <li>• Приоритетная техподдержка</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                    <h4 className="font-semibold mb-4">Оформить предзаказ</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email для уведомлений</label>
                        <Input 
                          type="email"
                          placeholder="your@email.com"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Количество комплектов</label>
                        <Input 
                          type="number"
                          min="1"
                          max="10"
                          value={preorderCount}
                          onChange={(e) => setPreorderCount(parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-primary hover:bg-primary/90"
                      onClick={handlePreorder}
                      disabled={!userEmail}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Оформить предзаказ со скидкой 30%
                    </Button>
                    <p className="text-xs text-foreground/60 mt-2 text-center">
                      Оплата при получении • Отмена в любое время • Гарантия возврата средств
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Предзаказ принят!</h3>
                  <p className="text-foreground/80 mb-4">
                    Мы отправили подтверждение на {userEmail}
                  </p>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Номер заказа: #VOD-{Date.now().toString().slice(-6)}
                  </Badge>
                  <div className="mt-6 p-4 bg-background/30 rounded-lg">
                    <h4 className="font-medium mb-2">Что дальше?</h4>
                    <ul className="text-sm space-y-1 text-left max-w-md mx-auto">
                      <li>• Получите эксклюзивный NFT в течение 24 часов</li>
                      <li>• 1000 VOD токенов будут начислены на ваш кошелек</li>
                      <li>• Уведомления о ходе производства</li>
                      <li>• Приоритетная отправка при готовности</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VODCheckPage;
