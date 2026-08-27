"use client";

import {
  MonitorPlay,
  Volume2,
  Tv,
  ShieldCheck,
  Sliders,
  Zap,
  Sparkles,
  Layers,
  Flame,
  Radio,
  Video,
  Clock,
} from "lucide-react";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: MonitorPlay,
      color: "from-[#5865F2] to-[#7983F5]",
      glowColor: "group-hover:border-[#5865F2]/50 group-hover:shadow-[0_0_30px_rgba(88,101,242,0.2)]",
      badge: "60 FPS & 4K",
      title: "Streaming 60 FPS Sem Paywall",
      description:
        "Transmita sua tela em 1080p ou 4K a 60 quadros por segundo reais. Presets inteligentes de 2.5 Mbps a 15 Mbps para máxima nitidez em qualquer velocidade de internet.",
    },
    {
      icon: Radio,
      color: "from-[#23A55A] to-[#2ECC71]",
      glowColor: "group-hover:border-[#23A55A]/50 group-hover:shadow-[0_0_30px_rgba(35,165,90,0.2)]",
      badge: "Opus 48kHz",
      title: "Pipeline de Áudio Duplo Inteligente",
      description:
        "O som do filme e a voz dos participantes passam por pipelines independentes: vozes com supressão de ruído por IA e transmissão de tela com áudio estéreo cristalino intocado.",
    },
    {
      icon: Tv,
      color: "from-[#FEE75C] to-[#F1C40F]",
      glowColor: "group-hover:border-[#FEE75C]/50 group-hover:shadow-[0_0_30px_rgba(254,231,92,0.2)]",
      badge: "Watch Party",
      title: "Palco de Cinema Dedicado",
      description:
        "Canais especiais criados para noites de filme. Modo Cinema com fundo escuro, suporte a tela cheia, Picture-in-Picture (PiP) e fileira dinâmica de espectadores.",
    },
    {
      icon: ShieldCheck,
      color: "from-[#5865F2] to-[#23A55A]",
      glowColor: "group-hover:border-[#5865F2]/50 group-hover:shadow-[0_0_30px_rgba(88,101,242,0.2)]",
      badge: "Anti-DRM",
      title: "Bypass de Tela Preta no Streaming",
      description:
        "Dicas e configurações otimizadas para assistir Netflix, Prime Video, Disney+, HBO Max e Crunchyroll em grupo sem ser bloqueado pela tela preta do DRM.",
    },
    {
      icon: Sliders,
      color: "from-[#EB459E] to-[#9B59B6]",
      glowColor: "group-hover:border-[#EB459E]/50 group-hover:shadow-[0_0_30px_rgba(235,69,158,0.2)]",
      badge: "Mixer Pro",
      title: "Mixer de Volume Granular",
      description:
        "Controle o volume do filme individualmente sem alterar o áudio do microfone dos seus amigos. Se a trilha sonora estiver muito alta, reduza apenas o filme com um slider.",
    },
    {
      icon: Zap,
      color: "from-[#FEE75C] to-[#E67E22]",
      glowColor: "group-hover:border-[#FEE75C]/50 group-hover:shadow-[0_0_30px_rgba(254,231,92,0.2)]",
      badge: "<100ms Ping",
      title: "WebRTC SFU de Baixa Latência",
      description:
        "Construído sobre o LiveKit SFU (Selective Forwarding Unit), o Concord entrega sincronia de milissegundos para todos na sala sem sobrecarregar a banda do host.",
    },
  ];

  return (
    <section id="recursos" className="py-20 md:py-28 relative bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#8E97FF] text-xs font-bold uppercase tracking-wider">
            <Layers className="h-3.5 w-3.5" />
            Engenharia de Ponta
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tudo o que Você Precisa para a Watch Party Perfeita
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Cada detalhe do Concord foi projetado para eliminar as frustrações do Discord e criar
            uma experiência de streaming em grupo imersiva e sem custos escondidos.
          </p>
        </div>

        {/* 6 Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`group relative bg-[#16171B] border border-white/5 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${item.glowColor} flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-zinc-400 group-hover:text-[#8E97FF] transition-colors">
                <span>Tecnologia Nativa Concord</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
