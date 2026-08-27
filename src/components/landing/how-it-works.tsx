"use client";

import { Sparkles, UserPlus, Tv, Play, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Sparkles,
      title: "Crie sua Conta e Servidor",
      description:
        "Cadastre-se em segundos com o Clerk e crie seu primeiro servidor com canais de texto, voz e palcos de cinema já configurados.",
    },
    {
      step: "02",
      icon: UserPlus,
      title: "Convide seus Amigos com 1 Clique",
      description:
        "Copie seu link de convite instantâneo e envie no WhatsApp, Telegram ou Discord. Seus amigos entram direto na chamada.",
    },
    {
      step: "03",
      icon: Tv,
      title: "Dê o Play em 60 FPS com Som de Cinema",
      description:
        "Compartilhe sua aba do Netflix, YouTube ou jogo em 1080p/4K 60 FPS com áudio estéreo dedicado e prepare a pipoca!",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 relative bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-[#23A55A]/15 border border-[#23A55A]/30 text-[#23A55A] text-xs font-bold uppercase tracking-wider">
            <Play className="h-3.5 w-3.5" />
            Rápido & Simples
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Como Funciona em 3 Passos Rápidos
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Sem instalações pesadas e sem burocracia. O Concord roda direto no seu navegador com performance nativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#16171B] border border-white/5 rounded-3xl p-8 relative space-y-5 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-zinc-600 group-hover:text-[#5865F2] transition-colors">
                  {item.step}
                </span>
                <div className="h-12 w-12 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/30 flex items-center justify-center text-[#8E97FF] shadow-inner group-hover:bg-[#5865F2] group-hover:text-white transition-all">
                  <item.icon className="h-6 w-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
