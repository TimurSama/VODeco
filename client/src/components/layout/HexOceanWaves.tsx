
import React, { useEffect, useRef, useCallback } from 'react';

export default function HexOceanWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Уменьшаем количество гексагонов для лучшей производительности
    const hexSize = window.innerWidth < 768 ? 35 : 28; // Больше на мобильных = меньше гексагонов
    const hexHeight = Math.sqrt(3) * hexSize;
    const hexWidth = 2 * hexSize;
    const horizSpacing = 0.75 * hexWidth;
    const vertSpacing = hexHeight;

    let time = 0;
    const cycleDuration = 30000; // Увеличиваем до 30 секунд для более плавной анимации
    let cycleStartTime = 0;
    let isAnimating = true;

    // Оптимизированная функция анимации с ограничением FPS
    function animate(currentTime: number) {
      // Ограничиваем FPS до 30 для экономии ресурсов
      if (currentTime - lastTimeRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;

      if (!cycleStartTime) cycleStartTime = currentTime;
      
      const elapsed = currentTime - cycleStartTime;
      const cycleProgress = (elapsed % cycleDuration) / cycleDuration;
      
      // Плавный бесшовный круговой цикл
      const smoothProgress = 0.5 * (1 - Math.cos(cycleProgress * 2 * Math.PI));
      time = smoothProgress * Math.PI * 2;
      
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);

      // Оптимизированный рендеринг - рендерим только видимые гексагоны
      const startRow = Math.max(0, Math.floor(-vertSpacing / vertSpacing));
      const endRow = Math.min(height / vertSpacing + 2, Math.ceil((height + vertSpacing) / vertSpacing));
      const startCol = Math.max(0, Math.floor(-horizSpacing / horizSpacing));
      const endCol = Math.min(width / horizSpacing + 2, Math.ceil((width + horizSpacing) / horizSpacing));

      for (let row = startRow; row < endRow; row++) {
        for (let col = startCol; col < endCol; col++) {
          const cx = col * horizSpacing;
          const cy = row * vertSpacing + (col % 2 ? vertSpacing / 2 : 0);
          drawHexagon(cx, cy);
        }
      }

      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    // Предвычисляем углы для гексагона
    const hexAngles = [0, 60, 120, 180, 240, 300].map(deg => deg * Math.PI / 180);
    
    function drawHexagon(cx: number, cy: number) {
      if (!ctx) return;
      
      const angle_deg = 60;
      const points: [number, number][] = [];
      
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 180 * (angle_deg * i);
        const baseX = cx + hexSize * Math.cos(angle);
        const baseY = cy + hexSize * Math.sin(angle);
        
        const smoothTime = time * 0.7;
        const waveOffset = (
          Math.sin(baseX * 0.008 + smoothTime * 0.6) * 20 +
          Math.cos(baseY * 0.012 + smoothTime * 0.8) * 16 +
          Math.sin((baseX + baseY) * 0.015 + smoothTime * 1.0) * 12
        );
        const x = baseX;
        const y = baseY + waveOffset;
        points.push([x, y]);
      }

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < 6; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(0, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (const [x, y] of points) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        const intensity = 0.6 + 0.4 * Math.sin((x + y + time * 3) * 0.015);
        const r = Math.floor(0 + 120 * intensity);
        const g = Math.floor(220 + 35 * intensity);
        const b = Math.floor(255);
        ctx.fillStyle = `rgba(${r},${g},${b},${intensity * 0.9})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r},${g},${b},${intensity})`;
        ctx.fill();
      }
    }

    // Оптимизированный обработчик изменения размера с дебаунсом
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: '#000b1e' }}
    />
  );
}
