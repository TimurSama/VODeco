import React, { useState } from 'react';
import { UserRole } from '@shared/auth-schema';
import CabinetSwitcher from '@/components/cabinets/CabinetSwitcher';
import CitizenCabinet from '@/components/cabinets/CitizenCabinet';
import GovernmentCabinet from '@/components/cabinets/GovernmentCabinet';
import InfrastructureCabinet from '@/components/cabinets/InfrastructureCabinet';
import InvestorCabinet from '@/components/cabinets/InvestorCabinet';
import ScientificCabinet from '@/components/cabinets/ScientificCabinet';
import OperatorCabinet from '@/components/cabinets/OperatorCabinet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Settings } from 'lucide-react';

const cabinetComponents: Record<UserRole, React.ComponentType<any>> = {
  citizen: CitizenCabinet,
  government: GovernmentCabinet,
  infrastructure: InfrastructureCabinet,
  investor: InvestorCabinet,
  scientific: ScientificCabinet,
  operator: OperatorCabinet,
  admin: OperatorCabinet // Используем операторский кабинет как админский
};

export default function CabinetsPage() {
  const [currentCabinet, setCurrentCabinet] = useState<UserRole>('citizen');
  const [showSwitcher, setShowSwitcher] = useState(false);

  const handleCabinetChange = (cabinet: UserRole) => {
    setCurrentCabinet(cabinet);
    setShowSwitcher(false);
  };

  const CurrentCabinetComponent = cabinetComponents[currentCabinet];

  const cabinetNames: Record<UserRole, string> = {
    citizen: 'Гражданский кабинет',
    government: 'Правительственный кабинет',
    infrastructure: 'Инфраструктурный кабинет',
    investor: 'Инвестиционный кабинет',
    scientific: 'Научный кабинет',
    operator: 'Операторский кабинет',
    admin: 'Административный кабинет'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Заголовок */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSwitcher(!showSwitcher)}
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Сменить кабинет</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {cabinetNames[currentCabinet]}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Главная</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSwitcher ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setShowSwitcher(false)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Вернуться к кабинету</span>
              </Button>
            </div>
            
            <CabinetSwitcher
              onCabinetChange={handleCabinetChange}
              currentCabinet={currentCabinet}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Информационная панель */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Добро пожаловать в {cabinetNames[currentCabinet]}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Исследуйте возможности платформы VODeco в гостевом режиме
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Гостевой режим
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSwitcher(true)}
                  >
                    Сменить кабинет
                  </Button>
                </div>
              </div>
            </div>

            {/* Компонент кабинета */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <CurrentCabinetComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}