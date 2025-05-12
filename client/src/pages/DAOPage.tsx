import React, { useState, useEffect } from 'react';
import ActiveProposal from '@/components/dao/ActiveProposal';
import RecentDecision from '@/components/dao/RecentDecision';
import DAOStats from '@/components/dao/DAOStats';
import CreateProposal from '@/components/dao/CreateProposal';
import UpcomingEvent from '@/components/dao/UpcomingEvent';
import { Proposal, ProposalStatus, DAOEvent } from '@/types';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Mock active proposals
const mockActiveProposals: Proposal[] = [
  {
    id: 1,
    title: 'VIP-023: Allocate Funds for Aral Sea Conservation',
    description: 'This proposal seeks to allocate 250,000 VOD tokens from the treasury to fund water conservation efforts in the Aral Sea region through a partnership with the United Nations Development Programme.',
    votesYes: 760,
    votesNo: 240,
    quorum: 63,
    requiredQuorum: 50,
    status: ProposalStatus.ACTIVE,
    endDate: new Date('2023-08-15')
  },
  {
    id: 2,
    title: 'VIP-024: Implement Water Quality Monitoring in Bukhara',
    description: 'This proposal aims to establish a network of IoT sensors for real-time water quality monitoring in the Bukhara region. The proposed budget is 180,000 VOD tokens for hardware and implementation.',
    votesYes: 920,
    votesNo: 80,
    quorum: 45,
    requiredQuorum: 50,
    status: ProposalStatus.ACTIVE,
    endDate: new Date('2023-08-20')
  }
];

// Mock recent decisions
const mockRecentDecisions: Proposal[] = [
  {
    id: 3,
    title: 'VIP-022: Educational Programs Funding',
    description: 'Allocated 100,000 VOD tokens for educational programs on water conservation.',
    votesYes: 870,
    votesNo: 130,
    quorum: 72,
    requiredQuorum: 50,
    status: ProposalStatus.PASSED,
    endDate: new Date('2023-07-12')
  },
  {
    id: 4,
    title: 'VIP-021: Modification of Governance Rules',
    description: 'Proposal to modify quorum requirements for certain types of votes.',
    votesYes: 420,
    votesNo: 580,
    quorum: 65,
    requiredQuorum: 50,
    status: ProposalStatus.FAILED,
    endDate: new Date('2023-07-08')
  },
  {
    id: 5,
    title: 'VIP-020: Partnership with UNICEF',
    description: 'Approved strategic partnership with UNICEF for clean water initiatives.',
    votesYes: 950,
    votesNo: 50,
    quorum: 68,
    requiredQuorum: 50,
    status: ProposalStatus.PASSED,
    endDate: new Date('2023-07-02')
  }
];

// Mock DAO events
const mockDAOEvents: DAOEvent[] = [
  {
    id: 1,
    title: 'Quarterly DAO Meeting',
    description: 'Review of Q2 projects and funding allocations',
    date: new Date('2023-07-24T12:00:00Z'),
    location: 'Virtual',
    isVirtual: true
  },
  {
    id: 2,
    title: 'Proposal Workshop',
    description: 'Learn how to craft effective DAO proposals',
    date: new Date('2023-07-28T14:00:00Z'),
    location: 'Virtual',
    isVirtual: true
  },
  {
    id: 3,
    title: 'Water Tech Summit',
    description: 'Innovation showcase for water technologies',
    date: new Date('2023-08-05T09:00:00Z'),
    location: 'Tashkent',
    isVirtual: false
  }
];

// Mock DAO statistics
const daoStats = {
  tvl: 4521300,
  treasury: 2843750,
  votingDistribution: {
    individuals: 45,
    corporates: 25,
    scientists: 20,
    governments: 10
  }
};

const DAOPage: React.FC = () => {
  const [activeProposals, setActiveProposals] = useState<Proposal[]>([]);
  const [recentDecisions, setRecentDecisions] = useState<Proposal[]>([]);
  const [events, setEvents] = useState<DAOEvent[]>([]);
  const [selectedProposalId, setSelectedProposalId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [voteType, setVoteType] = useState<'yes' | 'no' | null>(null);
  const { connected } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, these would be API calls
    setActiveProposals(mockActiveProposals);
    setRecentDecisions(mockRecentDecisions);
    setEvents(mockDAOEvents);
  }, []);

  const handleVoteYes = (proposalId: number) => {
    if (!connected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to vote on proposals.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedProposalId(proposalId);
    setVoteType('yes');
    setIsDialogOpen(true);
  };

  const handleVoteNo = (proposalId: number) => {
    if (!connected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to vote on proposals.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedProposalId(proposalId);
    setVoteType('no');
    setIsDialogOpen(true);
  };

  const handleInfo = (proposalId: number) => {
    const proposal = activeProposals.find(p => p.id === proposalId);
    if (proposal) {
      toast({
        title: proposal.title,
        description: "Detailed information about this proposal is available in the documentation."
      });
    }
  };

  const handleConfirmVote = () => {
    const proposal = activeProposals.find(p => p.id === selectedProposalId);
    if (proposal && voteType) {
      toast({
        title: `Vote ${voteType === 'yes' ? 'For' : 'Against'} Submitted`,
        description: `You've successfully voted ${voteType === 'yes' ? 'for' : 'against'} the proposal: ${proposal.title}`
      });
      
      // In a real app, this would update the blockchain and then refresh the data
      // For now, we'll just close the dialog
      setIsDialogOpen(false);
    }
  };

  const getSelectedProposal = () => {
    return activeProposals.find(p => p.id === selectedProposalId);
  };

  return (
    <section id="dao" className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="font-space font-bold text-2xl mb-6 flex items-center">
          <span className="material-icons mr-2 text-primary">how_to_vote</span>
          DAO Governance
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Voting Section */}
          <div className="lg:w-8/12">
            <div className="glassmorphism rounded-xl p-6 mb-6">
              <h3 className="font-space font-medium text-lg text-white mb-6">Active Proposals</h3>
              
              <div className="space-y-6">
                {activeProposals.map(proposal => (
                  <ActiveProposal 
                    key={proposal.id}
                    proposal={proposal}
                    onVoteYes={handleVoteYes}
                    onVoteNo={handleVoteNo}
                    onInfo={handleInfo}
                  />
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-primary hover:text-accent transition-colors">
                  View All Proposals
                </button>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-space font-medium text-lg text-white">Recent Decisions</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-white/70 hover:text-primary transition-colors px-3 py-1 text-sm rounded-md bg-background/50">
                    All
                  </button>
                  <button className="text-white/70 hover:text-primary transition-colors px-3 py-1 text-sm">
                    Passed
                  </button>
                  <button className="text-white/70 hover:text-primary transition-colors px-3 py-1 text-sm">
                    Failed
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentDecisions.map(decision => (
                  <RecentDecision key={decision.id} proposal={decision} />
                ))}
              </div>
            </div>
          </div>
          
          {/* DAO Sidebar */}
          <div className="lg:w-4/12">
            {/* DAO Stats */}
            <DAOStats 
              tvl={daoStats.tvl}
              treasury={daoStats.treasury}
              votingDistribution={daoStats.votingDistribution}
            />
            
            {/* Create Proposal */}
            <CreateProposal />
            
            {/* DAO Calendar */}
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="font-space font-medium text-lg text-white mb-4">Upcoming Events</h3>
              
              <div className="space-y-3">
                {events.map(event => (
                  <UpcomingEvent key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Vote Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="glassmorphism border-primary/30">
            <DialogHeader>
              <DialogTitle className="text-white font-space">
                Confirm Your Vote
              </DialogTitle>
              <DialogDescription>
                You are about to vote {voteType === 'yes' ? 'FOR' : 'AGAINST'} the following proposal:
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <h4 className="text-white font-space mb-2">{getSelectedProposal()?.title}</h4>
              <p className="text-sm text-white/70">{getSelectedProposal()?.description}</p>
              
              <div className="mt-4 p-3 bg-background/30 rounded-lg border border-white/10">
                <p className="text-sm text-white/70">
                  <span className="text-white">Important:</span> Voting requires VOD tokens. Your tokens will be locked until the vote concludes. This is an on-chain transaction and cannot be reversed.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmVote} 
                className={voteType === 'yes' ? 'bg-primary text-background' : 'bg-accent text-white'}
              >
                Confirm {voteType === 'yes' ? 'Yes' : 'No'} Vote
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DAOPage;
