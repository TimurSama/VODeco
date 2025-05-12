import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import WalletConnect from '../wallet/WalletConnect';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'DAO', path: '/dao' },
    { name: 'Globo', path: '/globo' },
    { name: 'Projects', path: '/projects' },
    { name: 'Wallet', path: '/wallet' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="glassmorphism sticky top-0 z-50 border-b border-primary/30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center animate-pulse-glow">
              <span className="font-space font-bold text-white">VOD</span>
            </div>
            <span className="font-space font-bold text-xl text-white">VODeco</span>
          </div>
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-6 font-space">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${
                isActive(item.path) 
                  ? 'text-primary'
                  : 'text-white/80 hover:text-primary'
              } transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Wallet Connect Button */}
        <WalletConnect />
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-icons">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileMenu navItems={navItems} onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Header;
