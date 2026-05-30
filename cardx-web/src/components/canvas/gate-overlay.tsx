"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface GateOverlayProps {
    scrollYProgress: MotionValue<number>;
}

export function GateOverlay({ scrollYProgress }: GateOverlayProps) {
    // Video 3 (Gate) occupies roughly scroll progress 0.71 to 1.0 within the canvas container.
    // Text appears shortly after video 3 starts and fades out before the container ends,
    // so it never bleeds into the next section.
    const containerOpacity = useTransform(scrollYProgress, [0.72, 0.76, 0.93, 0.97], [0, 1, 1, 0]);

    // Mask reveals for lines, staggered within the video 3 range
    const line1Y = useTransform(scrollYProgress, [0.74, 0.78], ["100%", "0%"]);
    const line2Y = useTransform(scrollYProgress, [0.78, 0.82], ["100%", "0%"]);
    const line3Y = useTransform(scrollYProgress, [0.82, 0.86], ["100%", "0%"]);

    return (
        <motion.div
            className="absolute inset-x-0 top-0 pt-32 pr-24 z-50 pointer-events-none flex flex-col items-end"
            style={{ opacity: containerOpacity }}
        >
            <div className="flex flex-col items-start w-fit">
                <div className="overflow-hidden">
                    <motion.h2
                        className="text-4xl md:text-7xl font-black tracking-tighter text-black uppercase"
                        style={{ y: line1Y }}
                    >
                        NO TAP
                    </motion.h2>
                </div>
                <div className="overflow-hidden">
                    <motion.h2
                        className="text-4xl md:text-7xl font-black tracking-tighter text-black/80 uppercase"
                        style={{ y: line2Y }}
                    >
                        NO SCAN
                    </motion.h2>
                </div>
                <div className="overflow-hidden mt-2">
                    <motion.h2
                        className="text-4xl md:text-7xl font-black tracking-tighter text-[#2B6CFF] uppercase"
                        style={{ y: line3Y }}
                    >
                        JUST WALK IN
                    </motion.h2>
                </div>
            </div>
        </motion.div>
    );
}
