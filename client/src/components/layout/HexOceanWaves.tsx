
import React, { useEffect, useRef } from 'react';

export default function HexOceanWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const hexSize = 28;
    const hexHeight = Math.sqrt(3) * hexSize;
    const hexWidth = 2 * hexSize;
    const horizSpacing = 0.75 * hexWidth;
    const vertSpacing = hexHeight;

    let time = 0;
    let animationId: number;
    let frameCount = 0;
    const targetFPS = 30; // Ограничиваем FPS до 30
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    function animate(currentTime: number) {
      // Ограничиваем частоту кадров
      if (currentTime - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = currentTime;
      frameCount++;
      
      // Обновляем только каждый 2-й кадр для дальнейшей оптимизации
      if (frameCount % 2 === 0 && ctx) {
        ctx.clearRect(0, 0, width, height);
        time += 0.008; // Еще больше уменьшил скорость

        // Рисуем меньше гексагонов - каждый второй
        for (let row = -1; row < height / vertSpacing + 2; row += 1) {
          for (let col = -1; col < width / horizSpacing + 2; col += 1) {
            // Пропускаем некоторые гексагоны для оптимизации
            if ((row + col) % 2 === 0) {
              const cx = col * horizSpacing;
              const cy = row * vertSpacing + (col % 2 ? vertSpacing / 2 : 0);
              drawHexagon(cx, cy);
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    // Предвычисляем углы для гексагона
    const hexAngles = [0, 60, 120, 180, 240, 300].map(deg => deg * Math.PI / 180);
    
    function drawHexagon(cx: number, cy: number) {
      if (!ctx) return;
      
      const points: [number, number][] = [];
      
      // Упрощенная волновая функция для лучшей производительности
      const waveBase = Math.sin(cx * 0.01 + time * 2) * 12 + Math.cos(cy * 0.015 + time * 2.5) * 10;
      
      for (let i = 0; i < 6; i++) {
        const baseX = cx + hexSize * Math.cos(hexAngles[i]);
        const baseY = cy + hexSize * Math.sin(hexAngles[i]);
        const waveOffset = waveBase + Math.sin((baseX + baseY) * 0.015 + time * 3) * 8;
        points.push([baseX, baseY + waveOffset]);
      }

      // Рисуем контур гексагона
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < 6; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(0, 255, 255, 0.06)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Рисуем только некоторые точки для производительности
      for (let i = 0; i < 6; i += 2) {
        const [x, y] = points[i];
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
        
        // Упрощенная интенсивность
        const intensity = 0.5 + 0.3 * Math.sin((x + y + time * 100) * 0.01);
        const alpha = intensity * 0.7;
        
        ctx.fillStyle = `rgba(0, 220, 255, ${alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(0, 220, 255, ${alpha})`;
        ctx.fill();
      }
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);
    animate(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
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
