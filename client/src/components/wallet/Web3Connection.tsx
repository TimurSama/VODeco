import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { shortenAddress } from '@/lib/utils';

// Mock wallet connections data
const walletConnections = [
  {
    name: 'MetaMask',
    icon: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
    address: '0x71C...4E39',
    status: 'connected'
  }
];

interface Web3ConnectionProps {
  onAddWallet: () => void;
}

const Web3Connection: React.FC<Web3ConnectionProps> = ({ onAddWallet }) => {
  const { account } = useWallet();
  
  return (
    <div className="glassmorphism rounded-xl p-6 mb-6">
      <h3 className="font-space font-medium text-lg text-white mb-4">Web3 Connections</h3>
      
      <div className="space-y-4">
        {account ? (
          // Connected Wallet
          <div className="p-4 bg-background/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg" 
                alt="MetaMask logo" 
                className="w-8 h-8 rounded-full mr-3" 
              />
              <div>
                <h4 className="font-space font-medium text-white">MetaMask</h4>
                <p className="text-white/60 text-xs">{shortenAddress(account)}</p>
              </div>
            </div>
            <div>
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              <span className="text-xs text-white/70">Connected</span>
            </div>
          </div>
        ) : (
          // No connected wallets
          <div className="p-4 bg-background/30 rounded-lg border border-white/10">
            <p className="text-white/60 text-sm">No wallets connected. Connect a wallet to manage your assets.</p>
          </div>
        )}
        
        {/* Connect More Wallets */}
        <Button 
          variant="outline" 
          className="w-full p-4 bg-background/30 border border-dashed border-white/20 hover:border-primary/50 transition-colors flex items-center justify-between"
          onClick={onAddWallet}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
              <span className="material-icons text-white/70">add</span>
            </div>
            <div>
              <h4 className="font-space font-medium text-white">Connect Wallet</h4>
              <p className="text-white/60 text-xs">TrustWallet, WalletConnect...</p>
            </div>
          </div>
          <span className="material-icons text-white/50">chevron_right</span>
        </Button>
      </div>
    </div>
  );
};

export default Web3Connection;
