import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Home, 
  FlaskConical, 
  BriefcaseBusiness, 
  Building2, 
  Wallet, 
  Globe 
} from 'lucide-react';

interface ForEveryoneScreenProps {
  onNext: () => void;
}

export default function ForEveryoneScreen({ onNext }: ForEveryoneScreenProps) {
  // Данные о ролях
  const roles = [
    {
      name: "Школьник",
      benefit: "обучение + токены за участие",
      icon: <GraduationCap className="h-5 w-5 text-primary" />
    },
    {
      name: "Житель деревни",
      benefit: "фото → отчёт → DAO-реакция",
      icon: <Home className="h-5 w-5 text-primary" />
    },
    {
      name: "Учёный",
      benefit: "исследование → NFT-грант",
      icon: <FlaskConical className="h-5 w-5 text-primary" />
    },
    {
      name: "Чиновник",
      benefit: "подключение регионов, контроль, стандарты",
      icon: <BriefcaseBusiness className="h-5 w-5 text-primary" />
    },
    {
      name: "Компания",
      benefit: "субтокены и ESG-протокол",
      icon: <Building2 className="h-5 w-5 text-primary" />
    },
    {
      name: "Инвестор",
      benefit: "ROI, участие в DAO",
      icon: <Wallet className="h-5 w-5 text-primary" />
    },
    {
      name: "Страна",
      benefit: "полный DAO-контур водной инфраструктуры",
      icon: <Globe className="h-5 w-5 text-primary" />
    }
  ];

  // Анимация заголовка
  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  // Анимация строк таблицы
  const rowVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative p-4 overflow-hidden"
      onClick={onNext}
    >
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      <div className="absolute inset-0 bg-[url('/hexagonal-grid.svg')] opacity-15"></div>
      
      <div className="relative z-10 max-w-5xl w-full">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Каждому — своё.<br />
            Для всех — общее.
          </h2>
        </motion.div>
        
        {/* Таблица ролей */}
        <div className="bg-card/30 backdrop-blur-sm rounded-lg overflow-hidden border border-primary/30">
          <div className="p-4 bg-primary/10 border-b border-primary/30 grid grid-cols-12 text-sm font-medium">
            <div className="col-span-4 text-white">Кто</div>
            <div className="col-span-8 text-white">Что получает</div>
          </div>
          
          <div className="divide-y divide-primary/10">
            {roles.map((role, index) => (
              <motion.div 
                key={index} 
                className="grid grid-cols-12 p-4 hover:bg-primary/5 transition-colors"
                variants={rowVariants}
                initial="initial"
                animate="animate"
                custom={index}
              >
                <div className="col-span-4 flex items-center text-white font-medium">
                  <div className="p-2 rounded-full bg-primary/10 mr-3 flex-shrink-0">
                    {role.icon}
                  </div>
                  <span>{role.name}</span>
                </div>
                <div className="col-span-8 text-white/80 flex items-center">
                  {role.benefit}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}