"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  { old: "WAIT IN QUEUES", new: "WALK THROUGH" },
  { old: "TAP CARDS", new: "ZERO TOUCH" },
  { old: "PROXY EASY", new: "AI VERIFIED" },
  { old: "MANUAL LOGS", new: "INSTANT DATA" },
  { old: "BLIND PARENTS", new: "REAL-TIME ALERTS" },
];

export function WhyCardX() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        const oldText = row.querySelector('.old-text');
        const newText = row.querySelector('.new-text');
        const line = row.querySelector('.strike-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "center 60%", // Triggers when the row approaches the middle
            end: "center 40%",   // Finishes when row is past the middle
            scrub: true,
          }
        });

        // 1. Strike through the old text
        tl.to(line, { width: "100%", ease: "none" }, 0);
        tl.to(oldText, { opacity: 0.2, ease: "none" }, 0);
        
        // 2. Fade and scale in the new text
        tl.fromTo(newText, 
          { opacity: 0, x: -50 }, 
          { opacity: 1, x: 0, ease: "power2.out" }, 
          0.3 // overlap slightly
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-48 relative bg-transparent overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-24">
          THE SHIFT //
        </h2>

        <div className="flex flex-col gap-24">
          {comparisons.map((item, i) => (
            <div 
              key={i} 
              ref={(el) => { rowsRef.current[i] = el; }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16 border-b border-white/5 pb-12"
            >
              {/* Old Paradigm */}
              <div className="relative inline-block w-full md:w-5/12">
                <span className="old-text text-4xl md:text-[4rem] font-black tracking-tighter uppercase text-white/50 leading-none">
                  {item.old}
                </span>
                {/* Strikethrough line */}
                <div className="strike-line absolute top-1/2 left-0 h-1 sm:h-2 bg-red-600 w-0 transform -translate-y-1/2 rounded-full" />
              </div>

              {/* Arrow separator (hidden on mobile, abstract element) */}
              <div className="hidden md:flex w-2/12 justify-center opacity-20">
                <div className="w-full h-[1px] bg-white relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t border-r border-white transform rotate-45 translate-x-1/2" />
                </div>
              </div>

              {/* New Paradigm */}
              <div className="w-full md:w-5/12 md:text-right">
                <span className="new-text text-5xl md:text-[5rem] font-black tracking-tighter uppercase text-[#00D6FF] leading-none opacity-0">
                  {item.new}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
