import React, { useState } from 'react';
import { formatDateRelative, shortenAddress } from '@/lib/utils';
import { useWallet } from '@/context/WalletContext';
import { TransactionType, TransactionStatus } from '@/types';
import { History, ArrowDownLeft, ArrowUpRight, Diamond, Vote, ChevronDown, Clock, Search, Filter } from 'lucide-react';

type FilterType = 'All' | 'Received' | 'Sent' | 'Staking' | 'DAO';

const TransactionHistory: React.FC = () => {
  const { transactions } = useWallet();
  const [filter, setFilter] = useState<FilterType>('All');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  const filteredTransactions = filter === 'All' 
    ? transactions 
    : transactions.filter(tx => 
        filter === 'DAO' 
          ? tx.type === TransactionType.DAO_VOTE 
          : tx.type === filter);

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.RECEIVED:
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />;
      case TransactionType.SENT:
        return <ArrowUpRight className="h-4 w-4 text-accent" />;
      case TransactionType.STAKING:
        return <Diamond className="h-4 w-4 text-primary" />;
      case TransactionType.DAO_VOTE:
        return <Vote className="h-4 w-4 text-yellow-400" />;
      default:
        return <Clock className="h-4 w-4 text-white/70" />;
    }
  };
  
  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return (
          <span className="px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5"></span>
            {status}
          </span>
        );
      case TransactionStatus.PENDING:
        return (
          <span className="px-2 py-1 rounded-full bg-yellow-900/30 text-yellow-400 text-xs flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5"></span>
            {status}
          </span>
        );
      case TransactionStatus.FAILED:
        return (
          <span className="px-2 py-1 rounded-full bg-red-900/30 text-red-400 text-xs flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5"></span>
            {status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glassmorphism-dark rounded-xl p-6 space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg text-white flex items-center">
          <History className="h-5 w-5 mr-2 text-primary" />
          Transaction History
        </h3>
        
        <div className="flex items-center">
          <div className="relative mr-2">
            <input 
              type="text" 
              placeholder="Search..."
              className="py-1 px-3 pl-8 text-sm rounded-full bg-background/30 border-none text-white/70 w-32 focus:w-40 transition-all focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <Search className="absolute left-2.5 top-1.5 h-3.5 w-3.5 text-white/40" />
          </div>
          
          <div className="flex bg-background/30 rounded-full p-0.5">
            {(['All', 'Received', 'Sent', 'Staking', 'DAO'] as FilterType[]).map(type => (
              <button 
                key={type}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  filter === type 
                    ? 'bg-primary text-background font-medium' 
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-background/20 rounded-xl overflow-hidden border border-primary/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background/40 text-left text-white/70 text-xs">
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Token</th>
                <th className="p-3 font-medium">Amount</th>
                <th className="p-3 font-medium hidden md:table-cell">Date</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium text-right">Details</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(transaction => (
                  <React.Fragment key={transaction.id}>
                    <tr className="border-b border-white/5 hover:bg-background/30 transition-colors cursor-pointer">
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-full bg-background/40 flex items-center justify-center mr-2">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <span className="hidden md:inline">{transaction.type}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center mr-1.5 text-[10px] text-primary font-bold">
                            {transaction.token.substring(0,1)}
                          </div>
                          {transaction.token}
                        </div>
                      </td>
                      <td className={`p-3 font-medium ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-accent'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                      </td>
                      <td className="p-3 text-white/70 hidden md:table-cell">{formatDateRelative(transaction.date)}</td>
                      <td className="p-3">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => setShowDetails(showDetails === transaction.id ? null : transaction.id)}
                          className="text-primary hover:text-accent transition-colors"
                        >
                          <ChevronDown className={`h-5 w-5 transition-transform ${showDetails === transaction.id ? 'rotate-180' : ''}`} />
                        </button>
                      </td>
                    </tr>
                    
                    {/* Detail row */}
                    {showDetails === transaction.id && (
                      <tr className="bg-background/10">
                        <td colSpan={6} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <p className="text-white/50 text-xs">Transaction ID</p>
                              <p className="text-white font-mono text-xs">{transaction.id}</p>
                            </div>
                            
                            {transaction.from && (
                              <div className="space-y-1">
                                <p className="text-white/50 text-xs">From</p>
                                <p className="text-white font-mono text-xs">{shortenAddress(transaction.from)}</p>
                              </div>
                            )}
                            
                            {transaction.to && (
                              <div className="space-y-1">
                                <p className="text-white/50 text-xs">To</p>
                                <p className="text-white font-mono text-xs">{shortenAddress(transaction.to)}</p>
                              </div>
                            )}
                            
                            {transaction.type === TransactionType.STAKING && (
                              <div className="space-y-1">
                                <p className="text-white/50 text-xs">Stake Period</p>
                                <p className="text-white text-xs">30 Days</p>
                              </div>
                            )}
                            
                            {transaction.type === TransactionType.DAO_VOTE && (
                              <div className="space-y-1">
                                <p className="text-white/50 text-xs">Proposal</p>
                                <p className="text-white text-xs">Aral Sea Restoration Fund</p>
                              </div>
                            )}
                            
                            <div className="md:col-span-3 pt-2">
                              <button className="text-primary hover:text-accent transition-colors text-xs">
                                View on Blockchain Explorer
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-white/50">
                    <Filter className="h-5 w-5 mx-auto mb-2 opacity-50" />
                    <p>No transactions found for the selected filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-between items-center px-4">
        <button className="text-white/50 hover:text-white transition-colors text-xs disabled:opacity-50" disabled>
          Previous
        </button>
        
        <div className="flex items-center space-x-1">
          <button className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">1</button>
          <button className="w-6 h-6 rounded-full hover:bg-background/30 text-white/70 hover:text-white text-xs">2</button>
          <button className="w-6 h-6 rounded-full hover:bg-background/30 text-white/70 hover:text-white text-xs">3</button>
        </div>
        
        <button className="text-primary hover:text-accent transition-colors text-xs">
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
