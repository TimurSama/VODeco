import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import WaterDropAnimation from "@/components/preview/WaterDropAnimation";
import EarthGlobeScene from "@/components/preview/EarthGlobeScene";
import HexagonalSystem from "@/components/preview/HexagonalSystem";

type SceneType = 'water-drop' | 'earth-globe' | 'hexagonal-system';

export default function PreviewPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [currentScene, setCurrentScene] = useState<SceneType>('water-drop');

  useEffect(() => {
    // Автоматическая смена сцен
    const timer1 = setTimeout(() => setCurrentScene('earth-globe'), 7000); // 7 секунд на каплю
    
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const handleContinue = () => {
    if (currentScene === 'earth-globe') {
      setCurrentScene('hexagonal-system');
    } else if (currentScene === 'hexagonal-system') {
      setLocation('/dashboard');
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScene === 'water-drop' && (
          <motion.div
            key="water-drop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <WaterDropAnimation onComplete={() => setCurrentScene('earth-globe')} />
          </motion.div>
        )}

        {currentScene === 'earth-globe' && (
          <motion.div
            key="earth-globe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <EarthGlobeScene onContinue={handleContinue} />
          </motion.div>
        )}

        {currentScene === 'hexagonal-system' && (
          <motion.div
            key="hexagonal-system"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <HexagonalSystem onContinue={handleContinue} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}