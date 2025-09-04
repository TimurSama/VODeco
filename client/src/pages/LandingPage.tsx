import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import LandingHeader from '@/components/layout/LandingHeader';
import InfoModal from '@/components/ui/InfoModal';
import { 
  Droplets, 
  Globe, 
  Users, 
  Building2, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Play,
  MonitorSpeaker,
  DollarSign,
  FileText,
  BarChart3,
  Zap,
  Target,
  Heart,
  FlaskConical,
  Info
} from 'lucide-react';

const LandingPage: React.FC = () => {
  type ModalKey = 'crisis' | 'solution' | 'dao' | 'monitoring' | 'mechanics' | 'society' | 'science' | 'business' | 'government' | 'investors' | 'platform' | 'services' | 'tokenomics' | 'roadmap' | 'technology' | 'partnerships';
  
  const shouldReduceMotion = useReducedMotion();
  const [modalStates, setModalStates] = useState<Record<ModalKey, boolean>>({
    crisis: false,
    solution: false,
    dao: false,
    monitoring: false,
    mechanics: false,
    society: false,
    science: false,
    business: false,
    government: false,
    investors: false,
    platform: false,
    services: false,
    tokenomics: false,
    roadmap: false,
    technology: false,
    partnerships: false
  });

  const openModal = (modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white overflow-hidden">
      <LandingHeader />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-cyan-900/50"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              VODeco
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-100 max-w-4xl mx-auto">
              Глобальная Экосистема Водных Ресурсов
            </p>
            <p className="text-lg md:text-xl mb-12 text-blue-200 max-w-3xl mx-auto">
              Неизбежная трансформация. Единое DAO-объединение. Общее будущее.
            </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link href="/">
                            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg">
                              <Play className="mr-2 h-5 w-5" />
                              Начать
                            </Button>
                          </Link>
                          <Link href="/presentation">
                            <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 text-lg">
                              <FileText className="mr-2 h-5 w-5" />
                              Презентация
                            </Button>
                          </Link>
                        </div>
          </motion.div>
        </div>
      </section>

      {/* Crisis Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-800/40 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-red-400 text-center">
              Мир вступает в новую эру
            </h2>
                         <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed text-center mb-6">
               В XXI веке вода становится не просто природным ресурсом, а стратегическим активом, 
               от которого зависит экономическая стабильность, здоровье и безопасность. 
               Рост населения, изменение климата, деградация экосистем и истощение запасов 
               пресной воды делают очевидным: управление водными ресурсами в разрозненных 
               системах больше не работает.
             </p>
             <Button
               variant="outline"
               size="sm"
               onClick={() => openModal('crisis')}
               className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
             >
               <Info className="mr-2 h-4 w-4" />
               Узнать больше о кризисе
             </Button>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 bg-slate-800/40 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400">
              Единственное устойчивое решение
            </h2>
            <p className="text-xl text-blue-200 max-w-4xl mx-auto">
              Создание интегрированных глобальных платформ — открытых, прозрачных, 
              технологичных, объединяющих все заинтересованные стороны.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                     {([
              {
                icon: <Shield className="h-12 w-12 text-cyan-400" />,
                title: "DAO — фундамент нового сотрудничества",
                description: "Каждый участник имеет равный доступ к информации, возможность инициировать проекты и влиять на решения через прозрачное голосование.",
                modalKey: 'dao' as ModalKey
              },
              {
                icon: <MonitorSpeaker className="h-12 w-12 text-blue-400" />,
                title: "Мониторинг, контроль, управление",
                description: "IoT-сети, ГИС-карты, аналитические панели и инструменты оперативного реагирования в режиме реального времени.",
                modalKey: 'monitoring' as ModalKey
              },
              {
                icon: <Zap className="h-12 w-12 text-green-400" />,
                title: "Механики и решения",
                description: "DAO-голосование, маркетплейс проектов, система геймификации, ESG-сертификация и научная коллаборация.",
                modalKey: 'mechanics' as ModalKey
              }
            ] as const).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-6 border border-cyan-400/20 hover:bg-slate-700/50 hover:border-cyan-400/40 transition-all shadow-lg shadow-cyan-500/10"
              >
                               <div className="mb-4">{item.icon}</div>
                 <h3 className="text-xl font-bold mb-3 text-cyan-300">{item.title}</h3>
                                   <p className="text-blue-200 mb-4">{item.description}</p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(item.modalKey)}
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white w-full"
                    >
                      <Info className="mr-2 h-4 w-4" />
                      Узнать больше
                    </Button>
                    {item.modalKey === 'dao' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal('platform')}
                        className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white w-full"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        О платформе VOD
                      </Button>
                    )}
                    {item.modalKey === 'monitoring' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal('technology')}
                        className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white w-full"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Технологии
                      </Button>
                    )}
                    {item.modalKey === 'mechanics' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal('services')}
                        className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white w-full"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Услуги платформы
                      </Button>
                    )}
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 bg-slate-800/40 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-green-400">
              Ценность для всех пользователей
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                     {([
              { icon: <Users className="h-8 w-8" />, title: "Для общества", color: "text-green-400", modalKey: 'society' as ModalKey },
              { icon: <FlaskConical className="h-8 w-8" />, title: "Для науки", color: "text-blue-400", modalKey: 'science' as ModalKey },
              { icon: <TrendingUp className="h-8 w-8" />, title: "Для бизнеса", color: "text-orange-400", modalKey: 'business' as ModalKey },
              { icon: <Building2 className="h-8 w-8" />, title: "Для государств", color: "text-purple-400", modalKey: 'government' as ModalKey },
              { icon: <DollarSign className="h-8 w-8" />, title: "Для инвесторов", color: "text-yellow-400", modalKey: 'investors' as ModalKey }
            ] as const).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                                                 <div className={`${item.color} mb-3`}>{item.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(item.modalKey)}
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white w-full"
                    >
                      <Info className="mr-2 h-4 w-4" />
                      Узнать больше
                    </Button>
                    {item.modalKey === 'society' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal('tokenomics')}
                        className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white w-full"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Токеномика
                      </Button>
                    )}
                    {item.modalKey === 'science' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal('technology')}
                        className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white w-full"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Технологии
                      </Button>
                    )}
                    {item.modalKey === 'business' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal('roadmap')}
                        className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white w-full"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Дорожная карта
                      </Button>
                    )}
                    {item.modalKey === 'government' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal('partnerships')}
                        className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white w-full"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Партнёрства
                      </Button>
                    )}
                    {item.modalKey === 'investors' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal('tokenomics')}
                        className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white w-full"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Токеномика
                      </Button>
                    )}
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-800/40 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400">
              VODeco — это не просто платформа
            </h2>
            <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
              Это инфраструктура будущего, где управление водой становится таким же 
              технологичным, прозрачным и совместным, как интернет — для информации.
            </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link href="/">
                            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg">
                              <Heart className="mr-2 h-5 w-5" />
                              Присоединиться к будущему
                            </Button>
                          </Link>
                          <Link href="/presentation">
                            <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 text-lg">
                              <FileText className="mr-2 h-5 w-5" />
                              Полная презентация
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white px-8 py-4 text-lg"
                            onClick={() => openModal('tokenomics')}
                          >
                            <Info className="mr-2 h-5 w-5" />
                            Токеномика VOD
                          </Button>
                        </div>
          </motion.div>
                 </div>
       </section>

       {/* Модальные окна */}
       <InfoModal
         isOpen={modalStates.crisis}
         onClose={() => closeModal('crisis')}
         title="Глобальный водный кризис"
         type="crisis"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-red-400 mb-4">Проблемы:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-red-400 mt-1">•</span>
                     <span>Рост населения и урбанизация увеличивают потребление воды</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-red-400 mt-1">•</span>
                     <span>Изменение климата вызывает экстремальные явления</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-red-400 mt-1">•</span>
                     <span>Деградация экосистем и загрязнение источников</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-red-400 mt-1">•</span>
                     <span>Истощение запасов пресной воды</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-red-400 mt-1">•</span>
                     <span>Неэффективное управление ресурсами</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-orange-400 mb-4">Последствия:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-orange-400 mt-1">•</span>
                     <span>Экономические потери триллионы долларов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-orange-400 mt-1">•</span>
                     <span>Социальные конфликты и миграция</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-orange-400 mt-1">•</span>
                     <span>Продовольственная безопасность под угрозой</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-orange-400 mt-1">•</span>
                     <span>Здоровье населения ухудшается</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-orange-400 mt-1">•</span>
                     <span>Биоразнообразие сокращается</span>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
               <p className="text-red-300 font-medium">
                 <strong>Вывод:</strong> Управление водными ресурсами в разрозненных системах больше не работает. 
                 Необходимо создание интегрированных глобальных платформ.
               </p>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.dao}
         onClose={() => closeModal('dao')}
         title="DAO — Фундамент нового сотрудничества"
         type="dao"
         size="lg"
         content={
           <div className="space-y-6">
             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>DAO (Decentralized Autonomous Organization)</strong> — это децентрализованная автономная организация, 
                 где каждый участник имеет равный доступ к информации и возможность влиять на решения.
               </p>
             </div>
             <div>
               <h3 className="text-xl font-bold text-blue-400 mb-4">Принципы DAO:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-blue-400 mt-1">•</span>
                   <span>Равноправие всех участников</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-blue-400 mt-1">•</span>
                   <span>Прозрачность всех процессов</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-blue-400 mt-1">•</span>
                   <span>Открытое голосование</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-blue-400 mt-1">•</span>
                   <span>Автоматическое исполнение решений</span>
                 </li>
               </ul>
             </div>
             <div>
               <h3 className="text-xl font-bold text-blue-400 mb-4">Преимущества:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-blue-400 mt-1">•</span>
                   <span>Исключение монополии и коррупции</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-blue-400 mt-1">•</span>
                   <span>Открытые процессы принятия решений</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-blue-400 mt-1">•</span>
                   <span>Объединение на основе общих ценностей</span>
                 </li>
               </ul>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.monitoring}
         onClose={() => closeModal('monitoring')}
         title="Мониторинг, контроль, управление"
         type="tech"
         size="lg"
         content={
           <div className="space-y-6">
             <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>VODeco интегрирует</strong> передовые технологии для полного мониторинга и управления водными ресурсами.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">IoT-сети:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Датчики качества воды</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Мониторинг в реальном времени</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Автоматические оповещения</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">ГИС-карты:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Пространственный анализ</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Прогнозирование изменений</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Интерактивные карты</span>
                   </li>
                 </ul>
               </div>
             </div>
             <div>
               <h3 className="text-xl font-bold text-yellow-400 mb-4">Аналитические панели:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-yellow-400 mt-1">•</span>
                   <span>Инструменты оперативного реагирования</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-yellow-400 mt-1">•</span>
                   <span>Автоматизированные отчёты</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-yellow-400 mt-1">•</span>
                   <span>Глобальная база данных</span>
                 </li>
               </ul>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.mechanics}
         onClose={() => closeModal('mechanics')}
         title="Механики и решения"
         type="tech"
         size="lg"
         content={
           <div className="space-y-6">
             <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>VODeco предлагает</strong> комплексные инструменты для эффективного управления водными ресурсами.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Основные механики:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>DAO-голосование</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Маркетплейс проектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Система геймификации</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>ESG-сертификация</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Дополнительные решения:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Научная коллаборация</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Интеграция с государственными системами</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span>Единый стандарт обмена данными</span>
                   </li>
                 </ul>
               </div>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.society}
         onClose={() => closeModal('society')}
         title="Ценность для общества"
         type="value"
         size="lg"
         content={
           <div className="space-y-6">
             <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Общество получает</strong> доступ к данным, возможность участия в принятии решений и личное влияние на экологическую ситуацию.
               </p>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Основные возможности:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Доступ к данным о состоянии воды</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Участие в принятии решений</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Личное влияние на экологию</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Получение вознаграждений за активность</span>
                 </li>
               </ul>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Дополнительные преимущества:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Прозрачность процессов</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Образовательные материалы</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Социальные инициативы</span>
                 </li>
               </ul>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.science}
         onClose={() => closeModal('science')}
         title="Ценность для науки"
         type="value"
         size="lg"
         content={
           <div className="space-y-6">
             <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Наука получает</strong> уникальную базу данных в реальном времени, площадку для совместных исследований и финансирование.
               </p>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Основные возможности:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Уникальная база данных в реальном времени</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Площадка для совместных исследований</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Гранты и финансирование</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Публикации и обмен данными</span>
                 </li>
               </ul>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Научные направления:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Гидрология и климатология</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Экология и биология</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Технологии очистки воды</span>
                 </li>
               </ul>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.business}
         onClose={() => closeModal('business')}
         title="Ценность для бизнеса"
         type="value"
         size="lg"
         content={
           <div className="space-y-6">
             <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Бизнес получает</strong> ESG-репутацию, доступ к тендерам, аналитику и новые рынки.
               </p>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Основные возможности:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>ESG-репутация и сертификация</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Доступ к тендерам</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Аналитика и прогнозирование</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Новые рынки и возможности</span>
                 </li>
               </ul>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Бизнес-преимущества:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Прозрачность поставок</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Устойчивое развитие</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Инвестиционная привлекательность</span>
                 </li>
               </ul>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.government}
         onClose={() => closeModal('government')}
         title="Ценность для государств"
         type="value"
         size="lg"
         content={
           <div className="space-y-6">
             <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Государства получают</strong> централизованный контроль, прогнозирование и взаимодействие с гражданами.
               </p>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Основные возможности:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Централизованный контроль ресурсов</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Прогнозирование и планирование</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Взаимодействие с гражданами</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Международное сотрудничество</span>
                 </li>
               </ul>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Государственные функции:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Регулирование и контроль</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Экологическая безопасность</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Устойчивое развитие</span>
                 </li>
               </ul>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.investors}
         onClose={() => closeModal('investors')}
         title="Ценность для инвесторов"
         type="value"
         size="lg"
         content={
           <div className="space-y-6">
             <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Инвесторы получают</strong> прозрачную аналитику проектов, диверсификацию активов и ESG-инициативы с измеримой отдачей.
               </p>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Основные возможности:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Прозрачная аналитика проектов</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Диверсификация активов</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>ESG-инициативы с измеримой отдачей</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Долгосрочные инвестиции</span>
                 </li>
               </ul>
             </div>
             <div>
               <h3 className="text-xl font-bold text-cyan-400 mb-4">Инвестиционные направления:</h3>
               <ul className="space-y-3 text-blue-200">
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Инфраструктурные проекты</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Технологические решения</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <span className="text-cyan-400 mt-1">•</span>
                   <span>Научные исследования</span>
                 </li>
               </ul>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.platform}
         onClose={() => closeModal('platform')}
         title="Цифровая платформа VOD"
         type="info"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>VOD</strong> — это цифровая платформа, консолидирующая и интегрирующая максимально широкий круг участников 
                 водного сектора экономики для устойчивого управления водными ресурсами.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-blue-400 mb-4">Участники платформы:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Государство</strong> — регулирование и контроль</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Производственные операторы</strong> — водная инфраструктура</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Коммунальные операторы</strong> — водоснабжение населения</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Научные учреждения</strong> — исследования и разработки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Образовательные учреждения</strong> — подготовка кадров</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Корпоративные потребители</strong> — промышленность и сельское хозяйство</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Индивидуальные потребители</strong> — граждане</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Национальные и международные инвесторы</strong> — финансирование проектов</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-blue-400 mb-4">Интегрируемые данные:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>IoT-датчики</strong> — мониторинг в реальном времени</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Системы мониторинга</strong> — качество и количество воды</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Климатические данные</strong> — прогнозирование рисков</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Гидрологические модели</strong> — анализ водных ресурсов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Экономические инструменты</strong> — анализ эффективности</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-blue-400 mt-1">•</span>
                     <span><strong>Финансовые модели</strong> — инвестиционное планирование</span>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
               <p className="text-green-300 font-medium">
                 <strong>Результат:</strong> VOD — это не просто техническая платформа, а фундамент цифровой трансформации 
                 и развития водного сектора экономики, предназначенный для консолидации усилий всех участников в едином 
                 синергетическом процессе.
               </p>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.services}
         onClose={() => closeModal('services')}
         title="Основные услуги платформы VOD"
         type="info"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Платформа VOD</strong> предоставляет участникам и пользователям сектора водных ресурсов 
                 доступ к единой цифровой среде с набором ключевых сервисов.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-cyan-400 mb-4">Для широкой аудитории:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Инвестирование в реальные объекты</strong> — каждый становится соучастником модернизации</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Получение дохода от водных проектов</strong> — стейкинг токенов приносит прибыль</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Участие в экономике будущего</strong> — токен как средство расчётов и учёта</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Голосование в DAO</strong> — влияние на развитие водных проектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Запуск собственных инициатив</strong> — выдвижение идей и получение финансирования</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Цифровая карта воды</strong> — персонализированная информация о качестве</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Прогнозирование водных угроз</strong> — ИИ-анализ засух и загрязнений</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Личный водный профиль</strong> — отслеживание "водного следа"</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Получение токенов за полезные действия</strong> — установка датчиков, сбор данных</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Роль "экологического майнера"</strong> — внесение и валидирование данных</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-cyan-400 mb-4">Для профессиональной аудитории:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Доступ к данным в реальном времени</strong> — IoT-датчики, спутниковый мониторинг</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Интеллектуальное прогнозирование рисков</strong> — автоматическое моделирование</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Инструменты управления водными объектами</strong> — цифровые паспорта, контроль</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>API и SDK для разработчиков</strong> — интеграция с корпоративными системами</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Консалтинг и аудит водной безопасности</strong> — проектирование решений</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Доступ к инвестиционным возможностям</strong> — участие в стейкинге проектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Отчётность по ESG</strong> — формирование отчётов для международных фондов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-cyan-400 mt-1">•</span>
                     <span><strong>Партнёрство в цифровой трансформации</strong> — участие в пилотных проектах</span>
                   </li>
                 </ul>
               </div>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.tokenomics}
         onClose={() => closeModal('tokenomics')}
         title="Токеномика экосистемы VOD"
         type="info"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Токен VOD</strong> — это проектная валюта, обеспеченная активами проекта и водными ресурсами, 
                 являющаяся основой экономики платформы.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Функции токена VOD:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Средство расчётов</strong> — оплата услуг и товаров в экосистеме</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Инвестиционный инструмент</strong> — участие в проектах модернизации</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Вознаграждение за активность</strong> — токены за полезные действия</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Управление через DAO</strong> — голосование за проекты и инициативы</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Стейкинг</strong> — получение пассивного дохода</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Ликвидность</strong> — торговля на криптобиржах</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Модель монетизации:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Freemium-доступ</strong> — базовые функции бесплатно</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Платные подписки</strong> — расширенные функции и аналитика</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Микроплатежи</strong> — эксклюзивные функции и NFT</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>API-доступ</strong> — интеграция с корпоративными системами</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Комиссии с операций</strong> — внутри DAO и на биржах</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Доход от стейкинга</strong> — процент от прибыли проектов</span>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
               <p className="text-green-300 font-medium">
                 <strong>Экономическая модель:</strong> Токен VOD обеспечивает устойчивую экономику платформы, 
                 где каждый участник может найти своё место и получить выгоду от участия в экосистеме.
               </p>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.roadmap}
         onClose={() => closeModal('roadmap')}
         title="Дорожная карта развития VOD"
         type="info"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Дорожная карта VOD</strong> — это поэтапный план развития платформы от пилотного запуска 
                 до глобальной экосистемы управления водными ресурсами.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-purple-400 mb-4">2026-2027: Пилотный запуск</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2026:</strong> 29,000 пользователей, $171,390 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2027:</strong> 103,000 пользователей, $608,730 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span>Активная фаза внедрения в Узбекистане</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span>Подключение муниципалитетов</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-purple-400 mb-4">2028-2029: Национальный охват</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2028:</strong> 340,000 пользователей, $2,009,400 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2029:</strong> 880,000 пользователей, $5,200,800 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span>Национальный охват в Узбекистане</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span>Работа с корпоративными пользователями</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-purple-400 mb-4">2030-2032: Региональная экспансия</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2030:</strong> 2.1M пользователей, $12,411,000 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2031:</strong> 4.6M пользователей, $27,186,000 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2032:</strong> 9.2M пользователей, $54,372,000 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span>Продвижение в Казахстан и Кыргызстан</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-purple-400 mb-4">2033-2034: Глобальное масштабирование</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2033:</strong> 17M пользователей, $100,470,000 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span><strong>2034:</strong> 28M пользователей, $165,480,000 выручки</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span>Устойчивое распространение по регионам</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-purple-400 mt-1">•</span>
                     <span>Дополнительные государства</span>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
               <p className="text-blue-300 font-medium">
                 <strong>Прогноз роста:</strong> Среднегодовой темп роста выручки (CAGR) оценивается в 95.5%, 
                 что демонстрирует значительный потенциал масштабирования платформы.
               </p>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.technology}
         onClose={() => closeModal('technology')}
         title="Технологический стек VOD"
         type="tech"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Технологический стек VOD</strong> включает современные инструменты для решения глобальных 
                 экологических задач и обеспечения надёжности платформы.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">IoT и мониторинг:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>IoT-датчики</strong> — мониторинг качества воды в реальном времени</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Спутниковый мониторинг</strong> — глобальное наблюдение за водными ресурсами</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>SCADA-системы</strong> — автоматизация управления объектами</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Телеметрия</strong> — передача данных с удалённых объектов</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Искусственный интеллект:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Машинное обучение</strong> — прогнозирование потребления и рисков</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Нейронные сети</strong> — анализ сложных экологических данных</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Цифровые двойники</strong> — моделирование объектов и процессов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Предиктивная аналитика</strong> — предупреждение аварий и загрязнений</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Блокчейн и DAO:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Смарт-контракты</strong> — автоматизация процессов и платежей</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>DAO-голосование</strong> — децентрализованное принятие решений</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Токенизация активов</strong> — создание цифровых представлений объектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>DeFi-инструменты</strong> — стейкинг, ликвидность, доходность</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-yellow-400 mb-4">Аналитика и визуализация:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>ГИС-системы</strong> — пространственный анализ водных ресурсов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>BI-платформы</strong> — бизнес-аналитика и отчётность</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Интерактивные карты</strong> — визуализация состояния объектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-yellow-400 mt-1">•</span>
                     <span><strong>Дашборды</strong> — мониторинг KPI и метрик</span>
                   </li>
                 </ul>
               </div>
             </div>
           </div>
         }
       />

       <InfoModal
         isOpen={modalStates.partnerships}
         onClose={() => closeModal('partnerships')}
         title="Стратегические партнёрства VOD"
         type="info"
         size="xl"
         content={
           <div className="space-y-6">
             <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
               <p className="text-blue-200">
                 <strong>Стратегические партнёрства VOD</strong> — это ключевой элемент успеха платформы, 
                 обеспечивающий интеграцию с международными организациями, правительствами и технологическими компаниями.
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-xl font-bold text-green-400 mb-4">Международные организации:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>ООН</strong> — соответствие Целям устойчивого развития (SDG)</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Всемирный банк</strong> — финансирование инфраструктурных проектов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>ЕБРР</strong> — поддержка экологических инициатив</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Азиатский банк развития</strong> — региональное сотрудничество</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>UNESCO</strong> — научные исследования и образование</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-green-400 mb-4">Правительства и ведомства:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Министерства экологии</strong> — экологическая политика и стандарты</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Водные ведомства</strong> — регулирование водопользования</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Центральные банки</strong> — цифровые валюты и финансовое регулирование</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Агентства по цифровизации</strong> — технологическая трансформация</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Местные администрации</strong> — муниципальные проекты</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-green-400 mb-4">Технологические компании:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>IoT-провайдеры</strong> — датчики и системы мониторинга</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Облачные платформы</strong> — инфраструктура и масштабирование</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>ИИ-лаборатории</strong> — алгоритмы и модели машинного обучения</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Блокчейн-компании</strong> — смарт-контракты и DeFi-решения</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Аналитические платформы</strong> — BI-инструменты и дашборды</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-green-400 mb-4">Академические партнёрства:</h3>
                 <ul className="space-y-3 text-blue-200">
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Университеты</strong> — научные исследования и подготовка кадров</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>НИИ</strong> — прикладные разработки и инновации</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Технологические парки</strong> — инкубация стартапов</span>
                   </li>
                   <li className="flex items-start space-x-2">
                     <span className="text-green-400 mt-1">•</span>
                     <span><strong>Международные консорциумы</strong> — совместные проекты</span>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
               <p className="text-blue-300 font-medium">
                 <strong>Результат партнёрств:</strong> Стратегические партнёрства обеспечивают VOD доступ к 
                 международным стандартам, финансированию, технологиям и экспертизе, необходимой для создания 
                 глобальной экосистемы управления водными ресурсами.
               </p>
             </div>
           </div>
         }
       />
     </div>
   );
 };

export default LandingPage;
