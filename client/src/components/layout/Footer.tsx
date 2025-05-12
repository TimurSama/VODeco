import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-white/10 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <div className="flex items-center space-x-2 mb-4 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                  <span className="font-space font-bold text-white text-xs">VOD</span>
                </div>
                <span className="font-space font-bold text-white">VODeco</span>
              </div>
            </Link>
            
            <p className="text-white/60 text-sm max-w-md mb-6">
              Decentralized Web3 platform for water resource management based on the VOD ecosystem. Join our DAO to make a real impact on global water conservation.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <span className="material-icons">discord</span>
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <span className="material-icons">telegram</span>
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <span className="material-icons">language</span>
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <span className="material-icons">code</span>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-space font-medium text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-white/60 hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="/dao" className="text-white/60 hover:text-primary transition-colors">DAO Governance</Link></li>
                <li><Link href="/globo" className="text-white/60 hover:text-primary transition-colors">Global Water Map</Link></li>
                <li><Link href="/projects" className="text-white/60 hover:text-primary transition-colors">Investment Projects</Link></li>
                <li><Link href="/wallet" className="text-white/60 hover:text-primary transition-colors">Wallet & Tokens</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-space font-medium text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Whitepaper</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Educational Materials</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">API & Developers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-space font-medium text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Mission & Vision</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Team</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Partners</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Media Kit</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            © 2023 VODeco - DAO VOD ECO. All rights reserved.
          </p>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/40 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-white/40 hover:text-primary transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
