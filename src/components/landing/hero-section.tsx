"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
  Film,
  CheckCircle2,
  Tv,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveAppMockup } from "./live-app-mockup";

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Radial Lights & Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-[#5865F2]/25 via-[#23A55A]/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#5865F2]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#23A55A]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Text Content */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-x-2 px-4 py-1.5 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/40 text-[#8E97FF] shadow-[0_0_20px_rgba(88,101,242,0.25)] hover:border-[#5865F2]/70 transition cursor-default">
            <Sparkles className="h-4 w-4 text-[#FEE75C] animate-spin" style={{ animationDuration: "6s" }} />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
              Assista Juntos em 1080p & 4K @ 60 FPS • 100% Gratuito
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            O Discord com{" "}
            <span className="bg-gradient-to-r from-[#5865F2] via-[#8E97FF] to-[#23A55A] bg-clip-text text-transparent drop-shadow-sm">
              Som de Cinema
            </span>{" "}
            e Streaming 60 FPS de Verdade.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Chega de tela preta no Netflix, áudio de robô abafado e pagar R$ 30/mês no Discord Nitro só para ter 60 FPS.
            O <strong className="text-white font-semibold">Concord</strong> oferece pipeline de áudio duplo Opus 48kHz,
            Palco de Cinema dedicado e zero atraso via WebRTC SFU.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SignedOut>
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-base shadow-[0_0_35px_rgba(88,101,242,0.45)] hover:shadow-[0_0_45px_rgba(88,101,242,0.65)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-x-2"
                >
                  <Sparkles className="h-5 w-5 text-[#FEE75C]" />
                  <span>Começar Agora — 100% Grátis</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/setup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-[#23A55A] hover:bg-[#1C8B4C] text-white font-bold text-base shadow-[0_0_35px_rgba(35,165,90,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-x-2"
                >
                  <Film className="h-5 w-5" />
                  <span>Abrir Meu Servidor Concord</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>

            <a href="#comparativo" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-7 rounded-2xl border-zinc-700 hover:border-zinc-500 bg-[#1A1C23]/80 hover:bg-[#252833] text-zinc-200 font-semibold text-base backdrop-blur-md transition flex items-center justify-center gap-x-2"
              >
                <Zap className="h-5 w-5 text-[#FEE75C]" />
                <span>Ver vs Discord Nitro</span>
              </Button>
            </a>
          </div>

          {/* Trust Value Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-400">
            <span className="flex items-center gap-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#23A55A]" />
              Sem cartão de crédito
            </span>
            <span className="flex items-center gap-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#23A55A]" />
              1080p e 4K 60FPS liberado
            </span>
            <span className="flex items-center gap-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#23A55A]" />
              Anti-Tela Preta DRM
            </span>
            <span className="flex items-center gap-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#23A55A]" />
              Latência SFU &lt; 100ms
            </span>
          </div>
        </div>

        {/* Live Interactive Discord Simulation Container */}
        <div id="demo" className="mt-14 sm:mt-20 relative">
          {/* Subtle Stage Backlight */}
          <div className="absolute -inset-4 bg-gradient-to-b from-[#5865F2]/20 via-[#23A55A]/10 to-transparent rounded-3xl blur-2xl -z-10 opacity-70" />
          <LiveAppMockup />
        </div>
      </div>
    </section>
  );
};
