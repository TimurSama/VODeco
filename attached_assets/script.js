const canvas = document.getElementById("hexCanvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const hexSize = 28;
const hexHeight = Math.sqrt(3) * hexSize;
const hexWidth = 2 * hexSize;
const horizSpacing = 0.75 * hexWidth;
const vertSpacing = hexHeight;

let time = 0;

function animate() {
  ctx.clearRect(0, 0, width, height);
  time += 0.008;

  for (let row = -1; row < height / vertSpacing + 2; row++) {
    for (let col = -1; col < width / horizSpacing + 2; col++) {
      const cx = col * horizSpacing;
      const cy = row * vertSpacing + (col % 2 ? vertSpacing / 2 : 0);

      const waveHeight = 6 * Math.sin((cx + time * 200) * 0.005) +
                         4 * Math.sin((cy + time * 140) * 0.008) +
                         3 * Math.cos((cx - cy + time * 160) * 0.009);

      drawHexagon(cx, cy);
    }
  }

  requestAnimationFrame(animate);
}

function drawHexagon(cx, cy) {
  const angle_deg = 60;
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 180 * (angle_deg * i);
    const baseX = cx + hexSize * Math.cos(angle);
    const baseY = cy + hexSize * Math.sin(angle);
    const waveOffset = (
    Math.sin(baseX * 0.01 + time * 2) * 10 +
    Math.cos(baseY * 0.015 + time * 2) * 10 +
    Math.sin((baseX + baseY) * 0.02 + time * 2) * 6
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
    ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
    const intensity = 0.5 + 0.3 * Math.sin((x + y + time * 100) * 0.01);
    const r = Math.floor(0 + 100 * intensity);
    const g = Math.floor(200 + 55 * intensity);
    const b = Math.floor(255);
    ctx.fillStyle = `rgba(${r},${g},${b},${intensity})`;
    ctx.shadowBlur = 4;
    ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
    ctx.fill();
  }
}

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

animate();
