import { useEffect, useRef } from "react";
import { useMediaQuery } from '@/hooks/use-media-query';

interface AnimatedHexGridProps {
  className?: string;
  baseOpacity?: number;
  pulseOpacity?: number;
  color?: string;
  speed?: number;
}

const AnimatedHexGrid = ({
  className = '',
  baseOpacity = 0.15,
  pulseOpacity = 0.25,
  color = '#14b8a6',
  speed = 1
}: AnimatedHexGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const hexSize = isMobile ? 30 : 40; // Меньше на мобильных устройствах
    const speedValue = 0.005 * speed;
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
      ctx.clearRect(0, 0, width, height);
      time += speedValue;

      const dx = hexSize * Math.sqrt(3);
      const dy = hexSize * 1.5;

      for (let y = -dy; y < height + dy; y += dy) {
        for (let x = -dx; x < width + dx; x += dx) {
          const offsetX = (Math.floor(y / dy) % 2) * (dx / 2);
          const dist = Math.hypot(x + offsetX - width / 2, y - height / 2);
          const alphaBase = baseOpacity;
          const alphaWave = pulseOpacity - baseOpacity;
          const alpha = alphaBase + alphaWave * Math.sin(dist * 0.05 - time * 2);
          drawHex(x + offsetX, y, hexSize, alpha);
        }
      }

      requestAnimationFrame(render);
    };

    render();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [baseOpacity, pulseOpacity, color, speed, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default AnimatedHexGrid;