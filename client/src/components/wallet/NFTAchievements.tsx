import React from 'react';

// Mock NFT achievements
const achievements = [
  {
    id: 1,
    name: 'Water Guardian',
    level: 'Level 2 Certification',
    image: 'https://raw.githubusercontent.com/uiwjs/file-icons/HEAD/icon/water.svg',
    color: 'primary'
  },
  {
    id: 2,
    name: 'DAO Participant',
    level: '10+ Votes Cast',
    image: 'https://raw.githubusercontent.com/uiwjs/file-icons/HEAD/icon/voting-nay.svg',
    color: 'accent'
  }
];

const NFTAchievements: React.FC = () => {
  return (
    <div className="glassmorphism rounded-xl p-6">
      <h3 className="font-space font-medium text-lg text-white mb-4">Your NFT Achievements</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {achievements.map(nft => (
          <div 
            key={nft.id} 
            className={`p-3 bg-background/30 rounded-lg border border-${nft.color === 'primary' ? 'primary' : 'accent'}/30 hover:border-${nft.color === 'primary' ? 'primary' : 'accent'}/50 transition-all hover:shadow-${nft.color === 'primary' ? 'primary' : 'accent'} cursor-pointer`}
          >
            <div className="mb-2 rounded-md overflow-hidden bg-gradient-to-b from-background to-muted p-2 flex items-center justify-center">
              <img src={nft.image} alt={nft.name} className="w-12 h-12" style={{ filter: 'drop-shadow(0 0 8px var(--tw-shadow-color))' }} />
            </div>
            <h4 className="font-space font-medium text-white text-sm">{nft.name}</h4>
            <p className="text-white/60 text-xs">{nft.level}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-primary hover:text-accent transition-colors text-sm">
          View All Achievements
        </button>
      </div>
    </div>
  );
};

export default NFTAchievements;
