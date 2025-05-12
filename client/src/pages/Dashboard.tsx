import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';

const Dashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-8 px-4">
      <div className="container mx-auto">
        {/* Welcome Banner */}
        <WelcomeBanner />
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Water Resources Stats */}
          <StatsCard 
            title="Water Resources" 
            value="157" 
            change="+12% from last month" 
            icon="water_drop" 
            color="primary" 
          />
          
          {/* Active Votes Stats */}
          <StatsCard 
            title="Active Votes" 
            value="23" 
            change="5 closing soon" 
            icon="how_to_vote" 
            color="accent" 
          />
          
          {/* DAO Members Stats */}
          <StatsCard 
            title="DAO Members" 
            value="3,782" 
            change="+241 this week" 
            icon="groups" 
            color="primary" 
          />
          
          {/* VOD Price Stats */}
          <StatsCard 
            title="VOD Price" 
            value="$0.87" 
            change="+3.4% (24h)" 
            icon="currency_bitcoin" 
            color="accent" 
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
