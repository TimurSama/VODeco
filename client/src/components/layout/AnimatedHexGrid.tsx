import { useEffect, useRef } from 'react';
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
  const requestRef = useRef<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Устанавливаем размер холста
    const updateCanvasSize = () => {
      const { clientWidth, clientHeight } = document.documentElement;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
    };
    
    // Обновляем размер холста при изменении размера окна
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let time = 0;
    const hexSize = isMobile ? 20 : 30; // Меньше на мобильных устройствах
    const hexHeight = Math.sqrt(3) * hexSize;
    const hexWidth = 2 * hexSize;
    const hexVerticalOffset = hexHeight * 0.75;
    
    // Рисуем отдельный шестиугольник
    const drawHexagon = (x: number, y: number, time: number, index: number, row: number) => {
      if (!ctx) return;
      
      // Дополнительные волны на разных частотах
      const wave1 = Math.sin(time * 0.5 * speed + index * 0.3 + row * 0.2) * 0.5 + 0.5;
      const wave2 = Math.sin(time * 0.3 * speed + index * 0.1 + row * 0.5) * 0.5 + 0.5;
      const wave3 = Math.sin(time * 0.7 * speed + index * 0.2 - row * 0.3) * 0.5 + 0.5;
      
      // Комбинируем волны для придания органичности
      const wave = (wave1 * 0.6 + wave2 * 0.3 + wave3 * 0.1);
      
      // Параметры шестиугольника
      const size = hexSize * (0.9 + wave * 0.2); // Пульсация размера
      const opacity = baseOpacity + wave * (pulseOpacity - baseOpacity);
      
      // Начинаем рисовать шестиугольник
      ctx.beginPath();
      
      // Рисуем вершины шестиугольника
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vertexX = x + size * Math.cos(angle);
        const vertexY = y + size * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(vertexX, vertexY);
        } else {
          ctx.lineTo(vertexX, vertexY);
        }
      }
      
      ctx.closePath();
      
      // Устанавливаем стиль и рисуем шестиугольник
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Добавляем легкую заливку при высокой волне
      if (wave > 0.7) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.05;
        ctx.fill();
      }
      
      // Сбрасываем прозрачность
      ctx.globalAlpha = 1;
    };
    
    // Основная функция анимации
    const animate = () => {
      if (!ctx) return;
      
      // Очищаем холст
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Вычисляем количество шестиугольников для текущего размера холста
      const columns = Math.ceil(canvas.width / (hexWidth * 0.75)) + 2;
      const rows = Math.ceil(canvas.height / hexVerticalOffset) + 2;
      
      // Рисуем сетку шестиугольников
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < columns; col++) {
          // Вычисляем координаты центра шестиугольника
          // Смещаем четные ряды для эффекта сетки
          const evenRow = row % 2 === 0;
          const x = col * hexWidth * 0.75 + (evenRow ? hexWidth * 0.375 : 0);
          const y = row * hexVerticalOffset;
          
          // Рисуем шестиугольник
          drawHexagon(x, y, time, col, row);
        }
      }
      
      // Увеличиваем время
      time += 0.01;
      
      // Запрашиваем следующий кадр анимации
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Запускаем анимацию
    animate();
    
    // Очистка при размонтировании
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [baseOpacity, pulseOpacity, color, speed, isMobile]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default AnimatedHexGrid;