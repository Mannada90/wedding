import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export default function MusicPlayer({ hasEntered }: { hasEntered?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (hasEntered && audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Autoplay prevented:", err);
            setIsPlaying(false);
          });
      }
    }
  }, [hasEntered]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(console.error);
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/music.mp3" 
        loop 
        playsInline 
        preload="auto"
      />
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: hasEntered ? 1 : 0, scale: hasEntered ? 1 : 0.8 }}
        transition={{ duration: 1 }}
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 text-gold z-50 shadow-lg transition-transform hover:scale-105 ${!hasEntered ? 'pointer-events-none' : ''}`}
        aria-label={isPlaying ? "Couper la musique" : "Mettre la musique"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>
    </>
  );
}
