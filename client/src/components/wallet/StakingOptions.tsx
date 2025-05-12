import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, PieChart, TrendingUp, Droplet, Globe } from 'lucide-react';

// Improved staking data with more details
const stakingOptions = [
  {
    id: 1,
    name: 'VOD_Uzbekistan Pool',
    description: 'Support water conservation in Uzbekistan',
    apy: 15.7,
    minStake: 100,
    lockPeriod: 30,
    capacity: 50000,
    filled: 72,
    color: 'primary',
    icon: <Globe className="h-5 w-5" />
  },
  {
    id: 2,
    name: 'VOD_Aral Conservation',
    description: 'Fund Aral Sea restoration projects',
    apy: 22.3,
    minStake: 250,
    lockPeriod: 60,
    capacity: 75000,
    filled: 45,
    color: 'accent',
    icon: <Droplet className="h-5 w-5" />
  }
];

const StakingOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  return (
    <div className="glassmorphism-dark rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg text-white flex items-center">
          <PieChart className="h-5 w-5 mr-2 text-primary" />
          Staking Pools
        </h3>
        <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">
          2 Available Pools
        </span>
      </div>
      
      {/* Circular ROI visualization */}
      <div className="flex items-center justify-between gap-4 p-4 bg-background/30 rounded-xl">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border-4 border-primary/30 flex items-center justify-center mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-primary" 
                style={{ 
                  clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%)',
                  transform: 'rotate(45deg)'
                }} 
            />
            <span className="text-lg font-bold text-white">15.7%</span>
          </div>
          <p className="text-white/60 text-xs mt-2">Avg. APY</p>
        </div>
        
        <div className="flex-1">
          <h4 className="text-white font-medium">Pool Highlights</h4>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center text-white/70 text-sm">
              <Clock className="h-4 w-4 mr-1 text-primary/70" />
              <span>30-60 Days Lock</span>
            </div>
            <div className="flex items-center text-white/70 text-sm">
              <TrendingUp className="h-4 w-4 mr-1 text-primary/70" />
              <span>High Returns</span>
            </div>
            <div className="flex items-center text-white/70 text-sm">
              <Calendar className="h-4 w-4 mr-1 text-primary/70" />
              <span>Monthly Rewards</span>
            </div>
            <div className="flex items-center text-white/70 text-sm">
              <Droplet className="h-4 w-4 mr-1 text-primary/70" />
              <span>Water Projects</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {stakingOptions.map(option => (
          <div 
            key={option.id} 
            className={`p-4 bg-background/20 hover:bg-background/30 rounded-lg border border-primary/10 hover:border-primary/30 transition-all cursor-pointer ${selectedOption === option.id ? 'border-primary/50 bg-background/40' : ''}`}
            onClick={() => setSelectedOption(option.id === selectedOption ? null : option.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-${option.color === 'primary' ? 'primary' : 'accent'}/20 text-${option.color === 'primary' ? 'primary' : 'accent'}`}>
                {option.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-white">{option.name}</h4>
                  <span className={`bg-${option.color === 'primary' ? 'primary' : 'accent'}/20 text-${option.color === 'primary' ? 'primary' : 'accent'} text-xs px-2 py-1 rounded-full flex items-center`}>
                    {option.apy}% APY
                  </span>
                </div>
                
                <p className="text-white/60 text-xs mb-3">{option.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">Pool Capacity</span>
                    <span className="text-white">{option.filled}% Full</span>
                  </div>
                  <Progress 
                    value={option.filled} 
                    className={`h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-${option.color === 'primary' ? 'primary/60' : 'accent/60'} [&>div]:to-${option.color === 'primary' ? 'primary' : 'accent'}`} 
                  />
                </div>
                
                {selectedOption === option.id && (
                  <div className="grid grid-cols-3 gap-2 mb-3 mt-4 p-2 bg-background/30 rounded-lg">
                    <div className="text-center">
                      <p className="text-white/60 text-xs">Min Stake</p>
                      <p className="text-white font-medium">{option.minStake} VOD</p>
                    </div>
                    <div className="text-center border-x border-primary/10">
                      <p className="text-white/60 text-xs">Lock Period</p>
                      <p className="text-white font-medium">{option.lockPeriod} Days</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-xs">Total Staked</p>
                      <p className="text-white font-medium">{(option.capacity * option.filled / 100).toLocaleString()} VOD</p>
                    </div>
                  </div>
                )}
                
                {selectedOption === option.id && (
                  <div className="flex space-x-2">
                    <Button className={`flex-1 bg-${option.color === 'primary' ? 'primary' : 'accent'} hover:bg-${option.color === 'primary' ? 'primary/80' : 'accent/80'} text-background`}>
                      Stake Now
                    </Button>
                    <Button variant="outline" className="border-primary/30 text-primary">
                      Details
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 text-center">
        <button className="text-primary hover:text-accent transition-colors text-sm px-4 py-2 rounded-full hover:bg-primary/10">
          View All Staking Options
        </button>
      </div>
    </div>
  );
};

export default StakingOptions;
