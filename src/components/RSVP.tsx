import { motion } from 'motion/react';

export default function RSVP() {
  return (
    <section className="relative w-full text-ivory py-20 md:py-48 overflow-hidden">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-card rounded-[3rem] p-12 md:p-24 space-y-16"
        >
          <div className="space-y-6">
            <h2 className="font-serif text-6xl md:text-8xl font-light tracking-tight text-gradient-gold pb-4">
              RSVP
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto" />
          </div>

          <p className="font-serif text-2xl md:text-4xl leading-relaxed font-light text-ivory/90">
            Merci de nous confirmer votre présence par message,<br />
            avant le <span className="font-medium text-gold">1er mai 2026</span>
          </p>

          <div className="pt-12 md:pt-16 max-w-3xl mx-auto border-t border-white/10 mt-12 md:mt-16">
            <h3 className="text-gold uppercase tracking-[0.3em] text-lg md:text-xl font-bold mb-6 drop-shadow-md">Note Importante</h3>
            <p className="font-serif text-xl md:text-3xl leading-relaxed font-light text-ivory/90 italic">
              "Le temps d’une soirée, laissez les petits à la maison et <br className="hidden md:block" />
              venez partager ce moment spécial avec nous."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
