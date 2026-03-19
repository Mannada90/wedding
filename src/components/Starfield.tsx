import { motion } from 'motion/react';
import React, { useMemo } from 'react';

export default function Starfield({ hasEntered }: { hasEntered?: boolean }) {
  // 1. The Transformation Particles
  // Extremely high density starfield: 75% tiny, 20% medium, 5% bright
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particles = useMemo(() => Array.from({ length: isMobile ? 200 : 800 }).map((_, i) => {
    const typeRand = Math.random();
    let size, blur, opacity, color, glow;
    
    // Colors: White, Light Blue, Soft Purple, Gold, Deep Blue
    const colors = ['#ffffff', '#ffffff', '#ffffff', '#A3C2FF', '#D4A3FF', '#C6A96B', '#87CEFA'];
    color = colors[Math.floor(Math.random() * colors.length)];
    
    if (typeRand < 0.75) {
      // Tiny
      size = 0.5 + Math.random() * 1.5;
      blur = 'blur-0';
      opacity = 0.15 + Math.random() * 0.5;
      glow = 'none';
    } else if (typeRand < 0.95) {
      // Medium
      size = 1.5 + Math.random() * 2;
      blur = Math.random() > 0.5 ? 'blur-[1px]' : 'blur-0';
      opacity = 0.4 + Math.random() * 0.5;
      glow = `0 0 ${2 + Math.random() * 4}px ${color}`;
    } else {
      // Bright
      size = 2.5 + Math.random() * 2.5;
      blur = 'blur-[1px]';
      opacity = 0.7 + Math.random() * 0.3;
      glow = `0 0 ${5 + Math.random() * 10}px ${color}, 0 0 ${15 + Math.random() * 15}px ${color}`;
    }

    const startAngle = Math.random() * Math.PI * 2;
    const coreRadius = Math.random() * 0.5; // Very tight core so they emerge from a single point
    const startX = Math.cos(startAngle) * coreRadius;
    const startY = Math.sin(startAngle) * coreRadius;
    
    // Galaxy band + scattered distribution
    const tx = (Math.random() - 0.5) * 120; // -60vw to 60vw
    
    // Y distribution: 60% in the dense band, 40% scattered
    let ty;
    if (Math.random() < 0.6) {
      // Dense band (Gaussian-like)
      ty = (Math.random() - 0.5) * 40 * Math.pow(Math.random(), 2); // clustered at 0
    } else {
      // Scattered
      ty = (Math.random() - 0.5) * 120; // -60vh to 60vh
    }

    // No stagger for an instant, unified burst
    const burstStagger = 0;

    return {
      id: `p-${i}`,
      startX,
      startY,
      tx,
      ty,
      size,
      color,
      opacity,
      blur,
      glow,
      twinkle: Math.random() > 0.3,
      twinkleDuration: 2 + Math.random() * 5,
      twinkleDelay: 4.5 + Math.random() * 5,
      driftDuration: 80 + Math.random() * 80,
      driftDelay: 4.5 + Math.random() * 5,
      driftX: (Math.random() - 0.5) * 15, // Slower horizontal drift
      driftY: -5 - Math.random() * 15, // Slower upward drift
      burstStagger,
      // Add motion blur based on distance (faster particles get more blur)
      motionBlur: isMobile ? 'blur-0' : (Math.abs(tx) > 40 ? 'blur-[1px]' : 'blur-0')
    };
  }), [isMobile]);

  // 2. Occasional Shimmer Stars (appear after transformation)
  const shimmerStars = useMemo(() => Array.from({ length: isMobile ? 20 : 60 }).map((_, i) => {
    const colors = ['#ffffff', '#A3C2FF', '#D4A3FF', '#C6A96B'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      id: `shimmer-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: 4.5 + Math.random() * 4,
      size: Math.random() * 3 + 1,
      color: color,
      glow: `0 0 ${4 + Math.random() * 8}px ${color}, 0 0 ${10 + Math.random() * 10}px ${color}`
    };
  }), [isMobile]);

  if (!hasEntered) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050508]" aria-hidden="true">
      <style>{`
        @keyframes drift {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(var(--drift-y)) translateX(var(--drift-x)); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
      `}</style>

      {/* Grain Texture - Extremely subtle */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Nebula / Galaxy Glow Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, delay: 2.5 }}
        className="absolute inset-0 z-0 flex items-center justify-center mix-blend-screen"
      >
        {/* Deep blue/purple core band */}
        <div className="absolute w-[120vw] h-[40vh] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.15)_0%,transparent_70%)] blur-[60px] transform -rotate-6" />
        <div className="absolute w-[100vw] h-[30vh] bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.12)_0%,transparent_70%)] blur-[50px] transform rotate-3" />
        {/* Subtle gold dust */}
        <div className="absolute w-[90vw] h-[25vh] bg-[radial-gradient(ellipse_at_center,rgba(198,169,107,0.08)_0%,transparent_70%)] blur-[40px]" />
      </motion.div>

      {/* Curved Horizon Line (Waitlister style) */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 5, delay: 2.5, ease: "easeOut" }}
        className="absolute -bottom-[60vw] md:-bottom-[40vw] left-1/2 -translate-x-1/2 w-[200vw] md:w-[150vw] h-[100vw] md:h-[80vw] rounded-[100%] border-t border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_50%)] z-0 shadow-[0_-20px_80px_rgba(163,194,255,0.07)]"
      />
      
      {/* Horizon Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, delay: 2.5 }}
        className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-[#1a2b4c]/40 via-[#1a2b4c]/5 to-transparent blur-[30px] z-0"
      />

      {/* INTRO: The Cosmic Core */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0, 0.4, 0.6, 1, 0.7, 1, 0], 
          scale:   [0.9, 1.02, 1, 1, 1, 1, 2.5] 
        }}
        transition={{ 
          duration: 4.5,
          times: [0, 0.44, 0.66, 0.71, 0.72, 0.733, 1], // 0s, 2s, 3s, 3.2s, 3.24s, 3.3s, 4.5s
          ease: ["easeInOut", "easeInOut", "easeInOut", "linear", "linear", [0.22, 1, 0.36, 1]]
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10vw] h-[10vw] min-w-[100px] min-h-[100px] rounded-full pointer-events-none z-10 flex items-center justify-center"
      >
        {/* Soft diffusion, no heavy gradients */}
        <div className="absolute inset-0 bg-[#C6A96B] blur-[40px] opacity-30 rounded-full" />
        <div className="absolute inset-0 bg-white blur-[60px] opacity-20 rounded-full" />
      </motion.div>

      {/* The Transformation Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-1/2 left-1/2"
          style={{
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}vh`,
            // Drift starts AFTER the burst
            animation: `drift ${p.driftDuration}s linear ${p.driftDelay}s infinite`
          } as React.CSSProperties}
        >
          <motion.div
            initial={{ x: `${p.startX}vw`, y: `${p.startY}vw`, opacity: 0, scale: 0.1 }}
            animate={{ 
              // Stay at start, then burst
              x: [`${p.startX}vw`, `${p.startX}vw`, `${p.tx}vw`], 
              y: [`${p.startY}vw`, `${p.startY}vw`, `${p.ty}vh`],
              opacity: [0, 0, p.opacity],
              scale: [0.1, 0.1, 1]
            }}
            transition={{ 
              duration: 4.5, // 3.3s build-up + 1.2s burst
              times: [0, 0.733, 1], // 0s, 3.3s, 4.5s
              ease: ["linear", [0.22, 1, 0.36, 1]] // Smooth ease-out
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ willChange: "transform, opacity" }}
          >
            <div 
              className={`rounded-full ${p.blur} ${p.motionBlur}`}
              style={{ 
                width: p.size, 
                height: p.size, 
                backgroundColor: p.color, 
                boxShadow: p.glow,
                animation: p.twinkle ? `twinkle ${p.twinkleDuration}s ease-in-out ${p.twinkleDelay}s infinite` : 'none',
              }}
            />
          </motion.div>
        </div>
      ))}

      {/* Occasional Shimmer Stars */}
      {shimmerStars.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 4 + Math.random() * 4, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{ 
            left: s.left, 
            top: s.top, 
            width: s.size, 
            height: s.size,
            backgroundColor: s.color,
            boxShadow: s.glow
          }}
        />
      ))}
    </div>
  );
}
