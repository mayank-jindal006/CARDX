"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cinematic INTRODUCING CARDX loader.
 * Text appears, scales down, slides to top left over 2.5s.
 */
export function IntroLoader({ onComplete }: { onComplete: () => void }) {
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        // Check user preference for reduced motion
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReducedMotion(mediaQuery.matches);

        if (mediaQuery.matches) {
            // If prefers reduced motion, skip loader immediately
            onComplete();
        }
    }, [onComplete]);

    if (isReducedMotion) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.8, delay: 2.5, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
        >
            <motion.div
                className="flex overflow-hidden"
                initial={{ scale: 1, y: 0, x: 0 }}
                animate={{
                    scale: 0.15,
                    y: "-45vh",
                    x: "-45vw",
                    opacity: 0
                }}
                transition={{
                    duration: 1,
                    delay: 1.5,
                    ease: [0.76, 0, 0.24, 1]
                }}
            >
                {"INTRODUCING CARDX".split("").map((letter, index) => (
                    <motion.span
                        key={index}
                        className="text-white/90 font-bold text-5xl md:text-7xl tracking-tighter"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.05,
                            ease: [0.22, 1, 0.36, 1], // easeOutQuint-ish
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}

                {/* Subtle sweeping line effect over text */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,214,255,0.4)] to-transparent opacity-0 mix-blend-overlay"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: 1 }}
                    transition={{
                        duration: 1.2,
                        delay: 0.8,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
