import { motion } from 'framer-motion';
import { Check, XCircle, Users, ShieldCheck, Vote, BarChart } from 'lucide-react';

interface WhyDaoScreenProps {
  onNext: () => void;
}

export default function WhyDaoScreen({ onNext }: WhyDaoScreenProps) {
  const benefits = [
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Децентрализованное управление",
      description: "Все решения принимаются сообществом через голосование"
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      title: "Прозрачность",
      description: "Все действия и транзакции записываются в блокчейн"
    },
    {
      icon: <Vote className="h-5 w-5 text-primary" />,
      title: "Активное участие",
      description: "Каждый может внести предложение и повлиять на экосистему"
    },
    {
      icon: <BarChart className="h-5 w-5 text-primary" />,
      title: "Эффективное распределение ресурсов",
      description: "Средства направляются согласно приоритетам экосистемы"
    }
  ];

  const comparisons = [
    {
      traditional: "Централизованное управление",
      dao: "Распределенное принятие решений"
    },
    {
      traditional: "Непрозрачное распределение средств",
      dao: "Полная прозрачность финансов"
    },
    {
      traditional: "Медленная бюрократия",
      dao: "Быстрые итерации и адаптация"
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
  
  // Анимация для преимуществ
  const benefitVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.15),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Анимация для сравнения
  const comparisonVariants = {
    initial: { opacity: 0 },
    animate: (i: number) => ({ 
      opacity: 1,
      transition: {
        delay: 1 + (i * 0.2),
        duration: 0.5
      }
    })
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative p-4"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Почему DAO?
          </h2>
          <p className="text-lg text-white/70">
            Децентрализованная автономная организация — основа устойчивого будущего
          </p>
        </motion.div>
        
        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 p-5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all"
              variants={benefitVariants}
              custom={index}
              initial="initial"
              animate="animate"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 w-fit mr-4 flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Сравнение с традиционными организациями */}
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden">
          <div className="p-3 bg-primary/10 border-b border-primary/30 grid grid-cols-2 gap-4 text-sm font-medium">
            <div className="text-white/80">Традиционная организация</div>
            <div className="text-primary">DAO VODeco</div>
          </div>
          
          <div className="divide-y divide-primary/10">
            {comparisons.map((item, index) => (
              <motion.div 
                key={index} 
                className="grid grid-cols-2 gap-4 p-3"
                variants={comparisonVariants}
                custom={index}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-center text-white/70">
                  <XCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{item.traditional}</span>
                </div>
                <div className="flex items-center text-white">
                  <Check className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{item.dao}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Декоративный элемент */}
      <motion.div 
        className="absolute bottom-4 right-4 text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Нажмите для продолжения +5💧
      </motion.div>
    </div>
  );
}