"use client";

import { LandingNavbar } from "./navbar";
import { HeroSection } from "./hero-section";
import { FeaturesGrid } from "./features-grid";
import { CinemaStageDeepdive } from "./cinema-stage-deepdive";
import { NitroComparison } from "./nitro-comparison";
import { InteractivePlayground } from "./interactive-playground";
import { HowItWorks } from "./how-it-works";
import { Testimonials } from "./testimonials";
import { FaqSection } from "./faq-section";
import { CtaBanner } from "./cta-banner";
import { Footer } from "./footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0E0F12] text-white flex flex-col selection:bg-[#5865F2] selection:text-white relative">
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 landing-grid pointer-events-none opacity-40 z-0" />

      {/* Header & Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <HeroSection />
        <FeaturesGrid />
        <CinemaStageDeepdive />
        <NitroComparison />
        <InteractivePlayground />
        <HowItWorks />
        <Testimonials />
        <FaqSection />
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
