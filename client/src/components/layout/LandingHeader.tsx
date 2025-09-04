import React, { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { AuthStatus } from '@/components/ui/AuthStatus';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const LandingHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-400/20 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-cyan-500/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-cyan-100 hover:text-cyan-300 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="font-bold text-2xl tracking-wider bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">VODECO</span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/preview">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                О проекте
              </span>
            </Link>
            <Link href="/">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                Платформа
              </span>
            </Link>
            <Link href="/dao">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                DAO
              </span>
            </Link>
            <Link href="/presentation">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                Презентация
              </span>
            </Link>
            <Link href="/globo">
              <span className="text-cyan-100 hover:text-cyan-300 transition-colors cursor-pointer font-medium">
                Глобус
              </span>
            </Link>
          </nav>
          
          {/* Right side: Language and Auth */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <AuthStatus />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={closeMobileMenu}>
          <div 
            className="absolute left-0 top-0 h-full w-72 bg-slate-900/95 backdrop-blur-xl border-r border-cyan-400/20 overflow-auto p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 mt-2 px-2">
              <h2 className="text-lg font-medium text-cyan-400">Навигация</h2>
              <button 
                className="text-cyan-100/70 hover:text-cyan-300 p-1 rounded-full hover:bg-cyan-400/10 transition-colors" 
                onClick={closeMobileMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-1">
              {[
                { name: 'О проекте', path: '/preview' },
                { name: 'Платформа', path: '/' },
                { name: 'DAO', path: '/dao' },
                { name: 'Презентация', path: '/presentation' },
                { name: 'Глобус', path: '/globo' },
                { name: 'Кошелёк', path: '/wallet' },
                { name: 'Аккаунт', path: '/account' },
                { name: 'Настройки', path: '/settings' }
              ].map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  onClick={closeMobileMenu}
                >
                  <div className="text-cyan-100/80 hover:text-cyan-300 py-3 px-4 rounded-lg hover:bg-cyan-400/5 
                    transition-all transform hover:translate-x-1 flex items-center border border-transparent
                    hover:border-cyan-400/10">
                    {item.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingHeader;
