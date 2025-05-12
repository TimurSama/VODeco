import React, { useState } from 'react';
import TokenBalance from '@/components/wallet/TokenBalance';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import Web3Connection from '@/components/wallet/Web3Connection';
import StakingOptions from '@/components/wallet/StakingOptions';
import NFTAchievements from '@/components/wallet/NFTAchievements';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

const WalletPage: React.FC = () => {
  const { connectWallet } = useWallet();
  const { toast } = useToast();
  
  const handleRefreshBalance = () => {
    toast({
      title: "Refreshing Balances",
      description: "Your token balances are being refreshed."
    });
  };

  const handleAddWallet = () => {
    connectWallet();
  };

  return (
    <section id="wallet" className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Wallet Overview */}
          <div className="lg:w-8/12">
            <h2 className="font-space font-bold text-2xl mb-6 flex items-center">
              <span className="material-icons mr-2 text-primary">account_balance_wallet</span>
              Wallet Overview
            </h2>
            
            {/* Token Balance Card */}
            <TokenBalance onRefresh={handleRefreshBalance} />
            
            {/* Transaction History */}
            <TransactionHistory />
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:w-4/12">
            {/* Web3 Connection Card */}
            <Web3Connection onAddWallet={handleAddWallet} />
            
            {/* Staking Card */}
            <StakingOptions />
            
            {/* NFT Achievements */}
            <NFTAchievements />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletPage;
