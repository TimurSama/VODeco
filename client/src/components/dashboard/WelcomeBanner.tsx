import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Globe, Vote, Play } from 'lucide-react';

const WelcomeBanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="border border-primary/10 bg-card/80 backdrop-blur-sm rounded-xl p-6 mb-8 relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-primary/5 animate-pulse-slow"></div>
      <div className="relative z-10">
        <h1 className="font-bold text-3xl md:text-4xl mb-3 tracking-tight">
          {t('dashboard.welcome.title', 'Добро пожаловать в')} <span className="text-primary">VODECO</span>
        </h1>
        <p className="text-foreground/80 max-w-2xl">
          {t('dashboard.welcome.description', 'Децентрализованная Web3 платформа для управления водными ресурсами на основе DAO VOD ECO. Присоединяйтесь к нашей экосистеме для мониторинга, голосования и участия в инициативах по сохранению водных ресурсов.')}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/globo">
            <Button className="bg-primary hover:bg-primary/90 text-black font-medium px-5 py-2 rounded-lg transition-colors flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {t('dashboard.welcome.explore', 'Исследовать')}
            </Button>
          </Link>
          <Link href="/dao">
            <Button variant="outline" className="border border-primary hover:bg-primary/10 text-foreground font-medium px-5 py-2 rounded-lg transition-colors flex items-center">
              <Vote className="h-4 w-4 mr-2" />
              {t('dashboard.welcome.joinDao', 'Присоединиться к DAO')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
