"use client";

import { motion } from "framer-motion";

export function Overview() {
  return (
    <section id="overview" className="py-32 relative bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2B6CFF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00D6FF]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <span className="text-sm font-bold text-[#2B6CFF] tracking-widest uppercase block mb-4">
            The Core Concept
          </span>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-white/95">
            Walk Through. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B6CFF] to-[#00D6FF]">
              That's It.
            </span>
          </h2>
          
          <p className="text-2xl md:text-3xl font-light text-white/70 max-w-4xl mx-auto leading-relaxed mt-8">
            CARD-X is a smart attendance and entry ecosystem driven by long-range UHF RFID.
          </p>


        </motion.div>
      </div>
    </section>
  );
}
