import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Это временный файл для перенаправления
export default function InteractionsPage() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Перенаправляем с /interactions на /missions
    setLocation('/missions');
  }, [setLocation]);
  
  return <div>Перенаправление...</div>;
}