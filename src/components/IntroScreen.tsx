import { motion, AnimatePresence } from 'motion/react';

interface IntroScreenProps {
  onEnter: () => void;
  hasEntered: boolean;
}

export default function IntroScreen({ onEnter, hasEntered }: IntroScreenProps) {
  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cinematic-black cursor-pointer overflow-hidden"
          onClick={onEnter}
        >
          {/* Very light starfield background for the intro */}
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.15)_0%,transparent_80%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(138,43,226,0.1)_0%,transparent_60%)]" />
            {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 80 }).map((_, i) => {
              const colors = ['#ffffff', '#A3C2FF', '#D4A3FF', '#C6A96B'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const size = Math.random() * 2 + 1;
              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    boxShadow: `0 0 ${size * 3}px ${color}`,
                    opacity: Math.random() * 0.5 + 0.2,
                    animation: `twinkle ${Math.random() * 4 + 3}s infinite alternate`
                  }}
                />
              );
            })}
          </div>

          <style>{`
            @keyframes soundwave {
              0% { transform: scaleY(0.15); opacity: 0.3; }
              100% { transform: scaleY(var(--max-scale, 1)); opacity: 0.9; }
            }
          `}</style>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 text-center flex flex-col items-center gap-12"
          >
            {/* Sound On Indicator */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase text-white/90 ml-[0.4em]">
                Sound On
              </span>
              <div className="flex items-center justify-center gap-[3px] h-3">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[2px] bg-white rounded-full origin-center"
                    style={{
                      height: '100%',
                      '--max-scale': Math.random() * 0.7 + 0.3,
                      animation: `soundwave ${Math.random() * 0.5 + 0.4}s infinite alternate ease-in-out`,
                      animationDelay: `${Math.random()}s`
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-ivory/90 hover:text-white transition-colors duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Cliquez pour entrer
              </h1>
              <p className="text-sm md:text-base font-light tracking-widest text-ivory/50 uppercase">
                Une célébration sans frontières
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
