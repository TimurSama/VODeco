import React from 'react';
import { useTranslation } from 'react-i18next';
import StatsCard from '@/components/dashboard/StatsCard';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="dashboard" className="py-8 px-4">
      <div className="container mx-auto">
        {/* Welcome Banner */}
        <WelcomeBanner />
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Water Resources Stats */}
          <StatsCard 
            title={t('dashboard.stats.waterResources', 'Водные ресурсы')} 
            value="157" 
            change={t('dashboard.stats.waterResourcesChange', '+12% с прошлого месяца')} 
            icon="water_drop" 
            color="primary" 
          />
          
          {/* Active Votes Stats */}
          <StatsCard 
            title={t('dashboard.stats.activeVotes', 'Активные голосования')} 
            value="23" 
            change={t('dashboard.stats.activeVotesChange', '5 скоро закрываются')} 
            icon="how_to_vote" 
            color="accent" 
          />
          
          {/* DAO Members Stats */}
          <StatsCard 
            title={t('dashboard.stats.daoMembers', 'Участники ДАО')} 
            value="3,782" 
            change={t('dashboard.stats.daoMembersChange', '+241 за эту неделю')} 
            icon="groups" 
            color="primary" 
          />
          
          {/* VOD Price Stats */}
          <StatsCard 
            title={t('dashboard.stats.vodPrice', 'Цена VOD')} 
            value="$0.87" 
            change={t('dashboard.stats.vodPriceChange', '+3.4% (24ч)')} 
            icon="currency_bitcoin" 
            color="accent" 
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
