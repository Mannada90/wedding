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
            <h2 className="font-serif text-5xl md:text-8xl font-light tracking-tight text-gradient-gold pb-4">
              RSVP
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto" />
          </div>

          <p className="font-serif text-xl md:text-4xl leading-relaxed font-light text-ivory/90">
            Merci de confirmer votre présence<br />
            avant le <span className="font-medium text-gold">1er mai 2026</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glow-button text-ivory px-8 py-4 md:px-12 md:py-5 rounded-full uppercase tracking-[0.2em] text-xs md:text-sm font-semibold"
          >
            <span className="relative z-10">Confirmer ma présence</span>
          </motion.button>

          <div className="pt-12 md:pt-16 max-w-2xl mx-auto border-t border-white/10 mt-12 md:mt-16">
            <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4 md:mb-6">Note Importante</h3>
            <p className="font-serif text-lg md:text-2xl leading-relaxed font-light text-ivory/70 italic">
              "Le temps d’une soirée, laissez les petits à la maison<br className="hidden md:block" />
              et venez partager ce moment spécial avec nous."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
