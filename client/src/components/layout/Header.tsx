import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Account', path: '/account' },
    { name: 'Wallet', path: '/wallet' },
    { name: 'Messages', path: '/messages' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Groups', path: '/groups' },
    { name: 'Profile', path: '/profile' },
    { name: 'DAO', path: '/dao' },
    { name: 'Globo', path: '/globo' },
    { name: 'Bank', path: '/bank' },
    { name: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="glassmorphism sticky top-0 z-50 border-b border-primary/20">
      <div className="container mx-auto px-4 py-3 flex justify-center items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <span className="font-space font-bold text-xl text-primary">VODeco</span>
          </div>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="absolute right-4 md:hidden text-white"
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
