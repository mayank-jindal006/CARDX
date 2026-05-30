"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "STUDENT APPROACHES",
    description: "Student walks toward the gate. No tapping, no stopping.",
  },
  {
    title: "RADIO FIELD ACTIVATED",
    description: "The RFID reader creates an active radio field across the gate entirely invisibly.",
  },
  {
    title: "CARD ENERGIZED",
    description: "The passive RFID card inside the student’s ID gets energized automatically without a battery.",
  },
  {
    title: "ID CAPTURED",
    description: "Card continuously backscatters its unique ID. The edge device applies immediate deduplication.",
  },
  {
    title: "ATTENDANCE MARKED",
    description: "Backend validates the database and commits the attendance hook instantly (under 1 second).",
  },
  {
    title: "PARENTS NOTIFIED",
    description: "Optional real-time confirmation dispatched to parents via SMS or WhatsApp.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, idx) => {
        if (!item) return;
        
        // Entrance animation
        gsap.fromTo(item, 
          { opacity: 0, y: 150 },
          {
            opacity: 1, 
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-transparent relative overflow-hidden">
      
      {/* Motion Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[80vh] opacity-30 pointer-events-none mix-blend-screen blur-[120px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2B6CFF]/80 via-transparent to-[#00D6FF]/60 animate-pulse" style={{ animationDuration: "8s" }} />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <h2 className="text-[5rem] md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] mb-32 text-center text-white drop-shadow-lg">
          PROCESS
        </h2>
        
        <div className="flex flex-col gap-48">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              ref={(el) => { itemsRef.current[idx] = el; }}
              className="flex flex-col gap-6 items-center text-center max-w-3xl mx-auto"
            >
              <div className="text-[8rem] md:text-[12rem] font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-[#2B6CFF]/50 to-transparent leading-none select-none pointer-events-none -mb-32 md:-mb-40 z-0 drop-shadow-[0_0_25px_rgba(43,108,255,0.2)]">
                {String(idx + 1).padStart(2, '0')}
              </div>
              
              <div className="relative z-10 space-y-4">
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-md">
                  {step.title}
                </h3>
                <p className="text-xl md:text-3xl font-medium text-white/90 leading-relaxed font-sans shadow-black drop-shadow-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
