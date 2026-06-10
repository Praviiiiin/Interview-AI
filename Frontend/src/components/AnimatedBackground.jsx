import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.15, y: 0.3,  r: 0.28, color: [210, 13, 59],  speed: 0.00018, phase: 0 },
      { x: 0.75, y: 0.6,  r: 0.22, color: [120,  5, 40],  speed: 0.00013, phase: 2.1 },
      { x: 0.5,  y: 0.15, r: 0.20, color: [180, 10, 50],  speed: 0.00021, phase: 4.3 },
      { x: 0.85, y: 0.2,  r: 0.16, color: [ 80,  2, 30],  speed: 0.00016, phase: 1.0 },
    ];

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      alpha: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));

    function drawGrid(w, h, t) {
      ctx.save();
      ctx.strokeStyle = "rgba(210,13,59,0.04)";
      ctx.lineWidth = 0.5;
      const spacing = 60;
      const shift = (t * 0.008) % spacing;
      for (let x = -spacing + shift; x < w + spacing; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = -spacing + shift; y < h + spacing; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.restore();
    }

    let t = 0;
    let raf;

    function draw() {
      t++;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      drawGrid(w, h, t);

      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.speed + b.phase) * 0.08) * w;
        const cy = (b.y + Math.cos(t * b.speed * 0.7 + b.phase) * 0.06) * h;
        const rr = b.r * Math.min(w, h);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        const [r, g, bv] = b.color;
        grad.addColorStop(0,   `rgba(${r},${g},${bv},0.25)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${bv},0.12)`);
        grad.addColorStop(1,   `rgba(${r},${g},${bv},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        const pulse = Math.sin(t * 0.012 + p.pulse) * 0.3 + 0.7;
        const alpha = p.alpha * pulse;
        const px = p.x * w, py = p.y * h;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,13,59,${alpha * 0.85})`;
        ctx.fill();
        const g2 = ctx.createRadialGradient(px, py, 0, px, py, p.r * 5);
        g2.addColorStop(0, `rgba(210,13,59,${alpha * 0.18})`);
        g2.addColorStop(1, "rgba(210,13,59,0)");
        ctx.beginPath();
        ctx.arc(px, py, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none",
      }}
    />
  );
}