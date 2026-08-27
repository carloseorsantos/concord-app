"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Sparkles, ArrowRight, Film, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CtaBanner = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#0E0F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#1C1E28] to-[#121319] border border-white/10 p-8 sm:p-14 lg:p-20 text-center overflow-hidden shadow-2xl">
          {/* Ambient Inner Glows */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#5865F2]/25 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-24 right-10 w-80 h-80 bg-[#23A55A]/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#8E97FF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-[#FEE75C]" />
              Watch Party Como Deve Ser
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Pronto para a Melhor Experiência de Streaming com Amigos?
            </h2>

            <p className="text-sm sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Junte-se ao Concord hoje mesmo. Compartilhe filmes, animes e games em 60 FPS com áudio estéreo
              cristalino e sem pagar assinatura.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignedOut>
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-base shadow-[0_0_35px_rgba(88,101,242,0.45)] hover:shadow-[0_0_50px_rgba(88,101,242,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-x-2"
                  >
                    <Sparkles className="h-5 w-5 text-[#FEE75C]" />
                    <span>Começar Gratuitamente no Concord</span>
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
                    <span>Acessar Meu Servidor Agora</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </SignedIn>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400">
              <span className="flex items-center gap-x-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#23A55A]" />
                100% Grátis sem taxas ocultas
              </span>
              <span className="flex items-center gap-x-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#23A55A]" />
                Setup em menos de 10 segundos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
