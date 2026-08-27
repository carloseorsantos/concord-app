"use client";

import {
  Tv,
  Sparkles,
  Maximize2,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  Film,
  Clapperboard,
  Eye,
} from "lucide-react";

export const CinemaStageDeepdive = () => {
  return (
    <section id="cinema" className="py-20 md:py-28 relative overflow-hidden bg-[#0E0F12]">
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#5865F2]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Description & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#8E97FF] text-xs font-bold uppercase tracking-wider">
              <Clapperboard className="h-3.5 w-3.5" />
              Experiência IMAX em Casa
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              O Canal Feito Sob Medida para Noites de Filme e Séries
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              No Discord comum, a transmissão de tela fica comprimida em janelinhas pequenas que competem
              por espaço com as câmeras dos participantes. No <strong>Palco de Cinema do Concord</strong>,
              o filme ganha o destaque máximo com proporção 16:9 cinematográfica e modo escurecido.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-x-3.5">
                <div className="p-2 rounded-xl bg-[#5865F2]/20 text-[#5865F2] shrink-0 mt-0.5">
                  <Maximize2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Modo Cinema (Theater Spotlight)</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Com 1 clique, a interface se recolhe e o fundo escurece totalmente, transformando seu monitor em uma sala de cinema.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-x-3.5">
                <div className="p-2 rounded-xl bg-[#23A55A]/20 text-[#23A55A] shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Guia Anti-Tela Preta (DRM Bypass)</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Instruções integradas para transmitir Netflix, Prime Video e Disney+ sem tela preta e com áudio da aba ativado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-x-3.5">
                <div className="p-2 rounded-xl bg-[#FEE75C]/20 text-[#FEE75C] shrink-0 mt-0.5">
                  <Volume2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Mixer de Áudio do Apresentador</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Ajuste fino entre os efeitos especiais do filme e a conversa dos seus amigos para ninguém precisar gritar na call.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage Graphic */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-[#16171B] border border-white/10 p-4 sm:p-6 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#5865F2]/20 blur-3xl rounded-full pointer-events-none" />

              {/* Cinema Frame Illustration */}
              <div className="rounded-2xl bg-black border border-white/10 overflow-hidden relative shadow-inner aspect-[16/10] flex flex-col justify-between p-4">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />

                {/* Top overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-x-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse" />
                    <span className="font-bold text-white">PALCO DE CINEMA</span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-[#8E97FF] font-mono">4K Ultra HD</span>
                  </div>

                  <span className="bg-[#5865F2] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                    60 FPS
                  </span>
                </div>

                {/* Center Subtitle Mock */}
                <div className="relative z-10 text-center my-auto">
                  <span className="bg-black/80 backdrop-blur px-4 py-1.5 rounded-lg text-xs sm:text-sm text-yellow-300 font-semibold border border-white/10 shadow-lg">
                    &quot;O único limite para o nosso amanhã são as nossas dúvidas de hoje.&quot;
                  </span>
                </div>

                {/* Bottom Cinema Controls */}
                <div className="relative z-10 flex items-center justify-between text-xs text-white bg-black/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-x-2 text-zinc-300">
                    <Eye className="h-3.5 w-3.5 text-[#23A55A]" />
                    <span>8 amigos assistindo ao vivo</span>
                  </div>
                  <div className="flex items-center gap-x-1.5 text-[#23A55A] font-bold font-mono">
                    <span>Áudio Estéreo 48kHz</span>
                  </div>
                </div>
              </div>

              {/* Supported Platforms Strip */}
              <div className="mt-5 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">Compatível com:</span>
                <div className="flex items-center gap-x-3 font-semibold text-zinc-400">
                  <span className="hover:text-white transition cursor-default">Netflix</span>
                  <span>•</span>
                  <span className="hover:text-white transition cursor-default">Prime Video</span>
                  <span>•</span>
                  <span className="hover:text-white transition cursor-default">Disney+</span>
                  <span>•</span>
                  <span className="hover:text-white transition cursor-default">HBO Max</span>
                  <span>•</span>
                  <span className="hover:text-white transition cursor-default">YouTube</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
