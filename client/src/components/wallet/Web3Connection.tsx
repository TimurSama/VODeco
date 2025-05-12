import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { shortenAddress } from '@/lib/utils';
import { Wallet, Plus, QrCode, ExternalLink, Copy, LogOut, CheckCircle, Link2 } from 'lucide-react';
import { walletProviders } from '@/lib/web3';

interface Web3ConnectionProps {
  onAddWallet: () => void;
}

const Web3Connection: React.FC<Web3ConnectionProps> = ({ onAddWallet }) => {
  const { account, connected, connectWallet, disconnectWallet } = useWallet();
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="glassmorphism-dark rounded-xl p-6 space-y-5 relative overflow-hidden">
      {/* Hex pattern background */}
      <div className="absolute right-0 top-0 w-32 h-32 opacity-10 -translate-y-1/4 translate-x-1/4">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,0 95,25 95,75 50,100 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        </svg>
      </div>
      
      <div className="flex justify-between items-center relative z-10">
        <h3 className="font-medium text-lg text-white flex items-center">
          <Wallet className="h-5 w-5 mr-2 text-primary" />
          Wallet Connections
        </h3>
        {connected && (
          <button 
            onClick={disconnectWallet}
            className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center"
          >
            <LogOut className="h-3 w-3 mr-1" />
            Disconnect
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {connected ? (
          // Connected Wallet
          <div className="p-5 bg-gradient-to-br from-background/40 to-background/20 rounded-lg border border-primary/20 relative overflow-hidden group">
            {/* Subtle wallet pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-background/30 border border-primary/30 flex items-center justify-center mr-3 shadow-inner shadow-primary/5">
                  <img 
                    src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg" 
                    alt="MetaMask logo" 
                    className="w-8 h-8" 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white text-base flex items-center">
                    MetaMask
                    <span className="inline-flex w-2 h-2 bg-green-400 rounded-full ml-2 relative animate-pulse">
                      <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></span>
                    </span>
                  </h4>
                  <div className="text-white/60 text-xs mt-1 flex items-center">
                    <span className="font-mono">{shortenAddress(account || '')}</span>
                    <button 
                      onClick={() => copyToClipboard(account || '')}
                      className="ml-2 text-primary hover:text-accent transition-colors"
                      aria-label="Copy address to clipboard"
                    >
                      {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full bg-background/40 flex items-center justify-center text-white/70 hover:text-primary transition-colors">
                  <QrCode className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-background/40 flex items-center justify-center text-white/70 hover:text-primary transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-primary/10 flex items-center justify-between text-xs text-white/50">
              <span>Default Network: Ethereum</span>
              <span>Chain ID: 1</span>
            </div>
          </div>
        ) : (
          // No connected wallets
          showConnectOptions ? (
            <div className="bg-background/20 rounded-lg p-5 border border-primary/20">
              <h4 className="text-white font-medium mb-4">Connect with:</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {walletProviders.map((provider, index) => (
                  <button 
                    key={index}
                    className="p-3 bg-background/30 hover:bg-background/40 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex flex-col items-center justify-center"
                    onClick={() => connectWallet(provider.name.toLowerCase())}
                  >
                    {/* Here we could use the provider icons but for simplicity we'll use a placeholder */}
                    <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center mb-2">
                      <img src={provider.icon} alt={`${provider.name} logo`} className="w-6 h-6" />
                    </div>
                    <span className="text-white text-sm">{provider.name}</span>
                  </button>
                ))}
                
                <button 
                  className="p-3 bg-background/30 hover:bg-background/40 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex flex-col items-center justify-center"
                  onClick={() => connectWallet('walletconnect')}
                >
                  <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center mb-2 text-primary">
                    <Link2 className="h-6 w-6" />
                  </div>
                  <span className="text-white text-sm">WalletConnect</span>
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <button 
                  className="text-primary hover:text-accent transition-colors text-sm"
                  onClick={() => setShowConnectOptions(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-background/20 rounded-lg border border-primary/10">
              <div className="w-16 h-16 mx-auto bg-background/30 rounded-full flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-primary/70" />
              </div>
              <h4 className="text-white font-medium mb-2">No Wallet Connected</h4>
              <p className="text-white/60 text-sm mb-4">Connect a wallet to manage your digital assets and participate in VODeco governance.</p>
              <Button 
                className="bg-primary hover:bg-primary/80 text-black"
                onClick={() => setShowConnectOptions(true)}
              >
                Connect Wallet
              </Button>
            </div>
          )
        )}
        
        {/* Connect More Wallets - only show when already connected */}
        {connected && (
          <Button 
            variant="outline" 
            className="w-full p-3 border border-dashed border-primary/30 hover:border-primary/50 hover:bg-background/20 transition-all flex items-center justify-center gap-2"
            onClick={onAddWallet}
          >
            <Plus className="h-4 w-4 text-primary" />
            <span className="text-white">Connect Additional Wallet</span>
          </Button>
        )}
        
        {connected && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-background/20 border border-primary/10">
              <div className="text-white/50 text-xs mb-1">VOD Balance</div>
              <div className="text-white font-medium text-lg">325.42</div>
            </div>
            <div className="p-3 rounded-lg bg-background/20 border border-primary/10">
              <div className="text-white/50 text-xs mb-1">DAO Voting Power</div>
              <div className="text-primary font-medium text-lg">12.8%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Web3Connection;
