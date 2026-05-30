import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TechnologyStack } from "@/components/sections/technology-stack";
import { WhyCardX } from "@/components/sections/why-cardx";
import { VantaBackground } from "@/components/canvas/vanta-background";

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white relative selection:bg-[#2B6CFF] selection:text-white w-full flex flex-col overflow-hidden">
      <VantaBackground />
      <Navbar />

      <div className="flex-1 w-full flex flex-col justify-center pt-32 relative z-10">
        <TechnologyStack />
        <WhyCardX />
      </div>

      <Footer />
    </main>
  );
}
