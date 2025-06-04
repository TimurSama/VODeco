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
      <InteractivePresentation onComplete={handleComplete} />
    </div>
  );
}