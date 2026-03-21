import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full text-ivory py-20 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-16"
        >
          {/* Couple Photo */}
          <div className="w-full max-w-3xl mx-auto aspect-[3/2] overflow-hidden rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
            <img 
              src="/thailand.jpg" 
              alt="David & Maram en Thaïlande" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="font-serif text-3xl md:text-6xl leading-relaxed font-light text-ivory/90 italic flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            On a hâte de célébrer avec vous <Heart className="text-gold w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
          </p>

          <div className="space-y-6 pt-12">
            <p className="text-gold uppercase tracking-[0.3em] text-xl md:text-2xl font-bold drop-shadow-md">
              Wakanda Phô Ever!!
            </p>
            <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight">
              Maram <span className="text-gold italic font-light">&</span> David
            </h2>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
