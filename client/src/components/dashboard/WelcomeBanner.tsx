import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const WelcomeBanner: React.FC = () => {
  return (
    <div className="glassmorphism rounded-xl p-6 mb-8 relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-primary/10 animate-pulse"></div>
      <div className="relative z-10">
        <h1 className="font-space font-bold text-3xl md:text-4xl mb-2">
          Welcome to <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">VODeco</span>
        </h1>
        <p className="text-white/70 max-w-2xl">
          Decentralized Web3 platform for water resource management based on VOD (Value of Data) DAO. Join our ecosystem to monitor, vote, and participate in water conservation initiatives.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/globo">
            <Button className="bg-primary hover:bg-primary/80 text-card font-medium px-5 py-2 rounded-lg transition-colors flex items-center">
              <span className="material-icons mr-1">explore</span>
              Explore Platform
            </Button>
          </Link>
          <Link href="/dao">
            <Button variant="outline" className="border border-accent hover:bg-accent/10 text-white font-medium px-5 py-2 rounded-lg transition-colors flex items-center">
              <span className="material-icons mr-1">how_to_vote</span>
              Join DAO
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
