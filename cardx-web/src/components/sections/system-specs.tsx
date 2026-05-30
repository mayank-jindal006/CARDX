"use client";

import { motion } from "framer-motion";
import { Shield, Signal, Wifi, Clock, MapPin, Database } from "lucide-react";

const specs = [
  { icon: Signal, label: "RFID Range", value: "3 to 6 Meters (depends on antenna & environment)" },
  { icon: Clock, label: "Response Time", value: "< 1 Second per student" },
  { icon: MapPin, label: "Direction Logic", value: "Dual antennas & IR beams infer IN/OUT movement" },
  { icon: Database, label: "Data Captured", value: "Card ID, timestamp, gate location, direction" },
  { icon: Wifi, label: "Connectivity", value: "Ethernet, Wi-Fi, 4G, Cloud Sync, Offline Buffer" },
];

export function SystemSpecs() {
  return (
    <section id="specs" className="py-24 relative bg-[#0A0A0C] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Development Phases */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold text-[#2B6CFF] tracking-widest uppercase mb-2 block">Roadmap</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Phase-Wise Expansion</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#111] to-[#0A0A0C] border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B6CFF]/20 blur-[50px] rounded-full" />
              <h3 className="text-2xl font-bold mb-4 text-[#2B6CFF]">Phase 1: Smart Attendance</h3>
              <p className="text-white/60 mb-6 line-clamp-3">
                The core foundation of the CARD-X system, solving the primary friction of traditional attendance logging.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">&bull; UHF RFID walk-through detection</li>
                <li className="flex items-center gap-2">&bull; Automatic attendance marking</li>
                <li className="flex items-center gap-2">&bull; Real-time web dashboard</li>
                <li className="flex items-center gap-2">&bull; Instant parent SMS/WhatsApp alerts</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#111] to-[#0A0A0C] border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D6FF]/20 blur-[50px] rounded-full" />
              <h3 className="text-2xl font-bold mb-4 text-[#00D6FF]">Phase 2: AI & Security</h3>
              <p className="text-white/60 mb-6">
                Upgrading the system from merely an attendance logger into a full school-entry security ecosystem.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">&bull; Camera face verification integration</li>
                <li className="flex items-center gap-2">&bull; Hardware + Biometric card matching</li>
                <li className="flex items-center gap-2">&bull; Duplicate tag & proxy prevention</li>
                <li className="flex items-center gap-2">&bull; Actionable deep audit logging</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Technical Specs & Security Realities */}
        <div className="bg-[#050505] border border-white/10 rounded-3xl p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            className="flex flex-col lg:flex-row gap-12"
          >
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl font-bold mb-4">Technical Specs</h2>
              <p className="text-white/60 mb-6">
                Engineered around EPC Gen2 / ISO-18000-6C constraints, designed to maximize throughput and reliability while mitigating standard physics limitations of RFID.
              </p>
            </div>

            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-4 p-4 border-b border-white/5 pb-6">
                  <div className="text-white/40 pt-1">
                    <spec.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90 text-sm tracking-wider uppercase mb-1">{spec.label}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
