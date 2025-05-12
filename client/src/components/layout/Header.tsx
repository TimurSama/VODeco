import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, UserCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Menu Button */}
        <button 
          className="text-foreground/70 hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <span className="font-bold text-2xl tracking-wider text-primary">VODECO</span>
          </div>
        </Link>
        
        {/* User Profile */}
        <Link href="/profile">
          <button className="text-foreground/70 hover:text-primary transition-colors">
            <UserCircle className="h-6 w-6" />
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileMenu navItems={navItems} onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Header;
