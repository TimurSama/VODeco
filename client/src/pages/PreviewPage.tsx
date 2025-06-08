import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import InteractivePresentation from "../components/preview/InteractivePresentation";

export default function PreviewPage() {
  const [, setLocation] = useLocation();
  const { addGuestTokens, isAuthenticated } = useAuth();

  const handleComplete = async () => {
    if (!isAuthenticated) {
      await addGuestTokens(200, 'presentation_complete');
    }
    setLocation('/dashboard');
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Отключаем анимированный фон для презентации - используем простой статичный */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />
      
      <div className="relative z-10">
        <InteractivePresentation onComplete={handleComplete} />
      </div>
    </div>
  );
}