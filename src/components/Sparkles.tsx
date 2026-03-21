import { useEffect, useRef } from 'react';

export default function Sparkles({ hasEntered }: { hasEntered?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!hasEntered) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedOpacity: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = 0;
        this.speedOpacity = Math.random() * 0.015 + 0.005;
        this.life = 0;
        this.maxLife = Math.random() * 150 + 50;
      }

      update() {
        this.life++;
        // Fade in for the first half of life, fade out for the second half
        if (this.life < this.maxLife / 2) {
          this.opacity += this.speedOpacity;
        } else {
          this.opacity -= this.speedOpacity;
        }

        if (this.opacity < 0) this.opacity = 0;
        if (this.opacity > 1) this.opacity = 1;

        // Reset particle when it dies
        if (this.life >= this.maxLife || this.opacity <= 0 && this.life > this.maxLife / 2) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.life = 0;
          this.opacity = 0;
          this.maxLife = Math.random() * 150 + 50;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = '#C6A96B';
        
        // Halo (much faster than shadowBlur on mobile)
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const density = isMobile ? 30000 : 12000; // Middle-ground density for mobile
      const numParticles = Math.floor((canvas.width * canvas.height) / density);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasEntered]);

  if (!hasEntered) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
