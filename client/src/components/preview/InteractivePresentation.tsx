import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as THREE from "three";
import { useQuery } from "@tanstack/react-query";
import EarthGlobe from "@/components/globo/EarthGlobe";
import { WaterResource } from "@/types";
import { 
  Building, 
  Beaker, 
  Droplets, 
  Users, 
  DollarSign, 
  Settings,
  X,
  ArrowRight,
  Hexagon
} from "lucide-react";

interface InteractivePresentationProps {
  onComplete: () => void;
}

interface HexagonType {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  position: { x: number; y: number };
  content: {
    problems: string[];
    solutions: string[];
    benefits: string[];
    functions: string[];
  };
}

export default function InteractivePresentation({ onComplete }: InteractivePresentationProps) {
  const [activeHexagon, setActiveHexagon] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'problems' | 'solutions' | 'benefits' | 'functions'>('problems');
  
  // Загрузка данных водных ресурсов
  const { data: resources = [] } = useQuery<WaterResource[]>({
    queryKey: ['/api/water-resources'],
    refetchOnWindowFocus: false,
  });

  const hexagons: HexagonType[] = [
    {
      id: 'government',
      title: 'Государство',
      icon: Building,
      color: '#ff7700',
      position: { x: 0, y: -280 }, // Верх
      content: {
        problems: [
          'Фальсификация данных мониторинга',
          'Проблемы управления трансграничными водами',
          'Отсутствие единой системы мониторинга',
          'Коррупционные риски в распределении ресурсов',
          'Неэффективное законодательство'
        ],
        solutions: [
          'Блокчейн для прозрачности данных',
          'Международные соглашения на базе DAO',
          'IoT-мониторинг в реальном времени',
          'Смарт-контракты для распределения',
          'Децентрализованное управление (DAO)'
        ],
        benefits: [
          'Повышение доверия граждан',
          'Снижение коррупции',
          'Эффективное управление ресурсами',
          'Улучшение международных отношений',
          'Прозрачность принятия решений'
        ],
        functions: [
          'Верификация данных через блокчейн',
          'Платформа для межгосударственного взаимодействия',
          'Инструменты для общественного контроля',
          'Автоматизация отчетности',
          'Аналитика для принятия решений'
        ]
      }
    },
    {
      id: 'science',
      title: 'Научное сообщество',
      icon: Beaker,
      color: '#8a2be2',
      position: { x: 242, y: -140 }, // Верх-право
      content: {
        problems: [
          'Недостаток данных для исследований',
          'Сложность доступа к актуальной информации',
          'Фрагментация исследований',
          'Трудности внедрения разработок',
          'Нехватка финансирования'
        ],
        solutions: [
          'Единая база данных VODECO',
          'Открытый доступ к данным мониторинга',
          'Платформа для совместных исследований',
          'Интеграция науки и практики через DAO',
          'Краудфандинг исследований через токены'
        ],
        benefits: [
          'Ускорение научных открытий',
          'Повышение качества исследований',
          'Синергия между учеными',
          'Быстрое внедрение инноваций',
          'Привлечение инвестиций в науку'
        ],
        functions: [
          'Хранилище верифицированных данных',
          'Инструменты анализа и визуализации',
          'Площадка для публикации исследований',
          'Механизмы грантов и финансирования',
          'Инструменты для коллаборации'
        ]
      }
    },
    {
      id: 'water-objects',
      title: 'Объекты водохозяйственного комплекса',
      icon: Droplets,
      color: '#00e5ff',
      position: { x: 242, y: 140 }, // Право
      content: {
        problems: [
          'Износ инфраструктуры',
          'Низкая эффективность очистки',
          'Потери воды при транспортировке',
          'Отсутствие автоматизации',
          'Сложность мониторинга состояния'
        ],
        solutions: [
          'Модернизация с привлечением инвестиций DAO',
          'Внедрение современных технологий очистки',
          'Цифровые двойники объектов',
          'Автоматизация управления (SCADA на блокчейне)',
          'Постоянный мониторинг через IoT'
        ],
        benefits: [
          'Снижение затрат на эксплуатацию',
          'Повышение качества воды',
          'Уменьшение потерь ресурсов',
          'Оптимизация работы объектов',
          'Продление срока службы инфраструктуры'
        ],
        functions: [
          'Инвестиционная платформа для модернизации',
          'База данных технологий и подрядчиков',
          'Система предиктивного обслуживания',
          'Инструменты для цифрового моделирования',
          'Мониторинг эффективности в реальном времени'
        ]
      }
    },
    {
      id: 'users',
      title: 'Водопользователи',
      icon: Users,
      color: '#00ff88',
      position: { x: 0, y: 280 }, // Низ
      content: {
        problems: [
          'Непрозрачное тарифообразование',
          'Низкое качество воды',
          'Отсутствие информации о состоянии воды',
          'Сложность влияния на управление',
          'Недостаток инструментов экономии'
        ],
        solutions: [
          'Прозрачный учет потребления на блокчейне',
          'Общественный мониторинг качества воды',
          'Доступ к данным через приложение VODECO',
          'Участие в DAO для принятия решений',
          'Рекомендации по экономии на основе ИИ'
        ],
        benefits: [
          'Справедливые тарифы',
          'Гарантия качества воды',
          'Осознанное потребление',
          'Возможность влиять на систему',
          'Экономия личных средств'
        ],
        functions: [
          'Личный кабинет с данными потребления',
          'Карта качества воды',
          'Инструменты голосования в DAO',
          'Система оповещений и рекомендаций',
          'Маркетплейс водосберегающих технологий'
        ]
      }
    },
    {
      id: 'investors',
      title: 'Инвесторы',
      icon: DollarSign,
      color: '#ffd700',
      position: { x: -242, y: 140 }, // Лево
      content: {
        problems: [
          'Высокие риски инвестиций в инфраструктуру',
          'Непрозрачность проектов',
          'Сложность оценки эффективности',
          'Длительные сроки окупаемости',
          'Отсутствие ликвидных инструментов'
        ],
        solutions: [
          'Децентрализованное финансирование через DAO',
          'Прозрачность проектов на блокчейне',
          'Мониторинг KPI через смарт-контракты',
          'Токенизация активов (доходные токены VOD)',
          'Вторичный рынок токенов'
        ],
        benefits: [
          'Снижение рисков',
          'Прозрачность и контроль',
          'Объективная оценка доходности',
          'Повышение ликвидности инвестиций',
          'Участие в социально значимых проектах'
        ],
        functions: [
          'Инвестиционная платформа VODECO',
          'Инструменты анализа проектов',
          'Смарт-контракты для управления инвестициями',
          'Кошелек для токенов VOD',
          'Отчетность по проектам в реальном времени'
        ]
      }
    },
    {
      id: 'contractors',
      title: 'Подрядчики',
      icon: Settings,
      color: '#0088ff',
      position: { x: -242, y: -140 }, // Верх-лево
      content: {
        problems: [
          'Сложность выхода на рынок',
          'Непрозрачные тендеры',
          'Трудности демонстрации эффективности',
          'Недостаток информации о потребностях',
          'Сложность привлечения финансирования'
        ],
        solutions: [
          'Открытая платформа VODECO для подрядчиков',
          'Прозрачные тендеры на блокчейне',
          'Верификация эффективности технологий через IoT',
          'Доступ к базе данных проектов и потребностей',
          'Интеграция с инвестиционной платформой'
        ],
        benefits: [
          'Равный доступ к заказам',
          'Честная конкуренция',
          'Подтверждение репутации и качества',
          'Доступ к новым рынкам',
          'Возможности для роста и развития'
        ],
        functions: [
          'Реестр подрядчиков и технологий',
          'Платформа для проведения тендеров',
          'Система рейтинга и отзывов',
          'Инструменты для демонстрации кейсов',
          'Аналитика рынка и потребностей'
        ]
      }
    },
    {
      id: 'dao',
      title: 'DAO',
      icon: Hexagon,
      color: '#ff00ff',
      position: { x: -150, y: 240 }, // Низ-лево
      content: {
        problems: [
          'Централизованное принятие решений',
          'Отсутствие прозрачности в управлении',
          'Сложность координации между участниками',
          'Недостаток доверия между сторонами',
          'Неэффективность традиционных структур управления'
        ],
        solutions: [
          'Децентрализованное автономное управление',
          'Прозрачное голосование на блокчейне',
          'Смарт-контракты для автоматизации решений',
          'Токенизированная система стимулирования',
          'Открытый доступ к данным и процессам'
        ],
        benefits: [
          'Демократическое принятие решений',
          'Полная прозрачность операций',
          'Эффективная координация участников',
          'Высокий уровень доверия',
          'Быстрая адаптация к изменениям'
        ],
        functions: [
          'Платформа для голосования и предложений',
          'Система управления токенами VOD',
          'Автоматическое исполнение решений',
          'Мониторинг эффективности управления',
          'Инструменты для создания рабочих групп'
        ]
      }
    }
  ];

  // Обработчики для выбора ресурсов на глобусе
  const handleResourceSelect = (resource: WaterResource) => {
    // Можно показать информацию о выбранном ресурсе
    console.log('Selected resource:', resource);
  };

  const handleHexagonClick = (hexagonId: string) => {
    setActiveHexagon(hexagonId);
    setActiveTab('problems');
  };

  const closeInfoPanel = () => {
    setActiveHexagon(null);
  };

  const getHexagonStyle = (hexagon: HexagonType) => {
    const isActive = activeHexagon === hexagon.id;
    const isInactive = activeHexagon && activeHexagon !== hexagon.id;
    
    return {
      transform: `translate(${hexagon.position.x}px, ${hexagon.position.y}px)`, // Убрал масштабирование
      opacity: isInactive ? 0.5 : 1, // Уменьшил прозрачность неактивных
      borderColor: hexagon.color,
      backgroundColor: isActive ? `${hexagon.color}30` : 'rgba(0, 50, 80, 0.7)',
    };
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">{/* Убрал фон, оставил только основной фон приложения */}

      {/* Заголовок */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm border-b border-primary/10">
        <div className="text-2xl font-bold text-primary">VODECO</div>
        <Button 
          onClick={onComplete}
          className="bg-primary hover:bg-primary/90 text-black font-medium"
        >
          Войти в Платформу
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </header>

      {/* Центральный контейнер с глобусом */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Реальный глобус Земли с маркерами водных ресурсов */}
        <div className="w-96 h-96">
          <EarthGlobe
            resources={resources}
            onResourceSelect={handleResourceSelect}
          />
        </div>

        {/* Гексагональные блоки */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {hexagons.map((hexagon) => (
            <motion.div
              key={hexagon.id}
              className="absolute w-32 h-36 cursor-pointer pointer-events-auto transition-all duration-500"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                border: '3px solid',
                backdropFilter: 'blur(3px)',
                boxShadow: `0 0 20px ${hexagon.color}40, inset 0 0 20px ${hexagon.color}20`,
                ...getHexagonStyle(hexagon)
              }}
              onClick={() => handleHexagonClick(hexagon.id)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <hexagon.icon 
                  className="w-8 h-8 mb-2" 
                  style={{ color: hexagon.color }}
                />
                <h3 className="text-xs font-medium text-white leading-tight">
                  {hexagon.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Информационная панель */}
      <AnimatePresence>
        {activeHexagon && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="absolute right-0 top-0 bottom-0 w-120 bg-black/90 backdrop-blur-lg border-l-2 border-primary z-50"
          >
            <div className="flex flex-col h-full">
              {/* Заголовок панели */}
              <div className="flex justify-between items-center p-6 border-b border-primary/20">
                <h2 className="text-xl font-bold text-primary">
                  {hexagons.find(h => h.id === activeHexagon)?.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeInfoPanel}
                  className="text-white hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Табы */}
              <div className="flex p-4 border-b border-primary/20">
                {(['problems', 'solutions', 'benefits', 'functions'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'text-primary border-primary'
                        : 'text-white/60 border-transparent hover:text-white'
                    }`}
                  >
                    {tab === 'problems' && 'Проблемы'}
                    {tab === 'solutions' && 'Решения'}
                    {tab === 'benefits' && 'Выгоды'}
                    {tab === 'functions' && 'Функции'}
                  </button>
                ))}
              </div>

              {/* Контент */}
              <div className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-3">
                  {hexagons
                    .find(h => h.id === activeHexagon)
                    ?.content[activeTab]?.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start text-white/90 leading-relaxed"
                    >
                      <span className="text-primary mr-3 mt-1">⬢</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Инструкция */}
      {!activeHexagon && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-40"
        >
          <p className="text-white/80 text-lg mb-2">
            Выберите направление, чтобы узнать больше
          </p>
          <p className="text-primary text-sm">
            Нажмите на гексагон или вращайте глобус
          </p>
        </motion.div>
      )}
    </div>
  );
}