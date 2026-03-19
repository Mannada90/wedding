import { motion } from 'motion/react';

export default function Story() {
  return (
    <section className="relative w-full text-ivory py-20 md:py-48 overflow-hidden">
      
      {/* Meeting Section */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24 md:mb-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <h2 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4 hover:text-ivory hover:drop-shadow-[0_0_8px_rgba(198,169,107,0.8)] transition-all duration-500 cursor-default">La Rencontre</h2>
          <p className="font-serif text-2xl md:text-5xl leading-relaxed font-light text-ivory/90">
            Deux histoires, deux cultures, deux trajectoires… <br className="hidden md:block" />
            <span className="italic text-gold">Jusqu’à ce que tout se rencontre.</span>
          </p>
        </motion.div>
      </div>

      {/* Thailand Proposal Section */}
      <div className="relative w-full min-h-[70vh] md:min-h-screen flex items-center justify-center py-20 md:py-32">
        {/* Background removed for seamless continuity */}

        <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="space-y-12"
          >
            <h2 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold hover:text-ivory hover:drop-shadow-[0_0_8px_rgba(198,169,107,0.8)] transition-all duration-500 cursor-default">La Demande</h2>
            <p className="font-serif text-xl md:text-4xl leading-relaxed font-light text-ivory/90">
              Sous le ciel illuminé de Thaïlande,<br />
              <span className="italic">une promesse a été faite.</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* The Proposal - "Elle a dit oui" */}
      <div className="relative w-full py-24 md:py-48 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 2 }}
          className="text-center flex flex-col items-center"
        >
          {/* Subtle Ring Glow Effect */}
          <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 20px rgba(198,169,107,0.2)", "0 0 60px rgba(198,169,107,0.6)", "0 0 20px rgba(198,169,107,0.2)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-gold/30"
            />
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 10px rgba(198,169,107,0.1)", "0 0 30px rgba(198,169,107,0.4)", "0 0 10px rgba(198,169,107,0.1)"]
              }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 rounded-full border border-gold/50"
            />
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_15px_rgba(198,169,107,1)]" />
          </div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-5xl md:text-8xl italic text-ivory"
          >
            Elle a dit <span className="text-gold">oui.</span>
          </motion.h3>
        </motion.div>
      </div>

    </section>
  );
}
