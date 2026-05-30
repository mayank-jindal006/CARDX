"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);

  const initVanta = () => {
    // Only initialize if Vanta is loaded, three is loaded, and not already running
    if (!vantaEffect.current && window.VANTA && window.VANTA.GLOBE && window.THREE) {
      vantaEffect.current = window.VANTA.GLOBE({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x2B6CFF, // matching the brand primary
        backgroundColor: 0x050505, // matching brand dark
        size: 1.2,
        THREE: window.THREE
      });
    }
  };

  useEffect(() => {
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Vanta Container - absolute fixed to background */}
      <div 
        ref={vantaRef} 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen" 
      />

      {/* Script Loader */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" 
        strategy="lazyOnload" 
        onReady={() => setThreeLoaded(true)}
      />
      {threeLoaded && (
        <Script 
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js" 
          strategy="lazyOnload" 
          onReady={initVanta}
        />
      )}
    </>
  );
}

// declare global mapping for window to prevent TS errors
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}
