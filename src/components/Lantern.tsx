import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LanternData {
  id: number;
  top: string;
  left: string;
  scale: number;
  delay: number;
  duration: number;
}

export default function Lantern() {
  const [lanterns, setLanterns] = useState<LanternData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const newLanterns: LanternData[] = [];
    const isMobile = window.innerWidth < 768;
    const numLanterns = isMobile ? 10 : 15; // Plein de petites lanternes

    for (let i = 0; i < numLanterns; i++) {
      // Éviter le centre : on place les lanternes soit à l'extrême gauche (0-15%) soit à l'extrême droite (85-100%)
      const isLeft = Math.random() > 0.5;
      const left = isLeft 
        ? Math.floor(Math.random() * 15) + '%' 
        : Math.floor(Math.random() * 15 + 85) + '%';
      
      // Répartition sur la hauteur de la section
      const top = Math.floor(Math.random() * 80 + 10) + '%';
      
      // Tailles variées mais plus petites pour éviter de surcharger l'écran (surtout sur mobile)
      const scale = Math.random() * 0.2 + 0.15; 
      
      // Animations désynchronisées
      const delay = Math.random() * 5;
      const duration = Math.random() * 4 + 6; // 6 à 10 secondes pour une ondulation complète

      newLanterns.push({ id: i, top, left, scale, delay, duration });
    }
    
    setLanterns(newLanterns);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {lanterns.map((lantern) => (
        <div
          key={lantern.id}
          style={{ 
            position: 'absolute', 
            top: lantern.top, 
            left: lantern.left, 
            transform: `scale(${lantern.scale})`,
            opacity: 0.85
          }}
        >
          <motion.div
            initial={{ y: 0, x: 0, rotate: -2 }}
            animate={{ 
              y: [0, -15, 0, 15, 0],
              x: [0, 10, 0, -10, 0],
              rotate: [-2, 3, -2]
            }}
            transition={{ 
              duration: lantern.duration, 
              ease: "easeInOut",
              repeat: Infinity,
              delay: lantern.delay
            }}
            className="flex flex-col items-center justify-center"
          >
            {/* Lantern Body */}
            <div className="relative w-12 h-16 md:w-16 md:h-24 bg-gradient-to-b from-orange-50/90 via-orange-200/90 to-orange-500/90 rounded-t-[45%] rounded-b-md shadow-[0_0_20px_rgba(251,146,60,0.4)] md:shadow-[0_0_40px_rgba(251,146,60,0.8)] overflow-hidden backdrop-blur-none md:backdrop-blur-sm">
              {/* Inner Glow / Fire light */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-4/5 bg-gradient-to-t from-yellow-300/90 via-orange-400/50 to-transparent mix-blend-normal md:mix-blend-overlay blur-[2px] md:blur-[4px]" />
              
              {/* Lantern Ribs (vertical lines) */}
              <div className="absolute inset-0 border-x border-orange-700/20 rounded-t-[45%] rounded-b-md" />
              <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-orange-700/20" />
            </div>
            
            {/* Lantern Base */}
            <div className="w-10 h-1.5 md:w-12 md:h-2 bg-orange-950/80 rounded-b-sm relative mt-[1px] flex justify-center">
              {/* Tiny flame glow at the bottom */}
              <div className="absolute -top-3 w-4 h-4 bg-yellow-100 rounded-full blur-[2px] md:blur-[4px] shadow-[0_0_8px_rgba(253,224,71,0.5)] md:shadow-[0_0_15px_rgba(253,224,71,1)]" />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
