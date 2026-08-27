"use client";

import Link from "next/link";
import { Clapperboard, Github, Sparkles, ArrowUp, Heart } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#090A0C] border-t border-white/5 pt-16 pb-12 text-zinc-400 text-xs relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-x-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#5865F2] to-[#7983F5] text-white flex items-center justify-center shadow-md">
                <Clapperboard className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                CONCORD
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#5865F2]/20 text-[#8E97FF] border border-[#5865F2]/40">
                60 FPS SFU
              </span>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Plataforma de comunicação em tempo real e Watch Party com transmissão de alta fidelidade
              (1080p/4K @ 60 FPS), canais Palco de Cinema e áudio estéreo dedicado.
            </p>

            <div className="inline-flex items-center gap-x-2 bg-[#16171B] px-3 py-1.5 rounded-full border border-white/5 text-[11px] text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse" />
              <span>LiveKit WebRTC SFU • Status Operacional 100%</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#recursos" className="hover:text-white transition">
                  Recursos & Diferenciais
                </a>
              </li>
              <li>
                <a href="#cinema" className="hover:text-white transition">
                  Palco de Cinema
                </a>
              </li>
              <li>
                <a href="#comparativo" className="hover:text-white transition">
                  Concord vs Discord Nitro
                </a>
              </li>
              <li>
                <a href="#playground" className="hover:text-white transition">
                  Laboratório 60 FPS
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Tecnologias
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-white/5 text-zinc-300 px-2 py-1 rounded-md border border-white/5 text-[10px]">
                Next.js 14
              </span>
              <span className="bg-white/5 text-zinc-300 px-2 py-1 rounded-md border border-white/5 text-[10px]">
                LiveKit SFU
              </span>
              <span className="bg-white/5 text-zinc-300 px-2 py-1 rounded-md border border-white/5 text-[10px]">
                Clerk Auth
              </span>
              <span className="bg-white/5 text-zinc-300 px-2 py-1 rounded-md border border-white/5 text-[10px]">
                Prisma & PostgreSQL
              </span>
              <span className="bg-white/5 text-zinc-300 px-2 py-1 rounded-md border border-white/5 text-[10px]">
                TailwindCSS
              </span>
              <span className="bg-white/5 text-zinc-300 px-2 py-1 rounded-md border border-white/5 text-[10px]">
                WebRTC Opus 48kHz
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-[11px] text-center sm:text-left">
            © {new Date().getFullYear()} Concord. Feito para comunidades de streaming, cinema e jogos.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-x-1.5 text-zinc-400 hover:text-white transition bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
