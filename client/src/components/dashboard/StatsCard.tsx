import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  color: 'primary' | 'accent';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color }) => {
  const iconBgClass = color === 'primary' ? 'bg-primary/20' : 'bg-accent/20';
  const iconTextClass = color === 'primary' ? 'text-primary' : 'text-accent';
  const changeTextClass = color === 'primary' ? 'text-primary' : 'text-accent';
  
  return (
    <div className="glassmorphism rounded-xl p-5">
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 rounded-full ${iconBgClass} flex items-center justify-center mr-3`}>
          <span className={`material-icons ${iconTextClass}`}>{icon}</span>
        </div>
        <h3 className="font-space font-medium text-white/90">{title}</h3>
      </div>
      <p className="text-3xl font-bold font-space text-white mb-1">{value}</p>
      {change && (
        <div className="flex items-center text-sm" style={{ color: `hsl(var(--${color}))` }}>
          <span className="material-icons text-sm mr-1">trending_up</span>
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
