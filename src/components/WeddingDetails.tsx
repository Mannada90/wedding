import { motion } from 'motion/react';

export default function WeddingDetails() {
  return (
    <section className="relative w-full text-ivory py-20 md:py-48 overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-indigo/20 blur-[120px] rounded-full" />
      </div>

      {/* Section Title */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mb-16 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-7xl font-light tracking-tight text-gradient-gold hover:drop-shadow-[0_0_15px_rgba(198,169,107,0.6)] transition-all duration-500 cursor-default pb-4"
        >
          Le Mariage
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-16 h-[1px] bg-gold mx-auto mt-8"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        
        {/* Celebration */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-card rounded-3xl p-8 md:p-12 flex flex-col items-center text-center space-y-8"
        >
          <div className="w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden mb-4 relative rounded-2xl border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
              alt="Celebration Venue" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>

          <h3 className="text-gold uppercase tracking-[0.2em] text-lg md:text-xl font-semibold">Célébration</h3>
          
          <div className="space-y-4 font-serif text-2xl md:text-4xl font-light leading-relaxed">
            <p className="font-medium text-ivory">Samedi 11 juillet à 18h</p>
            <p className="text-ivory/60 text-xl md:text-2xl">
              Les Salons Hoche<br />
              9 Avenue Hoche<br />
              75008 Paris
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
