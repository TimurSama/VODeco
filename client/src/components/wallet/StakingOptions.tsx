import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Mock staking data
const stakingOptions = [
  {
    id: 1,
    name: 'VOD_Uzbekistan Pool',
    apy: 15,
    capacity: 100,
    filled: 72,
    color: 'primary'
  },
  {
    id: 2,
    name: 'VOD_Aral Conservation',
    apy: 22,
    capacity: 100,
    filled: 45,
    color: 'accent'
  }
];

const StakingOptions: React.FC = () => {
  return (
    <div className="glassmorphism rounded-xl p-6 mb-6">
      <h3 className="font-space font-medium text-lg text-white mb-4">Staking Options</h3>
      
      <div className="space-y-4">
        {stakingOptions.map(option => (
          <div key={option.id} className="p-4 bg-background/50 rounded-lg">
            <div className="flex justify-between mb-2">
              <h4 className="font-space font-medium text-white">{option.name}</h4>
              <span className={`bg-${option.color === 'primary' ? 'primary' : 'accent'}/20 text-${option.color === 'primary' ? 'primary' : 'accent'} text-xs px-2 py-1 rounded-md`}>
                {option.apy}% APY
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/70">Pool Capacity</span>
                <span className="text-white">{option.filled}% Full</span>
              </div>
              <Progress value={option.filled} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-primary to-accent" />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/80 text-background font-medium py-2 rounded-lg transition-colors">
              Stake Now
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-primary hover:text-accent transition-colors text-sm">
          View All Staking Options
        </button>
      </div>
    </div>
  );
};

export default StakingOptions;
