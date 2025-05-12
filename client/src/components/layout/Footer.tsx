import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-primary/10 py-6 px-4 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0 text-center">
            <p className="text-foreground/50 text-sm">
              © 2025 VODeco - Платформа для управления водными ресурсами
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
