"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const components = [
  {
    title: "UHF RFID READER",
    description: "The core engine. Broadcasts radio waves and passively harvests replies without ever requiring direct line-of-sight. Under 1 second response.",
  },
  {
    title: "LONG-RANGE ANTENNAS",
    description: "Shaping the detection arena. Positioned securely to capture perfect cross-gate read zones.",
  },
  {
    title: "PASSIVE UHF TAGS",
    description: "Battery-free intelligence. Receives its entire lifeblood from the reader's RF field. Cheap, scalable, zero maintenance.",
  },
  {
    title: "EDGE CONTROLLER",
    description: "The gatekeeper middleware. Instantly filters noise, deduplicates tag collisions, and governs offline buffering.",
  },
  {
    title: "CLOUD ARCHITECTURE",
    description: "Permanent attendance ledgers. Validates logic, maps tags to students, and triggers instant parent webhooks.",
  },
  {
    title: "AI CAMERA (PHASE 2)",
    description: "Facial fallback authentication. Fully mitigates proxy loopholes by verifying hardware tags against biometric reality.",
  },
];

export function TechnologyStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTitleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the left title
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftTitleRef.current,
        pinSpacing: false,
      });

      // Animate each item in the right column
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        gsap.fromTo(item, 
          { opacity: 0.2, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-transparent text-white py-32 border-white/5">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row relative">
        
        {/* Left Sticky Title */}
        <div className="w-full lg:w-1/3 mb-24 lg:mb-0 hidden lg:block">
          <h2 
            ref={leftTitleRef}
            className="text-[6rem] leading-[0.85] font-black uppercase tracking-tighter sticky top-32 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10"
          >
            THE<br/>STACK.
          </h2>
        </div>

        {/* Mobile Title */}
        <div className="w-full lg:hidden mb-16">
          <h2 className="text-[4rem] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
            THE STACK.
          </h2>
        </div>

        {/* Right Scrollable Items */}
        <div className="w-full lg:w-2/3 flex flex-col gap-32 pb-64">
          {components.map((item, idx) => (
            <div 
              key={idx} 
              ref={(el) => { itemsRef.current[idx] = el; }}
              className="flex flex-col gap-4"
            >
              <span className="text-xl font-black text-[#2B6CFF] tracking-widest">{String(idx + 1).padStart(2, '0')} //</span>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white/90">
                {item.title}
              </h3>
              <p className="text-xl md:text-2xl font-medium text-white/60 leading-relaxed max-w-xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
