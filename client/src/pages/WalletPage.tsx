import React, { useState } from 'react';
import { Wallet, Droplet, History, Coins, ArrowUpCircle, Award, BarChart3 } from 'lucide-react';
import TokenBalance from '@/components/wallet/TokenBalance';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import Web3Connection from '@/components/wallet/Web3Connection';
import StakingOptions from '@/components/wallet/StakingOptions';
import NFTAchievements from '@/components/wallet/NFTAchievements';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const WalletPage: React.FC = () => {
  const { connectWallet, vodBalance, vodValue } = useWallet();
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
    <div className="relative">
      {/* Background hexagon grid overlay */}
      <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hexPattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="scale(1) rotate(0)">
            <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke="rgba(45, 212, 191, 0.3)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      {/* Header with wallet summary */}
      <div className="glassmorphism-dark w-full rounded-xl p-6 mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center z-10 relative">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center mr-5">
              <Wallet className="w-8 h-8 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">VOD Wallet</h1>
              <p className="text-primary/80">Manage your assets and investments</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-4xl font-bold text-white mb-1">{vodBalance.toFixed(2)} <span className="text-primary">VOD</span></div>
            <p className="text-primary/80">≈ ${vodValue.toFixed(2)} USD</p>
          </div>
        </div>
        
        {/* Animated water effect (subtle waves) */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-r from-primary/10 via-primary/30 to-accent/20 opacity-30">
          <div className="wave-animation"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="tokens" className="w-full">
            <TabsList className="w-full bg-background/20 p-1">
              <TabsTrigger value="tokens" className="flex items-center data-[state=active]:bg-primary/20">
                <Coins className="w-4 h-4 mr-2" />
                Tokens
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center data-[state=active]:bg-primary/20">
                <History className="w-4 h-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="staking" className="flex items-center data-[state=active]:bg-primary/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Staking
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tokens" className="mt-4">
              <TokenBalance onRefresh={handleRefreshBalance} />
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-4">
              <TransactionHistory />
            </TabsContent>
            
            <TabsContent value="staking" className="mt-4">
              <StakingOptions />
            </TabsContent>
          </Tabs>
          
          {/* Analytics panel */}
          <div className="glassmorphism-dark rounded-xl p-6 mb-6">
            <h3 className="font-medium text-lg text-white mb-6 flex items-center">
              <ArrowUpCircle className="w-5 h-5 mr-2 text-primary" />
              Investment Analytics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ROI Card */}
              <div className="rounded-lg bg-background/20 p-4 border border-primary/10 hover:border-primary/30 transition-all">
                <div className="text-white/60 text-sm mb-1">Average ROI</div>
                <div className="text-2xl font-bold text-white">18.7%</div>
                <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              {/* Project Exposure */}
              <div className="rounded-lg bg-background/20 p-4 border border-primary/10 hover:border-primary/30 transition-all">
                <div className="text-white/60 text-sm mb-1">Project Exposure</div>
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-primary/80 text-xs">Across 3 regions</div>
              </div>
              
              {/* Total Earned */}
              <div className="rounded-lg bg-background/20 p-4 border border-primary/10 hover:border-primary/30 transition-all">
                <div className="text-white/60 text-sm mb-1">Total Earned</div>
                <div className="text-2xl font-bold text-white">145.8 VOD</div>
                <div className="text-green-500 text-xs">+5.3% this month</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-8">
          {/* Web3 Connection Card */}
          <Web3Connection onAddWallet={handleAddWallet} />
          
          {/* NFT Achievements */}
          <NFTAchievements />
          
          {/* Actions Panel */}
          <div className="glassmorphism-dark rounded-xl p-6">
            <h3 className="font-medium text-lg text-white mb-4 flex items-center">
              <Droplet className="w-5 h-5 mr-2 text-primary" />
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-white flex flex-col items-center">
                <Award className="w-6 h-6 mb-2 text-primary" />
                <span>DAO Vote</span>
              </button>
              
              <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-white flex flex-col items-center">
                <Coins className="w-6 h-6 mb-2 text-primary" />
                <span>Stake</span>
              </button>
              
              <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-white flex flex-col items-center">
                <ArrowUpCircle className="w-6 h-6 mb-2 text-primary" />
                <span>Send</span>
              </button>
              
              <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-white flex flex-col items-center">
                <Droplet className="w-6 h-6 mb-2 text-primary" />
                <span>Projects</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
