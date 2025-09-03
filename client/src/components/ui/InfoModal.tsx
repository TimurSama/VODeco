import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, BookOpen, Info, AlertTriangle, Lightbulb, Users, Globe, Shield, Zap } from 'lucide-react';
import { Button } from './button';
import GlassPanel from './GlassPanel';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  type?: 'info' | 'warning' | 'success' | 'crisis' | 'solution' | 'dao' | 'tech' | 'value';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const InfoModal: React.FC<InfoModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  type = 'info',
  size = 'lg'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
      case 'crisis':
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case 'success':
      case 'solution':
        return <Lightbulb className="w-6 h-6 text-green-400" />;
      case 'dao':
        return <Users className="w-6 h-6 text-blue-400" />;
      case 'tech':
        return <Zap className="w-6 h-6 text-yellow-400" />;
      case 'value':
        return <Globe className="w-6 h-6 text-cyan-400" />;
      default:
        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'warning':
      case 'crisis':
        return 'border-red-400/30 bg-red-500/10';
      case 'success':
      case 'solution':
        return 'border-green-400/30 bg-green-500/10';
      case 'dao':
        return 'border-blue-400/30 bg-blue-500/10';
      case 'tech':
        return 'border-yellow-400/30 bg-yellow-500/10';
      case 'value':
        return 'border-cyan-400/30 bg-cyan-500/10';
      default:
        return 'border-blue-400/30 bg-blue-500/10';
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
          >
            <GlassPanel variant="elevated" padding="xl" className="relative">
              {/* Header */}
              <div className={`flex items-center justify-between mb-6 p-4 rounded-lg ${getTypeColor()}`}>
                <div className="flex items-center space-x-3">
                  {getIcon()}
                  <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:text-gray-300 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[60vh] pr-2">
                {content}
              </div>
              
              {/* Footer */}
              <div className="flex justify-end mt-6 pt-4 border-t border-cyan-400/20">
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  Понятно
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
