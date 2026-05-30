"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VIDEOS } from "@/lib/constants";

// For demo purposes, we trigger the labels near the end of the explosion video (15% to 40% overall scroll)
// Let's assume explosion finishes at 40% scroll. The labels should fade in around 35%-40%.

export function ExplosionOverlay() {
    const overlayRef = useRef(null);

    // In real site, these would map to exact scroll offsets corresponding to the specific frames of the explosion
    // For the moment, we use a fixed trigger point.
    const { scrollYProgress } = useScroll();

    // Trigger labels when scroll is between 25% to 35% to disappear before white screen
    const opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.33, 0.36], [0, 1, 1, 0]);


    const leftLabels = [
        { title: "UHF RFID Antenna", y: "15%" },
        { title: "Passive EPC Gen2 Tag", y: "35%" },
        { title: "Signal Processing Layer", y: "55%" },
        { title: "Embedded Controller", y: "75%" },
    ];

    const rightLabels = [
        { title: "Antenna Array", y: "15%" },
        { title: "Direction Detection Module", y: "35%" },
        { title: "IoT Gateway Interface", y: "55%" },
        { title: "Secure ID Mapping System", y: "75%" },
    ];

    return (
        <motion.div
            ref={overlayRef}
            className="absolute inset-x-0 inset-y-0 w-full h-full pointer-events-none z-20 px-4 md:px-12"
            style={{ opacity }}
        >
            <div className="relative w-full h-full">
                {/* Left Side Labels */}
                {leftLabels.map((item, idx) => (
                    <div key={idx} className="absolute left-0 lg:left-8" style={{ top: item.y }}>
                        <motion.div
                            className="text-white"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase whitespace-nowrap drop-shadow-lg">
                                {idx + 1}. {item.title}
                            </span>
                        </motion.div>
                    </div>
                ))}

                {/* Right Side Labels */}
                {rightLabels.map((item, idx) => (
                    <div key={idx} className="absolute right-0 lg:right-8 text-right" style={{ top: item.y }}>
                        <motion.div
                            className="text-white"
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase whitespace-nowrap drop-shadow-lg">
                                {idx + 5}. {item.title}
                            </span>
                        </motion.div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
