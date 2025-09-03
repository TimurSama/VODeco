import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@shared/auth-schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CitizenCabinet from './CitizenCabinet';
import GovernmentCabinet from './GovernmentCabinet';
import InfrastructureCabinet from './InfrastructureCabinet';
import InvestorCabinet from './InvestorCabinet';
import ScientificCabinet from './ScientificCabinet';
import OperatorCabinet from './OperatorCabinet';
import { 
  Users, 
  Building, 
  Factory, 
  TrendingUp, 
  Microscope, 
  Settings,
  Crown,
  Shield,
  Award,
  Zap
} from 'lucide-react';

interface CabinetConfig {
  id: UserRole;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
  accessLevel: 'basic' | 'premium' | 'enterprise';
  isAvailable: boolean;
  requirements?: string[];
  component?: React.ComponentType<any>;
}

const cabinetConfigs: Record<UserRole, CabinetConfig> = {
  citizen: {
    id: 'citizen',
    name: 'Гражданский кабинет',
    description: 'Участвуйте в мониторинге качества воды, зарабатывайте токены и влияйте на решения сообщества',
    icon: Users,
    color: 'bg-blue-500',
    features: [
      'Мониторинг качества воды',
      'Геймификация и достижения',
      'Участие в голосованиях DAO',
      'Персональная статистика',
      'Социальные функции'
    ],
    accessLevel: 'basic',
    isAvailable: true,
    component: CitizenCabinet
  },
  government: {
    id: 'government',
    name: 'Правительственный кабинет',
    description: 'Управление политиками, координация между регионами и кризисное реагирование',
    icon: Building,
    color: 'bg-green-500',
    features: [
      'Управление политиками',
      'Межрегиональная координация',
      'Кризисное реагирование',
      'Аналитика и отчеты',
      'Регулирование и контроль'
    ],
    accessLevel: 'enterprise',
    isAvailable: true,
    requirements: ['Верификация документов', 'Официальное назначение'],
    component: GovernmentCabinet
  },
  infrastructure: {
    id: 'infrastructure',
    name: 'Инфраструктурный кабинет',
    description: 'Оптимизация операций с интеграцией IoT и предиктивным обслуживанием',
    icon: Factory,
    color: 'bg-orange-500',
    features: [
      'Управление активами',
      'IoT интеграция',
      'Предиктивное обслуживание',
      'Аналитика производительности',
      'Оптимизация ресурсов'
    ],
    accessLevel: 'premium',
    isAvailable: true,
    requirements: ['Лицензия оператора', 'Техническая экспертиза'],
    component: InfrastructureCabinet
  },
  investor: {
    id: 'investor',
    name: 'Инвестиционный кабинет',
    description: 'Доступ к инвестиционным возможностям и инструментам ESG-отчетности',
    icon: TrendingUp,
    color: 'bg-purple-500',
    features: [
      'Инвестиционная панель',
      'ESG отчетность',
      'Анализ рынка',
      'Оценка рисков',
      'Портфолио проектов'
    ],
    accessLevel: 'premium',
    isAvailable: true,
    requirements: ['Финансовая верификация', 'Минимальные инвестиции'],
    component: InvestorCabinet
  },
  scientific: {
    id: 'scientific',
    name: 'Научный кабинет',
    description: 'Проведение исследований, анализ данных и публикация научных работ',
    icon: Microscope,
    color: 'bg-indigo-500',
    features: [
      'Исследовательские инструменты',
      'Анализ данных',
      'Публикации и отчеты',
      'Коллаборации',
      'Доступ к архивам'
    ],
    accessLevel: 'premium',
    isAvailable: true,
    requirements: ['Научная степень', 'Верификация учреждения'],
    component: ScientificCabinet
  },
  operator: {
    id: 'operator',
    name: 'Операторский кабинет',
    description: 'Управление операциями, мониторинг систем и техническая поддержка',
    icon: Settings,
    color: 'bg-gray-500',
    features: [
      'Управление операциями',
      'Мониторинг систем',
      'Техническая поддержка',
      'Управление пользователями',
      'Системная аналитика'
    ],
    accessLevel: 'enterprise',
    isAvailable: true,
    requirements: ['Техническая сертификация', 'Административные права'],
    component: OperatorCabinet
  },
  admin: {
    id: 'admin',
    name: 'Административный кабинет',
    description: 'Полный контроль над платформой и управление системой',
    icon: Crown,
    color: 'bg-red-500',
    features: [
      'Полный системный контроль',
      'Управление пользователями',
      'Системная конфигурация',
      'Безопасность и аудит',
      'Разработка и развертывание'
    ],
    accessLevel: 'enterprise',
    isAvailable: true,
    requirements: ['Административные права', 'Системный доступ'],
    component: OperatorCabinet // Используем операторский кабинет как админский
  }
};

interface CabinetSwitcherProps {
  onCabinetChange: (cabinet: UserRole) => void;
  currentCabinet: UserRole;
}

export default function CabinetSwitcher({ onCabinetChange, currentCabinet }: CabinetSwitcherProps) {
  const { user } = useAuth();
  const [selectedCabinet, setSelectedCabinet] = useState<UserRole>(currentCabinet);

  const handleCabinetSelect = (cabinet: UserRole) => {
    if (cabinetConfigs[cabinet].isAvailable) {
      setSelectedCabinet(cabinet);
      onCabinetChange(cabinet);
    }
  };

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case 'basic': return <Shield className="w-4 h-4" />;
      case 'premium': return <Award className="w-4 h-4" />;
      case 'enterprise': return <Crown className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-gray-100 text-gray-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Выберите кабинет
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Каждый кабинет предоставляет уникальные возможности для вашей роли
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(cabinetConfigs).map((cabinet) => {
          const IconComponent = cabinet.icon;
          const isSelected = selectedCabinet === cabinet.id;
          const isAvailable = cabinet.isAvailable;
          const hasAccess = true; // Все кабинеты доступны в гостевом режиме для исследования

          return (
            <Card 
              key={cabinet.id}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
              } ${!isAvailable ? 'opacity-50' : ''}`}
              onClick={() => handleCabinetSelect(cabinet.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${cabinet.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cabinet.name}</CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={`${getAccessLevelColor(cabinet.accessLevel)} text-xs`}
                      >
                        {getAccessLevelIcon(cabinet.accessLevel)}
                        <span className="ml-1 capitalize">{cabinet.accessLevel}</span>
                      </Badge>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="text-blue-500">
                      <Zap className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="mb-4">
                  {cabinet.description}
                </CardDescription>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    Возможности:
                  </h4>
                  <ul className="space-y-1">
                    {cabinet.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                    {cabinet.features.length > 3 && (
                      <li className="text-xs text-gray-500 dark:text-gray-500">
                        +{cabinet.features.length - 3} еще
                      </li>
                    )}
                  </ul>
                </div>

                {cabinet.requirements && cabinet.requirements.length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h5 className="font-medium text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                      Требования для доступа:
                    </h5>
                    <ul className="space-y-1">
                      {cabinet.requirements.map((req, index) => (
                        <li key={index} className="text-xs text-yellow-700 dark:text-yellow-300">
                          • {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    disabled={!isAvailable}
                  >
                    {isSelected ? 'Активен' : 'Выбрать'}
                  </Button>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Гостевой режим
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Текущий кабинет: <span className="font-medium">{cabinetConfigs[selectedCabinet].name}</span>
        </p>
      </div>
    </div>
  );
}
