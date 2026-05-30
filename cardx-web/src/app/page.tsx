"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { IntroLoader } from "@/components/sections/intro-loader";
import { Hero } from "@/components/sections/hero";
import { CanvasSequence } from "@/components/canvas/canvas-sequence";
import { FeatureScroll } from "@/components/sections/feature-scroll";
export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white relative selection:bg-[#2B6CFF] selection:text-white w-full">

      {!introFinished && <IntroLoader onComplete={() => setIntroFinished(true)} />}

      <Navbar />

      {/* The cinematic journey */}
      <div className="flex flex-col w-full">
        {/* 1. Hero Intro */}
        <Hero />

        {/* 3. Core Scrollytelling Mechanics (Canvas handles the 3 video sections mapped to scroll) */}
        <CanvasSequence />

        {/* 3. Features List Sticky Scroll */}
        <FeatureScroll />
      </div>

      <Footer />
    </main>
  );
}
