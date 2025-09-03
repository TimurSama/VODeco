import React from 'react';
import { Link } from 'wouter';
import { AuthStatus } from '@/components/ui/AuthStatus';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const LandingHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-400/20 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-cyan-500/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <span className="font-bold text-2xl tracking-wider bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">VODECO</span>
          </div>
        </Link>
        
        {/* Navigation Links */}
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
  );
};

export default LandingHeader;
