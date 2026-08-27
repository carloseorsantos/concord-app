import { create } from "zustand";
import { LocalParticipant, Track } from "livekit-client";

interface VoiceStateStore {
  isMuted: boolean; // Inicia mutado por padrão
  isDeafened: boolean;
  isCameraOn: boolean;
  isInCall: boolean;
  currentChannelName: string | null;
  localParticipant: LocalParticipant | null;
  disconnectCallFn: (() => void) | null;
  setIsMuted: (isMuted: boolean) => void;
  setIsDeafened: (isDeafened: boolean) => void;
  setIsCameraOn: (isCameraOn: boolean) => void;
  setCurrentChannelName: (name: string | null) => void;
  setLocalParticipant: (participant: LocalParticipant | null) => void;
  setDisconnectCallFn: (fn: (() => void) | null) => void;
  toggleMic: () => Promise<void>;
  toggleCam: () => Promise<void>;
  disconnect: () => void;
}

export const useVoiceState = create<VoiceStateStore>((set, get) => ({
  isMuted: true, // Padrão: mutado
  isDeafened: false,
  isCameraOn: false,
  isInCall: false,
  currentChannelName: null,
  localParticipant: null,
  disconnectCallFn: null,
  setIsMuted: (isMuted) => set({ isMuted }),
  setIsDeafened: (isDeafened) => set({ isDeafened }),
  setIsCameraOn: (isCameraOn) => set({ isCameraOn }),
  setCurrentChannelName: (currentChannelName) => set({ currentChannelName }),
  setLocalParticipant: (participant) =>
    set((state) => ({
      localParticipant: participant,
      isInCall: !!participant,
      // Não sobrescreve isMuted forçadamente se o participante já existir
      isMuted: participant ? !participant.isMicrophoneEnabled : state.isMuted,
      isCameraOn: participant ? participant.isCameraEnabled : state.isCameraOn,
    })),
  setDisconnectCallFn: (disconnectCallFn) => set({ disconnectCallFn }),
  toggleMic: async () => {
    const { localParticipant, isMuted } = get();
    console.log(`[CONCORD_VOICE] toggleMic acionado. Estado atual no Zustand isMuted: ${isMuted}`);

    if (localParticipant) {
      // Estado alvo baseado no hardware do LiveKit
      const currentHardwareEnabled = localParticipant.isMicrophoneEnabled;
      const targetEnabled = !currentHardwareEnabled;
      console.log(`[CONCORD_VOICE] LiveKit hardware antes: isMicrophoneEnabled=${currentHardwareEnabled} -> Alvo: ${targetEnabled}`);

      try {
        await localParticipant.setMicrophoneEnabled(targetEnabled);
        
        // Garante que o track físico de mídia seja liberado/mutado
        const pub = localParticipant.getTrackPublication(Track.Source.Microphone);
        if (pub && pub.track) {
          pub.track.mediaStreamTrack.enabled = targetEnabled;
        }

        const finalStatus = localParticipant.isMicrophoneEnabled;
        console.log(`[CONCORD_VOICE] LiveKit hardware após setMicrophoneEnabled: ${finalStatus}`);
        set({ isMuted: !finalStatus });
      } catch (err) {
        console.error("[CONCORD_VOICE] Erro crítico ao alternar microfone:", err);
      }
    } else {
      set({ isMuted: !isMuted });
      console.log(`[CONCORD_VOICE] Sem chamada ativa. Novo isMuted prévio: ${!isMuted}`);
    }
  },
  toggleCam: async () => {
    const { localParticipant, isCameraOn } = get();
    console.log(`[CONCORD_VOICE] toggleCam acionado.`);

    if (localParticipant) {
      const targetEnabled = !localParticipant.isCameraEnabled;
      try {
        await localParticipant.setCameraEnabled(targetEnabled);
        set({ isCameraOn: targetEnabled });
      } catch (err) {
        console.error("[CONCORD_VOICE] Erro ao alternar câmera no LiveKit:", err);
      }
    } else {
      set({ isCameraOn: !isCameraOn });
    }
  },
  disconnect: () => {
    const { disconnectCallFn, localParticipant } = get();
    console.log("[CONCORD_VOICE] Desconectando da chamada de voz...");
    if (disconnectCallFn) {
      disconnectCallFn();
    }
    if (localParticipant && (localParticipant as any).room) {
      (localParticipant as any).room.disconnect();
    }
    set({
      isInCall: false,
      localParticipant: null,
      isMuted: true, // Sempre reseta para mutado
      isCameraOn: false,
      currentChannelName: null,
    });
  },
}));
