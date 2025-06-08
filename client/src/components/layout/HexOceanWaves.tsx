
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
    const cycleDuration = 24000; // 24 секунды на полный цикл (в 3 раза медленнее)
    let cycleStartTime = 0;
    let isAnimating = true;

    function animate(currentTime: number) {
      if (!cycleStartTime) cycleStartTime = currentTime;
      
      const elapsed = currentTime - cycleStartTime;
      const cycleProgress = (elapsed % cycleDuration) / cycleDuration;
      
      // Создаем плавный зацикленный прогресс (0 -> 1 -> 0)
      time = Math.sin(cycleProgress * Math.PI * 2) * 0.5 + 0.5;
      
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let row = -1; row < height / vertSpacing + 2; row++) {
        for (let col = -1; col < width / horizSpacing + 2; col++) {
          const cx = col * horizSpacing;
          const cy = row * vertSpacing + (col % 2 ? vertSpacing / 2 : 0);
          drawHexagon(cx, cy);
        }
      }

      if (isAnimating) {
        animationId = requestAnimationFrame(animate);
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
        const waveOffset = (
          Math.sin(baseX * 0.01 + time * 300) * 18 +
          Math.cos(baseY * 0.015 + time * 350) * 16 +
          Math.sin((baseX + baseY) * 0.02 + time * 400) * 12
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
        const intensity = 0.6 + 0.4 * Math.sin((x + y + time * 1500) * 0.015);
        const r = Math.floor(0 + 120 * intensity);
        const g = Math.floor(220 + 35 * intensity);
        const b = Math.floor(255);
        ctx.fillStyle = `rgba(${r},${g},${b},${intensity * 0.9})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r},${g},${b},${intensity})`;
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
