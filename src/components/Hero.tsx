import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero({ hasEntered }: { hasEntered?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Subtle parallax for text
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center"
    >
      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-6 flex flex-col items-center"
        style={{ y: yText, opacity: opacityText }}
      >
        {/* Top Label */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.5, delay: 3.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#C6A96B] uppercase tracking-[0.4em] text-[10px] md:text-xs font-medium mb-8 opacity-90"
        >
          Une célébration sans frontières
        </motion.p>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.5, delay: 3.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl lg:text-[9rem] font-serif font-light text-white/95 mb-8 tracking-tight"
        >
          David <span className="text-[#C6A96B] italic font-light">&</span> Maram
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={hasEntered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 3.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/60 font-serif text-lg md:text-xl max-w-md mx-auto leading-relaxed tracking-wide"
        >
          Deux cultures, une histoire, un moment unique.
        </motion.p>
      </motion.div>
    </section>
  );
}
