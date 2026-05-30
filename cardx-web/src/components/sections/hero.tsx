"use client";

import { motion } from "framer-motion";
import { DottedSurface } from "@/components/ui/dotted-surface";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
            {/* Background Dotted Surface Pattern */}
            <DottedSurface className="absolute inset-0 z-0 opacity-80 mix-blend-screen" />

            <div className="container relative z-10 mx-auto px-6 max-w-7xl flex flex-col items-center justify-center text-center">

                {/* Center Content: Copy */}
                <motion.div
                    className="flex flex-col gap-6 items-center max-w-4xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 2.8, ease: "easeOut" }} // Delays after IntroLoader completes
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        Smart Entry for Smart Schools.
                    </h1>

                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl mt-4 font-medium leading-relaxed">
                        Automated walk-through attendance powered by RFID.
                    </p>

                    <div className="mt-8">
                        <button className="bg-white text-black px-12 py-5 rounded-full text-lg font-bold
                hover:scale-105 transition-all active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.2)]">
                            Request Demo
                        </button>
                    </div>
                </motion.div>

                {/* Provide adequate scroll padding for the canvas sequence below, 
                    this empty div acts as a spacer to ensure the hero occupies the right amount of scroll real-estate
                    before the canvas elements take over */}
                <div className="h-[15vh]" />

            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 4 }}
            >
                <span className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-2">Scroll To Explore</span>
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
                    animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Seamless gradient blend into the gray/white video canvas - fades from solid hero black to totally clear */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#050505] via-[rgba(5,5,5,0.8)] to-transparent z-10 pointer-events-none" />
        </section>
    );
}
