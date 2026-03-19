import { motion } from 'motion/react';

export default function DressCode() {
  return (
    <section className="relative w-full text-ivory py-20 md:py-48 overflow-hidden">
      
      {/* Textile Bands */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Band 1: Deep Turquoise / Emerald Silk */}
        <div 
          className="absolute top-[10%] left-[-10%] w-[120%] md:w-[70%] h-[250px] md:h-[350px] opacity-60 md:opacity-85 md:blur-[2px] -rotate-6"
          style={{ maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2000&auto=format&fit=crop" 
            alt="Turquoise Silk" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Band 2: Warm Sand / Beige Fabric */}
        <div 
          className="absolute top-[35%] right-[-15%] w-[120%] md:w-[65%] h-[250px] md:h-[400px] opacity-60 md:opacity-90 md:blur-[2px] rotate-6"
          style={{ maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600161188147-32c161877661?q=80&w=2000&auto=format&fit=crop" 
            alt="Warm Sand Fabric" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Band 3: Vibrant African Wax Pattern */}
        <div 
          className="absolute bottom-[5%] left-[-10%] w-[120%] md:w-[55%] h-[200px] md:h-[300px] opacity-50 md:opacity-80 md:blur-[3px] -rotate-3"
          style={{ maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2000&auto=format&fit=crop" 
            alt="Vibrant Wax Pattern" 
            className="w-full h-full object-cover saturate-150"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Band 4: Yellow-Green Accent */}
        <div 
          className="absolute top-[60%] left-[10%] w-[100%] md:w-[45%] h-[200px] md:h-[250px] opacity-60 md:opacity-85 md:blur-3xl rotate-12"
          style={{ maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=2000&auto=format&fit=crop" 
            alt="Yellow-Green Silk Accent" 
            className="w-full h-full object-cover hue-rotate-90 saturate-150 blur-xl md:blur-2xl"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-card rounded-[3rem] p-12 md:p-24 space-y-16"
        >
          <div className="space-y-6">
            <h2 className="text-gold uppercase tracking-[0.3em] text-xs font-semibold cursor-default">Dress Code</h2>
            <h3 className="font-serif text-4xl md:text-8xl font-light italic tracking-tight text-gradient-gold pb-4">
              Paris sans frontières
            </h3>
          </div>

          <p className="font-serif text-xl md:text-4xl leading-relaxed font-light text-ivory/90 max-w-3xl mx-auto">
            Le temps d’une soirée, on célèbre toutes nos origines.<br className="hidden md:block" />
            Venez en tenue traditionnelle de fête de votre pays —<br className="hidden md:block" />
            <span className="italic text-gold">Wax, Pha Chung Hang, Caftans…</span>
          </p>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl uppercase tracking-[0.2em] font-medium text-ivory/80 pt-12"
          >
            Brillez de mille feux.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
