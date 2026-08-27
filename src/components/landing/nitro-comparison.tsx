"use client";

import { Check, X, Sparkles, Zap, Shield, Tv, Headphones, Film, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export const NitroComparison = () => {
  const comparisonItems = [
    {
      feature: "Resolução & Taxa de Quadros Máxima",
      discordFree: "720p @ 30 FPS (Borrado em filmes)",
      discordNitro: "1080p @ 60 FPS (Exige R$ 30/mês)",
      concord: "1080p, 4K & Nativo @ 60 FPS",
      highlight: true,
    },
    {
      feature: "Custo Mensal por Usuário",
      discordFree: "Grátis (Limitado)",
      discordNitro: "R$ 29,99 / mês (R$ 360/ano)",
      concord: "100% Grátis para Sempre",
      highlight: true,
    },
    {
      feature: "Pipeline de Áudio da Tela",
      discordFree: "Mono comprimido com filtro de voz",
      discordNitro: "Mono comprimido com filtro de voz",
      concord: "Áudio Estéreo Opus 48kHz Puro",
      highlight: true,
    },
    {
      feature: "Bypass Anti-Tela Preta (Netflix / Prime / HBO)",
      discordFree: "Tela preta frequente por DRM",
      discordNitro: "Tela preta frequente por DRM",
      concord: "Guia & Otimização Anti-DRM Integrados",
      highlight: false,
    },
    {
      feature: "Palco de Cinema Dedicado (Watch Party Stage)",
      discordFree: "Não (Apenas layout grade comum)",
      discordNitro: "Não (Apenas layout grade comum)",
      concord: "Sim (Modo Cinema, PiP & Spotlight)",
      highlight: false,
    },
    {
      feature: "Mixer de Volume Independente (Filme vs Voz)",
      discordFree: "Não (Volume único do usuário)",
      discordNitro: "Não (Volume único do usuário)",
      concord: "Sim (Slider granular Filme vs Microfones)",
      highlight: false,
    },
    {
      feature: "Arquitetura WebRTC SFU de Baixa Latência",
      discordFree: "Limitada para transmissões em grupo",
      discordNitro: "Padrão",
      concord: "LiveKit SFU com Bitrate Dinâmico",
      highlight: false,
    },
  ];

  return (
    <section id="comparativo" className="py-20 md:py-28 relative overflow-hidden bg-[#0B0C0E]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#5865F2]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-[#ED4245]/15 border border-[#ED4245]/30 text-[#ED4245] text-xs font-bold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" />
            Chega de Pagar Nitro
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Por que o <span className="text-[#5865F2]">Concord</span> é superior ao Discord para Watch Parties?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Comparamos detalhadamente os recursos de transmissão e áudio para você entender por que o Concord
            é a melhor escolha para curtir filmes, animes e jogos com seus amigos.
          </p>
        </div>

        {/* Feature Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-12">
          {/* Card 1: Discord Grátis */}
          <div className="bg-[#16171B] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase font-bold text-zinc-500 tracking-wider mb-1">
                Plano Básico
              </div>
              <h3 className="text-2xl font-bold text-zinc-300">Discord Grátis</h3>
              <p className="text-xs text-zinc-400 mt-2">
                Limitado para reuniões casuais e conversas de voz simples.
              </p>

              <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-start gap-x-3 text-xs text-zinc-300">
                  <X className="h-4 w-4 text-[#ED4245] shrink-0 mt-0.5" />
                  <span>Transmissão presa em <strong>720p 30 FPS</strong>.</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-zinc-300">
                  <X className="h-4 w-4 text-[#ED4245] shrink-0 mt-0.5" />
                  <span>Tela preta em transmissões de streaming (DRM).</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-zinc-300">
                  <X className="h-4 w-4 text-[#ED4245] shrink-0 mt-0.5" />
                  <span>O som do filme é cortado pelo cancelamento de voz.</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-zinc-300">
                  <X className="h-4 w-4 text-[#ED4245] shrink-0 mt-0.5" />
                  <span>Sem layout de cinema para visualização em grupo.</span>
                </div>
              </div>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 text-center">
              <span className="text-xs font-bold text-zinc-400">R$ 0 / mês</span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">Qualidade muito baixa para filmes</span>
            </div>
          </div>

          {/* Card 2: Discord Nitro (Caro) */}
          <div className="bg-[#16171B] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase font-bold text-[#FEE75C] tracking-wider mb-1">
                Assinatura Paga
              </div>
              <h3 className="text-2xl font-bold text-white flex items-center justify-between">
                <span>Discord Nitro</span>
                <span className="text-xs bg-[#5865F2]/20 text-[#8E97FF] px-2 py-0.5 rounded-full border border-[#5865F2]/30">
                  R$ 30/mês
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                Desbloqueia 1080p 60fps, mas ainda sofre com áudio mono e DRM.
              </p>

              <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-start gap-x-3 text-xs text-zinc-300">
                  <Check className="h-4 w-4 text-[#23A55A] shrink-0 mt-0.5" />
                  <span>Transmissão em 1080p 60 FPS (somente para assinantes).</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-zinc-300">
                  <X className="h-4 w-4 text-[#ED4245] shrink-0 mt-0.5" />
                  <span>Custa <strong>R$ 359,88 por ano</strong> por pessoa.</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-zinc-300">
                  <X className="h-4 w-4 text-[#ED4245] shrink-0 mt-0.5" />
                  <span>Ainda dá tela preta em apps como Netflix e Disney+.</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-zinc-300">
                  <X className="h-4 w-4 text-[#ED4245] shrink-0 mt-0.5" />
                  <span>Sem canal dedicado de áudio estéreo 48kHz para o filme.</span>
                </div>
              </div>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 text-center">
              <span className="text-xs font-bold text-white">R$ 29,99 / mês</span>
              <span className="block text-[11px] text-[#ED4245] mt-0.5">Mensalidade cara que não resolve o som</span>
            </div>
          </div>

          {/* Card 3: CONCORD (VENCEDOR ABSOLUTO) */}
          <div className="bg-gradient-to-b from-[#1C1E26] to-[#121318] border-2 border-[#5865F2] shadow-[0_0_50px_rgba(88,101,242,0.25)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
            {/* Top Glowing Ribbon */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#23A55A] to-[#5865F2] text-white text-[10px] uppercase font-black px-4 py-1 rounded-bl-xl tracking-wider shadow-md">
              A Melhor Escolha
            </div>

            <div>
              <div className="text-xs uppercase font-bold text-[#23A55A] tracking-wider mb-1 flex items-center gap-x-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#FEE75C]" />
                Solução Definitiva
              </div>
              <h3 className="text-3xl font-black text-white flex items-center gap-x-2">
                <span>CONCORD</span>
                <span className="text-xs bg-[#23A55A]/20 text-[#23A55A] px-2 py-0.5 rounded-full border border-[#23A55A]/40 font-mono">
                  100% GRÁTIS
                </span>
              </h3>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                Desenvolvido especificamente para Watch Parties com fidelidade audiovisual de cinema.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-start gap-x-3 text-xs text-white">
                  <div className="p-0.5 rounded bg-[#23A55A]/20 text-[#23A55A] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span><strong>1080p, 4K e Nativo a 60 FPS</strong> liberados para todo mundo.</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-white">
                  <div className="p-0.5 rounded bg-[#23A55A]/20 text-[#23A55A] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span><strong>Áudio Estéreo Opus 48kHz Puro</strong>: O som do filme fica intocado e com graves potentes.</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-white">
                  <div className="p-0.5 rounded bg-[#23A55A]/20 text-[#23A55A] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span><strong>Palco de Cinema (Watch Party Stage)</strong> com Modo Teatro e mixer de volume individual.</span>
                </div>
                <div className="flex items-start gap-x-3 text-xs text-white">
                  <div className="p-0.5 rounded bg-[#23A55A]/20 text-[#23A55A] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span><strong>Bypass Anti-Tela Preta</strong> para assistir Netflix, Prime Video e Disney+ sem falhas.</span>
                </div>
              </div>
            </div>

            <div className="bg-[#5865F2]/15 p-4 rounded-2xl border border-[#5865F2]/40 text-center shadow-inner">
              <span className="text-sm font-extrabold text-[#23A55A]">R$ 0,00 PARA SEMPRE</span>
              <span className="block text-[11px] text-zinc-300 mt-0.5">Economize R$ 360/ano com muito mais qualidade</span>
            </div>
          </div>
        </div>

        {/* Detailed Table (Collapsible or Full View on Desktop) */}
        <div className="rounded-3xl bg-[#16171B] border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#121316] text-zinc-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/5">
                <tr>
                  <th className="p-4 sm:p-5">Recurso de Transmissão</th>
                  <th className="p-4 sm:p-5 text-zinc-500">Discord Grátis</th>
                  <th className="p-4 sm:p-5 text-zinc-400">Discord Nitro</th>
                  <th className="p-4 sm:p-5 text-[#8E97FF] bg-[#5865F2]/10 font-black">CONCORD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition">
                    <td className="p-4 sm:p-5 font-semibold text-white">
                      {item.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400">
                      {item.discordFree}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-300">
                      {item.discordNitro}
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-[#23A55A] bg-[#5865F2]/5">
                      <span className="flex items-center gap-x-1.5">
                        <Check className="h-4 w-4 text-[#23A55A] shrink-0" />
                        {item.concord}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
