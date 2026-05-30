import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HowItWorks } from "@/components/sections/how-it-works";
import DotGrid from "@/components/canvas/DotGrid";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white relative selection:bg-[#2B6CFF] selection:text-white w-full flex flex-col overflow-hidden">
      
      {/* Interactive Dot Grid Background */}
      <div className="fixed inset-0 z-0 opacity-60 pointer-events-none mix-blend-screen">
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

      <Navbar />
      
      <div className="flex-1 w-full flex flex-col justify-center pt-32 relative z-10">
        <HowItWorks />
      </div>

      <Footer />
    </main>
  );
}
