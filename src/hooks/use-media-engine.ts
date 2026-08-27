import { create } from "zustand";
import { STREAM_PRESETS, StreamQualityPreset, getOptimizedScreenShareConstraints } from "@/lib/livekit-config";

interface MediaEngineStore {
  // Estados da Sessão
  isJoined: boolean;
  channelName: string | null;
  
  // Controles de Mídia
  isMuted: boolean;
  isCameraOn: boolean;
  isScreenSharing: boolean;
  isDeafened: boolean;
  isSpeaking: boolean;
  
  // Streams Nativos do Navegador (WebRTC MediaStreams)
  audioStream: MediaStream | null;
  cameraStream: MediaStream | null;
  screenStream: MediaStream | null;

  // Ações
  joinRoom: (name: string) => Promise<void>;
  leaveRoom: () => void;
  toggleMic: () => Promise<void>;
  toggleCam: () => Promise<void>;
  toggleScreenShare: (preset?: StreamQualityPreset) => Promise<void>;
  setIsDeafened: (isDeafened: boolean) => void;
  setIsSpeaking: (isSpeaking: boolean) => void;
}

export const useMediaEngine = create<MediaEngineStore>((set, get) => ({
  isJoined: false,
  channelName: null,
  isMuted: true, // EXIGÊNCIA: Sempre mutado por padrão ao entrar
  isCameraOn: false,
  isScreenSharing: false,
  isDeafened: false,
  isSpeaking: false,
  audioStream: null,
  cameraStream: null,
  screenStream: null,

  setIsDeafened: (isDeafened) => set({ isDeafened }),
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),

  joinRoom: async (channelName: string) => {
    console.log(`[CONCORD_MEDIA] Entrando no canal: ${channelName}`);
    try {
      // 1. Inicializa o microfone em modo seguro (mutado por padrão)
      let micStream: MediaStream | null = null;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        // Desativa a faixa de hardware para garantir MUTE padrão
        micStream.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
      } catch (err) {
        console.warn("[CONCORD_MEDIA] Microfone não obtido no join:", err);
      }

      set({
        isJoined: true,
        channelName,
        isMuted: true,
        isCameraOn: false,
        isScreenSharing: false,
        audioStream: micStream,
        cameraStream: null,
        screenStream: null,
      });
    } catch (error) {
      console.error("[CONCORD_MEDIA] Erro ao entrar no canal:", error);
    }
  },

  leaveRoom: () => {
    console.log("[CONCORD_MEDIA] Saindo do canal de voz.");
    const { audioStream, cameraStream, screenStream } = get();

    // Encerra todas as faixas de hardware do navegador
    audioStream?.getTracks().forEach((t) => t.stop());
    cameraStream?.getTracks().forEach((t) => t.stop());
    screenStream?.getTracks().forEach((t) => t.stop());

    set({
      isJoined: false,
      channelName: null,
      isMuted: true,
      isCameraOn: false,
      isScreenSharing: false,
      isSpeaking: false,
      audioStream: null,
      cameraStream: null,
      screenStream: null,
    });
  },

  toggleMic: async () => {
    const { isMuted, audioStream } = get();
    const nextMuted = !isMuted;
    console.log(`[CONCORD_MEDIA] toggleMic: ${isMuted ? "MUTADO" : "ATIVO"} -> ${nextMuted ? "MUTAR" : "DESMUTAR"}`);

    let currentStream = audioStream;

    // Se o stream de áudio ainda não existir e o usuário quer desmutar, solicita o microfone
    if (!currentStream && !nextMuted) {
      try {
        currentStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
      } catch (err) {
        console.error("[CONCORD_MEDIA] Erro ao solicitar microfone:", err);
        return;
      }
    }

    if (currentStream) {
      currentStream.getAudioTracks().forEach((track) => {
        track.enabled = !nextMuted;
        console.log(`[CONCORD_MEDIA] AudioTrack.enabled ajustado para: ${!nextMuted}`);
      });
    }

    set({
      isMuted: nextMuted,
      audioStream: currentStream,
      isSpeaking: nextMuted ? false : get().isSpeaking,
    });
  },

  toggleCam: async () => {
    const { isCameraOn, cameraStream } = get();
    console.log(`[CONCORD_MEDIA] toggleCam acionado. Câmera atualmente: ${isCameraOn ? "LIGADA" : "DESLIGADA"}`);

    if (isCameraOn) {
      // Desliga a câmera
      cameraStream?.getTracks().forEach((t) => t.stop());
      set({ isCameraOn: false, cameraStream: null });
      console.log("[CONCORD_MEDIA] Câmera desligada com sucesso.");
    } else {
      // Liga a câmera
      try {
        const newCamStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 },
          },
        });
        set({ isCameraOn: true, cameraStream: newCamStream });
        console.log("[CONCORD_MEDIA] Câmera ligada com sucesso.");
      } catch (err) {
        console.error("[CONCORD_MEDIA] Erro ao ligar câmera:", err);
      }
    }
  },

  toggleScreenShare: async (preset: StreamQualityPreset = "1080p60") => {
    const { isScreenSharing, screenStream } = get();
    console.log(`[CONCORD_MEDIA] toggleScreenShare acionado. Transmissão atualmente: ${isScreenSharing ? "ATIVA" : "PARADA"}`);

    if (isScreenSharing) {
      screenStream?.getTracks().forEach((t) => t.stop());
      set({ isScreenSharing: false, screenStream: null });
      console.log("[CONCORD_MEDIA] Transmissão de tela encerrada.");
    } else {
      try {
        const constraints = getOptimizedScreenShareConstraints(preset);
        const newScreenStream = await navigator.mediaDevices.getDisplayMedia({
          video: constraints.video,
          audio: constraints.audio,
        });

        // Escuta se o usuário clicar em "Interromper compartilhamento" na barra flutuante nativa do Chrome
        newScreenStream.getVideoTracks()[0].onended = () => {
          console.log("[CONCORD_MEDIA] Transmissão encerrada pelo botão nativo do navegador.");
          set({ isScreenSharing: false, screenStream: null });
        };

        set({ isScreenSharing: true, screenStream: newScreenStream });
        console.log("[CONCORD_MEDIA] Transmissão de tela iniciada com sucesso (60 FPS).");
      } catch (err) {
        console.error("[CONCORD_MEDIA] Erro ao iniciar compartilhamento de tela:", err);
      }
    }
  },
}));
