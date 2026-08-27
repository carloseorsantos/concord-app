"use client";

import { useState } from "react";
import {
  MonitorPlay,
  Volume2,
  Mic,
  MicOff,
  Video,
  Sparkles,
  ShieldCheck,
  Maximize2,
  Settings2,
  Tv,
  Gamepad2,
  Radio,
  MessageSquare,
  Flame,
  Film,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const LiveAppMockup = () => {
  const [activeTab, setActiveTab] = useState<"cinema" | "gaming" | "audio" | "chat">("cinema");
  const [movieVolume, setMovieVolume] = useState(85);
  const [voiceVolume, setVoiceVolume] = useState(100);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [cinemaLight, setCinemaLight] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mockup Outer Window Shell */}
      <div className="rounded-2xl lg:rounded-3xl bg-[#1E1F22] border border-white/10 shadow-[0_20px_70px_-15px_rgba(88,101,242,0.3)] overflow-hidden transition-all duration-300">
        {/* Window Title Bar */}
        <div className="bg-[#111214] px-4 py-3 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 select-none">
          {/* Window dots */}
          <div className="flex items-center gap-x-2">
            <span className="h-3 w-3 rounded-full bg-[#ED4245] inline-block opacity-80" />
            <span className="h-3 w-3 rounded-full bg-[#FEE75C] inline-block opacity-80" />
            <span className="h-3 w-3 rounded-full bg-[#23A55A] inline-block opacity-80" />
            <span className="text-xs font-semibold text-zinc-400 ml-2 hidden sm:inline">
              Concord App — Cineclube VIP #palco-cinema-4k
            </span>
          </div>

          {/* Interactive Feature Switcher Tabs */}
          <div className="flex items-center bg-[#1E1F22] p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab("cinema")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-x-1.5",
                activeTab === "cinema"
                  ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/30"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <Tv className="h-3.5 w-3.5" />
              <span>Palco Cinema</span>
            </button>

            <button
              onClick={() => setActiveTab("gaming")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-x-1.5",
                activeTab === "gaming"
                  ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/30"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <Gamepad2 className="h-3.5 w-3.5" />
              <span>Stream 60 FPS</span>
            </button>

            <button
              onClick={() => setActiveTab("audio")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-x-1.5",
                activeTab === "audio"
                  ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/30"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <Radio className="h-3.5 w-3.5" />
              <span>Mixer Duplo</span>
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-x-1.5 hidden md:flex",
                activeTab === "chat"
                  ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/30"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Servidores & Chat</span>
            </button>
          </div>
        </div>

        {/* Main Interactive App Container */}
        <div className="grid grid-cols-12 min-h-[480px] lg:min-h-[540px] bg-[#313338]">
          {/* Discord Servers Column (Hidden on small mobile) */}
          <div className="hidden sm:flex col-span-1 bg-[#1E1F22] flex-col items-center py-3 gap-y-3 border-r border-white/5">
            <div className="h-11 w-11 rounded-2xl bg-[#5865F2] text-white flex items-center justify-center font-bold shadow-lg shadow-[#5865F2]/30 cursor-pointer transition-transform hover:scale-105">
              <Film className="h-5 w-5" />
            </div>
            <div className="w-8 h-[2px] bg-zinc-800 rounded-full my-1" />
            <div className="h-10 w-10 rounded-full bg-[#2B2D31] text-zinc-300 hover:rounded-2xl hover:bg-[#23A55A] hover:text-white transition-all flex items-center justify-center cursor-pointer">
              <Flame className="h-5 w-5" />
            </div>
            <div className="h-10 w-10 rounded-full bg-[#2B2D31] text-zinc-300 hover:rounded-2xl hover:bg-[#5865F2] hover:text-white transition-all flex items-center justify-center cursor-pointer">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <div className="h-10 w-10 rounded-full bg-[#2B2D31] text-[#23A55A] border border-[#23A55A]/40 hover:rounded-2xl transition-all flex items-center justify-center font-bold text-xs cursor-pointer mt-auto">
              +
            </div>
          </div>

          {/* Discord Channels Column (Hidden on mobile) */}
          <div className="hidden md:flex col-span-3 lg:col-span-2 bg-[#2B2D31] flex-col justify-between p-3 border-r border-white/5 select-none">
            <div className="space-y-4">
              {/* Server Name Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-700/50">
                <span className="font-bold text-sm text-white truncate flex items-center gap-x-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#5865F2]" />
                  Cineclube 4K VIP
                </span>
              </div>

              {/* Channels List */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1 px-1">
                    Canais de Texto
                  </div>
                  <div className="space-y-0.5">
                    <div className="px-2 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/5 cursor-pointer flex items-center gap-x-1.5">
                      <span className="text-zinc-500 text-sm">#</span>
                      <span>chat-geral</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/5 cursor-pointer flex items-center gap-x-1.5">
                      <span className="text-zinc-500 text-sm">#</span>
                      <span>recomende-um-filme</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1 px-1 flex items-center justify-between">
                    <span>Palcos de Cinema</span>
                    <span className="text-[9px] bg-[#5865F2]/30 text-[#8E97FF] px-1 rounded font-mono">
                      60FPS
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="px-2 py-1.5 rounded-md bg-[#35373C] text-white font-semibold cursor-pointer flex items-center justify-between border-l-2 border-[#5865F2]">
                      <div className="flex items-center gap-x-1.5 truncate">
                        <Tv className="h-3.5 w-3.5 text-[#5865F2] shrink-0" />
                        <span className="truncate">🍿 Palco IMAX 4K</span>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse shrink-0" />
                    </div>
                    <div className="px-2 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/5 cursor-pointer flex items-center gap-x-1.5">
                      <Tv className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">🎬 Sala Anime Night</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile Bar */}
            <div className="bg-[#232428] -mx-3 -mb-3 p-2.5 flex items-center justify-between border-t border-zinc-700/40">
              <div className="flex items-center gap-x-2">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" />
                    <AvatarFallback className="bg-[#5865F2] text-xs font-bold text-white">VC</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#23A55A] border-2 border-[#232428]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-tight">Você</span>
                  <span className="text-[10px] text-[#23A55A] font-medium">Voz HD Ativa</span>
                </div>
              </div>
              <div className="flex items-center gap-x-1 text-zinc-400">
                <button
                  onClick={() => setIsMicMuted(!isMicMuted)}
                  className={cn(
                    "p-1.5 rounded hover:bg-white/5 transition",
                    isMicMuted ? "text-[#ED4245]" : "text-[#23A55A]"
                  )}
                  title={isMicMuted ? "Desmutar" : "Mutar"}
                >
                  {isMicMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                </button>
                <button className="p-1.5 rounded hover:bg-white/5 hover:text-white transition">
                  <Settings2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Dynamic Viewport (Right Section) */}
          <div className="col-span-12 sm:col-span-11 md:col-span-8 lg:col-span-9 flex flex-col bg-[#1E1F22] relative overflow-hidden">
            {/* Top Watch Party Header */}
            <div className="h-12 bg-[#18191C]/90 backdrop-blur border-b border-white/5 px-4 flex items-center justify-between z-10 select-none">
              <div className="flex items-center gap-x-2">
                <span className="bg-[#5865F2] text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded tracking-wide flex items-center gap-x-1 shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Watch Party Stage
                </span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                  {activeTab === "cinema"
                    ? "Interestelar (2014) • 4K IMAX Edition"
                    : activeTab === "gaming"
                    ? "Cyberpunk 2077: Phantom Liberty • Ultra Ray Tracing"
                    : activeTab === "audio"
                    ? "Pipeline de Áudio Duplo Opus 48kHz"
                    : "Chat & Reações em Tempo Real"}
                </span>
              </div>

              {/* Status Chips */}
              <div className="flex items-center gap-x-2">
                <div className="hidden sm:flex items-center gap-x-1.5 bg-[#23A55A]/15 text-[#23A55A] border border-[#23A55A]/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#23A55A] animate-pulse" />
                  60 FPS Estável
                </div>
                <div className="hidden lg:flex items-center gap-x-1 bg-[#5865F2]/15 text-[#8E97FF] border border-[#5865F2]/30 px-2 py-0.5 rounded-full text-[11px] font-mono">
                  <ShieldCheck className="h-3 w-3" />
                  Anti-DRM
                </div>
              </div>
            </div>

            {/* TAB 1: PALCO DE CINEMA */}
            {activeTab === "cinema" && (
              <div className={cn("flex-1 flex flex-col p-3 gap-3 transition-colors duration-300", cinemaLight ? "bg-black" : "bg-[#1E1F22]")}>
                {/* Main Video Player Simulation */}
                <div className="flex-1 relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-white/10 shadow-2xl flex flex-col justify-between p-4 group min-h-[260px]">
                  {/* Background Cinema Visual Simulation */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />

                  {/* Top Badges over Video */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-x-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs">
                      <span className="h-2 w-2 rounded-full bg-[#ED4245] animate-pulse" />
                      <span className="font-bold text-white">AO VIVO</span>
                      <span className="text-zinc-400">|</span>
                      <span className="font-mono text-[#FEE75C] font-semibold">4K @ 60.00 FPS</span>
                      <span className="text-zinc-400">|</span>
                      <span className="text-[#5865F2] font-semibold">Opus 48kHz Estéreo</span>
                    </div>

                    <div className="flex items-center gap-x-2">
                      <button
                        onClick={() => setCinemaLight(!cinemaLight)}
                        className="bg-black/60 backdrop-blur-md hover:bg-white/10 px-2.5 py-1 rounded-lg text-xs text-zinc-300 hover:text-white border border-white/10 transition flex items-center gap-x-1"
                      >
                        <Tv className="h-3 w-3 text-[#5865F2]" />
                        <span>{cinemaLight ? "Modo Normal" : "Modo Cinema"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Center Audio Waves Simulation */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <div className="flex items-end gap-1.5 h-10 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                      <div className="w-1 bg-[#5865F2] rounded-full animate-soundbar-1" />
                      <div className="w-1 bg-[#7983F5] rounded-full animate-soundbar-2" />
                      <div className="w-1 bg-[#23A55A] rounded-full animate-soundbar-3" />
                      <div className="w-1 bg-[#5865F2] rounded-full animate-soundbar-4" />
                      <div className="w-1 bg-[#23A55A] rounded-full animate-soundbar-2" />
                      <div className="w-1 bg-[#7983F5] rounded-full animate-soundbar-1" />
                      <div className="w-1 bg-[#5865F2] rounded-full animate-soundbar-3" />
                    </div>
                    <span className="text-[11px] text-zinc-300 font-medium mt-1.5 drop-shadow">
                      Trilha Sonora Estéreo Imersiva Sem Cortes
                    </span>
                  </div>

                  {/* Bottom Movie Control & Individual Volume Mixer */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-x-3 text-xs text-white">
                      <span className="font-bold flex items-center gap-x-1 text-[#23A55A]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Netflix Bypass Ativo
                      </span>
                      <span className="text-zinc-500">|</span>
                      <span className="text-zinc-300">Bitrate: 8.4 Mbps</span>
                    </div>

                    {/* Movie Volume Slider */}
                    <div className="flex items-center gap-x-2.5 w-56">
                      <Volume2 className="h-4 w-4 text-[#5865F2] shrink-0" />
                      <span className="text-[11px] text-zinc-300 whitespace-nowrap">Volume Filme:</span>
                      <Slider
                        value={[movieVolume]}
                        max={100}
                        step={1}
                        onValueChange={(val) => setMovieVolume(val[0])}
                        className="cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-300 w-7 text-right">
                        {movieVolume}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audience Participants Row (Discord Style with Glowing Voice Indicators) */}
                <div className="h-28 flex items-center gap-3 overflow-x-auto pb-1 select-none">
                  {/* Host Card */}
                  <div className="h-full w-36 sm:w-44 bg-[#2B2D31] rounded-xl border-2 border-[#23A55A] ring-2 ring-[#23A55A]/40 p-2.5 flex flex-col justify-between shrink-0 shadow-lg relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#5865F2] text-white px-1.5 py-0.5 rounded">
                        HOST
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse" />
                    </div>
                    <div className="flex items-center gap-x-2 my-auto">
                      <div className="relative">
                        <Avatar className="h-9 w-9 ring-2 ring-[#23A55A]">
                          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" />
                          <AvatarFallback className="bg-[#5865F2] text-white text-xs">VC</AvatarFallback>
                        </Avatar>
                        <span className="absolute -inset-0.5 rounded-full border border-[#23A55A] animate-ping opacity-75" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">Você (Transmitindo)</div>
                        <div className="text-[10px] text-[#23A55A] font-semibold">Falando...</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-zinc-400 flex items-center justify-between">
                      <span>4K 60FPS</span>
                      <Mic className="h-3 w-3 text-[#23A55A]" />
                    </div>
                  </div>

                  {/* Viewer 1 */}
                  <div className="h-full w-36 sm:w-44 bg-[#2B2D31] rounded-xl border border-white/5 p-2.5 flex flex-col justify-between shrink-0 hover:border-zinc-500 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 font-medium">Espectador</span>
                    </div>
                    <div className="flex items-center gap-x-2 my-auto">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" />
                        <AvatarFallback className="bg-zinc-700 text-white text-xs">GS</AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">Gabriel Santos</div>
                        <div className="text-[10px] text-zinc-400">Ouvindo</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-zinc-400 flex items-center justify-between">
                      <span>Fones Estéreo</span>
                      <MicOff className="h-3 w-3 text-zinc-500" />
                    </div>
                  </div>

                  {/* Viewer 2 */}
                  <div className="h-full w-36 sm:w-44 bg-[#2B2D31] rounded-xl border-2 border-[#23A55A] ring-2 ring-[#23A55A]/40 p-2.5 flex flex-col justify-between shrink-0 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 font-medium">Espectador</span>
                      <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse" />
                    </div>
                    <div className="flex items-center gap-x-2 my-auto">
                      <Avatar className="h-9 w-9 ring-2 ring-[#23A55A]">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" />
                        <AvatarFallback className="bg-emerald-600 text-white text-xs">BM</AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">Beatriz Melo</div>
                        <div className="text-[10px] text-[#23A55A] font-semibold">&quot;Que cena incrível!&quot;</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-zinc-400 flex items-center justify-between">
                      <span>Voz HD</span>
                      <Mic className="h-3 w-3 text-[#23A55A]" />
                    </div>
                  </div>

                  {/* Viewer 3 */}
                  <div className="h-full w-36 sm:w-44 bg-[#2B2D31] rounded-xl border border-white/5 p-2.5 flex flex-col justify-between shrink-0 hover:border-zinc-500 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 font-medium">Espectador</span>
                    </div>
                    <div className="flex items-center gap-x-2 my-auto">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" />
                        <AvatarFallback className="bg-purple-600 text-white text-xs">LF</AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">Lucas F.</div>
                        <div className="text-[10px] text-zinc-400">Ouvindo</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-zinc-400 flex items-center justify-between">
                      <span>Cinema Mode</span>
                      <MicOff className="h-3 w-3 text-zinc-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: GAMEPLAY 60 FPS */}
            {activeTab === "gaming" && (
              <div className="flex-1 flex flex-col p-4 gap-4 bg-[#1E1F22]">
                <div className="flex-1 relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl flex flex-col justify-between p-4 min-h-[300px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-90"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-x-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs">
                      <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse" />
                      <span className="font-bold text-white">GAMEPLAY 60 FPS SFU</span>
                      <span className="text-zinc-400">|</span>
                      <span className="text-[#23A55A] font-mono font-bold">60.0 FPS Capped</span>
                    </div>

                    <div className="bg-[#23A55A]/20 border border-[#23A55A]/40 text-[#23A55A] px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
                      PING: 14ms
                    </div>
                  </div>

                  <div className="relative z-10 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-2 max-w-lg">
                    <h4 className="text-white font-bold text-sm flex items-center gap-x-2">
                      <Sparkles className="h-4 w-4 text-[#FEE75C]" />
                      Fluidez Máxima para Jogos Competitivos e Campanhas
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      No Discord comum você precisa pagar R$ 29,99/mês pelo Nitro para transmitir acima de 30 FPS.
                      No Concord, você transmite em 1080p ou 4K a 60 FPS com bitrate dedicado totalmente grátis.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MIXER DE ÁUDIO DUPLO */}
            {activeTab === "audio" && (
              <div className="flex-1 flex flex-col p-6 gap-6 bg-[#1E1F22] justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Channel 1: Screen/Movie Audio */}
                  <div className="bg-[#2B2D31] p-5 rounded-2xl border border-[#5865F2]/40 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2.5">
                        <div className="p-2 rounded-xl bg-[#5865F2]/20 text-[#5865F2]">
                          <Tv className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Canal de Áudio da Tela (Filme/Jogo)</h4>
                          <span className="text-[11px] text-[#8E97FF] font-mono">Opus 48kHz • 2 Canais Estéreo Puro</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-white bg-[#5865F2] px-2 py-0.5 rounded">
                        {movieVolume}%
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Slider
                        value={[movieVolume]}
                        max={150}
                        step={1}
                        onValueChange={(val) => setMovieVolume(val[0])}
                      />
                      <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                        <span>0% (Mudo)</span>
                        <span>100% (Padrão)</span>
                        <span>150% (Boost de Cinema)</span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-300 bg-black/30 p-3 rounded-xl border border-white/5 flex items-center gap-x-2">
                      <CheckCircle2 className="h-4 w-4 text-[#23A55A] shrink-0" />
                      <span>Filtros de cancelamento de eco desativados para preservar graves e efeitos sonoros.</span>
                    </div>
                  </div>

                  {/* Channel 2: Voice Channel */}
                  <div className="bg-[#2B2D31] p-5 rounded-2xl border border-[#23A55A]/40 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2.5">
                        <div className="p-2 rounded-xl bg-[#23A55A]/20 text-[#23A55A]">
                          <Mic className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Canal de Voz dos Participantes</h4>
                          <span className="text-[11px] text-[#23A55A] font-mono">Supressão de Ruído & Echo Gate Ativo</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-white bg-[#23A55A] px-2 py-0.5 rounded">
                        {voiceVolume}%
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Slider
                        value={[voiceVolume]}
                        max={150}
                        step={1}
                        onValueChange={(val) => setVoiceVolume(val[0])}
                      />
                      <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                        <span>0% (Mudo)</span>
                        <span>100% (Normal)</span>
                        <span>150% (Amplificado)</span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-300 bg-black/30 p-3 rounded-xl border border-white/5 flex items-center gap-x-2">
                      <CheckCircle2 className="h-4 w-4 text-[#23A55A] shrink-0" />
                      <span>O ruído do teclado e respiração é cancelado sem abafar a voz dos seus amigos.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CHAT & SERVIDORES */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col p-4 bg-[#313338] justify-between">
                <div className="space-y-3">
                  <div className="flex items-start gap-x-3">
                    <Avatar className="h-9 w-9 mt-0.5">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" />
                      <AvatarFallback className="bg-[#5865F2] text-xs font-bold text-white">CS</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-x-2">
                        <span className="font-bold text-xs text-white">Carlos Santos</span>
                        <span className="text-[10px] text-zinc-400">Hoje às 20:14</span>
                      </div>
                      <p className="text-xs text-zinc-200">
                        Galera, abri o Palco de Cinema no servidor! Vamos assistir Interestelar em 4K 60FPS hoje.
                      </p>
                      <div className="inline-flex items-center gap-x-1.5 bg-[#2B2D31] hover:bg-[#35373C] px-2 py-0.5 rounded-lg border border-white/10 text-[11px] text-zinc-300 cursor-pointer">
                        <span>🍿</span>
                        <span className="font-bold text-[#5865F2]">6</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-x-3">
                    <Avatar className="h-9 w-9 mt-0.5">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" />
                      <AvatarFallback className="bg-emerald-600 text-xs font-bold text-white">BM</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-x-2">
                        <span className="font-bold text-xs text-[#23A55A]">Beatriz Melo</span>
                        <span className="text-[10px] text-zinc-400">Hoje às 20:15</span>
                      </div>
                      <p className="text-xs text-zinc-200">
                        O som estéreo desse player tá absurdo! Parece que estamos no cinema de verdade.
                      </p>
                      <div className="inline-flex items-center gap-x-1.5 bg-[#2B2D31] hover:bg-[#35373C] px-2 py-0.5 rounded-lg border border-white/10 text-[11px] text-zinc-300 cursor-pointer">
                        <span>🚀</span>
                        <span className="font-bold text-[#23A55A]">4</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#383A40] rounded-xl px-4 py-2.5 flex items-center justify-between border border-white/5">
                  <span className="text-xs text-zinc-400">Conversar em #chat-geral...</span>
                  <div className="flex items-center gap-x-2 text-zinc-400">
                    <Sparkles className="h-4 w-4 text-[#5865F2]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
