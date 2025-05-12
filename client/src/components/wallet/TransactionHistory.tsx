import React, { useState } from 'react';
import { formatDateRelative } from '@/lib/utils';
import { useWallet } from '@/context/WalletContext';
import { TransactionType } from '@/types';

type FilterType = 'All' | 'Received' | 'Sent' | 'Staking';

const TransactionHistory: React.FC = () => {
  const { transactions } = useWallet();
  const [filter, setFilter] = useState<FilterType>('All');
  
  const filteredTransactions = filter === 'All' 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);

  return (
    <div className="glassmorphism rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-space font-medium text-lg text-white">Transaction History</h3>
        <div className="flex items-center space-x-2">
          {(['All', 'Received', 'Sent', 'Staking'] as FilterType[]).map(type => (
            <button 
              key={type}
              className={`text-white/70 hover:text-primary transition-colors px-3 py-1 text-sm ${
                filter === type ? 'rounded-md bg-background/50' : ''
              }`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/70 text-sm border-b border-white/10">
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Token</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-white/5">
                  <td className="py-3">
                    <div className="flex items-center">
                      <span className={`material-icons mr-2 ${
                        transaction.type === TransactionType.RECEIVED 
                          ? 'text-accent' 
                          : transaction.type === TransactionType.STAKING 
                            ? 'text-primary' 
                            : transaction.type === TransactionType.DAO_VOTE 
                              ? 'text-yellow-400'
                              : 'text-primary'
                      }`}>
                        {transaction.type === TransactionType.RECEIVED 
                          ? 'call_received' 
                          : transaction.type === TransactionType.SENT 
                            ? 'call_made' 
                            : transaction.type === TransactionType.STAKING 
                              ? 'diamond' 
                              : 'how_to_vote'}
                      </span>
                      {transaction.type}
                    </div>
                  </td>
                  <td className="py-3">{transaction.token}</td>
                  <td className={`py-3 font-medium ${
                    transaction.amount > 0 ? 'text-primary' : 'text-accent'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 text-white/70">{formatDateRelative(transaction.date)}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-white/50">
                  No transactions found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-primary hover:text-accent transition-colors text-sm">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
