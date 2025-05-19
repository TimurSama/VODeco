import React from 'react';
import { Link, useLocation } from 'wouter';
import { Menu } from 'lucide-react';
import { AuthStatus } from '@/components/ui/AuthStatus';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/95 backdrop-blur-md shadow-sm shadow-primary/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Menu Button */}
        <button 
          className="text-foreground/70 hover:text-primary transition-colors"
          onClick={onMenuClick}
          aria-label="Открыть меню"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <span className="font-bold text-2xl tracking-wider text-primary">VODECO</span>
          </div>
        </Link>
        
        {/* Authentication Status */}
        <AuthStatus />
      </div>
    </header>
  );
};

export default Header;
