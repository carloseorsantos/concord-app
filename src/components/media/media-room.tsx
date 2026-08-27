"use client";

import { useEffect, useState, useRef } from "react";
import {
  MonitorPlay,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings2,
  Sparkles,
  Volume2,
  Maximize2,
  Minimize2,
  PhoneOff,
  Headphones,
  CheckCircle2,
  AlertTriangle,
  Clapperboard,
  LogIn,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useStreamQuality } from "@/hooks/use-stream-quality";
import { useModal } from "@/hooks/use-modal-store";
import { useVolumeMixer } from "@/hooks/use-volume-mixer";
import { useMediaEngine } from "@/hooks/use-media-engine";
import { useVoiceEnergyDetector } from "@/hooks/use-voice-energy";
import { STREAM_PRESETS } from "@/lib/livekit-config";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ActionTooltip } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MediaVideo } from "./media-video";
import { cn } from "@/lib/utils";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  isCinemaStage?: boolean;
}

export const MediaRoom = ({
  chatId,
  isCinemaStage = false,
}: MediaRoomProps) => {
  const { user } = useUser();
  const { onOpen } = useModal();
  const { preset, cinemaMode, toggleCinemaMode } = useStreamQuality();
  const { streamVolumes, setStreamVolume } = useVolumeMixer();

  const {
    isJoined,
    isMuted,
    isCameraOn,
    isScreenSharing,
    isSpeaking,
    cameraStream,
    screenStream,
    joinRoom,
    leaveRoom,
    toggleMic,
    toggleCam,
    toggleScreenShare,
  } = useMediaEngine();

  // Ativa detecção de energia da voz em tempo real
  useVoiceEnergyDetector();

  const [micPermission, setMicPermission] = useState<"granted" | "prompt" | "denied">("prompt");
  const [isRequestingMic, setIsRequestingMic] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cinemaContainerRef = useRef<HTMLDivElement>(null);

  // Verificação de permissões do navegador
  useEffect(() => {
    async function checkPermission() {
      if (typeof navigator !== "undefined" && navigator.permissions && navigator.permissions.query) {
        try {
          const res = await navigator.permissions.query({ name: "microphone" as PermissionName });
          setMicPermission(res.state as "granted" | "prompt" | "denied");
          res.onchange = () => {
            setMicPermission(res.state as "granted" | "prompt" | "denied");
          };
        } catch (e) {}
      }
    }
    checkPermission();
  }, []);

  const requestMicAccess = async () => {
    try {
      setIsRequestingMic(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicPermission("granted");
    } catch (err) {
      console.error("[CONCORD_MIC] Permissão de microfone negada:", err);
      setMicPermission("denied");
    } finally {
      setIsRequestingMic(false);
    }
  };

  const handleConnect = async () => {
    if (micPermission !== "granted") {
      await requestMicAccess();
    }
    await joinRoom(isCinemaStage ? "cinema-watch-party" : "voz-conversa");
  };

  const toggleFullscreen = () => {
    if (!cinemaContainerRef.current) return;

    if (!document.fullscreenElement) {
      cinemaContainerRef.current.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Se o usuário ainda não entrou na chamada, exibe o Lobby de Conexão
  if (!isJoined) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center h-full bg-[#313338] p-6 select-none overflow-y-auto">
        <div className="max-w-md w-full bg-[#2B2D31] rounded-2xl border border-[#3F4147] p-8 shadow-2xl text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-[#5865F2]/15 flex items-center justify-center text-[#5865F2] mx-auto border border-[#5865F2]/30 shadow-inner">
            {isCinemaStage ? (
              <Clapperboard className="h-10 w-10" />
            ) : (
              <Headphones className="h-10 w-10" />
            )}
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-white">
              {isCinemaStage ? "Palco de Cinema & Watch Party" : "Canal de Voz"}
            </h2>
            <p className="text-xs text-zinc-400">
              Conecte-se para conversar com áudio HD e transmitir tela em 60 FPS com áudio estéreo intocado.
            </p>
          </div>

          {/* Status do Microfone e Regra de Mute Padrão */}
          <div className="bg-[#1E1F22] p-4 rounded-xl border border-zinc-800 space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300">Status do Microfone:</span>
              {micPermission === "granted" ? (
                <span className="text-[11px] font-bold text-[#23A55A] flex items-center gap-x-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Autorizado
                </span>
              ) : micPermission === "denied" ? (
                <span className="text-[11px] font-bold text-[#DA373C] flex items-center gap-x-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Bloqueado no Navegador
                </span>
              ) : (
                <span className="text-[11px] font-bold text-[#FEE75C] flex items-center gap-x-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Aguardando Permissão
                </span>
              )}
            </div>

            <div className="flex items-center gap-x-2 text-[11px] text-zinc-300 bg-[#DA373C]/10 border border-[#DA373C]/30 p-2.5 rounded-lg">
              <MicOff className="h-4 w-4 text-[#DA373C] shrink-0" />
              <span>
                <strong>Segurança:</strong> Você entrará <strong>mutado por padrão</strong> e poderá desmutar quando desejar.
              </span>
            </div>

            {micPermission !== "granted" && (
              <Button
                variant="outline"
                size="sm"
                onClick={requestMicAccess}
                disabled={isRequestingMic}
                className="w-full text-xs border-[#5865F2]/40 text-[#5865F2] hover:bg-[#5865F2]/10 h-8"
              >
                {isRequestingMic ? "Verificando..." : "Testar / Autorizar Microfone Agora"}
              </Button>
            )}
          </div>

          {/* Botão de Entrar */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={handleConnect}
              className="w-full h-11 bg-[#23A55A] hover:bg-[#1C8B4C] text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-x-2 transition-transform active:scale-[0.98]"
            >
              <LogIn className="h-5 w-5" />
              Entrar no Canal de Voz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Visual da Sala Conectada (Active Call View)
  return (
    <div
      ref={cinemaContainerRef}
      className={cn(
        "flex flex-col flex-1 h-full w-full relative transition-all duration-300 min-h-0 select-none",
        cinemaMode ? "bg-black" : "bg-[#1E1F22]"
      )}
    >
      {/* Top Bar / Cinema Bar */}
      <div className="h-12 bg-[#1E1F22]/95 backdrop-blur border-b border-[#2B2D31] px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-x-2">
          {isCinemaStage && (
            <span className="bg-[#5865F2] text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded tracking-wide flex items-center gap-x-1">
              <Sparkles className="h-3 w-3" />
              Watch Party Stage
            </span>
          )}
          <span className="text-sm font-semibold text-zinc-200">
            {isScreenSharing ? "Transmissão Ativa (60 FPS)" : "Sala Conectada"}
          </span>
          <span className="text-xs text-[#23A55A] font-medium flex items-center gap-x-1 ml-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#23A55A] animate-pulse" />
            Voz HD Ativa
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpen("screenShareDRM")}
            className="text-xs h-7 border-[#5865F2]/40 text-[#5865F2] hover:bg-[#5865F2]/10"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Dicas Anti-Tela Preta (DRM)
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => onOpen("streamQuality")}
            className="text-xs h-7 bg-[#2B2D31] hover:bg-[#35373C] text-zinc-200"
          >
            <Settings2 className="h-3 w-3 mr-1" />
            {STREAM_PRESETS[preset].label.split(" ")[0]}
          </Button>

          <ActionTooltip label={cinemaMode ? "Sair do Modo Cinema" : "Modo Cinema"}>
            <Button
              size="sm"
              variant={cinemaMode ? "default" : "ghost"}
              onClick={toggleCinemaMode}
              className="h-7 w-7 p-0"
            >
              <MonitorPlay className="h-4 w-4" />
            </Button>
          </ActionTooltip>

          <ActionTooltip label={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}>
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleFullscreen}
              className="h-7 w-7 p-0"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </ActionTooltip>

          {/* Botão Desconectar Vermelho no Topo */}
          <ActionTooltip label="Desconectar da Chamada">
            <Button
              size="sm"
              variant="destructive"
              onClick={leaveRoom}
              className="h-7 px-2.5 bg-[#DA373C] hover:bg-[#A12828] text-white text-xs font-semibold flex items-center gap-x-1 ml-1"
            >
              <PhoneOff className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Desconectar</span>
            </Button>
          </ActionTooltip>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden relative min-h-0 h-full">
        {/* Se o Compartilhamento de Tela estiver Ativo -> Layout Discord Watch Party */}
        {isScreenSharing && screenStream ? (
          <>
            {/* Spotlight Screen Share: Ocupa ~85% da tela */}
            <div className="flex-1 flex flex-col items-center justify-center bg-black/95 rounded-2xl overflow-hidden relative group border border-[#2B2D31] shadow-2xl min-h-0 w-full">
              <div className="w-full h-full flex items-center justify-center relative">
                <MediaVideo stream={screenStream} className="w-full h-full object-contain" />
              </div>

              {/* Stream Overlay Controls */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-x-2 text-xs text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse" />
                <span className="font-semibold">Transmissão 1080p 60FPS</span>
                <span className="text-zinc-400">|</span>
                <span className="text-[#5865F2] font-semibold">Áudio Estéreo</span>
              </div>

              {/* Granular Audio Slider */}
              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-x-3 text-xs text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity w-60 z-20">
                <Volume2 className="h-4 w-4 text-[#5865F2] shrink-0" />
                <span className="text-[11px] text-zinc-300 whitespace-nowrap">Volume Filme</span>
                <Slider
                  defaultValue={[streamVolumes["local"] ?? 100]}
                  max={200}
                  step={5}
                  onValueChange={(val) => setStreamVolume("local", val[0])}
                />
                <span className="text-[10px] font-mono text-zinc-400 w-8 text-right">
                  {streamVolumes["local"] ?? 100}%
                </span>
              </div>
            </div>

            {/* Fileira de Participantes Embaixo (Discord Style) */}
            <div className="h-36 flex flex-row items-center gap-3 overflow-x-auto w-full px-1 py-1 shrink-0 scrollbar-thin">
              {/* Card do Usuário Local */}
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center bg-[#2B2D31] rounded-2xl overflow-hidden border transition-all duration-200 w-48 h-32 md:w-56 md:h-36 shrink-0 group select-none",
                  isSpeaking && !isMuted
                    ? "border-[#23A55A] ring-4 ring-[#23A55A]/50 shadow-[0_0_25px_rgba(35,165,90,0.4)] scale-[1.01]"
                    : "border-[#3F4147] hover:border-zinc-500"
                )}
              >
                {isCameraOn && cameraStream ? (
                  <MediaVideo stream={cameraStream} isMirrored={true} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3">
                    <div className="relative">
                      <Avatar
                        className={cn(
                          "h-14 w-14 transition-all duration-200",
                          isSpeaking && !isMuted
                            ? "ring-4 ring-[#23A55A] ring-offset-2 ring-offset-[#2B2D31]"
                            : "border-2 border-transparent"
                        )}
                      >
                        <AvatarImage src={user?.imageUrl} className="object-cover" />
                        <AvatarFallback className="bg-[#5865F2] font-bold text-white uppercase text-lg">
                          {user?.firstName?.[0] || user?.username?.[0] || "VC"}
                        </AvatarFallback>
                      </Avatar>
                      {isSpeaking && !isMuted && (
                        <span className="absolute -inset-1 rounded-full border-2 border-[#23A55A] animate-ping opacity-60 pointer-events-none" />
                      )}
                    </div>
                  </div>
                )}

                {/* Name Tag */}
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-x-1.5 text-[11px] font-semibold text-white border border-white/10 max-w-[80%] z-10">
                  {isSpeaking && !isMuted && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#23A55A] animate-pulse shrink-0" />
                  )}
                  <span className="truncate">Você</span>
                </div>

                {/* Mic Status */}
                <div className="absolute bottom-2 right-2 z-10">
                  {isMuted ? (
                    <div className="bg-[#DA373C] p-1.5 rounded-full text-white shadow-md">
                      <MicOff className="h-3 w-3" />
                    </div>
                  ) : isSpeaking ? (
                    <div className="bg-[#23A55A] p-1.5 rounded-full text-white shadow-md animate-bounce">
                      <Volume2 className="h-3 w-3" />
                    </div>
                  ) : (
                    <div className="bg-black/50 p-1.5 rounded-full text-[#23A55A]">
                      <Mic className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Grade Dinâmica Central quando NENHUMA tela estiver sendo compartilhada */
          <div className="flex-1 flex flex-col items-center justify-center w-full h-full min-h-0 overflow-y-auto">
            <div className="flex items-center justify-center w-full h-full p-4">
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center bg-[#2B2D31] rounded-2xl overflow-hidden border transition-all duration-200 select-none group w-full max-w-2xl aspect-[16/10] max-h-[65vh]",
                  isSpeaking && !isMuted
                    ? "border-[#23A55A] ring-4 ring-[#23A55A]/50 shadow-[0_0_30px_rgba(35,165,90,0.4)] scale-[1.01]"
                    : "border-[#3F4147] hover:border-zinc-500"
                )}
              >
                {/* Visualização de Câmera da Webcam */}
                {isCameraOn && cameraStream ? (
                  <MediaVideo stream={cameraStream} isMirrored={true} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6">
                    <div className="relative">
                      <Avatar
                        className={cn(
                          "h-32 w-32 md:h-40 md:w-40 transition-all duration-200 text-4xl shadow-2xl",
                          isSpeaking && !isMuted
                            ? "ring-4 ring-[#23A55A] ring-offset-4 ring-offset-[#2B2D31] shadow-lg"
                            : "border-2 border-transparent"
                        )}
                      >
                        <AvatarImage src={user?.imageUrl} className="object-cover" />
                        <AvatarFallback className="bg-[#5865F2] font-bold text-white uppercase">
                          {user?.firstName?.[0] || user?.username?.[0] || "VC"}
                        </AvatarFallback>
                      </Avatar>
                      {isSpeaking && !isMuted && (
                        <span className="absolute -inset-1 rounded-full border-2 border-[#23A55A] animate-ping opacity-60 pointer-events-none" />
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Name Tag */}
                <div className="absolute bottom-3.5 left-3.5 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-x-2 text-xs font-semibold text-white border border-white/10 max-w-[85%] z-10">
                  {isSpeaking && !isMuted && (
                    <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse shrink-0" />
                  )}
                  <span className="truncate font-bold">Você</span>
                  <span className="text-[10px] text-zinc-400 font-normal shrink-0">
                    (Conectado)
                  </span>
                </div>

                {/* Mic Status Badge */}
                <div className="absolute bottom-3.5 right-3.5 z-10">
                  {isMuted ? (
                    <div className="bg-[#DA373C] p-2 rounded-full text-white shadow-md">
                      <MicOff className="h-4 w-4" />
                    </div>
                  ) : isSpeaking ? (
                    <div className="bg-[#23A55A] p-2 rounded-full text-white shadow-md animate-bounce">
                      <Volume2 className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="bg-black/50 p-2 rounded-full text-[#23A55A]">
                      <Mic className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Control Bar (Discord Style) */}
      <div className="h-16 bg-[#111214] border-t border-[#1E1F22] px-6 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-x-3">
          <div className="text-xs">
            <span className="text-white font-semibold block">
              Você
            </span>
            <span className="text-[#23A55A] text-[10px] font-medium flex items-center gap-x-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#23A55A]" />
              {isScreenSharing ? "Transmitindo 60 FPS" : isCameraOn ? "Câmera Ativa" : "Voz Conectada"}
            </span>
          </div>
        </div>

        {/* Center Action Buttons */}
        <div className="flex items-center gap-x-3">
          {/* Microfone */}
          <ActionTooltip label={isMuted ? "Desmutar Microfone" : "Mutar Microfone"}>
            <Button
              size="icon"
              variant={isMuted ? "destructive" : "secondary"}
              onClick={toggleMic}
              className={cn(
                "h-10 w-10 rounded-full transition shadow-md",
                isMuted
                  ? "bg-[#DA373C] hover:bg-[#A12828] text-white"
                  : "bg-[#2B2D31] hover:bg-[#35373C] text-[#23A55A]"
              )}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </ActionTooltip>

          {/* Câmera */}
          <ActionTooltip label={isCameraOn ? "Desligar Câmera" : "Ligar Câmera"}>
            <Button
              size="icon"
              variant={isCameraOn ? "default" : "secondary"}
              onClick={toggleCam}
              className={cn(
                "h-10 w-10 rounded-full transition shadow-md",
                isCameraOn
                  ? "bg-[#23A55A] hover:bg-[#1C8B4C] text-white shadow-[0_0_20px_rgba(35,165,90,0.5)]"
                  : "bg-[#2B2D31] hover:bg-[#35373C] text-zinc-300"
              )}
            >
              {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
          </ActionTooltip>

          {/* Transmitir Tela (60 FPS) */}
          <ActionTooltip label={isScreenSharing ? "Parar Transmissão" : "Compartilhar Tela (60 FPS)"}>
            <Button
              size="default"
              variant={isScreenSharing ? "destructive" : "default"}
              onClick={() => toggleScreenShare(preset)}
              className={cn(
                "h-10 px-4 rounded-full flex items-center gap-x-2 font-semibold text-xs transition shadow-md",
                isScreenSharing
                  ? "bg-[#DA373C] hover:bg-[#A12828] text-white shadow-lg animate-pulse"
                  : "bg-[#5865F2] hover:bg-[#4752C4] text-white"
              )}
            >
              <MonitorPlay className="h-4 w-4" />
              {isScreenSharing ? "Parar Stream" : "Transmitir Tela"}
            </Button>
          </ActionTooltip>

          {/* Botão Desconectar Vermelho */}
          <ActionTooltip label="Desconectar">
            <Button
              size="icon"
              variant="destructive"
              onClick={leaveRoom}
              className="h-10 w-10 rounded-full bg-[#DA373C] hover:bg-[#A12828] text-white transition shadow-lg"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </ActionTooltip>
        </div>

        {/* Right Quality Indicator */}
        <div className="flex items-center gap-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onOpen("streamQuality")}
            className="text-xs text-zinc-400 hover:text-white"
          >
            {STREAM_PRESETS[preset].frameRate} FPS | {STREAM_PRESETS[preset].width || "Auto"}p
          </Button>
        </div>
      </div>
    </div>
  );
};
