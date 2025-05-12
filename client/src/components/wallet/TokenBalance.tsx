import React from 'react';
import { formatTokenAmount } from '@/lib/utils';
import { useWallet } from '@/context/WalletContext';

interface TokenBalanceProps {
  onRefresh?: () => void;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ onRefresh }) => {
  const { vodBalance, vodValue, subTokenBalances } = useWallet();

  return (
    <div className="glassmorphism rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-space font-medium text-lg text-white">Token Balance</h3>
        <button 
          className="text-primary hover:text-accent transition-colors flex items-center text-sm"
          onClick={onRefresh}
        >
          <span className="material-icons text-sm mr-1">refresh</span>
          Refresh
        </button>
      </div>
      
      {/* Main Token Balance */}
      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center mr-3">
            <span className="font-space font-bold text-white text-xs">VOD</span>
          </div>
          <div>
            <h4 className="font-space font-medium text-white">VOD Token</h4>
            <p className="text-white/60 text-sm">Main Governance Token</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-space font-bold text-xl text-white">{formatTokenAmount(vodBalance)}</p>
          <p className="text-primary text-sm">≈ ${formatTokenAmount(vodValue)}</p>
        </div>
      </div>
      
      {/* Subtoken Balances */}
      <h4 className="font-space font-medium text-sm text-white/70 mb-3">Subtokens by Region</h4>
      <div className="space-y-3">
        {/* Uzbekistan Token */}
        <div className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <span className="font-space font-bold text-primary text-xs">UZ</span>
            </div>
            <div>
              <h5 className="font-space font-medium text-white text-sm">VOD_Uzbekistan</h5>
            </div>
          </div>
          <div className="text-right">
            <p className="font-space font-bold text-white">
              {formatTokenAmount(subTokenBalances['VOD_Uzbekistan'] || 0)}
            </p>
          </div>
        </div>
        
        {/* Aral Token */}
        <div className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <span className="font-space font-bold text-accent text-xs">AR</span>
            </div>
            <div>
              <h5 className="font-space font-medium text-white text-sm">VOD_Aral</h5>
            </div>
          </div>
          <div className="text-right">
            <p className="font-space font-bold text-white">
              {formatTokenAmount(subTokenBalances['VOD_Aral'] || 0)}
            </p>
          </div>
        </div>
        
        {/* Ural Token */}
        <div className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <span className="font-space font-bold text-primary text-xs">UR</span>
            </div>
            <div>
              <h5 className="font-space font-medium text-white text-sm">VOD_Ural</h5>
            </div>
          </div>
          <div className="text-right">
            <p className="font-space font-bold text-white">
              {formatTokenAmount(subTokenBalances['VOD_Ural'] || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
