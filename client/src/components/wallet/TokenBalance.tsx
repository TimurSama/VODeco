import React, { useState } from 'react';
import { formatTokenAmount } from '@/lib/utils';
import { useWallet } from '@/context/WalletContext';
import { RefreshCw, ArrowUp, ArrowDown, Globe, Droplet, Mountain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TokenBalanceProps {
  onRefresh?: () => void;
}

// Subtoken data for visual elements
const subtokenIcons = {
  'VOD_Uzbekistan': <Globe className="h-4 w-4 text-primary" />,
  'VOD_Aral': <Droplet className="h-4 w-4 text-accent" />,
  'VOD_Ural': <Mountain className="h-4 w-4 text-primary" />
};

const subtokenColors = {
  'VOD_Uzbekistan': 'from-primary/60 to-primary',
  'VOD_Aral': 'from-accent/60 to-accent',
  'VOD_Ural': 'from-primary/80 to-primary'
};

const TokenBalance: React.FC<TokenBalanceProps> = ({ onRefresh }) => {
  const { vodBalance, vodValue, subTokenBalances } = useWallet();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    
    // Simulate refresh completion
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };
  
  // Calculate total subtoken balance
  const totalSubtokenBalance = Object.values(subTokenBalances).reduce((acc, val) => acc + val, 0);

  return (
    <div className="glassmorphism-dark rounded-xl p-6 space-y-6 relative overflow-hidden">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg text-white">Token Assets</h3>
        <button 
          className={`text-primary hover:text-accent transition-all flex items-center text-sm rounded-full px-3 py-1.5 bg-background/30 hover:bg-background/50 ${isRefreshing ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      {/* Main Token Card with pulsating effect */}
      <div className="p-5 bg-gradient-to-br from-background/70 to-background/30 rounded-xl border border-primary/20 shadow-sm shadow-primary/10 relative overflow-hidden group">
        {/* Pulsating background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pulse-animation"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center mr-4 shadow-md shadow-primary/20">
              <span className="font-bold text-background text-sm">VOD</span>
            </div>
            <div>
              <h4 className="font-medium text-white text-lg">VOD Token</h4>
              <div className="flex items-center text-white/60 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary mr-2">Main</span>
                Governance Token
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-2xl text-white group-hover:text-primary transition-colors">
              {formatTokenAmount(vodBalance)}
              <span className="inline-flex items-center text-sm text-green-400 ml-2">
                <ArrowUp className="h-3 w-3 mr-0.5" /> 2.3%
              </span>
            </p>
            <p className="text-primary/80 text-sm">≈ ${formatTokenAmount(vodValue)} USD</p>
          </div>
        </div>
      </div>
      
      {/* Subtokens Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-sm text-white/70">Regional Subtokens</h4>
          <span className="text-xs text-white/40">{Object.keys(subTokenBalances).length} tokens</span>
        </div>
        
        <div className="space-y-4">
          {Object.entries(subTokenBalances).map(([tokenName, balance]) => (
            <div 
              key={tokenName}
              className="p-3 bg-background/20 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${subtokenColors[tokenName]} flex items-center justify-center mr-3 shadow-inner shadow-background/30`}>
                  {subtokenIcons[tokenName]}
                </div>
                <div>
                  <h5 className="font-medium text-white text-sm group-hover:text-primary transition-colors">{tokenName}</h5>
                  <div className="flex items-center mt-1">
                    <Progress 
                      value={(balance / totalSubtokenBalance) * 100} 
                      className="h-1.5 w-20 bg-white/10" 
                      indicatorClassName={`bg-gradient-to-r ${subtokenColors[tokenName]}`}
                    />
                    <span className="text-white/40 text-xs ml-2">
                      {totalSubtokenBalance > 0 
                        ? `${((balance / totalSubtokenBalance) * 100).toFixed(1)}%` 
                        : '0%'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-white group-hover:text-primary transition-colors">
                  {formatTokenAmount(balance)}
                </p>
                {/* Randomized price movement for demo */}
                <div className={`flex items-center justify-end text-xs ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                  {Math.random() > 0.5 ? (
                    <>
                      <ArrowUp className="h-3 w-3 mr-0.5" /> 
                      {(Math.random() * 5).toFixed(1)}%
                    </>
                  ) : (
                    <>
                      <ArrowDown className="h-3 w-3 mr-0.5" /> 
                      {(Math.random() * 5).toFixed(1)}%
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
