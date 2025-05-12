import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { walletProviders } from '@/lib/web3';
import { shortenAddress } from '@/lib/utils';

const WalletConnect: React.FC = () => {
  const { account, connecting, connectWallet, disconnectWallet } = useWallet();
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  // Connect to wallet and close dialog
  const handleConnect = async (provider: string) => {
    await connectWallet(provider);
    setShowWalletOptions(false);
  };

  // If connected, show dropdown with disconnect option
  if (account) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="wallet-btn bg-gradient-to-r from-primary to-accent text-white"
          >
            <span className="material-icons mr-1 text-sm">account_balance_wallet</span>
            {shortenAddress(account)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            className="text-sm font-space cursor-pointer"
            onClick={() => navigator.clipboard.writeText(account)}
          >
            <span className="material-icons mr-1 text-sm">content_copy</span>
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-sm font-space cursor-pointer text-destructive"
            onClick={disconnectWallet}
          >
            <span className="material-icons mr-1 text-sm">logout</span>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // If not connected, show connect button
  return (
    <>
      <Button 
        onClick={() => setShowWalletOptions(true)}
        disabled={connecting}
        className="wallet-btn bg-gradient-to-r from-primary to-accent text-white font-space font-medium text-sm"
      >
        <span className="material-icons mr-1 text-sm">account_balance_wallet</span>
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      <Dialog open={showWalletOptions} onOpenChange={setShowWalletOptions}>
        <DialogContent className="glassmorphism border-primary/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white font-space">Connect your wallet</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {walletProviders.map((provider) => (
              <Button
                key={provider.provider}
                variant="outline"
                className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white"
                onClick={() => handleConnect(provider.provider)}
              >
                <div className="flex items-center">
                  <img 
                    src={provider.icon} 
                    alt={provider.name} 
                    className="w-6 h-6 mr-3"
                  />
                  <span className="font-space">{provider.name}</span>
                </div>
                <span className="material-icons text-primary">arrow_forward</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;
