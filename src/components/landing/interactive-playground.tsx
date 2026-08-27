"use client";

import { useState } from "react";
import {
  Play,
  Sparkles,
  Zap,
  Volume2,
  Tv,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Disc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export const InteractivePlayground = () => {
  const [selectedFps, setSelectedFps] = useState<30 | 60>(60);
  const [audioMode, setAudioMode] = useState<"discord" | "concord">("concord");
  const [simulationActive, setSimulationActive] = useState(true);

  return (
    <section id="playground" className="py-20 md:py-28 relative overflow-hidden bg-[#0E0F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#8E97FF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-[#FEE75C]" />
            Laboratório Interativo
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Sinta a Diferença em Tempo Real
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Teste os controles abaixo para experimentar a diferença entre a transmissão comum de 30 FPS
            com áudio comprimido versus a experiência 60 FPS com áudio estéreo de alta fidelidade do Concord.
          </p>
        </div>

        {/* Playground Grid (FPS Tester + Audio Pipeline Simulator) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PLAYGROUND 1: FPS MOTION COMPARATOR */}
          <div className="bg-[#16171B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2.5">
                  <div className="p-2.5 rounded-2xl bg-[#5865F2]/20 text-[#5865F2]">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Comparador de Fluidez (FPS)</h3>
                    <p className="text-xs text-zinc-400">Teste o movimento em 30 FPS vs 60 FPS</p>
                  </div>
                </div>

                {/* FPS Selector Switch */}
                <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex items-center text-xs">
                  <button
                    onClick={() => setSelectedFps(30)}
                    className={cn(
                      "px-3 py-1 rounded-lg font-bold transition",
                      selectedFps === 30
                        ? "bg-[#ED4245] text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    30 FPS (Discord)
                  </button>
                  <button
                    onClick={() => setSelectedFps(60)}
                    className={cn(
                      "px-3 py-1 rounded-lg font-bold transition",
                      selectedFps === 60
                        ? "bg-[#23A55A] text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    60 FPS (Concord)
                  </button>
                </div>
              </div>

              {/* Visual Motion Area */}
              <div className="mt-6 h-48 bg-black/60 rounded-2xl border border-white/10 overflow-hidden relative flex flex-col justify-between p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono">Simulação de Renderização</span>
                  <span
                    className={cn(
                      "font-mono font-bold px-2 py-0.5 rounded text-xs",
                      selectedFps === 60
                        ? "bg-[#23A55A]/20 text-[#23A55A]"
                        : "bg-[#ED4245]/20 text-[#ED4245]"
                    )}
                  >
                    {selectedFps}.0 FPS • {selectedFps === 60 ? "16.6ms / frame" : "33.3ms / frame"}
                  </span>
                </div>

                {/* Moving Animated Discs */}
                <div className="relative w-full h-20 overflow-hidden flex items-center">
                  <div
                    className={cn(
                      "absolute flex items-center gap-x-2 px-4 py-2 rounded-xl bg-gradient-to-r text-white font-bold text-xs shadow-lg",
                      selectedFps === 60
                        ? "from-[#5865F2] to-[#23A55A] shadow-[#23A55A]/30"
                        : "from-[#ED4245] to-[#FEE75C] shadow-[#ED4245]/30"
                    )}
                    style={{
                      animation: `linear infinite alternate`,
                      animationName: "float",
                      animationDuration: selectedFps === 60 ? "2.5s" : "5s",
                    }}
                  >
                    <Disc className={cn("h-4 w-4", selectedFps === 60 ? "animate-spin" : "")} />
                    <span>
                      {selectedFps === 60
                        ? "✨ 60 FPS: Movimento Suave de Cinema"
                        : "⚠️ 30 FPS: Perda de Quadros e 'Gagueira'"}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 text-center">
                  {selectedFps === 60
                    ? "Taxa total de 60 quadros por segundo para filmes de ação, animes e games velozes."
                    : "No Discord comum sem Nitro, você fica preso a 30 FPS com borrões em cenas rápidas."}
                </div>
              </div>
            </div>

            <div className="text-xs text-zinc-300 bg-white/[0.03] p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="font-semibold text-white flex items-center gap-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#23A55A]" />
                Concord entrega 60 FPS nativo em 1080p e 4K
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Utilizamos WebRTC SFU com encoders H.264/VP9 otimizados por aceleração de hardware.
              </p>
            </div>
          </div>

          {/* PLAYGROUND 2: AUDIO ENGINE SIMULATOR */}
          <div className="bg-[#16171B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2.5">
                  <div className="p-2.5 rounded-2xl bg-[#23A55A]/20 text-[#23A55A]">
                    <Volume2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Simulador de Pipeline de Áudio</h3>
                    <p className="text-xs text-zinc-400">Ouça e visualize a separação de frequências</p>
                  </div>
                </div>

                {/* Audio Mode Selector */}
                <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex items-center text-xs">
                  <button
                    onClick={() => setAudioMode("discord")}
                    className={cn(
                      "px-3 py-1 rounded-lg font-bold transition",
                      audioMode === "discord"
                        ? "bg-[#ED4245] text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Áudio Discord
                  </button>
                  <button
                    onClick={() => setAudioMode("concord")}
                    className={cn(
                      "px-3 py-1 rounded-lg font-bold transition",
                      audioMode === "concord"
                        ? "bg-[#23A55A] text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Áudio Concord
                  </button>
                </div>
              </div>

              {/* Visual Frequency Equalizer */}
              <div className="mt-6 h-48 bg-black/60 rounded-2xl border border-white/10 overflow-hidden relative flex flex-col justify-between p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono">Fidelidade Espectral</span>
                  <span
                    className={cn(
                      "font-mono font-bold px-2 py-0.5 rounded text-xs",
                      audioMode === "concord"
                        ? "bg-[#23A55A]/20 text-[#23A55A]"
                        : "bg-[#ED4245]/20 text-[#ED4245]"
                    )}
                  >
                    {audioMode === "concord"
                      ? "48.000 Hz (Estéreo 2 Canais • Opus Hi-Fi)"
                      : "16.000 Hz (Mono Comprimido com Noise Gate)"}
                  </span>
                </div>

                {/* Equalizer Bars */}
                <div className="flex items-end justify-center gap-2 h-20 my-auto">
                  {[40, 75, 90, 60, 85, 95, 70, 80, 65, 90, 50, 85].map((height, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-2.5 rounded-full transition-all duration-300",
                        audioMode === "concord"
                          ? "bg-gradient-to-t from-[#5865F2] to-[#23A55A] animate-soundbar-2"
                          : "bg-zinc-600 opacity-40 h-3"
                      )}
                      style={{
                        height: audioMode === "concord" ? `${height}%` : "15%",
                        animationDelay: `${idx * 0.08}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="text-[11px] text-zinc-400 text-center">
                  {audioMode === "concord"
                    ? "Graves profundos, efeitos sonoros surround e diálogo nítido simultaneamente."
                    : "No Discord comum, o cancelamento de ruído confunde a música do filme com barulho e corta o som."}
                </div>
              </div>
            </div>

            <div className="text-xs text-zinc-300 bg-white/[0.03] p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="font-semibold text-white flex items-center gap-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#23A55A]" />
                Canais de áudio completamente separados
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                A voz dos participantes recebe cancelamento de eco, enquanto a transmissão de tela recebe áudio estéreo puro 48kHz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
