import React from 'react';
import { Link, useLocation } from 'wouter';

interface NavItem {
  name: string;
  path: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, onClose }) => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="md:hidden glassmorphism p-4">
      <nav className="flex flex-col space-y-4 font-space">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            onClick={onClose}
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
    </div>
  );
};

export default MobileMenu;
