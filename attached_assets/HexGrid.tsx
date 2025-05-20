
import { useEffect, useRef } from "react";

export default function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const hexSize = 40;
    const speed = 0.005;
    let time = 0;

    const drawHex = (x: number, y: number, radius: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i;
        const dx = x + radius * Math.cos(angle);
        const dy = y + radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(dx, dy) : ctx.lineTo(dx, dy);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += speed;

      const dx = hexSize * Math.sqrt(3);
      const dy = hexSize * 1.5;

      for (let y = -dy; y < height + dy; y += dy) {
        for (let x = -dx; x < width + dx; x += dx) {
          const offsetX = (Math.floor(y / dy) % 2) * (dx / 2);
          const dist = Math.hypot(x + offsetX - width / 2, y - height / 2);
          const alpha = 0.2 + 0.2 * Math.sin(dist * 0.05 - time * 2);
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
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
}
