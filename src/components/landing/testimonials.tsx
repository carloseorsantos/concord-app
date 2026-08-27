"use client";

import { Star, Sparkles, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Testimonials = () => {
  const reviews = [
    {
      name: "Rodrigo 'Kael' Alencar",
      role: "Organizador do Cineclube Sci-Fi (45 membros)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60",
      content:
        "Tentávamos fazer noites de filme no Discord e era um caos: tela preta no Netflix ou som horrível onde ninguém ouvia a trilha de Interestelar. No Concord, o Palco de Cinema em 4K 60FPS com áudio estéreo parece que estamos na mesma sala.",
      tag: "🍿 Cineclube",
    },
    {
      name: "Larissa Silveira",
      role: "Líder de Comunidade Gamer",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=60",
      content:
        "O fato de o Concord liberar 1080p e 4K a 60 FPS de graça economizou quase R$ 360 por ano que eu gastava com Nitro só para fazer streaming de jogos para meus amigos. A latência do WebRTC é instantânea!",
      tag: "🎮 Jogos 60 FPS",
    },
    {
      name: "Felipe Takahashi",
      role: "Fã de Animes & Sound Designer",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&auto=format&fit=crop&q=60",
      content:
        "A engenharia de áudio duplo é genial. O microfone dos meus amigos corta o eco normalmente, mas a trilha sonora do anime mantém toda a dinâmica, agudos cristalinos e graves pesados. Nunca mais volto pro Discord.",
      tag: "🎧 Áudio Estéreo",
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#0E0F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-x-2 px-3.5 py-1 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#8E97FF] text-xs font-bold uppercase tracking-wider">
            <Quote className="h-3.5 w-3.5" />
            Comunidade Ativa
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Quem Usa, Não Volta Atrás
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Veja o que membros de cineclubes, streamers e amigos dizem sobre a experiência do Concord.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#16171B] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#FEE75C] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold bg-[#5865F2]/20 text-[#8E97FF] px-2 py-0.5 rounded-full border border-[#5865F2]/30">
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  &quot;{item.content}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-x-3">
                <Avatar className="h-10 w-10 border border-[#5865F2]/40">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback className="bg-[#5865F2] text-xs font-bold text-white">
                    {item.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-zinc-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
