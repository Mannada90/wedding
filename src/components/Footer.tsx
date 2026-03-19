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
          className="space-y-12"
        >
          <p className="font-serif text-2xl md:text-5xl leading-relaxed font-light text-ivory/90 italic flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            On a hâte de célébrer avec vous <Heart className="text-gold w-6 h-6 md:w-10 md:h-10" strokeWidth={1} />
          </p>

          <div className="space-y-4 pt-12">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold">
              Wakanda Phô Ever!!
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight">
              Maram <span className="text-gold italic font-light">&</span> David
            </h2>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
