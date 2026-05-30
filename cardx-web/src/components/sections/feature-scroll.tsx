"use client";

import { motion } from "framer-motion";
import DotGrid from "@/components/canvas/DotGrid";

export function FeatureScroll() {
    const features = [
        {
            id: "01",
            title: "Walk-Through Detection",
            description: "Students simply walk through the gate while wearing their ID card. No scanning required."
        },
        {
            id: "02",
            title: "Instant Attendance Logging",
            description: "The system reads RFID tags automatically and records attendance in real time. The entire process takes less than one second per student."
        },
        {
            id: "03",
            title: "Parent Notifications",
            description: "Parents receive instant alerts (SMS or WhatsApp) when their child enters the campus."
        },
        {
            id: "04",
            title: "Smart Analytics",
            description: "School administrators access attendance insights, entry logs, and analytics through a web dashboard."
        },
        {
            id: "05",
            title: "Campus Security",
            description: "Live student tracking records entry and exit events for better monitoring, eliminating attendance fraud and proxying."
        },
        {
            id: "06",
            title: "Scalable Platform",
            description: "Operates on a SaaS model scalable across multiple schools with robust anomaly detection."
        }
    ];

    return (
        <section className="relative w-full bg-[#050505] text-white z-30 overflow-hidden">
            {/* Interactive Dot Grid Background */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-screen">
                <DotGrid
                    dotSize={4}
                    gap={14}
                    baseColor="#271E37"
                    activeColor="#5227FF"
                    proximity={130}
                    shockRadius={180}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row relative z-10">

                {/* Scrolling Content */}
                <div className="w-full max-w-4xl mx-auto py-32 lg:py-48 flex flex-col gap-32">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-20% 0px -20% 0px", once: false }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col gap-4 items-center text-center"
                        >
                            <span className="text-sm font-bold text-[#2B6CFF] tracking-widest">{feature.id}</span>
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">{feature.title}</h3>
                            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
