import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AlertCircle, Award, Bluetooth, CheckCircle, Clock, MapPin, Send, Upload, Droplet, FileText, Camera, Microscope, Brain, AlertTriangle, Landmark, Share2 } from "lucide-react";

export default function MissionsPage() {
  const [activeTab, setActiveTab] = useState("missions");
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [deviceData, setDeviceData] = useState<null | {
    ph: number;
    turbidity: number;
    temperature: number;
  }>(null);

  // Имитация подключения устройства
  const connectDevice = () => {
    setDeviceConnected(true);
    setDeviceData({
      ph: 7.2,
      turbidity: 12,
      temperature: 18.5,
    });
  };

  // Имитация отправки данных в DAO
  const sendDataToDAO = () => {
    alert("Данные отправлены в DAO. Начислено 15 VOD токенов!");
    setDeviceConnected(false);
    setDeviceData(null);
  };

  // Список миссий
  const missions = [
    {
      id: 1,
      title: "Отметь загрязнение на карте",
      description: "Найди и отметь места загрязнения водоёмов на интерактивной карте",
      reward: 10,
      progress: 0,
      completed: false,
      deadline: "2025-06-01",
      icon: MapPin,
    },
    {
      id: 2,
      title: "Отправь фото местного водоёма",
      description: "Сделай и загрузи качественные фотографии ближайшего водного объекта",
      reward: 15,
      progress: 0,
      completed: false,
      deadline: "2025-06-10",
      icon: Camera,
    },
    {
      id: 3,
      title: "Проведи замер с анализатором",
      description: "Используй специальное устройство для анализа качества воды",
      reward: 25,
      progress: 0,
      completed: false,
      deadline: "2025-06-15",
      icon: Microscope,
    },
    {
      id: 4,
      title: "Участвуй в разработке (DAO-предложения)",
      description: "Предложи и проголосуй за инициативы в DAO",
      reward: 50,
      progress: 30,
      completed: false,
      deadline: "2025-06-30",
      icon: Landmark,
    },
    {
      id: 5,
      title: "Пройди обучение / викторину",
      description: "Изучи материалы и пройди тест на знание водных ресурсов",
      reward: 20,
      progress: 60,
      completed: false,
      deadline: "2025-06-05",
      icon: Brain,
    },
    {
      id: 6,
      title: "Сообщи о проблеме в регионе",
      description: "Опиши экологическую проблему в твоём регионе, требующую внимания",
      reward: 15,
      progress: 0,
      completed: false,
      deadline: "2025-06-20",
      icon: AlertTriangle,
    },
    {
      id: 7,
      title: "Поделись данными о водопользовании",
      description: "Предоставь информацию о водопользовании в твоём районе",
      reward: 15,
      progress: 0,
      completed: false,
      deadline: "2025-06-25",
      icon: Share2,
    },
  ];

  // Расчет прогресса до следующей награды
  const completedMissions = missions.filter((m) => m.completed).length;
  const totalMissions = missions.length;
  const airdropProgress = Math.floor((completedMissions / totalMissions) * 100);

  // Лента активности DAO
  const daoActivities = [
    {
      id: 1,
      user: "Анна",
      location: "Киев",
      action: "добавила замеры воды",
      time: "2 часа назад",
    },
    {
      id: 2,
      user: "Иван",
      location: "Волга",
      action: "отметил загрязнение",
      time: "5 часов назад",
    },
    {
      id: 3,
      user: "Мария",
      location: "Сочи",
      action: "выполнила миссию по фотографиям",
      time: "вчера",
    },
    {
      id: 4,
      user: "Алексей",
      location: "Байкал",
      action: "предложил новую инициативу",
      time: "2 дня назад",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Миссии</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground">
            Уровень: 3
          </Badge>
          <Badge variant="outline" className="bg-primary/20 text-primary-foreground">
            XP: 450/1000
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="missions" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="missions">Миссии</TabsTrigger>
          <TabsTrigger value="devices">Устройства</TabsTrigger>
          <TabsTrigger value="rewards">Награды</TabsTrigger>
          <TabsTrigger value="feedback">Обратная связь</TabsTrigger>
        </TabsList>

        {/* Раздел миссий */}
        <TabsContent value="missions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {missions.map((mission) => (
              <Card key={mission.id} className="overflow-hidden border border-primary/10 glassmorphism-dark hover:border-primary/30 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <mission.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-md">{mission.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {mission.reward} VOD
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">{mission.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-xs text-foreground/70 mb-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>До {new Date(mission.deadline).toLocaleDateString()}</span>
                    </div>
                    <div>{mission.progress}%</div>
                  </div>
                  <Progress value={mission.progress} className="h-1" />
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={mission.completed ? "outline" : "default"} 
                    size="sm" 
                    className="w-full"
                  >
                    {mission.completed ? (
                      <><CheckCircle className="h-4 w-4 mr-1" /> Выполнено</>
                    ) : (
                      <>Начать</>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="border border-primary/10 glassmorphism-dark">
            <CardHeader>
              <CardTitle className="text-lg">Лента активности</CardTitle>
              <CardDescription>Что делают другие участники DAO</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {daoActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-primary/5">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Droplet className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> из{" "}
                        <span className="text-primary">{activity.location}</span> {activity.action}
                      </p>
                      <p className="text-xs text-foreground/60">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Раздел устройств */}
        <TabsContent value="devices" className="space-y-4">
          <Card className="border border-primary/10 glassmorphism-dark">
            <CardHeader>
              <CardTitle className="text-lg">Набор экспедитора</CardTitle>
              <CardDescription>
                Запросите специальное оборудование для участия в программе мониторинга
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки</Label>
                <Input id="address" placeholder="Ваш полный адрес для доставки" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivation">Мотивация</Label>
                <Textarea
                  id="motivation"
                  placeholder="Опишите, почему вы хотите получить набор и как планируете его использовать"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Предыдущий опыт</Label>
                <Textarea
                  id="experience"
                  placeholder="Опишите ваш опыт в экологических проектах (если есть)"
                  rows={3}
                />
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Запросить набор
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-primary/10 glassmorphism-dark">
            <CardHeader>
              <CardTitle className="text-lg">Синхронизация устройства</CardTitle>
              <CardDescription>
                Подключите ваше устройство для отправки данных в DAO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bluetooth className={`h-5 w-5 ${deviceConnected ? "text-primary" : "text-foreground/60"}`} />
                  <span>Bluetooth-соединение</span>
                </div>
                <Button 
                  variant={deviceConnected ? "outline" : "default"} 
                  size="sm"
                  onClick={connectDevice}
                  disabled={deviceConnected}
                >
                  {deviceConnected ? "Подключено" : "Подключить"}
                </Button>
              </div>

              {deviceConnected && deviceData && (
                <div className="space-y-4 mt-4 p-4 border border-primary/10 rounded-lg bg-primary/5">
                  <h3 className="font-medium">Полученные данные:</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-foreground/60">pH воды</p>
                      <p className="text-lg font-medium">{deviceData.ph}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Мутность (NTU)</p>
                      <p className="text-lg font-medium">{deviceData.turbidity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Температура (°C)</p>
                      <p className="text-lg font-medium">{deviceData.temperature}</p>
                    </div>
                  </div>
                  <Button className="w-full" onClick={sendDataToDAO}>
                    <Upload className="h-4 w-4 mr-2" />
                    Отправить в DAO
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Раздел наград */}
        <TabsContent value="rewards" className="space-y-4">
          <Card className="border border-primary/10 glassmorphism-dark">
            <CardHeader>
              <CardTitle className="text-lg">Airdrop & Награды</CardTitle>
              <CardDescription>
                Получайте VOD токены за активное участие в развитии экосистемы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Прогресс до следующей награды</span>
                  <span className="text-primary">{completedMissions}/{totalMissions} миссий</span>
                </div>
                <Progress value={airdropProgress} className="h-2" />
                <p className="text-xs text-foreground/60">
                  Выполните еще {totalMissions - completedMissions} миссий для получения 100 VOD токенов
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Условия начисления:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Выполненные миссии</span>
                    <Badge variant="outline" className="bg-primary/10">
                      {completedMissions} из {totalMissions}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Участие в голосованиях</span>
                    <Badge variant="outline" className="bg-primary/10">
                      2 из 5
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Репутация в DAO</span>
                    <Badge variant="outline" className="bg-primary/10">
                      120 XP
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full" disabled={airdropProgress < 100}>
                  <Award className="h-4 w-4 mr-2" />
                  Получить VOD
                </Button>
                <p className="text-xs text-center mt-2 text-foreground/60">
                  {airdropProgress < 100
                    ? `Доступно после выполнения всех миссий`
                    : `Награда готова к получению!`}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-primary/10 glassmorphism-dark">
            <CardHeader>
              <CardTitle className="text-lg">История наград</CardTitle>
              <CardDescription>Ваши полученные награды в системе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-primary/5">
                  <div>
                    <h4 className="font-medium">Выполнение 5 миссий</h4>
                    <p className="text-xs text-foreground/60">15 мая 2025</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    50 VOD
                  </Badge>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-primary/5">
                  <div>
                    <h4 className="font-medium">Первый анализ воды</h4>
                    <p className="text-xs text-foreground/60">10 мая 2025</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    25 VOD
                  </Badge>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-primary/5">
                  <div>
                    <h4 className="font-medium">Регистрация в системе</h4>
                    <p className="text-xs text-foreground/60">1 мая 2025</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    10 VOD
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Раздел обратной связи */}
        <TabsContent value="feedback" className="space-y-4">
          <Card className="border border-primary/10 glassmorphism-dark">
            <CardHeader>
              <CardTitle className="text-lg">Сообщить о проблеме</CardTitle>
              <CardDescription>
                Ваше сообщение будет рассмотрено участниками DAO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Тип обращения</Label>
                <select
                  id="feedback-type"
                  className="w-full p-2 rounded-md border border-input bg-transparent text-sm"
                >
                  <option value="pollution">Сообщить о загрязнении</option>
                  <option value="object-issue">Проблема с объектом</option>
                  <option value="tech-error">Техническая ошибка</option>
                  <option value="idea">Идея / предложение</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-title">Заголовок</Label>
                <Input id="feedback-title" placeholder="Краткое описание проблемы" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-description">Описание</Label>
                <Textarea
                  id="feedback-description"
                  placeholder="Подробно опишите проблему или предложение"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-location">Местоположение (если применимо)</Label>
                <Input id="feedback-location" placeholder="Укажите местоположение проблемы" />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="feedback-attachment" className="cursor-pointer text-primary">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>Прикрепить файл</span>
                  </div>
                </Label>
                <input type="file" id="feedback-attachment" className="hidden" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="feedback-anonymous" />
                <Label htmlFor="feedback-anonymous">Отправить анонимно</Label>
              </div>

              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Отправить обращение
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-primary/10 glassmorphism-dark">
            <CardHeader>
              <CardTitle className="text-lg">Статус обращений</CardTitle>
              <CardDescription>История ваших обращений и их статус</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b border-primary/5">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Загрязнение в парке Горького</h4>
                    <p className="text-xs text-foreground/60">Отправлено: 18 мая 2025</p>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 mt-1">
                      В обработке
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-primary/5">
                  <AlertCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Предложение по улучшению интерфейса</h4>
                    <p className="text-xs text-foreground/60">Отправлено: 10 мая 2025</p>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 mt-1">
                      Решено
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-primary/5">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Ошибка в мобильном приложении</h4>
                    <p className="text-xs text-foreground/60">Отправлено: 5 мая 2025</p>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 mt-1">
                      Отклонено
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}