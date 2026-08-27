"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "O Concord é realmente 100% gratuito? Tem pegadinha ou plano pago?",
      answer:
        "Sim, 100% gratuito! Não existe plano Nitro ou paywall escondido. Você tem acesso liberado a 1080p e 4K a 60 FPS, áudio estéreo de alta fidelidade e canais de Palco de Cinema ilimitados desde o primeiro segundo.",
    },
    {
      question: "Como o Concord consegue transmitir Netflix e Prime Video sem tela preta?",
      answer:
        "As plataformas de streaming aplicam proteção DRM atrelada à aceleração por hardware do navegador. O Concord possui um guia guiado de 1 clique que ensina a desativar temporariamente a aceleração no navegador e selecionar a aba direta com compartilhamento de áudio nativo.",
    },
    {
      question: "Como funciona a separação de áudio da tela e do meu microfone?",
      answer:
        "O Concord cria dois pipelines de áudio independentes no WebRTC: o microfone dos participantes passa por cancelamento de ruído e eco, enquanto a transmissão de tela envia áudio estéreo Opus 48kHz puro. Assim, os graves, efeitos sonoros e músicas do filme não são afetados pelo filtro de voz.",
    },
    {
      question: "Preciso baixar e instalar algum programa ou aplicativo no PC?",
      answer:
        "Não! O Concord é uma aplicação web progressiva moderna desenvolvida em Next.js 14 que roda direto no navegador (Chrome, Edge, Brave, Opera, etc.) aproveitando os recursos nativos de captura e aceleração WebRTC.",
    },
    {
      question: "Quantas pessoas podem assistir à mesma transmissão ao vivo?",
      answer:
        "Graças à arquitetura SFU (Selective Forwarding Unit) do LiveKit, o apresentador envia o stream de vídeo apenas uma vez para o servidor, que distribui para múltiplos espectadores sem sobrecarregar a internet do apresentador.",
    },
    {
      question: "Posso criar múltiplos servidores e canais para diferentes grupos de amigos?",
      answer:
        "Com certeza! Você pode criar servidores para seu cineclube, squad de jogos ou amigos de faculdade, organizando canais de texto, voz e palcos de cinema com permissões completas.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-[#0B0C0E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#8E97FF] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            Tire Suas Dúvidas
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Tudo o que você precisa saber sobre áudio, vídeo, tecnologia e funcionamento do Concord.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#16171B] border border-white/5 rounded-2xl overflow-hidden transition-all duration-200 hover:border-white/15 shadow-md"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base focus:outline-none"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={cn(
                      "p-1 rounded-full bg-white/5 text-zinc-400 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 text-[#5865F2] bg-[#5865F2]/20"
                    )}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 animate-in fade-in-50 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
