import React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const GlassPanel: React.FC<GlassPanelProps> = ({ 
  children, 
  className, 
  variant = 'default',
  padding = 'md' 
}) => {
  const baseClasses = "backdrop-blur-xl border border-cyan-400/20 rounded-2xl shadow-lg";
  
  const variantClasses = {
    default: "bg-slate-800/40 shadow-cyan-500/10",
    elevated: "bg-slate-800/60 shadow-cyan-500/20",
    subtle: "bg-slate-800/20 shadow-cyan-500/5"
  };
  
  const paddingClasses = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8",
    xl: "p-10"
  };

  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      "transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/15",
      className
    )}>
      {children}
    </div>
  );
};

export default GlassPanel;

