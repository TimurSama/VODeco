import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from '@/hooks/use-media-query';

interface AnimatedHexGridProps {
  className?: string;
  baseOpacity?: number;
  pulseOpacity?: number;
  color?: string;
  speed?: number;
  enabled?: boolean; // Новый проп для включения/отключения анимации
}

const AnimatedHexGrid = ({
  className = '',
  baseOpacity = 0.15,
  pulseOpacity = 0.25,
  color = '#14b8a6',
  speed = 1,
  enabled = true
}: AnimatedHexGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Проверяем настройки пользователя
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;
    
    // Запускаем анимацию только если она включена и пользователь не отключил анимации
    setShouldAnimate(enabled && !prefersReducedMotion);
  }, [enabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldAnimate) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const hexSize = isMobile ? 35 : 45; // Увеличиваем размер для меньшего количества гексагонов
    const speedValue = 0.003 * speed; // Замедляем анимацию
    let time = 0;

    // Преобразуем HEX-цвет в формат rgba
    const hexToRgba = (hex: string, alpha: number) => {
      // Удаляем # если она есть
      hex = hex.replace(/^#/, '');

      let r, g, b;
      if (hex.length === 3) {
        // #RGB
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else {
        // #RRGGBB
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      }

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const drawHex = (x: number, y: number, radius: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i;
        const dx = x + radius * Math.cos(angle);
        const dy = y + radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(dx, dy) : ctx.lineTo(dx, dy);
      }
      ctx.closePath();
      ctx.strokeStyle = hexToRgba(color, alpha);
      ctx.stroke();
    };

    const render = () => {
      if (!shouldAnimate) return;
      
      ctx.clearRect(0, 0, width, height);
      time += speedValue;

      const dx = hexSize * Math.sqrt(3);
      const dy = hexSize * 1.5;

      // Оптимизированный рендеринг - рендерим только видимые гексагоны
      const startY = Math.max(-dy, 0);
      const endY = Math.min(height + dy, height + dy);
      const startX = Math.max(-dx, 0);
      const endX = Math.min(width + dx, width + dx);

      for (let y = startY; y < endY; y += dy) {
        for (let x = startX; x < endX; x += dx) {
          const offsetX = (Math.floor(y / dy) % 2) * (dx / 2);
          const dist = Math.hypot(x + offsetX - width / 2, y - height / 2);
          const alphaBase = baseOpacity;
          const alphaWave = pulseOpacity - baseOpacity;
          const alpha = alphaBase + alphaWave * Math.sin(dist * 0.05 - time * 2);
          drawHex(x + offsetX, y, hexSize, alpha);
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [baseOpacity, pulseOpacity, color, speed, isMobile, shouldAnimate]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default AnimatedHexGrid;