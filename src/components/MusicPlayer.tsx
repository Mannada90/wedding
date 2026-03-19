import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Music, X, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ hasEntered }: { hasEntered?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState("/music.mp3");
  const audioRef = useRef<HTMLAudioElement>(null);
  const intendedPlayingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync React state with actual native audio element state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Handle autoplay when user enters the site
  useEffect(() => {
    if (hasEntered && audioRef.current) {
      audioRef.current.volume = 0.5;
      intendedPlayingRef.current = true;
      
      audioRef.current.play().catch(error => {
        console.error("Autoplay prevented:", error);
        intendedPlayingRef.current = false;
      });
    }
  }, [hasEntered]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        intendedPlayingRef.current = false;
        audioRef.current.pause();
      } else {
        intendedPlayingRef.current = true;
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const handleAudioError = () => {
    // Fallback to the 30-second preview if the user hasn't uploaded their full MP3 yet
    if (audioSrc === "/music.mp3") {
      setAudioSrc("https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e2/f5/6d/e2f56dd7-94b6-54cd-520e-552c77010bba/mzaf_9481305734597914667.plus.aac.p.m4a");
    }
  };

  // Manual loop fallback for mobile browsers that struggle with the loop attribute
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  };

  // Handle visibility change to resume audio if user comes back to the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && intendedPlayingRef.current && audioRef.current && audioRef.current.paused) {
        // Resume playing if the user returns to the tab and it was intended to be playing
        audioRef.current.play().catch(console.error);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Setup MediaSession API so mobile OS doesn't kill the audio aggressively
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Notre Chanson',
        artist: 'David & Maram',
        album: 'Le Mariage',
        artwork: [
          { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300&auto=format&fit=crop', sizes: '300x300', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        intendedPlayingRef.current = true;
        audioRef.current?.play().catch(console.error);
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        intendedPlayingRef.current = false;
        audioRef.current?.pause();
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop
        playsInline
        preload="auto"
        onError={handleAudioError}
        onEnded={handleEnded}
      />

      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: hasEntered ? 1 : 0, scale: hasEntered ? 1 : 0.8 }}
        transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 w-11 h-11 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-md border border-white/10 text-gold z-50 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-colors duration-300 ${!hasEntered ? 'pointer-events-none' : ''}`}
        aria-label="Open Music Player"
      >
        {isPlaying ? <Volume2 size={18} strokeWidth={1.5} /> : <VolumeX size={18} strokeWidth={1.5} />}
      </motion.button>

      {/* Modal Overlay */}
      <motion.div
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          pointerEvents: isOpen ? "auto" : "none" 
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
        onClick={() => setIsOpen(false)}
      >
        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ 
            scale: isOpen ? 1 : 0.95, 
            y: isOpen ? 0 : 20 
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-sm bg-black/80 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-12 right-0 md:-right-12 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-ivory/70 hover:text-ivory hover:bg-black/40 transition-all duration-300"
            aria-label="Close Music Player"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {/* Custom Player UI */}
          <div className="w-40 h-40 rounded-full overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(198,169,107,0.15)] bg-black/50 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300&auto=format&fit=crop" 
              alt="Album Cover" 
              className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}
            />
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-serif text-ivory mb-1">Notre Chanson</h3>
            <p className="text-xs text-ivory/60 tracking-[0.2em] uppercase">Musique de mariage</p>
          </div>

          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gold text-ink flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(198,169,107,0.3)]"
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}
