import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectWallet, getTokenBalance, getTokenValueUSD } from '@/lib/web3';
import { Transaction } from '@/types';
import { mockTransactions } from '@/lib/web3';
import { useToast } from '@/hooks/use-toast';

interface WalletContextType {
  account: string | null;
  connecting: boolean;
  connected: boolean;
  connectWallet: (provider?: string) => Promise<void>;
  disconnectWallet: () => void;
  vodBalance: number;
  vodValue: number;
  subTokenBalances: Record<string, number>;
  transactions: Transaction[];
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  connecting: false,
  connected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  vodBalance: 0,
  vodValue: 0,
  subTokenBalances: {},
  transactions: [],
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [vodBalance, setVodBalance] = useState(0);
  const [vodValue, setVodValue] = useState(0);
  const [subTokenBalances, setSubTokenBalances] = useState<Record<string, number>>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  // Check for existing connection
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setAccount(window.ethereum.selectedAddress);
        
        // Load balances for connected account
        await loadBalances(window.ethereum.selectedAddress);
      }
    };
    
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setAccount(null);
          setVodBalance(0);
          setSubTokenBalances({});
        } else {
          setAccount(accounts[0]);
          loadBalances(accounts[0]);
        }
      });
    }

    // Load mock transactions
    setTransactions(mockTransactions);

    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  // Load balances whenever account changes
  useEffect(() => {
    if (account) {
      loadBalances(account);
    }
  }, [account]);

  const loadBalances = async (address: string) => {
    try {
      // Get VOD main token balance
      const vod = await getTokenBalance(address, 'VOD');
      setVodBalance(vod);
      setVodValue(getTokenValueUSD(vod, 'VOD'));
      
      // Get subtokens balances
      const uzbekistan = await getTokenBalance(address, 'VOD_Uzbekistan');
      const aral = await getTokenBalance(address, 'VOD_Aral');
      const ural = await getTokenBalance(address, 'VOD_Ural');
      
      setSubTokenBalances({
        'VOD_Uzbekistan': uzbekistan,
        'VOD_Aral': aral,
        'VOD_Ural': ural
      });
    } catch (error) {
      console.error('Error loading balances:', error);
    }
  };

  const connect = async (provider?: string) => {
    try {
      setConnecting(true);
      const address = await connectWallet(provider);
      
      if (address) {
        setAccount(address);
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
      console.error('Failed to connect wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setVodBalance(0);
    setSubTokenBalances({});
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <WalletContext.Provider 
      value={{
        account,
        connecting,
        connected: !!account,
        connectWallet: connect,
        disconnectWallet: disconnect,
        vodBalance,
        vodValue,
        subTokenBalances,
        transactions,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
