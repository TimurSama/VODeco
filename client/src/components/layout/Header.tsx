import React from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, UserCircle } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
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
        
        {/* User Profile */}
        <Link href="/profile">
          <button className="text-foreground/70 hover:text-primary transition-colors" aria-label="Профиль пользователя">
            <UserCircle className="h-6 w-6" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
