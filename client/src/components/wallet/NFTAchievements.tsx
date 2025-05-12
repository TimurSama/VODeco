import React, { useState } from 'react';
import { Award, Shield, Droplet, Lightbulb, HelpCircle } from 'lucide-react';

// Enhanced NFT achievements with descriptions and dates
const achievements = [
  {
    id: 1,
    name: 'Water Guardian',
    level: 'Level 2 Certification',
    description: 'Certified authority in monitoring water quality standards',
    dateAcquired: new Date(2023, 8, 15),
    icon: <Shield className="h-8 w-8 text-primary" />,
    color: 'primary',
    glow: true
  },
  {
    id: 2,
    name: 'DAO Participant',
    level: '10+ Votes Cast',
    description: 'Active participant in VODeco governance decisions',
    dateAcquired: new Date(2023, 10, 22),
    icon: <Award className="h-8 w-8 text-accent" />,
    color: 'accent'
  },
  {
    id: 3,
    name: 'Conservation Pioneer',
    level: 'Early Adopter',
    description: 'Founding contributor to Aral Sea restoration initiative',
    dateAcquired: new Date(2023, 6, 5),
    icon: <Droplet className="h-8 w-8 text-primary" />,
    color: 'primary'
  },
  {
    id: 4,
    name: 'Innovation Award',
    level: 'Technical Contributor',
    description: 'Recognized for water purification technology implementation',
    dateAcquired: new Date(2023, 11, 10),
    icon: <Lightbulb className="h-8 w-8 text-accent" />,
    color: 'accent',
    glow: true
  }
];

const NFTAchievements: React.FC = () => {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  
  return (
    <div className="glassmorphism-dark rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-lg text-white flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary" />
          NFT Achievements
        </h3>
        <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent flex items-center">
          {achievements.length} Earned
        </span>
      </div>
      
      {selectedNFT !== null ? (
        // Detail view
        <div className="space-y-4">
          <button 
            onClick={() => setSelectedNFT(null)}
            className="text-primary hover:text-accent transition-colors text-sm flex items-center"
          >
            ← Back to All
          </button>
          
          <div className="bg-background/30 rounded-xl p-5 border border-primary/20 flex flex-col items-center">
            <div className={`w-24 h-24 rounded-xl bg-gradient-to-br from-${achievements[selectedNFT].color === 'primary' ? 'primary/20' : 'accent/20'} to-${achievements[selectedNFT].color === 'primary' ? 'primary/5' : 'accent/5'} flex items-center justify-center mb-4 ${achievements[selectedNFT].glow ? 'animate-pulse' : ''}`}>
              {achievements[selectedNFT].icon}
            </div>
            
            <h3 className="text-xl font-medium text-white mb-1">{achievements[selectedNFT].name}</h3>
            <div className={`text-xs px-2 py-1 rounded-full bg-${achievements[selectedNFT].color === 'primary' ? 'primary' : 'accent'}/20 text-${achievements[selectedNFT].color === 'primary' ? 'primary' : 'accent'} mb-3`}>
              {achievements[selectedNFT].level}
            </div>
            
            <p className="text-white/70 text-center mb-4">{achievements[selectedNFT].description}</p>
            
            <div className="w-full grid grid-cols-2 gap-3 text-center">
              <div className="p-2 bg-background/20 rounded-lg">
                <p className="text-white/50 text-xs mb-1">Acquired On</p>
                <p className="text-white text-sm">{achievements[selectedNFT].dateAcquired.toLocaleDateString()}</p>
              </div>
              <div className="p-2 bg-background/20 rounded-lg">
                <p className="text-white/50 text-xs mb-1">Token ID</p>
                <p className="text-white text-sm">#{(1000 + selectedNFT).toString()}</p>
              </div>
            </div>
            
            <button className="mt-4 w-full p-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg transition-colors">
              View on Explorer
            </button>
          </div>
        </div>
      ) : (
        // Grid view
        <>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((nft, index) => (
              <div 
                key={nft.id} 
                className={`p-3 bg-gradient-to-br from-background/40 to-background/20 rounded-lg border border-${nft.color === 'primary' ? 'primary' : 'accent'}/20 hover:border-${nft.color === 'primary' ? 'primary' : 'accent'}/40 transition-all cursor-pointer group`}
                onClick={() => setSelectedNFT(index)}
              >
                <div className={`mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-${nft.color === 'primary' ? 'primary/20' : 'accent/20'} to-background/20 p-3 flex items-center justify-center ${nft.glow ? 'animate-pulse' : ''}`}>
                  <div className="transform group-hover:rotate-12 transition-transform duration-500">
                    {nft.icon}
                  </div>
                </div>
                <h4 className="font-medium text-white text-sm group-hover:text-primary transition-colors">{nft.name}</h4>
                <p className="text-white/60 text-xs">{nft.level}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-5 flex items-center justify-center">
            <button className="text-primary hover:text-accent transition-colors text-sm p-2 flex items-center">
              <HelpCircle className="h-4 w-4 mr-1.5" />
              How to Earn More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NFTAchievements;
