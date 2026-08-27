"use client";

import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useTracks,
  useParticipants,
  useLocalParticipant,
  useRoomContext,
  VideoTrack,
  isTrackReference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
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
  Loader2,
} from "lucide-react";
import { useStreamQuality } from "@/hooks/use-stream-quality";
import { useModal } from "@/hooks/use-modal-store";
import { useVolumeMixer } from "@/hooks/use-volume-mixer";
import { useVoiceState } from "@/hooks/use-voice-state";
import { STREAM_PRESETS, getOptimizedScreenShareConstraints } from "@/lib/livekit-config";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ActionTooltip } from "@/components/ui/tooltip";
import { ParticipantCard } from "./participant-card";
import { cn } from "@/lib/utils";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  isCinemaStage?: boolean;
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
  isCinemaStage = false,
}: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");
  const [wsUrl, setWsUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [micPermission, setMicPermission] = useState<"granted" | "prompt" | "denied">("prompt");
  const [isRequestingMic, setIsRequestingMic] = useState(false);

  // Verificação de permissão de microfone do navegador
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

  const fetchTokenAndJoin = async () => {
    if (!user) return;
    try {
      setIsConnecting(true);
      if (micPermission !== "granted") {
        await requestMicAccess();
      }

      const name =
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        user.username ||
        "Usuário";

      const resp = await fetch(
        `/api/livekit?room=${encodeURIComponent(chatId)}&username=${encodeURIComponent(name)}`
      );
      const data = await resp.json();

      if (data.token) {
        setToken(data.token);
        setWsUrl(data.wsUrl || process.env.NEXT_PUBLIC_LIVEKIT_URL || "ws://127.0.0.1:7880");
        setHasJoined(true);
      }
    } catch (error) {
      console.error("[LIVEKIT_JOIN_ERROR]", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Lobby de entrada antes de conectar
  if (!hasJoined || !token) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center h-full w-full bg-[#313338] p-6 select-none overflow-y-auto">
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
              Conecte-se para conversar com áudio HD em tempo real e transmitir tela em 60 FPS com áudio estéreo intocado.
            </p>
          </div>

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

          <div className="space-y-2 pt-2">
            <Button
              onClick={fetchTokenAndJoin}
              disabled={isConnecting}
              className="w-full h-11 bg-[#23A55A] hover:bg-[#1C8B4C] text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-x-2 transition-transform active:scale-[0.98]"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Conectando ao LiveKit...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Entrar no Canal de Voz
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={true}
      video={video}
      audio={false} // Inicialmente entra mutado por padrão conforme regras do Concord
      onDisconnected={() => {
        setHasJoined(false);
        setToken("");
      }}
      data-lk-theme="default"
      className="flex flex-col flex-1 h-full w-full relative overflow-hidden"
    >
      <RoomAudioRenderer />
      <MediaRoomView isCinemaStage={isCinemaStage} onLeave={() => setHasJoined(false)} />
    </LiveKitRoom>
  );
};

interface MediaRoomViewProps {
  isCinemaStage: boolean;
  onLeave: () => void;
}

const MediaRoomView = ({ isCinemaStage, onLeave }: MediaRoomViewProps) => {
  const { onOpen } = useModal();
  const { preset, cinemaMode, toggleCinemaMode } = useStreamQuality();
  const { streamVolumes, setStreamVolume } = useVolumeMixer();
  const { setLocalParticipant, setCurrentChannelName, isMuted, setIsMuted, isDeafened, setDisconnectCallFn } = useVoiceState();

  const room = useRoomContext();
  const participants = useParticipants();
  const { localParticipant, isMicrophoneEnabled, isCameraEnabled, isScreenShareEnabled } = useLocalParticipant();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const cinemaContainerRef = useRef<HTMLDivElement>(null);

  // Sincroniza participante local no Zustand para o UserPanel funcionar
  useEffect(() => {
    if (localParticipant) {
      setLocalParticipant(localParticipant);
      setCurrentChannelName(room?.name || "voz");
      setIsMuted(!localParticipant.isMicrophoneEnabled);
      setDisconnectCallFn(() => {
        room?.disconnect();
        onLeave();
      });
    }
    return () => {
      setLocalParticipant(null);
      setCurrentChannelName(null);
    };
  }, [localParticipant, room, setLocalParticipant, setCurrentChannelName, setIsMuted, setDisconnectCallFn, onLeave]);

  // Lista de faixas de câmera e compartilhamento de tela de todos os participantes
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

  // Detecta se alguém está transmitindo a tela no canal
  const screenShareTrack = tracks.find((t) => t.source === Track.Source.ScreenShare);

  const toggleMic = async () => {
    if (!localParticipant) return;
    try {
      const next = !localParticipant.isMicrophoneEnabled;
      await localParticipant.setMicrophoneEnabled(next);
      setIsMuted(!next);
    } catch (e) {
      console.error("Erro ao alterar microfone:", e);
    }
  };

  const toggleCam = async () => {
    if (!localParticipant) return;
    try {
      await localParticipant.setCameraEnabled(!localParticipant.isCameraEnabled);
    } catch (e) {
      console.error("Erro ao alterar câmera:", e);
    }
  };

  const toggleScreen = async () => {
    if (!localParticipant) return;
    try {
      if (isScreenShareEnabled) {
        await localParticipant.setScreenShareEnabled(false);
      } else {
        const constraints = getOptimizedScreenShareConstraints(preset);
        const presetConfig = STREAM_PRESETS[preset];
        await localParticipant.setScreenShareEnabled(true, {
          audio: constraints.audio,
          resolution: {
            width: presetConfig.width || 1920,
            height: presetConfig.height || 1080,
            frameRate: presetConfig.frameRate || 60,
          },
        });
      }
    } catch (e) {
      console.error("Erro ao transmitir tela:", e);
    }
  };

  const handleDisconnect = () => {
    room?.disconnect();
    onLeave();
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

  return (
    <div
      ref={cinemaContainerRef}
      className={cn(
        "flex flex-col flex-1 h-full w-full relative transition-all duration-300 min-h-0 select-none overflow-hidden",
        cinemaMode ? "bg-black" : "bg-[#1E1F22]"
      )}
    >
      {/* Top Header Bar */}
      <div className="h-12 bg-[#1E1F22]/95 backdrop-blur border-b border-[#2B2D31] px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-x-2">
          {isCinemaStage && (
            <span className="bg-[#5865F2] text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded tracking-wide flex items-center gap-x-1">
              <Sparkles className="h-3 w-3" />
              Watch Party Stage
            </span>
          )}
          <span className="text-sm font-semibold text-zinc-200">
            {screenShareTrack ? "Transmissão 60 FPS Ativa" : "Sala Conectada"}
          </span>
          <span className="text-xs text-[#23A55A] font-medium flex items-center gap-x-1 ml-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#23A55A] animate-pulse" />
            {participants.length} {participants.length === 1 ? "Pessoa Conectada" : "Pessoas Conectadas"}
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
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </ActionTooltip>

          <ActionTooltip label="Desconectar da Chamada">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDisconnect}
              className="h-7 px-2.5 bg-[#DA373C] hover:bg-[#A12828] text-white text-xs font-semibold flex items-center gap-x-1 ml-1"
            >
              <PhoneOff className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Desconectar</span>
            </Button>
          </ActionTooltip>
        </div>
      </div>

      {/* Main Video / Participant Grid Area */}
      <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden relative min-h-0 h-full">
        {/* Caso alguém esteja transmitindo tela -> Spotlight Cinema Mode */}
        {screenShareTrack && isTrackReference(screenShareTrack) ? (
          <>
            <div className="flex-1 flex flex-col items-center justify-center bg-black/95 rounded-2xl overflow-hidden relative group border border-[#2B2D31] shadow-2xl min-h-0 w-full">
              <div className="w-full h-full flex items-center justify-center relative">
                <VideoTrack trackRef={screenShareTrack} className="w-full h-full object-contain" />
              </div>

              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-x-2 text-xs text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse" />
                <span className="font-semibold">{screenShareTrack.participant.name || "Apresentador"} (Stream 60 FPS)</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-x-3 text-xs text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity w-60 z-20">
                <Volume2 className="h-4 w-4 text-[#5865F2] shrink-0" />
                <span className="text-[11px] text-zinc-300 whitespace-nowrap">Volume Filme</span>
                <Slider
                  defaultValue={[streamVolumes[screenShareTrack.participant.identity] ?? 100]}
                  max={200}
                  step={5}
                  onValueChange={(val) =>
                    setStreamVolume(screenShareTrack.participant.identity, val[0])
                  }
                />
                <span className="text-[10px] font-mono text-zinc-400 w-8 text-right">
                  {streamVolumes[screenShareTrack.participant.identity] ?? 100}%
                </span>
              </div>
            </div>

            {/* Participantes em Miniatura Embaixo */}
            <div className="h-36 flex flex-row items-center gap-3 overflow-x-auto w-full px-1 py-1 shrink-0 scrollbar-thin">
              {participants.map((p) => {
                const camTrack = tracks.find(
                  (t) => t.participant.identity === p.identity && t.source === Track.Source.Camera
                );
                return (
                  <ParticipantCard
                    key={p.identity}
                    participant={p}
                    cameraTrack={camTrack}
                    totalParticipants={participants.length}
                    isMini={true}
                  />
                );
              })}
            </div>
          </>
        ) : (
          /* Grade de Participantes Dinâmica (Quando ninguém está compartilhando tela) */
          <div className="flex-1 flex flex-wrap items-center justify-center gap-4 w-full h-full min-h-0 overflow-y-auto p-2 content-center">
            {participants.map((p) => {
              const camTrack = tracks.find(
                (t) => t.participant.identity === p.identity && t.source === Track.Source.Camera
              );
              return (
                <ParticipantCard
                  key={p.identity}
                  participant={p}
                  cameraTrack={camTrack}
                  totalParticipants={participants.length}
                  isMini={false}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Control Bar */}
      <div className="h-16 bg-[#111214] border-t border-[#1E1F22] px-6 flex items-center justify-between z-20 select-none shrink-0">
        <div className="flex items-center gap-x-3">
          <div className="text-xs">
            <span className="text-white font-semibold block truncate max-w-[150px]">
              {localParticipant?.name || "Você"}
            </span>
            <span className="text-[#23A55A] text-[10px] font-medium flex items-center gap-x-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#23A55A]" />
              {isScreenShareEnabled
                ? "Transmitindo 60 FPS"
                : isCameraEnabled
                ? "Câmera Ativa"
                : isMicrophoneEnabled
                ? "Voz Ativa"
                : "Mutado"}
            </span>
          </div>
        </div>

        {/* Center Control Buttons */}
        <div className="flex items-center gap-x-3">
          <ActionTooltip label={!isMicrophoneEnabled ? "Desmutar Microfone" : "Mutar Microfone"}>
            <Button
              size="icon"
              variant={!isMicrophoneEnabled ? "destructive" : "secondary"}
              onClick={toggleMic}
              className={cn(
                "h-10 w-10 rounded-full transition shadow-md",
                !isMicrophoneEnabled
                  ? "bg-[#DA373C] hover:bg-[#A12828] text-white"
                  : "bg-[#2B2D31] hover:bg-[#35373C] text-[#23A55A]"
              )}
            >
              {!isMicrophoneEnabled ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </ActionTooltip>

          <ActionTooltip label={isCameraEnabled ? "Desligar Câmera" : "Ligar Câmera"}>
            <Button
              size="icon"
              variant={isCameraEnabled ? "default" : "secondary"}
              onClick={toggleCam}
              className={cn(
                "h-10 w-10 rounded-full transition shadow-md",
                isCameraEnabled
                  ? "bg-[#23A55A] hover:bg-[#1C8B4C] text-white shadow-[0_0_20px_rgba(35,165,90,0.5)]"
                  : "bg-[#2B2D31] hover:bg-[#35373C] text-zinc-300"
              )}
            >
              {isCameraEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
          </ActionTooltip>

          <ActionTooltip label={isScreenShareEnabled ? "Parar Transmissão" : "Compartilhar Tela (60 FPS)"}>
            <Button
              size="default"
              variant={isScreenShareEnabled ? "destructive" : "default"}
              onClick={toggleScreen}
              className={cn(
                "h-10 px-4 rounded-full flex items-center gap-x-2 font-semibold text-xs transition shadow-md",
                isScreenShareEnabled
                  ? "bg-[#DA373C] hover:bg-[#A12828] text-white shadow-lg animate-pulse"
                  : "bg-[#5865F2] hover:bg-[#4752C4] text-white"
              )}
            >
              <MonitorPlay className="h-4 w-4" />
              {isScreenShareEnabled ? "Parar Stream" : "Transmitir Tela"}
            </Button>
          </ActionTooltip>

          <ActionTooltip label="Desconectar">
            <Button
              size="icon"
              variant="destructive"
              onClick={handleDisconnect}
              className="h-10 w-10 rounded-full bg-[#DA373C] hover:bg-[#A12828] text-white transition shadow-lg"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </ActionTooltip>
        </div>

        {/* Right Quality Preset Badge */}
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
