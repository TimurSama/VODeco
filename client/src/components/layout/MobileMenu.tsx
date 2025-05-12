import React from 'react';
import { Link } from 'wouter';
import { X } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose}>
      <div 
        className="absolute left-0 top-0 h-full w-72 bg-card border-r border-primary/10 overflow-auto p-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8 mt-2 px-2">
          <h2 className="text-lg font-medium text-primary">Навигация</h2>
          <button 
            className="text-foreground/70 hover:text-primary p-1 rounded-full hover:bg-primary/10 transition-colors" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              onClick={onClose}
            >
              <div className="text-foreground/80 hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/5 
                transition-all transform hover:translate-x-1 flex items-center border border-transparent
                hover:border-primary/10">
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;