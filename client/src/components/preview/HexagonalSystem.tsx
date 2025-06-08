import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Users, Building, Globe, Briefcase, FlaskConical, Waves, DollarSign } from "lucide-react";

interface HexagonalSystemProps {
  onContinue: () => void;
}

interface HexagonData {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  description: string;
  details: {
    functions: string[];
    participants: string[];
    mechanisms: string[];
    benefits: string[];
  };
}

const initialHexagons: HexagonData[] = [
  {
    id: 'dao',
    title: 'DAO',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'purple-400',
    description: 'Децентрализованное управление экосистемой',
    details: {
      functions: ['Децентрализованное управление экосистемой', 'голосование по ключевым решениям'],
      participants: ['Держатели токенов VODG', 'представители всех групп стейкхолдеров'],
      mechanisms: ['Смарт-контракты для автоматического исполнения решений', 'прозрачное голосование'],
      benefits: ['Справедливое представительство всех интересов', 'устранение коррупции', 'эффективность']
    }
  },
  {
    id: 'society',
    title: 'Общество',
    icon: <Users className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'blue-400',
    description: 'Контроль качества воды и участие в управлении',
    details: {
      functions: ['Контроль качества воды', 'участие в управлении', 'экологический мониторинг'],
      participants: ['Граждане', 'общественные организации', 'активисты'],
      mechanisms: ['Мобильные приложения для мониторинга', 'система репутации', 'микроплатежи'],
      benefits: ['Справедливые тарифы', 'качественная вода', 'экологическая безопасность']
    }
  },
  {
    id: 'states',
    title: 'Государства',
    icon: <Building className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
    glowColor: 'green-400',
    description: 'Регулирование и международное сотрудничество',
    details: {
      functions: ['Регулирование', 'международное сотрудничество', 'стандартизация'],
      participants: ['Правительственные органы', 'международные организации'],
      mechanisms: ['Смарт-контракты для трансграничных соглашений', 'прозрачный мониторинг'],
      benefits: ['Снижение коррупции', 'эффективное управление ресурсами', 'предотвращение конфликтов']
    }
  },
  {
    id: 'business',
    title: 'Бизнес',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    glowColor: 'orange-400',
    description: 'Эффективное использование воды и инвестиции',
    details: {
      functions: ['Эффективное использование воды', 'инвестиции в инфраструктуру'],
      participants: ['Промышленные предприятия', 'сельское хозяйство', 'коммерческие организации'],
      mechanisms: ['Токенизированные платежи', 'стимулы за экономию', 'репутационные системы'],
      benefits: ['Оптимизация затрат', 'прозрачное ценообразование', 'доступ к инвестициям']
    }
  },
  {
    id: 'science',
    title: 'Научное сообщество',
    icon: <FlaskConical className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-500',
    glowColor: 'indigo-400',
    description: 'Исследования и разработка технологий',
    details: {
      functions: ['Исследования', 'разработка технологий', 'экспертиза'],
      participants: ['Университеты', 'исследовательские центры', 'независимые эксперты'],
      mechanisms: ['Токенизированное финансирование исследований', 'доступ к глобальным данным'],
      benefits: ['Прямое финансирование', 'признание вклада', 'доступ к данным']
    }
  },
  {
    id: 'water-objects',
    title: 'Объекты водохозяйственного комплекса',
    icon: <Waves className="w-8 h-8" />,
    color: 'from-cyan-500 to-blue-500',
    glowColor: 'cyan-400',
    description: 'Сбор, очистка и распределение воды',
    details: {
      functions: ['Сбор, очистка, распределение воды'],
      participants: ['Водоканалы', 'очистные сооружения', 'системы распределения'],
      mechanisms: ['IoT-мониторинг', 'токенизация активов', 'автоматизация управления'],
      benefits: ['Привлечение инвестиций', 'оптимизация расходов', 'модернизация']
    }
  },
  {
    id: 'investors',
    title: 'Инвесторы',
    icon: <DollarSign className="w-8 h-8" />,
    color: 'from-yellow-500 to-orange-500',
    glowColor: 'yellow-400',
    description: 'Финансирование проектов и участие в управлении',
    details: {
      functions: ['Финансирование проектов', 'участие в управлении'],
      participants: ['Институциональные и частные инвесторы', 'фонды', 'токен-холдеры'],
      mechanisms: ['Стейкинг токенов', 'участие в пулах ликвидности', 'торговля на DEX'],
      benefits: ['Стабильный доход', 'ликвидность инвестиций', 'глобальный масштаб']
    }
  }
];

export default function HexagonalSystem({ onContinue }: HexagonalSystemProps) {
  const [selectedHexagon, setSelectedHexagon] = useState<string | null>(null);
  const [hexagons, setHexagons] = useState(initialHexagons);
  const mountRef = useRef<HTMLDivElement>(null);

  // Позиции гексагонов вокруг центрального глобуса
  const hexagonPositions = [
    { x: 50, y: 15 }, // DAO - верх
    { x: 80, y: 30 }, // Общество - правый верх
    { x: 80, y: 70 }, // Государства - правый низ
    { x: 50, y: 85 }, // Бизнес - низ
    { x: 20, y: 70 }, // Научное сообщество - левый низ
    { x: 20, y: 30 }, // Объекты - левый верх
    { x: 50, y: 50 }, // Инвесторы - центр (вокруг глобуса)
  ];

  const selectedHexagonData = hexagons.find(h => h.id === selectedHexagon);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      {/* Центральный глобус */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-10"
      >
        <div className="w-full h-full bg-gradient-to-b from-blue-400 via-green-500 to-blue-600 rounded-full shadow-2xl relative overflow-hidden">
          {/* Континенты */}
          <div className="absolute inset-0">
            <div className="absolute w-8 h-6 bg-green-600 rounded-full top-4 left-6 opacity-80" />
            <div className="absolute w-6 h-8 bg-green-600 rounded-full top-8 right-4 opacity-80" />
            <div className="absolute w-10 h-4 bg-green-600 rounded-full bottom-6 left-8 opacity-80" />
          </div>
          
          {/* Вращение */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="w-full h-full border border-cyan-300/30 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Гексагоны */}
      {hexagons.map((hexagon, index) => (
        <motion.div
          key={hexagon.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
          className="absolute cursor-pointer z-20"
          style={{
            left: `${hexagonPositions[index]?.x || 50}%`,
            top: `${hexagonPositions[index]?.y || 50}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={() => setSelectedHexagon(hexagon.id)}
        >
          {/* Соединительная линия к центру */}
          <div 
            className="absolute w-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"
            style={{
              height: `${Math.sqrt(
                Math.pow((hexagonPositions[index]?.x || 50) - 50, 2) + 
                Math.pow((hexagonPositions[index]?.y || 50) - 50, 2)
              ) * 3}px`,
              transformOrigin: 'top',
              transform: `rotate(${Math.atan2(
                50 - (hexagonPositions[index]?.y || 50),
                50 - (hexagonPositions[index]?.x || 50)
              ) * 180 / Math.PI + 90}deg)`,
              left: '50%',
              top: '50%'
            }}
          />

          {/* Гексагон */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-20 h-20 bg-gradient-to-br ${hexagon.color} rounded-lg shadow-lg border border-white/20`}
            style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
            }}
          >
            {/* Пульсирующее свечение */}
            <div 
              className={`absolute inset-0 bg-${hexagon.glowColor} opacity-30 animate-pulse blur-sm`}
              style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
              }}
            />
            
            {/* Иконка */}
            <div className="absolute inset-0 flex items-center justify-center text-white">
              {hexagon.icon}
            </div>
          </motion.div>

          {/* Подпись */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
            <p className="text-xs text-white font-medium max-w-20">{hexagon.title}</p>
          </div>

          {/* Потоки данных */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [-20, 0, 20]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut"
                }}
                className={`absolute w-2 h-2 bg-${hexagon.glowColor} rounded-full blur-sm`}
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 10}%`
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Модальное окно с подробной информацией */}
      <AnimatePresence>
        {selectedHexagon && selectedHexagonData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedHexagon(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">{selectedHexagonData.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedHexagon(null)}
                  className="text-white hover:bg-slate-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-cyan-200 mb-6">{selectedHexagonData.description}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Функции:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedHexagonData.details.functions.map((func, i) => (
                      <li key={i} className="text-white">{func}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Участники:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedHexagonData.details.participants.map((participant, i) => (
                      <li key={i} className="text-white">{participant}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Механизмы:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedHexagonData.details.mechanisms.map((mechanism, i) => (
                      <li key={i} className="text-white">{mechanism}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Выгоды:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedHexagonData.details.benefits.map((benefit, i) => (
                      <li key={i} className="text-white">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопка продолжить */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <Button
          onClick={onContinue}
          size="lg"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
        >
          Продолжить
        </Button>
      </motion.div>
    </div>
  );
}