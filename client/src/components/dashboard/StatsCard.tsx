import React from 'react';
import { DropletIcon, Vote, UsersRound, Coins } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  color: 'primary' | 'accent' | 'secondary';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color }) => {
  const getIconBgClass = () => {
    switch(color) {
      case 'primary': return 'bg-primary/10';
      case 'accent': return 'bg-accent/10';
      case 'secondary': return 'bg-secondary/10';
      default: return 'bg-primary/10';
    }
  };
  
  const getIconTextClass = () => {
    switch(color) {
      case 'primary': return 'text-primary';
      case 'accent': return 'text-accent';
      case 'secondary': return 'text-secondary';
      default: return 'text-primary';
    }
  };

  const getIcon = () => {
    switch(icon) {
      case 'water_drop': return <DropletIcon className="h-5 w-5" />;
      case 'how_to_vote': return <Vote className="h-5 w-5" />;
      case 'groups': return <UsersRound className="h-5 w-5" />;
      case 'currency_bitcoin': return <Coins className="h-5 w-5" />;
      default: return <DropletIcon className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="border border-primary/10 bg-card/80 backdrop-blur-sm rounded-xl p-5 hover:shadow-md hover:shadow-primary/5 transition-all">
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 hexagon ${getIconBgClass()} flex items-center justify-center mr-3`}>
          <span className={getIconTextClass()}>
            {getIcon()}
          </span>
        </div>
        <h3 className="font-medium text-foreground/90">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      {change && (
        <div className={`flex items-center text-sm ${getIconTextClass()}`}>
          <span className="text-sm mr-1">↗</span>
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
